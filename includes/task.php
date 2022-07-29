<?php
	require_once('settings.php');
	require_once('user.php');
	require_once('agents.php');
	require_once('voting.php');
	require_once ('sms.php');

	// connectDB();
	$user=new user();
	$setting=new setting();
	$agent=new agent();
	$voting=new voting();

	if(isset($_GET['request'])){
		$request=$_GET['request'];
	}else{
		$request='';
	}
	
	switch ($request){
		case "userlogon":
			$username=$_GET['username'];
			$password=$_GET['password'];
			echo $user->userlogon($username,$password);
			break;
		case "changeuserpassword":
			$oldpassword=$_GET['oldpassword'];
			$newpassword=$_GET['newpassword'];
			echo $user->changeuserpassword($oldpassword,$newpassword);
			break;
		case "getelections":
			$status=isset($_GET['status'])?$_GET['status']:'<All>';
			echo $setting->getelections($status);
			break;
		case "getpositions":
			echo $setting->getpositions();
			break;
		case "getelectioncandidates":
			$electionid=$_GET['electionid'];
			echo $setting->getcandidates($electionid);
			break;
		case "getcounties":
			echo $setting->getcounties();
			break;
		case "getconstituencies":
			$countyid=$_GET['countyid'];
			echo $setting->getconstituencies($countyid);
			break;
		case "getwards":
			$constituencyid=$_GET['constituencyid'];
			echo $setting->getwards($constituencyid);
			break;
		case "getpolingcenters":
			$wardid=$_GET['wardid'];
			echo $setting->getpolingcenters($wardid);
			break;
		case "getpolingstations":
			$polingcenterid=$_GET['polingcenterid'];
			echo $setting->getpolingstations($polingcenterid);
			break;
		case "saveagent":
			$agentid=$_GET['agentid'];
			$electionid=$_GET['electionid'];
			$candidate=$_GET['candidate'];
			$polingcenter=$_GET['polingcenter'];
			$agentname=str_replace("'","''", $_GET['agentname']);
			$agentidno=str_replace("'", "''",$_GET['agentidno']);
			$agentmobile=str_replace("'", "''",$_GET['agentmobile']);
			$password=randomPassword();
			// check blank fields
			if($electionid!="" && $candidate!="" && $polingcenter!="" && $agentname!="" && $agentidno!="" && $agentmobile!="" ){
				echo $agent->saveagent($agentid,$electionid,$candidate,$polingcenter,$agentname,$agentidno,$agentmobile,$password);
			}else{
				echo json_encode("Please enter ALL required fields first.");
			}			
			break;
		case "agentlogon":
			$username=$_GET['username'];
			$password=$_GET['password'];
			echo $agent->agentlogin($username,$password);
			break;
		case "changeagentpassword":
			$oldpassword=$_GET['oldpassword'];
			$newpassword=$_GET['newpassword'];
			echo $agent->changeagentpassword($oldpassword,$newpassword);
			break;
		case "checkresults":
			$electionid=$_GET['electionid'];
			echo $voting->checkresults($electionid);
			break;
		case "saveresults":
			// generate random ref number
			$refno=rand();
			// get parameters
			$polingstationid=$_SESSION['polingstationid'];
			$agentid=$_SESSION['agentid'];
			$electionid=$_GET['electionid'];
			$spoilt=$_GET['spoiltvotes'];
			$stray=$_GET['strayvotes'];
			$candidates=explode(",",json_decode($_GET['candidatevotes']));
			
			// save candidate results
			$pattern='::';
			foreach($candidates as $candidate){
				$candidatedetails=explode($pattern, $candidate);
				$candidateid=$candidatedetails[0];
				$votes=$candidatedetails[1];
				$voting->savetempelectionresults($refno,$candidateid,$votes);
			}
			// save the results and return the results id
			echo $voting->saveresults($refno,$electionid,$polingstationid,$agentid,$spoilt,$stray);
			break;

		case "checkballotserial":
			$electionid=$_GET['electionid'];
			$serialno=$_GET['startserialno'];
			$polingstationid=$_SESSION['polingstationid'];
			echo $voting->checkballotserial($electionid,$polingstationid,$serialno);
			break;
		case "saveballotserialnumber":
			$electionid=$_GET['electionid'];
			$serialno=$_GET['startserialno'];
			$pieces=$_GET['pieces'];
			$polingstationid=$_SESSION['polingstationid'];
			$agentid=$_SESSION['agentid'];
			echo $voting->saveballotserialnumber($electionid,$polingstationid,$agentid,$serialno,$pieces);
			break;
		case "checkspoiltballot":
			$electionid=$_GET['electionid'];
			$serialno=$_GET['serialno'];
			$polingstationid=$_SESSION['polingstationid'];
			echo $voting->checkspoiltballot($electionid,$polingstationid,$serialno);
		case "savespoiltballot":
			$electionid=$_GET['electionid'];
			$serialno=$_GET['serialno'];
			$polingstationid=$_SESSION['polingstationid'];
			$agentid=$_SESSION['agentid'];
			echo $voting->savespoiltballot($electionid,$polingstationid,$agentid,$serialno);
			break;
		case "checkballotboxseal":
			$electionid=$_GET['electionid'];
			$category=$_GET['category'];
			$polingstationid=$_SESSION['polingstationid'];
			echo $voting->checkballotboxseal($electionid,$polingcenterid,$category);
			break;
		case "checkballotsealserial":
			$electionid=$_GET['electionid'];
			$category=$_GET['category'];
			$serialno=$_GET['serialno'];
			$polingstationid=$_SESSION['polingstationid'];
			echo $voting->checkballotsealserial($electionid,$polingstationid,$category,$serialno);
			break;
		case "saveballotboxseal":
			$electionid=$_GET['electionid'];
			$category=$_GET['category'];
			$agentid=$_SESSION['agentid'];
			$polingstationid=$_SESSION['polingstationid'];
			echo $voting->saveballotboxseal($electionid,$agentid,$polingstationid,$category);
			break;
		case "getglobalresultssummary":
			$electionid=$_GET['electionid'];
			echo $voting->getglobalresultssummary($electionid);
			break;
		case "getcandidateglobalresults":
			$electionid=$_GET['electionid'];
			echo $voting->getcandidateglobalresults($electionid);
			break;
		case "getcountylistresults":
			$electionid=$_GET['electionid'];
			echo $voting->getcountylistresults($electionid);
			break;
		case "getcountyresultssummary":
			$electionid=$_GET['electionid'];
			$countyid=$_GET['countyid'];
			echo $voting->getcountyresultssummary($electionid,$countyid);
			break;		
		case "getcandidatecountyresults":
			$electionid=$_GET['electionid'];
			$countyid=$_GET['countyid'];
			echo $voting->getcandidatecountyresults($electionid,$countyid);
			break;
		case "getconstituencylistresults":
			$electionid=$_GET['electionid'];
			$countyid=$_GET['countyid'];
			echo $voting->getconstituencylistresults($electionid,$countyid);
			break;
		case "getconstituencyresultssummary":
			$electionid=$_GET['electionid'];
			$constituencyid=$_GET['constituencyid'];
			echo $voting->getconstituencyresultssummary($electionid,$constituencyid);
			break;
		case "getcandidateconstituencyresults":
			$electionid=$_GET['electionid'];
			$constituencyid=$_GET['constituencyid'];
			echo $voting->getcandidateconstituencyresults($electionid,$constituencyid);
			break;
		case "getwardlistresults":
			$electionid=$_GET['electionid'];
			$constituencyid=$_GET['constituencyid'];
			echo $voting->getwardlistresults($electionid,$constituencyid);
			break;
		case "getwardresultssummary":
			$electionid=$_GET['electionid'];
			$wardid=$_GET['wardid'];
			echo $voting->getwardresultssummary($electionid,$wardid);
			break;
		case "getcandidatewardresults":
			$electionid=$_GET['electionid'];
			$wardid=$_GET['wardid'];
			echo $voting->getcandidatewardresults($electionid,$wardid);
			break;
		case "getpolingcenterlistresults":
			$electionid=$_GET['electionid'];
			$wardid=$_GET['wardid'];
			echo $voting->getpolingcenterlistresults($electionid,$wardid);
			break;
		case "getpolingcenterresultsummary":
			$electionid=$_GET['electionid'];
			$polingcenterid=$_GET['polingcenterid'];
			echo $voting->getpolingcenterresultsummary($electionid,$polingcenterid);
			break;
		case "getcandidatepolingcenterresults":
			$electionid=$_GET['electionid'];
			$polingcenterid=$_GET['polingcenterid'];
			echo $voting->getcandidatepolingcenterresults($electionid,$polingcenterid);
			break;
		case "getpolingstationlistresults":
			$electionid=$_GET['electionid'];
			$polingcenterid=$_GET['polingcenterid'];
			echo $voting->getpolingstationlistresults($electionid,$polingcenterid);
			break;
		case "getpolingstationresultsummary":
			$electionid=$_GET['electionid'];
			$polingstationid=$_GET['polingstationid'];
			$voting->getpolingstationresultsummary($electionid,$polingstationid);
			returnJSON($sql);
			break;
		case "getcandidatepolingstationresults":
			$electionid=$_GET['electionid'];
			$polingstationid=$_GET['polingstationid'];
			echo $voting->getcandidatepolingstationresults($electionid,$polingstationid);
			returnJSON($sql);
			break;
		case "checkagentidno":
			$agentidno=$_GET['agentidno'];
			echo $agent->checkagentidno($agentidno);
			break;
		case "checkagentmobileno":
			$agentmobileno=$_GET['agentmobileno'];
			echo $agent->checkagentmobileno($agentmobileno);
			break;
		case "getballotpapersissuedglobally":
			$electionid=$_GET['electionid'];
			echo $voting->getballotpapersissuedglobally($electionid);
			break;
		case "getballotpapersissuedbycounty":
			$electionid=$_GET['electionid'];
			$countyid=$_GET['countyid'];
			echo $voting->getballotpapersissuedbycounty($electionid,$countyid);
			break;
		case "getballotpapersissuedbyconstituency":
			$electionid=$_GET['electionid'];
			$constituencyid=$_GET['constituencyid'];
			echo $voting->getballotpapersissuedbyconstituency($electionid,$constituencyid);
			break;
		case "getballotpapersissuedbyward":
			$electionid=$_GET['electionid'];
			$wardid=$_GET['wardid'];
			echo $voting->getballotpapersissuedbyward($electionid,$wardid);
			break;
		case "getballotpapersissuedbypolingcenter":
			$electionid=$_GET['electionid'];
			$polingcenterid=$_GET['polingcenterid'];
			echo getballotpapersissuedbypolingcenter($electionid,$polingcenterid);
			break;
		case "getballotpapersissuedbypolingstation":
			$electionid=$_GET['electionid'];
			$polingstationid=$_GET['polingstationid'];
			echo $voting->getballotpapersissuedbypolingstation($electionid,$polingstationid);
			break;
		case "missingvoterregistration":
			$electionid=$_GET['electionid'];
			$voteridno=$_GET['voteridno'];
			$votername=$_GET['votername'];
			$reason=$_GET['reason'];
			$agentid=$_SESSION['agentid'];
			$polingstationid=$_SESSION['polingstationid'];
			echo $voting->missingvoterregistration($electionid,$voteridno,$votername,$reason,$agentid,$polingstationid);
			break;
		case "checkmissingvoter":
			$voteridno=$_GET['voteridno'];
			$electionid=$_GET['electionid'];
			echo $voting->checkmissingvoter($electionid,$voteridno);
			break;
		case "saveincident":
			$electionid=$_GET['electionid'];
			$narration=$_GET['narration'];
			$polingstationid=$_SESSION['polingstationid'];
			$agentid=$_SESSION['agentid'];
			echo $voting->saveincident($electionid,$polingstationid,$agentid,$narration);
			break;
		case "getcountydetailssummary":
			echo $setting->getcountydetailssummary();
			break;
		case "getconstituencydetailssummary":
			$countyid=isset($_GET['countyid'])?$_GET['countyid']:0;
			echo $setting->getconstituencydetailssummary($countyid);
			break;
		case "getwarddetailssummary":
			$countyid=isset($_GET['countyid'])?$_GET['countyid']:0;
			$constituencyid=$_GET['constituencyid']?$_GET['constituencyid']:0;
			echo $setting->getwarddetailssummary($countyid,$constituencyid);
			break;
		case "getpolingcentersdetailssummary":
			$countyid=isset($_GET['countyid'])?$_GET['countyid']:0;
			$constituencyid=$_GET['constituencyid']?$_GET['constituencyid']:0;
			$wardid=$_GET['wardid']?$_GET['wardid']:0;
			echo $setting->getpolingcenterdetailssummary($countyid,$constituencyid,$wardid);
			break;
		case "getpolingstationdetailssummary":
			$countyid=isset($_GET['countyid'])?$_GET['countyid']:0;
			$constituencyid=$_GET['constituencyid']?$_GET['constituencyid']:0;
			$wardid=$_GET['wardid']?$_GET['wardid']:0;
			$polingcenterid=$_GET['polingcenterid']?$_GET['polingcenterid']:0;
			echo $setting->getpolingstationdetailssummary($countyid,$constituencyid,$wardid,$polingcenterid);
			break;
	}
	
	function randomPassword() {
		$alphabet = "0123456789";
		$pass = array(); //remember to declare $pass as an array
		$alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
		for ($i = 0; $i <4; $i++) {
			$n = rand(0, $alphaLength);
			$pass[] = $alphabet[$n];
		}
		return implode($pass); //turn the array into a string
	}

	// function returnJSON($sql){
	// 	$conn=connectDB(1);
	// 	//echo $sql;
	// 	$stmt = sqlsrv_query( $conn, $sql );
	// 	if($stmt){
	// 		$rows = sqlsrv_has_rows( $stmt );
	// 		do {
	// 			while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
	// 				$json[] = $row;
	// 			}
	// 		} while ( sqlsrv_next_result($stmt) );
	// 		echo json_encode($json);
	// 	}
	// 	sqlsrv_free_stmt( $stmt);
	// }
	

	
	// function storeData($sql){
	// 	$conn=connectDB(1);
	// 	$stmt = sqlsrv_query( $conn, $sql );
	// 	if ($stmt) {
	// 		return true ;
	// 	}else{
	// 		return false;
	// 	}
	// }
	
	// function getData($sql){
	// 	$conn=connectDB(1);
	// 	$stmt = sqlsrv_query( $conn, $sql );
	// 	if ($stmt) {
	// 		$rows = sqlsrv_has_rows( $stmt );
	// 		if ($rows === true){
	// 			return $stmt;
	// 		}
	// 	}else{
	// 		return false;
	// 	}
	// }
	
	// function checkDatabaseRecord($sql){
	// 	$conn=connectDB(1);
	// 	//echo $sql;
	// 	$stmt = sqlsrv_query( $conn, $sql );
	// 	if ($stmt) {
	// 		$rows = sqlsrv_has_rows( $stmt );
	// 		if ($rows === true){
	// 			echo json_encode("exists");
	// 		}else{
	// 			echo json_encode("notexists");
	// 		}
	// 	}
	// }
?>