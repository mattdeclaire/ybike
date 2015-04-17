define([
	'jquery',
	'backbone',
	'marionette',
	'kinvey',
	'app/RootView',
	'app/LoadingView',
	'app/LoginView'
], function(
	$,
	Backbone,
	Marionette,
	Kinvey,
	RootView,
	LoadingView,
	LoginView
) {
	var initPromise = Kinvey.init({
		appKey: 'kid_bJHlCCBS0',
		appSecret: 'e1fe40a2adfe40a39f720180409eb774'
	});

	var app = new Marionette.Application();

	app.on('start', function() {
		Backbone.history.start();

		app.rootView = new RootView({
			el: 'body'
		});

		app.rootView.render();

		app.rootView.content.show(new LoadingView());

		initPromise.then(function() {
			app.activeUser = Kinvey.Backbone.getActiveUser();

			if (!app.activeUser) {
				app.rootView.content.show(new LoginView());
			} else {
				app.rootView.content.show(new Marionette.ItemView({
					template: function() {
						return "already logged in: " +
							app.activeUser.get('username');
					}
				}));
			}
		});
	});

	return app;
});