// jQuery扩展
$.fn.extend({
	tap : function(call) {
		$(this).each(function() {
			var $this = $(this),
				startX, endX,
				startY, endY;
			$this.on("touchstart",function(event) {
				var touch = event.originalEvent.touches[0];
				startX = touch.pageX;
				startY = touch.pageY;
			});
			$this.on("touchend",function(event) {
				event = event.originalEvent;
				var touch = event.changedTouches[0];
				endX = touch.pageX;
				endY = touch.pageY;
				if ((Math.abs(endX - startX) < 6) && (Math.abs(endY - startY) < 6) ) {
					call(event, this);
				}
			})
		});
	},
	alert : function(text, bError, complete) {
		var $this = $(this);
		$this.find(".alert-window-info").text(text);
		bError && $this.addClass("failed");
		$this.fadeIn(250);
		setTimeout(function() {
			$this.fadeOut(250, function() {
				complete && complete();
				$this.removeClass("failed");
			});
		}, 2000);
	}/*,
	close : function(callback) {
		var $this = $(this);
		$this.children(".alert").hide() && $this.children(".alert-layer").hide() && $this.hide();
		typeof callback === "function" && callback();
		return $this;
	},
	open : function(title, desc, callback) {
		var $this = $(this);
		title && $this.find(".alert-title").text(title);
		desc && $this.find(".alert-desc").text(desc);
		$this.show() && $this.children(".alert-layer").show() && $this.children(".alert").show();
		typeof callback === "function" && callback();
		return $this;
	},
	bindTouchHandler : function(selector, handler, cb) {
		var $this = $(this);
		if (typeof selector === "object") {
			for (var s in selector) {
				var hd = selector[s];
				$this.find(s).on("touchend", hd);
			}
		} else if (typeof selector === "string") {
			$this.find(selector).on("touchend", handler);
		} else {
			return $this;
		}
		return $this;
	}*/
});
// String类方法扩展
var rnum = /^[0-9]*$/;
$.extend(String.prototype, {
	toDate : function (delim) {
		// transform date format string to Date
		// only support Date with format yyyymmdd
		var tmp;
		if (rnum.test(this)) {
			tmp = new Date();
			tmp.setDate(this.substring(6, 8));
			tmp.setMonth(parseInt(this.substring(4, 6)) - 1);
			tmp.setFullYear(this.substring(0, 4));
		} else {
			if (!delim) {
				var rdelim = /[-\/\\]/g, delims = this.match(rdelim);
				delims && (delim = delims[0]);
			}
			if (delim) {
				tmp = new Date()
				var ymd = this.split(delim);
				tmp.setDate(ymd[2]);
				tmp.setMonth(parseInt(ymd[1]) - 1);
				tmp.setFullYear(ymd[0]);
			}
		}
		return tmp;
	}/*,
	isIdnum : function() {
		var len = this.length;
		if(len == 15 || len == 18) {
			for (var i = 0 ; i < len - 1; i++) {
				var charCode = this[i].charCodeAt(0);
				if (charCode < 48 || charCode > 57) {
					return false;
				}
			}
			var lastCharCode = this[len - 1].charCodeAt(0);
			if ((lastCharCode < 48 || lastCharCode > 57) && !(lastCharCode == 88 || lastCharCode == 120)) {
				return false;
			}
		} else {
			return false;
		}
		return true;
	},
	isAdult : function () {
		var birth = this.substr(6, 8),
			birthYear = parseInt(birth.substr(0, 4)),
			birthMonth = parseInt(birth.substr(4, 2)),
			birthDate = parseInt(birth.substr(6, 2)),
			adultDate = new Date();
		adultDate.setDate(birthDate);
		adultDate.setMonth(birthMonth - 1);
		adultDate.setFullYear(birthYear + 18);
		return (new Date()).getTime() > adultDate.getTime();
	},
	isPinyin : function() {
		var i = 0,
			len = this.length,
			charCode;
		for ( i ; i < len; i++ ) {
			charCode = this[i].charCodeAt(0);
			if (charCode < 65 || charCode > 122) {
				return false;
			}
		}
		return true;
	},
	slicePara : function(maxLength) {
		var endIndex = this.indexOf("。"),
			maxSearch = Config.MAX_SEARCH_TIMES;
		maxLength = maxLength || Config.DEFAULT_MAX_INTRO_LENGTH;
		if (endIndex !== -1) {
			while (endIndex > maxLength && maxSearch--) {
				var commaIndex = this.substring(0, endIndex).lastIndexOf("，");
				endIndex = commaIndex !== -1 ? commaIndex : maxLength;
			}
		} else {
			endIndex = maxLength;
		}
		return this.substring(0, endIndex);
	},
	startsWith : function(str) {
		return this.indexOf(str) === 0;
	}*/
});
// Date类方法扩展
$.extend(Date.prototype, {
	format : function(format) {
		var year = this.getFullYear(),
			month = this.getMonth() + 1,
			date = this.getDate(),
			defaultFormat = format;
		format.indexOf("yyyy") != -1 && (format = format.replace("yyyy", year));
		format.indexOf("mm") != -1 && (format = format.replace("mm", month < 10 ? "0" + month : month));
		format.indexOf("dd") != -1 && (format = format.replace("dd", date < 10 ? "0" + date : date));
		return format == defaultFormat ? this : format;
	},
	isSameDayWith: function(b) {
		if (!b) {
			return false;
		}
		return this.getDate() === b.getDate() && this.getMonth() === b.getMonth() && this.getFullYear() === b.getFullYear();
	}
});
// 通常处理
// 按钮交互处理
/*var $btnOnClick = null;
$(".button").on("touchstart", function(event) {
	$(this).addClass("clicking");
	$btnOnClick = $(this);
});
$(".button").on("touchmove touchend", function(event) {
	if ($btnOnClick) {
		$btnOnClick.removeClass("clicking");
		$btnOnClick = null
	}
});*/
// 图裂处理
$(".doc-img").on("error", function(event) {
	$(this).attr("src", Config.DEFAULT_DOC_IMG_SRC);
});
// cookie操作
function addCookie(name,value,expireDays) {
	var cookieStr = name + "=" + decodeURIComponent(value);
	if(expireDays > 0) {
		var date = new Date();
		date.setTime(date.getTime() + expireDays * 24 * 60 * 60 * 1000);
		cookieStr = cookieStr + ";expires=" + date.toGMTString();
	}
	document.cookie = cookieStr;
}
function getCookie(name) {
	var cookieString = document.cookie,
		cookies = cookieString.split(";"),
		find = "";
	for (var i = 0 ; i < cookies.length; i++) {
		var cookie = cookies[i],
		splitedCookie = cookie.split("=");
		if (splitedCookie[0].trim() === name) {
			find = splitedCookie[1];
			break;
		}
	}
	return find;
}
function deleteCookie(name) {
	var date = new Date();
	date.setTime(date.getTime() - 9999);
	document.cookie = name + "=invalid;expires=" + date.toGMTString();
}
function deleteCookieAll() {
	var cookieStr = document.cookie,
		cookies = cookieStr.split(";"),
		i = 0,
		len = cookies.length,
		cookieName;
	for( i ; i < len ; i++ ) {
		cookieName = cookies[i].split("=")[0].trim();
		deleteCookie(cookieName);
	}
}
/*
 * 从传参中获取值
 */
