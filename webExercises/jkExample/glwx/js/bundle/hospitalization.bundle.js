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

	var store = __webpack_require__(12),
		cookie = __webpack_require__(1),
		base64 = __webpack_require__(2),
		param = __webpack_require__(8),
		check = __webpack_require__(11),
		Config = __webpack_require__(3);
	// load jQuery extensions
	__webpack_require__(6);
	__webpack_require__(7);
	$(function() {
		var paramMap = param.val(),
			pltId = paramMap["pltId"],
			mode = paramMap["mode"],
			referrerIndex;
		var	load = function() {
			// 读取本地存储
			var	dataStr = store.get(Config.app),
				appData = dataStr ? JSON.parse(decodeURIComponent(dataStr)) : {},
				zyData = appData.zyData || {},
				zyUsers = zyData.zyUsers || {},
				currUser = zyData.currUser;
			// 事件绑定
			var $alert = $(".alert-window"),
				$invalid = $(".alert-wrap.invalid"),
				$noLoggin = $(".alert-wrap.no-loggin"),
				$searchForm = $(".search-form"),
				$searchBtn = $(".search-btn"),
				$code = $(".input.input-code"),
				$idnum = $(".input.input-idnum"),
				$searchInputs = $code.add($idnum),
				searchAjax;
			$invalid.bindTouchHandler(".confirm", function(event) {
				event.preventDefault();
				$invalid.close();
			});
			$noLoggin.bindTouchHandler(".confirm", function(event) {
				event.preventDefault();
				$noLoggin.close();
			});
			$searchForm.on("submit", function(event) {
				event.preventDefault();
				$searchInputs.blur();
				var code = $code.val(),
					idnum = $idnum.val(),
					idnumCheck = check.idnum(idnum, true);
				if (code && idnumCheck.flag) {
					if (!searchAjax) {
						searchAjax = $.ajax({
							url : Config.GetDataURL,
							type: "get",
							data : {mName:"getUserZyInfo", pContent: JSON.stringify({hospitalCode: Config.HSPCODE, patientId: code, idNo: idnum})},
							beforeSend: function() {
								$searchBtn.addClass("submiting").text("查询中...");
							},
							complete : function(data, status) {
								$searchBtn.removeClass("submiting").text("查询");
								searchAjax = null;
								var dataText = data.responseText ? data.responseText.trim() : "";
								if (dataText === "" || Config.rhtml.test(dataText)) {
									if (status == "success") {
										alert(Config.GET_DATA_ERROR);
									} else {
										if (status == "error") {
											alert(Config.NET_ERROR);
										}
									}
								} else {
									var jsonData = JSON.parse(dataText);
									if (jsonData.rspCode !== "1") {
										$noLoggin.open();
									} else {
										var zyData = jsonData.rspData,
											zyCode = zyData.zyFlow,
											zyInfo = {
												zyFlow: zyData.zyFlow,
												zyDate: zyData.zyDate,
												name: zyData.name,
												idnum: idnum,
												areaId: zyData.areaId,
												areaName: zyData.areaName,
												sickBed: zyData.sickBed,
												patientId: zyData.patientId
											},
											currUser = zyInfo.patientId;
										pltId && (zyInfo.pltId = pltId);
										!zyUsers[currUser] && (zyUsers[currUser] = zyInfo);
										// 信息存储
										$.extend(zyData, {
											cachedFlow: code,
											cachedIdnum: idnum,
											currUser: zyInfo.patientId,
											zyUsers: zyUsers
										});
										appData.zyData = zyData;
										store.add(Config.app, encodeURIComponent(JSON.stringify(appData)), {expires: 90});
										// 跳转
										/*$(".navi-wrap").off().attr("href", function() {
											return $(this).attr("data-href") + "?pltId=" + pltId;
										});
										if (referrerIndex) {
											location.href = $(".navi-wrap").eq(referrerIndex).attr("href");
										} else {
											location.href = "hospitalization?pltId=" + pltId;
										}*/
									}
								}
							}
						});
					}
				} else {
					if (!code) {
						$invalid.open("", "请输入住院号");
					} else if (!idnumCheck.flag) {
						$invalid.open("", idnumCheck.msg);
					}
				}
			});
			$searchBtn.on("touchend", function(event) {
				$searchForm.submit();
			});
		};
		if (pltId) {
			if (!cookie.get("sid") && (sid = paramMap["sid"])) {
				$.ajax({
					url : "/support/decode_app_data",
					type: "get",
					data : {
						data: paramMap["sid"]
					},
					complete : function(data, status) {
						var dataText = data.responseText ? data.responseText.trim() : "";
						if (dataText === "" || Config.rhtml.test(dataText)) {
							if (status == "success") {
								alert(Config.GET_DATA_ERROR);
							} else {
								if (status == "error") {
									alert(Config.NET_ERROR);
								}
							}
						} else {
							cookie.add("sid", dataText, {expires: 90});
							load();
						}
					}
				});
			} else {
				// sid存在或未获取到app传递的sid值
				load();
			}
			$(".navigator").children("#back").tap(function(event) {
				event.preventDefault();
				history.go(-1);
			}).end().show();
		} else {
			load();
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
/* 2 */
/***/ function(module, exports) {

	/*
	 * $Id: base64.js,v 1.00.00 2015/06/15 17:10:32 jennis $
	 * 
	 * this script runs in web browser client
	 *
	 *  Licensed under the MIT license.
	 *    http://opensource.org/licenses/mit-license
	 *
	 *  References:
	 *    https://github.com/kvz/phpjs/blob/master/functions/url/base64_encode.js
	 */
	module.exports = {
	    b64: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
	    encode: function(data) {
	    	if (!data) {
	    		return "";
	        }
	    	data = encodeURIComponent(data);
	        var b64 = this.b64,
	            i = 0,
	            len = data.length,
	            o1, o2, o3, // origin three 8-bit number
	            tmpBit, // temporary 24-bit number, combined by origin three
	            s1, s2, s3, s4, // splited, four 6-bit number
	            tmpArr = [],
	            arrIndex = 0;
	        do {
	            o1 = data.charCodeAt(i++);
	            o2 = data.charCodeAt(i++);
	            o3 = data.charCodeAt(i++);
	            // NaN >> x     =>      x-bit 0
	            tmpBit = o1 << 16 | o2 << 8 | o3;
	            // get lower 6 bits
	            s1 = tmpBit >> 18 & 0x3f;
	            s2 = tmpBit >> 12 & 0x3f;
	            s3 = tmpBit >> 6 & 0x3f;
	            s4 = tmpBit & 0x3f;
	            // 6-bit number's value is between 0 and 63
	            tmpArr[arrIndex++] = b64.charAt(s1) + b64.charAt(s2) + b64.charAt(s3) + b64.charAt(s4);
	        } while ( i < len );
	        var str = tmpArr.join(""),
	            mod = len % 3;
	        return ( mod ? str.slice(0, mod - 3) : str ) + "===".slice( mod || 3 );
	    },
	    decode: function(data) {
	        if (!data) {
	            return "";
	        }
	        if (!/^(?:[a-zA-Z\d\+\/=]{4})*$/.test(data)) {
	            throw new Error("invalid base64 string");
	        }
	        var b64 = this.b64,
	            i = 0,
	            len = data.length,
	            s1, s2, s3, s4,
	            tmpBit,
	            o1, o2, o3,
	            tmpArr = [],
	            arrIndex = 0;
	        do {
	            // encoded chars' index, relative to 65 base64 characters
	            s1 = b64.indexOf(data.charAt(i++));
	            s2 = b64.indexOf(data.charAt(i++));
	            s3 = b64.indexOf(data.charAt(i++)); 
	            s4 = b64.indexOf(data.charAt(i++));
	            // these four 6-bit numbers are splited by following three origin 8-bit numbers
	            tmpBit = s1 << 18 | s2 << 12 | s3 << 6 | s4;
	            // get origin three 8-bit numbers
	            o1 = tmpBit >> 16 & 0xff;
	            o2 = tmpBit >> 8 & 0xff;
	            o3 = tmpBit & 0xff;
	            if (s3 == 64) {
	                tmpArr[arrIndex++] = String.fromCharCode(o1);
	            } else if (s4 == 64) {
	                tmpArr[arrIndex++] = String.fromCharCode(o1, o2);
	            } else {
	                tmpArr[arrIndex++] = String.fromCharCode(o1, o2, o3);
	            }
	        } while ( i < len );
	        return decodeURIComponent(tmpArr.join(""));
	    }
	};

/***/ },
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
/* 9 */,
/* 10 */,
/* 11 */
/***/ function(module, exports) {

	/*
	 * $Id: formCheck.js,v 1.00.00 2015/06/16 10:10:32 jennis $
	 * this plugin is Chinese-Oriented
	 * this script runs in web browser client
	 *
	 *  Licensed under the MIT license.
	 *    http://opensource.org/licenses/mit-license
	 *
	 */
	module.exports = {
		/* alike check */
		idnumAlike: function(input) {
			return /(^\d{17}[\dxX]$)|(^\d{15}$)/.test(input);
		},
		isAdult: function(idnum) {
			if (this.idnumAlike(idnum)) {
				var rIdnum15 = /^\d{6}(\d{6})\d{3}$/,
					rIdnum18 = /^\d{6}(\d{8})[\dxX]{4}$/,
					birth;
				birth = idnum.length === 18 ? idnum.match(rIdnum18) : idnum.match(rIdnum15);
				if (birth && (birth = birth[1])) {
					var threshold = new Date(),
						year = idnum.length === 18 ? birth.slice(-8, -4) : "19" + birth.slice(-6, -4);
					threshold.setDate(birth.slice(-2));
					threshold.setMonth(+birth.slice(-4, -2) - 1);
					threshold.setYear(+year + 18);
					return +threshold <= +(new Date());
				}
			}
			return false;
		},
		/* form check */
		name: function(input, bRet) {
			var retInfo = {
				flag: false,
				msg: ""
			};
			if (!input) {
				retInfo.msg = "用户姓名不得为空";
			} else if (!/^[\u4e00-\u9fa5]{2,6}$/.test(input)) {
				retInfo.msg = "用户姓名应为2-6个中文汉字";
			} else {
				retInfo.flag = true;
			}
			return bRet ? retInfo : retInfo.flag;
		},
		phone: function(input, bRet) {
			var retInfo = {
				flag: false,
				msg: ""
			};
			if (!input) {
				retInfo.msg = "手机号不得为空";
			} else if (!/^\d{11}$/.test(input)) {
				retInfo.msg = "请输入有效手机号";
			} else {
				retInfo.flag = true;
			}
			return bRet ? retInfo : retInfo.flag;
		},
		idnum: function(input, bRet) {
			var retInfo = {
				flag: false,
				msg: ""
			};
			if (!input) {
				retInfo.msg = "身份证号不得为空";
			} else if (/^\d{17}[\dxX]$/.test(input)) {
				var Wi = [7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2],
					verifyCharcodeMap = [1,0,'x',9,8,7,6,5,4,3,2],
					S = 0,
					i = 0;
				for ( ; i < 17 ; i++ ) {
					S += Wi[i] * +input[i];
				}
				if (input[17].toLowerCase() == verifyCharcodeMap[S % 11]) {
					retInfo.flag = true;
				} else {
					retInfo.msg = "请输入有效身份证号码";
				}
			} else if (/^\d{15}$/.test(input)) {
				retInfo.flag = true;
			} else {
				retInfo.msg = "请输入有效身份证号码";
			}
			return bRet ? retInfo : retInfo.flag;
		},
		account: function(input, bRet) {
			var retInfo = {
				flag: false,
				msg: ""
			};
			if (this.idnumAlike(input)) {
				return this.idnum(input, bRet);
			} else {
				if (!input) {
					retInfo.msg = "账号不得为空";
				} else {
					// 南通平台的校验规则
					/*if (/\d/.test(input) && /[a-zA-Z]/.test(input) && /^[0-9a-zA-Z@,]{6,16}$/.test(input)) {
						retInfo.flag = true;
					} else {
						retInfo.msg = "用户名只能由6至16位的字母、数字和'@'、','符号组成";
					}*/
					retInfo.flag = true;
				}
			}
			return bRet ? retInfo : retInfo.flag;
		},
		pwd: function(input, bRet) {
			var retInfo = {
				flag: false,
				msg: ""
			};
			if (!input) {
				retInfo.msg = "密码不得为空";
			} else if (!/^.{6,30}$/.test(input)) {
				retInfo.msg = "密码长度应为6-30";
			} else {
				retInfo.flag = true;
			}
			return bRet ? retInfo : retInfo.flag;
		},
		confirm: function(input, pwd, bRet) {
			var retInfo = {
				flag: false,
				msg: ""
			};
			if (pwd) {
				if (!input) {
					retInfo.msg = "请再次输入登陆密码";
				} else if (input !== pwd) {
					retInfo.msg = "两次输入的密码不一致";
				} else {
					retInfo.flag = true;
				}
			}
			return bRet ? retInfo : retInfo.flag;
		},
		code: function(input, bRet) {
			var retInfo = {
				flag: false,
				msg: ""
			};
			if (!input) {
				retInfo.msg = "短信验证码不得为空";
			} else {
				retInfo.flag = true;
			}
			return bRet ? retInfo : retInfo.flag;
		},
		guarderIdnum: function(input, bRet) {
			var retInfo = {
				flag: false,
				msg: ""
			};
			if (!input) {
				retInfo.msg = "监护人身份证不得为空";
			} else if (!(this.isAdult(input) && this.idnum(input))) {
				retInfo.msg = "请输入有效监护人身份证号码";
			} else {
				retInfo.flag = true;
			}
			return bRet ? retInfo : retInfo.flag;
		}
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var cookie = __webpack_require__(1);
	module.exports = {
		// 由于安卓微信退出会清空localStorage因此取消localStorage存储
		bLS: !!window.localStorage && !/android/i.test(navigator.userAgent),
	//	rPath: /(\/(?:\S+\/)*)(\S*)/,
		add: function(name, val, options) {
			return this.bLS ? localStorage.setItem(name, val) : cookie.add(name, val, options);
		},
		get: function(name) {
			return this.bLS ? localStorage.getItem(name) : cookie.get(name);
		},
		remove: function(name) {
			return this.bLS ? localStorage.removeItem(name) : cookie.remove(name);
		},
		clear: function() {
			return this.bLS ? localStorage.clear() : cookie.removeAll();
		}
	};

/***/ }
/******/ ]);