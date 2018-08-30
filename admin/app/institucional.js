var usuarios = [];
var app = angular.module('instApp', ['ngMaterial']);
app.filter('tipoNombre', [function() {
	return function(numeroTipo) {
		var losTipos = ['Documentacion','Noticia'];
		return losTipos[numeroTipo - 1];
	}
}]),
app.filter('userNombre', [function() {
	return function(numeroTipo) {
		console.dir(usuarios);
		return usuarios[numeroTipo];
	}
}]),

app.controller('instCtrl', function($scope, $timeout, $q, $log, $http) {
	$scope.institucional = [];
	$scope.init = function() {
		var deferred;
		deferred = $q.defer();
		$http.get('api/usuarios/all').then(function(resultado){
			$.each( resultado['data'], function( index, value ){
				usuarios[value['iduser']] = value['nombuser'];
			});
		});
		$http.get('api/institucional/all').then( function(resultado){
			var response = resultado['data'];
			$scope.institucional = response;
			console.dir($scope.institucional);
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
	console.log("inst.html");
}