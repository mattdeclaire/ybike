define([
	'marionette',
	'bike/view/list/Item',
	'view/list/Loading',
	'view/list/Empty',
	'tpl!bike/list/index',
	'app'
], function(
	Marionette,
	BikeListItemView,
	ListLoadingView,
	ListEmptyView,
	bikeIndexTpl,
	app
) {
	var BikeListView = Marionette.CompositeView.extend({
		template: bikeIndexTpl,
		itemView: BikeListItemView,
		itemViewContainer: '.bike-list tbody',
		emptyView: ListEmptyView,

		initialize: function() {
			this.collection = app.request('bikes');

			if (!this.collection.loaded) {
				this.emptyView = ListLoadingView;

				this.listenToOnce(this.collection, 'sync', function() {
					this.emptyView = ListEmptyView;
					this.render();
				});
			}
		},

		onRender: function() {
			this.$('.glyphicon').tooltip({
				delay: 500
			});
		},

		events: {
			'click .add': 'addBike'
		},

		addBike: function() {
			console.log('add bike');
		}
	});

	return BikeListView;
});