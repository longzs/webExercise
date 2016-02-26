<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no">
		<meta name="format-detection" content="telephone=no">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<title>常用就诊人</title>
		<!--workflow:start-->
		<link rel="stylesheet" href="/assets/glwx/css/my_visitors.css">
		<!--workflow:end-->
	</head>
	<body>
		<div class="page default">
			<p class="prompt">提示：每个微信账号可以添加五位就诊人。</p>
			<div class="visitors">
				<div class="visitor template">
					<div class="info-wrap static-mode">
						<div class="name-wrap">
							<div class="name"></div>
						</div>
						<div class="info-wrap">
							<div class="info idnum"></div>
							<div class="info phone"></div>
						</div>
						<div class="arrow"></div>
					</div>
					<div class="opr-wrap">
						<div class="opr edit"></div>
						<div class="opr delete"></div>
					</div>
				</div>
			</div>
			<div class="btn btn-fixed add-btn">添加就诊人</div>
			<div ></div>
		</div>
		<div class="page add">
			<div class="add-wrap">
				<div class="input-wrap">
					<span class="input-title">姓名</span>
					<input type="text" class="add-input input-name" check="name">
				</div>
				<div class="input-wrap">
					<span class="input-title">身份证号</span>
					<input type="text" class="add-input input-idnum" check="idnum">
				</div>
				<div class="input-wrap">
					<span class="input-title">手机号码</span>
					<input type="text" class="add-input input-phone" check="phone">
				</div>
			</div>
			<div class="alert-wrap guarder-info">
				<div class="alert">
					<div class="alert-info">
						<span class="alert-title">您输入的就诊人是未成年人</span>
						<span class="alert-desc">请填写监护人信息：</span>
						<input class="input input-guarderId" type="text" placeholder="身份证号">
					</div>
					<div class="alert-ops">
						<div class="alert-op-wrap cancel">
							<div class="alert-op">取消</div>
						</div>
						<div class="alert-op-wrap submit">
							<div class="alert-op">提交</div>
						</div>
					</div>
				</div>
				<div class="alert-layer"></div>
			</div>
			<div class="btn btn-fixed add-next">下一步</div>
		</div>
		<div class="page verify">
			<div class="verify-code-wrap">
				<div class="input-wrap code">
					<input type="text" class="input input-code" placeholder="请输入短信验证码" check="code">
				</div>
				<div class="get-code-wrap">
					<span class="get-code"><span class="send-state">点击发送验证码</span><span class="time-left">60</span></span>
				</div>
			</div>
			<div class="btn btn-fixed add-submit">确认提交</div>
		</div>
		<div class="page edit">
			<p class="prompt">1.每个手机号最多可与两张身份证号绑定<br />2.若遇医生临时停诊或发布重要信息时，请保证我们可以通过该手机号码联系到您。</p>
			<form class="edit-wrap">
				<div class="input-wrap">
					<span class="input-title">姓名</span>
					<input type="text" class="edit-input input-name" readonly="true">
				</div>
				<div class="input-wrap">
					<span class="input-title">旧手机号码</span>
					<input type="text" class="edit-input input-old-phone" readonly="true">
				</div>
				<div class="input-wrap">
					<span class="input-title">新手机号码</span>
					<input type="text" class="edit-input input-new-phone">
				</div>
			</form>
			<div class="btn btn-fixed edit-submit">确认修改</div>
		</div>
		<div class="loading common visitor-loading">
			<img class="loading-pic" src="/assets/glwx/img/common_loading.gif">
			<span class="loading-text">加载中</span>
		</div>
		<div class="loading common delete-loading">
			<img class="loading-pic" src="/assets/glwx/img/common_loading.gif">
			<span class="loading-text">删除中</span>
		</div>
		<div class="alert-wrap validate">
			<div class="alert">
				<div class="alert-info">
					<span class="alert-title">提示</span>
					<span class="alert-desc"></span>
				</div>
				<div class="alert-ops">
					<div class="alert-op-wrap single-op confirm">
						<div class="alert-op">确定</div>
					</div>
				</div>
			</div>
			<div class="alert-layer"></div>
		</div>
		<div class="alert-wrap delete-prompt">
			<div class="alert">
				<div class="alert-info">
					<span class="alert-title">提示</span>
					<span class="alert-desc">确定要删除该联系人吗？</span>
				</div>
				<div class="alert-ops">
					<div class="alert-op-wrap delete-cancel">
						<div class="alert-op right-border">取消</div>
					</div>
					<div class="alert-op-wrap delete-confirm">
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
		<!--workflow:start-->
		<script src="/assets/glwx/js/bundle/my_visitors.bundle.js"></script>
		<!--workflow:end-->
	</body>
	<!--insert:statistics-->
</html>
		