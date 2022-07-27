$(document).ready(function(){	
	var electionfield=$("#election"),
		electiongroup=$("#electiongroup"),
		positionfield=$("#position"),
		candidatefield=$("#candidate"),
		countyfield=$("#county"),
		constituencyfield=$("#constituency"),
		wardfield=$("#ward"),
		polingcenterfield=$("#polingcenter"),
		polingstationfield=$("#polingstation"),
		candidatenamefield=$("#candidate"),
		mobilefield=$("#mobile"),
		saveagent=$("#saveagent"),
		clearagent=$("#clearagent"),
		agentnamefield=$("#agentname"),
		agentidnofield=$("#agentidno"),
		agentmobilefield=$("#agentmobileno"),
		errors=$("#errors"),
		agentidfield=$("#agentid"),
		options='',
		nextbutton=$("#next"),
		backbutton=$("#back"),
		descriptionfield=$("#imagetype"),
		launchcamera=$("#launchcamera"),
		attachphoto=$("#attachphoto6"),
		attachedform=$("#attachedform"),
		agentidnoexists=false,
		agentmobilenoexists=false,
		savemessage='',
		errors='',
		closeerror=$("#closeerror"),
		mainmenu=$("#main"),
		attachedphotos=[]
		
	formdata = new FormData()
	
	$("#photoinputs").hide()		
	
			
	mainmenu.on("click",function(){
		window.location.href="main.php"
	})	
	
	nextbutton.on("click",function(){
		// check for blank fields
		var constituency, county, ward,polingstation, candidate, polingcenter,polingstation, errors=""
		county=countyfield.val()
		constituency=constituencyfield.val()
		ward=wardfield.val()
		polingcenter=polingcenterfield.val()
		polingstation=polingstationfield.val()
		if(county===""){
			errors="Please select county first."
		}else if(constituency===""){
			errors="Please select constituency first."
		}else if(ward===""){
			errors="Please select ward first."
		}else if(polingcenter===""){
			errors="Please select poling center first."
		}else if(polingstation===""){
			errors="Please select poling station first."
		}
		
		if(errors!=""){
			errors="<p>"+errors+"</p>"
			displayError(errors)
		}
		else{
			window.location.href="agentdetails.php#agentdetails"
		}
	})
	
	backbutton.on("click",function(){
		window.location.href="agentdetails.php#header"
	})
	
	electiongroup.hide()
	
	getElections().done(function(){
		getElectioncandidates()
	})
	
	// get elections
	function getElections(){
		var dfd=new $.Deferred()
		var url="../includes/task.php?request=getelections"
		$.getJSON(url,function(data){
			for (var i = 0; i < data.length; i++) {
				options+="<option value='"+data[i].ElectionId+"'>"+data[i].Description+"</option>"
			}
			electionfield.find("option").remove()
			$(options).appendTo(electionfield)
			electionfield.selectmenu("refresh",true)
			dfd.resolve()
		})
		return dfd.promise()
	}

	// get positions
	url="../includes/task.php?request=getpositions"
	$.getJSON(url,function(data){
		options=''
		//options="<option value=''>&lt;Choose One&gt;</option>"
		for (var i = 0; i < data.length; i++) {
			options+="<option value='"+data[i].PositionId+"'>"+data[i].PositionName+"</option>"
		}
		positionfield.find("option").remove()
		$(options).appendTo(positionfield)
		positionfield.selectmenu("refresh",true)
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
		countyfield.selectmenu("refresh",true)
	})

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
			constituencyfield.selectmenu("refresh",true)
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
			wardfield.selectmenu("refresh",true)
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
			polingcenterfield.selectmenu("refresh",true)
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
			polingstationfield.selectmenu("refresh",true)
		})
	})
	
	function getElectioncandidates(){
		// get candidates for the election
		electionid=electionfield.val()
		var options=""
		url="../includes/task.php?request=getelectioncandidates&electionid="+electionid
		$.getJSON(url,function(data){
			for (var i = 0; i < data.length; i++) {
				options+="<option value='"+data[i].CandidateId+"'>"+data[i].CandidateName+"</option>"
			}
			candidatefield.find("option").remove()
			$(options).appendTo(candidatefield)
			candidatefield.selectmenu("refresh",true)
		})
	}
	
	saveagent.on("click",function(){		
		// check for blank fields
		var electionid, position, candidate, polingcenter,agentname, idno, mobile, agentid
		electionid=electionfield.val()
		candidate=candidatefield.val()
		polingcenter=polingstationfield.val()
		agentname=agentnamefield.val()
		agentidno=agentidnofield.val()
		agentmobile=agentmobilefield.val()
		agentid=agentidfield.val()
		errors=''
	
		agentidnoexists=false
		agentmobilenoexists=false
		
		// Check for blank fields
		if(agentname===""){
			errors="Please enter the Agent's name first."
			displayError("<p>"+errors+"</p>")
		}else if(agentidno===""){
			errors="Please provide the Agent's ID number first."
			displayError("<p>"+errors+"</p>")
		}else if(agentmobile===""){
			errors="Please provide the Agent's mobile number first."
			displayError("<p>"+errors+"</p>")
		}else{
			// check that all photos have been attached
			var errors=""
			//console.log(attachedphotos)
			var i=0
			$("#imagetype > option").each(function() {
			    if(attachedphotos.includes($(this).val()+"_"+agentidno)===false){
				    //ignore the blank choose one 
				    if($(this).val()!=""){
 						i++
						errors==""?errors=i+". "+$(this).text():errors+="<br/>"+i+". "+$(this).text()
					}
				 }
			})
			//alert(errors)
			if(errors!=""){
				errors="<p>Please attached the following photos first: <br/>"+errors+"</p>"
				displayError(errors)
			}else{
				// check for ID number
				checkAgentIdNo(agentidno).done(function(){
						// check mobile
						checkAgentMobileNo(agentmobile).done(function(){
							// save agent details
							saveAgent(agentid,electionid,candidate,agentname,agentidno,agentmobile,polingcenter).done(function(){
								// upload photos
								uploadAttachments()
							})
						})
				})
			}
			
		}
	
	})
	
	launchcamera.on("click",function(){
		var description=descriptionfield.val(),
		idno=agentidnofield.val()
		if(description!="" && idno!=""){
			// check if photo has been added to the list
			filedescription=descriptionfield.val()+"_"+agentidnofield.val()
			if(attachedphotos.includes(filedescription)){
				var errors="<p>You have already attached photo for "+descriptionfield.val()+"</p>"
				displayError(errors)
			}else{
				// add photo to the list
				attachphoto.focus().trigger("click")	
			}
		}else if(description===""){
			errors="<p>Please select description from drop down menu first.</p>"
			displayError(errors)
		}else{
			errors="<p>Please provide the agent's ID number first.</p>"
			displayError(errors)
		}
	})
	
	attachphoto.on("change",function(){
		readURL(this,filedescription)
	})
	
	function readURL(input,filedescription) {
		$("#emptyphotos").remove()
		//process and display in the listview
	    if (input.files && input.files[0]) {
		    var filename=$(input).val()
	        var reader = new FileReader(); 
			var filesize=input.files[0].size
	        filename= filename.split('\\').pop().split('/').pop()
	      	var fileextension=getFileExtension(filename)
	        filename=filedescription+'.'+fileextension	  
	        reader.onload = function (e) {
		        var lvitem
		        lvitem='<li><a href="#">'
			    lvitem+='<img src="'+ e.target.result+'" class="thumbnail" />'
			    lvitem+='<h3>'+ filename +'</h3>'
			    lvitem+='<p class="ui-li-count">'+ Math.round(filesize/1024) +' KB</p>'
			    lvitem+='<p>'+ filedescription +'</p></a></li>'
			    //lvitem+='<a href="#" data-icon="minus" class="delete" id="'+filename+'">Delete</a></li>'
				attachedphotos.push(filedescription)   
		        $(lvitem).appendTo(attachedform)
				attachedform.listview("refresh")
	        }
			reader.readAsDataURL(input.files[0]);
	        // empty the form data and append the new image
	        formdata.append("images[]", input.files[0],filename)
	    }
	}
	
	function displayError(errorString){
		var errorsanchor=$("#errorsdisplay")
		var errorposition=$("#errormessage")			
		errorposition.find("p").remove()
		$(errorString).appendTo(errorposition)
		errorsanchor.click()
	}
	
	function checkAgentIdNo(idno){
		var dfd=$.Deferred();
		url="../includes/task.php?request=checkagentidno&agentidno="+idno
		$.getJSON(url,function(data){
			var results=data.toString()
			console.log(results)
			if(results==="exists"){
				agentidnoexists=true
			}else{
				agentidnoexists=false
			}
			dfd.resolve()
		})
		//console.log(agentidnoexists)
		return dfd.promise()
	}
	
	function checkAgentMobileNo(mobileno){
		var dfd1=$.Deferred()
		url="../includes/task.php?request=checkagentmobileno&agentmobileno="+mobileno
		$.getJSON(url,function(data){
			var results=data.toString()
			if(results==="exists"){
				console.log(results)
				agentmobilenoexists=true
			}else{
				agentmobilenoexists=false
			}
			dfd1.resolve()
		})
		//console.log(agentmobilenoexists)
		return dfd1.promise()
	}
	
	function saveAgent(agentid,electionid,candidate,agentname,agentidno,agentmobile,polingcenter){
		var dfd=$.Deferred()
		if(!agentidnoexists){
			if(!agentmobilenoexists){
				url="../includes/task.php?request=saveagent&agentid="+agentid+"&electionid="+electionid+"&candidate="+candidate+"&agentname="+agentname+"&agentidno="+agentidno+"&agentmobile="+agentmobile+"&polingcenter="+polingcenter
				$.getJSON(url,function(data){
					savemessage=data.toString()
					console.log(savemessage)
				})
			}
		}
		dfd.resolve()
		return dfd.promise()
	}
	
	function uploadAttachments(){
		if(!agentidnoexists){
			if(!agentmobilenoexists){
				// upload photos
				$.ajax({
				    url: "../includes/uploadagentphotos.php",
				    type: "POST",
				    data: formdata,
				    processData: false,
				    contentType: false,
				    success: function (res) {
				    	// pass from cache of save of the agent
				    	errors=savemessage
				    	if(errors==="success"){
				    		errors="Agent save successfully and password sent via SMS"
				    	}else if(errors==="smsfailed"){
				    		errors="Agent saved successfully though password not sent via SMS"
				    	}
					   	errors+="<br/>Image attachments uploaded sucessfuly<br/>"
					   	displayError("<p>"+errors+"</p>")
				    }
				})	
			}else{
				errors="Agent mobile number already in use."
				displayError("<p>"+errors+"</p>")
			}
		}else{
			errors="Agent ID number already in use."
			displayError("<p>"+errors+"</p>")
		}
	}
	
	// close error dialog box
	closeerror.on("click",function(){
		window.history.back()
	})
})