<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<title>忘记密码</title>
		<link rel="stylesheet" type="text/css" href="/assets/glwx/dest/css/forget.b61d40eb3a24cf3a3312.css" />
	</head>
	<body>
		<div class="find-wrap">
			<form class="find-form">
				<div class="input-wrap idnum">
					<input type="text" class="input input-idnum" placeholder="请输入身份证号" check="idnum">
				</div>
				<div class="verify-code-wrap">
					<div class="input-wrap code">
						<input type="text" class="input input-code" placeholder="请输入短信验证码" check="code">
					</div>
					<div class="get-code-wrap">
						<span class="get-code"><span class="send-state">点击发送验证码</span><span class="time-left">60</span></span>
					</div>
				</div>
				<div class="input-wrap password">
					<input type="password" class="input input-password" placeholder="请输入新密码" check="pwd">
				</div>
				<div class="input-wrap confirm">
					<input type="password" class="input input-confirm" placeholder="请再次输入新密码" check="confirm">
				</div>
				<input type="submit" class="input input-submit button" value="重置">
			</form>
		</div>
		<div class="overlayer"></div>
		<div class="alert-wrap result">
			<div class="alert">
				<div class="alert-info">
					<span class="alert-title"></span>
					<span class="alert-desc"></span>
				</div>
				<div class="alert-ops">
					<div class="alert-op-wrap close">
						<div class="alert-op">关闭</div>
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
		<div class="locator alert-window">
			<div class="alert-window-info"></div>
		</div>
		
		<script src="/assets/glwx/js/jquery.js"></script>
		<script type="text/javascript" src="/assets/glwx/dest/js/forget.df6fd46b530d4a0394e7.bundle.js"></script>
	</body>
	<script>var _hmt=_hmt||[];(function(){var b=document.createElement("script");b.async=true;b.src="//hm.baidu.com/hm.js?d48bdb1c51213734128364f834aa30c4";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(b,a)})();</script>
</html>