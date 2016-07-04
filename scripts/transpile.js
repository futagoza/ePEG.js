'use strict'

/*--------- 1) Dependencies ---------*/

var fs = require('fs')
var path = require('path')
var babel = require('babel-core')
var mkdirp = require('mkdirp')

var join = path.join
var dirname = path.dirname
var extname = path.extname

/*--------- 2) Options ---------*/

var argv = process.argv.slice(2)

var sourceMaps = argv.indexOf('-d') !== -1
var cwd = process.cwd()
var project = argv.indexOf('-p')

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
  sourceMaps: !!sourceMaps ? "both" : false,
  compact: ~argv.indexOf('--compact') ? true : 'auto',
  minified: argv.indexOf('-m') !== -1,
  comments: argv.indexOf('--comments') !== -1
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
  if ( sourceMaps ) {
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

if ( project !== -1 ) {

  project = argv[project + 1]
  if ( !project || project.charAt(0) === '-' ) {
    throw new Error('You must provide a valid argument for the \'-p\' flag')
  }
  readFiles(project)

} else {

  readFiles('benchmark')
  readFiles('bin')
  readFiles('lib')
  readFiles('spec')

}
