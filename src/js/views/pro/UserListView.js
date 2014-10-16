/**
 * View for the room users list
 * @module views/pro/UserListView
 */

var UserListCollection = require('../../collections/UserListCollection');
var UserView = require('./UserView');
var panes = require('./panes');

var UserListView = Backbone.View.extend(
/** @lends UserListView.prototype */
{
	/**
	* Adds DOM elements and functionality for room user list in the Pro-View
	* @class UserListView
	*
	* @augments Backbone.View
	* @constructs
	*/
	initialize: function(){
		var JST = window.plugPro.JST;
		this.userlistHTML = JST['userlist.html']();
		this.userListCollection = new UserListCollection();
	},

	id: "plugpro-user-lists",
	
	/**
	* Render the UserListView
	*/
	render: function(){
		this.$el.append( this.userlistHTML );

		this.userListCollection.on( "reset", this.onListUpdate.bind(this) );

		API.on( API.USER_JOIN, this.userListCollection.fetch.bind( this.userListCollection ) );
		API.on( API.USER_LEAVE, this.userListCollection.fetch.bind( this.userListCollection ) );
		API.on( API.ADVANCE, this.userListCollection.fetch.bind( this.userListCollection ) );
		
		API.on( API.VOTE_UPDATE, this.onUserUpdate.bind(this) );
		API.on( API.GRAB_UPDATE, this.onUserUpdate.bind(this) );

		this.userListCollection.fetch();
	},

	/**
	* re-renders the entire user list
	*/
	onListUpdate: function(){
		this.fragment = document.createDocumentFragment();
		this.$el.find('.plugpro-userlist-list').html("");
		this.childViews = [];
		this.userListCollection.each( this.appendUser.bind(this) );

		this.$el.find('.plugpro-userlist-list').append( this.fragment );
	},

	/**
	* Updates user model
	* @param {object} data - User data provided by Plug.dj API
	*/
	onUserUpdate: function( data ){
		var user = data.user;

		var userModel = this.userListCollection.get( user.id );
		userModel.set( "vote", data.vote );
	},

	/**
	* Adds UserView to the DOM
	* @param {object} userModel - Model to use for view data
	*/
	appendUser: function( userModel ){
		var userView = new UserView({
			model: userModel
		});

		this.childViews.push( userView );
		this.fragment.appendChild( userView.el );

		userView.render();
	},

	/**
	* Destroy the UserListView
	*/
	destroy: function(){
		$('#vote').attr("style", "");
		this.remove();
	},

	/**
	* Move DOM elements to the correct positions
	*/
	reposition: function(){
		var windowWidth = $(window).width();
		var windowHeight = $(window).height();

		var leftPosition = 0;
		var viewButtonsHeight = $('#plugpro-view-buttons').outerHeight();
		var voteHeight = $('#vote').outerHeight();
		var height = windowHeight - 108 - viewButtonsHeight - voteHeight;

		this.$el.css({
			"left": leftPosition + "px",
			"height": height + "px",
			"width": panes.get('userlist') + "px"
		});

		$('#vote').width( this.$el.outerWidth() );
		$('#vote').css({
			"left": 0
		});

	}

});

module.exports = UserListView;