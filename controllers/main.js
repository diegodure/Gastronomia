jQuery( document ).ready(function() {
    console.log( "ready!" );
});

var roleUser;

function getUserRolForMenu(userRol){
	// if(userRol == 'Profesional'){
	// 	document.getElementById("liCalendar").style.display = "none";
	// 	document.getElementById("liProfesionals").style.display = "none";
	// 	document.getElementById("liServices").style.display = "none";
	// 	document.getElementById("liUsers").style.display = "none";
	// 	document.getElementById("liReports").style.display = "none";
	// 	roleUser = 'Profesional';
	// }else if(userRol == 'Recepcionista'){
	// 	document.getElementById("liConsults").style.display = "none";
	// 	document.getElementById("liProfesionals").style.display = "none";
	// 	document.getElementById("liServices").style.display = "none";
	// 	document.getElementById("liUsers").style.display = "none";
	// 	document.getElementById("liReports").style.display = "none";
	// 	roleUser = 'Recepcionista';
	// }else if(userRol == 'Administrador'){
	// 	roleUser = 'Administrador';
	// }
}

function goToRegisterPage(){
	window.location="registerPage.php";
}
