
var LMTravelList = {
	init:function(){
		this.reginSelect();
		this.travelList();
		this.travelDiary();
		this.otherEvent();
	},

	/* 热度选择下拉菜单 */
	reginSelect:function(){
		$('.modal-hot').on('click','.modal-hot-val',function(e){
			e.stopPropagation();
			$(this).siblings('ul').slideToggle();
		}).on('click','.modal-hot-menu>li',function(){
			var val = $(this).html();
			$(this).parent().slideDown('slow').siblings('span').html(val);
		});

		$('.modal-content').click(function(){
			$('.modal-hot ul').slideUp('slow');
		});
	},

	/* 游记列表 */
	travelList:function(){
		// 弹出模态框
		$('.img-com').click(function(){
			var local = $(this).attr('data-local');
			$('#js-'+local).modal();
		});

	},

	/* 游记内容 */
	travelDiary:function(){
		//弹出模态框
		$('.travel-modal').on('click','.t-content > li > div',function(){
			$('#js-diaryModal').modal({backdrop: 'static', keyboard: false});
		});

		// 游记翻页
		function loadApp() {
			var $flipbook = $('.flipbook');

		    // Create the flipbook
		    $flipbook.turn({
		            // Width
		            width:1260,
		            // Height
		            height:760,
		            // Elevation
		            elevation: 50,
		            duration: 2000,
		            // Enable gradients
		            gradients: true,
		            // Auto center this flipbook
		            autoCenter: true
		    });

		    var resizeW = function(){
		    	var winW = $(window).width();

		    	if(winW<1300){
		    		$flipbook.turn("display", "single");
		    		$flipbook.turn("size", 630, 760); 

		    		$('.flipbook-viewport .even,.flipbook-viewport .odd').addClass('background-none');
		    	}else{
		    		$flipbook.turn("display", "double");
		    		$flipbook.turn("size",1260, 760);

		    		$('.flipbook-viewport .even,.flipbook-viewport .odd').removeClass('background-none');
		    	}

		    }
		    resizeW();

		    $(window).resize(function () {
		    	resizeW();
		    });

		    var pageCount = $flipbook.turn("pages");//总页数

		    // 下一页
		    $('.page-toolbar .d-right').click(function(){
		    	$flipbook.turn("next");
		    	var page = $(".flipbook").turn("page");
		    	console.log(page);
		    });

		    // 上一页
		    $('.page-toolbar .d-left').click(function(){
		    	$flipbook.turn("previous");
		    	var page = $(".flipbook").turn("page");
		    	console.log(page);
		    });

		    // 第一页
		    $('.page-toolbar .d-start').click(function(){
		    	$flipbook.turn("page", 1);
		    });

		    // 上一页
		    $('.page-toolbar .d-end').click(function(){
		    	$flipbook.turn("page", pageCount);
		    });

		    // 翻到指定页码触发事件
		    $('.d-page .s2').html(pageCount);
		    $flipbook.bind("turning", function(event, page, view) {
		     	var len = view.length;
		     	if(len==1){
		     		$('.d-page .s1').html(view[0]);
		     	}else{
		     		if(view[0]==0){
		     			$('.d-page .s1').html(view[1]);
		     		}else{
		     			$('.d-page .s1').html(view[0]+'-'+view[1]);
		     		}
		     		
		     	}
		    });
		}
		// Load the HTML4 version if there's not CSS transform
		yepnope({
		    test : Modernizr.csstransforms,
		    yep: ['../../libs/diary/turn/turn.js'],
		    nope: ['../../libs/diary/turn/turn.html4.min.js'],
		    both: ['../../libs/diary/turn/basic.css'],
		    complete: loadApp
		});

		//长文本分页
		$('.longText').textify({
		    numberOfColumn: 1,
		    margin: 20,
		    padding: 0,
		    width: "630",
		    height: "760",
		    showNavigation: true,
		    textAlign: 'justify'
		});

		// $('.longText').textify({width:winW});

	},

	/* 其他事件 */
	otherEvent:function(){
		
		// 点击游记缩放特效
		$('.img-com').mousedown(function(event) {
			$(this).css('transform','scale(0.8)');
		}).mouseup(function(event) {
			$(this).css('transform','scale(1)');
		});

	},
};

$(document).ready(function($) {
	LMTravelList.init();
});
