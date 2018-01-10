
var LMTravelNeeds = {
	init:function(){
		this.timeSelect();
		this.otherEvent();
	},

	/* 时间选择 */
	timeSelect:function(){
		$('#js-timeModal').modal();
	},

	/* 其他事件 */
	otherEvent:function(){

	},
};

$(document).ready(function($) {
	LMTravelNeeds.init();
});
