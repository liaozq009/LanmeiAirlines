
var LanmeiAirlinesPersonalCenter = {
	init:function(){
		this.ticketSearch();
		this.addEvend();
	},

	/* 机票订单查询 */
	ticketSearch:function(){
		$('.ticket-title li a').click(function(e){
			e.preventDefault();
			$('.ticket-title li img').hide();
			$(this).siblings('img').show();
			var id = $(this).attr('href');
			$(id).show().siblings('.ticket-menu').hide();
		});
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
			//日期 英文 语言设置
		    language:{                            
		        name  : "en",
		        month : ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
		        weeks : [ "SUN","MON","TUR","WED","THU","FRI","SAT" ],
		        times : ["Hour","Minute","Second"],
		        clear : "Clear",
		        today : "Today",
		        yes   : "set",
		        close : "Close"
		    }
		});

		$("#p-birth").val('2017-10-2');

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

		// 修改密码
		$('.js-c-password').click(function(){
			$('#c-passwordModal').modal();
		});
		// 提交修改密码
		$('.js-pas-submitBtn').click(function(){
			$('#c-passwordModal').modal('hide');
		});

		// 设置各项信息提示框
		var setLayer = function(){
			layer.tips('Set personal information!', '.personalSetting',{
				tips: [1, '#8ec060'],
				time: 6000
			});
		}
		setLayer();
		$('.personalSetting').mouseover(function(event) {
			setLayer();
		});

		// 国籍选择下拉框
		$('#p-nation').click(function(e){
			e.stopPropagation();
			$(this).siblings('ul').show();
		});
		$('.form-nation .menu-com a').click(function(e){
			// e.preventDefault();e.stopPropagation();
			var $parent = $(this).parents('.menu-com');
			var val = $(this).text();
			$parent.siblings('input').val(val);
			// $parent.hide();
		});
		$('html').click(function(){
			$('.form-nation .menu-com').hide();
		});

		//菜单切换
		$('.infoContent>li').click(function(){
			$(this).addClass('active').siblings('li').removeClass('active');
		});
	},
};

$(document).ready(function($) {
	LanmeiAirlinesPersonalCenter.init();
});