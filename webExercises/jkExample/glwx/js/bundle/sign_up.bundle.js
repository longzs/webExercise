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

	var check = __webpack_require__(11),
		Config = __webpack_require__(3);
	// load jQuery extensions
	__webpack_require__(7);
	$(function() {
		var $promptNow = null,
			$inputs = $(".input").not(".input-submit");
		$inputs.on("focusout", function(event) {
			var $this = $(this),
				checkFunc = check[$this.attr("check")];
			$this.toggleClass("ok", checkFunc ? checkFunc.call(check, $this.val()) : false);
		});
		var $valid = $(".alert-wrap.validate");
		$valid.bindTouchHandler(".confirm", function(event) {
			event.preventDefault();
			$valid.close();
		});
		$(".register-form").on("submit", function(event) {
			event.preventDefault();
			$inputs.blur();
			var canSubmit = $(".ok").length === $inputs.length;
			if (canSubmit) {
				var oTransData = {
					name : $(".input-name").val(),
					idnum : $(".input-idnum").val(),
					phone : $(".input-phone").val()
				};
				!check.isAdult(oTransData.idnum) && (oTransData.bNotAdult = 1);
				location.href = Config.IS_WX ? Config.getWxAuthPath("validate?transData=" + JSON.stringify(oTransData)) : ("validate?transData=" + encodeURIComponent(JSON.stringify(oTransData)));
			} else {
				var $warn = $inputs.filter(function() {
						return !$(this).is(".ok");
					}).first(),
					checkFunc = check[$warn.attr("check")],
					retInfo = checkFunc ? checkFunc.call(check, $warn.val(), true) : "";
				$valid.open("", retInfo.msg);   
			}
		});
		$(".input-submit").on("touchend", function(event) {
			event.preventDefault();
			$(".register-form").submit();
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
/* 8 */,
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

/***/ }
/******/ ]);