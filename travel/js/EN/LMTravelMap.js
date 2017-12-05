
var LMTravelList = {
	init:function(){
		this.otherEvent();
	},

	/* 其他事件 */
	otherEvent:function(){

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
