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
                Events
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
                    <div id="filternotifications"></div>
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
                            <label for="polingstation">Station</label>
                            <select name="polingstation" id="polingstation" class="form-control form-control-sm"></select>
                        </div>

                        <div class="col col-md-1 form-group">
                            <label for="filter">&nbsp;</label>
                            <button name="filterevents" id="filterevents" class="btn btn-sm btn-success d-block" id="filterevents">Search</button>
                        </div>
                    </div>
                        <!-- Select report type to generate  -->
                    <div>Select Report Type:</div>
                    <div class="col btn-group mt-2 mb-3 btn-group-toggle" id="generateeventreports" data-toggle="buttons">
                        <label class="btn btn-secondary btn-sm active  eventreport" data-id="startballotseals">
                            <input type="radio" name="options" data-id="startballotseals">Start Ballot Box Seals
                        </label>
                        <label class="btn btn-secondary btn-sm eventreport" data-id="ballotpapers">
                            <input type="radio" name="options" data-id="ballotpapers"><span class="text-capitalize">Ballot Papers</span>
                        </label>
                        <label class="btn btn-secondary btn-sm eventreport" data-id="turnedawayvoters">
                            <input type="radio" name="options" data-id="turnedawayvoters"><span class="text-capitalize">Turned Away Voters</span>
                        </label>
                        <label class="btn btn-secondary btn-sm eventreport" data-id="spoiltballots">
                            <input type="radio" name="options" data-id="spoiltballots"><span class="text-capitalize">Spoilt Ballots</span>
                        </label>
                        <label class="btn btn-secondary btn-sm eventreport" data-id="incidences">
                            <input type="radio" name="options" data-id="incidences"><span class="text-capitalize">Incidences Recorded</span>
                        </label>
                        <label class="btn btn-secondary btn-sm eventreport" data-id="closedballotseals">
                            <input type="radio" name="options" data-id="closedballotseals"><span class="text-capitalize">Closed Ballot Box Seals</span>
                        </label>
                    </div>

                    <div id="ballotseals">
                        <table class="table table-sm table-striped ml-3 pr-3" id="startballotseals">
                            <thead>
                                <th>#</th>
                                <th>Date</th>
                                <th>County</th>
                                <th>Constituency</th>
                                <th>Ward</th>
                                <th>Poling Center</th>
                                <th>Station</th>
                                <th>Seal #</th>
                                <th>Added By</th>
                                <th>View</th>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>

                    <div id="ballotpapers">
                    </div>

                    <div id="turnedwayavoterslist">
                    </div>

                    <div id="incidenceslist">
                    </div>

                    <div id="spoiltballotslist"></div>
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
<script src="../js/events.js"></script>
<!-- <script src="../js/reports.js"></script> -->
</html>