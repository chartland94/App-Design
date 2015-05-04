var fs = require( "fs" );
var http = require( "http" );
var sqlite = require( "sqlite3" );



function listStudents( req, res )
{
var db = new sqlite.Database( "school.sqlite" );
var resp_text = "<!DOCTYPE html>"+
"<html>" + "<h1>Student List</h1>" +
"<body style='background: lightsteelblue'>" +
"<table border='1'>" +
"<tr>" + "<th>Name</th>" + "<th>Year</th>" + "<th>ID</th>" + "</tr>";
db.each( "SELECT * FROM STUDENTS", function( err, row ) {
resp_text += "<tr>" + "<td>" + row.NAME + "</td>" + "<td>" + row.YEAR + "</td>" + "<td>" + row.ID + "</td></tr>";
});
db.close(
function() {
console.log( "Complete! ");
resp_text += "</body>" + "</html>";
res.writeHead( 200 );
res.end( resp_text );
} );
}

function addStudent( req, res )
{
var db = new sqlite.Database( "school.sqlite" );
var form_text = req.url.split( "?" )[1];
var form_inputs = form_text.split( "&" );
var perf_input = form_inputs[0].split( "=" );
var perf_input2 = form_inputs[1].split( "=" );
var perf_input3 = form_inputs[2].split( "=" );
var student = decodeURIComponent( ( perf_input[1] + '' ).replace( /\+/g, '%20' ) );
var year = decodeURIComponent( ( perf_input2[1] + '' ).replace( /\+/g, '%20' ) );
var student_id = decodeURIComponent( ( perf_input3[1] + '' ).replace( /\+/g, '%20' ) );
var sql_cmd = "INSERT INTO STUDENTS ('NAME', 'YEAR', 'ID') VALUES ('"+
student+"', '"+
year+"', '"+
student_id+"')";
db.run( sql_cmd );
db.close();
res.writeHead( 200 );
res.end( "<html><body style='background: lightsteelblue'>" +student + " was added as a Student.</body></html>" );
}

function listTeachers( req, res )
{
var db = new sqlite.Database( "school.sqlite" );
var resp_text = "<!DOCTYPE html>"+
"<html>" + "<h1>Teacher List</h1>" +
"<body style='background: lightsteelblue'>" +
"<table border='1'>" +
"<tr>" + "<th>Name</th>" + "<th>Office</th>" + "<th>ID</th>" + "</tr>";
db.each( "SELECT * FROM TEACHERS", function( err, row ) {
resp_text += "<tr>" + "<td>" + row.NAME + "</td>" + "<td>" + row.OFFICE + "</td>" + "<td>" + row.ID + "</td></tr>";
});
db.close(
function() {
console.log( "Complete! ");
resp_text += "</body>" + "</html>";
res.writeHead( 200 );
res.end( resp_text );
} );
}

function addTeacher( req, res )
{
var db = new sqlite.Database( "school.sqlite" );
var form_text = req.url.split( "?" )[1];
var form_inputs = form_text.split( "&" );
var perf_input = form_inputs[0].split( "=" );
var perf_input2 = form_inputs[1].split( "=" );
var perf_input3 = form_inputs[2].split( "=" );
var teacher = decodeURIComponent( ( perf_input[1] + '' ).replace( /\+/g, '%20' ) );
var office = decodeURIComponent( ( perf_input2[1] + '' ).replace( /\+/g, '%20' ) );
var teacher_id = decodeURIComponent( ( perf_input3[1] + '' ).replace( /\+/g, '%20' ) );
var sql_cmd = "INSERT INTO TEACHERS ('NAME', 'OFFICE', 'ID') VALUES ('"+
teacher+"', '"+
office+"', '"+
teacher_id+"')";
db.run( sql_cmd );
db.close();
res.writeHead( 200 );
res.end( "<html><body style='background: lightsteelblue'>" +teacher + " was added as a Teacher.</body></html>" );
}

function listClasses( req, res )
{
var db = new sqlite.Database( "school.sqlite" );
var resp_text = "<!DOCTYPE html>"+
"<html>" + "<h1>Class List</h1>" +
"<body style='background: lightsteelblue'>" +
"<table border='1'>" +
"<tr>" + "<th>Name</th>" + "<th>Department</th>" + "<th>ID</th>" + "</tr>";
db.each( "SELECT * FROM CLASS", function( err, row ) {
resp_text += "<tr>" + "<td>" + row.NAME + "</td>" + "<td>" + row.DEPARTMENT + "</td>" + "<td>" + row.ID + "</td></tr>";
});
db.close(
function() {
console.log( "Complete! ");
resp_text += "</body>" + "</html>";
res.writeHead( 200 );
res.end( resp_text );
} );
}

