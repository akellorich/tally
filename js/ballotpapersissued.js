$(document).ready(function(){

	function myTimer() {
		var myVar 
		refreshbutton.focus().trigger("click")
	}

	function myStopFunction() {
	    clearInterval(myVar);
	}
	
	var electionidfield=$("#election"),
	 	locality=$("#locality"),
		countyfield=$("#county"),
		constituencyfield=$("#constituency"),
		wardfield=$("#ward"),
		polingcenterfield=$("#polingcenter"),
		polingstationfield=$("#polingstation"),
		countygroup=$("#countygroup"),
		constituencygroup=$("#constituencygroup"),
		wardgroup=$("#wardgroup"),
		polingcentergroup=$("#polingcentergroup"),
		polingstationgroup=$("#polingstationgroup"),
		refreshbutton=$("#refresh"),
		errors=$("#errors"),

		refreshbutton=$("#refreshballotsissued"),
		resultspane=$("#ballotsissuedresults")
		
	$("#electiongroup").hide()
	
	countygroup.hide()
	constituencygroup.hide()
	wardgroup.hide()
	polingcentergroup.hide()
	polingstationgroup.hide()
	
	getElections(electionidfield)
	getCounties(countyfield)
	
	locality.on("change",function(){
		var option=locality.val()
		switch (option){
			case "global":
				countygroup.hide()
				constituencygroup.hide()
				wardgroup.hide()
				polingcentergroup.hide()
				polingstationgroup.hide()
				constituencysummary.show()
				break;
			case "county":
				countygroup.show()
				constituencygroup.hide()
				wardgroup.hide()
				polingcentergroup.hide()
				polingstationgroup.hide()
				break;				
			case "constituency":
				countygroup.show()
				constituencygroup.show()
				wardgroup.hide()
				polingcentergroup.hide()
				polingstationgroup.hide()
				break;
			case "ward":
				countygroup.show()
				constituencygroup.show()
				wardgroup.show()
				polingcentergroup.hide()
				polingstationgroup.hide()
				break;
			case "polingcenter":
				countygroup.show()
				constituencygroup.show()
				wardgroup.show()
				polingcentergroup.show()
				polingstationgroup.hide()
				break;
			case "polingstation":
				countygroup.show()
				constituencygroup.show()
				wardgroup.show()
				polingcentergroup.show()
				polingstationgroup.show()
				break;
		}
	})
	
	countyfield.on("change", function(){
		getConstituencies(constituencyfield)
	})
	
	constituencyfield.on("change",function(){
		getWards(wardfield)
	})
	
	wardfield.on("change",function(){
		getPolingCenters(polingcenterfield)
	})
	
	polingcenterfield.on("change",function(){
		getPolingStations(polingstationfield)
	})
	
	refreshbutton.on("click",function(){
		electionid=electionidfield.val()
		polingstationid=polingstationfield.val()
		polingcenterid=polingcenterfield.val()
		wardid=wardfield.val()
		constituencyid=constituencyfield.val()
		countyid=countyfield.val()
		var option=locality.val()
		switch (option){
			case "polingstation":
				if(electionid!="" && polingstationid!=""){				
					url="../includes/task.php?request=getballotpapersissuedbypolingstation&electionid="+electionid+"&polingstationid="+polingstationid
					outputResults(url,option)
				}else{
					errors.html("Please select poling station first.")
				}
				break;
			case "polingcenter":
				if(polingcenterid!=""){
					url="../includes/task.php?request=getballotpapersissuedbypolingcenter&electionid="+electionid+"&polingcenterid="+polingcenterid
					outputResults(url,option)
				}else{
					errors.html("Please select poling center first.")
				}
				break;
			case "ward":
				if(wardid!=""){
					url="../includes/task.php?request=getballotpapersissuedbyward&electionid="+electionid+"&wardid="+wardid
					outputResults(url,option)
				}else{
					errors.html("Please select County Assembly Ward first.")
				}
				break;
			case "constituency":
				if(constituencyid!=""){
					url="../includes/task.php?request=getballotpapersissuedbyconstituency&electionid="+electionid+"&constituencyid="+constituencyid
					outputResults(url,option)
				}else{
					errors.html("Please select a constituency first.")
				}
				break;
			case "county":
				if(countyid!=""){
					url="../includes/task.php?request=getballotpapersissuedbycounty&electionid="+electionid+"&countyid="+countyid
					outputResults(url,option)
				}else{
					errors.html("Please select a county first.")
				}
				break;
			case "global":
				url="../includes/task.php?request=getballotpapersissuedglobally&electionid="+electionid
				outputResults(url,option)
				break;
		}
		
	})
	
	function getCounties(selectObject){
		var options,
		url="../includes/task.php?request=getcounties"	
		$.getJSON(url,function(data){
			options="<option value=''>&lt;Choose One&gt;</option>"
			for (var i = 0; i < data.length; i++) {
				options+="<option value='"+data[i].CountyId+"'>"+data[i].CountyName+"</option>"
			}
			selectObject.find("option").remove()
			$(options).appendTo(selectObject)
		})
	}
	
	function getConstituencies(selectObject){
		var options="",
		countyid=countyfield.val()
		url="../includes/task.php?request=getconstituencies&countyid="+countyid
		options="<option value=''>&lt;Choose One&gt;</option>"
		$.getJSON(url,function(data){
			for (var i = 0; i < data.length; i++) {
				options+="<option value='"+data[i].ConstituencyId+"'>"+data[i].ConstituencyName+"</option>"
			}
			selectObject.find("option").remove()
			$(options).appendTo(selectObject)
		})
	}
	
	function getWards(selectObject){
		var options="",
			constituencyid=constituencyfield.val()
		url="../includes/task.php?request=getwards&constituencyid="+constituencyid
		options="<option value=''>&lt;Choose One&gt;</option>"
		$.getJSON(url,function(data){
			for (var i = 0; i < data.length; i++) {
				options+="<option value='"+data[i].WardId+"'>"+data[i].WardName+"</option>"
			}
			selectObject.find("option").remove()
			$(options).appendTo(selectObject)
		})
	}
	
	function getPolingCenters(selectObject){
		var options=""
		wardid=wardfield.val()
		url="../includes/task.php?request=getpolingcenters&wardid="+wardid
		options="<option value=''>&lt;Choose One&gt;</option>"
		$.getJSON(url,function(data){
			for (var i = 0; i < data.length; i++) {
				options+="<option value='"+data[i].PolingCenterId+"'>"+data[i].PolingCenterName+"</option>"
			}
			selectObject.find("option").remove()
			$(options).appendTo(selectObject)
		})
	}
	
	function getPolingStations(selectObject){
		var options=""
		polingcenterid=polingcenterfield.val()
		url="../includes/task.php?request=getpolingstations&polingcenterid="+polingcenterid
		options="<option value=''>&lt;Choose One&gt;</option>"
		$.getJSON(url,function(data){
			for (var i = 0; i < data.length; i++) {
				options+="<option value='"+data[i].PolingStationId+"'>"+data[i].PolingStationName+"</option>"
			}
			selectObject.find("option").remove()
			$(options).appendTo(selectObject)
		})
	}
	
	function getElections(selectObject){
		var url="../includes/task.php?request=getelections"
		console.log(url)
		$.getJSON(url,function(data){
			options=""
			//options="<option value=''>&lt;Choose One&gt;</option>"
			for (var i = 0; i < data.length; i++) {
				options+="<option value='"+data[i].ElectionId+"'>"+data[i].Description+"</option>"
			}
			selectObject.find("option").remove()
			$(options).appendTo(selectObject)
		})
	}
	
	function outputResults(url,locality){
		var table, turnout
		$.getJSON(url,function(data){
			switch(locality){
				case "global":
					table="<table><tr><th>County Code</th><th>County Name</th><th>Booklets</th><th>Ballot Papers</th><th>Registered Voters</th><th>Turn Out</th></tr>"
					options=""
					for (var i = 0; i < data.length; i++) {
						turnout=(data[i].BallotPapers/data[i].registeredvoters)*100
						table+="<tr><td>"+data[i].countycode+"</td><td>"+data[i].countyname+"</td><td>"+numberWithCommas(data[i].Booklets,0)+"</td><td>"+ numberWithCommas(data[i].BallotPapers,0)
						table+="</td><td>"+numberWithCommas(data[i].registeredvoters,0)+"</td><td>"+numberWithCommas(turnout,2)+"</td></tr>"
					}
					break;
				case "county":
					table="<table><tr><th>Constituency Code</th><th>Constituency Name</th><th>Booklets</th><th>Ballot Papers</th><th>Registered Voters</th><th>Turn Out</th></tr>"
					options=""
					for (var i = 0; i < data.length; i++) {
						turnout=(data[i].BallotPapers/data[i].registeredvoters)*100
						table+="<tr><td>"+data[i].constituencycode+"</td><td>"+data[i].constituencyname+"</td><td>"+numberWithCommas(data[i].Booklets,0)+"</td><td>"+ numberWithCommas(data[i].BallotPapers,0)
						table+="</td><td>"+numberWithCommas(data[i].registeredvoters,0)+"</td><td>"+numberWithCommas(turnout,2)+"</td></tr>"
					}
					break;
				case "constituency":
					table="<table><tr><th>Ward Code</th><th>Ward Name</th><th>Booklets</th><th>Ballot Papers</th><th>Registered Voters</th><th>Turn Out</th></tr>"
					options=""
					for (var i = 0; i < data.length; i++) {
						turnout=(data[i].BallotPapers/data[i].registeredvoters)*100
						table+="<tr><td>"+data[i].wardcode+"</td><td>"+data[i].wardname+"</td><td>"+numberWithCommas(data[i].Booklets,0)+"</td><td>"+ numberWithCommas(data[i].BallotPapers,0)
						table+="</td><td>"+numberWithCommas(data[i].registeredvoters,0)+"</td><td>"+numberWithCommas(turnout,2)+"</td></tr>"
					}
					break;
				case "ward":
					table="<table><tr><th>Poling Center Code</th><th>Poling Center Name</th><th>Booklets</th><th>Ballot Papers</th><th>Registered Voters</th><th>Turn Out</th></tr>"
					options=""
					for (var i = 0; i < data.length; i++) {
						turnout=(data[i].BallotPapers/data[i].registeredvoters)*100
						table+="<tr><td>"+data[i].polingcentercode+"</td><td>"+data[i].polingcentername+"</td><td>"+numberWithCommas(data[i].Booklets,0)+"</td><td>"+ numberWithCommas(data[i].BallotPapers,0)
						table+="</td><td>"+numberWithCommas(data[i].registeredvoters,0)+"</td><td>"+numberWithCommas(turnout,2)+"</td></tr>"
					}
					break;
				case "polingcenter":
					table="<table><tr><th>Poling Station Code</th><th>Poling Station Name</th><th>Booklets</th><th>Ballot Papers</th><th>Registered Voters</th><th>Turn Out</th></tr>"
					options=""
					for (var i = 0; i < data.length; i++) {
						turnout=(data[i].BallotPapers/data[i].registeredvoters)*100
						table+="<tr><td>"+data[i].polingstationcode+"</td><td>"+data[i].polingstationname+"</td><td>"+numberWithCommas(data[i].Booklets,0)+"</td><td>"+ numberWithCommas(data[i].BallotPapers,0)
						table+="</td><td>"+numberWithCommas(data[i].registeredvoters,0)+"</td><td>"+numberWithCommas(turnout,2)+"</td></tr>"
					}
					break;
				case "polingstation":
					table="<table><tr><th>Start Serial #</th><th>Pieces</th><th>Attachment</th></tr>"
					options=""
					for (var i = 0; i < data.length; i++) {
						table+="<tr><td>"+data[i].startserialno+"</td><td>"+data[i].pieces+"</td><td><a href='"+data[i].attachment+"'>Download</a></td></tr>"
					}
					break;
			}
			table+="</table>"
			resultspane.html(table)
		})
	
	}
	
	function  numberWithCommas(x,dp) {
		x=parseFloat(x).toFixed(dp)
	    var parts = x.toString().split(".");
	    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	    return parts.join(".");
	}
})


