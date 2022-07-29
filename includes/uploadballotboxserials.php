<?php
require_once("db.php");
$db=new db();

if(isset($_SESSION['ballotboxserial'])){
	
	$resultid=$_SESSION['ballotboxserial'];
	echo $resultid;
	$sql="call spGetSpoiltBallotBoxFolderDetails ({$resultid})";
	$category=$_SESSION['category'];
	$row=$db->getData($sql)->fetch();	
	
	$countyname=preg_replace("([^\w\s\d\.\-_~,;:\[\]\(\)]|[\.]{2,})", '_', trim(str_replace(" ","_",$row['CountyName'])));
	$constituency=preg_replace("([^\w\s\d\.\-_~,;:\[\]\(\)]|[\.]{2,})", '_', trim(str_replace(" ","_",$row['ConstituencyName'])));
	$ward=preg_replace("([^\w\s\d\.\-_~,;:\[\]\(\)]|[\.]{2,})", '_', trim(str_replace(" ","_",$row['WardName'])));
	$polingcenter=preg_replace("([^\w\s\d\.\-_~,;:\[\]\(\)]|[\.]{2,})", '_', trim(str_replace(" ","_",$row['PolingCenterName'])));
	$polingstationname=preg_replace("([^\w\s\d\.\-_~,;:\[\]\(\)]|[\.]{2,})", '_', trim(str_replace(" ","_",$row['PolingStationName'])));

	// check if county directory exists
	$filename="../attachments/".$countyname;
	if (!file_exists($filename)) {
		mkdir($filename);
	}	
	//echo $filename."<br/>";
	
	//check constituency directory exists
	$filename .="/".$constituency;
	if (!file_exists($filename)) {
		mkdir($filename);
	}
	//echo $filename."<br/>";
	
	//check if ward directory exists
	$filename .="/".$ward;
	if (!file_exists($filename)) {
		mkdir($filename);
	}
	//echo $filename."<br/>";
	
	// Check if poling center directory exists
	$filename .="/".$polingcenter;
	if (!file_exists($filename)) {
		mkdir($filename);
	}
	//echo $filename."<br/>";
	
	// check if polingstation directory exists
	$filename .="/".$polingstationname;
	if (!file_exists($filename)) {
		mkdir($filename);
	}
	
	$filename .="/ballotboxseals";
	if (!file_exists($filename)) {
		mkdir($filename);
	}
	//echo $filename."<br/>";
	
	// check if folders for opening or sealing ballot boxes exists
	$filename .="/".$category;
	if (!file_exists($filename)) {
		mkdir($filename);
	}
	//echo $filename."<br/>";
	
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
			$sql="CALL spAttachBallotBoxSeal ({$resultid},'{$filename}','{$photodescription}')";
			$db->getData($sql);
		}
	}
	
	unset($_SESSION['ballotboxserial']);
	unset($_SESSION['category']);
}
