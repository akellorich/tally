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
    }

?>