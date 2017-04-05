"use strict";

const globby = require( "globby" );
const Mocha = require( "mocha" );

const files = globby.sync( [ "lib/**/__tests__/*.spec.js" ] );

if ( files.length ) {

    const mocha = new Mocha( {

        "ui": "bdd",
        "reporter": "spec",
        "timeout": 30000

    } );

    files.forEach( match => {

        mocha.addFile( match );

    } );

    mocha.run( process.exit );

}
