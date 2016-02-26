var cookie = require("common-libs/cookie"),
	base64 = require("common-libs/base64"),
	param = require("common-libs/param"),
	check = require("common-libs/formCheck"),
	replacer = require("common-libs/replacer"),
	Config = require("./config");
// load jQuery extensions	
require("common-libs/dateUtils");
require("common-libs/jquery.tap");
require("common-libs/jquery.alert");
$(function() {
	var idnum = cookie.get("idnum");
	if (idnum) {
		var mode = param.val("mode"),
			$page,
			$visitorLoading = $(".loading.visitor-loading"),
			$deleteLoading = $(".loading.delete-loading"),
			$alert = $(".alert-window"),
			$valid = $(".alert-wrap.validate"),
			$overlayer = $(".overlayer");
			idnum = base64.decode(idnum);
		$valid.bindTouchHandler(".confirm", function() {
			$valid.close();
		});
		if (!mode) {
			document.title = "常用就诊人";
			$page = $(".page.default").show();
			$(".add-btn").on("touchend", function(event) {
				param.val({
					"mode" : "add"
				});
			});
			var $deletePrompt = $(".alert-wrap.delete-prompt"),
				deleteParams = {},
				bOnDeleteAjax = false,
				$deletedVisitor = $();
			$deletePrompt.bindTouchHandler({
				".delete-cancel" : function() {
					$deletePrompt.close();
				},
				".delete-confirm" : function() {
					$deletePrompt.close();
					!bOnDeleteAjax && (bOnDeleteAjax = $.ajax({
						url : Config.GetDataURL,
						type: "get",
						data : {mName:"modifyCommonlyUser", pContent: JSON.stringify(deleteParams)},
						beforeSend: function() {
							$deleteLoading.show();
						},
						complete : function(data) {
							bOnDeleteAjax = false;
							$deleteLoading.hide();
							var dataText = data.responseText ? data.responseText.trim() : "";
							if (dataText === "" || Config.rhtml.test(dataText)) {
								alert(Config.NET_ERROR);
							} else {
								var jsonData = JSON.parse(dataText);
								if (jsonData.rspCode !== "1") {
									// 修改失败
									$alert.alert(jsonData.rspMsg, true);
								} else {
									// 更新页面
									$deletedVisitor.remove();
									$(".add-btn").show();
									$alert.alert("删除成功", false);
								}
							}
						}
					}));
				}
			});
			$(".opr.delete").on("touchend", function(event) {
				var $visitor =  $(this).closest(".visitor"),
					visitorInfo = $visitor.data("visitorInfo");
				deleteParams = {userId : idnum, typeId : Config.ModifyCommonUser.DELETE, patientID : visitorInfo.patientID};
				$deletedVisitor = $visitor;
				$deletePrompt.open();
			});
			$(".opr.edit").on("touchend", function(event) {
				var visitorInfo = $(this).closest(".visitor").data("visitorInfo");
				param.val({
					"mode" : "edit",
					"visitorInfo" : JSON.stringify(visitorInfo)
				});
			});
			// 用户滑动事件
			var $slider = $(".visitor").children(".info-wrap"),
				startPoint = {
					left: "0"
				},
				endPoint = {
					left: "-140px"
				},
				LEFT_RANGE = 70 * 3;
			var points = [startPoint, endPoint],
				_window_width = $(window).width(),
				direction = 0, // left: -1, right: 1
				startX = 0,
				endX = 0,
				bUserSelf,
				$curr;
			$slider.on("touchstart", function(event) {
				event.preventDefault();
				// 防止同时编辑
				var $this = $(this);
				if ($curr && $curr.data("pointIndex")) {
					($this.parent().index() != $curr.parent().index()) && $curr.css(points[0]).data("pointIndex", 0);
				}
				// 重置上次拖曳的各种信息
				$curr = $this;
				direction = 0;
				bUserSelf = $curr.parent().is(".user-self");
				// 获取起始坐标
				var touch = event.originalEvent.touches[0];
				startX = touch.pageX;
			});
			$slider.on("touchmove", function(event) {
				if (bUserSelf) {
					return;
				}
				event.preventDefault();
				var touch = event.originalEvent.changedTouches[0],
					currX = touch.pageX,
					diffX = currX - startX;
				// 判断滑动方向
				if (direction == 0) {
					if (diffX > 0) {
						direction = 1;
					}
					if (diffX < 0) {
						direction = -1;
					}
					if (direction != 0) {
						$curr.removeClass("static-mode");
					}
				}
				if ((direction == 1 && diffX >= 0) || (direction == -1 && diffX <= 0)) {
					var pointIndex = $curr.data("pointIndex") || 0;
					// 是否可切换
					if ((direction == 1 && pointIndex == 1) || (direction == -1 && pointIndex == 0)) {
						var currPoint = points[pointIndex],
							changeRatio = diffX / _window_width,
							currDest = {
								left: parseFloat(currPoint.left) + changeRatio * LEFT_RANGE
							};
						$curr.css(currDest);	
					}
				}
			});
			$slider.on("touchend", function(event) {
				if (bUserSelf) {
					return;
				}
				event.preventDefault();
				if (direction != 0) {
					$curr.addClass("static-mode");
					if (direction == 1) {
						$curr.css(points[0]).data("pointIndex", 0);
					}
					if (direction == -1) {
						$curr.css(points[1]).data("pointIndex", 1);
					}
				}
			});
			var commonUsersParams = { userID : idnum};
			$.ajax({
				url : Config.GetDataURL,
				type: "get",
				data : {mName:"searchCommonlyUsers", pContent: JSON.stringify(commonUsersParams)},
				beforeSend: function() {
					$visitorLoading.show();
				},
				complete : function(data) {
					$visitorLoading.hide();
					var dataText = data.responseText ? data.responseText.trim() : "";
					if (dataText === "" || Config.rhtml.test(dataText)) {
						alert(Config.NET_ERROR);
					} else {
						var jsonData = JSON.parse(dataText);
						if (jsonData.rspCode !== "1") {
							$alert.alert(jsonData.rspMsg, true);
						} else {
							var visitors = jsonData.rspData.body,
								userSelf = $.grep(visitors, function(i, val) {
									return val.patientID === idnum;
								}),
								$visitorTmpl = $(".visitor.template"),
								$pureVisitorTmpl = $visitorTmpl.clone(true).removeClass("template");
							!userSelf.length && visitors.unshift({
								userId : idnum,
								patientName : decodeURIComponent(base64.decode(cookie.get("name"))),
								patientID : idnum,
								patientPhoneNum : decodeURIComponent(base64.decode(cookie.get("phone")))
							})
							var i = 0,
								len = visitors.length;
							for ( ; i < len ; i++ ) {
								var visitor = visitors[i],
									$visitor = $pureVisitorTmpl.clone(true),
									bSelf = visitor.patientID == idnum;
								bSelf && $visitor.addClass("user-self");
								$visitor.find(".name").text(visitor.patientName)
									.end().find(".idnum").text(replacer.idnum(visitor.patientID))
									.end().find(".phone").text(bSelf ? visitor.patientPhoneNum : replacer.phone(visitor.patientPhoneNum))
									.end().data("visitorInfo", visitor).insertBefore($visitorTmpl);
							}
							len < 5 && $(".add-btn").show();
						}
					}
				}
			});
		} else {
			if (mode == "add") {
				document.title = "添加就诊人";
				var verify = param.val("verify");
				if (verify) {
					$page = $(".page.verify").show();
					addInfo = JSON.parse(verify);
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
								userId : addInfo.patientID,
								phoneNumber : addInfo.patientPhoneNum,
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
					var $code = $(".input-code").on("focusout", function() {
						var $this = $(this);
						$this.toggleClass("ok", check.code($this.val()));
					});
					$(".add-submit").on("touchend", function(event) {
						var $add = $(".add-submit"),
							bOnAddAjax = false;
						$code.blur();
						if ($code.is(".ok")) {
							var addParams = {userId: addInfo.userId, typeId: Config.ModifyCommonUser.ADD, patientID: addInfo.patientID, 
								patientName: addInfo.patientName, patientPhoneNum: addInfo.patientPhoneNum, verifyCode: $code.val()};
							addInfo.guarderIdNo && (addParams.guarderIdNo = addInfo.guarderIdNo);
							!bOnAddAjax && (bOnAddAjax = $.ajax({
								url : Config.GetDataURL,
								type: "get",
								data : {mName:"modifyCommonlyUser", pContent: JSON.stringify(addParams)},
								beforeSend: function() {
									$add.addClass("submiting").text("添加中...");
								},
								complete : function(data) {
									bOnAddAjax = null;
									$add.removeClass("submiting").text("确认提交");
									var dataText = data.responseText ? data.responseText.trim() : "";
									if (dataText === "" || Config.rhtml.test(dataText)) {
										alert(Config.NET_ERROR);
									} else {
										var jsonData = JSON.parse(dataText);
										if (jsonData.rspCode !== "1") {
											// 添加失败
											$alert.alert(jsonData.rspMsg, true);
										} else {
											// 更新页面
											$alert.alert("添加成功", false, function() {
												location.href = "my_visitors";
											});
										}
									}
								}
							}));
						} else {
							$valid.open("", validateCode($code.val()).msg);
						}
					})
				} else {
					$page = $(".page.add").show();
					var $inputs = $page.find(".add-input"),
						verify = {};
					$inputs.on("focusout", function(event) {
						var $this = $(this),
							checkFunc = check[$this.attr("check")];
						$this.toggleClass("ok", checkFunc ? checkFunc.call(check, $this.val()) : false);
					});
					var $guarderInfo = $(".guarder-info"),
						$inputGuarderId = $(".input-guarderId"),
						$alert = $(".alert-window");
					$inputGuarderId.on("focusout", function(event) {
						var retInfo = check.guarderIdnum($inputGuarderId.val(), true);
						!retInfo.flag && $alert.alert(retInfo.msg, true);
						$inputGuarderId.toggleClass("right", retInfo.flag);
					});
					$guarderInfo.bindTouchHandler({
						".alert": function(event) {
							if (!$(event.target).is(".input-guarderId")) {
								event.preventDefault();
								$inputGuarderId.blur();
							}
						},
						".cancel" : function(event) {
							event.preventDefault();
							$guarderInfo.close();
						},
						".submit" : function(event) {
							event.preventDefault();
							$inputGuarderId.blur();
							var bOk = $inputGuarderId.is(".right");
							if (bOk) {
								verify.guarderIdNo = $inputGuarderId.val();
								$guarderInfo.close();
								param.val({
									verify: JSON.stringify(verify)
								});
							}
						}
					});
					$(".add-next").on("touchend", function(event) {
						$inputs.blur();
						var canSubmit = $(".add-input.ok").length === $inputs.length;
						if (canSubmit) {
							verify = {
								userId: idnum, 
								patientID: $(".add-input.input-idnum").val(), 
								patientName: $(".add-input.input-name").val(), 
								patientPhoneNum: $(".add-input.input-phone").val()
							};
							if (!check.isAdult(verify.patientID)) {
								$guarderInfo.open();
							} else {
								param.val({
									verify: JSON.stringify(verify)
								});
							}
						} else {
							var $warn = $inputs.filter(function() {
									return !$(this).is(".ok");
								}).first(),
								checkFunc = check[$warn.attr("check")],
								retInfo = checkFunc ? checkFunc.call(check, $warn.val(), true) : "";
							$valid.open("", retInfo.msg);
						}
					});
				}
			} else if (mode == "edit") {
				document.title = "编辑就诊人";
				$page = $(".page.edit").show();
				var visitorInfo = JSON.parse(param.val("visitorInfo"));
				$page.find(".input-name").val(visitorInfo.patientName)
					.end().find(".input-old-phone").val(visitorInfo.patientPhoneNum);
				var bOnEditAjax = null,
					$edit = $(".edit-submit"),
					$editPhone = $(".input-new-phone"),
					editParams = {userId : idnum, typeId : Config.ModifyCommonUser.UPDATE};
				$editPhone.on("focusout", function(event) {
					$editPhone.toggleClass("ok", check.phone($editPhone.val()));
				});
				$edit.on("touchend", function(event) {
					$editPhone.blur();
					// 验证用户输入是否正确，符合格式
					var canSubmit = $editPhone.is(".ok");
					if (canSubmit) {
						editParams.patientPhoneNum = $editPhone.val();
						editParams.patientID = visitorInfo.patientID;
						editParams.patientName = visitorInfo.patientName;
						if (!bOnEditAjax) {
							bOnEditAjax = $.ajax({
								url : Config.GetDataURL,
								type: "get",
								data : {mName:"modifyCommonlyUser", pContent: JSON.stringify(editParams)},
								beforeSend: function() {
									$edit.addClass("submiting");
									$edit.text("修改中...");
								},
								complete : function(data) {
									bOnEditAjax = null;
									$edit.removeClass("submiting").text("确认修改");
									var dataText = data.responseText ? data.responseText.trim() : "";
									if (dataText === "" || Config.rhtml.test(dataText)) {
										alert(Config.NET_ERROR);
									} else {
										var jsonData = JSON.parse(dataText);
										if (jsonData.rspCode !== "1") {
											// 修改失败
											$alert.alert(jsonData.rspMsg, true);
										} else {
											// 更新页面
											$alert.alert("修改成功", false, function(){
												location.href = "my_visitors";
											});
										}
									}
								}
							});
						}
					} else {
						$valid.open("", check.phone($editPhone.val(), true).msg);
					}
				});
			} else {
				location.href = "my_visitors";
			}
		}
	} else {
		location.href = Config.IS_WX ? Config.getWxAuthPath("sign_in?referrer=my_visitors") : "sign_in?referrer=my_visitors";
	}
});