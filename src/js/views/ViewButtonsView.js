/**
 * View for the Pro, Video, and avatar buttons
 * @module views/ViewButtonsView
 */

var ViewButtonsView = Backbone.View.extend(
/** @lends ViewButtonsView.prototype */
{
	/**
	* @class ViewButtonsView view
	*
	* @augments Backbone.View
	* @constructs
	*/
	initialize: function( options ){
		var JST = window.plugPro.JST;
		this.buttonsHTML = JST['view_buttons.html']();
	},

	id: "plugpro-view-buttons",

	/**
	* Renders the ProMenu UI elements to the DOM
	*/
	render: function(){
		this.$el.append( this.buttonsHTML );
	}

});

module.exports = ViewButtonsView;