!function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return e[r].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){var r=n(8),i=n(1),o=n(10),a=n(2),s=n(11),c=n(3);n(6),n(7),$(function(){$(".forget-password").on("touchend",function(e){e.preventDefault(),location.href="forget"}),$(".register").on("touchend",function(e){e.preventDefault(),location.href="sign_up"});var e=$(".input").not(".input-submit");e.on("focusout",function(e){var t=$(this),n=s[t.attr("check")];t.toggleClass("ok",n?n.call(s,t.val()):!1)});var t=$(".alert-wrap.validate"),n=$(".alert-wrap.error");t.bindTouchHandler(".confirm",function(e){e.preventDefault(),t.close()}),n.bindTouchHandler(".confirm",function(e){e.preventDefault(),n.close()});var l=($(".alert-window"),$(".input-submit")),u=r.val("code");$(".login-form").on("submit",function(f){f.preventDefault();$(this);e.blur();var d=$(".ok").length===e.length;if(d){var h=$(".input-idnum").val(),h=s.idnumAlike(h)?h.toUpperCase():h,p=$(".input-password").val(),g={userId:h,userPassword:o.digest_s(p)};u&&(g.code=u,g.appId=c.wxAppId,g.pltId=c.pltId,g.productId=c.productId),$.ajax({url:c.GetDataURL,type:"get",data:{mName:"userLogin",pContent:JSON.stringify(g)},dataType:"json",beforeSend:function(){l.addClass("submiting").val("登录中...")},complete:function(e){var t=e.responseText?e.responseText.trim():"";if(l.removeClass("submiting").val("登录"),""===t||c.rhtml.test(t))alert(c.NET_ERROR);else{var o=JSON.parse(t);if("1"!==o.rspCode)"1"===o.errorCode?location.href=c.getWxAuthPath("sign_in"):n.open("",o.rspMsg);else{var s=o.rspData;if(navigator.cookieEnabled){i.add("idnum",a.encode(s.idNo),{expires:90}),i.add("password",a.encode(g.userPassword),{expires:90}),i.add("phone",a.encode(s.phoneNumber),{expires:90}),i.add("name",a.encode(s.name),{expires:90}),i.add("sid",s.sessionId,{expires:90}),i.add("openId",a.encode(s.openId),{expires:90});var u;if(u=r.val("referrer")){var f=encodeURIComponent(r.val("transData")),d=u;d+=f?"?transData="+f:"",location.href=d}else location.href="home"}else l.removeClass("submiting").val("登录")}}}})}else{var m=e.filter(function(){return!$(this).is(".ok")}).first(),v=s[m.attr("check")],_=v?v.call(s,m.val(),!0):"";t.open("",_.msg)}}),$(".input-submit").tap(function(e){e.preventDefault(),$(".login-form").submit()})})},function(e,t){String.prototype.trim||(String.prototype.trim=function(){return this.replace(/(^\s*)|(\s*$)/g,"")}),e.exports={defaults:{},extend:function(){for(var e=0,t={};e<arguments.length;e++){var n=arguments[e];for(var r in n)t[r]=n[r]}return t},cookie:function(e,t,n){if(void 0!==t){if(e.match(/\W/))throw new Error("characters out bounds of [0-9a-zA-Z_] are illegal");var n=n||this.defaults;if("number"==typeof n.expires){var r=new Date;return r.setTime(+r+864e5*n.expires),document.cookie=[e,"=",t,n.expires?"; expires="+r.toGMTString():"",n.path?"; path="+n.path:"",n.domain?"; domain="+n.domain:"",n.secure?"; secure":""].join("")}}for(var i=document.cookie,o=i.split(";"),a=0,s=o.length;s>a;a++){var c=o[a].trim(),l=c.indexOf("=");if(c.slice(0,l)===e)return c.slice(l+1)}return""},add:function(e,t,n){this.cookie(e,t,n)},get:function(e){return this.cookie(e)},remove:function(e,t){this.cookie(e,"invalid",this.extend(t,{expires:-1}))},removeAll:function(e){for(var t=document.cookie,n=t.split(";"),r=0,i=n.length;i>r;r++){var o=n[r].split("=")[0].trim();this.remove(o,e)}}}},function(e,t){e.exports={b64:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){if(!e)return"";e=encodeURIComponent(e);var t,n,r,i,o,a,s,c,l=this.b64,u=0,f=e.length,d=[],h=0;do t=e.charCodeAt(u++),n=e.charCodeAt(u++),r=e.charCodeAt(u++),i=t<<16|n<<8|r,o=i>>18&63,a=i>>12&63,s=i>>6&63,c=63&i,d[h++]=l.charAt(o)+l.charAt(a)+l.charAt(s)+l.charAt(c);while(f>u);var p=d.join(""),g=f%3;return(g?p.slice(0,g-3):p)+"===".slice(g||3)},decode:function(e){if(!e)return"";if(!/^(?:[a-zA-Z\d\+\/=]{4})*$/.test(e))throw new Error("invalid base64 string");var t,n,r,i,o,a,s,c,l=this.b64,u=0,f=e.length,d=[],h=0;do t=l.indexOf(e.charAt(u++)),n=l.indexOf(e.charAt(u++)),r=l.indexOf(e.charAt(u++)),i=l.indexOf(e.charAt(u++)),o=t<<18|n<<12|r<<6|i,a=o>>16&255,s=o>>8&255,c=255&o,64==r?d[h++]=String.fromCharCode(a):64==i?d[h++]=String.fromCharCode(a,s):d[h++]=String.fromCharCode(a,s,c);while(f>u);return decodeURIComponent(d.join(""))}}},function(e,t,n){var r=n(4),i={app:"glwx",pltId:"03",productId:"010",version:"1.00.00",wxAppId:"wx97e1952c1a0281a4",GetDataURL:location.origin+"/support/get_data",appColumnsMap:{"001":{cols:[{nodeId:225,level:1,title:"健康科普",thumbnail_path:"/assets/glwx/img/thumbnail.png"},{nodeId:229,level:1,title:"营养养生",thumbnail_path:"/assets/glwx/img/thumbnail.png"},{nodeId:230,level:1,title:"通知公告",thumbnail_path:"/assets/glwx/img/thumbnail.png"}],style_extensions:"condensed color-inverse",article_based:!0,article_cols:[{nodeId:238,bRecm:!0,style_extensions:"float first-stressed"},{nodeId:239}]},"007":{cols:[{nodeId:93,level:1,title:"医院动态"},{nodeId:94,level:1,title:"学科动态"},{nodeId:89,level:1,title:"健康科普"},{nodeId:90,level:1,title:"媒体报道"}],style_extensions:"first-stressed"}},HSPCODE:"23101",HSPNAME:"南京市鼓楼医院",DEFAULT_MAX_INTRO_LENGTH:25,MAX_SEARCH_TIMES:10,DEFAULT_HOS_LOGO_IMG_SRC:"/assets/gcwx/img/hsp_logo_default.png",DEFAULT_DOC_IMG_SRC:"/assets/gcwx/img/doc_default.png",DEFAULT_HSP_IMG_SRC:"/assets/gcwx/img/hsp_default.png",SEND_DEFAULT:"点击发送验证码",SENDING:"验证码发送中",SEND_SUCCESS:"输入验证码",SEND_FAILED:"发送失败点击重发"};for(var o in r)i[o]=r[o];i.ajaxSetting({redirectPageName:"sign_in",redirectExcept:["sign_in","sign_up","validate","forget","home_info","info_list","hsp_sign_in","hsp_home","hsp_account","hsp_foregift","hsp_daily_bill"]}),e.exports=i},function(e,t,n){n(5);var r={NET_ERROR:"网络连接错误，请刷新重试！",GET_DATA_ERROR:"数据请求异常",COOKIE_NOT_AVAILABLE:"Cookie当前不可用！请检查浏览器设置",rhtml:/^<(?:\s|.)*>$/,IS_WX:/MicroMessenger/i.test(navigator.userAgent),ajaxSetting:function(e){if(window.$&&$.ajaxSetup){var t=location.pathname.match(/(\/(?:\w+\/)*)(\w+)?/),r=e.redirectPageName,i=this;t&&(pageName=t[2])&&(r+=[location.search?location.search+"&":"?","referrer="+pageName].join("")),$.ajaxSetup({dataType:"json",data:{pltId:this.pltId,productId:this.productId,version:this.version,sessionId:n(1).get("sid")},success:function(t,n){if("1"!==t.rspCode)switch(t.rspCode){case"9004":case"9005":e.sidHandler?e.sidHandler():location.href=i.IS_WX?i.getWxAuthPath(r):r}},complete:function(e,t){var n=e.responseText&&e.responseText.trim();if(""===n||i.rhtml.test(n))switch(t){case"success":alert(i.GET_DATA_ERROR);break;case"error":alert(i.NET_ERROR);break;case"abort":break;default:console.log(t),this._error&&this._error.call(this,t)}else try{this._complete&&this._complete.call(this,JSON.parse(n))}catch(r){console.log(r)}}})}},getFullPath:function(e){var t=location.pathname.match(/(\/(?:\w+\/)*)(?:\w+)?/)[1];return[location.origin,t,e].join("")},getWxAuthPath:function(e){return"https://open.weixin.qq.com/connect/oauth2/authorize?appid="+this.wxAppId+"&redirect_uri="+encodeURIComponent(this.getFullPath(e))+"&response_type=code&scope=snsapi_base#wechat_redirect"},ModifyCommonUser:{ADD:"1",UPDATE:"2",DELETE:"3"},RegisterType:{REGISTER:"1",FETCH:"2",CHARGE:"3"},RegisterTypeMap:{1:"挂号",2:"取号",3:"缴费"},BusinessType:{REGISTER:"1",RESET_PASSWORD:"2",CASE_HISTORY:"3",RESERVE_RECORD:"4",SEE_REPORT:"5"},PayMethod:{TELE_FARE:"00",ONLINE_PAY:"01",UNION_WAP_PAY:"010",ALI_PAY:"02",WX_PAY:"03",OFFLINE_PAY:"05"},ChannelCode:{BD:"01",WX:"02",ALI:"03",YM:"04"},CardTypes:["医疗卡","医保卡"],ReportPrintStatus:["未打印","已打印","检测中"],Status:["已违约","已取消","取号/挂号成功","预约可取消","预约不可取消","可支付","预约成功","业务处理中/挂号处理中","挂号失败","已退号","历史挂号记录"],Weekdays:["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],SeeTimeStrings:["上午","中午","下午","夜晚","早班","全天"],NORMAL:"普通号",INFO_IMG_SRC:"http://cms.jiankang51.cn",COUNTDOWN_MINUTES:60};e.exports=r},function(e,t){String.prototype.startsWith||(String.prototype.startsWith=function(e){return this.slice(0,e.length)==e}),String.prototype.trim||(String.prototype.trim=function(){return this.replace(/(^\s*)|(\s*$)/g,"")})},function(e,t){!function(e){e.fn.tap=function(t){return this.each(function(){var n=e(this),r=/mobile|windows phone|ios|android/i.test(navigator.userAgent);if(t)if(r){var i,o,a,s;n.on("touchstart",function(e){var t=e.originalEvent.touches[0];i=t.pageX,a=t.pageY}),n.on("touchend",function(e){if(e=e.originalEvent,"function"==typeof t)if(e){var n=e.changedTouches[0];o=n.pageX,s=n.pageY,Math.abs(o-i)<6&&Math.abs(s-a)<6&&t.call(this,e,this)}else t.call(this,e,this)})}else n.on("click",function(e){t.call(this,e,this)});else n.triggerHandler(r?"touchend":"click")}),this}}(jQuery)},function(e,t){!function(e){e.fn.extend({alert:function(t,n,r){var i=e(this);i.find(".alert-window-info").text(t),n&&i.addClass("failed"),i.ajustToCenter().fadeIn(250),setTimeout(function(){i.fadeOut(250,function(){r&&r(),i.removeClass("failed")})},2e3)},ajustToCenter:function(){var t=e(this);return t.css({top:function(){return e("body").scrollTop()+e(window).height()/2-t.height()/2},margin:"0 auto"})},open:function(t,n,r){var i=e(this);return t&&i.find(".alert-title").text(t),n&&i.find(".alert-desc").text(n),i.show(),r&&"function"==typeof r&&r(),i},close:function(){return e(this).hide()},bindTouchHandler:function(t,n,r){var i={};return this.each(function(){var r=e(this),o=i.toString.call(t).match(/\[object (\w+)\]/)[1].toLowerCase(),a=/mobile|windows phone|ios|android/i.test(navigator.userAgent),s=a?"touchend":"click";if("object"===o)for(var c in t){var l=t[c];r.find(c).on(s,{$elem:r},l)}else"string"===o&&r.find(t).on(s,{$elem:r},n)}),this}})}(jQuery)},function(e,t){e.exports={val:function(e,t){var n=decodeURIComponent(location.search),r=-1!==n.indexOf("#")?n.indexOf("#"):n.length,i=n?n.slice(1,r):null,o={},a=o.toString,s=[];if(i)for(var c=i.split("&"),l=0,u=c.length;u>l;l++){var f=c[l],d=f.indexOf("=");o[f.slice(0,d)]=f.slice(d+1)}if(void 0===e)return o;if(void 0!==t)o[e]=t;else{if("string"==typeof e)return o[e]||"";if("[object Object]"!==a.call(e))return"";for(var h in e)o[h]=e[h]}for(var h in o)s.push(h+"="+o[h]);location.search="?"+encodeURIComponent(s.join("&"))}}},,function(e,t){!function(){"use strict";Array.prototype.forEach||(Array.prototype.forEach=function(e){for(var t=0,n=this.length;n>t;t++)e.call(this,this[t],t)}),t.digest=function(e){function t(e,t,n){return e&t|~e&n}function n(e,t,n){return e&n|t&~n}function r(e,t,n){return e^t^n}function i(e,t,n){return t^(e|~n)}function o(e){return[255&e,e>>>8&255,e>>>16&255,e>>>24&255]}function a(e,t,n,r,i,o,a,s){e[0]+=s(t[0],n[0],r[0])+x[i]+a,e[0]=e[0]<<o|e[0]>>>32-o,e[0]+=t[0]}var s,c,l,u,f,d,h,p,g,m,v,_,E,x,A;for(s=e.length,e.push(128),f=56-e.length&63,c=0;f>c;c++)e.push(0);for(o(8*s).forEach(function(t){e.push(t)}),[0,0,0,0].forEach(function(t){e.push(t)}),d=[1732584193],h=[4023233417],p=[2562383102],g=[271733878],c=0;c<e.length;c+=64){for(x=[],l=0;64>l;l+=4)u=c+l,x.push(e[u]|e[u+1]<<8|e[u+2]<<16|e[u+3]<<24);m=d[0],v=h[0],_=p[0],E=g[0],a(d,h,p,g,0,7,3614090360,t),a(g,d,h,p,1,12,3905402710,t),a(p,g,d,h,2,17,606105819,t),a(h,p,g,d,3,22,3250441966,t),a(d,h,p,g,4,7,4118548399,t),a(g,d,h,p,5,12,1200080426,t),a(p,g,d,h,6,17,2821735955,t),a(h,p,g,d,7,22,4249261313,t),a(d,h,p,g,8,7,1770035416,t),a(g,d,h,p,9,12,2336552879,t),a(p,g,d,h,10,17,4294925233,t),a(h,p,g,d,11,22,2304563134,t),a(d,h,p,g,12,7,1804603682,t),a(g,d,h,p,13,12,4254626195,t),a(p,g,d,h,14,17,2792965006,t),a(h,p,g,d,15,22,1236535329,t),a(d,h,p,g,1,5,4129170786,n),a(g,d,h,p,6,9,3225465664,n),a(p,g,d,h,11,14,643717713,n),a(h,p,g,d,0,20,3921069994,n),a(d,h,p,g,5,5,3593408605,n),a(g,d,h,p,10,9,38016083,n),a(p,g,d,h,15,14,3634488961,n),a(h,p,g,d,4,20,3889429448,n),a(d,h,p,g,9,5,568446438,n),a(g,d,h,p,14,9,3275163606,n),a(p,g,d,h,3,14,4107603335,n),a(h,p,g,d,8,20,1163531501,n),a(d,h,p,g,13,5,2850285829,n),a(g,d,h,p,2,9,4243563512,n),a(p,g,d,h,7,14,1735328473,n),a(h,p,g,d,12,20,2368359562,n),a(d,h,p,g,5,4,4294588738,r),a(g,d,h,p,8,11,2272392833,r),a(p,g,d,h,11,16,1839030562,r),a(h,p,g,d,14,23,4259657740,r),a(d,h,p,g,1,4,2763975236,r),a(g,d,h,p,4,11,1272893353,r),a(p,g,d,h,7,16,4139469664,r),a(h,p,g,d,10,23,3200236656,r),a(d,h,p,g,13,4,681279174,r),a(g,d,h,p,0,11,3936430074,r),a(p,g,d,h,3,16,3572445317,r),a(h,p,g,d,6,23,76029189,r),a(d,h,p,g,9,4,3654602809,r),a(g,d,h,p,12,11,3873151461,r),a(p,g,d,h,15,16,530742520,r),a(h,p,g,d,2,23,3299628645,r),a(d,h,p,g,0,6,4096336452,i),a(g,d,h,p,7,10,1126891415,i),a(p,g,d,h,14,15,2878612391,i),a(h,p,g,d,5,21,4237533241,i),a(d,h,p,g,12,6,1700485571,i),a(g,d,h,p,3,10,2399980690,i),a(p,g,d,h,10,15,4293915773,i),a(h,p,g,d,1,21,2240044497,i),a(d,h,p,g,8,6,1873313359,i),a(g,d,h,p,15,10,4264355552,i),a(p,g,d,h,6,15,2734768916,i),a(h,p,g,d,13,21,1309151649,i),a(d,h,p,g,4,6,4149444226,i),a(g,d,h,p,11,10,3174756917,i),a(p,g,d,h,2,15,718787259,i),a(h,p,g,d,9,21,3951481745,i),d[0]+=m,h[0]+=v,p[0]+=_,g[0]+=E}return A=[],o(d[0]).forEach(function(e){A.push(e)}),o(h[0]).forEach(function(e){A.push(e)}),o(p[0]).forEach(function(e){A.push(e)}),o(g[0]).forEach(function(e){A.push(e)}),A},t.digest_s=function(e){var n,r,i,e,o=[];for(n=0;n<e.length;n++)o.push(e.charCodeAt(n));return r=t.digest(o),i="",r.forEach(function(t){for(e=t.toString(16);e.length<2;)e="0"+e;i+=e}),i}}()},function(e,t){e.exports={idnumAlike:function(e){return/(^\d{17}[\dxX]$)|(^\d{15}$)/.test(e)},isAdult:function(e){if(this.idnumAlike(e)){var t,n=/^\d{6}(\d{6})\d{3}$/,r=/^\d{6}(\d{8})[\dxX]{4}$/;if(t=18===e.length?e.match(r):e.match(n),t&&(t=t[1])){var i=new Date,o=18===e.length?t.slice(-8,-4):"19"+t.slice(-6,-4);return i.setDate(t.slice(-2)),i.setMonth(+t.slice(-4,-2)-1),i.setYear(+o+18),+i<=+new Date}}return!1},name:function(e,t){var n={flag:!1,msg:""};return e?/^[\u4e00-\u9fa5]{2,6}$/.test(e)?n.flag=!0:n.msg="用户姓名应为2-6个中文汉字":n.msg="用户姓名不得为空",t?n:n.flag},phone:function(e,t){var n={flag:!1,msg:""};return e?/^\d{11}$/.test(e)?n.flag=!0:n.msg="请输入有效手机号":n.msg="手机号不得为空",t?n:n.flag},idnum:function(e,t){var n={flag:!1,msg:""};if(e)if(/^\d{17}[\dxX]$/.test(e)){for(var r=[7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2],i=[1,0,"x",9,8,7,6,5,4,3,2],o=0,a=0;17>a;a++)o+=r[a]*+e[a];e[17].toLowerCase()==i[o%11]?n.flag=!0:n.msg="请输入有效身份证号码"}else/^\d{15}$/.test(e)?n.flag=!0:n.msg="请输入有效身份证号码";else n.msg="身份证号不得为空";return t?n:n.flag},account:function(e,t){var n={flag:!1,msg:""};return this.idnumAlike(e)?this.idnum(e,t):(e?n.flag=!0:n.msg="账号不得为空",t?n:n.flag)},pwd:function(e,t){var n={flag:!1,msg:""};return e?/^.{6,30}$/.test(e)?n.flag=!0:n.msg="密码长度应为6-30":n.msg="密码不得为空",t?n:n.flag},confirm:function(e,t,n){var r={flag:!1,msg:""};return t&&(e?e!==t?r.msg="两次输入的密码不一致":r.flag=!0:r.msg="请再次输入登陆密码"),n?r:r.flag},code:function(e,t){var n={flag:!1,msg:""};return e?n.flag=!0:n.msg="短信验证码不得为空",t?n:n.flag},guarderIdnum:function(e,t){var n={flag:!1,msg:""};return e?this.isAdult(e)&&this.idnum(e)?n.flag=!0:n.msg="请输入有效监护人身份证号码":n.msg="监护人身份证不得为空",t?n:n.flag}}}]);