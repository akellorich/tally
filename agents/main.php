<?php 
	require_once '../includes/connection.php';
?>
<html>
<head>
<title>Tally Agent Home</title>
<meta name="viewport" content="initial-scale=1, maximum-scale=1">
<link href="../jqueryui/jquery-ui.css" rel="stylesheet">
<link rel="stylesheet" href="../jquerymobile/jquery.mobile-1.4.5.css" >
<link href="../css/listviewsubicon.css" rel="stylesheet">
<link rel="stylesheet" href="../css/customicons.css" >
<link rel="shortcut icon" href="../images/favicon/favicon2.png" />
<link rel="icon" href="../images/favicon/favicon2.png" />
</head>
<body>
	<div data-role="page">
		<div id="header" data-role="header">
			<button id="main" data-role="button" data-icon="back" data-iconpos="notext">Menu</button>
			<button id="panel" data-role="button" data-icon="bars" data-iconpos="notext">Panel</button>
			<h1>Agents Main Menu</h1>
		</div>
		
		<div id="detail" data-role="content">
			<div id="navigation">
				<ul id="menu" data-role="listview" data-inset="true">
					<li><a href="ballotboxpollingserials.php?option=Open" rel="external">Record Box Polling Serials</a></li>
					<li><a href="ballotpaperserials.php" rel="external">Record Ballot Paper Serials</a></li>
					<li><a href="spoiltballotpapers.php" rel="external">Record Spoilt Ballots</a></li>
					<li><a href="missingvoter.php" rel="external">Record Missing Voter</a></li>
					<li><a href="incidentreporting.php" rel="external">Report Incidence</a></li>
					<li><a href="resultreporting.php" rel="external">Submit Results</a></li>
					<li><a href="ballotboxpollingserials.php?option=Sealed" rel="external">Record Box Sealing Serials</a></li>
					<li><a href="agentdetails.php" rel="external">Register Agent</a></li>
				</ul>
			</div>
		</div>
		<?php  include('panel.php') ?>
	</div>
	
	<!--  Add the panel widget -->
	
</body>
<script type="text/javascript" src="../js/jquery-1.12.5.js"></script>
<script src="../jqueryui/jquery-ui.js"></script>
<script type="text/javascript" src="../jquerymobile/jquery.mobile-1.4.5.js"></script>
<script type="text/javascript" src="../js/agentmain.js"></script>
</html>