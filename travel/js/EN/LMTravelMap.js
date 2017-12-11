
var LMTravelList = {
	init:function(){
		this.reginSelect();
		this.otherEvent();
	},

	/* 热度选择下拉菜单 */
	reginSelect:function(){
		$('.modal-hot').on('click','.modal-hot-val',function(e){
			e.stopPropagation();
			$(this).siblings('ul').slideToggle();
		}).on('click','.modal-hot-menu>li',function(){
			var val = $(this).html();
			$(this).parent().slideDown('slow').siblings('span').html(val);
		});

		$('.modal-content').click(function(){
			$('.modal-hot ul').slideUp('slow');
		});
	},

	/* 其他事件 */
	otherEvent:function(){
		// 弹出模态框
		$('.img-com').click(function(){
			var local = $(this).attr('data-local');
			$('#'+local).modal();
		});

		// function MM_reloadPage(init) {
		//     if (init == true) with (navigator) {
		//         if ((appName == "Netscape") && (parseInt(appVersion) == 4)) {
		//             document.MM_pgW = innerWidth; document.MM_pgH = innerHeight; onresize = MM_reloadPage;
		//         }
		//     }else if (innerWidth != document.MM_pgW || innerHeight != document.MM_pgH){
		//         location.reload();
		//     }
		// }
		// MM_reloadPage(true);

		// 
		$('.img-com').mousedown(function(event) {
			$(this).css('transform','scale(0.8)');
		}).mouseup(function(event) {
			$(this).css('transform','scale(1)');
		});
	},
};

$(document).ready(function($) {
	LMTravelList.init();
});
