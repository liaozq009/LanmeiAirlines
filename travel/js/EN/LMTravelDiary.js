var LMTravelDiary = {
	init:function(){
		var bookLeft;
		var bookRight;
		var bookLeftHeight=0;
		var bookRightHeight=0;
		this.editor();
		this.toolbar();
		this.otherEvent();
		this.diaryEditor();
		this.spectrumEvent();
		this.insertimageEvent();
	},

	/* 编辑信息框 */
	editor:function(){
		// 费用区间选择
		var rangeSlider = function(min,max){
			$('.range-slider').jRange({
				from: min,
				to: max,
				step: 1000,
				showScale:false,
				format: '%s',
				width: 180,
				showLabels: true,
				isRange : true
			});
		}
		rangeSlider(0,10000);

		// 编辑框显示或隐藏
		$('.p-header-title .p-edit').click(function(){
			$('.p-editor').show();
		});
		$('.p-editor-ok button').click(function(){
			$('.p-editor').hide();
		});

		// 日期
		$("#travel-edit-time").jeDate({
			format:"YYYY-MM-DD",
			isTime:true, 
			minDate:"2017-09-09"
		});

		// 人数选择
		var adultNum = 1;
		var childNum = 0;
		$('.people-add').click(function(){
			adultNum++;
			$(this).siblings('input').val(adultNum);
		});
		$('.people-sub').click(function(){
			if(adultNum>1){
				adultNum--;
				$(this).siblings('input').val(adultNum);
			}
		});
		$('.child-add').click(function(){
			childNum++;
			$(this).siblings('input').val(childNum);
		});
		$('.child-sub').click(function(){
			if(childNum>0){
				childNum--;
				$(this).siblings('input').val(childNum);
			}
		});

		//其他金额， 注：金额选择放在jquery.range.js中
		$('.p-editor-money .max-money').change(function(){
			var optionVal = $('.p-editor-money .max-money  option:selected').val();  

			var $select = $('.slider-container,.p-editor-money .min-money,.p-editor-money .max-money');
			var $range = $('.range-slider');
			$range.val('').click();

			// 只能输入数字
			$range.keyup(function(event) {
				$(this).val($(this).val().replace(/[^\d]/ig,''));
			});

			if(optionVal=='0'){
				$range.show();
				 $select.hide();
			}else{
				$range.hide();
				 $select.show();
			}
		});
	},

	/* 操作栏，包括路线、游记、保存、预览 */
	toolbar:function(){
		$('.p-toolbar-left>li>a').click(function(){
			var $parent =  $(this).parent('li');
			var $bottomLine = $parent.siblings('.bottom-line');

			$parent.addClass('active').siblings('li').removeClass('active');

			var href = $(this).attr('href');
			switch (href) {
				case '#route':
					$bottomLine.animate({'left':'10px'}, 300);
					break;
				case '#diary':
					$bottomLine.animate({'left':'114px'}, 300);
					break;
				case '#cover':
					$bottomLine.animate({'left':'218px'}, 300);
					break;
			}
		});
	},

	/* 编辑器加载 */
	diaryEditor:function(){
			initHtmlBuilder();
			var optionLeft = {
		        element: $('.p-diary-book-left').get(0),
		        onkeypress: function( code, character, shiftKey, altKey, ctrlKey, metaKey ) {
		        				var curObj = bookLeft.getElement();
				            	var curLast = curObj.lastChild;
				            	var curHeight = 0;
				            	if(curLast!=null){
				            		if(curLast.offsetTop!=null){
				            			curHeight=curLast.offsetTop;
				            			if(curLast.clientHeight!=null){
				            				curHeight=curHeight+curLast.clientHeight;
				            			}
				            		}else{
				            			if(curLast.previousSibling!=null)
				            			curHeight=curLast.previousSibling.offsetTop;
				            			if(curLast.previousSibling!=null&&curLast.previousSibling.clientHeight!=null){
				            				curHeight=curHeight+curLast.previousSibling.clientHeight;
				            			}
				            		}
				            	}
		                        if(ctrlKey&&character=='V')return false;
		                        if( typeof console != 'undefined' && code!=13&&code!=8){
		                        	if(curHeight>=760){
		                        		return false;
		                        	}
		                        }else if(code==13){
		                        	if(curHeight+10>=760){
		                        		return false;
		                        	}
		                        }else if(code==8){
		                        	if(curHeight-20<=760){
		                        		return true;
		                        	}
		                        }
		                    },
		        onselection: function( collapsed, rect, nodes, rightclick ) {
		                        if( typeof console != 'undefined' && rect ){
		                        		//bookLeftHeight = rect.top;
		                        	//console.log( 'RAW: selection rect('+rect.left+','+rect.top+','+rect.width+','+rect.height+'), '+nodes.length+' nodes' );
		                        }
		                    },
		        onplaceholder: function( visible ) {
		                        if( typeof console != 'undefined' ){
		                        	//console.log( 'RAW: placeholder ' + (visible ? 'visible' : 'hidden') );
		                        }
		                    }
		    };
			/*常用按钮调用*/
			var optionRight = {
		        element: $('.p-diary-book-right').get(0),
		        onkeypress: function( code, character, shiftKey, altKey, ctrlKey, metaKey ) {
		        				var curObj = bookRight.getElement();
				            	var curLast = curObj.lastChild;
				            	var curHeight = 0;
				            	if(curLast!=null){
				            		if(curLast.offsetTop!=null){
				            			curHeight=curLast.offsetTop;
				            			if(curLast.clientHeight!=null){
				            				curHeight=curHeight+curLast.clientHeight;
				            			}
				            		}else{
				            			if(curLast.previousSibling!=null)
				            			curHeight=curLast.previousSibling.offsetTop;
				            			if(curLast.previousSibling!=null&&curLast.previousSibling.clientHeight!=null){
				            				curHeight=curHeight+curLast.previousSibling.clientHeight;
				            			}
				            		}
				            	}
				            	if(ctrlKey&&character=='V')return false;
		                        if( typeof console != 'undefined' && code!=13){
		                        	if(curHeight>=760){
		                        		return false;
		                        	}
		                        }else if(code==13){
		                        	if(curHeight+10>=760){
		                        		return false;
		                        	}
		                        }
		                        else if(code==8){
		                        	if(curHeight-20<=760){
		                        		return true;
		                        	}
		                        }
		                    },
		        onselection: function( collapsed, rect, nodes, rightclick ) {
		                        if( typeof console != 'undefined' && rect ){
		                        	bookRightHeight = rect.top;
		                        	//console.log( 'RAW: selection rect('+rect.left+','+rect.top+','+rect.width+','+rect.height+'), '+nodes.length+' nodes' );
		                        }
		                    },
		        onplaceholder: function( visible ) {
		                        if( typeof console != 'undefined' ){
		                        	//console.log( 'RAW: placeholder ' + (visible ? 'visible' : 'hidden') );
		                        }
		                    }
		    };
		    bookLeft = wysiwyg(optionLeft);
		    bookRight = wysiwyg( optionRight );
		    /*保存内容事件*/
		   $('#book-save').click(function(){
		   		var next= $('.nextPage')[0];
		   		next.click();
		   		console.log('bookleft:'+bookLeft.getHTML());
		   		console.log('bookright:'+bookRight.getHTML());
		   });
		   /*下一页事件*/
		   $('#book-next').click(function(){
		   		var next= $('.nextPage')[0];
		   		next.click();
		   		console.log('bookleft:'+bookLeft.getHTML());
		   		console.log('bookright:'+bookRight.getHTML());
		   		bookLeft.setHTML('');
		   		bookRight.setHTML('');
		   });
		   
	},
	/*调色板事件*/
	spectrumEvent:function(){
		  var bgSelect = 'left';
		  $("#bgUpload").spectrum({
			    color: "#ECC",
			    showInput: true,
			    className: "full-spectrum",
			    showInitial: true,
			    checkRadioText:'left',
			    showPalette: true,
			    showSelectionPalette: true,
			    maxSelectionSize: 10,
			    preferredFormat: "hex",
			    localStorageKey: "spectrum.demo",
			    move: function (color) {
			        
			    },
			    show: function () {
			    
			    },
			    beforeShow: function () {
			    
			    },
			    hide: function () {
			    
			    },
			    change: function(color) {
			    	var selectColor = color.toHexString();
			    	var bgSelect = color.getbgSelect();
			    	if(selectColor!='#ffffff'){
			    		if(bgSelect=='left'){
			        		$('.p-diary-book-left').get(0).style.backgroundColor=selectColor;
				        }else if(bgSelect=='right'){
				        	$('.p-diary-book-right').get(0).style.backgroundColor=selectColor;
				        }else{
				        	$('.p-diary-book-left').get(0).style.backgroundColor=selectColor;
				        }
			    	}else{
			    		if(bgSelect=='left'){
			        		$('.p-diary-book-left').get(0).style="";
				        }else if(bgSelect=='right'){
				        	$('.p-diary-book-right').get(0).style="";
				        }else{
				        	$('.p-diary-book-right').get(0).style="";
				        	$('.p-diary-book-left').get(0).style="";
				        }
			    		
			    	}
			    },
			    palette: [
			        ["rgb(0, 0, 0)", "rgb(67, 67, 67)", "rgb(102, 102, 102)",
			        "rgb(204, 204, 204)", "rgb(217, 217, 217)","rgb(255, 255, 255)"],
			        ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 153, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)",
			        "rgb(0, 255, 255)", "rgb(74, 134, 232)", "rgb(0, 0, 255)", "rgb(153, 0, 255)", "rgb(255, 0, 255)"], 
			        ["rgb(230, 184, 175)", "rgb(244, 204, 204)", "rgb(252, 229, 205)", "rgb(255, 242, 204)", "rgb(217, 234, 211)", 
			        "rgb(208, 224, 227)", "rgb(201, 218, 248)", "rgb(207, 226, 243)", "rgb(217, 210, 233)", "rgb(234, 209, 220)", 
			        "rgb(221, 126, 107)", "rgb(234, 153, 153)", "rgb(249, 203, 156)", "rgb(255, 229, 153)", "rgb(182, 215, 168)", 
			        "rgb(162, 196, 201)", "rgb(164, 194, 244)", "rgb(159, 197, 232)", "rgb(180, 167, 214)", "rgb(213, 166, 189)", 
			        "rgb(204, 65, 37)", "rgb(224, 102, 102)", "rgb(246, 178, 107)", "rgb(255, 217, 102)", "rgb(147, 196, 125)", 
			        "rgb(118, 165, 175)", "rgb(109, 158, 235)", "rgb(111, 168, 220)", "rgb(142, 124, 195)", "rgb(194, 123, 160)",
			        "rgb(166, 28, 0)", "rgb(204, 0, 0)", "rgb(230, 145, 56)", "rgb(241, 194, 50)", "rgb(106, 168, 79)",
			        "rgb(69, 129, 142)", "rgb(60, 120, 216)", "rgb(61, 133, 198)", "rgb(103, 78, 167)", "rgb(166, 77, 121)",
			        "rgb(91, 15, 0)", "rgb(102, 0, 0)", "rgb(120, 63, 4)", "rgb(127, 96, 0)", "rgb(39, 78, 19)", 
			        "rgb(12, 52, 61)", "rgb(28, 69, 135)", "rgb(7, 55, 99)", "rgb(32, 18, 77)", "rgb(76, 17, 48)"]
			    ]
			});
	},
	/* 上传图片 */
	insertimageEvent:function(){
		$("#picUpload").click(function(){
			var inserimage='<div class="wysiwyg-toolbar-form" unselectable="on"><div class="wysiwyg-browse">Drop image or click<input type="file" draggable="true" style="position: absolute; left: 0px; top: 0px; width: 100%; height: 100%; opacity: 0; cursor: pointer;" onchange ="uploadFile(this,1)"></div><div><input type="text" value="" placeholder="www.example.com" class="wysiwyg-input"><a class="wysiwyg-toolbar-icon" href="#" title="Submit" unselectable="on"></a></div></div>';
			layer.open({
			  type: 1,
			  area: ['420px', '240px'], //宽高
			  content: inserimage,
			  title: '上传图片'
			});
		});
		
	},
	/* 其他事件 */
	otherEvent:function(){
		//上传音频
		//fileUpload(type) ，参数为1:视频，2：音频
		$('#playVideo,#playAudio').click(function(e){
			var title="";
			var id=e.currentTarget.id;
			var insertAudio='<div class="wysiwyg-toolbar-form" unselectable="on">'+
								'<div class="wysiwyg-browse">Drop file or click'+
									'<input id="radioFile" type="file" name="fileTrans" onchange="showName(this)" draggable="true" style="position: absolute; left: 0px; top: 0px; width: 100%; height: 100%; opacity: 0; cursor: pointer;">'+
								'</div>'+
								'<p id="audioName"></p>'+
								'<div class="btn-div">';
		if(id=="playVideo"){
			insertAudio+='<button type="button" class="insertBtn" id="fileUpload" onclick="fileUpload(1)">File Upload</button>'+
								'</div>'+
							'</div>';
			title="Upload Video";				
		}
		if(id=="playAudio"){
			insertAudio+='<button type="button" class="insertBtn" id="fileUpload" onclick="fileUpload(2)">File Upload</button>'+
								'</div>'+
							'</div>';
			title="Upload Audio";				
			if(!$('.radioPlay').hasClass('glyphicon-signal')){
				playVid();	
			}
		}
		if(id=="playVideo" || (id=="playAudio" && $('.radioPlay').hasClass('glyphicon-signal'))){
			showuploadfile(insertAudio,title);	
		}
		});
		//移入显示隐藏音频tip
		var t=null;
		$(".upload-play").hover(function (){
			if($(this).find('.glyphicon-play').length>0){
				$(".play-tips").show(200);  
			}
        },function(){
        	t= setTimeout('$(".play-tips").hide()',500);
        });
		
        $('.play-tips').mouseover(function (){
        	clearTimeout(t);
			$(this).show();  
        }); 
        $('.play-tips').mouseout(function(){
        	$('.play-tips').hide();
        })
		//分页调用
		$(".t-comment-page").createPage({
		    pageCount:10,
		    current:1,
		    previous:'Previous',
		    next:'Next',
		    backFn:function(p){
		        
		    }
		});
		//
		$('.p-bg-ul').on('click','.upload',function(){
			$(this).addClass('active').siblings().removeClass('active');
		})
		
		
	}
};

