"use strict";

/* --------- 1) Dependencies ---------*/

const fs = require( "fs" );
const path = require( "path" );
const babel = require( "babel-core" );
const globby = require( "globby" );
const mkdirp = require( "mkdirp" );

/* --------- 2) Options ---------*/

const EOL = require( "os" ).EOL;
const SEPARATOR = path.sep;
const WORKING_DIR = process.cwd();

const options = {
    "babelrc": false,
    "comments": true,
    "compact": "auto",
    "minified": false,
    "plugins": [
        [
            "transform-runtime", {
                "polyfill": true,
                "regenerator": false
            }
        ]
    ],
    "presets": [
        [
            "env", {
                "targets": {
                    "node": 4
                },
                "modules": "commonjs",
                "loose": true
            }
        ],
        "stage-0"
    ],
    shouldPrintComment( comment ) {

        return comment.startsWith( "eslint" ) === false;

    },
    sourceMaps: true
};

/* --------- 3) Utils ---------*/

const connect = path.join;
const exists = fs.existsSync;
const relative = path.relative;

function format( filename ) {

    return filename
        .replace( WORKING_DIR, "" )
        .replace( /\\/g, "/" )
        .slice( 1 );

}

function pathinfo( filename ) {

    const parts = filename.split( SEPARATOR );

    return {

        Path: filename,
        Name: parts.pop(),
        Dir: parts.join( SEPARATOR )

    };

}

function stringify( object ) {

    return JSON.stringify( object, null, "  " );

}

function writeFile( filename, data ) {

    fs.writeFileSync( filename, data, { encoding: "utf8" } );

}

/* --------- 4) Transpile... ---------*/

const mtcache = connect( WORKING_DIR, ".mtcache.json" );
const cache = exists( mtcache ) ? require( mtcache ) : {};

globby.sync( [ "src/**/*.js" ], { cwd: WORKING_DIR } )

    .forEach( id => {

        const source = pathinfo( connect( WORKING_DIR, id ) );
        const target = pathinfo( connect( WORKING_DIR, "lib", id.slice( 4 ) ) );
        const relativeName = relative( target.Dir, source.Path );
        const stat = fs.lstatSync( source.Path );
        const mtime = +stat.mtime;

        if (
            stat.isFile() &&
            exists( target.Path ) &&
            mtime === cache[ id ]
        ) return false;

        cache[ id ] = mtime;
        cache.updated = true;
        options.filename = source.Path;
        options.filenameRelative = relativeName;
        options.sourceFileName = relativeName;
        options.sourceMapTarget = relativeName;
        options.sourceRoot = relative( target.Dir, source.Dir );

        const input = fs.readFileSync( source.Path, "utf8" );
        const output = babel.transform( input, options );

        mkdirp.sync( target.Dir );
        writeFile( target.Path, `${ output.code + EOL + EOL }//# sourceMappingURL=${ source.Name }.map${ EOL }` );
        writeFile( target.Path + ".map", stringify( output.map ) + EOL );

        console.log( format( source.Path ) + " -> " + format( target.Path ) );

    } );

if ( cache.updated ) {

    delete cache.updated;
    writeFile( mtcache, stringify( cache ) );

}
