"use strict";

/* --------- 1) Dependencies ---------*/

const fs = require( "fs" );
const path = require( "path" );
const mkdirp = require( "mkdirp" );
const peg = require( "pegjs-dev" );

/* --------- 2) Options ---------*/

const mtcache = path.join( __dirname, "..", ".mtcache.json" );
const source = "src/parser.pegjs";
const target = "lib/parser.js";

const options = {
    filename: source,
    format: "commonjs",
    optimize: "speed",
    output: "source",
    trace: true
};

/* --------- 3) Utils ---------*/

const exists = fs.existsSync;

function writeFile( filename, data ) {

    fs.writeFileSync( filename, data, { encoding: "utf8" } );

}

/* --------- 4) Generate ---------*/

const mtime = +( fs.lstatSync( source ) ).mtime;
const cache = exists( mtcache ) ? require( mtcache ) : {};

if ( ! exists( target ) || mtime !== cache[ source ] ) {

    mkdirp.sync( "lib" );
    cache[ source ] = mtime;

    const grammar = fs.readFileSync( source, "utf8" );
    const parser = peg.generate( grammar, options );

    writeFile( target, parser );
    writeFile( mtcache, JSON.stringify( cache, null, "  " ) );
    console.log( source + " -> " + target );

}
