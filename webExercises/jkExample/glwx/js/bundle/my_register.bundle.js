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
		base64 = __webpack_require__(2),
		Config = __webpack_require__(3);
	// load jQuery extensions
	__webpack_require__(9);
	__webpack_require__(6);
	__webpack_require__(7);
	$(function() {
		var idnum = cookie.get("idnum");
		if (idnum) {
			idnum = base64.decode(idnum);
			var name = base64.decode(cookie.get("name")),
				$loading = $(".loading.record-loading"),
				$alert = $(".alert-window"),
				$overlayer = $(".overlayer"),
				params = {hospitalCode: Config.HSPCODE, "userId": idnum, "typeId" : "0"};
			// 退约逻辑处理
			var $cancelPrompt = $(".cancel-prompt"),
				$cancelResult = $(".cancel-result"),
				$cancelLoading = $(".loading.cancel-loading"),
				cancelParams = {};
			$cancelPrompt.bindTouchHandler({
				".cancel" : function() {
					$cancelPrompt.close();
				},
				".confirm" : function() {
					$cancelPrompt.close();
					$.ajax({
						url : Config.GetDataURL,
						type: "get",
						data : {mName:"preRegisterCancel", pContent: JSON.stringify(cancelParams)},
						beforeSend: function() {
							$cancelLoading.show();
						},
						complete : function(data) {
							$cancelLoading.hide();
							var dataText = data.responseText ? data.responseText.trim() : "";
							if (dataText === "" || Config.rhtml.test(dataText)) {
								alert(Config.NET_ERROR);
							} else {
								var jsonData = JSON.parse(dataText);
								if (jsonData.rspCode !== "1") {
									$cancelResult.open("", jsonData.rspMsg);
								} else {
									// 预约取消成功
									$cancelResult.open("", "预约取消成功");
								}
							}
						}
					});
				}
			});
			$cancelResult.bindTouchHandler({
				".confirm" : function() {
					location.reload();
				}
			});
			$(".cancel-btn").on("touchend", function(event) {
				event.stopPropagation();
				var $this = $(this);
				if (!$this.is(".disabled")) {
					var $order = $this.closest(".order"),
						orderInfo = $order.data("orderInfo");
					cancelParams = {
						hospitalCode : Config.HSPCODE,
						userId : idnum,
						preRegisterFlow : orderInfo.registerFlow,
						reservationFrom : orderInfo.reservationFrom
					};
					$cancelPrompt.open();
				}
			});
			$(".order").tap(function(event) {
				var $this = $(this),
					$target = $(event.target),
					orderInfo = $this.data("orderInfo");
				if ($target.is(".reserve-btn")) {
					var docInfo = {
							hspCode : orderInfo.hospitalCode,
							hspName : orderInfo.hospitalName,
							depId : orderInfo.departmentId,
							depName : orderInfo.departmentName
					};
					if (orderInfo.expertId) {
						$.extend(docInfo, {
							expertId : orderInfo.expertId,
							expertName : orderInfo.expertName,
							expertTitle : orderInfo.expertTitle,
							expertImg: orderInfo.imgUrl
						});
						location.href = "doctor_info?transData=" + encodeURIComponent(JSON.stringify(docInfo));
					} else {
						location.href = "select_doctor?transData=" + encodeURIComponent(JSON.stringify(docInfo));
					}
				} else {
					if ($target.is(".pay-btn")) {
						var registerInfo = {
							hspCode: orderInfo.hospitalCode,
							depId: orderInfo.departmentId,
							depName: orderInfo.departmentName,
							clinicDate : orderInfo.clinicDate,
							seeTime : orderInfo.seeTime,
							scheduFlow : orderInfo.registerFlow,
							totalFee : orderInfo.totalFee,
							sectionId: orderInfo.sectionId,
							reservationFrom: orderInfo.reservationFrom,
							idNo: orderInfo.idNo,
							bRegister: 1,
							typeId: Config.RegisterType.FETCH
						};
						if (orderInfo.expertId) {
							$.extend(registerInfo, {
								expertId: orderInfo.expertId,
								expertName : orderInfo.expertName,
								expertTitle : orderInfo.expertTitle,
								imgURL : orderInfo.imgUrl
							});
						} else {
							$.extend(registerInfo, {
								expertName : Config.NORMAL
							});
						}
						location.href = "place_order?transData=" + encodeURIComponent(JSON.stringify(registerInfo));
					} else {
						orderInfo.bHistory = $this.is(".history");
						location.href = "register_info?transData=" + encodeURIComponent(JSON.stringify(orderInfo));
					}
				}
			});
			$.ajax({
				url : Config.GetDataURL,
				type: "get",
				data : {mName:"searchUserRegisterInfo", pContent: JSON.stringify(params)},
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
							var orders = jsonData.rspData.body,
								$orderTmpl = $(".order.template"),
								$pureTmpl = $orderTmpl.clone(true).removeClass("template"),
								i = 0,
								len = orders.length,
								typeMap = {
									"1": "register",
									"2": "reserve"
								};
							if (len) {
								for ( ; i < len ; i++ ) {
									var $order = $pureTmpl.clone(true),
										order = orders[i],
										seeTime = order.seeTime, 
										visitTime = seeTime.length == 1 ? Config.SeeTimeStrings[parseInt(seeTime) - 1] : seeTime;
									$order.toggleClass("history", !!+order.isHistory);
									// 处理状态栏
									if (order.typeId === "2") {
										// 需要增加字段判断是否为历史预约
										if (+order.isHistory) {
											var statusStr = Config.Status[order.status];
											$order.find(".visit-state").text(statusStr).toggle(!!statusStr);
										} else {
											var todayTime = (new Date()).getTime(),
												clinicTime = order.clinicDate.toDate().getTime(),
												diffDates = (clinicTime - todayTime) / (1000 * 60 * 60 * 24) | 0;
											if (diffDates > 0) {
												$order.find(".cancel-btn").toggleClass("disabled", !+order.cancelFlag).show()
													.end().find(".day-left").children(".left-days").text(diffDates + "天")
													.end().show();
											} else if (diffDates == 0) {
												// 已到就诊当日
												$order.find(".no-left").show();
												var amOrPm = 0,
													bDisabled = false,
													today = new Date(),
													timeNow = (today.getHours() < 10 ? "0" + today.getHours() : today.getHours()) + ":" + (today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes());
												if (visitTime.length === 2) {
													visitTime  === "下午" && (amOrPm = 1);
												} else {
													visitTime.indexOf(":") && seeTime === "3" && (amOrPm = 1);
												}
												if (amOrPm) {
													bDisabled = "17:00".localeCompare(timeNow) === -1;
												} else {
													bDisabled = "11:30".localeCompare(timeNow) === -1;
												}
												// 判断是否需要支付
												order.status === "5" && $order.addClass("pay-needed");
												// 当前是否已超过可支付时间
												// bDisabled && $order.find(".pay-btn").addClass("disabled");
											} else {
												var statusStr = Config.Status[order.status];
												$order.addClass("history").find(".visit-state").text(statusStr).toggle(!!statusStr);
											}
										}
									} else {
										// 挂号记录
										if (+order.isHistory) {
											$order.find(".visit-state").text("已就诊").show();
										} else {
											$order.find(".visit-state").text("今日就诊").show();
										}
									}
									$order.addClass(typeMap[order.typeId]).find(".doc-name").text(order.expertName || Config.NORMAL)
										.end().find(".dep-name").text(order.departmentName)
										.end().find(".visit-time").text(order.clinicDate + " " + Config.Weekdays[order.clinicDate.toDate().getDay()] + " " + visitTime)
										.end().find(".visitor-name").text(order.name)
										.end().find(".charge").text(order.totalFee)
										.end().find(".order-no").text(order.orderNo)
										.end().find(".verify-code").text(order.verifyCode)
										.end().data("orderInfo", order).insertBefore($orderTmpl);
								}
							} else {
								$(".no-result").show();
							}
						}
					}
				}
			});
		} else {
			location.href = Config.IS_WX ? Config.getWxAuthPath("sign_in?referrer=my_register") : "sign_in?referrer=my_register";
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
/* 8 */,
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