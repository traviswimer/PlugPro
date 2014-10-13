var UserListCollection = Backbone.Collection.extend({
	fetch : function(){
		var users = API.getUsers();
		users = users.map(function( user ){

			var iconClass = "";
			var role = parseInt( user.role );
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
			var grab = user.grab;
			var vote = parseInt( user.vote );
			if( grab ){
				userClass = "grabbed";
			}else if( vote === 1 ){
				userClass = "wooted";
			}else if( vote === -1 ){
				userClass = "mehed";
			}

			user.iconClass = iconClass;
			user.userClass = userClass;

			return user;
		});
		this.reset( users );
	}
});

module.exports = UserListCollection;