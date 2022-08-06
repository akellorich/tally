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

        function getturnawayvotersglobally($electionid){
            $sql="CALL spgetturnedawayvotersglobal({$electionid})";
            return $this->getJSON($sql);
        }

        function getturnawayvotersbycounty($electionid,$countyid){
            $sql="CALL `spgetturnedawayvoterscounty`({$electionid},{$countyid})";
            return $this->getJSON($sql);
        }

        function getturnawayvotersbyconstituency($electionid,$constituencyid){
            $sql="CALL `spgetturnedawayvotersconstituency`({$electionid},{$constituencyid})";
            return $this->getJSON($sql);
        }

        function getturnawayvotersbyward($electionid,$wardid){
            $sql="CALL `spgetturnedawayvotersward`({$electionid},{$wardid})";
            return $this->getJSON($sql);
        }

        function getturnawayvotersbypolingcenter($electionid,$polingcenterid){
            $sql="CALL `spgetturnedawayvoterspolingcenter`({$electionid},{$polingcenterid})";
            return $this->getJSON($sql);
        }

        function getturnawayvotersbypolingstation($electionid,$polingstationid){
            $sql="CALL `spgetturnedawayvoterspolingstation`({$electionid},{$polingstationid})";
            return $this->getJSON($sql);
        }

        function getspoiltballotsglobal($electionid){
            $sql="CALL `spSpoiltBallotsGlobal`({$electionid})";
            return $this->getJSON($sql);
        }

        function getspoiltballotscounty($electionid,$countyid){
            $sql="CALL `spSpoiltBallotsCounty`({$electionid},{$countyid})";
            return $this->getJSON($sql);
        }

        function getspoiltballotsconstituency($electionid,$constituencyid){
            $sql="CALL `spSpoiltBallotsConstituency`({$electionid},{$constituencyid})";
            return $this->getJSON($sql);
        }

        function getspoiltballotsward($electionid,$wardid){
            $sql="CALL `spSpoiltBallotsWard`({$electionid},{$wardid})";
            return $this->getJSON($sql);
        }

        function getspoiltballotspolingcenter($electionid,$polingcenterid){
            $sql="CALL `spSpoiltBallotsPolingCenter`({$electionid},{$polingcenterid})";
            return $this->getJSON($sql);
        }

        function getspoiltballotspolingstation($electionid,$polingstationid){
            $sql="CALL `spSpoiltBallotsPolingStation`({$electionid},{$polingstationid})";
            return $this->getJSON($sql);
        }

        function getcandidateglobalresults($electionid){
            $sql="CALL spGetCandidateGlobalResults($electionid)";
            return $this->getJSON($sql);
        }

    }

?>