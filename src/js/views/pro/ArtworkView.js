/**
 * View for the room waitlist
 * @module views/pro/ArtworkView
 */
var panes = require('./panes');

var ArtworkView = Backbone.View.extend({

	id: "plugpro-artwork",

	initialize: function(){
		var JST = window.plugPro.JST;
		this.artworkHTML = JST['artwork.html'];
	},

	render: function(){
		this.fetchArtwork();

		API.on( API.ADVANCE, this.fetchArtwork.bind(this) );
	},

	fetchArtwork: function(){
		var currentSong = API.getMedia();
		var searchTerm = currentSong.author +" "+ currentSong.title;
		var itunesURL = "https://itunes.apple.com/search?term="+ searchTerm +"&callback=?";
		$.getJSON( itunesURL, null, this.displayArtwork.bind(this) );
	},

	displayArtwork: function( data ){
		if( data.results.length === 0 ){
			return;
		}

		var firstResult = data.results[0];
		var artworkURL = firstResult.artworkUrl100.replace( "100x100", "600x600" );

		this.$el.html(
			this.artworkHTML({
				url: artworkURL
			})
		);

		this.reposition();
	},

	destroy: function(){
		this.remove();
	},

	reposition: function(){
		var windowWidth = $(window).width();
		var windowHeight = $(window).height();

		var leftPosition = panes.get('userlist');
		var height = (windowHeight - 109) / 2;

		var imageHeight = this.$el.find('img').height();
		var offset = (imageHeight - height) / -2;

		this.$el.css({
			"left": leftPosition + "px",
			"height": height + "px",
			"top": offset + "px",
			"width": panes.get('middle') + "px"
		});

	}

});

module.exports = ArtworkView;