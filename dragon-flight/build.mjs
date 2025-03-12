import path from 'path';
import fse from 'fs-extra';
import dirTree from 'directory-tree';
import rimraf from 'rimraf';
import mergeFiles from 'merge-files';
import replace from 'replace-in-file';
// import Terser from 'terser';

let isJobDone = false;
let localPath = path.resolve(path.dirname('')).replace(/\\/g, '/');
const buildDir = `${localPath}/build`;
localPath += '/src'

// copy project's files and exclude dev stuff
console.log( 'Copying files into "build" directory' );
const excludedFiles = [ 'node_modules', 'build', 'package', 'git' ];
dirTree( `${localPath}/` ).children
    .filter(({ name }) => excludedFiles.every( file => !name.includes( file ) ))
        .map(({ name }) => name )
            .forEach(( dirOrFile, index, array ) => {
                fse.copySync( `${localPath}/${dirOrFile}`, `${buildDir}/${dirOrFile}` );
                if( index === array.length - 1 ) {
                    console.log( 'Done.' );
                    isJobDone = true;
                }
            });

// combine all js files into one
console.log( 'Combining all .js files into single and compressed index.js master file.' );

const inputPathsList = [
    'lib/ivank',
    'Engine',
    'Assets',
    'Layers',
    'DebugDraw',
    'Vector',
    'Animation',
    'DummyData',
    'Keys',
    'Mouse',
    'Settings',
    'Utils',
    'World',
    'StaticSprite',
    'SimpleSprite',
    'AnimatedSprite',  
    'Run',
].map( file => `${ buildDir }/js/${ file }.js`);

const outpuFile = `${ buildDir }/js/index.js`;
const compressOptions = { toplevel: true };
mergeFiles( inputPathsList, outpuFile )
    .then( () => {
        // remove use strict from index.js
        replace({
            files: outpuFile,
            from: /"use strict";/g,
            to: '',
        })
        .then( () => {
            // remove dev js files
            inputPathsList.forEach( file => {
                rimraf( file, () => {} );
            })
            // compressing js files
            // fse.readFile( outpuFile, 'utf8', ( error, file ) => {
            //     if( error ) throw error;
            //     let parsedFile = Terser.minify( file, compressOptions );
            //     fse.writeFile( outpuFile, mangledFile, () => {
            //         isJobDone = true;                
            //         console.log( 'Done.' );
            //     })
            // })            
        })
        .catch( error => { throw error } );
    })
    .catch( error => { throw error } );

// if wip directory in assets/images exists - remove it
const workInProgress = `${buildDir}/assets/images/wip`;
if( fse.existsSync( workInProgress )) rimraf( workInProgress, () => console.log( '"wip" directory was removed' ) );

const lib = `${buildDir}/js/lib`;
if( fse.existsSync( lib )) rimraf( lib, () => console.log( '"lib" directory was removed' ) );
