define([
	'underscore',
	'backbone',
	'model/Model'
], function(
	_,
	Backbone,
	Model
) {
	var Collection = Backbone.Collection.extend({
		model: Model,

		initialize: function(models, options) {
			var relations = this.model.prototype.relations;

			if (relations && options) {
				var collection = this,
					keys = _.intersection(_.keys(relations), _.keys(options)),
					params = [];

				$(keys).each(function(ndx, key) {
					params.push(key + '=' + options[key]);
				});

				if (params.length) {
					collection.url += '?' + params.join('&');
				}
			}
		}
	});

	return Collection;
});