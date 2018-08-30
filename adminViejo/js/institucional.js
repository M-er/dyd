$(document).ready(function() {
		initInst();
	} );
function initInst(){
	loadTablaInst();
	$('#uploadSubmit').on('click', function() {
		//Parseo DATE
		var mes = sacoMes($('#vigencia').val().split(" ")[1]);
		var vig = $('#vigencia').val().split(" ")[0]+"/"+mes+"/"+$('#vigencia').val().split(" ")[2];
		var fileData = $('#fileToUpload').prop('files')[0];   
		var forData = new FormData();                  
		forData.append('file', fileData);
		forData.append("tit",$('#tit').val());
		forData.append("vigencia",vig);
		$.ajax({
			type: "post",
			data: forData,
			url: "./macros.php?t=sInst",
			dataType: 'json',
			processData: false,  // tell jQuery not to process the data
			contentType: false,  // tell jQuery not to set contentType
			cache: false,
			success: function(datos, textStatus, jqXHR) {
				if(datos.err==0){
					swal("Exito", "Se han guardado sin problemas.", "success");
					$('#mInst').modal('hide');
					$('body').removeClass('modal-open');
					$('.modal-backdrop').remove();
					institucional();
				}else
				swal("Error", datos.txerr, "error");
			}
		});
		loadTablaInst();
		
	});
}
function loadTablaInst(){
	console.log("Cargando datos en tabla");
	$('#tinstitucional').DataTable();
	$.ajax({
		type: "post",
		data: {
			"t": "tInst"
		},
		url: "./macros.php",
		dataType: 'json',
		cache: false,
		success: function(datos, textStatus, jqXHR) {
			if (datos.err == 0) {
				var t = $('#tinstitucional').DataTable();
				if(datos.cant){
					for(var i=0; i<datos.cant; i++){
						t.row.add( [
							datos.documentacion[i].nombdocu,"pdf/"+datos.documentacion[i].pathdocu,datos.documentacion[i].nombuser,datos.documentacion[i].vigdocu
							,"<a style='color:#000;' onclick='deleteInst("+datos.documentacion[i].iddocu+")' href='#'><i class='fa fa-bomb' aria-hidden='true'></i></a>"] ).draw( false );
					}
				}
			} else {
				console.log("Error: "+datos.txerr);
			}
		},

	});

}
function clearInst(){
	$("#tit").val("");
	$("#vigencia").val("");
	$("#fileToUpload").val("");
}
function refreshInst(){
	institucional();
}
function deleteInst(id){
	var ide = id;
	swal({
		title: "Esta seguro?",
		text: "Esta a punto de eliminar el pdf!",
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
				type:"post", data:{"t":"dInst", "ide":ide},
				url:"./macros.php", dataType:'json',cache:false, success:function(datos,textStatus,jqXHR){
					if (datos.err == 0) {
						swal("Eliminada!", "Se ha eliminado el documento satisfactoriamente.", "success");
						refreshInst();
					}else{
						swal("Error", datos.txerr, "error");
					}
				},
			error:function(jqXHR, textStatus, errorThrown) { //Muestra l error en consola
				console.log(textStatus, errorThrown);
			}
		});
		} else {
			swal("Cancelado", "Su documento está a salvo :)", "info");
		}
	});
}