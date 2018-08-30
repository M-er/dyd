var app = angular.module('usuariosApp', ['ngMaterial', 'ngMessages', 'angularFileUpload']);
app.filter('tipoNombre', [function() {
	return function(numeroTipo) {
		var losTipos = ['Administrador','Usuario simple'];
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
app.directive('ngThumb', ['$window', function($window) {
	var helper = {
		support: !!($window.FileReader && $window.CanvasRenderingContext2D),
		isFile: function(item) {
			return angular.isObject(item) && item instanceof $window.File;
		},
		isImage: function(file) {
			var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
			return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
		}
	};

	return {
		restrict: 'A',
		template: '<img/>',
		link: function($scope, element, attributes) {
			if (!helper.support) return;
			var params = $scope.$eval(attributes.ngThumb);
			if (!helper.isFile(params.file)) return;
			if (!helper.isImage(params.file)) return;
			var canvas = $("#preview");
			var reader = new FileReader();
			reader.onload = onLoadFile;
			$scope.imgFile = reader.readAsDataURL(params.file);
			function onLoadFile(event) {
				var img = new Image();
				img.onload = onLoadImage;
				img.src = event.target.result;
				$("#preview").attr('src', img.src);
				$scope.thumb = img.src;
			}
			function onLoadImage() {
				canvas.attr({'max-width': '10em'});
			}
		}
	};
}]),
app.controller('usuariosCtrl', function($scope, $mdToast, $mdDialog ,$q, $http) {
	$scope.usuarios = [];    
	$scope.status = {};
	$scope.delete = function(user){
		var	deferred;
		deferred = $q.defer();
		var iduser = user;
		$http.delete('api/usuarios/delete/'+iduser).then( function(data){
			var response = data['data'];
			$scope.tostado(response['message'],response['status']);
			$scope.init();
		}).catch(function(resultado){
			deferred.reject(resultado);
		});
		return deferred.promise;
	}
	$scope.init = function() {
		var deferred;
		deferred = $q.defer();
		$http.get('api/usuarios/all').then( function(data){
			$scope.usuarios = [];
			var response = data['data'];
			$scope.usuarios = response;
			//$scope.tostado('Usuarios cargados!');
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
			templateUrl: './template/newuser.tmpl.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose: true,
			fullscreen: false,
			controller: newuserCtrl,
			onRemoving: function (event, removePromise) {
				$scope.init();
			}
		});
		function newuserCtrl($scope, $mdToast, $element,$interval, $q, $http ,$mdDialog, FileUploader){
			$scope.type = [{name:'Administrador', value:1},{name:'Usuario simple', value:2}];
			$scope.newuser = {};
			$scope.uploader = new FileUploader()
			$scope.thumb = './assets/images/users/nopic.png';
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
				$scope.newuser = {};
				$("#preview").attr('src', './assets/images/users/nopic.png');
				$scope.thumb = './assets/images/users/nopic.png';
			}
			$scope.cancel = function() {
				console.log("Cierro con: cancel")
				$mdDialog.cancel();
			};
			$scope.getTheFiles = function ($files) {
				angular.forEach($files, function (value, key) {
					formdata.append(key, value);
				});
			};
			$scope.guardar = function(usuario) {
				var deferred;
				deferred = $q.defer();
				$scope.activated = true;
				$scope.determinateValue = 0;
				$interval(function() {
					$scope.determinateValue += 1;
					if ($scope.determinateValue > 100) {
						$scope.determinateValue = 0;
					}
				}, 100);
				$scope.newuser.file = $("#fileInput").val;
				$http({
					url: 'api/index.php/usuario/s',
					method: "POST",
					data: { 'usuario' : $scope.newuser, 
					'imagen': formdata
				},
				headers: {'Content-Type':'undefined'}
			})
				.then(function(response) {
					console.log("volvio")
				}, 
				function(response) { 

				});

				/*
				$http.post('api/index.php/usuario/s',
					$scope.newuser,
					"headers":[{'Content-Type': undefined}]).then(function(data) {
					$scope.activated = false;
					if(data['data']['status'] === 'success'){
						$scope.closeDialog();
						$scope.tostado("El usuario se ha guardado satisfactoriamente!",'success');
					}else{
						$scope.closeDialog();
						$scope.tostado("Hubo un error al querer crear el usuario, intentelo de nuevo.",'error');
					}
				}).catch(function(resultado){
					deferred.reject(resultado);
					
				});
				return deferred.promise;*/
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
		}
	};
});
$(document).ready(function() {
	init();
});
function init(){
	console.log("Usuarios.html");
}