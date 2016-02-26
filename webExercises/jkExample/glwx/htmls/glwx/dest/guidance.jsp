<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width,initial-scale=1.0">
		<meta name="format-detection" content="telephone=no">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<title>智能导诊</title>
		<link rel="stylesheet" type="text/css" href="/assets/glwx/dest/css/guidance.4b9ec7c8640feb0b93af.css" />
	</head>
	<body>
		<div class="tabs">
			<div class="tab tab-floor selected">楼层导诊</div>
			<div class="tab tab-symptom">症状导诊</div>
		</div>
		<div class="tab-view floor-page">
			<div class="layout">
				<img src="/assets/glwx/img/layout.png" alt="layout" class="layout-img">
				<span class="hotspot hs1" data-id="bldg-6"></span>
				<!-- <span class="hotspot hs2" data-id="bldg-emerg"></span> -->
				<span class="hotspot hs3" data-id="bldg-5"></span>
			</div>
			<div class="buildings">
				<div class="bldg" id="bldg-6">
					<div class="floor" data-id="14F">
						<span class="r">净化病区</span>
						<span class="r">风湿免疫科</span>
						<span class="r">内分泌科</span>
						<span class="r">血液内科</span>
					</div>
					<div class="floor" data-id="13F">
						<span class="r">消化内科</span>
						<span class="r">肿瘤科</span>
					</div>
					<div class="floor" data-id="12F">
						<span class="r">神经内科</span>
						<span class="r">神经外科</span>
					</div>
					<div class="floor" data-id="11F">
						<span class="r">呼吸内科</span>
						<span class="r">耳鼻咽喉头颈外科</span>
						<span class="r">骨科</span>
					</div>
					<div class="floor" data-id="10F">
						<span class="r">骨科</span>
					</div>
					<div class="floor" data-id="9F">
						<span class="r">普通外科</span>
					</div>
					<div class="floor" data-id="8F">
						<span class="r">心血管内科监护室</span>
						<span class="r">心血管内科</span>
						<span class="r">普通外科</span>
					</div>
					<div class="floor" data-id="7F">
						<span class="r">心胸外科</span>
						<span class="r">血管外科</span>
						<span class="r">放射介入科</span>
						<span class="r">心胸外科监护室</span>
					</div>
					<div class="floor" data-id="6F">
						<span class="r">医学检验科</span>
						<span class="r">信息管理办公室</span>
						<span class="r">病案统计室</span>
						<span class="r">输血科</span>
						<span class="r">计算机中心</span>
						<span class="r">图书馆</span>
					</div>
					<div class="floor" data-id="5F">
						<span class="r">重症监护室（ICU）</span>
						<span class="r">手术室</span>
					</div>
					<div class="floor" data-id="4F">
						<span class="r">麻醉手术科</span>
						<span class="r">手术室</span>
						<span class="r">DSA</span>
					</div>
					<div class="floor" data-id="3F">
						<span class="r">门诊手术室</span>
					</div>
					<div class="floor" data-id="2F">
						<span class="r">钢琴厅</span>
						<span class="r">出入院结账处</span>
						<span class="r">CT磁共振</span>
						<span class="r">馨园（手术等待区）</span>
					</div>
					<div class="floor" data-id="1F">
						<span class="r">急诊医学科</span>
						<span class="r">导医台</span>
						<span class="r">消毒供应室</span>
						<span class="r">急诊病区</span>
						<span class="r">EICU</span>
					</div>
				</div>
				<!-- <div class="bldg" id="bldg-emerg">
					
				</div> -->
				<div class="bldg" id="bldg-5">
					<div class="floor has-detail" data-id="5F">
						<span class="r">著名专家门诊</span>
						<span class="r">预防保健科</span>
						<span class="r">多学科综合门诊</span>
						<span class="r">南京宁益眼科中心</span>
						<span class="r">皮肤性病科</span>
						<span class="r">耳鼻喉咽头颈外科</span>
						<span class="r">口腔科</span>
						<span class="r">医学心理科</span>
						<span class="r">中医科</span>
						<span class="r">针灸科</span>
						<span class="r">推拿科</span>
						<span class="arrow"></span>
					</div>
					<div class="floor has-detail" data-id="4F">
						<span class="r">产科</span>
						<span class="r">妇产科超声诊断</span>
						<span class="r">产前诊断中心</span>
						<span class="r">妇产科手术室</span>
						<span class="r">消化内镜诊疗中心</span>
						<span class="r">妇科</span>
						<span class="arrow"></span>
					</div>
					<div class="floor has-detail" data-id="3F">
						<span class="r">风湿免疫科</span>
						<span class="r">临床营养科</span>
						<span class="r">心血管内科</span>
						<span class="r">核医学门诊</span>
						<span class="r">呼吸内科</span>
						<span class="r">药学门诊</span>
						<span class="r">普通内科</span>
						<span class="r">超声诊断科消化内科</span>
						<span class="r">功能检查区</span>
						<span class="r">肿瘤科</span>
						<span class="r">血液内科</span>
						<span class="r">肾内科</span>
						<span class="r">心脏起搏器门诊</span>
						<span class="r">神经内科</span>
						<span class="r">注射室</span>
						<span class="r">内分泌科</span>
						<span class="r">门诊办公室</span>
						<span class="r">介入门诊</span>
						<span class="arrow"></span>
					</div>
					<div class="floor has-detail" data-id="2F">
						<span class="r">普通外科</span>
						<span class="r">整形美容烧伤科</span>
						<span class="r">疼痛科</span>
						<span class="r">专业护理门诊</span>
						<span class="r">康复医学科</span>
						<span class="r">泌尿外科</span>
						<span class="r">骨科</span>
						<span class="r">骨代谢性疾病门诊</span>
						<span class="r">超声诊断科</span>
						<span class="r">神经外科</span>
						<span class="r">男科</span>
						<span class="r">体外冲击波碎石室</span>
						<span class="r">心胸外科</span>
						<span class="r">碎石门诊</span>
						<span class="r">门诊放射检查</span>
						<span class="r">血管外科</span>
						<span class="r">伤口护理室</span>
						<span class="arrow"></span>
					</div>
					<div class="floor" data-id="1F">
						<span class="r">鼓楼大药房</span>
						<span class="r">导医台</span>
						<span class="r">超市</span>
						<span class="r">肝炎门诊</span>
						<span class="r">餐饮</span>
						<span class="r">肠道门诊</span>
						<span class="r">银行</span>
						<span class="r">发热门诊</span>
						<span class="r">自助挂号预约</span>
						<!-- <span class="arrow"></span> -->
					</div>
				</div>
			</div>
		</div>
		<div class="tab-view symptom-page">
			<div class="gender-bar">
				<div class="gender male active">
					<div class="side front-side">
						<img src="/assets/glwx/img/male_front.png" alt="male's front" class="body-img">
					</div>
					<div class="side back-side">
						<img src="/assets/glwx/img/male_back.png" alt="male's back" class="body-img">
					</div>
				</div>
				<div class="gender female">
					<div class="side front-side">
						<img src="/assets/glwx/img/female_front.png" alt="female's front" class="body-img">
					</div>
					<div class="side back-side">
						<img src="/assets/glwx/img/female_back.png" alt="female's back" class="body-img">
					</div>
				</div>
			</div>
			<div class="part-bar">
				<div class="side front-side">
					<div class="btn part" data-part-id="1">头</div>
					<div class="btn part" data-part-id="7">颈</div>
					<div class="btn part" data-part-id="10">胸</div>
					<div class="btn part" data-part-id="8">臂</div>
					<div class="btn part" data-part-id="9">手</div>
					<div class="btn part" data-part-id="11">腹</div>
					<div class="btn part" data-part-id="15">生殖部</div>
					<div class="btn part" data-part-id="16">腿</div>
					<div class="btn part" data-part-id="17">脚</div>
				</div>
				<div class="side back-side">
					<div class="btn part" data-part-id="12">背</div>
					<div class="btn part" data-part-id="13">腰</div>
					<div class="btn part" data-part-id="14">臀</div>
				</div>
			</div>
			<div class="part other-part" data-part-id="21">其他部位症状</div>
			<div class="switch-bar">
				<div class="btn selected gender-switch" data-gender="1">男</div>
				<div class="btn gender-switch" data-gender="2">女</div>
				<div class="btn switch side-switch">&nbsp;</div>
			</div>
		</div>
		<div class="locator alert-window">
			<div class="alert-window-info"></div>
		</div>
		
		<script src="/assets/glwx/js/jquery.js"></script>
		<script type="text/javascript" src="/assets/glwx/dest/js/guidance.734dcb06f5fac7a19127.bundle.js"></script>
	</body>
	<script>var _hmt=_hmt||[];(function(){var b=document.createElement("script");b.async=true;b.src="//hm.baidu.com/hm.js?d48bdb1c51213734128364f834aa30c4";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(b,a)})();</script>
</html>
		