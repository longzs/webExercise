var param = require("common-libs/param"),
	Config = require("./config");
require("common-libs/jquery.tap");
$(function() {
	var transData = param.val("transData"),
		oTransData = transData ? JSON.parse(transData) : {};
	$(".anchor.gender").text(oTransData.gender == "1" ? "男性" : "女性");
	$(".anchor.part-name").text(oTransData.bodyName);
	$(".anchor.disease-name").text(oTransData.diseaseName);
	var $loading = $(".loading"),
		$noResult = $(".no-result"),
		depParams = {hospitalCode : Config.HSPCODE, withHosDescFlag: "0", withDeptFlag : 1, withDeptDescFlag: "0"};
	// 加载相应科室
	$.ajax({
		url : Config.GetDataURL,
		type : "get",
		data : {
			pltId: Config.pltId,
			productId: Config.productId,
			version: Config.version,
			mName : "searchHospitalInfo",
			pContent : JSON.stringify(depParams)
		},
		dataTye : "json",
		beforeSend : function() {
			$loading.show();
		},
		complete : function(data) {
			var dataText = data.responseText ? data.responseText.trim() : "";
			if (dataText === "" || Config.rhtml.test(dataText)) {
				alert(Config.NET_ERROR);
			} else {
				var jsonData = JSON.parse(dataText);
				if (jsonData.rspCode !== "1") {
					$alert.alert(jsonData.rspMsg, true);
				} else {
					var deps = jsonData.rspData.body[0].departments,
						referenceDeps = $.grep(deps, function(val, i) {
							return val.baiduDepartmentId == oTransData.baiduDepartmentId;
						});
					if (referenceDeps.length) {
						var referenceDep = referenceDeps[0];
						$(".reference-dep-name").text(referenceDep.departmentName);
						$(".reference-wrap").tap(function(event) {
							location.href = "select_doctor?transData=" + encodeURIComponent(JSON.stringify({
								hspCode: Config.HSPCODE,
								depId: referenceDep.departmentId,
								depName: referenceDep.departmentName
							}));
						}).show();
						// 查询医生信息
						var depInfoParams = {hospitalCode: Config.HSPCODE, departmentId: referenceDep.departmentId}
						$.ajax({
							url : Config.GetDataURL,
							type: "get",
							data : {
								pltId: Config.pltId,
								productId: Config.productId,
								version: Config.version,
								mName:"searchSchedue",
								pContent: JSON.stringify(depInfoParams)
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
											experts = rspData.expertBody,
											$experts = $(".experts"),
											$expertTmpl = $(".expert.template"),
											$pureExpertTmpl = $expertTmpl.clone(true).removeClass("template"),
											eLen = experts.length,
											validExperts = 0;
										// 专家号处理
										if (eLen) {
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
														validSchedules++;
													}
												}
												if (validSchedules) {
													$expert.find(".has-schedule").show()
														.end().insertBefore($expertTmpl);
												} else {
													$expert.appendTo($experts);
												}
											}
											$(".expert").not(".template").tap(function(event, target) {
												var $expert = $(target).closest(".expert"),
													expertInfo = $expert.data("expertInfo"),
													oTransData = {
														hspCode: Config.HSPCODE,
														depId: referenceDep.departmentId,
														depName: referenceDep.departmentName,
														expertId : expertInfo.expertId,
														expertName : expertInfo.expertName,
														expertTitle : expertInfo.expertTitle,
														expertImg : expertInfo.imgUrl
													};
												location.href = "doctor_info?transData=" + encodeURIComponent(JSON.stringify(oTransData));
											});
											$(".recommend-wrap").show();
										}
									}
								}
							}
						});
					} else {
						$loading.hide();
						$noResult.show();
					}
				}
			}
		}
	});
});