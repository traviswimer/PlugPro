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
		$('#dj-button').attr("style", "");
		this.remove();
	},

	reposition: function( paneSizes ){
		var windowWidth = $(window).width();
		var windowHeight = $(window).height();

		var leftPosition = paneSizes.userlist;
		var height = (windowHeight - 109) / 2;

		var halfPane = paneSizes.middle/2;

		this.$el.css({
			"left": (leftPosition + halfPane) + "px",
			"height": height + "px",
			"width": halfPane + "px"
		});

		$('#dj-button').width( this.$el.outerWidth() );
		$('#dj-button').css({
			"left": this.$el.css("left")
		});

		//repositionAndCenter( $('#dj-button'), this.$el );
	}

});

module.exports = WaitlistView;