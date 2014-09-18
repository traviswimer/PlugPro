/**
 * View for the PlugPro Menu
 * @module views/ToggleSettingView
 */

var JST = require("../templates").JST;

var ToggleSettingView = Backbone.View.extend(
/** @lends ToggleSettingView.prototype */
{
	/**
	* UI View for toggle settings
	* @class Toggle settings view
	*
	* @augments Backbone.View
	* @constructs
	* @param {string} name - The setting name
	* @param {object} toggler - The toggler object
	*/
	initialize: function( options ){
		this.toggleHTML = JST['src/html_templates/toggle_setting.html']({
			title: options.name
		});

		this.setting = options.setting;
	},

	tagName: "li",

	events: {
		'change input[type="checkbox"]': 'toggleSetting'
	},

	/**
	* Renders the ProMenu UI elements to the DOM
	*/
	render: function(){
		this.$el.append( this.toggleHTML );
	},

	/**
	* Toggles the current state of the setting
	*/
	toggleSetting: function(){
		console.log("Checkbox toggled");
		this.setting.toggler.toggle();
	}

});

module.exports = ToggleSettingView;