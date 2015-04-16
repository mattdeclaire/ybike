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

require([
	'app',
	'kinvey'
], function(
	app,
	Kinvey
) {
	Kinvey.init({
		appKey: 'kid_bJHlCCBS0',
		appSecret: 'e1fe40a2adfe40a39f720180409eb774'
	}).then(function(activeUser) {
		Kinvey.ping().then(function() {
			console.log(arguments);
			app.start();
		});
	}, function(error) {
		console.log(error);
	});
});