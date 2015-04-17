define([
	'marionette',
	'tpl!loading'
], function(
	Marionette,
	loadingTpl
) {
	var LoadingView = Marionette.ItemView.extend({
		template: loadingTpl
	});

	return LoadingView;
});