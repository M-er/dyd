$(document).ready(function() {
		initVid();
	} );
function initVid(){
	loadTablaVid();
	$('#uploadVid').on('click', function() {
		var tit = $("#tit").val();
		var url = $("#url").val();
		var forData = new FormData();                  
		forData.append("tit",tit);
		forData.append("url",url);
		$.ajax({
			type: "post",
			data: forData,
			url: "./macros.php?t=sVid",
			dataType: 'json',
			processData: false,  // tell jQuery not to process the data
			contentType: false,  // tell jQuery not to set contentType
			cache: false,
			success: function(datos, textStatus, jqXHR) {
				if(datos.err==0){
					swal("Exito", "Se han guardado sin problemas.", "success");
					$('#mVid').modal('hide');
					$('body').removeClass('modal-open');
					$('.modal-backdrop').remove();
					videos();
				}else
				swal("Error", datos.txerr, "error");
			}
		});
		loadTablaVid();
		
	});
}
function loadTablaVid(){
	console.log("Cargando datos en tabla");
	$('#tvideos').DataTable();
	$.ajax({
		type: "post",
		data: {
			"t": "tVid"
		},
		url: "./macros.php",
		dataType: 'json',
		cache: false,
		success: function(datos, textStatus, jqXHR) {
			if (datos.err == 0) {
				var t = $('#tvideos').DataTable();
				if(datos.cant){
					for(var i=0; i<datos.cant; i++){
						t.row.add( [
							datos.videos[i].titvideo,datos.videos[i].urlvideo,datos.videos[i].nombuser,"<a style='color:#000;' onclick='deleteVid("+datos.videos[i].idvideo+")' href='#'><i class='fa fa-bomb' aria-hidden='true'></i></a>"] ).draw( false );
					}
				}
			} else {
				console.log("Error: "+datos.txerr);
			}
		},

	});

}
function clearVid(){
	$("#tit").val("");
	$("#url").val("");
}
function refreshVid(){
	videos();
}
function deleteVid(id){
	var ide = id;
	swal({
		title: "Esta seguro?",
		text: "Esta a punto de eliminar el video!",
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
				type:"post", data:{"t":"dVid", "ide":ide},
				url:"./macros.php", dataType:'json',cache:false, success:function(datos,textStatus,jqXHR){
					if (datos.err == 0) {
						swal("Eliminado!", "Se ha eliminado el video satisfactoriamente.", "success");
						refreshVid();
					}else{
						swal("Error", datos.txerr, "error");
					}
				},
			error:function(jqXHR, textStatus, errorThrown) { //Muestra l error en consola
				console.log(textStatus, errorThrown);
			}
		});
		} else {
			swal("Cancelado", "Su video está a salvo :)", "info");
		}
	});
}