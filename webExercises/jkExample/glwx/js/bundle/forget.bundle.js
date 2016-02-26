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
		md5 = __webpack_require__(10),
		check = __webpack_require__(11),
		Config = __webpack_require__(3);
	// load jQuery extensions
	__webpack_require__(7);
	$(function() {
		var $promptNow = null,
			$inputs = $(".input").not(".input-submit");
		$inputs.on("focusout", function(event) {
			var $this = $(this),
				checkFunc = check[$this.attr("check")],
				args = [$this.val()];
			$this.is(".input-confirm") && args.push($(".input-password").val());
			$this.toggleClass("ok", checkFunc ? checkFunc.apply(check, args) : false);
		});
		var timeLeft = 60,
			$alert = $(".alert-window");
		$(".get-code").on("touchend", function(event) {
			var $idnum = $(".input-idnum"),
				idnum = $idnum.val(),
				$this = $(this),
				$sendState = $(".send-state"),
				$timeLeft = $(".time-left");
			$idnum.blur();
			var canSend = $idnum.is(".ok");
			// 之后要把倒计时逻辑放入ajax请求成功后
			// 1、点击发送验证码
			// 2、短信发送中，灰色不可点击
			// 3、输入验证码（发送成功），灰色不可点击
			// 4、发送失败点击重发（发送失败），深橙色可点击
			if (!$this.is(".disabled") && canSend) {
				var codeParams = {
					userId : idnum,
					businessType : Config.BusinessType.RESET_PASSWORD
				};
				$.ajax({
					url : Config.GetDataURL,
					type : "get",
					data : {mName : "getCheckCode", pContent : JSON.stringify(codeParams)},
					beforeSend : function() {
						$sendState.text(Config.SENDING);
						$this.addClass("disabled sending");
					},
					complete : function(data) {
						var dataText = data.responseText ? data.responseText.trim() : "";
						if (dataText === "" || Config.rhtml.test(dataText)) {
							alert(Config.NET_ERROR);
						} else {
							var jsonData = JSON.parse(dataText);
							if (jsonData.rspCode !== "1") {
								// 发送失败
								$sendState.text(Config.SEND_FAILED);
								$this.removeClass("sending disabled").addClass("failed");
								$alert.alert(jsonData.rspMsg, true);
							} else {
								// 发送成功
								$sendState.text(Config.SEND_SUCCESS);
								$this.removeClass("sending failed");
								$timeLeft.show();
								var countdown = null;
								countdown = setInterval(function() {
									if (timeLeft--) {
										$timeLeft.text(timeLeft);
									} else {
										clearInterval(countdown);
										timeLeft = 60;
										$timeLeft.hide();
										$sendState.text(Config.SEND_DEFAULT);
										$this.removeClass("disabled");
									}
								}, 1000);
							}
						}
					}
				});
			} else if (!canSend) {
				var	retInfo = check.idnum($idnum.val(), true);
				$valid.open("", retInfo.msg);
			}
		});
		var $result = $(".alert-wrap.result"),
			$valid = $(".alert-wrap.validate");
		$valid.bindTouchHandler(".confirm", function(event) {
			event.preventDefault();
			$valid.close();
		});
		$(".find-form").on("submit", function(event) {
			event.preventDefault();
			$inputs.blur();
			var canSubmit = $(".ok").length === $inputs.length;
			if (canSubmit) {
				var idnum = $(".input-idnum").val(),
					verifyCode = $(".input-code").val(),
					password = $(".input-password").val(),
					resetParams = {
						userId : idnum,
						newUserPassword : md5.digest_s(password),
						verifyCode : verifyCode
					},
					$submit = $(".input-submit");
				$.ajax({
					url : Config.GetDataURL,
					type : "get",
					data : {mName : "passwordReset", pContent : JSON.stringify(resetParams)},
					beforeSend : function() {
						$submit.addClass("submiting").val("重置中...");
					},
					complete : function(data) {
						$submit.removeClass("submiting").val("重置");
						var dataText = data.responseText ? data.responseText.trim() : "";
						if (dataText === "" || Config.rhtml.test(dataText)) {
							alert(Config.NET_ERROR);
						} else {
							var jsonData = JSON.parse(dataText);
							if (jsonData.rspCode !== "1") {
								$result.bindTouchHandler(".close", function(event) {
									event.preventDefault();
									$result.close();
									$(this).off("touchend");
								}).open("重置密码失败", jsonData.rspMsg);
							} else {
								$result.bindTouchHandler(".close", function(event) {
									event.preventDefault();
									location.href = Config.IS_WX ? Config.getWxAuthPath("sign_in") : "sign_in";
								}).open("重置密码成功", "点击关闭前往登陆页");
							}
						}
					}
				});
			} else {
				var $warn = $inputs.filter(function() {
						return !$(this).is(".ok");
					}).first(),
					checkFunc = check[$warn.attr("check")],
					args = [$warn.val(), true];
				$warn.is(".input-confirm") && args.splice(1, 0, $(".input-password").val());
				$valid.open("", checkFunc ? checkFunc.apply(check, args).msg : "");
			}
		});
		$(".input-submit").on("touchend", function(event) {
			$(".find-form").submit();
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
/* 6 */,
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
/* 10 */
/***/ function(module, exports) {

	(function () {
	  "use strict";
	/**
	 * md5.js
	 * Copyright (c) 2011, Yoshinori Kohyama (http://algobit.jp/)
	 * all rights reserved.
	 */
	if (!Array.prototype.forEach) {
		Array.prototype.forEach = function(callback) {
			var i = 0,
				len = this.length;
			for ( ; i < len ; i++ ) {
				callback.call(this, this[i], i);
			}
		};
	}
	exports.digest = function (M) {
	  var originalLength
	    , i
	    , j
	    , k
	    , l
	    , A
	    , B
	    , C
	    , D
	    , AA
	    , BB
	    , CC
	    , DD
	    , X
	    , rval
	    ;

		function F(x, y, z) { return (x & y) | (~x & z); }
		function G(x, y, z) { return (x & z) | (y & ~z); }
		function H(x, y, z) { return x ^ y ^ z;          }
		function I(x, y, z) { return y ^ (x | ~z);       }

		function to4bytes(n) {
			return [n&0xff, (n>>>8)&0xff, (n>>>16)&0xff, (n>>>24)&0xff];
		}

		originalLength = M.length; // for Step.2

		// 3.1 Step 1. Append Padding Bits
		M.push(0x80);
		l = (56 - M.length)&0x3f;
		for (i = 0; i < l; i++)
			M.push(0);

		// 3.2 Step 2. Append Length
		to4bytes(8*originalLength).forEach(function (e) { M.push(e); });
		[0, 0, 0, 0].forEach(function (e) { M.push(e); });

		// 3.3 Step 3. Initialize MD Buffer
		A = [0x67452301];
		B = [0xefcdab89];
		C = [0x98badcfe];
		D = [0x10325476];

		// 3.4 Step 4. Process Message in 16-Word Blocks
		function rounds(a, b, c, d, k, s, t, f) {
			a[0] += f(b[0], c[0], d[0]) + X[k] + t;
			a[0] = ((a[0]<<s)|(a[0]>>>(32 - s)));
			a[0] += b[0];
		}

		for (i = 0; i < M.length; i += 64) {
			X = [];
			for (j = 0; j < 64; j += 4) {
				k = i + j;
				X.push(M[k]|(M[k + 1]<<8)|(M[k + 2]<<16)|(M[k + 3]<<24));
			}
			AA = A[0];
			BB = B[0];
			CC = C[0];
			DD = D[0];

			// Round 1.
			rounds(A, B, C, D,  0,  7, 0xd76aa478, F);
			rounds(D, A, B, C,  1, 12, 0xe8c7b756, F);
			rounds(C, D, A, B,  2, 17, 0x242070db, F);
			rounds(B, C, D, A,  3, 22, 0xc1bdceee, F);
			rounds(A, B, C, D,  4,  7, 0xf57c0faf, F);
			rounds(D, A, B, C,  5, 12, 0x4787c62a, F);
			rounds(C, D, A, B,  6, 17, 0xa8304613, F);
			rounds(B, C, D, A,  7, 22, 0xfd469501, F);
			rounds(A, B, C, D,  8,  7, 0x698098d8, F);
			rounds(D, A, B, C,  9, 12, 0x8b44f7af, F);
			rounds(C, D, A, B, 10, 17, 0xffff5bb1, F);
			rounds(B, C, D, A, 11, 22, 0x895cd7be, F);
			rounds(A, B, C, D, 12,  7, 0x6b901122, F);
			rounds(D, A, B, C, 13, 12, 0xfd987193, F);
			rounds(C, D, A, B, 14, 17, 0xa679438e, F);
			rounds(B, C, D, A, 15, 22, 0x49b40821, F);

			// Round 2.
			rounds(A, B, C, D,  1,  5, 0xf61e2562, G);
			rounds(D, A, B, C,  6,  9, 0xc040b340, G);
			rounds(C, D, A, B, 11, 14, 0x265e5a51, G);
			rounds(B, C, D, A,  0, 20, 0xe9b6c7aa, G);
			rounds(A, B, C, D,  5,  5, 0xd62f105d, G);
			rounds(D, A, B, C, 10,  9, 0x02441453, G);
			rounds(C, D, A, B, 15, 14, 0xd8a1e681, G);
			rounds(B, C, D, A,  4, 20, 0xe7d3fbc8, G);
			rounds(A, B, C, D,  9,  5, 0x21e1cde6, G);
			rounds(D, A, B, C, 14,  9, 0xc33707d6, G);
			rounds(C, D, A, B,  3, 14, 0xf4d50d87, G);
			rounds(B, C, D, A,  8, 20, 0x455a14ed, G);
			rounds(A, B, C, D, 13,  5, 0xa9e3e905, G);
			rounds(D, A, B, C,  2,  9, 0xfcefa3f8, G);
			rounds(C, D, A, B,  7, 14, 0x676f02d9, G);
			rounds(B, C, D, A, 12, 20, 0x8d2a4c8a, G);

			// Round 3.
			rounds(A, B, C, D,  5,  4, 0xfffa3942, H);
			rounds(D, A, B, C,  8, 11, 0x8771f681, H);
			rounds(C, D, A, B, 11, 16, 0x6d9d6122, H);
			rounds(B, C, D, A, 14, 23, 0xfde5380c, H);
			rounds(A, B, C, D,  1,  4, 0xa4beea44, H);
			rounds(D, A, B, C,  4, 11, 0x4bdecfa9, H);
			rounds(C, D, A, B,  7, 16, 0xf6bb4b60, H);
			rounds(B, C, D, A, 10, 23, 0xbebfbc70, H);
			rounds(A, B, C, D, 13,  4, 0x289b7ec6, H);
			rounds(D, A, B, C,  0, 11, 0xeaa127fa, H);
			rounds(C, D, A, B,  3, 16, 0xd4ef3085, H);
			rounds(B, C, D, A,  6, 23, 0x04881d05, H);
			rounds(A, B, C, D,  9,  4, 0xd9d4d039, H);
			rounds(D, A, B, C, 12, 11, 0xe6db99e5, H);
			rounds(C, D, A, B, 15, 16, 0x1fa27cf8, H);
			rounds(B, C, D, A,  2, 23, 0xc4ac5665, H);

			// Round 4.
			rounds(A, B, C, D,  0,  6, 0xf4292244, I);
			rounds(D, A, B, C,  7, 10, 0x432aff97, I);
			rounds(C, D, A, B, 14, 15, 0xab9423a7, I);
			rounds(B, C, D, A,  5, 21, 0xfc93a039, I);
			rounds(A, B, C, D, 12,  6, 0x655b59c3, I);
			rounds(D, A, B, C,  3, 10, 0x8f0ccc92, I);
			rounds(C, D, A, B, 10, 15, 0xffeff47d, I);
			rounds(B, C, D, A,  1, 21, 0x85845dd1, I);
			rounds(A, B, C, D,  8,  6, 0x6fa87e4f, I);
			rounds(D, A, B, C, 15, 10, 0xfe2ce6e0, I);
			rounds(C, D, A, B,  6, 15, 0xa3014314, I);
			rounds(B, C, D, A, 13, 21, 0x4e0811a1, I);
			rounds(A, B, C, D,  4,  6, 0xf7537e82, I);
			rounds(D, A, B, C, 11, 10, 0xbd3af235, I);
			rounds(C, D, A, B,  2, 15, 0x2ad7d2bb, I);
			rounds(B, C, D, A,  9, 21, 0xeb86d391, I);

			A[0] += AA;
			B[0] += BB;
			C[0] += CC;
			D[0] += DD;
		}

		rval = [];
		to4bytes(A[0]).forEach(function (e) { rval.push(e); });
		to4bytes(B[0]).forEach(function (e) { rval.push(e); });
		to4bytes(C[0]).forEach(function (e) { rval.push(e); });
		to4bytes(D[0]).forEach(function (e) { rval.push(e); });

		return rval;
	}

	exports.digest_s = function (s) {
		var M = []
	    , i
	    , d
	    , rstr
	    , s
	    ;

		for (i = 0; i < s.length; i++)
			M.push(s.charCodeAt(i));

		d = exports.digest(M);
		rstr = '';

		d.forEach(function (e) {
			s = e.toString(16);
			while (s.length < 2)
				s = '0' + s;
			rstr += s;
		});

		return rstr;
	}

	}());

/***/ },
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

/***/ }
/******/ ]);