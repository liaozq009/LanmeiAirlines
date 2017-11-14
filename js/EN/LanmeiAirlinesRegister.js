
var LanmeiAirlinesRegister = {
	init:function(){
		this.login();
		this.addEvend();
	},


	/* 登录 */
	login:function(){
		// 同意条款
		$('.agree>span').click(function(){
			$(this).toggleClass('agreeConditions');
		});

		//邮箱自动补全
		$("#registerUserName").changeTips({ 
			divTip:".register_on_changes"
		}); 
		$("#LanmeiUserName").changeTips({  //注册页面点击登录页面的邮箱自动补全
			divTip:".login_on_changes"
		}); 
		$("#f-LanmeiUserName").changeTips({  //忘记密码页面点击登录页面的邮箱自动补全
			divTip:".forget_on_changes"
		}); 

		// 记住密码
		$('.agree span').click(function(){
			$(this).toggleClass('active');
		});

		//正则验证
		var reg1=/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/; //邮箱
		var reg2=/^(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{8,16}$/; //密码

		//正则验证
		var userNameVerify = function(val){
			var tips = $('#registerUserName').siblings('p');
			tips.addClass('visible');
			if(reg1.test(val)){
				tips.html('验证通过');
				tips.css('color','#8ec060');
			}else{
				tips.html("您的输入不符合要求，请重新输入！");
				tips.css('color','#d0011b');
			}
		};
		$('#registerUserName').blur(function(){
			var val = $(this).val();
			userNameVerify(val);
		});
		$('.on_changes>li').click(function(){
			var val = $(this).html();
			userNameVerify(val);
		});

		// 密码验证
		$('#registerPassword').blur(function(event) {
			var tips = $(this).siblings('p');
			tips.addClass('visible');
			var val = $(this).val();
			if(reg2.test(val)){
				tips.html('验证通过');
				tips.css('color','#8ec060');
			}else{
				tips.html("您的输入不符合要求，请重新输入！");
				tips.css('color','#d0011b');
			}
		});

		// 再次输入密码验证
		$('#repeatPassword').blur(function(event) {
			var tips = $(this).siblings('p');
			tips.addClass('visible');
			var val1 = $('#registerPassword').val();
			var val2 = $(this).val();
			if(val1==val2){
				tips.html('验证通过');
				tips.css('color','#8ec060');
			}else{
				tips.html("您的输入不符合要求，请重新输入！");
				tips.css('color','#d0011b');
			}
		});

		// 忘记密码
		$('.forgetBtn').click(function(e){
			e.preventDefault();
			$('#logonModal').modal('hide');
			$('#forgetModal').modal();
		});
		// 在忘记密码界面登录
		$('.a_login').click(function(e){
			e.preventDefault();
			$('#forgetModal').modal('hide');
			$('#logonModal').modal('show');
		});
		// 当忘记密码界面输入用户信息时，显示时间倒计时
		$('#f-LanmeiUserName').change(function(e){
			// console.log('change');
		});

		// 禁用button提交按钮
		$('#registerBtn').click(function(e){
			e.preventDefault();
		});
	},

	/* 其他事件 */
	addEvend:function(){

	},
};

$(document).ready(function($) {
	LanmeiAirlinesRegister.init();
});

