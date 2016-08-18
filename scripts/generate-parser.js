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
  format: 'commonjs',
  optimize: program.optimize,
  output: "source",
  trace: !!program.trace
}

var optimize = options.optimize
if ( optimize !== 'speed' && optimize !== 'size' ) {
  console.error('ERROR: Optimization goal must be either "speed" or "size".')
  process.exit(1)
}

/*--------- 3) Generate ---------*/

mkdirp('lib')

fs.writeFileSync(target, buildParser(fs.readFileSync(source, 'utf-8'), options))

console.log(source + ' -> ' + target)
