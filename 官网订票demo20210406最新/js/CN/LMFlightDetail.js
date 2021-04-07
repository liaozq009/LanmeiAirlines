
// 解析URL 
function GetRequest() {   
   var url = location.search; //获取url中"?"符后的字串   
   var theRequest = {};   

   if (url.indexOf("?") != -1) {   
      var str = url.substr(1);   
      strs = str.split("&");   
      for(var i = 0; i < strs.length; i ++) {   
         theRequest[strs[i].split("=")[0]]=decodeURIComponent(strs[i].split("=")[1]);   
      }   
   }   
   return theRequest;   
}
var urlArr = GetRequest();  

var routeType = urlArr.routeType;
var fromCity = urlArr.fromCity;
var toCity = urlArr.toCity;
var flightNum = urlArr.flightNum;
var timeFrom = urlArr.timeFrom;

console.log(routeType,fromCity,toCity,flightNum,timeFrom);

var LanmeiAirlinesTickit = {
	init:function(){
		this.flightInfo();
		this.addEvend();
	},

	/* 航班信息显示 */
	flightInfo:function(){
		//去掉日期选择最后一个li的右边线
		$('.f-time-select li:last a').css("border","none");

		// 航班查询结果，偶数行背景颜色
		$('.i-content-inner li:odd').css('background','#f2f2f2');

		// 根据不同日期显示不同的航班信息
		$('.js-time-select').on('click','>li a',function(){
			$(this).parent('li').addClass('active').siblings('li').removeClass('active');
		});

		// 根据首页传进来的参数对By route 和 By flight number进行切换
		if(routeType=='1'){
			$('.selectWay .RoundTrip').addClass('active').siblings('a').removeClass('active');
			$('.flightSelectStart').show();
			$('.localSelectStart,.localSelectEnd').hide();
		}
	},

	/* 其他事件 */
	addEvend:function(){
		// 日期选择
		$('#f-timeFrom').dateSelect({
			timeFrom: 'f-timeFrom',
			isSingleDay:true,
		});
	},
};

$(document).ready(function($) {
	LanmeiAirlinesTickit.init();
});