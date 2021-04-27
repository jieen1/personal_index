var Animation = (function() {
	"use strict";

	//变量
	var cover = $("#animation"),
		cube,speed = 0.4;

	//方法区
	//私有方法
	/**
	 * 初始化div内容
	 */
	var _initDiv = function() {
			if (cover.length != 0) {
				var $div = $(
					"<div id='cube'><span class='plane'></span><span class='plane'></span><span class='plane'></span><span class='plane'></span><span class='plane'></span><span class='plane'></span></div>"
				);
				cover.append($div);
				cube = $("#cube");
				cube.css("transform", "rotateX(50deg) rotateY(50deg) rotateZ(0deg) translate3d(0px,0px,-200px)");
			}
		},
		_listenMove = function() {
			var isDown = false;
			var oldX,oldY,trsX,trsY,
			_upateDeg = function(){
				var array = $("#cube")[0].style.transform.split(" ");
				array.forEach(function(s,index,array){
					var start = 8;
					var end = s.indexOf("deg");
					array[index] = s.substring(start,end);
				});
				trsX = array[0];
				trsY = array[1];
			}
			$(document).bind("mousedown", function(e) {
				if (e.which == 1) {
					oldX = e.clientX;
					oldY = e.clientY;
					isDown = true;
				}
			});
			$(document).bind("mousemove", function(e) {
				if (isDown) {
					var x = e.clientX - oldX;
					var y = e.clientY - oldY;
					_upateDeg();
					var newX = (Number(trsX) + y * speed) % 360;
					var newY = (Number(trsY) + x * speed) % 360;
					cube.css("transform", "rotateX(" + newX + "deg) rotateY(" + newY + "deg) rotateZ(0deg) translate3d(0px,0px,-200px)");
					oldX = e.clientX;
					oldY = e.clientY;
				}
			});
			$(document).bind("mouseup", function(e) {
				if (e.which == 1) {
					isDown = false;
				}
			});
			
			
			
		}


	//共有方法
	function show() {
		_initDiv();
		_listenMove();
	}


})();
