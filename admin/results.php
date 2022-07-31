<?php 
	require_once '../includes/connection.php';
?>
<html>
<head>
	<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="ie=edge">
		<link href="https://fonts.googleapis.com/icon?family=Material+Icons+Sharp" rel="stylesheet"> 
		<link href="../css/all.css" rel="stylesheet" type="text/css" />
		<link href="../css/bootstrap.css" rel="stylesheet" id="bootstrap-css">
		<link href="../css/alert.css" rel="stylesheet" id="alert-css">
		<link href="../css/custom.css" rel="stylesheet" id="custom-css">
		<link href="../css/master.css" rel="stylesheet" id="master-css">
		<link href="../css/dashboard.css" rel="stylesheet" id="dashboard-css">
		<link rel="shortcut icon" href="../images/logo.jpg" />
		<link rel="icon" href="../images/logo.jpg" />
	<title>Tally - Dashboard</title>
</head>
<body>
<input type="checkbox" name="nav-toggle" id="nav-toggle">
    <div class="sidebar">
        <div class="sidebar-brand">
            <h2>
                <i class="fas fa-warehouse"></i><span>Electral-Tally</span>
            </h2>
        </div>

        <?php require_once("sidebar.txt"); ?>
    </div>

    <div class="main-content">
        <div class="header">
            <h2>
                <label for="nav-toggle">
                    <i class="fas fa-bars"></i>
                </label>
                Results
            </h2>

            <div class="search-wrapper">
               <!-- <i class="fas fa-search"></i>
                <input type="text" name="search" id="search" placeholder="Search here ..."> -->
            </div>

            <div class="user-wrapper">
                <img src="../images/blankavatar.jpg"  height="40px" width="40px"alt="" class="profilephoto">
                <div>
                    <h4 class="username">Richard Onyango</h4>
                    <small class="role">System Admin</small>
                </div>
            </div>
        </div>

        <main id="dasboarddetails">
            
        </main>
    </div>

</body>
<script src="../js/jquery-2.2.4.js"></script>
<script src="../js/alert.js"></script>
<script src="../js/jquery.number.js"></script>
<script src="../js/bootstrap.js"></script>
<script src="../js/bootbox.min.js"></script>
<script src="../js/functions.js"></script>
<!-- <script src="../js/reports.js"></script> -->
</html>