!function(e){function t(o){if(n[o])return n[o].exports;var i=n[o]={exports:{},id:o,loaded:!1};return e[o].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){var o=n(12),i=n(8),r=n(3);n(6),n(7),$(function(){var e=i.val("pltId"),t=o.get(r.app),n=t?JSON.parse(decodeURIComponent(t)):{},a=n.zyData||{},s=a.zyUsers||{},c=a.currUser;e&&$(".navigator").children("#back").tap(function(e){e.preventDefault(),history.go(-1)}).end().show();var l=$(".alert-wrap.no-loggin");l.bindTouchHandler(".confirm",function(e){e.preventDefault(),l.close()}),$(".account").tap(function(e){var t=$(this);t.is(".selected")||($(".account.selected").removeClass("selected"),t.addClass("selected"))}),$(".btn-add").tap(function(t){t.preventDefault(),location.href="hsp_sign_in?pltId="+e});var d=null,u=$(".btn.btn-switch");u.tap(function(t){t.preventDefault();var i=$(".account.selected"),s=i.data("accountInfo");if(s&&!d){var c={hospitalCode:r.HSPCODE,patientId:s.zyFlow,idNo:s.idnum};d=$.ajax({url:r.GetDataURL,type:"get",data:{mName:"getUserZyInfo",pContent:JSON.stringify(c)},beforeSend:function(){u.addClass("submiting").text("切换中...")},complete:function(t,i){u.removeClass("submiting").text("切换"),d=null;var c=t.responseText?t.responseText.trim():"";if(""===c||r.rhtml.test(c))"success"==i?alert(r.GET_DATA_ERROR):"error"==i&&alert(r.NET_ERROR);else{var p=JSON.parse(c);"1"!==p.rspCode?l.open():(a.currUser=s.patientId,n.zyData=a,o.add(r.app,encodeURIComponent(JSON.stringify(n)),{expires:90}),location.href="hsp_home?pltId="+e)}}})}});var p=$(".account.template").clone(!0).removeClass("template"),f=$(".accounts");for(var h in s){var g=s[h],m=p.clone(!0);m.find(".name").text(g.name).end().find(".idnum").text(g.idnum).end().toggleClass("selected",c==g.patientId).data("accountInfo",g).appendTo(f)}})},function(e,t){String.prototype.trim||(String.prototype.trim=function(){return this.replace(/(^\s*)|(\s*$)/g,"")}),e.exports={defaults:{},extend:function(){for(var e=0,t={};e<arguments.length;e++){var n=arguments[e];for(var o in n)t[o]=n[o]}return t},cookie:function(e,t,n){if(void 0!==t){if(e.match(/\W/))throw new Error("characters out bounds of [0-9a-zA-Z_] are illegal");var n=n||this.defaults;if("number"==typeof n.expires){var o=new Date;return o.setTime(+o+864e5*n.expires),document.cookie=[e,"=",t,n.expires?"; expires="+o.toGMTString():"",n.path?"; path="+n.path:"",n.domain?"; domain="+n.domain:"",n.secure?"; secure":""].join("")}}for(var i=document.cookie,r=i.split(";"),a=0,s=r.length;s>a;a++){var c=r[a].trim(),l=c.indexOf("=");if(c.slice(0,l)===e)return c.slice(l+1)}return""},add:function(e,t,n){this.cookie(e,t,n)},get:function(e){return this.cookie(e)},remove:function(e,t){this.cookie(e,"invalid",this.extend(t,{expires:-1}))},removeAll:function(e){for(var t=document.cookie,n=t.split(";"),o=0,i=n.length;i>o;o++){var r=n[o].split("=")[0].trim();this.remove(r,e)}}}},,function(e,t,n){var o=n(4),i={app:"glwx",pltId:"03",productId:"010",version:"1.00.00",wxAppId:"wx97e1952c1a0281a4",GetDataURL:location.origin+"/support/get_data",appColumnsMap:{"001":{cols:[{nodeId:225,level:1,title:"健康科普",thumbnail_path:"/assets/glwx/img/thumbnail.png"},{nodeId:229,level:1,title:"营养养生",thumbnail_path:"/assets/glwx/img/thumbnail.png"},{nodeId:230,level:1,title:"通知公告",thumbnail_path:"/assets/glwx/img/thumbnail.png"}],style_extensions:"condensed color-inverse",article_based:!0,article_cols:[{nodeId:238,bRecm:!0,style_extensions:"float first-stressed"},{nodeId:239}]},"007":{cols:[{nodeId:93,level:1,title:"医院动态"},{nodeId:94,level:1,title:"学科动态"},{nodeId:89,level:1,title:"健康科普"},{nodeId:90,level:1,title:"媒体报道"}],style_extensions:"first-stressed"}},HSPCODE:"23101",HSPNAME:"南京市鼓楼医院",DEFAULT_MAX_INTRO_LENGTH:25,MAX_SEARCH_TIMES:10,DEFAULT_HOS_LOGO_IMG_SRC:"/assets/gcwx/img/hsp_logo_default.png",DEFAULT_DOC_IMG_SRC:"/assets/gcwx/img/doc_default.png",DEFAULT_HSP_IMG_SRC:"/assets/gcwx/img/hsp_default.png",SEND_DEFAULT:"点击发送验证码",SENDING:"验证码发送中",SEND_SUCCESS:"输入验证码",SEND_FAILED:"发送失败点击重发"};for(var r in o)i[r]=o[r];i.ajaxSetting({redirectPageName:"sign_in",redirectExcept:["sign_in","sign_up","validate","forget","home_info","info_list","hsp_sign_in","hsp_home","hsp_account","hsp_foregift","hsp_daily_bill"]}),e.exports=i},function(e,t,n){n(5);var o={NET_ERROR:"网络连接错误，请刷新重试！",GET_DATA_ERROR:"数据请求异常",COOKIE_NOT_AVAILABLE:"Cookie当前不可用！请检查浏览器设置",rhtml:/^<(?:\s|.)*>$/,IS_WX:/MicroMessenger/i.test(navigator.userAgent),ajaxSetting:function(e){if(window.$&&$.ajaxSetup){var t=location.pathname.match(/(\/(?:\w+\/)*)(\w+)?/),o=e.redirectPageName,i=this;t&&(pageName=t[2])&&(o+=[location.search?location.search+"&":"?","referrer="+pageName].join("")),$.ajaxSetup({dataType:"json",data:{pltId:this.pltId,productId:this.productId,version:this.version,sessionId:n(1).get("sid")},success:function(t,n){if("1"!==t.rspCode)switch(t.rspCode){case"9004":case"9005":e.sidHandler?e.sidHandler():location.href=i.IS_WX?i.getWxAuthPath(o):o}},complete:function(e,t){var n=e.responseText&&e.responseText.trim();if(""===n||i.rhtml.test(n))switch(t){case"success":alert(i.GET_DATA_ERROR);break;case"error":alert(i.NET_ERROR);break;case"abort":break;default:console.log(t),this._error&&this._error.call(this,t)}else try{this._complete&&this._complete.call(this,JSON.parse(n))}catch(o){console.log(o)}}})}},getFullPath:function(e){var t=location.pathname.match(/(\/(?:\w+\/)*)(?:\w+)?/)[1];return[location.origin,t,e].join("")},getWxAuthPath:function(e){return"https://open.weixin.qq.com/connect/oauth2/authorize?appid="+this.wxAppId+"&redirect_uri="+encodeURIComponent(this.getFullPath(e))+"&response_type=code&scope=snsapi_base#wechat_redirect"},ModifyCommonUser:{ADD:"1",UPDATE:"2",DELETE:"3"},RegisterType:{REGISTER:"1",FETCH:"2",CHARGE:"3"},RegisterTypeMap:{1:"挂号",2:"取号",3:"缴费"},BusinessType:{REGISTER:"1",RESET_PASSWORD:"2",CASE_HISTORY:"3",RESERVE_RECORD:"4",SEE_REPORT:"5"},PayMethod:{TELE_FARE:"00",ONLINE_PAY:"01",UNION_WAP_PAY:"010",ALI_PAY:"02",WX_PAY:"03",OFFLINE_PAY:"05"},ChannelCode:{BD:"01",WX:"02",ALI:"03",YM:"04"},CardTypes:["医疗卡","医保卡"],ReportPrintStatus:["未打印","已打印","检测中"],Status:["已违约","已取消","取号/挂号成功","预约可取消","预约不可取消","可支付","预约成功","业务处理中/挂号处理中","挂号失败","已退号","历史挂号记录"],Weekdays:["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],SeeTimeStrings:["上午","中午","下午","夜晚","早班","全天"],NORMAL:"普通号",INFO_IMG_SRC:"http://cms.jiankang51.cn",COUNTDOWN_MINUTES:60};e.exports=o},function(e,t){String.prototype.startsWith||(String.prototype.startsWith=function(e){return this.slice(0,e.length)==e}),String.prototype.trim||(String.prototype.trim=function(){return this.replace(/(^\s*)|(\s*$)/g,"")})},function(e,t){!function(e){e.fn.tap=function(t){return this.each(function(){var n=e(this),o=/mobile|windows phone|ios|android/i.test(navigator.userAgent);if(t)if(o){var i,r,a,s;n.on("touchstart",function(e){var t=e.originalEvent.touches[0];i=t.pageX,a=t.pageY}),n.on("touchend",function(e){if(e=e.originalEvent,"function"==typeof t)if(e){var n=e.changedTouches[0];r=n.pageX,s=n.pageY,Math.abs(r-i)<6&&Math.abs(s-a)<6&&t.call(this,e,this)}else t.call(this,e,this)})}else n.on("click",function(e){t.call(this,e,this)});else n.triggerHandler(o?"touchend":"click")}),this}}(jQuery)},function(e,t){!function(e){e.fn.extend({alert:function(t,n,o){var i=e(this);i.find(".alert-window-info").text(t),n&&i.addClass("failed"),i.ajustToCenter().fadeIn(250),setTimeout(function(){i.fadeOut(250,function(){o&&o(),i.removeClass("failed")})},2e3)},ajustToCenter:function(){var t=e(this);return t.css({top:function(){return e("body").scrollTop()+e(window).height()/2-t.height()/2},margin:"0 auto"})},open:function(t,n,o){var i=e(this);return t&&i.find(".alert-title").text(t),n&&i.find(".alert-desc").text(n),i.show(),o&&"function"==typeof o&&o(),i},close:function(){return e(this).hide()},bindTouchHandler:function(t,n,o){var i={};return this.each(function(){var o=e(this),r=i.toString.call(t).match(/\[object (\w+)\]/)[1].toLowerCase(),a=/mobile|windows phone|ios|android/i.test(navigator.userAgent),s=a?"touchend":"click";if("object"===r)for(var c in t){var l=t[c];o.find(c).on(s,{$elem:o},l)}else"string"===r&&o.find(t).on(s,{$elem:o},n)}),this}})}(jQuery)},function(e,t){e.exports={val:function(e,t){var n=decodeURIComponent(location.search),o=-1!==n.indexOf("#")?n.indexOf("#"):n.length,i=n?n.slice(1,o):null,r={},a=r.toString,s=[];if(i)for(var c=i.split("&"),l=0,d=c.length;d>l;l++){var u=c[l],p=u.indexOf("=");r[u.slice(0,p)]=u.slice(p+1)}if(void 0===e)return r;if(void 0!==t)r[e]=t;else{if("string"==typeof e)return r[e]||"";if("[object Object]"!==a.call(e))return"";for(var f in e)r[f]=e[f]}for(var f in r)s.push(f+"="+r[f]);location.search="?"+encodeURIComponent(s.join("&"))}}},,,,function(e,t,n){var o=n(1);e.exports={bLS:!!window.localStorage&&!/android/i.test(navigator.userAgent),add:function(e,t,n){return this.bLS?localStorage.setItem(e,t):o.add(e,t,n)},get:function(e){return this.bLS?localStorage.getItem(e):o.get(e)},remove:function(e){return this.bLS?localStorage.removeItem(e):o.remove(e)},clear:function(){return this.bLS?localStorage.clear():o.removeAll()}}}]);