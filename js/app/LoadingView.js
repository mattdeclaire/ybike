define([
	'marionette'
], function(
	Marionette
) {
	var LoadingView = Marionette.ItemView.extend({
		template: function() {
			return 'loading...';
		}
	});

	return LoadingView;
});