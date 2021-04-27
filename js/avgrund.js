/*!
 * avgrund 0.1
 * http://lab.hakim.se/avgrund
 * MIT licensed
 *
 * Copyright (C) 2018 Hakim El Hattab, http://hakim.se
 */
var Avgrund = (function() {

	var container = document.documentElement,
		popup = document.querySelector('.avgrund-popup-animate'),
		cover = document.querySelector('.avgrund-cover'),
		currentState = null;

	container.classList.add('avgrund-ready');

	// Deactivate on ESC
	function onDocumentKeyUp(event) {

		if (event.keyCode === 27) {
			deactivate();
		}

	}

	// Deactivate on click outside
	function onDocumentClick(event) {

		if (event.target === document.querySelector('.avgrund-cover')) {
			deactivate();
			updataTagInfo();
			loadTagInfo();
			noticeAddTags();
		}
		event.stopPropagation();
	}

	function onLoginSuccess(event) {

		if (event.target === document.querySelector('#login-form-login-button')) {
			deactivate();
		}

	}

	function activate(state) {

		// $("body").bind('keyup', onDocumentKeyUp);
		$("body").bind('click', onDocumentClick);
		// $("body").bind('click', onLoginSuccess);
		// $("body").bind('touchstart', onDocumentClick);//兼容移动设备触摸

		popup.classList.remove(currentState);
		popup.classList.add('no-transition');
		if (state)
			popup.classList.add(state);

		setTimeout(function() {
			popup.classList.remove('no-transition');
			container.classList.add('avgrund-active');
		}, 0);

		currentState = state;

	}

	function deactivate() {

		// $("body").unbind('keyup', onDocumentKeyUp);
		$("body").unbind('click', onDocumentClick);
		// $("body").unbind('click', onLoginSuccess);
		// $("body").unbind('touchstart', onDocumentClick);//兼容移动设备触摸

		container.classList.remove('avgrund-active');
		popup.classList.remove('avgrund-popup-animate');

	}

	function disableBlur() {

		document.documentElement.classList.add('no-blur');

	}

	function show(selector) {

		popup = document.querySelector(selector);
		popup.classList.add('avgrund-popup-animate');
		activate();
		return this;

	}

	function hide() {

		deactivate();

	}

	return {

		activate: activate,
		deactivate: deactivate,
		disableBlur: disableBlur,
		show: show,
		hide: hide

	}

})();
