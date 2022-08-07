<?php 
	require_once '../includes/connection.php';
?>
<html>
<head>
<title>Agent Login</title>
<meta name="viewport" content="initial-scale=1, maximum-scale=1">
<link href="../jqueryui/jquery-ui.css" rel="stylesheet">
<link rel="stylesheet" href="../jquerymobile/jquery.mobile-1.4.5.css" >
<link rel="stylesheet" href="../css/all.css">
<link href="../css/listviewsubicon.css" rel="stylesheet">
<link rel="stylesheet" href="../css/bootstrap.css">
<link rel="shortcut icon" href="../images/logo.png" />
<link rel="icon" href="../images/logo.png" />
<meta name="mobile-web-app-capable" content="yes">
</head>
<body>
	<div id="header" data-role="page">
	  	<div data-role="header">
			<h1>Agent Logon</h1>
		</div>
		<a id="passwordresetdisplay" href="#errorlocation" data-rel=dialog></a>
		<div id="detail" data-role="content">	
			
			<div id="errors"></div>
			
			<div id="loginform" data-inline="true">
				<label for="username">Username:</label>
				<input type="text" id="username" name="username">
				<br>
				<label for="password">password:</label>
				<input type="password" id="password" name="password">
				<br>
				<button type="button" id="login" data-role="button" data-inline="true">Logon</button>
				<button type="button" id="clear" data-role="button" data-inline="true">Clear</button>
				<button type="button" id="forgotpassword" data-role="button" data-inline="true">Forgot Password</button>
			</div>
		</div>	
		
		 <div data-role="footer" data-position="fixed">
		 	<h4>&copy;2022 All Rights Reserved.</h4>
		</div>
	</div>	

	<div id="errorlocation" data-role="page">
		<div data-role="header">
			<h1>Password Reset</h1>
		</div>
		
		<div data-role="content">
			<div id="resetpassworderrors"></div>
			<div style="text-align: left">
				<label for="username">Enter your username:</label>
				<input type="text" id="resetpasswordusername" name="resetpasswordusername">
				<button type="button" id="resetpassword" data-role="button" data-inline="true">Reset Password</button>
				<a href="button" id="closeerror"  data-inline="true" data-role="button">Close</a>
			</div>
		</div>
	</div>
	
</body>
<script type="text/javascript" src="../js/jquery-1.12.5.js"></script>
<script src="../jqueryui/jquery-ui.js"></script>
<script type="text/javascript" src="../jquerymobile/jquery.mobile-1.4.5.js"></script>
<script src="../js/bootstrap.js"></script>
<script type="text/javascript" src="../js/resultsreporting.js"></script>
<script type="text/javascript" src="../js/hideaddressbar.js"></script>
<script type="text/javascript" src="../js/agentlogin.js"></script>
</html>