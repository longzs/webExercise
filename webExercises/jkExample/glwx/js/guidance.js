var param = require("common-libs/param"),
	cookie = require("common-libs/cookie"),
	Config = require("./config");
require("common-libs/jquery.tap");
$(function() {
	// 视图切换
	var $views = $(".tab-view");
	$(".tab").on("touchend", function(event) {
		var $this = $(this);
		if (!$this.is(".selected")) {
			$(".tab.selected").removeClass("selected");
			$this.addClass("selected");
			$views.each(function(i, val) {
				$(this).toggle(i === $this.index());
			});
		}
	}).eq(cookie.get("guidance_tab_index") || 0).triggerHandler("touchend");
	var $layout = $(".layout"),
		$buildings = $(".buildings"),
		$bldgs = $(".bldg");
	if (bldgId = param.val("bldgId")) {
		$buildings.show();
		$bldgs.filter("#" + bldgId).show();
	} else {
		$layout.show();
		$(".hotspot").tap(function(event) {
			cookie.add("guidance_tab_index", $(".tab.selected").index(), {expires: 1 / 24 / 60 * 5});
			param.val("bldgId", $(this).attr("data-id"));
		});
	}
	// 楼层跳转
	$(".floor.has-detail").tap(function(event) {
		location.href = "floor_detail?floorId=" + $(this).attr("data-id");
	});
	// 人体图部分
	var $symptom = $(".symptom-page"),
		$genderSwitches = $(".gender-switch"),
		$genders = $(".gender");
	$genderSwitches.on("touchend", function(event) {
		$genderSwitches.toggleClass("selected");
		$genders.toggleClass("active");
	});
	$(".switch.side-switch").on("touchend", function(event) {
		$symptom.toggleClass("turn-back");
	});
	$(".part").tap(function(event) {
		event.preventDefault();
		cookie.add("guidance_tab_index", $(".tab.selected").index(), {expires: 1 / 24 / 60 * 5});
		location.href = "guidance_disease?partId=" + $(this).attr("data-part-id") + "&gender=" + $(".gender-switch.selected").attr("data-gender");
	});
});