$(document).ready(function(){
	var electionfield=$("#election"),
		launchcamera=$("#launchcamera"),
		attachphoto=$("#attachphoto2"),
		attachedform=$("#attachedform"),
		serialnofield=$("#serialno"),
		serialnoexists=false,
		savespoilt=$("#savespoiltballotpaper"),
		mainmenu=$("#main"),
		attachedphotos=[] 
		
	$("#electiongroup").hide()	
	
	mainmenu.on("click",function(){
		window.location.href="main.php"
	})	
	
	formdata = new FormData()
	
	$("#photoinputs").hide()
		
	getElections(electionfield)
	
	launchcamera.on("click",function(){
		if(serialnofield.val()===""){
			errors="<p>Please provide serial number first.</p>"
			displayError(errors)
		}else{
			filedescription="Spolit_Ballot_Serial_"+serialnofield.val()
			if(attachedphotos.includes(filedescription)){
				var errors="<p>You have attached photo for ballot paper serial no. "+serialnofield.val()+"</p>"
				displayError(errors)
			}else{
				attachphoto.focus().trigger("click")
			}
		}
	})
	
	attachphoto.on("change",function(){
		var serialno=serialnofield.val(),
		 	filedescription="Spolit_Ballot_Serial_"+serialno
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
	
	savespoilt.on("click",function(){
		// check for blank fields
		electionid=electionfield.val()
		serialno=serialnofield.val()
		// check if photo is attached
		if(electionid!='' && serialno!=''){
			filedescription="Spolit_Ballot_Serial_"+serialno
			if(attachedphotos.includes(filedescription)){
				checkSpoiltBallot(electionid,serialno).done(function(){
					 saveSpoiltBallot(electionid,serialno).done(function(){
						 uploadPhotos()
					 })
				})
			}else{
				errors="<p>Please attach photo for the serial no.</p>"
				displayError(errors)
			}
		}else{
			errors="<p>Please enter ALL fields.</p>"
			displayError(errors)
		}
	})
	
	function checkSpoiltBallot(electionid,serialno){
		var dfd= $.Deferred()
		url="../includes/task.php?request=checkspoiltballot&electionid="+electionid+"&serialno="+serialno
		$.getJSON(url,function(data){
			var message=data.toString()
			if(message==="exists"){
				serialnoexists=true
				
			}else{
				serialnoexists=false
			}
		})
		
		dfd.resolve()
		return dfd.promise()
	}
	
	function saveSpoiltBallot(electionid,serialno){	
		var dfd=$.Deferred()
		console.log(serialnoexists)
		if(!serialnoexists){
			url="../includes/task.php?request=savespoiltballot&electionid="+electionid+"&serialno="+serialno
			$.getJSON(url,function(data){
			
			})
		}
		
		dfd.resolve()
		return dfd.promise()
	}
	
	function uploadPhotos(){
		// upload photos
		console.log(serialnoexists)
		if(!serialnoexists){
			$.ajax({
			    url: "../includes/uploadspoiltballotpapers.php",
			    type: "POST",
			    data: formdata,
			    processData: false,
			    contentType: false,
			    success: function (res) {	
				   	notice="<p>Success: Spoilt ballot paper registered successfully<br/>"				  
				  	notice+="Image attachment uploaded sucessfuly</p>"
					displayError(notice)
			    }
			})	
		}else{
			errors="<p>The serial number  provided already exist in the system</p>"
			displayError(errors)
		}	
	}
})