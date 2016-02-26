<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="initial-scale=1.0,maximum-scale=1.0,user-scalable=no" />
		<meta name="apple-mobile-web-app-capable" content="yes">
		<title>资讯列表</title>
		<!--workflow:start-->
		<link rel="stylesheet" href="/assets/glwx/css/info_list.css" />
		<!--workflow:end-->
	</head>
	<body>
		<div class="list-wrap">
			<div class="navi list-navi nav-fixed-top" data-title="资讯列表">
				<div id="back"></div>
			</div>
			<div class="tabs">
				<div class="tab-wrap template">
					<div class="tab"></div>
				</div>
			</div>
			<div class="template simple_tmpl">
				<div class="info-wrap">
					<ul class="info-list">
						<li class="info template">
							<div class="info-img-wrap">
								<img class="info-img" />
							</div>
							<p class="info-title"></p>
							<p class="info-content"></p>
						</li>
					</ul>
				</div>		
			</div>
			<div class="detail-wrap">
				<div class="navi detail-navi nav-fixed-top" data-title="文章详情">
					<div id="back"></div>
				</div>
				<div class="detail-head">
					<div class="wrap title-wrap">
						<span class="detail-title"></span>
					</div>
					<div class="wrap state-wrap">
						<span class="detail-date"></span>
						<span class="detail-read-nums"></span>
					</div>
				</div>
				<div class="detail-content"></div>
			</div>
		</div>
		<div class="loading common list-loading">
			<img class="loading-pic" src="/assets/glwx/img/common_loading.gif">
			<span class="loading-text">刷新中</span>
		</div>
		<div class="loading detail-loading">
			<img class="loading-pic" src="/assets/glwx/img/loading.gif" />
			<span class="loading-text">资讯加载中...</span>
		</div>
		<div class="locator alert-window">
			<div class="alert-window-info"></div>
		</div>
		<script src="/assets/glwx/js/jquery.js"></script>
		<!--workflow:start-->
		<script src="/assets/glwx/js/bundle/info_list.bundle.js"></script>
		<!--workflow:end-->
	</body>
	<!--insert:statistics-->
</html>