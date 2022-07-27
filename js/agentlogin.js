$(document).ready(function(){
	login=$("#login")	
	clear=$("#clear")
	usernamefield=$("#username")
	passwordfield=$("#password")
	errors=$("#errors")
	hideAddressbar('#header')

	login.on("click",function(){
		username=usernamefield.val()
		password=passwordfield.val()
		url="../includes/task.php?request=agentlogon&username="+username+"&password="+password
		if(username!="" && password!=""){
			$.getJSON(url,function(data){
				var message=data.toString()
				//alert(message)
				switch(message){
					case "change password":
						window.location.href="changepassword.php"
						break;
					case "success":
						window.location.href="main.php"
						break;
					case "disabled":
						errormessage="<p>Your account has been disabled. Contact system admin<p>"
						errors.empty()
						$(errormessage).appendTo(errors)
						break;
					case "expired":
						errormessage="<p>Your account has expired. Contact system admin<p>"
						errors.empty()
						$(errormessage).appendTo(errors)
						break;
					default:
						errormessage="<p>"+message+"<p>"
						errors.empty()
						$(errormessage).appendTo(errors)
						break;
				}	
			})	
		}else{
			errors.html("Please enter both username and password")
		}
		
	})
})