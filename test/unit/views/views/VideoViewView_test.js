'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require("sinon");

var rewire = require('../../../rewire_helper');
var VideoViewView = rewire('views/views/VideoViewView');

window.plugPro = {};
Backbone.$ = $;

describe("VideoViewView", function(){

	var fakeChatView;

	beforeEach(function(){
		$('body').html("");
		fakeChatView = Backbone.View.extend({
			minimizeChat: function(){},
			render: function(){}
		});
		VideoViewView.__set__( 'VideoChatView', fakeChatView );
	});

	afterEach(function(){
		document.body.className = "";
		$('body').html("");
	});

	describe("render()", function(){

		beforeEach(function(){
			$('body').html("<div id='playback'></div>");
			sinon.stub( VideoViewView, "makeActive", function(){} );
			sinon.stub( VideoViewView, "updateArtwork", function(){} );

			sinon.stub( fakeChatView.prototype, "render", function(){} );
			sinon.stub( fakeChatView.prototype, "minimizeChat", function(){} );

		});

		afterEach(function(){
			VideoViewView.makeActive.restore();
			VideoViewView.updateArtwork.restore();
		});

		it("should apply correct class to <body>", function(){
			VideoViewView.render();
			expect( $('body').hasClass('plugpro-video') ).to.be.true;
		});

		it("should add video cover to display soundcloud artwork", function(){
			VideoViewView.render();
			expect( $('#playback').find('#video-cover').length ).to.equal(1);
		});

		it("should render chat view and minimize", function(){
			VideoViewView.render();
			expect( VideoViewView.videoChatView.render.calledOnce ).to.be.true;
			expect( VideoViewView.videoChatView.minimizeChat.calledOnce ).to.be.true;
		});

		it("should call makeActive and updateArtwork", function(){
			VideoViewView.render();
			expect( VideoViewView.makeActive.calledOnce ).to.be.true;
			expect( VideoViewView.updateArtwork.calledOnce ).to.be.true;
		});

	});

	describe("makeActive()", function(){

		it("should remove inactive class", function(){
			$('body').addClass('inactive');
			VideoViewView.makeActive();
			expect( $('body').hasClass('inactive') ).to.be.false;
		});

		it("should create activeTimeout", function(){
			VideoViewView.makeActive();
			expect( VideoViewView.activeTimeout ).to.not.be.undefined;
		});

		it("should clear activeTimeout if already exists", function(){
			var fakeTimeout = setTimeout(function(){},2000);
			VideoViewView.activeTimeout = fakeTimeout;
			VideoViewView.makeActive();
			expect( VideoViewView.activeTimeout ).to.not.be.undefined;
			expect( VideoViewView.activeTimeout === fakeTimeout ).to.be.false;
		});

	});

	describe("makeInactive()", function(){

		it("should add inactive class", function(){
			VideoViewView.makeInactive();
			expect( $('body').hasClass('inactive') ).to.be.true;
		});

	});

	describe("updateArtwork()", function(){

		beforeEach(function(){
			$('body').html("<div id='video-cover'></div>");
		});

		it("should add soundcloud artwork if available", function(){
			// jsDOM seems to have a bug with setting the background-image style,
			// so this test is rather awful.

			API.getMedia = function(){
				return {
					"image": "sndcdn-large"
				}
			};

			VideoViewView.updateArtwork();

			var bgImage = $('#video-cover').css( "background-image" );
			expect( bgImage ).to.equal("");

		});

		it("should set background to none if soundcloud artwork not available", function(){

			API.getMedia = function(){
				return {
					"image": "fakeImage"
				}
			};

			VideoViewView.updateArtwork();

			var bgImage = $('#video-cover').css( "background-image" );
			expect( bgImage ).to.equal("none");

		});

	});

});