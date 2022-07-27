$(document).ready(function(){
	// get url parameters
	var electionfield=$("#election"),
		launchcamera=$("#launchcamera"),
		attachphoto=$("#attachphoto6"),
		attachedform=$("#attachedform"),
		incidentnarration=$("#incidentnarration"),
		saveincident=$("#saveincident"),
		menubutton=$("#main"),
		localimages=[]
		
	menubutton.on("click",function(){
		window.location.href="main.php"
	})	
	
	$("#electiongroup").hide()	
	
	formdata = new FormData()
	
	$("#photoinputs").hide()
		
	getElections(electionfield)
	
	launchcamera.on("click",function(){
		attachphoto.focus().trigger("click")		
	})
	
	attachphoto.on("change",function(){
		var randomNo=parseInt(Math.random()*1000000)
		filedescription=randomNo+"_Incident"
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
				//console.log("base64 Image string")
				//console.log(e.target.result)
		        var lvitem
		        lvitem='<li><a href="#">'
			    lvitem+='<img src="'+ e.target.result+'" class="thumbnail" />'
			    lvitem+='<h3>'+ filename +'</h3>'
			    lvitem+='<p class="ui-li-count">'+ Math.round(filesize/1024) +' KB</p>'
			    lvitem+='<p>'+ filedescription +'</p></a></li>'
			    //lvitem+='<a href="#" data-icon="minus" class="delete" id="'+filename+'">Delete</a></li>'
				//attachedphotos.push(filedescription)   
			    
		        $(lvitem).appendTo(attachedform)
				attachedform.listview("refresh")
				localimages.push(e.target.result)
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
	
	saveincident.on("click",function(){
		// check for blank fields
		electionid=electionfield.val()
		narration=incidentnarration.val()
		if(electionid!='' && narration!=''){
			url="../includes/task.php?request=saveincident&electionid="+electionid+"&narration="+narration
			$.getJSON(url,function(data){
			
			})
			// upload photos
			$.ajax({
			    url: "../includes/uploadincidentphotos.php",
			    type: "POST",
			    data: formdata,
			    processData: false,
			    contentType: false,
			    success: function (res) {	
				   	notice="<p>Success: Incident reported successfully and images uploaded sucessfuly.</p>"
					displayError(notice)
			    }
			})	
		}else{
			errors="<p>Please enter narration for the icident first.</p>"
			displayError(errors)
		}
	})
	
})