var param = require("common-libs/param"),
	cookie = require("common-libs/cookie"),
	md5 = require("common-libs/md5"),
	check = require("common-libs/formCheck"),
	Config = require("./config");
// load jQuery extensions
require("common-libs/jquery.alert");
$(function() {
	var $promptNow = null,
		$inputs = $(".input").not(".input-submit");
	$inputs.on("focusout", function(event) {
		var $this = $(this),
			checkFunc = check[$this.attr("check")],
			args = [$this.val()];
		$this.is(".input-confirm") && args.push($(".input-password").val());
		$this.toggleClass("ok", checkFunc ? checkFunc.apply(check, args) : false);
	});
	var timeLeft = 60,
		$alert = $(".alert-window");
	$(".get-code").on("touchend", function(event) {
		var $idnum = $(".input-idnum"),
			idnum = $idnum.val(),
			$this = $(this),
			$sendState = $(".send-state"),
			$timeLeft = $(".time-left");
		$idnum.blur();
		var canSend = $idnum.is(".ok");
		// 之后要把倒计时逻辑放入ajax请求成功后
		// 1、点击发送验证码
		// 2、短信发送中，灰色不可点击
		// 3、输入验证码（发送成功），灰色不可点击
		// 4、发送失败点击重发（发送失败），深橙色可点击
		if (!$this.is(".disabled") && canSend) {
			var codeParams = {
				userId : idnum,
				businessType : Config.BusinessType.RESET_PASSWORD
			};
			$.ajax({
				url : Config.GetDataURL,
				type : "get",
				data : {mName : "getCheckCode", pContent : JSON.stringify(codeParams)},
				beforeSend : function() {
					$sendState.text(Config.SENDING);
					$this.addClass("disabled sending");
				},
				complete : function(data) {
					var dataText = data.responseText ? data.responseText.trim() : "";
					if (dataText === "" || Config.rhtml.test(dataText)) {
						alert(Config.NET_ERROR);
					} else {
						var jsonData = JSON.parse(dataText);
						if (jsonData.rspCode !== "1") {
							// 发送失败
							$sendState.text(Config.SEND_FAILED);
							$this.removeClass("sending disabled").addClass("failed");
							$alert.alert(jsonData.rspMsg, true);
						} else {
							// 发送成功
							$sendState.text(Config.SEND_SUCCESS);
							$this.removeClass("sending failed");
							$timeLeft.show();
							var countdown = null;
							countdown = setInterval(function() {
								if (timeLeft--) {
									$timeLeft.text(timeLeft);
								} else {
									clearInterval(countdown);
									timeLeft = 60;
									$timeLeft.hide();
									$sendState.text(Config.SEND_DEFAULT);
									$this.removeClass("disabled");
								}
							}, 1000);
						}
					}
				}
			});
		} else if (!canSend) {
			var	retInfo = check.idnum($idnum.val(), true);
			$valid.open("", retInfo.msg);
		}
	});
	var $result = $(".alert-wrap.result"),
		$valid = $(".alert-wrap.validate");
	$valid.bindTouchHandler(".confirm", function(event) {
		event.preventDefault();
		$valid.close();
	});
	$(".find-form").on("submit", function(event) {
		event.preventDefault();
		$inputs.blur();
		var canSubmit = $(".ok").length === $inputs.length;
		if (canSubmit) {
			var idnum = $(".input-idnum").val(),
				verifyCode = $(".input-code").val(),
				password = $(".input-password").val(),
				resetParams = {
					userId : idnum,
					newUserPassword : md5.digest_s(password),
					verifyCode : verifyCode
				},
				$submit = $(".input-submit");
			$.ajax({
				url : Config.GetDataURL,
				type : "get",
				data : {mName : "passwordReset", pContent : JSON.stringify(resetParams)},
				beforeSend : function() {
					$submit.addClass("submiting").val("重置中...");
				},
				complete : function(data) {
					$submit.removeClass("submiting").val("重置");
					var dataText = data.responseText ? data.responseText.trim() : "";
					if (dataText === "" || Config.rhtml.test(dataText)) {
						alert(Config.NET_ERROR);
					} else {
						var jsonData = JSON.parse(dataText);
						if (jsonData.rspCode !== "1") {
							$result.bindTouchHandler(".close", function(event) {
								event.preventDefault();
								$result.close();
								$(this).off("touchend");
							}).open("重置密码失败", jsonData.rspMsg);
						} else {
							$result.bindTouchHandler(".close", function(event) {
								event.preventDefault();
								location.href = Config.IS_WX ? Config.getWxAuthPath("sign_in") : "sign_in";
							}).open("重置密码成功", "点击关闭前往登陆页");
						}
					}
				}
			});
		} else {
			var $warn = $inputs.filter(function() {
					return !$(this).is(".ok");
				}).first(),
				checkFunc = check[$warn.attr("check")],
				args = [$warn.val(), true];
			$warn.is(".input-confirm") && args.splice(1, 0, $(".input-password").val());
			$valid.open("", checkFunc ? checkFunc.apply(check, args).msg : "");
		}
	});
	$(".input-submit").on("touchend", function(event) {
		$(".find-form").submit();
	});
});