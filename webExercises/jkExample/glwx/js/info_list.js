var param = require("common-libs/param"),
	cookie = require("common-libs/cookie"),
	Config = require("./config");
require("common-libs/dateUtils");
require("common-libs/jquery.tap");
$(function() {
	var paramMap = param.val(),
		infoId = paramMap["infoId"],
		productId = paramMap["productId"] || "007",
		$listLoading = $(".list-loading"),
		$detailLoading = $(".detail-loading");
	var oTransData = Config.appColumnsMap[productId],
		defaultIndex = paramMap["defaultIndex"];
	oTransData.defaultIndex = defaultIndex;
	var $listWrap = $(".list-wrap").addClass(oTransData.style_extensions);
	$(".info-img").on("error", function(event) {
		var $this = $(this),
			replaceImgSrc;
		if ($listWrap.is(".first-stressed") && $this.closest(".info").index() === 0) {
			replaceImgSrc = "/assets/glwx/img/default_2.png";
		} else {
			replaceImgSrc = "/assets/glwx/img/default_1.png";
		}
		$this.attr("src", replaceImgSrc);
	});
	if (!infoId) {
		var onAjax = null,
			$simple = $(".simple_tmpl"),
			$complex = $(".complex_tmpl"),
			$body = $("body"),
			$currTmpl;
		// bind data, refresh model
		var cols = oTransData.article_based ? oTransData.article_cols : oTransData.cols,
			len = cols.length,
			i = 0,
			requestQueue = [], // 数据请求队列，批量处理
			sentCount = 0,
			completeCount = 0,
			defaultIndex = oTransData.defaultIndex,
			storageSupport = !!window.localStorage,
			storageIdent = "jknjInfo",
			$tmpl = $(".simple_tmpl"),
			$pureTmpl = $tmpl.clone(true).removeClass("template"), // $model
			$tabTmpl = $(".tab-wrap.template"),
			$pureTab = $tabTmpl.clone(true).removeClass("template");
		// 顶部导航
		if (pltId = paramMap["pltId"]) {
			$(".list-navi").addClass("visible").children("#back").tap(function(event) {
				event.preventDefault();
				var ua = navigator.userAgent;
				// 关闭页面
				if (/iPhone/i.test(ua)) {
					location.href = "close";
				} else if (/android/i.test(ua)) {
					window.jsInterface && window.jsInterface.close();
				} else {
					history.go(-1);
				}
			});
		}
		// 绑定和刷新方法声明，供赋值时引用
		var refresh = function(data, features) {
				this.find(".info").not(".template").remove();
				return this.bindData(data, features);
			},
			bindData = function(data, features) {
				var infos = data.newsList,
					i = 0,
					len = infos.length;
				var $infoTmpl = this.find(".info.template"),
					$pureInfoTmpl = $infoTmpl.clone(true).removeClass("template");
				// not article_based feature
				for ( ; i < len ; i++ ) {
					var info = infos[i],
						$info = $pureInfoTmpl.clone(true);
					if (info.imagePath) {
						var tmpImg = new Image();
						tmpImg.onload = (function($info) {
							return function() {
								$info.find(".info-img").prop("src", this.src);
							};
						})($info);
						tmpImg.src = Config.INFO_IMG_SRC + info.imagePath;
					}
					$info.find(".info-title").text(info.title)
						.end().data("info", info).insertBefore($infoTmpl);
					// article_based feature
					oTransData.article_based && features.bRecm && $info.find(".info-content").text(info.content.replace(/<(?:.|\s)*?>|&\w+;/g, "").trim());
				}
				return this;
			};
		for ( ; i < len ; i++ ) {
			var col = cols[i],
				$col = $pureTmpl.clone(true).insertBefore($tmpl).data("colId", col.nodeId),
				cachedData;
			// 扩展	$model ($col)
			$.extend($col, {
				refresh: refresh,
				bindData: bindData
			});
			// process difference
			if (oTransData.article_based) {
				$col.addClass(col.style_extensions);
			} else {
				var lastTabId = cookie.get("lastTabId");
				// bind tab
				var $tab = $pureTab.clone(true),
					bCurr = col.nodeId == (defaultIndex || lastTabId || oTransData.cols[0].nodeId);
				$col.toggle(bCurr);
				$tab.children(".tab").text(col.title)
					.end().toggleClass("selected", bCurr).css("width", 100 / len + "%").data("colInfo", col).insertBefore($tabTmpl);
			}
			// 若支持本地缓存且缓存存在则读取缓存，刷新数据
			if (storageSupport && (cachedData = localStorage.getItem(storageIdent + col.nodeId))) {
				cachedData = JSON.parse(cachedData);
				// 读取缓存并绑定数据
				$col.bindData(JSON.parse(cachedData.data), col);
				// 检查时间戳
				$.ajax({
					url : "/support/get_info",
					type: "get",
					data : {actionType:"cmsInfoFacade", actionCode: "getColumnNodeInfo", deepth: "1", nodeId: col.nodeId, timestamp: "1" },
					customData: {
						timestamp: cachedData.timestamp,
						$model: $col,
						model: col
					},
					_complete : function(jsonData) {
						if (jsonData.respCode !== "1") {
							alert(Config.NET_ERROR);
						} else {
							// 比较时间戳
							var customData = this.customData;
							if (customData.timestamp !== jsonData.timestamp) {
								// 请求新数据并局部更新
								$.ajax({
									url : "/support/get_info",
									type: "get",
									data : {actionType:"cmsInfoFacade", actionCode: "getColumnNodeInfo", deepth: "1", nodeId: customData.model.nodeId },
									customData: {
										$model: customData.$model,
										model: customData.model
									},
									complete : function(data) {
										var	dataText = data.responseText ? data.responseText.trim() : "";
										if (dataText === "" || Config.rhtml.test(dataText)) {
										} else {
											var jsonData = JSON.parse(dataText);
											if (jsonData.respCode !== "1") {
												alert(Config.NET_ERROR);
											} else {
												var customData = this.customData,
													data = JSON.parse(jsonData.data);
												customData.$model.refresh(data, customData.model);
												// 更新离线存储
												localStorage.setItem(storageIdent + customData.model.nodeId, JSON.stringify({
													timestamp: jsonData.timestamp,
													data: jsonData.data
												}));
											}
										}
									}
								});
							}
						}
					}
				});
			} else {
				// 不支持或无缓存则正常请求数据
				requestQueue.push({
					$model: $col,
					model: col
				});
			}
			// article_based feature
			if (oTransData.article_based && paramMap["home"]) {
				break;
			}
		}
		// 批量处理数据请求
		var j = 0,
			queueLen = requestQueue.length;
		for ( ; j < queueLen ; j++ ) {
			var request = requestQueue[j];
			$.ajax({
				url : "/support/get_info",
				type: "get",
				data : {actionType:"cmsInfoFacade", actionCode: "getColumnNodeInfo", deepth: "1", nodeId: request.model.nodeId },
				customData: request,
				beforeSend: function() {
					!sentCount && $listLoading.show();
					sentCount++;
				},
				_complete : function(jsonData) {
					(++completeCount === sentCount) && $listLoading.hide();
					if (jsonData.respCode !== "1") {
						alert(Config.NET_ERROR);
					} else {
						var customData = this.customData,
							data = JSON.parse(jsonData.data);
						customData.$model.bindData(data, customData.model);
						// 执行离线存储
						jsonData.timestamp && localStorage.setItem(storageIdent + customData.model.nodeId, JSON.stringify({
							timestamp: jsonData.timestamp,
							data: jsonData.data
						}));
					}
				}
			});
		} 
		// not article_based feature
		if (!oTransData.article_based) {
			$("html, body").css("height", "100%");
			$(".tab-wrap").on("touchend", function(event) {
				event.preventDefault();
				var $this = $(this),
					colInfo = $this.data("colInfo");
				if (!$this.is(".selected")) {
					// initialize
					if (!$currTmpl) {
						$currTmpl = $(".simple_tmpl").not(".template");
					}
					// reset
					$(".tab-wrap.selected").removeClass("selected");
					$this.addClass("selected");
					$currTmpl.hide();
					$currTmpl = $(".simple_tmpl").filter(function() {
						return $(this).data("colId") == colInfo.nodeId;
					}).show();
				}
			});
			
			// fixed top
			var $tabs = $(".tabs");
			$(".info-wrap").on("touchmove", function(event) {
				var scrollTop = $body.scrollTop();
				$tabs.toggleClass("hover-mode", !!scrollTop);
			});
		}
		// remove template
		$tmpl.remove();
		// bind detail handler
		$(".simple_tmpl .info, .single-info").tap(function(event, target) {
			var info = $(target).data("info");
			// 记录用户tab的点击位置
			!oTransData.article_based && cookie.add("lastTabId", $(".tab-wrap.selected").data("colInfo").nodeId, {expires: 1 / 24 / 60 * 5});
			if (window.newsJsInterface) {
				window.newsJsInterface.getTargetUrl(location.href + "&infoId=" + info.id);
			} else {
				param.val({
					infoId: info.id
				});
			}
		});
	} else {
//		if (paramMap["pltId"]) {
			$(".detail-navi").addClass("visible").children("#back").tap(function(event) {
				event.preventDefault();
				history.go(-1);
			});
//		}
		$.ajax({
			url : "/support/get_info",
			type: "get",
			data : {actionType:"cmsInfoFacade", actionCode: "getCmsInfoDetail", infoId: infoId },
			beforeSend: function() {
				$detailLoading.show();
			},
			_complete : function(jsonData) {
				$detailLoading.hide();
				if (jsonData.respCode !== "1") {
					alert(jsonData.rspMsg, true);
				} else {
					var info = JSON.parse(jsonData.data);
					$(".detail-title").text(info.title);
					$(".detail-date").text((new Date(+info.publishTime)).format("yyyy-mm-dd"));
					$(".detail-read-nums").text(info.readCount);
					info.titleImage && $(".detail-img").attr("src", Config.INFO_IMG_SRC + info.titleImage);
					$(".detail-content").append(info.content).find("img").each(function() {
						var src = $(this).attr("src");
						if (/^(\/|\\)uploads\S*$/.test(src)) {
							$(this).attr("src", Config.INFO_IMG_SRC + src);
						}
					});
					$(".detail-wrap").show();
				}
			}
		});
	}
});