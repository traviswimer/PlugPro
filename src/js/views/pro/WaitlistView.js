/**
 * View for the room waitlist
 * @module views/pro/WaitlistView
 */
var repositionAndCenter = require('./repositionAndCenter');

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
	},

	reposition: function( paneSizes ){
		var windowWidth = $(window).width();
		var windowHeight = $(window).height();

		var viewButtonsHeight = $('#plugpro-view-buttons').height();

		var leftPosition = 0;
		var height = windowHeight - viewButtonsHeight - 108;

		this.$el.css({
			"left": leftPosition + "px",
			"height": height + "px",
			"width": (paneSizes.waitlist - 2) + "px"
		});

		$('#dj-button').width( this.$el.width() );

		repositionAndCenter( $('#dj-button'), this.$el );
	}

});

module.exports = WaitlistView;