<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="initial-scale=1.0,maximum-scale=1.0,user-scalable=no" />
		<meta name="apple-mobile-web-app-capable" content="yes">
		<title>医生排班</title>
		<!-- injector:css -->
		<link rel="stylesheet" href="/assets/glwx/css/site.css" />
		<link rel="stylesheet" href="/assets/glwx/css/schedules.css" />
		<!-- endinjector -->
	</head>
	<body>
		<div class="filter-wrap">
			<div class="single-wrap">
				<div class="filter weekday-filter">
					<div class="filter-head">
						<span class="filter-title">星期五</span>
					</div>
					<div class="filter-list">
						<span class="weekday">星期日</span>
						<span class="weekday selected">星期一</span>
						<span class="weekday">星期二</span>
						<span class="weekday">星期三</span>
						<span class="weekday">星期四</span>
						<span class="weekday">星期五</span>
						<span class="weekday">星期六</span>
					</div>
				</div>
			</div>
			<div class="single-wrap">
				<div class="filter dep-filter">
					<div class="filter-head">
						<span class="filter-title">所有科室</span>
					</div>
					<div class="filter-list">
						<span class="dep">骨科</span>
						<span class="dep">泌尿外科</span>
					</div>
				</div>
			</div>
		</div>
		<div class="schedule-list">
			<div class="list-head">
				<div class="dep-name">科室</div>
				<div class="am-list">
					<div class="list-title">上午</div>
					<div class="main-list">主任医师</div>
					<div class="vice-list">副主任医师</div>
				</div>
				<div class="pm-list">
					<div class="list-title">下午</div>
					<div class="main-list">主任医师</div>
					<div class="vice-list">副主任医师</div>
				</div>
			</div>
			<div class="lists">
				<div class="schedule">
					<div class="dep-name">泌尿外科</div>
					<div class="am-list">
						<div class="main-list">
							<span class="expert-name">周斌</span>
						</div>
						<div class="vice-list">
							<span class="expert-name">张三</span>
							<span class="expert-name">李四</span>
						</div>
					</div>
					<div class="pm-list">
						<div class="main-list">
							<span class="expert-name">周斌</span>
						</div>
						<div class="vice-list">
							<span class="expert-name">张三</span>
							<span class="expert-name">李四</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="overlayer"></div>
		<!-- injector:js -->
		<script type="text/javascript" src="/assets/glwx/js/jquery-2.1.1.min.js"></script>
		<!--<script type="text/javascript" src="/assets/glwx/js/config.js"></script>
		<script type="text/javascript" src="/assets/glwx/js/common.js"></script>-->
		<script type="text/javascript" src="/assets/glwx/js/schedules.js"></script>
		<!-- endinjector -->
	</body>
	<!--insert:statistics-->
</html>