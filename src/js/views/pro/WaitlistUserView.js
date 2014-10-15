/**
 * View for the room users list
 * @module views/pro/WaitlistUserView
 */

var WaitlistUserView = Backbone.View.extend({

	className: "plugpro-waitlist-user",

	initialize: function(){
		var JST = window.plugPro.JST;
		this.userHTML = JST['waitlist_user.html'];

		this.model.on('change', this.render, this);
		this.model.on('remove', this.destroy, this);
	},
	
	render: function(){
		this.$el.html("");

		var iconClass = "";
		var role = parseInt( this.model.get('role') );
		if( role === 5 || role === 4 ){
			iconClass = "icon-chat-host";
		}else if( role === 3 ){
			iconClass = "icon-chat-manager";
		}else if( role === 2 ){
			iconClass = "icon-chat-bouncer";
		}else if( role === 1 ){
			iconClass = "icon-chat-dj";
		}

		this.$el.append(
			this.userHTML({
				iconClass: iconClass,
				username: this.model.get('username'),
				position: this.model.get('position') + 1
			})
		);
	},

	destroy: function(){
		this.remove();
	}

});

module.exports = WaitlistUserView;