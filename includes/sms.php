<?php
require_once 'config.php';
require_once 'AfricasTalkingGateway.php';

// Be sure to include the file you've just downloaded
require_once('AfricasTalkingGateway.php');
// Specify your login credentials


function sendSMS($recipients,$message){	
	$username   = SMS_USERNAME;
	$apikey     = SMS_APIKEY;
	$gateway    = new AfricasTalkingGateway($username, $apikey);
	$statusreport='';	
	try
	{
		// Thats it, hit send and we'll take care of the rest.
		$results = $gateway->sendMessage($recipients, $message);	
		foreach($results as $result) {
			$statusreport .= $result->number . ' - '.$result->status .'<br/>';
			// status is either "Success" or "error message"
			//echo " Number: " .$result->number;
			//echo " Status: " .$result->status;
			//echo " MessageId: " .$result->messageId;
			//echo " Cost: "   .$result->cost."\n";
			// Log this somwehere in the server
		}
		return "Success";
	}
	catch ( AfricasTalkingGatewayException $e )
	{
		return "Encountered an error while sending: ".$e->getMessage();
	}
	// DONE!!!
}

?>