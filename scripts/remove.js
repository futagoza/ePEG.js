'use strict'

var globby = require('globby')
var rimraf = require('rimraf')
var argv = process.argv.slice(2)

function handleError ( err ) {
  if ( err ) {
    console.error(err.stack || err.message || err)
    process.exit(1)
  }
}

if ( argv.length === 0 ) {

  argv = [
    'benchmark',
    'bin',
    'lib',
    'spec',
    'examples/*.js',
    'npm-debug.log'
  ]

}

globby(argv)
  .then(function(files){
    files.forEach(function(path){
      rimraf(path, function(err){
        handleError(err)
        console.log('Removed ' + path)
      })
    })
  })
  .catch(handleError)
