<?php 
	require_once '../includes/connection.php';
?>
<html>
<head>
<title>Ballotpaper Serials</title>
<meta name="viewport" content="initial-scale=1, maximum-scale=1">
<link href="../jqueryui/jquery-ui.css" rel="stylesheet">
<link rel="stylesheet" href="../jquerymobile/jquery.mobile-1.4.5.css" >
<link href="../css/listviewsubicon.css" rel="stylesheet">
<link rel="shortcut icon" href="../images/favicon/favicon3.png" />
<link rel="icon" href="../images/favicon/favicon3.png" />

</head>
<body>
	<div id="header" data-role="page">
	  	<div data-role="header">
	  		<button id="main" data-role="button" data-icon="arrow-l" data-iconpos="notext">Menu</button>
			<h1 id="pageheading">Ballot Box Poll Serials</h1>
		</div>

		<a id="errorsdisplay" href="#errorlocation" data-rel=dialog></a>
		
		<div id="detail" data-role="content">	
			<div id="errors"></div>
			<div id="ballotboxserials">
				<div id="electiongroup">
					<select name="election" id="election" data-native-menu="false"></select>
				</div>
				
				<div class="ui-grid-a">
					<label for="photodescription">Serial Number</label>
	        		<div class="ui-block-a">
	        			
						<input type="number" id="serialno" name="serialno">
					</div>
					
					<div class="ui-block-b">
						<button data-role="button" data-inline="true" id="launchcamera" data-icon="camera" >Attach Photo</button>
					</div>
				</div>
				<div id="percentprocessed"></div>
				<div id="attachments">
					<ul data-role="listview" data-inset="true" id="attachedform">
						<li id="emptyphotos">Photo not yet attached.</li>
					</ul>
				</div>

				<div id="photoinputs">
					<input type="file" accept="image/*" capture="camera" id="attachphoto4">
				</div>
				<label for="savelocal">
					<input type="checkbox" data-inline="true" id="saveondevice" name="saveondevice">Save on device and upload later
				</label>
				<button type="button" id="saveboxpollserial" data-role="button" data-inline="true">Save</button>
				<button type="button" id="clearboxpollserial" data-role="button" data-inline="true">Clear</button>
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
<script type="text/javascript" src="../js/localstorage.js"></script>
<script type="text/javascript" src="../js/jquery-1.12.5.js"></script>
<script src="../jqueryui/jquery-ui.js"></script>
<script type="text/javascript" src="../jquerymobile/jquery.mobile-1.4.5.js"></script>
<!--  <script type="text/javascript" src="../js/resultsreporting.js"></script>-->
<script type="text/javascript" src="../js/ballotboxpollingserials.js"></script>
<script type="text/javascript" src="../js/functions.js"></script>
</html>