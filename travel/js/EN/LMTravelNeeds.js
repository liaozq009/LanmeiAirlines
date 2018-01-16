
var LMTravelNeeds = {
	init:function(){
		this.timeSelect();
		this.moneySelect();
		this.hotelSelect();
		this.otherEvent();
	},

	/* 时间选择 */
	timeSelect:function(){
		$('#js-timeModal').modal();
		
		// 跳到金额模态框
		$('.js-time-next').click(function(){
			$('#js-timeModal').modal('hide');
			$('#js-moneyModal').modal();
		});
		$('.js-money-back').click(function(){
			$('#js-timeModal').modal('show');
			$('#js-moneyModal').modal('hide');
		});
		$('.js-money-next').click(function(){
			$('#js-hotelModal').modal();
			$('#js-moneyModal').modal('hide');
		});
		$('.js-hotel-back').click(function(){
			$('#js-hotelModal').modal('hide');
			$('#js-moneyModal').modal('show');
		});
		$('.js-hotel-next').click(function(){
			$('#js-hotelModal').modal('hide');
		});

		// 日期选择
		var formatDate = function(ymd) { //日期格式化
			return ymd.replace(/(\d{4})\-(\d{1,2})\-(\d{1,2})/g, function(ymdFormatDate, y, m, d){
				m < 10 && (m = '0' + m);
				d < 10 && (d = '0' + d);
				return y + '-' + m + '-' + d;
			});
		};
		var today  = new Date();
		var startTimeStr = new Date(today.getTime()+86400000*1); 
		var startTime = formatDate(startTimeStr.getFullYear()+'-'+(startTimeStr.getMonth()+1)+'-'+startTimeStr.getDate());  
		var endTimeStr = new Date(today.getTime()+86400000*3); 
		var endTime = formatDate(endTimeStr.getFullYear()+'-'+(endTimeStr.getMonth()+1)+'-'+(endTimeStr.getDate()));
		var minTime = parseInt((today.getTime()-86400000*1)/1000); 
		
		var dateRange1 = new pickerDateRange('select-date', {
			isTodayValid : true,
			startDate : startTime,
			endDate : endTime,
			minValidDate: minTime,
			// maxValidDate:
			stopToday : false, //和maxValidDate配合使用
			isTodayValid:true,//判断今天是否可选
			maxValidDate: 'maxTime',
			needCompare : false,
			defaultText : ' - ',
			autoSubmit : true,
			inputTrigger : 'input_trigger1',
			theme : 'ta',
			success : function(obj) {
				// console.log('开始时间 : ' + obj.startDate + '<br/>结束时间 : ' + obj.endDate);
			}
		});
	},

	/* 价钱选择 */
	moneySelect:function(){
		// 费用区间选择
		var rangeSlider = function(min,max){
			$('.range-slider').jRange({
				from: min,
				to: max,
				step: 50,
				showScale:false,
				format: '%s',
				width: 480,
				showLabels: true,
				isRange : true
			});
		}
		rangeSlider(0,1000);

		//其他金额， 注：金额选择放在jquery.range.js中
		$('.p-editor-money .max-money').change(function(){
			var optionVal = $('.p-editor-money .max-money  option:selected').val();  
			var $select = $('.slider-container,.p-editor-money .min-money,.p-editor-money .max-money');
			var $range = $('.range-slider');
			var $rangBtn = $('.s-range-btn');
			var $moneySymbol = $('.momey-symbol');

			$range.val('').click();

			// 只能输入数字
			$range.keyup(function(event) {
				$(this).val($(this).val().replace(/[^\d]/ig,''));
			});

			if(optionVal=='0'){
				$range.show();
				$select.hide();
				$moneySymbol.hide();
				$rangBtn.show();
			}else{
				$range.hide();
				$select.show();
			}

			// 返回范围选择
			$rangBtn.click(function(){
				$(this).hide();
				$range.hide();
				$moneySymbol.show();
				$select.show();
			});
		});
	},

	/* 酒店选择 */
	hotelSelect:function(){

	},

	/* 其他事件 */
	otherEvent:function(){
		var scale=function (btn,bar,title){
			this.btn=document.getElementById(btn);
			this.bar=document.getElementById(bar);
			this.title=document.getElementById(title);
			this.step=this.bar.getElementsByTagName("DIV")[0];
			this.init();
		};
		scale.prototype={
			init:function (){
				var f=this,g=document,b=window,m=Math;
				f.btn.onmousedown=function (e){
					var x=(e||b.event).clientX;
					var l=this.offsetLeft;
					var max=f.bar.offsetWidth-this.offsetWidth;
					g.onmousemove=function (e){
						var thisX=(e||b.event).clientX;
						var to=m.min(max,m.max(-2,l+(thisX-x)));
						f.btn.style.left=to+'px';
						f.ondrag(m.round(m.max(0,to/max)*20),to);
						b.getSelection ? b.getSelection().removeAllRanges() : g.selection.empty();
					};
					g.onmouseup=new Function('this.onmousemove=null');
				};
			},
			ondrag:function (pos,x){
				this.step.style.width=Math.max(0,x+9)+'px';
				this.title.innerHTML='×'+pos;
			}
		}
		new scale('h-num-btn','h-num-bar','h-num-title');
	},
};

$(document).ready(function($) {
	LMTravelNeeds.init();
});
