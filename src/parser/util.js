/* eslint no-extra-parens: 0 */

/**
 * An empty function
 *
 * @returns void
 */

export function noop() { }

/**
 * Extract an element from an optional array.
 *
 *      const head = [ [ 1, 2 ], [ 3, 4 ] ];
 *      console.log( extractOptional( head, 0 ) );
 *      > [ 1, 2 ]
 *
 *      const tail = [ [ 5, 6 ], [ 7, 8 ] ];
 *      console.log( extractOptional( tail, 3 ) );
 *      > undefined
 *
 *      console.log( extractOptional( tail, 3, 'alt' ) );
 *      > 'alt'
 *
 * @param {any[]} [list]
 * @param {number} index
 * @param {any} [alternative]
 * @returns {any}
 */

export function extractOptional( list, index, alternative ) {

    return list ? ( list[ index ] || alternative ) : alternative;

}

/**
 * Extract an element from every array within the list, returning a new array.
 *
 *      const tail = [ [ 1, 2 ], [ 3, 4 ] ];
 *      console.log( extractList( tail, 0 ) );
 *      > [ 1, 3 ]
 *
 *      console.log( extractList( [], 3 ) );
 *      > []
 *
 * @param {array[]} list
 * @param {number} index
 * @returns {any[]}
 */

export function extractList( list, index ) {

    const length = list.length;
    if ( length === 0 ) return [];

    let i = -1;
    const result = [];

    while ( ++i < length ) {

        result[ i ] = list[ i ][ index ];

    }

    return result;

}

/**
 * Extract an element from every array within the tail, while
 * pushing into the the new array that already has the head.
 *
 *      const head = 1;
 *      const tail = [ [ 2, 3 ], [ 4, 5 ] ];
 *      console.log( buildList( head, tail, 1 ) );
 *      > [ 1, 3, 5 ]
 *
 *      console.log( buildList( 1, [], 3 ) );
 *      > [ 1 ]
 *
 * @param {any} head
 * @param {array[]} tail
 * @param {number} index
 * @returns {any[]}
 */

export function buildList( head, tail, index ) {

    const length = tail.length;
    const result = [ head ];
    let i = -1;

    if ( length === 0 ) return result;

    while ( ++i < length ) {

        result[ i + 1 ] = tail[ i ][ index ];

    }

    return result;

}

/**
 * Default export
 */

export default {

    noop,
    extractOptional,
    extractList,
    buildList

};
