
var LMTravelPlanning = {
	init:function(){
		this.editor();
		this.toolbar();
		this.otherEvent();
		this.isMobile();
	},

	/* 移动端下才执行的操作 */
	isMobile:function(){
		var winW = $(window).width();
		if(winW<767){
			this.mobildAddScenic();
		}
	},

	/* 编辑信息框 */
	editor:function(){
		// 费用区间选择
		var rangeSlider = function(min,max){
			$('.range-slider').jRange({
				from: min,
				to: max,
				step: 50,
				showScale:false,
				format: '%s',
				width: 180,
				showLabels: true,
				isRange : true
			});
		}
		rangeSlider(0,1000);

		// 编辑框显示或隐藏
		$('.p-header-title .p-edit').click(function(){
			$('.p-editor').show();
		});
		$('.p-editor-ok button').click(function(){
			$('.p-editor').hide();
		});

		// 日期
		$("#travel-edit-time").jeDate({
			format:"YYYY-MM-DD",
			isTime:true, 
			minDate:"2017-09-09"
		});

		// 人数选择
		var adultNum = 1;
		var childNum = 0;
		$('.people-add').click(function(){
			adultNum++;
			$(this).siblings('input').val(adultNum);
		});
		$('.people-sub').click(function(){
			if(adultNum>1){
				adultNum--;
				$(this).siblings('input').val(adultNum);
			}
		});
		$('.child-add').click(function(){
			childNum++;
			$(this).siblings('input').val(childNum);
		});
		$('.child-sub').click(function(){
			if(childNum>0){
				childNum--;
				$(this).siblings('input').val(childNum);
			}
		});

		//其他金额， 注：金额选择放在jquery.range.js中
		$('.p-editor-money .max-money').change(function(){
			var optionVal = $('.p-editor-money .max-money  option:selected').val();  

			var $select = $('.slider-container,.p-editor-money .min-money,.p-editor-money .max-money');
			var $range = $('.range-slider');
			$range.val('').click();

			// 只能输入数字
			$range.keyup(function(event) {
				$(this).val($(this).val().replace(/[^\d]/ig,''));
			});

			if(optionVal=='0'){
				$range.show();
				 $select.hide();
			}else{
				$range.hide();
				 $select.show();
			}
		});
	},

	/* 操作栏，包括路线、游记、保存、预览 */
	toolbar:function(){
		$('.p-toolbar-left>li>a').click(function(){
			var $parent =  $(this).parent('li');
			var $bottomLine = $parent.siblings('.bottom-line');
			var $route = $('.p-section-route');
			var $diary = $('.p-section-diary');
			var $page = $('.t-comment-page');
			var $cover = $('.p-section-cover');

			$parent.addClass('active').siblings('li').removeClass('active');

			var href = $(this).attr('href');
			switch (href) {
				case '#route':
					$bottomLine.animate({'left':'10px'}, 300);
					$route.show();
					$diary.hide();
					$page.hide();
					$cover.hide();
					break;
				case '#diary':
					$bottomLine.animate({'left':'114px'}, 300);
					$route.hide();
					$diary.show();
					$page.show();
					$cover.hide();
					break;
				case '#cover':
					$bottomLine.animate({'left':'218px'}, 300);
					$route.hide();
					$diary.hide();
					$page.hide();
					$cover.show();
					break;
			}
		});
	},

	/* 移动端添加景点 */
	mobildAddScenic:function(){
		var fadeOut = function(){
			$('.p-section-right').fadeOut();
		}
		$('.p-section-right .m-section-close').click(function(event) {
			fadeOut();
		});

		$('.js-add-scenic').click(function(event) {
			$('.p-section-right').fadeIn();
		});

		/* 选择景点后隐藏整个景点div */
		$('.p-scenic-inner').on('click','.p-scenic-box .p-add',function(){
			fadeOut();
		});
		$('.s-route-inner').on('click','.s-route-add',function(){
			fadeOut();
		});
	},

	/* 其他事件 */
	otherEvent:function(){
		
	},
};

$(document).ready(function($) {
	LMTravelPlanning.init();
});
