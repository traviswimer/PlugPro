/**
 * View for "video view"
 * @module views/views/VideoViewView
 */

var $ = window.$;

var VideoChatView = require("./VideoChatView");

var VideoViewView = {
	
	/**
	* Renders the "video" view
	*/
	render: function(){

		this.activeTimeout;
		$('body').addClass('plugpro-video');

		$('#playback').append("<div id='video-cover'></div>");

		this.videoChatView = new VideoChatView();
		$('#room').append( this.videoChatView.$el );
		this.videoChatView.render();
		this.videoChatView.minimizeChat();

		$('body, #playback-container').on( "mousemove", this.makeActive.bind(this) );

		this.songAdvanceCallback = this.updateArtwork.bind(this);
		API.on( API.ADVANCE, this.songAdvanceCallback );

		this.makeActive();
		this.updateArtwork();
	},

	destroy: function(){
		$('body').removeClass('plugpro-video');
		$('body').removeClass('inactive');
		if( this.activeTimeout ){
			clearTimeout( this.activeTimeout );
		}
		$('#video-cover').remove();
		this.videoChatView.destroy();
		API.off( API.ADVANCE, this.songAdvanceCallback );
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