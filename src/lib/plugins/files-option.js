'use strict'

import { inlineGrammer } from '../utils'

export function use ( config ) {
  if ( !config.passes.preprocess ) {
    config.passes = Object.assign({ preprocess: [] }, config.passes)
  }

  config.passes.preprocess.push(( ast, options ) => {
    const files = options.files

    if ( Array.isArray(files) && files.length ) {

      files.forEach(filename => {
        inlineGrammer(filename, ast, config.parser)
      })

    }
  })
}
