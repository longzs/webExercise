<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<title>账号管理</title>
		<link rel="stylesheet" type="text/css" href="/assets/glwx/test/css/hsp_account.8eeeee618a1d02d5c46d.css" />
	</head>
	<body>
		<section class="wrapper">
			<nav class="navbar" data-title="账号管理">
				<div id="back"></div>
			</nav>
			<section>
				<section class="switch-wrap">
					<header>选择切换账号</header>
					<section class="accounts"></section>
					<footer>
						<div class="btn btn-fixed btn-switch">切换</div>
					</footer>
				</section>
				<section class="add-wrap">
					<header>添加新账号</header>
					<footer>
						<div class="item btn-add">其他账号</div>
					</footer>
				</section>
			</section>
			<section class="templates">
				<article class="account item template">
					<div class="value name"></div>
					<div class="value idnum"></div>
				</article>
			</section>
			<footer>
				<div class="sp">南京市卫生信息中心、健康无忧网络科技 共同出品</div>
			</footer>
			<aside>
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
			</aside>
		</section>
		<script src="/assets/glwx/js/jquery.js"></script>
		<script type="text/javascript" src="/assets/glwx/test/js/hsp_account.8395a5da928170401a36.bundle.js"></script>
	</body>
	
</html>