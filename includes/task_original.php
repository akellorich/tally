<?php
	require_once 'connection.php';
	require_once 'sms.php';
	
	connectDB();
	
	if(isset($_GET['request'])){
		$request=$_GET['request'];
	}else{
		$request='';
	}
	
	switch ($request){
		case "userlogon":
			$username=$_GET['username'];
			$password=$_GET['password'];
			$sql="spGetUserLogin '{$username}','{$password}'";
			$stmt = sqlsrv_query( $conn, $sql );
			if ($stmt) {
				$rows = sqlsrv_has_rows( $stmt );
				if ($rows === true){
					if($row=sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC)){
						$_SESSION['userid']=$row['UserId'];
						$_SESSION['username']=$row['UserName'];
						$changepassword=$row['ChangePassword'];
						$expired=$row['Expired'];
						$active=$row['Active'];
						$_SESSION['fullname']=$row['FirstName']. ' '.$row['MiddleName'].' '.$row['LastName'];
						if($changepassword===1){
							echo json_encode("change password");
						}
						else if($active===0){
							echo json_encode("disabled")	;
						}else if($expired===1){
							echo json_encode("expired")	;
						}else{
							echo json_encode("success")	;
						}
					}
				}else{
					echo json_encode("Invalid Username or Password. Please correct then try again");
				}
			}
			break;
			
		case "changeuserpassword":
			$oldpassword=$_GET['oldpassword'];
			$newpassword=$_GET['newpassword'];
			$sql="spGetUserLogin '{$_SESSION['username']}','{$oldpassword}'";
			$stmt = sqlsrv_query( $conn, $sql );
			if ($stmt) {
				$rows = sqlsrv_has_rows( $stmt );
				if ($rows === true){
					sqlsrv_free_stmt( $stmt);
					$sql="spChangeUserPassword '{$_SESSION['username']}','{$newpassword}',0";
					$stmt = sqlsrv_query( $conn, $sql );
					if ($stmt) {
						echo json_encode("success") ;
					}
				}else{
					echo json_encode("Incorrect old password. Please correct then try again");
				}
			}
			break;
			
		case "getelections":
			$sql="spGetElections";
			returnJSON($sql);
			break;
			
		case "getpositions":
			$sql="spGetPositions";
			returnJSON($sql);
			break;
			
		case "getelectioncandidates":
			$electionid=$_GET['electionid'];
			$sql="spGetElectionCandidates {$electionid}";
			returnJSON($sql);
			break;
			
		case "getcounties":
			$sql="spGetCounties";
			returnJSON($sql);
			break;
			
		case "getconstituencies":
			$countyid=$_GET['countyid'];
			$sql="spgGetConstituency {$countyid}";
			returnJSON($sql);
			break;
			
		case "getwards":
			$constituencyid=$_GET['constituencyid'];
			$sql="spGetWard {$constituencyid}";
			returnJSON($sql);
			break;
		
		case "getpolingcenters":
			$wardid=$_GET['wardid'];
			$sql="spGetPolingCenters {$wardid}";
			returnJSON($sql);
			break;
		
		case "getpolingstations":
			$polingcenterid=$_GET['polingcenterid'];
			$sql="spGetPolingStations {$polingcenterid}";
			returnJSON($sql);
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
				$sql="spsaveAgent {$agentid},{$electionid},{$candidate},{$polingcenter},'{$agentname}','{$agentidno}','{$agentmobile}','{$password}'";
				//echo $sql."<br/>";
				$stmt = sqlsrv_query( $conn, $sql );
				if ($stmt) {
					do {
						while($row=sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC)){
							$_SESSION['agentsavedid']=$row['Id'];
							//echo $_SESSION['agentsavedid'];
							// sms the agent his generated password.
							$sms="Hello ".$agentname.", your password for the tally portal is ". $password.". Username is your mobile phone number. Thank you.";
							$smsresult=sendSMS($agentmobile, $sms);							
							if($smsresult=='Success'){
								echo json_encode("success");
							}else{
								echo json_encode("smsfailed");
							}
						}
					}while (sqlsrv_next_result($stmt));
				}
			}else{
				echo json_encode("Please enter ALL required fields first.");
			}			
			break;
			
		case "agentlogon":
			$username=$_GET['username'];
			$password=$_GET['password'];
			$sql="getAgentLogon '{$username}','{$password}'";
			$stmt = sqlsrv_query( $conn, $sql );
			if ($stmt) {
				$rows = sqlsrv_has_rows( $stmt );
				if ($rows === true){
					if($row=sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC)){
						$_SESSION['polingstationid']=$row['PolingStationId'];
						$_SESSION['agentid']=$row['AgentId'];
						$_SESSION['agentusername']=$row['Mobile'];
						$changepassword=$row['ChangePasswordOnLogOn'];
						$expired=$row['Expired'];
						$active=$row['Active'];
						$_SESSION['AgentName']=$row['AgentName'];
						if($changepassword===1){
							echo json_encode("change password");
						}
						else if($active===0){
							echo json_encode("disabled")	;
						}else if($expired===1){
							echo json_encode("expired")	;
						}else{
							echo json_encode("success")	;
						}
					}
				}else{
					echo json_encode("Invalid Username or Password. Please correct then try again");
				}
			}
			break;
			
		case "changeagentpassword":
			$oldpassword=$_GET['oldpassword'];
			$newpassword=$_GET['newpassword'];
			$sql="getAgentLogon '{$_SESSION['agentusername']}','{$oldpassword}'";
			//echo $sql;
			$stmt = sqlsrv_query( $conn, $sql );
			if ($stmt) {
				$rows = sqlsrv_has_rows( $stmt );
				if ($rows === true){
					sqlsrv_free_stmt( $stmt);
					$sql="spChangeAgentPassword {$_SESSION['agentid']},'{$newpassword}',0";
					$stmt = sqlsrv_query( $conn, $sql );
					if ($stmt) {
						echo json_encode("success") ;
					}
				}else{
					echo json_encode("Incorrect old password. Please correct then try again");
				}
			}
			break;
			
		case "checkresults":
			$electionid=$_GET['electionid'];
			$sql="spCheckElectionResult {$electionid},{$_SESSION['polingstationid']}";
			$stmt = sqlsrv_query( $conn, $sql );
			if ($stmt) {
				$rows = sqlsrv_has_rows( $stmt );
				if ($rows === true){
					//return true;
					echo json_encode("exists");
				}else{
					
					echo json_encode("notexists");
					//return false;
				}
			}
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
				
				$sql="spSaveTempElectionResults '{$refno}',{$candidateid},{$votes}";
				//echo ($sql."<br/>");
				$stmt = sqlsrv_query( $conn, $sql );
				if( $stmt === false) {
					die( print_r(sqlsrv_errors(), true) );
				}
				//free the server
				sqlsrv_free_stmt( $stmt);
			}
	
			// save the results and return the results id
			$sql="spSaveElectionResults '{$refno}',{$electionid},{$polingstationid},{$agentid},{$spoilt},{$stray}";
			//echo $sql;
			$stmt = sqlsrv_query( $conn, $sql );
			if ($stmt) {
				do {
					while($row=sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC)){
						$_SESSION['resultid']=$row['ResultId'];
					}
				}while (sqlsrv_next_result($stmt));
			}
			else{
				json_encode("error");
			}
			break;

		case "checkballotserial":
			$electionid=$_GET['electionid'];
			$serialno=$_GET['startserialno'];
			$polingstationid=$_SESSION['polingstationid'];
			$sql="spCheckSerial {$electionid},{$polingstationid},{$serialno}";
			//echo $sql."</br>";
			$stmt = sqlsrv_query( $conn, $sql );
			if ($stmt) {
				$rows = sqlsrv_has_rows( $stmt );
				if ($rows === true){
					echo json_encode("exists");
				}else{						
					echo json_encode("notexists");
				}
			}
			break;
			
		case "saveballotserialnumber":
			$electionid=$_GET['electionid'];
			$serialno=$_GET['startserialno'];
			$pieces=$_GET['pieces'];
			$polingstationid=$_SESSION['polingstationid'];
			$agentid=$_SESSION['agentid'];
			$sql="spSaveBallotSerialNo {$electionid},{$polingstationid},{$agentid},{$serialno},{$pieces}";
			$stmt = sqlsrv_query( $conn, $sql );
			if ($stmt) {
				do {
					while($row=sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC)){
						$_SESSION['ballotserialid']=$row['Id'];
					}
				}while (sqlsrv_next_result($stmt));
			}
			else{
				json_encode("error");
			}
			break;
			
		case "checkspoiltballot":
			$electionid=$_GET['electionid'];
			$serialno=$_GET['serialno'];
			$polingstationid=$_SESSION['polingstationid'];
			$sql="spCheckIfSpolitBallotRecorded {$electionid},{$polingstationid},{$serialno}";
			$stmt = sqlsrv_query( $conn, $sql );
			if ($stmt) {
				$rows = sqlsrv_has_rows( $stmt );
				if ($rows === true){
					echo json_encode("exists");
				}else{
					echo json_encode("notexists");
				}
			}
			
		case "savespoiltballot":
			$electionid=$_GET['electionid'];
			$serialno=$_GET['serialno'];
			$polingstationid=$_SESSION['polingstationid'];
			$agentid=$_SESSION['agentid'];
			$sql="spRecordspoiltballot {$electionid},{$polingstationid},{$agentid},{$serialno}";
			$stmt = sqlsrv_query( $conn, $sql );
			if ($stmt) {
				do {
					while($row=sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC)){
						$_SESSION['spoiltballotid']=$row['Id'];
					}
				}while (sqlsrv_next_result($stmt));
			}
			else{
				json_encode("error");
			}
			break;
		
		case "checkballotboxseal":
			$electionid=$_GET['electionid'];
			$category=$_GET['category'];
			$polingstationid=$_SESSION['polingstationid'];
			$sql="spCheckBallotSerial {$electionid},{$polingstationid},{$category}";
			echo checkDatabaseRecord($sql);
			break;
			
		case "checkballotsealserial":
			$electionid=$_GET['electionid'];
			$category=$_GET['category'];
			$serialno=$_GET['serialno'];
			$polingstationid=$_SESSION['polingstationid'];
			$sql="spCheckBallotBoxSerialNo {$electionid},{$polingstationid},'{$category}',{$serialno}";
			echo checkDatabaseRecord($sql);
			break;
			
		case "saveballotboxseal":
			$electionid=$_GET['electionid'];
			$category=$_GET['category'];
			$agentid=$_SESSION['agentid'];
			$polingstationid=$_SESSION['polingstationid'];
			$sql="spSaveBallotSerial {$electionid},{$agentid},{$polingstationid},'{$category}'";
			$stmt = sqlsrv_query( $conn, $sql );
			if ($stmt) {
				do {
					while($row=sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC)){
						$_SESSION['ballotboxserial']=$row['Id'];
						$_SESSION['category']=$category;
					}
				}while (sqlsrv_next_result($stmt));
			}
			else{
				json_encode("error");
			}
			break;
			
		case "getglobalresultssummary":
			$electionid=$_GET['electionid'];
			$sql="spgetelectionresultsglobal {$electionid}";
			returnJSON($sql);
			break;
		case "getcandidateglobalresults":
			$electionid=$_GET['electionid'];
			$sql="spGetCandidateGlobalResults {$electionid}";
			returnJSON($sql);
			break;
		case "getcountylistresults":
			$electionid=$_GET['electionid'];
			$sql="spgetelectionresultsbycounty {$electionid}";
			returnJSON($sql);
			break;
			
		case "getcountyresultssummary":
			$electionid=$_GET['electionid'];
			$countyid=$_GET['countyid'];
			$sql="spgetcountyelectionresultssummary {$electionid},{$countyid}";
			returnJSON($sql);
			break;		
		case "getcandidatecountyresults":
			$electionid=$_GET['electionid'];
			$countyid=$_GET['countyid'];
			$sql="spGetCandidateCountyResults {$electionid},{$countyid}";
			returnJSON($sql);
			break;
		case "getconstituencylistresults":
			$electionid=$_GET['electionid'];
			$countyid=$_GET['countyid'];
			$sql="spgetelectionresultsbyconstituency {$electionid},{$countyid}";
			returnJSON($sql);
			break;
			
		case "getconstituencyresultssummary":
			$electionid=$_GET['electionid'];
			$constituencyid=$_GET['constituencyid'];
			$sql="spgetconstituencyelectionresultssummary {$electionid},{$constituencyid}";
			returnJSON($sql);
			break;
		case "getcandidateconstituencyresults":
			$electionid=$_GET['electionid'];
			$constituencyid=$_GET['constituencyid'];
			$sql="spGetCandidateConstituencyResults {$electionid},{$constituencyid}";
			returnJSON($sql);
			break;
		case "getwardlistresults":
			$electionid=$_GET['electionid'];
			$constituencyid=$_GET['constituencyid'];
			$sql="spgetelectionresultsbyward {$electionid},{$constituencyid}";
			returnJSON($sql);
			break;
		
		case "getwardresultssummary":
			$electionid=$_GET['electionid'];
			$wardid=$_GET['wardid'];
			$sql="spgetwardelectionresultssummary {$electionid},{$wardid}";
			returnJSON($sql);
			break;
		case "getcandidatewardresults":
			$electionid=$_GET['electionid'];
			$wardid=$_GET['wardid'];
			$sql="spGetCandidateWardResults {$electionid},{$wardid}";
			returnJSON($sql);
			break;
		case "getpolingcenterlistresults":
			$electionid=$_GET['electionid'];
			$wardid=$_GET['wardid'];
			$sql="spgetelectionresultsbypolingcenter {$electionid},{$wardid}";
			returnJSON($sql);
			break;

		case "getpolingcenterresultsummary":
			$electionid=$_GET['electionid'];
			$polingcenterid=$_GET['polingcenterid'];
			$sql="spgetpolingcenterelectionresultssummary {$electionid},{$polingcenterid}";
			returnJSON($sql);
			break;
		case "getcandidatepolingcenterresults":
			$electionid=$_GET['electionid'];
			$polingcenterid=$_GET['polingcenterid'];
			$sql="spGetCandidatePolingCenterResults {$electionid},{$polingcenterid}";
			returnJSON($sql);
			break;
		case "getpolingstationlistresults":
			$electionid=$_GET['electionid'];
			$polingcenterid=$_GET['polingcenterid'];
			$sql="spgetelectionresultsbypolingstation {$electionid},{$polingcenterid}";
			returnJSON($sql);
			break;
			
		case "getpolingstationresultsummary":
			$electionid=$_GET['electionid'];
			$polingstationid=$_GET['polingstationid'];
			$sql="spgetpolingstationelectionresultssummary {$electionid},{$polingstationid}";
			returnJSON($sql);
			break;
		case "getcandidatepolingstationresults":
			$electionid=$_GET['electionid'];
			$polingstationid=$_GET['polingstationid'];
			$sql="spGetCandidatePolingStationResults {$electionid},{$polingstationid}";
			returnJSON($sql);
			break;
		case "checkagentidno":
			$agentidno=$_GET['agentidno'];
			$sql="spCheckAgentIdNo '{$agentidno}'";
			checkDatabaseRecord($sql);
			break;
		case "checkagentmobileno":
			$agentmobileno=$_GET['agentmobileno'];
			$sql="spCheckAgentMobileNo '{$agentmobileno}'";
			checkDatabaseRecord($sql);
			break;
		case "getballotpapersissuedglobally":
			$electionid=$_GET['electionid'];
			$sql="spgetBallotpapersIssuedGlobally {$electionid}";
			returnJSON($sql);
			break;
		case "getballotpapersissuedbycounty":
			$electionid=$_GET['electionid'];
			$countyid=$_GET['countyid'];
			$sql="spgetBallotpapersIssuedByCounty {$electionid},{$countyid}";
			returnJSON($sql);
			break;
		case "getballotpapersissuedbyconstituency":
			$electionid=$_GET['electionid'];
			$constituencyid=$_GET['constituencyid'];
			$sql="spgetBallotpapersIssuedByConstituency {$electionid},{$constituencyid}";
			returnJSON($sql);
			break;
		case "getballotpapersissuedbyward":
			$electionid=$_GET['electionid'];
			$wardid=$_GET['wardid'];
			$sql="spgetBallotpapersIssuedByward {$electionid},{$wardid}";
			returnJSON($sql);
			break;
		case "getballotpapersissuedbypolingcenter":
			$electionid=$_GET['electionid'];
			$polingcenterid=$_GET['polingcenterid'];
			$sql="spgetBallotpapersIssuedByPolingCenter {$electionid},{$polingcenterid}";
			returnJSON($sql);
			break;
		case "getballotpapersissuedbypolingstation":
			$electionid=$_GET['electionid'];
			$polingstationid=$_GET['polingstationid'];
			$sql="spgetBallotpapersIssuedByPoling {$electionid},{$polingstationid}";
			returnJSON($sql);
			break;
			
		case "missingvoterregistration":
			$electionid=$_GET['electionid'];
			$voteridno=$_GET['voteridno'];
			$votername=$_GET['votername'];
			$reason=$_GET['reason'];
			$agentid=$_SESSION['agentid'];
			$polingstationid=$_SESSION['polingstationid'];
			$sql="spSaveTurnedAwayVoter {$electionid},'{$voteridno}','{$votername}','{$reason}',{$agentid},{$polingstationid}";
			$stmt = sqlsrv_query( $conn, $sql );
			if ($stmt) {
				do {
					while($row=sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC)){
						$_SESSION['missingvoterid']=$row['Id'];
					}
				}while (sqlsrv_next_result($stmt));
			}
			break;
			
		case "checkmissingvoter":
			$voteridno=$_GET['voteridno'];
			$electionid=$_GET['electionid'];
			$sql="spCheckTurnedAwayVoter {$electionid},'{$voteridno}'";
			checkDatabaseRecord($sql);
			break;
		case "saveincident":
			$electionid=$_GET['electionid'];
			$narration=$_GET['narration'];
			$polingstationid=$_SESSION['polingstationid'];
			$agentid=$_SESSION['agentid'];
			$sql="spSaveIncident {$electionid},{$polingstationid},{$agentid},'{$narration}'";
			//echo $sql;
			$stmt = sqlsrv_query( $conn, $sql );
			if ($stmt) {
				do {
					while($row=sqlsrv_fetch_array($stmt,SQLSRV_FETCH_ASSOC)){
						$_SESSION['incidentid']=$row['Id'];
					}
				}while (sqlsrv_next_result($stmt));
			}
			break;
	}

	function returnJSON($sql){
		$conn=connectDB(1);
		//echo $sql;
		$stmt = sqlsrv_query( $conn, $sql );
		if($stmt){
			$rows = sqlsrv_has_rows( $stmt );
			do {
				while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
					$json[] = $row;
				}
			} while ( sqlsrv_next_result($stmt) );
			echo json_encode($json);
		}
		sqlsrv_free_stmt( $stmt);
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
	
	function storeData($sql){
		$conn=connectDB(1);
		$stmt = sqlsrv_query( $conn, $sql );
		if ($stmt) {
			return true ;
		}else{
			return false;
		}
	}
	
	function getData($sql){
		$conn=connectDB(1);
		$stmt = sqlsrv_query( $conn, $sql );
		if ($stmt) {
			$rows = sqlsrv_has_rows( $stmt );
			if ($rows === true){
				return $stmt;
			}
		}else{
			return false;
		}
	}
	
	function checkDatabaseRecord($sql){
		$conn=connectDB(1);
		//echo $sql;
		$stmt = sqlsrv_query( $conn, $sql );
		if ($stmt) {
			$rows = sqlsrv_has_rows( $stmt );
			if ($rows === true){
				echo json_encode("exists");
			}else{
				echo json_encode("notexists");
			}
		}
	}
?>