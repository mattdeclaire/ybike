define([
	'collection/Collection',
	'bike/model/Service'
],
function(
	Collection,
	Service
) {
	var Services = Collection.extend({
		model: Service,
		url: '/api/service'
	});

	return Services;
});