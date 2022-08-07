$(document).ready(function(){
	login=$("#login")	
	clear=$("#clear")
	usernamefield=$("#username")
	passwordfield=$("#password")
	errors=$("#errors")
	inputfield=$("input")

	hideAddressbar('#header')
	forgotpasswordbutton=$("#forgotpassword")
	forgotpasswordetails=$("#forgotpassworddetails")
	passwordresetanchor=$("#passwordresetdisplay")
	resetpasswordusername=$("#resetpasswordusername")
	resetpasswordbutton=$("#resetpassword")
	resetpassworderrors=$("#resetpassworderrors")

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
						errormessage="<p class='alert alert-primary'><i class='fal fa-info-triangle fa-lg fa-fw'></i> Account disabled. Contact admin<p>"
						errors.empty()
						$(errormessage).appendTo(errors)
						break;
					case "expired":
						errormessage="<p class='alert alert-primary'><i class='fal fa-info-circle fa-lg fa-fw'></i> Account expired. Contact admin<p>"
						errors.empty()
						$(errormessage).appendTo(errors)
						break;
					case "Invalid Username or Password. Please correct then try again":
						errormessage="<p class='alert alert-danger'><i class='fal fa-exclamation-triangle fa-lg fa-fw'></i> Incorrect username or password<p>"
						errors.empty()
						$(errormessage).appendTo(errors)
						break;
					default:
						errormessage="<p class='alert alert-danger'><i class='fal fa-exclamation-triangle fa-lg fa-fw'></i>"+message+"<p>"
						errors.empty()
						$(errormessage).appendTo(errors)
						break;
				}	
			})	
		}else{
			errors.html("<p class='alert alert-danger'><i class='fal fa-info-circle fa-lg fa-fw'></i> Provide username and password</p>")
		}
	})

	forgotpasswordbutton.on("click",()=>{
		// console.log("clicked")
		passwordresetanchor.click()
	})

	resetpasswordbutton.on("click",()=>{
		const username=resetpasswordusername.val().trim()
		let notifications=""
		if(username!==""){
			$.post(
				"../includes/task.php",
				{
					resetagentpassword:true,
					username
				},
				(data)=>{
					data=data.toString().trim()
					if(data==="not exist"){
						notifications="<p class='alert alert-info'><i class='fal fa-info-circle fa-lg fa-fw'></i> Invalid username</p>"
						resetpassworderrors.html(notifications)
					}else if(data==="success"){
						notifications="<p class='alert alert-success'><i class='fal fa-check-circle fa-lg fa-fw'></i> Password changed successfully.</p>"
						resetpasswordusername.val("")
						resetpassworderrors.html(notifications)
					}else{
						notifications=`<p class='alert alert-danger'><i class='fal fa-exclamation-triangle fa-lg fa-fw'></i> Error! ${data}</p>`
						resetpassworderrors.html(notifications)
					}
				}
			)
		}else{
			resetpassworderrors.html("Please enter username")
		}
	})

	resetpasswordusername.on("input",()=>{
		resetpassworderrors.html("")
	})

	inputfield.on("input",()=>{
		errors.html("")
	})
})