
var LanmeiAirlinesFlight = {
	init:function(){
		this.flightSelect();
		this.addEvend();
	},

	/* 航班选择 */
	flightSelect:function(){
		// 优惠价选择
		$('.flightPriceWrapper .economyPrice1').addClass('economyPriceActive');//默认选中第一种价格
		$('.flightPriceWrapper>div').click(function(){
			$(this).addClass('economyPriceActive').siblings('div').removeClass('economyPriceActive');
		});
		// 优惠价格右上角的提示信息
		var imgToggle = function(){
			$('.flightPriceWrapper>div .img1').hide();
			$('.flightPriceWrapper>div .img2').show();
		};
		$('.priceTip>img').click(function(e){
			e.stopPropagation();
			imgToggle();
			$(this).hide().siblings('img').show();
			$(this).parent().siblings('.priceTipInfo').toggle();
			$(this).parent().parent().siblings('div').find('.priceTipInfo').hide();
		});
		$('html').click(function(){
			$('.priceTipInfo').hide();
			imgToggle();
		});

		// 航班选择
		var selectFlight = false;
		$('.flightReturn').hide();//回程车票默认隐藏
		$('.flightPriceMainSetOut>div').click(function(){ //去程
			selectFlight = true;
			$(this).addClass('flightActive').siblings('div').removeClass('flightActive');
			var getTop = $('.setOutLoadMore').offset().top; //滚动到回程界面
			$('html, body').animate({scrollTop:getTop}, 'slow');
			$('.flightReturn').show();//回程车票显示
		});
		$('.flightPriceMainReturn>div').click(function(){ //回程
			$(this).addClass('flightActive').siblings('div').removeClass('flightActive');
		});

		// 点击NEXT的时候要判断必须选择航班
		$('.priceNext a').click(function(e){
			e.preventDefault();
			if(selectFlight){
				window.location.href="LanmeiAirlinesPassengerInfo.html";
			}else{
				layer.open({
				    type: 1, //Page层类型
				    area: ['300px', '200px'],
				    title: '提示框',
				    shadeClose: true, //点击遮罩关闭
				    shade: 0.6, //遮罩透明度
				    maxmin: false, //允许全屏最小化
				    anim: 1, //0-6的动画形式，-1不开启
				    btn: ['确定'],
				    btnAlign: 'c',
				    content: '<div style="text-align:center;line-height: 102px;font-size:20px">请选择航班</div>',
				    yes: function(index, layero){
				  		layer.close(index); //如果设定了yes回调，需进行手工关闭
				    }
				});    
			}
		});

		// 去程和回程默认显示小于三条信息，当点击加载更多时才加载剩余信息
		var flightPriceMain = function(flightPrice,LoadMore){
			var length = $('.'+flightPrice+'>div').length;
			if(length<=3){
				$('.'+LoadMore).addClass('loadFlightMoreActive').css('cursor','not-allowed');
			}else{
				$('.'+flightPrice+'>div:gt(2)').hide();
				$('.'+LoadMore).children('.img2').hide();
				$('.'+LoadMore).click(function(){
					$('.'+flightPrice+'>div:gt(2)').slideToggle();
					$(this).children('img').toggle();
				});
			}
		};
		flightPriceMain('flightPriceMainSetOut','setOutLoadMore');
		flightPriceMain('flightPriceMainReturn','returnLoadMore');

		// 固定价格计算表在页面底部，并根据页面滚动改变位置
		var getBottom; 
		$(window).scroll(function() {
			getBottom = $(document).height() - $(window).height() - $(window).scrollTop();
			if(getBottom<320){
				console.log(getBottom);
				$('.flightPriceTotleWrapper').css('bottom',310-getBottom);
			}else{
				$('.flightPriceTotleWrapper').css('bottom',0);
			}
		});

	},

	/* 其他事件 */
	addEvend:function(){
		
	},
};

$(document).ready(function($) {
	LanmeiAirlinesFlight.init();
});