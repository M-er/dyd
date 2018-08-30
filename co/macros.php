<?php
header("Expires:Fri, Jun 12 1981 08:20:00 GMT");
header("Pragma:no-cache");
header("Cache-Control:no-cache");
header('Content-Type: application/json; charset=UTF-8');
require_once("./conect.php");
session_start();
  $tarea=$_REQUEST['t']; //Parametro T: Tarea a realizar..
  $respuesta=array('err'=>0,'txerr'=>'');
  switch($tarea) {
    case 'tProd':
    $res = $db->query("SELECT idprod, nombprod, imgprod,cantprod,descripcion, nombuser, precio FROM producto LEFT JOIN user ON user_iduser = iduser;");
    $cantProd = $res->num_rows;
    if ($cantProd>=1) {
    	$prod = armarArrayCon($res);
    	$respuesta['productos']=$prod;
    	$respuesta['cant']=$cantProd;
    	$respuesta['err']=0;
    	$respuesta['txerr']="";
    }
    else
    {
    	$respuesta['err']=1;
    	$respuesta['txerr']="Sin productos";
    }
    break;
    
    case 'tInst':
    $res = $db->query("SELECT iddocu, nombdocu, pathdocu, vigdocu, nombuser FROM documentacion LEFT JOIN user ON user_iduser = iduser;");
    $cantDoc = $res->num_rows;
    if ($cantDoc>=1) {
    	$docu = armarArrayCon($res);
  		//while( $noticias[]=$res->fetch_assoc() );
    	$respuesta['documentacion']=$docu;
    	$respuesta['cant']=$cantDoc;
    	$respuesta['err']=0;
    	$respuesta['txerr']="";
    }
    else
    {
    	$respuesta['err']=1;
    	$respuesta['txerr']="Sin documentos";
    }
    break;
    case 'contacto':
    $res= $db->query("SELECT `razonsocial`, `telefono`, `domicilio` FROM `empresa` ;");
    $filas = $res->num_rows;
    $contacto = armarArrayCon($res);
    if ($filas>0) {
      $respuesta['err']=0;
      $respuesta['txerr']="";
      $respuesta['contacto']=$contacto; 
    }
    else
    {
      $respuesta['err']=1;
      $respuesta['txerr']="No hay novedades cargadas";
    }
    break;
    case 'tVid':
    $sql = $db->query("select * from video group by idvideo");
    $cant = $sql->num_rows;
    if ($cant>=1) {
     $videos = armarArrayCon($sql);
     $respuesta['videos']=$videos;
     $respuesta['cant']=$cant;
     $respuesta['err']=0;
     $respuesta['txerr']="";
   }
   else
   {
     $respuesta['err']=1;
     $respuesta['txerr']="Sin videos";
   }
   break;
   case 'mail':
   $name = $_POST["nombre"];
   $email = $_POST["email"];
   $mensaje = $_POST["mensaje"];
   $asunto = $_POST["asunto"];
   $EmailTo = "mattusrivas@gmail.com";
   $Subject = "Formulario de contacto dyd.com.ar";
  // prepare email body text
   $Body .= "Nombre: ";
   $Body .= $name;
   $Body .= "\n";

   $Body .= "Telefono: ";
   $Body .= $phone;
   $Body .= "\n";

   $Body .= "Email: ";
   $Body .= $email;
   $Body .= "\n";

   $Body .= "Mensaje: ";
   $Body .= $message;
   $Body .= "\n";
   $success = mail($EmailTo, $Subject, $Body, "De:".$email);
   if ($success){
    $respuesta['err']=0;
    $respuesta['txerr']="";
  }else{
    $respuesta['err']=1;
    $respuesta['txerr']="El mail no ha sido enviado";
  }
  break;
}   
echo json_encode($respuesta);
function armarArrayCon($resDb){
 $array=array();
 while($datos  = $resDb->fetch_assoc()){
  $array[] = $datos;
}
return $array;
}
function make_thumb($fileType, $src, $dest, $desired_width) {
 if($fileType=="image/png"){
  $source_image = imagecreatefrompng($src);
  $width = imagesx($source_image);
  $height = imagesy($source_image);
  $desired_height = floor($height * ($desired_width / $width));
  $virtual_image = imagecreatetruecolor($desired_width, $desired_height);
  imagecopyresampled($virtual_image, $source_image, 0, 0, 0, 0, $desired_width, $desired_height, $width, $height);
  imagepng($virtual_image, $dest);
}
if($fileType=="image/jpeg"){
  $source_image = imagecreatefromjpeg($src);
  $width = imagesx($source_image);
  $height = imagesy($source_image);
  $desired_height = floor($height * ($desired_width / $width));
  $virtual_image = imagecreatetruecolor($desired_width, $desired_height);
  imagecopyresampled($virtual_image, $source_image, 0, 0, 0, 0, $desired_width, $desired_height, $width, $height);
  imagejpeg($virtual_image, $dest);
}
}
function compress_image($tipo, $source_url, $destination_url, $quality) {
 if ($tipo == 'image/jpeg') $image = imagecreatefromjpeg($source_url);
 elseif ($tipo == 'image/gif') $image = imagecreatefromgif($source_url);
 elseif ($tipo == 'image/png') $image = imagecreatefrompng($source_url);
 imagejpeg($image, $destination_url, $quality);
 return $destination_url;
}
function Logear($cadena) {
 $xx=fopen("../tmp/admin.log.txt","a");
 fwrite($xx,date("Y/m/d H:i:s -").$cadena."\n");
 fclose($xx);
}
/* me devuelve el ultimo id de una tabla determinada */
function ultimoId($db,$id_tabla,$tabla){
 $rs = $db->query("SELECT MAX($id_tabla) AS id FROM $tabla");
 if ($row = $rs->fetch_Row()){
  $id = (int)trim($row[0]);
}
return $id;
}
/*Funcion que determina si hay algun error despues de la última codificación json*/
function errorJsonEncode(){
 switch(json_last_error()) {
  case JSON_ERROR_NONE:
  return ' - Sin errores';
  break;
  case JSON_ERROR_DEPTH:
  return ' - Excedido tamaño máximo de la pila';
  break;
  case JSON_ERROR_STATE_MISMATCH:
  return ' - Desbordamiento de buffer o los modos no coinciden';
  break;
  case JSON_ERROR_CTRL_CHAR:
  return ' - Encontrado carácter de control no esperado';
  break;
  case JSON_ERROR_SYNTAX:
  return ' - Error de sintaxis, JSON mal formado';
  break;
  case JSON_ERROR_UTF8:
  return ' - Caracteres UTF-8 malformados, posiblemente están mal codificados';
  break;
  default:
  return ' - Error desconocido';
  break;
}
}
?>
