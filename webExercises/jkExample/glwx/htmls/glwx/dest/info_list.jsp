<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="initial-scale=1.0,maximum-scale=1.0,user-scalable=no" />
		<meta name="apple-mobile-web-app-capable" content="yes">
		<title>资讯列表</title>
		<link rel="stylesheet" type="text/css" href="/assets/glwx/dest/css/info_list.81c6be25688dfaa84f16.css" />
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
		<script type="text/javascript" src="/assets/glwx/dest/js/info_list.953bb6a96d57d009875b.bundle.js"></script>
	</body>
	<script>var _hmt=_hmt||[];(function(){var b=document.createElement("script");b.async=true;b.src="//hm.baidu.com/hm.js?d48bdb1c51213734128364f834aa30c4";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(b,a)})();</script>
</html>