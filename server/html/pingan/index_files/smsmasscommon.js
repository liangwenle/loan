var common = {
		clearTime:function(){
			clearTimeout(window.toTimeoutPageId);
			clearTimeout(window.flowIntervalId);
		},
		
		sessionTimeoutStart : function(flowid,notFirstTime,source){
			window.toTimeoutPageId = setTimeout(function(){//启动会话超时计时，并保存该计时ID,30分钟 30*60*1000=1800000
				var wt = common.getMediaSouce();
			        	if(wt != null){
			        		window.location.href = 'huoke.html';
			        	} else {
			        		window.location.href = 'huoke.html';
			        	}
			},1800000);
			if(!notFirstTime){
				//启动保持流程计时器
				common.keepFlow(flowid,source)
				//用户点击了页面，清除两个之前的计时器，重新计时
				$("body").bind("click",function(){
					clearTimeout(toTimeoutPageId);
					//clearTimeout(tipToUserTimeout);
					common.sessionTimeoutStart(flowid,true);
				});
			}
			
		},
		/**
		*	保持流程，每30秒发一次
		*/
		keepFlow : function(flowid){
			if(flowid!=''&&flowid!=null){
				window.flowIntervalId = setInterval(function(){
					$.ajax({
						url : "/do/keep-flow-ctx.do?flowId="+flowid,
						dataType:"json",
						success:function(data){
							if(data.resultCode!='0'){
								 clearInterval(flowIntervalId);
							}
						},
						error:function(){
							window.location.href = 'huoke.html';
						}
					});
				},30000);
			}
		},
		getMediaSouceUrl : function(){
			var theUrl = window.location.href;
            var paramIndex = theUrl.indexOf("WT.mc_id=");
            var mediaSource;
            if(paramIndex != -1) {
                  mediaSource = theUrl.substring(paramIndex);
                  var pIndex = mediaSource.indexOf("&");
                  if(pIndex != -1) {
                           mediaSource = mediaSource.substring(0,pIndex);
                  }
                  mediaSource = mediaSource.substring(9);
                  mediaSource = common.unhtml(mediaSource,null);
            }else {
                  mediaSource = "";
            }


            // 若cookie中为空，则默认为 'CXX-ZHITONGSEO-'
            if(!mediaSource || mediaSource =='direct' || mediaSource=='null') {
                  mediaSource = 'CXX-ZHITONGSEO-';
            }
		
			return mediaSource;
		},
		getMediaSouce : function() {
            // 先从mc_id中取
            var theUrl = window.location.href;
            var paramIndex = theUrl.indexOf("WT.mc_id=");
            var mediaSource;
            if(paramIndex != -1) {
                  mediaSource = theUrl.substring(paramIndex);
                  var pIndex = mediaSource.indexOf("&");
                  if(pIndex != -1) {
                           mediaSource = mediaSource.substring(0,pIndex);
                  }
                  mediaSource = mediaSource.substring(9);
                  mediaSource = common.unhtml(mediaSource,null);
            }else {
                  mediaSource = "";
            }


            // 若cookie中为空，则默认为 'CXX-ZHITONGSEO-'
            if(!mediaSource || mediaSource =='direct' || mediaSource=='null') {
                  mediaSource = 'CXX-ZHITONGSEO-';
            }
            $('#mediaSource').val(mediaSource);
        },
        
        getInnerMedia : function() {
            var innerMedia = this.getCookie('inner_media');
            innerMedia = decodeURI(innerMedia);

            // 若cookie中为空，则默认为 'pingan'
            if(!innerMedia) {
                  innerMedia = 'pingan';
            }

            $('#innerMedia').val(innerMedia);          
        },
        getLpPage : function() {
            var localurl = window.document.referrer;
            if(localurl.indexOf("?") > 0) {
                localurl = localurl.substring(0, localurl.indexOf("?"));
            }
            if(localurl.length > 150) {
                  localurl = localurl.substring(0, 150);
            }
            $('#lpPage').val(localurl);
        },
         
        getCookie : function(name) { 
        	var strCookie = document.cookie;
        	var arrCookie = strCookie.split(";");

        	for ( var i = 0; i < arrCookie.length; i++) {
        		var arr = arrCookie[i].split("=");
        		if ($.trim(arr[0]) == name)
        			return $.trim(arr[1]);
        	}
           return "";
        },
        getWeChatId: function(){
        	 // 先从mc_id中取
            var url = window.location.href;
            var paramIndex = url.indexOf("weChatId=");
            var weChatId;
            if(paramIndex != -1) {
                  weChatId = url.substring(paramIndex);
                  var pIndex = weChatId.indexOf("&");
                  if(pIndex != -1) {
                           weChatId = weChatId.substring(0,pIndex);
                  }
                  weChatId = weChatId.substring(9);
            }else {
                  weChatId = "";
            }
            return weChatId;
        },
        phoneVerif:function(phone, b){
			var phoneVal = phone.val(), sendCode = $("#sendCode");
			var repeat = 1;
			var seque = 1;
			for ( var i = 1; i < phoneVal.length; i++) {
				if (phoneVal.charAt(i) == phoneVal.charAt(i - 1)) {
						repeat++;
						if (repeat >= 5) {
							break;
						}
				} else {
						repeat = 1;
				}
				if (phoneVal.charAt(i)- phoneVal.charAt(i - 1) == '1') {
						seque++;
						if (seque >= 6) {
							break;
						}
				} else {
						seque = 1;
				}
			}
			if(!phoneVal){
				common.showError(phone, "请输入您的手机号码", b);
				return false;
			}else if(phoneVal && !/^(13|14|15|17|18)[0-9]{1}[0-9]{4}[0-9]{4}$/.test(phoneVal)){
				common.showError(phone, "手机号码格式有误！", b);
				return false;
			}else if(phoneVal && (repeat>='5'||seque>='6')){
				common.showError(phone, "手机号码不合规范！", b);
				return false;
			}else{
				sendCode.addClass("active");
				$(".error").css("display","none");
				return true;
			}
		},
		nameVerif : function(name, b){
			var nameVal = name.val();
			if(!nameVal){
				common.showError(name, "请输入您的姓名", b);
				return false;
			}else if(nameVal && !/^([\u4e00-\u9fa5\s]{2}|[a-zA-Z]{4})([\u4e00-\u9fa5\s]{0,18}|[. ]{0,36}|[• ]{0,36}|[a-zA-Z]{0,36})*$/.test(nameVal)){
				common.showError(name, "姓名不符合规范！", b);
				return false;
			}else if (nameVal == '不详' || nameVal == '不祥'|| nameVal == '未知'|| nameVal == '不知道'|| nameVal == '姓名'|| nameVal.indexOf('测试') > -1|| nameVal.indexOf('test') > -1){
				common.showError(name, "姓名不符合规范！", b);
				return false;
			}else{
				$(".error").css("display","none");
				return true;
			}
		},
		
		showError:function(target, str, b){
			alert(str);
		},
		unhtml :function(str, reg) {
			if(str){
		         return str ? str.replace(reg || /[&<">'](?:(amp|lt|quot|gt|#39|nbsp);)?/g, function (a, b) {
		                   if (b) {return a;} 
		                   else {
		                            return {
		                                     '<':'&lt;',
		                                     '&':'&amp;',
		                                     '"':'&quot;',
		                                     '>':'&gt;',
		                                     "'":'&#39;'
		                            }[a]
		                   }
		         }) : '';
			}
		}

}
//百度可以统计按键量
var _hmt = _hmt || [];
(function() {
	var hm = document.createElement("script");
	hm.src = "//hm.baidu.com/hm.js?1e485472a72526b84c29dbd0ce5066f7";
	var s = document.getElementsByTagName("script")[0]; 
	s.parentNode.insertBefore(hm, s);
})();

//wap版webtrends代码
function loadWTScript(a, b) {
	var c = document.createElement("script");
	c.type = "text/javascript",
	c.async = !0, c.id='wtjs',
	c.src = a,
	dcsReady(c, b),
	document.getElementsByTagName("head")[0].appendChild(c)
}
function dcsReady(a, b) {
	a.readyState ? a.onreadystatechange = function() { ("loaded" == a.readyState || "complete" == a.readyState) && (a.onreadystatechange = null, b())
	}: a.onload = function() {
		b()
	}
} 
if(document.getElementById("wtjs")==null)
loadWTScript(window.location.protocol.indexOf('https:')==0?'https://pa-ssl.pingan.com/app_js/sdc/prd/sdc9_m.js':'http://www.pingan.com/app_js/sdc/prd/sdc9_m.js', function(){ 
    if (typeof(_tag) != "undefined"){
      _tag.dcsid="dcs5w0txb10000wocrvqy1nqm_6n1p";  //dcsid参数用于设置日志记录在哪个文件里
        _tag.DCSext.platform="xxxx";  //平台名字
        var s=_tag.dcsGetIdAsync();
        if(s) 
            dcsReady(s,function(){_tag.dcsCollect()});
        else
            _tag.dcsCollect();
    }
})