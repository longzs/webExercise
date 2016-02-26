var param = require("common-libs/param"),
	store = require("common-libs/storage"),
	Config = require("./config");
// load built-in js Object extensions
require("common-libs/dateUtils");
// load jQuery extensions
require("common-libs/jquery.tap");
require("common-libs/jquery.alert");
$(function() {
	var zyUsers = store.get("zyUsers"),
		currUser = store.get("currUser"),
		zyInfo,
		pltId = param.val("pltId");
	zyUsers = zyUsers ? JSON.parse(decodeURIComponent(zyUsers)) : {};
	if (pltId) {
		$(".navigator").children("#back").tap(function(event) {
			event.preventDefault();
			history.go(-1);
		}).end().show();
	}
	// 用户切换
	$(".switch-user").on("touchend", function(event) {
		event.preventDefault();
		location.href = pltId ? "hsp_account?pltId=" + pltId : "hsp_account";
	});
	if ((zyInfo = zyUsers[currUser])) {
		// 填充住院用户信息
		$(".name").text(zyInfo.name);
		$(".area").text(zyInfo.areaName + "/" + zyInfo.sickBed + "床");
		$(".time").text(zyInfo.zyDate);
		var $loading = $(".loading"),
			$alert = $(".alert-window"),
			searchParams = {
				hospitalCode: Config.HSPCODE,
				zyFlow: zyInfo.zyFlow
			};
		$.ajax({
			url : Config.GetDataURL,
			type: "get",
			data : {mName:"getZYBillDetailList", pContent: JSON.stringify(searchParams)},
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
						var zyData = jsonData.rspData,
							items = zyData.body,
							i = 0,
							len = items.length,
							$itemTmpl = $(".item.template"),
							$pureItemTmpl = $itemTmpl.clone().removeClass("template");
						$(".dep-name").text(zyData.departmentName);
						$(".code").text(zyInfo.patientId);
						$(".leave-time").text(zyData.cyTime);
						$(".fee-prepayed").text(zyData.hpmsFee);
						$(".fee-used").text(zyData.totalFee);
						$(".fee-balance").text(zyData.remainFee);
						for ( ; i < len ; i++ ) {
							var item = items[i],
								list = item.itemList,
								j = 0,
								jLen = list.length,
								$item = $pureItemTmpl.clone();
							$item.children(".item-name").text(item.mFeeName)
								.end().find(".item-sum").text(item.charges)
								.end().insertBefore($itemTmpl);
						}
						$(".bill-wrap").show();
					}
				}
			}
		});
	}
});