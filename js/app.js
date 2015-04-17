define([
	'jquery',
	'mustache',
	'marionette',
	'view/Layout',
	'moment'
], function(
	$,
	Mustache,
	Marionette,
	LayoutView
) {
	var helpers = {
		timestamp: function() {
			return moment().unix();
		},
		dateInput: function() {
			return function(text, render) {
				return moment.unix(render(text)).format("YYYY-MM-DD");
			};
		},
		shortDate: function() {
			return function(text, render) {
				return moment.unix(render(text)).format("MMM. D, YYYY");
			};
		},
		relativeDate: function() {
			return function(text, render) {
				return moment.unix(render(text)).fromNow();
			};
		}
	};

	// render templates with Mustache instead of the default (underscore)
	Marionette.Renderer.render = function(template, data) {
		data = data || {};
		$.extend(data, helpers);
		return Mustache.to_html(template, data);
	};

	var app = new Marionette.Application();

	app.addRegions({
		containerRegion: '#container'
	});

	app.addInitializer(function() {
		app.layoutView = new LayoutView();
		app.containerRegion.show(app.layoutView);
	});

	app.addInitializer(function() {
		if (!Backbone.history.start()) {
			Backbone.history.navigate('bikes');
			app.vent.trigger('bike:list');
		}
	});

	window.app = app;

	return app;
});