"use strict";

/* --------- 1) Dependencies ---------*/

const fs = require( "fs" );
const path = require( "path" );
const babel = require( "babel-core" );
const globby = require( "globby" );
const mkdirp = require( "mkdirp" );
const chalk = require( "chalk" );

/* --------- 2) Options ---------*/

const EOL = require( "os" ).EOL;
const SEPARATOR = path.sep;
const WORKING_DIR = process.cwd();

const options = {
    "babelrc": false,
    "plugins": [
        [
            "transform-runtime", {
                "polyfill": true,
                "regenerator": false
            }
        ]
    ],
    "presets": [
        [ "futagozaryuu" ]
    ],
    sourceMaps: true
};

/* --------- 3) Utils ---------*/

const connect = path.join;
const relative = path.relative;

function pathinfo( filename ) {

    const parts = filename.split( SEPARATOR );
    let stat = null;

    return {

        Path: filename,
        Name: parts.pop(),
        Dir: parts.join( SEPARATOR ),

        exists() {

            return fs.existsSync( filename );

        },
        mtime() {

            stat = stat || fs.lstatSync( filename );
            return this.exists() && +( stat ).mtime;

        },
        id() {

            return filename
                .replace( WORKING_DIR, "" )
                .replace( /\\/g, "/" )
                .slice( 1 );

        },
        isFile() {

            stat = stat || fs.lstatSync( filename );
            return stat.isFile();

        }

    };

}

function writeFile( filename, data ) {

    fs.writeFileSync( filename, data, { encoding: "utf8" } );

}

/* --------- 4) Transpile... ---------*/

globby.sync( [ "src/**/*.js" ], { cwd: WORKING_DIR } )

    .forEach( id => {

        const source = pathinfo( connect( WORKING_DIR, id ) );
        const target = pathinfo( connect( WORKING_DIR, "lib", id.slice( 4 ) ) );

        if ( source.isFile() && target.exists() && source.mtime() < target.mtime() ) return false;

        const relativeName = relative( target.Dir, source.Path );
        options.filename = source.Path;
        options.filenameRelative = relativeName;
        options.sourceFileName = relativeName;
        options.sourceMapTarget = relativeName;
        options.sourceRoot = relative( target.Dir, source.Dir );

        const input = fs.readFileSync( source.Path, "utf8" );
        const output = babel.transform( input, options );

        mkdirp.sync( target.Dir );
        writeFile( target.Path, `${ output.code + EOL + EOL }//# sourceMappingURL=${ source.Name }.map${ EOL }` );
        writeFile( target.Path + ".map", JSON.stringify( output.map, null, "  " ) + EOL );

        const base = input.length;
        const peak = output.code.length;
        const percentage = Math.round( ( peak - base ) / base * 100 );
        let note = "";

        if ( base < peak )

            note = chalk.red( percentage + "% bigger" );

        else

            note = chalk.green( -percentage + "% smaller" );

        console.log( source.id() + " -> " + target.id() + " " + note );

    } );
