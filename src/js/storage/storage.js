
var lsName = "plugPro";
var lsData;

function saveLocalStorage(){
	localStorage[ lsName ] = JSON.stringify( lsData );
}

module.exports = {
	init: function(){
		if( typeof localStorage[ lsName ] === "undefined" ){
			lsData = {
				settings: {
					currentView: "pro"
				},
				viewSizes: {
					"pro": {},
					"video": {},
					"avatars": {}
				},
				lastVersionUsed: "0.0.0"
			};

			saveLocalStorage();
		}else{
			lsData = JSON.parse( localStorage[ lsName ] );
		}
	},
	getSetting: function( name ){
		return lsData.settings[ name ];
	},
	setSetting: function( name, value ){
		lsData.settings[ name ] = value;
		saveLocalStorage();
	},
	getViewSizes: function( view, element ){
		return lsData.viewSizes[ view ][element];
	},
	setViewSizes: function( view, element, value ){
		lsData.viewSizes[ name ][element] = value;
		saveLocalStorage();
	},
	getVersion: function(){
		var lastVersionsUsed = lsData.lastVersionUsed;
		lsData.lastVersionUsed = window.plugPro.version;
		saveLocalStorage();

		return lastVersionsUsed;
	}
}