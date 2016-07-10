'use strict'

import * as peg from 'pegjs-dev'

export const VERSION = require('../package.json').version
export const versions = {
  'node': process.versions.node,
  'epeg.js': VERSION,
  'pegjs': peg.VERSION,
  'pegjs-dev': require('pegjs-dev/package.json').version
}

export const GrammarError = peg.GrammarError
export const parser = require('./parser')
export const compiler = peg.compiler

export const IncludePlugin = require('./plugins/include')
export const ImportPlugin = require('./plugins/import')
export const FilesOptionPlugin = require('./plugins/files-option')

export var defaultPlugins = null

export function setDefaultPlugins ( ...plugins ) {
  defaultPlugins = plugins
}

export function restoreDefaultPlugins ( ) {
  defaultPlugins = [IncludePlugin, ImportPlugin, FilesOptionPlugin]
}
restoreDefaultPlugins()

export function generate ( grammar, options = {} ) {
  let plugins = "plugins" in options ? options.plugins : []
  if ( defaultPlugins && defaultPlugins.length ) {
    options = Object.assign(options, {
      plugins: defaultPlugins.concat(...plugins)
    })
  }
  return peg.generate(grammar, options)
}
