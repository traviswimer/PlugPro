/**
 * View for the room users list
 * @module views/pro/UserListView
 */

var repositionAndCenter = require('./repositionAndCenter');

var UserListView = Backbone.View.extend({

	id: "plugpro-user-lists",

	initialize: function(){
		var JST = window.plugPro.JST;
		this.userlistHTML = JST['userlist.html']();
	},
	
	render: function(){
		this.$el.append( this.userlistHTML );

		var usersList = API.getUsers();

		usersList.forEach( this.appendUser.bind(this) );
	},

	appendUser: function( user ){
		this.$el.find('.plugpro-userlist-list').append("<div>"+user.username+"</div>")
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

		//repositionAndCenter( $('#vote'), this.$el );

	}

});

module.exports = UserListView;