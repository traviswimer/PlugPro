/**
 * Handles adding resouces to the page
 * @module util/resourceAdder
 */


var resourceAdder = {};

/** 
 * Adds a <script> tag to the HTML <body>
 * @param {string} path - The path to the js file to be added
 */
resourceAdder.addScript = function( path ){
	var scriptElement = document.createElement('script');
	scriptElement.src = chrome.extension.getURL( path );
	scriptElement.onload = function(){
		this.parentNode.removeChild( this );
	};
	(document.body).appendChild( scriptElement );
};

/** 
 * Adds a CSS <link> tag to the HTML <head>
 * @param {string} path - The path to the css file to be added
 */
resourceAdder.addStyle = function( path ){
	var styleElement = document.createElement('link');
	styleElement.rel = "stylesheet";
	styleElement.type = "text/css";
	styleElement.href = chrome.extension.getURL( path );
	(document.head).appendChild( styleElement );
};

module.exports = resourceAdder;