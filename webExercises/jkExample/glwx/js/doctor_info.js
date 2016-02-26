var cookie = require("common-libs/cookie"),
	base64 = require("common-libs/base64"),
	param = require("common-libs/param"),
	Config = require("./config");
require("common-libs/dateUtils");
// load jQuery extensions
require("common-libs/jquery.tap");
require("common-libs/jquery.alert");
$(function() {
	var transData = param.val("transData"),
		oTransData = transData ? JSON.parse(transData) : {},
		bNormal = oTransData.isNormal,
		userSelect = {hspName : oTransData.hspName, hspCode : oTransData.hspCode, depName : oTransData.depName, depId : oTransData.depId},
		$expertWrap = $(".expert-wrap"),
		$alert = $(".alert-window");
	bNormal && (document.title = "普通号");
	oTransData.bRegister && $(".tab-schedule").text("今日挂号");
	if (!bNormal) {
		if (oTransData.expertImg) {
			var tmpImg = new Image();
			tmpImg.onload = function() {
				$(".doc-img").attr("src", this.src);
			};
			tmpImg.src = oTransData.expertImg;
		}
		$(".doc-name").text(oTransData.expertName);
		$(".dep-name").text(oTransData.depName);
		$(".doc-princ").text(oTransData.expertTitle);
		var views = [$(".schedules-wrap"), $(".expert-intro-wrap")];
		$(".tab").on("touchend", function(event) {
			$(".tab.selected").removeClass("selected");
			var $currTab = $(event.target).addClass("selected");
			for (var i in views) {
				views[i].toggle(i == $currTab.index());
			} 
		});
		$expertWrap.show();
	}
	$(".schedule").tap(function(event, target) {
		var $target = $(target),
			scheduleInfo = $target.data("scheduleInfo"),
			expertInfo = $target.data("expertInfo"),
			clinicDate = scheduleInfo.clinicDate,
			today = (new Date()).format("yyyy-mm-dd");
		if ($target.is(".ok")) {
			$.extend(oTransData, {
				clinicDate : scheduleInfo.clinicDate,
				seeTime : scheduleInfo.seeTime,
				scheduFlow : scheduleInfo.scheduFlow,
				totalFee : scheduleInfo.totalFee,
				sectionId: scheduleInfo.sectionId
			});
			if (expertInfo) {
				$.extend(oTransData, {
					expertName : expertInfo.expertName,
					expertTitle : expertInfo.expertTitle,
					imgURL : expertInfo.imgUrl
				});
			} else {
				$.extend(oTransData, {
					expertName : Config.NORMAL
				});
			}
			cookie.add("userSelect", base64.encode(encodeURIComponent(JSON.stringify(userSelect))), {expires: 7});
			// 专家介绍
			if (oTransData.intro_mode) {
				// 判断是否为挂号
				if (today === clinicDate) {
					$.extend(oTransData, {
						bRegister : 1
					});
				}
			}
			if (cookie.get("idnum")) {
				location.href = "place_order?transData=" + encodeURIComponent(JSON.stringify(oTransData));
			} else {
				location.href = Config.IS_WX ? Config.getWxAuthPath("sign_in?transData=" + JSON.stringify(oTransData) + "&referrer=place_order") : ("sign_in?transData=" + encodeURIComponent(JSON.stringify(oTransData)) + "&referrer=place_order");
			}
		}
	});
	var $scheduleTmpl = $(".schedule-wrap.template"),
		$pureScheduleTmpl = $scheduleTmpl.clone(true).removeClass("template"),
		scheduleParams = {
			hospitalCode : oTransData.hspCode,
			departmentId : oTransData.depId
		};
	!oTransData.intro_mode && (scheduleParams.queryType = oTransData.bRegister ? "1" : "2");
	!bNormal && (scheduleParams.expertId = oTransData.expertId);
	$.ajax({
		url : Config.GetDataURL,
		type : "get",
		data : {mName : "searchSchedue", pContent : JSON.stringify(scheduleParams)},
		dataTye : "json",
		beforeSend : function() {
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
					var rspData = jsonData.rspData,
						experts = bNormal ? null : rspData.expertBody,
						expert = experts && experts.length ? experts[0] : null,
						schedules = bNormal ? rspData.schedules : (expert ? expert.schedules : []),
						i = 0,
						len = schedules.length;
					for ( ; i < len; i++ ) {
						var schedule = schedules[i],
							$normal = $pureScheduleTmpl.clone(true),
							$schedule = $normal.children(),
							date = schedule.clinicDate.toDate(),
							seeTime = schedule.seeTime,
							visitTime = seeTime.length == 1 ? Config.SeeTimeStrings[parseInt(seeTime) - 1] : seeTime;
						$schedule.find(".time").text(date.format("mm.dd") + Config.Weekdays[date.getDay()] + visitTime);
						if (schedule.remainCount === "0") {
							$schedule.addClass("full");
						} else if(schedule.stopFlag === "1" || schedule.stopFlag === "2") {
							$schedule.addClass("stop");
						} else {
							$schedule.addClass("ok");
						}
						var storedData = {"scheduleInfo" : schedule};
						!bNormal && (storedData.expertInfo = expert);
						$schedule.data(storedData);
						$normal.insertBefore($scheduleTmpl);
						// 如果页面来源是专家介绍，则切换tab到专家介绍
						oTransData.intro_mode && $(".tab.tab-intro").triggerHandler("touchend");
					}
					if (!bNormal && expert) {
						$(".expert-in").text(expert.expertSpeciality || "暂无介绍");
						$(".expert-intro").text(expert.expertDesc);
					}
				}
			}
		}
	});
});