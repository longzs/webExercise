<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<title>住院登录</title>
		<link rel="stylesheet" type="text/css" href="/assets/glwx/test/css/hsp_sign_in.c73cec5ff8d0017fcddb.css" />
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
				<div class="sp">南京市卫生信息中心、健康无忧网络科技 共同出品</div>
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
		<script type="text/javascript" src="/assets/glwx/test/js/hsp_sign_in.b1b33927449f111a6acc.bundle.js"></script>
	</body>
</html>