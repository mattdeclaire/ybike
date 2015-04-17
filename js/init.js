require.config({
	paths: {
		'text': 'vendor/text',
		'tpl': 'vendor/require-tpl',
		'jquery': 'vendor/jquery-1.9.1',
		'underscore': 'vendor/underscore',
		'json2': 'vendor/json2',
		'backbone': 'vendor/backbone',
		'backbone.wreqr': 'vendor/backbone.wreqr',
		'backbone.babysitter': 'vendor/backbone.babysitter',
		'marionette': 'vendor/backbone.marionette',
		'mustache': 'vendor/mustache',
		'bootstrap': 'vendor/bootstrap',
		'moment': 'vendor/moment'
	},
	shim: {
		'underscore': {
			exports: '_'
		},
		'backbone': {
			deps: [
				'underscore',
				'json2',
				'jquery'
			],
			exports: 'Backbone'
		},
		'jquery.prettydate': ['jquery'],
		'bootstrap': {
			deps: [
				'jquery'
			]
		}
	}
});

require([
	'jquery',
	'app',
	'bike/module',
	'bootstrap'
], function($, app) {
	$(function() {
		app.start();
	});
});