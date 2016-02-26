var store = require("common-libs/storage"),
	cookie = require("common-libs/cookie"),
	param = require("common-libs/param"),
	check = require("common-libs/formCheck"),
	Config = require("./config");
// load jQuery extensions
require("common-libs/jquery.tap");
require("common-libs/jquery.alert");
$(function() {
	var paramMap = param.val(),
		pltId = param.val("pltId"),
		referrerIndex;
	var	load = function() {
		// 读取本地存储
		var	dataStr = store.get(Config.app),
			appData = dataStr ? JSON.parse(decodeURIComponent(dataStr)) : {},
			zyData = appData.zyData || {},
			zyUsers = zyData.zyUsers || {},
			currUser = zyData.currUser;
		// 事件绑定
		var $alert = $(".alert-window"),
			$invalid = $(".alert-wrap.input-invalid"),
			$noLoggin = $(".alert-wrap.no-loggin"),
			$searchForm = $(".search-form"),
			$searchBtn = $(".search-btn"),
			$code = $(".input.input-code"),
			$idnum = $(".input.input-idnum"),
			$searchInputs = $code.add($idnum),
			searchAjax;
		$invalid.bindTouchHandler(".confirm", function(event) {
			event.preventDefault();
			$invalid.close();
		});
		$noLoggin.bindTouchHandler(".confirm", function(event) {
			event.preventDefault();
			$noLoggin.close();
		});
		$searchForm.on("submit", function(event) {
			event.preventDefault();
			$searchInputs.blur();
			var code = $code.val(),
				idnum = $idnum.val(),
				idnumCheck = check.idnum(idnum, true);
			if (code && idnumCheck.flag) {
				if (!searchAjax) {
					searchAjax = $.ajax({
						url : Config.GetDataURL,
						type: "get",
						data : {mName:"getUserZyInfo", pContent: JSON.stringify({hospitalCode: Config.HSPCODE, patientId: code, idNo: idnum})},
						beforeSend: function() {
							$searchBtn.addClass("submiting").text("查询中...");
						},
						complete : function(data, status) {
							$searchBtn.removeClass("submiting").text("查询");
							searchAjax = null;
							var dataText = data.responseText ? data.responseText.trim() : "";
							if (dataText === "" || Config.rhtml.test(dataText)) {
								if (status == "success") {
									alert(Config.GET_DATA_ERROR);
								} else {
									if (status == "error") {
										alert(Config.NET_ERROR);
									}
								}
							} else {
								var jsonData = JSON.parse(dataText);
								if (jsonData.rspCode !== "1") {
									$noLoggin.open();
								} else {
									var zyData = jsonData.rspData,
										zyCode = zyData.zyFlow,
										zyInfo = {
											zyFlow: zyData.zyFlow,
											zyDate: zyData.zyDate,
											name: zyData.name,
											idnum: idnum,
											areaId: zyData.areaId,
											areaName: zyData.areaName,
											sickBed: zyData.sickBed,
											patientId: zyData.patientId
										},
										currUser = zyInfo.patientId;
									pltId && (zyInfo.pltId = pltId);
									!zyUsers[currUser] && (zyUsers[currUser] = zyInfo);
									// 信息存储
									$.extend(zyData, {
										cachedFlow: code,
										cachedIdnum: idnum,
										currUser: zyInfo.patientId,
										zyUsers: zyUsers
									});
									appData.zyData = zyData;
									store.add(Config.app, encodeURIComponent(JSON.stringify(appData)), {expires: 90});
									// 跳转
									if (referrer = paramMap["referrer"]) {
										var transData = paramMap["transData"],
											targetHref = referrer + "?pltId=" + pltId;
										transData && (targetHref += ("&transData=" + encodeURIComponent(transData)));
										location.href = targetHref;
									} else {
										location.href = "hsp_home?pltId=" + pltId;
									}
								}
							}
						}
					});
				}
			} else {
				if (!code) {
					$invalid.open("", "请输入住院号");
				} else if (!idnumCheck.flag) {
					$invalid.open("", idnumCheck.msg);
				}
			}
		});
		$searchBtn.tap(function(event) {
			$searchForm.submit();
		});
	};
	if (pltId) {
		if (sid = paramMap["sid"]) {
			// 如果传参包含sid
			// 检查sid是否发生变化
			var originSid = cookie.get("origin_sid");
			if (!originSid || (originSid !== sid)) {
				$.ajax({
					url : "/support/decode_app_data",
					type: "get",
					data : {
						data: paramMap["sid"]
					},
					complete : function(data, status) {
						var dataText = data.responseText ? data.responseText.trim() : "";
						if (dataText === "" || Config.rhtml.test(dataText)) {
							if (status == "success") {
								alert(Config.GET_DATA_ERROR);
							} else {
								if (status == "error") {
									alert(Config.NET_ERROR);
								}
							}
						} else {
							cookie.add("origin_sid", sid, {expires: 90});
							cookie.add("sid", dataText, {expires: 90});
							load();
						}
					}
				});
			} else {
				load();
			}
		} else {
			// 未获取到app传递的sid值
			load();
		}
		$(".navbar").children("#back").tap(function(event) {
			event.preventDefault();
			history.go(-1);
		}).end().show();
	} else {
		load();
	}
});