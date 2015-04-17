define([
	'backbone',
	'marionette',
	'bike/collection/Bikes',
	'bike/model/Bike',
	'bike/view/list/Layout',
	'bike/view/detail/Layout',
	'app'
], function(
	Backbone,
	Marionette,
	Bikes,
	Bike,
	BikeListView,
	BikeDetailView,
	app
) {
	app.module('bikeModule', function() {
		var api = {
			listBikes: function() {
				app.layoutView.contentRegion.show(new BikeListView());
				router.navigate('bikes');
			},

			editBike: function(bike) {
				if (typeof bike == 'string') bike = app.request('bike', bike);

				app.layoutView.contentRegion.show(new BikeDetailView({
					model: bike
				}));

				router.navigate('bikes/' + bike.get('id'));
			}
		};

		app.vent.on({
			'bike:list': function() {
				api.listBikes();
			},
			'bike:edit': function(bike) {
				api.editBike(bike);
			}
		});

		var Router =  Marionette.AppRouter.extend({
			controller: api,
			appRoutes: {
				'bikes': 'listBikes',
				'bikes/:id': 'editBike'
			}
		});

		router = new Router();

		var bikes;

		app.reqres.setHandler('bikes', function() {
			if (!bikes) {
				bikes = new Bikes();
				bikes.fetch();
			}

			return bikes;
		});

		app.reqres.setHandler('bike', function(id) {
			var bike;

			if (!bike && bikes) {
				bike = bikes.get(id);
			}

			if (!bike) {
				bike = new Bike({ id: id });
				bike.fetch();
			}

			return bike;
		});
	});
});