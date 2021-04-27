//标签提示的使用示例
PNotify.defaults.delay = 5000;
const stickyStack = {
	dir1: 'down',
	dir2: 'right',
	firstpos1: 50,
	firstpos2: 25,
	spacing1: 36,
	spacing2: 36,
	push: 'bottom',
	context: document.body
}
PNotifyConfirm.confirm = true;
PNotifyConfirm.buttons = [{
		text: 'Ok',
		textTrusted: false,
		addClass: '',
		primary: true,
		promptTrigger: true,
		click: (notice, value) => {
			notice.close();
			notice.fire('pnotify.confirm', {
				notice,
				value
			});
		}
	},
	{
		text: 'Cancel',
		textTrusted: false,
		addClass: '',
		click: (notice) => {
			notice.close();
			notice.fire('pnotify.cancel', {
				notice
			});
		}
	}
];

//方法部分
/**
 * 关闭菜单栏方法
 */
function closeMenu() {
	menu_list.css("display", "none");
	setting_btn.css("width", "64px");
	setting_btn.css("height", "64px");
	menu.css("width", "0");
	cancel_btn.css("width", "0");
	cancel_btn.css("height", "0");
	user_img.css("width", "0");
	user_img.css("height", "0");
	$(document).unbind("click", onOuterClick);
}
/**
 * 打开菜单栏方法
 */
function openMenu() {
	setting_btn.css("width", "0");
	setting_btn.css("height", "0");
	menu.css("width", "25%");
	cancel_btn.css("width", "48px");
	cancel_btn.css("height", "48px");
	user_img.css("width", "64px");
	user_img.css("height", "64px");
	window.setTimeout(function() {
		menu_list.css("display", "block");
		$(document).bind("click", onOuterClick);
	}, 800);
}
/**
 * @param {Object} event
 * 点击屏幕其他部分来关闭菜单栏方法
 */
function onOuterClick(event) {
	if (event.pageX < $(window).width() * 0.75) {
		closeMenu();
	}
}
/**
 * 书签编辑-删除
 */
function delTag(e) {
	//询问框
	layer.confirm('确定要删除该标签吗？', {
		btn: ['确认', '取消'], //按钮
		title: "确认删除",
		anim: 6
	}, function() {
		getSpan(e.target).remove();
		layer.close(layer.index);
	}, function() {});
}
/**
 * @param {int} limit 指定最小rgb值(0-255)，值越大颜色越浅
 * 获取随机颜色方法
 */
function getRandomColor(limit) {
	return "rgba(" + ~~(((255 - limit) * Math.random()) + limit) + "," + ~~(((255 - limit) * Math.random()) + limit) +
		"," + ~~(((255 - limit) * Math.random()) + limit) + ",0.9)";
}
/**
 * 获取站点图标的url方法
 */
function getIcon(url) {
	if (url.indexOf("http://") !== 0 && url.indexOf("https://") !== 0)
		url = "http://" + url;
	return url.replace(/^((http[s]?:\/\/)?[^\/]+).*$/, '$1').replace(/\/+$/, "") + "/favicon.ico";
}
/**
 * 搜索提交方法
 */
function submitAction() {
	if (search_input.val() && search_input.val().trim() != "") {
		hideSug()
		clearContent()
		window.open('https://www.baidu.com/s?word=' + encodeURI(search_input.val()));
	}
	return false;
}
/**
 * 修改或添加书签时保存数据到localStorage
 */
function updataTagInfo() {
	var a = new Array();
	$(".item-edit").children("a").each(function(index, element) {
		a[index] = {
			"name": $(this).children("p").text(),
			"url": $(this).attr("title")
		};
	});
	localStorage.setItem(tags, JSON.stringify(a));
}
/**
 * 读取localStorage中标签数据到页面
 */
