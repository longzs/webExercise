<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width,initial-scale=1.0">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<title>住院账单</title>
		<!--workflow:start-->
		<link rel="stylesheet" href="/assets/glwx/css/hsp_all_bill.css">
		<!--workflow:end-->
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
		<div class="loading">
			<img class="loading-pic" src="/assets/glwx/img/loading.gif">
			<span class="loading-text">正在加载账单信息...</span>
		</div>
		<div class="locator alert-window">
			<div class="alert-window-info"></div>
		</div>
		<script src="/assets/glwx/js/jquery.js"></script>
		<!--workflow:start-->
		<script src="/assets/glwx/js/bundle/hsp_all_bill.bundle.js"></script>
		<!--workflow:end-->
	</body>
	<!--insert:statistics-->
</html>