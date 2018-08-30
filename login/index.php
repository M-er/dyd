<!DOCTYPE html>
<html lang="es" ng-app="loginApp">
<head>
	<meta charset="utf-8">
	<title>D&D - S&H</title>
	<meta name="author" content="Matias E. Rivas - Tres Erres Soft">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="keywords" content="Seguridad, higiene, consultoria, Santa Rosa, La Pampa, Argentina">
	<meta name="description" content="Servicios de consultoria, seguridad e higiene en santa rosa la pampa">
	<meta name=”robots” content="NoIndex, Follow">
	<!-- Favicon -->
	<link href="../favicon.png" rel="icon">
	<!-- Google Fonts -->
	<link href="https://fonts.googleapis.com/css?family=Raleway:400,500,700|Roboto:400,900" rel="stylesheet" type="text/css" >
	<link href="https://fonts.googleapis.com/css?family=Poiret+One" rel="stylesheet" type="text/css" >  <!-- Bootstrap CSS File -->
	<link href="../assets/lib/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" >
	<link href="css/toaster.css" rel="stylesheet">
	<!-- ../assets/lib/raries CSS Files -->
	<link href="../assets/lib/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" >
	<!-- Main Stylesheet File -->
	<link href="../assets/css/style.css" rel="stylesheet">
</head>

<body ng-cloak="">
	<header id="header"></header>
	<!-- #header -->

	<section id="login" style="padding-bottom: 33px;" class="login bg-primary block-pd-lg block-bg-overlay" >
		<div id="ng-view" class="container slide-animation" data-ng-view="" ></div>
		<!--/container-->
	</section>
	<footer id="footer"></footer>
</body>
<toaster-container toaster-options="{'time-out': 3000}"></toaster-container>
<!-- Libs -->
<script src="../assets/lib/jquery/jquery.min.js"></script>
<!-- Font Awsome -->
<script src="../assets/lib/fa/js/fontawesome-all.min.js"></script>
<script src="js/angular.min.js"></script>
<script src="js/angular-route.min.js"></script>
<script src="js/angular-animate.min.js" ></script>
<script src="js/toaster.js"></script>
<script src="app/app.js"></script>
<script src="app/data.js"></script>
<script src="app/directives.js"></script>
<script src="app/authCtrl.js"></script>
<script type="text/javascript">
	$(document).ready(function() {
		$("#header").load("../paginas/header.html");
		$("#footer").load("../paginas/footer.html");
	});
</script>
</html>

