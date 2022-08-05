<?php
    require_once("db.php");

    class results extends db{

        function getballotboxopenseals($electionid,$countyid,$constituencyid,$wardid,$polingcenterid){
            $sql="CALL `sp_getopenballotseals`({$electionid},{$countyid},{$constituencyid},{$wardid},{$polingcenterid})";
            return $this->getJSON($sql);
        }

        function getballotboxsealedseals($electionid,$countyid,$constituencyid,$wardid,$polingcenterid){
            $sql="CALL `sp_getcloseballotseals`({$electionid},{$countyid},{$constituencyid},{$wardid},{$polingcenterid})";
            return $this->getJSON($sql);
        }

        function getballotpapersglobally($electionid){
            $sql="CALL spgetBallotpapersIssuedGlobally({$electionid})";
            return $this->getJSON($sql);
        }

        function getballotpapersconstituency($electionid,$countyid){
            $sql="CALL spgetBallotpapersIssuedByCounty({$electionid},{$countyid})";
            return $this->getJSON($sql);
        }
    }

?>