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
    }

?>