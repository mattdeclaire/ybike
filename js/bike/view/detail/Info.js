define([
	'marionette',
	'tpl!bike/detail/info'
], function(
	Marionette,
	bikeDetailInfoTpl
) {
	var BikeDetailInfoView = Marionette.ItemView.extend({
		template: bikeDetailInfoTpl,

		templateHelpers: function() {
			var view = this;

			return {
				location: function() {
					return view._location && view._location.toJSON();
				}
			};
		},

		initialize: function() {
			this.listenTo(this.model, 'change', this.render);
		},

		onBeforeRender: function() {
			if (this._location = this.model.get('location')) {
				this.listenTo(this._location, 'sync', this.render);
			}
		}
	});

	return BikeDetailInfoView;
});