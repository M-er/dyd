$(document).ready(function() {
	init();
});
function init(){
	console.log("Inicializando pagina.");
	dash();
}

function dash(){
	$("#main").empty();
	$(".active").removeClass("active");
	$("#dash").addClass("active");
	console.log("Cargando dashboard");
	loading();
	$("#main").load("dashboard.html");	
}
function reportes(){
	$(".active").removeClass("active");
	$("#repo").addClass("active");
	$("#main").empty();
	loading();
	console.log("Reportes");
}
/* * * * * * INSTITUCIONAL * * * * * */ 
function institucional(){
	$(".active").removeClass("active");
	$("#inst").addClass("active");
	$("#main").empty();
	console.log("Institucional");
	loading();
	$("#main").load("institucional.html");
}
/* * * * * * VIDEOS * * * * * */ 
function videos(){
	$(".active").removeClass("active");
	$("#vid").addClass("active");
	$("#main").empty();
	console.log("Videos");
	loading();
	$("#main").load("videos.html");
}

/* * * * * * PRODUCTOS * * * * * */
function productos(){
	$(".active").removeClass("active");
	$("#prod").addClass("active");
	$("#main").empty();
	console.log("Productos");
	loading();
	$("#main").load("productos.html");	
}

/* * * * * * USUARIOS * * * * * */ 
function usuarios(){
	$(".active").removeClass("active");
	$("#user").addClass("active");
	$("#main").empty();
	loading();
	console.log("Usuarios");
	$("#main").load("usuarios.html");	
}

/* Auxiliares */
function loading() {
	$("#main").empty();
	$("#main").append("<div class='loader'></div>").delay(1000);
	console.log("Time out exipred");
}
function doLogout(){
	$.ajax({
		type: "post",
		data: {
			"t": "logout"
		},
		url: "./macros.php",
		dataType: 'json',
		cache: false,
        success: function(datos, textStatus, jqXHR) { console.log(datos);
        	if (datos.err == 0) {
        		swal("Adios!", "Que tenga un buen dia.", "success");
        		setTimeout(function() {
        			window.location.assign("../index.html");
        		}, 1500);
        	} else {
        		swal("Error", datos.txerr, "error");

        	}
        },

      });
}
/* Mes */
function sacoMes(mes){
	var num = -1;
	var array = ["En",'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
	for(var j=0; j<12; j++){
		if(array[j]==mes)
			num = j+1;
	}
	num = ("0" + num).slice(-2);
	return num;
}