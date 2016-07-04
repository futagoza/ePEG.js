'use strict'

/*--------- 1) Dependencies ---------*/

var fs = require('fs')
var path = require('path')
var babel = require('babel-core')
var mkdirp = require('mkdirp')
var program = require('commander')

var join = path.join
var dirname = path.dirname
var extname = path.extname

/*--------- 2) Options ---------*/

program
  .option('--sourceMaps', 'enable source maps for generated files')
  .option('-c, --compact', 'do not include superfluous whitespace characters and line terminators')
  .option('-m, --minify', 'minifies generated source before writing files')
  .option('--comments', 'preserve comments from source files to generated files')
  .option('-R, --target <dir>', 'select directory in source to build (default: all)', null)
  .parse(process.argv)

var cwd = process.cwd()

var options = {
  babelrc: false,
  presets: [
    "es2015-node4",
    "stage-0"
  ],
  plugins: [
    ["transform-runtime", {
      "polyfill": true,
      "regenerator": false
    }]
  ],
  sourceMaps: !!program.sourceMaps ? "both" : false,
  compact: program.compact ? true : 'auto',
  minified: !!program.minify,
  comments: !!program.comments
}

/*--------- 3) Utils ---------*/

function format ( path ) {
  return path.replace(cwd, '').slice(1)
}

function generate ( from, to ) {
  var source = fs.readFileSync(from, 'utf-8')
  options.filename = from
  source = babel.transform(source, options)
  mkdirp.sync(dirname(to))
  fs.writeFileSync(to, source.code + '\n')
  if ( options.sourceMaps ) {
    fs.writeFileSync(to + '.map', source.map)
  }
  console.log(format(from) + ' -> ' + format(to))
}

function readFiles ( filename ) {
  var path = join(cwd, 'src', filename)
  var stat = fs.lstatSync(path)
  if ( stat.isDirectory() )
    fs.readdirSync(path)
      .forEach(function(item){
        readFiles(join(filename, item))
      })
  else
    if ( extname(filename) === '.js' ) {
      generate(path, join(cwd, filename))
    }
}

/*--------- 4) Transpile... ---------*/

if ( program.target && program.target !== 'all' && program.target !== '*' ) {

  readFiles(program.target)

} else {

  readFiles('benchmark')
  readFiles('bin')
  readFiles('lib')
  readFiles('spec')

}
