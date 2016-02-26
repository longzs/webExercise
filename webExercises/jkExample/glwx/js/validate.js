var param = require("common-libs/param"),
	cookie = require("common-libs/cookie"),
	md5 = require("common-libs/md5"),
	base64 = require("common-libs/base64"),
	check = require("common-libs/formCheck"),
	Config = require("./config");
require("common-libs/dateUtils");
// load jQuery extensions
require("common-libs/jquery.alert");
$(function() {
	var transData = param.val("transData"),
		oTransData = transData ? JSON.parse(transData) : {},
		name = oTransData.name,
		phone = oTransData.phone,
		idnum = oTransData.idnum,
		bNotAdult = oTransData.bNotAdult,
		$alert = $(".alert-window");
	// 若注册用户未成年则显示输入监护人信息
	bNotAdult && $(".guarderId").show();
	var $promptNow = null,
		$inputs = $(".input").not(".input-submit");
	!bNotAdult && ($inputs = $inputs.not(".input-guarderId"));
	$inputs.on("focusout", function(event) {
		var $this = $(this),
			checkFunc = check[$this.attr("check")],
			args = [$this.val()];
		$this.is(".input-confirm") && args.push($(".input-password").val());
		$this.toggleClass("ok", checkFunc ? checkFunc.apply(check, args) : false);
	});
	var timeLeft = 60;
	$(".get-code").on("touchend", function(event) {
		var $this = $(this),
			$sendState = $(".send-state"),
			$timeLeft = $(".time-left");
		// 之后要把倒计时逻辑放入ajax请求成功后
		// 1、点击发送验证码
		// 2、短信发送中，灰色不可点击
		// 3、输入验证码（发送成功），灰色不可点击
		// 4、发送失败点击重发（发送失败），深橙色可点击
		if (!$this.is(".disabled")) {
			var codeParams = {
				userId : idnum,
				phoneNumber : phone,
				businessType : Config.BusinessType.REGISTER
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
									// 重置验证码发送状态
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
		}
	});
	var $failed = $(".alert-wrap.failed"),
		$valid = $(".alert-wrap.validate");
	$valid.bindTouchHandler(".confirm", function(event) {
		event.preventDefault();
		$valid.close();
	});
	$failed.bindTouchHandler({
		".help" : function(event) {
			event.preventDefault();
			if (/.*Mobile.*/i.test(navigator.userAgent)) {
				location.href = "tel://02512320";
			}
		},
		".cancel" : function(event) {
			event.preventDefault();
			$failed.close();
		}
	});
	$(".validate-form").on("submit", function(event) {
		event.preventDefault();
		$inputs.blur();
		var canSubmit = $(".ok").length === $inputs.length;
		if (canSubmit) {
			var verifyCode = $(".input-code").val(),
				password = $(".input-password").val(),
				registerParams = {
					name : name,
					phoneNumber : phone,
					idNo : idnum.toUpperCase(),
					userPassword : md5.digest_s(password),
					verifyCode : verifyCode
				};
			if (bNotAdult) {
				registerParams.guarderIdNo = $(".input-guarderId").val();
			}
			var $submit = $(".input-submit");
			$.ajax({
				url : Config.GetDataURL,
				type : "get",
				data : {mName : "userRegister", pContent : JSON.stringify(registerParams)},
				beforeSend : function() {
					$submit.addClass("submiting").val("注册中...");
				},
				complete : function(data) {
					var dataText = data.responseText ? data.responseText.trim() : "";
					$submit.removeClass("submiting").val("注册");
					if (dataText === "" || Config.rhtml.test(dataText)) {
						alert(Config.NET_ERROR);
					} else {
						var jsonData = JSON.parse(dataText);
						if (jsonData.rspCode !== "1") {
							$failed.open("", jsonData.rspMsg);
						} else {
							var rspData = jsonData.rspData;
							// 消息推送
							if (Config.IS_WX) {
								var remark = "手机号：" + phone + "\n\n现在您可以使用移动医疗就诊服务。";
								$.ajax({
									url : Config.GetDataURL,
									type : "get",
									data : {mName : "sendMessageService", pContent : JSON.stringify({
										appid: Config.wxAppId,
										openId: "",
										code: param.val("code"),
										templateId: Config.InfoTemplates.SIGN_UP,
										topcolor: "#FF0000",
										data: {
											"first": {
											    "value": "您已成功注册，注册信息如下：\n",
											    "color": "#173177"
											},
											"keyword1": {
											    "value": registerParams.name,
											    "color": "#173177"
											},
											"keyword2": {
											    "value": (new Date()).format("yyyy年mm月dd日"),
											    "color": "#173177"
											},
											"keyword3": {
												"value": registerParams.idNo,
												"color": "#173177",
											},
											"remark": {
												"value": remark
											}
										}
									})},
									complete : function(data) {
										var dataText = data.responseText ? data.responseText.trim() : "";
										if (dataText && !Config.rhtml.test(dataText)) {
											var jsonData = JSON.parse(dataText);
											if (jsonData.rspCode !== "1") {
												if (jsonData.errorCode === "1") {
													// 重载页面，获取新code
													location.href = Config.getWxAuthPath("validate?transData=" + transData);
												}
											}
										}
										$alert.alert("注册成功！两秒后跳转到首页", false, function() {
											location.href = "home";
										});
									}
								});
							} else {
								$alert.alert("注册成功！两秒后跳转到首页", false, function() {
									location.href = "home";
								});
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
				args = [$warn.val(), true];
			$warn.is(".input-confirm") && args.splice(1, 0, $(".input-password").val());
			$valid.open("", checkFunc ? checkFunc.apply(check, args).msg : "");
		}
	});
	$(".input-submit").on("touchend", function(event) {
		event.preventDefault();
		$(".validate-form").submit();
	});
});