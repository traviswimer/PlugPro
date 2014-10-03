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
		$('#playback-container').append("<div id='video-cover'></div>");

		$('body').addClass('plugpro-video');

		$('body, #playback-container').on( "mousemove", this.makeActive.bind(this) );

		this.makeActive();
	},

	makeActive: function(){
		console.log("active");
		$('body').removeClass('inactive');
		if( this.activeTimeout ){
			clearTimeout( this.activeTimeout );
		}

		this.activeTimeout = setTimeout( this.makeInactive.bind(this), 2000 );
	},

	makeInactive: function(){
		console.log("inactive");
		$('body').addClass('inactive');
	}

};

module.exports = VideoViewView;