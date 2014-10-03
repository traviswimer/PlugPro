/**
 * View for the PlugPro Menu
 * @module views/MenuView
 */

var ToggleSettingView = require('./ToggleSettingView');

var MenuView = Backbone.View.extend(
/** @lends MenuView.prototype */
{
	/**
	* Creates the UI elements of the ProMenu
	* @class ProMenu view
	*
	* @augments Backbone.View
	* @constructs
	* @param {object} JST - Javascript HTML templates
	* @param {object} toggleSettings - List of settings and their corresponding togglers
	*/
	initialize: function( options ){
		var JST = window.plugPro.JST;
		console.log(JST);

		var toggleSettings = options.toggleSettings;

		this.menuHTML = JST['menu.html']({
			chromeDir: 'chrome-extension://' + $('#plug_pro_chrome_extension_id').val()
		});

		this.settingViews = [];
		var setting;
		for( setting in toggleSettings ){
			this.settingViews.push( new ToggleSettingView({
				name: setting,
				setting: toggleSettings[setting]
			}) );
		}

	},

	id: "plugpro-menu",

	/**
	* Renders the ProMenu UI elements to the DOM
	*/
	render: function(){
		this.$el.append( this.menuHTML );
		this.syncWithMainPlugMenu();

		var $toggleSettingList = this.$el.find('#pro-toggle-settings');

		for( var i=0; i<this.settingViews.length; i++ ){
			$toggleSettingList.append( this.settingViews[i].el );
			this.settingViews[i].render();
		}
	},

	/**
	* Makes ProMenu open/close with the main Plug.dj menu
	*/
	syncWithMainPlugMenu: function(){
		// Detect Plug.DJ menu animations to trigger Pro menu open/close
		$('#app-menu').find('.list')[0].addEventListener(
			this.getTransitionEvent(),
			this.updateVisibility.bind(this),
			false
		);

		// Prevent menu from closing when clicking in the Pro Menu
		document.addEventListener("mousedown", function(event){
			var target = $(event.target);
			if(
				event.target.id === "plugpro-menu" ||
				target.parents('#plugpro-menu').length > 0
			){
				event.stopPropagation();
			}
		}, true);
	},

	/**
	* Shows/hides ProMenu based on the current state of the main Plug.dj menu
	*/
	updateVisibility: function(){
		var left = $('#app-menu').find('.list').css("left");
		if( left === "0px" ){
			$('#plugpro-menu').addClass("expanded");
		}else{
			$('#plugpro-menu').removeClass("expanded");
		}
	},


	/**
	* Determine correct transition event name
	* @returns {string} The name of the transition event used by the user's browser
	*/
	getTransitionEvent: function( el ){
		var el = el || document.createElement('div');
		var animations = {
			'animation':'transitionend',
			'OAnimation':'oTransitionEnd',
			'MozAnimation':'transitionend',
			'WebkitAnimation':'webkitTransitionEnd'
		};

		for(var t in animations){
			if( el.style[t] !== undefined ){
				return animations[t];
			}
		}
	}

});

module.exports = MenuView;