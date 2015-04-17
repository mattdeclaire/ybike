define([
	'model/Model',
	'bike/model/Location',
	'bike/collection/Services'
], function(
	Model,
	Location,
	Services
) {
	var Bike = Model.extend({
		urlRoot: '/api/bike',
		relations: {
			location: 'locationId'
		},

		get: function(name) {
			if (name == 'location') {
				if (!this._location) {
					var locationId = this.get('locationId');
					if (locationId) {
						this._location = new Location({
							id: locationId
						});
						this._location.fetch();
					} else {
						this._location = false;
					}
				}

				return this._location;
			}

			if (name == 'services') {
				if (!this._services) {
					this._services = new Services([], {
						bike: this.id
					});
					this._services.fetch();
				}

				return this._services;
			}

			return Model.prototype.get.apply(this, arguments);
		}
	});

	return Bike;
});