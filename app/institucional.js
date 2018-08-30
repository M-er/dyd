var app = angular.module('institucionalApp', ['ngMaterial']);
app.controller('institucionalCtrl', function($scope, $q, $http) {
	$scope.institucional = [];
	$scope.hayInst = false;
	$scope.hayVid = false;	
	$scope.init = function() {
		var deferred;
		deferred = $q.defer();
		$http.get('../admin/api/institucional/all').then( function(resultado){
			var response = resultado['data'];
			$scope.institucional = response;
			$scope.hayInst = ($scope.institucional.length === 0)?false:true;
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
	//loadInst();
	//loadVid();
}

function loadInst(){
	$.ajax({
		type: "post",
		data: {"t": "tInst"},
		url: "../co/macros.php",
		dataType: 'json',
		cache: false,
		success: function(datos, textStatus, jqXHR) {
			if (datos.err == 0) {
				if(datos.cant){
					$("#rowCarrouselInst").empty();  
					var carrItem = document.createElement("div");
					var duplas = 0; 
					carrItem.classList.add("active");
					var row = document.createElement("div");
					for(var i=0; i<datos.cant; i++){
						if(duplas == 2){
							row = document.createElement("div");
							duplas = 0;
							carrItem = document.createElement("div");
						}
						carrItem.classList.add("carousel-item");
						var col = document.createElement("div");  
						var a = document.createElement("a");  
						var font = document.createElement("i");  
						var p = document.createElement("p");  
						font.classList.add("far");
						font.classList.add("fa-file-pdf");
						font.classList.add("fa-3x");
						a.setAttribute("href", "./pdf/"+datos.documentacion[i].pathdocu);
						p.style.marginTop = "5px";
						p.style.marginBottom = "5px";
						p.innerHTML = datos.documentacion[i].vigdocu;
						a.innerHTML = datos.documentacion[i].nombdocu;
						row.classList.add("row");
						col.classList.add("col-sm-6");
						col.append(font);
						col.append(p);
						col.append(a);
						row.append(col);
						carrItem.append(row);
						duplas++;
						$("#rowCarrouselInst").append(carrItem);  
					}
				}
			} else {
				console.log("Error: "+datos.txerr);
			}
		},

	});
}

function loadVid(){
	$.ajax({
		type: "post",
		data: {"t": "tVid"},
		url: "../co/macros.php",
		dataType: 'json',
		cache: false,
		success: function(datos, textStatus, jqXHR) {
			if (datos.err == 0) {
				if(datos.cant){
					$("#vidInst").append(col).empty();
					for(var i=0; i<datos.cant; i++){
						var col = document.createElement("div");  
						col.classList.add("col-sm-4");
						var card = document.createElement("div");  
						card.classList.add("card");
						card.classList.add("card-block");
						var emb = document.createElement("div");  
						emb.classList.add("embed-responsive");
						emb.classList.add("embed-responsive-16by9");
						var iframe = document.createElement("iframe");  
						iframe.classList.add("embed-responsive-item");
						iframe.src = datos.videos[i].urlvideo;
						emb.append(iframe);
						card.append(emb);
						col.append(card);
						$("#vidInst").append(col);  
					}
				}
			} else {
				console.log("Error: "+datos.txerr);
			}
		},

	});
}