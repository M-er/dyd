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
	public function getAll( $request,  $response, array $args ) {
		$sess = Session::loggedInfo();
		$db = DBHandler::getHandler();
		$query = "Select * from institucional";
		$resultado = $db->getAllRecords($query);
		return $response->withJson($resultado);
	}
}
