/**
 * View for the room waitlist
 * @module views/pro/DjView
 */
var repositionAndCenter = require('./repositionAndCenter');

var DjView = Backbone.View.extend({

	id: "plugpro-dj",

	initialize: function(){
	},

	render: function(){
		var JST = window.plugPro.JST;
		this.djHTML = JST['dj.html']();
		this.$el.append( this.djHTML );
	},

	destroy: function(){
	},

	reposition: function( paneSizes ){
		var windowWidth = $(window).width();
		var windowHeight = $(window).height();

		var viewButtonsWidth = $('#plugpro-view-buttons').width();
		var viewButtonsHeight = $('#plugpro-view-buttons').height();

		var height = viewButtonsHeight - 55;

		this.$el.css({
			"left": viewButtonsWidth + "px",
			"height": height + "px",
			"width": (paneSizes.waitlist - viewButtonsWidth) + "px",
			"top": 109 + "px"
		});

	}

});

module.exports = DjView;