'use strict'

import { extendStage } from '../utils'

function generateCodeBlock ( labels, node, rule ) {
  labels = labels.map(label => `${ label }: ${ label }`)
  return `return { ${ labels.join(', ') } }`
}

export function use ( config ) {

  extendStage(config, 'preprocess', ( ast, options ) =>{
    if ( options.disableAutoAST !== true ) {

      const generate = options.generateCodeBlock || generateCodeBlock

      ast.rules.forEach(rule => {
        const node = rule.expression
        const labels = []

        if ( node.type === 'labeled' ) {
          labels.push(node.label)
        }
        else if ( node.type === 'sequence' ) {
          node.elements.forEach(element => {
            if ( element.type === 'labeled' ) labels.push(element.label)
          })
        }

        if ( labels.length ) {
          rule.expression = {
            type:       'action',
            expression: node,
            code:       generate(labels, node, rule),
            location:   node.location
          }
        }
      })

    }
  })

}
