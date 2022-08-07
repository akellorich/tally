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
        <link href="../css/master.css" rel="stylesheet" id="master-css">
		<link href="../css/role.css" rel="stylesheet" id="role-css">
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
                Boundaries
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

        <main id="boundarydetails">
            <div class="container-fluid">
                <!-- Set Up Navigation Tabs  -->
                <nav class="nav-justified ">
                    <div class="nav nav-tabs " id="nav-tab" role="tablist">
                        <a class="nav-item nav-link active" id="counties-tab" data-toggle="tab" href="#counties" role="tab" aria-controls="pop1" aria-selected="true">Counties</a>
                        <a class="nav-item nav-link" id="constituencies-tab" data-toggle="tab" href="#constituencies" role="tab" aria-controls="pop2" aria-selected="false">Constituencies</a>
                        <a class="nav-item nav-link" id="wards-tab" data-toggle="tab" href="#wards" role="tab" aria-controls="pop2" aria-selected="false">Wards</a>
                        <a class="nav-item nav-link" id="polingcentres-tab" data-toggle="tab" href="#polingcenters" role="tab" aria-controls="pop4" aria-selected="false">Poling Centres</a>
                        <a class="nav-item nav-link" id="polingstations-tab" data-toggle="tab" href="#polingstations" role="tab" aria-controls="pop3" aria-selected="false">Poling Stations</a>
                    </div>
                </nav>
                <!-- Tab Details  -->
                <div class="tab-content text-left" id="nav-tabContent">
                    <!-- Counties Tab  -->
                    <div class="tab-pane fade show active" id="counties" role="tabpanel" aria-labelledby="pop1-tab">
                        <div class="pt-3 card containergroup">
                            <div class="card-body">
                                <table class="table table-sm table-striped" id="countieslist">
                                    <thead>
                                        <th>#</th>
                                        <th>County Code</th>
                                        <th>County Name</th>
                                        <th>Constituencies</th>
                                        <th>Wards</th>
                                        <th>Poling Centres</th>
                                        <th>Poling Stations</th>
                                        <th>Registered Voters</th>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                        
                    </div>

                    <!-- Constituencies Tab -->
                    <div class="tab-pane fade " id="constituencies" role="tabpanel" aria-labelledby="pop1-tab">
                        <div class="pt-3"></div>
                        <div class="card containergroup mb-3">
                            <div class="card-header">
                                <h5>Filter Options</h5> 
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col form-group">
                                        <label for="filterconstituencycounty">Filter By County</label>
                                        <select name="filterconstituencycounty" id="filterconstituencycounty" class="county form-control form-control-sm"></select>
                                    </div>
                                    <div class="col form-group">
                                        <label for="">&nbsp;</label>
                                        <button class="btn btn-sm btn-success d-block" id="filterconstituencies">Filter Constituencies</button>
                                    </div>
                                </div>     
                                <table class="table table-sm table-striped" id="constituencieslist">
                                    <thead>
                                        <th>#</th>
                                        <th>County</th>
                                        <th>Constituency Code</th>
                                        <th>Constituency Name</th>
                                        <th>Wards</th>
                                        <th>Poling Centres</th>
                                        <th>Poling Stations</th>
                                        <th>Registered Voters</th>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                     <!-- Wards Tab -->
                     <div class="tab-pane fade " id="wards" role="tabpanel" aria-labelledby="pop1-tab">
                        <div class="pt-3"></div>
                        <div class="card containergroup mb-3">
                                <div class="card-header">
                                    <h5>Filter Options</h5> 
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col form-group">
                                            <label for="filterwardcounty">Filter By County</label>
                                            <select name="filterwardcounty" id="filterwardcounty" class="form-control form-control-sm county"></select>
                                        </div>

                                        <div class="col form-group">
                                            <label for="filterwardconstituency">Filter By Constituency</label>
                                            <select name="filterwardconstituency" id="filterwardconstituency" class="form-control form-control-sm"></select>
                                        </div>

                                        <div class="col">
                                            <div class="form-group">
                                                <label for="">&nbsp;</label>
                                                <button class="btn btn-sm btn-success d-block" id="filterwards">Filter Wards</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                        </div>
                        <table class="table table-sm table-striped" id="wardslist">
                            <thead>
                                <th>#</th>
                                <th>County</th>
                                <th>Constituency</th>
                                <th>Ward Code</th>
                                <th>Ward Name</th>
                                <th>Poling Centres</th>
                                <th>Poling Stations</th>
                                <th>Registered Voters</th>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>

                     <!-- Poling Centers Tab -->
                     <div class="tab-pane fade " id="polingcenters" role="tabpanel" aria-labelledby="pop1-tab">
                        <div class="pt-3"></div>
                        <div class="card containergroup mb-3">
                                <div class="card-header">
                                    <h5>Filter Options</h5> 
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col form-group">
                                            <label for="filterpolingcentercounty">Filter By County</label>
                                            <select name="filterpolingcentercounty" id="filterpolingcentercounty" class="form-control form-control-sm county"></select>
                                        </div>

                                        <div class="col form-group">
                                            <label for="filterpolingcenterconstituency">Filter By Constituency</label>
                                            <select name="filterpolingcenterconstituency" id="filterpolingcenterconstituency" class="form-control form-control-sm"></select>
                                        </div>

                                        <div class="col form-group">
                                            <label for="filterpolingcenterward">Filter By Ward</label>
                                            <select name="filterpolingcenterward" id="filterpolingcenterward" class="form-control form-control-sm"></select>
                                        </div>

                                        <div class="col">
                                            <div class="form-group">
                                                <label for="">&nbsp;</label>
                                                <button class="btn btn-sm btn-success d-block" id="filterpolingcenters">Filter Poling Centers</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                        </div>
                        <table class="table table-sm table-striped" id="polingcenterslist">
                            <thead>
                                <th>#</th>
                                <th>County</th>
                                <th>Constituency</th>
                                <th>Ward</th>
                                <th>Center Code</th>
                                <th>Center Name</th>
                                <th>Poling Stations</th>
                                <th>Registered Voters</th>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>

                     <!-- Poling Stations Tab -->
                     <div class="tab-pane fade " id="polingstations" role="tabpanel" aria-labelledby="pop1-tab">
                        <div class="pt-3"></div>
                        <div class="card containergroup mb-3">
                                <div class="card-header">
                                    <h5>Filter Options</h5> 
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col form-group">
                                            <label for="filterpolingstationcounty">Filter By County</label>
                                            <select name="filterpolingstationcounty" id="filterpolingstationcounty" class="form-control form-control-sm county"></select>
                                        </div>

                                        <div class="col form-group">
                                            <label for="filterpolingstationconstituency">Filter By Constituency</label>
                                            <select name="filterpolingstationconstituency" id="filterpolingstationconstituency" class="form-control form-control-sm"></select>
                                        </div>

                                        <div class="col form-group">
                                            <label for="filterpolingstationward">Filter By Ward</label>
                                            <select name="filterpolingstationward" id="filterpolingstationward" class="form-control form-control-sm"></select>
                                        </div>

                                        <div class="col form-group">
                                            <label for="filterpolingstationcenter">Filter By Center</label>
                                            <select name="filterpolingstationcenter" id="filterpolingstationcenter" class="form-control form-control-sm"></select>
                                        </div>

                                        <div class="col">
                                            <div class="form-group">
                                                <label for="">&nbsp;</label>
                                                <button class="btn btn-sm btn-success d-block" id="filterpolingstations">Filter Poling Stations</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                        </div>
                        <table class="table table-sm table-striped" id="polingstationslist">
                            <thead>
                                <th>#</th>
                                <th>County</th>
                                <th>Constituency</th>
                                <th>Ward</th>
                                <th>Center Name</th>
                                <th>Station Code</th>
                                <th>Station Name</th>
                                <th>Registered Voters</th>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
            </div>
        </main>
    </div>

</body>
<script src="../js/jquery-2.2.4.js"></script>
<script src="../js/alert.js"></script>
<script src="../js/jquery.number.js"></script>
<script src="../js/bootstrap.js"></script>
<script src="../js/bootbox.min.js"></script>
<script src="../js/functions.js"></script>
<script src="../js/boundaries.js"></script>
<!-- <script src="../js/reports.js"></script> -->
</html>