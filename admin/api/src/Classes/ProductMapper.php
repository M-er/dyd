<?php
namespace App;
/**
* 
Clase ProductMapper 
Es un conjunto de productos 
*
**/
class ProductMapper extends Mapper
{
	public function getAll( $request,  $response, array $args ) {
		$sess = Session::loggedInfo();
		$db = DBHandler::getHandler();
		$query = "Select * from producto";
		$resultado = $db->getAllRecords($query);
		return $response->withJson($resultado);
	}
}