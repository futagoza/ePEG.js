'use strict'

const parser = require('../parser')

export function use ( config, options ) {
  if ( options.disableImports !== true ) {

    config.parser = parser

    // ...

  } 
}
