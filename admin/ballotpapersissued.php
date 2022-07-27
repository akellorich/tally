<?php 
	require_once '../includes/connection.php';
?>
<html>
<head>
<title>Ballot Paper Issued Summary</title>
<style>
</style>
</head>
<body>

	<div id="header">
	
	</div>
	
	<div id="detail">
		<div id="filterpane">
			<div id="errors"></div>
			<div id="electiongroup">
				<label for="election">Election:</label>
				<select id="election" name="election"></select>
			</div>

			<label for="locality">Show results for:</label>
			<select name="locality" id="locality">
				<option value="global">Countrywide</option>
				<option value="county">County</option>
				<option value="constituency">Constituency</option>
				<option value="ward">Ward</option>
				<option value="polingcenter">Poling Center</option>
				<option value="polingstation">Poling Station</option>
			</select>
			
			<div id="countygroup">
				<label for="county">County:</label>
				<select name="county" id="county">
					<option value="">&lt;Choose One&gt;</option>
				</select>
			</div>
			
			<div id="constituencygroup">
				<label for="constituency">Constituency:</label>
				<select name="constituency" id="constituency">
					<option value="">&lt;Choose One&gt;</option>
				</select>
			</div>
			
			<div id="wardgroup">
				<label for="ward">Ward:</label>
				<select name="ward" id="ward">
					<option value="">&lt;Choose One&gt;</option>
				</select>
			</div>
			
			<div id="polingcentergroup">
				<label for="polingcenter">Poling Center:</label>
				<select name="polingcenter" id="polingcenter">
					<option value="">&lt;Choose One&gt;</option>
				</select>
			</div>
			
			<div id="polingstationgroup">
				<label for="polingstation">Poling Station:</label>
				<select name="polingstation" id="polingstation">
					<option value="">&lt;Choose One&gt;</option>
				</select>
			</div>
			<br/>
			<button type="button" id="refreshballotsissued" name="refreshballotsissued">Refresh Results</button>
				
		</div>
		
		<div id="ballotsissuedresults">
			
		</div>
	</div>
	
	<div id="footer">
	
	</div>
</body>
<script type="text/javascript" src="../js/jquery-2.2.4.js"></script>
<script type="text/javascript" src="../js/ballotpapersissued.js"></script>
<script type="text/javascript" src="../js/functions.js"></script>

</html>