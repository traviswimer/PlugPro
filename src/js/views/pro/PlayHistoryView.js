/**
 * View for the room users list
 * @module views/pro/UserListView
 */

var UserListView = Backbone.View.extend({

	id: "plugpro-play-history",
	className: "media-list history",

	initialize: function(){
		var JST = window.plugPro.JST;
		this.historyHTML = JST['play_history.html'];
	},
	
	render: function(){
		this.$el.html("");

		var historyList = API.getHistory();

		historyList.forEach( this.appendSong.bind(this) );
	},

	appendSong: function( songInfo ){

		var historyDiv = this.historyHTML( songInfo );

		this.$el.append( historyDiv );
	},

	destroy: function(){
		this.remove();
	},

	reposition: function( paneSizes ){
		var windowWidth = $(window).width();
		var windowHeight = $(window).height();

		var leftPosition = paneSizes.userlist;
		var height = (windowHeight - 108) / 2;

		this.$el.css({
			"left": leftPosition + "px",
			"height": height + "px",
			"width": paneSizes.middle/2 + "px"
		});

		$('#vote').width( this.$el.outerWidth() );
		$('#vote').css({
			"left": 0
		});

	}

});

module.exports = UserListView;