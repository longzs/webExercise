var commonConfig = require("common-libs/commonConfig");
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