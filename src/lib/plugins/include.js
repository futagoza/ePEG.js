'use strict'

const parser = require('../parser')

export function use ( config, options ) {
  if ( options.disableIncludes !== true ) {

    config.parser = parser

    // ...

  } 
}
