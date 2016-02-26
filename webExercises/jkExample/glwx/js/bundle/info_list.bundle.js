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

	var param = __webpack_require__(8),
		cookie = __webpack_require__(1),
		Config = __webpack_require__(3);
	__webpack_require__(9);
	__webpack_require__(6);
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
/* 7 */,
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