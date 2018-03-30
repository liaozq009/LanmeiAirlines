
var loadMobile = false;
var loadPad = false;

var LanmeiAirlines = {
	init:function(){
		this.slider();
		this.closeLeftAside();
		this.couponEvent();
		this.lowestFares();
		this.login();
		this.traval();
		this.pcTraval();
		this.animation();
		this.addEvent();
		this.isPc();
		this.winResize();
		this.otherEvent();
		this.priceActive();
		this.christmas();
	},

	/* 判断是PC端还是移动端 */
	isPc:function(){
		// 判断手机端或者PC端
		function IsPC() {
			var userAgentInfo = navigator.userAgent;
			var Agents = ["Android", "iPhone","SymbianOS", "Windows Phone","iPad", "iPod"];
			var flag = true;
			for (var v = 0; v < Agents.length; v++) {
				if (userAgentInfo.indexOf(Agents[v]) > 0) {
					flag = false;
					break;
				}
			}
			return flag;
		}

		var flag = IsPC(); //true为PC端，false为手机端

		if(flag){
			this.pcEvent();
			
		}else{
			this.mobileEvent();
			this.padEvent();
		}
	},

	/* 解决延迟300ms问题 */
	fastClick:function(dom){
		FastClick.attach(dom[0]);
	},

	/* 轮播 */
	slider:function(){
		$('.LM-hiSlider').hiSlider({
			isFlexible: true,
			isShowTitle: false,
			isAuto: false,
			intervalTime: 3600,
			isSupportTouch: true,
			prevImg:'images/EN/Previous-icon.png',
			nextImg:'images/EN/NextArrow.png',
			titleAttr: function(curIdx){
				return $('img', this).attr('alt');
			}
		});
	},
	
	/* 左侧菜单栏 */
	closeLeftAside:function(){
		// 获取侧边栏一级菜单和二级菜单宽度
		var asideWidth = $('.listSelect').width();
		var asideHeight = $('.li-slide').height();
		var boxWidth = $('.listSelectBox').width()+asideWidth;
		
		var hideAside = function(){
			$('.listSelectBox').animate({left: -boxWidth}, 600);
		};
		var showAside = function showAside(){
			$('.listSelectBox').animate({left: asideWidth}, 600);
		};

		// 2S后弹出侧边栏
		setTimeout(function(){
			showAside();
			$('.leftAside .li-child1 a').addClass('active');

			// 调用日期
			$('#timeFrom').dateSelect({
				'timeFrom': 'timeFrom',
				'timeTo': 'timeTo',
			});
		},2000);

		// 滑动动画
		function animate(top){
			$('.li-slide').animate({top:top}, 300);
		}

		var changeSlide = function(){
			var $slide = $('.listSelect ul li a');
			var href;
			$slide.each(function(i,v){
				if($(v).hasClass('active')){
					href = $(this).attr('href');
				}
			})
			asideHeight = $('.li-slide').height(); //动态获取高度
			switch (href) {
				case "ticket-content":
				animate(0);
				break;
				case "hotel-content":
				animate(asideHeight);
				break;
				case "car-content":
				animate(asideHeight*2);
				break;
				case "flight-content":
				animate(asideHeight*3);
				break;
			}
		}

		var _tick = null;
		$(window).resize(function(){
			if (_tick) clearTimeout(_tick);
			_tick = setTimeout(function() {
				asideWidth = $('.listSelect').width();
				boxWidth = $('.listSelectBox').width()+asideWidth;
				$('.listSelectBox').animate({left: asideWidth}, 600); 
				changeSlide();	
			}, 1000);
		});

		// 关闭侧边栏
		$('.closeArrow').click(function(e){
			e.preventDefault();
			hideAside();
			$('.listSelect ul li a').removeClass('active');
			$('.li-slide').fadeOut(1000);
		});

		// 设置酒店入店和离店时间 2018-02-05 可以直接修改日期
		function getNowFormatDate() {
		    var date = new Date();
		    var seperator1 = "-";
		    var year = date.getFullYear();
		    var month = date.getMonth() + 1;
		    var strDate = date.getDate()+1;
		    var strDate_end = date.getDate()+2;
		    if (month >= 1 && month <= 9) {
		        month = "0" + month;
		    }
		    if (strDate >= 0 && strDate <= 9) {
		        strDate = "0" + strDate;
		    }
		    if (strDate_end >= 0 && strDate_end <= 9) {
		        strDate_end = "0" + strDate_end;
		    }
		    var currentdate = year + seperator1 + month + seperator1 + strDate;
		    var enddate = year + seperator1 + month + seperator1 + strDate_end;
		    $("#h-timeFrom").val(currentdate);
		    $("#h-timeTo").val(enddate);
		};

		// 显示侧边栏
		$('.listSelect ul li a').click(function(e){
			e.preventDefault();
			showAside();

			$(this).addClass('active').parent().siblings().children('a').removeClass('active');

			var href = $(this).attr('href');
			$('.'+href).show().siblings('.listSelectContent').hide();
			// 滑动左边框
			$('.li-slide').fadeIn(1000);
			switch (href) {
				case "ticket-content":
				animate(0);
				break;
				case "hotel-content":
				animate(asideHeight);
				break;
				case "car-content":
				animate(asideHeight*2);
				break;
				case "flight-content":
				animate(asideHeight*3);
				break;
			}
		}).one('click',function(){
			var href = $(this).attr('href');
			// 日期选择
			switch (href) {
				// case "ticket-content":
				// 	$('#timeFrom').dateSelect({
				// 		timeFrom: 'timeFrom',
				// 		timeTo: 'timeTo',
				// 	});
				// 	break;
				case "hotel-content":
				$('#h-timeFrom').dateSelect({
					timeFrom: 'h-timeFrom',
					timeTo: 'h-timeTo',
				});
				getNowFormatDate();//修改默认日期
				break;
				case "car-content":

				break;
				case "flight-content":
				$('#f-timeFrom').dateSelect({
					timeFrom: 'f-timeFrom',
					isSingleDay:true,
				});
				break;
				default:

				break;
			}
		});

		/* 单程或双程选择 */
		var selectWay = function(){
			$('.js-ticket-radio label').click(function(){
				$(this).children('i').addClass('active').parent().siblings('label').children('i').removeClass('active');
				var selectWay = $(this).children('span').attr('data-way');
				if(selectWay=='roundTrip'){
					$('.js-ticket-timeEnd').css('visibility','visible');
				}else if(selectWay=='oneWay'){
					$('.js-ticket-timeEnd').css('visibility','hidden');
				}else if(selectWay=='multi'){
					window.open("http://b2c.lanmeiairlines.com/lqWeb/reservation/mulCity.do?language=US");
				}
			});
		};
		selectWay();

		/* 航班查询选择 */
		var flightSelect = function(){
			$('.js-flight-radio label').click(function(){
				$(this).children('i').addClass('active').parent().siblings('label').children('i').removeClass('active');
				var selectWay = $(this).children('span').attr('data-way');
				var $selector = $('.js-route-select');

				// 记录b-route或f-num选中状态，用于传值
				$(this).children('input').attr('checked',true);

				if(selectWay=='b-route'){
					$selector.find('.localSelectStart,.localSelectEnd').show().siblings('.f-num-Select').hide();
					$selector.find('.timeSelectStart').removeClass('f-num-show');
				}else if(selectWay=='f-num'){
					$('.js-flight-num').show().siblings('.localSelectStart,.localSelectEnd').hide();
					$selector.find('.timeSelectStart').addClass('f-num-show');
				}
			});
		};
		flightSelect();

		/* 航班查询 */
		$('.js-ticket-search a').click(function(e){
			e.preventDefault();
			// 去掉空格
			var trim = function(str){
				return str.replace(/(^\s*)|(\s*$)/g, "");
			}

			// 截取出发地目的地
			var city = function(city){
				return trim(city.split('/')[1]);
			}
			// 出发地
			if($("#fromcity").val()!=''){
				var orgcity = city($("#fromcity").val());
				$('#orgcity').val(orgcity);
			}else{
				$('#orgcity').val('PNH');
			}
			
			// 目的地
			if($("#tocity").val()!=''){
				var dstcity = city($("#tocity").val());
				$('#dstcity').val(dstcity);
			}else{
				$('#dstcity').val('REP');
			}

			$("#airTicketForm").submit();
		});


		// 点击搜索按钮
		// $('.viewSchedules a,.p-search-btn,.m-ticket-search').click(function(e){
		// 	e.preventDefault();
		// 	layer.open({
		// 	  type: 1, //Page层类型
		// 	  area: ['auto', '300px'],
		// 	  title: false,
		// 	  shadeClose: true, //点击遮罩关闭
		// 	  shade: 0.6, //遮罩透明度
		// 	  maxmin: false, //允许全屏最小化
		// 	  anim: 1, //0-6的动画形式，-1不开启
		// 	  content: '<div style="text-align:center;padding:0 20px;padding-top:56px;"><img src="images/EN/construction.gif" style="width:200px;margin-bottom:20px;"/><p style="font-size:20px;">The website is under construction, please look forward to...</p></div>'
		// 	});    
		// });
	},

	/* 官网特价优惠券 */
	couponEvent:function(){
		Carousel.init($('.carousel'));
     //   	$('.poster-list .list-item').click(function(){
   		// 	layer.open({
   		// 	  type: 1, //Page层类型
   		// 	  area: ['auto', '114'],
   		// 	  title: false,
   		// 	  shadeClose: true, //点击遮罩关闭
   		// 	  shade: 0.6, //遮罩透明度
   		// 	  maxmin: false, //允许全屏最小化
   		// 	  anim: 1, //0-6的动画形式，-1不开启
   		// 	  btn: ['YES'],
   		// 	  btnAlign: 'c',
   		// 	  content: '<div style="text-align:center;padding:0 20px;padding-top:26px;"><p style="font-size:20px;">领取成功</p></div>',
   		// 	  yes: function(index, layero){
   		// 	  	layer.close(index); //如果设定了yes回调，需进行手工关闭
   		// 	  }
   		// 	});    
   		// });

   		// $('.c-swiper-container .swiper-slide').click(function(){
   		// 	layer.open({
   		// 	  type: 1, //Page层类型
   		// 	  area: ['auto', '114'],
   		// 	  title: false,
   		// 	  shadeClose: true, //点击遮罩关闭
   		// 	  shade: 0.6, //遮罩透明度
   		// 	  maxmin: false, //允许全屏最小化
   		// 	  anim: 1, //0-6的动画形式，-1不开启
   		// 	  btn: ['YES'],
   		// 	  btnAlign: 'c',
   		// 	  content: '<div style="text-align:center;padding:0 20px;padding-top:26px;"><p style="font-size:20px;">领取成功</p></div>',
   		// 	  yes: function(index, layero){
   		// 	  	layer.close(index); //如果设定了yes回调，需进行手工关闭
   		// 	  }
   		// 	});    
   		// });
   	},

   	/* 特价机票滚动 */
   	lowestFares:function(){
   		this.fastClick($('.next_arrow'));
   		this.fastClick($('.prev_arrow'));

		//计算有几个ul
		var page=1;
		var page_last=$('#tabslider1 .second_slider>ul').length;
		var $second_slider = $('#tabslider1 .second_slider');

		// 小容器宽
		var slideWidth = $('.slide_content').width();//一级菜单每个小容器的宽度

		// 大容器宽度
		$('#tabslider1 .second_slider').width(slideWidth*page_last);
		// ul的宽度
		$('#tabslider1 .second_slider>ul').width(slideWidth-20);

		// 小圆圈个数
		$('.circle_arrow').empty();
		for(var i = 0; i<page_last; i++){
			if(i==0){
				$('.circle_arrow').append('<span class="active"></span>');
			}else{
				$('.circle_arrow').append('<span></span>');
			}
		}
		// 左边箭头点击
		$('.next_arrow').click(function(){
			if(page==page_last){
				$second_slider.animate({marginLeft:'0px'},400);
				page=1;
			}else{
				$second_slider.animate({marginLeft:'-='+960}, 400);
				page++;
			}
			$('.circle_arrow span').eq(page-1).addClass('active').siblings('span').removeClass('active');
		});
		// 右边箭头点击
		$('.prev_arrow').click(function(){
			if(page==1){
				$second_slider.animate({marginLeft:'-='+960*(page_last-1)},400);
				page=page_last;
			}else{
				$second_slider.animate({marginLeft:'+='+960}, 400);
				page--;
			}
			$('.circle_arrow span').eq(page-1).addClass('active').siblings('span').removeClass('active');
		});
		//小圆圈点击的时候
		$('.circle_arrow span').click(function(){
			$(this).addClass('active').siblings('span').removeClass('active');
			$second_slider.animate({marginLeft:-slideWidth*($('.circle_arrow span').index(this))+'px'},'400');
			page=$('.circle_arrow span').index(this)+1;

		});
	},

	/* 登录 */
	login:function(){
		//邮箱自动补全
		$("#LanmeiUserName").changeTips({
			divTip:".on_changes"
		}); 
		$("#LanmeiUserName").changeTips({  //注册页面点击登录页面的邮箱自动补全
			divTip:".login_on_changes"
		}); 
		$("#f-LanmeiUserName").changeTips({  //忘记密码页面点击登录页面的邮箱自动补全
			divTip:".forget_on_changes"
		}); 

		/* 注册 */
		//注册邮箱自动补全
		$("#registerUserName").changeTips({ 
			divTip:".register_on_changes"
		}); 
	},

	/* 移动端旅行日记 */
	traval:function(){

		this.fastClick($('.m-travel-inner .transformBox'));

		// 获取容器的宽
		var windowW,containerW,elementW;
		var getWidth = function(){
			windowW = $(window).width();

			containerW = $('.lm-travel .m-travel-inner').width();
			elementW = parseInt(containerW/2);
			
			$('.lm-travel .m-travel-inner').height(containerW);
			$('.lm-travel .m-travel-inner .t-maskBox').css({'line-height':elementW+'px','height':elementW+'px'});
			$('.lm-travel .m-travel-inner>div').css('height',elementW+'px');
		};

		getWidth();

		var _time = null;
		$(window).resize(function(){
			if (_time) clearTimeout(_time);
			_time = setTimeout(function() {
				getWidth();	
			}, 1000);
		});

		var flag = true;//防止连续点击造成bug
		$('.m-travel-inner .transformBox').click(function(){
			var that = this;
			var active = function(){
				$(that).addClass('active').siblings('.transformBox').removeClass('active');
			}
			if(flag){
				flag = false;
				if(!$(that).hasClass('active')){
					var left = parseInt($(that).css('left'));
					var top = parseInt($(that).css('top'));
					var child1,child2,child3;
					// console.log(left,top);
					var transformBox = $('.m-travel-inner .transformBox');
					var length = transformBox.length;
					for(var i=0; i<length; i++){
						var leftSub = parseInt($(transformBox[i]).css('left'));
						var topSub = parseInt($(transformBox[i]).css('top'));
						// console.log(leftSub,topSub);

						if(leftSub<=80 && topSub<=80){
							child1 = transformBox[i];
						}
						if(leftSub<=80 && topSub>=100){
							child3 = transformBox[i];
						}
						if(leftSub>=100 && topSub>=100){
							child4 = transformBox[i];
						}
					}

					if(left<=80 && top>=100){
						active();
						$(that).animate({top: 0}, 600);
						
						$(child1).animate({top: elementW}, 600);

					}

					if(left<=80 && top<=80){
						active();
						$(that).animate({top: elementW}, 600);
						
						$(child3).animate({top: 0}, 600);
					}

					if(left>=100 && top<=80){
						active();
						$(that).animate({left: 0}, 600);
						
						$(child1).animate({top: elementW}, 600);
						$('.m-travel-inner .nth-child2').animate({top: 0}, 600);
						$(child3).animate({left: elementW}, 600);

					}

					if(left>=100 && top>=100){
						active();
						$(that).animate({left:0}, 600);

						$(child1).animate({left: elementW}, 600);
						$('.m-travel-inner .nth-child2').animate({top: elementW}, 600);
						$(child3).animate({top: 0}, 600);

						
					}

					// 修改右侧说明
					var $title = $('.m-travel-inner .lm-travel-deltail-title');
					var $con = $('.m-travel-inner .lm-travel-detail-con');
					var $localURL = $('.m-travel-inner .lm-travel-detail-local');
					var $local = $('.m-travel-inner .lm-travel-detail-local').children('span');
					var $seeName = $('.m-travel-inner .lm-travel-see-left').children('span');
					var $seeNum = $('.m-travel-inner .lm-travel-see-right').children('span');

					var data = $(this).children('.t-maskBox').attr('data');

					switch (data) {
						case 'mask-1':
						$title.html('Cambodia,Royal Palace');
						$con.html('The Royal Palace of Phnom Penh, also known as the four-arm bay palace, was named because of the river junction among the Up-Mekong River, the Tonle Sap River, the Down- Mekong River and the Bassac River. It was built by King Norodom in 1866-1870 to be the palace of the Kingdom of Cambodia.</ Br> The building of palaces has traditional Khmer architectural style with religious characters. All palaces have a minaret, which has the meaning of prosperity; the hall of palaces was painted by yellow and white, yellow represents Buddhism, white represents Brahmanism, the scale of palaces is more than twenty.');
						$local.html('Phnom Penh');
						$localURL.attr('href','https://goo.gl/maps/SfKrMapEBXN2');
						$seeName.html('Lanmei Airlines');
						$seeNum.html('1729');
						break;
						case 'mask-2':
						$title.html('Macau');
						$con.html('Macau is divided into Macau Peninsula, Taipa Island and Coloane Island. The historical and modern senses are represented by the West Bay Bridge, the Australian Taipa Bridge and the Friendship Bridge. The Macau Peninsula gathers many cultural spots such as the Ruins of St. Paul, the Fortress, the Rose Hall, etc. Stepping on the long ladders, you can look up at the tortuous silhouette of the Ruins of St. Paul in the sky; ascending the Fortress, you can overlook the beauty of Macau from different perspectives. Many Macau stories could be found in the narrow stone road, crumbling banyan tree, accessible mottled walls and baroque carved decoration. ');
						$local.html('Macau');
						$localURL.attr('javascript:void(0)');
						$seeName.html('Lanmei Airlines');
						$seeNum.html('935');
						break;
						case 'mask-3':
						$title.html('Siem Reap');
						$con.html("Siem Reap is the capital of Siem Reap province, Cambodia. Angkor Wat and Great Angkor are located in the northern suburb of Siem Reap. Star hotels clustered in both sides of Siem Reap River, which flows through Siem Reap city. Siem Reap has about 14 million people, most of who believe in Buddhism. The town is quiet and unobtrusive compared to the hustle and bustle of Phnom Penh. Angkor Wat is listed as one of the world's top 7 wonders and the world's cultural heritage, and travelers from all over the world go after it in a swarm. At the first sight of Beng Mealea, a temple which had not yet been fully excavated and renovated, you can completely understand how surprise and shock they were when the French found Angkor Wat. Angkor Wat, the capital of ancient Khmer kingdom, is collectively referred to Angkor monuments and is a complete city consisting of palaces, temples, gardens and castles.");
						$local.html('Siem Reap');
						$localURL.attr('href','javascript:void(0)');
						$seeName.html('Lanmei Airlines');
						$seeNum.html('1203');
						break;
					}

					// 改变flag的值
					var changeFlag = function(){
						flag = true;
					}
					setTimeout(changeFlag,600);
				}else{
					flag = true;
				}
			}

		});
	},

	/* PC端旅行日记 */
	pcTraval:function(){
		var flag = true;//防止连续点击造成bug
		var $nth2 = $('.pc-travel-inner .nth-child2'); //获取显示文字框

		$('.pc-travel-inner .transformBox').click(function(){
			var that = this;
			var active = function(){
				$(that).addClass('active').siblings('.transformBox').removeClass('active');
			}

			var animate = function(id,len){
				// console.log(len);
				id.animate({left: len}, 600);
			}

			if(flag){
				flag = false;
				if(!$(that).hasClass('active')){
					var left = parseInt($(that).css('left'));
					var nth2Left = parseInt($nth2.css('left')); //文字显示框的left
					var child1,child2,child3;
					// console.log(left);
					var transformBox = $('.pc-travel-inner .transformBox');
					var length = transformBox.length;
					for(var i=0; i<length; i++){
						var leftSub = parseInt($(transformBox[i]).css('left'));
						// console.log(leftSub);
						if(leftSub<=80){
							child1 = transformBox[i];
						}
						if(leftSub<=330 && leftSub>=130){
							child2 = transformBox[i];
						}
						if(leftSub<=570 && leftSub>=370){
							child3 = transformBox[i];
						}
						if(leftSub>=600){
							child4 = transformBox[i];
						}
					}

					if(left<=80){
						active();
						if(nth2Left<=570 && nth2Left>=370){ //在第三个位置
							animate($(child2),470);
							animate($nth2,235);
						}else{
							animate($(child2),470);
							animate($(child3),705);
							animate($nth2,235);
						}	
					}

					if(left<=330 && left>=130){
						active();
						animate($(child3),705);
						animate($nth2,470);
					}

					if(left<=570 && left>=370){
						active();
						animate($(that),235);
						animate($nth2,470);
					}

					if(left>=600){
						active();
						if(nth2Left<=330 && nth2Left>=130){ //在第二个位置
							animate($(child3),235);
							animate($(this),470);
							animate($nth2,705);
						}else{
							animate($(child4),470);
							animate($nth2,705);
						}	
					}

					// 修改右侧说明
					var $title = $('.pc-travel-inner .lm-travel-deltail-title');
					var $con = $('.pc-travel-inner .lm-travel-detail-con');
					var $localURL = $('.pc-travel-inner .lm-travel-detail-local');
					var $local = $('.pc-travel-inner .lm-travel-detail-local').children('span');
					var $seeName = $('.pc-travel-inner .lm-travel-see-left').children('span');
					var $seeNum = $('.pc-travel-inner .lm-travel-see-right').children('span');

					var data = $(this).children('.t-maskBox').attr('data');

					switch (data) {
						case 'mask-1':
						$title.html('Cambodia,Royal Palace');
						$con.html('The Royal Palace of Phnom Penh, also known as the four-arm bay palace, was named because of the river junction among the Up-Mekong River, the Tonle Sap River, the Down- Mekong River and the Bassac River. It was built by King Norodom in 1866-1870 to be the palace of the Kingdom of Cambodia.</ Br> The building of palaces has traditional Khmer architectural style with religious characters. All palaces have a minaret, which has the meaning of prosperity; the hall of palaces was painted by yellow and white, yellow represents Buddhism, white represents Brahmanism, the scale of palaces is more than twenty.');
						$local.html('Phnom Penh');
						$localURL.attr('href','https://goo.gl/maps/SfKrMapEBXN2');
						$seeName.html('Lanmei Airlines');
						$seeNum.html('1729');
						break;
						case 'mask-2':
						$title.html('Macau');
						$con.html('Macau is divided into Macau Peninsula, Taipa Island and Coloane Island. The historical and modern senses are represented by the West Bay Bridge, the Australian Taipa Bridge and the Friendship Bridge. The Macau Peninsula gathers many cultural spots such as the Ruins of St. Paul, the Fortress, the Rose Hall, etc. Stepping on the long ladders, you can look up at the tortuous silhouette of the Ruins of St. Paul in the sky; ascending the Fortress, you can overlook the beauty of Macau from different perspectives. Many Macau stories could be found in the narrow stone road, crumbling banyan tree, accessible mottled walls and baroque carved decoration. ');
						$local.html('Macau');
						$localURL.attr('javascript:void(0)');
						$seeName.html('Lanmei Airlines');
						$seeNum.html('935');
						break;
						case 'mask-3':
						$title.html('Siem Reap');
						$con.html("Siem Reap is the capital of Siem Reap province, Cambodia. Angkor Wat and Great Angkor are located in the northern suburb of Siem Reap. Star hotels clustered in both sides of Siem Reap River, which flows through Siem Reap city. Siem Reap has about 14 million people, most of who believe in Buddhism. The town is quiet and unobtrusive compared to the hustle and bustle of Phnom Penh. Angkor Wat is listed as one of the world's top 7 wonders and the world's cultural heritage, and travelers from all over the world go after it in a swarm. At the first sight of Beng Mealea, a temple which had not yet been fully excavated and renovated, you can completely understand how surprise and shock they were when the French found Angkor Wat. Angkor Wat, the capital of ancient Khmer kingdom, is collectively referred to Angkor monuments and is a complete city consisting of palaces, temples, gardens and castles.");
						$local.html('Siem Reap');
						$localURL.attr('href','javascript:void(0)');
						$seeName.html('Lanmei Airlines');
						$seeNum.html('1203');
						break;
					}

					// 改变flag的值
					var changeFlag = function(){
						flag = true;
					}
					setTimeout(changeFlag,600);
				}else{
					flag = true;
				}
			}

		});
	},

	/* 页面加载动画 */
	animation:function(){
		// 获取元素
		var $lowestTitle = $(".lowestFaresTitle");
		var $travelTitle = $(".lm-travel-title");
		var $dynamicTitle = $(".lanmeiDynamicTitle");
		var $serveTitle = $(".characteristicServeTitle");

		// 更多信息
		var $travelMore = $('.js-travel-more a');
		var $dynamiclMore = $('.js-dynamic-more a');

		// 显示或隐藏元素
		var showElement = function(e){
			e.css('visibility','visible');
		};
		var hideElement = function(e){
			e.css('visibility','hidden');
		};

		// 初始化隐藏元素
		hideElement($lowestTitle);
		hideElement($travelTitle);
		hideElement($dynamicTitle);
		hideElement($serveTitle);

		hideElement($travelMore);
		hideElement($dynamiclMore);

		hideElement($(".tabslider .slider-ul-1 li"));
		hideElement($(".prev_arrow"));
		hideElement($(".next_arrow"));

		hideElement($(".m-travel-inner>div"));
		hideElement($(".pc-travel-inner>div"));

		hideElement($(".lanmeiDynamicInfo>div"));

		hideElement($(".characteristicServeList>div"));

		// 定义公共函数
		var pageAnimation = function(){

			var windowH = $(window).height();  //窗口可见高度
			var scroH = $(window).scrollTop(); //窗口上方隐藏部分高度
			var offsetH = windowH + scroH;
			
			// 标题
			var lowestTitle = $lowestTitle.offset().top; //元素距离页面顶部距离，包括隐藏部分
			var travelTitle = $travelTitle.offset().top; 
			var dynamicTitle = $dynamicTitle.offset().top; 
			var serveTitle = $serveTitle.offset().top; 
			// console.log(offsetH,serveTitle); 
			// 标题动画
			if(offsetH>=lowestTitle){
				showElement($lowestTitle);
				$lowestTitle.addClass('lm-page-moveFromBottomFade');
			}
			if(offsetH>=travelTitle){
				showElement($travelTitle);
				$travelTitle.addClass('lm-page-moveFromBottomFade');
			}
			if(offsetH>=dynamicTitle){
				showElement($dynamicTitle);
				$dynamicTitle.addClass('lm-page-moveFromBottomFade');
			}
			if(offsetH>=serveTitle){
				showElement($serveTitle);
				$serveTitle.addClass('lm-page-moveFromBottomFade');
			}

			// 特价机票
			var tabslider = $(".tabslider").offset().top; 
			var prev_arrow = $(".prev_arrow").offset().top; 
			var next_arrow = $(".next_arrow").offset().top; 

			// 特价机票动画
			if(offsetH>=tabslider){
				showElement($(".tabslider .slider-ul-1 li.nth-child1"));
				$(".tabslider .slider-ul-1 li.nth-child1").addClass('lm-page-moveFromRightFade');
				$(".tabslider .slider-ul-1 li.nth-child2").delay(300).queue(function(){
					showElement($(".tabslider .slider-ul-1 li.nth-child2"));
					$(this).addClass('lm-page-moveFromRightFade');
				});
				$(".tabslider .slider-ul-1 li.nth-child3").delay(600).queue(function(){
					showElement($(".tabslider .slider-ul-1 li.nth-child3"));
					$(this).addClass('lm-page-moveFromRightFade');
				});
			}
			if(offsetH>=prev_arrow){
				showElement($(".prev_arrow"));
				$(".prev_arrow").addClass('lm-page-moveFromLeft');
			}
			if(offsetH>=next_arrow){
				showElement($(".next_arrow"));
				$(".next_arrow").addClass('lm-page-moveFromRight');
			}

			// 旅行日记
			var travelInner1 = $(".m-travel-inner .nth-child1").offset().top; 
			var travelInner2 = $(".m-travel-inner .nth-child3").offset().top; 
			var travelInner3 = $(".pc-travel-inner .nth-child1").offset().top; 
			var travelMoreH = $travelMore.offset().top; 

			// 旅行日记动画
			if(offsetH>=travelInner1){
				showElement($(".m-travel-inner>div:lt(2)"));
				$(".m-travel-inner>div:lt(2)").addClass('lm-page-scaleUp');
			}
			if(offsetH>=travelInner2){
				showElement($(".m-travel-inner>div:gt(1)"));
				$(".m-travel-inner>div:gt(1)").addClass('lm-page-scaleUp');
			}
			// PC端
			if(offsetH>=travelInner3){
				var $travel1 = $(".pc-travel-inner>div.nth-child1");
				var $travel2 = $(".pc-travel-inner>div.nth-child2");
				var $travel3 = $(".pc-travel-inner>div.nth-child3");
				var $travel4 = $(".pc-travel-inner>div.nth-child4");

				showElement($travel2);
				showElement($travel3);
				showElement($travel1);
				showElement($travel4);
				$travel1.addClass('lm-page-moveFromLeft2');
				$travel2.addClass('lm-page-moveFromLeft');
				$travel3.addClass('lm-page-moveFromRight');
				$travel4.addClass('lm-page-moveFromRight2');

				// $travel1.delay(300).queue(function(){
				// 	showElement($travel1);
				// 	$(this).addClass('lm-page-moveFromLeft');
				// });
				// $travel4.delay(300).queue(function(){
				// 	showElement($travel4);
				// 	$(this).addClass('lm-page-moveFromRight');
				// });

			}
			if(offsetH>=travelMoreH){
				showElement($travelMore);
				$travelMore.addClass('lm-page-moveFromLeft');
			}

			// 澜湄动态
			var dynamicInfo1 = $(".lanmeiDynamicInfo .nth-child1").offset().top; 
			var dynamicInfo2 = $(".lanmeiDynamicInfo .nth-child4").offset().top; 
			var dynamiclMoreH = $dynamiclMore.offset().top; 

			// 澜湄动态动画
			if(offsetH>=dynamicInfo1){
				showElement($(".lanmeiDynamicInfo>div:lt(3)"));
				$(".lanmeiDynamicInfo>div:lt(3)").addClass('lm-page-scaleUp');
				// setTimeout(function(){
				// 	$(".lanmeiDynamicInfo>div:lt(3)").removeClass('lm-page-scaleUp');
				// }, 100 );
			}
			if(offsetH>=dynamicInfo2){
				showElement($(".lanmeiDynamicInfo>div:gt(2)"));
				$(".lanmeiDynamicInfo>div:gt(2)").addClass('lm-page-scaleUp');
			}
			if(offsetH>=dynamiclMoreH){
				showElement($dynamiclMore);
				$dynamiclMore.addClass('lm-page-moveFromLeft');
			}

			// 澜湄服务
			var service1 = $(".characteristicServeList .nth-child1").offset().top; 
			var service2 = $(".characteristicServeList .nth-child2").offset().top; 
			var service3 = $(".characteristicServeList .nth-child3").offset().top; 
			var service4 = $(".characteristicServeList .nth-child4").offset().top; 

			// 澜湄服务动画
			if(offsetH>=service1){
				showElement($(".characteristicServeList li"));
				$(".characteristicServeList .nth-child1").addClass('lm-page-moveFromLeft');
				$(".characteristicServeList .nth-child2").addClass('lm-page-moveFromBottom');
				$(".characteristicServeList .nth-child3").addClass('lm-page-moveFromBottom');
				$(".characteristicServeList .nth-child4").addClass('lm-page-moveFromRight');
			}
			
		};
		pageAnimation();

		$(window).scroll(function(){
			if(!$('.js-dynamic-more').hasClass('lm-page-moveFromLeft')){
				pageAnimation();
			}
		});
	},

	/* PC端事件 */
	pcEvent:function(){
		// 定义滚动条
		var nice = $("html").niceScroll({
			cursorborderradius: 0,
			cursorwidth: "8px",
			cursorfixedheight: 150,
			cursorcolor: "#8ec060",
			zindex: 9999,
			cursorborder: 0,
			scrollspeed: 26,
			mousescrollstep: 36,
		});
	},

	/* 其他事件 */
	addEvent:function(){
		// 解决ios下input出现光标问题
		$('.m-flight-select input[readonly],.p-flight-select input[readonly]').on('focus', function() {
			$(this).trigger('blur');
		}); 

		// 图片懒加载
		$("img.lazy").lazyload({effect: "fadeIn"});

		this.fastClick($('.languageBox'));
		this.fastClick($('.languageBox>ul'));

		/* 语言切换 */
		$('.languageBox').click(function(e) {
			e.stopPropagation();
			$('.languageDownMenu').show();
			$('.ENbottomLine').show();
			$('.languageSelect').addClass('active');
		});
		$('html').click(function(){
			$('.languageSelect').removeClass('active');
			$('.languageBox>ul').hide();
			$('.ENbottomLine').hide();
		});

		/* 文字滚动 */
		$(".line").slideUp();
	},

	/* 移动端事件 */
	mobileEvent:function(){

		loadMobile = true;

		// 解决延迟300ms问题
		this.fastClick($('.mobile-menu'));
		this.fastClick($('.m-nav-menu-close'));
		this.fastClick($('.m-nav-mask'));

		this.fastClick($('.m-title-com'));
		this.fastClick($('.m-ticket-tab a'));
		this.fastClick($('.ticket-cabin-select'));
		this.fastClick($('.m-localChange'));
		this.fastClick($('.ticket-adult-select'));
		this.fastClick($('.ticket-child-select'));
		this.fastClick($('.m-ticket-reset'));

		/* 开关侧边栏菜单 */
		$('.mobile-menu').click(function(event) {
			$('.m-nav-mask').fadeIn(300);
			$('.m-nav-menu').show().animate({left: 0}, 300);
			$('html,body').addClass('ovfHiden'); //使网页不可滚动
		});
		// 点击遮罩
		$('.m-nav-mask').click(function(event) {
			$('.m-nav-mask').fadeOut(300);
			$('.m-nav-wrap').animate({marginLeft:'0'}, 400);
			$('.m-nav-title').text('MENU');
			$('.m-nav-menu').animate({left: '-100%'}, 300);
			$('html,body').removeClass('ovfHiden'); //使网页恢复可滚
		}); 
		// 点击返回箭头
		$('.m-nav-menu-close i').click(function(e){
			var attr = $('.m-nav-title').attr('data-title');
			switch (attr) {
				case 's-nav-title':
				$('.m-nav-wrap').animate({marginLeft:'0'}, 400);
				$('.m-nav-title').attr('data-title','f-nav-title');
				$('.m-nav-title').text('MENU');
				break;
				case 't-nav-title':
				$('.m-nav-wrap').animate({marginLeft:'-100%'}, 400);
				$('.m-nav-title').attr('data-title','s-nav-title');

				var ul = $('.m-nav-2 ul');
				ul.each(function(i,v){
					if($(v).css('display')=='block'){
						var id = $(v).attr('id');
						var text = $('[href="#'+id+'"]').text();
						$('.m-nav-title').text(text);
					}
				});
				break;
				case 'f-nav-title':
				$('.m-nav-menu').animate({left: '-100%'}, 300);
				$('.m-nav-mask').fadeOut(300);
					$('html,body').removeClass('ovfHiden'); //使网页恢复可滚
					break;
				}
			});
		// 点击一级菜单
		$('.m-nav-1 a').click(function(e){
			// 如果没有链接，则阻止跳转
			!$(this).attr('data-href') && e.preventDefault();
			
			$('.m-nav-wrap').animate({marginLeft:'-100%'}, 400);
			$('.m-nav-title').text($(this).text()).attr('data-title','s-nav-title');

			var id = $(this).attr('href');
			$('.m-nav-2 ul,.m-nav-3 ul').hide();
			$(id).show();
		});
		// 点击二级菜单
		$('.m-nav-2 a').click(function(e){
			// 如果没有链接，则阻止跳转
			!$(this).attr('data-href') && e.preventDefault();

			$('.m-nav-wrap').animate({marginLeft:'-200%'}, 400);
			$('.m-nav-title').text($(this).text()).attr('data-title','t-nav-title');

			var id = $(this).attr('href');
			$('.m-nav-3 ul').hide();
			$(id).show();
		});

		/* 移动端领取优惠券和特价机票滚动 */
		var sliderWrap = function(s,p){
			new Swiper(s,{
				pagination: p,
				paginationClickable: true,
				initialSlide :1,
				centeredSlides: true,
				slidesPerView: 3,
				watchActiveIndex: true
			});

			// 机票滚动动态获取left的值
			var getLeft = function(){
				var screenWidth = $(window).width();
				var left = (screenWidth - 320)/2-300;
				$(s).css('left',left);
			};
			getLeft();

			var _m_tick = null;
			$(window).resize(function(){
				if (_m_tick) clearTimeout(_m_tick);
				_m_tick = setTimeout(function() {
					getLeft();
				}, 1000);
			});
		}

		sliderWrap('.d-swiper-container','.d-pagination');
		sliderWrap('.c-swiper-container','.c-pagination');
		
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
		var endTimeStr = new Date(today.getTime()+86400000*2); 
		var endTime = formatDate(endTimeStr.getFullYear()+'-'+(endTimeStr.getMonth()+1)+'-'+(endTimeStr.getDate()));
		var maxTime = formatDate(today.getFullYear()+'-'+(today.getMonth()+13)+'-'+(today.getDate()+2)); 
		
		var dataRange = function(id,num,doubleDate,isTodayValid){
			new pickerDateRange(id, {
				canID:'data'+num,
				startDate: startTime,
				endDate: endTime,
				maxTime: maxTime,
				isTodayValid:isTodayValid,//判断今天是否可选
				defaultText : ' ~ ',
				autoSubmit : false,
				stopToday : true,
				theme : 'ta',
				calendars : 14, // 展示的月份数
				isSingleDay : true,
				shortOpr : true,
				nextShow:false,
				prevShow:false,
				device:'mobile',
				mTab:'.m-ticket-tab>a',
				doubleDate:doubleDate,
			});
		};

		// 舱位选择和乘客人数选择--动态加载
		var mTickt = function(){
			// 移动端舱位选择
			var mobileSelect1 = new MobileSelect({
				trigger: '.ticket-cabin-select', 
				title: 'Cabin', 
				wheels: [
				{data: ["ECONOMY"]}
				],
			    position:[0], //初始化定位 打开时默认选中的哪个  如果不填默认为0
			    callback:function(indexArr, data){
			    	$('.ticket-cabin-select').val(data[0]);
			    },
			});

			$('.m-ticket-cabin').one('click',function(){
				$('.selectLine p').hide(); //隐藏tip文字提示
			});

			// 移动端机票人数选择
			var mobileSelect2 = new MobileSelect({
				trigger: '.m-ticket-box',
				title: 'Passenger',
				tip1:'Adult', 
				tip2:'Child', 
				wheels: [
				{data:[
					{
						id:'1',
						value:'1',
						childs:[
						{id:'0',value:'0'},
						{id:'1',value:'1'},
						{id:'2',value:'2'},
						{id:'3',value:'3'},
						{id:'4',value:'4'},
						]
					},
					{
						id:'2',
						value:'2',
						childs:[
						{id:'0',value:'0'},
						{id:'1',value:'1'},
						{id:'2',value:'2'},
						{id:'3',value:'3'},
						]
					},
					{
						id:'3',
						value:'3',
						childs:[
						{id:'0',value:'0'},
						{id:'1',value:'1'},
						{id:'2',value:'2'},
						]
					},
					{
						id:'4',
						value:'4',
						childs:[
						{id:'0',value:'0'},
						{id:'1',value:'1'},
						]
					},
					{
						id:'5',
						value:'5',
						childs:[
						{id:'0',value:'0'},
						]
					}
					]}
					],  
					transitionEnd:function(indexArr, data){
			        // console.log(data);
			    },
			    callback:function(indexArr, data){
			        // console.log(data);
			        var adult = data[0].value;
			        var child = data[1].value;

			        $('.ticket-adult-select').val(adult);
			        $('.ticket-child-select').val(child);
			    },
			    position:[0,0]
			});
			$('.m-ticket-box').click(function(){
				$('.selectLine p').show(); //显示成人、儿童文字
			});
		};

		var mFlight = function(){
			// 移动端机型选择
			var mobileSelect4 = new MobileSelect({
				trigger: '.js-flight-select', 
				title: 'Flight Number', 
				wheels: [
				{data: ["LQ-806","LQ-807","LQ-502","LQ-503"]}
				],
			    position:[0], //初始化定位 打开时默认选中的哪个  如果不填默认为0
			    callback:function(indexArr, data){
			    	$('.js-flight-select').val(data[0]);
			    },
			});
		};

		var mHotel = function(){
			// room选择
			new MobileSelect({
				trigger: '.js-rooms-input', 
				title: 'Rooms', 
				wheels: [
				{data: ["1 Room,2 Adults","1","2","3"]}
				],
			    position:[0], //初始化定位 打开时默认选中的哪个  如果不填默认为0
			    callback:function(indexArr, data){
			    	$('.js-rooms-input').val(data[0]);
			    	switch (data[0]) {
			    		case '1 Room,2 Adults':
				    		$('.m-rooms-wrap').hide();
				    		$('.m-rooms-title').hide();
				    		break;
			    		case '1':
				    		$('.m-rooms-1').show();
				    		$('.m-rooms-2').hide();
				    		$('.m-rooms-3').hide();
				    		$('.m-rooms-title').show();
				    		break;
			    		case '2':
				    		$('.m-rooms-1').show();
				    		$('.m-rooms-2').show();
				    		$('.m-rooms-3').hide();
				    		$('.m-rooms-title').show();
				    		break;
			    		case '3':
				    		$('.m-rooms-wrap').show();
				    		$('.m-rooms-title').show();
				    		break;
			    	}
			    },
			});

			// 成人选择
			var roomsAdult = function(adult){
				new MobileSelect({
					trigger: adult, 
					title: 'Adult', 
					wheels: [
					{data: ["1","2","3"]}
					],
				    position:[0], //初始化定位 打开时默认选中的哪个  如果不填默认为0
				    callback:function(indexArr, data){
				    	$( adult).val(data[0]);
				    },
				});
			}

			roomsAdult('.rooms1-adult');
			roomsAdult('.rooms2-adult');
			roomsAdult('.rooms3-adult');

			// 儿童选择
			var roomsChild = function(child,roomCom,r1,r2,r3){
				new MobileSelect({
					trigger: child, 
					title: 'Child', 
					wheels: [
					{data: ["0","1","2","3"]}
					],
				    position:[0], //初始化定位 打开时默认选中的哪个  如果不填默认为0
				    callback:function(indexArr, data){
				    	$(child).val(data[0]);
		    	    	switch (data[0]) {
		    	    		case '0':
		    		    		$(roomCom).hide();
		    		    		break;
		    	    		case '1':
		    	    			$(roomCom).hide();
		    		    		$(r1).show();
		    		    		break;
		    	    		case '2':
		    		    		$(r1).show();
		    		    		$(r2).show();
		    		    		$(r3).hide();
		    		    		break;
		    	    		case '3':
		    		    		$(roomCom).show();
		    		    		break;
		    	    	}
				    },
				});
			}

			roomsChild('.rooms1-child','.rooms1-age-com','.rooms1-age1','.rooms1-age2','.rooms1-age3');
			roomsChild('.rooms2-child','.rooms2-age-com','.rooms2-age1','.rooms2-age2','.rooms2-age3');
			roomsChild('.rooms3-child','.rooms3-age-com','.rooms3-age1','.rooms3-age2','.rooms3-age3');

			// 小孩年龄选择
			var roomsAge = function(age){
				new MobileSelect({
					trigger: age, 
					title: 'Age', 
					wheels: [
					{data: ["Age < 1 year old","2","3","4","5","6","7","8","9","10","11","12"]}
					],
				    position:[0], //初始化定位 打开时默认选中的哪个  如果不填默认为0
				    callback:function(indexArr, data){
				    	$(age).val(data[0]);
				    },
				});
			}
			roomsAge('.rooms1-age1');
			roomsAge('.rooms1-age2');
			roomsAge('.rooms1-age3');
			roomsAge('.rooms2-age1');
			roomsAge('.rooms2-age2');
			roomsAge('.rooms2-age3');
			roomsAge('.rooms3-age1');
			roomsAge('.rooms3-age2');
			roomsAge('.rooms3-age3');
		};

		// 航班，酒店等相互切换
		$('.m-title-com').click(function(e){
			e.stopPropagation();
			$(this).parent().toggleClass('active').children('.m-menu-com').slideToggle(200).siblings('.m-title-com').find('.m-ticket-left img').toggle();
			$(this).find('.m-ticket-right img').toggle();

			$(this).parent().siblings('div').removeClass('active').children('.m-menu-com').hide(200).siblings('.m-title-com').find('.img01').show().siblings('.img02').hide();
		}).one('click',function(){
			var data = $(this).attr('data');

			switch (data) {
				case "ticket":
				dataRange('m-ticket-selectTime','1',false,true);
				mTickt();
				break;
				case "hotel":
				dataRange('m-hotel-selectTime','2',true,false);
				mHotel();
				break;
				case "car":
				break;
				case "flight":
				dataRange('m-flight-selectTime','3',false,true);
				mFlight();
				break;
				default:
					// statements_def
					break;
				}
			});

		// 单程和双程切换
		$('.m-ticket-tab a').click(function(e){
			e.stopPropagation();e.preventDefault();
			$(this).addClass('active').siblings('a').removeClass('active');
			var dataWay = $(this).attr('data-way');
			if(dataWay=="roundTrip"){

			}else if(dataWay=="oneWay"){

			}else if(dataWay=="multi"){
				window.open("http://b2c.lanmeiairlines.com/lqWeb/reservation/mulCity.do?language=US");
			}
		});

		// By route 和 flight num切换
		$('.m-flight-tab a').click(function(e){
			e.stopPropagation();e.preventDefault();
			$(this).addClass('active').siblings('a').removeClass('active');

			var data = $(this).attr('data-way');

			switch (data) {
				case "b-route":
				$('.js-f-local').show().siblings('.js-f-num').hide();
				break;
				case "f-num":
				$('.js-f-num').show().siblings('.js-f-local').hide();
				break;
			}
		});

		// 移动端城市选择
		$(".m-local-start").CityPicker({cityId:'startCity',FCity:'From'});
		$(".m-local-end").CityPicker({cityId:'endCity',TCity:'To'});
		$(".h-local-start").CityPicker({cityId:'h-startCity',FCity:'From'});
		$(".f-local-start").CityPicker({cityId:'f-startCity',FCity:'From'});
		$(".f-local-end").CityPicker({cityId:'f-endCity',TCity:'To'});

		// 起始点切换
		$('.m-localChange').click(function(e){
			e.stopPropagation();
			var $start = $(this).siblings('.m-ticket-local-start').find('input');
			var $end = $(this).siblings('.m-ticket-local-end').find('input');
			
			var fromcity = $start.val();
			var tocity = $end.val();

			$start.val(tocity);
			$end.val(fromcity);
		});

		// 重置输入框内容
		var resetFun = function(){
			// 订票重置
			$('.js-ticket-reset').click(function(){
				$('.m-local-start').val('Phnom Penh/PNH/Cambodia');
				$('.m-local-end').val('');
				$('#m-ticket-selectTime').val(startTime);
				$('.ticket-cabin-select').val('ECONOMY');
				$('.ticket-adult-select').val('1');
				$('.ticket-child-select').val('0');

				$('.m-ticket-tab a').removeClass('active');
				$('.m-ticket-tab a:first').addClass('active');
			});

			//酒店重置
			$('.js-hotel-reset').click(function(){
				$('.h-local-start').val('Phnom Penh/PNH/Cambodia');
				// $('#m-hotel-selectTime').val(timeResult(today));
			});

			//航班动态重置
			$('.js-flight-reset').click(function(){
				$('.f-local-start').val('Phnom Penh/PNH/Cambodia');
				$('.f-local-end').val('');
				$('.js-flight-select').val('XU-738');
				$('#m-flight-selectTime').val(timeResult(today));
			});
		};
		resetFun();


		/* 表单提交 */
		$('.js-mTicket-search').click(function(){
			// 去掉空格
			var trim = function(str){
				return str.replace(/(^\s*)|(\s*$)/g, "");
			}

			// 截取出发地目的地
			var city = function(city){
				return trim(city.split('/')[1]);
			}
			// 出发地
			var orgcity = city($(".m-local-start").val());
			$('#m-orgcity').val(orgcity);
			// 目的地
			var dstcity = city($(".m-local-end").val());
			$('#m-dstcity').val(dstcity);

			// 时间
			var time = $('#m-ticket-selectTime').val();
			
			// 判断单双程
			var tabA = $('.m-ticket-tab a');
			tabA.each(function(index,val) {
				if($(val).hasClass('active')){
					var data = $(val).attr('data-way');
					switch (data) {
						case 'oneWay':
						$('#m-takeoffDate').val(trim(time));
						$('#m-tripType').val('OW');
						break;
						case 'roundTrip':
						var arr = time.split('~');
							//删除左右两端的空格
							var s = trim(arr[0]);
							var e = trim(arr[1]);
							
							$('#m-takeoffDate').val(s);
							$('#m-returnDate').val(e);
							$('#m-tripType').val('RT');
							break;
							default:
							// statements_def
							break;
						}
					}
				});
			
			$("#m-airTicketForm").submit();
		});
	},

	/* pad端事件 */
	padEvent:function(){

		loadPad = true;

		this.fastClick($('.p-radioSelect label'));
		this.fastClick($('.p-changeLocal'));
		this.fastClick($('.p-cabin-input'));
		this.fastClick($('.p-adult-input'));
		this.fastClick($('.p-child-input'));
		this.fastClick($('.p-reset'));

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
		 var endTimeStr = new Date(today.getTime()+86400000*2); 
		 var endTime = formatDate(endTimeStr.getFullYear()+'-'+(endTimeStr.getMonth()+1)+'-'+(endTimeStr.getDate()));
		 var maxTime = formatDate(today.getFullYear()+'-'+(today.getMonth()+13)+'-'+(today.getDate()+2)); 
		 
		 var dataRange = function(id,num,doubleDate,isTodayValid){
		 	new pickerDateRange(id, {
		 		canID:'data'+num,
		 		startDate: startTime,
		 		endDate: endTime,
		 		maxTime: maxTime,
		 		defaultText : ' ~ ',
			 	isTodayValid:isTodayValid,//判断今天是否可选
			 	autoSubmit : false,
			 	stopToday : true,
			 	theme : 'ta',
			 	calendars : 14, // 展示的月份数
			 	isSingleDay : true,
			 	shortOpr : true,
			 	nextShow:false,
			 	prevShow:false,
			 	device:'pad',
			 	pTab:'.p-ticket-wrap .p-radioSelect>label',
			 	doubleDate:doubleDate,
			 });
		 };
		 dataRange('p-ticket-selectTime','5',false,true);

		// 舱位选择和乘客人数选择--动态加载
		var pTicket = function(){
			// PC端舱位选择
			var mobileSelect1 = new MobileSelect({
				trigger: '.js-ticket-cabin', 
				title: 'Cabin', 
				wheels: [
				{data: ["ECONOMY"]}
				],
			    position:[0], //初始化定位 打开时默认选中的哪个  如果不填默认为0
			    callback:function(indexArr, data){
			    	$('.js-ticket-cabin').val(data[0]);
			    },
			});

			$('.p-cabin').click(function(){
				$('.selectLine p').hide(); //隐藏tip文字提示
			});

			// PC端机票人数选择
			var mobileSelect2 = new MobileSelect({
				trigger: '.p-ticket-box',
				title: 'Passenger',
				tip1:'Adult', 
				tip2:'Child', 
				wheels: [
				{data:[
					{
						id:'1',
						value:'1',
						childs:[
						{id:'0',value:'0'},
						{id:'1',value:'1'},
						{id:'2',value:'2'},
						{id:'3',value:'3'},
						{id:'4',value:'4'},
						]
					},
					{
						id:'2',
						value:'2',
						childs:[
						{id:'0',value:'0'},
						{id:'1',value:'1'},
						{id:'2',value:'2'},
						{id:'3',value:'3'},
						]
					},
					{
						id:'3',
						value:'3',
						childs:[
						{id:'0',value:'0'},
						{id:'1',value:'1'},
						{id:'2',value:'2'},
						]
					},
					{
						id:'4',
						value:'4',
						childs:[
						{id:'0',value:'0'},
						{id:'1',value:'1'},
						]
					},
					]}
					],  
					transitionEnd:function(indexArr, data){
			        // console.log(data);
			    },
			    callback:function(indexArr, data){
			        // console.log(data);
			        var adult = data[0].value;
			        var child = data[1].value;

			        $('.p-adult-input').val(adult);
			        $('.p-child-input').val(child);
			    },
			    position:[0,0]
			});
			$('.p-ticket-box').click(function(){
				$('.selectLine p').show(); //显示成人、儿童文字
			});
		};
		pTicket();

		var pHotel = function(){
			// room选择
			new MobileSelect({
				trigger: '.js-Prooms-input', 
				title: 'Rooms', 
				wheels: [
				{data: ["1 Room,2 Adults","1","2","3"]}
				],
			    position:[0], //初始化定位 打开时默认选中的哪个  如果不填默认为0
			    callback:function(indexArr, data){
			    	$('.js-Prooms-input').val(data[0]);
			    	switch (data[0]) {
			    		case '1 Room,2 Adults':
				    		$('.p-rooms-wrap').hide();
				    		$('.p-rooms-title').hide();
				    		break;
			    		case '1':
				    		$('.p-rooms-1').show();
				    		$('.p-rooms-2').hide();
				    		$('.p-rooms-3').hide();
				    		$('.p-rooms-title').show();
				    		break;
			    		case '2':
				    		$('.p-rooms-1').show();
				    		$('.p-rooms-2').show();
				    		$('.p-rooms-3').hide();
				    		$('.p-rooms-title').show();
				    		break;
			    		case '3':
				    		$('.p-rooms-wrap').show();
				    		$('.p-rooms-title').show();
				    		break;
			    	}
			    },
			});

			// 成人选择
			var roomsAdult = function(adult){
				new MobileSelect({
					trigger: adult, 
					title: 'Adult', 
					wheels: [
					{data: ["1","2","3"]}
					],
				    position:[0], //初始化定位 打开时默认选中的哪个  如果不填默认为0
				    callback:function(indexArr, data){
				    	$( adult).val(data[0]);
				    },
				});
			}

			roomsAdult('.Prooms1-adult');
			roomsAdult('.Prooms2-adult');
			roomsAdult('.Prooms3-adult');

			// 儿童选择
			var roomsChild = function(child,roomCom,r1,r2,r3){
				new MobileSelect({
					trigger: child, 
					title: 'Child', 
					wheels: [
					{data: ["0","1","2","3"]}
					],
				    position:[0], //初始化定位 打开时默认选中的哪个  如果不填默认为0
				    callback:function(indexArr, data){
				    	$(child).val(data[0]);
		    	    	switch (data[0]) {
		    	    		case '0':
		    		    		$(roomCom).hide();
		    		    		break;
		    	    		case '1':
		    	    			$(roomCom).hide();
		    		    		$(r1).show();
		    		    		break;
		    	    		case '2':
		    		    		$(r1).show();
		    		    		$(r2).show();
		    		    		$(r3).hide();
		    		    		break;
		    	    		case '3':
		    		    		$(roomCom).show();
		    		    		break;
		    	    	}
				    },
				});
			}

			roomsChild('.Prooms1-child','.Prooms1-age-com','.Prooms1-age1','.Prooms1-age2','.Prooms1-age3');
			roomsChild('.Prooms2-child','.Prooms2-age-com','.Prooms2-age1','.Prooms2-age2','.Prooms2-age3');
			roomsChild('.Prooms3-child','.Prooms3-age-com','.Prooms3-age1','.Prooms3-age2','.Prooms3-age3');

			// 小孩年龄选择
			var roomsAge = function(age){
				new MobileSelect({
					trigger: age, 
					title: 'Age', 
					wheels: [
					{data: ["Age < 1 year old","2","3","4","5","6","7","8","9","10","11","12"]}
					],
				    position:[0], //初始化定位 打开时默认选中的哪个  如果不填默认为0
				    callback:function(indexArr, data){
				    	$(age).val(data[0]);
				    },
				});
			}
			roomsAge('.Prooms1-age1');
			roomsAge('.Prooms1-age2');
			roomsAge('.Prooms1-age3');
			roomsAge('.Prooms2-age1');
			roomsAge('.Prooms2-age2');
			roomsAge('.Prooms2-age3');
			roomsAge('.Prooms3-age1');
			roomsAge('.Prooms3-age2');
			roomsAge('.Prooms3-age3');
		};

		var pFlight = function(){
			// PC端机型选择
			var mobileSelect4 = new MobileSelect({
				trigger: '.js-pFlight-select', 
				title: 'Flight Number', 
				wheels: [
				{data: ["XU-738","XU-739"]}
				],
			    position:[0], //初始化定位 打开时默认选中的哪个  如果不填默认为0
			    callback:function(indexArr, data){
			    	$('.js-pFlight-select').val(data[0]);
			    },
			});
		};

		// 机票菜单切换
		$('.p-flight-title a').click(function(e){
			e.preventDefault();
			$(this).addClass('active').siblings('a').removeClass('active');

			var href = $(this).attr('href');
			$('.'+href).show().siblings('.p-com-memu').hide();
		}).one('click',function(){
			var href = $(this).attr('href');
			switch (href) {
				case "p-hotel-wrap":
				dataRange('p-hotel-selectTime','6',true,false);
				pHotel();
				break;
				case "p-flight-wrap":
				dataRange('p-flight-selectTime','7',false,true);
				pFlight();
				break;
			}
		});

		// 单程 往返切换
		$('.p-radioSelect label').click(function(){
			$(this).children('i').addClass('active');
			$(this).siblings('label').children('i').removeClass('active');

			var dataWay = $(this).children('span').attr('data-way');

			switch (dataWay) {
				case "b-route":
				$('.p-localSelect').show().siblings('.p-flightSelect').hide();
				break;
				case "f-num":
				$('.p-localSelect').hide().siblings('.p-flightSelect').show();
				break;
				case "multi":
				window.open("http://b2c.lanmeiairlines.com/lqWeb/reservation/mulCity.do?language=US");
				break;
			}
		});

		// PC端城市选择
		$(".p-local-start").CityPicker({cityId:'startCity',FCity:'From'});
		$(".p-local-end").CityPicker({cityId:'endCity',TCity:'To'});

		// 起始点切换
		$('.p-changeLocal').click(function(e){
			e.stopPropagation();
			var fromcity = $('.p-local-start').val();
			var tocity = $('.p-local-end').val();
			$('.p-local-start').val(tocity);
			$('.p-local-end').val(fromcity);
		});

		var resetFun = function(){
		   	// 订票重置
		   	$('.js-pTicket-reset').click(function(){
		   		var $parent = $(this).parents('.p-ticket-wrap');

		   		$parent.find('.p-local-start').val('Phnom Penh/PNH/Cambodia');
		   		$parent.find('.p-local-end').val('');
		   		$parent.find('.p-cabin-input').val('ECONOMY');
		   		$parent.find('.p-adult-input').val('1');
		   		$parent.find('.p-child-input').val('0');

		   		$parent.find('#p-ticket-selectTime').val(startTime);
		   		$parent.find('.p-radioSelect label i').removeClass('active');
		   		$parent.find('.p-radioSelect label:first i').addClass('active');
		   	});

		   	//酒店重置
		   	$('.js-pHotel-reset').click(function(){
		   		var $parent = $(this).parents('.p-hotel-wrap');

		   		$parent.find('.p-local-start').val('Phnom Penh/PNH/Cambodia');
		   		// $('#m-hotel-selectTime').val(timeResult(today));
		   	});

		   	//航班动态重置
		   	$('.js-pFlight-reset').click(function(){
		   		var $parent = $(this).parents('.p-flight-wrap');

		   		$parent.find('.p-local-start').val('Phnom Penh/PNH/Cambodia');
		   		$parent.find('.p-local-end').val('');
		   		$parent.find('.js-pFlight-select').val('XU-738');
		   		$parent.find('#p-flight-selectTime').val(timeResult(today));
		   	});
		   };
		   resetFun();

		   /* 表单提交 */
		   $('.js-pTicket-search').click(function(){
			// 去掉空格
			var trim = function(str){
				return str.replace(/(^\s*)|(\s*$)/g, "");
			}

			// 截取出发地目的地
			var city = function(city){
				return trim(city.split('/')[1]);
			}
			// 出发地
			var orgcity = city($(".p-local-start").val());
			$('#p-orgcity').val(orgcity);
			// 目的地
			var dstcity = city($(".p-local-end").val());
			$('#p-dstcity').val(dstcity);

			// 时间
			var time = $('#p-ticket-selectTime').val();
			
			// 判断单双程
			var tabA = $('.p-radioSelect label i');
			tabA.each(function(index,val) {
				if($(val).hasClass('active')){
					var data = $(val).next().attr('data-way');
					switch (data) {
						case 'oneWay':
						$('#p-takeoffDate').val(trim(time));
						$('#p-tripType').val('OW');
						break;
						case 'roundTrip':
						var arr = time.split('~');
							//删除左右两端的空格
							var s = trim(arr[0]);
							var e = trim(arr[1]);
							
							$('#p-takeoffDate').val(s);
							$('#p-returnDate').val(e);
							$('#p-tripType').val('RT');
							break;
							default:
							// statements_def
							break;
						}
					}
				});
			
			$("#p-airTicketForm").submit();
		});
		},

		/* 当屏幕改变时 */
		winResize:function(){
			var _tick = null;
		// 存储cookie
		var reload = true; 
		var that = this;
		$(window).resize(function(){
			if (_tick) clearTimeout(_tick);
			_tick = setTimeout(function() {
				var winWidth = $(window).width();
				if(winWidth<=992){
					if(reload){
						if(!loadMobile){
							that.mobileEvent();
							that.padEvent();
						}

						reload = false;
					}
				}

			}, 1000);
		});
	},

	/* 后期优化新增 */
	otherEvent:function(){
		// 视频
		var videoHeight = function(){
			var winW = $(window).width();

			$('.videoLi').height(winW*700/1920);
			$('.video-master').height(winW*700/1920);
		}
		videoHeight();
		$('#videoSource')[0].play(); 
		
		$(window).resize(function(){
			videoHeight();
		});

		// 酒店选择
		$('.roomMenu a').click(function(){
			var dataNum = $(this).attr('data-num');
			switch (dataNum) {
				case 'rooms-1':
				$('.rooms-1').show().siblings('div').hide();
				break;
				case 'rooms-2':
				$('.rooms-1').show();
				$('.rooms-2').show();
				$('.rooms-3').hide();
				break;
				case 'rooms-3':
				$('.rooms-select-menu>div').show();
				$('.hotel-content .viewSchedules').css('marginTop',10);
				break;
				case '0':
				$('.rooms-select-menu>div').hide();
				$('.hotel-content .viewSchedules').css('marginTop',64);
				break;
			}
		});

        // 小孩人数选择联动
        $('.child-num-menu>li>a').click(function(){
        	var dataChild = $(this).attr('data-child');
        	var $childP = $(this).parents('.child-parent');
        	switch (dataChild) {
        		case 'child-0':
        		$childP.siblings('.child-com').hide();
        		break;
        		case 'child-1':
        		$childP.siblings('.child-1').show().siblings('.child-com').hide();
        		break;
        		case 'child-2':
        		$childP.siblings('.child-1').show();
        		$childP.siblings('.child-2').show();
        		$childP.siblings('.child-3').hide();
        		break;
        		case 'child-3':
        		$childP.siblings('.child-com').show();
        		break;
        	}
        });
	},

	/* 0元机票活动2017-12-16 */
	priceActive:function(){
		$('#price-timeFrom').dateSelect({
			timeFrom: 'price-timeFrom',
			isSingleDay:true,
			count:1,
		});

		$('#price2-timeFrom').dateSelect({
			timeFrom: 'price2-timeFrom',
			timeTo: 'price2-timeTo',
			count:1,
		});

		$('.second_slider').on('click','>ul>li',function(){
			
			var data = $(this).attr('data-modal');

			switch (data) {
				case "modalLi0":
					$('.priceModal').modal();
					$('.price-orgcity').val('REP');
					$('.price-dstcity').val('SGN');
					break;
				case "modalLi1":
					$('.priceModal2').modal();

					$('.price-orgcity').val('REP');
					$('.price-dstcity').val('SGN');
					$('.price-orgcity2').val('REP');
					$('.price-dstcity2').val('SGN');
					break;
				case "modalLi2":
					$('.price-orgcity').val('SGN');
					$('.price-dstcity').val('REP');
					break;
				case "modalLi3":
					$('.price-orgcity').val('SGN');
					$('.price-dstcity').val('REP');
					$('.price-orgcity2').val('SGN');
					$('.price-dstcity2').val('REP');
					break;
				case "modalLi4":
					$('.price-orgcity').val('HAN');
					$('.price-dstcity').val('PNH');
					break;
				case "modalLi5":
					$('.price-orgcity').val('HAN');
					$('.price-dstcity').val('PNH');
					$('.price-orgcity2').val('HAN');
					$('.price-dstcity2').val('PNH');
					break;
				
			}

			if(data=="modelLi0" || data=="modalLi1" ){
				$('.price-orgcity').val('REP');
				$('.price-dstcity').val('SGN');
			}
			
			if(data=="modelLi2" || data=="modalLi3" ){
				$('.price-orgcity').val('SGN');
				$('.price-dstcity').val('REP');
			}
			
			if(data=="modelLi4" || data=="modalLi5" ){
				$('.price-orgcity').val('HAN');
				$('.price-dstcity').val('PNH');
			}
		});

		/* 乘客人数选择 */
		var AdultNum = 1;
		var ChildNum = 0;

		var adultGroup = function(){
			$('.adult-group .addArrow').click(function(){
				var ChildNum = $('#price-Child').val();//获取小孩人数
				if(parseInt(ChildNum)+AdultNum<5){
					AdultNum++;
					$('#price-Adult').val(AdultNum);
				}else{
					layer.tips('Limited to 5 people only.', '#price-Adult',{
						tips: [2, '#8ec060'],
						time: 3000
					});
				}
			});
			$('.adult-group .downArrow').click(function(){
				$('#price-Adult').val()>=2 && AdultNum--;
				$('#price-Adult').val(AdultNum);
			});
		};

		var childGroup = function(){
			$('.child-group .addArrow').click(function(){
				var AdultNum = $('#price-Adult').val();//获取成人人数
				if(parseInt(AdultNum)+ChildNum<5){
					ChildNum++;
					$('#price-Child').val(ChildNum);
				}else{
					layer.tips('Limited to 5 people only.', '#price-Child',{
						tips: [2, '#8ec060'],
						time: 3000
					});
				}
			});
			$('.child-group .downArrow').click(function(){
				$('#price-Child').val()>=1 && ChildNum--;
				$('#price-Child').val(ChildNum);
			});
		};

		adultGroup();
		childGroup();
	},

	/* 圣诞活动 */
	christmas:function(){
		/* 下雪 */
		;(function (window, undefined) {
		  var canvas = document.getElementById('canvas');
		  var ctx = canvas.getContext('2d');
		  var canvasW = window.innerWidth;
		  var canvasH = window.innerHeight;
		  var particles = [];
		  var maxParticles = 300;

		  var resizeW = function(){
		  	var winW = $(window).width();
		  	if(winW<992){
		  		maxParticles = 100;
		  	}
		  }
		  resizeW();

		  $(window).resize(function(event) {
		  	resizeW();
		  });

		  var random = function (min, max) {
		    return Math.random() * (max - min) + min
		  }

		  window.requestAnimationFrame = (function () {
		    var FPS = 60

		    return window.requestAnimationFrame  ||
		           window.webkitRequestAnimationFrame ||
		           window.mozRequestAnimationFrame ||
		           window.oRequestAnimationFrame ||
		           window.msRequestAnimationFrame ||
		           function (callBack) {
		             window.setTimeout(callBack, 1000/FPS)
		           }
		  })()

		  var Particle = function () {
		    this.x = Math.random() * canvasW
		    this.y = Math.random() * canvasH
		    this.r = random(1, 5)
		    this.alpha = random(0.3, 1)
		    this.velocity = {
		      x: random(-0.35, 0.35),
		      y: random(0.75, 1.5)
		    }

		    this.draw = function () {
		      ctx.fillStyle = 'rgba(255, 255, 255, '+this.alpha+')'
		      ctx.beginPath()
		      ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false)
		      ctx.closePath()
		      ctx.fill()
		    }

		    this.moving = function () {
		      this.x += this.velocity.x
		      this.y += this.velocity.y

		      if (this.y > canvasH) {
		        this.x = Math.random() * canvasW
		        this.y = 0
		      }

		      this.draw()
		    }
		  }

		  init()

		  function init() {
		    canvas.width = canvasW
		    canvas.height = canvasH

		    for (var i = 0; i < maxParticles; i++) {
		      particles.push(new Particle())
		    }

		    animate()
		  }

		  function animate() {
		    ctx.clearRect(0, 0, canvasW, canvasH)
		    particles.forEach(function (particle) {
		      particle.moving()
		    })

		    requestAnimationFrame(animate)
		  }
		})(window)

	}
};

$(function() {
	LanmeiAirlines.init();
	$('.lm-loading').fadeOut('slow');

	setTimeout(function(){
		// $('#activeModal').modal();
	},1000);

	setTimeout(function(){
		// $('#activeModal,.modal-backdrop').fadeOut(600);
	},6000);
	
});

