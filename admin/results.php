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
        <link rel="shortcut icon" href="../images/logo.png" />
        <link rel="icon" href="../images/logo.png" />
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

        <main id="eventdetails">
            <div class="card containergroup">
                <div class="card-header">
                    <h5>Filter Options</h5>
                </div>
                <div class="card-body">
                    <div id="electionnotifications"></div>
                    <div class="row">
                        <div class="col form-group">
                            <label for="election">Election</label>
                            <select name="election" id="election" class="form-control form-control-sm"></select>
                        </div>
                        
                        <div class="col form-group">
                            <label for="county">County</label>
                            <select name="county" id="county" class="form-control form-control-sm"></select>
                        </div>

                        <div class="col form-group">
                            <label for="constituency">Constituency</label>
                            <select name="constituency" id="constituency" class="form-control form-control-sm"></select>
                        </div>

                        <div class="col form-group">
                            <label for="ward">Ward</label>
                            <select name="ward" id="ward" class="form-control form-control-sm"></select>
                        </div>

                        <div class="col form-group">
                            <label for="polingcenter">Poling Center</label>
                            <select name="polingcenter" id="polingcenter" class="form-control form-control-sm"></select>
                        </div>

                        <div class="col col-md-1 form-group">
                            <label for="filter">&nbsp;</label>
                            <button name="filter" id="filter" class="btn btn-sm btn-success d-block">Search</button>
                        </div>
                    </div>
                        <!-- Select report type to generate  -->
                    <div>Group Report By:</div>
                    <div class="col btn-group mt-2 mb-3 btn-group-toggle" id="generateeventreports" data-toggle="buttons">
                        <label class="btn btn-secondary btn-sm active  electiongroupselector" data-id="nationalgroup">
                            <input type="radio" name="options">Nationally
                        </label>
                        <label class="btn btn-secondary btn-sm electiongroupselector" data-id="countygroup">
                            <input type="radio" name="options"><span class="text-capitalize">County</span>
                        </label>
                        <label class="btn btn-secondary btn-sm electiongroupselector" data-id="constituencygroup">
                            <input type="radio" name="options"><span class="text-capitalize">Constituency</span>
                        </label>
                        <label class="btn btn-secondary btn-sm electiongroupselector" data-id="wardgroup">
                            <input type="radio" name="options"><span class="text-capitalize">Ward</span>
                        </label>
                        <label class="btn btn-secondary btn-sm electiongroupselector" data-id="polingcentergroup">
                            <input type="radio" name="options"><span class="text-capitalize">Poling Center</span>
                        </label>
                    </div>
                    
                    <div id="electionresults">
                        <table class="table table-sm table-striped ml-3 mr-3">
                            <thead>
                                <th>#</th>
                                <th>Candidate</th>
                                <th>Votes</th>
                                <th>Percentage</th>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                   
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
<script src="../js/results.js"></script>
</html>
