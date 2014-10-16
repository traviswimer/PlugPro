/**
 * View for the room play history
 * @module views/pro/PlayHistoryView
 */
var panes = require('./panes');

var PlayHistoryView = Backbone.View.extend(
/** @lends PlayHistoryView.prototype */
{
	/**
	* Adds DOM elements and functionality for play history in the Pro-View
	* @class PlayHistoryView
	*
	* @augments Backbone.View
	* @constructs
	*/
	initialize: function(){
		var JST = window.plugPro.JST;
		this.historyHTML = JST['play_history.html'];

		API.on( API.HISTORY_UPDATE, this.render.bind(this) );
	},

	id: "plugpro-play-history",
	className: "media-list history",
	
	/**
	* Render the PlayHistoryView
	*/
	render: function(){
		this.$el.html("");

		var historyList = API.getHistory();

		if( historyList && historyList.length ){
			historyList.forEach( this.appendSong.bind(this) );
		}
	},

	/**
	* Adds song to the DOM
	*/
	appendSong: function( songInfo ){

		var historyDiv = this.historyHTML( songInfo );

		this.$el.append( historyDiv );
	},

	/**
	* Destory the PlayHistoryView
	*/
	destroy: function(){
		this.remove();
	},

	/**
	* Move DOM elements to the correct positions
	*/
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