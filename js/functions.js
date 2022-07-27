

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

