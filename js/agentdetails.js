$(document).ready(function(){
	
	var electionfield=$("#election"),
		positionfield=$("#position"),
		candidatefield=$("#candidate"),
		countyfield=$("#county"),
		constituencyfield=$("#constituency"),
		wardfield=$("#ward"),
		polingcenterfield=$("#polingcenter"),
		polingstationfield=$("#polingstation"),
		candidatenamefield=$("#candidate"),
		mobilefield=$("#mobile"),
		save=$("#save"),
		clear=$("#clear"),
		agentnamefield=$("#agentname"),
		agentidnofield=$("#agentidno"),
		agentmobilefield=$("#agentmobileno"),
		errors=$("#errors"),
		agentidfield=$("#agentid")
		
	// get elections
	var url="../includes/task.php?request=getelections"
		//console.log(url)
	$.getJSON(url,function(data){
		var options=""
		console.log(data)
		for (var i = 0; i < data.length; i++) {
			options+="<option value='"+data[i].ElectionId+"'>"+data[i].Description+"</option>"
		}
		electionfield.find("option").remove()
		console.log(options)
		$(options).appendTo(electionfield)
	})
	
	// get positions
	url="../includes/task.php?request=getpositions"
	$.getJSON(url,function(data){
		options="<option value=''>&lt;Choose One&gt;</option>"
		for (var i = 0; i < data.length; i++) {
			options+="<option value='"+data[i].PositionId+"'>"+data[i].PositionName+"</option>"
		}
		positionfield.find("option").remove()
		$(options).appendTo(positionfield)
	})
	
	// get counties
	url="../includes/task.php?request=getcounties"
	$.getJSON(url,function(data){
		options1="<option value=''>&lt;Choose One&gt;</option>"
		for (var i = 0; i < data.length; i++) {
			options1+="<option value='"+data[i].CountyId+"'>"+data[i].CountyName+"</option>"
		}
		countyfield.find("option").remove()
		$(options1).appendTo(countyfield)
	})
	
	// get candidates for the election
	url="../includes/task.php?request=getelectioncandidates&electionid="+electionid
	options="<option value=''>&lt;Choose One&gt;</option>"
	$.getJSON(url,function(data){
		for (var i = 0; i < data.length; i++) {
			options+="<option value='"+data[i].CandidateId+"'>"+data[i].CandidateName+"</option>"
		}
		candidatefield.find("option").remove()
		$(options).appendTo(candidatefield)
	})
	
	// listen to click event of the position field
	/*positionfield.on("change",function(){
		var electionid=electionfield.val(),
			positionid=positionfield.val()
		if(electionid!="" && positionid!=""){
			
		}
	})
	*/
	
	countyfield.on("change",function(){
		options=""
		countyid=countyfield.val()
		url="../includes/task.php?request=getconstituencies&countyid="+countyid
		options="<option value=''>&lt;Choose One&gt;</option>"
		$.getJSON(url,function(data){
			for (var i = 0; i < data.length; i++) {
				options+="<option value='"+data[i].ConstituencyId+"'>"+data[i].ConstituencyName+"</option>"
			}
			constituencyfield.find("option").remove()
			$(options).appendTo(constituencyfield)
		})
	})
	
	constituencyfield.on("change",function(){
		var options=""
		constituencyid=constituencyfield.val()
		url="../includes/task.php?request=getwards&constituencyid="+constituencyid
		options="<option value=''>&lt;Choose One&gt;</option>"
		$.getJSON(url,function(data){
			for (var i = 0; i < data.length; i++) {
				options+="<option value='"+data[i].WardId+"'>"+data[i].WardName+"</option>"
			}
			wardfield.find("option").remove()
			$(options).appendTo(wardfield)
		})
	})
	
	wardfield.on("change",function(){
		var options=""
		wardid=wardfield.val()
		url="../includes/task.php?request=getpolingcenters&wardid="+wardid
		options="<option value=''>&lt;Choose One&gt;</option>"
		$.getJSON(url,function(data){
			for (var i = 0; i < data.length; i++) {
				options+="<option value='"+data[i].PolingCenterId+"'>"+data[i].PolingCenterName+"</option>"
			}
			polingcenterfield.find("option").remove()
			$(options).appendTo(polingcenterfield)
		})
	})
	
	polingcenterfield.on("change",function(data){
		var options=""
		polingcenterid=polingcenterfield.val()
		url="../includes/task.php?request=getpolingstations&polingcenterid="+polingcenterid
		options="<option value=''>&lt;Choose One&gt;</option>"
		$.getJSON(url,function(data){
			for (var i = 0; i < data.length; i++) {
				options+="<option value='"+data[i].PolingStationId+"'>"+data[i].PolingStationName+"</option>"
			}
			polingstationfield.find("option").remove()
			$(options).appendTo(polingstationfield)
		})
	})
	
	save.on("click",function(){
		
		// check for blank fields
		var electionid, position, candidate, polingcenter,agentname, idno, mobile, agentid
		electionid=electionfield.val()
		candidate=candidatefield.val()
		polingcenter=polingstationfield.val()
		agentname=agentnamefield.val()
		agentidno=agentidnofield.val()
		agentmobile=agentmobilefield.val()
		agentid=agentidfield.val()
		
		// check for ID number
		
		// save
		errors.html("Processing. Please wait ...")
		if(electionid!=""  && candidate!="" && polingcenter!="" && agentname !="" && agentidno!="" && agentmobile!=""){
			// disable the save button
			save.prop("disabled",true)
			url="../includes/task.php?request=saveagent&agentid="+agentid+"&electionid="+electionid+"&candidate="+candidate+"&agentname="+agentname+"&agentidno="+agentidno+"&agentmobile="+agentmobile+"&polingcenter="+polingcenter
			$.getJSON(url,function(data){
				var message=data.toString()
				if(message=="success"){
					errors.html("Agent saved succesfully and password sent to their phone.")
				}else if(message=="smsfailed"){
					errors.html("A saved successfully, though password not sent via SMS. Contact Admin")
				}else{
					errors.html("The agent was not saved, please contact Admin")
				}
			})
		}else{
			errors.html("Please enter ALL required fields first.")
		}
		
		//re-enable the save button
		save.prop("disabled",false)
		
	})
})