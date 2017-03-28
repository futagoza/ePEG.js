const assert = require( 'assert' )

describe( 'char*At benchmark', () => {

  const predefinedString = ' abcdefghijklmnopqrstuvwxyz'

  it( 'predefinedString.charAt', () => {

    assert( predefinedString.charAt( 25 ) === 'y' )

  } )

  it( 'String.prototype.charAt', () => {

    assert( ' abcdefghijklmnopqrstuvwxyz'.charAt( 20 ) === 't' )

  } )

} )
