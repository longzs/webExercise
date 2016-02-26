var cookie = require("common-libs/cookie"),
	base64 = require("common-libs/base64"),
	param = require("common-libs/param"),
	Config = require("./config");
require("common-libs/dateUtils");
// load jQuery extensions
require("common-libs/jquery.tap");
require("common-libs/jquery.alert");
$(function() {
	var transData = param.val("transData"),
		oTransData = transData ? JSON.parse(transData) : {},
		$cardWrap = $(".card-wrap"),
		$alert = $(".alert-window");
	oTransData.imgURL && $(".doc-img").on("error", function(event) {
		$(this).attr("src", Config.DEFAULT_DOC_IMG_SRC);
	}).attr("src", oTransData.imgURL);
	var seeTime = oTransData.seeTime,
		visitTime =  seeTime.length == 1 ? Config.SeeTimeStrings[parseInt(seeTime) - 1] : seeTime;
	$(".time").text(oTransData.clinicDate + " " + Config.Weekdays[oTransData.clinicDate.toDate().getDay()] + " " + visitTime);
	$(".doc-name").text(oTransData.expertName);
	$(".dep-name").text(oTransData.depName);
	$(".hos-name").text(oTransData.hspName);
	$(".charge").text(oTransData.totalFee);
	$(".need-to-know").on("touchend", function(event){
		location.href = "need_to_know";
	});
	var cookieIdnum = base64.decode(cookie.get("idnum"));
	// 切换常用就诊人
	var $reserveLayer = $(".overlayer"),
		$commonLoading = $(".loading.visitor-loading"),
		usersParams = {userID : cookieIdnum},
		bVisitorLoaded = false,
		visitorLen = 0;
	$(".edit-patient").on("touchend", function(event) {
		location.href = "my_visitors";
	});
	$(".patient").tap(function(event, target) {
		var $patient = $(target);
		$(".patient.selected").removeClass("selected");
		$patient.addClass("selected");
		cookie.add("select_p_index", $patient.index(), {expires: 1 / 24 / 60 * 5});
		// 查询新就诊卡
		oTransData.bRegister && cardInitial();
	});
	if (cookieIdnum) {
		$.ajax({
			url : Config.GetDataURL,
			type: "get",
			data : {mName:"searchCommonlyUsers", pContent: JSON.stringify(usersParams)},
			beforeSend: function() {
				$commonLoading.show();
			},
			complete : function(data) {
				// 如果是预约，则提前结束查询
				!oTransData.bRegister && $commonLoading.hide();
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
								return val.patientID === cookieIdnum;
							}),
							$visitorTmpl = $(".patient.template"),
							$pureVisitorTmpl = $visitorTmpl.clone(true).removeClass("template");
						!userSelf.length && visitors.unshift({
							userId : cookieIdnum,
							patientName : decodeURIComponent(base64.decode(cookie.get("name"))),
							patientID : cookieIdnum,
							patientPhoneNum : decodeURIComponent(base64.decode(cookie.get("phone")))
						})
						var i = 0,
							len = visitors.length;
						for ( ; i < len ; i++ ) {
							var visitor = visitors[i],
								$visitor = $pureVisitorTmpl.clone(true);
							// 今日取号的情况
							if (oTransData.typeId === Config.RegisterType.FETCH && oTransData.idNo !== visitor.patientID) {
								continue;
							}
							$visitor.find(".patient-name").text(visitor.patientName)
								.end().data("visitorInfo", visitor).insertBefore($visitorTmpl);
						}
						$(".patient").eq(cookie.get("select_p_index") || 0).addClass("selected");
						bVisitorLoaded = true;
						visitorLen = len;
						oTransData.bRegister && cardInitial(true);
					}
				}
			}
		});
	}
	// 选择卡号
	if (oTransData.bRegister) {
		$(".register-unique").show();
		var $cardsWindow = $(".cards-window"),
			$noCard = $(".no-card"),
			$cardInfo = $(".card-info"),
			$cardContent = $(".card-content"),
			$prompt = $(".alert-wrap.prompt"),
			$unsupported = $(".alert-wrap.unsupported"),
			cardAjax = null,
			bCardsSearched = false,
			cardsParams = {searchPath : "3", hospitalCode: Config.HSPCODE};
		$prompt.bindTouchHandler({
			".confirm": function(event) {
				event.preventDefault();
				$prompt.close();
			}
		});
		$unsupported.bindTouchHandler({
			".confirm": function(event) {
				event.preventDefault();
				$unsupported.close();
			}
		});
		$(".card-content").tap(function(event, target) {
			!$(target).is(".disabled") && bCardsSearched && $cardsWindow.show();
		});
		$cardsWindow.bindTouchHandler({
			".layer, .cancel": function(event) {
				event.preventDefault();
				$cardsWindow.hide();
			},
			".confirm": function(event) {
				event.preventDefault();
				var $card = $(".card.selected");
				if ($card.length) {
					var cardInfo = $card.data("cardInfo");
					$cardInfo.data("cardInfo", cardInfo)
						.children(".card-type").text(cardInfo.cardName)
						.end().children(".card-no").text(cardInfo.cardNo);
				}
				$cardsWindow.hide();
			}
		});
		$(".card").tap(function(event, target) {
			event.preventDefault();
			$(".card.selected").removeClass("selected");
			$(target).addClass("selected");
		});
		function cardInitial(init) {
			bCardsSearched = false;
			cardAjax && cardAjax.abort();
			cardsParams.userId = $(".patient.selected").data("visitorInfo").patientID;
			cardAjax = $.ajax({
				url : Config.GetDataURL,
				type: "get",
				data : {mName:"searchCardNo", pContent: JSON.stringify(cardsParams)},
				beforeSend: function() {
					!init && $commonLoading.show();
					if (!init) {
						$cardContent.addClass("disabled");
						// 重置卡信息
						// 清空卡
						$(".card").not(".template").remove();
						$cardInfo.children(".card-type").text("")
							.end().children(".card-no").text("")
							.end().data("cardInfo", null);
						// 重置选择状态
						$noCard.hide();
						$(".select-card").show();
					}
				},
				complete : function(data, textStatus) {
					cardAjax = null;
					bCardsSearched = true;
					$commonLoading.hide();
					var dataText = data.responseText ? data.responseText.trim() : "";
					if (dataText === "" || Config.rhtml.test(dataText)) {
						if (textStatus !== "abort") {
							alert(Config.NET_ERROR);
						}
					} else {
						var jsonData = JSON.parse(dataText);
						if (jsonData.rspCode !== "1") {
							$noCard.add($(".warning")).show();
							$prompt.open();
						} else {
							var cards = jsonData.rspData.body,
								i = 0,
								validCards = [],
								len = cards.length;
							$cardContent.toggleClass("disabled", !len);
							$(".warning").toggle(!len);
							if (len) {
								var $cardTmpl = $(".card.template"),
									$pureCardTmpl = $cardTmpl.clone(true).removeClass("template");
								for ( ; i < len ; i++ ) {
									var card = cards[i],
										$card = $pureCardTmpl.clone(true);
									if (+card.siFlag) {
										continue;
									}
									!validCards.length && $card.addClass("selected");
									// guarderIdNo
									$card.find(".card-no").text(card.cardNo)
										.end().data("cardInfo", card).insertBefore($cardTmpl);
									validCards.push(card);
								}
								if (validCards.length) {
									$(".select-card").hide();
									$(".card-type").text(validCards[0].cardName);
									$cardInfo.find(".card-no").text(validCards[0].cardNo)
										.end().data("cardInfo", validCards[0]);
								}
							} else {
								$prompt.open();
							}
						}
					}
				}
			});
		};
	}
	$(".reserve-btn").tap(function(event, target) {
		if (!bVisitorLoaded || (oTransData.bRegister && cardAjax)) {
			return;
		}
		var $this = $(target),
			visitorInfo = $(".patient.selected").data("visitorInfo"),
			idnum = visitorInfo.patientID,
			name = visitorInfo.patientName,
			orderParams = {
				hospitalCode: oTransData.hspCode,
				userId: idnum,
				scheduFlow: oTransData.scheduFlow,
				oprUserId: cookieIdnum,
				sectionId: oTransData.sectionId,
				typeId: oTransData.typeId,
				reservationFrom: oTransData.reservationFrom
			};
		if (oTransData.bRegister) {
			// 挂号处理
			cardInfo = $cardInfo.data("cardInfo");
			if (cardInfo) {
				if (+cardInfo.siFlag) {
					$unsupported.open();
				} else {
					orderParams.cardNo = cardInfo.cardNo;
					orderParams.cardNoType = cardInfo.cardNoType;
					location.href = "register_result?transData=" + encodeURIComponent(JSON.stringify(orderParams));
				}
			} else {
				$prompt.open();
			}
		} else {
			orderParams.seeTime = oTransData.seeTime;
			location.href = "reserve_result?transData=" + encodeURIComponent(JSON.stringify(orderParams));
		}
	});
});