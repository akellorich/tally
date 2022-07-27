var createSQL=[]
createSQL.push("CREATE TABLE IF NOT EXISTS BallotBoxPollSerials(Id INTEGER PRIMARY KEY,ElectionId INTEGER, SerialNo VARCHAR(20),Category VARCHAR(50),Status VARCHAR(50), Attachment BLOB)")
createSQL.push("CREATE TABLE IF NOT EXISTS BallotPaperSerials(Id INTEGER PRIMARY KEY,ElectionId INTEGER, SerialNo VARCHAR(20),Pieces INTEGER,Status VARCHAR(50))")
createSQL.push("CREATE TABLE IF NOT EXISTS Incidents(Id INTEGER PRIMARY KEY,ElectionId INTEGER,RefNO VARCHAR(50), Description VARCHAR(500),Status VARCHAR(50))")
createSQL.push("CREATE TABLE IF NOT EXISTS SpoiltBallotpapers(Id INTEGER PRIMARY KEY,ElectionId INTEGER, SerialNo VARCHAR(20),Reason VARCHAR(500),Status VARCHAR(50))")
createSQL.push("CREATE TABLE IF NOT EXISTS MissingVoters(Id INTEGER PRIMARY KEY,ElectionId INTEGER, VoterIDNo VARCHAR(20),VoterName VARCHAR(100),Reason VARCHAR(500), Status VARCHAR(50))")
createSQL.push("CREATE TABLE IF NOT EXISTS Results(Id INTEGER PRIMARY KEY,ElectionId INTEGER, RefNo VARCHAR(20),Spoilt INTEGER, Stray INTEGER,Status VARCHAR(50))")
createSQL.push("CREATE TABLE IF NOT EXISTS ResultsDetails(Id INTEGER PRIMARY KEY,RefNo VARCHAR(20),CandidateId INTEGER,Votes INTEGER,Status VARCHAR(50))")

var db=prepareDatabase()

function openGetDatabase(){
	try{
		if(!!window.openDatabase) {
			return window.openDatabase 
		}else {
			return undefined
		}
	}
	catch(e){
		return undefined
	}
}

function prepareDatabase(){
	var odb=openGetDatabase()
	if(!odb){
		console.log("Web SQL not suppoted")
		return undefined
	}else{
		db=odb("tally","1.0","tally database",10*1024*4096)
		this.sql = createSQL;
	    db.transaction(
	      function(tx){
		     for(var i=0; i<this.sql.length; i++){
			      console.log("execute sql : " + this.sql[i]);
			      tx.executeSql(this.sql[i]);
			    }    
		   },
	      
		  function(error){
		    console.log("error call back : " + JSON.stringify(error));
		    console.log(error);
	      },
		  
	      function(){
		    console.log("transaction complete call back ");
		  }
	    )
	    
		/*db.transaction(function(t){
			t.executeSql(
				createSQL,
				[],
				// success callback
				function(t,r){
					console.log("Table created successfully. Rows affected: "+r.rowsAffected)
				},
				//error callback
				function(t,e){
					console.log("Table not created. "+ e.message)
				}	
			)
		})*/
	}
}

function saveBallotBoxPollingSerial(serialno,category,electionid,Attachment){
	//var db=prepareDatabase()
	SQL="INSERT INTO BallotBoxPollSerials(SerialNo,ElectionId,Category, Attachment,Status) VALUES(?,?,?,?,?)"
	var odb=openGetDatabase()
	if(!odb){
		return undefined
	}else{
		db=odb("tally","1.0","tally database",10*1024*5120)  // 50 MB
		db.transaction(function(t){
			t.executeSql(
				SQL,
				[serialno,electionid,category,Attachment,'Pending'],
				//error callback
				function(t,e){
					//console.log("Ballotbox Serial not added. "+ e.message)
					//return false
					console.log(e.message)
				},
				// success callback
				function(t,r){
					//return true
					console.log("Ballotbox Serial Added Successfully. Rows affected: "+r.rowsAffected)
					//displayError("<p> The Ballotbox seal serial stored on the device successfully.</p>")
				}	
			)
		})
	}
}

function saveMissingVoter(ElectionId, VoterIDNo,VoterName,Reason,Status){
	var odb=openGetDatabase()
	if(!odb){
		//alert("Web SQL not suppoted")
		return undefined
	}else{
		SQL="INSERT INTO MissingVoters(ElectionId, VoterIDNo,VoterName,Reason,Status) VALUES(?,?,?,?,?)"
		db.transaction(function(t){
			t.executeSql(
				SQL,
				[ElectionId,SerialNo,VoterIDNo,VoterName,Reason,'Pending'],
				//error callback
				function(t,e){
					console.log("Missing not saved. "+ e.message)
				},
				// success callback
				function(t,r){
					console.log("Missing voter saved. Rows affected: "+r.rowsAffected)
				}	
			)
		})
	}
}

