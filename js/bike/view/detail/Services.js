define([
	'marionette',
	'app',
	'bike/model/Service',
	'bike/view/detail/Service',
	'view/list/Loading',
	'view/list/Empty',
	'tpl!bike/detail/services'
], function(
	Marionette,
	app,
	Service,
	ServiceView,
	ListLoadingView,
	ListEmptyView,
	serviceTpl
) {
	var BikeDetailServicesView = Marionette.CompositeView.extend({
		template: serviceTpl,
		itemView: ServiceView,
		itemViewContainer: '.bike-services',
		emptyView: ListEmptyView,

		events: {
			'click .add': 'addService'
		},

		initialize: function() {
			if (!this.collection.loaded) {
				this.emptyView = ListLoadingView;

				this.listenToOnce(this.collection, 'sync', function() {
					this.emptyView = ListEmptyView;
					this.render();
				});
			}
		},

		onRender: function() {
			this.$('thead .glyphicon').tooltip({
				delay: 500
			});
		},

		addService: function() {
			this.collection.add(new Service({
				bikeId: this.model.get('id')
			}));
		}
	});

	return BikeDetailServicesView;
});