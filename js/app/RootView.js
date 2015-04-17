define([
	'marionette'
], function(
	Marionette
) {
	var RootView = Marionette.LayoutView.extend({
		template: function() {
			return '<div id="head"></div><div id="content"></div><div id="foot"></div>';
		},

		regions: {
			head: '#head',
			content: '#content',
			foot: '#foot'
		}
	});

	return RootView;
});