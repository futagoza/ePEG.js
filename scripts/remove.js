"use strict";

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
        console.log( "Removed " + match );

    } );
