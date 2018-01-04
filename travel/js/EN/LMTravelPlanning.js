
var LMTravelPlanning = {
	init:function(){
		this.editor();
		this.toolbar();
		this.diaryEditor();
		this.otherEvent();
	},

	/* 编辑信息框 */
	editor:function(){
		// 费用区间选择
		var rangeSlider = function(min,max){
			$('.range-slider').jRange({
				from: min,
				to: max,
				step: 1000,
				showScale:false,
				format: '%s',
				width: 180,
				showLabels: true,
				isRange : true
			});
		}
		rangeSlider(0,10000);

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
			var $cover = $('.p-section-cover');

			$parent.addClass('active').siblings('li').removeClass('active');

			var href = $(this).attr('href');
			switch (href) {
				case '#route':
					$bottomLine.animate({'left':'10px'}, 300);
					$route.show();
					$diary.hide();
					$cover.hide();
					break;
				case '#diary':
					$bottomLine.animate({'left':'114px'}, 300);
					$route.hide();
					$diary.show();
					$cover.hide();
					break;
				case '#cover':
					$bottomLine.animate({'left':'218px'}, 300);
					$route.hide();
					$diary.hide();
					$cover.show();
					break;
			}
		});
	},

	/* 游记编辑 */
	diaryEditor:function(){

	},

	/* 其他事件 */
	otherEvent:function(){
		
	},
};

$(document).ready(function($) {
	LMTravelPlanning.init();
});
