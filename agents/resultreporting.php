<?php 
	require_once '../includes/connection.php';
?>
<html>
<head>
<title>Agent Details</title>
<meta name="viewport" content="initial-scale=1, maximum-scale=1">
<link href="../jqueryui/jquery-ui.css" rel="stylesheet">
<link rel="stylesheet" href="../jquerymobile/jquery.mobile-1.4.5.css" >
<link href="../css/listviewsubicon.css" rel="stylesheet">
<link rel="shortcut icon" href="../images/favicon/favicon2.png" />
<link rel="icon" href="../images/favicon/favicon2.png" />

</head>
<body>
		<a id="errorsdisplay" href="#errorlocation" data-rel=dialog></a>
		<div id="sitedetails" data-role="page">
			<div data-role="header">
				<button id="main" data-role="button" data-icon="arrow-l" data-iconpos="notext">Menu</button>
				<h1>Results Reporting</h1>
			</div>
	
			<div data-role="content">
				  <!--<div id="users">
					<?php 
						echo "Welcome ".$_SESSION['fullname']
					?>
					<ul id="profile">
						<li><a href="#">Change Password</a></li>
						<li><a href="#">Logout</a></li>
						<li><a href="#">Profile</a></li>
					</ul>
					
				</div>
				-->
				
				<div id="errors"></div>
				
				<div id="reportingdetails">
					<div id="electiongroup">
						<label for="election">Election</label>
							<select id="election" name="election" data-native-menu="false"></select>
							<br/>
							<label for="position">Position</label>
							<select id="position" name="position" data-native-menu="false"></select>
							<br/>
					</div>
					
					<div id="candidateslist">
						<ul data-role="listview" id="candidates" data-inset="true"></ul>
					</div>
					<label for="spoiltvotes">Spoilt Votes</label>
					<input type="number" id="spoiltvotes">
					<br/>
					<label for="strayvotes">Stray Votes</label>
					<input type="number" id="strayvotes">
					<br/>
					<button data-role="button" data-inline="true" id="launchcamera" data-icon="camera" >Attach Form</button>
					<!--  <input type="file" id="formupload">-->
					<br>
					<div id="formdetails">
					<ul data-role="listview" data-inset="true" id="attachedform">
						<li id="emptyphotos">Form not yet attached.</li>
					</ul>
					</div>
					<label for="savelocal">
						<input type="checkbox" data-inline="true" id="saveondevice" name="saveondevice">Save on device and upload later
					</label>
					<button  data-role="button" data-inline="true" id="save" name="save" >Save</button>
					<button data-role="button" data-inline="true" id="clear" name="clear">Clear</button>
					
				</div>
				<div id="photoinputs">
					<input type="file" accept="image/*" capture="camera" id="attachphoto">
				</div>
			</div>
	</div>
	<!-- Error dialogue -->
	<div id="errorlocation" data-role="page">
		<div data-role="header">
			<h1>Notification</h1>
		</div>
		
		<div data-role="content">
			<div id="errormessage">
			
			</div>
			
			<div style="text-align: center">
				<a href="button" id="closeerror"  data-inline="true" data-role="button">Close</a>
			</div>
			
		</div>
	</div>
</body>
<!--  <script type="text/javascript" src="../js/jquery-2.2.4.js"></script> -->
<script type="text/javascript" src="../js/jquery-1.12.5.js"></script>
<script src="../jqueryui/jquery-ui.js"></script>
<script type="text/javascript" src="../jquerymobile/jquery.mobile-1.4.5.js"></script>
<script type="text/javascript" src="../js/resultsreporting.js"></script>
<script type="text/javascript" src="../js/functions.js"></script>
</html>