function loadTagInfo(defaultTags) {
	var data;
	if (defaultTags) {
		data = defaultTags;
	} else {
		data = JSON.parse(localStorage.getItem(tags));
	}
	tag_list.children().remove();
	$("#tag-more-div").children(".item-edit").remove();
	data.forEach(function(currentValue, index, arr) {
		var span = createNewTag(currentValue["name"], currentValue["url"], 1);
		var span1 = createNewTag(currentValue["name"], currentValue["url"], 2);
		tag_list.append(span);
		$("#tag-edit-add").before(span1);
	});
	change_tag_color();
}
/**
 * 创建书签节点
 */
function createNewTag(name, url, type) {
	if (type === 1) {
		var span = $("<span class='tag-item'></span>");
		var a = $("<a title='" + url + "' href='" + url + "'><img class='item-img' onerror='" + foo + "' src='" + getIcon(
				url) +
			"'><p class='item-label'>" +
			name + "</p></a>");
		span.append(a);
		return span;
	} else if (type === 2) {
		var span = $("<span class='tag-item item-edit' draggable='true' id='span" + (new Date()).getTime() + (Math.random() +
			"").substring(2) + "'></span>");
		var a = $("<a title='" + url + "'><img class='item-img' draggable='false' onerror='" + foo + "' src='" + getIcon(url) +
			"'><p class='item-label'>" +
			name + "</p></a>");
		var svg = $("#svg-hidden").clone();
		svg.css({
			"display": "block",
			"width": "22px",
			"height": "22px",
			"draggable": "true",
		});
		span.append(a);
		svg.click(function(e) {
			delTag(e);
		});
		span.append(svg);
		span.bind("dragstart", function(e) {
			e.originalEvent.dataTransfer.setData("span", e.target.id);
		});
		return span;
	}
}
/**
 * 获取图片链接列表
 */
function getBgPicList(marker) {
	var xhr = new XMLHttpRequest();
	//2、准备发送
	xhr.open("POST", "/api/oss/getAllPic", true);
	//3、设置请求头
	xhr.setRequestHeader("Content-type", "application/json");
	//4、发送
	xhr.send('{"marker":"' + marker + '"}');

	//回调参数
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			img_urls = JSON.parse(xhr.responseText);
			localStorage.setItem(picIndex, 0);
		}
	}
}

/**
 * 创建背景图片节点
 */
function createBgView() {
	if (!img_urls || img_urls.length === 0) {
		if ($("#choose-img-div #tip-label").length === 0) {
			var tip = $(
				"<label id='tip-label' style='width:100%; font-size:18px;color:orange;font-family:fantasy;'>我是有底线的 ~0v0~ </label>"
			);
			img_div.append(tip);
		}
		return;
	}
	if ($("#choose-img-div #tip-label").length != 0) {
		$("#choose-img-div #tip-label").remove();
	}
	var start = Number(localStorage.getItem(picIndex))
	var end = (img_urls.length - 1) < (start + perPage - 1) ? (img_urls.length - 1) : (start + perPage - 1)
	for (let i = start; i <= end; i++) {
		if (img_urls[i].endsWith("latest.jpg"))
			break;
		var img = $("<img src='http://jieen-bucket.oss-cn-beijing.aliyuncs.com/" + img_urls[i] + "'></img>");
		img.css({
			"width": "240px",
			"height": "135px"
		});
		img.click(function(e) {
			set_background(img_urls[i]);
			localStorage.setItem(wallpaper, 0);
			localStorage.setItem(picName, img_urls[i]);
		});
		img_div.append(img)
	}
	if (end >= (img_urls.length - 1)) {
		getBgPicList(img_urls[end])
	} else {
		localStorage.setItem(picIndex, end + 1)
	}
}

/**
 * 初始化页面
 */
