var lmHeaderFooter = {
  init: function(){
    this.otherEvent(); 
    this.headerFooter(); 
  },
  otherEvent: function(){
    $('head').append('<link rel="stylesheet" href="https://lanmeiairlines.com/lanmeiairlines2.0/default/common/EN/js/ticketHeaderFooter/ticket-header-footer.css">');
  },
  /* 公共页头和页脚 */
  headerFooter: function(){
    var $header = '<div class="header-wrap">'+
      '<a href="https://lanmeiairlines.com/index.html?lang=en" class="h-logo-wrap"></a>'+
      '<div class="h-right"> '+
        '<div class="h-phone js-h-phone"> '+
        '<div class="phone-menu js-phone-menu"> '+
          '<h2>24 online:</h2> '+
          '<p class="p1">+855 23981363</p> '+
        '</div> '+
        '</div> '+
        '<div class="h-lang js-h-lang"> '+
        '<p class="js-choose-lang"></p> '+
        '<div class="lang-menu js-lang-menu"> '+
          '<h2>Choose a language:</h2> '+
          '<a href="https://lanmeiairlines.com/index.html?lang=en" class="lang-en" data="en">English</a> '+
          '<a href="https://lanmeiairlines.com/index_cn.html?lang=cn" class="lang-zh" data="zh">简体中文</a> '+
        '</div> '+
        '</div> '+
      '</div> '+
    '</div>';

    var $footer = '<p class="lm-logo"></p>'+
      '<p class="facebook"> <a href="https://www.facebook.com/lanmeiairlines/" class="a1 icon-facebook1"></a> <a href="http://weibo.com/lanmeiair" class="icon-weibo"></a> </p> '+
      '<p class="f-email"><img src="http://b2c.lanmeiairlines.com/lqWeb/lqweb/common/images/EN/icon-email.png" class="icon-email" /><span>lm-ec@lanmeiairlines.com</span></p> '+
      '<p class="f-local"> <img src="http://b2c.lanmeiairlines.com/lqWeb/lqweb/common/images/EN/icon-location.png" class="icon-location" /> <a href="https://goo.gl/maps/7pyBze8BFe52" target="_Blank"> No.575 D&E, Russian Federation Boulevard, Phnom Penh, Cambodia</a> </p>'+ 
      '<p class="copyright">&copy; Copyright 2017 Lanmei Airlines. All Rights Reserved. ICP:Guangdong Province <a href="http://www.miitbeian.gov.cn" target="_Blank" rel="nofollow">ICP-17005494-1</a></p>';
    
    $('.lm-header').html($header);
    $('.lm-footer').html($footer);
  },
}
$(document).ready(function($) {
  lmHeaderFooter.init();
});