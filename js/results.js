$(document).ready(()=>{
    const electionfield=$("#election")
    const countyfield=$("#county")
    const constituencyfield=$("#constituency")
    const wardfield=$("#ward")
    const polingcenterfield=$("#polingcenter")
    const searchbutton=$("#filter")
    const polingstationfield=$("#polingstation")
    const electionresults=$("#electionresults")
    const electionnotifications=$("#electionnotifications")
    const selectfield=$("select")
    const generateresultsselector=$("#generateresultreports")
    let electionreport="nationalgroup"

    getcounties(countyfield)
    getconstituencies(0,constituencyfield)
    getelections(electionfield,'choose')
    getwards(0,wardfield)
    getpolingcenters(0,polingcenterfield)
    getpolingstations(0,polingstationfield)

    generateresultsselector.on("click",".options",function(){
        electionreport=$(this).attr("data-id")
        switch (electionreport) {
            case "nationalgroup":
                countyfield.val(0)
                constituencyfield.val(0)
                wardfield.val(0)
                polingcenterfield.val(0)
                polingstationfield.val(0)
                countyfield.prop("disabled",true)
                constituencyfield.prop("disabled",true)
                wardfield.prop("disabled",true)
                polingcenterfield.prop("disabled",true)
                polingstationfield.prop("disabled",true)
                break;
            case "countygroup":
                constituencyfield.val(0)
                wardfield.val(0)
                polingcenterfield.val(0)
                polingstationfield.val(0)
                countyfield.prop("disabled",false)
                constituencyfield.prop("disabled",true)
                wardfield.prop("disabled",true)
                polingcenterfield.prop("disabled",true)
                polingstationfield.prop("disabled",true)
                break;
            case "constituencygroup":
                wardfield.val(0)
                polingcenterfield.val(0)
                polingstationfield.val(0)
                countyfield.prop("disabled",false)
                constituencyfield.prop("disabled",false)
                wardfield.prop("disabled",true)
                polingcenterfield.prop("disabled",true)
                polingstationfield.prop("disabled",true)
                break;
            case "wardgroup":
                polingcenterfield.val(0)
                polingstationfield.val(0)
                countyfield.prop("disabled",false)
                constituencyfield.prop("disabled",false)
                wardfield.prop("disabled",false)
                polingcenterfield.prop("disabled",true)
                polingstationfield.prop("disabled",true)
                break;
            case "polingcentergroup":
                polingstationfield.val(0)
                countyfield.prop("disabled",false)
                constituencyfield.prop("disabled",false)
                wardfield.prop("disabled",false)
                polingcenterfield.prop("disabled",false)
                polingstationfield.prop("disabled",true)
                break;
            case "polingstationgroup":
                countyfield.prop("disabled",false)
                constituencyfield.prop("disabled",false)
                wardfield.prop("disabled",false)
                polingcenterfield.prop("disabled",false)
                polingstationfield.prop("disabled",false)
                break;
            default:
                break;
        }
    })

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
        const polingcenterid=$(this).val()
        getpolingstations(polingcenterid,polingstationfield)
    })

    searchbutton.on("click",()=>{
        const electionid=electionfield.val()
        const countyid=countyfield.val()
        const constituencyid=constituencyfield.val()
        const wardid=wardfield.val()
        const polingcenterid=polingcenterfield.val()
        const polingstationid=polingstationfield.val()
        console.log("Clicked")
        if(electionid==""){
            errors="Please select an election"
            electionnotifications.html(showAlert("info",errors))
        }else{
            if(electionreport=="nationalgroup"){
                getelectionglobalelectionresults(electionid) 
            }else if(electionreport="countygroup"){
                getcountyelectionresults(electionid,countyid)
            }else if(electionreport=="constituencygroup"){
                getconstituencyelectionresults(electionid,constituencyid)
            }else if(electionreport=="wardgroup"){
                getwardelectionresults(electionid,wardid)
            }else if(electionreport=="polingcentergroup"){
                getpolingcenterelectionresults(electionid,polingcenterid)
            }else if(electionreport=="polingstationgroup"){
                getpolingstationelectionresults(electionid,polingstationid)
            }
        }
    })

    function getelectionglobalelectionresults(electionid){
        $.getJSON(
            "../includes/task.php",
            {
                getcandidateglobalresults:true,
                electionid
            },
            (data)=>{
                let totalvotes=0
                let results=`<table class='table table-sm table-striped'>
                    <thead>
                        <th>#</th>
                        <th>Candidate</th>
                        <th>Party</th>
                        <th>Votes</th>
                        <th>Percentage</th>
                    </thead>
                    <tbody>`
                data.forEach((result,index)=>{
                    totalvotes+=Number(result.votes)
                    results+=`<tr><td>${index+1}</td>`
                    results+=`<td><img src='${result.candidateportrait}' height='40px' width='40px'>  ${result.CandidateName}</td>`
                    results+=`<td><img src='${result.Symbol}' height='40px' width='40px'>  ${result.PartyName}</td>`
                    results+=`<td>${$.number(result.votes)}</td>`
                    results+=`<td>${$.number(result.percentage,2)}</td></tr>`
                })
                results+=`</tbody>`
                results+=`
                    <tfoot>
                        <th>Total</th>
                        <th>&nbsp;</th>
                        <th>&nbsp;</th>
                        <th>${$.number(totalvotes)}</th>
                        <th>&nbsp;</th>
                    </tfoot>
                </table>`
                electionresults.html(results)
            }
        )
    }

    selectfield.on("change",()=>{
        electionnotifications.html("")
    })

    function getcountyelectionresults(electionid,countyid){
        $.getJSON(
            "../includes/task.php",
            {
                getcandidatecountyresults:true,
                electionid,
                countyid
            },
            (data)=>{
                let totalvotes=0
                let results=`<table class='table table-sm table-striped'>
                    <thead>
                        <th>#</th>
                        <th>Candidate</th>
                        <th>Party</th>
                        <th>Votes</th>
                        <th>Percentage</th>
                    </thead>
                    <tbody>`
                data.forEach((result,index)=>{
                    totalvotes+=Number(result.votes)
                    results+=`<tr><td>${index+1}</td>`
                    results+=`<td><img src='${result.candidateportrait}' height='40px' width='40px'>  ${result.CandidateName}</td>`
                    results+=`<td><img src='${result.Symbol}' height='40px' width='40px'>  ${result.PartyName}</td>`
                    results+=`<td>${$.number(result.votes)}</td>`
                    results+=`<td>${$.number(result.percentage,2)}</td></tr>`
                })
                results+=`</tbody>`
                results+=`
                    <tfoot>
                        <th>Total</th>
                        <th>&nbsp;</th>
                        <th>&nbsp;</th>
                        <th>${$.number(totalvotes)}</th>
                        <th>&nbsp;</th>
                    </tfoot>
                </table>`
                electionresults.html(results)
            }
        )
    }

    function getwardelectionresults(electionid,wardid){
        $.getJSON(
            "../includes/task.php",
            {
                getcandidatewardresults:true,
                electionid,
                wardid
            },
            (data)=>{
                let totalvotes=0
                let results=`<table class='table table-sm table-striped'>
                    <thead>
                        <th>#</th>
                        <th>Candidate</th>
                        <th>Party</th>
                        <th>Votes</th>
                        <th>Percentage</th>
                    </thead>
                    <tbody>`
                data.forEach((result,index)=>{
                    totalvotes+=Number(result.votes)
                    results+=`<tr><td>${index+1}</td>`
                    results+=`<td><img src='${result.candidateportrait}' height='40px' width='40px'>  ${result.CandidateName}</td>`
                    results+=`<td><img src='${result.Symbol}' height='40px' width='40px'>  ${result.PartyName}</td>`
                    results+=`<td>${$.number(result.votes)}</td>`
                    results+=`<td>${$.number(result.percentage,2)}</td></tr>`
                })
                results+=`</tbody>`
                results+=`
                    <tfoot>
                        <th>Total</th>
                        <th>&nbsp;</th>
                        <th>&nbsp;</th>
                        <th>${$.number(totalvotes)}</th>
                        <th>&nbsp;</th>
                    </tfoot>
                </table>`
                electionresults.html(results)
            }
        )
    }

    function getpolingcenterelectionresults(electionid,polingcenterid){
        $.getJSON(
            "../includes/task.php",
            {
                getcandidatepolingcenterresults:true,
                electionid,
                polingcenterid
            },
            (data)=>{
                let totalvotes=0
                let results=`<table class='table table-sm table-striped'>
                    <thead>
                        <th>#</th>
                        <th>Candidate</th>
                        <th>Party</th>
                        <th>Votes</th>
                        <th>Percentage</th>
                    </thead>
                    <tbody>`
                data.forEach((result,index)=>{
                    totalvotes+=Number(result.votes)
                    results+=`<tr><td>${index+1}</td>`
                    results+=`<td><img src='${result.candidateportrait}' height='40px' width='40px'>  ${result.CandidateName}</td>`
                    results+=`<td><img src='${result.Symbol}' height='40px' width='40px'>  ${result.PartyName}</td>`
                    results+=`<td>${$.number(result.votes)}</td>`
                    results+=`<td>${$.number(result.percentage,2)}</td></tr>`
                })
                results+=`</tbody>`
                results+=`
                    <tfoot>
                        <th>Total</th>
                        <th>&nbsp;</th>
                        <th>&nbsp;</th>
                        <th>${$.number(totalvotes)}</th>
                        <th>&nbsp;</th>
                    </tfoot>
                </table>`
                electionresults.html(results)
            }
        )
    }

    function getpolingstationelectionresults(electionid,polingstationid){
        $.getJSON(
            "../includes/task.php",
            {
                getcandidatepolingstationresults:true,
                electionid,
                polingstationid
            },
            (data)=>{
                let totalvotes=0
                let results=`<table class='table table-sm table-striped'>
                    <thead>
                        <th>#</th>
                        <th>Candidate</th>
                        <th>Party</th>
                        <th>Votes</th>
                        <th>Percentage</th>
                    </thead>
                    <tbody>`
                data.forEach((result,index)=>{
                    totalvotes+=Number(result.votes)
                    results+=`<tr><td>${index+1}</td>`
                    results+=`<td><img src='${result.candidateportrait}' height='40px' width='40px'>  ${result.CandidateName}</td>`
                    results+=`<td><img src='${result.Symbol}' height='40px' width='40px'>  ${result.PartyName}</td>`
                    results+=`<td>${$.number(result.votes)}</td>`
                    results+=`<td>${$.number(result.percentage,2)}</td></tr>`
                })
                results+=`</tbody>`
                results+=`
                    <tfoot>
                        <th>Total</th>
                        <th>&nbsp;</th>
                        <th>&nbsp;</th>
                        <th>${$.number(totalvotes)}</th>
                        <th>&nbsp;</th>
                    </tfoot>
                </table>`
                electionresults.html(results)
            }
        )
    }
})