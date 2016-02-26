var store = require("common-libs/storage"),
	param = require("common-libs/param"),
	Config = require("./config");
// load jQuery extensions
require("common-libs/jquery.tap");
require("common-libs/jquery.alert");
$(function() {
	var pltId = param.val("pltId");
	// 数据读取
	var	dataStr = store.get(Config.app),
		appData = dataStr ? JSON.parse(decodeURIComponent(dataStr)) : {},
		zyData = appData.zyData || {},
		zyUsers = zyData.zyUsers || {},
		currUser = zyData.currUser;
	if (pltId) {
		$(".navigator").children("#back").tap(function(event) {
			event.preventDefault();
			history.go(-1);
		}).end().show();
	}
	// 事件绑定
	var $noLoggin = $(".alert-wrap.no-loggin");
	$noLoggin.bindTouchHandler(".confirm", function(event) {
		event.preventDefault();
		$noLoggin.close();
	});
	$(".account").tap(function(event) {
		var $this = $(this);
		if (!$this.is(".selected")) {
			$(".account.selected").removeClass("selected");
			$this.addClass("selected");
		}
	});
	$(".btn-add").tap(function(event) {
		event.preventDefault();
		location.href = "hsp_sign_in?pltId=" + pltId;
	});
	// 查询账户状态
	var searchAjax = null,
		$switchBtn = $(".btn.btn-switch");
	$switchBtn.tap(function(event) {
		event.preventDefault();
		var $currUser = $(".account.selected"),
			currUser = $currUser.data("accountInfo");
		if (currUser && !searchAjax) {
			var searchParams = {
				hospitalCode: Config.HSPCODE,
				patientId: currUser.zyFlow,
				idNo: currUser.idnum
			};
			searchAjax = $.ajax({
				url : Config.GetDataURL,
				type: "get",
				data : {
					mName:"getUserZyInfo",
					pContent: JSON.stringify(searchParams)
				},
				beforeSend: function() {
					$switchBtn.addClass("submiting").text("切换中...");
				},
				complete : function(data, status) {
					$switchBtn.removeClass("submiting").text("切换");
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
							zyData.currUser = currUser.patientId;
							appData.zyData = zyData;
							store.add(Config.app, encodeURIComponent(JSON.stringify(appData)), {expires: 90});
							location.href = "hsp_home?pltId=" + pltId;
						}
					}
				}
			});
		}
	});
	// 加载用户
	var $accountTmpl = $(".account.template").clone(true).removeClass("template"),
		$accounts = $(".accounts");
	for ( var i in zyUsers ) {
		var account = zyUsers[i],
			$account = $accountTmpl.clone(true);
		$account.find(".name").text(account.name)
			.end().find(".idnum").text(account.idnum)
			.end().toggleClass("selected", currUser == account.patientId).data("accountInfo", account).appendTo($accounts);
	}
});