!function(e){function t(o){if(a[o])return a[o].exports;var i=a[o]={exports:{},id:o,loaded:!1};return e[o].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var a={};return t.m=e,t.c=a,t.p="",t(0)}([function(e,t,a){var o=a(8),i=a(1),n=a(3);a(9),a(6),$(function(){var e=o.val(),t=e.infoId,a=e.productId||"007",s=$(".list-loading"),r=$(".detail-loading"),l=n.appColumnsMap[a],d=e.defaultIndex;l.defaultIndex=d;var c=$(".list-wrap").addClass(l.style_extensions);if($(".info-img").on("error",function(e){var t,a=$(this);t=c.is(".first-stressed")&&0===a.closest(".info").index()?"/assets/glwx/img/default_2.png":"/assets/glwx/img/default_1.png",a.attr("src",t)}),t)$(".detail-navi").addClass("visible").children("#back").tap(function(e){e.preventDefault(),history.go(-1)}),$.ajax({url:"/support/get_info",type:"get",data:{actionType:"cmsInfoFacade",actionCode:"getCmsInfoDetail",infoId:t},beforeSend:function(){r.show()},_complete:function(e){if(r.hide(),"1"!==e.respCode)alert(e.rspMsg,!0);else{var t=JSON.parse(e.data);$(".detail-title").text(t.title),$(".detail-date").text(new Date(+t.publishTime).format("yyyy-mm-dd")),$(".detail-read-nums").text(t.readCount),t.titleImage&&$(".detail-img").attr("src",n.INFO_IMG_SRC+t.titleImage),$(".detail-content").append(t.content).find("img").each(function(){var e=$(this).attr("src");/^(\/|\\)uploads\S*$/.test(e)&&$(this).attr("src",n.INFO_IMG_SRC+e)}),$(".detail-wrap").show()}}});else{var p,f=($(".simple_tmpl"),$(".complex_tmpl"),$("body")),h=l.article_based?l.article_cols:l.cols,u=h.length,m=0,g=[],_=0,I=0,d=l.defaultIndex,v=!!window.localStorage,S="jknjInfo",x=$(".simple_tmpl"),E=x.clone(!0).removeClass("template"),w=$(".tab-wrap.template"),R=w.clone(!0).removeClass("template");(pltId=e.pltId)&&$(".list-navi").addClass("visible").children("#back").tap(function(e){e.preventDefault();var t=navigator.userAgent;/iPhone/i.test(t)?location.href="close":/android/i.test(t)?window.jsInterface&&window.jsInterface.close():history.go(-1)});for(var C=function(e,t){return this.find(".info").not(".template").remove(),this.bindData(e,t)},y=function(e,t){for(var a=e.newsList,o=0,i=a.length,s=this.find(".info.template"),r=s.clone(!0).removeClass("template");i>o;o++){var d=a[o],c=r.clone(!0);if(d.imagePath){var p=new Image;p.onload=function(e){return function(){e.find(".info-img").prop("src",this.src)}}(c),p.src=n.INFO_IMG_SRC+d.imagePath}c.find(".info-title").text(d.title).end().data("info",d).insertBefore(s),l.article_based&&t.bRecm&&c.find(".info-content").text(d.content.replace(/<(?:.|\s)*?>|&\w+;/g,"").trim())}return this};u>m;m++){var T,b=h[m],D=E.clone(!0).insertBefore(x).data("colId",b.nodeId);if($.extend(D,{refresh:C,bindData:y}),l.article_based)D.addClass(b.style_extensions);else{var O=i.get("lastTabId"),N=R.clone(!0),A=b.nodeId==(d||O||l.cols[0].nodeId);D.toggle(A),N.children(".tab").text(b.title).end().toggleClass("selected",A).css("width",100/u+"%").data("colInfo",b).insertBefore(w)}if(v&&(T=localStorage.getItem(S+b.nodeId))?(T=JSON.parse(T),D.bindData(JSON.parse(T.data),b),$.ajax({url:"/support/get_info",type:"get",data:{actionType:"cmsInfoFacade",actionCode:"getColumnNodeInfo",deepth:"1",nodeId:b.nodeId,timestamp:"1"},customData:{timestamp:T.timestamp,$model:D,model:b},_complete:function(e){if("1"!==e.respCode)alert(n.NET_ERROR);else{var t=this.customData;t.timestamp!==e.timestamp&&$.ajax({url:"/support/get_info",type:"get",data:{actionType:"cmsInfoFacade",actionCode:"getColumnNodeInfo",deepth:"1",nodeId:t.model.nodeId},customData:{$model:t.$model,model:t.model},complete:function(e){var t=e.responseText?e.responseText.trim():"";if(""===t||n.rhtml.test(t));else{var a=JSON.parse(t);if("1"!==a.respCode)alert(n.NET_ERROR);else{var o=this.customData,e=JSON.parse(a.data);o.$model.refresh(e,o.model),localStorage.setItem(S+o.model.nodeId,JSON.stringify({timestamp:a.timestamp,data:a.data}))}}}})}}})):g.push({$model:D,model:b}),l.article_based&&e.home)break}for(var M=0,F=g.length;F>M;M++){var P=g[M];$.ajax({url:"/support/get_info",type:"get",data:{actionType:"cmsInfoFacade",actionCode:"getColumnNodeInfo",deepth:"1",nodeId:P.model.nodeId},customData:P,beforeSend:function(){!_&&s.show(),_++},_complete:function(e){if(++I===_&&s.hide(),"1"!==e.respCode)alert(n.NET_ERROR);else{var t=this.customData,a=JSON.parse(e.data);t.$model.bindData(a,t.model),e.timestamp&&localStorage.setItem(S+t.model.nodeId,JSON.stringify({timestamp:e.timestamp,data:e.data}))}}})}if(!l.article_based){$("html, body").css("height","100%"),$(".tab-wrap").on("touchend",function(e){e.preventDefault();var t=$(this),a=t.data("colInfo");t.is(".selected")||(p||(p=$(".simple_tmpl").not(".template")),$(".tab-wrap.selected").removeClass("selected"),t.addClass("selected"),p.hide(),p=$(".simple_tmpl").filter(function(){return $(this).data("colId")==a.nodeId}).show())});var j=$(".tabs");$(".info-wrap").on("touchmove",function(e){var t=f.scrollTop();j.toggleClass("hover-mode",!!t)})}x.remove(),$(".simple_tmpl .info, .single-info").tap(function(e,t){var a=$(t).data("info");!l.article_based&&i.add("lastTabId",$(".tab-wrap.selected").data("colInfo").nodeId,{expires:1/24/60*5}),window.newsJsInterface?window.newsJsInterface.getTargetUrl(location.href+"&infoId="+a.id):o.val({infoId:a.id})})}})},function(e,t){String.prototype.trim||(String.prototype.trim=function(){return this.replace(/(^\s*)|(\s*$)/g,"")}),e.exports={defaults:{},extend:function(){for(var e=0,t={};e<arguments.length;e++){var a=arguments[e];for(var o in a)t[o]=a[o]}return t},cookie:function(e,t,a){if(void 0!==t){if(e.match(/\W/))throw new Error("characters out bounds of [0-9a-zA-Z_] are illegal");var a=a||this.defaults;if("number"==typeof a.expires){var o=new Date;return o.setTime(+o+864e5*a.expires),document.cookie=[e,"=",t,a.expires?"; expires="+o.toGMTString():"",a.path?"; path="+a.path:"",a.domain?"; domain="+a.domain:"",a.secure?"; secure":""].join("")}}for(var i=document.cookie,n=i.split(";"),s=0,r=n.length;r>s;s++){var l=n[s].trim(),d=l.indexOf("=");if(l.slice(0,d)===e)return l.slice(d+1)}return""},add:function(e,t,a){this.cookie(e,t,a)},get:function(e){return this.cookie(e)},remove:function(e,t){this.cookie(e,"invalid",this.extend(t,{expires:-1}))},removeAll:function(e){for(var t=document.cookie,a=t.split(";"),o=0,i=a.length;i>o;o++){var n=a[o].split("=")[0].trim();this.remove(n,e)}}}},,function(e,t,a){var o=a(4),i={app:"glwx",pltId:"03",productId:"010",version:"1.00.00",wxAppId:"wx97e1952c1a0281a4",GetDataURL:location.origin+"/support/get_data",appColumnsMap:{"001":{cols:[{nodeId:225,level:1,title:"健康科普",thumbnail_path:"/assets/glwx/img/thumbnail.png"},{nodeId:229,level:1,title:"营养养生",thumbnail_path:"/assets/glwx/img/thumbnail.png"},{nodeId:230,level:1,title:"通知公告",thumbnail_path:"/assets/glwx/img/thumbnail.png"}],style_extensions:"condensed color-inverse",article_based:!0,article_cols:[{nodeId:238,bRecm:!0,style_extensions:"float first-stressed"},{nodeId:239}]},"007":{cols:[{nodeId:93,level:1,title:"医院动态"},{nodeId:94,level:1,title:"学科动态"},{nodeId:89,level:1,title:"健康科普"},{nodeId:90,level:1,title:"媒体报道"}],style_extensions:"first-stressed"}},HSPCODE:"23101",HSPNAME:"南京市鼓楼医院",DEFAULT_MAX_INTRO_LENGTH:25,MAX_SEARCH_TIMES:10,DEFAULT_HOS_LOGO_IMG_SRC:"/assets/gcwx/img/hsp_logo_default.png",DEFAULT_DOC_IMG_SRC:"/assets/gcwx/img/doc_default.png",DEFAULT_HSP_IMG_SRC:"/assets/gcwx/img/hsp_default.png",SEND_DEFAULT:"点击发送验证码",SENDING:"验证码发送中",SEND_SUCCESS:"输入验证码",SEND_FAILED:"发送失败点击重发"};for(var n in o)i[n]=o[n];i.ajaxSetting({redirectPageName:"sign_in",redirectExcept:["sign_in","sign_up","validate","forget","home_info","info_list","hsp_sign_in","hsp_home","hsp_account","hsp_foregift","hsp_daily_bill"]}),e.exports=i},function(e,t,a){a(5);var o={NET_ERROR:"网络连接错误，请刷新重试！",GET_DATA_ERROR:"数据请求异常",COOKIE_NOT_AVAILABLE:"Cookie当前不可用！请检查浏览器设置",rhtml:/^<(?:\s|.)*>$/,IS_WX:/MicroMessenger/i.test(navigator.userAgent),ajaxSetting:function(e){if(window.$&&$.ajaxSetup){var t=location.pathname.match(/(\/(?:\w+\/)*)(\w+)?/),o=e.redirectPageName,i=this;t&&(pageName=t[2])&&(o+=[location.search?location.search+"&":"?","referrer="+pageName].join("")),$.ajaxSetup({dataType:"json",data:{pltId:this.pltId,productId:this.productId,version:this.version,sessionId:a(1).get("sid")},success:function(t,a){if("1"!==t.rspCode)switch(t.rspCode){case"9004":case"9005":e.sidHandler?e.sidHandler():location.href=i.IS_WX?i.getWxAuthPath(o):o}},complete:function(e,t){var a=e.responseText&&e.responseText.trim();if(""===a||i.rhtml.test(a))switch(t){case"success":alert(i.GET_DATA_ERROR);break;case"error":alert(i.NET_ERROR);break;case"abort":break;default:console.log(t),this._error&&this._error.call(this,t)}else try{this._complete&&this._complete.call(this,JSON.parse(a))}catch(o){console.log(o)}}})}},getFullPath:function(e){var t=location.pathname.match(/(\/(?:\w+\/)*)(?:\w+)?/)[1];return[location.origin,t,e].join("")},getWxAuthPath:function(e){return"https://open.weixin.qq.com/connect/oauth2/authorize?appid="+this.wxAppId+"&redirect_uri="+encodeURIComponent(this.getFullPath(e))+"&response_type=code&scope=snsapi_base#wechat_redirect"},ModifyCommonUser:{ADD:"1",UPDATE:"2",DELETE:"3"},RegisterType:{REGISTER:"1",FETCH:"2",CHARGE:"3"},RegisterTypeMap:{1:"挂号",2:"取号",3:"缴费"},BusinessType:{REGISTER:"1",RESET_PASSWORD:"2",CASE_HISTORY:"3",RESERVE_RECORD:"4",SEE_REPORT:"5"},PayMethod:{TELE_FARE:"00",ONLINE_PAY:"01",UNION_WAP_PAY:"010",ALI_PAY:"02",WX_PAY:"03",OFFLINE_PAY:"05"},ChannelCode:{BD:"01",WX:"02",ALI:"03",YM:"04"},CardTypes:["医疗卡","医保卡"],ReportPrintStatus:["未打印","已打印","检测中"],Status:["已违约","已取消","取号/挂号成功","预约可取消","预约不可取消","可支付","预约成功","业务处理中/挂号处理中","挂号失败","已退号","历史挂号记录"],Weekdays:["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],SeeTimeStrings:["上午","中午","下午","夜晚","早班","全天"],NORMAL:"普通号",INFO_IMG_SRC:"http://cms.jiankang51.cn",COUNTDOWN_MINUTES:60};e.exports=o},function(e,t){String.prototype.startsWith||(String.prototype.startsWith=function(e){return this.slice(0,e.length)==e}),String.prototype.trim||(String.prototype.trim=function(){return this.replace(/(^\s*)|(\s*$)/g,"")})},function(e,t){!function(e){e.fn.tap=function(t){return this.each(function(){var a=e(this),o=/mobile|windows phone|ios|android/i.test(navigator.userAgent);if(t)if(o){var i,n,s,r;a.on("touchstart",function(e){var t=e.originalEvent.touches[0];i=t.pageX,s=t.pageY}),a.on("touchend",function(e){if(e=e.originalEvent,"function"==typeof t)if(e){var a=e.changedTouches[0];n=a.pageX,r=a.pageY,Math.abs(n-i)<6&&Math.abs(r-s)<6&&t.call(this,e,this)}else t.call(this,e,this)})}else a.on("click",function(e){t.call(this,e,this)});else a.triggerHandler(o?"touchend":"click")}),this}}(jQuery)},,function(e,t){e.exports={val:function(e,t){var a=decodeURIComponent(location.search),o=-1!==a.indexOf("#")?a.indexOf("#"):a.length,i=a?a.slice(1,o):null,n={},s=n.toString,r=[];if(i)for(var l=i.split("&"),d=0,c=l.length;c>d;d++){var p=l[d],f=p.indexOf("=");n[p.slice(0,f)]=p.slice(f+1)}if(void 0===e)return n;if(void 0!==t)n[e]=t;else{if("string"==typeof e)return n[e]||"";if("[object Object]"!==s.call(e))return"";for(var h in e)n[h]=e[h]}for(var h in n)r.push(h+"="+n[h]);location.search="?"+encodeURIComponent(r.join("&"))}}},function(e,t){Date.prototype.format=function(e){for(var t=e.split(/[^a-zA-Z]/),a=0,o=t.length,i={yyyy:this.getFullYear(),mm:this.getMonth()+1,dd:this.getDate(),hh:this.getHours(),MM:this.getMinutes(),ss:this.getSeconds()};o>a;a++){var n=t[a],s=i[n];n in i&&(e=e.replace(n,10>s?"0"+s:s))}return e},String.prototype.toDate=function(e){var t=new Date;if(/^\d*$/.test(this))t.setDate(this.slice(6,8)),t.setMonth(parseInt(this.slice(4,6))-1),t.setFullYear(this.slice(0,4));else if(e=e||this.match(/[^\w]/)[0]){var a=this.split(e);t.setDate(a[2]),t.setMonth(parseInt(a[1])-1),t.setFullYear(a[0])}return t},Date.prototype.isSameDayWith=function(e){return e?this.getDate()===e.getDate()&&this.getMonth()===e.getMonth()&&this.getFullYear()===e.getFullYear():!1}}]);