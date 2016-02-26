<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="format-detection" content="telephone=no">
		<title>报告单查询</title>
		<link rel="stylesheet" type="text/css" href="/assets/glwx/dest/css/search_report.c432ad552a346fe9c12a.css" />
	</head>
	<body>
		<div class="search-page">
			<div>
				<p class="head">南京市鼓楼医院报告单查询</p>
				<div class="input-wrap code-wrap">
					<input type="text" class="input input-code" placeholder="请输入报告单的条码号">
					<div class="right-space scan-wrap">
						<img src="/assets/glwx/img/scan.png" alt="scan" class="scan-code" width="24" height="24">
					</div>
				</div>
				<div class="search-btn btn-fixed btn">查询</div>
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
			<div class="loading inspect">
				<img class="loading-pic" src="/assets/glwx/img/loading.gif">
				<span class="loading-text">检验报告加载中...</span>
			</div>
		</div>
		<div class="report-page">
			<div class="tabs">
				<div class="tab tab-inspect selected">检验报告</div>
				<!-- <div class="tab tab-check">检查报告</div> -->
			</div>
			<div class="inspection-reports">
				<div class="report template">
					<span class="report-info">报告单号：<span class="report-code"></span></span>
					<!-- <span class="report-info">报告类型：<span class="report-title"></span></span> -->
					<span class="report-info">报告日期：<span class="report-date"></span></span>
					<span class="report-info">报告状态：<span class="print-flag"></span></span>
					<span class="warm-prompt">如需纸质报告，请在医院规定时间内至自助机上打印。</span>
				</div>
			</div>
		</div>
		<div class="locator alert-window">
			<div class="alert-window-info"></div>
		</div>
		
		<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
		<script src="/assets/glwx/js/jquery.js"></script>
		<script type="text/javascript" src="/assets/glwx/dest/js/search_report.6b17e84eb8ea95767cb4.bundle.js"></script>
	</body>
	<script>var _hmt=_hmt||[];(function(){var b=document.createElement("script");b.async=true;b.src="//hm.baidu.com/hm.js?d48bdb1c51213734128364f834aa30c4";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(b,a)})();</script>
</html>