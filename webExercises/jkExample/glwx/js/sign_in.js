var param = require("common-libs/param"),
	cookie = require("common-libs/cookie"),
	md5 = require("common-libs/md5"),
	base64 = require("common-libs/base64"),
	check = require("common-libs/formCheck"),
	Config = require("./config");
// load jQuery extensions
require("common-libs/jquery.tap");
require("common-libs/jquery.alert");
$(function() {
	// 页面跳转入口
	$(".forget-password").on("touchend", function(event) {
		event.preventDefault();
		location.href = "forget";
	});
	$(".register").on("touchend", function(event) {
		event.preventDefault();
		location.href = "sign_up";
	});
	// 表单检查
	var $inputs = $(".input").not(".input-submit");
	$inputs.on("focusout", function(event) {
		var $this = $(this),
			checkFunc = check[$this.attr("check")];
		$this.toggleClass("ok", checkFunc ? checkFunc.call(check, $this.val()) : false);
	});
	// 表单验证提示框
	var $valid = $(".alert-wrap.validate"),
		$error = $(".alert-wrap.error");
	$valid.bindTouchHandler(".confirm", function(event) {
		event.preventDefault();
		$valid.close();
	});
	$error.bindTouchHandler(".confirm", function(event) {
		event.preventDefault();
		$error.close();
	});
	// 全局缓存的jQuery对象
	var $alert = $(".alert-window"),
		$submit = $(".input-submit"),
		code = param.val("code");/*授权凭证码*/
	$(".login-form").on("submit", function(event) {
		event.preventDefault();
		var $this = $(this);
		$inputs.blur();
		var canSubmit = $(".ok").length === $inputs.length;
		if (canSubmit) {
			var idnum = $(".input-idnum").val(),
				idnum = check.idnumAlike(idnum) ? idnum.toUpperCase() : idnum,
				password = $(".input-password").val(),
				loginParams = {
					userId : idnum,
					userPassword : md5.digest_s(password)
				};
			if (code) {
				loginParams.code = code;
				loginParams.appId = Config.wxAppId;
				loginParams.pltId = Config.pltId;
				loginParams.productId = Config.productId;
			}
			$.ajax({
				url : Config.GetDataURL,
				type: "get",
				data : {mName : "userLogin", pContent : JSON.stringify(loginParams)},
				dataType: "json",
				beforeSend : function() {
					$submit.addClass("submiting").val("登录中...");
				},
				complete : function(data) {
					var dataText = data.responseText ? data.responseText.trim() : "";
					$submit.removeClass("submiting").val("登录");
					if (dataText === "" || Config.rhtml.test(dataText)) {
						alert(Config.NET_ERROR);
					} else {
						var jsonData = JSON.parse(dataText);
						if (jsonData.rspCode !== "1") {
							if (jsonData.errorCode === "1") {
								// 重载页面，获取新code
								location.href = Config.getWxAuthPath("sign_in");
							} else {
								$error.open("", jsonData.rspMsg);
							}
						} else {
							var rspData = jsonData.rspData;
							if (navigator.cookieEnabled) {
								cookie.add("idnum", base64.encode(rspData.idNo), {expires: 90});
								cookie.add("password", base64.encode(loginParams.userPassword), {expires: 90});
								cookie.add("phone", base64.encode(rspData.phoneNumber), {expires: 90});
								cookie.add("name", base64.encode(rspData.name), {expires: 90});
								cookie.add("sid", rspData.sessionId, {expires: 90});
								cookie.add("openId", base64.encode(rspData.openId), {expires: 90});
								var referrer;
								if ((referrer = param.val("referrer"))) {
									var transData = encodeURIComponent(param.val("transData")),
										targetHref = referrer;
									targetHref += (transData ? ("?transData=" + transData) : "");
									location.href = targetHref;
								} else {
									location.href = "home";
								}
							} else {
								$submit.removeClass("submiting").val("登录");
							}
						}
					}
				}
			});
		} else {
			var $warn = $inputs.filter(function() {
					return !$(this).is(".ok");
				}).first(),
				checkFunc = check[$warn.attr("check")],
				retInfo = checkFunc ? checkFunc.call(check, $warn.val(), true) : "";
			$valid.open("", retInfo.msg);
		}
	});
	$(".input-submit").tap(function(event) {
		event.preventDefault();
		$(".login-form").submit();
	});
});