/**
 * View for the room users list
 * @module views/pro/UserListView
 */

 var UserListCollection = require('../../collections/UserListCollection');
 var UserView = require('./UserView');

var UserListView = Backbone.View.extend({

	id: "plugpro-user-lists",

	initialize: function(){
		var JST = window.plugPro.JST;
		this.userlistHTML = JST['userlist.html']();
		this.userListCollection = new UserListCollection();
	},
	
	render: function(){
		this.$el.append( this.userlistHTML );

		this.userListCollection.fetch();

		this.childViews = [];
		this.userListCollection.each( this.appendUser.bind(this) );
	},

	appendUser: function( userModel ){
		var userView = new UserView({
			model: userModel
		});

		this.childViews.push( userView );

		this.$el.find('.plugpro-userlist-list').append( userView.el );
		userView.render();
	},

	destroy: function(){
		$('#vote').attr("style", "");
		this.remove();
	},

	reposition: function( paneSizes ){
		var windowWidth = $(window).width();
		var windowHeight = $(window).height();

		var leftPosition = 0;
		var viewButtonsHeight = $('#plugpro-view-buttons').outerHeight();
		var voteHeight = $('#vote').outerHeight();
		var height = windowHeight - 108 - viewButtonsHeight - voteHeight;

		this.$el.css({
			"left": leftPosition + "px",
			"height": height + "px",
			"width": paneSizes.userlist + "px"
		});

		$('#vote').width( this.$el.outerWidth() );
		$('#vote').css({
			"left": 0
		});

	}

});

module.exports = UserListView;