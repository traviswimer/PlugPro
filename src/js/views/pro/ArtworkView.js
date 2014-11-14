/**
 * View for album artwork
 * @module views/pro/ArtworkView
 */
var panes = require('./panes');

var ArtworkView = Backbone.View.extend(
/** @lends ArtworkView.prototype */
{
	/**
	* Adds DOM elements and functionality for album artwork in the Pro-View
	* @class ArtworkView
	*
	* @augments Backbone.View
	* @constructs
	*/
	initialize: function(){
		var JST = window.plugPro.JST;
		this.artworkHTML = JST['artwork.html'];
	},

	id: "plugpro-artwork",

	/**
	* Render the ArtworkView
	*/
	render: function(){
		this.setDefaultImage();
		this.fetchArtwork();
		API.on( API.ADVANCE, this.fetchArtwork.bind(this) );
	},

	/**
	* Set artwork as Pro logo by default
	*/
	setDefaultImage: function(){
		this.$el.html(
			this.artworkHTML({
				url: 'chrome-extension://' + $('#plug_pro_chrome_extension_id').val() + "/images/logo_large.png"
			})
		);

		this.reposition();
	},

	/**
	* Fetches album artwork from itunes
	*/
	fetchArtwork: function(){
		var currentSong = API.getMedia();

		if( !currentSong ){
			return;
		}

		var searchTerm = currentSong.author +" "+ currentSong.title;
		var imgSearchURL = "https://ajax.googleapis.com/ajax/services/search/images?v=1.0&safe=active&rsz=1&imgsz=large&q="+ searchTerm +"&callback=?";
		//var itunesURL = "https://itunes.apple.com/search?term="+ searchTerm +"&callback=?";
		$.getJSON( imgSearchURL, null, this.displayArtwork.bind(this) );
	},

	/**
	* Adds album artwork to the DOM
	* @param {object} data - The song data provided by itunes
	*/
	displayArtwork: function( data ){
		var imgResult;
		console.log(data);

		if( data.responseData.results.length === 0 ){

			var songInfo = API.getMedia();

			if( songInfo.image.indexOf('sndcdn') !== -1 ){
				imgResult = songInfo.image.replace( '-large', '-t500x500' );
			}else{
				this.setDefaultImage();
				return;
			}

		}else{
			//imgResult = data.results[0].artworkUrl100;
			imgResult = data.responseData.results[0].unescapedUrl;
		}

		var artworkURL = imgResult.replace( "100x100", "600x600" );

		this.$el.html(
			this.artworkHTML({
				url: artworkURL
			})
		);

		this.reposition();
	},

	/**
	* Destroy the ArtworkView
	*/
	destroy: function(){
		this.remove();
	},

	/**
	* Move DOM elements to the correct positions
	*/
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