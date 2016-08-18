'use strict'

/*--------- Dependencies ---------*/

const fs = require('fs')
const path = require('path')
const epeg = require('../lib/epeg')
const program = require('commander')
const globby = require('globby')

/*--------- Helpers ---------*/

const exit = process.exit

function ensureZero ( number ) {
  if ( parseInt(number) < 10 ) {
    number = '0' + number
  }
  return number
}

var info = ( message ) => {
  let date = new Date()
  let time = ensureZero(date.getHours())
  time += ':' + ensureZero(date.getMinutes())
  time += ':' + ensureZero(date.getSeconds())
  time += ':' + ensureZero(date.getMilliseconds())
  console.log(time + ') ' + message + '.')
}

function abort ( simple, verbose ) {
  if ( program.verbose ) {
    console.error(verbose ? verbose : simple)
  } else {
    console.error(simple)
  }
  exit(1)
}

function createList ( value ) {
  return value.split(",").map(s => s.trim())
}

function collectArg ( value, memo ) {
  memo.push(value)
  return memo
}

function addExtraOptions ( options, json ) {
  try {
    let extraOptions = JSON.parse(json)
    if ( typeof extraOptions !== 'object' ) {
      abort('The JSON with extra options has to represent an object.')
    }
    for ( let key in extraOptions ) {
      if ( extraOptions.hasOwnProperty(key) ) {
        options[key] = extraOptions[key]
      }
    }
  }
  catch ( err ) {
    if ( !(err instanceof SyntaxError) ) throw err
    abort(`Error parsing JSON: ${ err.message }`, `Error parsing JSON: ${ err.stack }`)
  }
}

/*--------- Arguments ---------*/

program
  .version(epeg.VERSION)
  .usage('[options] <file ...>')
  .option('    --allowed-start-rules <rules>', 'comma-separated list of rules the generated parser will be allowed to start parsing from (default: the first rule in the grammar)', createList)
  .option('    --cache',                       'make generated parser cache results')
  .option('-d, --dependency <dependency>',     'use specified dependency (can be specified multiple times)', collectArg, [])
  .option('-e, --export-var <variable>',       'name of a global variable into which the parser object is assigned to when no module loader is detected')
  .option('    --extra-options <options>',     'additional options (in JSON format) to pass to peg.generate')
  .option('    --extra-options-file <file>',   'file with additional options (in JSON format) to pass to peg.generate')
  .option('-f, --format <mode>',               'format of the generated parser: amd, bare, commonjs, globals, umd (default: commonjs)', 'commonjs')
  .option('-O, --optimize <goal>',             'select optimization for speed or size (default: speed)', 'speed')
  .option('-o, --output <file>',               'output file')
  .option('    --plugin <plugin>',             'use a specified plugin (can be specified multiple times)', collectArg, [])
  .option('    --trace',                       'enable tracing in generated parser')
  .option('    --verbose',                     'display more information for debugging')
  .parse(process.argv)

if ( !program.verbose ) {
  info = () => null
}
info('Arguments parsed')

/*--------- Options ---------*/

var inputFiles = program.args || []
var outputFile = program.output

var options = {
  cache:        !!program.cache,
  dependencies: {},
  format:       program.format,
  optimize:     program.optimize,
  output:       'source',
  plugins:      [],
  trace:        !!program.trace
}

if ( program.allowedStartRules ) {
  options.allowedStartRules = program.allowedStartRules
}

program.dependency.forEach(name => {
  var id = name
  if ( name.includes(':') ) {
    [id, name] = name.split(':')
  }
  options.dependencies[id] = name
})

if ( program.exportVar ) {
  options.exportVar = program.exportVar
}

if ( !['amd', 'bare', 'commonjs', 'globals', 'umd'].includes(program.format) ) {
  abort('Module format must be one of "amd", "bare", "commonjs", "globals", and "umd".')
}

if ( !['speed', 'size'].includes(program.optimize) ) {
  abort('Optimization goal must be either "speed" or "size".')
}

info('Default options set')

if ( program.extraOptions ) {
  addExtraOptions(options, program.extraOptions)
  info('Added extra options from "--extra-options"')
}

if ( program.extraOptionsFile ) {
  let filename = program.extraOptionsFile
  var json = null
  try {
    json = fs.readFileSync(filename, 'utf-8')
  } catch(e) {
    abort(`Can't read from file "${ filename }".`)
  }
  addExtraOptions(options, json)
  info(`Added extra options from "${ filename }"`)
}

/*--------- Process ---------*/

function execute ( source, outputStream ) {
  try {
    source = epeg.generate(source, options)
  } catch ( e ) {
    info('Error thrown while generating parser')
    if ( e.location !== undefined ) {
      let position = e.location.start
      console.error(`File: ${ e.location.filename }`)
      console.error(`Location: Line ${ position.line }, Column ${ position.column }`)
      abort(e.message, e.stack)
    } else {
      abort(e.message, e.stack)
    }
  }
  info(`Generated parser (${ options.format } export)`)

  if ( options.noIife ) {
    source = source.replace('(function', `${ options.exportVar } = (function`)
  }

  outputStream.write(source)
  outputStream.end()
  info('Finished executing ePeg on provided grammar')
}

if ( inputFiles.length ) {

  globby(inputFiles).then(files => {
    if ( files.length ) {
      if ( !outputFile ) {
        outputFile = files[0].substr(0, files[0].length - path.extname(files[0]).length) + '.js'
      }
      info(`Writing parser to "${ outputFile }"`)
      let inputFile = fs.readFileSync(files[0], 'utf-8')
      options.files = files.slice(1)
      options.noIife = options.format === 'bare' && options.exportVar
      execute(inputFile, fs.createWriteStream(outputFile))
    }
  })

} else {

  const inputStream = process.stdin
  var buffer = ''

  inputStream.resume()
  inputStream.on('data', data => { buffer += data })
  inputStream.on('end', ()=> {
    execute(buffer, {
      write: process.stdout.write.bind(process.stdout),
      end: ()=> buffer = ''
    })
  })

}
