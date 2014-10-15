/**
 * View for the room users list
 * @module views/pro/PlayHistoryView
 */
var panes = require('./panes');

var PlayHistoryView = Backbone.View.extend({

	id: "plugpro-play-history",
	className: "media-list history",

	initialize: function(){
		var JST = window.plugPro.JST;
		this.historyHTML = JST['play_history.html'];

		API.on( API.HISTORY_UPDATE, this.render.bind(this) );
	},
	
	render: function(){
		this.$el.html("");

		var historyList = API.getHistory();

		if( historyList && historyList.length ){
			historyList.forEach( this.appendSong.bind(this) );
		}
	},

	appendSong: function( songInfo ){

		var historyDiv = this.historyHTML( songInfo );

		this.$el.append( historyDiv );
	},

	destroy: function(){
		this.remove();
	},

	reposition: function(){
		var windowWidth = $(window).width();
		var windowHeight = $(window).height();

		var leftPosition = panes.get('userlist');
		var height = (windowHeight - 108) / 2;

		this.$el.css({
			"left": leftPosition + "px",
			"height": height + "px",
			"width": panes.get('middle') - 250 + "px"
		});

	}

});

module.exports = PlayHistoryView;