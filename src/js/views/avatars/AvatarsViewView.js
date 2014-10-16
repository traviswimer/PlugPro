/**
 * View for "avatar view"
 * @module views/avatars/AvatarViewView
 */

var AvatarsViewView = {
	
	/**
	* Renders the "avatar" view
	*/
	render: function(){
		$('body').addClass('plugpro-avatars');
	},
	
	/**
	* Destroys the "avatar" view
	*/
	destroy: function(){
		$('body').removeClass('plugpro-avatars');
	}

};

module.exports = AvatarsViewView;