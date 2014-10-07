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

		this.createMinimizeChatButton();

		API.on( API.CHAT, this.addChatMessage.bind(this) );
	},

	createMinimizeChatButton: function(){
		var $minimizeDiv = $( document.createElement('div') );
		$minimizeDiv.addClass( 'plugpro-minimize-chat-button' );
		$minimizeDiv.html( "Minimize Chat" );
		$('.app-right').append( $minimizeDiv );
		$minimizeDiv.css({
			"left": -115 + "px",
			"opacity": 0
		});
		$minimizeDiv.click( this.minimizeChat.bind(this) );
	},

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
		}, 400, "easeInCubic");

		// Have message shrink-out after 30 seconds
		setTimeout( function(){
			$messageDiv.animate({
				"height": 0
			}, 400, "easeInCubic", function(){
				$messageDiv.remove();
			});
		}, 30000 );
	},

	events: {
		"submit #plugpro-chat-input-form": "sendChatMessage",
		"click .plugpro-expand-chat-button": "expandChat"
	},

	sendChatMessage: function( evt ){
		evt.preventDefault();
		
		var chatInput = $('#plugpro-chat-input-form input');
		API.sendChat( chatInput.val() );
		chatInput.val("");

		return false;
	},

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