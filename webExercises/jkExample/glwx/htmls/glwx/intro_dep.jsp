<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<title>科室简介</title>
		<!--workflow:start-->
		<link rel="stylesheet" href="/assets/glwx/css/intro_dep.css">
		<!--workflow:end-->
	</head>
	<body>
		<div class="header">
			<img class="header-img" src="/assets/glwx/img/intro_dep.png" width="25" height="25">
			<span class="dep-name"></span>
		</div>
		<div class="intro">

		</div>
		<div class="loading">
			<img class="loading-pic" src="/assets/glwx/img/loading.gif">
			<span class="loading-text">科室详情加载中...</span>
		</div>
		
		<script src="/assets/glwx/js/jquery.js"></script>
		<!--workflow:start-->
		<script src="/assets/glwx/js/bundle/intro_dep.bundle.js"></script>
		<!--workflow:end-->
	</body>
	<!--insert:statistics-->
</html>