function addClass( req, res )
{
var db = new sqlite.Database( "school.sqlite" );
var form_text = req.url.split( "?" )[1];
var form_inputs = form_text.split( "&" );
var perf_input = form_inputs[0].split( "=" );
var perf_input2 = form_inputs[1].split( "=" );
var perf_input3 = form_inputs[2].split( "=" );
var class_name = decodeURIComponent( ( perf_input[1] + '' ).replace( /\+/g, '%20' ) );
var department = decodeURIComponent( ( perf_input2[1] + '' ).replace( /\+/g, '%20' ) );
var class_id = decodeURIComponent( ( perf_input3[1] + '' ).replace( /\+/g, '%20' ) );
var sql_cmd = "INSERT INTO CLASS ('NAME', 'DEPARTMENT', 'ID') VALUES ('"+
class_name+"', '"+
department+"', '"+
class_id+"')";
db.run( sql_cmd );
db.close();
res.writeHead( 200 );
res.end( "<html><body style='background: lightsteelblue'>" +class_name + " was added as a Class.</body></html>" );
}

function listEnrollment( req, res )
{
var db = new sqlite.Database( "school.sqlite" );
var resp_text = "<!DOCTYPE html>"+
"<html>" + "<h1>Enrollment List</h1>" +
"<body style='background: lightsteelblue'>" +
"<table border='1'>" +
"<tr>" + "<th>Class Name</th>" + "<th>Student Name</th>" + "</tr>";
db.each( "SELECT CLASS.NAME as cname, STUDENTS.NAME as sname, * FROM ENROLLMENTS "+"JOIN CLASS ON CLASS.ID = ENROLLMENTS.CLASSID " + "JOIN STUDENTS ON STUDENTS.ID = ENROLLMENTS.STUDENTID" ,
function( err, row ) {
resp_text += "<tr>" + "<td>" + row.cname + "</td>" +  "<td>" + row.sname + "</td></tr>";
});
db.close(
function() {
console.log( "Complete! ");
resp_text += "</body>" + "</html>";
res.writeHead( 200 );
res.end( resp_text );
} );
}

function addEnrollment( req, res )
{
var db = new sqlite.Database( "school.sqlite" );
var form_text = req.url.split( "?" )[1];
var form_inputs = form_text.split( "&" );
var perf_input = form_inputs[0].split( "=" );
var perf_input2 = form_inputs[1].split( "=" );
var class_id = decodeURIComponent( ( perf_input[1] + '' ).replace( /\+/g, '%20' ) );
var student_id = decodeURIComponent( ( perf_input2[1] + '' ).replace( /\+/g, '%20' ) );
var class_correct = false;
var student_correct = false;
var class_count = 0;
var student_count = 0;
for ( var i = 0; i < class_id.length; i++)
{
	if( (class_id.charAt(i) == "0") || (class_id.charAt(i) == "1") ||(class_id.charAt(i) == "2") ||(class_id.charAt(i) == "3") ||(class_id.charAt(i) == "4") ||(class_id.charAt(i) == "5")||(class_id.charAt(i) == "6")||(class_id.charAt(i) =="7")||(class_id.charAt(i) =="8") || (class_id.charAt(i) == "9"))
	{
		class_count++;
	}
}
for ( var j = 0; j < student_id.length; j++)
{
	if( (student_id.charAt(j) == "0") || (student_id.charAt(j) == "1") || (student_id.charAt(j) == "2") || (student_id.charAt(j) == "3") || (student_id.charAt(j) == "4") || (student_id.charAt(j) == "5") || (student_id.charAt(j) == "6") || (student_id.charAt(j) == "7") || (student_id.charAt(j) == "8") || (student_id.charAt(j) == "9") )
	{
		student_count++;
	}
}
if(( class_count === class_id.length) && (student_count === student_id.length))
{
var sql_cmd = "INSERT INTO ENROLLMENTS ('CLASSID', 'STUDENTID') VALUES ('"+
class_id+"', '"+
student_id+"')";
db.run( sql_cmd );
db.close();
res.writeHead( 200 );
res.end( "<html><body style='background: lightsteelblue'>The enrollment " + class_id + ", " + student_id + " was added.</body></html>" );
}
else{
db.close();
res.writeHead( 200 );
res.end( "<html><body style='background: lightsteelblue'>Error with ID numbers, please try again.</body></html>");
}
}

