'use strict'

import { extendStage, inlineGrammer, extendInitializer } from '../utils'
import { dirname, extname, join } from 'path'
import { readFileSync } from 'fs'

export function use ( config ) {
  
  extendStage(config, 'preprocess', ( ast, options ) => {
    const dependencies = ast.dependencies

    if ( Array.isArray(dependencies) && dependencies.length ) {
      dependencies.forEach(dependency => {

        var resolve, ext, root, filename

        switch ( dependency.type ) {

          case 'include':
            resolve = options.disableIncludes ? null : join
            break

          case 'import':
            resolve = options.disableImports ? null : require.resolve
            break

        }

        if ( resolve ) {
          ext = extname(dependency.path)
          root = dirname(dependency.location.filename)
          filename = resolve(root, dependency.path)

          if ( ext === '.pegjs' ) {
            inlineGrammer(filename, ast, config.parser)
          }
          else if ( ext === '.js' ) {
            extendInitializer(ast, {
              code: readFileSync(filename, 'utf-8'),
              location: { filename }
            })
          }
        }

      })
    }
  })

}
