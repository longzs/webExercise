var cookie = require("common-libs/cookie"),
	base64 = require("common-libs/base64"),
	param = require("common-libs/param"),
	Config = require("./config");
// load jQuery extensions
require("common-libs/jquery.alert");
require("common-libs/jquery.tap");
$(function() {
	var openId,
		transData = param.val("transData");
	if ((openId = cookie.get("openId"))) {
		openId = base64.decode(openId);
		var idnum = base64.decode(cookie.get("idnum")),
			oTransData = transData ? JSON.parse(transData) : {},
			recordStr = base64.decode(cookie.get("register_records")),
			registerRecords = recordStr ? JSON.parse(recordStr) : {};
		var configList,
			url = location.href,
			wellIndex,
			MAX_SEARCH_TRIAL = 5,
			$wxConfig = $(".overlayer.config"),
			$requestLoding = $(".loading.request-loading"),
			$resultLoding = $(".loading.result-loading"),
			$alert = $(".alert-window");
		if ((wellIndex = url.indexOf('#')) !== -1) {
			url = url.slice(0, wellIndex);
		}
		wx.ready(function(){
			$wxConfig.hide();
			// 配置完成后可以执行支付
			execPay();
		});
		wx.error(function(){
			$wxConfig.hide();
			$alert.alert("微信配置失败，请尝试刷新");
		});
		// 获取jsapi_ticket, 作微信配置用
		$.ajax({
			url: Config.GetDataURL,
			type: "get",
			dataType: "json",
			data: {mName:"getWeiXinCertificate", pContent: JSON.stringify({
				appId: Config.wxAppId,
				url: encodeURIComponent(url)
			})},
			cache: false,
			complete: function(data) {
				var dataText = data.responseText ? data.responseText.trim() : "";
				if (dataText === "" || Config.rhtml.test(dataText)) {
					alert(Config.NET_ERROR);
				} else {
					var jsonData = JSON.parse(dataText);
					if (jsonData.rspCode !== "1") {
						$alert.alert(jsonData.rspMsg, true);
					} else {
						configList = jsonData.signInfo;
						wx.config({
						    debug: false,
						    appId: configList.appId,
						    timestamp: configList.timestamp,
						    nonceStr: configList.nonceStr,
						    signature: configList.signature,
						    jsApiList: ["chooseWXPay"]
						});
					}
				}
			}
		});
		function execPay() {
			var	registerData = {
					hospitalCode: Config.HSPCODE,
					typeId: oTransData.typeId || Config.RegisterType.REGISTER, // 挂号类型
					payMethod: Config.PayMethod.WX_PAY,
					oprUserId: idnum,
					userId: oTransData.userId,
					flow: oTransData.scheduFlow,
					cardNo: oTransData.cardNo,
					cardNoType: oTransData.cardNoType,
					reservationFrom: oTransData.reservationFrom,
					wxTradeType: "JSAPI",
					openId: openId,
					appId: configList.appId
				},
				recordFlag = registerData.userId + registerData.flow;
			/*if ($.inArray(recordFlag, registerRecords) != -1) {
				$alert.alert("挂号失败！用户已经存在相同的挂号记录！系统将自动跳到首页。", true, function() {
					location.href = "home";
				});
				return;
			}*/
			if (record = registerRecords[recordFlag]) {
				if (record.processed) {
					$alert.alert("挂号失败！用户已经存在相同的挂号记录！系统将自动跳到首页。", true, function() {
						location.href = "home";
					});
				} else {
					searchResult(record.rcptStreamNo, recordFlag)
				}
				return;
			}
			// 调后台支付接口
			// registerRequestPay
			$.ajax({
				url: Config.GetDataURL,
				type: "get",
				dataType: "json",
				data: {mName:"registerRequestPay", pContent: JSON.stringify(registerData)},
				beforeSend: function() {
					$requestLoding.show();
				},
				complete: function(data) {
					// 获取prepay_id
					$requestLoding.hide();
					var dataText = data.responseText ? data.responseText.trim() : "";
					if (dataText === "" || Config.rhtml.test(dataText)) {
						alert(Config.NET_ERROR);
					} else {
						var jsonData = JSON.parse(dataText);
						if (jsonData.rspCode !== "1") {
							$alert.alert(jsonData.rspMsg, true);
						} else {
							var rspData = jsonData.rspData;
							wx.chooseWXPay({
							 	timestamp: rspData.timeStamp,
							    nonceStr: rspData.nonceStr,
							    package: "prepay_id=" + rspData.prepayId,
							    signType: 'MD5',
							    paySign: rspData.paySign,
							    success: function (res) {
								    // 支付成功回调
								    searchResult(rspData.rcptStreamNo, recordFlag);
							    },
							    error: function() {
							    	$alert.alert("支付失败");
							    }
							});
						}
					}
				}
			});
		}
		function searchResult(rcptStreamNo, recordFlag) {
			$.ajax({
				url: Config.GetDataURL,
				type: "get",
				dataType: "json",
				data: {mName:"getMyOrderInfo", pContent: JSON.stringify({
					hospitalCode: Config.HSPCODE,
					rcptStreamNo: rcptStreamNo,
					userId: oTransData.userId,
					queryType: "1"
				})},
				beforeSend: function() {
					$resultLoding.show();
				},
				complete: function(data) {
					// 获取prepay_id
					var dataText = data.responseText ? data.responseText.trim() : "";
					if (dataText === "" || Config.rhtml.test(dataText)) {
						alert(Config.NET_ERROR);
					} else {
						$resultLoding.hide();
						var jsonData = JSON.parse(dataText);
						if (jsonData.rspCode !== "1") {
							// 后台程序执行时出错
							$alert.alert(jsonData.rspMsg, true);
						} else {
							var orderInfo = jsonData.rspData.body[0];
							// tranceStatus
							if (orderInfo.tranceStatus == "1") {
								// 查询挂号结果成功
								// 防止重复下单
								registerRecords[recordFlag] = {
									rcptStreamNo: rcptStreamNo,
									processed: true
								};
								cookie.add("register_records", base64.encode(JSON.stringify(registerRecords)), {expires: 1 / 2});
								// 填充订单信息
								var seeTime = orderInfo.seeTime,
									visitTime = seeTime.length == 1 ? Config.SeeTimeStrings[parseInt(seeTime) - 1] : seeTime;
								// 基础信息
								$(".location").text(orderInfo.position || "请咨询服务台");
								$(".name").text(orderInfo.name);
								$(".dep-name").text(orderInfo.departmentName);
								$(".doc-name").text(orderInfo.doctorName || Config.NORMAL);
								$(".time").text(orderInfo.clinicDate + Config.Weekdays[(new Date()).getDay()] + visitTime);
								$(".order-no").text(orderInfo.orderNo);
								$(".charge").text(orderInfo.totalFee);
								$(".result.success").show();
							} else {
								if (orderInfo.tranceStatus == "0") {
									$(".result.failed").show();
								} else {
									registerRecords[recordFlag] = {
										rcptStreamNo: rcptStreamNo,
										processed: false
									};
									cookie.add("register_records", base64.encode(JSON.stringify(registerRecords)), {expires: 1 / 2});
									$(".result.processing").show();
								}
							}
						}
					}
				}
			});
		}
		// 按钮事件绑定
		$(".btn.see").tap(function(event) {
			event.preventDefault();
			location.href = "my_register";
		});
		$(".btn.back").tap(function(event) {
			event.preventDefault();
			location.href = "home";
		});
	} else {
		location.href = Config.IS_WX ? Config.getWxAuthPath("sign_in?transData=" + transData + "&referrer=register_result") : ("sign_in?transData=" + encodeURIComponent(transData) + "&referrer=register_result");
	}
});