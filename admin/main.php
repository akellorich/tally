<?php 
	require_once '../includes/connection.php';
?>
<html>
<head>
<title>Tally Portal Home</title>
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
		
		<div id="navigation">
			<ul id="menu">
				<li><a href="agentdetails.php">Manager Agents</a></li>
				<li><a href="#">Manager Users</a></li>
				<li><a href="#">Elections</a></li>
				<li><a href="#">Results</a></li>
				<li><a href="#">Counties</a></li>
				<li><a href="#">Constituencies</a></li>
				<li><a href="#">Wards</a></li>
				<li><a href="#">Poling Centers</a></li>
				<li><a href="#">Poling Stations</a></li>
				<li><a href="#">Positions</a></li>
				<li><a href="parties.php">Parties</a></li>
			</ul>
		</div>
		
		<div id="loggedinusers">
		
		</div>
	</div>
	
	<div id="footer">
	
	</div>
</body>
<script type="text/javascript" src="../js/jquery-2.2.4.js"></script>
</html>