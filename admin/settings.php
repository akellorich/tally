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
		<link href="../css/master.css" rel="stylesheet" id="master-css">
		<link href="../css/dashboard.css" rel="stylesheet" id="dashboard-css">
        <link href="../css/role.css" rel="stylesheet" id="role-css">
        <link href="../css/custom.css" rel="stylesheet" id="custom-css">
        <link href="../css/jquery-ui.css" rel="stylesheet" id="jquery-ui-css">
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
                Settings
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

        <main id="settingsdetails">
            <div class="container-fluid">
                <!-- Set Up Navigation Tabs  -->
                <nav class="nav-justified ">
                    <div class="nav nav-tabs " id="nav-tab" role="tablist">
                        <a class="nav-item nav-link active" id="agents-tab" data-toggle="tab" href="#agents" role="tab" aria-controls="pop1" aria-selected="true">Agents</a>
                        <a class="nav-item nav-link" id="parties-tab" data-toggle="tab" href="#parties" role="tab" aria-controls="pop2" aria-selected="false">Parties</a>
                        <a class="nav-item nav-link" id="elections-tab" data-toggle="tab" href="#elections" role="tab" aria-controls="pop2" aria-selected="false">Elections</a>
                        <a class="nav-item nav-link" id="candidates-tab" data-toggle="tab" href="#candidates" role="tab" aria-controls="pop4" aria-selected="false">Candidates</a>
                    </div>
                </nav>
                
                <div class="tab-content text-left" id="nav-tabContent">
                    <!-- Agents Tab  -->
                    <div class="tab-pane fade show active" id="agents" role="tabpanel" aria-labelledby="pop1-tab">
                        <div class="pt-3"></div>
                        <table class="table table-sm table-striped" id="agentslist">
                            <thead>
                                <th>#</th>
                                <th>Name</th>
                                <th>Mobile</th>
                                <th>ID No</th>
                                <th>Poling Station(s)</th>
                                <th>Image</th>
                                <th>Signature</th>
                                <th>Actions</th>
                            </thead>
                            <tbody></tbody>
                        </table>
                        <button class="btn btn-sm btn-danger" id="disableagents"><i class="fal fa-user-slash fa-lg fa-fw"></i> Disable</button>
                        <button class="btn btn-sm btn-success" id="addnewagent"><i class="fal fa-plus fa-lg fa-fw"></i> Add New</button>
                    </div>

                    <!-- Constituencies Tab -->
                    <div class="tab-pane fade " id="parties" role="tabpanel" aria-labelledby="pop1-tab">
                        <div class="pt-3"></div>
                        
                        <table class="table table-sm table-striped" id="partieslist">
                            <thead>
                                <th>#</th>
                                <th>Party Name</th>
                                <th>Symbol</th>
                                <th>Date Added</th>
                                <th>Added By</th>
                                <th>Actions</th>
                            </thead>
                            <tbody></tbody>
                        </table>
                        <button class="btn btn-sm btn-danger" id="deleteparty"><i class="fal fa-lg fa-trash fa-fw"></i> Delete</button>
                        <button class="btn btn-sm btn-success" id="addparty"><i class="fal fa-plus fa-lg fa-fw"></i> Add Party</button>
                    </div>

                    <div class="tab-pane fade " id="elections" role="tabpanel" aria-labelledby="pop1-tab">
                        <!-- <div class="pt-3"></div> -->
                        <div class="card containergroup mt-2 mb-2">
                            <div class="card-header">
                                <h5>Filter Options</h5>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col form-group">
                                        <label for="filterelectionposition">Position</label>
                                        <select name="filterelectionposition" id="filterelectionposition" class="form-control form-control-sm"></select>
                                    </div>
                                    <div class="col form-group">
                                        <label for="filterelectioncounty">County</label>
                                        <select name="filterelectioncounty" id="filterelectioncounty" class="form-control form-control-sm"></select>
                                    </div>
                                    <div class="col form-group">
                                        <label for="filterelectionconstituency">Constituency</label>
                                        <select name="filterelectionconstituency" id="filterelectionconstituency" class="form-control form-control-sm"></select>
                                    </div>
                                    <div class="col form-group">
                                        <label for="filterelectionward">Ward</label>
                                        <select name="filterelectionward" id="filterelectionward" class="form-control form-control-sm"></select>
                                    </div>
                                    <div class="col form-group">
                                        <label for="">&nbsp;</label>
                                        <button class="btn btn-sm btn-success d-block" id="filterelections">Filter Elections</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <table class="table table-sm table-striped" id="electionsslist">
                            <thead>
                                <th>#</th>
                                <th>Locatity</th>
                                <th>Position</th>
                                <th>Locality Details</th>
                                <th>Candidates</th>
                                <th>Date Added</th>
                                <th>Added By</th>
                                <th>Actions</th>
                            </thead>
                            <tbody></tbody>
                        </table>
                        <button class="btn btn-sm btn-success" id="addnewelection"><i class="fal fa-plus fa-fw fa-lg"></i> Add Election</button>
                    </div>

                    <div class="tab-pane fade " id="candidates" role="tabpanel" aria-labelledby="pop1-tab">
                        <div class="pt-3"></div>
                        
                        <table class="table table-sm table-striped" id="candidateslist">
                            <thead>
                                <th>#</th>
                                <th>Candidate Name</th>
                                <th>Party</th>
                                <th>Position</th>
                                <th>Boundary</th>
                                <th>Profile Photo</th>
                                <th>Date Added</th>
                                <th>Added By</th>
                                <th>Actions</th>
                            </thead>
                            <tbody></tbody>
                        </table>
                        <button class="btn btn-sm btn-danger" id="deletecandidate"><i class="fal fa-trash fa-lg fa-fw"></i> Cancel Candidate</button>
                        <button class="btn-sm btn-success" id="addcandidate"><i class="fal fa-plus fa-lg fa-fw"></i> Add Candidate</button>
                    </div>

                </div>
            </div>
        </main>
    </div>
    
    <!-- Modal for party details  -->
    <div class="modal" tabindex="-1" role="dialog" id="partydetailsmodal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Party Details</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div id="partynotifications"></div>
                    <input type="hidden" name="partyid" id="partyid" value="0">
                <div class="form-group">
                        <label for="partyname">Party Name</label>
                        <input type="text" name="partyname" id="partyname" class="form-control form-control-sm">
                </div>

                <div class="form-group">
                        <label for="partysymbol">Party Symbol</label>
                        <input type="file" name="partysymbol" id="partysymbol" class="form-control form-control-sm">
                </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success btn-sm" id="saveparty">Save Party</button>
                    <button type="button" class="btn btn-danger btn-sm" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal for adding agent -->
    <div class="modal" tabindex="-1" role="dialog" id="addnewagentmodal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Agent Details</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div id="agentnotifications"></div>
                    <input type="hidden" name="agentid" id="agentid" value="0">
                    <div class="row">
                        <div class="col form-group">
                            <label for="agentnames">Agent Names</label>
                            <input type="text" name="agentnames" id="agentnames" class="form-control form-control-sm">
                        </div>

                        <div class="col form-group">
                            <label for="idno">ID Number</label>
                            <input type="text" name="idno" id="idno" class="form-control form-control-sm">
                        </div>

                    </div>
                    
                    <div class="row">

                        <div class="col form-group">
                            <label for="mobileno">Mobile Number</label>
                            <input type="number" name="mobileno" id="mobileno" class="form-control form-control-sm">
                        </div>

                        <div class="col form-group">
                            <label for="email">Email Address</label>
                            <input type="email" name="email" id="email" class="form-control form-control-sm">
                        </div>

                    </div>

                    <div class="row">

                        <div class="col form-group">
                            <label for="county">County</label>
                            <select name="county" id="county" class="form-control form-control-sm"></select>
                        </div>

                        <div class="col form-group">
                            <label for="constituency">Constituency</label>
                            <select name="constituency" id="constituency" class="form-control form-control-sm"></select>
                        </div>

                    </div>
                    
                    <div class="row">

                        <div class="col form-group">
                            <label for="ward">Ward</label>
                            <select name="ward" id="ward" class="form-control form-control-sm"></select>
                        </div>

                        <div class="col form-group">
                            <label for="polingcenter">Poling Center</label>
                            <select name="polingcenter" id="polingcenter" class="form-control form-control-sm"></select>
                        </div>

                    </div>
                    <div class="row">
                        <div class="col form-group">
                            <label for="polingstation">Poling Station</label>
                            <select name="polingstation" id="polingstation" class="form-control form-control-sm"></select>
                        </div>
                        <div class="col form-group">
                            <label for="election">Election Presiding</label>
                            <select name="election" id="election" class="form-control form-control-sm"></select>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col form-group">
                            <label for="password">Password</label>
                            <input type="password" name="password" id="password" class="form-control form-control-sm">
                        </div>

                        <div class="col form-group">
                            <label for="confirmpassword">Confirm Password</label>
                            <input type="confirmpassword" name="confirmpassword" id="confirmpassword" class="form-control form-control-sm">
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col form-group">
                            <label for="generatepassword">Generate password ?</label>
                            <select name="generatepassword" id="generatepassword" class="form-control form-control-sm">
                                <option value="no">No</option>
                                <option value="yes">Yes</option>
                            </select>
                        </div>

                        <div class="col form-group">
                            <label for="changepasswordonlogon">Change password on Logon ?</label>
                            <select name="changepasswordonlogon" id="changepasswordonlogon" class="form-control form-control-sm">
                                <option value="no">No</option>
                                <option value="yes">Yes</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">

                    <div class="row">
                        <div class="col d-flex justify-content-start">
                            <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal"><i class="fal fa-times fa-lf fa-fw"></i> Close</button>
                        </div>
                    </div>

                    <div class="col d-flex justify-content-end">
                        <button type="button" class="btn btn-success btn-sm mr-3" id="saveagent"><i class="fal fa-save fa-lg fa-fw"></i> Save Agent</button>
                        <button type="button" class="btn btn-danger btn-sm" id="clearagent"><i class="fal fa-hand-sparkles fa-lg fa-fw"></i> Clear Form</button>
                    </div>
                   
                </div>
            </div>
        </div>
    </div>
    <!-- Modal for Adding Election Details  -->
    <div class="modal" tabindex="-1" role="dialog" id="electiondetailsmodal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Election Details</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div id="electionnotifications"></div>
                    <div class="row">
                        <div class="col form-group">
                            <label for="electiontype">Election Type</label>
                            <select name="electiontype" id="electiontype" class="form-control form-control-sm">
                                <option value="">&lt;Choose&gt;</option>
                                <option value="ge">General Election</option>
                                <option value="be">By-election</option>
                            </select>
                        </div>
                        <div class="col form-group">
                            <label for="electiondate">Election Date</label>
                            <input type="text" name="electiondate" id="electiondate" class="form-control form-control-sm">
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="electionposition">Elective Position</label>
                        <select name="" id="electiveposition" class="form-control form-control-sm"></select>
                    </div>

                    <div class="form-group">
                        <label for="electioncounty">County</label>
                        <select name="electioncounty" id="electioncounty" class="form-control form-control-sm"></select>
                    </div>

                    <div class="form-group">
                        <label for="electionconstituency">Constituency</label>
                        <select name="electionconstituency" id="electionconstituency" class="form-control form-control-sm"></select>
                    </div>

                    <div class="form-group">
                        <label for="electionward">Ward</label>
                        <select name="electionward" id="electionward" class="form-control form-control-sm"></select>
                    </div>

                    <div class="form-group">
                        <label for="electionname">Election Name</label>
                        <div class="input-group mb-3">
                            <input type="text" name="electionname" id="electionname" class="form-control form-control-sm">
                            <div class="input-group-append">
                                <span class="btn btn-sm btn-secondary" id="electionname">Suggest</span>
                            </div>
                        </div>
                    </div>
                    <input type="checkbox" class="check-control mr-2" id="applytootherboundaries" name="applytootherboundaries">Apply to boundaries at the same?
                    <!-- <div class="form-group">
                        <label for="">&nbsp;</label>
                        <div class="check-group">
                            
                            <label for="applytootherboundaries" class="check-label"></label>
                        </div>
                    </div> -->
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success btn-sm" id="saveelection"><i class="fal fa-save fa-lg fa-fw"></i> Save changes</button>
                    <button type="button" class="btn btn-danger btn-sm" data-dismiss="modal"><i class="fal fa-times fa-lg fa-fw"></i> Close</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal for Adding Candidate  -->
    <div class="modal" tabindex="-1" role="dialog" id="candidatedetailsmodal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Canndidate Details</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div id="candidatenotifications"></div>
                    <input type="hidden" name="candidateid" id="candidateid" value="0">
                    <div class="form-group">
                        <label for="candidatename">Candidate Name</label>
                        <input type="text" name="candidatename" id="candidatename" class="form-control form-control-sm">
                    </div>

                    <div class="form-group">
                        <label for="candidateposition">Position</label>
                        <select name="candidateposition" id="candidateposition" class="form-control form-control-sm"></select>
                    </div>

                    <div class="form-group">
                        <label for="candidateelection">Election</label>
                        <select name="candidateelection" id="candidateelection" class="form-control form-control-sm"></select>
                    </div>

                    <div class="form-group">
                        <label for="candidateboundary">Boundary</label>
                        <select name="candidateboundary" id="candidateboundary" class="form-control form-control-sm"></select>
                    </div>

                    <div class="form-group">
                        <label for="candidateparty">Party</label>
                        <select name="candidateparty" id="candidateparty" class="form-control form-control-sm"></select>
                    </div>

                    <div class="form-group">
                        <label for="candidateprofilephoto">Profile Photo</label>
                        <input type="file" name="candidatephoto" id="candidatephoto" class="form-control form-control-sm">
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success btn-sm" id="savecandidate">Save Candidate</button>
                    <button type="button" class="btn btn-danger btn-sm" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</body>
<script src="../js/jquery-2.2.4.js"></script>

<script src="../js/alert.js"></script>
<script src="../js/jquery.number.js"></script>
<script src="../js/jquery_ui.js"></script>
<script src="../js/bootstrap.js"></script>
<script src="../js/bootbox.min.js"></script>
<script src="../js/functions.js"></script>
<script src="../js/settings.js"></script>
<!-- <script src="../js/reports.js"></script> -->
</html>