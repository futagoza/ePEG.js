'use strict'

const globby = require( 'globby' )
const rimraf = require( 'rimraf' )
let argv = process.argv.slice( 2 )

function handleError( err ) {

  if ( ! err ) return void 0

  console.error( err.stack || err.message || err )
  process.exit( 1 )

}

if ( argv.length === 0 ) {

  argv = [
    'bin',
    'lib',
    'test',
    'examples/*.js',
    'npm-debug.log'
  ]

}

globby( argv )

  .catch( handleError )

  .then( files => files.forEach( path =>

    rimraf( path, err => {
      handleError( err )
      console.log( 'Removed ' + path )
    } )

  ) )