function getParamValue(name) {
	var search = decodeURIComponent(location.search),
		value = "";
	if (search != "") {
		var paramsStr = search.substring(1),
			paramPairs = paramsStr.split("&");
		for (var i = 0 ; i < paramPairs.length ; i++) {
			var paramPair = paramPairs[i],
				pair = paramPair.split("=");
			if (pair[0] == name) {
				value = pair[1];
				break;
			}
		}
	}
	return value;
}
function addParam(name, value) {
	var search = decodeURIComponent(location.search);
	if (!search) {
		search = "?" + name + "=" + value;
	} else {
		var paramsStr = search.substring(1),
			paramPairs = paramsStr.split("&"),
			bExists = false;
		for (var i = 0 ; i < paramPairs.length ; i++) {
			var paramPair = paramPairs[i],
				pair = paramPair.split("=");
			if (pair[0] == name) {
				bExists = true;
				pair[1] = value;
				paramPairs[i] = pair.join("=");
				break;
			}
		}
		if (bExists) {
			search = "?" + paramPairs.join("&");
		} else {
			search += ("&" + name + "=" + value);
		}
	}
	location.search = "?" + encodeURIComponent(search.substring(1));
}
//验证表单方法
/*function checkName(name) {
	return /^[\u4e00-\u9fa5]{2,}$/.test(name);
}
function checkPhone(phone) {
	return /^\d{11}$/.test(phone);
}
function checkIdnum(idnum) {
	var result = true,
		Wi = [7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2],
		verifyCharcode = [1,0,'x',9,8,7,6,5,4,3,2],
		nums = [],
		S = 0;
	if (idnum.length != 18) {
		result = false;
	} else {
		var i = 0;
		for (i ; i < 17; i++) {
			nums[i] = parseInt(idnum[i]);
			S += Wi[i] * nums[i];
		}
		var verifyCode = S % 11;
		if (idnum[17] != verifyCharcode[verifyCode]) {
			if (verifyCode == 2) {
				result = (idnum[17] + "").toLowerCase() == verifyCharcode[verifyCode];
			} else {
				result = false;
			}
		}
	}
	return result;
}
function checkPassword(password) {
	return password.length >= 6 && password.length <= 30;
}
function checkConfirm(password, confirm){
	return password == confirm;
}
function validatePhone(phone) {
	var retInfo = {
		flag : false,
		msg : ""
	};
	if (phone === "") {
		retInfo.msg = "手机号不得为空！";
	} else if (!checkPhone(phone)) {
		retInfo.msg = "请输入有效手机号！"
	} else {
		retInfo.flag = true;
	}
	return retInfo;
}
function validateName(name) {
	var retInfo = {
		flag : false,
		msg : ""
	};
	if (name === "") {
		retInfo.msg = "姓名不得为空！";
	} else if (!checkName(name)) {
		retInfo.msg = "请输入有效中文名！"
	} else {
		retInfo.flag = true;
	}
	return retInfo;
}
function validateIdnum(idnum) {
	var retInfo = {
		flag : false,
		msg : ""
	};
	if (idnum === "") {
		retInfo.msg = "身份证不得为空！";
	} else if (!checkIdnum(idnum)) {
		retInfo.msg = "请输入有效身份证号码！"
	} else {
		retInfo.flag = true;
	}
	return retInfo;
}
function validatePassword(password) {
	var retInfo = {
		flag : false,
		msg : ""
	};
	if (password === "") {
		retInfo.msg = "密码不得为空！";
	} else if (!checkPassword(password)) {
		retInfo.msg = "密码长度应为6-30！"
	} else {
		retInfo.flag = true;
	}
	return retInfo;
}
function validateAccount(account) {
	var retInfo = {
		flag : false,
		msg : ""
	};
	if (account === "") {
		retInfo.msg = "账号不得为空！";
	} else {
		retInfo.flag = true;
	}
	return retInfo;
}
function validateCode(code) {
	var retInfo = {
		flag : false,
		msg : ""
	};
	if (code === "") {
		retInfo.msg = "短信验证码不得为空！";
	} else {
		retInfo.flag = true;
	}
	return retInfo;
}
function validateConfirm(password, confirm) {
	var retInfo = {
		flag : false,
		msg : ""
	};
	if (confirm === "") {
		retInfo.msg = "请再次输入登陆密码！";
	} else if (!checkConfirm(password, confirm)) {
		retInfo.msg = "第二次输入的登陆密码同第一次不一致！"
	} else {
		retInfo.flag = true;
	}
	return retInfo;
}
function validateGuarderIdnum(idnum) {
	var retInfo = {
		flag : false,
		msg : ""
	};
	if (idnum === "") {
		retInfo.msg = "监护人身份证不得为空！";
	} else if (!(checkIdnum(idnum) && idnum.isAdult())) {
		retInfo.msg = "请输入有效监护人身份证号码！"
	} else {
		retInfo.flag = true;
	}
	return retInfo;
}*/
