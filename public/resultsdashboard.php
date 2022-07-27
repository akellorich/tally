<?php 
	require_once '../includes/connection.php';
?>
<html>
<head>
<title>Agent Details</title>
<!-- <style>
	table {
	    font-family: arial, sans-serif;
	    border-collapse: collapse;
	    width: 100%;
	}
	
	td, th {
	    border: 1px solid #dddddd;
	    text-align: left;
	    padding: 8px;
	}
	
	tr:nth-child(odd) {
	    background-color: #dddddd;
	}
	.small{
		width:80px;
		height:80px;
	}
	.medium{
		width:120px;
		height:120px;
	}
	 	
</style>
-->
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
			
			<!--  
			
			<div id="localitymenu">
				<ul>
					<li id="_global"><a href="#" >Nationwide</a></li>
					<li id="_county"><a href="#" >County</a></li>
					<li id="_constituency"><a href="#" >Constituency</a></li>
					<li id="_ward"><a href="#" >Ward</a></li>
					<li id="_polingcenter"><a href="#" >Poling Center</a></li>
					<li id="_polingcenter"><a href="#" >Poling Station</a></li>
				</ul>
			</div>
			
			-->
			<div id="autorefresh">
				<input type="checkbox" id="refreshlist">Auto refresh results
			</div>
			<br/>
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
			<button type="button" id="refresh" name="refresh">Refresh Results</button>
			<br>
			<button id="summarybutton" name="summarybutton">Summary</button>
			<button id="detailedbutton" name="detailedbutton">Detailed</button>			
		</div>
		
		<div id="summarycard">
			<div id="candidateresults"></div>
			<div id="summary"></div>
		</div>
		
		<div id="detailedcard">
			<div id="detailedsummary"></div>
		</div>
		
	</div>
	
	<div id="footer">
	
	</div>
</body>
<script type="text/javascript" src="../js/jquery-2.2.4.js"></script>
<script type="text/javascript" src="../js/dashboardresults.js"></script>
<script type="text/javascript" src="../js/functions.js"></script>

</html>