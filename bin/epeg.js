#!/usr/bin/env node

"use strict";

const argv = process.argv;
const options = {

    "cwd": process.cwd(),
    "optimize": "mix",
    "format": "umd",
    "trace": true

};

if ( argv.length > 2 )

    require( "../lib/console/cli" )( argv, options );

else

    require( "../lib/console/repl" )( options );
