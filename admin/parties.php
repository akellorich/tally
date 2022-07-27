<?php 
	require_once '../includes/task.php';
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
		
		<div id="partieslist">
			<table id=""></table>
		</div>
		
		<div id="partydetails">
			<form method="post" action="#">
				<label for="partyname">Party Name</label>
				<input type="text" id="partyname" name="partyname">
				<br/>
				<label for="partysymbol">Symbol</label>
				<input type="file" id="partysymbol" name="partysymbol">
				<br/>
				<button type="button" id="save" name="save">Save</button>
				<button type="button" id="clear" name="clear">Clear</button>
				<div id="partylogo">
					
				</div>
			</form>
		</div>
		<div id="loggedinusers">
		
		</div>
	</div>
	
	<div id="footer">
	
	</div>
</body>
<script type="text/javascript" src="../js/jquery-2.2.4.js"></script>
</html>