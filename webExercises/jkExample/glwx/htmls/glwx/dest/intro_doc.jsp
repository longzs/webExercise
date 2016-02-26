<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport"
	content="initial-scale=1.0,maximum-scale=1.0,user-scalable=no" />
<meta name="apple-mobile-web-app-capable" content="yes">
<title>专家介绍</title>
<link rel="stylesheet" type="text/css" href="/assets/glwx/dest/css/intro_doc.c89e4a0fd4564b3ea09f.css" />
</head>
<body>
	<div class="expert-page">
		<div class="header">
			<img class="header-img" src="/assets/glwx/img/intro_dep.png"
				width="24" height="24"> <span class="dep-name"></span> <span
				class="arrow"></span>
		</div>
		<div class="experts">
			<div class="expert template">
				<div class="image-wrap">
					<img class="expert-img" src="/assets/glwx/img/doc_default.png">
				</div>
				<div class="info-wrap">
					<div class="info">
						<span class="expert-name"></span>
					</div>
					<div class="info">
						<span class="expert-princ"></span> <span class="dep-name"></span>
					</div>
					<div class="info">
						<span class="expert-in"></span>
					</div>
				</div>
				<div class="state"></div>
			</div>
		</div>
	</div>
	<div class="deps-page">
		<div class="dep-search">
			<div class="dep-search-wrap">
				<input class="input-dep-search" type="text" placeholder="搜索科室">
				<img class="search-img filter-dep" src="/assets/glwx/img/search.png"
					alt="搜索" width="16" height="16" />
			</div>
		</div>
		<div class="departments">
			<div class="department" py="GRXJBKZZJZ" initial="G" depid="A109">
				<span class="dep-name">感染性疾病科(专家)</span>

			</div>
			<div class="department" py="CKZZJZ" initial="C" depid="B206">
				<span class="dep-name">产科(专家)</span>

			</div>
			<div class="department" py="EBYHKZZJZ" initial="E" depid="B208">
				<span class="dep-name">耳鼻咽喉科(专家)</span>

			</div>
			<div class="department" py="ENKZZJZ" initial="E" depid="A108">
				<span class="dep-name">儿内科(专家)</span>

			</div>
			<div class="department" py="FKZZJZ" initial="F" depid="B207">
				<span class="dep-name">妇科(专家)</span>

			</div>
			<div class="department" py="GCKZZJZ" initial="G" depid="B213">
				<span class="dep-name">肛肠科(专家)</span>

			</div>
			<div class="department" py="GKZZJZ" initial="G" depid="B203">
				<span class="dep-name">骨科(专家)</span>

			</div>
			<div class="department" py="GRXJBKZZJZ" initial="G" depid="A109">
				<span class="dep-name">感染性疾病科(专家)</span>

			</div>
			<div class="department" py="HXK" initial="H" depid="A102">
				<span class="dep-name">呼吸科</span>

			</div>
			<div class="department" py="KFKZZJZ" initial="K" depid="A114">
				<span class="dep-name">康复科(专家)</span>

			</div>
			<div class="department" py="MNWKZZJZ" initial="M" depid="B204">
				<span class="dep-name">泌尿外科(专家)</span>

			</div>
			<div class="department" py="NFMKZZJZ" initial="N" depid="A105">
				<span class="dep-name">内分泌科(专家)</span>

			</div>
			<div class="department" py="PFKZZJZ" initial="P" depid="B210">
				<span class="dep-name">皮肤科(专家)</span>

			</div>
			<div class="department" py="PWKZZJZ" initial="P" depid="B201">
				<span class="dep-name">普外科(专家)</span>

			</div>
			<div class="department" py="SJNKZZJZ" initial="S" depid="A104">
				<span class="dep-name">神经内科(专家)</span>

			</div>
			<div class="department" py="SJWKZZJZ" initial="S" depid="B205">
				<span class="dep-name">神经外科(专家)</span>

			</div>
			<div class="department" py="SNKZZJZ" initial="S" depid="A103">
				<span class="dep-name">肾内科(专家)</span>

			</div>
			<div class="department" py="XHNKZZJZ" initial="X" depid="A111">
				<span class="dep-name">消化内科(专家)</span>

			</div>
			<div class="department" py="XNKZZJZ" initial="X" depid="A101">
				<span class="dep-name">心内科(专家)</span>

			</div>
			<div class="department" py="XWKZZJZ" initial="X" depid="B214">
				<span class="dep-name">胸外科(专家)</span>

			</div>
			<div class="department" py="XYKZZJZ" initial="X" depid="A107">
				<span class="dep-name">血液科(专家)</span>

			</div>
			<div class="department" py="YKZZJZ" initial="Y" depid="B209">
				<span class="dep-name">眼科(专家)</span>

			</div>
			<div class="department" py="ZLNKZZJZ" initial="Z" depid="A106">
				<span class="dep-name">肿瘤内科(专家)</span>

			</div>
			<div class="department" py="ZLWKZZJZ" initial="Z" depid="B202">
				<span class="dep-name">肿瘤外科(专家)</span>

			</div>
		</div>
	</div>
	<div class="loading">
		<img class="loading-pic" src="/assets/glwx/img/loading.gif"> <span
			class="loading-text">科室医生加载中...</span>
	</div>
	<div class="no-result locator">
		<div class="no-wrap">
			<img class="no-img" src="/assets/jknj12320wx_fwh/img/no_expert.png">
			<span class="no-desc">抱歉，没有搜到相关科室</span>
		</div>
	</div>
	
	<script src="/assets/glwx/js/jquery.js"></script>
	<script type="text/javascript" src="/assets/glwx/dest/js/intro_doc.51f1726611be0dbfdc7f.bundle.js"></script>
</body>
<script>var _hmt=_hmt||[];(function(){var b=document.createElement("script");b.async=true;b.src="//hm.baidu.com/hm.js?d48bdb1c51213734128364f834aa30c4";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(b,a)})();</script>
</html>