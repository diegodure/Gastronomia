jQuery( document ).ready(function() {
    console.log( "ready!" );
});

function isNotAdmin(){
	document.getElementById("liCompras").style.display = "none";
	document.getElementById("liProveedores").style.display = "none";
	document.getElementById("liReportes").style.display = "none";
	document.getElementById("liConfig").style.display = "none";
}