'use strict'

/*--------- 1) Dependencies ---------*/

var fs = require('fs')
var path = require('path')
var program = require('commander')
var babel = require('babel-core')
var mkdirp = require('mkdirp').sync

/*--------- 2) Options ---------*/

program
  .option('--sourceMaps', 'enable source maps for generated files')
  .option('-c, --compact', 'do not include superfluous whitespace characters and line terminators')
  .option('-m, --minify', 'minifies generated source before writing files')
  .option('--comments', 'preserve comments from source files to generated files')
  .option('-R, --target <dir>', 'select directory in source to build (default: all)', null)
  .parse(process.argv)

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

var __cwdname = process.cwd()

var resolve = path.join

var format = function ( filename ) {
  return filename.replace(__cwdname, '').slice(1)
}

function transform ( from, to ) {
  var source = fs.readFileSync(from, 'utf-8')
  options.filename = from
  source = babel.transform(source, options)
  mkdirp(path.dirname(to))
  fs.writeFileSync(to, source.code + '\n')
  if ( options.sourceMaps ) {
    fs.writeFileSync(to + '.map', source.map)
  }
  console.log(format(from) + ' -> ' + format(to))
}

/*--------- 4) Transpile... ---------*/

function transpile ( basename ) {
  var from = resolve(__cwdname, 'src', basename)
  var stat = fs.lstatSync(from)
  if ( stat.isDirectory() )
    fs.readdirSync(from)
      .forEach(function(item){
        transpile(resolve(basename, item))
      })
  else
    if ( path.extname(basename) === '.js' ) {
      transform(from, resolve(__cwdname, basename))
    }
}

if ( program.target && program.target !== 'all' && program.target !== '*' ) {

  transpile(program.target)

} else {

  transpile('benchmark')
  transpile('bin')
  transpile('lib')
  transpile('spec')

}
