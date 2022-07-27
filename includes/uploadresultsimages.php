<?php
// require_once 'connection.php';
require_once("db.php");
require_once 'mail.php';

$db=new db();

if(isset($_SESSION['resultid'])){
	// connectDB();
	$resultid=$_SESSION['resultid'];
	$sql="CALL spGetResultsFolderDetails ({$resultid})";
	$row=$db->getData($sql);
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
	echo $filename."<br/>";
	
	//check constituency folder exists
	$filename .="/".$constituency;
	if (!file_exists($filename)) {
		mkdir($filename);
	}
	echo $filename."<br/>";
	
	//check if ward exists
	$filename .="/".$ward;
	if (!file_exists($filename)) {
		mkdir($filename);
	}
	echo $filename."<br/>";
	
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
	$filename .="/results";
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
			$name = strtolower (str_replace(" ","_",$polingstationname.'_'.$_FILES["images"]["name"][$key]));						
			//rename the file
			$filename=$foldername."/".$name;
			move_uploaded_file( $_FILES["images"]["tmp_name"][$key], $filename);
			// add image link to the database
			$sql="CALL spUpdateFormAttachment ({$resultid},'{$filename}')";
			$db->getData($sql);
			// $db->getData($sql);
			// //echo $sql;
			// $stmt = sqlsrv_query( $conn, $sql );
			// if( $stmt === false) {
			// 	die( print_r(sqlsrv_errors(), true) );
			// }
			// // free statement
			// sqlsrv_free_stmt( $stmt);
		}
	}
	
	/*
	$message;
	$recipients;
	$subject;
	// Email the recipient
	$sql="sp_getPMDetailsForEmail {$_SESSION['pmid']}";
	$stmt = sqlsrv_query( $conn, $sql );
	if ($stmt) {
		do {
			while($row=sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC)){
				$recipients=$row['repemail'];
				$subject ='PM01 Submission Report for ' .$row['sitecode'].' - '.$row['sname'];
				$message='Hello, <br>Here are details of PM01 we have just received.<br><br>';
				$message .='<table><tr><td> Site Code: '.$row['sitecode'].'</td><td>Site Name: '.$row['sname'].'</td></tr>';
				// covert date to string while appending on email
				$message .='<tr><td>PM Type: '.$row['pmtype'].'</td><td>PM Date: '.$row['pmdate']->format('Y-m-d H:i:s').'</td></tr>';
				$message .='<tr><td>Login: '.$row['logindate']->format('Y-m-d H:i:s').'</td><td>Logout: '.$row['logoutdate']->format('Y-m-d H:i:s').'</td></tr>';
				$message .='<tr><td>Gen Hours: '.$row['genhours'].'</td><td>KPLC Meter Reading: '.$row['kplcreading'].'</td></tr>';
				$message .='<tr><td>Battery Bank: '.$row['batterymodel'].'</td><td>No of Banks: '.$row['batterybanks'].'</td></tr></table>';
			}
		}while (sqlsrv_next_result($stmt));
	}
	
	// get pm01 spares used
	$sql="sp_getPMSparesForEmail {$_SESSION['pmid']}";
	$stmt = sqlsrv_query( $conn, $sql );
	if ($stmt) {
		do {
			while($row=sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC)){
				$message .='<table><tr><td>Service Kit</td><td>Quantity</td></tr>';
				$message .='<tr><td>'.$row['itemname'].'</td><td>'.$row['quantity'].'</td></tr>';
			}
		}while (sqlsrv_next_result($stmt));
	}
	
	// get pm01 alarms tested
	$sql="sp_getPMAlarmsTested {$_SESSION['pmid']}";
	$stmt = sqlsrv_query( $conn, $sql );
	if ($stmt) {
		do {
			while($row=sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC)){
				$message .='<table><tr><td>Alarm Tested</td><td>Alarm Ok</td><td>Remark</td></tr>';
				$message .='<tr><td>'.$row['alarmname'].'</td><td>'.$row['alarmok'].'</td><td>'.$row['remark'].'</td></tr>';
			}
		}while (sqlsrv_next_result($stmt));
	}
	
	
	// get other test conducted
	
	$sql="sp_getPMOtherTestedAlarms {$_SESSION['pmid']}";
	$stmt = sqlsrv_query( $conn, $sql );
	if ($stmt) {
		do {
			while($row=sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC)){
				$message .='<table><tr><td>Test Name</td><td>Test Values</td></tr>';
				$message .='<tr><td>'.$row['testname'].'</td><td>'.$row['testvalue'].'</td></tr>';
			}
		}while (sqlsrv_next_result($stmt));
	}
	
	$emailresponse=sendEmail($recipients, $subject, $message);
	if($emailresponse=='Message has been sent'){
		return "Success";
	}else{
		return $emailresponse;
	}
	//
	//unset($_SESSION['regionname']);
	//unset($_SESSION['sitename']);
	//echo "success";
	 
	 */
	//unset($_SESSION['resultid']);
}
