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
		candidateresults=$("#candidateresults"),
		summaryresults=$("#summary"),
		detailedsummary=$("#detailedsummary"),
		summarytable='',
		candidates = [],
		summarybutton=$("#summarybutton"),
		detailedbutton=$("#detailedbutton"),
		
		summarycard=$("#summarycard"),
		detailedcard=$("#detailedcard"),
		
		listurl="",
		refreshlist=$("#refreshlist")
		
	$("#electiongroup").hide()
	
	refreshlist.on("click",function(){

		if(refreshlist.is(":checked")){
			myVar = setInterval(function(){ myTimer() }, 30000);
		}else{
			myStopFunction()
		}
	})
	
	summarycard.show()
	detailedcard.hide()
	
	countygroup.hide()
	constituencygroup.hide()
	wardgroup.hide()
	polingcentergroup.hide()
	polingstationgroup.hide()
	
	getElections(electionidfield)
	getCounties(countyfield)
	
	summarybutton.on("click",function(){
		summarycard.show()
		detailedcard.hide()
	})
	
	detailedbutton.on("click",function(){
		detailedcard.show()
		summarycard.hide()
	})
	
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
		//show summary and hide details
		
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
					summaryurl="../includes/task.php?request=getpolingstationresultsummary&electionid="+electionid+"&polingstationid="+polingstationid
					listurl=""// there is no further summary for this
					candidatesresultsurl="../includes/task.php?request=getcandidatepolingstationresults&electionid="+electionid+"&polingstationid="+polingstationid
					outputResults(summaryurl,false,electionid,"polingstationcode","polingstationname",listurl,candidatesresultsurl)
					
					url="../includes/task.php?request=getpolingstationresultsummary&electionid="+electionid+"&polingstationid="+polingstationid
					outputResults(url,true)
				}else{
					errors.html("Please select poling station first.")
				}
				break;
			case "polingcenter":
				if(polingcenterid!=""){
					summaryurl="../includes/task.php?request=getpolingcenterresultsummary&electionid="+electionid+"&polingcenterid="+polingcenterid
					listurl="../includes/task.php?request=getpolingstationlistresults&electionid="+electionid+"&polingcenterid="+polingcenterid
					candidatesresultsurl="../includes/task.php?request=getcandidatepolingcenterresults&electionid="+electionid+"&polingcenterid="+polingcenterid
					outputResults(summaryurl,true,electionid,"polingstationcode","polingstationname",listurl,candidatesresultsurl)
				}else{
					errors.html("Please select poling center first.")
				}
				break;
			case "ward":
				if(wardid!=""){
					summaryurl="../includes/task.php?request=getwardresultssummary&electionid="+electionid+"&wardid="+wardid
					listurl="../includes/task.php?request=getpolingcenterlistresults&electionid="+electionid+"&wardid="+wardid
					candidatesresultsurl="../includes/task.php?request=getcandidatewardresults&electionid="+electionid+"&wardid="+wardid
					outputResults(summaryurl,false,electionid,"polingcentercode","polingcentername",listurl,candidatesresultsurl)
				}else{
					errors.html("Please select County Assembly Ward first.")
				}
				break;
			case "constituency":
				if(constituencyid!=""){
					summaryurl="../includes/task.php?request=getconstituencyresultssummary&electionid="+electionid+"&constituencyid="+constituencyid
					listurl="../includes/task.php?request=getwardlistresults&electionid="+electionid+"&constituencyid="+constituencyid
					candidatesresultsurl="../includes/task.php?request=getcandidateconstituencyresults&electionid="+electionid+"&constituencyid="+constituencyid
					outputResults(summaryurl,false,electionid,"wardcode","wardname",listurl,candidatesresultsurl)
				}else{
					errors.html("Please select a constituency first.")
				}
				break;
			case "county":
				if(countyid!=""){
					summaryurl="../includes/task.php?request=getcountyresultssummary&electionid="+electionid+"&countyid="+countyid
					listurl="../includes/task.php?request=getconstituencylistresults&electionid="+electionid+"&countyid="+countyid
					candidatesresultsurl="../includes/task.php?request=getcandidatecountyresults&electionid="+electionid+"&countyid="+countyid
					outputResults(summaryurl,false,electionid,"constituencycode","constituencyname",listurl,candidatesresultsurl)
				}else{
					errors.html("Please select a county first.")
				}
				break;
			case "global":
				summaryurl="../includes/task.php?request=getglobalresultssummary&electionid="+electionid
				listurl="../includes/task.php?request=getcountylistresults&electionid="+electionid
				candidatesresultsurl="../includes/task.php?request=getcandidateglobalresults&electionid="+electionid
				outputResults(summaryurl,false,electionid,"countycode","countyname",listurl,candidatesresultsurl)
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
	
	function outputResults(url,addAttachment=false,electionid=1, codefield,namefield,listurl,candidatesresultsurl){
		//console.log(addAttachment)
		$.getJSON(url,function(data){
			if(data.length==0){
				summaryresults.find("table").remove()
				candidateresults.find("table").remove()
				$("<p>Sorry. Data not trasmitted as yet.</p>").appendTo(candidateresults)
			}else{
				var turnout=(data[0].validvotes/data[0].registeredvoters)*100
				// display summaries
				var summarytable="<table border='1'><tr><td>Registered</td><td>Valid</td><td>Spoilt</td><td>Stray</td><td>Turnout (%)</td><td>Transmission Rate</td><td>Transmission (%)</td></tr>"

				summarytable+="<tr><td>"+ numberWithCommas(data[0].registeredvoters,0)+"</td><td>"+ numberWithCommas(data[0].validvotes,0)+"</td><td>"+ numberWithCommas(data[0].spoiltvotes,0)+"</td></td>"
				summarytable+="<td>"+ numberWithCommas(data[0].strayvotes,0)+"</td><td>"+ numberWithCommas(turnout,2)+"%</td><td>"+ numberWithCommas(data[0].submittedpollingstations,0)+" of "+ numberWithCommas(data[0].totalpolingstations,0)
				summarytable+="</td><td>"+ numberWithCommas(data[0].percentagetransmitted,2)+"</td></tr></table>"
				summaryresults.find("table").remove()
				$(summarytable).appendTo(summaryresults)
			
				//console.log(summarytable)
				getCandidates(electionid,summarytable).done(function(){
					 getSummary(electionid,codefield,namefield,listurl,addAttachment)
				})
				
				// get candidate results
				getCandidateResults(candidatesresultsurl)
			}
			
		})
	}
	
	function getSummary(electionid, codefield, namefield,listurl,addAttachment=false){
		getCandidates(electionid).done(	function (){
				var j, s,  len = candidates.length;
				summarytable="<table id='detailedsummary' border='1'><tr><td>"+codefield+"</td><td>"+namefield+"</td><td>Registered Voters</td><td>Valid Votes</td><td>Voter Turnout</td><td>Submitted Stations</td>"
				// loop through all the candidates and add them as columns in the summary
				for (j=0; j<len; ++j) {
					    summarytable+="<td>"+candidates[j]+"</td>"
					}
				summarytable+="</tr>"
					
				url=listurl
				//console.log(url)
				var txrate
				$.getJSON(url,function(data){
					for (var i = 0; i < data.length; ++i) {
						txrate=(data[i].submittedpollingstations/data[i].totalpolingstations)*100
						summarytable+="<tr><td>"+read_prop(data[i],codefield)+"</td><td>"+read_prop(data[i],namefield)+"</td><td>"+ numberWithCommas(data[i].registeredvoters,0)+"</td><td>"+ numberWithCommas(data[i].validvotes,0)+"</td>"
						summarytable+="<td>"+ numberWithCommas(data[i].turnout,2)+"</td><td>"+  numberWithCommas(data[i].submittedpollingstations,0)+" of "+ numberWithCommas(data[i].totalpolingstations,0)+ " ("+ numberWithCommas(txrate,2)+" %)</td>"
						// loop through all the candidate array element and add the candidates votes
						
						for (j=0; j<len; ++j) {
						    s = candidates[j];
						    console.log(s)
						    summarytable+="<td>"+read_prop(data[i],s)+"</td>"
						}
						if(addAttachment==true){
							summarytable+="<td><a href='"+data[i].attachment+"'>Download Form</a></td>"
						}
						summarytable+"</tr>"
					}
					
					summarytable+="</table> <br/>"
					 // push the data to the table
					detailedsummary.html(summarytable)
					//console.log(constituencysummarytable)
				})
			}
		)
	}
	
	function getCandidates(electionid,tablename){
		var dfd=new $.Deferred()
		// empty the array
		candidates.length=0;
		// get the candidates
		url="../includes/task.php?request=getelectioncandidates&electionid="+electionid
		//console.log(url)
		options='<br/><table id="countysummarylist" border="1"><tr><td>County Code</td><td>County Name</td><td>Registered Voters</td><td>Total Valid Votes</td><td>Turn Out</td><td>Transmission Rate</td>'
		$.getJSON(url,function(data){
			for (var i = 0; i < data.length; i++) {
				options+='<td>'+data[i].CandidateName+'</td>'
				candidates.push(data[i].CandidateName)
			}
			options+='</tr></table><br/>'
			tablename=options
			dfd.resolve()
		})
		return dfd.promise()
	}
	
	function read_prop(obj, prop) {
	    return obj[prop];
	}
	
	// display candidate results	
	function getCandidateResults(url){
		$.getJSON(url, function(data){
			candidateresultsdetails="<table id='candidatevotes' border='1'>"
			candidateresultsdetails="<tr><th>Candidate</th><th>Party</th><th>Votes Ganered</th><th>Percentage</th></tr>"
			for (var i = 0; i < data.length; ++i) {
				candidateresultsdetails+="<tr><td><img src='../"+data[i].candidateportrait+"' class'medium'><h1>"+data[i].candidatename+"</h1></td><td><img src='../"+data[i].symbol+"' class='small'><h1>"+data[i].partyname+"</h1></td>"
				candidateresultsdetails+="<td><h2>"+ numberWithCommas(data[i].votes,0)+"</h2></td><td><h2>"+ numberWithCommas(data[i].percentage,2)+"</h2></td></tr>"
			}
			candidateresultsdetails+"</table><br/>"
			candidateresults.html(candidateresultsdetails)
			//console.log(candidateresultsdetails)
		})
		
	}
	
	function  numberWithCommas(x,dp) {
		x=parseFloat(x).toFixed(dp)
	    var parts = x.toString().split(".");
	    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	    return parts.join(".");
	}
})


