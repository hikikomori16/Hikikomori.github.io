(function(){

window.A = {}

A.mobile = navigator.userAgent.match(/(iPhone|iPod|iPad|Blackberry|Android)/);
A.currentPartID = null;
A.isNeedToDeselectProduct = false;
A.view = "D";


A.onResize = function(e)
{
	var w = $(".at_view").width();
	
	if(w == 100) A.view = "D";
	else if(w == 75) A.view = "T";
	else if(w == 50) A.view = "M";
	
	var $bg = $(".at_header_section.at_"+A.currentPartID+" .at_header_bg");
	var currentW = $bg.width();
	var currentH = $bg.height();
	var originW = 926;
	var originH = 700;
	var k = Math.max(currentW/originW, currentH/originH); 
	
	//trace(k, true);
	
	//k = 1;
	
	$(".at_header_point").each(function(i) {
		var x = $(this).attr("data-x");
		var y = $(this).attr("data-y");
		
		$(this).css({left: (x*k)+"px", top: (y*k)+"px"});
	});
	
	//trace( $(window).width(), true );
}



A.onScroll = function(e)
{
	if( $(window).scrollTop() >  $(window).height() )
	{
		if( $('.at_up_btn').hasClass("at_disable") )
			$('.at_up_btn').removeClass("at_disable")
	}
	else
	{
		if( !$('.at_up_btn').hasClass("at_disable") )
			$('.at_up_btn').addClass("at_disable")
	}
	
	if(A.isNeedToDeselectProduct)
	{
		A.isNeedToDeselectProduct = false;
		$(".at_product").removeClass("at_selected");
	}
}



A.changePart = function(id, isNext, isImmediately)
{
	var oid = A.currentPartID;
	var nid = A.currentPartID = id;
	
	$(".at_menu li.at_"+oid).removeClass("at_current");
	$(".at_menu li.at_"+nid).addClass("at_current");
	window.location.hash = "#catalog_id="+nid;
	
	if(A.view == "M" || isImmediately)//for mobile without animation
	{
		$(".at_header_section.at_"+oid).css({left: "0px", display: "none"});
		$(".at_header_section.at_"+nid).css({left: "0px", display: "inherit"});
		$(".at_catalog_section.at_"+oid).css({opacity: 1, display: "none"});
		$(".at_catalog_section.at_"+nid).css({opacity: 1, display: "inherit"});
	}
	else
	{
		var w = $(window).width();
		var x = (isNext == undefined ? (nid > oid) : isNext) ? w : -w;
		
		function tween()
		{
			$(".at_header_section.at_"+oid).css({left: 0+"px"});
			$(".at_header_section.at_"+nid).css({left: x+"px", display: "inherit"});
			
			Tweener.addTween($(".at_header_section.at_"+oid), {left: -x+"px", time: 0.6, transition: "easeInOutCubic"});
			Tweener.addTween($(".at_header_section.at_"+nid), {left: 0+"px", time: 0.6, transition: "easeInOutCubic", onComplete: function(){
				$(".at_header_section.at_"+oid).css({display: "none"});
				enable();
			}});
			
			$(".at_catalog_section.at_"+nid).css({opacity: 0});
			
			Tweener.addTween($(".at_catalog_section.at_"+oid), {opacity: 0, time: 0.3, transition: "easeInOutCubic"});
			Tweener.addTween($(".at_catalog_section.at_"+nid), {opacity: 1, time: 0.3, delay: 0.3, transition: "easeInOutCubic", onStart: function(){
				$(".at_catalog_section.at_"+oid).css({display: "none"});
				$(".at_catalog_section.at_"+nid).css({display: "inherit"});
			}});
		}
		
		if( $(window).scrollTop() == 0 )
		{
			tween();
		}
		else
		{
			$("body,html").animate({scrollTop: 0}, 300, function(){
				tween();
			});
		}
		
		disable();
	}
}



A.loadAssets = function()
{
	var assets = [
		"i/headers/bg-1.jpg",
		"i/headers/bg-2.jpg",
		"i/headers/bg-3.jpg",
		"i/headers/bg-4.jpg",
		"i/headers/bg-5.jpg",
		"i/headers/bg-6.jpg",
		"i/headers/bg-7.jpg",
		
		"i/books/bg-1.png",
		"i/books/bg-2.png",
		"i/books/bg-3.png",
		"i/books/bg-4.png",
		"i/books/bg-5.png",
		"i/books/bg-6.png",
		"i/books/bg-7.png"
	]
	
	for(var i=0; i<assets.length; i++)
	{
		var pic = new Image();
		var url = assets[i];
		
		if(A.mobile)
			url = url.split("headers/").join("headers/m/");
		
		pic.src = url;
		$(pic).load();
	}
}



A.showHidePopup = function($point)
{
	$point.toggleClass("at_opened");
	$("div", $point).attr("class", "");
	
	var $bg = $(".at_header_section.at_"+A.currentPartID+" .at_header_bg");
	var w = $bg.width();
	var h = $bg.height();
	var x = $point.position().left + w * 0.5;
	var y = $point.position().top + h * 0.5;
	var margin = 150;
	
	if( x + margin > w )
	{
		$("div", $point).addClass("at_left");
	}
	else if( x - margin < 0 )
	{
		$("div", $point).addClass("at_right");
	}
	else if( y + margin > h )
	{
		$("div", $point).addClass("at_left");
	}
	else
	{
		$("div", $point).addClass("at_top");
	}
}



A.showHideFrame = function(page)
{
	if( $(".at_frame").hasClass("at_opened") )
	{
		//$(".at_header, .at_catalog").removeClass("at_closed");
		Tweener.addTween($(".at_frame"), {opacity: 0, time: 0.5, transition: "easeOutCubic", onComplete:function(){
			$(".at_frame").removeClass("at_opened");
			$(".at_frame .at_target").html('');
			enable();
		}});
	}
	else
	{
		var url = "https://s3.amazonaws.com/online.fliphtml5.com/veqx/qure/index.html"
		if(page) url += "#p="+page;
		$(".at_frame .at_target").html('<iframe src="'+url+'"></iframe>');
		
		$(".at_frame").addClass("at_opened");
		Tweener.addTween($(".at_frame"), {opacity: 1, time: 0.5, transition: "easeOutCubic", onComplete:function(){
			enable();
			//$(".at_header, .at_catalog").addClass("at_closed");
		}});
	}
	disable();
}



A.init = function()
{
	if(!A.mobile)
		$(".at").addClass("at_desktop");
	
	A.currentPartID = parseInt( $(".at .at_menu_horizontal .at_current").attr("data-id"), 10 );
	
	
	
	$(window).resize(A.onResize);
	$(window).scroll(A.onScroll);
	A.onResize();
	A.onScroll();
	A.loadAssets();
	enable();
	
	
	// direct link ...#catalog_id=2
	try{
		var a = window.location.hash.split("#catalog_id=");
		var catalogID = (a.length == 2) ? parseInt(a[1],10) : null;
		
		if(catalogID && catalogID > 1 && catalogID <= 7)
		{
			A.changePart(catalogID, true, true);
		}
	} catch(e){}
	
	
	
	$(".at_up_btn").click(function(e){
		$("body,html").animate({scrollTop: 0}, 500);
	});
	
	
	
	$(".at_down_btn").click(function(e){
		$("body,html").animate({scrollTop: $(window).height()}, 500);
	});
	
	
	
	$(".at_menu li").click(function(e){
		var id = parseInt( $(this).attr("data-id"), 10 );
		
		A.changePart(id);
	});
	
	
	
	$(".at_karusel_btn").click(function(e){
		var isNext = $(this).hasClass("at_right_btn");
		var id = A.currentPartID + ( isNext ? 1 : -1 );
		
		if(id > 7) id = 1;
		if(id < 1) id = 7;
		
		A.changePart(id, isNext);
	});
	
	
	
	$(".at_header_point").click(function(e){
		var $product = $("#"+$(this).attr("data-id"));
		
		$product.addClass("at_selected");
		$("body,html").animate({scrollTop: $product.offset().top}, 500);
		Timer.addTimeout(function(){
			A.isNeedToDeselectProduct = true;
		}, 1.0);
	});
	
	if(! A.mobile)
	{
		$(".at_header_point").hover(function(){
			A.showHidePopup($(this))
		}, function(){
			A.showHidePopup($(this))
		})
	}
	
	$(".at_header_point").each(function(i) {
		var $product = $("#"+$(this).attr("data-id"));
		
		$(this).html("<div>"+$(".at_title", $product).html()+"</div>");
	});
	
	
	
	$(".at_catalog_piece.at_product").click(function(e){
		var url = $("a", this).attr("href");
		if(url) window.open(url, '_blank')
	});

	$(".at_catalog_piece.at_category_link").click(function(e){
		var url = $("a", this).attr("href");
		if(url) window.open(url, '_blank')
	});
	
	
	
	$(".at .at_header_section .at_venzel_btn").click(function(e){
		A.showHideFrame();
	});
	
	$(".at .at_book_bg").click(function(e){
		A.showHideFrame( $(this).attr("data-page") );
	});
	
	$(".at .at_frame .at_close_btn").click(function(e){
		A.showHideFrame();
	});
}

})();











