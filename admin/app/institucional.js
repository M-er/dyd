var usuarios = [];
var app = angular.module('instApp', ['ngMaterial']);
app.filter('tipoNombre', [function() {
	return function(numeroTipo) {
		var losTipos = ['Documento','Video'];
		return losTipos[numeroTipo - 1];
	}
}]),
app.filter('userNombre', [function() {
	return function(numeroTipo) {
		console.dir(usuarios);
		return usuarios[numeroTipo];
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
app.controller('instCtrl', function($scope, $mdToast, $mdDialog ,$q, $http) {
	$scope.institucional = [];
	$scope.type = [{name:'Documento', value:1},{name:'Video', value:2}];
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
	$scope.closeToast = function() {
		$mdToast.hide();
	};
	$scope.tostado = function(texto,tipo) {
		$mdToast.show(
			$mdToast.simple()
			.toastClass('md-toast-'+tipo)
			.textContent(texto)
			.position('bottom right')
			.hideDelay(3000)
		);
	};
	$scope.showDialog = function(ev) {
		$mdDialog.show({
			templateUrl: './template/newinst.tmpl.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose: true,
			fullscreen: false,
			controller: newinstCtrl,
			onRemoving: function (event, removePromise) {
				$scope.init();
			}
		});
		function newinstCtrl($scope, $mdToast, $element,$interval, $q, $http ,$mdDialog){
			$scope.type = [{name:'Sin seleccionar', value:0},{name:'Documentación', value:1},{name:'Presentación', value:2}];
			$scope.newinst = {};
			$scope.activated = false;
			$scope.determinateValue = 0;
			var formdata = new FormData();

			$scope.eligeImg = function(){
				$("#fileInput").click();
			}
			$scope.closeDialog = function() {
				console.log("Cierro con: closeDialog")
				$mdDialog.hide();
			}
			$scope.hide = function() {
				console.log("Cierro con: hide")
				$mdDialog.hide();
			};
			$scope.limpiar = function(){
				$scope.newinst = {};
			}
			$scope.cancel = function() {
				console.log("Cierro con: cancel")
				$mdDialog.cancel();
			};
			$scope.closeToast = function() {
				$mdToast.hide();
			};
			$scope.tostado = function(texto,tipo) {
				$mdToast.show(
					$mdToast.simple().toastClass('md-toast-'+tipo).textContent(texto).position('bottom right').hideDelay(3000)
				);
			};
			$scope.eligeImg = function(){
				$("#fileInput").click();
			}
		}
	};
});

$(document).ready(function() {
	init();
});
function init(){
	console.log("inst.html");
}
