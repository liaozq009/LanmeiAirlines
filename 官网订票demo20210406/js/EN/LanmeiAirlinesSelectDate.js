
var getUrl = location.search.substring(1); //获取url中"?"符后的字串  

if(getUrl=='round'){
	$('.selectWay .RoundTrip').addClass('active').siblings('a').removeClass('active');
	$('.timeSelectEnd').css('visibility','visible');
}else if(getUrl=='one'){
	$('.selectWay .OneWay').addClass('active').siblings('a').removeClass('active');
}

var LanmeiAirlinesTickit = {
	init:function(){
		this.timeTableSelect();
		this.addEvend();
	},

	/* 日期表格选择 */
	timeTableSelect:function(){
		// 初始化表格，设置不可选日期
		var totalTd = $('.timeTableSelect td');
		$.each(totalTd,function(i,val){
			var departuredate = $(val).attr('departuredate');
			var departuredateNum;
			if(departuredate){
				departuredateNum = parseInt($(val).attr('departuredate').replace(/-/g,""));
			}
			var returndate = $(val).attr('returndate');
			var returndateNum;
			if(returndate){
				returndateNum = parseInt($(val).attr('returndate').replace(/-/g,""));
			}
			if(returndateNum-departuredateNum<0){
				$(val).addClass('saleOver');
			}
		});
		$('.timeTableSelect td').click(function(event) {
			if(!$(this).hasClass('saleOver')){
				$('tbody>tr>td').removeClass('clickHover').removeClass('bgHover');
				$(this).addClass('clickHover');
				$(this).prevAll().addClass('bgHover');
				$(this).siblings('[data-num=td-nth-child1]').addClass('clickHover');
				var currentClass = $(this).attr('data-num');
				$(this).parent('tr').prevAll().children('[data-num='+currentClass+']').addClass('bgHover');
				$(this).parent('tr').siblings('[data-num=tr-nth-child1]').children('[data-num='+currentClass+']').addClass('clickHover');
			}
		});
		$('.timeTableSelect td').mouseover(function(event) {
			if(!$(this).hasClass('saleOver')){
				$(this).addClass('borderHover');
			}
		});
		$('.timeTableSelect td').mouseout(function(event) {
			$(this).removeClass('borderHover');
		});
	},

	/* 其他事件 */
	addEvend:function(){
		// 日期选择
		$('#timeFrom').dateSelect({
			'timeFrom': 'timeFrom',
			'timeTo': 'timeTo',
		});
	},
};

$(document).ready(function($) {
	LanmeiAirlinesTickit.init();
});