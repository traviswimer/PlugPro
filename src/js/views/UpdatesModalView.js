/**
 * View for the Updates modal
 * @module views/UpdatesModalView
 */

var UpdatesModalView = Backbone.View.extend(
/** @lends UpdatesModalView.prototype */
{
	/**
	* View for updates modal
	* @class Updates modal view
	*
	* @augments Backbone.View
	* @constructs
	*/
	initialize: function( options ){
		var JST = window.plugPro.JST;
		
		this.modalHTML = JST['updates_modal.html']({
			chromeDir: 'chrome-extension://' + window.plugPro.id,
			version: plugPro.version,
			updates: window.plugPro.updates[ plugPro.version ]
		});

	},

	events: {
		'click .plugpro-modal-close-button': 'closeModal'
	},

	/**
	* Renders the Updates Modal to the DOM
	*/
	render: function(){
		this.$el.append( this.modalHTML );
	},

	closeModal: function(){
		this.destroy();
	}

});

module.exports = UpdatesModalView;