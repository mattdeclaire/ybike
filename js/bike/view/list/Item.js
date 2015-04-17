define([
	'marionette',
	'tpl!bike/list/item'
], function(
	Marionette,
	bikeListItemView
) {
	var BikeListItemView = Marionette.ItemView.extend({
		tagName: 'tr',
		className: 'navRow',
		template: bikeListItemView,

		events: {
			'click .edit': 'editBike',
			'click .move': 'moveBike',
			'click .delete': 'deleteBike',
			'click td': 'editBike'
		},

		editBike: function() {
			// do nothing, the click will fall through to the row
		},

		moveBike: function(e) {
			e.originalEvent.noEdit = true;
			console.log('move bike');
		},

		deleteBike: function(e) {
			e.originalEvent.noEdit = true;
			if (confirm("Are you sure?")) {
				this.model.destroy();
			}
		},

		editBike: function(e) {
			if (!e.originalEvent.noEdit) {
				app.vent.trigger('bike:edit', this.model);
			}
		}
	});

	return BikeListItemView;
});