var cookie = require("common-libs/cookie"),
	base64 = require("common-libs/base64"),
	param = require("common-libs/param"),
	Config = require("./config");
// load jQuery extensions
require("common-libs/jquery.alert");
require("common-libs/jquery.tap");
$(function() {
	var $valid = $(".alert-wrap.validate"),
		$alert = $(".alert-window"),
		code;
	if (code = param.val("code")) {
		$(".report-page").show();
		// 列表页
		$(".report").tap(function(event, target) {
			var reportInfo = $(target).data("reportInfo"),
				reportId = reportInfo.reportId;
			location.href = "report_detail?reportId=" + reportId;
		});
		var searchParams = {hospitalCode: Config.HSPCODE, barCodeNo: code},
			$inspectLoading = $(".loading.inspect"),
			$alert = $(".alert-window");
		$.ajax({
			url : Config.GetDataURL,
			type: "get",
			data : {mName:"searchReportByBarCode", pContent: JSON.stringify(searchParams)},
			beforeSend: function() {
				$inspectLoading.show();
			},
			complete : function(data) {
				bOnAjax = false;
				$inspectLoading.hide();
				var dataText = data.responseText ? data.responseText.trim() : "";
				if (dataText === "" || Config.rhtml.test(dataText)) {
					$alert.alert(Config.NET_ERROR);
				} else {
					var jsonData = JSON.parse(dataText);
					if (jsonData.rspCode !== "1") {
						$alert.alert(jsonData.rspMsg || "未知错误", true);
					} else {
						// 标签定位
						var reports = jsonData.rspData.body,
							i = 0,
							len = reports.length,
							$reportTmpl = $(".inspection-reports").find(".report.template"),
							$pureTmpl = $reportTmpl.clone(true).removeClass("template"),
							printFlagMap = ["未打印", "已打印", "检测中"];
						if (len) {
							for ( ; i < len ; i++ ) {
								var report = reports[i],
									$report = $pureTmpl.clone(true);
								$report.find(".report-title").text(report.reportType)
									.end().find(".report-code").text(report.reportId)
									.end().find(".report-date").text(report.reportDate)
									.end().find(".print-flag").text(printFlagMap[+report.printFlag])
									.end().data("reportInfo", report).insertBefore($reportTmpl);
							}
							cookie.add("cachedCode", base64.encode(code), {expires: 90});
						} else {
							$alert.alert("未查到该报告单", true);
						}
					}
				}
			}
		});
	} else {
		$(".search-page").show();
		$valid.bindTouchHandler(".confirm", function(event) {
			event.preventDefault();
			$valid.close();
		});
		// 注入微信配置
		var configList,
			url = location.href,
			wellIndex,
			$scanWrap = $(".scan-wrap"),
			$codeResult = $(".input-code");
		if ((wellIndex = url.indexOf('#')) !== -1) {
			url = url.slice(0, wellIndex);
		}
		wx.ready(function(){
			// 配置完成后显示扫码服务入口
			$scanWrap.show();
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
						    jsApiList: ["scanQRCode"]
						});
					}
				}
			}
		});
		$scanWrap.tap(function(event, target) {
			event.preventDefault();
			wx.scanQRCode({
			    needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果
			    scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
			    success: function (res) {
			    	// 当needResult 为 1 时，扫码返回的结果
			    	var result = res.resultStr, // 返回结果需要作解析，格式：码制,码
			    		splitIndex = result.indexOf(","),
			    		code = result.slice(splitIndex + 1);
			    	$codeResult.val(code); 
				}
			});
		});
		// 绑定查询事件
		var cachedCode = cookie.get("cachedCode");
		cachedCode && $codeResult.val(base64.decode(cachedCode));
		$(".search-btn").on("touchend", function(event) {
			var code = $codeResult.val();
			if (code && (code = code.trim())) {
				param.val("code", code)
			} else {
				$valid.open("", "请输入报告单号");
			}
		});
	}
});