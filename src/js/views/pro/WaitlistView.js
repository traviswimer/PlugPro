/**
 * View for the room waitlist
 * @module views/pro/WaitlistView
 */
var WaitlistCollection = require('../../collections/WaitlistCollection');
var WaitlistUserView = require('./WaitlistUserView');
var panes = require('./panes');

var WaitlistView = Backbone.View.extend({

	id: "plugpro-waitlist",

	initialize: function(){
		var JST = window.plugPro.JST;
		this.waitlistHTML = JST['waitlist.html']();
		this.waitlistCollection = new WaitlistCollection();
	},

	render: function(){
		this.$el.append( this.waitlistHTML );

		this.waitlistCollection.on( "reset", this.onListUpdate.bind(this) );
		API.on( API.WAIT_LIST_UPDATE, this.waitlistCollection.fetch.bind( this.waitlistCollection ) );

		this.waitlistCollection.fetch();
	},

	onListUpdate: function(){
		this.fragment = document.createDocumentFragment();
		this.$el.find('.plugpro-waitlist-list').html("");
		this.childViews = [];
		this.waitlistCollection.each( this.appendUser.bind(this) );

		this.$el.find('.plugpro-waitlist-list').append( this.fragment );
	},

	appendUser: function( userModel ){
		var userView = new WaitlistUserView({
			model: userModel
		});

		this.childViews.push( userView );
		this.fragment.appendChild( userView.el );

		userView.render();
	},

	destroy: function(){
		$('#dj-button').attr("style", "");
		this.remove();
	},

	reposition: function(){
		var windowWidth = $(window).width();
		var windowHeight = $(window).height();

		var leftPosition = panes.get('userlist');
		var height = (windowHeight - 109) / 2;

		var halfPane = panes.get('middle')/2;

		this.$el.css({
			"left": (leftPosition + halfPane) + "px",
			"height": height + "px",
			"width": halfPane + "px"
		});

		$('#dj-button').width( this.$el.outerWidth() );
		$('#dj-button').css({
			"left": this.$el.css("left")
		});

	}

});

module.exports = WaitlistView;