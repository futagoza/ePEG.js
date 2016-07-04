'use strict'

/*--------- 1) Dependencies ---------*/

var fs = require('fs')
var peg = require('pegjs')
var mkdirp = require('mkdirp')

/*--------- 2) Options ---------*/

var argv = process.argv.slice(2)

var options = {
  format: 'bare',
  optimize: ~argv.indexOf('--size') ? 'size' : 'speed',
  output: "source",
  trace: argv.indexOf('--trace') !== -1
}

/*--------- 3) Generate parser ---------*/

mkdirp.sync('lib')

var source = fs.readFileSync('src/parser.pegjs', 'utf-8')

var output = '\'use strict\';\n\n'
output += 'module.exports = '
output += peg.generate(source, options)
output += '\n'

fs.writeFileSync('lib/parser.js', output)
