var param = require("common-libs/param"),
	store = require("common-libs/storage"),
	Config = require("./config");
// load jQuery extensions
require("common-libs/jquery.tap");
require("common-libs/jquery.alert");
$(function() {
	var pltId = param.val("pltId");
	if (pltId) {
		$(".navbar").children("#back").tap(function(event) {
			event.preventDefault();
			history.go(-1);
		}).end().show();
	}
	// 数据读取
	var	dataStr = store.get(Config.app),
		appData = dataStr ? JSON.parse(decodeURIComponent(dataStr)) : {},
		zyData = appData.zyData || {},
		zyUsers = zyData.zyUsers || {},
		currUser = zyData.currUser;
	if ((zyInfo = zyUsers[currUser])) {
		// 填充住院用户信息
		$(".name").text(zyInfo.name);
		$(".area").text(zyInfo.areaName + "/" + zyInfo.sickBed + "床");
		$(".time").text(zyInfo.zyDate);
		$(".user-info").children(".switch-user").tap(function(event) {
			event.preventDefault();
			location.href = "hsp_account?pltId=" + pltId;
		}).end().show();
		var $loading = $(".loading"),
			$alert = $(".alert-window"),
			searchParams = {
				hospitalCode: Config.HSPCODE,
				zyFlow: zyInfo.zyFlow,
				idNo: zyInfo.idnum
			};
		$.ajax({
			url : Config.GetDataURL,
			type: "get",
			data : {mName:"getUserZyInfo", pContent: JSON.stringify(searchParams)},
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
							charges = zyData.prepayItemList;
						if (charges) {
							var	i = 0,
								len = charges.length,
								$chargeTmpl = $(".charge.template"),
								$pureTmpl = $chargeTmpl.clone().removeClass("template"),
								typeMap = {
									"收金额": "缴纳",
									"退金额": "退款"
								};
							for ( ; i < len ; i++ ) {
								var charge = charges[i],
									$charge = $pureTmpl.clone(),
									amt = charge.itemAmt;
								$charge.children(".charge-time").text(charge.itemDate)
									.end().children(".charge-amt").text(amt).css("color", function() {
										return +charge.itemAmt ? "#1D8BF2" : "#FF6A4D";
									})
									.end().children(".charge-remark").text(typeMap[charge.itemType])
									.end().insertBefore($chargeTmpl);
							}
						}
						$(".code").text(zyInfo.zyFlow);
						$(".charge-nums").text(zyData.zyPreTimes + "次");
						$(".charged").text(zyData.zyPreFee + "元");
						$(".used").text(zyData.zyPreUseFee + "元");
						$(".info-wrap").show();
					}
				}
			}
		});
	} else {
		location.href = "hsp_sign_in?referrer=hsp_foregift&pltId=" + pltId;
	}
});