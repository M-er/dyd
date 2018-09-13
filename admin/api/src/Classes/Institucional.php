<?php
namespace App;
/**
*
Clase Institucional
*
**/
class Institucional
{


  protected $path;
  protected $tipo;
  protected $titulo;
  protected $habilitado;
  protected $user_iduser;
  protected $idinstitucional;
  /**
  * Accept an array of data matching properties of this class
  * and create the class
  *
  * @param array $data The data to use to create
  */
  public function __construct($logger) {$this->logger = $logger;}

  function newInstitucional(array $data){

    $this->path = $data['path'];
    $this->tipo = $data['tipo'];
    $this->titulo = $data['titulo'];
    $this->habilitado = $data['habilitado'];
    $this->user_iduser = $data['user_iduser'];
    $this->idinstitucional = $data['idinstitucional'];
  }
  public function get_path(){return $this->path;}
  public function get_tipo(){return $this->tipo;}
  public function get_titulo(){return $this->titulo;}
  public function get_habilitado(){return $this->habilitado;}
  public function get_user_iduser(){return $this->user_iduser;}
  public function get_idinstitucional(){return $this->idinstitucional;}

  function getOne( $request,  $response, array $args ){
    $sess = Session::loggedInfo();
    $db = DBHandler::getHandler();
    //Recibir argumento y determinar que es!!!
    $query = "SELECT * FROM institucional WHERE 1";
    $result = $db->getOneRecord($query);
    if($result){
      $rta = $result;
    }
    return $response->withJson($rta);
  }
  public function save($request, $response, array $args){
    $sess = Session::loggedInfo();
    $db = DBHandler::getHandler();
    $sigo = false;
    $inst = $request->getParsedBody();
    $uploadedFiles = $request->getUploadedFiles();
    $condition = "";
    $inst['user_iduser'] = $sess['iduser'];
    $insert = $db->insert("institucional", $inst);
    if($insert){
      $this->logger->addInfo("Creacion de institucional: ".$sess["nombuser"] );
      $rta['status'] = "success";
      $rta['message'] = "El video/documento se ha subido satisfactoriamente";
    }else{
      $rta['status'] = "error";
      $rta['message'] = "Error al subir el video/documento. Revise los campos.";
    }
    return $response->withJson($rta);
  }
}
