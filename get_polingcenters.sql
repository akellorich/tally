DELIMITER $$

DROP PROCEDURE IF EXISTS `spGetPolingCenters`$$

CREATE DEFINER=`projemic`@`localhost` PROCEDURE `spGetPolingCenters`(
	$wardid NUMERIC(18,0))
BEGIN
	
	SELECT * FROM `polingcenters` WHERE WardId=$wardid 
	ORDER BY PolingCenterName;
END$$

DELIMITER ;