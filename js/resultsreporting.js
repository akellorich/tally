$(document).ready(function(){
	var electionfield=$("#election"),
		positionfield=$("#position"),
		candidates=$("#candidates"),
		launchcamera=$("#launchcamera"),
		attachphoto=$("#attachphoto"),
		attachedform=$("#attachedform"),
		save=$("#save"),
		spoiltvotesfield=$("#spoiltvotes"),
		strayvotesfield=$("#strayvotes"), 
		closeerror=$("#closeerror"),
		electionadded=false,
		blankvotes=0,
		options="",
		electiongroup=$("#electiongroup"),
		mainmenu=$("#main")
		
	mainmenu.on("click",function(){
		window.location.href="main.php"
	})	
	
	formdata = new FormData()
	
	$("#photoinputs").hide()
	electiongroup.hide()
	
	// get elections
	var url="../includes/task.php?request=getelections"
	$.getJSON(url,function(data){
		for (var i = 0; i < data.length; i++) {
			options+="<option value='"+data[i].ElectionId+"'>"+data[i].Description+"</option>"
		}
		console.log(options)
		electionfield.find("option").remove()
		$(options).appendTo(electionfield)
		electionfield.selectmenu("refresh")
	})
	
	getPositions().done(function(){
		getCandidates()
	})
	
	function getPositions(){
		var dfd=$.Deferred()
		// get positions
		url="../includes/task.php?request=getpositions"
		var options1=""
		$.getJSON(url,function(data){
			for (var i = 0; i < data.length; i++) {
				options1+="<option value='"+data[i].PositionId+"'>"+data[i].PositionName+"</option>"
			}
			positionfield.find("option").remove()
			$(options1).appendTo(positionfield)
			positionfield.selectmenu("refresh")
			dfd.resolve()
		})
		return dfd.promise()
	}
	

	/*electionfield.on("change",function(){
		url="../includes/task.php?request=getpositionelectioncandidates&electionid="+electionid
		options=''
		$.getJSON(url,function(data){
			for (var i = 0; i < data.length; i++) {
				options+='<li id="'+data[i].CandidateId+'"><a href="#">'
				options+='<img src="../'+ data[i].Portrait+'" class="thumbnail" />'
				options+='<h3>'+ data[i].CandidateName +' ('+data[i].Partyname+')</h3>'
				//options+='<img src="../'+data[i].Symbol+'"></a>'
				options+='<input type="number" id="'+data[i].CandidateId+'" name="candidatevotes"></a></li>'
			}
			candidates.find("ul").remove()
			$(options).appendTo(candidates)
			candidates.listview("refresh")
		})
	})
	
	
	positionfield.on("change",function(){
		var electionid=electionfield.val(),
		positionid=positionfield.val()
		// get the candidates
		url="../includes/task.php?request=getpositionelectioncandidates&positionid="+positionid+"&electionid="+electionid
		options=''
		$.getJSON(url,function(data){
			for (var i = 0; i < data.length; i++) {
				options+='<li id="'+data[i].CandidateId+'"><a href="#">'
				options+='<img src="../'+ data[i].Portrait+'" class="thumbnail" />'
				options+='<h3>'+ data[i].CandidateName +' ('+data[i].Partyname+')</h3>'
				//options+='<img src="../'+data[i].Symbol+'"></a>'
				options+='<input type="number" id="'+data[i].CandidateId+'" name="candidatevotes"></a></li>'
			}
			candidates.find("ul").remove()
			$(options).appendTo(candidates)
			candidates.listview("refresh")
		})
	})
	*/
	
	// get presidential candidates
	
	
	function getCandidates(){
		positionid=positionfield.val()
		// electionid=electionfield.val()
		// get the candidates
		electionid=2
		url="../includes/task.php?request=getelectioncandidates&electionid="+electionid
		options=''
		$.getJSON(url,function(data){
			for (var i = 0; i < data.length; i++) {
				options+='<li id="'+data[i].CandidateId+'"><a href="#">'
				options+='<img src="'+ data[i].Portrait+'" class="thumbnail" />'
				options+='<h3>'+ data[i].CandidateName +' ('+data[i].Partyname+')</h3>'
				//options+='<img src="../'+data[i].Symbol+'"></a>'
				options+='<input type="number" id="'+data[i].CandidateId+'" name="candidatevotes"></a></li>'
			}
			candidates.find("ul").remove()
			$(options).appendTo(candidates)
			candidates.listview("refresh")
		})
	}
	
	
	launchcamera.on("click",function(){
		//console.log("clicked")
		attachphoto.focus().trigger("click")
	})
	
	attachphoto.on("change",function(){
		var filedescription="Results Form To Upload" 
			readURL(this,filedescription)
	})
	
	save.on("click",function(){
		blankvotes=0
		electionadded=false
		var electionid=electionfield.val(),
			spoiltvotes=spoiltvotesfield.val(),
			strayvotes=strayvotesfield.val(), 
			candidatevotes=''
			
		// check that all  candidate votes are entered
		$('input[name=candidatevotes]').each(function(i){
			if($(this).val()==""){
				blankvotes=1
			}	
		})
				
		// generate the candidates votes in a single string separated by full collons
		$('input[name=candidatevotes]').each(function(i){
			description=$(this).attr("id") +"::"+ $(this).val()
			candidatevotes==''?candidatevotes=description:candidatevotes+=","+description
		})
		
		// check all blank fields
		if(electionid!="" && spoiltvotes!="" && strayvotes!="" && blankvotes==0){
			// deferred callback
			electionResultExists(electionid).done(function(){
				saveElectionResults(electionid,spoiltvotes,strayvotes,blankvotes,candidatevotes)
			})
		}else{
			// raise error
			if (blankvotes==1){
				notice="<p>Error: Please enter votes for ALL the candidates first.</p>"	
			}else{
				notice="<p>Error: Please enter ALL required fields first<br/></p>"	
			}
						  
			displayError(notice)
		}
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

	function electionResultExists(electionid){
		var dfd = $.Deferred();
		url="../includes/task.php?request=checkresults&electionid="+electionid
		$.getJSON(url,function(data){
			var message=data.toString()
			if(message==="exists"){
				electionadded=true
			}else{
				electionadded=false
			}
			dfd.resolve()
		})
		return dfd.promise()
	}
	
	function saveElectionResults(electionid,spoiltvotes,strayvotes,blankvotes,candidatevotes){
		//console.log(typeof electionadded)
		//console.log(electionadded)
		if(!electionadded){
			// save the results
			url="../includes/task.php?request=saveresults&electionid="+electionid+"&spoiltvotes="+spoiltvotes+"&strayvotes="+strayvotes+"&candidatevotes="+JSON.stringify(candidatevotes)
			$.getJSON(url,function(data){
				var message=data.toString()
			})
			
			// upload photos
			$.ajax({
			    url: "../includes/uploadresultsimages.php",
			    type: "POST",
			    data: formdata,
			    processData: false,
			    contentType: false,
			    success: function (res) {	
				   	notice="<p>Success: Results saved successfully<br/>"				  
				  	notice+="Form attachment uploaded sucessfuly</p>"
					displayError(notice)
			    }
			})	
			
		}else{
			notice="<p>Error: Results for your poling station already submitted.<br/>"				  
			displayError(notice)
		}
	}
	
	// close error dialog box
	closeerror.on("click",function(){
		window.history.back()
	})
})