var cookie = require("common-libs/cookie"),
	param = require("common-libs/param"),
	Config = require("./config");
require("common-libs/dateUtils");
// load jQuery extensions
require("common-libs/jquery.tap");
require("common-libs/jquery.alert");
$(function() {
	var transData = param.val("transData"),
		oTransData = transData ? JSON.parse(transData) : {},
		depInfoParams = {hospitalCode: oTransData.hspCode, departmentId: oTransData.depId},
		$alert = $(".alert-window"),
		$loading = $(".loading");
	depInfoParams.queryType = oTransData.bRegister ? "1" : "2";
	// 修改页面title
	document.title = oTransData.depName;
	$(".doc-img").on("error", function(event) {
		$(this).attr("src", Config.DEFAULT_DOC_IMG_SRC);
	});
	$.ajax({
		url : Config.GetDataURL,
		type: "get",
		data : {mName:"searchSchedue", pContent: JSON.stringify(depInfoParams)},
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
					// 绑定科室信息
					var rspData = jsonData.rspData,
						normals = rspData.schedules,
						experts = rspData.expertBody,
						normalTimes = $.map(normals, function(val, i) {
							return val.clinicDate;
						}),
						$allExperts,
						$experts = $(".experts"),
						$expertTmpl = $(".expert.template"),
						$pureExpertTmpl = $expertTmpl.clone(true).removeClass("template"),
						nLen = normals.length,
						eLen = experts.length,
						today = (new Date()).format("yyyy-mm-dd"),
						validNormals = 0,
						validExperts = 0,
						times = {}/*$.map(rspData.timeBody, function(val) {
							return val.clinicDate;
						})*/;
					// 普通号处理
					if(nLen) {
						for (var j = 0 ; j < nLen ; j++) {
							var normal = normals[j];
							if (normal.remainCount !== undefined) {
								!times[normal.clinicDate] && (times[normal.clinicDate] = 1);
								validNormals++;
							}
						}
						if  (validNormals) {
							$(".normal-wrap").show();
						}
						$(".select-normal").tap(function() {
							oTransData.isNormal = 1;
							location.href = "doctor_info?transData=" + encodeURIComponent(JSON.stringify(oTransData));
						});
					}
					// 专家号处理
					if (eLen) {
						$(".expert-wrap").show();
						for (var l = 0 ; l < eLen ; l++) {
							var expert = experts[l],
								$expert = $pureExpertTmpl.clone(true),
								schedules = expert.schedules,
								len = schedules.length,
								seeTimeStrings = Config.SeeTimeStrings,
								validSchedules = 0;
							if (expert.imgUrl) {
								var tmpImg = new Image();
								$(tmpImg).on("load", {$ex: $expert}, function(event) {
									event.data.$ex.find(".doc-img").attr("src", $(this).prop("src"));
								});
								tmpImg.src = expert.imgUrl;
							}
							var expertIn = expert.expertSpeciality;
							$expert.find(".doc-name").text(expert.expertName)
								.end().find(".doc-princ").text(expert.expertTitle)
								.end().find(".expert-in").text(expertIn ? (expertIn.length > 30 ? expertIn.slice(0, 30) + "..." : expertIn) : "暂无介绍")
								.end().data({
									"expertInfo" : expert,
									"schedules": schedules
								});
							// 处理各个医生排班，内部循环
							for (var m = 0 ; m < len ; m++) {
								var schedule = schedules[m];
								if ((schedule.stopFlag === "0" || !schedule.stopFlag) && schedule.remainCount !== undefined) {
									!times[schedule.clinicDate] && (times[schedule.clinicDate] = 1);
									validSchedules++;
								}
							}
							if (validSchedules) {
								$expert.find(".has-schedule").show()
									.end().insertBefore($expertTmpl);
							} else {
								$expert.appendTo($experts);
							}
							// $expert.appendTo($experts);
						}
						$allExperts = $(".expert").not(".template").tap(function(event, target) {
							var $expert = $(target).closest(".expert"),
								expertInfo = $expert.data("expertInfo");
							$.extend(oTransData, {
								expertId : expertInfo.expertId,
								expertName : expertInfo.expertName,
								expertTitle : expertInfo.expertTitle,
								expertImg : expertInfo.imgUrl
							});
							location.href = "doctor_info?transData=" + encodeURIComponent(JSON.stringify(oTransData));
						});
					}
					if (!eLen) {
						if (validNormals) {
							/*oTransData.isNormal = 1;
							location.href = "doctor_info?transData=" + encodeURIComponent(JSON.stringify(oTransData));*/
						} else {
							$(".no-schedules").show();
						}
					}
					if (!oTransData.bRegister) {
						// 加载时间栏
						var $oprBar = $(".opr-bar"),
							$daysWrap = $(".days"),
							today = new Date(),
							date = today.getDate(),
							weekDay = today.getDay(),
							t = +today,
							oneDayMills = 846e+5,
							dayCount = 13,
							i = 0,
							$dayTmpl = $('<span class="day"><span class="weekday"></span><span class="date"></span></span>'),
							weekdays = ["日", "一", "二", "三", "四", "五", "六"];
						$(".today").text(today.format("yyyy年mm月dd日") + "星期" + weekdays[today.getDay()]);
						while(i < dayCount) {
							var day = new Date(),
								$day = $dayTmpl.clone();
							day.setTime(t + oneDayMills * i++);
							var date = day.format("yyyy-mm-dd");
							$day.find(".weekday").text(weekdays[day.getDay()])
								.end().find(".date").text(day.getDate())
								.end().data("date", date).toggleClass("disabled", !times[date]).appendTo($daysWrap);
						}
						$(".opr.prev").on("touchend", function(event) {
							$oprBar.removeClass("has-prev");
						});
						$(".opr.next").on("touchend", function(event) {
							$oprBar.addClass("has-prev");
						});
						function filterSchedule(date) {
							if (date) {
								if ($allExperts && $allExperts.length) {
									var $filtered = $allExperts.filter(function() {
										var $this = $(this),
											schedules = $this.data("schedules"),
											bFind = false;
										$.each(schedules, function(i, val) {
											if (val.clinicDate === date) {
												if ((val.stopFlag === "0" || !val.stopFlag) && val.remainCount !== undefined) {
													bFind = true;
													return false;
												}
											}
										});
										return !bFind;
									}).addClass("hidden");
									$allExperts.not($filtered).removeClass("hidden");
								}
								if (normals.length) {
									$(".normal-wrap").toggleClass("hidden", $.inArray(date, normalTimes) === -1);
								}
							} else {
								// reset
								$(".hidden").removeClass("hidden");
							}
						}
						$(".day").tap(function(event, target) {
							// 排班筛选
							var $target = $(target);
							if (!$target.is(".disabled")) {
								$(".day.selected").removeClass("selected");
								$target.addClass("selected");
								if ($target.is(".all")) {
									// cookie.remove("select_filter_date");
									filterSchedule();
								} else {
									var selectedDate = $target.data("date"),
										dateFilter = {};
									dateFilter[oTransData.depId] = selectedDate;
									/* 记录用户筛选选择 */
									// cookie.add("select_filter_date", JSON.stringify(dateFilter), {expires: 1 / 24 / 60 * 5});
									filterSchedule(selectedDate);
								}
							}
						});
						/*if ((dateFilter = cookie.get("select_filter_date"))) {
							dateFilter = JSON.parse(dateFilter);
							if ((dateUserSelected = dateFilter[oTransData.depId])) {
								var $days = $(".day"),
									index = $days.filter(function() {
										return $(this).data("date") == dateUserSelected;
									}).index();
								if (index && !!times[dateUserSelected]) {
									$(".day.selected").removeClass("selected");
									$days.eq(index).addClass("selected");
									$(".opr-bar").toggleClass("has-prev", index > 6);
									filterSchedule(dateUserSelected);
								}
							}
						}*/
						$(".date-wrap").show();
					}
				}
			}
		}
	});
});