$(document).ready(()=>{
    const electionfield=$("#election")
    const countyfield=$("#county")
    const constituencyfield=$("#constituency")
    const wardfield=$("#ward")
    const polingcenterfield=$("#polingcenter")
    const searchbutton=$("#search")
    const electiongroupselector=$("#electiongroupselector")

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
})