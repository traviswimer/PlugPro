/**
 * View for the room waitlist
 * @module views/pro/WaitlistView
 */

var WaitlistView = Backbone.View.extend({

	id: "plugpro-waitlist",

	initialize: function(){
		var JST = window.plugPro.JST;
		this.waitlistHTML = JST['waitlist.html']();
	},

	render: function(){
		this.$el.append( this.waitlistHTML );

	},

	destroy: function(){
	}

});

module.exports = WaitlistView;