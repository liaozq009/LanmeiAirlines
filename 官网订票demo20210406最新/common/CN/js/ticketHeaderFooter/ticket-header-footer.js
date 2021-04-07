var lmHeaderFooter = {
  init: function(){
    this.otherEvent(); 
    this.headerFooter(); 
  },
  otherEvent: function(){
    $('head').append('<link rel="stylesheet" href="https://lanmeiairlines.com/lanmeiairlines2.0/default/common/CN/js/ticketHeaderFooter/ticket-header-footer.css">');
  },
  /* 公共页头和页脚 */
  headerFooter: function(){
    var $header = '<div class="header-wrap">'+
      '<a href="http://lanmeiairlines.com/index_cn.html?lang=cn" class="h-logo-wrap"></a>'+
      '<div class="h-right"> '+
        '<div class="h-phone js-h-phone"> '+
        '<div class="phone-menu js-phone-menu"> '+
          '<h2>热线电话：</h2> '+
          '<p class="p1">+855 93466999</p> '+
          '<p class="p2">+855 93822999</p> '+
          '<h2 class="time">工作时间：</h2>'+
          '<p class="p1 time">周一至周五：9:00-18:00</p>'+
          '<span>(金边时间)</span>'+
          '<p class="p2 time">周六周日：9:00-17:00</p>'+
          '<span>(金边时间)</span>'+
        '</div> '+
        '</div> '+
        '<div class="h-lang js-h-lang"> '+
        '<p class="js-choose-lang"></p> '+
        '<div class="lang-menu js-lang-menu"> '+
          '<h2>选择语言:</h2> '+
          '<a href="http://lanmeiairlines.com?lang=en" class="lang-en" data="en">English</a> '+
          '<a href="http://lanmeiairlines.com?lang=cn" class="lang-zh" data="zh">简体中文</a> '+
        '</div> '+
        '</div> '+
      '</div> '+
    '</div>';

    var $footer = '<p class="lm-logo"></p>'+
      '<p class="facebook"> <a href="https://www.facebook.com/lanmeiairlines/" class="a1 icon-facebook"></a> <a href="http://weibo.com/lanmeiair" class="icon-weibo"></a> </p> '+
      '<p class="f-email"><img src="http://b2c.lanmeiairlines.com/lqWeb/lqweb/common/images/CN/icon-email.png" class="icon-email" /><span>lm-ec@lanmeiairlines.com</span></p> '+
      '<p class="f-local"> <img src="http://b2c.lanmeiairlines.com/lqWeb/lqweb/common/images/CN/icon-location.png" class="icon-location" /> <a href="https://goo.gl/maps/7pyBze8BFe52" target="_Blank">柬埔寨金边市俄罗斯大道575号</a> </p>'+ 
      '<p class="copyright">&copy; Copyright 2017-2020 罗盘式集团有限公司 <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_Blank" rel="nofollow">粤ICP备17005494号</a></p>';
    
    $('.lm-header').html($header);
    $('.lm-footer').html($footer);
  },
}
$(document).ready(function($) {
  lmHeaderFooter.init();
});