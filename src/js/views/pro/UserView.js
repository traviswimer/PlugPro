/**
 * View for the room user
 * @module views/pro/UserView
 */

var UserView = Backbone.View.extend(
/** @lends UserView.prototype */
{
	/**
	* Adds DOM elements and functionality for user within room user list
	* @class UserView
	*
	* @augments Backbone.View
	* @constructs
	*/
	initialize: function(){
		var JST = window.plugPro.JST;
		this.userHTML = JST['user.html'];

		this.model.on('change', this.render, this);
		this.model.on('remove', this.destroy, this);
	},
	
	className: "plugpro-user",

	/**
	* Render the UserView
	*/
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

		var userClass = "";
		var grab = this.model.get('grab');
		var vote = parseInt( this.model.get('vote') );
		if( grab ){
			userClass = "grabbed";
		}else if( vote === 1 ){
			userClass = "wooted";
		}else if( vote === -1 ){
			userClass = "mehed";
		}

		this.$el.removeClass( "grabbed wooted mehed" );
		if( userClass !== "" ){
			this.$el.addClass( userClass );
		}

		this.$el.append(
			this.userHTML({
				iconClass: iconClass,
				username: this.model.get('username')
			})
		);
	},

	/**
	* Destroy the UserView
	*/
	destroy: function(){
		this.remove();
	}

});

module.exports = UserView;