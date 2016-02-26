var param = require("common-libs/param"),
	Config = require("./config");
require("common-libs/jquery.tap");
$(function() {
	/*var column = getParamValue("columns"),
	oColumn = JSON.parse(column);*/
	/*
	请求格式：get
	对json格式参数进行urlencode编码
	参数名：columns
	参数：
	{
		cols: [{
			nodeId: 122, // not null
			level: 1, // if not passed, take 1 as default value
			title: "医院动态" // title name
		}, {
			nodeId: 123,
			level: 1,
			title: "健康咨询"
		}, {
			nodeId: 124,
			level: 1,
			title: "养生保健"
		}, {
			nodeId: 125,
			level: 1,
			title: "就诊指南"
		}]
	};*/
	var productId = param.val("productId") || "007",
		oColumn = Config.appColumnsMap[productId],
		$cols = $(".cols").addClass(oColumn.style_extensions);
	$(".col-img").on("error", function() {
		$(this).attr("src", "/assets/glwx/img/default_1.png");
	});
	$(".col-title-wrap").tap(function(event, target) {
		var $col = $(target).closest(".col-wrap");
		if (!$col.is(".failed")) {
			var targetURL = location.origin + "/glwx/info_list?productId=" + productId + "&defaultIndex=" + $col.data("colInfo").nodeId;
			if (window.newsJsInterface !== undefined) {
				window.newsJsInterface.getTargetUrl(targetURL);
			} else {
				location.href = targetURL;
			}
		}
	});
	var cols = oColumn.cols,
		len = cols.length,
		i = 0,
		$colTmpl = $(".col-wrap.template"),
		$pureColTmpl = $colTmpl.clone(true).removeClass("template");
	// 删除模板
	$colTmpl.remove();
	var count = 1;
	for ( ; i < len ; i++ ) {
		var col = cols[i],
			$col = $pureColTmpl.clone(true),
			$failedDesc = $col.find(".failed-desc");
		$col.find(".col-header").text(col.title).end().appendTo($cols);
		$.ajax({
			url : "/support/get_info",
			type: "get",
			data : {actionType:"cmsInfoFacade", actionCode: "getColumnNodeInfo", deepth: col.level, nodeId: col.nodeId },
			customData: {
				$col: $col,
				$desc: $failedDesc,
				col: col,
				index: i
			},
			complete : function(data) {
				var customData = this.customData,
					$column = customData.$col,
					column = customData.col,
					$desc = customData.$desc;
				$column.find(".col-title-wrap").removeClass("onloading")
				var dataText = data.responseText ? data.responseText.trim() : "";
				if (dataText === "" || Config.rhtml.test(dataText)) {
					$desc.text("资讯加载失败");
					$column.addClass("failed");
				} else {
					var jsonData = JSON.parse(dataText);
					if (jsonData.respCode !== "1") {
						$desc.text("资讯加载失败");
						$column.addClass("failed");
					} else {
						var data = JSON.parse(jsonData.data),
							info;
						cols[customData.index].title = data.title;
						if (column.level > 1) {
							var newsList = data.childNodes.length ? data.childNodes[0].newsList : null;
							info = newsList ? newsList[newsList.length - 1] : null;
						} else {
							infos = data.newsList;
							info = infos.length ? infos[0] : null;
						}
						if (info) {
							$column.find(".col-header").text(data.title)
								.end().find(".col-title").text(info.title)
								.end().find(".col-img").attr("src", column.thumbnail_path ? column.thumbnail_path : (Config.INFO_IMG_SRC + info.imagePath))
								.end().data("colInfo", column);
						} else {
							$desc.text("暂无资讯内容");
							$column.addClass("failed");
						}
					}
				}
			}
		});
	}
});