#!/usr/bin/env node

"use strict";

const argv = process.argv;
const options = {

    "cwd": process.cwd(),
    "pegjs-compatibility": true,
    "optimize": "speed",
    "format": "commonjs",
    "trace": false,
    "allow": {
        "import": false,
        "template": false,
        "default": false,
        "spread": false,
        "control": false,
        "ast": false,
        "extract": false,
        "select": false,
        "attribute": false,
        "memoization": false,
        "return": false,
        "range": false
    }

};

if ( argv.length > 2 )

    require( "../lib/console/cli" )( argv, options );

else

    require( "../lib/console/repl" )( options );
