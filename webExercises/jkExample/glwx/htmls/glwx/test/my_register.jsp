<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no">
		<meta name="format-detection" content="telephone=no">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<title>我的挂号</title>
		<link rel="stylesheet" type="text/css" href="/assets/glwx/test/css/my_register.aeef58ce1ad1b1dcad45.css" />
	</head>
	<body>
		<div class="orders">
			<div class="order template">
				<div class="state">
					<span class="btn btn-inline cancel-btn">退约</span>
					<span class="btn btn-inline reserve-btn">再次预约</span>
					<span class="day-left"><span class="left-days"></span></span>
					<span class="no-left">今日就诊</span>
					<span class="visit-state"></span>
				</div>
				<div class="detail">
					<div class="info-wrap">
						<div class="wrap">
							<span class="label">医生</span>
							<span class="value doc-name"></span>
						</div>
						<div class="wrap">
							<span class="label">科室</span>
							<span class="value dep-name"></span>
						</div>
						<div class="wrap">
							<span class="label">就诊时间</span>
							<span class="value visit-time"></span>
						</div>
						<div class="wrap reserve-unique">
							<span class="label">验证码</span>
							<span class="value verify-code"></span>
						</div>
						<div class="wrap register-unique">
							<span class="label">就诊序号</span>
							<span class="value order-no"></span>
						</div>
						<div class="wrap">
							<span class="label">就诊人</span>
							<span class="value visitor-name"></span>
						</div>
						<div class="wrap">
							<span class="label">挂号费</span>
							<span class="value charge"></span>
						</div>
					</div>
					<div class="btn btn-inline pay-btn">支付</div>
				</div>
			</div>
		</div>
		<div class="no-result locator">
			<div class="no-wrap">
				<img class="no-img" src="/assets/glwx/img/no_expert.png">
				<span class="no-desc">当前暂无预约挂号记录</span>
			</div>
		</div>
		<div class="alert-wrap cancel-prompt">
			<div class="alert">
				<div class="alert-info">
					<span class="alert-title">您确定要取消本次预约吗？</span>
					<span class="alert-desc"></span>
				</div>
				<div class="alert-ops">
					<div class="alert-op-wrap cancel">
						<div class="alert-op">取消</div>
					</div>
					<div class="alert-op-wrap confirm">
						<div class="alert-op">确定</div>
					</div>
				</div>
			</div>
			<div class="alert-layer"></div>
		</div>
		<div class="alert-wrap cancel-result">
			<div class="alert">
				<div class="alert-info">
					<span class="alert-title"></span>
					<span class="alert-desc">预约取消成功！</span>
				</div>
				<div class="alert-ops">
					<div class="alert-op-wrap confirm">
						<div class="alert-op">确定</div>
					</div>
				</div>
			</div>
			<div class="alert-layer"></div>
		</div>
		<div class="loading record-loading">
			<img class="loading-pic" src="/assets/glwx/img/loading.gif">
			<span class="loading-text">预约挂号记录加载中...</span>
		</div>
		<div class="loading common blocked cancel-loading">
			<img class="loading-pic" src="/assets/glwx/img/common_loading.gif" width="48" height="48">
			<span class="loading-text">退约中</span>
		</div>
		<div class="locator alert-window">
			<div class="alert-window-info"></div>
		</div>
		<div class="sp">南京市卫生信息中心、健康无忧网络科技 共同出品</div>
		<script src="/assets/glwx/js/jquery.js"></script>
		<script type="text/javascript" src="/assets/glwx/test/js/my_register.5f077fe2f092af733363.bundle.js"></script>
	</body>
	
</html>