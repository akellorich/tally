<?php
    require_once("db.php");

    class user extends db{

        function hashpassword($password){
            return hash("SHA256",$password);
        }

        function userlogon($username,$password){
            
            $salt=$this->uniqidReal(40);
            $hashedpassword=$this->hashpassword('k@r1bu'.$salt);
            $sql="CALL spChangeUserPassword ('{$username}','{$hashedpassword}','{$salt}',0)";
            $this->getData($sql);

            $sql="CALL spGetUserLogin ('{$username}')";
			$rst=$this->getData($sql);
            if ($rst->rowCount()){
                $row=$rst->fetch();
                if($this->hashpassword($password.$row['Salt'])==$row['Password']){
                    $_SESSION['userid']=$row['UserId'];
                    $_SESSION['username']=$row['UserName'];
                    $changepassword=$row['ChangePassword'];
                    $expired=$row['Expired'];
                    $active=$row['Active'];
                    $_SESSION['fullname']=$row['FirstName']. ' '.$row['MiddleName'].' '.$row['LastName'];
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
                    return json_encode("Invalid Username or Password.");
                }
            }else{
                return json_encode("Invalid Username or Password.");
            }
        }

        function changeuserpassword($oldpassword,$newpassword){
            $salt=$this->uniqidReal(40);
            $sql="CALL spGetUserLogin ('{$_SESSION['username']}')";
            $rst=$this->getData($sql);
            if($rst->rowCount()){
                if($this->hashpassword($oldpassword.$row['Salt']==$row['Password'])){
                    $sql="CALL spChangeUserPassword ('{$_SESSION['username']}','{$newpassword}','{$salt}',0)";
                    $this->getData($sql);
                    return json_encode("success") ;
                }else{
                    return json_encode("Incorrect old password.");
                }
            }else{
                return json_encode("Incorrect old password.");
            }
        }

        function logoutuser(){
            session_destroy();
        }
    }

?>