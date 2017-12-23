
var LMTravelPlanning = {
	init:function(){
		
		this.otherEvent();
	},

	/* 其他事件 */
	otherEvent:function(){
		$('.range-slider').jRange({
			from: 0,
			to: 10000,
			step: 1000,
			showScale:false,
			format: '%s',
			width: 180,
			showLabels: true,
			isRange : true
		});

		// 
		$('.p-header-title .p-edit').click(function(){
			$('.p-editor').show();
		});
		$('.p-editor-ok button').click(function(){
			$('.p-editor').hide();
		});
	},
};

$(document).ready(function($) {
	LMTravelPlanning.init();
});
