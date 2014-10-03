/**
 * View for the PlugPro Menu
 * @module views/views/VideoViewView
 */

var VideoViewView = {
	
	initialize: function( options ){

	},

	/**
	* Renders the "video" view
	*/
	render: function(){

		this.activeTimeout;
		$('#playback').append("<div id='video-cover'></div>");

		$('body').addClass('plugpro-video');

		$('body, #playback-container').on( "mousemove", this.makeActive.bind(this) );

		API.on( API.ADVANCE, this.updateArtwork.bind(this) );

		this.makeActive();
		this.updateArtwork();
	},

	makeActive: function( event ){
		console.log(event);
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