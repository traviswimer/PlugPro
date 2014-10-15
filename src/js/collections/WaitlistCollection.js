var UserListCollection = Backbone.Collection.extend({
	fetch : function(){
		var users = API.getWaitList();
		users = users.map(function( user ){
			user.position = API.getWaitListPosition( user.id );
			return user;
		});
		this.reset( users );
	}
});

module.exports = UserListCollection;