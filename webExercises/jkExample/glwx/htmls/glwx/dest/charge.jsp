<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no">
		<meta name="format-detection" content="telephone=no">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<title>我的缴费</title>
		<link rel="stylesheet" type="text/css" href="/assets/glwx/dest/css/charge.d4f33142b56ae32afc11.css" />
	</head>
	<body>
		<div class="prompt">
			<p class="desc">缴费成功后，三日内可凭自助机打印的凭条换取发票。<span class="known">知道了</span></p>
		</div>
		<div class="tabs">
			<div class="tab tab-wait selected">未缴费</div>
			<div class="tab tab-charged">已缴费</div>
		</div>
		<div class="waits tab-view">
			<div class="charge wait template">
				<div class="container">
					<div class="wrap">
						<span class="title">患者姓名</span>
						<span class="value name"></span>
					</div>
					<div class="wrap">
						<span class="title">门诊时间</span>
						<span class="value time"></span>
					</div>
					<span class="arrow-wrap">
						<span class="arrow"></span>
					</span>
				</div>
				<div class="detail">
					<div class="medicine template">
						<div class="wrap header medi-name"></div>
						<div class="wrap">
							<span class="title">规格</span>
							<span class="value speci"></span>
						</div>
						<div class="wrap">
							<span class="title">单价</span>
							<span class="value unit-price"></span>
						</div>
						<div class="wrap">
							<span class="title">数量</span>
							<span class="value amount"></span>
						</div>
						<div class="wrap">
							<span class="title">价格</span>
							<span class="value price"></span>
						</div>
					</div>
				</div>
				<div class="sum-wrap">
					<span class="total-wrap">
						<span class="total"></span>
						<span class="pay-prompt"><br>请在今日18点之前完成支付</span>
					</span>
					<!-- default disabled if selectable-->
					<span class="btn btn-inline charge-btn">缴费</span>
				</div>
			</div>
			<div class="loading wait-loading">
				<img class="loading-pic" src="/assets/szwx/img/loading.gif">
				<span class="loading-text">正在加载今日缴费信息...</span>
			</div>
			<div class="no-waits locator">
				<div class="no-wrap">
					<img class="no-img" src="/assets/szfwc/img/no_expert.png">
					<span class="no-desc">当前暂无未缴费信息</span>
				</div>
			</div>
		</div>
		<div class="charged tab-view">
			<div class="charge his template">
				<div class="container">
					<div class="wrap">
						<span class="title">患者姓名</span>
						<span class="value name"></span>
					</div>
					<div class="wrap">
						<span class="title">门诊时间</span>
						<span class="value time"></span>
					</div>
					<div class="wrap">
						<span class="title">执行科室</span>
						<span class="value exec-dep"></span>
					</div>
					<span class="arrow-wrap">
						<span class="arrow"></span>
					</span>
				</div>
				<div class="detail">
					<div class="medicine template">
						<div class="wrap header medi-name"></div>
						<div class="wrap">
							<span class="title">规格</span>
							<span class="value speci"></span>
						</div>
						<div class="wrap">
							<span class="title">单价</span>
							<span class="value unit-price"></span>
						</div>
						<div class="wrap">
							<span class="title">数量</span>
							<span class="value amount"></span>
						</div>
						<div class="wrap">
							<span class="title">价格</span>
							<span class="value price"></span>
						</div>
					</div>
				</div>
				<div class="sum-wrap">
					<span class="total-wrap">合计 : ¥<span class="total">0</span></span>
					<span class="charged-state">已缴费</span>
				</div>
			</div>
			<div class="loading his-loading">
				<img class="loading-pic" src="/assets/szwx/img/loading.gif">
				<span class="loading-text">正在加载历史缴费信息...</span>
			</div>
			<div class="no-charged locator">
				<div class="no-wrap">
					<img class="no-img" src="/assets/szfwc/img/no_expert.png">
					<span class="no-desc">当前暂无已缴费信息</span>
				</div>
			</div>
		</div>
		<div class="alert-wrap processing">
			<div class="alert">
				<div class="alert-info">
					<span class="alert-title">提示</span>
					<span class="alert-desc">支付成功，缴费处理中...<br><br>划价单缴费可能存在延时<br>您可以刷新页面查看缴费结果</span>
				</div>
				<div class="alert-ops">
					<div class="alert-op-wrap confirm">
						<div class="alert-op">确定</div>
					</div>
				</div>
			</div>
			<div class="alert-layer"></div>
		</div>
		<div class="overlayer config"></div>
		<div class="loading common blocked request">
			<img class="loading-pic" src="/assets/glwx/img/common_loading.gif" width="48" height="48">
			<span class="loading-text">正在下单</span>
		</div>
		<div class="loading result">
			<img class="loading-pic" src="/assets/glwx/img/loading.gif">
			<span class="loading-text">正在查询缴费结果...</span>
		</div>
		<div class="locator alert-window">
			<div class="alert-window-info"></div>
		</div>
		
		<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
		<script src="/assets/glwx/js/jquery.js"></script>
		<script type="text/javascript" src="/assets/glwx/dest/js/charge.218ffa544941c294e5bc.bundle.js"></script>
	</body>
	<script>var _hmt=_hmt||[];(function(){var b=document.createElement("script");b.async=true;b.src="//hm.baidu.com/hm.js?d48bdb1c51213734128364f834aa30c4";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(b,a)})();</script>
</html>