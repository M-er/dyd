var app = angular.module('productosApp', ['ngMaterial']);
app.controller('productosCtrl', function($scope, $q, $http) {
	$scope.productos = [];
	$scope.hayProds = false;
	$scope.init = function() {
		var deferred;
		deferred = $q.defer();
		$http.get('../admin/api/productos/all').then( function(data){
			var response = data['data'];
			$scope.productos = response;
			$scope.hayProds = ($scope.productos.length === 0)?false:true;
							
		}).catch(function(resultado){
			deferred.reject(resultado);
		});
		return deferred.promise;
	};
});
$(document).ready(function() {
	init();
	
});
function init(){
	//loadProd();
}
function loadProd(){
	$.ajax({
		type: "post",
		data: {"t": "tProd"},
		url: "../co/macros.php",
		dataType: 'json',
		cache: false,
		success: function(datos, textStatus, jqXHR) {
			if (datos.err == 0) {
				if(datos.cant){
					$("#rowCarrouselProd").empty();
					var carrItem = document.createElement("div");
					var cantProds = 0; 
					carrItem.classList.add("active");
					var row = document.createElement("div");
					for(var i=0; i<datos.cant; i++){
						if(cantProds == 6){
							row = document.createElement("div");
							cantProds = 0;
							carrItem = document.createElement("div");
						}
						carrItem.classList.add("carousel-item");
						var col = document.createElement("div");  
						var card = document.createElement("div");  
						var a = document.createElement("div");  
						var img = document.createElement("img");  
						var portFolio = document.createElement("div");  
						var h3 = document.createElement("h3"); 
						var hide = document.createElement("div"); 
						var h4 = document.createElement("h4"); 
						var h5 = document.createElement("h4"); 
						row.classList.add("row");
						col.classList.add("col-md-2");
						col.classList.add("col-sm-4");
						h3.innerHTML = datos.productos[i].nombprod;
						h3.classList.add("card-title"); 
						card.classList.add("card"); 
						card.classList.add("card-block"); 
						img.style.width = "100%";
						img.src = "../assets/img/productos/"+datos.productos[i].imgprod;
						hide.classList.add("team-over");
						h4.classList.add("hidden-md-down");
						h5.classList.add("hidden-md-down");
						//h4.innerHTML = "Precio: $"+datos.productos[i].precio;
						h5.innerHTML = datos.productos[i].descripcion;
						hide.append(h5);
						hide.append(h4);
						portFolio.classList.add("card-title-wrap"); 
						portFolio.append(h3);
						//portFolio.append(hide);
						a.append(img);
						a.append(portFolio);
						card.append(a);
						card.append(hide);
						col.append(card);
						row.append(col);
						carrItem.append(row);
						cantProds++;
						$("#rowCarrouselProd").append(carrItem);  
					}
				}
			} else {
				console.log("Error: "+datos.txerr);
			}
		},
	});
}
