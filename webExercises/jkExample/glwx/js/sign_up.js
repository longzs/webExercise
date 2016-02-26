var check = require("common-libs/formCheck"),
	Config = require("./config");
// load jQuery extensions
require("common-libs/jquery.alert");
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