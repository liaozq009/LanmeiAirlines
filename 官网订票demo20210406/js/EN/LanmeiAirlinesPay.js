
var LanmeiAirlinesPay = {
	init:function(){
		this.addEvend();
	},


	/* 其他事件 */
	addEvend:function(){
		// 支付方式选择
		$('.selectMethod li img').click(function(){
			$(this).hide().siblings('img').show();
			$(this).parent().siblings('li').children('.img01').show().siblings('.img02').hide();
		});

		// 点击NEXT的时候要做判断
		$('.payBtn a').click(function(e){
			e.preventDefault();
			if($('.agree input').is(':checked')){
				window.location.href="LanmeiAirlinesComplete.html";
			}else{
				layer.open({
				  type: 1, //Page层类型
				  area: ['auto', 'auto'],
				  title: 'prompt box',
				  shadeClose: true, //点击遮罩关闭
				  shade: 0.6, //遮罩透明度
				  btn: ['YES'],
				  btnAlign: 'c',
				  maxmin: false, //允许全屏最小化
				  anim: 1, //0-6的动画形式，-1不开启
				  content: '<div style="text-align:center;padding-top:30px;font-size:20px">Please confirm the above contents have been reading</div>',
				  yes: function(index, layero){
				  	layer.close(index); //如果设定了yes回调，需进行手工关闭
				  }
				});    
			}
		});
	},
};

$(document).ready(function($) {
	LanmeiAirlinesPay.init();
});