/**
 * View for the room users list
 * @module views/pro/UserView
 */

var UserListView = Backbone.View.extend({

	className: "plugpro-user",

	initialize: function(){
		var JST = window.plugPro.JST;
		this.userHTML = JST['user.html'];
	},
	
	render: function(){
		this.$el.append(
			this.userHTML(
				this.model.attributes
			)
		);
	},

	destroy: function(){
		this.remove();
	}

});

module.exports = UserListView;