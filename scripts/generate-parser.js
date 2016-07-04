'use strict'

/*--------- 1) Dependencies ---------*/

var fs = require('fs')
var program = require('commander')
var mkdirp = require('mkdirp').sync
var buildParser = require('pegjs-dev').generate

/*--------- 2) Options ---------*/

program
  .option('-O, --optimize <goal>', 'select optimization for speed or size (default: speed)', 'speed')
  .option('--trace', 'enable tracing in generated parser (default: false)', false)
  .parse(process.argv)

var source = 'src/parser.pegjs'
var target = 'lib/parser.js'

var options = {
  filename: source,
  format: 'bare',
  optimize: program.optimize,
  output: "source",
  trace: !!program.trace
}

/*--------- 3) Generate ---------*/

mkdirp('lib')

fs.writeFileSync(target, '\'use strict\';\n' +

  buildParser(fs.readFileSync(source, 'utf-8'), options)
    .replace('(function', 'module.exports = (function')

+ ';\n')

console.log(source + ' -> ' + target)
