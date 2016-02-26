<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<title>我的住院</title>
		<link rel="stylesheet" type="text/css" href="/assets/glwx/dest/css/hsp_home.79b656fc9a7c8906c83b.css" />
	</head>
	<body>
		<section class="wrapper">
			<nav class="navbar" data-title="我的住院">
				<div id="back"></div>
			</nav>
			<section>
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
				<section>
					<header>住院服务</header>
					<ul class="navi-list">
						<li class="navi">
							<a class="navi-wrap" data-href="hsp_foregift">
								<img class="navi-icon" src="/assets/glwx/img/hsp_foregift.png">
								<span class="navi-desc">住院预交金</span>
							</a>
						</li>
						<li class="navi">
							<a class="navi-wrap" data-href="hsp_daily_bill">
								<img class="navi-icon" src="/assets/glwx/img/hsp_all_bill.png">
								<span class="navi-desc">每日清单</span>
							</a>
						</li>
					</ul>
				</section>
			</section>
			<footer>
			</footer>
		</section>
		<script src="/assets/glwx/js/jquery.js"></script>
		<script type="text/javascript" src="/assets/glwx/dest/js/hsp_home.0222b16312243d6c4977.bundle.js"></script>
	</body>
</html>