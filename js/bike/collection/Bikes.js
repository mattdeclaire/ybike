define([
	'collection/Collection',
	'bike/model/Bike'
], function(
	Collection,
	Bike
) {
	var Bikes = Collection.extend({
		model: Bike,
		url: '/api/bike'
	});

	return Bikes;
});