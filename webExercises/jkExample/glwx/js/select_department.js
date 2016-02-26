var cookie = require("common-libs/cookie"),
	param = require("common-libs/param"),
	getPy = require("common-libs/pinyin"),
	Config = require("./config");
// load jQuery extensions
require("common-libs/jquery.tap");
require("common-libs/stringUtils");
$(function() {
	var paramMap = param.val(),
		$overlayer = $(".overlayer"),
		$body = $("body")
		$loading = $(".loading"),
		depParams = {hospitalCode : Config.HSPCODE, withDeptFlag : 1};
	$.ajax({
		url : Config.GetDataURL,
		type : "get",
		data : {mName : "searchHospitalInfo", pContent : JSON.stringify(depParams)},
		dataTye : "json",
		beforeSend : function() {
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
					var hsps = jsonData.rspData.body,
						deps = hsps.length ? hsps[0].departments : [],
						pDeps = deps.length ? hsps[0].parentDepartments : [],
						depNum = deps.length,
						pDepNum = pDeps.length,
						i = 0;
					var $depTmpl = $(".department.template"),
						$pureDep = $depTmpl.clone(true).removeClass("template"),
						initials = [],
						initialMap = {};
					for ( ; i < deps.length ; i++ ) {
						var dep = deps[i],
							$dep = $pureDep.clone(true),
							py = getPy(dep.departmentName),
							initial = py.charAt(0).toUpperCase(),
							depId = dep.departmentId.toLowerCase();
						$dep.find(".dep-name").text(dep.departmentName)
							.end().find(".dep-spec").text(dep.departmentSpeciality)//.remove() // collect data for intro_doc and queue
							.end().attr({
								py: py,
								initial: initial
								//,depid: dep.departmentId // collect data for intro_doc and queue
							}).data({
								"depInfo": dep
							}).insertBefore($depTmpl);
						// avoid multiple code modifying
						!initialMap[initial] && initials.push(initial) && (initialMap[initial] = 1);
					}
					// 定位
					/*var lastScroll = cookie.get("page_department_scroll");
					lastScroll && (document.body.scrollTop = lastScroll);*/
					// jQuery.unique behaviors incorrectly on IOS devices
					// $.unique(initials);
					var j = 0,
						jLen = initials.length,
						$initials = $(".initials"),
						initialsHeight = $initials.height(),
						indexHeight = initialsHeight / jLen > 50 ? 50 : initialsHeight / jLen,
						$index = $('<list class="index"></list>').css({
							height: indexHeight,
							"line-height": function() {
								return $(this).css("height")
							}
						});
					for ( ; j < jLen ; j++ ) {
						$initials.append($index.clone().text(initials[j]));
					}
					var l = 0,
						lLen = pDeps.length,
						$selectTmpl = $(".select.template"),
						$pureSelect = $selectTmpl.clone(true).removeClass("template");
					$(".class-counts").text(lLen);
					for ( ; l < lLen ; l++ ) {
						var $select = $pureSelect.clone(true),
							select = pDeps[l];
						$select.children(".select-title").text(select.parentDepartmentName)
							.end().data("id", select.parentDepartmentId).insertBefore($selectTmpl);
					}

					$defaultDeps = $(".department").not(".template");
					// 事件绑定
					$initials.tap(function(event, target) {
						var $target = $(event.target),
							$left = null;
						$left = $defaultDeps.filter(function() {
							return $(this).attr("initial").toUpperCase() === $target.text();
						});
						if ($left.length) {
							$body.animate({
								"scrollTop" : $left.first().offset().top
							}, {
								duration: 100
							});
						}
					});
					// 科室筛选
					var $depInput = $(".input-dep-search"),
						$depsAfterSelect,
						$filterWrap = $(".filter-wrap"),
						$filterBtn = $(".filter-btn");
					$filterBtn.on("touchend", function(event) {
						$depInput.blur();
						$overlayer.show();
						$filterWrap.css("top", function() {
							return $body.scrollTop() + 60;
						}).show();
					});
					$overlayer.tap(function(event) {
						$filterWrap.hide()
						$overlayer.hide();
					});
					$defaultDeps.tap(function(event, target) {
						// 清空用户输入
						$depInput.val("");
						var depInfo = $(target).data("depInfo"),
							oTransData = {
								hspCode: Config.HSPCODE,
								depId: depInfo.departmentId,
								depName: depInfo.departmentName
							};
						// 清空搜索输入
						$depInput.val("");
						paramMap["bRegister"] && (oTransData.bRegister = paramMap["bRegister"]);
						// 记录当前滚动位置
//						cookie.add("page_department_scroll", document.body.scrollTop, {expires: 1 / 24 / 60 * 5});
						location.href = "select_doctor?transData=" + encodeURIComponent(JSON.stringify(oTransData));
					});
					var $noResult = $(".no-result");
					function filterDep(input) {
						var $target = $depsAfterSelect ? $depsAfterSelect : $defaultDeps,
							$filtered = $target.filter(function() {
								var $this = $(this),
									py = $this.attr("py"),
									depInfo = $this.data("depInfo"),
									depSpec = depInfo.departmentSpeciality || "",
									depName = depInfo.departmentName;
								return  !((/^[\u4e00-\u9fa5]*$/.test(input) ? depName.indexOf(input) !== -1 : py.startsWith(input.toUpperCase())) || depSpec.indexOf(input) !== -1);
											});
						$filtered.addClass("hidden");
						$unFiltered = $target.not($filtered).removeClass("hidden");
						$noResult.toggle(!$unFiltered.length);
					}
					function filterDepById(id) {
						var $filtered = $defaultDeps.filter(function() {
							return  $(this).data("depInfo").parentDepartmentId !== id;
						});
						$filtered.addClass("hidden");
						$depsAfterSelect = $defaultDeps.not($filtered).removeClass("hidden");
					}
					$(".filter-dep").on("touchend", function(event) {
						filterDep($depInput.val());
					});
					var filterEvent = window.onpropertychange !== undefined ? "propertychange" : "input",
						$body = $("body");
					$depInput.on(filterEvent, function(event) {
						$body.removeClass("has-focus");
						var input = $depInput.val();
						$filterBtn.toggle(!input.length);
						!$depsAfterSelect && $initials.toggle(!input.length);
						filterDep(input);
					}).on("focusin", function() {
						$body.addClass("has-focus");
					}).on("focusout", function() {
						$body.removeClass("has-focus");
					});
					$(".select").tap(function(event, target) {
						$(".selected").removeClass("selected");
						var $select = $(target).addClass("selected"),
							bSelectAll = $select.is(".select-all");
						$initials.toggle(bSelectAll);
						if (bSelectAll) {
							$(".hidden").removeClass("hidden");
							$depsAfterSelect = null;
						} else {
							filterDepById($select.data("id"));
						}
						$filterWrap.hide()
						$overlayer.hide();
					});
				}
			}
		}
	});
	$(".recommend").tap(function(event, target) {
		location.href = "http://mp.weixin.qq.com/s?__biz=MzA5NTE1ODY4OA==&mid=215489410&idx=1&sn=7d3fadaef693b90b24558b47422689a4#rd";
	});
});