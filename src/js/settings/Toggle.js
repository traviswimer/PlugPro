/**
 * Stores the state of boolean toggle settings
 * @module settings/Toggle
 */

/**
 * Toggle setting constructor
 * @constructor
 * @param {boolean} defaultOn - The default toggle state to use.
 * @param {object} storage - The storage API to use for saving the setting.
 */
function Toggle( defaultOn, storage ){
	this.isOn = defaultOn || false;
	this.storage = storage;

	this.listeners = {
		"change": []
	};
}

/** 
 * Toggles the state (ON/OFF)
 */
Toggle.prototype.toggle = function(){
	if(this.isOn){
		this.off();
	}else{
		this.on();
	}
};


/** 
 * Sets toggle state to ON
 */
Toggle.prototype.on = function(){
	this.isOn = true;
	this.callChange();
	this.saveSetting();
};

/** 
 * Sets toggle state to OFF
 */
Toggle.prototype.off = function(){
	this.isOn = false;
	this.callChange();
	this.saveSetting();
};

/** 
 * Fires change event
 */
Toggle.prototype.callChange = function(){
	for( var i=0; i<this.listeners.change.length; i++ ){
		this.listeners.change[i]( this.isOn );
	}
};

/** 
 * Adds function to call when toggle state changes
 */
Toggle.prototype.onChange = function( callback ){
	if( typeof callback === "function" ){
		this.listeners.change.push( callback );
	}
};

/** 
 * Stores the current ON/OFF state
 */
Toggle.prototype.saveSetting = function(){
	/*if( typeof this.localStorageName === "string" ){
		this.storage.set(this.localStorageName, this.isOn);
	}*/
};


module.exports = Toggle;
