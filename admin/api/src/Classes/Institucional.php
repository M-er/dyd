<?php
namespace App;
/**
* 
Clase Institucional 
*
**/
class Institucional
{
    protected $id;
    protected $tipo;
    protected $path;
    protected $creado;
    protected $titulo;
    protected $user_iduser;
    protected $habilitado;    
    /**
     * Accept an array of data matching properties of this class
     * and create the class
     *
     * @param array $data The data to use to create
     */
    public function __construct($logger) {$this->logger = $logger;}

    function newInstitucional(array $data){

        $this->id = $data['id'];
        $this->tipo = $data['tipo'];
        $this->path = $data['path'];
        $this->creado = $data['creado'];
        $this->titulo = $data['titulo'];
        $this->habilitado = $data['habilitado'];
        $this->user_iduser = $data['user_iduser'];
    }
    public function get_id(){return $this->id;}
    public function get_tipo(){return $this->tipo;}
    public function get_path(){return $this->path;}
    public function get_creado(){return $this->creado;}
    public function get_titulo(){return $this->titulo;}
    public function get_habilitado(){return $this->habilitado;}
    public function get_user_iduser(){return $this->user_iduser;}

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
}