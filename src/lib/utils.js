'use strict'

import { readFileSync } from 'fs'

export function extendStage ( config, stageName, pass ) {
  var stage = config.passes[stageName]
  if ( !Array.isArray(stage) ) {
    config.passes = { [stageName]: [], ...config.passes }
    stage = config.passes[stageName]
  }
  stage.push(pass)
}

// ES2016+ feature, included in Node 6+ only
export var arrayIncludes = (arrayPrototypeIncludes => {

  if ( typeof arrayPrototypeIncludes !== 'function' ) {
    return ( object, value ) => object.indexOf(value) !== -1
  }

  return ( object, value ) => arrayPrototypeIncludes.call(object, value)

})(Array.prototype.includes)

export function extendInitializer ( ast, javascript ) {
  if ( !ast.initializer ) {
    ast.initializer = { type: 'initializer', code: '', location: ast.location }
  }
  ast.initializer.code =+ `\n// ${ javascript.location.filename }\n`
  ast.initializer.code =+ `\n${ javascript.code }\n`
}

export function inlineGrammer ( filename, ast, parser ) {
  let grammer = parser.parse(readFileSync(filename, 'utf-8'), { filename })
  if ( grammer.initializer ) {
    extendInitializer(ast, grammer.initializer)
  }
  if ( grammer.dependencies.length ) {
    ast.dependencies.push(...grammer.dependencies)
  }
  ast.rules.push(...grammer.rules)
}
