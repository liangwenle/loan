$(function() {
	inv.init();
});

var inv = {
	init : function() {
		inv.bind();
		if (inv.getUrlParams("ActivityCode")) {
			$('#netCampaignCode').val(inv.getUrlParams("ActivityCode"));
		}
		
		if (inv.getUrlParams("WT.mc_id")) {
			$('#mediaSource').val(inv.getUrlParams("WT.mc_id"));
		}
		
		common.getLpPage();
		common.getInnerMedia();
		//该字段用来判断返成功页面返回首页的链接
		inv.setCookie("redirectUrl", "sms", "/");
		inv.setCookie("source", "sms", "/");
		
		//城市接收初始化
		var city = inv.getUrlParams("cityCode");
		if(city != "" && city != null && city != "UNDEFINED"){
			var cityCode = base64_decode(city);
			$("#city").val(cityCode);
		}
		
		var ennameAndTel=inv.getUrlParams("nameAndTel");
		if(ennameAndTel){
			var nameAndTel=base64_decode(ennameAndTel);
			var userInfo=nameAndTel.split("|");
			if(userInfo.length>1){
				//$("#name").val(window.decodeURIComponent(userInfo[0]));
				$("#phone").val(userInfo[1]);
			}
		}
		inv.showImage();
	},
	bind : function() {
		
		$('#sumbitBtn').click(function() {
			inv.submitForm();
		});
		
		$('#accelerateApply').click(function() {
			inv.accelerateApplyForm();
		});

		$("#name").bind("focus", function() {
			$(".error").hide();
		}).bind("blur", function() {
			inv.checkName();
		});

		$("#phone").bind("focus", function() {
			$(".error").hide();
		}).bind("blur", function() {
			inv.checkMobile();
		});
		
		$("#smsCode").bind("focus", function() {
			$(".error").hide();
		}).bind("blur", function() {
			inv.checkSmsCode();
		});
		
		$('#reSend').click(function() {
			inv.sendSms();
		});

		$("form").submit(function(e) {
			e.preventDefault();
			return false;
		});

	},
	submitForm : function(event) {
		if (!inv.checkForm()) {
			return false;
		} else {
			if($("#sumbitBtn").hasClass("active")){
				return
			};
			$("#sumbitBtn").addClass("active");
			var marketfeedbackcode = inv.getUrlParams("marketFeedbackCode");
			var params = {
				name : $('#name').val().replace(/[ ]/g, ""),
				mobile : $('#phone').val(),
				campaignName : $('#campaignName').val(),
				campaignCode : $('#campaignCode').val(),
				pageType : $('#pageType').val(),
				isDirectForm : $('#isDirectForm').val(),
				formCode : $('#formCode').val(),
				smsAuthor : $('#smsAuthor').val(),
				lpPage : $('#lpPage').val(),
				innerMedia : $('#innerMedia').val(),
				mediaSourceId : $('#mediaSource').val(),
				custSrc : $('#custSrc').val(),
				verifyCode : $('#smsCode').val(),
				marketfeedbackcode : marketfeedbackcode,
				//f1 : "网络获客名单",
				netCampaignCode : $('#netCampaignCode').val(),
				city : $('#city').val(),
				saleMode: "STEP02" 
			};

			$.ajax({
				type : 'POST',
				url : '/do/rsploan/smsFirstStep',
				data : params,
				dataType : 'json',
				success : function(response) {
					if(response!=null && response.error!=null){
						$("#errorMsg").html(response.error.message);
						commonPlugin.openLayer($(".popup"));
						$("#sumbitBtn").removeClass("active");
					}else{
					   try{
				           PAReport.setEventReport("jinfuapply");// 事件上报
				       }catch(e){}
						window.location.href = "../microWebsite/dksq_result.html?flowId="+ response.flowId;
					}
				}
			});
			return;
		}
	},
	accelerateApplyForm : function(event) {
		if (!inv.checkForm()) {
			return false;
		} else {
			if($("#accelerateApply").hasClass("active")){
				return
			};
			$("#accelerateApply").addClass("active");
			var marketfeedbackcode = inv.getUrlParams("marketFeedbackCode");
			var params = {
				name : $('#name').val().replace(/[ ]/g, ""),
				mobile : $('#phone').val(),
				campaignName : $('#campaignName').val(),
				campaignCode : $('#campaignCode').val(),
				pageType : $('#pageType').val(),
				isDirectForm : $('#isDirectForm').val(),
				formCode : $('#formCode').val(),
				smsAuthor : $('#smsAuthor').val(),
				lpPage : $('#lpPage').val(),
				innerMedia : $('#innerMedia').val(),
				mediaSourceId : $('#mediaSource').val(),
				custSrc : $('#custSrc').val(),
				verifyCode : $('#smsCode').val(),
				marketfeedbackcode : marketfeedbackcode,
				netCampaignCode : $('#netCampaignCode').val(),
				city : $('#city').val()
			};

			$.ajax({
				type : 'POST',
				url : '/do/rsploan/smsFirstStep',
				data : params,
				dataType : 'json',
				success : function(response) {
					if(response!=null && response.error!=null){
						$("#errorMsg").html(response.error.message);
						commonPlugin.openLayer($(".popup"));
						$("#accelerateApply").removeClass("active");
					}else{
						try{
					           PAReport.setEventReport("jinfuapply");// 事件上报
					       }catch(e){}
						window.location.href = "../wap/newstep2.html?flowId="+ response.flowId;
					}
				}
			});
			return;
		}
	},
	checkName : function() {
		var nameVal = $("#name").val();
		if (!nameVal) {
			$(".error").show();
			$(".error").html("<i></i>&nbsp;请输入您的姓名");
			return false;
		} else if (nameVal && !(/^([\u4e00-\u9fa5\s]{2}|[a-zA-Z]{4})([\u4e00-\u9fa5\s]{0,18}|[. ]{0,36}|[• ]{0,36}|[a-zA-Z]{0,36})?$/.test(nameVal))) {
			$(".error").show();
			$(".error").html("<i></i>&nbsp;请输入您的姓名");
			return false;
		} else if (nameVal == '您的姓名' || nameVal == '不详' || nameVal == '不祥'
				|| nameVal == '未知' || nameVal == '不知道' || nameVal == '姓名'
				|| nameVal.indexOf('测试') > -1 || nameVal.indexOf('test') > -1) {
			$(".error").show();
			$(".error").html("<i></i>&nbsp;请输入您的姓名");
			return false;
		} else {
			return true;
		}
	},
	checkMobile : function() {
		var phoneVal = $("#phone").val();
		if (!phoneVal) {
			$(".error").show();
			$(".error").html("<i></i>&nbsp;请输入正确的手机号");
			return false;
		} else if (!/^(13|14|15|17|18)[0-9]{1}[0-9]{4}[0-9]{4}$/.test(phoneVal)) {
			$(".error").show();
			$(".error").html("<i></i>&nbsp;请输入正确的手机号");
			return false;
		} else {
			var repeat = 1;
			var seque = 1;
			for (var i = 1; i < phoneVal.length; i++) {
				if (phoneVal.charAt(i) == phoneVal.charAt(i - 1)) {
					repeat++;
					if (repeat >= 5) {
						$(".error").show();
						$(".error").html("<i></i>&nbsp;请输入正确的手机号");
						return false;
					}
				} else {
					repeat = 1;
				}
				if (phoneVal.charAt(i) - phoneVal.charAt(i - 1) == '1') {
					seque++;
					if (seque >= 6) {
						$(".error").show();
						$(".error").html("<i></i>&nbsp;请输入正确的手机号");
						return false;
					}
				} else if (phoneVal.charAt(i) - phoneVal.charAt(i - 1) == '-1') {
					seque2++;
					if (seque2 >= 6) {
						$(".error").show();
						$(".error").html("<i></i>&nbsp;请输入正确的手机号");
						return false;
					}
				} else {
					seque = 1;
					seque2 = 1;
				}
			}
			return true;
		}
	},
	checkSmsCode : function() {
		var smsCode = $("#smsCode").val();
		if(!smsCode){
			$(".error").show();
			$(".error").html("<i></i>&nbsp;请输入短信验证码");
			return false;
		}else if(smsCode.length!=6){
			$(".error").show();
			$(".error").html("<i></i>&nbsp;输入验证码不符合规范");
			return false;
		}else if(!/^\d{6}$/.test(smsCode)){
			$(".error").show();
			$(".error").html("<i></i>&nbsp;输入验证码不符合规范");
			return false;
		}
		return true;
	},
	checkImgCode : function() {
		var imgCode = $("#imgCodes").val();
		if(!imgCode){
			$(".error").show();
			$(".error").html("<i></i>&nbsp;请输入图片验证码");
			return false;
		}else if(imgCode.length!=4){
			$(".error").show();
			$(".error").html("<i></i>&nbsp;输入验证码不符合规范");
			return false;
		}
		return true;
	},
	checkForm : function() {
		if (!inv.checkName()) {
			return false;
		}
		if (!inv.checkMobile()) {
			return false;
		}
		if (!inv.checkSmsCode()) {
			return false;
		}
		if (!inv.checkImgCode()) {
			return false;
		}
		return true;
	},
	// 获取URL参数
	getUrlParams : function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null)
			return unescape(r[2]);
		return null;
	},
	//验证码发送成功处理
	sendVerifyCodeSucc : function(){
		$("#reSend").html("59S");
		var that = $("#reSend"), time = 58, interval;
		interval = setInterval(function(){
			if(time < 1){
				$("#reSend").removeClass("active");
				that.html("重新发送");
				clearInterval(interval);
			}else{
				that.text(time-- +"S");
			}
		}, 1000);
	},
	/**
	 * 发送短信验证码
	 */
	sendSms : function() {
		if($("#reSend").hasClass("active") || !inv.checkImgCode()){
			return
		};
		if(inv.checkMobile()){
			$("#reSend").addClass("active");
			var params = {
				mobile : $('#phone').val(),
				randCode : $('#imgCodes').val()
			}
			$.ajax({
				type : 'POST',
				data : params,
				url : '/do/rsploan/sendSmsMassCode',
				dataType : 'json',
				success : function(response) {
					if(response!=null && response.error!=null){
						if(response.error.errorCode=='101'){
							$("#errorMsg").html(response.error.message);
							commonPlugin.openLayer($(".popup"));
							$("#reSend").html("重新发送");
							$("#reSend").removeClass("active");
						}else{
							//系统异常
							$("#errorMsg").html(response.error.message);
							commonPlugin.openLayer($(".popup"));
							$("#reSend").html("重新发送");
							$("#reSend").removeClass("active");
						}
					}else{
						//验证码发送成功
						inv.sendVerifyCodeSucc();
						inv.getImgCode('imgCode');
					}
				}
			});
		}
	},
	setCookie : function(name, value, path) {
	    var d = new Date();
	    d.setTime(d.getTime() + (60 * 60 * 1000));
	    expires = d.toGMTString();
	    
	    value=escape(value);
	    document.cookie = name + "=" + value + ";"
	        + (expires != -1 ? " expires=" + expires + ";" : "")
	        + (path ? "path=" + path : "");
	},
	showImage: function () {
        var mediaSource = $('#mediaSource').val();

        if (/^ZTXYD-BAIDTUIGUANG-wifi/.test(mediaSource)) {
            $(".erweicode").attr("src", "app_img/qrcode/1056.jpg");
        }
        else if (/^ZTXYD-BAIDTUIGUANG-txt/.test(mediaSource)) {
            $(".erweicode").attr("src", "app_img/qrcode/1057.jpg");
        }
        else if (/^ZTXYD-BAIDTUIGUANG-zyb/.test(mediaSource)) {
            $(".erweicode").attr("src", "app_img/qrcode/1058.jpg");
        }
        else if (/^ZTXYD-BAIDTUIGUANG-haocz/.test(mediaSource)) {
            $(".erweicode").attr("src", "app_img/qrcode/1059.jpg");
        }
        else if (/^ZTXYD-SMSH5-/.test(mediaSource)) {
        	$("#IbButton").attr("href","tel:4000055136");
        	$(".gw_phone").html("点击拨打&nbsp;400-005-5136");
            $(".erweicode").attr("src", "app_img/qrcode/1060.jpg");
        }
        else if (/^ZTXYD-SHUMAITONG-wap/.test(mediaSource)) {
            $(".erweicode").attr("src", "app_img/qrcode/1061.jpg");
        }
        else if (/^ZTXYD-SZDIANXIN-pc/.test(mediaSource)) {
            $(".erweicode").attr("src", "app_img/qrcode/1062.jpg");
        }
        else if (/^ZTXYD-SZDIANXIN-wap/.test(mediaSource)) {
            $(".erweicode").attr("src", "app_img/qrcode/1063.jpg");
        }
        else if (/^ZTXYD-BAIDTUIGUANG-waibu/.test(mediaSource)) {
            $(".erweicode").attr("src", "app_img/qrcode/1065.jpg");
        }
        else if (/^ZTXYD-SZJIEJIKA-/.test(mediaSource)) {
            $(".erweicode").attr("src", "app_img/qrcode/10042.jpg");
        }
        else if (/^ZTXYD-SZWANLIT-/.test(mediaSource)) {
            $(".erweicode").attr("src", "app_img/qrcode/10044.jpg");
        }
        else if (/^ZTXYD-HUIZHOUSMS-/.test(mediaSource)) {
            $(".erweicode").attr("src", "app_img/qrcode/10046.jpg");
        }
        else if (/^ZTXYD-DIANXIN-/.test(mediaSource)) {
            $(".erweicode").attr("src", "app_img/qrcode/10047.jpg");
        }
        else if (/^ZTXYD-NBEDM-/.test(mediaSource)) {
        	$(".erweicode").attr("src", "app_img/qrcode/10418.jpg");
        }
        else if (/^ZTXYD-PECPEDM-/.test(mediaSource)) {
            $(".erweicode").attr("src", "app_img/qrcode/10582.jpg");
        }
        else if (/^ZTXYD-NBCPS-/.test(mediaSource)) {
        	$(".erweicode").attr("src", "./index_files/img/10045.jpg");
        }
        
        if("ZTXYD-NBCPS-LQ" === mediaSource){
        	$("#IbButton").attr("href","tel:4000055136");
        	$(".gw_phone").html("点击拨打&nbsp;400-005-5136");
        	$("#bannerImg").attr("src", "app_img/banner-LQ.jpg");
        }else if("ZTXYD-NBCPS-LQA" === mediaSource){
        	$("#IbButton").attr("href","tel:4000055136");
        	$(".gw_phone").html("点击拨打&nbsp;400-005-5136");
        	$("#bannerImg").attr("src", "app_img/banner-LQA.jpg");
        }
        
        inv.setCookie("mediaSourceCode",mediaSource, "/");
    },
    getImgCode: function (elementId) {
    	$("#"+elementId).attr("src","/paic/common/vcode.do?t="+Date());
    }
}
