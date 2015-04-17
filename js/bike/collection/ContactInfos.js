define([
	'backbone',
	'model/ContactInfo'
], function(
	Backbone,
	ContactInfo
) {
	var ContactInfos = Backbone.Collection.extend({
		model: ContactInfo
	});

	return ContactInfos;
});