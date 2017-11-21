var LanmeiAirlinesCommon = {
	init:function(){
		this.login();
		this.navbarSilder();
		this.getTop();
		this.isPc();
		this.otherEvent();

		// ie兼容性判断
		if (document.all && document.querySelector && !document.addEventListener) {
			// alert('IE8');
		}else{
			this.rem();
		}
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

		if(flag){ //PC端
			
		}else{ //移动端
			
		}
	},

	/* 解决延迟300ms问题 */
	fastClick:function(dom){
		FastClick.attach(dom[0]);
	},

	/* 登录和注册 */
	login:function(){
		var reg1=/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/; //邮箱
		var reg2=/^(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/; //密码

		// 点击登录
		$('.loginBtn,.m-user-btn').click(function(e){
			e.preventDefault();
			$('#logonModal').modal();
		});

		// 点击注册 
		$('.REGISTEREDBtn').click(function(e){
			e.preventDefault();
			$('#registerModal').modal();
		});

		// 记住密码
		$('.agree span').click(function(){
			$(this).toggleClass('active');
		});

		//正则验证
		var userNameVerify = function(val){
			var tips = $('.verifyInfo');
			tips.addClass('visible');
			if(reg1.test(val)){
				tips.html('验证通过');
				tips.css('color','#8ec060');
			}else{
				tips.html("您的输入不符合要求，请重新输入！");
				tips.css('color','#d0011b');
			}
		};
		$('#LanmeiUserName').blur(function(){
			var val = $(this).val();
			userNameVerify(val);
		});
		$('.on_changes>li').click(function(){
			var val = $(this).html();
			userNameVerify(val);
		});

		$('#LanmeiPassword').blur(function(){
			var tips = $('.verifyInfo');
			tips.addClass('visible');
			var val = $(this).val();
			if(reg2.test(val)){
				tips.html('验证通过');
				tips.css('color','#8ec060');
			}else{
				tips.html("您的输入不符合要求，请重新输入！");
				tips.css('color','#d0011b');
			}
		});

		// 忘记密码
		$('.forgetBtn').click(function(e){
			e.preventDefault();
			$('#logonModal').modal('hide');
			$('#forgetModal').modal();
		});
		// 在忘记密码界面登录
		$('.a_login').click(function(e){
			e.preventDefault();
			$('#forgetModal').modal('hide');
			$('#logonModal').modal('show');
		});

		// 在登录界面点击注册
		$('.regBtn').click(function(e){
			$('#logonModal').modal('hide');
			$('#registerModal').modal('show');
		});

		/* 注册 */
		//正则验证
		var userNameVerify2 = function(val){
			var tips = $('#registerUserName').siblings('p');
			tips.addClass('visible');
			if(reg1.test(val)){
				tips.html('验证通过');
				tips.css('color','#8ec060');
			}else{
				tips.html("您的输入不符合要求，请重新输入！");
				tips.css('color','#d0011b');
			}
		};
		$('#registerUserName').blur(function(){
			var val = $(this).val();
			userNameVerify2(val);
		});
		$('.on_changes>li').click(function(){
			var val = $(this).html();
			userNameVerify2(val);
		});

		// 密码验证
		$('#registerPassword').blur(function(event) {
			var tips = $(this).siblings('p');
			tips.addClass('visible');
			var val = $(this).val();
			if(reg2.test(val)){
				tips.html('验证通过');
				tips.css('color','#8ec060');
			}else{
				tips.html("您的输入不符合要求，请重新输入！");
				tips.css('color','#d0011b');
			}
		});

		// 再次输入密码验证
		$('#repeatPassword').blur(function(event) {
			var tips = $(this).siblings('p');
			tips.addClass('visible');
			var val1 = $('#registerPassword').val();
			var val2 = $(this).val();
			if(val1==val2){
				tips.html('验证通过');
				tips.css('color','#8ec060');
			}else{
				tips.html("您的输入不符合要求，请重新输入！");
				tips.css('color','#d0011b');
			}
		});

		// 当忘记密码界面输入用户信息时，显示时间倒计时
		$('#f-LanmeiUserName').change(function(e){
			// console.log('change');
		});

		// 禁用button提交按钮
		$('#registerBtn').click(function(e){
			e.preventDefault();
		});

		//按回车键自动登录
		$('#LanmeiPassword').keydown(function(e){
			if(e.keyCode==13){
			   $('.userLoginBtn').click();
			}
		});
	},

	/* 导航菜单切换 */
	navbarSilder:function(){
		$('.LMCompanyInfo').on('mouseenter','.lm-nav li',function(e){
			var id = $(this).children('a').attr('href');
			
			$(this).addClass('active').siblings('li').removeClass('active');
			$('.LMCompanyDownMenu').hide();
			if(!$(this).children('a').attr('data-href')){
				$('.lm-nav-line').show();
				$('.lm-nav').css('background','#fff');
				$(id).stop().show();
			}else{
				$('.lm-nav-line').hide();
				$('.lm-nav').css('background','none');
			}
		}).on('mouseleave','.lm-nav li',function(e){
			
		});

		$('.LMCompanyInfo').on('mouseleave',function(e){
			$('.lm-nav-line').hide();
			$('.lm-nav').css('background','transparent');
			$('.lm-nav li').removeClass('active');
			$('.LMCompanyDownMenu').stop().hide();
			
		});

		$('.lm-nav>li>a,.LMCompanyDownMenu .subMenu a').click(function(e){
			var href = $(this).attr('href');
			href=='#' && e.preventDefault();
		});
	},

	/* 置顶按钮 */
	getTop:function(){
		var getBottom; 
		var _tick = null;
		$(window).scroll(function() {
			if (_tick) clearTimeout(_tick);
			_tick = setTimeout(function() {
				var winWidth = $(window).width();
				// if(winWidth>=992){
					// $(window).scrollTop()>300 ? $('.BackToTop').fadeIn('slow') : $('.BackToTop').fadeOut('slow');
					
					getBottom = $(document).height() - $(window).height() - $(window).scrollTop();
					if(getBottom<320){
						$('.BackToTop').css('bottom',300-getBottom);
					}else{
						$('.BackToTop').css('bottom',70);
					}
				// }
			}, 100);
		});

		$('.BackToTop').click(function(){
			$('html, body').animate({scrollTop:0}, 'slow');
		});

	},

	/* 其他事件 */
	otherEvent:function(){
		// 日期选择--动态加载
		var formatDate = function(ymd) { //日期格式化
		    return ymd.replace(/(\d{4})\-(\d{1,2})\-(\d{1,2})/g, function(ymdFormatDate, y, m, d){
		        m < 10 && (m = '0' + m);
		        d < 10 && (d = '0' + d);
		        return y + '-' + m + '-' + d;
		    });
		};
		var today  = new Date();
		var startTimeStr = new Date(today.getTime()+86400000*1); 
		var startTime = formatDate(startTimeStr.getFullYear()+'-'+(startTimeStr.getMonth()+1)+'-'+startTimeStr.getDate());  //新增代码2017-10-09
		// console.log(startTime);
		// 搜索航班跳转
		$('.a-search-flight').click(function(event) {
			event.preventDefault();
			window.open('http://b2c.lanmeiairlines.com/lqWeb/reservation/AVQuery.do?orgcity=PNH&dstcity=MFM&language=CN&CURRENCY=USD&tripType=OW&takeoffDate='+startTime+'&cabinType=ECONOMY&adultCount=1&childCount=0&returnDate=');
		});
	},

	/* 屏幕适配 */
	rem:function(){
		;(function(win) {
			var doc = win.document;
			var docEl = doc.documentElement;
			var tid;

			function refreshRem() {
				var width = docEl.getBoundingClientRect().width;
		        if (width > 540) { // 最大宽度
		        	width = 540;
		        }
		        var rem = width / 3.2; 
		        docEl.style.fontSize = rem + 'px';
		        // console.log(width,rem);
		    }

		    win.addEventListener('resize', function() {
		    	clearTimeout(tid);
		    	tid = setTimeout(refreshRem, 300);
		    }, false);
		    win.addEventListener('pageshow', function(e) {
		    	if (e.persisted) {
		    		clearTimeout(tid);
		    		tid = setTimeout(refreshRem, 300);
		    	}
		    }, false);

		    refreshRem();

		})(window);
	},

};

$(document).ready(function($) {
	LanmeiAirlinesCommon.init();
});


(function($){
	// 文字滚动
	$.fn.extend({
		"slideUp":function(value){
			
			var docthis = this;
			//默认参数
			value=$.extend({
				"li_h":"30",
				"time":2000,
				"movetime":1000
			},value);
			
			//向上滑动动画
			function autoani(){
				$("li:first",docthis).animate({"margin-top":-value.li_h},value.movetime,function(){
					$(this).css("margin-top",0).appendTo(".line");
				});
			}
			
			//自动间隔时间向上滑动
			var anifun = setInterval(autoani,value.time);
			
			//悬停时停止滑动，离开时继续执行
			$(docthis).children("li").hover(function(){
				clearInterval(anifun);			//清除自动滑动动画
			},function(){
				anifun = setInterval(autoani,value.time);	//继续执行动画
			});
		}	
	});
})(jQuery);
