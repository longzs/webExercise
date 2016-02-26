<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
		<meta name="format-detection" content="telephone=no">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<title>选医生</title>
		<link rel="stylesheet" type="text/css" href="/assets/glwx/dest/css/select_doctor.7a9ed577a0db4768cfcc.css" />
	</head>
	<body>
		<div class="date-wrap">
			<div class="today-wrap">今天是<span class="today"></span></div>
			<div class="opr-bar">
				<div class="opr prev">
					<span class="arrow"></span>
				</div>
				<div class="days-wrap">
					<div class="days">
						<div class="day all selected">全部</div>
					</div>
				</div>
				<div class="opr next">
					<span class="arrow"></span>					
				</div>
			</div>
		</div>
		<div class="normal-wrap">
			<div class="header">普通门诊</div>
			<div class="select-normal">
				<span class="desc">普通号</span>				
				<span class="arrow"></span>
			</div>
		</div>
		<div class="expert-wrap">
			<div class="header">专家门诊</div>
			<div class="experts">
				<div class="expert template">
					<div class="image-wrap">
						<img class="doc-img" src="/assets/glwx/img/doc_default.png">
					</div>
					<div class="info-wrap">
						<span class="wrap">
							<span class="doc-name"></span>
							<span class="doc-princ"></span>
							<span class="has-schedule">有号</span>
						</span>
						<span class="wrap">
							<span class="expert-in"></span>
						</span>
					</div>
				</div>
			</div>
		</div>
		<div class="no-schedules locator">
			<div class="no-wrap">
				<img class="no-img" src="/assets/glwx/img/no_expert.png">
				<span class="no-desc">抱歉，当前暂无可用排班</span>
			</div>
		</div>
		<div class="loading">
			<img class="loading-pic" src="/assets/glwx/img/loading.gif" width="48" height="48">
			<span class="loading-text">科室信息加载中...</span>
		</div>
		<div class="locator alert-window">
			<div class="alert-window-info"></div>
		</div>
		
		<script src="/assets/glwx/js/jquery.js"></script>
		<script type="text/javascript" src="/assets/glwx/dest/js/select_doctor.b10a27a297617fdeb2fe.bundle.js"></script>
	</body>
	<script>var _hmt=_hmt||[];(function(){var b=document.createElement("script");b.async=true;b.src="//hm.baidu.com/hm.js?d48bdb1c51213734128364f834aa30c4";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(b,a)})();</script>
</html>