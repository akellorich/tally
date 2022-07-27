$(document).ready(function(){
	
	changepassword=$("#changepassword")
	oldpasswordfield=$("#oldpassword")
	newpasswordfield=$("#newpassword")
	confirmnewpasswordfield=$("#confirmnewpassword")
	errors=$("#errors")
	
	changepassword.on("click",function(){		
		oldpassword=oldpasswordfield.val()
		newpassword=newpasswordfield.val()
		confirmnewpassword=confirmnewpasswordfield.val()
		
		if(oldpassword!="" && newpassword!="" && confirmnewpassword!=""){
			if(newpassword!=confirmnewpassword){
				errors.html("New password entries do not match")
			}else{
				url="../includes/task.php?request=changeuserpassword&oldpassword="+oldpassword+"&newpassword="+newpassword
				$.getJSON(url,function(data){
					var message=data.toString()
					if(message=="success"){
						window.location.href="main.php"							
					}else{
						errors.html(message)
					}
				})
			}
		}else{
			errors.html("Please enter ALL the fields below first.")
		}
	})
})