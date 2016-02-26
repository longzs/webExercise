var cookie = require("common-libs/cookie"),
	param = require("common-libs/param"),
	Config = require("./config");
// load jQuery extensions
require("common-libs/jquery.tap");
$(function() {
	var transData = param.val("transData"),
		oTransData = transData ? JSON.parse(transData) : {},
		$loading = $(".loading");
	$(".btn.see").tap(function(event) {
		event.preventDefault();
		location.href = "my_register";
	});
	$(".btn.back").tap(function(event) {
		event.preventDefault();
		location.href = "home";
	});
	$.ajax({
		url : Config.GetDataURL,
		type : "get",
		data : {mName : "preRegisterConfirm", pContent : transData},
		dataTye : "json",
		beforeSend : function() {
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
					// 预约失败
					var errorInfo = jsonData.rspMsg == "超过一周退约最大次数" ? "本周您预约次数已用完" : jsonData.rspMsg;
					$(".result.failed").find(".error-msg").text(errorInfo)
						.end().show();
				} else {
					// 预约下单成功
					var reserve = jsonData.rspData,
						sectionId = oTransData.sectionId,
						segFlag = +sectionId.match(/segTime(\d)/)[1];
					// seeTime.length == "1" && (seeTime = Config.SeeTimeStrings[+seeTime - 1]);
					$(".result.success").find(".verifycode").text(reserve.verifyCode)
						.end().find(".location").text(reserve.registerAddress || "请咨询服务台")
						.end().find(".time").text(segFlag > 2 ? "14:30" : "9:30")
						.end().show();
				}
			}
		}
	});
});
