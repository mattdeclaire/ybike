define([
	'backbone',
	'marionette'
], function(
	Backbone,
	Marionette
) {
	var app = new Marionette.Application();

	app.on('start', function() {
		Backbone.history.start();
		console.log('started');
	});

	return app;
});