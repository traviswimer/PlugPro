/**
 * View for "avatar view"
 * @module views/views/AvatarViewView
 */

var AvatarsViewView = {
	
	/**
	* Renders the "avatar" view
	*/
	render: function(){
		$('body').addClass('plugpro-avatars');
	},

	destroy: function(){
		$('body').removeClass('plugpro-avatars');
	}

};

module.exports = AvatarsViewView;