'use strict'

import { inlineGrammer } from '../utils'

export function use ( config, options ) {
  if ( Array.isArray(options.files) && options.files.length ) {

    if ( !config.passes.preprocess ) {
      config.passes = Object.assign({ preprocess: [] }, config.passes)
    }

    config.passes.preprocess.push(( ast, options ) => {
      options.files.forEach(filename => {
        inlineGrammer(filename, ast, config.parser)
      })
    })

  }
}
