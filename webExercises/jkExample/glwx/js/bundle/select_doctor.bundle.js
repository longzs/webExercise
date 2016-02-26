/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var cookie = __webpack_require__(1),
		param = __webpack_require__(8),
		Config = __webpack_require__(3);
	__webpack_require__(9);
	// load jQuery extensions
	__webpack_require__(6);
	__webpack_require__(7);
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

/***/ },
/* 1 */
/***/ function(module, exports) {

	/*
	 * $Id: cookie.js,v 1.00.00 2015/06/16 10:10:32 jennis $
	 * 
	 * this script runs in web browser client
	 *
	 *  Licensed under the MIT license.
	 *    http://opensource.org/licenses/mit-license
	 *
	 */
	if (!String.prototype.trim) {
		String.prototype.trim = function() {
			return this.replace(/(^\s*)|(\s*$)/g, "");
		}
	}
	module.exports = {
		defaults: {},
		extend: function() {
			var i = 0;
			var result = {};
			for (; i < arguments.length; i++) {
				var options = arguments[ i ];
				for (var key in options) {
					result[key] = options[key];
				}
			}
			return result;
		},
		cookie: function(name, value, options) {
			if (value !== undefined) {
				if (name.match(/\W/)) {
					throw new Error("characters out bounds of [0-9a-zA-Z_] are illegal");
				}
				var options = options || this.defaults;
				if (typeof options.expires === "number") {
					var t = new Date();
					t.setTime(+t + 864e+5 * options.expires);
					return ( document.cookie = [ name, "=", value,
						options.expires ? "; expires=" + t.toGMTString() : "", 
						options.path    ? "; path=" + options.path : "",
						options.domain  ? "; domain=" + options.domain : "",
						options.secure  ? "; secure" : ""
					].join("") );
				}	
			}
			var cookieStr = document.cookie,
				cookies = cookieStr.split(";"),
				i = 0,
				len = cookies.length;
			for ( ; i < len ; i++ ) {
				var cookie = cookies[ i ].trim(),
					equal = cookie.indexOf("=");
				if (cookie.slice(0, equal) === name) {
					return cookie.slice(equal + 1);
				}
			}
			return "";
		},
		add: function(name, value, options) {
			this.cookie(name, value, options);
		},
		get: function(name) {
			return this.cookie(name);
		},
		remove: function(name, options) {
			this.cookie(name, "invalid", this.extend(options, {
				expires: -1
			}));
		},
		removeAll: function(options) {
			var cookieStr = document.cookie,
				cookies = cookieStr.split(";"),
				i = 0,
				len = cookies.length;
			for( ; i < len ; i++ ) {
				var cookieName = cookies[ i ].split("=")[ 0 ] .trim();
				this.remove(cookieName, options);
			}
		}
	};


/***/ },
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var commonConfig = __webpack_require__(4);
	var Config = {
		app : "glwx",
		pltId : "03",
		productId : "010",
		version : "1.00.00",
		wxAppId : "wx97e1952c1a0281a4",
		GetDataURL : location.origin + "/support/get_data",
		appColumnsMap: {
			/* 健康南京 */
			"001": {
				cols: [{
					nodeId: 225, // not null
					level: 1, // if not passed, take 1 as default value
					title: "健康科普", // title name
					thumbnail_path: "/assets/glwx/img/thumbnail.png"
				}, {
					nodeId: 229,
					level: 1,
					title: "营养养生",
					thumbnail_path: "/assets/glwx/img/thumbnail.png"
				}, {
					nodeId: 230,
					level: 1,
					title: "通知公告",
					thumbnail_path: "/assets/glwx/img/thumbnail.png"
				}],
				style_extensions: "condensed color-inverse",
				article_based: true, // 以文章为主体的结构
				// 仅当article_based为true时 article_cols有效
				article_cols: [{
					// 推荐
					nodeId: 238,
					bRecm: true,
					style_extensions: "float first-stressed"
				}, {
					nodeId: 239
				}]
			},
			/* 鼓楼 */
			"007": {
				cols: [{
					nodeId: 93,
					level: 1,
					title: "医院动态"
				}, {
					nodeId: 94,
					level: 1,
					title: "学科动态"
				}, {
					nodeId: 89,
					level: 1,
					title: "健康科普"
				}, {
					nodeId: 90,
					level: 1,
					title: "媒体报道"
				}],
				style_extensions: "first-stressed"
			}	
		},
		HSPCODE: "23101",
		HSPNAME: "南京市鼓楼医院",
		DEFAULT_MAX_INTRO_LENGTH : 25,
		MAX_SEARCH_TIMES : 10,
		DEFAULT_HOS_LOGO_IMG_SRC: "/assets/gcwx/img/hsp_logo_default.png",
		DEFAULT_DOC_IMG_SRC : "/assets/gcwx/img/doc_default.png",
		DEFAULT_HSP_IMG_SRC : "/assets/gcwx/img/hsp_default.png",
		SEND_DEFAULT : "点击发送验证码",
		SENDING : "验证码发送中",
		SEND_SUCCESS : "输入验证码",
		SEND_FAILED : "发送失败点击重发"
	};
	for ( var p in commonConfig ) {
		Config[p] = commonConfig[p];
	}
	Config.ajaxSetting({
		redirectPageName: "sign_in",
		redirectExcept: ["sign_in", "sign_up", "validate", "forget", "home_info", "info_list", "hsp_sign_in", "hsp_home", "hsp_account", "hsp_foregift", "hsp_daily_bill"]
	});
	module.exports = Config;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(5);
	var Config = {
		NET_ERROR : "网络连接错误，请刷新重试！",
		GET_DATA_ERROR: "数据请求异常",
		COOKIE_NOT_AVAILABLE : "Cookie当前不可用！请检查浏览器设置",
		rhtml : /^<(?:\s|.)*>$/,
		IS_WX : /MicroMessenger/i.test(navigator.userAgent),
		ajaxSetting: function(options) {
			// check if third-party library which provides ajax module exists
			if (window.$ && $.ajaxSetup) {
				var matches = location.pathname.match(/(\/(?:\w+\/)*)(\w+)?/),
					loginHref = options.redirectPageName,
					_this = this;
				if (matches && (pageName = matches[2])) {
					loginHref += [(location.search ? location.search + "&" : "?"), "referrer=" + pageName].join("")
				}
				// 去除了根据cookie中sid存在与否来决定是否重定向的逻辑
				$.ajaxSetup({
					dataType : "json",
					data: {
						pltId: this.pltId,
						productId: this.productId,
						version: this.version,
						sessionId: __webpack_require__(1).get("sid")
					},
					success: function(data, status) {
						// 通用ajax处理
						if (data.rspCode !== "1") {
							switch(data.rspCode) {
								case "9004":
									// 登录失效
								case "9005":	
									// 登录被挤
									options.sidHandler ? options.sidHandler() : (location.href = _this.IS_WX ? _this.getWxAuthPath(loginHref) : loginHref);
									break;
							}
						}
					},
					complete: function(xhr, status) {
						var rspText = xhr.responseText && xhr.responseText.trim();
						if (rspText === "" || _this.rhtml.test(rspText)) {
							switch(status) {
								case "success":
									alert(_this.GET_DATA_ERROR);
									break;
								case "error":
									alert(_this.NET_ERROR);
									break;
								case "abort":
									break;
								default:
									console.log(status);
									this._error && this._error.call(this, status);
							}
						} else {
							try {
								this._complete && this._complete.call(this, JSON.parse(rspText));
							} catch(e) {
								console.log(e);
							}
						}
					}
				});
			}
		},
		getFullPath: function(relPath) {
			var path = location.pathname.match(/(\/(?:\w+\/)*)(?:\w+)?/)[1];
			return [location.origin, path, relPath].join("");
		},
		getWxAuthPath : function(relPath) {
			return "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + this.wxAppId + "&redirect_uri=" + encodeURIComponent(this.getFullPath(relPath)) + "&response_type=code&scope=snsapi_base#wechat_redirect";
		},
		ModifyCommonUser : {
			ADD : "1",
			UPDATE : "2",
			DELETE : "3"
		},
		RegisterType: {
			REGISTER : "1",
			FETCH: "2",
			CHARGE: "3"
		},
		RegisterTypeMap: {
			1: "挂号",
			2: "取号",
			3: "缴费"
		},
		BusinessType : {
			REGISTER : "1",
			RESET_PASSWORD : "2",
			CASE_HISTORY : "3",
			RESERVE_RECORD : "4",
			SEE_REPORT : "5"
		},
		PayMethod: {
			TELE_FARE: "00",
			ONLINE_PAY: "01",
			UNION_WAP_PAY: "010",
			ALI_PAY: "02",
			WX_PAY: "03",
			OFFLINE_PAY: "05"
		},
		ChannelCode: {
			BD: "01",
			WX: "02",
			ALI: "03",
			YM: "04"
		},
		CardTypes: ["医疗卡", "医保卡"],
		ReportPrintStatus: ["未打印", "已打印", "检测中"],
		Status: ["已违约", "已取消", "取号/挂号成功", "预约可取消", "预约不可取消", "可支付", "预约成功", "业务处理中/挂号处理中", "挂号失败", "已退号", "历史挂号记录"],
		Weekdays : ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
		SeeTimeStrings : ["上午", "中午", "下午", "夜晚", "早班", "全天"],
		NORMAL : "普通号",
		INFO_IMG_SRC: "http://cms.jiankang51.cn",
		COUNTDOWN_MINUTES: 60
	};
	 module.exports = Config;

