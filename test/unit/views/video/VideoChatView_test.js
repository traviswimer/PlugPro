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
});