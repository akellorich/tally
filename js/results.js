$(document).ready(()=>{
    const electionfield=$("#election")
    const countyfield=$("#county")
    const constituencyfield=$("#constituency")
    const wardfield=$("#ward")
    const polingcenterfield=$("#polingcenter")
    const searchbutton=$("#filter")
    const electiongroupselector=$("#electiongroupselector")
    const electionresults=$("#electionresults")
    const electionnotifications=$("#electionnotifications")
    const selectfield=$("select")

    let electionreport="candidateglobal"

    getcounties(countyfield)
    getconstituencies(0,constituencyfield)
    getelections(electionfield,'choose')
    getwards(0,wardfield)
    getpolingcenters(0,polingcenterfield)
    

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

    electionfield.on("change",function(){
        electionid=$(this).val()
        $.getJSON(
            "../includes/task.php",
            {
                getelectiondetails:true,
                electionid
            },
            (data)=>{
                if(data[0].PositionId==1){
                    // electiongroupselector.each(()=>{
                    //     if($(this).attr("data-id")=="wardgroup" || $(this).attr("data-id")=="polingcentergroup"){
                    //         $(this).prop("disabled",true)
                    //     }else{
                    //         $(this).prop("disabled",false)
                    //     }
                    // })
                }
            }
        )
    })

    searchbutton.on("click",()=>{
        const electionid=electionfield.val()
        console.log("Clicked")
        if(electionid==""){
            errors="Please select an election"
            electionnotifications.html(showAlert("info",errors))
        }else{
            if(electionreport=="candidateglobal"){
                getelectionglobalelectionresults(electionid) 
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
                let results=`<table class='table table-sm table-striped'>
                    <thead>
                        <th>#</th>
                        <th>Candidate<th>
                        <th>Party<th>
                        <th>Votes<th>
                        <th>Percentage<th>
                    </thead>
                    <tbody>`
                data.forEach((result,index)=>{
                    results+=`<tr><td>${index+1}</td>`
                    results+=`<td><img src='${result.candidateportrait}'> ${result.candidatename}</td>`
                    results+=`<td>${result.partyname}</td>`
                    results+=`<td>${$.number(result.votes)}</td>`
                    results+=`<td>${$.number(result.percentage)}</td></tr>`
                })
                results+=`</tbody></table>`
                electionresults.html(results)
            }
        )
    }

    selectfield.on("change",()=>{
        electionnotifications.html("")
    })
})