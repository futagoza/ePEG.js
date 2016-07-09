'use strict'

import { readFileSync } from 'fs'

export function use ( config, options ) {
  if ( Array.isArray(options.files) && options.files.length ) {

    if ( !config.passes.preprocess ) {
      config.passes = Object.assign({ preprocess: [] }, config.passes)
    }
    let preprocess = config.passes.preprocess

    function inlineFiles ( ast, options ) {
      let parser = config.parser

      options.files.forEach(filename => {
        let grammer = parser.parse(readFileSync(filename, 'utf-8'), { filename })
        if ( grammer.initializer ) {
          if ( !ast.initializer ) {
            ast.initializer = { type: "initializer", code: '', location: ast.location }
          }
          ast.initializer.code =+ `\n${ grammer.initializer.code }\n`
        }
        if ( grammer.externals && grammer.externals.length ) {
          ast.externals.push(...grammer.externals)
        }
        ast.rules.push(...grammer.rules)
      })
    }

    preprocess.push(inlineFiles)

  }
}
