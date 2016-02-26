var cookie = require("common-libs/cookie"),
	base64 = require("common-libs/base64"),
	Config = require("./config");
// load jQuery extensions
require("common-libs/dateUtils");
require("common-libs/jquery.tap");
require("common-libs/jquery.alert");
$(function() {
	var idnum = cookie.get("idnum");
	if (idnum) {
		idnum = base64.decode(idnum);
		var name = base64.decode(cookie.get("name")),
			$loading = $(".loading.record-loading"),
			$alert = $(".alert-window"),
			$overlayer = $(".overlayer"),
			params = {hospitalCode: Config.HSPCODE, "userId": idnum, "typeId" : "0"};
		// 退约逻辑处理
		var $cancelPrompt = $(".cancel-prompt"),
			$cancelResult = $(".cancel-result"),
			$cancelLoading = $(".loading.cancel-loading"),
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
				location.reload();
			}
		});
		$(".cancel-btn").on("touchend", function(event) {
			event.stopPropagation();
			var $this = $(this);
			if (!$this.is(".disabled")) {
				var $order = $this.closest(".order"),
					orderInfo = $order.data("orderInfo");
				cancelParams = {
					hospitalCode : Config.HSPCODE,
					userId : idnum,
					preRegisterFlow : orderInfo.registerFlow,
					reservationFrom : orderInfo.reservationFrom
				};
				$cancelPrompt.open();
			}
		});
		$(".order").tap(function(event) {
			var $this = $(this),
				$target = $(event.target),
				orderInfo = $this.data("orderInfo");
			if ($target.is(".reserve-btn")) {
				var docInfo = {
						hspCode : orderInfo.hospitalCode,
						hspName : orderInfo.hospitalName,
						depId : orderInfo.departmentId,
						depName : orderInfo.departmentName
				};
				if (orderInfo.expertId) {
					$.extend(docInfo, {
						expertId : orderInfo.expertId,
						expertName : orderInfo.expertName,
						expertTitle : orderInfo.expertTitle,
						expertImg: orderInfo.imgUrl
					});
					location.href = "doctor_info?transData=" + encodeURIComponent(JSON.stringify(docInfo));
				} else {
					location.href = "select_doctor?transData=" + encodeURIComponent(JSON.stringify(docInfo));
				}
			} else {
				if ($target.is(".pay-btn")) {
					var registerInfo = {
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
				} else {
					orderInfo.bHistory = $this.is(".history");
					location.href = "register_info?transData=" + encodeURIComponent(JSON.stringify(orderInfo));
				}
			}
		});
		$.ajax({
			url : Config.GetDataURL,
			type: "get",
			data : {mName:"searchUserRegisterInfo", pContent: JSON.stringify(params)},
			beforeSend: function() {
				$loading.show();
			},
			complete : function(data) {
				$loading.hide();
				var dataText = data.responseText ? data.responseText.trim() : "";
				if (dataText === "" || Config.rhtml.test(dataText)) {
					alert(Config.NET_ERROR);
				} else {
					var jsonData = JSON.parse(dataText);
					if (jsonData.rspCode !== "1") {
						$alert.alert(jsonData.rspMsg, true);
					} else {
						var orders = jsonData.rspData.body,
							$orderTmpl = $(".order.template"),
							$pureTmpl = $orderTmpl.clone(true).removeClass("template"),
							i = 0,
							len = orders.length,
							typeMap = {
								"1": "register",
								"2": "reserve"
							};
						if (len) {
							for ( ; i < len ; i++ ) {
								var $order = $pureTmpl.clone(true),
									order = orders[i],
									seeTime = order.seeTime, 
									visitTime = seeTime.length == 1 ? Config.SeeTimeStrings[parseInt(seeTime) - 1] : seeTime;
								$order.toggleClass("history", !!+order.isHistory);
								// 处理状态栏
								if (order.typeId === "2") {
									// 需要增加字段判断是否为历史预约
									if (+order.isHistory) {
										var statusStr = Config.Status[order.status];
										$order.find(".visit-state").text(statusStr).toggle(!!statusStr);
									} else {
										var todayTime = (new Date()).getTime(),
											clinicTime = order.clinicDate.toDate().getTime(),
											diffDates = (clinicTime - todayTime) / (1000 * 60 * 60 * 24) | 0;
										if (diffDates > 0) {
											$order.find(".cancel-btn").toggleClass("disabled", !+order.cancelFlag).show()
												.end().find(".day-left").children(".left-days").text(diffDates + "天")
												.end().show();
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
											order.status === "5" && $order.addClass("pay-needed");
											// 当前是否已超过可支付时间
											// bDisabled && $order.find(".pay-btn").addClass("disabled");
										} else {
											var statusStr = Config.Status[order.status];
											$order.addClass("history").find(".visit-state").text(statusStr).toggle(!!statusStr);
										}
									}
								} else {
									// 挂号记录
									if (+order.isHistory) {
										$order.find(".visit-state").text("已就诊").show();
									} else {
										$order.find(".visit-state").text("今日就诊").show();
									}
								}
								$order.addClass(typeMap[order.typeId]).find(".doc-name").text(order.expertName || Config.NORMAL)
									.end().find(".dep-name").text(order.departmentName)
									.end().find(".visit-time").text(order.clinicDate + " " + Config.Weekdays[order.clinicDate.toDate().getDay()] + " " + visitTime)
									.end().find(".visitor-name").text(order.name)
									.end().find(".charge").text(order.totalFee)
									.end().find(".order-no").text(order.orderNo)
									.end().find(".verify-code").text(order.verifyCode)
									.end().data("orderInfo", order).insertBefore($orderTmpl);
							}
						} else {
							$(".no-result").show();
						}
					}
				}
			}
		});
	} else {
		location.href = Config.IS_WX ? Config.getWxAuthPath("sign_in?referrer=my_register") : "sign_in?referrer=my_register";
	}
});