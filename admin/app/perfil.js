var app = angular.module('perfilApp', ['ngMaterial']);
app.filter('tipoNombre', [function() {
	return function(numeroTipo) {
		var losTipos = ['Administrador','Usuario Simple'];
		return losTipos[numeroTipo - 1];
	}
}]),

app.directive('ngFiles', ['$parse', function ($parse) {

	function fn_link(scope, element, attrs) {
		var onChange = $parse(attrs.ngFiles);
		element.on('change', function (event) {
			onChange(scope, { $files: event.target.files });
		});
	};

	return {
		link: fn_link
	}
} ]),
app.controller('perfilCtrl', function($scope, $mdToast, $timeout, $q, $log, $http) {
	$scope.usuario = {};
	var formdata = new FormData();
	$scope.eligeImg = function(){
		$("#fileInput").click();
	}
	$scope.init = function() {
		var deferred;
		deferred = $q.defer();
		$http.get('api/usuario/me').then( function(data){
			var response = data['data'];
			$scope.usuario.iduser = response.iduser;
			$scope.usuario.nombuser = response.nombuser;
			$scope.path = "./assets/images/users/"+response.path;
			$scope.usuario.tipouser = response.tipouser;
		}).catch(function(resultado){
			deferred.reject(resultado);
		});
		return deferred.promise;
	};
	$scope.getTheFiles = function ($files) {
		angular.forEach($files, function (value, key) {
			formdata.append(key, value);
		});
	};
	$scope.update = function(){
		var deferred;
		deferred = $q.defer();
		angular.forEach($scope.usuario, function (value, key) {
			formdata.append(key, value);
		});
		var request = {
			method: 'POST',
			url: 'api/usuario/u',
			data: formdata,
			headers: {'Content-Type': undefined}
		};
		$http(request).then( function(data){
			var rta = data['data'];
			$scope.tostado(rta['message'], rta['status']);
			$scope.init();
		}).catch(function(resultado){
			deferred.reject(resultado);
		});
		return deferred.promise;
	}
	$scope.closeToast = function() {
		$mdToast.hide();
	};
	$scope.tostado = function(texto,tipo) {
		$mdToast.show(
			$mdToast.simple()
			.toastClass('md-toast-'+tipo)
			.textContent(texto)
			.position('bottom left')
			.hideDelay(3000)
			);
	};
});
$(document).ready(function() {
	init();
});
function init(){
	console.log("perfil.html");
}
