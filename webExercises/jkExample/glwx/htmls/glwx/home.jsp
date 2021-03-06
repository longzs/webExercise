<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<title>南京市鼓楼医院</title>
		<!--workflow:start-->
		<link rel="stylesheet" href="/assets/glwx/css/home.css">
		<!--workflow:end-->
	</head>
	<body>
		<header class="banner">
			<img src="/assets/glwx/img/banner_hsp.png" alt="banner" class="banner-img">
		</header>
		<section>
			<div class="user-info">
				<div class="info">
					<span class="label">就诊人</span>
					<span class="value name"></span>
				</div>
				<div class="btn btn-inline switch-user">切换</div>
			</div>
			<div class="header">门诊服务</div>
			<ul class="navi-list">
				<li class="navi">
					<a class="navi-wrap" href="select_department">
							<img class="navi-icon" src="/assets/glwx/img/navi_reserve.png">
						<span class="navi-desc">预约就诊</span>
					</a>
				</li>
				<li class="navi">
					<a class="navi-wrap" href="select_department?bRegister=1">
							<img class="navi-icon" src="/assets/glwx/img/navi_register.png">
						<span class="navi-desc">今日挂号</span>
					</a>
				</li>
				<li class="navi">
					<a class="navi-wrap unique" href="javascript:void();" data-href="search_report">
							<img class="navi-icon" src="/assets/glwx/img/navi_check.png">
						<span class="navi-desc">检查检验</span>
					</a>
				</li>
				<li class="navi">
					<a class="navi-wrap unique" href="javascript:void();" data-href="my_register">
							<img class="navi-icon" src="/assets/glwx/img/navi_record.png">
						<span class="navi-desc">挂号记录</span>
					</a>
				</li>
				<li class="navi">
					<a class="navi-wrap unique" href="javascript:void();" data-href="my_visitors">
							<img class="navi-icon" src="/assets/glwx/img/navi_visitor.png">
						<span class="navi-desc">常用就诊人</span>
					</a>
				</li>
				<li class="navi">
					<a class="navi-wrap unique" href="javascript:void();" data-href="guidance">
							<img class="navi-icon" src="/assets/glwx/img/navi_guidance.png">
						<span class="navi-desc">智能导诊</span>
					</a>
				</li>
			</ul>
		</section>
		<footer>
			
		</footer>
		<!--workflow:start-->
		<script src="/assets/glwx/js/bundle/home.bundle.js"></script>
		<!--workflow:end-->
	</body>
	<!--insert:statistics-->
</html>