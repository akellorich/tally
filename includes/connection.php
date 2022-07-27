<?php
	session_start();
	
	function connectDB($returnconnection=0){
		global $conn;
		$serverName = "RICHARD-PC"; //serverName\instanceName
		$connectionInfo = array( "Database"=>'Tally', "UID"=>"admin", "PWD"=>"k@r1bu");
		$conn = sqlsrv_connect( $serverName, $connectionInfo);
		if( $conn ) {
			if($returnconnection==1){
				return $conn;
			}
		}else{
			echo "Connection could not be established.<br />";
			die( print_r(sqlsrv_errors(), true));
		}
	}
	
	function redirect_to( $location = NULL ) {
		if ($location != NULL) {
			header("Location: {$location}");
			exit;
		}
	}
	
?>