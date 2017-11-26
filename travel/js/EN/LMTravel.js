
var LMTravelList = {
	init:function(){
		// this.animate();
		this.otherEvent();
		this.isPc();
		this.winResize();
	},

	/* 判断是PC端还是移动端 */
	isPc:function(){
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

		if(flag){ //PC
			this.recTravel();
		}else{ //移动
			
		}
	},

	/* 解决延迟300ms问题 */
	fastClick:function(dom){
		FastClick.attach(dom[0]);
	},


	/* 动画特效 */
	animate:function(){
		// 推荐旅游动画
		$('.js-pre-1').click(function(){//1隐藏,2显示，箭头1改为2
			$('.s4-inner-1').addClass('animated bounceOutLeft');
			setTimeout(function(){
				$('.s4-inner-1').removeClass('animated bounceOutLeft');
			}, 1500);
			$('.s4-inner-1').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
				$(this).hide();
				$('.s4-arrow-prev').removeClass('js-pre-1').addClass('js-pre-2');
				$('.s4-arrow-next').removeClass('js-nex-1').addClass('js-nex-2');
				$('.s4-inner-2').show().addClass('animated bounceInRight');
				setTimeout(function(){
					$('.s4-inner-2').removeClass('animated bounceInRight');
				}, 1500);
			});
		});
		$('.s4-content').on('click','.js-pre-2',function(){ //2隐藏,3显示，箭头2改为3
			$('.s4-inner-2').addClass('animated bounceOutLeft');
			setTimeout(function(){
				$('.s4-inner-2').removeClass('animated bounceOutLeft');
			}, 1500);
			// $(this).fadeOut(600);
			
			$('.s4-inner-2').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
				$(this).hide();
				$('.s4-arrow-prev').removeClass('js-pre-2').addClass('js-pre-3');
				$('.s4-arrow-next').removeClass('js-nex-2').addClass('js-nex-3');
				$('.s4-inner-3').show().addClass('animated bounceInRight');
				setTimeout(function(){
					$('.s4-inner-3').removeClass('animated bounceInRight');
				}, 1500);
			});
		});

		$('.s4-content').on('click','.js-pre-3',function(){ //3隐藏,2显示，箭头3改为2
			$('.s4-inner-3').addClass('animated bounceOutLeft');
			setTimeout(function(){
				$('.s4-inner-3').removeClass('animated bounceOutLeft');
			}, 1500);
			// $(this).fadeOut(600);
			
			$('.s4-inner-3').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
				$(this).hide();
				$('.s4-arrow-prev').removeClass('js-pre-3').addClass('js-pre-2');
				$('.s4-arrow-next').removeClass('js-nex-3').addClass('js-nex-2');
				$('.s4-inner-2').show().addClass('animated bounceInRight');
				setTimeout(function(){
					$('.s4-inner-2').removeClass('animated bounceInRight');
				}, 1500);
			});
		});

		$('.js-nex-1').click(function(){//1隐藏,2显示，箭头1改为2
			$('.s4-arrow-prev').fadeIn(600);
			$('.s4-inner-1').addClass('animated bounceOutRight');
			setTimeout(function(){
				$('.s4-inner-1').removeClass('animated bounceOutRight');
			}, 1500);
			
			$('.s4-inner-1').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
				$(this).hide();
				$('.s4-arrow-prev').removeClass('js-pre-1').addClass('js-pre-2');
				$('.s4-arrow-next').removeClass('js-nex-1').addClass('js-nex-2');
				$('.s4-inner-2').show().addClass('animated bounceInLeft');
				setTimeout(function(){
					$('.s4-inner-2').removeClass('animated bounceInLeft');
				}, 1500);
			});
		});
		$('.s4-content').on('click','.js-nex-2',function(){//2隐藏,3显示，箭头2改为3
			$('.s4-inner-2').addClass('animated bounceOutRight');
			setTimeout(function(){
				$('.s4-inner-2').removeClass('animated bounceOutRight');
			}, 1500);
			// $(this).fadeOut(600);
			
			$('.s4-inner-2').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
				$(this).hide();
				$('.s4-arrow-prev').removeClass('js-pre-2').addClass('js-pre-3');
				$('.s4-arrow-next').removeClass('js-nex-2').addClass('js-nex-3');
				$('.s4-inner-3').show().addClass('animated bounceInLeft');
				setTimeout(function(){
					$('.s4-inner-3').removeClass('animated bounceInLeft');
				}, 1500);
			});
		});

		$('.s4-content').on('click','.js-nex-3',function(){//3隐藏,3显示，箭头3改为2
			$('.s4-inner-3').addClass('animated bounceOutRight');
			setTimeout(function(){
				$('.s4-inner-3').removeClass('animated bounceOutRight');
			}, 1500);
			// $(this).fadeOut(600);
			
			$('.s4-inner-3').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
				$(this).hide();
				$('.s4-arrow-prev').removeClass('js-pre-3').addClass('js-pre-2');
				$('.s4-arrow-next').removeClass('js-nex-3').addClass('js-nex-2');
				$('.s4-inner-2').show().addClass('animated bounceInLeft');
				setTimeout(function(){
					$('.s4-inner-2').removeClass('animated bounceInLeft');
				}, 1500);
			});
		});
	},

	/* 推荐旅游 */
	recTravel:function(){
		var slide = function(){
			$('.s4-arrow-prev').hide();
			//计算有几个ul
			var page=1;
			var page_last=$('.s4-slide-large>div').length;

			// 定义滚动容器
			var $sliderContainer = $('.s4-slide-large');

			var winW,wrapW;
			var resize = function(){
				// 获取窗口宽度
				winW = $(window).width();
				wrapW = winW*0.7;

				// 小容器宽
				$('.s4-wrapper').width(wrapW);

				// 大容器宽度
				$sliderContainer.width(wrapW*page_last);

				// 大容器中的div宽度
				$sliderContainer.children('div').width(wrapW);

			}
			resize();

			var $next = $('.s4-arrow-next');
			var $prev = $('.s4-arrow-prev');

			$(window).resize(function(){
				resize();
			});

			// 左边箭头点击
			$next.click(function(){
				$prev.fadeIn();
				$sliderContainer.animate({marginLeft:'-='+wrapW}, 400);
				page==page_last-1 && $next.fadeOut();
				page++;
			});

			// 右边箭头点击
			$prev.click(function(){
				$next.fadeIn();
				$sliderContainer.animate({marginLeft:'+='+wrapW}, 400);
				page==2 && $(this).fadeOut();
				page--;
			});
		}
		slide();

		var bgMove = function(){
			var bgHeight = function(){
				var winWidth = $(window).width();
			}
			bgHeight();

			$(window).resize(function(){
				bgHeight();
			});

			// 页面滚动时，banner固定滚动
			$(window).scroll(function(){
				var sTop = $(window).scrollTop();
				var offsetTop = $('.section-4').offset().top; //总高度
				var scrollTop = $(document).scrollTop(); //隐藏高度
				var windowHeight = $(window).height();//可见窗口
				if(scrollTop+windowHeight>=offsetTop){
					var y = scrollTop+windowHeight-offsetTop;
					$('.section-4').css('backgroundPosition','center '+(parseInt(y/3)-320)+'px');
				}else{
					// console.log(222);
					// $('.section-4').css('backgroundPosition','center 0');
				}
			});
		}
		bgMove();
	},

	/* 其他事件 */
	otherEvent:function(){
		var carousel = new LMCarousel('s-carousel',
		{
			className: "LMCarousel",//最外层样式
			offsetPages : 3,//默认可视最大条数
			direct : "left",//滚动的方向
			initPage : 1,//默认当前显示第几条
			autoPlay : true, //自动播放
			autoWidth : true,//默认不用设置宽
			width : 1600,//最外层宽，需要使用的时候在传,默认由程序自动判断
			height : 'auto',//最外层高  
			delay : 3600,//滚动间隔（毫秒）
			speed : 500 //滚动速度毫秒
		},
		[

		{"img":"images/EN/02.jpg","title":"","url":""},

		{"img":"images/EN/01.jpg","title":"","url":""},

		{"img":"images/EN/03.jpg","title":"","url":""},

		{"img":"images/EN/01.jpg","title":"","url":""},

		]

		);

		/* banner的地球和小人 */
		var reload = function(){
			var winW = $(window).width();
			$('.lm-banner-right').height(winW*600/1920);
		}
		reload();
		$(window).resize(function(){
			reload();
		});
	},

	/*窗口缩放*/
	winResize:function(){

	},
};

$(document).ready(function($) {
	LMTravelList.init();
});
