
var LMShopDetailPage = {
	init:function(){
		this.pdModelSlider();
		this.addCart();
		this.cartInfoEdit();
		this.addressSel();
		this.pdPay();
		this.addEvend();
	},

	/* 商品尺寸选择滚动 */
	pdModelSlider:function(){

		// 初始化大容器ul宽度
		var $ul = $('.pd-model-main>ul');
		$.each($ul,function(i,v){
			$(v).width($(v).children('li').length * $(v).children('li').width()); //ul宽度
			$(v).children('.n2').addClass('active');  // 默认激活
		});

		// 右边箭头点击
		$('.pd-silder-select .prev-arrow-model').click(function(e){
			var $page = $(this).siblings('.pd-model-select-page');
			var $curUl = $(this).siblings('.pd-model-main').find('ul');

			var page = $page.val();
			var page_last=$(this).siblings('.pd-model-main').find('li').length;
			
			if(page==page_last-1){
				$curUl.animate({marginLeft:'100px'},200);
				$page.val(0);
			
				$curUl.find('.n1').addClass('active').siblings('li').removeClass('active');
			}else{
				$curUl.animate({marginLeft:'-='+100}, 200);
				page++;

				$page.val(page);
				$curUl.children('.n'+(page+1)).addClass('active').siblings('li').removeClass('active');
			}
		});

		// 左边箭头点击
		$('.pd-silder-select .next-arrow-model').click(function(e){
			var $page = $(this).siblings('.pd-model-select-page');
			var $curUl = $(this).siblings('.pd-model-main').find('ul');

			var page = $page.val();
			var page_last=$(this).siblings('.pd-model-main').find('li').length;

			if(page==0){
				$curUl.animate({marginLeft:'-='+100*(page_last-1)},200);
				$page.val(page_last-1);

				$curUl.children('.n'+(page_last)).addClass('active').siblings('li').removeClass('active');
			}else{
				$curUl.animate({marginLeft:'+='+100}, 200);
				page--;

				$page.val(page);
				$curUl.children('.n'+(page+1)).addClass('active').siblings('li').removeClass('active');
			}
		});

		// 点击尺寸激活
		$('.pd-model-main ul li').click(function(e){
			$(this).addClass('active');
			if($(this).next('li').hasClass('active')){
				// $sliderContainer.animate({marginLeft:'100px'},200);
				$(this).siblings('li').removeClass('active');
				// page--;
			}else{
				// $sliderContainer.animate({marginLeft:'-100px'},200);
				$(this).siblings('li').removeClass('active');
				// page++;
			}
		});
	},

	/* 一级菜单 加入购物车 */
	addCart:function(){
		// 购物车缩进
		var $lmPdCart = $('.lm-pd-cart');
		var $pdCartTitle = $('.pd-cart-title');
		var $pdCartPriceBox = $('.pd-cart-price-box');
		var pdBoxSlider = function(){
			$lmPdCart.animate({left:0},500);
			$pdCartTitle.animate({left:0},500);
			$pdCartPriceBox.animate({left:0},500);
		};
		$('.pd-cart-title .cart-arrow').click(function(){
			if($('.lm-pd-cart').css('left')=="-350px"){
				pdBoxSlider();
			}else{
				$lmPdCart.animate({left:"-350px"},500);
				$pdCartTitle.animate({left:"-350px"},500);
				$pdCartPriceBox.animate({left:"-350px"},500,function(){
					$('.lm-pd-cart .pd-cart-view').animate({left:"0px"},300).children('.pd-cart-select-num').animate({left:"66px"},300);
				});
				// 商品详情和地址页面隐藏
				$('.pd-cart-detail-wrapper>div,.pd-cart-pay-wrapper').hide('slow');
				$('.pd-cart-box>div').removeClass('active');
			}
		});

		$('.lm-pd-cart .pd-cart-view').click(function(){
			pdBoxSlider();
			$(this).animate({left:"-90px"},300).children('.pd-cart-select-num').animate({left:"-66px"},300);
		});

		// 点击加入购物车
		$('.add-cart-btn').click(function(e){
			var parent = $(this).parent().parent().parent();
			var imgsrc = parent.parent().find('.add-cart-small-img').attr('src');
			var txt = parent.children('.pd-detail-title').text();
			var price = parent.children('.pd-price').children('.new-price').text();
			var size = parent.children('.pd-model-select').find('.active').text();
			var color = parent.children('.pd-color-select').find('.active').text();

			$('#pd-cart-box-id').append('<div class="pd-cart-select"><div class="pd-cart-clear-toggle"><input type="checkbox" class="pd-checkBox"><i class="pd-cart-clear">X</i></div><a href="#" class="pd-get-detail-page"><img src="'+imgsrc+'" class="pd-img"><b></b></a><div class="pd-info" date-pd-id="pd-cart-detail-1"><h2>'+txt+'</h2><div class="pd-info-param"><span class="pd-info-param-model">'+size+'</span><span class="pd-info-param-color">'+color+'</span></div><div class="pd-price-box"><span class="pd-price">'+price+'</span><p class="pd-taxes">+(Taxes:<span>5%</span>)</p><p class="pd-num">X<span>1</span></p></div></div><img src="images/EN/pd-cart-select-arrow.png" class="pd-cart-select-arrow"></div>');

			// 计算商品数量
			$('.pd-cart-view .pd-cart-select-num').html($('.pd-cart-box .pd-cart-select').length);

			// 计算商品飞入的位置
			var left = 45;
			var top = 350;
			if($('.lm-pd-cart').css('left')=="-350px"){
				left = 45; top = 350;
			}else{
				left = 150; top = 150;
			}
			add(event,left,top,imgsrc);
		});
		// 飞起来
		function add(event,left,top,imgsrc) {
		    // var offset=$('.pd-cart-title h2').offset(); //落脚点
		    var _this=$(event.target);
		    var flyer=$('<img src="'+imgsrc+'" width=50 style="border-radius:50%"/>');
		    //利用插件
		    flyer.fly({
		        start:{left:event.clientX,top:event.clientY},//鼠标当时所在的位置
		        end:{left:left,top:top,width:20,height:20},//落脚点及落脚时的尺寸
		        onEnd:function(){//落脚时的动画效果，及后期处理方式
		        	flyer.fadeOut('slow',function(){
		        		$(this).remove();
		        	});
		        }
		    });
		}

		// 全选
		$('.pd-price-totle .pd-checkAll').click(function() {
			$('.pd-cart-select .pd-checkBox').prop("checked", this.checked);
		});

		$('.pd-cart-select .pd-checkBox').click(function() {
			var $subs = $('.pd-cart-select .pd-checkBox');
			$('.pd-price-totle .pd-checkAll').prop("checked" , $subs.length == $subs.filter(":checked").length ? true :false);
		});

		// 删除商品
		$('.pd-cart-delete').click(function(){
			var $cartSel = $('.pd-cart-box .pd-cart-select');

			$.each($cartSel,function(i,v){
				if($(v).find('.pd-checkBox').is(':checked')){
					$(v).remove();
				}
			});
		});
	},

	/* 二级菜单 修改购物车信息 */
	cartInfoEdit:function(){
		// 点击展示购物车快捷详情页
		$('#pd-cart-box-id .pd-info').click(function(){
			var id = $(this).attr('date-pd-id');
			$(this).parent().addClass('active').siblings().removeClass('active');
			$('.pd-cart-detail,.pd-cart-pay-wrapper').hide();
			$('#'+id).show();
		});

		// 左侧商品上下滚动
		var pdSilder = function(){

        	// 上边箭头点击
        	$('.pd-cart-detail-wrapper').on('click','.prev-small-img',function(e){
        		var largeBox = $(this).siblings('.img-small-select-box').children('.img-small-select');
        		var largeHeight = parseInt(largeBox.height())-350;
        		// console.log(parseInt(largeBox.css('margin-top')),largeHeight);
        		if(parseInt(largeBox.css('margin-top')) + parseInt(largeBox.height()) <= 310){
        			$('.prev-img-disable').removeClass('disable').addClass('show');
        			$('.prev-img').removeClass('show').addClass('disable');
        		}else{
        			largeBox.animate({marginTop:'-='+110},200);
        			$('.next-img').removeClass('disable').addClass('show');
        			$('.next-img-disable').removeClass('show').addClass('disable');
        		}
        	});

        	// 下边箭头点击
        	$('.pd-cart-detail-wrapper').on('click','.next-small-img',function(e){
        		var largeBox = $(this).siblings('.img-small-select-box').children('.img-small-select');
        		
        		if(parseInt(largeBox.css('margin-top'))==0){
        			$('.next-img-disable').removeClass('disable').addClass('show');
        			$('.next-img').removeClass('show').addClass('disable');
        		}else{
        			largeBox.animate({marginTop:'+='+110},200);
        			$('.prev-img').removeClass('disable').addClass('show');
        			$('.prev-img-disable').removeClass('show').addClass('disable');
        		}
        	});

        	// 商品点击后
        	$('.pd-cart-detail-wrapper').on('click','.img-small-select li',function(){
        		$(this).children('b').show();
        		$(this).addClass('active').siblings().removeClass('active');

        		var src = $(this).children('img').attr('src');
        		var parent = $(this).parent().parent().parent();
        		parent.siblings('.pd-img-large-rf').children('img').attr('src',src);
        		parent.siblings('.pd-large-img').children('img').attr('src',src);
        	});

        };
        pdSilder();

		// 图片放大镜
		var imgZoom = function(){
			$('#pd-cart-detail-1').imgZoom({
				winSelector:'winSelector-1',
				midImg:'pd-mid-img-1',
				largeImg:'pd-large-img-1',
			});
			$('#pd-cart-detail-2').imgZoom({
				winSelector:'winSelector-2',
				midImg:'pd-mid-img-2',
				largeImg:'pd-large-img-2',
			});
		};
		// imgZoom();
	},

	/* 二级菜单 用户地址和商品数量 */
	addressSel:function(){

		// 隐藏添加地址
		var addHide = function(){
			$('.pd-cart-address-complete,.address-add-inner').slideUp('slow');
			$('.pd-cart-address-icon,.pd-cart-address-edit').slideDown('slow');
		};

		// 优惠券选择
		$('#use-coupons').click(function(){
			if($(this).is(':checked')){
				$('.pd-cart-select-coupons').show();
			}else{
				$('.pd-cart-select-coupons').hide();
			}
		});

		$('.pd-cart-select-coupons').click(function(e){
			e.stopPropagation();
			$(this).children('.select-coupons-menu').show();
		});
		$('.select-coupons-menu li').click(function(e){
			e.stopPropagation();
			var $parent = $(this).parent();
			var val = $(this).html();
			$parent.hide();
			$parent.siblings('.couponsVal').html(val);
		});

		// 地址选择
		$('.pd-cart-address-inner').on('click','.pd-cart-address-detail',function(){
			$(this).addClass('active').siblings().removeClass('active');

			// 修改编辑地址信息
			var name = $(this).find('.pd-address-name').html();
			var phone = $(this).find('.pd-address-phone').html();
			var detail = $(this).find('.pd-address-detail').html();

			// 赋值
			$('.edit-address-name').val(name);
			$('.edit-address-phone').val(phone);
			$('.edit-address-info').val(detail);

		});

		$('.pd-cart-address-1').show(); //默认显示
		var addreToggle = true;
		var $addreDetail = $('.pd-cart-address-detail'); //获取所有的地址

		//显示更多地址
		$('.pd-cart-address-more').click(function(){ 
			if(addreToggle){
				$addreDetail.slideDown('slow');
				addreToggle = false;
			}else{
				$addreDetail.slideUp('slow');
				
				$.each($addreDetail,function(i,v){
					$(v).hasClass('active') && $(v).slideDown('slow');
				});
				addreToggle = true;
			}
		});

		// 编辑地址
		var addressEdit = true;
		$('.pd-cart-address-title .address-edit-btn').click(function(e){
			e.preventDefault();
			$(this).hide().siblings('a').show();
			$('.pd-cart-address-add,.pd-cart-address-edit').slideDown('slow');

			// 添加地址显示隐藏
			addHide();

			// 获取选中地址内容
			$.each($addreDetail,function(i,v){
				if($(v).hasClass('active')){
					var name = $(v).find('.pd-address-name').html();
					var phone = $(v).find('.pd-address-phone').html();
					var detail = $(v).find('.pd-address-detail').html();

					// 赋值
					$('.edit-address-name').val(name);
					$('.edit-address-phone').val(phone);
					$('.edit-address-info').val(detail);
				}
			});
		});

		// 保存地址
		$('.pd-cart-address-title .address-edit-btn-OK').click(function(e){
			e.preventDefault();
			$(this).hide().siblings('a').show();
			$('.pd-cart-address-add,.pd-cart-address-edit').slideUp('slow');

			// 取值
			var name = $('.edit-address-name').val();
			var phone = $('.edit-address-phone').val();
			var detail = $('.edit-address-info').val();

			// 编辑完成后赋值
			$.each($addreDetail,function(i,v){
				if($(v).hasClass('active')){
					// 赋值
					$(v).find('.pd-address-name').html(name);
					$(v).find('.pd-address-phone').html(phone);
					$(v).find('.pd-address-detail').html(detail);
				}
			});

		});

		// 添加地址
		$('.pd-cart-address-icon').click(function(){
			$('.pd-cart-address-complete,.address-add-inner').slideDown('slow');
			$('.pd-cart-address-icon,.pd-cart-address-edit').slideUp('slow');
			// 清空内容
			// $('.add-address-name').val(''); $('.add-address-phone').val(''); $('.add-address-info').val('');
		});

		$('.address-complete').click(function(){ //确定
			var name = $('.add-address-name').val();
			var phone = $('.add-address-phone').val();
			var detail = $('.add-address-info').val();

			if(name=='' || phone=='' || detail==''){
				layer.open({
					  type: 1, //Page层类型
					  area: ['400px', '300px'],
					  title: 'prompt box',
					  shadeClose: true, //点击遮罩关闭
					  shade: 0.6, //遮罩透明度
					  maxmin: false, //允许全屏最小化
					  anim: 1, //0-6的动画形式，-1不开启
					  btn: ['YES'],
					  btnAlign: 'c',
					  content: '<div style="text-align:center;line-height: 202px;font-size:20px">Please input address information</div>',
					  yes: function(index, layero){
						layer.close(index); //如果设定了yes回调，需进行手工关闭
					  }
				}); 
			}else{
				$('.pd-cart-address-inner').append('<div class="pd-cart-address-detail" style="display:block"><div class="pd-address-perInfo">-(<h2 class="pd-address-name">'+name+'</h2>) <p class="pd-address-phone">'+phone+'</p></div><div class="pd-address-detail">'+detail+'</div></div>');
			  
				// 添加地址显示隐藏
				addHide();

				$addreDetail = $('.pd-cart-address-detail'); //获取所有的地址
			} 

		});

		$('.address-cancel').click(function(){ //取消
			addHide();
		});
	},

	/* 点击支付 */
	pdPay:function(){
		$('.pd-cart-price-box .pd-pay').click(function(){
			$('.pd-cart-detail').hide();
			$('.pd-cart-pay-wrapper').show();
		});
	},

	/* 其他事件 */
	addEvend:function(){
		// 产品数量增减
		var pdNum = function(){
			$('.cart-add-num').click(function(e){
				$(this).siblings('span').html(parseInt($(this).siblings('span').html())+1);
			});
			$('.cart-subtract-num').click(function(e){
				if(parseInt($(this).siblings('span').html())>=2){
					$(this).siblings('span').html(parseInt($(this).siblings('span').html())-1);
				}
			});
		};
		pdNum();

		// 搜索框缩放
		$('.pd-search input').click(function(event) {
			$(this).parent().animate({width: 560}, 'slow');
			$(this).animate({width: 450}, 'slow');
		});
		//分页调用
		$(".shop-comments-details-pages").createPage({
		    pageCount:10,
		    current:1,
		    // previous:'Previous',
		    // next:'Next',
		    backFn:function(p){
		        
		    }
		});

		// 轮播
		$(".pd-slider-wrap").PicCarousel({
			"width":1000,		//幻灯片的宽度
			"height":390,		//幻灯片的高度
			"posterWidth":390,	//幻灯片第一帧的宽度
			"posterHeight":390, //幻灯片第一张的高度
			"scale":0.9,		//记录显示比例关系
			"speed":1500,		//记录幻灯片滚动速度
			"autoPlay":true,	//是否开启自动播放
			"delay":1500,		//自动播放间隔
			"verticalAlign":"top"	//图片对齐位置
		});
	},
};

$(document).ready(function($) {
	LMShopDetailPage.init();
});
