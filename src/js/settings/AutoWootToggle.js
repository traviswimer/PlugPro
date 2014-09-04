/**
 * Stores the state of the Auto-Woot setting
 * @module settings/AutoWootToggle
 */

/**
 * AutoWoot setting constructor
 * @constructor
 * @param {object} toggler - The Toggle API used to keep track of state.
 */
function AutoWoot( toggler, userId ){
	this.toggler = toggler || {};
	this.userId = userId;
	this.localStorageName = "autowoot";

	toggler.onChange( this.setWootState.bind( this ) );

	if( toggler.isOn ){
		this.startWooting();
	}

	/*
	this.onChange = function(isOn){
		if(isOn){
			startWooting();
			API.on(API.DJ_ADVANCE, startWooting);
		}else{
			API.off(API.DJ_ADVANCE, startWooting);
		}
	};

	// Initialize if setting is already turned on
	if(this.isOn){
		this.onChange(this.isOn);
	}
	*/
}

/**
 * Sets auto-woot to ON/OFF
 * @param {boolean} isOn - true to turn auto-woot on, false to turn it off
 */
AutoWoot.prototype.setWootState = function( isOn ){
	if( isOn ){
		this.startWooting.apply(this);
		API.on( API.DJ_ADVANCE, this.startWooting.bind(this) );
	}else{
		API.off( API.DJ_ADVANCE, this.startWooting.bind(this) );
	}
};

/**
 * Determines when to start wooting for current song
 * @param {object} newSongInfo - Info about the newly started song. (Provided by Plug.dj API)
 */
AutoWoot.prototype.startWooting = function( newSongInfo ){

	var wootButton = $('#woot');

	// Immediately start wooting if the user just turned the feature on
	if( !newSongInfo ){
		wootButton.click();
		return;
	}

	// No need to woot for yourself
	if( newSongInfo.dj.id === this.userId ){
		return;
	}

	// woot at a random time in the first 35 seconds of each song
	var randTimeout = Math.round( 35 * Math.random() ) * 1000;
	setTimeout(wootButton.click, randTimeout);

	return randTimeout;
};

module.exports = AutoWoot;