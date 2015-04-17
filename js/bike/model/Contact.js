define([
	'model/Model'
], function(
	Model
) {
	var Contact = Model.extend({
		urlRoot: '/api/contact'
	});

	return Contact;
});