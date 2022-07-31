$(document).ready(()=>{
    const addnewagentbutton=$("#addnewagent")
    const agentmodal=$("#addnewagentmodal")
    const countyfield=$("#county")
    const constituencyfield=$("#constituency")
    const wardfield=$("#ward")
    const polingcenterfield=$("#polingcenter")
    const polingstationfield=$("#polingstation")
    const agentnamefield=$("#agentnames")
    const agentidnofield=$("#idno")
    const agentmobilenofield=$("#mobileno")
    const passwordfield=$("#password")
    const confirmpasswordfield=$("#confirmpassword")
    const changepaswordonlogonfield=$("#changepasswordonlogon")
    const emailaddressfield=$("#email")
    const generatepasswordfield=$("#generatepassword")
    const agentnotifications=$("#agentnotifications")
    const saveagentbutton=$("#saveagent")
    const clearagentformbutton=$("#clearagent")
    const agentidfield=$("#agentid")
    const electionfield=$("#election")
    const agentslist=$("#agentslist")
    const inputfield=$("input")
    const selectfield=$("select")

    const partydetailsmodal=$("#partydetailsmodal")
    const addnewpartybutton=$("#addparty")

    const partyidfield=$("#partyid")
    const partynamefield=$("#partyname")
    const partysymbolfield=$("#partysymbol")
    const savepartybutton=$("#saveparty")
    const partynotifications=$("#partynotifications")
    const partieslist=$("#partieslist")

    const filterelectionposition=$("#filterelectionposition")
    const filterelectioncounty=$("#filterelectioncounty")
    const filterelectionconstituency=$("#filterelectionconstituency")
    const filterelectionward=$("#filterelectionward")
    const filterelectionsbutton=$("filterelections")

    const electiondetailsmodal=$("#electiondetailsmodal")
    const addnewelectionbutton=$("#addnewelection")
    const electiontype=$("#electiontype")
    const electionposition=$("#electiveposition")
    const electioncounty=$("#electioncounty")
    const electionconstituency=$("#electionconstituency")
    const electionward=$("#electionward")
    const electiondate=$("#electiondate")
    const electionnotifications=$("#electionnotifications")
    // const electiondatepicker=$("#electiondatepicker")
    const applytootherboundaries=$("#applytootherboundaries")
    const saveelectionbutton=$('#saveelection')
    const electionamefield=$("#electionname")

    const addcandidatebutton=$("#addcandidate")
    const candidatedetailsmodal=$("#candidatedetailsmodal")
    const candidateposition=$("#candidateposition")
    const candidateparty=$("#candidateparty")
    const candidateboundary=$("#candidateboundary")
    const candidateelection=$("#candidateelection")
    const candidatenotifications=$("#candidatenotifications")
    const savecandidate=$("#savecandidate")
    const candidateidfield=$("#candidateid")
    const candidatenamefield=$("#candidatename")
    const candidateprofilephoto=$("#candidatephoto")
    const candidateslist=$("#candidateslist")

    getcounties(countyfield,'choose')
    getconstituencies(0,constituencyfield,'choose')
    getwards(0,wardfield,'choose')
    getpolingcenters(0,polingcenterfield,'choose')
    getpolingstations(0,polingstationfield,'choose')
    getelections(electionfield,'choose')

    getexistingagents()
    getparties()

    getpositions(filterelectionposition)
    getcounties(filterelectioncounty)
    getconstituencies(0,filterelectionconstituency)
    getwards(0,filterelectionward)

    getpositions(electionposition,'choose')
    getcounties(electioncounty,'choose')
    getconstituencies(0,electionconstituency,'choose')
    getwards(0,electionward,'choose')

    getpositions(candidateposition,'choose')
    geparties(candidateparty,'choose')
    
    getcandidates()

     electiondate.datepicker({
        dateFormat: 'dd-M-yy',
        minDate: new Date()
    })

    inputfield.on("input",()=>{
        agentnotifications.html("")
        partynotifications.html("")
        electionnotifications.html("")
        candidatenotifications.html("")
    })

    selectfield.on("change",()=>{
        inputfield.trigger("input")
    })

    addnewagentbutton.on("click",()=>{
        agentmodal.modal("show")
    })

    countyfield.on("change",function(){
        const countyid=$(this).val()
        getconstituencies(countyid,constituencyfield,'choose')
    })

    constituencyfield.on("change",function(){
        const constituencyid=$(this).val()
        getwards(constituencyid,wardfield,'choose')
    })

    wardfield.on("change",function(){
        const wardid=$(this).val()
        getpolingcenters(wardid,polingcenterfield,'choose')
    })

    polingcenterfield.on("change",function(){
        const polingcenterid=$(this).val()
        getpolingstations(polingcenterid,polingstationfield,'choose')
    })

    generatepasswordfield.on("change",function(){
        const status=$(this).val()
        if(status=="yes"){
            passwordfield.prop("disabled",true)
            confirmpasswordfield.prop("disabled",true)
        }else{
            passwordfield.prop("disabled",false)
            confirmpasswordfield.prop("disabled",false)
        }
    })

    saveagentbutton.on("click",()=>{
        const agentid=agentidfield.val(),
            agentname=agentnamefield.val(),
            agentidno=agentidnofield.val(),
            agentmobile=agentmobilenofield.val(),
            polingstationid=polingstationfield.val(),
            password=passwordfield.val(),
            confirmpassword=confirmpasswordfield.val(),
            electionid=electionfield.val(),
            changepasswordonlogon=changepaswordonlogonfield.val()=="no"?0:1,
            county=countyfield.val(),
            constituency=constituencyfield.val(),
            ward=wardfield.val(),
            polingcenter=polingcenterfield.val(),
            generatepassword=generatepasswordfield.val()=="no"?0:1
        let errors="", 
            notifications=""
        // check for blank fields
        if(agentname==""){
            errors="Please enter Agent's name"
        }else if (agentidno==""){
            errors="Please enter ID Number"
        }else if(agentmobile==""){
            errors="Please enter Mobile Number"
        }else if(county==""){
            errors="Please select County"
        }else if(constituency==""){
            errors="Please select Constituency"
        }else if(ward==""){
            errors="Please select Ward"
        }else if(polingcenter==""){
            errors="Please select Center"
        }else if(polingstationid==""){
            errors="Please select Station"
        }else if(electionid==""){
            errors="Please select Election to preside"
        }else if(generatepassword==0 && password==""){
            errors="Please provide password"
        }else if(password!=confirmpassword){
            errors="Password entries do no match"
        }
        if(errors==""){
            $.getJSON(
                "../includes/task.php",
                {
                    request:'saveagent',
                    agentid,
                    agentname,
                    agentidno,
                    agentmobile,
                    password,
                    generatepassword,
                    changepasswordonlogon,
                    electionid,
                    candidate:0,
                    polingcenter:polingstationid
                },
                (data)=>{
                    data=data.toString()
                    if(data=="success"){
                        notifications="Agent saved successfully"
                        agentnotifications.html(showAlert("success",notifications))
                        // clear form for another entry
                        clearagentfields()
                        agentnamefield.focus() 
                        // refresh list
                    }else if(data=="Please enter ALL required fields first." || data=="Agent ID Number exists" || data=="Agent Mobile No exists"){
                        notifications=data
                        agentnotifications.html(showAlert("info",notifications))
                    }else{
                        notifications=`Sorry an error occured. ${data}`
                        agentnotifications.html(showAlert("danger",notifications))
                    }
                }
            )
        }else{
            agentnotifications.html(showAlert("info",errors))
        }
    })

    function clearagentfields(){
        getcounties(countyfield,'choose')
        getconstituencies(0,constituencyfield,'choose')
        getwards(0,wardfield,'choose')
        getpolingcenters(0,polingcenterfield,'choose')
        getpolingstations(0,polingstationfield,'choose')
        getelections(electionfield,'choose')
        agentidfield.val(),
        agentnamefield.val(),
        agentidnofield.val(),
        agentmobilenofield.val(),
        polingstationfield.val(),
        passwordfield.val(),
        confirmpasswordfield.val(),
        electionfield.val(),
        changepaswordonlogonfield.val("no")
        generatepasswordfield.val("no")
    }

    function getexistingagents(){
        $.getJSON(
            "../includes/task.php",
            {
                request:'getagents'
            },
            (data)=>{
                let results=""
                data.forEach((agent,index)=>{
                    results+=`<tr><td>${index+1}</td>`
                    results+=`<td>${agent.AgentName}</td>`
                    results+=`<td>${agent.Mobile}</td>`
                    results+=`<td>${agent.AgentIdNo}</td>`
                    results+=`<td>${agent.countyname} ${agent.constituencyname}, ${agent.wardname}, ${agent.polingcentername}, ${agent.polingstationname}</td>`
                    results+=`<td><img src='${agent.Portrait==null?"../images/blankavatar.jpg":agent.Portrait}' class='small-image small-rounded-image' height="50px" width="50px" ></td>`
                    results+=`<td><img src='${agent.SpecimenSignature==null?"../images/noimage.jpg":agent.SpecimenSignature}' class='small-image' height="50px" width="50px"></td>`
                    // Add action buttons
                    results+="<td><a href='javascript void(0)' class='edit'><span><i class='fal fa-edit fa-lg mr-2 mt-1'></i></span></a>"
                    results+="<a href='javascript void(0)' class='disable'><span><i class='fal fa-user-slash fa-lg mr-2 mt-1'></i></span></a>"
                    results+="<a href='javascript void(0)' class='reset'><span><i class='fal fa-user-lock fa-lg mt-1'></i></span></a></td></tr>"
                })
                agentslist.find("tbody").html(results)
            }
        )
    }

    clearagentformbutton.on("click",()=>{
        clearagentfields()
    })

    addnewpartybutton.on("click",()=>{
        partydetailsmodal.modal("show")
        clearpartyform()
        partynamefield.focus()
    })

    savepartybutton.on("click",()=>{
        const partysymbol=partysymbolfield[0].files[0]
        const partyid=partyidfield.val()
        const partyname=partynamefield.val()

        let errors="",
            notifications=""
        // check for blank fields
        if(partyname==""){
            errors="Please provide party name"
        }else if(partyid==0 && typeof partysymbol === 'undefined'){
            errors="Please select party symbol"
        }

        if(errors==""){
            // save the party
            let fd= new FormData()
            fd.append('saveparty',true);
            fd.append('file',partysymbol);
            fd.append('partyid',partyid)
            fd.append('partyname',partyname)
            partynotifications.html(showAlert("processing", "Processing. Please wait ...",1))
            $.ajax({
                url:  "../includes/task.php",
                type: 'post',
                data: fd,
                contentType: false,
                processData: false,
                success: function(response){
                    response=response.trim()
                    if(response =="success"){
                        partynotifications.html(showAlert("success","Party saved successfully",1))
                        // refresh the attachments list
                        getparties()
                        // clear form
                        clearpartyform()
                    }else if(response=="error uploading"){
                        partynotifications.html(showAlert("info","Error uploading image.",1))
                    }else{
                        results=`Sorry an error occured. ${response}`
                        partynotifications.html(showAlert("danger",results,1))
                    }
                }
            })
        }else{
            partynotifications.html(showAlert("info",errors))
        }
    })

    function getparties(){
        $.getJSON(
            "../includes/task.php",
            {
                request:'getparties'
            },
            (data)=>{
                let results=""
                data.forEach((party,index)=>{
                    results+=`<tr><td>${index+1}</td>`
                    results+=`<td>${party.PartyName}</td>`
                    results+=`<td><img src='${party.Symbol==null?"../images/nopicture.jpg":party.Symbol}' height="50px" width="50px"></td>`
                    results+=`<td>${party.DateAdded}</td>`
                    results+=`<td>${party.addedbyname}</td>`
                    // add action buttons
                    results+="<td><a href='javascript void(0)' class='edit'><span><i class='fal fa-edit fa-lg mr-2 mt-1'></i></span></a>"
                    results+="<a href='javascript void(0)' class='delete'><span><i class='fal fa-trash fa-lg mr-2 mt-1'></i></span></a></td></tr>"
                })
                partieslist.find("tbody").html(results)
            }
        )
    }

    function clearpartyform(){
        partyidfield.val("0")
        partynamefield.val("")
        partysymbolfield.val("")
    }

    filterelectionposition.on("change",function(){
        const  localityid=$(this).val()
        // 1 President, 2 Govenor 3 Senator, 5 Womens Rep, 4 MP, 5 MCA
        if(localityid==1){
            filterelectioncounty.val(0)
            filterelectioncounty.prop("disabled",true)
            filterelectionconstituency.val(0)
            filterelectionconstituency.prop("disabled",true)
            filterelectionward.val(0)
            filterelectionward.prop("disabled",true)
        }else if(localityid==2 || localityid==3 || localityid==5){
            // filterelectioncounty.val(0)
            filterelectioncounty.prop("disabled",false)
            filterelectionconstituency.val(0)
            filterelectionconstituency.prop("disabled",true)
            filterelectionward.val(0)
            filterelectionward.prop("disabled",true)
        }else if(localityid==4){
            // filterelectioncounty.val(0)
            filterelectioncounty.prop("disabled",false)
            //filterelectionconstituency.val(0)
            filterelectionconstituency.prop("disabled",false)
            filterelectionward.val(0)
            filterelectionward.prop("disabled",true)
        }else if(localityid==5){
            // filterelectioncounty.val(0)
            filterelectioncounty.prop("disabled",false)
            //filterelectionconstituency.val(0)
            filterelectionconstituency.prop("disabled",false)
            //filterelectionward.val(0)
            filterelectionward.prop("disabled",false)
        }
    })

    filterelectioncounty.on("change",function(){
        countyid=$(this).val()
        getconstituencies(countyid,filterelectionconstituency, )
    })

    filterelectionconstituency.on("change", function(){
        constituencyid=$(this).val()
        getwards(constituencyid, filterelectionward)
    })

    addnewelectionbutton.on("click",()=>{
        electiondetailsmodal.modal("show")
    })

    electionposition.on("change",function(){
        const positionid=$(this).val()
        if(positionid==1){
            // electioncounty.val("0")
            electioncounty.prop("disabled",true)
            // electionconstituency.val("0")
            electionconstituency.prop("disabled",true)
            // electionward.val("0")
            electionward.prop("disabled",true)
            applytootherboundaries.prop("disabled",true)
        }else if(positionid==2 || positionid==3 || positionid==5){
            // electioncounty.val("0")
            electioncounty.prop("disabled",false)
            electionconstituency.val("0")
            electionconstituency.prop("disabled",true)
            electionward.val("0")
            electionward.prop("disabled",true)
            applytootherboundaries.prop("disabled",false)
        }else if(positionid==4){
           // electioncounty.val("0")
            electioncounty.prop("disabled",false)
           // electionconstituency.val("0")
            electionconstituency.prop("disabled",false)
            electionward.val("0")
            electionward.prop("disabled",true)
            applytootherboundaries.prop("disabled",false)
        }else if(positionid==6){
            //electioncounty.val("0")
            electioncounty.prop("disabled",false)
            //electionconstituency.val("0")
            electionconstituency.prop("disabled",false)
            //electionward.val("0")
            electionward.prop("disabled",false)
            applytootherboundaries.prop("disabled",false)
        }
    })

    saveelectionbutton.on("click",()=>{
        const electionid=0
        const description=electionamefield.val()
        const type=electiontype.val()
        const positionid=electionposition.val()
        const date=electiondate.val()

        let errors="",localityid="", notifications="",addtootherboundaries=0

        if (positionid==1) {
            localityid=0
        }else if(positionid==2 || positionid==3 || positionid==5){
            localityid=electioncounty.val()
        }else if(positionid==4){
            localityid=electionconstituency.val()
        }else if(positionid==6){
            localityid=electionward.val()
        }

        if (localityid==""){
            errors="Please select election locality"
        }

        if(applytootherboundaries.prop("disabled")){
            addtootherboundaries=0
        }else{
            addtootherboundaries=applytootherboundaries.prop("checked")?1:0
        }

        console.log(errors)

        // check for blank fields
        if(type==""){
            errors="Please select election type"
        }else if(date==""){
            errors="Please select election date"
        }else if(localityid==""){
            errors="Please select election locality"
        }else if(description==""){
            errors="Please provide election name"
        }

        if(errors==""){
            $.post(
                "../includes/task.php",
                {
                    saveelection:true,
                    positionid,
                    electiondate:date,
                    electiontype:type,
                    addtootherboundaries,
                    description,
                    localityid
                },
                (data)=>{
                    data=data.trim().toString()
                    if(data==="success"){
                        notifications="The election has been added successfully"
                        electionnotifications.html(showAlert("success",notifications))
                        // clear screen
                        clearelectionform()
                        // refresh the list
                        getexistingelections()
                    }else if(data==="exists"){
                        notifications=`Election for similar period or name already exists`
                        electionnotifications.html(showAlert("info",notifications))   
                    }else{
                        notifications=`Sorry an error occured ${data}`
                        electionnotifications.html(showAlert("danger",notifications)) 
                    }
                }
            )
        }else{
            electionnotifications.html(showAlert("info",errors))
        }
    })

    function clearelectionform(){
        electionamefield.val("")
        electiontype.val("")
        electionposition.val("")
        electiondate.val("")
    }

    function getexistingelections(){

    }

    electioncounty.on("change",function(){
        const countyid=$(this).val()
        getconstituencies(countyid,electionconstituency,'choose')
    })

    electionconstituency.on("change",function(){
        const constituencyid=$(this).val()
        getwards(constituencyid,electionward,'choose')
    })

    addcandidatebutton.on("click",()=>{
        candidatedetailsmodal.modal("show")
    })

    candidateposition.on("change",function(){
        const positionid=$(this).val()
        $.getJSON(
            "../includes/task.php",
            {
                filterelectionbyposition:true,
                positionid
            },
            (data)=>{
                let results="<option value=''>&lt;Choose&gt;</option>"
                data.forEach((election)=>{
                    results+=`<option value=${election.ElectionId}>${election.Description}</option>`
                })
                candidateelection.html(results)
            }
        )
    })

    candidateelection.on("change",function(){
        const electionid=$(this).val()
        $.getJSON(
            '../includes/task.php',
            {
                getelectionlocalities:true,
                electionid
            },
            (data)=>{
                let results=`<option value=''>&lt;Choose&gt;</option>`
                data.forEach((locality)=>{
                    results+=`<option value=${locality.localityid}>${locality.boundaryname}</option>`
                })
                candidateboundary.html(results)
            }
        )
    })
    
    savecandidate.on("click",()=>{
        const candidateid=candidateidfield.val()
        const candidatename=candidatenamefield.val().trim()
        const electionid=candidateelection.val()
        const localityid=candidateboundary.val()
        const profilephoto=candidateprofilephoto[0].files[0]
        const partyid=candidateparty.val()

        let errors="", notifications=""
        // check for blank fields
        if(candidatename==""){
            errors="Please enter candidate name"
        }else if(electionid==""){
            errors="Please select election for the candidate"
        }else if(localityid==""){
            errors="Please selec candidate boundary"
        }else if(partyid==""){
            errors="Please select party candidate"
        }else if(typeof profilephoto=='undefined'){
            errors="Please select the profile photo"
        }

        if(errors==""){
            // save the candidate
            candidatenotifications.html(showAlert("processing","Processing. Please wait",1))
            
            let fd= new FormData()
            fd.append('savecandidate',true);
            fd.append('file',profilephoto);
            fd.append('candidateid',candidateid)
            fd.append('candidatename',candidatename)
            fd.append('electionid',electionid)
            fd.append('localityid',localityid)
            fd.append('partyid',partyid)

            $.ajax({
                url:  "../includes/task.php",
                type: 'post',
                data: fd,
                contentType: false,
                processData: false,
                success: function(response){
                    response=response.trim()
                    if(response =="success"){
                        candidatenotifications.html(showAlert("success","Candidate saved successfully",1))
                        // refresh the attachments list
                        getcandidates()
                        // clear form
                        clearcandidateform()
                    }else if(response=="error uploading"){
                        candidatenotifications.html(showAlert("info","Error uploading image.",1))
                    }else{
                        results=`Sorry an error occured. ${response}`
                        candidatenotifications.html(showAlert("danger",results,1))
                    }
                }
            })
        }else{
            candidatenotifications.html(showAlert("info",errors))
        }
    })

    function getcandidates(){
       $.getJSON(
            "../includes/task.php",
            {
                getcandidateslist:true
            },
            (data)=>{
                let results=""
                data.forEach((candidate,index)=>{
                    results+=`<tr data-id='${candidate.CandidateId}'><td>${index+1}</td>`
                    results+=`<td>${candidate.CandidateName}</td>`
                    results+=`<td>${candidate.partyname}</td>`
                    results+=`<td>${candidate.positionname}</td>`
                    results+=`<td>${candidate.localityname}</td>`
                    results+=`<td><img src='${candidate.Portrait==null?"../images/blankavatar.jpg":candidate.Portrait}' width="50px" height="50px"></td>`
                    results+=`<td>${candidate.addedbyname}</td>`
                    results+=`<td>${candidate.DateAdded}</td>`
                    // add action buttons
                    results+="<td><a href='javascript void(0)' class='edit'><span><i class='fal fa-edit fa-lg mr-2 mt-1'></i></span></a>"
                    results+="<a href='javascript void(0)' class='delete'><span><i class='fal fa-trash fa-lg mr-2 mt-1'></i></span></a></td></tr>"
                })
                candidateslist.find("tbody").html(results)
            }
       )
    }

    function clearcandidateform(){
        candidateidfield.val("0")
        candidatenamefield.val("")
        candidateelection.val("")
        candidateboundary.val("")
        candidateprofilephoto.val("")
        candidateparty.val("")
    }
})