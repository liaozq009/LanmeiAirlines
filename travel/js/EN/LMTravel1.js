
var LMTravelList = {
	init:function(){
		this.reginSelect();
		this.pcTraval();
		this.traval();
		this.otherEvent();
	},

	/* 解决延迟300ms问题 */
	fastClick:function(dom){
		FastClick.attach(dom[0]);
	},

	/* 区域选择下拉菜单 */
	reginSelect:function(){
		$('.t-country').on('click','.t-country-val',function(e){
			e.stopPropagation();
			$(this).siblings('ul').slideToggle();
		}).on('click','.t-menu>li',function(){
			var val = $(this).html();
			$(this).parent().slideDown('slow').siblings('span').html(val);
		});

		$('html').click(function(){
			$('.t-country ul').slideUp('slow');
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
							$title.html('Cambodia');
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

		// 获取容器的宽
		var getWidth = function(){
			var $li = $('.t-imgs>li');

			var $width3 = $('.t-imgs .n1');

			elementW3 = parseInt($width3.width());

			$li.height(elementW3*0.75);
		};
		getWidth();

		var _time = null;
		$(window).resize(function(){
			if (_time) clearTimeout(_time);
	    	_time = setTimeout(function() {
	    		getWidth();	
            }, 1000);
		});

		/* PC端事件  */
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

	/* 其他事件 */
	otherEvent:function(){
		// 轮播
		// $('.LM-hiSlider').hiSlider({
		// 	isFlexible: true,
		// 	isShowTitle: false,
		// 	isShowPage:false,
		// 	isAuto: false,
		// 	intervalTime: 3000,
		// 	isSupportTouch: true,
		// 	// prevImg:'../../images/EN/prev-arrow.png',
		// 	// nextImg:'../../images/EN/next-arrow.png',
		// 	titleAttr: function(curIdx){
		// 		return $('img', this).attr('alt');
		// 	}
		// });

		//分页调用
		// $(".t-comment-page").createPage({
		//     pageCount:10,
		//     current:1,
		//     previous:'Previous',
		//     next:'Next',
		//     backFn:function(p){
		        
		//     }
		// });

		/* 新增修改banner背景 */
		var bannerHeight = function(){
			var winWidth = $(window).width();
			if(winWidth<=1920){
				$('.hiSlider-item').height(winWidth*700/1920);
			}else{
				$('.hiSlider-item').height(700);
			}
		}
		bannerHeight();

		$(window).resize(function(){
			bannerHeight();
		});

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

		if(flag){ //PC端
			// 页面滚动时，banner固定滚动
			$(window).scroll(function(){
				var sTop = $(window).scrollTop();
				if(sTop>=200){
					var y = sTop-200;
					$('.hiSlider-item').css('backgroundPosition','center '+y+'px');
				}else{
					$('.hiSlider-item').css('backgroundPosition','center 0');
				}
			});
		}else{ //移动端
			
		}

	},
};

$(document).ready(function($) {
	LMTravelList.init();
});
