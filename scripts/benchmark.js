"use strict";

const globby = require( "globby" );
const Runner = require( "benchr/lib/runner" );

const files = globby.sync( [ "lib/**/__tests__/*.benchmark.js" ] );
const options = {

    "--delay": 0,
    "--min-time": 0,
    "--max-time": 5

};

if ( files.length ) ( new Runner( options, files ) ).run();
