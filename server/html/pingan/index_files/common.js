var commonPlugin={
    openLayer:function(obj){//显示遮罩弹层
        var $bd=$("body"),
        objH=obj.height(),
        objW=obj.width(),
        bdH = $(document).height(),
        bdW = $(document).width(),
        winH = $(window).height(),
        winW = $(window).width(),
        height = (bdH-winH)>0 ? bdH : winH,
        width = (bdW-winW)>0 ? bdW : winW,
        mode,layer;
        obj.show();
        mode="<div class='mode' style='height:" + height + "px;'></div>";
        layer="<div class='openlayer' style='top:" + (winH-objH)/2 + "px;'></div>";
        $bd.append($(layer)); 
        $bd.append($(mode));    
        $(".openlayer").append(obj);

        //禁止整个页面随当前弹出框滚动
        var st = $(window).scrollTop() > 0 ? -$(window).scrollTop() : 0;
        var lt = (winW-750)/2 > 0 ? (winW-750)/2 : 0 ;
        $bd.css({"position":"fixed","top":st,"left":lt+"px"});

        //点击确认按钮关闭弹窗
        $("body").delegate(".btn-closed", "click", function(event){
            event.stopPropagation();
            $bd.append(obj);
            obj.hide(); 
            $(".mode").remove();
            $(".openlayer").remove();
             //恢复点击之前位置
            $bd.css({"position":"static","top":"none","left":"none"});
            if(st!=0){
                $(window).scrollTop(-st);
            }

        });
    }
}
//百度可以统计按键量
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?5cc92e7a9a37a0546a5bf7d217afb282";
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
      _tag.dcsid="dcs82b9ujitigdu3gaykxw0hn_5p6b";  //dcsid参数用于设置日志记录在哪个文件里
        _tag.DCSext.platform="xxxx";  //平台名字
        var s=_tag.dcsGetIdAsync();
        if(s) 
            dcsReady(s,function(){_tag.dcsCollect()});
        else
            _tag.dcsCollect();
    }
})

