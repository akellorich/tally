<?php
// require_once 'connection.php';
require_once("agents.db");
require_once 'mail.php';

$agent=new agent();

if(isset($_SESSION['agentsavedid'])){
	// connectDB();
	$resultid=$_SESSION['agentsavedid'];
	
	$sql="CALL spGetAgentFolderDetails ({$resultid})";
	$row=$agent->getData($sql)->fetch();
	
	// $stmt = sqlsrv_query( $conn, $sql );
	// if ($stmt) {
	// 	$rows = sqlsrv_has_rows( $stmt );
	// 	if ($rows === true){
	// 		if($row=sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC)){
	$countyname=preg_replace("([^\w\s\d\.\-_~,;:\[\]\(\)]|[\.]{2,})", '_', trim(str_replace(" ","_",$row['CountyName'])));
	$constituency=preg_replace("([^\w\s\d\.\-_~,;:\[\]\(\)]|[\.]{2,})", '_', trim(str_replace(" ","_",$row['ConstituencyName'])));
	$ward=preg_replace("([^\w\s\d\.\-_~,;:\[\]\(\)]|[\.]{2,})", '_', trim(str_replace(" ","_",$row['WardName'])));
	$polingcenter=preg_replace("([^\w\s\d\.\-_~,;:\[\]\(\)]|[\.]{2,})", '_', trim(str_replace(" ","_",$row['PolingCenterName'])));
	$polingstationname=preg_replace("([^\w\s\d\.\-_~,;:\[\]\(\)]|[\.]{2,})", '_', trim(str_replace(" ","_",$row['PolingStationName'])));
	// 		}
	// 	}
	// }
	
	// check if county folder exists
	$filename="../attachments/".$countyname;
	if (!file_exists($filename)) {
		mkdir($filename);
	}	
	//echo $filename."<br/>";
	
	//check constituency folder exists
	$filename .="/".$constituency;
	if (!file_exists($filename)) {
		mkdir($filename);
	}
	//echo $filename."<br/>";
	
	//check if ward exists
	$filename .="/".$ward;
	if (!file_exists($filename)) {
		mkdir($filename);
	}
	//echo $filename."<br/>";
	
	// Check if poling center exists
	$filename .="/".$polingcenter;
	if (!file_exists($filename)) {
		mkdir($filename);
	}
	
	// check if polingstation directory exists
	$filename .="/".$polingstationname;
	if (!file_exists($filename)) {
		mkdir($filename);
	}	
	
	$filename .="/agents";
	if (!file_exists($filename)) {
		mkdir($filename);
	}
	
	// upload files to the server
	$foldername=$filename;
	
	foreach ($_FILES["images"]["error"] as $key => $error) {
		if ($error == UPLOAD_ERR_OK){
			//extract the file extension
			$info = new SplFileInfo($_FILES["images"]["name"][$key]);
			$fileextension=$info->getExtension();
			$photodescription=ucwords(str_replace($fileextension,"",$_FILES["images"]["name"][$key]));
			//$photodescription=$_FILES["images"]["name"][$key];
			$name = strtolower (str_replace(" ","_",$_FILES["images"]["name"][$key]));	
			//rename the file
			$filename=$foldername."/".$name;
			move_uploaded_file( $_FILES["images"]["tmp_name"][$key], $filename);
			
			// add image link to the database
			$sql="CALL spSaveAgentImages ({$resultid},'{$filename}','{$photodescription}')";
			$agent->getData($sql);
			// echo $sql;
			// $stmt = sqlsrv_query( $conn, $sql );
			// if( $stmt === false) {
			// 	die( print_r(sqlsrv_errors(), true) );
			// }
			// // free statement
			// sqlsrv_free_stmt( $stmt);
		}
	}
	
	unset($_SESSION['agentsavedid']);
}
