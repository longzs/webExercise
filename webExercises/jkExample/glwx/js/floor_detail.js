var param = require("common-libs/param"),
	Config = require("./config");
if (floorId = param.val("floorId")) {
	document.title += ("-" + floorId);
	var floor = document.getElementById(floorId);
	if (floor) {
		floor.style.display = "block";
	}
}