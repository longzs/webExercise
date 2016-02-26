<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width,initial-scale=1.0">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<title>住院账单</title>
		<link rel="stylesheet" type="text/css" href="/assets/glwx/test/css/hsp_all_bill.ca3032026706a4564639.css" />
	</head>
	<body>
		<div class="navigator">
			<div id="back"></div>
		</div>
		<div class="user-info">
			<div class="wrap">
				<span class="title">就诊人</span>
				<span class="value name"></span>
				<span class="value area"></span>
			</div>
			<div class="wrap">
				<span class="title">住院时间</span>					
				<span class="value time"></span>
			</div>
			<div class="btn-inline switch-user">切换</div>
		</div>
		<div class="bill-wrap">
			<div class="wrap head">住院信息</div>
			<div class="patient-wrap">
				<ul class="items">
					<li class="item">
						<span class="title">科室</span>
						<span class="value dep-name"></span>
					</li>
					<li class="item">
						<span class="title">住院号</span>
						<span class="value code"></span>
					</li>
					<li class="item">
						<span class="title">出院时间</span>
						<span class="value leave-time"></span>
					</li>
				</ul>
			</div>
			<div class="wrap head">账单明细<span class="as-of"></span></div>
			<div class="cost-wrap">
				<ul class="items">
					<li class="item">
						<span class="title">预交金</span>
						<span class="value fee-prepayed"></span>
					</li>
					<li class="item">
						<span class="title">已用费用</span>
						<span class="value fee-used"></span>
					</li>
					<li class="item">
						<span class="title">余（欠）款</span>
						<span class="value fee-balance"></span>
					</li>
					<li class="item template">
						<span class="title item-name"></span>
						<span class="value item-sum"></span>
					</li>
				</ul>
			</div>
		</div>
		<div class="sp">以上信息仅供参考<br>南京市卫生信息中心、健康无忧网络科技 共同出品</div>
		<div class="loading">
			<img class="loading-pic" src="/assets/glwx/img/loading.gif">
			<span class="loading-text">正在加载账单信息...</span>
		</div>
		<div class="locator alert-window">
			<div class="alert-window-info"></div>
		</div>
		<script src="/assets/glwx/js/jquery.js"></script>
		<script type="text/javascript" src="/assets/glwx/test/js/hsp_all_bill.1b3937c9e4f99bf6e536.bundle.js"></script>
	</body>
	
</html>