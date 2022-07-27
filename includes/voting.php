<?php
    require_once("db.php");

    class voting extends db{

        function checkresults($electionid){
            $sql="spCheckElectionResult {$electionid},{$_SESSION['polingstationid']}";
            return json_encode($this->getData($sql)->rowCount()?"exists":"notexists");
        }

        function saveresults($refno,$electionid,$polingstationid,$agentid,$spoilt,$stray){
            $sql="CALL spSaveElectionResults ('{$refno}',{$electionid},{$polingstationid},{$agentid},{$spoilt},{$stray})";
			$rst=$this->getData($sql);
            if($rst->rowCount()){
                $_SESSION['resultid']=$row['ResultId'];
            }
			else{
				return json_encode("error");
			}
        }

        function savetempelectionresults($refno,$candidateid,$votes){
            $sql="CALL spSaveTempElectionResults ('{$refno}',{$candidateid},{$votes})";
            $this->getData($sql);
            return "success";
        }

        function checkballotserial($electionid,$polingstationid,$serialno){
            $sql="spCheckSerial {$electionid},{$polingstationid},{$serialno}";
            $rst->$this->getData($sql);
            return json_encode($rst->rowCount()?"exists":"notexists");
        }

        function saveballotserialnumber($electionid,$polingcenterid,$agentid,$serialno,$pieces){
            $sql="spSaveBallotSerialNo {$electionid},{$polingstationid},{$agentid},{$serialno},{$pieces}";
            $rst=$this->getData($sql);
            if($rst->rowCount()){
                $row=$rst->fetch();
                $_SESSION['ballotserialid']=$row['Id'];
            }else{
				return json_encode("error");
			}
        }

        function checkspoiltballot($electionid,$polingstationid,$serialno){
            $sql="CALL spCheckIfSpolitBallotRecorded ({$electionid},{$polingstationid},{$serialno})";
            return json_encode($this->getData($sql)->rowCount()?"exists":"notexists");
        }

        function savespoiltballot($electionid,$polingstationid,$agentid,$serialno){
            $sql="CALL spRecordspoiltballot ({$electionid},{$polingstationid},{$agentid},{$serialno})";
            $rst=$this->getData($sql);
            if($rst->rowCount()){
                $row=$rst->fetch();
                $_SESSION['spoiltballotid']=$row['Id'];
            }
			else{
				return json_encode("error");
			}
        }

        function checkballotboxseal($electionid,$polingcenterid,$category){
            $sql="CALL spCheckBallotSerial ({$electionid},{$polingstationid},{$category})";
            return $this->getJSON($sql)->rowCount()?"exists":"notexists";
        }

        function checkballotsealserial($electionid,$polingstationid,$category,$serialno){
            $sql="CALL spCheckBallotBoxSerialNo ({$electionid},{$polingstationid},'{$category}',{$serialno})";
            return $this->getData($sql)->rowCount()?"exists":"notexists";
        }

        function saveballotboxseal($electionid,$agentid,$polingstationid,$category){
            $sql="CALL spSaveBallotSerial ({$electionid},{$agentid},{$polingstationid},'{$category}')";
            $rst=$this->getData($sql);
            if($rst->rowCount()){
                $row=$rst->fetch();
                $_SESSION['ballotboxserial']=$row['Id'];
				$_SESSION['category']=$category;
            }else{
                return json_encode("error");
            }	
		}
        

        function getglobalresultssummary($electionid){
            $sql="CALL spgetelectionresultsglobal ({$electionid})";
            return $this->getJSON($sql);
        }

        function getcandidateglobalresults($electionid){
            $sql="CALL spGetCandidateGlobalResults ({$electionid})";
            return $this->getJSON($sql);
        }

        function getcountylistresults($electionid){
            $sql="CALL spgetelectionresultsbycounty({$electionid})";
            return $this>getJSON($sql);
        }

        function getcountyresultssummary($electionid,$countyid){
            $sql="CALL spgetcountyelectionresultssummary ({$electionid},{$countyid})";
            return $this->getJSON($sql);
        }

        function getcandidatecountyresults($electionid,$countyid){
            $sql="CALL spGetCandidateCountyResults ({$electionid},{$countyid})";
            return $this->getJSON($sql);
        }

        function getconstituencylistresults($electionid,$countyid){
            $sql="CALL spgetelectionresultsbyconstituency ({$electionid},{$countyid})";
            return $this->getJSON($sql);
        }

        function getconstituencyresultssummary($electionid,$constituencyid){
            $sql="CALL spgetconstituencyelectionresultssummary ({$electionid},{$constituencyid})";
            return $this->getJSON($sql);
        }

        function getcandidateconstituencyresults($electionid,$constituencyid){
            $sql="CALL spGetCandidateConstituencyResults ({$electionid},{$constituencyid})";
            return $this->getJSON($sql);
        }

        function getwardlistresults($electionid,$constituencyid){
            $sql="CALL spgetelectionresultsbyward ({$electionid},{$constituencyid})";
            return $this->getJSON($sql);
        }

        function getwardresultssummary($electionid,$wardid){
            $sql="CALL spgetwardelectionresultssummary ({$electionid},{$wardid})";
            return $this->getJSON($sql);
        }

        function getcandidatewardresults($electionid,$wardid){
            $sql="CALL spGetCandidateWardResults ({$electionid},{$wardid})";
            return $this->getJSON($sql);
        }

        function getpolingcenterlistresults($electionid,$wardid){
            $sql="CALL spgetelectionresultsbypolingcenter ({$electionid},{$wardid})";
            return $this->getJSON($sql);
        }

        function getpolingcenterresultsummary($electionid,$polingcenterid){
            $sql="CALL spgetpolingcenterelectionresultssummary ({$electionid},{$polingcenterid})";
            return $this->getJSON($sql);
        }

        function getcandidatepolingcenterresults($electionid,$polingcenterid){
            $sql="CALL spGetCandidatePolingCenterResults ({$electionid},{$polingcenterid})";
            return $this->getJSON($sql);
        }

        function getpolingstationlistresults($electionid,$polingcenterid){
            $sql="CALL spgetelectionresultsbypolingstation ({$electionid},{$polingcenterid})";
            return $this->getJSON($sql);
        }

        function getpolingstationresultsummary($electionid,$polingstationid){
            $sql="CALL spgetpolingstationelectionresultssummary ({$electionid},{$polingstationid})";
            return $this->getJSON($sql);
        }

        function getcandidatepolingstationresults($electionid,$polingstationid){
            $sql="CALL spGetCandidatePolingStationResults ({$electionid},{$polingstationid})";
            return $this->getJSON($results);
        }

        function getballotpapersissuedglobally($electionid){
            $sql="CALL spgetBallotpapersIssuedGlobally ({$electionid})";
            return $this->getData($sql);
        }

        function getballotpapersissuedbycounty($electionid,$countyid){
            $sql="CALL spgetBallotpapersIssuedByCounty ({$electionid},{$countyid})";
            return $this->getJSON($sql);
        }

        function getballotpapersissuedbyconstituency($electionid,$constituencyid){
            $sql="spgetBallotpapersIssuedByConstituency {$electionid},{$constituencyid}";
            return $tthis->getJSON($sql);
        }

        function getballotpapersissuedbyward($electionid,$wardid){
            $sql="call spgetBallotpapersIssuedByward ({$electionid},{$wardid})";
            return $this->getJSON($sql);
        }

        function getballotpapersissuedbypolingcenter($electionid,$polingcenterid){
            $sql="CALL spgetBallotpapersIssuedByPolingCenter ({$electionid},{$polingcenterid})";
            return $this->getJSON($sql);
        }

        function getballotpapersissuedbypolingstation($electionid,$polingstationid){
            $sql="CALL spgetBallotpapersIssuedByPoling ({$electionid},{$polingstationid})";
            return $this->getJSON($sql);
        }

        function missingvoterregistration($electionid,$voteridno,$votername,$reason,$agentid,$polingstationid){
            $sql="CALL spSaveTurnedAwayVoter ({$electionid},'{$voteridno}','{$votername}','{$reason}',{$agentid},{$polingstationid})";
            $row=$this->getData($sql)-fetch();
            $_SESSION['missingvoterid']=$row['Id'];
        }

        function checkmissingvoter($electionid,$voteridno){
            $sql="spCheckTurnedAwayVoter {$electionid},'{$voteridno}'";
            return $this->getData($sql)?"exists":"notexists";
        }

        function saveincident($electionid,$polingstationid,$agentid,$narration){
            $sql="spSaveIncident {$electionid},{$polingstationid},{$agentid},'{$narration}'";
			$row=$this->getData($sql)->fetch();
            $_SESSION['incidentid']=$row['Id'];
        }
   
    }


?>