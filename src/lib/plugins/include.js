'use strict'

import { inlineGrammer, extendInitializer } from '../utils'
import { dirname, extname, join } from 'path'
import { readFileSync } from 'fs'

export function use ( config, options ) {
  if ( options.disableIncludes !== true ) {

    if ( !config.passes.preprocess ) {
      config.passes = Object.assign({ preprocess: [] }, config.passes)
    }

    config.passes.preprocess.push(( ast, options ) => {
      const dependencies = ast.dependencies
      if ( Array.isArray(dependencies) && dependencies.length ) {
        ast.dependencies.forEach(dependency => {

          if ( dependency.type === 'include' ) {
            const ext = extname(dependency.path)
            const root = dirname(dependency.location.filename)
            var filename = join(root, dependency.path)

            if ( ext === '.pegjs' ) {
              inlineGrammer(filename, ast, config.parser)
            }
            else if ( ext === '.js' ) {
              extendInitializer(ast, readFileSync(filename, 'utf-8'))
            }
          }

        })
      }
    })

  } 
}
