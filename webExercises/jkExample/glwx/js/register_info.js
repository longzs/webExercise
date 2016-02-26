var cookie = require("common-libs/cookie"),
	base64 = require("common-libs/base64"),
	param = require("common-libs/param"),
	replacer = require("common-libs/replacer"),
	Config = require("./config");
// load jQuery extensions
require("common-libs/dateUtils");
require("common-libs/jquery.tap");
require("common-libs/jquery.alert");
$(function() {
	var idnum = cookie.get("idnum");
	if (idnum) {
		idnum = base64.decode(idnum);
		var transData = param.val("transData"),
			oTransData = transData ? JSON.parse(transData) : {},
			$alert = $(".alert-window")
			$order = $(".order-detail");
		if (!$.isEmptyObject(oTransData)) {
			var typeMap = {
				"1": "register",
				"2": "reserve"
			};
			$order.addClass(typeMap[oTransData.typeId]);
			// ----信息填充-----
			// 就诊人信息
			$(".visitor").text(oTransData.name);
			$(".idnum").text(replacer.idnum(oTransData.idNo));
			$(".phone").text(idnum === oTransData.idNo ? oTransData.phone : replacer.phone(oTransData.phone));
			// 就诊信息
			$(".doc-name").text(oTransData.expertName || Config.NORMAL);
			$(".dep-name").text(oTransData.departmentName);
			$(".location").text(oTransData.position || "询问服务台");
			$(".charge").text(oTransData.totalFee);
			var seeTime = oTransData.seeTime,
				visitTime = seeTime.length == 1 ? Config.SeeTimeStrings[parseInt(seeTime) - 1] : seeTime;
			$(".visit-time").text(oTransData.clinicDate + " " + Config.Weekdays[oTransData.clinicDate.toDate().getDay()] + " " + visitTime);
			$(".order-no").text(oTransData.orderNo);
			// 取号信息
			$(".verify-code").text(oTransData.verifyCode);
			// 订单信息
			if (oTransData.typeId === "2") {
				// 状态栏
				if (oTransData.bHistory) {
					// 历史记录
					var statusStr = Config.Status[oTransData.status];
					$order.addClass("history", oTransData.bHistory)
						.find(".visit-state, .order-state").text(statusStr).toggle(!!statusStr);
				} else {
					$order.find(".order-state").text("未完成");
					var todayTime = (new Date()).getTime(),
						clinicTime = oTransData.clinicDate.toDate().getTime(),
						diffDates = (clinicTime - todayTime) / (1000 * 60 * 60 * 24) | 0;
					if (diffDates > 0) {
						$order.find(".cancel-btn").toggle(!!+oTransData.cancelFlag)
							.end().find(".day-left").children(".left-days").text(diffDates + "天")
							.end().show();
						// 退约逻辑
						var $cancelPrompt = $(".cancel-prompt"),
							$cancelResult = $(".cancel-result"),
							$cancelLoading = $(".common-loading"),
							cancelParams = {};
						$cancelPrompt.bindTouchHandler({
							".cancel" : function() {
								$cancelPrompt.close();
							},
							".confirm" : function() {
								$cancelPrompt.close();
								$.ajax({
									url : Config.GetDataURL,
									type: "get",
									data : {mName:"preRegisterCancel", pContent: JSON.stringify(cancelParams)},
									beforeSend: function() {
										$cancelLoading.show();
									},
									complete : function(data) {
										$cancelLoading.hide();
										var dataText = data.responseText ? data.responseText.trim() : "";
										if (dataText === "" || Config.rhtml.test(dataText)) {
											alert(Config.NET_ERROR);
										} else {
											var jsonData = JSON.parse(dataText);
											if (jsonData.rspCode !== "1") {
												$cancelResult.open("", jsonData.rspMsg);
											} else {
												// 预约取消成功
												$cancelResult.open("", "预约取消成功");
											}
										}
									}
								});
							}
						});
						$cancelResult.bindTouchHandler({
							".confirm" : function() {
								location.href = "my_register";
							}
						});
						$(".cancel-btn").on("touchend", function(event) {
							event.stopPropagation();
							cancelParams = {hospitalCode : Config.HSPCODE, userId : idnum, preRegisterFlow : oTransData.registerFlow, reservationFrom : oTransData.reservationFrom};
							$cancelPrompt.open();
						});
					} else if (diffDates == 0) {
						// 已到就诊当日
						$order.find(".no-left").show();
						var amOrPm = 0,
							bDisabled = false,
							today = new Date(),
							timeNow = (today.getHours() < 10 ? "0" + today.getHours() : today.getHours()) + ":" + (today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes());
						if (visitTime.length === 2) {
							visitTime  === "下午" && (amOrPm = 1);
						} else {
							visitTime.indexOf(":") && seeTime === "3" && (amOrPm = 1);
						}
						if (amOrPm) {
							bDisabled = "17:00".localeCompare(timeNow) === -1;
						} else {
							bDisabled = "11:30".localeCompare(timeNow) === -1;
						}
						// 判断是否需要支付
						oTransData.status === "5" && $order.addClass("pay-needed");
						// 当前是否已超过可支付时间
						// bDisabled && $order.find(".pay-btn").addClass("disabled");
					}
				}
			} else {
				// 挂号信息
				var statusStr = Config.Status[+oTransData.status];
				$order.find(".visit-state, .order-state").text(statusStr).toggle(!!statusStr)
					.end().find(".pay-state").text("已支付");
			}
			$(".pay-btn").tap(function(event) {
				var orderInfo = oTransData,
					registerInfo = {
						hspCode: orderInfo.hospitalCode,
						depId: orderInfo.departmentId,
						depName: orderInfo.departmentName,
						clinicDate : orderInfo.clinicDate,
						seeTime : orderInfo.seeTime,
						scheduFlow : orderInfo.registerFlow,
						totalFee : orderInfo.totalFee,
						sectionId: orderInfo.sectionId,
						reservationFrom: orderInfo.reservationFrom,
						idNo: orderInfo.idNo,
						bRegister: 1,
						typeId: Config.RegisterType.FETCH
					};
				if (orderInfo.expertId) {
					$.extend(registerInfo, {
						expertId: orderInfo.expertId,
						expertName : orderInfo.expertName,
						expertTitle : orderInfo.expertTitle,
						imgURL : orderInfo.imgUrl
					});
				} else {
					$.extend(registerInfo, {
						expertName : Config.NORMAL
					});
				}
				location.href = "place_order?transData=" + encodeURIComponent(JSON.stringify(registerInfo));
			});
			// 再次预约
			$(".reserve-btn").tap(function(event, target) {
				var docInfo = {
					hspCode : oTransData.hospitalCode,
					hspName : oTransData.hospitalName,
					depId : oTransData.departmentId,
					depName : oTransData.departmentName
				};
				if (oTransData.expertId) {
					$.extend(docInfo, {
						expertId : oTransData.expertId,
						expertName : oTransData.expertName,
						expertTitle : oTransData.expertTitle
					});
					location.href = "doctor_info?transData=" + encodeURIComponent(JSON.stringify(docInfo));
				} else {
					location.href = "select_doctor?transData=" + encodeURIComponent(JSON.stringify(docInfo));
				}
			});
		}
	} else {
		location.href = "sign_in?referrer=my_register";
	}
});