/* Run jshint clean!!! */
var fs = require( "fs" );
/* What if the user doesn't type the right number of arguments? */
if ( process.argv.length < 3 )
{
	console.log("Error: You did not provide enough arguments, this program requires 3.");
	process.exit(1);
}
else if( process.argv.length < 4)
{
	console.log("Warning: This program can use up to four arguments to be fun to full potential.")
}
if ( process.argv.length > 4)
{
	console.log("Warning: You provided more arguments than necessary, only the first four will be used by the program.");
}
var args = process.argv;
/* What if the file doesn't exist? */
try{
	var lines = fs.readFileSync( args[2] ).toString().split( "\n" );
	for ( var i = 0; i < lines.length; i++)
	{
		console.log( lines[i] );
	}
}
catch( e )
{
	console.log("Error: File " + args[2] + " not found.");
	process.exit(1);
}
var targets = {}
for( var i = 0; i < lines.length; i++ )
{
	var target = {};
	if( /([a-z]):([a-z]( ))*([a-z])/.test(lines[i]))
	{
	var line = lines[ i ];
	console.log( line );
	var colon = line.split( ":" );
	if( colon.length != 2 )
	{
	continue;
	}
	target.name = colon[ 0 ];
	target.depend_names = colon[ 1 ].split( " " );
	/* What if there's no target for a dependency? */
	target.visited = false;
	targets[ target.name ] = target;
	console.log( targets );
	}

	else 
	{
		console.log("Error: Line " + i + ": '" + lines[i] + "'' is not in the correct format.(letter:letter letter)");
	}
}


function trace_dependencies( prev, target )
{
 /* what if prev and target are not the right kind of thing? */
if( !( ( typeof prev ) == "string" ) )
{
/* ... */
}
/* ... */
if( target.visited )
{
// console.log( "Already visited "+target.name );
return;
}
/* "else" */
target.visited = true;
console.log( "> " + prev + " depends on " + target.name );
for( var i = 0; i < target.depend_names.length; i++ )
{
var dep_name = target.depend_names[ i ];
if( !( dep_name in targets ) )
continue;
var dep = targets[ dep_name ];
// if( date( dep ) older than date( target ) )
// continue;
trace_dependencies( target.name, dep );
// trace_dependencies( {l:12, m:34}, "hello" );
}
}
/* What if the target given at the command line doesn't exist? */
trace_dependencies( "[ Start ]", targets[ args[3] ] );

