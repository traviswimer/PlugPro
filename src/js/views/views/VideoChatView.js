/**
 * View for the PlugPro Menu
 * @module views/views/VideoChatView
 */

var VideoChatView = Backbone.View.extend(
/** @lends VideoChatView.prototype */
{
	/**
	* Creates the UI elements for chat in the video view
	* @class VideoChat view
	*
	* @augments Backbone.View
	* @constructs
	*/
	initialize: function( options ){
		var JST = window.plugPro.JST;

		this.chatHTML = JST['video_chat.html']();


	},

	id: "plugpro-videochat",

	/**
	* Renders the ProMenu UI elements to the DOM
	*/
	render: function(){
		this.$el.append( this.chatHTML );
		this.messageList = this.$el.find('.plugpro-messages');
		
		API.on( API.CHAT, this.addChatMessage.bind(this) );

	},

	addChatMessage: function( messageData ){
		var chatHTML = messageData.un +": "+ messageData.message;
		var $messageDiv = $( document.createElement('div') );
		$messageDiv.addClass("plugpro-chat-message");
		$messageDiv.html( chatHTML );
		this.messageList.append( $messageDiv );

		var renderedHeight = $messageDiv.height();
		$messageDiv.height(0);
		$messageDiv.animate({
			"height": renderedHeight + "px"
		}, 400, "easeInCubic");

		// Remove message after 30 seconds
		setTimeout( function(){
			$messageDiv.animate({
				"height": 0
			}, 400, "easeInCubic", function(){
				$messageDiv.remove();
			});
		}, 30000 );
	},

	events: {
		"submit #plugpro-chat-input-form": "sendChatMessage"
	},

	sendChatMessage: function( evt ){
		evt.preventDefault();
		
		var chatInput = $('#plugpro-chat-input-form input');
		API.sendChat( chatInput.val() );
		chatInput.val("");

		return false;
	}

});

module.exports = VideoChatView;