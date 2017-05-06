"use strict";

const chalk = require( "chalk" );
const rimraf = require( "rimraf" );

require( "globby" )

    .sync( [

        "lib",
        "examples/*.js",
        ".eslintcache",
        "npm-debug.log"

    ] )

    .forEach( match => {

        rimraf.sync( match );
        console.log( chalk.grey( "Removed " + match ) );

    } );
