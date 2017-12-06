
var LMTravelList = {
	init:function(){
		this.otherEvent();
	},

	/* 其他事件 */
	otherEvent:function(){

		function MM_reloadPage(init) {
		    if (init == true) with (navigator) {
		        if ((appName == "Netscape") && (parseInt(appVersion) == 4)) {
		            document.MM_pgW = innerWidth; document.MM_pgH = innerHeight; onresize = MM_reloadPage;
		        }
		    }else if (innerWidth != document.MM_pgW || innerHeight != document.MM_pgH){
		        location.reload();
		    }
		}
		MM_reloadPage(true);

		// 获取容器的宽
		var $con = $('.lm-container');
		var getHeight = function(){
			var windowHeight = parseInt($(window).height());
			$con.height(windowHeight);
		};
		getHeight();

		var _time = null;
		$(window).resize(function(){
			if (_time) clearTimeout(_time);
	    	_time = setTimeout(function() {
	    		// getHeight();	
            }, 1000);
		});
	},
};

$(document).ready(function($) {
	LMTravelList.init();
});
