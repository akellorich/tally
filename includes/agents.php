<?php
    require_once("db.php");

    class agent extends db{

        function hashpassword($password){
            return hash("SHA256",$password);
        }

        function saveagent($agentid,$electionid,$candidate,$polingcenter,$agentname,$agentidno,$agentmobile,$password,$changepasswordonlogon){
            if($this->checkagentidno($agentidno)=="exists"){
                return json_encode("Agent ID Number exists");
            }else if($this->checkagentmobileno($agentmobile)=="exists"){
                return json_encode("Agent Mobile No exists");
            }else{
                // generate salt
                $salt=$this->uniqidReal(40);
                // hash password
                $hashedpassword=$this->hashpassword($password.$salt);
                $sql="CALL spsaveAgent ({$agentid},{$electionid},{$candidate},{$polingcenter},'{$agentname}','{$agentidno}','{$agentmobile}','{$hashedpassword}','{$salt}',{$changepasswordonlogon})";
                // echo $sql."<br/>";
                $row=$this->getData($sql)->fetch();
                $_SESSION['agentsavedid']=$row['Id'];
                // sms the agent his generated password.
                $sms="Hello ".$agentname.", your password for the tally portal is ". $password.". Username is your mobile phone number. Thank you.";
                $smsresult=sendSMS($agentmobile, $sms);							
                if($smsresult=='Success'){
                    return json_encode("success");
                }else{
                    return json_encode("smsfailed");
                }   
            }
           
        }

        function agentlogin($username,$password){
            $sql="CALL getAgentLogon ('{$username}')";
            // echo $sql."<br/>";
            $rst=$this->getData($sql);
            if ($rst->rowCount()){
                $row=$rst->fetch();
                $hashedpass=$this->hashpassword($password.$row['Salt']);
                if($hashedpass==$row['Password']){
                    $_SESSION['polingstationid']=$row['PolingStationId'];
                    $_SESSION['agentid']=$row['AgentId'];
                    $_SESSION['agentusername']=$row['Mobile'];
                    $changepassword=$row['ChangePasswordOnLogOn'];
                    $expired=$row['Expired'];
                    $active=$row['Active'];
                    $_SESSION['AgentName']=$row['AgentName'];
                    if($changepassword===1){
                        return json_encode("change password");
                    }
                    else if($active===0){
                        return json_encode("disabled")	;
                    }else if($expired===1){
                        return json_encode("expired")	;
                    }else{
                        return json_encode("success")	;
                    }
                }else{
                    return json_encode("Invalid Username or Password. Please correct then try again");
                }
            }else{
                return json_encode("Invalid Username or Password. Please correct then try again");
            }
        }

        function changeagentpassword($oldpassword,$newpassword){
            // generate salt
            $salt=$this->uniqidReal(40);
            // hash password
            $hashedpassword=$this->hashpassword($newpassword.$salt);

            $sql="CALL getAgentLogon ('{$_SESSION['agentusername']}')";
            $rst=$this->getData($sql);
			if ($rst->rowCount()) {
                $row=$this->fetch();
                if($row['Password']==$this->hashpassword($oldpassword.$row['Salt'])){
                    $sql="CALL spChangeAgentPassword ({$_SESSION['agentid']},'{$hashedpassword}','{$salt}',0)";
                    $this->getData($sql);
                    return json_encode("success") ;
                }else{
                    return json_encode("Incorrect old password. Please correct then try again"); 
                }
			}else{
                return json_encode("Incorrect old password. Please correct then try again");
            }
        }

        function checkagentidno($agentidno){
            $sql="CALL spCheckAgentIdNo ('{$agentidno}')";
			return json_encode($this->getData($sql)->rowCount()?"exists":"notexists");
        }

        function checkagentmobileno($agentmobileno){
			$sql="CALL spCheckAgentMobileNo ('{$agentmobileno}')";
            return json_encode($this->getData($sql)->rowCount()?"exists":"notexists");
        }

        function getagents(){
            $sql="CALL `sp_getagents`()";
            return $this->getJSON($sql);
        }

    }

?>