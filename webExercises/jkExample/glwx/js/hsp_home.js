var store = require("common-libs/storage"),
	cookie = require("common-libs/cookie"),
	param = require("common-libs/param"),
	Config = require("./config");
// load jQuery extensions
require("common-libs/jquery.tap");
require("common-libs/jquery.alert");
$(function() {
	var paramMap = param.val(),
		pltId = param.val("pltId");
	if (pltId) {
		if (sid = paramMap["sid"]) {
			// 若app内账号已被切换，则清除原有住院数据
			sid !== cookie.get("origin_sid") && store.remove(Config.app);
		}
		$(".navbar").children("#back").tap(function(event) {
			event.preventDefault();
			var ua = navigator.userAgent;
			// 关闭页面
			if (/android/i.test(ua)) {
				window.jsInterface.close();
			} else if (/iPhone/i.test(ua)) {
				location.href = "close";
			} else {
				history.go(-1);
			}
		}).end().toggle(!param.val("home"));
	}
	// 数据读取
	var	dataStr = store.get(Config.app),
		appData = dataStr ? JSON.parse(decodeURIComponent(dataStr)) : {},
		zyData = appData.zyData || {},
		zyUsers = zyData.zyUsers || {},
		currUser = zyData.currUser;
	if ((zyInfo = zyUsers[currUser])) {
		$(".name").text(zyInfo.name);
		$(".area").text(zyInfo.areaName + "/" + zyInfo.sickBed + "床");
		$(".time").text(zyInfo.zyDate);
		$(".user-info").children(".switch-user").tap(function(event) {
			event.preventDefault();
			location.href = "hsp_account?pltId=" + pltId;
		}).end().show();
		// 绑定链接地址
		$(".navi-wrap").attr("href", function() {
			return $(this).attr("data-href") + "?pltId=" + pltId;
		});
	} else {
		// 未登录
		$(".navi-wrap").tap(function(event) {
			event.preventDefault();
			paramMap["referrer"] = $(this).attr("data-href");
			var paramList = [];
			for ( name in paramMap) {
				paramList.push(name + "=" + paramMap[name]);
			}
			location.href = "hsp_sign_in?" + paramList.join("&");
		});
	}
});