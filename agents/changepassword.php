<html>
<head>
<title>Agent Login</title>
<meta name="viewport" content="initial-scale=1, maximum-scale=1">
<link href="../jqueryui/jquery-ui.css" rel="stylesheet">
<link rel="stylesheet" href="../jquerymobile/jquery.mobile-1.4.5.css" >
<link href="../css/listviewsubicon.css" rel="stylesheet">
</head>
</head>
<body>
	<div data-role="page">
		<header data-role="header">
			<h1>Change Password</h1>
		</header>
	
		<div id="detail" data-role="content">
		
			<div id="errors"></div>
			<br/>
			<div id="changepassworddetails">
				<label for="oldpassword">Old Password:</label>
				<input type="password" id="oldpassword" name="oldpassword">
				<br>
				<label for="newpassword">New Password:</label>
				<input type="password" id="newpassword" name="newpassword">
				<br>
				<label for="confirmnewpassword">Confirm New Password:</label>
				<input type="password" id="confirmnewpassword" name="confirmnewpassword">
				<br>
				<button type="button" id="changepassword">Change password</button>
			</div>
		</div>
	</div>
</body>
<script type="text/javascript" src="../js/jquery-1.12.5.js"></script>
<script src="../jqueryui/jquery-ui.js"></script>
<script type="text/javascript" src="../jquerymobile/jquery.mobile-1.4.5.js"></script>
<script type="text/javascript" src="../js/resultsreporting.js"></script>
<script type="text/javascript" src="../js/changeagentpassword.js"></script>

</html>