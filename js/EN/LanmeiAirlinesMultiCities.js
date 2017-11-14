
var LanmeiAirlinesMultiCities = {
	init:function(){
		this.addLocaSelect();
		this.addEvend();
	},



	addLocaSelect:function(){
		$('.addLocaSelect').click(function(){
			// 获取多段个数
			var curNum = $('.local_timeSelect>div').length+1;

			var addSelectChild = '<div class="local_timeSelectList1 local_timeSelectList">'+
					'<div class="serialNum">'+curNum+'</div>'+
					'<div class="localSelectStart autoClick">'+
						'<p><img src="../../images/EN/originStart2.png"><span>Origin</span></p>'+
						'<input type="text" class="fromcityinput inputDown Autocomplete" id="fromcity'+curNum+'" value="" placeholder="">'+
						'<img src="../../images/EN/downArrow.png">'+
						'<span class="clear">X</span>'+
						'<i class="img01 localChangeImg"></i>'+
						'<b class="bottomLine"></b>'+
						'<ul class="fromcityMenu menu-com">'+
							'<li><a href="#" class="menu-list" title="Phnom Penh, Cambodia (Pochentong - PNH)">Phnom Penh, Cambodia (Pochentong - PNH)</a></li>'+
							'<li><a href="#" class="menu-list" title="Siem Reap, Cambodia (Siem Reap - REP)">Siem Reap, Cambodia (Siem Reap - REP)</a></li>'+
						'</ul>'+
					'</div>'+
					'<div class="localSelectEnd autoClick autoFocus">'+
						'<p><img src="../../images/EN/originEnd2.png"><span>Destination</span></p>'+
						'<input type="text" class="tocityinput inputDown Autocomplete" id="tocity'+curNum+'" value="" placeholder="">'+
						'<img src="../../images/EN/downArrow.png">'+
						'<span class="clear">X</span>'+
						'<b class="bottomLine"></b>'+
						'<ul class="tocityMenu menu-com">'+
							'<li><a href="#" class="menu-list" title="Phnom Penh, Cambodia (Pochentong - PNH)">Phnom Penh, Cambodia (Pochentong - PNH)</a></li>'+
							'<li><a href="#" class="menu-list" title="Siem Reap, Cambodia (Siem Reap - REP)">Siem Reap, Cambodia (Siem Reap - REP)</a></li>'+
						'</ul>'+
					'</div>'+
					'<div class="timeSelectStart">'+
						'<p><img src="../../images/EN/departureDate2.png"><span>Departure Date</span></p>'+
						'<input type="text" id="timeFrom'+curNum+'" class="timeFrom" name="from" value="" placeholder="" readonly>'+
						'<img src="../../images/EN/downArrow.png">'+
					'</div>'+
					'<div class="delete-icon">X</div>'+
				'</div>';

			$('.local_timeSelect').append(addSelectChild);

			// 调用日期插件
			$('#timeFrom'+curNum+'').dateSelect({
				'timeFrom': 'timeFrom'+curNum+'',
				isSingleDay:true,
			});
		});

		// 删除一行
		$('.local_timeSelect').on('click','.delete-icon',function(){
			$(this).parent().remove();
		});
	},

	/* 其他事件 */
	addEvend:function(){
		// 点击查询
		$('.searchAir a').click(function(){
			$(this).addClass('active');
		});

		/* 起始地点切换 */
		$('.selectAirCommon').on('mouseover','.localChangeImg',function(){
			$(this).addClass('img02');
		}).on('mouseout','.localChangeImg',function(){
			$(this).removeClass('img02');
		});

		$('.selectAirCommon').on('click','.localChangeImg',function(){
			var $fromcity = $(this).siblings('input');
			var $tocity = $(this).parent().siblings('.localSelectEnd').find('input');
			var fromcity = $fromcity.val();
			var tocity = $tocity.val();
			$fromcity.val(tocity);
			$tocity.val(fromcity);
		});

		// 初始化日期选择
		for(var i=1; i<=3; i++){
			$('#timeFrom'+i+'').dateSelect({
				'timeFrom': 'timeFrom'+i+'',
				isSingleDay:true,
			});
		}
	},
};

$(document).ready(function($) {
	LanmeiAirlinesMultiCities.init();
});