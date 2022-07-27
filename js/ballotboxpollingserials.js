$(document).ready(function(){
	// get url parameters
	$.urlParam = function (name) {
	    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	    return results[1] || 0;
	}

	var electionfield=$("#election"),
		launchcamera=$("#launchcamera"),
		attachphoto=$("#attachphoto4"),
		attachedform=$("#attachedform"),
		serialnofield=$("#serialno"),
		sealexists=false,
		sealserialexists="",
		saveserial=$("#saveboxpollserial"),
		category=$.urlParam('option'),
		pageheading=$("#pageheading"),
		menubutton=$("#main"),
		attachedphotos=[],
		saveondevice=$("#saveondevice"),
		closeerror=$("#closeerror"),
		imageattachment,
		percentProcessed=$("#percentprocessed"),
		imageloading=false
		
	menubutton.on("click",function(){
		window.location.href="main.php"
	})	
	
	percentProcessed.hide()
	
	// change heading on the page
	if(category=="Open"){
		pageheading.html("Ballo Box Poll Serials")
	}else{
		pageheading.html("Ballo Box Sealing Serials")
	}
	$("#electiongroup").hide()	
	
	formdata = new FormData()
	
	$("#photoinputs").hide()
		
	getElections(electionfield)
	
	launchcamera.on("click",function(){
		var serialno=serialnofield.val()
		electionid=electionfield.val()
		if(serialnofield.val()===""){
			errors="<p>Please provide serial number first.</p>"
			displayError(errors)
		}else{
			if(category=="Open"){
				filedescription="Box_Polling_Serial_"
			}else{
				filedescription="Box_Sealing_Serial_"
			}
		 	filedescription+=serialno
			if(attachedphotos.includes(filedescription)){
				var errors="<p>You have already attached the photo for serial no.  "+serialno+"</p>"
				displayError(errors)
			}else{
				attachphoto.focus().trigger("click")		
			}
		}
	})
	
	attachphoto.on("change",function(){
		var serialno=serialnofield.val()
		if(category=="Open"){
			filedescription="Box_Polling_Serial_"
		}else{
			filedescription="Box_Sealing_Serial_"
		}
	 	filedescription+=serialno
		readURL(this,filedescription)
	})
	
	function readURL(input,filedescription) {
		$("#emptyphotos").remove()
		imageloading=true
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
			
			reader.onprogress=function(e){
				imageloading=true
				percentProcessed.show()
				percentProcessed.html("Processing image to binary. Please wait ... 0%")
				console.log(e.lengthComputable)
				if (e.lengthComputable) {
			      var percentage = Math.round((e.loaded * 100) / e.total)
			      percentProcessed.html('Loaded : '+percentage+'%')
			    }   
			}
				
			reader.onloadend= function(e){
				percentProcessed.hide()
				imageattachment=e.target.result	
				console.log(imageattachment)
				imageloading=false
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
		serialno=serialnofield.val()		
		if(electionid!='' && serialno!=''){
			//console.log("Data to be saved on device:")
			//console.log(saveondevice.prop('checked'))
			if (saveondevice.prop('checked')){
				// check if serial no already exists
				console.log(imageattachment)
				if(imageloading===true){
					displayError("<p>Image conversion not complete. Please wait a few seconds then try again.</p>")
				}else{
					saveBallotBoxPollingSerial(serialno,category,electionid,imageattachment)
				}
				displayError("<p>The Ballotbox seal serial has been saved successfully on the device.</p>")	
			}else{
				checkSealSerial(electionid,serialno,category).done(function(){
				 saveBallotBoxSeal(electionid,category).done(function(){
					 	uploadPhotos()
				 	})
				})
			}
		}else{
			errors="<p>Please enter ALL fields first.</p>"
			displayError(errors)
		}
	})
	
	function checkSealSerial($electionid,serialno,category){
		var dfd1=$.Deferred()
		url="../includes/task.php?request=checkballotsealserial&electionid="+electionid+"&category="+category+"&serialno="+serialno
		$.getJSON(url,function(data){
			sealserialexists=data.toString()
			dfd1.resolve()
		})
		return dfd1.promise()
	}
	
	function checkBallotBoxSeal(electionid,category){
		var dfd= $.Deferred()
		url="../includes/task.php?request=checkballotboxseal&electionid="+electionid+"&category="+category
		$.getJSON(url,function(data){
			var message=data.toString()
			if(message==="exists"){
				sealexists=true
			}else{
				sealexists=false
			}
			dfd.resolve()
		})
		return dfd.promise()
	}
	
	function saveBallotBoxSeal(electionid,category){	
		var dfd=$.Deferred()
		if(!sealexists){
			url="../includes/task.php?request=saveballotboxseal&electionid="+electionid+"&category="+category
			$.getJSON(url,function(data){
	
			})
		}
		dfd.resolve()	
		return dfd.promise()
	}
	
	function uploadPhotos(){
		// upload photos
		//console.log(sealexists)
		if(!sealexists){
			$.ajax({
			    url: "../includes/uploadballotboxserials.php",
			    type: "POST",
			    data: formdata,
			    processData: false,
			    contentType: false,
			    success: function (res) {	
				   	notice="<p>Success: Ballot box seal serial numbers saved successfully<br/>"				  
				  	notice+="Image attachment uploaded sucessfuly</p>"
					displayError(notice)
				
			    }
			})	
		}else{
			errors="<p>The serial number  provided already exist in the system</p>"
			displayError(errors)
		}
	}
	
	// close error dialog box
	closeerror.on("click",function(){
		window.history.back()
	})
	
})