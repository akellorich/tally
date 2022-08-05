

$('table.paginated').each(function() {
    var currentPage = 0;
    var numPerPage = 6;
    var $table = $(this);
    $table.bind('repaginate', function() {
        $table.find('tbody tr').hide().slice(currentPage * numPerPage, (currentPage + 1) * numPerPage).show();
    });
    $table.trigger('repaginate');
    var numRows = $table.find('tbody tr').length;
    var numPages = Math.ceil(numRows / numPerPage);
    var $pager = $('<div class="pager"></div>');
    for (var page = 0; page < numPages; page++) {
        $('<span class="page-number"></span>').text(page + 1).bind('click', {
            newPage: page
        }, function(event) {
            currentPage = event.data['newPage'];
            $table.trigger('repaginate');
            $(this).addClass('active').siblings().removeClass('active');
        }).appendTo($pager).addClass('clickable');
    }
    $pager.insertAfter($table).find('span.page-number:first').addClass('active');
});

const logoutuserbutton=$("#logout")

logoutuserbutton.on("click",function(e){
  // e.preventDefault()
  // $.post(
  //   "../includes/task.php",
  //   {
  //     logoutuser:true
  //   }
  // )
})

function getFileExtension(filename){
	return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2)
}


function includes(k) {
	for(var i=0; i < this.length; i++){
	    if( this[i] === k || ( this[i] !== this[i] && k !== k ) ){
	      return true;
	    }
	  }
  return false;
}

function hideAddressBar(){
	  if(document.documentElement.scrollHeight<window.outerHeight/window.devicePixelRatio)
	    document.documentElement.style.height=(window.outerHeight/window.devicePixelRatio)+'px';
	  setTimeout(window.scrollTo(1,1),0);
}

function geparties(obj, option='all'){
  let results=option=='all'?`<option value=0>&lt;All&gt;</option>`:`<option value=''>&lt;Choose&gt;</option>`
  $.getJSON(
      "../includes/task.php",
      {
          request:'getparties'
      },
      (data)=>{
          data.forEach((party,index)=>{
              results+=`<option value=${party.PartyId}>${party.PartyName}</option>`
          })
          obj.html(results)
      }
  )
}

function getpositions(obj, option='all'){
  let results=option=='all'?`<option value='0' data-locality='0'>&lt;All&gt;</option>`:`<option value=''  data-locality='0'>&lt;Choose&gt;</option>`
  $.getJSON(
      "../includes/task.php",
      {
          request:'getpositions'
      },
      (data)=>{
          data.forEach((position,index)=>{
              results+=`<option value='${position.PositionId}' data-locality='${position.LocalityId}'>${position.PositionName}</option>`
          })
          obj.html(results)
      }
  )
}

function getcounties(obj, option='all'){
  let results=option=='all'?`<option value=0>&lt;All&gt;</option>`:`<option value=''>&lt;Choose&gt;</option>`
  $.getJSON(
      "../includes/task.php",
      {
          request:'getcounties'
      },
      (data)=>{
          data.forEach((county,index)=>{
              results+=`<option value=${county.CountyId}>${county.CountyName}</option>`
          })
          obj.html(results)
      }
  )
}

function getconstituencies(countyid,obj, option='all'){
  $.getJSON(
    "../includes/task.php",
    {
      request:'getconstituencies',
      countyid
    },
    (data)=>{
      let results=option=='all'?`<option value=0>&lt;All&gt;</option>`:`<option value=''>&lt;Choose&gt;</option>`
      data.forEach((constituency)=>{
        results+=`<option value=${constituency.ConstituencyId}>${constituency.ConstituencyName}</option>`
      })
      obj.html(results)
    }

  )
}

function getwards(constituencyid,obj, option='all'){
  $.getJSON(
    "../includes/task.php",
    {
      request:'getwards',
      constituencyid
    },
    (data)=>{
      let results=option=='all'?`<option value=0>&lt;All&gt;</option>`:`<option value=''>&lt;Choose&gt;</option>`
      data.forEach((ward)=>{
        results+=`<option value=${ward.WardId}>${ward.WardName}</option>`
      })
      obj.html(results)
    }
  )
}

function getpolingcenters(wardid,obj, option='all'){
  $.getJSON(
    "../includes/task.php",
    {
      request:'getpolingcenters',
      wardid
    },
    (data)=>{
      let results=option=='all'?`<option value=0>&lt;All&gt;</option>`:`<option value=''>&lt;Choose&gt;</option>`
      data.forEach((polingcenter)=>{
        results+=`<option value=${polingcenter.PolingCenterId}>${polingcenter.PolingCenterName}</option>`
      })
      obj.html(results)
    }
  )
}

function getpolingstations(polingcenterid,obj, option='all'){
  $.getJSON(
    "../includes/task.php",
    {
      request:'getpolingstations',
      polingcenterid
    },
    (data)=>{
      let results=option=='all'?`<option value=0>&lt;All&gt;</option>`:`<option value=''>&lt;Choose&gt;</option>`
      data.forEach((polingstation)=>{
        results+=`<option value=${polingstation.PolingStationId}>${polingstation.PolingStationName}</option>`
      })
      obj.html(results)
    }
  )
}

function getelections(obj, option='all'){
  $.getJSON(
    "../includes/task.php",
    {
      request:'getelections'
    },
    (data)=>{
      let results=option=='all'?`<option value=0>&lt;All&gt;</option>`:`<option value=''>&lt;Choose&gt;</option>`
      data.forEach((election)=>{
        results+=`<option value=${election.ElectionId}>${election.Description}</option>`
      })
      obj.html(results)
    }
  )
}
