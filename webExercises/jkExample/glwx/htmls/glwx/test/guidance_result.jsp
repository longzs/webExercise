<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width,initial-scale=1.0">
		<meta name="format-detection" content="telephone=no">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<title>导诊结果</title>
		<link rel="stylesheet" type="text/css" href="/assets/glwx/test/css/guidance_result.bc56c572726f2379189f.css" />
	</head>
	<body>
		<div class="wrapper">
			<div class="anchor-wrap">
				<div class="anchor gender"></div>
				<div class="anchor part-name"></div>
				<div class="anchor disease-name"></div>
			</div>
			<div class="reference-wrap">
				<div class="image-wrap">
					<img src="/assets/glwx/img/reference.png" alt="consult" class="feature-img" width="50" height="50">
				</div>
				<div class="info-wrap">
					<div class="reference-dep-name"></div>
					<div class="notice">此消息仅供参考</div>
				</div>
			</div>
			<div class="recommend-wrap">
				<div class="title">给您推荐的<span class="reference-dep-name"></span>医生</div>
				<div class="experts">
					<div class="expert template">
						<div class="image-wrap">
							<img class="doc-img" src="/assets/glwx/img/doc_default.png">
						</div>
						<div class="info-wrap">
							<span class="wrap">
								<span class="doc-name"></span>
								<span class="doc-princ"></span>
								<span class="has-schedule">有号</span>
							</span>
							<span class="wrap">
								<span class="expert-in"></span>
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="loading common">
			<img class="loading-pic" src="/assets/wx12320/img/common_loading.gif" width="48" height="48">
			<span class="loading-text">分析中</span>
		</div>
		<div class="no-result locator">
			<div class="no-wrap">
				<img class="no-img" src="/assets/glwx/img/no_expert.png">
				<span class="no-desc">未找到相应科室</span>
			</div>
		</div>
		<div class="sp">南京市卫生信息中心、健康无忧网络科技 共同出品</div>
		<script src="/assets/glwx/js/jquery.js"></script>
		<script type="text/javascript" src="/assets/glwx/test/js/guidance_result.303651696f27b944190f.bundle.js"></script>
	</body>
	
</html>
		