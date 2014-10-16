/**
 * View for waitlist user
 * @module views/pro/WaitlistUserView
 */

var WaitlistUserView = Backbone.View.extend(
/** @lends WaitlistUserView.prototype */
{
	/**
	* Adds DOM elements and functionality for user within waitlist
	* @class WaitlistUserView
	*
	* @augments Backbone.View
	* @constructs
	*/
	initialize: function(){
		var JST = window.plugPro.JST;
		this.userHTML = JST['waitlist_user.html'];

		this.model.on('change', this.render, this);
		this.model.on('remove', this.destroy, this);
	},
	
	className: "plugpro-waitlist-user",

	/**
	* Render the WaitlistUserView
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

		this.$el.append(
			this.userHTML({
				iconClass: iconClass,
				username: this.model.get('username'),
				position: this.model.get('position') + 1
			})
		);
	},

	/**
	* Destroy the WaitlistUserView
	*/
	destroy: function(){
		this.remove();
	}

});

module.exports = WaitlistUserView;