define([
	'marionette',
	'app',
	'tpl!layout/header'
], function(
	Marionette,
	app,
	headerTpl
) {
	var HeaderView = Marionette.ItemView.extend({
		template: headerTpl,
		id: 'header-container',

		events: {
			'[href=#bikes]': function() { app.vent.trigger('bike:list'); },
			'[href=#locations]': function() { app.vent.trigger('locations:list'); },
			'[href=#contacts]': function() { app.vent.trigger('contacts:list'); },
			'[href=#users]': function() { app.vent.trigger('users:list'); }
		}
	});

	return HeaderView;
});