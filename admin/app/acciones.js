var usuarios = [];
var app = angular.module('accApp', ['ngMaterial']);
app.filter('userNombre', [function() {
	return function(numeroTipo) {
		console.dir(usuarios);
		return usuarios[numeroTipo];
	}
}]),

app.controller('accCtrl', function($scope, $timeout, $q, $log, $http) {
	$scope.acciones = [];
	$scope.init = function() {
		var deferred;
		deferred = $q.defer();
		$http.get('api/usuarios/all').then(function(resultado){
			$.each( resultado['data'], function( index, value ){
				usuarios[value['iduser']] = value['nombuser'];
			});
		});
		$http.get('api/acciones/all').then( function(resultado){
			$.each( resultado['data']['acciones'], function( index, value ){
				value = value.replace("dyd-backend-app.INFO:","|");
				value = value.replace("[]","|");
				value = value.split("|");
				var fecha = value[0].replace(/\s|\[|\]/g," ");
				var accion = {"fecha":fecha, "accion":value[1], "usuario":value[2]};
				$scope.acciones.push(accion);
			});
			console.dir($scope.acciones);
			// console.log(ingreso+" ingresos al sistema");
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
	console.log("acciones.html");
}
