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

    ballotpaperslist.hide()
    ballotseals.show()

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
        }else if(report=="ballotpapers"){
            ballotseals.hide()
            ballotpaperslist.show()
        }
    })

    searchbutton.on("click",function(){ 
        const countyid=countyfield.val()
        const constituencyid=constituencyfield.val()
        const wardid=wardfield.val()
        const polingcenterid=polingcenterfield.val()
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
            }
        }
    })

    selectfield.on("change",()=>{
        filternotifications.html("")
    })
})