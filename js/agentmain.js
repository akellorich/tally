$(document).ready(function(){
	logout=$("#main")
	panel=$("#panel")
	
	logout.on("click",function(){
		window.location.href="../includes/logout.php?page=agent"
	})
	
	panel.on("click",function(){
		//alert("clicked")
		window.location.href="main.php#mypanel"
	})
	
})