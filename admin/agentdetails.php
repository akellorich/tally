<?php 
	require_once '../includes/connection.php';
?>
<html>
<head>
<title>Agent Details</title>
</head>
<body>

	<div id="header">
	
	</div>
	
	<div id="detail">
		<div id="users">
			<?php 
				echo "Welcome ".$_SESSION['fullname']
			?>
			<ul id="profile">
				<li><a href="#">Change Password</a></li>
				<li><a href="#">Logout</a></li>
				<li><a href="#">Profile</a></li>
			</ul>
			
		</div>
		
		<div id="errors"></div>
		<div id="agentdetails">
			<input type="hidden" id="agentid" value="0">
			<label for="election">Election</label>
			<select id="election" name="election"></select>
			<br/>
			<label for="position">Position</label>
			<select id="position" name="position"></select>
			<br/>
			<label for="candidate">Candidate</label>
			<select id="candidate" name="candidate"></select>
			<br/>
			<label for="county">County</label>
			<select id="county" name="County"></select>
			<br/>
			<label for="constituency">Constituency</label>
			<select id="constituency" name="constituency"></select>
			<br/>
			<label for="ward">Ward</label>
			<select id="ward" name="ward"></select>
			<br/>
			<label for="polingcenter">Poling Center</label>
			<select id="polingcenter" name="polingcenter"></select>
			<br/>
			<label for="polingstation">Poling Station</label>
			<select id="polingstation" name="polingstation"></select>
			<br/>
			<label for="agentname">Agent Name</label>
			<input type="text" id="agentname" name="agentname">
			<br/>
			<label for="agentidno">Agent ID Number</label>
			<input type="text" id="agentidno" name="agentidno">
			<br/>			
			<label for="agentmobile">Agent Mobile Number</label>
			<input type="text" id="agentmobileno" name="agentmobileno">
			<br/>
			<input type="checkbox" id="continousadd" name="continousadd" value="1">Continous Add
			<br>
			<button type="button" id="save" name="save">Save</button>
			<button type="button" id="clear" name="clear">Clear</button>
			
		</div>
	</div>
	
	<div id="footer">
	
	</div>
</body>
<script type="text/javascript" src="../js/jquery-2.2.4.js"></script>
<script type="text/javascript" src="../js/agentdetails.js"></script>
</html>