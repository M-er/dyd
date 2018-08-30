var app = angular.module('dashApp', ['ngMaterial']);
app.controller('dashCtrl', function($scope, $timeout, $q, $log, $http) {
	$scope.acciones = [];
	$scope.ingresos_tot = 0;
	$scope.ingresos_mes = 0;
	$scope.usuarios = 0;
	var fecha_hoy = new Date();
	var mes_hoy = fecha_hoy.getMonth()+1;//Fix al mes
	$scope.init = function() {
		var deferred;
		deferred = $q.defer();
		$http.get('api/usuarios/all').then(function(resultado){
			$scope.usuarios = resultado['data'].length;
		});
		$http.get('api/acciones/all').then( function(resultado){
			$.each( resultado['data']['acciones'], function( index, value ){
				value = value.replace("dyd-backend-app.INFO:","|");
				value = value.replace("[]","|");
				value = value.split("|");
				var fecha = value[0].replace(/\s|\[|\]/g," ");
				var accion = {"fecha":fecha, "accion":value[1], "usuario":value[2]};
				$scope.acciones.push(accion);
				if(value[1]==" Ingreso "){ 
					var elMes = fecha.split('-')[1];
					if(elMes == mes_hoy){$scope.ingresos_mes++;}
					$scope.ingresos_tot++; 
				}
			});
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
	console.log("dashboard.html");
}