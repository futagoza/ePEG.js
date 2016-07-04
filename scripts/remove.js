'use strict'

var rimraf = require('rimraf')
var argv = process.argv.slice(2)

function remove ( path ) {
  rimraf(path, function(err){
    if ( err ) {
      console.error(err.stack || err.message || err)
      process.exit(1)
    }
    console.log('Removed ' + path)
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
