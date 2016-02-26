var param = require("common-libs/param"),
	cookie = require("common-libs/cookie"),
	Config = require("./config");
require("common-libs/dateUtils");
// load jQuery extensions
require("common-libs/jquery.tap");
$(function() {
	var params = param.val(),
		version = params["version"],
		productId = params["productId"],
		mode = params["mode"];
	version && cookie.add("version", version, {expires: 365});
	productId && cookie.add("productId", productId, {expires: 365});
	if (!mode) {
		$(".deps-page").show();
		var filterEvent = window.onpropertychange !== undefined ? "propertychange" : "input",
			$deps = $(".department"),
			$depInput = $(".input-dep-search"),
			$noResult = $(".no-result");
		function filterDep(input) {
			var	$filtered = $deps.filter(function() {
				var $this = $(this),
					depName = $this.children(".dep-name").text();
				return  !(depName.indexOf(input) !== -1 || $this.attr("py").indexOf(input.toUpperCase()) !== -1);
			});
			$filtered.addClass("hidden");
			var $left = $deps.not($filtered).removeClass("hidden");
			$noResult.toggle(!$left.length);
		}
		$depInput.on(filterEvent, function(event) {
			filterDep($depInput.val());
		});
		$deps.tap(function(event, target) {
			var $this = $(target);
			$depInput.val("");
			location.href = "intro_doc?" + encodeURIComponent("mode=show&depId=" + $this.attr("depid") + "&depName=" + $this.children(".dep-name").text());
		});
	} else {
		var depName = params["depName"],
			depId = params["depId"];
		// 医生头像不能正常加载时的处理
		$(".expert-img").on("error", {MAX_REPLACE_TRIAL: 1}, function(event) {
			event.data.MAX_REPLACE_TRIAL-- && $(this).attr("src", Config.DEFAULT_DOC_IMG_SRC);
		});
		$(".dep-name").text(depName);
		var depInfoParams = {hospitalCode: Config.HSPCODE, departmentId: depId, version:1.0},
			$loading = $(".loading");
		// 加载医生列表
		$.ajax({
			url : Config.GetDataURL,
			type: "get",
			data : {mName:"getExpertInfo", pContent: JSON.stringify(depInfoParams)},
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
						alert(jsonData.rspMsg, true);
					} else {
						// 绑定科室信息
						var rspData = jsonData.rspData,
							experts = rspData.body,
							$expertTmpl = $(".expert.template"),
							$pureExpertTmpl = $expertTmpl.clone(true).removeClass("template"),
							eLen = experts.length,
							today = (new Date()).format("yyyy-mm-dd");
						// 专家号处理
						for (var l = 0 ; l < eLen ; l++) {
							var expert = experts[l],
								$expert = $pureExpertTmpl.clone(true);
							if (expert.imgUrl) {
								var tmpImg = new Image();
								$(tmpImg).on("load", {$ex: $expert}, function(event) {
									event.data.$ex.find(".expert-img").attr("src", $(this).prop("src"));
								});
								tmpImg.src = expert.imgUrl;
							}
							// 处理各个医生排班，内部循环, 检查医生是否可约或停诊
							var flag = 0,
								flagMap = ["", "full", "stop"];
							$expert.find(".expert-name").text(expert.expertName)
								.end().find(".expert-princ").text(expert.expertTitle)
								.end().find(".expert-in").text(expert.expertSpeciality || "暂无介绍")
								// .end().find(".state").addClass(flagMap[expert.isVisit == "1" ? 0 : 1])
								.end().find(".state").toggle(expert.isVisit == "1")
								.end().data({
									"expertInfo" : expert
								});

							$expert.insertBefore($expertTmpl);
						}
						$(".expert").tap(function(event, target) {
							var $this = $(target),
								expertInfo = $this.data("expertInfo"),
								oTransData = {
									hspCode: Config.HSPCODE, 
									depName : depName, 
									depId : depInfoParams.departmentId,
									expertId : expertInfo.expertId,
									expertName : expertInfo.expertName,
									expertTitle : expertInfo.expertTitle,
									expertImg : expertInfo.imgUrl,
									intro_mode: 1
								};
							location.href = "doctor_info?transData=" + encodeURIComponent(JSON.stringify(oTransData));
						});
						$(".expert-page").show();
					}
				}
			}
		});
		$(".header").on("touchend", function(event) {
			location.href = "intro_dep?depid=" + depId+ "&depname=" + depName;
		});
	}
});