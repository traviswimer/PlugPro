/**
 * UI for the PlugPro Menu
 * @module settings/AutoWootToggle
 */

/**
 * Menu UI constructor
 * @constructor
 */
function Menu( JST ){
	this.$parent = $('#app-menu');

	var menuHTML = JST['src/html_templates/menu.html']({
		chromeDir: "chromeDir"
	});
	this.$parent.append( menuHTML );
}

module.exports = Menu;