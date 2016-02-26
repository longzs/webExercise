<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<title>我的住院</title>
		<link rel="stylesheet" type="text/css" href="/assets/glwx/dest/css/hospitalization.65ef19a94b4899d52c48.css" />
	</head>
	<body>
		<div class="navigator">
			<div id="back"></div>
		</div>
		<div class="no-log">
			<p class="head">南京市鼓楼医院住院信息查询</p>
			<div class="input-wrap">
				<input type="text" class="input input-code" placeholder="请输入住院号">
			</div>
			<div class="input-wrap">
				<input type="text" class="input input-idnum" placeholder="请输入身份证号">
			</div>
			<div class="search-btn btn">查询</div>
		</div>
		<div class="logged">
			<div class="user-info">
				<div class="wrap">
					<span class="title">就诊人</span>
					<span class="value name"></span>
					<span class="value area"></span>
				</div>
				<div class="wrap">
					<span class="title">住院时间</span>					
					<span class="value time"></span>
				</div>
				<div class="btn-inline switch-user">切换</div>
			</div>
			<div class="header">住院服务</div>
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
		</div>
		<div class="alert-wrap validate">
			<div class="alert">
				<div class="alert-info">
					<span class="alert-title">提示</span>
					<span class="alert-desc"></span>
				</div>
				<div class="alert-ops">
					<div class="alert-op-wrap confirm">
						<div class="alert-op">确定</div>
					</div>
				</div>
			</div>
			<div class="alert-layer"></div>
		</div>
		<div class="alert-wrap sign-in">
			<div class="alert">
				<div class="alert-info">
					<span class="alert-title"></span>
					<span class="alert-desc">您当前不是住院状态，住院服务功能不能使用。</span>
				</div>
				<div class="alert-ops">
					<div class="alert-op-wrap confirm">
						<div class="alert-op">我知道了</div>
					</div>
				</div>
			</div>
			<div class="alert-layer"></div>
		</div>
		<div class="locator alert-window">
			<div class="alert-window-info"></div>
		</div>
		<div class="overlayer"></div>
		<div class="loading">
			<img class="loading-pic" src="/assets/glwx/img/loading.gif">
			<span class="loading-text">正在查询住院信息...</span>
		</div>
		<script src="/assets/glwx/js/jquery.js"></script>
		<script type="text/javascript" src="/assets/glwx/dest/js/hospitalization.acdf8686de3a0e780171.bundle.js"></script>
	</body>
</html>