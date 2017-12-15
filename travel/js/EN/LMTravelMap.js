
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
		    // Create the flipbook
		    $('.flipbook').turn({
		            // Width
		            width:1260,
		            // Height
		            height:760,
		            // Elevation
		            elevation: 50,
		            // Enable gradients
		            gradients: true,
		            // Auto center this flipbook
		            autoCenter: true
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
