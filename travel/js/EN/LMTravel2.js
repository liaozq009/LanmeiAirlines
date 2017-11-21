
var LMTravelList = {
	init:function(){
		this.bgMove();
		this.otherEvent();
	},

	/* 解决延迟300ms问题 */
	fastClick:function(dom){
		FastClick.attach(dom[0]);
	},

	/* 背景跟随移动 */
	bgMove:function(){
		var bgHeight = function(){
			var winWidth = $(window).width();
			// if(winWidth<=1920){
			// 	$('.hiSlider-item').height(winWidth*700/1920);
			// }else{
			// 	$('.hiSlider-item').height(700);
			// }
		}
		bgHeight();

		$(window).resize(function(){
			bannerHeight();
		});

		// 判断手机端或者PC端
		function IsPC() {
			var userAgentInfo = navigator.userAgent;
			var Agents = ["Android", "iPhone","SymbianOS", "Windows Phone","iPad", "iPod"];
			var flag = true;
			for (var v = 0; v < Agents.length; v++) {
				if (userAgentInfo.indexOf(Agents[v]) > 0) {
					flag = false;
					break;
				}
			}
			return flag;
		}

		var flag = IsPC(); //true为PC端，false为手机端

		if(flag){ //PC端
			// 页面滚动时，banner固定滚动
			$(window).scroll(function(){
				var sTop = $(window).scrollTop();
				var offsetTop = $('.section-4').offset().top; //总高度
				var scrollTop = $(document).scrollTop(); //隐藏高度
				var windowHeight = $(window).height();//可见窗口
				if(scrollTop+windowHeight>=offsetTop){
					var y = scrollTop+windowHeight-offsetTop;
					console.log(y);
					// console.log(y);
					$('.section-4').css('backgroundPosition','center '+(parseInt(y/4)-154)+'px');
				}else{
					// console.log(222);
					// $('.section-4').css('backgroundPosition','center 0');
				}
			});
		}else{ //移动端
			
		}

	},

	/* 其他事件 */
	otherEvent:function(){
		
	},
};

$(document).ready(function($) {
	LMTravelList.init();
});
