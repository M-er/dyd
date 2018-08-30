<?php
namespace App;
/**
* 
Clase Product 
*
**/
class Product
{
    protectd $idprod;
    protectd $nombprod;
    protectd $cantprod;
    protectd $imgprod;
    protectd $user_iduser;
    protectd $descripcion;
    protectd $precio;
    /**
     * Accept an array of data matching properties of this class
     * and create the class
     *
     * @param array $data The data to use to create
     */
    public function __construct($logger) {$this->logger = $logger;}

    function newProduct(array $data){
        $this->precio = $data['precio'];
        $this->imgprod = $data['imgprod'];
        $this->idprod = $data['idProduct'];
        $this->cantprod = $data['cantprod'];
        $this->nombre = $data['nombProduct'];
        $this->descripcion = $data['descripcion'];
        $this->user_iduser = $data['user_iduser'];

    }
    public function get_nombre(){return $this->nombre;}
    public function get_precio(){return $this->precio;}
    public function get_idprod(){return $this->idprod;}
    public function get_imgprod(){return $this->imgprod;}
    public function get_cantprod(){return $this->cantprod;}
    public function get_descripcion(){return $this->descripcion;}
    public function get_user_iduser(){return $this->user_iduser;}

    function getOne( $request,  $response, array $args ){
        $sess = Session::loggedInfo();
        $db = DBHandler::getHandler();
        $query = "Select * from producto where idprod = 1";//OJO verlo bien
        $result = $db->getOneRecord($query);
        if($result){
            $rta = $result;
        }
        return $response->withJson($rta);

    }
}