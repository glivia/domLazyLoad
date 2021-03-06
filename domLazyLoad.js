/*!
 * Dom Lazy Load - jQuery plugin for lazy loading dom
 *
 * Copyright (c) 2015
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Version:  1.0.0
 *
 */
!(function(a, b) {

	"function" == typeof define && (define.amd || define.cmd) ? define(function() { return b }) : "object" == typeof exports ? module.exports = b : a.domLazyLoad = b;

})(this, function(func) {
	var $window = $(window),
		oldValue = $(window).scrollTop();

	function _triggerLoad(nowValue) {

		var dom = $("[data-load]");
		var len = dom.length;

		for (var i = 0; i < len; i += 1) {
			var val = dom.eq(i).offset().top - $window.height();
			if (val < nowValue || val == nowValue) {

				if (typeof func[dom.eq(i).attr("data-func")] == 'function') {
					func[dom.eq(i).attr("data-func")]();
				};

				dom.eq(i).removeAttr('data-load')
			}
		}
	}

	function _init() {
		$window.scroll(function() {
			var nowValue = $window.scrollTop();
			if (nowValue > oldValue) {
				_triggerLoad(nowValue);
			}
			oldValue = nowValue;
		})
		_triggerLoad(oldValue);
	}

	_init();
})