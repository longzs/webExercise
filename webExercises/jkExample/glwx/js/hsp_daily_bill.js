var param = require("common-libs/param"),
	store = require("common-libs/storage"),
	Config = require("./config");
// load built-in js Object extensions
require("common-libs/dateUtils");
// load jQuery extensions
require("common-libs/jquery.tap");
require("common-libs/jquery.alert");
$(function() {
	var pltId = param.val("pltId");
	if (pltId) {
		$(".navbar").children("#back").tap(function(event) {
			event.preventDefault();
			history.go(-1);
		}).end().show();
	}
	// 数据读取
	var	dataStr = store.get(Config.app),
		appData = dataStr ? JSON.parse(decodeURIComponent(dataStr)) : {},
		zyData = appData.zyData || {},
		zyUsers = zyData.zyUsers || {},
		currUser = zyData.currUser;
	if ((zyInfo = zyUsers[currUser])) {
		// 填充住院用户信息
		$(".name").text(zyInfo.name);
		$(".area").text(zyInfo.areaName + "/" + zyInfo.sickBed + "床");
		$(".time").text(zyInfo.zyDate);
		$(".user-info").children(".switch-user").tap(function(event) {
			event.preventDefault();
			location.href = "hsp_account?pltId=" + pltId;
		}).end().show();
		var searchParams = {
			hospitalCode: Config.HSPCODE,
			zyFlow: zyInfo.zyFlow
		};
		// 时间控件加载
		var today = new Date(),
			todayMills = +today,
			oneDayMills = 864e+5,
			thisYear = today.getFullYear(),
			thisMonth = today.getMonth() + 1,
			thisDate = today.getDate(),
			i = 0;
		var $year = $(".select-year"),
			$month = $(".select-month"),
			$date = $(".select-date");
		while(i++ < 7) {
			$("<option></option>").text(thisYear - i + 1).appendTo($year);
		}
		var m_days = [31, 28 + (isLeapYear(thisYear) ? 1 : 0), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
			j = 0,
			days = m_days[thisMonth - 1];
		while (j++ < days) {
			$("<option></option>").addClass("date-opt").text(j).appendTo($date);
		}
		function isLeapYear(year) {
			return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
		}
		$year.add($month).on("change", function(event) {
			var year = +$year.val(),
				month = +$month.val(),
				curr_m_days = [31, 28 + (isLeapYear(year) ? 1 : 0), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
				curr_days = m_days[month - 1];
			if (curr_days !== days) {
				days = curr_days;
				$(".date-opt").not(".default").remove();
				var i = 0;
				while(i++ < days) {
					$("<option></option>").addClass("date-opt").text(i).appendTo($date);
				}
			}
		});
		var $loading = $(".loading"),
			$alert = $(".alert-window"),
			$invalid = $(".alert-wrap.input-invalid");
		$invalid.bindTouchHandler(".confirm", function(event) {
			event.preventDefault();
			$invalid.close();
		});
		$(".search-btn").on("touchend", function(event) {
			var $selectedDefault = $(".default").filter(function() {
				return $(this).prop("selected");
			})
			var canSubmit = !$selectedDefault.length;
			if (canSubmit) {
				var beginDate = new Date();
				beginDate.setDate($date.val());
				beginDate.setMonth($month.val() - 1);
				beginDate.setFullYear($year.val());
				searchParams.beginDate = beginDate.format("yyyy-mm-dd");
				var endDate = new Date(beginDate.getTime() + 864e+5);
				searchParams.endDate = endDate.format("yyyy-mm-dd");
				$(".detail-wrap").hide();
				$(".item.template").siblings().remove();
				$(".count-item").children("span").text("");
				$.ajax({
					url : Config.GetDataURL,
					type: "get",
					data : {mName:"getZYBillDetailList", pContent: JSON.stringify(searchParams)},
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
								$(".search-wrap").hide();
								var billInfo = jsonData.rspData,
									items = billInfo.body,
									i = 0,
									len = items.length,
									$itemTmpl = $(".item.template"),
									$pureItemTmpl = $itemTmpl.clone().removeClass("template");
								$(".area").text(billInfo.areaName);
								$(".name").text(billInfo.name || oTransData.name);
								$(".code").text(zyInfo.zyFlow);
								$(".position").text(billInfo.sickBed);
								$(".count").text(billInfo.curDateFee + "元");
								$(".sum").text(billInfo.totalFee + "元");
								$(".foregift").text(billInfo.hpmsFee + "元");
								$(".balance").text(billInfo.remainFee + "元");
								var $btnTmpl = $('<span class="fold-btn"><span class="fold-arrow"></span></span>'),
									$detailTmpl = $('<table class="item-detail"><thead><tr><th>项目名称</th><th>单价</th><th>数量</th><th>金额</th></tr></thead><tbody></tbody></table>'),
									$subItemTmpl = $('<tr><td class="item-name"></td><td class="item-unit"></td><td class="item-count"></td><td class="item-sum"></td></tr>');
								for ( ; i < len ; i++ ) {
									var item = items[i],
										itemList = item.itemList,
										subLen = itemList.length,
										j = 0,
										$item = $pureItemTmpl.clone().toggleClass("folding", !!subLen);
									if (subLen) {
										var $detail = $detailTmpl.clone();
										for ( ; j < subLen ; j++ ) {
											var subItem = itemList[j];
											$subItemTmpl.clone().find(".item-name").text(subItem.itemName)
												.end().find(".item-unit").text(subItem.units)
												.end().find(".item-count").text(subItem.amount)
												.end().find(".item-sum").text(subItem.charges)
												.end().appendTo($detail);
										}
										$btnTmpl.clone().appendTo($item.children(".item-brief"));
										$detail.appendTo($item);
									}
									$item.find(".brief-name").text(item.mFeeName)
										.end().find(".brief-value").text(item.charges + "元")
										.end().insertBefore($itemTmpl);
								}
								$(".item.folding").tap(function(event, target) {
									$(target).toggleClass("unfold");
								});
								$(".detail-wrap").show();
							}
						}
					}
				});
			} else {
				$invalid.open("", "请" + $selectedDefault.first().text());
			}
		});
	} else {
		location.href = "hsp_sign_in?referrer=hsp_daily_bill&pltId=" + pltId;
	}
});