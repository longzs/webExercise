<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<title>每日清单</title>
		<link rel="stylesheet" type="text/css" href="/assets/glwx/dest/css/hsp_daily_bill.0f07531038a7a40819eb.css" />
	</head>
	<body>
		<section class="wrapper">
			<nav class="navbar" data-title="每日清单">
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
			<section>
				<section class="search-wrap">
					<form class="search-form">
						<div class="select-wrap">
							<select class="select-year">
								<option class="default" selected="selected">选择年份</option>
							</select>
							<div class="arrow"></div>
						</div>
						<div class="select-wrap">
							<select class="select-month">
								<option class="default" selected="selected">选择月份</option>
								<option class="month-opt">1</option>
								<option class="month-opt">2</option>
								<option class="month-opt">3</option>
								<option class="month-opt">4</option>
								<option class="month-opt">5</option>
								<option class="month-opt">6</option>
								<option class="month-opt">7</option>
								<option class="month-opt">8</option>
								<option class="month-opt">9</option>
								<option class="month-opt">10</option>
								<option class="month-opt">11</option>
								<option class="month-opt">12</option>
							</select>
							<div class="arrow"></div>
						</div>
						<div class="select-wrap">
							<select class="select-date">
								<option class="default" selected="selected">选择日期</option>
							</select>
							<div class="arrow"></div>
						</div>
						<div class="btn btn-fixed search-btn">查询</div>
					</form>
				</section>
				<section class="detail-wrap">
					<section class="patient-info">
						<span class="info area-wrap">病区：<span class="area"></span></span>
						<span class="info">姓名：<span class="name"></span></span>
						<span class="info">住院号：<span class="code"></span></span>
						<span class="info">床号：<span class="position"></span></span>
					</section>
					<section class="main-info">
						<div class="items">
							<div class="item template">
								<div class="item-brief">
									<span class="brief-name"></span>
									<span class="brief-value"></span>
								</div>
							</div>
						</div>
					</section>
					<footer class="count-info">
						<span class="count-item">当日合计：<span class="value count"></span></span>
						<span class="count-item">预交金：<span class="value foregift"></span></span>
					</footer>
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
				<div class="alert-wrap input-invalid">
					<div class="alert">
						<div class="alert-info">
							<span class="alert-title">提示</span>
							<span class="alert-desc"></span>
						</div>
						<div class="alert-ops">
							<div class="alert-op-wrap single-op confirm">
								<div class="alert-op">确定</div>
							</div>
						</div>
					</div>
					<div class="alert-layer"></div>
				</div>
			</aside>
		</section>
		
		<script src="/assets/glwx/js/jquery.js"></script>
		<script type="text/javascript" src="/assets/glwx/dest/js/hsp_daily_bill.81d986a9ac4e15afc484.bundle.js"></script>
	</body>
	<script>var _hmt=_hmt||[];(function(){var b=document.createElement("script");b.async=true;b.src="//hm.baidu.com/hm.js?d48bdb1c51213734128364f834aa30c4";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(b,a)})();</script>
</html>