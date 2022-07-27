$(document).ready(function(){
	var partysymbol=$("#partysymbol")
	var attachedphotos=$("#partylogo")
	// read the image and attach to the listview
	function readURL(input,filedescription) {
		    if (input.files && input.files[0]) {
			    var filename=$(input).val()
		        var reader = new FileReader(); 
				var filesize=input.files[0].size
		        filename= filename.split('\\').pop().split('/').pop()
		      	var fileextension=getFileExtension(filename)
		        filename=filedescription+'.'+fileextension	
		        
		        reader.onload = function (e) {
					attachedphotos.push(filedescription)   
		        }
				
		        reader.readAsDataURL(input.files[0]);
		        formdata.append("images[]", input.files[0],filename)
		    }
		}

	partysymbol.on("change",function(){
		var filedescription=$("#photodescription").val()
		readURL(this,filedescription)
	})
	
})