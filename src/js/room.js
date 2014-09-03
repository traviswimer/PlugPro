
// Room constructor
function Room(){
	this.listeners = {};

	this.init();
}

// Initializes checking if application ("room") has loaded
Room.prototype.init = function(){

	// A messy way to check if the app has completed loading
	this.loadedCheckInterval = setInterval( this.checkRoomLoaded.bind(this), 200 );
	this.checkRoomLoaded();

};

// chceks if application ("room") has loaded
Room.prototype.checkRoomLoaded = function(){

	var loadingMessage = "Loading...";

	// Removes the dancing avatar loading image
	if( $('#room-loader') && $('#room-loader').html() !== loadingMessage ){
		$('#room-loader').html( loadingMessage );
	}

	// Check if loaded
	if( $('#room').length > 0 &&
		$('#plug_pro_chrome_extension_id')
	){
		clearInterval( this.loadedCheckInterval );
		this.emit( "load" );
	}
};

// Add a room "event" callback
Room.prototype.on = function( label, callback ){
	if( typeof this.listeners[ label ] === "undefined" ){
		this.listeners[ label ] = [];
	}

	this.listeners[ label ].push( callback );
};

// Fire a room "event"
Room.prototype.emit = function( label, parameters ){
	if( typeof this.listeners[ label ] === "undefined" ){
		return;
	}

	for( var i=0; i<this.listeners[ label ].length; i++ ){
		this.listeners[ label ][ i ].apply( this, parameters );
	}
};

module.exports = new Room();