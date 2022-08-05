DELIMITER $$

DROP PROCEDURE IF EXISTS `spGetElections`$$

CREATE DEFINER=`projemic`@`localhost` PROCEDURE `spGetElections`(
	$electionstatus VARCHAR(50))
BEGIN
	IF $electionstatus='<All>' THEN
		
		SELECT * FROM elections ORDER BY DATE; 
	ELSE
		 
 		SELECT * FROM `elections` 
		 WHERE `Status`=$electionstatus 
		 ORDER BY `Date`;
	END IF; 
		 
END$$

DELIMITER ;