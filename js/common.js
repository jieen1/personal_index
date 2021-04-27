/* 鼠标特效 */
var a_idx = 0;
var type, text, foam, a;

$(document).ready(function($) {
	/* load json config */
	var xhr = new XMLHttpRequest();
	xhr.open('GET', "json/settings.json");
	xhr.onreadystatechange = function(data) {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				var params = JSON.parse(data.currentTarget.response);
				type = params["type"];
				text = params["text"];
				foam = params["foam"];
				a = params["phrase"];

				if (type["animate"].indexOf("foam") != -1) {
					if (foam["trigger"] == "click" && foam["place"] == "pointer") {
						$("body").click(function(e) {
							show_foam(e, foam);
						});
					} else if (foam["trigger"] == "click") {
						$("body").click(function(e) {
							show_foam(null, foam);
						});
					} else if (foam["trigger"] == "auto") {
						var timeoutId = window.setInterval("show_foam(null,foam)", foam["time_interval"]);
					}
				}
				if (type["animate"].indexOf("text") != -1) {
					if (text["trigger"] == "click" && text["place"] == "pointer") {
						$("body").click(function(e) {
							show_text(e, text);
						});
					} else if (text["trigger"] == "click") {
						$("body").click(function(e) {
							show_text(null, text);
						});
					} else if (text["trigger"] == "auto") {
						var timeoutId = window.setInterval("show_text(null,text)", text["time_interval"]);
					}
				}

			} else {
				console.log('Error pJS - XMLHttpRequest status: ' + xhr.status);
				console.log('Error pJS - File config not found');
			}
		}
	};
	xhr.send();
});

function show_foam(e, foam) {
	a_idx = (a_idx + Math.round((Math.random() * 10))) % a.length;
	var x, y;
	if (e) {
		x = e.pageX;
		y = e.pageY;
	} else if (foam["place"] == "bottom") {
		x = ~~((90 * Math.random()) + 2) + "%";
		y = "86%";
	} else {
		x = ~~((90 * Math.random()) + 2) + "%";
		y = ~~((76 * Math.random()) + 10) + "%";
	}
	var $i = $("<span></span>");
	var $a = $("<a></a>");
	$i.append($a);
	if (foam["trigger"] == "auto") {
		if (foam["number"] <= 0) {
			console.log(" foam.number is invalid")
			return;
		}
		if ($("body span.bubble").length >= foam["number"]) {
			return;
		}
	}
	if (foam["text"] == "on") {
		var $t = $("<span></span>").text(a[a_idx]);
		$a.append($t);
		$t.css({
			"color": "rgb(" + ~~(143 * Math.random()) + "," + ~~(143 * Math.random()) + "," + ~~(143 * Math.random()) + ")"
		});
	}
	$i.css({
		"left": x,
		"top": y,
	});
	var color = foam["color"];
	var mode = foam["color_mode"];
	if (!color || color == "") {
		color = [143, 143, 143, 1];
		mode = "min";
	}
	if (mode == "fixed") {
		$i.css({
			"background-color": "rgba(" + color[0] + "," + color[1] + "," + color[2] + "," + color[3] + ")",
		});
	} else if (mode == "max") {
		$i.css({
			"background-color": "rgba(" + ~~(color[0] * Math.random()) + "," + ~~(color[1] * Math.random()) + "," + ~~(color[2] *
				Math.random()) + "," + color[3] + ")",
		});
	} else {
		$i.css({
			"background-color": "rgba(" + ~~(((255 - color[0]) * Math.random()) + color[0]) + "," + ~~(((255 - color[1]) *
				Math.random()) + color[1]) + "," + ~~(((255 - color[1]) * Math.random()) + color[1]) + "," + color[3] + ")",
		});
	}
	$i.addClass("bubble");
	$("body").append($i);
	if (e) {
		$i.animate({
				"top": y - foam["height"],
				"opacity": 0
			},
			foam["time"],
			function() {
				$i.remove();
			}
		);
	} else {
		$i.animate({
				"top": y.replace("%", "") - foam["height"] + "%",
				"opacity": 0
			},
			foam["time"],
			function() {
				$i.remove();
			}
		);
	}
	if (foam["trigger"] == "auto" && foam["valish"]) {
		$i.click(function(e) {
			$(e.currentTarget).stop(false, true);
		});
	}
}

function show_text(e, text) {
	if (text["trigger"] == "auto") {
		if (text["number"] <= 0) {
			console.log(" text.number is invalid")
			return;
		}
		if ($("body span.text").length >= text["number"]) {
			return;
		}
	}
	var x, y;
	if (e) {
		x = e.pageX;
		y = e.pageY - 20;
	} else if (text["place"] == "bottom") {
		x = ~~((96 * Math.random()) + 2) + "%";
		y = "96%";
	} else {
		x = ~~((96 * Math.random()) + 2) + "%";
		y = ~~((88 * Math.random()) + 10) + "%";
	}
	a_idx = (a_idx + Math.round((Math.random() * 10))) % a.length;
	var $i = $("<span></span>").append(a[a_idx]);
	$i.addClass("text");
	$i.css({
		"z-index": 99999999,
		"top": y,
		"left": x,
		"position": "absolute",
		"font-weight": "bold",
		"font-size":"16px"
	});
	var color = text["color"];
	var mode = text["color_mode"];
	if (!color || color == "") {
		color = [143, 143, 143, 1];
		mode = "min";
	}
	if (mode == "fixed") {
		$i.css({
			"color": "rgba(" + color[0] + "," + color[1] + "," + color[2] + "," + color[3] + ")",
		});
	} else if (mode == "max") {
		$i.css({
			"color": "rgba(" + ~~(color[0] * Math.random()) + "," + ~~(color[1] * Math.random()) + "," + ~~(color[2] *
				Math.random()) + "," + color[3] + ")",
		});
	} else {
		$i.css({
			"color": "rgba(" + ~~(((255 - color[0]) * Math.random()) + color[0]) + "," + ~~(((255 - color[1]) *
				Math.random()) + color[1]) + "," + ~~(((255 - color[1]) * Math.random()) + color[1]) + "," + color[3] + ")",
		});
	}
	$("body").append($i);
	if (e) {
		$i.animate({
				"top": y - text["height"],
				"opacity": 0
			},
			text["time"],
			function() {
				$i.remove();
			}
		);
	} else {
		$i.animate({
				"top": y.replace("%", "") - text["height"] + "%",
				"opacity": 0
			},
			text["time"],
			function() {
				$i.remove();
			}
		);
	}
}

function getTimeStr(){
	var now= new Date();
	year = now.getFullYear();
	month = now.getMonth()+1;
	day = now.getDate();
	return year+"-"+ ((month < 10) ? "0" + month : month) + "-" + ((day < 10) ? "0" + day : day);
}