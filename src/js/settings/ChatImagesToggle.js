/**
 * Stores the state of the Chat Images setting
 * @module settings/ChatImagesToggle
 */

/**
 * ChatImages setting constructor
 * @constructor
 * @param {object} toggler - The Toggle API used to keep track of state.
 */
function ChatImages( toggler, userId ){
	this.toggler = toggler;
	this.userId = userId;
	this.localStorageName = "chatImages";

	this.newChatCallback = this.convertUrlsToImages.bind( this );

	this.urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.//=]*[jpg|jpeg|gif|png|JPG|JPEG|GIF|PNG])/g;

	toggler.onChange( this.setState.bind( this ) );

	if( toggler.isOn ){
		this.setState( true );
	}

}

/**
 * Sets chat images to ON/OFF
 * @param {boolean} isOn - true to turn chat images on, false to turn it off
 */
ChatImages.prototype.setState = function( isOn ){
	if( isOn ){
		API.on( API.CHAT, this.newChatCallback );
	}else{
		API.off( API.CHAT, this.newChatCallback );
	}
};

/**
 * Converts Urls in chat to images
 * @param {object} newSongInfo - Info about the newly started song. (Provided by Plug.dj API)
 */
ChatImages.prototype.convertUrlsToImages = function( chatData ){
	var chatId = chatData.cid;
	var message = chatData.message;

	// Check for image URLs
	var imgArray = message.match( this.urlRegex );

	imgArray = imgArray || [];

	for( var imgC=1; imgC<imgArray.length; imgC++ ){
		this.checkValidImage(imgArray[imgC], chatId);
	}
};

ChatImages.prototype.checkValidImage = function( imgUrl, chatId ){
	var JST = window.plugPro.JST;

	var that = this;
	var $imageLink = $('#chat-messages > div[data-cid="'+chatId+'"] a[href="'+imgUrl+'"]');

	$imageLink.replaceWith( JST['chat_image.html']({
		imgUrl: imgUrl,
		chromeDir: 'chrome-extension://' + window.plugPro.id
	}) );



	var img = new Image();
	img.onerror = function(){
		img = undefined;
	};

	img.onload = function(){
		that.addImageToChat(img, chatId);
	};

	img.className = "plugpro-chat-image";
	img.src = imgUrl;

}

ChatImages.prototype.addImageToChat = function( img, chatId ){
	var chatScroller = document.getElementById("chat-messages");

	// I have no clue why 1 pixel needs to be added, but it seems to work.
	var currentChatScroll = chatScroller.scrollHeight - chatScroller.scrollTop - chatScroller.offsetHeight + 1;

	var chatContainer = $('#chat-messages > div[data-cid='+chatId+']');

	if( chatContainer ){
		var imageContainer = chatContainer.find('.plugpro-chat-image-container');

		var $closeButton = chatContainer.find('.plugpro-chat-image-close');
		$closeButton.show();

		var $imageUrl = chatContainer.find('.plugpro-chat-image-url');
		var $imageWrapper = chatContainer.find('.plugpro-image-wrapper');

		$closeButton.click(function(){
			$imageWrapper.remove();
			$imageUrl.show();
		});

		imageContainer.find('.plugpro-chat-image-spinner').remove();
		$imageWrapper.append(img);

		//$closeButton.css( "left", $(img).width() );
	}

	// If currently scrolled to bottom, keep it that way when the 
	// image expands the box
	if(currentChatScroll === 0){
		chatScroller.scrollTop = chatScroller.scrollHeight;
	}
}

module.exports = ChatImages;