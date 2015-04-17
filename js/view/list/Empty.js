define([
	'marionette',
	'tpl!list/empty'
], function(
	Marionette,
	listEmptyView
) {
	var ListEmptyView = Marionette.ItemView.extend({
		template: listEmptyView,
		tagName: 'tr',
		className: 'empty'
	});

	return ListEmptyView;
});