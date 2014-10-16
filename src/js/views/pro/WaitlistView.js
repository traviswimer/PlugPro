/**
 * View for the room waitlist
 * @module views/pro/WaitlistView
 */
var WaitlistCollection = require('../../collections/WaitlistCollection');
var WaitlistUserView = require('./WaitlistUserView');
var panes = require('./panes');

var WaitlistView = Backbone.View.extend(
/** @lends WaitlistView.prototype */
{
	/**
	* Adds DOM elements and functionality for waitlist in the Pro-View
	* @class WaitlistView
	*
	* @augments Backbone.View
	* @constructs
	*/
	initialize: function(){
		var JST = window.plugPro.JST;
		this.waitlistHTML = JST['waitlist.html']();
		this.waitlistCollection = new WaitlistCollection();
	},

	id: "plugpro-waitlist",

	/**
	* Render the WaitlistView
	*/
	render: function(){
		this.$el.append( this.waitlistHTML );

		this.waitlistCollection.on( "reset", this.onListUpdate.bind(this) );
		API.on( API.WAIT_LIST_UPDATE, this.waitlistCollection.fetch.bind( this.waitlistCollection ) );

		this.waitlistCollection.fetch();
	},

	/**
	* Re-render the entire waitlist
	*/
	onListUpdate: function(){
		this.fragment = document.createDocumentFragment();
		this.$el.find('.plugpro-waitlist-list').html("");
		this.childViews = [];
		this.waitlistCollection.each( this.appendUser.bind(this) );

		this.$el.find('.plugpro-waitlist-list').append( this.fragment );
	},

	/**
	* Add user view to the DOM
	* @param {object} userModel - Model to use for user view data
	*/
	appendUser: function( userModel ){
		var userView = new WaitlistUserView({
			model: userModel
		});

		this.childViews.push( userView );
		this.fragment.appendChild( userView.el );

		userView.render();
	},

	/**
	* Render the WaitlistView
	*/
	destroy: function(){
		$('#dj-button').attr("style", "");
		this.remove();
	},

	/**
	* Move DOM elements to the correct positions
	*/
	reposition: function(){
		var windowWidth = $(window).width();
		var windowHeight = $(window).height();

		var userlistWidth = panes.get('userlist');
		var middleWidth = panes.get('middle');
		var height = (windowHeight - 109) / 2;

		var width = 250;

		this.$el.css({
			"left": (userlistWidth + middleWidth - width) + "px",
			"height": height + "px",
			"width": width + "px"
		});

		$('#dj-button').width( this.$el.outerWidth() );
		$('#dj-button').css({
			"left": this.$el.css("left")
		});

	}

});

module.exports = WaitlistView;