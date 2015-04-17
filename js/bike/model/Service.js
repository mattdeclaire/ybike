define([
	'model/Model'
], function(
	Model
) {
	var Service = Model.extend({
		urlRoot: '/api/service',
		relations: {
			bike: 'bikeId'
		}
	});

	return Service;
});