$(document).ready(function() {
		initUser();
		clearUser();
	} );
function initUser(){
	loadTablaUser();
	$('#uploadSubmit').on('click', function() {
		var forData = new FormData(); 
		if($("#userId").val()){
		forData.append("ide",$('#userId').val());
		console.log("Che mira ide vale: "+$('#userId').val());
		}             
		forData.append("nomb",$('#nomb').val());
		forData.append("pass",$('#userPass1').val());
		forData.append("tipo",$('#userHabilitado').val());
		$.ajax({
			type: "post",
			data: forData,
			url: "./macros.php?t=sUser",
			dataType: 'json',
			processData: false,  // tell jQuery not to process the data
			contentType: false,  // tell jQuery not to set contentType
			cache: false,
			success: function(datos, textStatus, jqXHR) {
				if(datos.err==0){
					swal("Exito", "Se han guardado sin problemas.", "success");
					$('#mProd').modal('hide');
					$('body').removeClass('modal-open');
					$('.modal-backdrop').remove();
					usuarios();
				}else
				swal("Error", datos.txerr, "error");
			}
		});
		loadTablaUser();
		
	});
}
function loadTablaUser(){
	console.log("Cargando datos en tabla");
	$('#tusuarios').DataTable();
	$.ajax({
		type: "post",
		data: {
			"t": "tUser"
		},
		url: "./macros.php",
		dataType: 'json',
		cache: false,
		success: function(datos, textStatus, jqXHR) {
			if (datos.err == 0) {
				var t = $('#tusuarios').DataTable();
				if(datos.cant){
					for(var i=0; i<datos.cant; i++){
						t.row.add( [
							datos.usuarios[i].iduser,datos.usuarios[i].nombuser,datos.usuarios[i].tipouser,"<a style='color:#000;' onclick='deleteUser("+datos.usuarios[i].iduser+")' href='#'><i class='fa fa-bomb' aria-hidden='true'></i></a>",] ).draw( false );
					}
				}
			} else {
				console.log("Error: "+datos.txerr);
			}
		},

	});
}
function clearUser(){
	$("#nomb").val("");
	$("#userPass1").val("");
	$("#userPass2").val("");
	$("#userHabilitado").val("1");
	$("#userId").val("");
}
function refreshUser(){
	usuarios();
}
function deleteUser(id){
	var ide = id;
	swal({
		title: "Esta seguro?",
		text: "Esta a punto de eliminar el usuario!",
		type: "warning",
		showCancelButton: true,
		confirmButtonClass: "btn-danger",
		confirmButtonText: "Si, estoy seguro!",
		cancelButtonText: "No, no estoy seguro.",
		closeOnConfirm: false,
		closeOnCancel: false
	},
	function(isConfirm) {
		if (isConfirm) { 
			$.ajax({
				type:"post", data:{"t":"dUser", "ide":ide},
				url:"./macros.php", dataType:'json',cache:false, success:function(datos,textStatus,jqXHR){
					if (datos.err == 0) {
						swal("Eliminado!", "El usuario se ha eliminado satisfactoriamente.", "success");
						refreshProd();
					}else{
						swal("Error", datos.txerr, "error");
					}
				},
			error:function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus, errorThrown);
			}
		});
		} else {
			swal("Cancelado", "El usuario está a salvo :)", "info");
		}
	});
}