/***/ },
/* 5 */
/***/ function(module, exports) {

	/*
	 * $Id: stringUtils.js,v 1.00.00 2015/06/16 10:10:32 jennis $
	 * 
	 * this script runs in web browser client
	 *
	 *  Licensed under the MIT license.
	 *    http://opensource.org/licenses/mit-license
	 *
	 */
	if (!String.prototype.startsWith) {
		String.prototype.startsWith = function(str) {
			return this.slice(0, str.length) == str;
		}
	}
	if (!String.prototype.trim) {
		String.prototype.trim = function() {
			return this.replace(/(^\s*)|(\s*$)/g, "");
		}
	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	; (function($) {
		$.fn.tap = function(cb) {
			this.each(function() {
				// adapt pc or mobile
				var $this = $(this),
					bHandheld = /mobile|windows phone|ios|android/i.test(navigator.userAgent);
				if (!cb) {
					$this.triggerHandler(bHandheld ? "touchend" : "click");
				} else {
					if (!bHandheld) {
						$this.on("click", function(event) {
							cb.call(this, event, this);
						});
					} else {
						var	startX, endX,
							startY, endY;
						$this.on("touchstart", function(event) {
							var touch = event.originalEvent.touches[0];
							startX = touch.pageX;
							startY = touch.pageY;
						});
						$this.on("touchend", function(event) {
							event = event.originalEvent;
							// 判断该动作是否由用户点击触发
							if (typeof cb !== "function") {
								return;
							}
							if (event) {
								var touch = event.changedTouches[0];
								endX = touch.pageX;
								endY = touch.pageY;
								if ((Math.abs(endX - startX) < 6) && (Math.abs(endY - startY) < 6) ) {
									// 第三个参数兼容旧版本
									cb.call(this, event, this);
								}
							} else {
								cb.call(this, event, this);
							}
						})
					}
				}
			});
			return this;
		};
	})(jQuery);

/***/ },
/* 7 */
/***/ function(module, exports) {

	; (function($) {
		$.fn.extend({
			alert : function(text, bError, complete) {
				var $this = $(this);
				$this.find(".alert-window-info").text(text);
				bError && $this.addClass("failed");
				$this.ajustToCenter().fadeIn(250);
				setTimeout(function() {
					$this.fadeOut(250, function() {
						complete && complete();
						$this.removeClass("failed");
					});
				}, 2000);
			},
			ajustToCenter : function() {
				var $this = $(this);
				return $this.css({
					"top" : function() {
						return $("body").scrollTop() + $(window).height() / 2 - $this.height() / 2;
					},
					"margin" : "0 auto"
				});
			},
			open : function(title, desc, callback) {
				var $this = $(this);
				title && $this.find(".alert-title").text(title);
				desc && $this.find(".alert-desc").text(desc);
				$this.show();
				callback && typeof callback === "function" && callback();
				return $this;
			},
			close: function() {
				return $(this).hide();
			},
			bindTouchHandler : function(selector, handler, cb) {
				var obj = {};
				this.each(function() {
					var $this = $(this),
						type = obj.toString.call(selector).match(/\[object (\w+)\]/)[1].toLowerCase(),
						bHandheld = /mobile|windows phone|ios|android/i.test(navigator.userAgent),
						clickEvent = bHandheld ? "touchend" : "click";
					if (type === "object") {
						for (var s in selector) {
							var hd = selector[s];
							$this.find(s).on(clickEvent, {$elem: $this}, hd);
						}
					} else if (type === "string") {
						$this.find(selector).on(clickEvent, {$elem: $this}, handler);
					}
				});
				return this;
			}
		});
	})(jQuery);

/***/ },
/* 8 */
/***/ function(module, exports) {

	/*
	 * $Id: param.js,v 1.00.00 2015/06/16 10:10:32 jennis $
	 * can be used to get or set value from URL's query string
	 * this script runs in web browser client
	 *
	 *  Licensed under the MIT license.
	 *    http://opensource.org/licenses/mit-license
	 *
	 */
	module.exports = {
		val: function(name, value) {
			var map,
				search = decodeURIComponent(location.search),
				wellIndex = search.indexOf("#") !== - 1 ? search.indexOf("#") : search.length,
				searchStr = search ? search.slice(1, wellIndex) : null,
				pairMap = {},
				toString = pairMap.toString,
				searches = [];
			if (searchStr) {
				var pairs = searchStr.split("&"),
					i = 0,
					len = pairs.length;
				for ( ; i < len ; i++ ) {
					var pair = pairs[i],
						equal = pair.indexOf("=");
					pairMap[ pair.slice(0, equal) ] = pair.slice(equal + 1);
				}
			}
			if (name === undefined) {
				return pairMap;
			} else {
				if (value !== undefined) {
					// add param
					pairMap[ name ] = value;
				} else {
					if (typeof name === "string") {
						return pairMap[ name ] || "";
					} else if (toString.call(name) === "[object Object]") {
						// add multiple params
						for ( var key in name ) {
							pairMap[ key ] = name[ key ];
						}
					} else {
						return "";
					}
				}
			}
			for ( var key in pairMap ) {
				searches.push(key + "=" + pairMap[ key ]);
			}
			location.search = "?" + encodeURIComponent(searches.join("&"));
		}
	};


/***/ },
/* 9 */
/***/ function(module, exports) {

	/*
	 * $Id: dateUtils.js,v 1.00.00 2015/06/16 10:10:32 jennis $
	 * 
	 * this script runs in web browser client
	 *
	 *  Licensed under the MIT license.
	 *    http://opensource.org/licenses/mit-license
	 *
	 */
	Date.prototype.format = function(format) {
		var splits = format.split(/[^a-zA-Z]/),
			i = 0,
			len = splits.length,
			formatMap = {
				 /* this map can be extended */
				"yyyy": this.getFullYear(),
				"mm": this.getMonth() + 1,
				"dd": this.getDate(),
				"hh": this.getHours(),
				"MM": this.getMinutes(),
				"ss": this.getSeconds()
			};
		for ( ; i < len ; i++ ) {
			var key = splits[i],
				val = formatMap[key];
			if (key in formatMap) {	
				format = format.replace(key, val < 10 ? "0" + val : val);
			} else {
				continue;
			}
		}
		return format;
	}
	String.prototype.toDate = function(delim) {
		// transform date format string to Date
		// only support Date with format like yyyy-mm-dd
		var tmp = new Date();
		if (/^\d*$/.test(this)) {
			tmp.setDate(this.slice(6, 8));
			tmp.setMonth(parseInt(this.slice(4, 6)) - 1);
			tmp.setFullYear(this.slice(0, 4));
		} else {
			delim = delim || this.match(/[^\w]/)[0];
			if (delim) {
				var splits = this.split(delim);
				tmp.setDate(splits[2]);
				tmp.setMonth(parseInt(splits[1]) - 1);
				tmp.setFullYear(splits[0]);
			}
		}
		return tmp;
	}
	Date.prototype.isSameDayWith = function(b) {
		if (!b) {
			return false;
		}
		return this.getDate() === b.getDate() && this.getMonth() === b.getMonth() && this.getFullYear() === b.getFullYear();
	}

/***/ }
/******/ ]);