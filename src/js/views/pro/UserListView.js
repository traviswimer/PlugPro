/**
 * View for the room users list
 * @module views/pro/UserListView
 */

var UserListView = Backbone.View.extend({

	id: "plugpro-user-lists",

	initialize: function(){
		var JST = window.plugPro.JST;
		this.userlistHTML = JST['userlist.html']();
	},
	
	render: function(){
		this.$el.append( this.userlistHTML );
		this.reposition();
	},

	destroy: function(){
	},

	reposition: function(){
		var windowWidth = $(window).width();
		var windowHeight = $(window).height();

		var leftPosition = windowWidth / 3;
		var height = windowHeight - 108;

		this.$el.css({
			"left": leftPosition + "px",
			"height": height + "px"
		});

		$('#vote').css({
			"left": leftPosition + "px"
		});

	}

});

module.exports = UserListView;