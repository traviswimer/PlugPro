
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
				}
			};

			saveLocalStorage();
		}else{
			lsData = JSON.parse( localStorage[ lsName ] );
		}
	},
	getSetting: function( name ){
		return lsData.setting[ name ];
	},
	setSetting: function( name, value ){
		lsData.setting[ name ] = value;
		saveLocalStorage();
	},
	getViewSizes: function( view, element ){
		return lsData.viewSizes[ view ][element];
	},
	setViewSizes: function( view, element, value ){
		lsData.viewSizes[ name ][element] = value;
		saveLocalStorage();
	}
}