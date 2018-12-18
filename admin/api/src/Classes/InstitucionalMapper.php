<?php
namespace App;
/**
*
Clase InstitucionalMapper
Es un conjunto de institucionales
*
**/
class InstitucionalMapper extends Mapper
{

	public function construccion( $request,  $response, array $args ) {
		$sess = Session::loggedInfo();
		$db = DBHandler::getHandler();
		$query = "Select * from institucional where categoria like '%construccion%'";
		$resultado = $db->getAllRecords($query);
		return $response->withJson($resultado);
	}
	public function agro( $request,  $response, array $args ) {
		$sess = Session::loggedInfo();
		$db = DBHandler::getHandler();
		$query = "Select * from institucional where categoria like '%agro%'";
		$resultado = $db->getAllRecords($query);
		return $response->withJson($resultado);
	}
	public function mineria( $request,  $response, array $args ) {
		$sess = Session::loggedInfo();
		$db = DBHandler::getHandler();
		$query = "Select * from institucional where categoria like '%mineria%'";
		$resultado = $db->getAllRecords($query);
		return $response->withJson($resultado);
	}
	public function enfprofesionales( $request,  $response, array $args ) {
		$sess = Session::loggedInfo();
		$db = DBHandler::getHandler();
		$query = "Select * from institucional where categoria like '%profesionales%'";
		$resultado = $db->getAllRecords($query);
		return $response->withJson($resultado);
	}
	public function protocolos( $request,  $response, array $args ) {
		$sess = Session::loggedInfo();
		$db = DBHandler::getHandler();
		$query = "Select * from institucional where categoria like '%protocolos%'";
		$resultado = $db->getAllRecords($query);
		return $response->withJson($resultado);
	}
	public function generales( $request,  $response, array $args ) {
		$sess = Session::loggedInfo();
		$db = DBHandler::getHandler();
		$query = "Select * from institucional where categoria like '%generales%'";
		$resultado = $db->getAllRecords($query);
		return $response->withJson($resultado);
	}
	public function servicios( $request,  $response, array $args ) {
		$sess = Session::loggedInfo();
		$db = DBHandler::getHandler();
		$query = "Select * from institucional where categoria like '%servicios%'";
		$resultado = $db->getAllRecords($query);
		return $response->withJson($resultado);
	}
	public function getAll( $request,  $response, array $args ) {
		$sess = Session::loggedInfo();
		$db = DBHandler::getHandler();
		$query = "Select * from institucional";
		$resultado = $db->getAllRecords($query);
		return $response->withJson($resultado);
	}
}
