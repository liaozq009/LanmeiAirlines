$( document ).ready(function(){
	var hotelid_raw = $( "#data-id" ).val();
	$.widget("custom.catcomplete", $.ui.autocomplete, {
		_renderMenu: function( ul, items ) {
			var self = this,
			currentCategory = "";
			ul.attr("class", "nav bs-autocomplete-menu");
			ul.attr("style", "overflow:auto");
			ul.attr("style", "height:300px");
			$.each( items, function( index, item ) {
				if ( item.cate != currentCategory ) {
					ul.append("<li class='ui-autocomplete-category ui-category-label' style='line-height:26px; padding-left:3px; background-color:#eee;color: #1f2c5c; font-weight:bold; font-style:bold'>" + item.cate + "</li>" );
					currentCategory = item.cate;
				}
				self._renderItem( ul, item );
			});
		},
	  _resizeMenu: function() {
		    var ul = this.menu.element;
		    ul.outerWidth(Math.min(
		      // Firefox wraps long text (possibly a rounding bug)
		      // so we add 1px to avoid the wrapping (#7513)
		      ul.width("").outerWidth() + 1,
		      this.element.outerWidth()
		    ));
		  }
	});

	$.ui.autocomplete.prototype._renderItem = function( ul, item){
		if(item.label !=null){
		  var term = this.term.split(' ').join('|');
		  var re = new RegExp("(" + term + ")", "gi") ;
		  var t = item.label.replace(re,"<strong>$1</strong>");
		  var t2 = item.label.replace(re,"$1");
		  
		  return $( "<li style='background-color:white'></li>" )
		     .data( "item.autocomplete", item )
		     .append( "<a title='"+ t2 +"'>" + t + "</a>" )
		     .appendTo( ul );
		}     
	};
	$("#txtHotelID").catcomplete({ //autocomplete
		
		search: function() {
			var term = this.value;
			if ( term.length < 3 ) {
				return false;
			}
			$('.hotels-loading').show();
			$("#txtHotelID").addClass('complete_loading');
		},
		source: function (request, response) {
			$.ajax({
				url: "http://hotels.lanmeiairlines.com/soap/auto-complete-general",
				dataType: "json",
				data: {
					term: request.term
				},
				success: function( data ) {
					$('.hotels-loading').hide();
					$("#txtHotelID").removeClass('complete_loading');
					response( $.map( data, function( item ) {
						return {
							txt: item.value,
							label: item.value,
							id: item.id,
							cate:item.cate
						}
					}));
				}
			});
		},
		minLength: 3,
		select: function(event, ui) {
			$( "#txtHotelID" ).val(ui.item.txt);
			$( "#data-id" ).val( ui.item.id );
			$( "#data-cate" ).val( ui.item.cate );
			
			if($('#sForm_Details').length > 0) // check form existed
			{
				if(ui.item.cate !='Hotels'){ 
					$('#sForm_Details').attr("action", "/hotels/search/");
					$('#button_search_details').attr("onclick", "doSubmit('sForm_Details')");
							
				}
				else {
					if (ui.item.id == hotelid_raw){
						$('#sForm_Details').attr("action", "");
						$('#button_search_details').attr("onclick", "loadRoomAvailable()");
					}
					else {
						$('#sForm_Details').attr("action", "/hotels/search/");
						$('#button_search_details').attr("onclick", "doSubmit('sForm_Details')");
					}
				}
			}
			
			return false;
		}
	});
	
	$("#txtHotelID").click(
		function(){
			$("#tempName").val($(this).val());
			$(this).val('');
		}
	);
	
	$("#tempName").val("");
	//checkLoadingProcess();
});

function isTurnBackText(){
	if($("#txtHotelID").val() == "")
		$("#txtHotelID").val($("#tempName").val());
}

function setChildAge(lang_arr)
{
	$( "#child_dialog" ).empty();
	$( "#child_dialog" ).append("<div>" + lang_arr.child_age_description + "</div><br>");
	var numChild = $( "#cboChild option:selected" ).val(); //alert(numChild);
	if(numChild > 0){
		var numRoom = $( "#cboRoom option:selected" ).val();
		var htmlChildAge = "<table style='width:100%'>";
		for (i = 1; i <= numChild*numRoom; i++) {
			htmlChildAge += "<tr>";
				htmlChildAge += "<td style='padding-bottom: 10px'><b>"+lang_arr.child_text+" "+i+"</b></td>";
				htmlChildAge += "<td style='padding-bottom: 10px'><select class='form-control' name='childage_"+i+"' id='childage_"+i+"'>"+$("#divSetChildAge").html()+"</select></td>";
			htmlChildAge += "</tr>";
		}

		htmlChildAge += "</table>";
		$( "#child_dialog" ).append(htmlChildAge);
		
		for (i = 1; i <= numChild*numRoom; i++) {
			if(arrChildAge[i] != 0)
				$("#childage_"+i+" [value="+arrChildAge[i-1]+"]").prop('selected', true);
		}
		
		var button_child_for_dialog = {};
		button_child_for_dialog[lang_arr.child_age_confirm] = function(){
			arrChildAge = []; //clear all
			for (i = 1; i <= numChild*numRoom; i++) {
				arrChildAge.push($( "#childage_"+i+" option:selected" ).val());
			}
			if(checkChildAge(arrChildAge) == false){
				alert(lang_arr.please_select_child_age);
				return;
			}
			//build childage html array
			$( "#childAgeList" ).empty();
			var htmlArr = "";
			for(i=0; i < arrChildAge.length; i++)
			{
				htmlArr += "<input type='hidden' name='childage[]' value='"+arrChildAge[i]+"'/>";
			}
			$( "#childAgeList" ).append(htmlArr);
			//end build
			
			
			$( this ).dialog( "close" );
		};
		button_child_for_dialog[lang_arr.child_age_no_child] = function(){
			$( "#cboChild" ).val("0");
			arrChildAge = []; //clear all
			$( this ).dialog( "close" );
		};
		
		$( "#child_dialog" ).dialog({
			width:500,
			modal: true,
			zIndex: 2000,
			buttons: button_child_for_dialog
		});
		
		$(".ui-dialog-buttonpane button").addClass("btn btn-primary");
	}
	else{
		arrChildAge = [];
		$( "#childAgeList" ).empty();
	}
}

