(function(window, undefined){
	var document = window.document
	  , $ = window.jQuery
	  , html_class = document.getElementsByTagName('html')[0].className
	  , ieflag = {
			normal: ! /lte-ie9/i.test(html_class),
			ie: /*@cc_on!@*/false,
			ie9: /is-ie9/i.test(html_class),
			ie8: /is-ie8/i.test(html_class),
			lteie9: /lte-ie9/i.test(html_class),
			lteie8: /lte-ie8/i.test(html_class),
			lteie7: /lte-ie7/i.test(html_class)
		}
	  ;
	$(function(){
		var tjscroll = false, adding = false;
		$(window).on('message', function(e){
			var event = e.originalEvent;
			if (event.origin !== window.location.origin) return;
			if( event.data == 'modal-loaded' ){
				var $modal = $('#modal-page');
				if( ! tjscroll ){
					if( adding ) return ;
					adding = true;
					$('body').css('overflow','hidden');
					setTimeout(function(){
						$modal.TJScroll({
							enabled:true,
							hScroll:false,
							vScroll:true,
							hScrollbar:false,
							vScrollbar:true,
							bounceLock: true
						});
						tjscroll = $modal.data('TJScroll');
					}, 0);
				}else{
					tjscroll.refresh.call(tjscroll);
				}
			}
		});
	});
	
	$.extend({ ieflag: ieflag });
	window.ieflag = ieflag;
})(this);