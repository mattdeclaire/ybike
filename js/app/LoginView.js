define([
	'marionette',
	'kinvey',
	'app'
], function(
	Marionette,
	Kinvey,
	app
) {
	var RootView = Marionette.ItemView.extend({
		template: function() {
			return '<form>' +
			'<input type="text" name="username" placeholder="username">' +
			'<input type="password" name="password" placeholder="password">' +
			'<input type="submit" name="submit" value="login">';
		},

		ui: {
			form: 'form',
			username: '[name=username]',
			password: '[name=password]'
		},

		events: {
			'submit @ui.form': 'login'
		},

		login: function(event) {
			event.preventDefault();

			var username = this.ui.username.val(),
				password = this.ui.password.val();

			var activeUser = new Kinvey.Backbone.User();

			activeUser.login(username, password, {
				success: function() {
					app.activeUser = activeUser;

					app.rootView.content.show(new Marionette.ItemView({
						template: function() {
							return app.activeUser.get('username');
						}
					}));
				}
			});
		}
	});

	return RootView;
});