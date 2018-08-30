$(document).ready(function() {
	initProd();
} );
function initProd(){
	loadTablaProd();
	$('#uploadSubmit').on('click', function() {
		var fileData = $('#imgToUpload').prop('files')[0];   
		var forData = new FormData();                  
		forData.append('file', fileData);
		forData.append("ide",$('#idprod').val());
		forData.append("nomb",$('#nomb').val());
		forData.append("desc",$('#desc').val());
		forData.append("cant",$('#cant').val());
		forData.append("precio",$('#precio').val());
		$.ajax({
			type: "post",
			data: forData,
			url: "./macros.php?t=sProd",
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
					productos();
				}else
				swal("Error", datos.txerr, "error");
			}
		});
		loadTablaProd();
		
	});
}
function loadTablaProd(){
	console.log("Cargando datos en tabla");
	$('#tproductos').DataTable();
	$.ajax({
		type: "post",
		data: {
			"t": "tProd"
		},
		url: "./macros.php",
		dataType: 'json',
		cache: false,
		success: function(datos, textStatus, jqXHR) {
			if (datos.err == 0) {
				var t = $('#tproductos').DataTable();
				if(datos.cant){
					for(var i=0; i<datos.cant; i++){
						t.row.add( [
							datos.productos[i].nombprod,"<img class='imgTable' src='../assets/img/productos/"+datos.productos[i].imgprod+"'/>",datos.productos[i].nombuser,datos.productos[i].cantprod
							,"$"+datos.productos[i].precio,"<a style='color:#000;' onclick='deleteProd("+datos.productos[i].idprod+")' href='#'><i class='fa fa-bomb' aria-hidden='true'></i></a><a style='color:#000;' onclick='editProd("+datos.productos[i].idprod+")' href='#'><i class='fas fa-pencil-alt' aria-hidden='true'></i></a>",] ).draw( false );
					}
				}
			} else {
				console.log("Error: "+datos.txerr);
			}
		},

	});
}
function clearProd(){
	$("#nomb").val("");
	$("#desc").val("");
	$("#cant").val("0");
	$("#idprod").val("0");
	$("#precio").val("0");
	$("#imgToUpload").val("");
}
function refreshProd(){
	productos();
}
/* * * * * * * *  Modificaciones * * * * * * * */
function editProd(id) {
	loadEdit(id);
	$("#idprod").val(id);
	console.log("PAJERO tengo en idprod: "+$('#idprod').val());

}
function loadEdit(id) {
	$("#idprod").val(id);
	var ide = id;
	$.ajax({
		type: "post", data: { "t": "tProd", "ide": ide },
		url: "./macros.php", dataType: 'json', cache: false, success: function (datos, textStatus, jqXHR) {
			if (datos.err == 0) {
				$("#nomb").val(datos.producto.nombprod);
				$("#desc").val(datos.producto.descripcion);
				$("#cant").val(datos.producto.cantprod);
				$("#precio").val(datos.producto.precio);
				$('#mProd').modal('toggle');
			}			
			else {
				console.log("Error: " + datos.txerr);
			}
		}
	});
}
function deleteProd(id){
	var ide = id;
	swal({
		title: "Esta seguro?",
		text: "Esta a punto de eliminar el producto!",
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
				type:"post", data:{"t":"dProd", "ide":ide},
				url:"./macros.php", dataType:'json',cache:false, success:function(datos,textStatus,jqXHR){
					if (datos.err == 0) {
						swal("Eliminado!", "El producto se ha eliminado satisfactoriamente.", "success");
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
			swal("Cancelado", "Su producto está a salvo :)", "info");
		}
	});
}