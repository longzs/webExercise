var store = require("common-libs/storage"),
	cookie = require("common-libs/cookie"),
	base64 = require("common-libs/base64"),
	param = require("common-libs/param"),
	check = require("common-libs/formCheck"),
	Config = require("./config");
// load jQuery extensions
require("common-libs/jquery.tap");
require("common-libs/jquery.alert");
$(function() {
	var paramMap = param.val(),
		pltId = paramMap["pltId"],
		mode = paramMap["mode"],
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
			$invalid = $(".alert-wrap.invalid"),
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
									/*$(".navi-wrap").off().attr("href", function() {
										return $(this).attr("data-href") + "?pltId=" + pltId;
									});
									if (referrerIndex) {
										location.href = $(".navi-wrap").eq(referrerIndex).attr("href");
									} else {
										location.href = "hospitalization?pltId=" + pltId;
									}*/
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
		$searchBtn.on("touchend", function(event) {
			$searchForm.submit();
		});
	};
	if (pltId) {
		if (!cookie.get("sid") && (sid = paramMap["sid"])) {
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
						cookie.add("sid", dataText, {expires: 90});
						load();
					}
				}
			});
		} else {
			// sid存在或未获取到app传递的sid值
			load();
		}
		$(".navigator").children("#back").tap(function(event) {
			event.preventDefault();
			history.go(-1);
		}).end().show();
	} else {
		load();
	}
});