function saveIncident(ElectionId,Description){
	var odb=openGetDatabase(),
		RefNo=parseInt(Math.random()*1000000)
	if(!odb){
		//alert("Web SQL not suppoted")
		return undefined
	}else{
		SQL="INSERT INTO Incidents(ElectionId,RefNo, Description,Status) VALUES(?,?,?,?)"
		db.transaction(function(t){
			t.executeSql(
				SQL,
				[ElectionId,Refno,Description,'Pending'],
				//error callback
				function(t,e){
					console.log("Incident not saved. "+ e.message)
				},
				// success callback
				function(t,r){
					// Push photos to the DB
					console.log("Incident saved. Rows affected: "+r.rowsAffected)
				}	
			)
		})
	}
}

function saveSpoiltBallot(ElectionId,SerialNo,Reason){
	var odb=openGetDatabase(),
		RefNo=parseInt(Math.random()*1000000)
	if(!odb){
		//alert("Web SQL not suppoted")
		return undefined
	}else{
		SQL="INSERT INTO SpoiltBallotpapers(ElectionId, SerialNo,Reason,Status) VALUES(?,?,?,?)"
		db.transaction(function(t){
			t.executeSql(
				SQL,
				[ElectionId,SerialNo,Reason,'Pending'],
				//error callback
				function(t,e){
					console.log("SpoiltBallot not saved. "+ e.message)
				},
				// success callback
				function(t,r){
					console.log("Spoilt ballot saved. Rows affected: "+r.rowsAffected)
				}	
			)
		})
	}
}

function saveResults(ElectionId,Spoilt, Stray,Candidates){
	var odb=openGetDatabase(),
	RefNo=parseInt(Math.random()*1000000)
	if(!odb){
		//alert("Web SQL not suppoted")
		return undefined
	}else{
		SQL="INSERT INTO Results((ElectionId,Spoilt, Stray,Status) VALUES(?,?,?,?)"
		db.transaction(function(t){
			t.executeSql(
				SQL,
				[ElectionId,Spoilt,Stray,'Pending'],
				//error callback
				function(t,e){
					console.log("SpoiltBallot not saved. "+ e.message)
				},
				// success callback
				function(t,r){
					console.log("Spoilt ballot saved. Rows affected: "+r.rowsAffected)
					// save all the candidate results
					this.candidatesResults = Candidates
					 db.transaction(
					      function(tx){
					    	 SQL="INSERT INTO ResultsDetails(RefNo,CandidateId,Votes,Status) VALUES(?,?,?,?)"
						     for(var i=0; i<this.candidatesResults.length; i++){
						    	 var candidateid=this.candidatesResults[i].voterid,
						    	 	 candidatevotes=this.candidatesResults[i].votes
							      tx.executeSql(SQL,[RefNo,candidateid,candidatevotes,'Pending']);
							    }    
						   },
					      
						  function(error){
						    console.log("error call back : " + JSON.stringify(error));
						    console.log(error);
					      },
						  
					      function(){
						    console.log("transaction complete call back ");
						  }
				    )
					
				}	
			)
		})
	}
}

function saveBallotPaperSerials(ElectionId,SerialNo,Pieces){
	var odb=openGetDatabase()
	if(!odb){
		//alert("Web SQL not suppoted")
		return undefined
	}else{
		SQL="INSERT INTO BallotPaperSerials(ElectionId,SerialNo,Pieces,Status) VALUES(?,?,?,?)"
		db.transaction(function(t){
			t.executeSql(
				SQL,
				[ElectionId,SerialNo,Pieces,'Pending'],
				//error callback
				function(t,e){
					console.log("Ballotpaper serial not saved. "+ e.message)
				},
				// success callback
				function(t,r){
					console.log("Ballotpaper serial saved. Rows affected: "+r.rowsAffected)
				}	
			)
		})
	}
}

function checkRecord(sql){
	var odb=openGetDatabase()
	if(!odb){
		return undefined
	}else{
		db=odb("tally","1.0","tally database",10*1024*4096)
		db.readTransaction(function(t){
			t.executeSql(
				sql,
				[],
				// success callback
				function(t,r){
					return r.rows.item(0).appears
					//return true
					//console.log("Ballotbox Serial Added Successfully. Rows affected: "+r.rowsAffected)
					//displayError("<p> The Ballotbox seal serial stored on the device successfully.</p>")
				},
				//error callback
				function(t,e){
					//console.log("Ballotbox Serial not added. "+ e.message)
					//return false
					return 0
					console.log(e.message)
				}	
			)
		})
	}
}


