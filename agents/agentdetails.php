<?php 
	require_once '../includes/connection.php';
?>
<html>
<head>
<title>Agent Registration</title>
<meta name="viewport" content="initial-scale=1, maximum-scale=1">
<link href="../jqueryui/jquery-ui.css" rel="stylesheet">
<link rel="stylesheet" href="../jquerymobile/jquery.mobile-1.4.5.css" >
<link href="../css/listviewsubicon.css" rel="stylesheet">
<link rel="shortcut icon" href="../images/favicon/favicon3.png" />
<link rel="icon" href="../images/favicon/favico3n.png" />
</head>
<body>
	<a id="errorsdisplay" href="#errorlocation" data-rel=dialog></a>
	<div id="header" data-role="page">
	  	<div data-role="header">
	  		<button id="main" data-role="button" data-icon="arrow-l" data-iconpos="notext">Menu</button>
			<h1>Agent Registration</h1>
		</div>
		
		<div id="detail" data-role="content">	
			<div id="electiongroup">
				<input type="hidden" id="agentid" value="0">
				<label for="election">Election</label>
				<select id="election" name="election" data-native-menu="false"></select>
				<br/>
				<label for="position">Position</label>
				<select id="position" name="position" data-native-menu="false"></select>
				<br/>
				<label for="candidate">Candidate</label>
				<select id="candidate" name="candidate" data-native-menu="false"></select>
				<br/>
			</div>				
			<label for="county">County</label>
			<select id="county" name="County" data-native-menu="false"></select>
			<br/>
			<label for="constituency">Constituency</label>
			<select id="constituency" name="constituency" data-native-menu="false"></select>
			<br/>
			<label for="ward">Ward</label>
			<select id="ward" name="ward" data-native-menu="false"></select>
			<br/>
			<label for="polingcenter">Poling Center</label>
			<select id="polingcenter" name="polingcenter" data-native-menu="false"></select>
			<br/>
			<label for="polingstation">Poling Station</label>
			<select id="polingstation" name="polingstation" data-native-menu="false"></select>
			<br/>
			<button type="button" id="next" name="save" data-icon="arrow-r" data-inline="true">Next</button>
		</div>	
	</div>

	<div id="agentdetails" data-role="page">
	  	<div data-role="header">
	  		<button id="back" data-role="button" data-icon="arrow-l" data-iconpos="notext">Menu</button>
			<h1>Agent Details</h1>
		</div>
		
		<div id="detail" data-role="content">	
			<label for="agentname">Agent Name</label>
			<input type="text" id="agentname" name="agentname" data-native-menu="false">
			<br/>
			<label for="agentidno">Agent ID Number</label>
			<input type="text" id="agentidno" name="agentidno">
			<br/>			
			<label for="agentmobile">Agent Mobile Number</label>
			<input type="number" id="agentmobileno" name="agentmobileno">
			
			<div class="ui-grid-a">
				<label for="imagetype">Select Image</label>
        		<div class="ui-block-a">
        			<select id="imagetype" data-native-menu="false">
						<option value=''>&lt;Choose One&gt;</option>
						<option value='passport'>Passport Photo</option>
						<option value='signature'>Specimen Signature</option>
					</select>
				</div>
				
				<div class="ui-block-b">
					<button data-role="button" data-inline="true" id="launchcamera" data-icon="camera" >Attach Photo</button>
				</div>
			</div>
				
			<div id="attachments">
				<ul data-role="listview" data-inset="true" id="attachedform">
					<li id="emptyphotos">Photo not yet attached.</li>
				</ul>
			</div>
			
			<div id="photoinputs">
				<input type="file" accept="image/*" capture="camera" id="attachphoto6">
			</div>
				
			<button type="button" id="saveagent" name="save" data-inline="true">Save</button>
			<button type="button" id="clearagent" name="clear" data-inline="true">Clear</button>
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
<script type="text/javascript" src="../js/agentdetails1.js"></script>
</html>
		