function checkChildAge(childAgeArray)
{
	var check = true;
	for(i=0; i < childAgeArray.length; i++)
	{
		if(arrChildAge[i] == 'none')
			check = false;
	}
	return check;
}

function getDay(){
	var bDate = $("#datefrom").datepicker('getDate');
	var eDate = $("#dateto").datepicker('getDate');
	//$("#lbDateFrom").text(daysArray[bDate.getDay()]);
	//$("#lbDateto").text(daysArray[eDate.getDay()]);
}

function selectRoom() {
    var noOfRoom = $('#cboRoom').find(":selected").val();
    if (noOfRoom == 0){
		$('#showPopupRoom').hide();
	}
    else
    	$("#cboRoom").css('background-color', 'white');

    for (i = 1; i <= 5; i++) {
        if (i <= noOfRoom) {
            $('#room_row_' + i).show();
            $('#showPopupRoom').show();
        } else {
            $('#room_row_' + i).hide();
        }
    }
}

function setChildAge(k) {
    var noOfChildren = $("#number_of_children_" + k).find(":selected").val();
    for (i = 1; i < 4; i++) {
        if (i <= noOfChildren)
            $("#child_age_" + k + "_" + i).removeClass('hide_select');
        else
            $("#child_age_" + k + "_" + i).addClass('hide_select');
    }

    if(noOfChildren > 0){
    	$("#ChildAge_" + k).removeClass('hide_select');
    	$("#lbChildAge_" + k).removeClass('hide_select');
    }
    else{
    	$("#ChildAge_" + k).addClass('hide_select');
    	$("#lbChildAge_" + k).addClass('hide_select');
    }
}

function doSubmit(form_id)
{
	var bDate = $("#datefrom").datepicker('getDate');
	var eDate = $("#dateto").datepicker('getDate');
	
	var isValid = true;
	if($("#txtHotelID").val() == ""){
		//$("#errorMsg").html("<div style='margin: 0 3px' class='bgmess'>"+_lang+"</div>");
		//return;
		$("#txtHotelID").css('background-color', '#f2dede');
		isValid=false;
	}
	
	//if($('#cboRoom').find(":selected").val() == 0){
	//	$("#cboRoom").css('background-color', '#f2dede');
	//	isValid=false;
	//}
	
	if ((eDate-bDate)/86400000>14)
	{
		//$("#errorMsg").html("<div style='margin: 0 3px' class='bgmess'>Please contact us if your stay is more than 14 days.</div>");
		//return;
		isValid=false;
	}
	
	if(!isValid)
		return;
	else{
		if(form_id=='sForm_Details')
			$("#sForm_Details").submit();
		else
			$("#sForm").submit();
	}
}

function explainRooms()
{
	//var options = {};
	//$("#"+$(item).attr('id')).toggle( "blind", options, 500 );
	$(".expand_btn").click(function(){
		var clicked_btn = $(this); 
		$(this).parent().prev().toggle( "blind", {}, 500, 
			function(){
				if(clicked_btn.text() == ">> More Room Options"){
					clicked_btn.text(">> Less Room Options");
				}else{
					clicked_btn.text(">> More Room Options");
				}		
			}
		);
	});
}

listData = function(URL, listId, currentPage, itemPerPage){
	//var postData = $(searchFormId).serialize();
	var st='<div id="loading" style="width: 100%; text-align: center;">Loading data... please wait for a moment...<br><img alt="" src="http://vleisure.com/images/admin/loading.gif" ></div>';
	//$('#loading').show();
	$(listId).html(st);
	$.ajax({
		type: "POST",
		url: URL,
		data: "&itemPerPage="+itemPerPage+"&page="+currentPage,
		success: function(result,status,xResponse) {
			$(listId).html(result);
			//$('#loading').hide();
			}
		});

}

/**
 * 搜索
 */
$("#hotel-search").click(function () {
	var dataId = $("#data-id").val();
	dataId = dataId.replace(/\s+/g,"");
	
	if (dataId == null || dataId == undefined || dataId == "") {
		layer.tips("Destination cannot be empty!", $("#txtHotelID"), {
			tips : [ 3, '#8ec060' ],
			time : 3000
		});
		return;
	}
	
    $("#h-content-form").submit();
});
    
    
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
    			$('.hotel-content .viewSchedules').css('marginTop',70);
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
    
    /**
     * 时间
     */
    
    function getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate()+1;
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        $("#h-timeFrom").val(currentdate);
        $("#h-timeTo").val(currentdate);
    };
// getNowFormatDate(); //放到LanmeiAirlines.js2018-02-05