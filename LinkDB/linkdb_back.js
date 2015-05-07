var fs = require( "fs" );
var http = require( "http" );


function giveBackFile( name, res )
{
var contents = "";
try {
contents = fs.readFileSync( name ).toString();
}
catch( e ) {
console.log(
"Error: Something bad happened trying to open "+name );
res.writeHead( 404 );
res.end( "" );
return;
}
res.writeHead( 200 );
res.end( contents );
}


function listLinks( req, res )
{
var db = new sqlite.Database( "linkdb.sqlite" );
var resp_text = "<!DOCTYPE html>"+
"<html>" + "<h1>Link Database</h1>" +
"<body style='background: lightsteelblue'>" +
"<table border='1'>" +
"<tr>" + "<th>URL</th>" + "<th>Nickname</th>" +  "</tr>";
db.each( "SELECT * FROM LINKS", function( err, row ) {
resp_text += "<tr>" + "<td>" + row.URLS + "</td>" + "<td>" + row.NICKNAMES+  "</td></tr>";
});
db.close(
function() {
console.log( "Complete! ");
resp_text += "</body>" + "</html>";
res.writeHead( 200 );
res.end( resp_text );
} );
}





function doTheServer( req, res )
{
	alert( "yes");
// console.log( "doTheServer " + req.url );
if( req.url == "/list_links" )
{
listLinks( req, res );
}
else if( req.url == "/linkdb_front.js" )
{
giveBackFile( "linkdb_front.js", res )
}
else
{
giveBackFile( "index.html", res )
}
}

var server = http.createServer( doTheServer );

server.listen(9191);