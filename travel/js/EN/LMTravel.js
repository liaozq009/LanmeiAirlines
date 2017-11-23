
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
			bgHeight();
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
					// console.log(y);
					$('.section-4').css('backgroundPosition','center '+(parseInt(y/3)-320)+'px');
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
		var carousel = new LMCarousel('s-carousel',
			{
				className: "LMCarousel",//最外层样式
				offsetPages : 3,//默认可视最大条数
				direct : "left",//滚动的方向
				initPage : 1,//默认当前显示第几条
				autoPlay : false, //自动播放
				autoWidth : true,//默认不用设置宽
				width : 1600,//最外层宽，需要使用的时候在传,默认由程序自动判断
				height : 'auto',//最外层高  
				delay : 5000,//滚动间隔（毫秒）
				speed : 500 //滚动速度毫秒
			},
			[

				{"img":"images/EN/02.jpg","title":"","url":""},

				{"img":"images/EN/01.jpg","title":"","url":""},

				{"img":"images/EN/03.jpg","title":"","url":""},
				
				{"img":"images/EN/01.jpg","title":"","url":""},

			]

		);
	},
};

$(document).ready(function($) {
	LMTravelList.init();
});
