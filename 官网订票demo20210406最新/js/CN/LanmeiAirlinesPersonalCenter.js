
var LanmeiAirlinesPersonalCenter = {
	init:function(){
		this.addEvend();
	},


	/* 其他事件 */
	addEvend:function(){
		$('.personalSetting').click(function(){
			$('#personalModal').modal();
		});

		// 生日选择
		$("#p-birth").jeDate({
			isinitVal: true,
			festival: false,
			ishmsVal:false,
			minDate: '1900-06-16',
			maxDate: $.nowDate({DD:0}),
			format:"YYYY-MM-DD",
			zIndex:3000,
		});

		$("#p-birth").val('2000-11-28');

		$('.submitBtn').click(function(){
			//提示层
			layer.msg('上传成功');

			//loading层
			// var index = layer.load(1, {
			//   shade: [0.1,'#fff'] //0.1透明度的白色背景
			// });

			// function closeLoading(){
			// 	layer.close(index);
			// }

			// setTimeout(closeLoading,3000);
		});
	},
};

$(document).ready(function($) {
	LanmeiAirlinesPersonalCenter.init();
});