<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
		<meta name="format-detection" content="telephone=no">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<title>挂号结果</title>
		<link rel="stylesheet" type="text/css" href="/assets/glwx/test/css/order_result.5b9de885098a7bdac309.css" />
	</head>
	<body>
		<div class="result success">
			<div class="info-wrap">
				<img class="result-img" src="/assets/glwx/img/success.png" width="60" width="60" alt="挂号成功">
				<span class="desc">恭喜您挂号成功！</span>
				<span class="desc">就诊地点<span class="value location highlight"></span></span>
				<!-- <span class="code-wrap">
					<span class="code-no"></span>
				</span> -->
			</div>
			<div class="info-wrap">
				<div class="wrap header">订单信息</div>
				<div class="wrap">
					<span class="title">就诊人</span>
					<span class="value name"></span>
				</div>
				<div class="wrap">
					<span class="title">就诊科室</span>
					<span class="value dep-name"></span>
				</div>
				<div class="wrap">
					<span class="title">就诊医生</span>
					<span class="value doc-name"></span>
				</div>
				<div class="wrap">
					<span class="title">就诊日期</span>
					<span class="value time"></span>
				</div>
				<div class="wrap">
					<span class="title">就诊序号</span>
					<span class="value order-no"></span>
				</div>
				<div class="wrap">
					<span class="title">挂号费</span>
					<span class="value charge"></span>
				</div>
			</div>
			<div class="info-wrap">
				<div class="wrap header">后面的事</div>
				<div class="wrap">
					<span class="value tip highlight">诊室就诊前，请您携带身份证，就诊卡，在自助机打印凭条！</span>
				</div>
			</div>
			<div class="btn btn-fixed see">查看挂号记录</div>
		</div>
		<div class="result failed">
			<div class="btn btn-fixed back">返回首页</div>
			<div class="info-wrap">
				<img class="result-img" src="/assets/glwx/img/failed.png" width="60" width="60" alt="挂号失败">
				<span class="desc">挂号失败！<span class="value error-msg"></span></span>
			</div>
		</div>
		<div class="result processing">
			<div class="info-wrap">
				<img class="result-img" src="/assets/szwx/img/success.png" width="60" width="60" alt="支付成功">
				<span class="desc">支付成功，挂号处理中...<br><br>医院挂号可能存在延时<br>您可在 患者服务 → 我的订单 中查看挂号结果</span>
			</div>
			<div class="btn btn-fixed btn-inverse see">查看挂号记录</div>
		</div>
		<div class="alert-wrap prompt">
			<div class="alert">
				<div class="alert-info">
					<span class="alert-title"></span>
					<span class="alert-desc"></span>
				</div>
				<div class="alert-ops">
					<div class="alert-op-wrap cancel">
						<div class="alert-op">取消</div>
					</div>
					<div class="alert-op-wrap confirm">
						<div class="alert-op">确定</div>
					</div>
				</div>
			</div>
			<div class="alert-layer"></div>
		</div>
		<div class="overlayer config"></div>
		<div class="locator alert-window">
			<div class="alert-window-info"></div>
		</div>
		<div class="loading request-loading">
			<img class="loading-pic" src="/assets/glwx/img/loading.gif">
			<span class="loading-text">正在挂号下单...</span>
		</div>
		<div class="loading result-loading">
			<img class="loading-pic" src="/assets/glwx/img/loading.gif">
			<span class="loading-text">正在查询挂号结果...</span>
		</div>
		<div class="sp">南京市卫生信息中心、健康无忧网络科技 共同出品</div>
		<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
		<script src="/assets/glwx/js/jquery.js"></script>
		<script type="text/javascript" src="/assets/glwx/test/js/register_result.3a805b3d9d76b8586317.bundle.js"></script>
	</body>
	
</html>