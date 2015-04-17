define([
	'marionette',
	'app',
	'view/Loading',
	'view/layout/Header',
	'tpl!layout'
], function(
	Marionette,
	app,
	LoadingView,
	HeaderView,
	layoutTpl
) {
	var LayoutView = Marionette.Layout.extend({
		template: layoutTpl,

		regions: {
			headerRegion: '#header',
			contentRegion: '#content'
		},

		onRender: function() {
			this.contentRegion.show(new LoadingView());
			this.headerRegion.show(new HeaderView());
		}
	});

	return LayoutView;
});