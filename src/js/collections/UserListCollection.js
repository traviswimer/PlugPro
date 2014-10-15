var UserListCollection = Backbone.Collection.extend({
	fetch : function(){
		var users = API.getUsers();
		this.reset( users );
	}
});

module.exports = UserListCollection;