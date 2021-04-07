
var LanmeiAirlinesPassengerInfo = {
	init:function(){
		this.passengerInfoWrite();
		this.addEvend();
	},

	/* 乘客信息填写 */
	passengerInfoWrite:function(){
		// 点击展示下拉框
		$('.dropDownInput').click(function(e){
			e.stopPropagation();
			$(this).toggleClass('active');
			$(this).siblings('ul').toggle();
			$(this).parent().siblings('div').children('ul').hide().siblings('b').hide();
			$(this).parent().siblings('div').children('input').removeClass('active');
			$(this).siblings('.bottomLine').toggle();
		});
		// 选择下拉框
		$('.dropDownUL a').click(function(e){
			e.preventDefault();e.stopPropagation();
			var val = $(this).html();
			$(this).parent().parent().siblings('input').val(val).removeClass('active');
			$(this).parent().parent().hide().siblings('b').hide();
		});
		// 点击空白隐藏
		$('html').click(function(){
			$('.dropDownInput').removeClass('active').siblings('ul').hide().siblings('.bottomLine').hide();
		});

		// 输入框正则验证 
		$('.PassengersContentCommon>div .importInput').focus(function(e){
			$(this).removeClass('inputRight').removeClass('inputError').addClass('inputWrite');
		});
		$('.PassengersContentCommon>div .importInput').blur(function(e){
			$(this).removeClass('inputWrite').addClass('inputRight');

		});

		// 展开或隐藏乘客信息 
		$('.PassengersTitleCommon').click(function(){
			$(this).next().slideToggle();
			$(this).children('i').toggleClass('img02');
		});
	},

	/* 其他事件 */
	addEvend:function(){

		/* 乘客联系方式 */
		var contactPassengers = function(){
			$('.contactPassengers .nth-child1 b').show();
			$('.contactPasMobile,.mobilePasTip').hide();
			
			$('.contactPassengers label i').click(function(){
				$(this).siblings('b').show().parent().siblings('label').children('b').hide();
				if($(this).parent().attr('data-info')=='yes'){
					$('.contactPasMobile,.mobilePasTip').hide(300);
				}else{
					$('.contactPasMobile,.mobilePasTip').show(300);
				}
			});
		};
		contactPassengers();

		// 点击NEXT的时候要做判断
		$('.nextBtn a').click(function(e){
			e.preventDefault();
			if($('.agree input').is(':checked')){
				window.location.href="LanmeiAirlinesPay.html";
			}else{
				layer.open({
				  type: 1, //Page层类型
				  area: ['auto', 'auto'],
				  title: 'prompt box',
				  shadeClose: true, //点击遮罩关闭
				  shade: 0.6, //遮罩透明度
				  btn: ['YES'],
				  btnAlign: 'c',
				  maxmin: false, //允许全屏最小化
				  anim: 1, //0-6的动画形式，-1不开启
				  content: '<div style="text-align:center;padding-top: 30px;font-size:20px">Please confirm that you have read the above</div>',
				  yes: function(index, layero){
				  	layer.close(index); //如果设定了yes回调，需进行手工关闭
				  }
				});    
			}
		});
		
	},
};

$(document).ready(function($) {
	LanmeiAirlinesPassengerInfo.init();
});