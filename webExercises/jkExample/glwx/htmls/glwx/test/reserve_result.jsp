<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
		<meta name="format-detection" content="telephone=no">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<title>预约结果</title>
		<link rel="stylesheet" type="text/css" href="/assets/glwx/test/css/order_result.5b9de885098a7bdac309.css" />
	</head>
	<body>
		<div class="result success">
			<div class="info-wrap">
				<img class="result-img" src="/assets/glwx/img/success.png" width="60" width="60" alt="预约成功">
				<span class="desc">恭喜您预约成功！</span>
				<span class="desc">您的预约验证码<span class="value verifycode highlight"></span></span>
			</div>
			<div class="info-wrap">
				<div class="wrap header">后面的事</div>
				<div class="wrap header">第一步</div>
				<div class="wrap">
					<span class="value tip">就诊前别忘了将<span class="highlight">身份证，就诊卡</span>带上，<span class="highlight">预约验证码</span>务必留存</span>
				</div>
				<div class="wrap header">第二步</div>
				<div class="wrap">
					<span class="value tip">就诊当天<span class="highlight time"></span>前去自助设备取号，迟到的预约就作废咯！</span>
				</div>
				<div class="wrap header">第三步</div>
				<div class="wrap">
					<span class="value tip">取号成功，直奔科室看医生吧！</span>
				</div>
			</div>
			<div class="btn btn-fixed see">查看挂号记录</div>
		</div>
		<div class="result failed">
			<div class="btn btn-fixed back">返回首页</div>
			<div class="info-wrap">
				<img class="result-img" src="/assets/glwx/img/failed.png" width="60" width="60" alt="预约失败">
				<span class="desc">&emsp;预约失败！<span class="value error-msg"></span></span>
			</div>
		</div>
		<div class="loading">
			<img class="loading-pic" src="/assets/glwx/img/loading.gif">
			<span class="loading-text">正在查询预约结果...</span>
		</div>
		<div class="sp">南京市卫生信息中心、健康无忧网络科技 共同出品</div>
		<script src="/assets/glwx/js/jquery.js"></script>
		<script type="text/javascript" src="/assets/glwx/test/js/reserve_result.0b1e48954cd4be2991b3.bundle.js"></script>
	</body>
	
</html>