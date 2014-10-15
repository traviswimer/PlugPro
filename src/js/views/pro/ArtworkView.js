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
		this.setDefaultImage();
		this.fetchArtwork();
		API.on( API.ADVANCE, this.fetchArtwork.bind(this) );
	},

	setDefaultImage: function(){
		this.$el.html(
			this.artworkHTML({
				url: 'chrome-extension://' + $('#plug_pro_chrome_extension_id').val() + "/images/logo_large.png"
			})
		);

		this.reposition();
	},

	fetchArtwork: function(){
		var currentSong = API.getMedia();

		if( !currentSong ){
			return;
		}

		var searchTerm = currentSong.author +" "+ currentSong.title;
		var itunesURL = "https://itunes.apple.com/search?term="+ searchTerm +"&callback=?";
		$.getJSON( itunesURL, null, this.displayArtwork.bind(this) );
	},

	displayArtwork: function( data ){
		var imgResult;

		if( data.results.length === 0 ){

			var songInfo = API.getMedia();

			if( songInfo.image.indexOf('sndcdn') !== -1 ){
				imgResult = songInfo.image.replace( '-large', '-t500x500' );
			}else{
				this.setDefaultImage();
				return;
			}

		}else{
			imgResult = data.results[0].artworkUrl100;
		}

		var artworkURL = imgResult.replace( "100x100", "600x600" );

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
		var offset = (imageHeight - height) / 2;

		this.$el.css({
			"left": leftPosition + "px",
			"height": height + "px",
			"width": panes.get('middle') + "px"
		});

		var smallImageHeight = this.$el.find('.plugpro-artwork-small').height();
		this.$el.find('.plugpro-artwork-small').css({
			top: (height/2) - (smallImageHeight/2) + "px"
		});

	}

});

module.exports = ArtworkView;