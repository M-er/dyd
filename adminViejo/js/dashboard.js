$(document).ready(function() {
	init();
});
function init(){
	console.log("Inicializando dash");
	loadAcciones();
}
function loadAcciones(){
	$.ajax({
		type: "post",
		url: "./macros.php?t=tAcc",
		dataType: 'json',
			processData: false,  // tell jQuery not to process the data
			contentType: false,  // tell jQuery not to set contentType
			cache: false,
			success: function(datos, textStatus, jqXHR) {
				if(datos.err==0){
					var i = 0;
					var tabla = document.getElementById("tablaAcc");
					datos.acc.forEach(function(entry) {
						var datosFila = entry.split("-");
						if(datosFila[1]){
							var fila = tabla.insertRow(-1);
							var cide = fila.insertCell(-1);
							var cfecha = fila.insertCell(1);
							var cusuario = fila.insertCell(2);
							var caccion = fila.insertCell(3);
							i++;
							cide.innerHTML = "#"+i;
							cfecha.innerHTML = datosFila[0];
							cusuario.innerHTML = datosFila[1];
							caccion.innerHTML = datosFila[2];
						}
					});
					var footer = tabla.createTFoot();
					var row = footer.insertRow(-1);      
					var footId = row.insertCell(-1);
					var footFec = row.insertCell(-1);
					var footUsu = row.insertCell(-1);
					var footAcc = row.insertCell(-1);
					footId.innerHTML = "#ID";
					footFec.innerHTML = "Fecha";
					footUsu.innerHTML = "Usuario";
					footAcc.innerHTML = "Acciones";
					footer.style.fontWeight = "bold";
				}else
				swal("Error", datos.txerr, "error");
			}
		});
}