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
	  , ie_init_page = function(){
	  		$('#plurk-box').on('mouseenter', function(){
				$(this).addClass('hover');
			}).on('mouseleave', function(){
				$(this).removeClass('hover');
			}).children('iframe').on('hover',function(){
				$(this).parent().addClass('hover');
			});
		}
	  , init_old_browser_page = function(){
	  		
		}
	  , init_traditional_page = function(){
	  		console.log('exec init traditional page');
		}
	  , init_page = function(){
	  		console.log('exec init page');
	  		var menu_tap;
	  		$(document).on('touchmove', function(e) { 
				e.preventDefault();
				e.stopPropagation();
			});
			$('#menu-list > li > div.list').on('touchstart', function(e){
				menu_tap = true;
				e.preventDefault();
				e.stopPropagation();
			}).on('touchend', function(e){
				if( ! menu_tap ) return false;
				menu_tap = false;
				var $this = $(this);
				$this.parent().toggleClass('tap');
				e.preventDefault();
				e.stopPropagation();
			});
			if(ieflag.ie){
				ie_init_page.call(this);
			}
		}
	  , resize_window = function(){
	  		var height = $(document.body).height();
		}
	  ;
	window.ieflag = ieflag;
	$.extend({ ieflag: ieflag });
	$(function(){
		var $plurk_box = $('#plurk-box');
		resize_window();
	  	$(window).resize(resize_window);
		if( $.fn.jquery == '2.0.0' ){
			init_page.call(this);
		}else{
			init_traditional_page.call(this);
		}
	})
	
})(this);