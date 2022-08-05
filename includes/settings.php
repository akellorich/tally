<?php
    require_once("db.php");

    class setting extends db{
        public function getelections($status){
            $sql="CALL spGetElections('{$status}')";
            return $this->getJSON($sql);
        }

        public function getpositions(){
            $sql="CALL spGetPositions()";
			return $this->getJSON($sql);
        }

        public function getcandidates($electionid){
			$sql="CALL spGetElectionCandidates({$electionid})";
            return $this->getJSON($sql);
        }

        public function getcounties(){
            $sql="CALL spGetCounties()";
            return $this->getJSON($sql);
        }

        public function getconstituencies($countyid){
            $sql="CALL spgGetConstituency({$countyid})";
            return $this->getJSON($sql);
        }

        public function getwards($constituencyid){
            $sql="CALL spGetWard({$constituencyid})";
            return $this->getJSON($sql);
        }

        public function getpolingcenters($wardid){
            $sql="CALL spGetPolingCenters({$wardid})";
            return $this->getJSON($sql);
        }

        public function getpolingstations($polingcenterid){
            $sql="CALL spGetPolingStations({$polingcenterid})";
            return $this->getJSON($sql);
        }

        public function getcountydetailssummary(){
            $sql="CALL `sp_getcountydetailssummary`()";
            return $this->getJSON($sql);
        }

        public function getconstituencydetailssummary($countyid){
            $sql="CALL `sp_getconstituencydetailssummary`({$countyid})";
            return $this->getJSON($sql);
        }

        function getwarddetailssummary($countyid,$constituencyid){
            $sql="CALL `sp_getwarddetailssummary`({$countyid},{$constituencyid})";
            return $this->getJSON($sql);
        }

        function getpolingcenterdetailssummary($countyid,$constituencyid,$wardid){
            $sql="CALL `sp_getpolingcenterdetailssummary`({$countyid},{$constituencyid},{$wardid})";
            return $this->getJSON($sql);
        }

        function getpolingstationdetailssummary($countyid,$constituencyid,$wardid,$polingcenterid){
            $sql="CALL `sp_getpolingstationdetailssummary`({$countyid},{$constituencyid},{$wardid},{$polingcenterid})";
            return $this->getJSON($sql);
        }

        function saveparty($partyid,$partyname,$symbol){
            $sql="CALL `sp_saveparty`({$partyid},'{$partyname}','{$symbol}',{$_SESSION['userid']})";
            $this->getData($sql);
            return "success";
        }

        function getparties(){
            $sql="CALL `sp_getparties`()";
            return $this->getJSON($sql);
        }

        function saveelection($positionid,$electiondate, $electiontype,$addtootherboundaries,$description,$localityid){
            $electiondate=$this->mySQLDate($electiondate);
            if($this->checkelection($positionid,$electiondate,$description)){
                return "exists";
            }else{
                $sql="CALL `sp_saveelection`({$positionid},'{$electiondate}','{$electiontype}',{$addtootherboundaries},'{$description}','{$localityid}',{$_SESSION['userid']})";
                $this->getData($sql);
                return "success";
            }
        }

        function checkelection($positionid,$electiondate,$description){
            // $electiondate=$this->mySQLDate($electiondate);
            $sql="CALL `sp_checkelection`({$positionid},'{$electiondate}','{$description}')";
            return $this->getData($sql)->rowCount();
        }

        function filterelectionspbyposition($positionid){
            $sql="CALL `sp_filterelectionbyposition`({$positionid})";
            return $this->getJSON($sql);
        }

        function getelectionlocalities($electionid){
            $sql="CALL `sp_getelectionlocalities`({$electionid})";
            return $this->getJSON($sql);
        }

        function savecandidate($candidateid,$candidatename,$partyid,$electionid, $localityid,$profilephoto){
            $sql="CALL `sp_savecandidate`({$candidateid},'{$candidatename}',{$partyid},{$electionid},{$localityid},'{$profilephoto}',{$_SESSION['userid']})";
            $this->getData($sql);
            return "success";
        }

        function getcandidateslist(){
            $sql="CALL `sp_getcandidates`()";
            return $this->getJSON($sql);
        }

        function getelectiondetails($electionid){
            $sql="CALL `sp_getelectiondetails`({$electionid})";
            return $this->getData($sql);
        }
    }

?>