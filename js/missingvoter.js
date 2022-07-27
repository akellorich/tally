$(document).ready(function(){
	// get url parameters
	var electionfield=$("#election"),
		launchcamera=$("#launchcamera"),
		attachphoto=$("#attachphoto5"),
		attachedform=$("#attachedform"),
		voteridnofield=$("#idpassportno"),
		voternamefield=$("#fullname"),
		reasonfield=$("#reason"),
		idpassportexists=false,
		saveserial=$("#savemissingvoter"),
		menubutton=$("#main"),
		attachedphotos=[],
		missingvoterexists=false,
		closeerror=$("#closeerror")
		
		
	menubutton.on("click",function(){
		window.location.href="main.php"
	})	
	
	$("#electiongroup").hide()	
	
	formdata = new FormData()
	
	$("#photoinputs").hide()
		
	getElections(electionfield)
	
	launchcamera.on("click",function(){
		var electionid=electionfield.val(), 
			idpassportno=voteridnofield.val()
			
		if(idpassportno===""){
			errors="<p>Please provide ID / Passport number first.</p>"
			displayError(errors)
		}else{	
			// check that the ID photo hasn't been added yet
			filedescription="Missing_Voter_"
		 	filedescription+=idpassportno
			if(attachedphotos.includes(filedescription)){
				errors="<p>You have already attached ID photo.</p>"
				displayError(errors)
			}else{
				attachphoto.focus().trigger("click")
			}
		}
	})
	
	attachphoto.on("change",function(){
		var idpassportno=voteridnofield.val()
		filedescription="Missing_Voter_"
	 	filedescription+=idpassportno
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
	
	function getElections(selectObject){
		var url="../includes/task.php?request=getelections"
		$.getJSON(url,function(data){
			options=""
			for (var i = 0; i < data.length; i++) {
				options+="<option value='"+data[i].ElectionId+"'>"+data[i].Description+"</option>"
			}
			selectObject.find("option").remove()
			$(options).appendTo(selectObject)
			//electionfield.val("1")
			selectObject.selectmenu("refresh")
		})
	}
	
	saveserial.on("click",function(){
		// check for blank fields
		electionid=electionfield.val()
		voteridno=voteridnofield.val()	
		votername=voternamefield.val()
		reason=reasonfield.val()
		missingvoterexists=false
		
		if(electionid!='' && voteridno!='' & votername!='' && reason!=''){
			// check if image is attached
			filedescription="Missing_Voter_"
		 	filedescription+=voteridno
			if(attachedphotos.includes(filedescription)){
				// check if the voter exists
				checkMissingVoter(electionid,voteridno).done(function(){
					// save the missing voter
					saveMissingVoter(electionid,voteridno,votername,reason).done(function(){
						uploadPhotos()
					})
				})
			}else{
				errors="<p>Please attached ID photo.</p>"
				displayError(errors)	
			}
			
		}else{
			errors="<p>Please enter ALL fields first.</p>"
			displayError(errors)
		}
	})
	
	function checkMissingVoter(electionid,voteridno){
		var dfd1=$.Deferred()
		url="../includes/task.php?request=checkmissingvoter&electionid="+electionid+"&voteridno="+voteridno
		$.getJSON(url,function(data){
			if(data.toString()==="exists"){
				missingvoterexists=true
			}else{
				missingvoterexists=false
			}
			dfd1.resolve()
		})
		return dfd1.promise()
	}
	

	function saveMissingVoter(electionid,voteridno,votername,reason){	
		var dfd=$.Deferred()
		console.log(missingvoterexists)
		if(!missingvoterexists){			
			url="../includes/task.php?request=missingvoterregistration&electionid="+electionid+"&voteridno="+voteridno+"&votername="+votername+"&reason="+reason
			$.getJSON(url,function(data){
				
			})
		}
		dfd.resolve()
		return dfd.promise()
	}
	
	function uploadPhotos(){
		if(!missingvoterexists){
			// upload photos
			$.ajax({
			    url: "../includes/uploadmissingvoterid.php",
			    type: "POST",
			    data: formdata,
			    processData: false,
			    contentType: false,
			    success: function (res) {	
				   	notice="<p>Success: Missing voter registered successfully<br/>"				  
				  	notice+="ID Image attachment uploaded sucessfuly</p>"
					displayError(notice)
			    }
			})		
		}else{
			errors="<p>Sorry, missing voter already registered.</p>"
			displayError(errors)
		}
	}
	
	// close error dialog box
	closeerror.on("click",function(){
		window.history.back()
	})
})