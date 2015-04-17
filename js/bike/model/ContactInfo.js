define([
	'model/Model'
], function(
	Model
) {
	var ContactInfos = Model.extend({
		urlRoot: '/api/contactInfo'
	});

	return ContactInfos;
});