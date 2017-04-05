"use strict";

const rimraf = require( "rimraf" );

require( "globby" )

    .sync( [

        "lib",
        "examples/*.js",
        ".eslintcache",
        ".mtcache.json",
        "npm-debug.log"

    ] )

    .forEach( match => {

        rimraf.sync( match );
        console.log( "Removed " + match );

    } );
