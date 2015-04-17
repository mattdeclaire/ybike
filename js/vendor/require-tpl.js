define(['jquery', 'text'], function($, text) {
	return $.extend({}, text, {
		load: function(name, parentRequire, onload, config) {
			var filename = '/templates/' + name + '.tpl';
			text.load(filename, parentRequire, onload, config);
		}
	});
});