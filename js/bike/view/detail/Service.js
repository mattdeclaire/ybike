define([
	'marionette',
	'app',
	'moment',
	'tpl!bike/detail/service',
	'tpl!bike/detail/service-edit'
], function(
	Marionette,
	app,
	moment,
	serviceTpl,
	serviceEditTpl
) {
	var BikeDetailServiceView = Marionette.ItemView.extend({
		tagName: 'tbody',
		template: serviceTpl,

		templateHelpers: function() {
			var view = this,
				technicians = ["Matt", "Josh", "Jodi"];

			return {
				technicians: function() {
					var technician = view.model.get('technician');
					return [
						{ name: "Matt", current: "Matt" == technician },
						{ name: "Josh", current: "Josh" == technician },
						{ name: "Jodi", current: "Jodi" == technician }
					];
				}
			};
		},

		initialize: function() {
			if (this.model.isNew()) {
				this.template = serviceEditTpl;
			}
		},

		events: {
			'click .notes-toggle': 'toggleNotes',
			'click .edit': 'editService',
			'click .delete': 'deleteService',
			'click .save': 'saveService',
			'click .cancel': 'cancelEditService'
		},

		onRender: function() {
			this.$('.loading').hide();
			this.$('.notes').hide();
		},

		onShow: function() {
			this.$('[data-toggle=tooltip]').tooltip({
				delay: 500
			});
			this.$('[name=service]').focus();
			this.$('.notes').hide();
		},

		toggleNotes: function() {
			var notes = this.model.get('notes');
			if (notes && notes.length) {
				this.$('.notes').slideToggle();
			}
		},

		editService: function() {
			this.template = serviceEditTpl;
			this.render();
		},

		deleteService: function() {
			if (confirm("Are you sure?")) {
				this.model.destroy();
			}
		},

		saveService: function() {
			var view = this,
				date = moment(this.$('[name=date]').val());

			this.model.set({
				service: $.trim(this.$('[name=service]').val()),
				date: date && date.unix(),
				technician: $.trim(this.$('[name=technician]').val()),
				notes: $.trim(this.$('[name=notes]').val())
			});

			this.$('.loading').show();
			this.$('.actions .glyphicon').hide();

			this.model.save().then(function() {
				view.template = serviceTpl;
				view.render();
			});
		},

		cancelEditService: function() {
			if (this.model.isNew()) {
				this.close();
			} else {
				this.template = serviceTpl;
				this.render();
			}
		}
	});

	return BikeDetailServiceView;
});