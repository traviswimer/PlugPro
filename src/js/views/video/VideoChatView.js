/**
 * View for the chat in video view
 * @module views/video/VideoChatView
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
	initialize: function(){
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

		this.createMinimizeChatButton();

		this.chatCallback = this.addChatMessage.bind(this);
		API.on( API.CHAT, this.chatCallback );
	},

	/**
	* Destroy the VideoChatView
	*/
	destroy: function(){
		API.off( API.CHAT, this.chatCallback );
		this.expandChat();
		this.$minimizeDiv.remove();
		this.remove();
	},

	/**
	* Adds "minimize chat" button to the DOM
	*/
	createMinimizeChatButton: function(){
		var $minimizeDiv = this.$minimizeDiv = $( document.createElement('div') );
		$minimizeDiv.addClass( 'plugpro-minimize-chat-button' );
		$minimizeDiv.html( "Minimize Chat" );
		$('.app-right').append( $minimizeDiv );
		$minimizeDiv.css({
			"left": -115 + "px",
			"opacity": 0
		});
		$minimizeDiv.click( this.minimizeChat.bind(this) );
	},

	/**
	* Adds a chat message and sets timer to fade out
	* @param {object} messageData - Message data received from plug's API
	*/
	addChatMessage: function( messageData ){
		var chatHTML = messageData.un +": "+ messageData.message;
		var $messageDiv = $( document.createElement('div') );
		$messageDiv.addClass("plugpro-chat-message");
		$messageDiv.html( chatHTML );
		this.messageList.append( $messageDiv );

		// Have message expand-in
		var renderedHeight = $messageDiv.height();
		$messageDiv.height(0);
		$messageDiv.animate({
			"height": renderedHeight + "px"
		}, 300, "linear");

		// Have message shrink-out after 30 seconds
		setTimeout( this.animateMessageOut.bind( this, $messageDiv ), 30000 );
	},

	/**
	* Make chat message fade out
	* @param {object} $message - jQuery object for the message DOM element
	*/
	animateMessageOut: function( $message ){
		$message.animate(
			{
				"height": 0
			},
			300,
			"linear",
			$message.remove.bind( $message )
		);
	},

	events: {
		"submit #plugpro-chat-input-form": "sendChatMessage",
		"click .plugpro-expand-chat-button": "expandChat"
	},

	/**
	* Make chat message fade out
	* @param {object} evt - Chat form submit event object
	*/
	sendChatMessage: function( evt ){
		evt.preventDefault();
		
		var chatInput = $('#plugpro-chat-input-form input');
		API.sendChat( chatInput.val() );
		chatInput.val("");

		return false;
	},

	/**
	* Make chat message fade out
	* @param {object} evt - Event object from clicking "expand chat" button
	*/
	expandChat: function( evt ){
		this.$el.css({
			"right": ($('.app-right').width() * -1) + "px"
		});

		$('.app-right').find('.plugpro-minimize-chat-button').css({
			"right": ($('.app-right').width() * -1) + "px",
			"opacity": ""
		});

		$('.app-right').css({
			"right": 0 + "px"
		});
	},

	/**
	* Make chat message fade out
	* @param {object} evt - Event object from clicking "minimize chat" button
	*/
	minimizeChat: function( evt ){
		$('.app-right').css({
			"right": ($('.app-right').width() * -1) + "px"
		});

		$('.app-right').find('.plugpro-minimize-chat-button').css({
			"opacity": 0
		});

		this.$el.css({
			"right": 15 + "px"
		});
	}

});

module.exports = VideoChatView;