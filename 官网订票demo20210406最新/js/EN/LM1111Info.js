
$(document).ready(function(){
	/* 日期选择--动态加载 */
	var formatDate = function(ymd) { //日期格式化
	    return ymd.replace(/(\d{4})\-(\d{1,2})\-(\d{1,2})/g, function(ymdFormatDate, y, m, d){
	        m < 10 && (m = '0' + m);
	        d < 10 && (d = '0' + d);
	        return y + '-' + m + '-' + d;
	    });
	};
	var today  = new Date();
	var startTimeStr = new Date(today.getTime()+86400000*10); 
	var endTimeStr = new Date(today.getTime()+86400000*12); 
	var startTime = formatDate(startTimeStr.getFullYear()+'-'+(startTimeStr.getMonth()+1)+'-'+startTimeStr.getDate());  
	var endTime = formatDate(endTimeStr.getFullYear()+'-'+(endTimeStr.getMonth()+1)+'-'+endTimeStr.getDate());  
	// console.log(endTime);
	// 单程
	var flightSearch1 = function(orgcity,dstcity,language){
		window.open('http://b2c.lanmeiairlines.com/lqWeb/reservation/AVQuery.do?orgcity='+orgcity+'&dstcity='+dstcity+'&language='+language+'&CURRENCY=USD&tripType=OW&takeoffDate='+startTime+'&cabinType=ECONOMY&adultCount=1&childCount=0&returnDate=');
	}
	// 往返
	var flightSearch2 = function(orgcity,dstcity,language){
		window.open('http://b2c.lanmeiairlines.com/lqWeb/reservation/AVQuery.do?orgcity='+orgcity+'&dstcity='+dstcity+'&language='+language+'&CURRENCY=USD&tripType=RT&takeoffDate='+startTime+'&cabinType=ECONOMY&adultCount=1&childCount=0&returnDate='+endTime+'');
	}
	/* 双十一机不可失页面机票搜索 */
	// 金边澳门 单程
	$('.s-flight-1').click(function(){
		flightSearch1('PNH','MFM','US');
	});
	// 金边澳门往返
	$('.s-flight-2').click(function(){
		flightSearch2('PNH','MFM','US');
	});

	// 金边暹粒单程
	$('.s-flight-3').click(function(){
		flightSearch1('PNH','REP','US');
	});

	// 澳门金边单程
	$('.s-flight-4').click(function(){
		flightSearch1('MFM','PNH','US');
	});
	// 澳门金边往返
	$('.s-flight-5').click(function(){
		flightSearch2('MFM','PNH','US');
	});

	/* 立即领取 优惠券 */
	$('.get-coupon>a').click(function(){
		window.open('http://lanmeiairlines.com/');
	});

});
