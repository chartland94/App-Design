function valueReturned()
{
var button_elem =
document.getElementById( "listem" );
button.value = JSON.parse( this.responseText );
}


function showList( listYes )
{

var button_elem = document.getElementById( "listem");


var click_sender = new XMLHttpRequest();
click_sender.open( "get", "list_links" );
click_sender.send();

}

