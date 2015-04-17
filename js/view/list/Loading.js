define([
	'marionette',
	'tpl!list/loading'
], function(
	Marionette,
	listLoadingView
) {
	var ListLoadingView = Marionette.ItemView.extend({
		template: listLoadingView,
		tagName: 'tr',
		className: 'loading'
	});

	return ListLoadingView;
});