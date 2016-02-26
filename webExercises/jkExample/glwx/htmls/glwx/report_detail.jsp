<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
		<meta name="format-detection" content="telephone=no">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<title>报告单详情</title>
		<!--workflow:start-->
		<link rel="stylesheet" href="/assets/glwx/css/report_detail.css">
		<!--workflow:end-->
	</head>
	<body>
		<div class="report-wrap">
			<div class="header">
				<p class="head-title"><span class="hsp-name">南京市鼓楼医院</span><span class="report-type"></span>报告单</p>
			</div>
			<div class="content">
				<div class="report-brief">
					<div class="title-wrap project">
						<span class="title">检验项目</span><span class="detail project-name"></span>
					</div>
					<div class="title-wrap">
						<span class="title">临床诊断</span><span class="detail diagnose"></span>
					</div>
					<div class="title-wrap">
						<span class="title">化验医师</span><span class="detail examine-doctor"></span>
					</div>
					<div class="title-wrap">
						<span class="title">检验时间</span><span class="detail report-time"></span></span>
					</div>
					<!-- <div class="title-wrap visitor">
						<span class="title">就诊人</span><span class="detail report-visitor"></span></span>
					</div> -->
				</div>
				<table class="report-info">
					<thead>
						<tr>
							<th>项目名称</th>
							<th>结果</th>
							<th>参考值</th>
						</tr>
					</thead>
					<tbody>
						<tr class="item template">
							<td class="item-name"></td>
							<td class="item-result"></td>
							<td>
								<span class="item-range"></span><br /><span class="item-unit"></span>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div class="loading">
			<img class="loading-pic" src="/assets/glwx/img/loading.gif">
			<span class="loading-text">报告详情加载中...</span>
		</div>
		<div class="not-valid locator">
			<div class="no-wrap">
				<img class="no-img" src="/assets/glwx/img/no_expert.png">
				<span class="no-desc">查询人姓名与报告单姓名不一致</span>
			</div>
		</div>
		<div class="locator alert-window">
			<div class="alert-window-info"></div>
		</div>
		<script src="/assets/glwx/js/jquery.js"></script>
		<!--workflow:start-->
		<script src="/assets/glwx/js/bundle/report_detail.bundle.js"></script>
		<!--workflow:end-->
	</body>
</html>