<?php
header("Expires:Fri, Jun 12 1981 08:20:00 GMT");
header("Pragma:no-cache");
header("Cache-Control:no-cache");
header('Content-Type: application/json; charset=UTF-8');
require_once("../co/conect.php");
session_start();
  $tarea=$_REQUEST['t']; //Parametro T: Tarea a realizar..
  $respuesta=array('err'=>0,'txerr'=>'');
  switch($tarea) {
  	case 'logout': 
  	Logear($_SESSION['usuario']."-Salida del sistema");
  	unset($_SESSION['iduser']);
  	unset($_SESSION['usuario']);
  	unset($_SESSION['hayusuario']);
  	$respuesta['err']=0;
  	$respuesta['txerr']="Log Out";
  	break;
  	case 'login':
  	$args=array('u'=>FILTER_SANITIZE_STRING,'p'=>FILTER_SANITIZE_STRING);
  	$po=filter_input_array(INPUT_POST,$args);
  	$usuario=mysqli_real_escape_string($db,$po['u']);
  	$contra=mysqli_real_escape_string($db,$po['p']);
  	$contra = md5($contra);
  	$res = $db->query("SELECT iduser FROM user WHERE nombuser='$usuario' AND contuser='$contra' ;");
  	$filas = $res->num_rows;
  	$elId = $res->fetch_assoc();
  	if ($filas==1) {
  		$_SESSION['iduser']=$elId['iduser'];
  		$_SESSION['usuario']=$usuario;
  		$_SESSION['hayusuario']=1;
  		Logear($_SESSION['usuario']."-Ingreso al sistema");
  		$respuesta['err']=0;
  		$respuesta['txerr']="";
  	}
  	else
  	{
  		$respuesta['err']=1;
  		$respuesta['txerr']="Error de autenticacion";
  	}
  	break;
  	case 'checkuser':
  	if($_SESSION['hayusuario']==1){
  		$usuario=$_SESSION['usuario'];
  		$res = $db->query("SELECT * FROM user WHERE nombuser='$usuario';");
  		$filas = $res->num_rows;
  		if($filas==1){
  			$respuesta['err']=0;
  			$respuesta['txerr']='';
  			$respuesta['iduser']=$_SESSION['iduser'];
  			$respuesta['usuario']=$_SESSION['usuario'];
  		}
  	}
  	else{
  		$respuesta['err']=1;
  		$respuesta['txerr']="No esta logueado";
  		$respuesta['iraPagina']='../index.html';
  	}
  	break;
  	case 'sProd':
  	$nomb = $_POST['nomb'];
  	$desc = $_POST['desc'];
  	$cant = $_POST['cant']*1;
  	$precio = $_POST['precio']*1;
  	$usuario=$_SESSION['iduser'];

  	if(isset($_POST['ide']) && $_POST['ide']!=0){
  		$elProd = $_POST['ide']*1;
  		$update = true;
  	}else{
  		$elProd = ultimoId($db,"idprod","producto")+1;
  		$elProd = $elProd + 1;
  		$update = false;
  	}
  	if(isset($_FILES['file']['name'])){
  		$ds = DIRECTORY_SEPARATOR;
  		$storeFolder = '../assets/img/productos/'.$elProd;
  		$ok = false;
  		$tempFile = $_FILES['file']['tmp_name'];
  		$targetPath = dirname( __FILE__ ).$ds.$storeFolder.$ds;
  		if(!file_exists($targetPath)){ 
  			mkdir($targetPath,0777,true);
  			chmod($targetPath, 0777);
  		}
  		$tipo = $_FILES['file']['type'];
  		$tipo = explode("/",$tipo);
  		$tipo = $tipo[1];
  		$nombreFichero = $elProd.".".$tipo;  
  		$pathFichero = $elProd."/".$nombreFichero;
  		$targetFile = $targetPath.$nombreFichero;
  		$ok = move_uploaded_file($tempFile,$targetFile);
  		if($ok){  
  			$anchoDeseado = 768;
  			$quality = 80;
  			make_thumb($tipo,$targetFile,$targetFile,$anchoDeseado);
  			compress_image($tipo,$targetFile,$targetFile,$quality);
  			$nombreFicheroThumb = $elProd."-thumb".".".$tipo;  
  			$targetFileThumb = $targetPath.$nombreFicheroThumb;
  			$anchoDeseado = 240;
  			make_thumb($tipo,$targetFile,$targetFileThumb,$anchoDeseado); 
  			$pathThumb = $elProd."/".$nombreFicheroThumb;
  		}
  		if($update){
  			$res = $db->query("UPDATE producto SET nombprod='$nomb',cantprod='$cant',imgprod='$pathFichero',user_iduser='$usuario',descripcion='$desc',precio='$precio' WHERE idprod = '$elProd'");
  		}else{
  			$res = $db->query("INSERT INTO producto(idprod, nombprod, imgprod, cantprod, user_iduser,descripcion,precio) VALUES ('$elProd','$nomb', '$pathFichero','$cant','$usuario','$desc', '$precio')");
  		}
  	}else{
  		$res = $db->query("UPDATE producto SET nombprod='$nomb',cantprod='$cant', user_iduser='$usuario',descripcion='$desc',precio='$precio' WHERE idprod = '$elProd'");
  	}
  	if($res){
  		Logear($_SESSION['usuario']."-Subido el producto con id: #".$elProd);
  		$respuesta['err']=0;
  		$respuesta['txerr']='';
  	}else{
  		$respuesta['err']=1;
  		$respuesta['txerr']='Error al querer subir los datos a la base de datos';
  	}
  	break;
  	case 'tProd':
  	if(isset($_SESSION['iduser'])){
  		$user = $_SESSION['iduser'];
  		if(!(isset($_POST['ide']))){
  			$res = $db->query("SELECT idprod, nombprod, imgprod,cantprod , nombuser, precio FROM producto LEFT JOIN user ON user_iduser = iduser;");
  			$cantProd = $res->num_rows;
  			if ($cantProd>=1) {
  				$prod = armarArrayCon($res);
  				$respuesta['productos']=$prod;
  				$respuesta['cant']=$cantProd;
  				$respuesta['err']=0;
  				$respuesta['txerr']="";
  			}else{
  				$respuesta['err']=1;
  				$respuesta['txerr']="Sin productos";
  			}
  		}else{
  			$ide = $_POST['ide']*1;
  			$res = $db->query("SELECT nombprod, imgprod,cantprod, descripcion, precio, us.nombuser FROM producto, (Select nombuser from user where iduser = '$user') us where idprod = '$ide';");
  			$cantProd = $res->num_rows;
  			if ($cantProd>=1) {
  				$prod = $res->fetch_assoc();
  				$respuesta['producto']=$prod;
  				$respuesta['cant']=$cantProd;
  				$respuesta['err']=0;
  				$respuesta['txerr']="";
  			}else{
  				$respuesta['err']=1;
  				$respuesta['txerr']="No se pudo encontrar :(";
  			}
  		}
  	}else{
  		$respuesta['err']=2;
  		$respuesta['txerr']="No esta logueado";
  	}
  	break;
  	case 'dProd':
  	$ide = $_POST['ide'];
  	$rs = $db->query("SELECT imgprod from producto WHERE idprod = '$ide';");
  	$row = $rs->fetch_Row();
  	$path = trim($row[0]);
  	$files = glob("../assets/img/productos/".$path); 
  	foreach($files as $file){ 
  		if(is_file($file))
  			unlink($file); 
  	}
  	$elimino = rmdir("../assets/img/productos/".$ide);
  	if($elimino){
  		$res = $db->query("DELETE FROM producto WHERE idprod = '$ide';");
  		if ($res) {
  			Logear($_SESSION['usuario']."-Eliminado el producto con id: #".$ide);
  			$respuesta['err']=0;
  			$respuesta['txerr']="";
  		}
  		else
  		{
  			$respuesta['err']=2;
  			$respuesta['txerr']="No se pudo quitar el producto de la base de datos";
  		}
  	}else
  	{
  		$respuesta['err']=1;
  		$respuesta['txerr']="No se pudo eliminar el producto";
  	}
  	break;
  	case 'sInst':
  	$vigenciadesde = date("Y-m-d",strtotime($_POST['vigencia']));
  	$nombpdf = $_FILES['file']['name'];
  	$titudocu = $_POST['tit'];
  	$fechpdf = date("Y-m-d");
  	$xx=shell_exec("file --mime-type " . $_FILES['file']['tmp_name']);
  	$tipo=str_replace("\n","",substr($xx,strpos($xx,":")+1));
  	if ($tipo<>" application/pdf") {
  		error_log("ATENCION.. intentan subir un " . $tipo);
  		$respuesta['err']=1;
  		$respuesta['txerr']='El archivo no es de tipo PDF';
  	}
  	$datos['textoarchivo']=shell_exec('pdftotext -layout ' . $_FILES['file']['tmp_name'] . " - ");
  	if ( 0 < $_FILES['file']['error'] ) {
  		$respuesta['err']=1;
  		$respuesta['txerr']='No se pudo guardar el archivo';
  	}
  	else {
  		$elmd5=md5_file($_FILES['file']['tmp_name']);
  		mkdir("../pdf/" . substr($elmd5,0,2));
  		$ok = move_uploaded_file($_FILES['file']['tmp_name'], '../pdf/' . substr($elmd5,0,2)."/".$elmd5.".pdf");
  		$pathPdf=substr($elmd5,0,2)."/{$elmd5}.pdf";
  		if($ok){
  			$ide = ultimoId($db,"iddocu","documentacion") + 1;
  			$usuario=$_SESSION['iduser'];
  			$res = $db->query("INSERT INTO documentacion(iddocu, nombdocu, pathdocu, imgdocu, vigdocu, user_iduser) VALUES ('$ide','$titudocu','$pathPdf',NULL,'$vigenciadesde','$usuario')");
  			$filas = $res->num_rows;
  			if($filas==1){
  				Logear($_SESSION['usuario']."-Subido el documento instucional: #".$ide);
  				$respuesta['err']=0;
  				$respuesta['txerr']='';
  			}
  		}else{
  			$respuesta['err']=1;
  			$respuesta['txerr']='El archivo no pudo ser movido';
  		}
  	}
  	break;
  	case 'tInst':
  	$res = $db->query("SELECT iddocu, nombdocu, pathdocu, imgdocu, vigdocu, nombuser FROM documentacion LEFT JOIN user ON user_iduser = iduser;");
  	$cantDoc = $res->num_rows;
  	if ($cantDoc>=1) {
  		$docu = armarArrayCon($res);
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
  	case 'dInst':
  	$ide = $_POST['ide']; 
  	$rs = $db->query("SELECT pathdocu from documentacion WHERE iddocu = '$ide';");
  	$row = $rs->fetch_Row();
  	$path = trim($row[0]);
  	$elimino = unlink("../pdf/".$path);
  	if($elimino){
  		$res = $db->query("DELETE FROM documentacion WHERE iddocu = '$ide';");
  		if ($res) {
  			Logear($_SESSION['usuario']."-Eliminado el documento institucional con id: #".$ide);
  			$respuesta['err']=0;
  			$respuesta['txerr']="";
  		}
  		else
  		{
  			$respuesta['err']=2;
  			$respuesta['txerr']="No se pudo quitar el documento de la base de datos";
  		}
  	}else
  	{
  		$respuesta['err']=1;
  		$respuesta['txerr']="No se pudo eliminar el archivo";
  	}
  	break;
  	case 'tUser':
  	$res = $db->query("SELECT iduser, nombuser, tipouser, contuser FROM user;");
  	$cantUser = $res->num_rows;
  	if ($cantUser>=1) {
  		$user = armarArrayCon($res);
  		$respuesta['usuarios']=$user;
  		$respuesta['cant']=$cantUser;
  		$respuesta['err']=0;
  		$respuesta['txerr']="";
  	}
  	else
  	{
  		$respuesta['err']=1;
  		$respuesta['txerr']="Sin usuarios";
  	}
  	break;
  	case 'sVid':
  	$tit = $_POST['tit'];
  	$url = $_POST['url'];
  	$iduser = $_SESSION['iduser'];
  	if(isset($tit)&&isset($url)){
  		$ide = ultimoId($db, "idvideo", "video")+1;
  		$sql = $db->query("INSERT INTO video(idvideo, titvideo, urlvideo, user_iduser) VALUES ('$ide','$tit', '$url', '$iduser')");
  		if($sql){
  			Logear($_SESSION['usuario']."-Creado un video con id: #".$ide);
  			$respuesta['err']=0;
  			$respuesta['txerr']="";
  		}
  	}else{
  		$respuesta['err']=1;
  		$respuesta['txerr']="Error al tratar de subir un video";
  	}
  	break;
  	case 'tVid':
  	$sql = $db->query("select video.* , user.nombuser from video left join user on video.user_iduser = user.iduser group by video.idvideo");
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
  	case 'sUser':
  	$user = $_POST['nomb'];
  	$pass = md5($_POST['pass']);
  	$tipo = $_POST['tipo'];
  	if(isset($_POST['ide'])){
  		$ide = $_POST['ide'];
  		$sql = $db->query("UPDATE user SET tipouser='$tipo',nombuser='$user',contuser='$pass' WHERE 1");
  	}else{
  		$ide = ultimoId($db, "iduser", "user")+1;
  		$sql = $db->query("INSERT INTO user(iduser, tipouser, nombuser, contuser) VALUES ('$ide','$tipo','$user','$pass')");
  	}
  	if($sql){
  		Logear($_SESSION['usuario']."-Creado un usuario con id: #".$ide);
  		$respuesta['err']=0;
  		$respuesta['txerr']="";
  	}else{
  		$respuesta['err']=1;
  		$respuesta['txerr']="Error al tratar de crear usuario";
  	}

  	break;
  	case 'tAcc':
  	$acc = file_get_contents("../tmp/admin.log.txt");
  	$filaAcc = [];
  	$filaAcc = explode("\n", $acc);
  	if($acc){
  		$respuesta['err']=0;
  		$respuesta['acc']=$filaAcc;
  		$respuesta['txerr']="";
  	}
  	break;
  	case 'dUser':
  	$ide = $_POST['ide']; 
  	$res = $db->query("DELETE FROM user WHERE iduser = '$ide';");
  	if ($res) {
  		Logear($_SESSION['usuario']."-Eliminado el documento institucional con id: #".$ide);
  		$respuesta['err']=0;
  		$respuesta['txerr']="";
  	}
  	else
  	{
  		$respuesta['err']=2;
  		$respuesta['txerr']="No se pudo quitar el usuario de la base de datos";
  	}
  	break;
  	case 'dVid':
  	$ide = $_POST['ide']; 
  	$res = $db->query("DELETE FROM video WHERE idvideo = '$ide';");
  	if ($res) {
  		Logear($_SESSION['usuario']."-Eliminado el video con id: #".$ide);
  		$respuesta['err']=0;
  		$respuesta['txerr']="";
  	}
  	else
  	{
  		$respuesta['err']=2;
  		$respuesta['txerr']="No se pudo quitar el video de la base de datos";
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
  	//imagejpeg($image, $destination_url, $quality);
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
