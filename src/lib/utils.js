'use strict'

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
