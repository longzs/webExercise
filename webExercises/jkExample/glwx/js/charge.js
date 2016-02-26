var cookie = require("common-libs/cookie"),
	base64 = require("common-libs/base64"),
	Config = require("./config");
// load jQuery extensions
require("common-libs/jquery.tap");
require("common-libs/jquery.alert");
$(function() {
	var idnum = cookie.get("idnum"),
		openId = cookie.get("openId");
	if (openId) {
		idnum = base64.decode(idnum);
		openId = base64.decode(openId);
		var $tabViews = $(".tab-view"),
			$alert = $(".alert-window"),
			$waitLoading = $(".loading.wait-loading"),
			$hisLoading = $(".loading.his-loading"),
			bHisSearched,
			hisAjax,
			waitParams = {hospitalCode: Config.HSPCODE, userId: idnum, typeId: "1"},
			historyParams = {hospitalCode: Config.HSPCODE, userId: idnum, typeId: "1"},
			name = decodeURIComponent(base64.decode(cookie.get("name")));
		$(".tabs").on("touchend", function(event) {
			$(".tab.selected").removeClass("selected");
			var $currTab = $(event.target).addClass("selected"),
				$currView = $tabViews.eq($currTab.index());
			$tabViews.each(function(i) {
				$(this).toggle(i == $currTab.index());
			});
			if ($currView.is(".charged")) {
				// 查询历史挂号单
				if (!bHisSearched && !hisAjax) {
					hisAjax = $.ajax({
						url : Config.GetDataURL,
						type: "get",
						data : {mName:"searchPrenosInfo", pContent: JSON.stringify(historyParams)},
						beforeSend: function() {
							$hisLoading.show();
						},
						complete : function(data) {
							$hisLoading.hide();
							hisAjax = null;
							var dataText = data.responseText ? data.responseText.trim() : "";
							if (dataText === "" || Config.rhtml.test(dataText)) {
								alert(Config.NET_ERROR);
							} else {
								var jsonData = JSON.parse(dataText);
								if (jsonData.rspCode !== "1") {
									$alert.alert(jsonData.rspMsg, true);
								} else {
									bHisSearched = true;
									var hisx = jsonData.rspData.paymentBody,
										i = 0,
										len = hisx.length,
										$hisTmpl = $(".his.template"),
										$pureHisTmpl = $hisTmpl.clone(true).removeClass("template");
									if (len) {
										for ( ; i < len ; i++ ) {
											var his = hisx[i],
												$his = $pureHisTmpl.clone(true),
												item1 = his.detailList,
												item2 = his.dupInvoiceList,
												excDeptNames = $.map(item2, function(val, i) {
													return val.excDeptName;
												});
											$his.find(".name").text(his.patientName)
												.end().find(".time").text(his.transDate)
												.end().find(".doc-name").text(his.expertName)
												.end().find(".exec-dep").text(excDeptNames.join("，"))
												.end().find(".total").text(his.totalFee);
											if (item1.length) {
												var $mediTmpl = $his.find(".medicine.template"),
													$pureMediTmpl = $mediTmpl.clone(true).removeClass("template"),
													j = 0,
													mediLen = item1.length;
												for ( ; j < mediLen ; j++ ) {
													var medi = item1[j],
														$medi = $pureMediTmpl.clone(true);
													$medi.find(".medi-name").text(medi.itemName)
														.end().find(".speci").text(medi.itemSpec)
														.end().find(".unit-price").text(medi.itemPrice)
														.end().find(".amount").text(medi.itemAmount)
														.end().find(".price").text(medi.itemCharges)
														.end().insertBefore($mediTmpl);
												}
											}
											$his.insertBefore($hisTmpl);
										}
									} else {
										$(".no-charged").show();
									}
								}
							}
						}
					});
				}
			}
		});
		$(".known").on("touchend", function(event) {
			$(".prompt").hide();
		});
		$(".container").tap(function(event, target) {
			event.stopPropagation();
			$(target).parent().toggleClass("unfold");
		});
		$.ajax({
			url : Config.GetDataURL,
			type: "get",
			data : {mName:"searchPrenosInfo", pContent: JSON.stringify(waitParams)},
			beforeSend: function() {
				$waitLoading.show();
			},
			complete : function(data) {
				$waitLoading.hide();
				var dataText = data.responseText ? data.responseText.trim() : "";
				if (dataText === "" || Config.rhtml.test(dataText)) {
					alert(Config.NET_ERROR);
				} else {
					var jsonData = JSON.parse(dataText);
					if (jsonData.rspCode !== "1") {
						$alert.alert(jsonData.rspMsg, true);
					} else {
						bWaitSearched = true;
						var waits = jsonData.rspData.unPaymentBody,
							i = 0,
							len = waits.length,
							$waitTmpl = $(".wait.template"),
							$pureWaitTmpl = $waitTmpl.clone(true).removeClass("template");
						if (len) {
							for ( ; i < len ; i++ ) {
								var wait = waits[i],
									$wait = $pureWaitTmpl.clone(true),
									item1 = wait.detailList,
									item2 = wait.dupInvoiceList;
								$wait.find(".name").text(wait.patientName)
									.end().find(".dep-name").text(wait.departmentName)
									.end().find(".time").text(wait.transDate)
									.end().find(".exec-dep").text(wait.excDeptName)
									.end().find(".total").text(wait.totalFee)
									.end().data("preNoInfo", wait);
								if (item1.length) {
									var $mediTmpl = $wait.find(".medicine.template"),
										$pureMediTmpl = $mediTmpl.clone(true).removeClass("template"),
										j = 0,
										mediLen = item1.length;
									for ( ; j < mediLen ; j++ ) {
										var medi = item1[j],
											$medi = $pureMediTmpl.clone(true);
										$medi.find(".medi-name").text(medi.itemName)
											.end().find(".speci").text(medi.itemSpec)
											.end().find(".unit-price").text(medi.itemPrice)
											.end().find(".amount").text(medi.itemAmount)
											.end().find(".price").text(medi.itemCharges)
											.end().insertBefore($mediTmpl);
									}
								}
								$wait.insertBefore($waitTmpl);
							}
							$(".waits .sum-wrap").show();
						} else {
							$(".no-waits").show();
						}
					}
				}
			}
		});
		var configList,
			url = location.href,
			wellIndex,
			MAX_SEARCH_TRIAL = 5,
			onPayAjax,
			$wxConfig = $(".overlayer.config"),
			$requestLoding = $(".loading.request"),
			$resultLoding = $(".loading.result");
		if ((wellIndex = url.indexOf('#')) !== -1) {
			url = url.slice(0, wellIndex);
		}
		wx.ready(function(){
			// 配置完成后可以执行支付
			$wxConfig.hide();
		});
		wx.error(function(){
			$wxConfig.hide();
			$alert.alert("微信配置失败，请尝试刷新", true);
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
			complete: function(data, status) {
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
		function execPay(chargeInfo) {
			if (onPayAjax) {
				return;
			}
			var	chargeData = {
					typeId: 3,
					hospitalCode: Config.HSPCODE,
					payMethod: Config.PayMethod.WX_PAY,
					oprUserId: idnum,
					userId: chargeInfo.userId,
					flow: chargeInfo.preNo,
					cardNo: chargeInfo.cardNo,
					cardNoType: chargeInfo.cardNoType,
					wxTradeType: "JSAPI",
					openId: openId,
					appId: configList.appId
				};
			// 调后台支付接口
			// registerRequestPay
			onPayAjax = $.ajax({
				url: Config.GetDataURL,
				type: "get",
				dataType: "json",
				data: {mName:"registerRequestPay", pContent: JSON.stringify(chargeData)},
				beforeSend: function() {
					$requestLoding.show();
				},
				complete: function(data) {
					// 获取prepay_id
					$requestLoding.hide();
					onPayAjax = null;
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
								    searchResult(rspData.rcptStreamNo, chargeInfo.itemName);
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
		function searchResult(rcptStreamNo, itemName) {
			$.ajax({
				url: Config.GetDataURL,
				type: "get",
				dataType: "json",
				data: {mName:"getMyOrderInfo", pContent: JSON.stringify({
					hospitalCode: Config.HSPCODE,
					rcptStreamNo: rcptStreamNo,
					userId: idnum,
					queryType: "3"
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
							var orders = jsonData.rspData.body;
							if (orders.length) {
								var orderInfo = orders[0];
								if (orderInfo.tranceStatus == "1") {
									// 查询缴费结果成功
									$alert.alert("缴费成功！两秒后页面将自动刷新", false, function() {
										location.reload();
									});
								} else {
									if (orderInfo.tranceStatus == "0") {
										$alert.alert("缴费失败，请尝试刷新以查看订单状态", true);
									} else {
										var $processing = $(".alert-wrap.processing");
										$processing.bindTouchHandler({
											".confirm": function(event) {
												event.preventDefault();
												$processing.close();
											}
										});
										$processing.open()
									}
								}
							} else {
								$alert.alert("未查询到相应订单，请尝试刷新以查看订单状态", true);
							}
						}
					}
				}
			});
		}
		$(".charge-btn").on("touchend", function(event) {
			var $this = $(this);
			if (!$this.is(".disabled")) {
				var $wait = $this.closest(".wait"),
					preNoInfo = $wait.data("preNoInfo");
				execPay(preNoInfo);
			}
		});
	} else {
		location.href = Config.IS_WX ? Config.getWxAuthPath("sign_in?referrer=charge") : "sign_in?referrer=charge";
	}
});