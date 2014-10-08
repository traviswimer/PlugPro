'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require("sinon");

var rewire = require('../../../rewire_helper');
var VideoChatView = rewire('views/video/VideoChatView');

window.plugPro = {};
Backbone.$ = $;

describe("VideoChatView", function(){

	var videoChatView;
	var fakeVideoChatHTML = "video chat";

	beforeEach(function(){

		window.plugPro.JST['video_chat.html'] = function(){
			return fakeVideoChatHTML;
		}

		videoChatView = new VideoChatView();
	});

	describe("initialize()", function(){

		it("should set chatHTML", function(){
			expect( videoChatView.chatHTML ).to.equal( fakeVideoChatHTML );
		});

	});

	describe("render()", function(){

		beforeEach(function(){
			sinon.stub( API, "on" );
			sinon.stub( videoChatView, "createMinimizeChatButton" );
		});

		afterEach(function(){
			API.on.restore();
			videoChatView.createMinimizeChatButton.restore();
		});

		it("should append chatHTML", function(){
			videoChatView.render();
			expect( videoChatView.el.innerHTML ).to.equal( fakeVideoChatHTML );
		});

		it("should set messageList", function(){
			videoChatView.render();
			expect( videoChatView.messageList ).to.not.be.undefined;
		});

		it("should call createMinimizeChatButton", function(){
			videoChatView.render();
			expect( videoChatView.createMinimizeChatButton.calledOnce ).to.be.true;
		});

		it("should set handler for chat messages", function(){
			videoChatView.render();
			expect( API.on.calledWith(API.CHAT) ).to.be.true;
		});

	});

	describe("destroy()", function(){

		beforeEach(function(){
			videoChatView.$minimizeDiv = {
				remove: function(){}
			};
			sinon.stub( videoChatView.$minimizeDiv, "remove" );
			sinon.stub( videoChatView, "remove" );
			sinon.stub( videoChatView, "expandChat" );
			sinon.stub( API, "off" );
		});

		afterEach(function(){
			videoChatView.$minimizeDiv.remove.restore();
			videoChatView.remove.restore();
			videoChatView.expandChat.restore();
			API.off.restore();
		});

		it("should remove chat listener", function(){
			videoChatView.destroy();
			expect( API.off.calledOnce ).to.be.true;
		});

		it("should expand chat", function(){
			videoChatView.destroy();
			expect( videoChatView.expandChat.calledOnce ).to.be.true;
		});

		it("should remove minimize button", function(){
			videoChatView.destroy();
			expect( videoChatView.$minimizeDiv.remove.calledOnce ).to.be.true;
		});

		it("should remove the whole chat view", function(){
			videoChatView.destroy();
			expect( videoChatView.remove.calledOnce ).to.be.true;
		});

	});

	describe("createMinimizeChatButton()", function(){

		beforeEach(function(){
			$('body').html("<div class='app-right'></div>");
			sinon.stub( videoChatView, "minimizeChat" );
		});

		afterEach(function(){
			videoChatView.minimizeChat.restore();
		});

		it("should add button", function(){
			videoChatView.createMinimizeChatButton();
			expect( $('.plugpro-minimize-chat-button').length ).to.equal( 1 );
		});

		it("should call minimizeChat on click", function(){
			videoChatView.createMinimizeChatButton();
			$('.plugpro-minimize-chat-button').click();
			expect( videoChatView.minimizeChat.calledOnce ).to.be.true;
		});

	});

	describe("addChatMessage()", function(){

		beforeEach(function(){
			$('body').html("<div class='messages'></div>");
			videoChatView.messageList = $('.messages');
		});

		it("should add message", function(){
			var fakeMessage = {
				un: "fakeUserName",
				message: "fakeMessage"
			};
			videoChatView.addChatMessage( fakeMessage );
			expect( $('.plugpro-chat-message').length ).to.equal( 1 );
		});

	});

	describe("animateMessageOut()", function(){

		it("should call message.animate", function(){
			$('body').html("<div class='message'></div>");
			var fakeMessage = $('.message');
			sinon.stub( fakeMessage, "animate" );
			videoChatView.animateMessageOut( fakeMessage );

			expect( fakeMessage.animate.calledOnce ).to.be.true;

			fakeMessage.animate.restore();
		});

	});

	describe("sendChatMessage()", function(){
		var fakeValue;
		var fakeEvent;

		beforeEach(function(){
			fakeValue = "fakeValue";
			$('body').html("<div id='plugpro-chat-input-form'><input type='text' value='"+ fakeValue +"'></div>");
			
			fakeEvent = {
				preventDefault: function(){}
			};

			API.sendChat = function(){};
			sinon.stub( API, "sendChat" );
			sinon.stub( fakeEvent, "preventDefault" );
		});

		afterEach(function(){
			API.sendChat.restore();
			fakeEvent.preventDefault.restore();
		});

		it("should prevent form submission", function(){

			var returnVal = videoChatView.sendChatMessage( fakeEvent );

			expect( fakeEvent.preventDefault.calledOnce ).to.be.true;
			expect( returnVal ).to.be.false;

		});

		it("should send chat message with API", function(){
			videoChatView.sendChatMessage( fakeEvent );

			expect( API.sendChat.calledWith( fakeValue ) ).to.be.true;
		});

		it("should clear input box", function(){
			videoChatView.sendChatMessage( fakeEvent );

			expect( API.sendChat.calledOnce ).to.be.true;
		});

	});

	describe("expandChat()", function(){

		beforeEach(function(){
			$('body').html("<div class='app-right'><div class='plugpro-minimize-chat-button'></div></div>");
		
			$('.app-right').width( 100 );
			$('.app-right').css({
				"right": "20px"
			})
		});

		it("should move minimize button to show full width", function(){
			videoChatView.expandChat();

			var $button = $('.app-right').find('.plugpro-minimize-chat-button');

			var right = $button.css('right');
			expect( right ).to.equal( '-100px' );
		});

		it("should move chat to the far right of screen", function(){
			videoChatView.expandChat();

			expect( $('.app-right').css('right') ).to.equal( '0px' );
		});

	});

	describe("minimizeChat()", function(){

		beforeEach(function(){
			$('body').html("<div class='app-right'><div class='plugpro-minimize-chat-button'></div></div>");
		
			$('.app-right').width( 100 );
		});

		it("should move chat off the screen", function(){
			videoChatView.minimizeChat();

			expect( $('.app-right').css('right') ).to.equal( '-100px' );
		});

	});
});