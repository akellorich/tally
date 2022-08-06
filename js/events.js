$(document).ready(()=>{
    const electionfield=$("#election")
    const countyfield=$("#county")
    const constituencyfield=$("#constituency")
    const wardfield=$("#ward")
    const polingcenterfield=$("#polingcenter")
    const polingstationfield=$("#polingstation")
    const searchbutton=$("#filterevents")
    const reportgroup=$("#generateeventreports")
    const startballotsealslist=$("#startballotseals")
    const filternotifications=$("#filternotifications")
    const selectfield=$("select")
    const ballotpaperslist=$("#ballotpapers")
    const ballotseals=$("#ballotseals")
    let report="startballotseals"

    const turnedawayvoterslist=$("#turnedwayavoterslist")
    const incidenceslist=$("#incidenceslist")
    const spoiltballotslist=$("#spoiltballotslist")

    
    ballotseals.show()
    ballotpaperslist.hide()
    turnedawayvoterslist.hide()
    incidenceslist.hide()
    spoiltballotslist.hide()

    getcounties(countyfield)
    getconstituencies(0,constituencyfield)
    getelections(electionfield,'choose')
    getwards(0,wardfield)
    getpolingcenters(0,polingcenterfield)
    getpolingstations(0,polingstationfield)

    countyfield.on("change",function(){
        countyid=$(this).val()
        getconstituencies(countyid,constituencyfield)
    })

    constituencyfield.on("change",function(){
        constituencyid=$(this).val()
        getwards(constituencyid,wardfield)
    })

    wardfield.on("change",function(){
        wardid=$(this).val()
        getpolingcenters(wardid,polingcenterfield)
    })

    polingcenterfield.on("change",function(){
        polingcenterid=$(this).val()
        getpolingstations(polingcenterid,polingstationfield)
    })

    reportgroup.on("click",".eventreport",function(){
        report=$(this).attr("data-id")
        console.log(report)
        if(report=="startballotseals"|| report=="closedballotseals"){
            ballotseals.show()
            ballotpaperslist.hide()
            turnedawayvoterslist.hide()
            incidenceslist.hide()
            spoiltballotslist.hide()
        }else if(report=="ballotpapers"){
            ballotseals.hide()
            ballotpaperslist.show()
            turnedawayvoterslist.hide()
            incidenceslist.hide()
            spoiltballotslist.hide()
        }else if(report=="turnedawayvoters"){
            ballotseals.hide()
            ballotpaperslist.hide()
            turnedawayvoterslist.show()
            incidenceslist.hide()
            spoiltballotslist.hide()
        }else if(report=="incidences"){
            ballotseals.hide()
            ballotpaperslist.hide()
            turnedawayvoterslist.hide()
            incidenceslist.show()
            spoiltballotslist.hide()
        }else if(report=="spoiltballots"){
            ballotseals.hide()
            ballotpaperslist.hide()
            turnedawayvoterslist.hide()
            incidenceslist.hide()
            spoiltballotslist.show()
        }
    })

    searchbutton.on("click",function(){ 
        const countyid=countyfield.val()
        const constituencyid=constituencyfield.val()
        const wardid=wardfield.val()
        const polingcenterid=polingcenterfield.val()
        const polingstationid=polingstationfield.val()
        const electionid=electionfield.val()

        let results=""
        if(electionid==""){
            filternotifications.html(showAlert("info","Please select election"))
        }else{
            if(report=="startballotseals" ){
                $.getJSON(
                    "../includes/task.php",
                    {
                        getballotboxopeningseals:true,
                        electionid,
                        countyid,
                        constituencyid,
                        wardid,
                        polingcenterid
                    },
                    (data)=>{
                        data.forEach((seal, index)=>{
                            results+=`<tr><td>${index+1}</td>`
                            results+=`<td>${seal.dateadded}</td>`
                            results+=`<td>${seal.countyname}</td>`
                            results+=`<td>${seal.constituencyname}</td>`
                            results+=`<td>${seal.wardname}</td>`
                            results+=`<td>${seal.polingcentername}</td>`
                            results+=`<td>${seal.polingstationname}</td>`
                            results+=`<td>${seal.serialno}</td>`
                            results+=`<td>${seal.agentname}</td>`
                            results+=`<td><a href='${seal.attachment}' target="_blank">Download</a></td></tr>`
                        })
                        startballotsealslist.find("tbody").html(results)
                    }
                )
            }else if(report=="closedballotseals"){
                $.getJSON(
                    "../includes/task.php",
                    {
                        getballotboxsealedseals:true,
                        electionid,
                        countyid,
                        constituencyid,
                        wardid,
                        polingcenterid
                    },
                    (data)=>{
                        data.forEach((seal, index)=>{
                            results+=`<tr><td>${index+1}</td>`
                            results+=`<td>${seal.dateadded}</td>`
                            results+=`<td>${seal.countyname}</td>`
                            results+=`<td>${seal.constituencyname}</td>`
                            results+=`<td>${seal.wardname}</td>`
                            results+=`<td>${seal.polingcentername}</td>`
                            results+=`<td>${seal.polingstationname}</td>`
                            results+=`<td>${seal.serialno}</td>`
                            results+=`<td>${seal.agentname}</td>`
                            results+=`<td><a href='${seal.attachment}' target="_blank">Download</a></td></tr>`
                        })
                        startballotsealslist.find("tbody").html(results)
                    }
                )
            }else if(report=="ballotpapers"){
                let results=""
                if(countyid==0){
                    $.getJSON(
                        "../includes/task.php",
                        {
                            getballotpapaersglobally:true,
                            electionid
                        },
                        (data)=>{
                            results+=`<table class='table table-sm table-striped'>
                                <thead>
                                    <th>#</th>
                                    <th>County Code</th>
                                    <th>County Name</th>
                                    <th>Booklets</th>
                                    <th>Ballot Papers Used</th>
                                    <th>Registered Voters</th>
                                    <th>Turn Out</th>
                                </thead>
                                <tbody>`
                            data.forEach((ballotpaper,index)=>{
                                let turnout=(ballotpaper.BallotPapers/ballotpaper.registeredvoters)*100
                                results+=`<tr><td>${index+1}</td>`
                                results+=`<td>${ballotpaper.countycode}</td>`
                                results+=`<td>${ballotpaper.countyname}</td>`
                                results+=`<td>${$.number(ballotpaper.Booklets)}</td>`
                                results+=`<td>${$.number(ballotpaper.BallotPapers)}</td>`
                                results+=`<td>${$.number(ballotpaper.registeredvoters)}</td>`
                                results+=`<td>${$.number(turnout,2)}%</td></tr>`
                            })

                            results+=`</tbody></table>`
                            // console.log(results)
                            ballotpaperslist.html(results)
                        }
                    )
                }else if(constituencyid==0){
                    $.getJSON(
                        "../includes/task.php",
                        {
                            getballotpapersconstituency:true,
                            electionid,
                            countyid
                        },
                        (data)=>{
                            results+=`<table class='table table-sm table-striped'>
                                <thead>
                                    <th>#</th>
                                    <th>Constituency Code</th>
                                    <th>Constituency Name</th>
                                    <th>Booklets</th>
                                    <th>Ballot Papers Used</th>
                                    <th>Registered Voters</th>
                                    <th>Turn Out</th>
                                </thead>
                                <tbody>`
                            data.forEach((ballotpaper,index)=>{
                                let turnout=(ballotpaper.BallotPapers/ballotpaper.registeredvoters)*100
                                results+=`<tr><td>${index+1}</td>`
                                results+=`<td>${ballotpaper.constituencycode}</td>`
                                results+=`<td>${ballotpaper.constituencyname}</td>`
                                results+=`<td>${$.number(ballotpaper.Booklets)}</td>`
                                results+=`<td>${$.number(ballotpaper.BallotPapers)}</td>`
                                results+=`<td>${$.number(ballotpaper.registeredvoters)}</td>`
                                results+=`<td>${$.number(turnout,2)}%</td></tr>`
                            })

                            results+=`</tbody></table>`
                            // console.log(results)
                            ballotpaperslist.html(results)
                        }
                    )
                }
            }else if(report=="turnedawayvoters"){
                if(countyid==0){
                    $.getJSON(
                        "../includes/task.php",
                        {
                            getturnedawayvotersglobally:true,
                            electionid
                        },
                        (data)=>{
                            results+=`<table class='table table-sm table-striped'>
                                <thead>
                                    <th>#</th>
                                    <th>County Code</th>
                                    <th>County Name</th>
                                    <th>Poling Stations</th>
                                    <th>Elections</th>
                                    <th>Voters</th>
                                </thead>
                                <tbody>`
                            data.forEach((turnedawayvoters,index)=>{
                                // let turnout=(turnedawayvoters.turnedawayvoterss/turnedawayvoters.registeredvoters)*100
                                results+=`<tr><td>${index+1}</td>`
                                results+=`<td>${turnedawayvoters.countycode}</td>`
                                results+=`<td>${turnedawayvoters.countyname}</td>`
                                results+=`<td>${$.number(turnedawayvoters.polingstations)}</td>`
                                results+=`<td>${$.number(turnedawayvoters.summarycount)}</td>`
                                results+=`<td>${$.number(turnedawayvoters.voters)}</td></tr>`
                            })

                            results+=`</tbody></table>`
                            // console.log(results)
                            turnedawayvoterslist.html(results)
                        }
                    )
                }else if(constituencyid==0){
                    $.getJSON(
                        "../includes/task.php",
                        {
                            getturnedwayvoterscounty:true,
                            electionid,
                            countyid
                        },
                        (data)=>{
                            results+=`<table class='table table-sm table-striped'>
                                <thead>
                                    <th>#</th>
                                    <th>Constituency Code</th>
                                    <th>Constituency Name</th>
                                    <th>Poling Stations</th>
                                    <th>Elections</th>
                                    <th>Voters</th>
                                </thead>
                                <tbody>`
                            data.forEach((turnedawayvoters,index)=>{
                                // let turnout=(turnedawayvoters.turnedawayvoterss/turnedawayvoters.registeredvoters)*100
                                results+=`<tr><td>${index+1}</td>`
                                results+=`<td>${turnedawayvoters.constituencycode}</td>`
                                results+=`<td>${turnedawayvoters.constituencyname}</td>`
                                results+=`<td>${$.number(turnedawayvoters.polingstations)}</td>`
                                results+=`<td>${$.number(turnedawayvoters.summarycount)}</td>`
                                results+=`<td>${$.number(turnedawayvoters.voters)}</td></tr>`
                            })

                            results+=`</tbody></table>`
                            // console.log(results)
                            turnedawayvoterslist.html(results)
                        }
                    )
                }else if(wardid==0){
                    $.getJSON(
                        "../includes/task.php",
                        {
                            getturnawayvotersbyconstituency:true,
                            electionid,
                            constituencyid
                        },
                        (data)=>{
                            results+=`<table class='table table-sm table-striped'>
                                <thead>
                                    <th>#</th>
                                    <th>Ward Code</th>
                                    <th>Ward Name</th>
                                    <th>Poling Stations</th>
                                    <th>Elections</th>
                                    <th>Voters</th>
                                </thead>
                                <tbody>`
                            data.forEach((turnedawayvoters,index)=>{
                                // let turnout=(turnedawayvoters.turnedawayvoterss/turnedawayvoters.registeredvoters)*100
                                results+=`<tr><td>${index+1}</td>`
                                results+=`<td>${turnedawayvoters.wardcode}</td>`
                                results+=`<td>${turnedawayvoters.wardname}</td>`
                                results+=`<td>${$.number(turnedawayvoters.polingstations)}</td>`
                                results+=`<td>${$.number(turnedawayvoters.summarycount)}</td>`
                                results+=`<td>${$.number(turnedawayvoters.voters)}</td></tr>`
                            })

                            results+=`</tbody></table>`
                            // console.log(results)
                            turnedawayvoterslist.html(results)
                        }
                    )
                }else if(polingcenterid==0){
                    $.getJSON(
                        "../includes/task.php",
                        {
                            getturnawayvotersbyward:true,
                            electionid,
                            wardid
                        },
                        (data)=>{
                            results+=`<table class='table table-sm table-striped'>
                                <thead>
                                    <th>#</th>
                                    <th>Center Code</th>
                                    <th>Center Name</th>
                                    <th>Poling Stations</th>
                                    <th>Elections</th>
                                    <th>Voters</th>
                                </thead>
                                <tbody>`
                            data.forEach((turnedawayvoters,index)=>{
                                // let turnout=(turnedawayvoters.turnedawayvoterss/turnedawayvoters.registeredvoters)*100
                                results+=`<tr><td>${index+1}</td>`
                                results+=`<td>${turnedawayvoters.polingcentercode}</td>`
                                results+=`<td>${turnedawayvoters.polingcentername}</td>`
                                results+=`<td>${$.number(turnedawayvoters.polingstations)}</td>`
                                results+=`<td>${$.number(turnedawayvoters.summarycount)}</td>`
                                results+=`<td>${$.number(turnedawayvoters.voters)}</td></tr>`
                            })

                            results+=`</tbody></table>`
                            // console.log(results)
                            turnedawayvoterslist.html(results)
                        }
                    )
                }else if(polingstationid==0){
                    $.getJSON(
                        "../includes/task.php",
                        {
                            getturnawayvotersbypolingcenter:true,
                            electionid,
                            polingcenterid
                        },
                        (data)=>{
                            results+=`<table class='table table-sm table-striped'>
                                <thead>
                                    <th>#</th>
                                    <th>Station Code</th>
                                    <th>Station Name</th>
                                    <th>Elections</th>
                                    <th>Voters</th>
                                </thead>
                                <tbody>`
                            data.forEach((turnedawayvoters,index)=>{
                                // let turnout=(turnedawayvoters.turnedawayvoterss/turnedawayvoters.registeredvoters)*100
                                results+=`<tr><td>${index+1}</td>`
                                results+=`<td>${turnedawayvoters.polingstationcode}</td>`
                                results+=`<td>${turnedawayvoters.polingstationname}</td>`
                                // results+=`<td>${$.number(turnedawayvoters.polingstations)}</td>`
                                results+=`<td>${$.number(turnedawayvoters.summarycount)}</td>`
                                results+=`<td>${$.number(turnedawayvoters.voters)}</td></tr>`
                            })

                            results+=`</tbody></table>`
                            // console.log(results)
                            turnedawayvoterslist.html(results)
                        }
                    )
                }else{
                    $.getJSON(
                        "../includes/task.php",
                        {
                            getturnawayvotersbypolingstation:true,
                            electionid,
                            polingstationid
                        },
                        (data)=>{
                            results+=`<table class='table table-sm table-striped'>
                                <thead>
                                    <th>#</th>
                                    <th>Voter ID #</th>
                                    <th>Names</th>
                                    <th>Reason</th>
                                    <th>Attachment</th>
                                </thead>
                                <tbody>`
                            data.forEach((turnedawayvoters,index)=>{
                                results+=`<tr><td>${index+1}</td>`
                                results+=`<td>${turnedawayvoters.voteridno}</td>`
                                results+=`<td>${turnedawayvoters.names}</td>`
                                results+=`<td>${turnedawayvoters.reason}</td>`
                                results+=`<td><a href='${turnedawayvoters.attachment}' target='_blank'>Download</a></td></tr>`
                            })

                            results+=`</tbody></table>`
                            turnedawayvoterslist.html(results)
                        }
                    )
                }
            }else if(report=="incidences"){
                if(countyid==0){

                }
            }else if(report=="spoiltballots"){
                if(countyid==0){
                    $.getJSON(
                        "../includes/task.php",
                        {
                            getspoiltballotsglobal:true,
                            electionid
                        },
                        (data)=>{
                            results+=`<table class='table table-sm table-striped'>
                                <thead>
                                    <th>#</th>
                                    <th>County Code</th>
                                    <th>County Name</th>
                                    <th>Poling Stations</th>
                                    <th>Ballots Spoilt</th>
                                </thead>
                                <tbody>`
                            data.forEach((spoiltballots,index)=>{
                                results+=`<tr><td>${index+1}</td>`
                                results+=`<td>${spoiltballots.countycode}</td>`
                                results+=`<td>${spoiltballots.countyname}</td>`
                                results+=`<td>${$.number(spoiltballots.polingstations)}</td>`
                                results+=`<td>${$.number(spoiltballots.ballotpapers)}</td></tr>`
                            })

                            results+=`</tbody></table>`
                            spoiltballotslist.html(results)
                        }
                    )
                }else if(constituencyid==0){
                    $.getJSON(
                        "../includes/task.php",
                        {
                            getspoiltballotscounty:true,
                            electionid,
                            countyid
                        },
                        (data)=>{
                            results+=`<table class='table table-sm table-striped'>
                                <thead>
                                    <th>#</th>
                                    <th>Constituency Code</th>
                                    <th>Constituency Name</th>
                                    <th>Poling Stations</th>
                                    <th>Ballots Spoilt</th>
                                </thead>
                                <tbody>`
                            data.forEach((spoiltballots,index)=>{
                                results+=`<tr><td>${index+1}</td>`
                                results+=`<td>${spoiltballots.constituencycode}</td>`
                                results+=`<td>${spoiltballots.constituencyname}</td>`
                                results+=`<td>${$.number(spoiltballots.polingstations)}</td>`
                                results+=`<td>${$.number(spoiltballots.ballotpapers)}</td></tr>`
                            })

                            results+=`</tbody></table>`
                            spoiltballotslist.html(results)
                        }
                    )
                }else if(wardid==0){
                    $.getJSON(
                        "../includes/task.php",
                        {
                            getspoiltballotsconstituency:true,
                            electionid,
                            constituencyid
                        },
                        (data)=>{
                            results+=`<table class='table table-sm table-striped'>
                                <thead>
                                    <th>#</th>
                                    <th>Ward Code</th>
                                    <th>Ward Name</th>
                                    <th>Poling Stations</th>
                                    <th>Ballots Spoilt</th>
                                </thead>
                                <tbody>`
                            data.forEach((spoiltballots,index)=>{
                                results+=`<tr><td>${index+1}</td>`
                                results+=`<td>${spoiltballots.wardcode}</td>`
                                results+=`<td>${spoiltballots.wardname}</td>`
                                results+=`<td>${$.number(spoiltballots.polingstations)}</td>`
                                results+=`<td>${$.number(spoiltballots.ballotpapers)}</td></tr>`
                            })

                            results+=`</tbody></table>`
                            spoiltballotslist.html(results)
                        }
                    )
                }else if(polingcenterid==0){
                    $.getJSON(
                        "../includes/task.php",
                        {
                            getspoiltballotsward:true,
                            electionid,
                            wardid
                        },
                        (data)=>{
                            results+=`<table class='table table-sm table-striped'>
                                <thead>
                                    <th>#</th>
                                    <th>Center Code</th>
                                    <th>Center Name</th>
                                    <th>Poling Stations</th>
                                    <th>Ballots Spoilt</th>
                                </thead>
                                <tbody>`
                            data.forEach((spoiltballots,index)=>{
                                results+=`<tr><td>${index+1}</td>`
                                results+=`<td>${spoiltballots.polingcentercode}</td>`
                                results+=`<td>${spoiltballots.polingecentername}</td>`
                                results+=`<td>${$.number(spoiltballots.polingstations)}</td>`
                                results+=`<td>${$.number(spoiltballots.ballotpapers)}</td></tr>`
                            })

                            results+=`</tbody></table>`
                            spoiltballotslist.html(results)
                        }
                    )
                }else if(polingstationid==0){
                    $.getJSON(
                        "../includes/task.php",
                        {
                            getspoiltballotspolingcenter:true,
                            electionid,
                            polingstationid
                        },
                        (data)=>{
                            results+=`<table class='table table-sm table-striped'>
                                <thead>
                                    <th>#</th>
                                    <th>Serial Number</th>
                                    <th>Reason</th>
                                    <th>Attachment</th>
                                </thead>
                                <tbody>`
                            data.forEach((spoiltballots,index)=>{
                                results+=`<tr><td>${index+1}</td>`
                                results+=`<td>${spoiltballots.SpoiltBallotSerialNumber}</td>`
                                results+=`<td>${spoiltballots.Reason}</td>`
                                // results+=`<td>${$.number(spoiltballots.polingstations)}</td>`
                                results+=`<td><a href='${spoiltballots.Attachment} target="_blank">Download</a></td></tr>`
                            })

                            results+=`</tbody></table>`
                            spoiltballotslist.html(results)
                        }
                    )
                }
            }
        }
    })

    selectfield.on("change",()=>{
        filternotifications.html("")
    })
})