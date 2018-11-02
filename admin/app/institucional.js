var usuarios = [];
var app = angular.module('instApp', ['ngMaterial','youtube-embed']);
app.filter('tipoNombre', [function() {return function(numeroTipo) {var losTipos = ['Documento','Video'];return losTipos[numeroTipo - 1];}}]),
app.filter('userNombre', [function() {return function(numeroTipo) {return usuarios[numeroTipo];}}]),
app.directive('ngFiles', ['$parse', function ($parse) {
	function fn_link(scope, element, attrs) {
		var onChange = $parse(attrs.ngFiles);
		element.on('change', function (event) {
			onChange(scope, { $files: event.target.files });
		});
	};
	return {link: fn_link}
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
		}).catch(function(resultado){
			deferred.reject(resultado);
		});
		return deferred.promise;
	};
	$scope.delete = function(inst){
		var	deferred;
		deferred = $q.defer();
		var idinstitucional = inst;
		$http.delete('api/institucional/delete/'+idinstitucional).then( function(data){
			var response = data['data'];
			$scope.tostado(response['message'],response['status']);
			$scope.init();
		}).catch(function(resultado){
			deferred.reject(resultado);
		});
		return deferred.promise;
	}
	$scope.closeToast = function() {$mdToast.hide();};
	$scope.tostado = function(texto,tipo) {$mdToast.show(	$mdToast.simple().toastClass('md-toast-'+tipo).textContent(texto).position('bottom right').hideDelay(3000));};
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
			$scope.formdata = new FormData();
			$scope.eligeDoc = function(){ $("#fileInput").click();	}
			$scope.getTheFiles = function ($files) {
				angular.forEach($files, function (value, key) {
					$scope.formdata.append(key, value);
				});
			};
			$scope.closeDialog = function() {	$mdDialog.hide();};
			$scope.hide = function() {	$scope.limpiar();$mdDialog.hide();};
			$scope.limpiar = function(){$scope.newinst = {};}
			$scope.cancel = function() {$scope.limpiar();$mdDialog.cancel();};
			$scope.closeToast = function() {$mdToast.hide();};
			$scope.tostado = function(texto,tipo) {
				$mdToast.show($mdToast.simple().toastClass('md-toast-'+tipo).textContent(texto).position('bottom right').hideDelay(3000));
			};
			$scope.guardar = function(){
				var deferred;
				deferred = $q.defer();
				angular.forEach($scope.newinst, function (value, key) {
					$scope.formdata.append(key, value);
				});
				var request = {
					method: 'POST',
					url: 'api/institucional/s',
					data: $scope.formdata,
					headers: {'Content-Type': undefined}
				};
				$http(request).then( function(data){
					var rta = data['data'];
					$scope.tostado(rta['message'], rta['status']);
					$scope.hide();
				}).catch(function(resultado){
					deferred.reject(resultado);
				});
				return deferred.promise;
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