function initPage() {
	var data = JSON.parse(localStorage.getItem(tags));
	var tagSwitch = localStorage.getItem(switcher);
	var wallpaperSwitch = localStorage.getItem(wallpaper);
	var isSearch = localStorage.getItem(is_search);
	var bgPicName = localStorage.getItem(picName);
	if (tagSwitch) {
		if (tagSwitch === "0") {
			tag_checkbox.prop("checked", "");
			tag_edit_btn.css("display", "none");
			tag_list.css("display", "none");
		}
	} else {
		localStorage.setItem(switcher, tag_checkbox.prop("checked") ? 1 : 0);
	}
	if (wallpaperSwitch) {
		if (wallpaperSwitch === "0") {
			wallpaper_checkbox.removeAttr("checked");
			wallpaper_edit.css("display", "inline");
		}
	} else {
		localStorage.setItem(wallpaper, wallpaper_checkbox.prop("checked") ? 1 : 0);
	}
	if(isSearch){
		if(isSearch === "0"){
			search_checkbox.removeAttr("checked");
			$("#search-div").css("display","none");
		}
	}else{
		localStorage.setItem(is_search, search_checkbox.prop("checked") ? 1 : 0);
	}
	if (bgPicName) {
		set_background(bgPicName);
	}
	if (data) {
		loadTagInfo();
		noticeAddTags();
		search_input.focus();
	} else {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', "json/defaultSettings.json");
		xhr.onreadystatechange = function(data) {
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					var params = JSON.parse(data.currentTarget.response);
					data = params["tags"];
					loadTagInfo(data);
					updataTagInfo();
					change_tag_color();
				}
			}
		}
		xhr.send();
		welcome();
	}
}
/**
 * 书签栏为空时提示可添加书签
 */
function noticeAddTags() {
	if (tag_checkbox.prop("checked") && JSON.parse(localStorage.getItem(tags)).length === 0) {
		const notice = PNotify.info({
			title: "提醒",
			text: "您已开启书签栏但书签栏为空，您可通过单击右上角菜单栏添加书签或关闭书签栏。",
			hide: 5000,
			modules: {
				Confirm: {
					confirm: true
				}
			},
			stack: stickyStack
		});
		notice.on('pnotify.confirm', () => {
			if (menu_list.css("display") === "none") {
				openMenu()
			} else {
				window.setTimeout(function() {
					openMenu()
				}, 100);
			}
		});
	}
}
/**
 * 新用户打开站点欢迎提示
 */
function welcome() {
	const notice = PNotify.info({
		title: "Welcome!",
		text: "欢迎您来到我的站点，本页面是设计来当个人浏览器主页，如果您喜欢我的设计可以收藏或设为浏览器主页。\n" +
			"右上角菜单栏可以添加或删除书签、自定义设置等。\n正下方的按钮有设计者的详细介绍,本人也会不断更新其他主题和设计，感谢您的访问！",
		hide: 6000,
		stack: stickyStack
	});
}
/**
 * @param {Object} e 拖动时目标点
 * 根据目标标签类型返回当前span
 */
function getSpan(e) {
	switch ($(e)[0].tagName.toLowerCase()) {
		case "div":
			return "div";
		case "span":
			return $(e);
		case "a":
			return $(e).parent();
		case "p":
			return $(e).parent().parent();
		case "img":
			return $(e).parent().parent();
		case "svg":
			return $(e).parent();
		default:
	}
}
/**
 * 给每个书签框不同的颜色
 */
function change_tag_color() {
	$(".tag-item a").each(function(e) {
		var color = getRandomColor(160);
		$(this).css({
			"background": "linear-gradient(to left bottom, transparent 50%, " + getRandomColor(100) +
				" 0) no-repeat 100% 0 / 2em 2em, linear-gradient(-135deg, transparent 1.5em," + color + " 0)",
		});
		$(this).hover(function() {
			$(this).css({
				"box-shadow": "0 3px 6px 0 " + color,
				"border-color": "#ffffff",
			});
		}, function() {
			$(this).css({
				"box-shadow": "",
				"border-color": color,
			});
		});
	});
}

