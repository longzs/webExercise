<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
		<meta name="format-detection" content="telephone=no">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<title>选医生</title>
		<link rel="stylesheet" type="text/css" href="/assets/glwx/test/css/doctor_info.3614868df4c57d5ed9a7.css" />
	</head>
	<body>
		<div class="expert-wrap">
			<div class="expert-info">
				<div class="image-wrap">
					<img class="doc-img" src="/assets/glwx/img/doc_default.png">
				</div>
				<div class="info-wrap">
					<span class="wrap">
						<span class="doc-name"></span>
					</span>
					<span class="wrap">
						<span class="dep-name"></span><br>
						<span class="doc-princ"></span>
					</span>
				</div>
			</div>
			<div class="tabs">
				<div class="tab tab-schedule selected">预约挂号</div>
				<div class="tab tab-intro">医生简介</div>
			</div>
		</div>
		<div class="expert-intro-wrap">
			<span class="wrap">
				<span class="title">擅长</span>
				<span class="expert-in"></span>
			</span>
			<span class="wrap">
				<span class="title">简介</span>
				<span class="expert-intro"></span>
			</span>
		</div>
		<div class="schedules-wrap">
			<div class="schedule-wrap template">
				<div class="schedule">
					<span class="time"></span>
					<span class="state"></span>
				</div>
			</div>
		</div>
		<!-- <div class="no-schedules locator">
			<div class="no-wrap">
				<img class="no-img" src="/assets/glwx/img/no_expert.png">
				<span class="no-desc">抱歉，当前暂无可用排班</span>
			</div>
		</div> -->
		<div class="loading">
			<img class="loading-pic" src="/assets/glwx/img/loading.gif" width="48" height="48">
			<span class="loading-text">医生详情加载中...</span>
		</div>
		<div class="locator alert-window">
			<div class="alert-window-info"></div>
		</div>
		<div class="sp">南京市卫生信息中心、健康无忧网络科技 共同出品</div>
		<script src="/assets/glwx/js/jquery.js"></script>
		<script type="text/javascript" src="/assets/glwx/test/js/doctor_info.db4b743eb0fcd2b03dd5.bundle.js"></script>
	</body>
	
</html>