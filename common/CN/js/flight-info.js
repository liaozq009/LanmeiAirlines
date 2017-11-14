
var flightInfo = {
	init:function(){
		this.citiesSelect1();
		this.flightInfoSelect();
	},

	/* 解决延迟300ms问题 */
	fastClick:function(dom){
		FastClick.attach(dom[0]);
	},

	/* 城市选择 */
	citiesSelect1:function(){
		var hideMenu = function(){
			$('.selectAirCommon>div ul').hide();
			$('.selectAirCommon>div .inputDown').removeClass('active').siblings('.bottomLine').hide();
			$('.clear').hide(); //隐藏清楚按钮
		};
		// 点击空白隐藏
		$('html').click(function(){
			hideMenu();
		});

		var fromcityData = ['西哈努克市(xihanuke)/KOS/柬埔寨','澳门(aomen)/MFM/中华人民共和国澳门特别行政区','金边(jinbian)/PNH/柬埔寨','暹粒(XianLi)/REP/柬埔寨','帕劳(palao)/ROR/帕劳共和国'];
		var tocityData =   ['西哈努克市(xihanuke)/KOS/柬埔寨','澳门(aomen)/MFM/中华人民共和国澳门特别行政区','金边(jinbian)/PNH/柬埔寨','暹粒(XianLi)/REP/柬埔寨','帕劳(palao)/ROR/帕劳共和国'];
		// var fromcityData = ['Phnom Penh, Cambodia (Pochentong - PNH)','Siem Reap, Cambodia (Siem Reap - REP)'];
		// var tocityData = ['Phnom Penh, Cambodia (Pochentong - PNH)','Siem Reap, Cambodia (Siem Reap - REP)'];

		$.each(fromcityData,function(i,val){
			$('.fromcityMenu').append('<li><a href="#" title="'+val+'" class="menu-list">'+val+'</a></li>');
		});
		$.each(tocityData,function(i,val){
			$('.tocityMenu').append('<li><a href="#" title="'+val+'" class="menu-list">'+val+'</a></li>');
		}); 

		// 点击input的时候
		$('.selectAirCommon').on('click','.inputDown',function(e){
			e.stopPropagation();

			var id = $(this).attr('id');

			// 请选择出发地提示
			if(id=='tocity' && $('#fromcity').val()=='' && $('#tocity').val()==''){
				layer.tips('请选择出发地!', '#tocity',{
					tips: [1, '#8ec060'],
					time: 3000
				});
			}

			switch (id) {
				case 'fromcity':
					// 目的地的值
					var f = $(this).parents().siblings('.localSelectEnd').children('input').val();
					$('.fromcityMenu').empty(); //清空菜单

					$.each(fromcityData,function(i,val){
						$('.fromcityMenu').append('<li><a href="#" title="'+val+'" class="menu-list">'+val+'</a></li>');
					});

					break;
				case 'tocity':
					// 出发地的值
					var t = $(this).parents().siblings('.localSelectStart').children('input').val();
					$('.tocityMenu').empty(); //清空菜单
					
					$.each(tocityData,function(i,val){
						$('.tocityMenu').append('<li><a href="#" title="'+val+'" class="menu-list">'+val+'</a></li>');
					}); 

					var tA = $(this).siblings('ul').find('a:contains('+t+')').parent().hide();

					break;
			}
			
			if($(this).val()!==''){
				$(this).siblings('.clear').show();
				// ie兼容性判断
				if (document.all && document.addEventListener && !window.atob) {
					// alert('IE9');
					$(this).siblings('.clear').hide();
				}else if (document.all && document.querySelector && !document.addEventListener) {
					// alert('IE8');
					$(this).siblings('.clear').hide();
				}else{
					$(this).siblings('.clear').show();
				}
			}else{
				$(this).siblings('.clear').hide();
			}

			$('.selectAirCommon .inputDown').removeClass('active').siblings('.bottomLine').hide();
			$(this).addClass('active').siblings('.bottomLine').show();
			$('.selectAirCommon ul').hide();
			$(this).siblings('ul').show();
		});

		// 点击下拉框选项后
		$('.selectAirCommon').on('click','.menu-com a',function(e){
			e.preventDefault();e.stopPropagation();
			var val = $(this).html();
			$(this).parents('ul').hide().siblings('.bottomLine,.clear').hide().siblings('input').val(val);
			$('.selectAirCommon .inputDown').removeClass('active');

			// 自动获取焦点
			var $autoClick = $(this).parents('.autoClick');
			$autoClick.next().find('input').click();
			if($autoClick.hasClass('autoFocus')){
				$autoClick.siblings('.timeSelectStart').find('input').focus();
			}
		});

		// 清空输入框数据
		$('.selectAirCommon').on('click','.clear',function(){
			$(this).siblings('input').val('');
		});

		// 模糊匹配
		$('.selectAirCommon').on('keyup','.Autocomplete',function(event) {
			$(this).siblings('ul').empty();
			var getClass = $(this).siblings('ul').attr('class');
			var cityData;
			getClass=='fromcityMenu' ? cityData=fromcityData : cityData=tocityData;
			var currentVal = $(this).val().toLowerCase();
			var srdata = [];
			for (var i = 0; i < cityData.length; i++) {
				if (currentVal.trim().length > 0 && cityData[i].toLowerCase().indexOf(currentVal) > -1) {
					srdata.push(cityData[i]);
				}
			}
			var that = this;
			$.each(srdata,function(i,val){
				$(that).siblings('ul').append('<li><a href="#" title="'+val+'" class="menu-list">'+val+'</a></li>');
			});
			if(currentVal===''){
				$.each(cityData,function(i,val){
					$(that).siblings('ul').append('<li><a href="#" title="'+val+'" class="menu-list">'+val+'</a></li>');
				});
			}
		});
	},

	/* 航班基本信息选择 */
	flightInfoSelect:function(){
		/* 固定或无固定出发时间 */
		var departureDateSelect = function(){
			// $('.departureDate .nth-child1 b').show();
			$('.departureDate label i').click(function(){
				$(this).siblings('b').show().parent().siblings('label').children('b').hide();
			});
			$('.departureDate label span').click(function(){
				$(this).siblings('b').show().parent().siblings('label').children('b').hide();
			});
		};
		departureDateSelect();

		// 点击搜索   固定日期和无固定日期切换
		$('.searchAir a').click(function(e){
			e.preventDefault();
			$(this).addClass('active');
			var b = $('.departureDate label b').css('display');
			if($('.departureDate label b')[0]){
				if(b=='block'){
					window.location.href="LanmeiAirlinesSelectFlight.html";
				}else{
					window.location.href="LanmeiAirlinesSelectDate.html";
				}
			}
		});

		/* 单程或双程选择或多段切换 */
		var selectDateWay = function(){
			// $('.selectWay a.nth-child1').addClass('active');
			// $('.timeSelectEnd').hide();
			$('.selectWay a').click(function(e){
				e.preventDefault();
				$(this).addClass('active').siblings('a').removeClass('active');
				var selectWay = $(this).attr('data-way');
				var dataMulti = $(this).attr('data-Multi');

				switch (selectWay)
				{
					case 'roundTrip' : 
						$('.timeSelectEnd').css('visibility','visible');
						if(dataMulti=="true"){
							window.location.href="LanmeiAirlinesSelectDate.html?round";
						} 
						break;
					case 'oneWay' :
						$('.timeSelectEnd').css('visibility','hidden');
						if(dataMulti=="true"){
							window.location.href="LanmeiAirlinesSelectDate.html?one";
						} 
						break;
					case 'multi':
						if(dataMulti!="true"){
							window.location.href="LanmeiAirlinesMultiCities.html";
						} 
						break;
					case 'b-route':
						$('.localSelectStart,.localSelectEnd').show();
						$('.flightSelectStart').hide();
						break;
					case 'f-num':
						$('.flightSelectStart').show();
						$('.localSelectStart,.localSelectEnd').hide();
						break;
				}
			});
		};
		selectDateWay();

		/* 起始地点切换 */
		$('#localChangeImg').mouseover(function(){
			$(this).addClass('img02');
		}).mouseout(function(){
			$(this).removeClass('img02');
		});

		$('#localChangeImg').click(function(){
			// $(this).addClass('img02');
			var fromcity = $('#fromcity').val();
			var tocity = $('#tocity').val();
			$('#fromcity').val(tocity);
			$('#tocity').val(fromcity);
		});

		/* 舱位选择 */
		var CabinSelect = function(){
			$('.dropdownMenu').hide();
			$('#Cabin').click(function(e){
				e.stopPropagation();
				$('.dropdownMenu').show();
			});
			$('.dropdownMenu a').click(function(e){
				e.preventDefault();
				e.stopPropagation();
				$('.dropdownMenu').hide();
				var val = $(this).html();
				$('#Cabin').val(val);
			});
			$('html').click(function(){
				$('.dropdownMenu').hide();
			});
		};
		// CabinSelect();

		/* 乘客人数选择 */
		var AdultNum = 1;
		var ChildNum = 0;
		var InfantNum = 0;

		var AdultSelect = function(){
			$('.AdultSelect .addArrow').click(function(){
				var ChildNum = $('#Child').val();//获取小孩人数
				if(parseInt(ChildNum)+AdultNum<5){
					AdultNum++;
					$('#Adult').val(AdultNum);
				}else{
					layer.tips('成人与儿童总计不超5个!', '#Adult',{
						tips: [2, '#8ec060'],
						time: 3000
					});
				}
			});
			$('.AdultSelect .downArrow').click(function(){
				$('#Adult').val()>=2 && AdultNum--;
				$('#Adult').val(AdultNum);
			});
		};

		var ChildSelect = function(){
			$('.ChildSelect .addArrow').click(function(){
				var AdultNum = $('#Adult').val();//获取成人人数
				if(parseInt(AdultNum)+ChildNum<5){
					ChildNum++;
					$('#Child').val(ChildNum);
				}else{
					layer.tips('成人与儿童总计不超5个!', '#Child',{
						tips: [2, '#8ec060'],
						time: 3000
					});
				}
			});
			$('.ChildSelect .downArrow').click(function(){
				$('#Child').val()>=1 && ChildNum--;
				$('#Child').val(ChildNum);
			});
		};

		var InfantSelect = function(){
			$('.InfantSelect .addArrow').click(function(){
				InfantNum++;
				$('#Infant').val(InfantNum);
			});
			$('.InfantSelect .downArrow').click(function(){
				$('#Infant').val()>=1 && InfantNum--;
				$('#Infant').val(InfantNum);
			});
		};

		AdultSelect();
		ChildSelect();
		InfantSelect();

		// 日期选择--动态加载
		var formatDate = function(ymd) { //日期格式化
		    return ymd.replace(/(\d{4})\-(\d{1,2})\-(\d{1,2})/g, function(ymdFormatDate, y, m, d){
		        m < 10 && (m = '0' + m);
		        d < 10 && (d = '0' + d);
		        return y + '-' + m + '-' + d;
		    });
		};

		var today  = new Date();
		var startTimeStr = new Date(today.getTime()+86400000*1); 
		var startTime = formatDate(startTimeStr.getFullYear()+'-'+(startTimeStr.getMonth()+1)+'-'+startTimeStr.getDate());  //新增代码2017-09-30

		// 重置输入框内容
		$('.resetBtn').click(function(){
			AdultNum = 1;
			ChildNum = 0;
			InfantNum = 0;

			$('#fromcity').val('');
			$('#tocity').val('');
			$('#timeFrom').val(startTime);
			$('#timeTo').val('');
			$('#Cabin').val('ECONOMY');
			$('#Adult').val('1');
			$('#Child').val('0');
			$('#Infant').val('0');
		});
	},

};

$(document).ready(function($) {
	flightInfo.init();
});
