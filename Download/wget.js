/* I got the program to save all the files that it could, if a file cannot save an error message is produced but the rest will still work */

var http = require('http');
var fs   = require('fs');
var urls = [];
var dests = [];

if( process.argv.length < 3)
{
    console.log("Error 1: Not enough arguments povided(Need: nodejs, filename, textfile.)");
}

var input_filename = process.argv[2];

try
{
    var lines_input = fs.readFileSync( input_filename ).toString().split( "\n" );
}

catch( e )
{
    console.log("Error 2: Could not read " + input_filename );
    process.exit( 1 );
}

var fileLength = lines_input.length;
var useLength = fileLength - ( fileLength % 2 ) ;
var halfLength = useLength/2;



for ( var i = 0; i < fileLength; i++)
{
    if( lines_input[i] != undefined && lines_input[i+1] != undefined )
    {
        urls.push(lines_input[i]);
        dests.push(lines_input[i+1]);
    }
    i++;
}

var download = function( url, dest, cb ) {
    var file = fs.createWriteStream( dest );
    // No synchronous style!!!
    // var data = http.getSync( url );
    
    var request = http.get( url, function( response ) {
        response.pipe( file );
        file.on( 'finish', function() {
            // close() is async, call cb after close completes.
            file.close( cb );
        });
    });

    request.on( 'error', function( err ) { // Handle errors
        // Delete the file async. (But we don't check the result)
        fs.unlink(dest);
        if( cb )
            cb( err.message );
    });

};


for( var i = 0; i < halfLength; i++)
{
    var wantURL = urls[i];
    var wantDest = dests[i];
download( wantURL, wantDest,
          function() { console.log( "main cb" ) } );
}