/**
 * 设置背景，添加随机数参数防止缓存
 */
function set_background(picName) {
	if (picName.indexOf("/") >= 0) {
		$("body").css({
			"background-image": "url(http://jieen-bucket.oss-cn-beijing.aliyuncs.com/" + picName
		});
	} else {
		$("body").css({
			"background-image": "url(http://jieen-bucket.oss-cn-beijing.aliyuncs.com/nfs/jieen.site/picture/" + picName
		});
	}

}

/**
 * 添加搜索建议
 * 必应：https://api.bing.com/qsonhs.aspx?type=cb&q=#content#&cb=window.bing.sug
 * 百度：http://suggestion.baidu.com/su?wd=#content#&cb=window.baidu.sug
 * 搜狗：https://www.sogou.com/suggnew/ajajjson?type=web&key=#content#
 * 淘宝：https://suggest.taobao.com/sug?code=utf-8&q=#content#&callback=window.taobao.sug
 */
/*将ajax封装到函数中*/
function suggest(value) {
	/*百度搜索框智能提示的接口*/
	var url = "http://suggestion.baidu.com/su?wd=#content#&cb=window.baidu.sug";
	sugurl = url.replace("#content#", value);
	/*需要传入的参数，cb是callback的缩写*/
	var data = {
		wd: value,
		cb: "helloword"
	}
	/*因为涉及跨域，这里使用jsonp*/
	$.ajax({
		url: url,
		data: data,
		type: "GET",
		dataType: "jsonp",
		jsonpCallback: "helloword",
		/*跨域成功的时候返回的数据*/
		success: function(result) {
			/*返回成功之后可以在开发者工具里的Console打印看一下*/
			console.log(result);
			/*将获取的数据整理后返回到页面*/
			var a = result.s;
			var list = "";
			for (var i in a) {
				var l = a[i];
				list += "<option>" + l + "</option>";
			}
			$("#suggestList").html(list);
		},
		/*跨域失败的时候返回的数据*/
		error: function() {
			console.log("error");
		}
	})
}

function sug(value) {
	var sugurl = "http://suggestion.baidu.com/su?wd=#content#&cb=window.baidu.sug";
	var script = document.createElement("script");
	sugurl = sugurl.replace("#content#", value); //定义回调函数
	script.src = sugurl;
	window.baidu = {
		sug: function(json) {
			/*将获取的数据整理后返回到页面*/
			var a = json.s;
			var list = "";
			for (let i = 0; i < (a.length > 5 ? 5 : a.length); i++) {
				var l = a[i];
				list += "<li>" + l + "</li>";
			}
			search_result.html(list);
			/**
			 * 提示框hover事件
			 */
			$("#search-result li").bind("mouseover",function(e){
				checkItem(e.target)
			});
			$("#search-result li").bind("mouseout",function(e){
				checkItem(null)
			});
			(function() {
				var s = document.querySelectorAll('body script');
				for (var i = 1, len = s.length; i < len; i++) {
					document.body.removeChild(s[i]);
				}
			})()
		}
	} //动态添加JS脚本  
	document.body.appendChild(script);
}
// 清除建议框内容
function clearContent() {
	var size = search_result.children().length;
	for (var i = size - 1; i >= 0; i--) {
		search_result.children()[i].remove()
	}
};
//隐藏提示框
function hideSug() {
	$(".suggest").css({
		display: "none",
	});
}
//展示提示框
function showSug() {
	$(".suggest").css({
		display: "block",
	});
}
//设置词条选中状态
function checkItem(e) {
	var size = search_result.children().length
	for(let l =0 ;l<size;l++){
		search_result.children()[l].style.backgroundColor = "rgba(255,255,255,0.8)"
		search_result.children()[l].style.color = "grey"
	}
	if(e){
		e.style.backgroundColor = "rgba(255,255,255,0.5)"
		e.style.color="black"
	}
}
