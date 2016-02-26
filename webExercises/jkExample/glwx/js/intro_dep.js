var param = require("common-libs/param"),
	cookie = require("common-libs/cookie"),
	Config = require("./config");
$(function() {
	var params = param.val(),
		version = params["version"],
		productId = params["productId"],
		depId = params["depid"];
	version && cookie.add("version", version, {expires: 365});
	productId && cookie.add("productId", productId, {expires: 365});
	if (depId) {
		var depName = params["depname"],
			$loading = $(".loading");;
		document.title = depName || "科室简介";
		$(".dep-name").text(depName);
		$.ajax({
			url : Config.GetDataURL,
			type: "get",
			data : {mName:"getDepartmentDesc", pContent: JSON.stringify({hospitalCode: Config.HSPCODE, departmentId: depId})},
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
					} else {
						var depInfo = jsonData.rspData;
						$(".intro").text(depInfo.departmentDesc || "暂无介绍");
					}
				}
			}
		});
	}
});