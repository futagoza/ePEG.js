'use strict'

var fs = require('fs')
var rimraf = require('rimraf')
var argv = process.argv.slice(2)

function handleError ( err ) {
  if ( err ) {
    console.error(err.stack || err.message || err)
    process.exit(1)
  }
}

function remove ( path ) {
  fs.lstat(path, function(err){
    if ( err ) {
      if (err.code != 'ENOENT') handleError(err)
    } else {
      rimraf(path, function(err){
        handleError(err)
        console.log('Removed ' + path)
      })
    }
  })
}

if ( argv.length ) {

  argv.forEach(remove)

} else {

  remove('benchmark')
  remove('bin')
  remove('lib')
  remove('spec')
  remove('examples/*.js')
  remove('npm-debug.log')

}