function listTeachingAssignment( req, res )
{
var db = new sqlite.Database( "school.sqlite" );
var resp_text = "<!DOCTYPE html>"+
"<html>" + "<h1>Teaching Assignment List</h1>" +
"<body style='background: lightsteelblue'>" +
"<table border='1'>" +
"<tr>" + "<th>Class Name</th>" + "<th>Teacher Name</th>" + "</tr>";
db.each( "SELECT CLASS.NAME as cname, TEACHERS.NAME as tname, * FROM TEACHINGASSIGNMENT " +"JOIN CLASS ON CLASS.ID = TEACHINGASSIGNMENT.CLASSID " +"JOIN TEACHERS ON TEACHERS.ID = TEACHINGASSIGNMENT.TEACHERID", function( err, row ) {
resp_text += "<tr>" + "<td>" + row.cname + "</td>" +  "<td>" + row.tname + "</td></tr>";
});
db.close(
function() {
console.log( "Complete! ");
resp_text += "</body>" + "</html>";
res.writeHead( 200 );
res.end( resp_text );
} );
}

function addTeachingAssignment( req, res )
{
var db = new sqlite.Database( "school.sqlite" );
var form_text = req.url.split( "?" )[1];
var form_inputs = form_text.split( "&" );
var perf_input = form_inputs[0].split( "=" );
var perf_input2 = form_inputs[1].split( "=" );
var class_id = decodeURIComponent( ( perf_input[1] + '' ).replace( /\+/g, '%20' ) );
var teacher_id = decodeURIComponent( ( perf_input2[1] + '' ).replace( /\+/g, '%20' ) );
var class_count = 0;
var teacher_count = 0;
for ( var i = 0; i < class_id.length; i++)
{
	if( (class_id.charAt(i) == "0") || (class_id.charAt(i) == "1") ||(class_id.charAt(i) == "2") ||(class_id.charAt(i) == "3") ||(class_id.charAt(i) == "4") ||(class_id.charAt(i) == "5")||(class_id.charAt(i) == "6")||(class_id.charAt(i) =="7")||(class_id.charAt(i) =="8") || (class_id.charAt(i) == "9"))
	{
		class_count++;
	}
}
for ( var j = 0; j < teacher_id.length; j++)
{
	if( (teacher_id.charAt(j) == "0") || (teacher_id.charAt(j) == "1") || (teacher_id.charAt(j) == "2") || (teacher_id.charAt(j) == "3") || (teacher_id.charAt(j) == "4") || (teacher_id.charAt(j) == "5") || (teacher_id.charAt(j) == "6") || (teacher_id.charAt(j) == "7") || (teacher_id.charAt(j) == "8") || (teacher_id.charAt(j) == "9") )
	{
		teacher_count++;
	}
}
if(( class_count === class_id.length) && (teacher_count === teacher_id.length))
{
var sql_cmd = "INSERT INTO TEACHINGASSIGNMENT ('CLASSID', 'TEACHERID') VALUES ('"+
class_id+"', '"+
teacher_id+"')";
db.run( sql_cmd );
db.close();
res.writeHead( 200 );
res.end( "<html><body style='background: lightsteelblue'>The teaching assignment " + class_id + ", " + teacher_id + " was added.</body></html>");
}
else{
db.close();
res.writeHead( 200 );
res.end( "<html><body style='background: lightsteelblue'>Error with ID numbers, please try again.</body></html>");
}
}

function serveFile( filename, req, res )
{
try
{
var contents = fs.readFileSync( filename ).toString();
}
catch( e )
{
console.log(
"Error: Something bad happened trying to open "+filename );
res.writeHead( 404 );
res.end( "" );
return;
}
res.writeHead( 200 );
res.end( contents );
}
function serverFn( req, res )
{
var filename = req.url.substring( 1, req.url.length );
console.log("filename " + filename + filename.length)
if( filename == "" )
{
filename = "./index.html";
}
if( filename.substring( 0, 13 ) == "list_students" )
{
listStudents( req, res );
}
else if( filename.substring( 0, 13 ) == "list_teachers" )
{
listTeachers( req, res);
}
else if(filename.substring(0,13) == "list_classes")
{
listClasses( req, res);
}
else if(filename.substring(0, 16) == "list_enrollments")
{
listEnrollment( req, res);
}
else if(filename.substring(0, 25) == "list_teaching_assignments")
{
listTeachingAssignment( req, res);
}
else if(filename.substring(0, 11) == "add_student")
{
addStudent( req, res);
}
else if(filename.substring(0, 11) == "add_teacher")
{
addTeacher( req, res);
}
else if(filename.substring(0, 14) == "add_enrollment")
{
addEnrollment( req, res);
}
else if(filename.substring(0, 9) == "add_class")
{
addClass( req, res);
}
else if(filename.substring(0, 23) == "add_teaching_assignment")
{
addTeachingAssignment( req, res);
}
else
{
serveFile( filename, req, res );
}
}

var server = http.createServer( serverFn );

server.listen( 8080 );