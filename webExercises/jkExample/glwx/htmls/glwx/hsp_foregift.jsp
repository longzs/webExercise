<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no">
		<meta name="format-detection" content="telephone=no">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<title>预交金</title>
		<!--workflow:start-->
		<link rel="stylesheet" href="/assets/glwx/css/hsp_foregift.css">
		<!--workflow:end-->
	</head>
	<body>
		<section class="wrapper">
			<nav class="navbar" data-title="预交金">
				<div id="back"></div>
			</nav>
			<section class="user-info">
				<div class="info">
					<span class="label">就诊人</span>
					<span class="value">
						<span class="name"></span>
						<span class="area"></span>
					</span>
				</div>
				<div class="info">
					<span class="label">住院时间</span>					
					<span class="value time"></span>
				</div>
				<div class="btn btn-inline switch-user">切换</div>
			</section>
			<section class="info-wrap">
				<section>
					<header>缴纳信息</header>
					<ul class="items">
						<li class="item">
							<span class="title">住院号</span>
							<span class="value code"></span>
						</li>
						<li class="item">
							<span class="title">缴纳金额</span>
							<span class="value charged"></span>
						</li>
					</ul>
				</section>
				<section>
					<header>账户详情</header>
					<table class="charge-info">
						<thead>
							<tr>
								<th>时间</th>
								<th>金额</th>
								<th>备注</th>
							</tr>
						</thead>
						<tbody>
							<tr class="charge template">
								<td class="charge-time"></td>
								<td class="charge-amt"></td>
								<td class="charge-remark"></td>
							</tr>
						</tbody>
					</table>
				</section>
			</section>
			<footer>
			</footer>
			<aside>
				<div class="locator alert-window">
					<div class="alert-window-info"></div>
				</div>
				<div class="loading common">
					<img class="loading-pic" src="/assets/glwx/img/common_loading.gif">
					<span class="loading-text">加载中</span>
				</div>
			</aside>
		</section>
		
		<script src="/assets/glwx/js/jquery.js"></script>
		<!--workflow:start-->
		<script src="/assets/glwx/js/bundle/hsp_foregift.bundle.js"></script>
		<!--workflow:end-->
	</body>
	<!--insert:statistics-->
</html>