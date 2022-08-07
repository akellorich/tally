$(document).ready(function(){
	var electionfield=$("#election"),
		launchcamera=$("#launchcamera"),
		attachphoto=$("#attachphoto1"),
		attachedform=$("#attachedform"),
		startserialnofield=$("#startserial"),
		piecesfield=$("#pieces"),
		serialnoexists=false,
		saveserial=$("#saveserial"),
		mainmenu=$("#main"),
		formdata = new FormData(),
		closeerror=$("#closeerror")
	
	$("#photoinputs").hide()
	
	mainmenu.on("click",function(){
		window.location.href="main.php"
	})	
	
	getElections(electionfield)
	
	launchcamera.on("click",function(){
		if(startserialnofield.val()===""){
			errors="<p>Please provide start serial number first.</p>"
			displayError(errors)
		}else{
			attachphoto.focus().trigger("click")
		}
	})
	
	attachphoto.on("change",function(){
		var serialno=startserialnofield.val(),
		 	filedescription="Ballot_Photo_Serial_"+serialno
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
				//attachedphotos.push(filedescription)   
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
		startserialno=startserialnofield.val()
		pieces=piecesfield.val()
		if(electionid!='' && startserialno!='' && pieces!=""){
			 checkSerialNo(electionid,startserialno).done(function(){
				 saveBallotSerial(electionid,startserialno,pieces)
			 })
		}else{
			errors="<p>Please enter ALL fields first.</p>"
			displayError(errors)
		}
	})
	
	function checkSerialNo(electionid,serialno){
		var dfd = $.Deferred();
		url="../includes/task.php?request=checkballotserial&electionid="+electionid+"&startserialno="+serialno
		$.getJSON(url,function(data){
			if(data.toString()==="exists"){
				serialnoexists=true
			}else{
				serialnoexists=false
			}
			dfd.resolve()
		})
		return dfd.promise()
	}
	
	function saveBallotSerial(electionid,serialno,pieces){
		if(!serialnoexists){
			url="../includes/task.php?request=saveballotserialnumber&electionid="+electionid+"&startserialno="+serialno+"&pieces="+pieces
			$.getJSON(url,function(data){
			
			})
			// upload photos
			$.ajax({
			    url: "../includes/uploadballotpaperserials.php",
			    type: "POST",
			    data: formdata,
			    processData: false,
			    contentType: false,
			    success: function (res) {	
				   	notice="<p>Success: Ballot serial numbers saved successfully<br/>"				  
				  	notice+="Image attachment uploaded sucessfuly</p>"
					displayError(notice)
			    }
			})	
		}else{
			errors="<p>The serial number(s) provided already exist in the system</p>"
			displayError(errors)
		}	
	}

	closeerror.on("click",function(){
		window.history.back()
	})
})