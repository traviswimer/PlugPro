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
	},

	reposition: function( paneSizes ){
		var windowWidth = $(window).width();
		var windowHeight = $(window).height();

		var leftPosition = windowWidth * 0.3;
		var height = windowHeight - 108;

		this.$el.css({
			"left": leftPosition + "px",
			"height": height + "px",
			"width": paneSizes.userlist + "px"
		});

		$('#vote').width( this.$el.width() );

		repositionAndCenter( $('#vote'), this.$el );

	}

});

module.exports = UserListView;