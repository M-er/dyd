var app = angular.module('serviciosApp', ['ngMaterial']);
app.controller('serviciosCtrl', function($scope, $q, $http) {
	$scope.servicios = [];
	$scope.init = function() {
		$scope.serviciossyh = [
			{'titulo':'Informes de seguridad para habilitacion comercial', 'path':'informes'},
			{'titulo':'Capacitaciones sobre higiene y seguridad laboral', 'path':'capacitaciones'},
			{'titulo':'Planes de seguridad', 'path':'planes'},
			{'titulo':'Planes de evacuación', 'path':'evacuacion'},
			{'titulo':'Incendios', 'path':'incendios'},
			{'titulo':'Iluminación de emergencia', 'path':'emergencia'},
			{'titulo':'Seguridad e higiene laboral', 'path':'syh'},
			{'titulo':'Auditoría de seguridad', 'path':'auditoria'},
		];
		$scope.serviciosing = [
			// {'titulo':'Proyectos eléctricos'},
			{'titulo':'Proyectos eléctricos en baja tensión', 'path':'bajatension'},
			{'titulo':'Proyectos eléctricos en media tensión', 'path':'mediatension'},
			{'titulo':'Acometidas electricas (domiciliarias e industriales)', 'path':'domiciliario'},
			// {'titulo':'Diseño de tableros electricos'},
			{'titulo':'Análisis y estudios de instalaciones eléctricas', 'path':'analisis'},
			{'titulo':'Diseño y medicion de sistemas de puestas a tierras', 'path':'diseño'},
			{'titulo':'Mediciones electricas en general', 'path':'mediciones'},
			{'titulo':'Evaluaciones de calidad de servicios', 'path':'calidad'},
			{'titulo':'Calculos de iluminacion', 'path':'calculos'},
			{'titulo':'Inspecciones técnicas', 'path':'inspecciones'},
		];
		console.dir($scope.serviciossyh);
		console.dir($scope.serviciosing);
	};
});
$(document).ready(function() {
	init();
});
function init(){
	console.log("Servicios");
}
