
$(document).ready(function(){

	/* ie9以下直接显示 */
	var ieShow = function(){
		$('.a-wrapper').fadeIn('slow');
		$('body').css('background','#3D0A4D');
		$('.a-cool').css('display','none');
	}

	// ie兼容性判断
	if (document.all && document.addEventListener && !window.atob) {
		// alert('IE9');
		ieShow();
	}else if (document.all && document.querySelector && !document.addEventListener) {
		// alert('IE8');
		ieShow();
	}

	/* 炫酷开场页 */
	var startdelay = 200;
	var coredelay = 300;
	var maindelay = 2000;
	// 圆圈、闪亮的灯、文字
	setTimeout("$('.ringgroup').addClass('pass');$('.light').addClass('pass');$('.core').addClass('pass');",startdelay);
	setTimeout("$('.light').addClass('passed');$('.wave').addClass('pass');",startdelay + coredelay);

	// 内容显示
	setTimeout(function(){ 
		$('.a-wrapper').fadeIn('slow');  
		$('.a-cool').css('display','none');
	},startdelay + coredelay + maindelay); 

	// 添加背景
	setTimeout(function(){ 
		$('body').css('background','#3D0A4D');
	},startdelay + coredelay + maindelay + 10);  

	// 弹出登录提示模态框
	setTimeout(function(){ 
		// $('#activeModal').modal();
	},startdelay + coredelay + maindelay+2200);  

	/* 点击立即抢购 */
	/* 日期选择--动态加载 */
	var formatDate = function(ymd) { //日期格式化
	    return ymd.replace(/(\d{4})\-(\d{1,2})\-(\d{1,2})/g, function(ymdFormatDate, y, m, d){
	        m < 10 && (m = '0' + m);
	        d < 10 && (d = '0' + d);
	        return y + '-' + m + '-' + d;
	    });
	};
	var today  = new Date();
	var startTimeStr = new Date(today.getTime()+86400000*1); 
	var startTime = formatDate(startTimeStr.getFullYear()+'-'+(startTimeStr.getMonth()+1)+'-'+startTimeStr.getDate());  

	// 单程
	var flightSearch1 = function(orgcity,dstcity,language){
		window.location.href = 'http://b2c.lanmeiairlines.com/lqWeb/reservation/AVQuery.do?orgcity='+orgcity+'&dstcity='+dstcity+'&language='+language+'&CURRENCY=USD&tripType=OW&takeoffDate='+startTime+'&cabinType=ECONOMY&adultCount=1&childCount=0&returnDate=';
	}
	$('.seckill-now .img-active').click(function(){
		$('#succModal').modal();
		$('#succModal').on('hide.bs.modal', function () {
			$("#fireworks").fireworks({
				width: "100%",
				height: "100%"
			});
			$("#fireworks").fadeIn();
			$('.close-fireworks').fadeIn();
			$('.close-fireworks').click(function(event) {
				$("#fireworks").fadeOut();
				$(this).fadeOut();
			});
		});

		// $('#failModal').modal();
		// setTimeout(function(){ 
		// 	flightSearch1('PNH','REP','US');
		// },3000);  
	});
	/* 抢购0元机票成功或失败 */
	$('.succModal-close').click(function(){
		$('#succModal').modal('hide');
	});
	$('.failModal-close').click(function(){
		$('#failModal').modal('hide');
	});

	/* 点击提示框中的登录或者注册 */
	$('.a-registered').click(function(){
		$('#activeModal').modal('hide');
		$('#registerModal').modal();
	});
	$('.a-login').click(function(){
		$('#activeModal').modal('hide');
		$('#logonModal').modal();
	});
	$('.js-closeActive').click(function(){
		$('#activeModal').modal('hide');
	});

	/* 倒计时 */
	var clock = $('.lm-clock').FlipClock({
        clockFace: 'DailyCounter',
        autoStart: false,
        callbacks: {
        	stop: function() {
        		// console.log('开始抢购！');
        	}
        }
    });

    var currentDate = function () {
        // get client's current date
        var date = new Date();

        // turn date to utc 得到国际标准时间  
        var utc = date.getTime() + (date.getTimezoneOffset() * 60000);

        // set new Date object 时区的偏移量,后面的8为东八区
        var new_date = new Date(utc + (3600000*8));

        return new_date;
    };

	// var target_date = new Date('2017/11/11 11:11:00').getTime();
	var target_date = new Date('2017/11/2 15:35:00').getTime();
	var current_date = currentDate().getTime();

	 var difference =  Math.floor((target_date - current_date)/1000);
	 console.log(difference);
	 if(difference>0){
	    clock.setTime(difference);
	 }
    clock.setCountdown(true);
    clock.start();

});
