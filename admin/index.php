<html>
<head>
	<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1">
	<meta name="mobile-web-app-capable" content="yes">
    <link href="../css/all.css" rel="stylesheet" type="text/css" />
    <link href="../css/bootstrap.css" rel="stylesheet" id="bootstrap-css">
    <link href="../css/login.css" rel="stylesheet" type="text/css" id="login-css">
	<link href="../css/alert.css" rel="stylesheet" type="text/css" id="alert-css">
    <title>Tally - Admin Login</title>
</head>
<body>
<!-- 
	<div id="header">
	
	</div>
	
	<div id="detail">
	
		<div id="errors"></div>
		
		<div id="loginform">
			<label for="username">Username:</label>
			<input type="text" id="username" name="username">
			<br>
			<label for="password">password:</label>
			<input type="password" id="password" name="password">
			<br>
			<button type="button" id="login">Logon</button>
			<button type="button" id="clear">Clear</button>
		</div>
	</div>
	
	<div id="footer">
	
	</div> -->

	<div class="container" id="logindiv">
        <div class="card card-container">
            <!-- <img class="profile-img-card" src="//lh3.googleusercontent.com/-6V8xOA6M7BA/AAAAAAAAAAI/AAAAAAAAAAA/rzlHcD0KYwo/photo.jpg?sz=120" alt="" /> -->
            <img id="profile-img" class="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" />
            <p id="profile-name" class="profile-name-card"></p>
            <div id="errors" class="errordiv"></div>
            <form class="form-signin">
                <span id="reauth-email" class="reauth-email"></span>
                <div class="input-prepend">
                    <i class="fa fa-user fa-lg fa-fw"  aria-hidden="true"></i>
                    <input type="text" id="username"  name="username" class="form-control" placeholder="Username" required autofocus>
                </div>
                
                <div class="input-prepend">
                    <i class="fa fa-user fa-lg fa-fw"  aria-hidden="true"></i>
                    <input type="password" id="password" name="password" class="form-control" placeholder="Password" required>
                </div>

                <button class="btn btn-lg btn-primary btn-block btn-signin" type="button" id="login">Sign in</button>
            </form><!-- /form -->
            <!-- <a href="#" class="forgot-password" id="forgotpasswordbutton">
                Forgot the password?
            </a> -->
        </div><!-- /card-container -->
    </div>

</body>
<script type="text/javascript" src="../js/jquery-2.2.4.js"></script>
<script type="text/javascript" src="../js/alert.js"></script>
<script type="text/javascript" src="../js/adminlogin.js"></script>
</html>