var app = angular.module('prodApp', []);
app.controller('prodCtrl', function($scope, $timeout, $q, $log, $http) {
	$scope.init = function() {
		$scope.productos = [];
		var deferred;
		deferred = $q.defer();
		$http.get('api/productos/all').then( function(data){
			var response = data['data'];
			$scope.productos = response;
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
	console.log("productos.html");
}