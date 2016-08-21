'use strict'

import { extendStage, inlineGrammer } from '../utils'

export function use ( config ) {
  extendStage(config, 'preprocess', ( ast, options ) => {
    const files = options.files

    if ( Array.isArray(files) && files.length ) {

      files.forEach(filename => {
        inlineGrammer(filename, ast, config.parser)
      })

    }
  })
}
