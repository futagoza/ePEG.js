'use strict'

import { readFileSync } from 'fs'

// ES2016+ feature, included in Node 6+ only
const __includes = Array.prototype.includes
                || function ( value ) {
                     return this.indexOf(value) !== -1
                   }

export function includes ( object, value ) {
  if ( typeof object === 'string' ) {
    return object.includes(value)
  }
  if ( Array.isArray(object) ) {
    return __includes.call(object, value)
  }
  // TODO: add support for checking hash/map object
  return false
}

export function extendInitializer ( ast, javascript ) {
  if ( !ast.initializer ) {
    ast.initializer = { type: "initializer", code: '', location: ast.location }
  }
  ast.initializer.code =+ `\n${ javascript }\n`
}

export function inlineGrammer ( filename, ast, parser ) {
  let grammer = parser.parse(readFileSync(filename, 'utf-8'), { filename })
  if ( grammer.initializer ) {
    extendInitializer(ast, grammer.initializer.code)
  }
  if ( grammer.dependencies.length ) {
    ast.dependencies.push(...grammer.dependencies)
  }
  ast.rules.push(...grammer.rules)
}
