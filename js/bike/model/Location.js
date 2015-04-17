define([
	'model/Model'
], function(
	Model
) {
	var Location = Model.extend({
		urlRoot: '/api/location',
		defaults: {
			name: false
		}
	});

	return Location;
});