var cookie = require("common-libs/cookie"),
	param = require("common-libs/param"),
	Config = require("./config");
// load jQuery extensions
require("common-libs/jquery.alert");
$(function() {
	var reportId,
		queryType;
	if ((reportId = param.val("reportId"))) {
		var $alert = $(".alert-window"),
			searchParams = {
				hospitalCode : Config.HSPCODE,
				reportId : reportId
			};
		(queryType = param.val("queryType")) && (searchParams.queryType = queryType);
		$.ajax({
			url : Config.GetDataURL,
			type: "get",
			data : {mName:"searchReportDetail", pContent: JSON.stringify(searchParams)},
			beforeSend: function() {
				$(".loading").show();
			},
			complete : function(data) {
				$(".loading").hide();
				var dataText = data.responseText ? data.responseText.trim() : "";
				if (dataText === "" || Config.rhtml.test(dataText)) {
					alert(Config.NET_ERROR);
				} else {
					var jsonData = JSON.parse(dataText);
					if (jsonData.rspCode !== "1") {
						$alert.alert(jsonData.rspMsg, true);
					} else {
						var items = jsonData.rspData.body,
							i = 0,
							len = items.length,
							$itemTmpl = $(".template"),
							$pureTmpl = $itemTmpl.clone().removeClass("template"),
							arrowMap = {
								"h": "↑",
								"l": "↓"
							};
						$(".report-time").text(jsonData.reportDate);
						$(".project-name").text(jsonData.reportType).parent().toggle(!!jsonData.reportType);
						$(".diagnose").text(jsonData.diagnose).parent().toggle(!!jsonData.diagnose);
						$(".examine-doctor").text(jsonData.checkDoctor);
						for ( ; i < len ; i++ ) {
							var $item = $pureTmpl.clone(),
								item = items[i];
							$item.children(".item-name").text(item.itemName)
								.end().find(".item-range").text(item.itemRefrence)
								.end().find(".item-result").text(item.itemValue)
							// 为空或者为z时正常
							var flag = (item.itemFlag + "").trim();
							!(!flag || flag === "z") && $item.addClass("abnormal").find(".item-result").text(item.itemValue + "  " + (arrowMap[flag] ? arrowMap[flag] : flag));
							$item.insertBefore($itemTmpl);
						}
						$(".report-wrap").show();
					}
				}
			}
		});
	}
});