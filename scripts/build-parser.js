"use strict";

/* --------- 1) Dependencies ---------*/

const fs = require( "fs" );
const mkdirp = require( "mkdirp" );
const peg = require( "pegjs-dev" );

/* --------- 2) Options ---------*/

const source = "src/parser.pegjs";
const target = "lib/parser.js";

const options = {
    filename: source,
    format: "commonjs",
    optimize: "speed",
    output: "source",
    trace: true
};

/* --------- 3) Generate ---------*/

function mtime( filename ) {

    return +( fs.lstatSync( filename ) ).mtime;

}

if ( ! fs.existsSync( target ) || mtime( source ) > mtime( target ) ) {

    mkdirp.sync( "lib" );

    const grammar = fs.readFileSync( source, "utf8" );
    const parser = peg.generate( grammar, options );

    fs.writeFileSync( target, parser, "utf8" );
    console.log( source + " -> " + target );

}
