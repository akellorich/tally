<?php
    require_once("db.php");

    class user extends db{
        function userlogon($username,$password){
            $sql="CALL spGetUserLogin ('{$username}','{$password}')";
			$rst=$this->getData($sql);
            if ($rst->rowCount()){
                $row=$rst->fetch();
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
                return json_encode("Invalid Username or Password. Please correct then try again");
            }
        }

        function changeuserpassword($oldpassword,$newpassword){
            $sql="CALL spGetUserLogin '{$_SESSION['username']}','{$oldpassword}'";
            if($this->getData($sql)->rowCount()){
                $sql="CALL spChangeUserPassword ('{$_SESSION['username']}','{$newpassword}',0)";
                $this->getData($sql);
                return json_encode("success") ;
            }else{
                return json_encode("Incorrect old password. Please correct then try again");
            }
        }
    }

?>