define([
	'backbone',
	'marionette',
	'bike/view/detail/Info',
	'bike/view/detail/Services',
	'tpl!bike/detail/layout'
], function(
	Backbone,
	Marionette,
	BikeInfoView,
	BikeServicesView,
	bikeDetailTpl
) {
	var BikeDetailView = Marionette.Layout.extend({
		template: bikeDetailTpl,

		regions: {
			info: '.info',
			services: '.services'
		},

		events: {
			'click .cancel': 'cancelEdit'
		},

		onRender: function() {
			this.info.show(new BikeInfoView({
				model: this.model
			}));

			this.services.show(new BikeServicesView({
				model: this.model,
				collection: this.model.get('services')
			}));
		},

		cancelEdit: function() {
			app.vent.trigger('bike:list');
		}
	});

	return BikeDetailView;
});