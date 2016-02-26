var param = require("common-libs/param"),
	Config = require("./config");
require("common-libs/jquery.tap");
$(function() {
	var paramMap = param.val(),
		partId = paramMap["partId"] || "1",
		gender = paramMap["gender"] || "1";
	$.getJSON("/assets/glwx/js/disease_data.json", function(data) {
		var i = 0,
			len = data.length,
			resortedMap = {};
		for ( ; i < len ; i++ ) {
			var disease = data[i];
			if (resortedMap[disease.bodyId]) {
				resortedMap[disease.bodyId].list.push(disease);
			} else {
				resortedMap[disease.bodyId] = {
					bodyName: disease.bodyName,
					list: [disease]
				};
			}
		}
		var $partWrap = $(".part-wrap"),
			$diseaseWrap = $(".disease-wrap"),
			$partTmpl = $('<div class="part"></div>'),
			$diseaseTmpl = $('<div class="disease"></div>');
		for ( var i in resortedMap) {
			var part = resortedMap[i],
				partName = part.bodyName,
				list = part.list,
				j = 0,
				len = list.length,
				$diseases = $('<div class="diseases"></div>').attr("data-part-id", i);
			$partTmpl.clone().attr("data-part-id", i).text(partName).appendTo($partWrap);
			for ( ; j < len ; j++ ) {
				var disease = list[j];
				if (disease.crowdId == gender || disease.isCommon) {
					$diseaseTmpl.clone().text(disease.diseaseName).data("diseaseInfo", disease).appendTo($diseases);
				}
			}
			$diseases.appendTo($diseaseWrap);
		}
		var $partList = $(".part"),
			$diseaseList = $(".diseases");
		$partList.tap(function(event) {
			var $this = $(this);
			if (!$this.is(".active")) {
				$(".part.active, .diseases.active").removeClass("active");
				$this.addClass("active");
				$diseaseList.filter(function() {
					return $(this).attr("data-part-id") == $this.attr("data-part-id");
				}).addClass("active");
			}
		});
		$diseaseList.tap(function(event) {
			var $target = $(event.target),
				diseaseInfo = $target.data("diseaseInfo"),
				oTransData = {
					gender: gender,
					bodyName: diseaseInfo.bodyName,
					diseaseName: diseaseInfo.diseaseName,
					baiduDepartmentId: diseaseInfo.baiduDepartmentId
				};
			location.href = "guidance_result?transData=" + encodeURIComponent(JSON.stringify(oTransData));
		});
		$partList.filter(function() {
			return $(this).attr("data-part-id") == partId;
		}).triggerHandler("touchend");
		$(".wrapper").show()
		var	_ctnr_height = $partWrap.height(),
			$currPart = $(".part.active");
		$partWrap.prop({
			scrollTop: ($currPart.offset().top - _ctnr_height + $currPart.outerHeight()) | 0
		});
	});
});