function initHtmlBuilder (){
$('.p-diary-book-left,.p-diary-book-right,#editor3').each( function(index, element)
 {
	$(element).wysiwyg({
			classes: 'some-more-classes',
			position: 'top-selection',
			buttons: {
				forecolor: {
					title: 'Text color',
					image:'<img src="../../libs/wysiwyg/image/icon_color.png" width="20"  height="20" alt="" />',
					hotkey: 'c',
					showstatic: false,
					showselection: true
				},
				insertimage: {
					title: 'Insert image',
					image: '\uf030', // <img src="path/to/image.png" width="16" height="16" alt="" />
					showstatic: false, // wanted on the toolbar
					showselection: false // wanted on selection
				},
				insertlink: {
					title: 'Insert link',
					image: '\uf08e', // <img src="path/to/image.png" width="16" height="16" alt="" />
					showstatic: false,
					showselection: false
				},
				fontsize: {
					title: 'Size',
					//image: '\uf034', // <img src="path/to/image.png" width="16" height="16" alt="" />
					image: '<select style="background:#f7faff;border-radius:4px;width:70px;height:30px;border: 0;font-family: Comfortaa;font-size: 14px;color: #1f2c5c;letter-spacing: 0;text-align: left;">'+
							'<option>7</option><option>6</option></select>', 
					popup: function($popup, $button, $editor) {
						var list_fontsizes = {
							// Name : Size
							'Huge': 7,
							'Larger': 6,
							'Large': 5,
							'Normal': 4,
							'Small': 3,
							'Smaller': 2,
							'Tiny': 1
						};
						var $list = $('<div/>').addClass('wysiwyg-toolbar-list')
							.attr('unselectable', 'on');
						$.each(list_fontsizes, function(name, size) {
							var $link = $('<a/>').attr('href', '#')
								.css('font-size', (8 + (size * 3)) + 'px')
								.html(name)
								.click(function(event) {
									$(element).wysiwyg('fontsize', size);
									$(element).wysiwyg('close-popup');
									// prevent link-href-#
									event.stopPropagation();
									event.preventDefault();
									return false;
								});
							$list.append($link);
						});
						$popup.append($list);
					},
					showstatic: false, // wanted on the toolbar
					showselection: true // wanted on selection
				},
				bold: {
					title: 'Bold (Ctrl+B)',
					//image: '\uf032', // <img src="path/to/image.png" width="16" height="16" alt="" />
					image:'<img src="../../libs/wysiwyg/image/icon_bold.png" width="20"  height="20" alt="" />',
					hotkey: 'b',
					showstatic: false,
					showselection: true
				},
				italic: {
					title: 'Italic (Ctrl+I)',
					//image: '\uf033', // <img src="path/to/image.png" width="16" height="16" alt="" />
					image:'<img src="../../libs/wysiwyg/image/icon_italic.png" width="20"  height="20" alt="" />',
					hotkey: 'i',
					showstatic: false,
					showselection: true
				},
				underline: {
					title: 'Underline (Ctrl+U)',
					//image: '\uf0cd', // <img src="path/to/image.png" width="16" height="16" alt="" />
					image:'<img src="../../libs/wysiwyg/image/icon_underline.png" width="20"  height="20" alt="" />',
					hotkey: 'u',
					showstatic: false,
					showselection: true
				},
				alignleft: {
					title: 'Left',
					//image: '\uf036', // <img src="path/to/image.png" width="16" height="16" alt="" />
					image:'<img src="../../libs/wysiwyg/image/icon_left.png" width="20"  height="20" alt="" />',
					showstatic: false,
					showselection: true // wanted on selection
				},
				aligncenter: {
					title: 'Center',
					//image: '\uf037', // <img src="path/to/image.png" width="16" height="16" alt="" />
					image:'<img src="../../libs/wysiwyg/image/icon_center.png" width="20"  height="20" alt="" />',
					showstatic: false,
					showselection: true // wanted on selection
				},
				alignright: {
					title: 'Right',
					//image: '\uf038', // <img src="path/to/image.png" width="16" height="16" alt="" />
					image:'<img src="../../libs/wysiwyg/image/icon_right.png" width="20"  height="20" alt="" />',
					showstatic: false,
					showselection: true // wanted on selection
				},
				alignjustify: {
					title: 'Justify',
					image: '\uf039', // <img src="path/to/image.png" width="16" height="16" alt="" />
					showstatic: false,
					showselection: false // wanted on selection
				},
				removeformat: {
					title: 'Remove format',
					image: '\uf12d', // <img src="path/to/image.png" width="16" height="16" alt="" />
					showstatic: false,
					showselection: false
				}
			},
			// Submit-Button
			submit: {
				title: 'Submit',
				image: '\uf00c' // <img src="path/to/image.png" width="16" height="16" alt="" />
			},
			// Other properties
			dropfileclick: 'Drop image or click',
			placeholderUrl: 'www.example.com',
			maxImageSize: [600, 200]
			/*
					            onImageUpload: function( insert_image ) {
					                            // Used to insert an image without XMLHttpRequest 2
					                            // A bit tricky, because we can't easily upload a file
					                            // via '$.ajax()' on a legacy browser.
					                            // You have to submit the form into to a '<iframe/>' element.
					                            // Call 'insert_image(url)' as soon as the file is online
					                            // and the URL is available.
					                            // Best way to do: http://malsup.com/jquery/form/
					                            // For example:
					                            //$(this).parents('form')
					                            //       .attr('action','/path/to/file')
					                            //       .attr('method','POST')
					                            //       .attr('enctype','multipart/form-data')
					                            //       .ajaxSubmit({
					                            //          success: function(xhrdata,textStatus,jqXHR){
					                            //            var image_url = xhrdata;
					                            //            console.log( 'URL: ' + image_url );
					                            //            insert_image( image_url );
					                            //          }
					                            //        });
					                        },
					            onKeyEnter: function() {
					                            return false; // swallow enter
					                        }
					            */
		})
		.change(function() {
			//if(typeof console != 'undefined')console.log('change');
		})
		.focus(function() {
			//if(typeof console != 'undefined')console.log('focus');
		})
		.blur(function() {
			//if(typeof console != 'undefined')console.log('blur');
		});
	
	});
	
}
$(document).ready(function($) {
	LMTravelDiary.init();
});
//上传图片回填
function uploadFile(obj, type){
	 var files=obj.files;
	 if( window.File && window.FileReader && window.FileList ){
	 	 var loadImageFromFile = function(file){
	 	 	 // Only process image files
                    if( ! file.type.match('image.*') )
                        return;
                    var reader = new FileReader();
                    // Read in the image file as a data URL
                    reader.readAsDataURL( file );
                    reader.onload = function(event) {
                        var dataurl = event.target.result;
                        insert_image_wysiwyg( dataurl, file.name );
                        layer.closeAll();
                    };
                    
	 	 };
	 	 // Add image to editor
        var insert_image_wysiwyg = function( url, filename )
            {
            	var curObj = bookLeft.getElement();
            	var curLast = curObj.lastChild;
        		var html = '<img id="wysiwyg-insert-image" src="" alt=""' + (filename ? ' title="'+filename.replace(/"/,'&quot;')+'"' : '') + ' />';
                bookLeft.insertHTML( html ).closePopup().collapseSelection();
                var $image = $('#wysiwyg-insert-image').removeAttr('id');
                $image.attr('src', url);
            };
            
	 	  for(var i=0; i < files.length; ++i){
	 	  	 loadImageFromFile( files[i] );
	 	  }
	 }
}
//文件上传
function fileUpload(type){
	var radioFile = $('input[name="fileTrans"]').prop('files');
	if(radioFile.length>0){
		var fileType=radioFile[0].type;
		//type=2是音频
		if(type==2){
			if(fileType=="audio/mp3"||fileType=="audio/ogg"||fileType=="audio/mp4"){
				var status=true;//上传处理状态：false失败，true成功
			//上传文件后台处理过程
			//上传成功后执行
				if(status){
					$('.radioPlay').removeClass('glyphicon-signal').addClass('glyphicon-play');
				    layer.closeAll();
				    $('#tipName').html(radioFile[0].name);//显示上传成功的文件名
				    layer.msg('上传成功', {icon: 1});
				}else{
					  //上传失败
					layer.msg('上传文件失败', {icon: 2});	
				}
			}else{
				layer.msg('请上传正确格式音频文件', {icon: 2});
			}
		}
		//视频文件
		if(type==1){
			 layer.closeAll();
			layer.alert("功能未完成");
		}
		
	}
	
};
function showName(obj){
	var file = obj.files;
	if(file.length>0){
		var audioName=file[0].name;
	$('#audioName').html(audioName);
	}
}
//播放音频
function playVid() {
	var audio = $("#MyAudio")[0];
	var status =  $('#radioStatus').val();
	var audioSrc = $('#audioSrc').attr('src');
	if(audioSrc == '' || audioSrc == null){
		layer.msg('No audio file, please upload the file!');
	}else{
		if(status==1){
			audio.play(); 
			$('#radioStatus').val(0);
			$('.radioPlay').removeClass('glyphicon-play').addClass('glyphicon-pause');
		}else{
			audio.pause();
			$('#radioStatus').val(1);
			$('.radioPlay').removeClass('glyphicon-pause').addClass('glyphicon-play');
		}
	}
 }
//重新上传音频
function reupload(){
	var insertAudio='<div class="wysiwyg-toolbar-form" unselectable="on">'+
						'<div class="wysiwyg-browse">Drop file or click'+
							'<input id="radioFile" type="file" name="fileTrans" onchange="showName(this)" draggable="true" style="position: absolute; left: 0px; top: 0px; width: 100%; height: 100%; opacity: 0; cursor: pointer;">'+
						'</div>'+
						'<p id="audioName"></p>'+
						'<div class="btn-div">'+
							'<button type="button" class="insertBtn" id="fileUpload" onclick="fileUpload(2)">File Upload</button>'+
							'</div>'+
						'</div>';
showuploadfile(insertAudio,"重新上传音频文件");	
}


function showuploadfile(content,title){
	layer.open({
	  type: 1,
	  area: ['420px', '220px'], //宽高
	  content: content,
	  title: title
	});	
}

