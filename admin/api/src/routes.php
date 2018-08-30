<?php

use Slim\Http\Request;
use Slim\Http\Response;
use Slim\Http\UploadedFile;

// Routes
/**
 * Example GET route
 *
 * @param  \Psr\Http\Message\ServerRequestInterface $req  PSR7 request
 * @param  \Psr\Http\Message\ResponseInterface      $res  PSR7 response
 * @param  array                                    $args Route parameters
 *
 * @return \Psr\Http\Message\ResponseInterface
 */
/*
$app->get('/hello/{name}', function ($req, $res, $args) {
	if($this->has('saludador')) {
		$saludador = $this->saludador;
	}
	return $res;
});
*/
/*
$app->get('/hello/{name}', function ($req, $res, $args) {
    $saludador = $this->get('saludador');

    return $res;
});*/
$app->post('/login/', "logueador:login");
$app->post('/usuario/s', "usuario:save");
$app->delete('/usuarios/delete/{iduser}', "usuario:delete");
$app->post('/usuario/u', "usuario:update");
$app->get('/usuario/me', "usuario:getMe");
$app->get('/usuarios/all', "usuarios:getAll");
$app->get('/producto/{{id}}', "producto:getOne");
$app->get('/productos/all', "productos:getAll");
$app->get('/acciones/all', "logueador:getAcc");
$app->get('/hello/{name}', "saludador:hola");
$app->get('/institucional/all', "institucional:getAll");
$app->get('/session/', "sessionador:getSession");
//$app->get('/producto/{{nombre}}', "producto:search");

/*
$app->get('/logout', function() {
	$db = new DBHandler();
	$session = $db->destroySession();
	$response["status"] = "info";
	$response["message"] = "Logged out successfully";
	echoResponse(200, $response);
});
$app->get('/session', function(Request $request, Response $response) {
	$db = new DBHandler();
	$session = $db->getSession();
	if(isset($session['iduser']))
		$response["iduser"] = $session['iduser'];
	if(isset($session['nombuser']))
		$response["nombuser"] = $session['nombuser'];
	$response->getBody()->write($session);
	return $response;
});

$app->get('/usuarios', function (Request $request, Response $response) {
	$this->logger->addInfo("-Lista usuarios-".$user."\n");
	$mapper = new UserMapper($this->db);
	$usuarios = $mapper->getUsers();
	$response->getBody()->write(var_export($usuarios, true));
	return $response;
});

$app->get('/usuario/{id}', function ($request, $response, $args) {
	$usuario_id = (int)$args['id'];
	if($usuario_id == "me"){$usuario_id = 1;}
	$mapper = new UserMapper($this->db);
	$usuario = $mapper->getUserById($usuario_id);
	//$this->logger->addInfo("-Usuario ".$usuario_id."-".$user."\n");
	$rta['id']=$usuario->getId();
	$rta['nombre']=$usuario->getName();
	$rta['tipo']=$usuario->getTipo();
	$rta['path']=$usuario->getPath();
	$rta['psw']=$usuario->getPass();
	return json_encode($rta);
});

$app->get('/acciones', function($request, $response, $args){
	$acc = file_get_contents(__DIR__ .'/logs/dyd.log');
	$dire = __DIR__.'/logs/dyd.log';
	$acciones = [];
	$acciones = explode("\n", $acc);
	if($acciones){
		$rta['err']=0;
		$rta['acc']=$acciones;
		$rta['txerr']="";
	}
	return json_encode($rta);
});
*/