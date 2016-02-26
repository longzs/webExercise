<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<title>注册</title>
		<link rel="stylesheet" type="text/css" href="/assets/glwx/dest/css/sign_up.a21485b199f5fc131a77.css" />
	</head>
	<body>
		<div class="register-wrap">
			<p class="info">* 请填写您的真实信息，注册成功后身份证号码将不可修改。</p>
			<form class="register-form">
				<div class="input-wrap name">
					<input type="text" class="input input-name" placeholder="真实姓名" check="name">
				</div>
				<div class="input-wrap idnum">
					<input type="text" class="input input-idnum" placeholder="身份证号" check="idnum">
				</div>
				<div class="input-wrap phone">
					<input type="text" class="input input-phone" placeholder="手机号码"  check="phone">
				</div>
				<input type="submit" class="input input-submit button" value="下一步">
			</form>
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
		
		<script src="/assets/glwx/js/jquery.js"></script>
		<script type="text/javascript" src="/assets/glwx/dest/js/sign_up.9729c1d27886e0fa6ebe.bundle.js"></script>
	</body>
	<script>var _hmt=_hmt||[];(function(){var b=document.createElement("script");b.async=true;b.src="//hm.baidu.com/hm.js?d48bdb1c51213734128364f834aa30c4";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(b,a)})();</script>
</html>