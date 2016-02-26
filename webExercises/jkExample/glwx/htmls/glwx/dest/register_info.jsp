<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
		<meta name="format-detection" content="telephone=no">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<title>订单详情</title>
		<link rel="stylesheet" type="text/css" href="/assets/glwx/dest/css/register_info.77618e21bbbf6e321509.css" />
	</head>
	<body>
		<div class="order-detail">
			<div class="detail-wrap state-wrap">
				<span class="btn btn-inline cancel-btn">退约</span>
				<span class="btn btn-inline reserve-btn">再次预约</span>
				<span class="day-left"><span class="left-days"></span></span>
				<span class="no-left">今日就诊</span>
				<span class="visit-state"></span>
			</div>
			<div class="detail-wrap visitor-wrap">
				<div class="wrap">
					<span class="label">就诊人</span>
					<span class="value visitor"></span>
				</div>
				<div class="wrap">
					<span class="label">手机号</span>
					<span class="value phone"></span>
				</div>
				<div class="wrap">
					<span class="label">身份证</span>
					<span class="value idnum"></span>
				</div>
			</div>
			<div class="detail-wrap visit-wrap">
				<div class="info-wrap">
					<div class="wrap">
						<span class="label">就诊科室</span>
						<span class="value dep-name"></span>
					</div>
					<div class="wrap">
						<span class="label">就诊医生</span>
						<span class="value doc-name"></span>
					</div>
					<div class="wrap">
						<span class="label">就诊时间</span>
						<span class="value visit-time"></span>
					</div>
					<div class="wrap">
						<span class="label">就诊地点</span>
						<span class="value location"></span>
					</div>
					<div class="wrap register-unique">
						<span class="label">就诊序号</span>
						<span class="value order-no"></span>
					</div>
					<div class="wrap">
						<span class="label">挂号费</span>
						<span class="value charge"></span>
					</div>
				</div>
				<div class="btn btn-inline pay-btn">支付</div>
			</div>
			<div class="detail-wrap reserve-info reserve-unique">
				<div class="wrap">
					<span class="label">取号地点</span>
					<span class="value">自助机或人工窗口</span>
				</div>
				<div class="wrap">
					<span class="label">验证码</span>
					<span class="value verify-code"></span>
				</div>
			</div>
			<div class="detail-wrap order-info">
				<div class="wrap">
					<span class="label">订单状态</span>
					<span class="value order-state"></span>
				</div>
				<div class="wrap">
					<span class="label">支付状态</span>
					<span class="value pay-state">未支付</span>
				</div>
			</div>
		</div>
		<div class="alert-wrap cancel-prompt">
			<div class="alert">
				<div class="alert-info">
					<span class="alert-label">您确定要取消本次预约吗？</span>
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
					<span class="alert-label"></span>
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
		<div class="loading common blocked cancel-loading">
			<img class="loading-pic" src="/assets/glwx/img/common_loading.gif">
			<span class="loading-text">退约中</span>
		</div>
		<div class="locator alert-window">
			<div class="alert-window-info"></div>
		</div>
		
		<script src="/assets/glwx/js/jquery.js"></script>
		<script type="text/javascript" src="/assets/glwx/dest/js/register_info.71b9740bebf96a46c462.bundle.js"></script>
	</body>
	<script>var _hmt=_hmt||[];(function(){var b=document.createElement("script");b.async=true;b.src="//hm.baidu.com/hm.js?d48bdb1c51213734128364f834aa30c4";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(b,a)})();</script>
</html>