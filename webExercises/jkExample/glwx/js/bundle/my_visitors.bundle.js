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
		param = __webpack_require__(8),
		check = __webpack_require__(11),
		replacer = __webpack_require__(13),
		Config = __webpack_require__(3);
	// load jQuery extensions	
	__webpack_require__(9);
	__webpack_require__(6);
	__webpack_require__(7);
	$(function() {
		var idnum = cookie.get("idnum");
		if (idnum) {
			var mode = param.val("mode"),
				$page,
				$visitorLoading = $(".loading.visitor-loading"),
				$deleteLoading = $(".loading.delete-loading"),
				$alert = $(".alert-window"),
				$valid = $(".alert-wrap.validate"),
				$overlayer = $(".overlayer");
				idnum = base64.decode(idnum);
			$valid.bindTouchHandler(".confirm", function() {
				$valid.close();
			});
			if (!mode) {
				document.title = "常用就诊人";
				$page = $(".page.default").show();
				$(".add-btn").on("touchend", function(event) {
					param.val({
						"mode" : "add"
					});
				});
				var $deletePrompt = $(".alert-wrap.delete-prompt"),
					deleteParams = {},
					bOnDeleteAjax = false,
					$deletedVisitor = $();
				$deletePrompt.bindTouchHandler({
					".delete-cancel" : function() {
						$deletePrompt.close();
					},
					".delete-confirm" : function() {
						$deletePrompt.close();
						!bOnDeleteAjax && (bOnDeleteAjax = $.ajax({
							url : Config.GetDataURL,
							type: "get",
							data : {mName:"modifyCommonlyUser", pContent: JSON.stringify(deleteParams)},
							beforeSend: function() {
								$deleteLoading.show();
							},
							complete : function(data) {
								bOnDeleteAjax = false;
								$deleteLoading.hide();
								var dataText = data.responseText ? data.responseText.trim() : "";
								if (dataText === "" || Config.rhtml.test(dataText)) {
									alert(Config.NET_ERROR);
								} else {
									var jsonData = JSON.parse(dataText);
									if (jsonData.rspCode !== "1") {
										// 修改失败
										$alert.alert(jsonData.rspMsg, true);
									} else {
										// 更新页面
										$deletedVisitor.remove();
										$(".add-btn").show();
										$alert.alert("删除成功", false);
									}
								}
							}
						}));
					}
				});
				$(".opr.delete").on("touchend", function(event) {
					var $visitor =  $(this).closest(".visitor"),
						visitorInfo = $visitor.data("visitorInfo");
					deleteParams = {userId : idnum, typeId : Config.ModifyCommonUser.DELETE, patientID : visitorInfo.patientID};
					$deletedVisitor = $visitor;
					$deletePrompt.open();
				});
				$(".opr.edit").on("touchend", function(event) {
					var visitorInfo = $(this).closest(".visitor").data("visitorInfo");
					param.val({
						"mode" : "edit",
						"visitorInfo" : JSON.stringify(visitorInfo)
					});
				});
				// 用户滑动事件
				var $slider = $(".visitor").children(".info-wrap"),
					startPoint = {
						left: "0"
					},
					endPoint = {
						left: "-140px"
					},
					LEFT_RANGE = 70 * 3;
				var points = [startPoint, endPoint],
					_window_width = $(window).width(),
					direction = 0, // left: -1, right: 1
					startX = 0,
					endX = 0,
					bUserSelf,
					$curr;
				$slider.on("touchstart", function(event) {
					event.preventDefault();
					// 防止同时编辑
					var $this = $(this);
					if ($curr && $curr.data("pointIndex")) {
						($this.parent().index() != $curr.parent().index()) && $curr.css(points[0]).data("pointIndex", 0);
					}
					// 重置上次拖曳的各种信息
					$curr = $this;
					direction = 0;
					bUserSelf = $curr.parent().is(".user-self");
					// 获取起始坐标
					var touch = event.originalEvent.touches[0];
					startX = touch.pageX;
				});
				$slider.on("touchmove", function(event) {
					if (bUserSelf) {
						return;
					}
					event.preventDefault();
					var touch = event.originalEvent.changedTouches[0],
						currX = touch.pageX,
						diffX = currX - startX;
					// 判断滑动方向
					if (direction == 0) {
						if (diffX > 0) {
							direction = 1;
						}
						if (diffX < 0) {
							direction = -1;
						}
						if (direction != 0) {
							$curr.removeClass("static-mode");
						}
					}
					if ((direction == 1 && diffX >= 0) || (direction == -1 && diffX <= 0)) {
						var pointIndex = $curr.data("pointIndex") || 0;
						// 是否可切换
						if ((direction == 1 && pointIndex == 1) || (direction == -1 && pointIndex == 0)) {
							var currPoint = points[pointIndex],
								changeRatio = diffX / _window_width,
								currDest = {
									left: parseFloat(currPoint.left) + changeRatio * LEFT_RANGE
								};
							$curr.css(currDest);	
						}
					}
				});
				$slider.on("touchend", function(event) {
					if (bUserSelf) {
						return;
					}
					event.preventDefault();
					if (direction != 0) {
						$curr.addClass("static-mode");
						if (direction == 1) {
							$curr.css(points[0]).data("pointIndex", 0);
						}
						if (direction == -1) {
							$curr.css(points[1]).data("pointIndex", 1);
						}
					}
				});
				var commonUsersParams = { userID : idnum};
				$.ajax({
					url : Config.GetDataURL,
					type: "get",
					data : {mName:"searchCommonlyUsers", pContent: JSON.stringify(commonUsersParams)},
					beforeSend: function() {
						$visitorLoading.show();
					},
					complete : function(data) {
						$visitorLoading.hide();
						var dataText = data.responseText ? data.responseText.trim() : "";
						if (dataText === "" || Config.rhtml.test(dataText)) {
							alert(Config.NET_ERROR);
						} else {
							var jsonData = JSON.parse(dataText);
							if (jsonData.rspCode !== "1") {
								$alert.alert(jsonData.rspMsg, true);
							} else {
								var visitors = jsonData.rspData.body,
									userSelf = $.grep(visitors, function(i, val) {
										return val.patientID === idnum;
									}),
									$visitorTmpl = $(".visitor.template"),
									$pureVisitorTmpl = $visitorTmpl.clone(true).removeClass("template");
								!userSelf.length && visitors.unshift({
									userId : idnum,
									patientName : decodeURIComponent(base64.decode(cookie.get("name"))),
									patientID : idnum,
									patientPhoneNum : decodeURIComponent(base64.decode(cookie.get("phone")))
								})
								var i = 0,
									len = visitors.length;
								for ( ; i < len ; i++ ) {
									var visitor = visitors[i],
										$visitor = $pureVisitorTmpl.clone(true),
										bSelf = visitor.patientID == idnum;
									bSelf && $visitor.addClass("user-self");
									$visitor.find(".name").text(visitor.patientName)
										.end().find(".idnum").text(replacer.idnum(visitor.patientID))
										.end().find(".phone").text(bSelf ? visitor.patientPhoneNum : replacer.phone(visitor.patientPhoneNum))
										.end().data("visitorInfo", visitor).insertBefore($visitorTmpl);
								}
								len < 5 && $(".add-btn").show();
							}
						}
					}
				});
			} else {
				if (mode == "add") {
					document.title = "添加就诊人";
					var verify = param.val("verify");
					if (verify) {
						$page = $(".page.verify").show();
						addInfo = JSON.parse(verify);
						var timeLeft = 60;
						$(".get-code").on("touchend", function(event) {
							var $this = $(this),
								$sendState = $(".send-state"),
								$timeLeft = $(".time-left");
							// 之后要把倒计时逻辑放入ajax请求成功后
							// 1、点击发送验证码
							// 2、短信发送中，灰色不可点击
							// 3、输入验证码（发送成功），灰色不可点击
							// 4、发送失败点击重发（发送失败），深橙色可点击
							if (!$this.is(".disabled")) {
								var codeParams = {
									userId : addInfo.patientID,
									phoneNumber : addInfo.patientPhoneNum,
									businessType : Config.BusinessType.REGISTER
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
							}
						});
						var $code = $(".input-code").on("focusout", function() {
							var $this = $(this);
							$this.toggleClass("ok", check.code($this.val()));
						});
						$(".add-submit").on("touchend", function(event) {
							var $add = $(".add-submit"),
								bOnAddAjax = false;
							$code.blur();
							if ($code.is(".ok")) {
								var addParams = {userId: addInfo.userId, typeId: Config.ModifyCommonUser.ADD, patientID: addInfo.patientID, 
									patientName: addInfo.patientName, patientPhoneNum: addInfo.patientPhoneNum, verifyCode: $code.val()};
								addInfo.guarderIdNo && (addParams.guarderIdNo = addInfo.guarderIdNo);
								!bOnAddAjax && (bOnAddAjax = $.ajax({
									url : Config.GetDataURL,
									type: "get",
									data : {mName:"modifyCommonlyUser", pContent: JSON.stringify(addParams)},
									beforeSend: function() {
										$add.addClass("submiting").text("添加中...");
									},
									complete : function(data) {
										bOnAddAjax = null;
										$add.removeClass("submiting").text("确认提交");
										var dataText = data.responseText ? data.responseText.trim() : "";
										if (dataText === "" || Config.rhtml.test(dataText)) {
											alert(Config.NET_ERROR);
										} else {
											var jsonData = JSON.parse(dataText);
											if (jsonData.rspCode !== "1") {
												// 添加失败
												$alert.alert(jsonData.rspMsg, true);
											} else {
												// 更新页面
												$alert.alert("添加成功", false, function() {
													location.href = "my_visitors";
												});
											}
										}
									}
								}));
							} else {
								$valid.open("", validateCode($code.val()).msg);
							}
						})
					} else {
						$page = $(".page.add").show();
						var $inputs = $page.find(".add-input"),
							verify = {};
						$inputs.on("focusout", function(event) {
							var $this = $(this),
								checkFunc = check[$this.attr("check")];
							$this.toggleClass("ok", checkFunc ? checkFunc.call(check, $this.val()) : false);
						});
						var $guarderInfo = $(".guarder-info"),
							$inputGuarderId = $(".input-guarderId"),
							$alert = $(".alert-window");
						$inputGuarderId.on("focusout", function(event) {
							var retInfo = check.guarderIdnum($inputGuarderId.val(), true);
							!retInfo.flag && $alert.alert(retInfo.msg, true);
							$inputGuarderId.toggleClass("right", retInfo.flag);
						});
						$guarderInfo.bindTouchHandler({
							".alert": function(event) {
								if (!$(event.target).is(".input-guarderId")) {
									event.preventDefault();
									$inputGuarderId.blur();
								}
							},
							".cancel" : function(event) {
								event.preventDefault();
								$guarderInfo.close();
							},
							".submit" : function(event) {
								event.preventDefault();
								$inputGuarderId.blur();
								var bOk = $inputGuarderId.is(".right");
								if (bOk) {
									verify.guarderIdNo = $inputGuarderId.val();
									$guarderInfo.close();
									param.val({
										verify: JSON.stringify(verify)
									});
								}
							}
						});
						$(".add-next").on("touchend", function(event) {
							$inputs.blur();
							var canSubmit = $(".add-input.ok").length === $inputs.length;
							if (canSubmit) {
								verify = {
									userId: idnum, 
									patientID: $(".add-input.input-idnum").val(), 
									patientName: $(".add-input.input-name").val(), 
									patientPhoneNum: $(".add-input.input-phone").val()
								};
								if (!check.isAdult(verify.patientID)) {
									$guarderInfo.open();
								} else {
									param.val({
										verify: JSON.stringify(verify)
									});
								}
							} else {
								var $warn = $inputs.filter(function() {
										return !$(this).is(".ok");
									}).first(),
									checkFunc = check[$warn.attr("check")],
									retInfo = checkFunc ? checkFunc.call(check, $warn.val(), true) : "";
								$valid.open("", retInfo.msg);
							}
						});
					}
				} else if (mode == "edit") {
					document.title = "编辑就诊人";
					$page = $(".page.edit").show();
					var visitorInfo = JSON.parse(param.val("visitorInfo"));
					$page.find(".input-name").val(visitorInfo.patientName)
						.end().find(".input-old-phone").val(visitorInfo.patientPhoneNum);
					var bOnEditAjax = null,
						$edit = $(".edit-submit"),
						$editPhone = $(".input-new-phone"),
						editParams = {userId : idnum, typeId : Config.ModifyCommonUser.UPDATE};
					$editPhone.on("focusout", function(event) {
						$editPhone.toggleClass("ok", check.phone($editPhone.val()));
					});
					$edit.on("touchend", function(event) {
						$editPhone.blur();
						// 验证用户输入是否正确，符合格式
						var canSubmit = $editPhone.is(".ok");
						if (canSubmit) {
							editParams.patientPhoneNum = $editPhone.val();
							editParams.patientID = visitorInfo.patientID;
							editParams.patientName = visitorInfo.patientName;
							if (!bOnEditAjax) {
								bOnEditAjax = $.ajax({
									url : Config.GetDataURL,
									type: "get",
									data : {mName:"modifyCommonlyUser", pContent: JSON.stringify(editParams)},
									beforeSend: function() {
										$edit.addClass("submiting");
										$edit.text("修改中...");
									},
									complete : function(data) {
										bOnEditAjax = null;
										$edit.removeClass("submiting").text("确认修改");
										var dataText = data.responseText ? data.responseText.trim() : "";
										if (dataText === "" || Config.rhtml.test(dataText)) {
											alert(Config.NET_ERROR);
										} else {
											var jsonData = JSON.parse(dataText);
											if (jsonData.rspCode !== "1") {
												// 修改失败
												$alert.alert(jsonData.rspMsg, true);
											} else {
												// 更新页面
												$alert.alert("修改成功", false, function(){
													location.href = "my_visitors";
												});
											}
										}
									}
								});
							}
						} else {
							$valid.open("", check.phone($editPhone.val(), true).msg);
						}
					});
				} else {
					location.href = "my_visitors";
				}
			}
		} else {
			location.href = Config.IS_WX ? Config.getWxAuthPath("sign_in?referrer=my_visitors") : "sign_in?referrer=my_visitors";
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

/***/ },
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
/* 12 */,
/* 13 */
/***/ function(module, exports) {

	/*
	 * $Id: replacer.js,v 1.00.00 2015/11/23 10:10:32 jennis $
	 * 
	 * this script runs in web browser client
	 * replace sensitive information with sign *
	 *
	 *  Licensed under the MIT license.
	 *    http://opensource.org/licenses/mit-license
	 *
	 */
	module.exports = {
		phone: function(str) {
			return str.replace(/(\d{3})(\d*)(\d{4})/, function(match, p1, p2, p3) {
				return [p1, p2.replace(/\d/g, "*"), p3].join("");
			});
		},
		idnum: function(str) {
			var reg = str.length == 18 ? /(\d{6})(\d*)(\d{3}[\dxX])/ : /(\d{6})(\d*)(\d{3})/;
			return str.replace(reg, function(match, p1, p2, p3) {
				return [p1, p2.replace(/\d/g, "*"), p3].join("");
			});
		}
	};

/***/ }
/******/ ]);