
/**
 * Keeps track of the current room's state
 * @module Room
 */

/**
 * Representation of a room (community)
 * @constructor
 */
function Room(){
	this.listeners = {};
}

/**
 * Initializes checking if application ("room") has loaded
 */
Room.prototype.init = function(){

	// A messy way to check if the app has completed loading
	this.loadedCheckInterval = setInterval( checkRoomLoaded.bind(this), 200 );
	checkRoomLoaded.apply(this);

};

/**
 * Adds a room "event" listener callback
 * @param {string} label - Name of the event to add listener to
 * @callback callback - Function to call when the event is emitted
 */
Room.prototype.on = function( label, callback ){
	if( typeof this.listeners[ label ] === "undefined" ){
		this.listeners[ label ] = [];
	}

	this.listeners[ label ].push( callback );
};

/**
 * Fire a room "event"
 * @param {string} label - Name of the event to emit to listeners
 * @param {object} parameters - Object to be passed to each listener
 */
Room.prototype.emit = function( label, parameters ){
	if( typeof this.listeners[ label ] === "undefined" ){
		return;
	}

	for( var i=0; i<this.listeners[ label ].length; i++ ){
		this.listeners[ label ][ i ].apply( this, parameters );
	}
};

/**
 * Checks if the room has loaded
 */
function checkRoomLoaded(){

	var loadingMessage = "Loading...";

	// Removes the dancing avatar loading image
	if( $('#room-loader') && $('#room-loader').html() !== loadingMessage ){
		$('#room-loader').html( loadingMessage );
	}

	// Check if loaded
	if( $('#room').length > 0 &&
		$('#plug_pro_chrome_extension_id') &&
		$('#room-loader').length === 0 &&
		$('#app-menu').find('.list')[0]
	){
		clearInterval( this.loadedCheckInterval );
		this.emit( "load" );
	}
}


module.exports = Room;