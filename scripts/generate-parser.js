'use strict'

/*--------- 1) Dependencies ---------*/

var fs = require('fs')
var peg = require('pegjs-dev')
var mkdirp = require('mkdirp')
var program = require('commander')

/*--------- 2) Options ---------*/

program
  .option('-O, --optimize <goal>', 'select optimization for speed or size (default: speed)', 'speed')
  .option('--trace', 'enable tracing in generated parser (default: false)', false)
  .parse(process.argv)

var options = {
  format: 'bare',
  optimize: program.optimize,
  output: "source",
  trace: !!program.trace
}

/*--------- 3) Generate parser ---------*/

mkdirp.sync('lib')

var source = fs.readFileSync('src/parser.pegjs', 'utf-8')

var output = '\'use strict\';\n\n'
output += 'module.exports = '
output += peg.generate(source, options)
output += '\n'

fs.writeFileSync('lib/parser.js', output)
