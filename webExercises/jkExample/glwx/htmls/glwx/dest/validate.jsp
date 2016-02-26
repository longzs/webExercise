<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<title>验证</title>
		<link rel="stylesheet" type="text/css" href="/assets/glwx/dest/css/validate.f98dcc54d9e632e00df1.css" />
	</head>
	<body>
		<div class="validate-wrap">
			<form class="validate-form">
				<div class="verify-code-wrap">
					<div class="input-wrap code">
						<input type="text" class="input input-code" placeholder="请输入短信验证码" check="code">
					</div>
					<div class="get-code-wrap">
						<span class="get-code"><span class="send-state">点击发送验证码</span><span class="time-left">60</span></span>
					</div>
				</div>
				<div class="input-wrap guarderId">
					<input class="input input-guarderId" type="text" placeholder="监护人身份证号" check="guarderIdnum">
				</div>
				<div class="input-wrap password">
					<input type="password" class="input input-password" placeholder="请输入登陆密码" check="pwd">
				</div>
				<div class="input-wrap confirm">
					<input type="password" class="input input-confirm" placeholder="请再次输入登陆密码" check="confirm">
				</div>
				<input type="submit" class="input input-submit button" value="完成注册">
			</form>
		</div>
		<div class="alert-wrap failed">
			<div class="alert">
				<div class="alert-info">
					<span class="alert-title">注册失败</span>
					<span class="alert-desc"></span>
				</div>
				<div class="alert-ops">
					<div class="alert-op-wrap help">
						<div class="alert-op">客服求助</div>
					</div>
					<div class="alert-op-wrap cancel">
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
		<div class="locator alert-window">
			<div class="alert-window-info"></div>
		</div>
		
		<script src="/assets/glwx/js/jquery.js"></script>
		<script type="text/javascript" src="/assets/glwx/dest/js/validate.ebb3eabedb89ceabeef6.bundle.js"></script>
	</body>
	<script>var _hmt=_hmt||[];(function(){var b=document.createElement("script");b.async=true;b.src="//hm.baidu.com/hm.js?d48bdb1c51213734128364f834aa30c4";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(b,a)})();</script>
</html>