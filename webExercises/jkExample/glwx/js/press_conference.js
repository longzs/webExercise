var Config = require("./config");
$(function() {
	// 加载轮播图
	$.ajax({
		url : "/support/get_info",
		type: "get",
		data : {
			actionType:"cmsInfoFacade",
			actionCode: "getCmsInfoDetail",
			infoId: "1480"
		},
		complete : function(data) {
			var dataText = data.responseText ? data.responseText.trim() : "";
			if (dataText === "" || Config.rhtml.test(dataText)) {
				// alert(Config.NET_ERROR);
			} else {
				var jsonData = JSON.parse(dataText);
				if (jsonData.respCode !== "1") {
					// $alert.alert(jsonData.rspMsg, true);
				} else {
					var info = JSON.parse(jsonData.data),
						shareImgSrc = "";
					var ct = info.content;
					ct = ct.replace(/&lt;/g, "<");
					ct = ct.replace(/&gt;/g, ">");
					ct = ct.replace(/&quot;/g, '"');
					ct = ct.replace(/&nbsp;/g, ' ');
					var images = ct.match(/<img.*?>/g);
					if (images) {
						var i = 0,
							len = images.length,
							$itemsWrap = $(".carousel-items"),
							$footer = $(".carousel-footer");
						for ( ; i < len ; i++ ) {
							var image = images[i],
								image = image.replace(/src="([\w\W]*?)"/, 'src="http://cms.jiankang51.cn$1"'),
								$image = $(image);
							if (!i) {
								shareImgSrc = $image.prop("src");
								$(".item.active").prop("src", shareImgSrc);
								$footer.text($image.attr("data-title"));
								continue;
							}
							$image.addClass("item").appendTo($itemsWrap);
						}
						if (len > 1) {
							// 满足轮播条件
							var $items = $(".item"),
								currIndex = 0;
							setInterval(function() {
								$items.eq(currIndex).removeClass("active");
								currIndex = (currIndex + 1) % len;
								var $curr = $items.eq(currIndex).addClass("active");
								$footer.text($curr.attr("data-title"));
							}, 5000);
						}
					}
				}
			}
		}
	});
	var $tabViews = $(".tab-view");
	$(".tab").on("touchend", function(event) {
		var $this = $(this);
		if (!$this.is(".selected")) {
			$(".tab.selected").removeClass("selected");
			$this.addClass("selected");
			var currIndex = $this.index();
			$tabViews.each(function(i, value) {
				$(this).toggleClass("active", i === currIndex);
			});
		}
	})
});