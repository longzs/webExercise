<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<title>停诊通知</title>
		<!--workflow:start-->
		<link rel="stylesheet" href="/assets/glwx/css/activity.css">
		<!--workflow:end-->
	</head>
	<body>
		<div class="info-wrap">
			<ul class="info-list">
				<li class="info template">
					<p class="info-title"></p>
					<p class="info-brief"></p>
				</li>
			</ul>
		</div>
		
		<div class="no-result locator">
			<div class="no-wrap">
				<img class="no-img" src="/assets/glwx/img/no_expert.png">
				<span class="no-desc">当前暂无停诊通知</span>
			</div>
		</div>
		<div class="loading">
			<img class="loading-pic" src="/assets/glwx/img/loading.gif">
			<span class="loading-text">信息详情加载中...</span>
		</div>
		<div class="locator alert-window">
			<div class="alert-window-info"></div>
		</div>
		<script src="/assets/glwx/js/jquery.js"></script>
		<!--workflow:start-->
		<script src="/assets/glwx/js/bundle/stop_inform.bundle.js"></script>
		<!--workflow:end-->
	</body>
	<!--insert:statistics-->
</html>