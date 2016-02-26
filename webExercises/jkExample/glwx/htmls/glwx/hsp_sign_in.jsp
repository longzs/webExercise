<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<title>住院登录</title>
		<!--workflow:start-->
		<link rel="stylesheet" href="/assets/glwx/css/hsp_sign_in.css">
		<!--workflow:end-->
	</head>
	<body>
		<section class="wrapper">
			<nav class="navbar" data-title="住院登录">
				<div id="back"></div>
			</nav>
			<section>
				<header>南京市鼓楼医院住院信息查询</header>
				<form class="search-form">
					<div class="input-wrap">
						<input type="text" class="input input-code" placeholder="请输入住院号">
					</div>
					<div class="input-wrap">
						<input type="text" class="input input-idnum" placeholder="请输入身份证号">
					</div>
					<div class="btn search-btn">查询</div>
				</form>
			</section>
			<footer>
			</footer>
			<aside>
				<div class="alert-wrap input-invalid">
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
				<div class="alert-wrap no-loggin">
					<div class="alert">
						<div class="alert-info">
							<span class="alert-title"></span>
							<span class="alert-desc">您当前不是住院状态，住院服务功能不能使用。</span>
						</div>
						<div class="alert-ops">
							<div class="alert-op-wrap confirm">
								<div class="alert-op">我知道了</div>
							</div>
						</div>
					</div>
					<div class="alert-layer"></div>
				</div>
				<div class="locator alert-window">
					<div class="alert-window-info"></div>
				</div>
			</aside>
		</section>
		<script src="/assets/glwx/js/jquery.js"></script>
		<!--workflow:start-->
		<script src="/assets/glwx/js/bundle/hsp_sign_in.bundle.js"></script>
		<!--workflow:end-->
	</body>
</html>