$(document).ready(()=>{
    const countieslist=$("#countieslist")
    const filterconstituencycounty=$("#filterconstituencycounty")
    const filterwardcounty=$("#filterwardcounty")
    const filterpolingcentercounty=$("#filterpolingcentercounty")
    const filterpolingstationcounty=$("#filterpolingstationcounty")
    const countyfield=$(".county")

    const constituencieslist=$("#constituencieslist")
    const filterconstituenciesbutton=$("#filterconstituencies")

    const filterwardconstituency=$("#filterwardconstituency")
    const wardslist=$("#wardslist")
    const filterwardsbutton=$("#filterwards")

    const filterpolingcenterconstituency=$("#filterpolingcenterconstituency")
    const filterpolingcenterward=$("#filterpolingcenterward")
    const filterpolingcenterbutton=$("#filterpolingcenters")
    const polingcenterslist=$("#polingcenterslist")

    const filterpolingstationconstituency=$("#filterpolingstationconstituency")
    const filterpolingstationward=$("#filterpolingstationward")
    const filterpolingstationcenter=$("#filterpolingstationcenter")
    const filterpolingstationbutton=$("#filterpolingstations")
    const polingstationslist=$("#polingstationslist")

    getconstituencies(0,filterwardconstituency)
    getconstituencies(0,filterpolingcenterconstituency)
    getwards(0,filterpolingcenterward)

    getconstituencies(0,filterpolingstationconstituency)
    getwards(0,filterpolingstationward)
    getpolingcenters(0,filterpolingstationcenter)

    getcounties(countyfield)
    getcountiessummary()
    getconstituencysummary()// get all constituencies by default
    getwarddetailssummary()
    getpoolingcenterdetailssummary()
    getpolingstationdetailssummary()

    function getcountiessummary(){
        let results=""
        $.getJSON(
            "../includes/task.php",
            {
                request:'getcountydetailssummary'
            },
            (data)=>{
                data.forEach((county,index)=>{
                    results+=`<tr><td>${$.number(Number(index+1))}</td>`
                    results+=`<td>${county.countycode}</td>`
                    results+=`<td>${county.countyname}</td>`
                    results+=`<td>${$.number(county.constituencies)}</td>`
                    results+=`<td>${$.number(county.wards)}</td>`
                    results+=`<td>${$.number(county.polingcenters)}</td>`
                    results+=`<td>${$.number(county.polingstations)}</td>`
                    results+=`<td>${$.number(county.registeredvoters)}</td></tr>`
                })
                countieslist.find("tbody").html(results)
                // convert to datatable
            }
        )
    }

    function getconstituencysummary(countyid){
        let results=""
        $.getJSON(
            "../includes/task.php",
            {
                request:'getconstituencydetailssummary',
                countyid
            },
            (data)=>{
                data.forEach((constituency,index)=>{
                    results+=`<tr><td>${$.number(Number(index+1))}</td>`
                    results+=`<td>${constituency.countyname}</td>`
                    results+=`<td>${constituency.constituencycode}</td>`
                    results+=`<td>${constituency.constituencyname}</td>`
                    results+=`<td>${$.number(constituency.wards)}</td>`
                    results+=`<td>${$.number(constituency.polingcenters)}</td>`
                    results+=`<td>${$.number(constituency.polingstations)}</td>`
                    results+=`<td>${$.number(constituency.registeredvoters)}</td></tr>`
                })
                constituencieslist.find("tbody").html(results)
                // convert to datatable
            }
        )
    }

    filterconstituenciesbutton.on("click",()=>{
        const countyid=filterconstituencycounty.val()
        getconstituencysummary(countyid)
    })

    filterwardcounty.on("change",function(){
        const countyid=$(this).val()
        getconstituencies(countyid,filterwardconstituency)
    })

    function getwarddetailssummary(countyid=0,constituencyid=0){
        getwarddetailssummary

        let results=""
        $.getJSON(
            "../includes/task.php",
            {
                request:'getwarddetailssummary',
                countyid,
                constituencyid
            },
            (data)=>{
                data.forEach((ward,index)=>{
                    results+=`<tr><td>${$.number(Number(index+1))}</td>`
                    results+=`<td>${ward.countyname}</td>`
                    results+=`<td>${ward.constituencyname}</td>`
                    results+=`<td>${ward.wardcode}</td>`
                    results+=`<td>${ward.wardname}</td>`
                    results+=`<td>${$.number(ward.polingcenters)}</td>`
                    results+=`<td>${$.number(ward.polingstations)}</td>`
                    results+=`<td>${$.number(ward.registeredvoters)}</td></tr>`
                })
                wardslist.find("tbody").html(results)
                // convert to datatable
            }
        )
    }

    filterwardsbutton.on("click",()=>{
        const countyid=filterwardcounty.val()
        const constituencyid=filterwardconstituency.val()
        getwarddetailssummary(countyid,constituencyid)
    })

    filterpolingcentercounty.on("change",function(){
        countyid=$(this).val()
        getconstituencies(countyid,filterpolingcenterconstituency)
    })

    filterpolingcenterconstituency.on("change",function(){
        constituencyid=$(this).val()
        getwards(constituencyid,filterpolingcenterward)
    })

    function getpoolingcenterdetailssummary(countyid=0,constituencyid=0,wardid=0){
        let results=""
        $.getJSON(
            "../includes/task.php",
            {
                request:'getpolingcentersdetailssummary',
                countyid,
                constituencyid,
                wardid
            },
            (data)=>{
                data.forEach((polingcenter,index)=>{
                    results+=`<tr><td>${$.number(Number(index+1))}</td>`
                    results+=`<td>${polingcenter.countyname}</td>`
                    results+=`<td>${polingcenter.constituencyname}</td>`
                    results+=`<td>${polingcenter.wardname}</td>`
                    results+=`<td>${polingcenter.polingcentercode}</td>`
                    results+=`<td>${polingcenter.polingcentername}</td>`
                    results+=`<td>${$.number(polingcenter.polingstations)}</td>`
                    results+=`<td>${$.number(polingcenter.registeredvoters)}</td></tr>`
                })
                polingcenterslist.find("tbody").html(results)
                // convert to datatable
            }
        )
    }

    filterpolingcenterbutton.on("click",()=>{
        const countyid=filterpolingcentercounty.val()
        const constituencyid=filterpolingcenterconstituency.val()
        const wardid=filterpolingcenterward.val()
        getpoolingcenterdetailssummary(countyid,constituencyid,wardid)
    })

    filterpolingstationcounty.on("change",function(){
        countyid=$(this).val()
        getconstituencies(countyid,filterpolingstationconstituency)
    })

    filterpolingstationconstituency.on("change",function(){
        constituencyid=$(this).val()
        getwards(constituencyid,filterpolingstationward)
    })

    filterpolingstationward.on("change",function(){
        wardid=$(this).val()
        getpolingcenters(wardid,filterpolingstationcenter)
    })

    function getpolingstationdetailssummary(countyid=0,constituencyid=0,wardid=0,polingcenterid=0){
        let results=""
        $.getJSON(
            "../includes/task.php",
            {
                request:'getpolingstationdetailssummary',
                countyid,
                constituencyid,
                wardid,
                polingcenterid
            },
            (data)=>{
                data.forEach((polingstation,index)=>{
                    results+=`<tr><td>${$.number(Number(index+1))}</td>`
                    results+=`<td>${polingstation.countyname}</td>`
                    results+=`<td>${polingstation.constituencyname}</td>`
                    results+=`<td>${polingstation.wardname}</td>`
                    results+=`<td>${polingstation.polingcentername}</td>`
                    results+=`<td>${polingstation.polingstationcode}</td>`
                    results+=`<td>${polingstation.polingstationname}</td>`
                    results+=`<td>${$.number(polingstation.registeredvoters)}</td></tr>`
                })
                polingstationslist.find("tbody").html(results)
                // convert to datatable
            }
        )
    }

    filterpolingstationbutton.on("click",()=>{
        const countyid=filterpolingstationcounty.val()
        const constituencyid=filterpolingstationconstituency.val()
        const wardid=filterpolingstationward.val()
        const polingcenterid=filterpolingstationcenter.val()
        getpolingstationdetailssummary(countyid,constituencyid,wardid,polingcenterid)
    })
})