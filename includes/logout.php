<?php
require_once 'connection.php';
// destroy all logon sessions
$page=$_GET['page'];
session_destroy() ;
if($page=="agent"){
	redirect_to("../agents/index.php");
}else{
	redirect_to("../admin/index.php");
}
?>