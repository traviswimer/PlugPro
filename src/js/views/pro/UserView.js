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
		var userClass = this.model.get('userClass');
		if( userClass !== "" ){
			this.$el.addClass( userClass );
		}

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