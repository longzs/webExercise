<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<title>登录</title>
		<link rel="stylesheet" type="text/css" href="/assets/glwx/test/css/sign_in.a62444bde53471530b0f.css" />
	</head>
	<body>
		<div class="login-wrap">
			<form class="login-form">
				<div class="input-wrap idnum">
					<input type="text" class="input input-idnum" placeholder="身份证号/南京卫生12320网账号" check="account">
				</div>
				<div class="input-wrap password">
					<input type="password" class="input input-password" placeholder="密码" check="pwd">
				</div>
				<div class="op-bar">
					<span class="op register">注册</span>
					<span class="op forget-password">忘记密码？</span>
				</div>
				<input type="submit" class="input input-submit button" value="登录">
			</form>
		</div>
		<div class="alert-wrap error">
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
		<div class="sp">南京市卫生信息中心、健康无忧网络科技 共同出品</div>
		<script src="/assets/glwx/js/jquery.js"></script>
		<script type="text/javascript" src="/assets/glwx/test/js/sign_in.68912a5ae8b783d75ca3.bundle.js"></script>
	</body>
	
</html>