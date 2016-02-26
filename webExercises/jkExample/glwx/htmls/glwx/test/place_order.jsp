<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
		<meta name="format-detection" content="telephone=no">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<title>预约挂号</title>
		<link rel="stylesheet" type="text/css" href="/assets/glwx/test/css/place_order.3d229283f21bd475dac9.css" />
	</head>
	<body>
		<div class="doctor-wrap">
			<div class="wrap">
				<span class="title">预约挂号信息</span>
				<span class="need-to-know">就诊须知</span>
			</div>
			<div class="image-wrap">
				<img class="doc-img" src="/assets/glwx/img/doc_default.png">
			</div>
			<div class="info-wrap">
				<div class="info">
					<span class="doc-name"></span>
					<span class="dep-name muted"></span>
				</div>
				<div class="info label-control">
					<span class="label">就诊日期</span>
					<span class="value time"></span>
				</div>
				<div class="info label-control">
					<span class="label">挂号费</span>
					<span class="value charge"></span>
				</div>
			</div>
		</div>
		<div class="patient-wrap">
			<div class="wrap"><span class="title">选择就诊人</span><span class="edit-patient">编辑就诊人</span></div>
			<div class="patient-content">
				<div class="patients">
					<div class="patient template">
						<span class="select-wrap">
							<img class="select-img" src="/assets/glwx/img/select.png" width="20" height="20">
						</span>
						<span class="select-value patient-name"></span>
					</div>
				</div>
			</div>
		</div>
		<div class="register-unique">
			<div class="card-wrap">
				<div class="wrap"><span class="title">就诊卡信息</span><span class="warning"></span></div>
				<div class="card-content">
					<div class="card-info wrap">
						<span class="card-type wrap"></span>
						<span class="card-no wrap"></span>
					</div>
					<div class="select-card">选择就诊卡</div>
					<div class="arrow"></div>
				</div>
			</div>
			<div class="warm-prompt">
				<h3 class="prompt-title">温馨提示：</h3>
				<p class="prompt-para">1、目前手机挂号缴费业务均为自费支付，暂不支持医保卡挂号业务</p>
				<p class="prompt-para">2、若您是初诊用户，请您先在院内完成注册，方可使用在线挂号服务</p>
				<p class="prompt-para">3、如您尚未办理就诊卡，请先至自助服务设备办卡</p>
			</div>
		</div>
		<div class="btn btn-fixed reserve-btn">确认提交</div>
		<div class="window cards-window">
			<div class="content">
				<div class="header">请选择您的就诊卡</div>
				<div class="cards">
					<div class="wrap card template">
						<span class="select-wrap">
							<img class="select-img" src="/assets/glwx/img/select.png" width="20" height="20">
						</span>
						<span class="select-value card-no"></span>
					</div>
					<div class="no-card">当前暂无就诊卡</div>
				</div>
				<div class="oprs">
					<span class="opr cancel">取消</span>
					<span class="opr confirm">确定</span>
				</div>
			</div>
			<div class="overlayer"></div>
		</div>
		<div class="alert-wrap prompt">
			<div class="alert">
				<div class="alert-info">
					<span class="alert-title">提示</span>
					<span class="alert-desc">1、您暂未在院内完成就诊卡注册，本次暂不能使用在线挂号服务。<br>2、您可在自助服务设备办理就诊卡。</span>
				</div>
				<div class="alert-ops">
					<div class="alert-op-wrap confirm">
						<div class="alert-op">我知道了</div>
					</div>
				</div>
			</div>
			<div class="alert-layer"></div>
		</div>
		<div class="alert-wrap unsupported">
			<div class="alert">
				<div class="alert-info">
					<span class="alert-title">提示</span>
					<span class="alert-desc">医保卡不支持在线挂号</span>
				</div>
				<div class="alert-ops">
					<div class="alert-op-wrap confirm">
						<div class="alert-op">我知道了</div>
					</div>
				</div>
			</div>
			<div class="alert-layer"></div>
		</div>
		<div class="loading common visitor-loading">
			<img class="loading-pic" src="/assets/glwx/img/common_loading.gif">
			<span class="loading-text">加载中</span>
		</div>
		<div class="sp">南京市卫生信息中心、健康无忧网络科技 共同出品</div>
		<script src="/assets/glwx/js/jquery.js"></script>
		<script type="text/javascript" src="/assets/glwx/test/js/place_order.bfa66b6f06e62fa02830.bundle.js"></script>
	</body>
	
</html>