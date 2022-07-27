<?php 
	require_once '../includes/connection.php';
?>
<html>
<head>
<title>Agent Login</title>
<meta name="viewport" content="initial-scale=1, maximum-scale=1">
<link href="../jqueryui/jquery-ui.css" rel="stylesheet">
<link rel="stylesheet" href="../jquerymobile/jquery.mobile-1.4.5.css" >
<link href="../css/listviewsubicon.css" rel="stylesheet">
<link rel="shortcut icon" href="../images/favicon/favicon3.png" />
<link rel="icon" href="../images/favicon/favico3n.png" />
<meta name="mobile-web-app-capable" content="yes">
</head>
<body>
	<div id="header" data-role="page">
	  	<div data-role="header">
			<h1>Agent Logon</h1>
		</div>

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
			</div>
		</div>	
		
		 <div data-role="footer" data-position="fixed">
		 	<h4>&copy;2012 All Rights Reserved.</h4>
		</div>
	</div>	
	
</body>
<script type="text/javascript" src="../js/jquery-1.12.5.js"></script>
<script src="../jqueryui/jquery-ui.js"></script>
<script type="text/javascript" src="../jquerymobile/jquery.mobile-1.4.5.js"></script>
<script type="text/javascript" src="../js/resultsreporting.js"></script>
<script type="text/javascript" src="../js/hideaddressbar.js"></script>
<script type="text/javascript" src="../js/agentlogin.js"></script>
</html>