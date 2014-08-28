// Room constructor
var Room = function(){
	this.listeners = {};

	this.checkRoomLoaded();
};

// Initializes checking if application ("room") has loaded
Room.prototype.checkRoomLoaded = function(){

	// Removes the dancing avatar loading image
	if( $('#room-loader') ){
		$('#room-loader').html( "Loading..." );
	}

	// A messy way to check if the app has completed loading
	this.loadedCheckInterval = setInterval( this.checkRoomLoaded, 200 );
	this.checkRoomLoaded();

};

// chceks if application ("room") has loaded
Room.prototype.checkRoomLoaded = function(){
	if( $('#room') &&
		$('#plug_pro_chrome_extension_id') &&
		document.body.style.backgroundImage
	){
		clearInterval( this.loadedCheckInterval );
		this.emit( "load" );
	}
};

// Add a room "event" callback
Room.prototype.on = function( label, callback ){
	if( typeof this.listeners === "undefined" ){
		this.listeners[ label ] = [];
	}

	this.listeners[ label ].push( callback );
};

// Fire a room "event"
Room.prototype.emit = function( label, parameters ){
	for( var i=0; i<this.listeners[ label ].length; i++ ){
		this.listeners[ label ][ i ].apply( this, parameters );
	}
};

module.exports = new Room();