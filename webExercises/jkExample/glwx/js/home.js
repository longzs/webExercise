var cookie = require("common-libs/cookie"),
	storage = require("common-libs/storage"),
	base64 = require("common-libs/base64"),
	Config = require("./config");
var uniqueHrefs = document.querySelectorAll(".navi-wrap.unique"),
	userInfo = document.querySelector(".user-info"),
	userSwitch = document.querySelector(".switch-user"),
	i = 0,
	len = uniqueHrefs.length,
	bLogin = !!cookie.get("idnum");
for ( ; i < len ; i++ ) {
	var href = uniqueHrefs[i],
		target = href.getAttribute("data-href");
	href.setAttribute("href", bLogin ? target : (Config.IS_WX ? Config.getWxAuthPath("sign_in?referrer=" + target) : "sign_in?referrer=" + target));
}
if (bLogin) {
	document.querySelector(".value.name").innerHTML = decodeURIComponent(base64.decode(cookie.get("name")));
	userInfo.style.display = "block";
}
userSwitch.addEventListener("touchend", function(event) {
	event.preventDefault();
	cookie.removeAll();
	storage.remove(Config.app);
	location.href = Config.IS_WX ? Config.getWxAuthPath("sign_in") : "sign_in";
}, false);