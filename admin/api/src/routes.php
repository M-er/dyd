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
 /* * * * * Login/Session * * * * */
$app->get('/hello/{name}', "saludador:hola");
$app->get('/session/', "sessionador:getSession");
$app->post('/login/', "logueador:login");
$app->get('/logout/', "logueador:logout");
/* * * * * Usuarios * * * * */
$app->post('/usuario/s', "usuario:save");
$app->get('/usuario/me', "usuario:getMe");
$app->post('/usuario/u', "usuario:update");
$app->get('/usuarios/all', "usuarios:getAll");
$app->delete('/usuarios/delete/{iduser}', "usuario:delete");
/* * * * * Productos * * * * */
$app->get('/productos/all', "productos:getAll");
$app->get('/producto/{{id}}', "producto:getOne");
/* * * * * Acciones * * * * */
$app->get('/acciones/all', "logueador:getAcc");
/* * * * * Institucional * * * * */
$app->get('/institucional/all', "institucionales:getAll");

$app->get('/institucional/ca', "institucionales:construccion");
$app->get('/institucional/aa', "institucionales:agro");
$app->get('/institucional/ma', "institucionales:mineria");
$app->get('/institucional/ea', "institucionales:enfprofesionales");
$app->get('/institucional/pa', "institucionales:protocolos");
$app->get('/institucional/ga', "institucionales:generales");
$app->get('/institucional/sa', "institucionales:servicios");


$app->post('/institucional/s', "institucional:save");
$app->delete('/institucional/delete/{idinstitucional}', "institucional:delete");
