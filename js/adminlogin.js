$(document).ready(function(){
	const login=$("#login")	
	const clear=$("#clear")
	const usernamefield=$("#username")
	const passwordfield=$("#password")
	const errors=$("#errors")
	const inputfields=$("input")
	
	inputfields.on("input",()=>{
		errors.html("")
	})

	login.on("click",function(){

		const username=usernamefield.val()
		const password=passwordfield.val()
		let errormessage=""

		url="../includes/task.php?request=userlogon&username="+username+"&password="+password
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
						errormessage="Account disabled. Contact Admin"
						// errors.empty()
						errors.html(showAlert("info",errormessage))
						// $(errormessage).appendTo(errors)
						break;
					case "expired":
						errormessage="Account expired. Contact Admin"
						errors.html(showAlert("info",errormessage))
						break;
					case "Invalid Username or Password.":
						errors.html(showAlert("info",message))
						break;
					default:
						errormessage=""+message+""
						errors.html(showAlert("danger",message))
						break;
				}
			})	
		}else{
			errormessage="Please provide username and password"
			errors.html(showAlert("info",errormessage))
		}
	})
})