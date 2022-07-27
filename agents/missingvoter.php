<?php 
	require_once '../includes/connection.php';
?>
<html>
<head>
<title>Record Missing Voter</title>
<meta name="viewport" content="initial-scale=1, maximum-scale=1">
<link href="../jqueryui/jquery-ui.css" rel="stylesheet">
<link rel="stylesheet" href="../jquerymobile/jquery.mobile-1.4.5.css" >
<link href="../css/listviewsubicon.css" rel="stylesheet">
<link rel="shortcut icon" href="../images/favicon/favicon3.png" />
<link rel="icon" href="../images/favicon/favico3.png" />
</head>
<body>
	<div id="header" data-role="page">
	  	<div data-role="header">
	  		<button id="main" data-role="button" data-icon="arrow-l" data-iconpos="notext">Menu</button>
			<h1>Missing Voter</h1>
		</div>
		
		<a id="errorsdisplay" href="#errorlocation" data-rel=dialog></a>
		
		<div id="detail" data-role="content">	
			<div id="errors"></div>
			<div id="ballotpaperserials">
				<div id="electiongroup">
					<select name="election" id="election" data-native-menu="false"></select>
				</div>
				<label for="idpassportno">ID / Passport Number:</label>
				<input type="text" id="idpassportno" name="idpassportno">
				<br>
				<label for="fullname">Full Name:</label>
				<input type="text" id="fullname" name="fullname">
				<br>
				<label for="reason">Reason:</label>
				<textarea id="reason" name="reason"></textarea>
				<br>
				<button data-role="button" data-inline="true" id="launchcamera" data-icon="camera" >Attach Photo</button>
				
				<div id="attachments">
					<ul data-role="listview" data-inset="true" id="attachedform">
						<li id="emptyphotos">ID / Passport photo not yet attached.</li>
					</ul>
				</div>

				<div id="photoinputs">
					<input type="file" accept="image/*" capture="camera" id="attachphoto5">
				</div>
				<label for="savelocal">
					<input type="checkbox" data-inline="true" id="saveondevice" name="saveondevice">Save on device and upload later
				</label>
				<button type="button" id="savemissingvoter" data-role="button" data-inline="true">Save</button>
				<button type="button" id="clearmissingvoter" data-role="button" data-inline="true">Clear</button>
			</div>
		</div>	
	</div>	
	
	<!--  Error page hidden by default -->
	<div id="errorlocation" data-role="page">
		<div data-role="header">
			<h1>Notification</h1>
		</div>
		
		<div data-role="content">
			<div id="errormessage"></div>
			
			<div style="text-align: center">
				<a href="button" id="closeerror"  data-inline="true" data-role="button">Close</a>
			</div>
			
		</div>
	</div>
	
</body>
<script type="text/javascript" src="../js/jquery-1.12.5.js"></script>
<script src="../jqueryui/jquery-ui.js"></script>
<script type="text/javascript" src="../jquerymobile/jquery.mobile-1.4.5.js"></script>
<script type="text/javascript" src="../js/functions.js"></script>
<script type="text/javascript" src="../js/missingvoter.js"></script>
</html>