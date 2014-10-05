/**
 * View for "video view"
 * @module views/views/VideoViewView
 */

var VideoChatView = require("./VideoChatView");

var VideoViewView = {
	
	initialize: function( options ){

	},

	/**
	* Renders the "video" view
	*/
	render: function(){

		this.activeTimeout;
		$('#playback').append("<div id='video-cover'></div>");

		this.videoChatView = new VideoChatView();
		$('#room').append( this.videoChatView.$el );
		this.videoChatView.render();
		$('#plugpro-videochat').css({
			"right": "15px"
		});

		$('body').addClass('plugpro-video');

		$('.app-right').css({
			"right": ($('.app-right').width() * -1) + "px"
		});

		$('body, #playback-container').on( "mousemove", this.makeActive.bind(this) );

		API.on( API.ADVANCE, this.updateArtwork.bind(this) );

		this.makeActive();
		this.updateArtwork();
	},

	makeActive: function( event ){
		$('body').removeClass('inactive');
		if( this.activeTimeout ){
			clearTimeout( this.activeTimeout );
		}

		this.activeTimeout = setTimeout( this.makeInactive.bind(this), 2000 );
	},

	makeInactive: function(){
		$('body').addClass('inactive');
	},

	updateArtwork: function(){
		var songInfo = API.getMedia();

		if( songInfo.image.indexOf('sndcdn') !== -1 ){
			var artFile = songInfo.image.replace( '-large', '-t500x500' );
			$('#video-cover').css({
				"background-image": "url('"+ artFile +"')"
			});
		}else{
			$('#video-cover').css({
				"background-image": "none"
			});
		}
	}

};

module.exports = VideoViewView;