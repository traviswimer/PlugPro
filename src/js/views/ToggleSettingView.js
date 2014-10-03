/**
 * View for the PlugPro Menu
 * @module views/ToggleSettingView
 */

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
		var JST = window.plugPro.JST;
		
		this.toggleHTML = JST['toggle_setting.html']({
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
		
		if( this.setting.toggler.isOn === true ){
			this.$el.find('input[type="checkbox"]').prop('checked', true);
		}
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