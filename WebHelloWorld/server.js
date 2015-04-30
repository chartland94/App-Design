var http = require( "http" );
var fs = require( "fs" );


function serverFn( req, res )
{
	for( field in req )
	{
		console.log( "R."+field+" = ..."/*+req[ field ]*/ );
	}
	for( field in req.headers )
	{
		console.log( "R.header."+field+" = ..."/*+req[ field ]*/ );
	}
	console.log( "url: "+req.url.toString() );
	if( req.url.substring( 0, 19 ) == "/submit_information" )
	{

		var x = req.url.split("?");
		var form_values = x[1].split("&");
		form_values.push( "\n");

		console.log(form_values.toString());
		fs.appendFile("server_data.txt", form_values, function (err) {
		if ( err ) throw err;
		console.log("The data was appended to the file: 'server_data.txt'");
		});

	}


	
	res.writeHead( 200 );
	var h = "<!DOCTYPE html>"+
	"<html>"+
	"<body>"+
	"<form action='submit_information' method='Get'>"+ "Username: " +
	"<input name='Username' type='text' value='Username'>"+"Password: " +
	"<input name='Password' type='password' value='Password'>"+"Date: "+
	"<input name='Date' type='date' value='mmddyy'>"+
	"<input type= 'radio' name= 'Position' value='Teacher'> Teacher" + 
	"<input type= 'radio' name= 'Position' value='Student'> Student" + 
	"<br>" +
	"<input type='submit'>"+
	"<input type='reset' value='Reset'>"+
	"</form>"+
	"</body>"+
	"</html>";
	res.end( h );
}


var server = http.createServer( serverFn );

server.listen( 8080 );


