require.config({
	paths: {
		'jquery': 'vendor/jquery-1.11.2',
		'underscore': 'vendor/underscore',
		'json2': 'vendor/json2',
		'backbone': 'vendor/backbone',
		'backbone.wreqr': 'vendor/backbone.wreqr',
		'backbone.babysitter': 'vendor/backbone.babysitter',
		'marionette': 'vendor/backbone.marionette',
		'kinvey': 'vendor/kinvey-backbone-1.3.0.min'
	},
	shim: {
		'json2': {
			exports: 'JSON'
		},
		'kinvey': {
			deps: [
				'backbone'
			]
		},
	}
});

require(['app'], function(app) {
	app.start();
});