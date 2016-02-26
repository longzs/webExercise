var param = require("common-libs/param"),
	cookie = require("common-libs/cookie"),
	Config = require("./config");
$(function() {
	var version = param.val("version"),
		productId = param.val("productId");
	version && cookie.add("version", version, {expires: 365});
	productId && cookie.add("productId", productId, {expires: 365});
	var infoId = param.val("infoId");
	if (!infoId) {
		$(".info-wrap").show();
		var cachedInfos = [],
			pageNum = 0,
			pageNow = 1,
			pageSize = 10,
			$prev = $(".navi-op.last"),
			$next = $(".navi-op.next"),
			$pageNum = $(".page-num"),
			$alert = $(".alert-window");
		var $infoTmpl = $(".info.template"),
			$pureInfoTmpl = $infoTmpl.clone(true).removeClass("template");
		$.ajax({
			url : Config.GetDataURL,
			type: "get",
			data : {mName:"getPausedSchedule", pContent: JSON.stringify({
				hosCode: "426080415"
			})},
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
						var data = jsonData.rspData,
							infos = data;
						pageNum = infos.length;
						cachedInfos = infos;
						var i = 0,
							len = pageNum;
						if (len) {
							for ( ; i < len ; i++ ) {
								var info = infos[i],
									$info = $pureInfoTmpl.clone(true),
									$brief = $info.children(".info-brief"),
									deps = info.departments,
									j = 0,
									jLen = deps.length;
								$info.find(".info-title").text(info.date);
								for ( ; j < jLen ; j++ ) {
									var dep = deps[j],
										docList = $.map(dep.doctors, function(val, i) {
											return val.name;
										});
									$('<span class="inform"><span class="dep-name">' + dep.name + '</span> <span class="expert-names">' + docList.join("，") + '</span></span>').appendTo($brief);
								}
								$info.data("info", info).insertBefore($infoTmpl);
							}
							$next.toggleClass("invisible", pageNum <= pageSize);
						} else {
							$(".no-result").show();
						}
					}
				}
			}
		});
	}
});