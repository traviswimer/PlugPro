'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require("sinon");

var rewire = require('../../rewire_helper');
var ViewButtonsView = rewire('views/ViewButtonsView');

window.plugPro = {};
var templateLoader = require('../../template_loader');
Backbone.$ = $;

describe("ViewButtonsView", function(){

	var JST;
	var viewButtonsView;
	var fakeToggleSettings;


	beforeEach(function(){
		ViewButtonsView.__set__( "VideoView", Backbone.View.extend() );

		window.plugPro.JST['view_buttons.html'] = function(){
			return "view_buttons";
		};

		viewButtonsView = new ViewButtonsView();

	});

	describe("initialize()", function(){

		it("should set buttonsHTML", function(){
			expect( viewButtonsView.buttonsHTML ).to.not.be.undefined;
		});

	});

	describe("render()", function(){

		beforeEach(function(){
			sinon.stub( viewButtonsView, "loadView" );
		});

		afterEach(function(){
			viewButtonsView.loadView.restore();
		});

		it("should append buttons", function(){
			viewButtonsView.render();
			expect( viewButtonsView.el.innerHTML ).to.equal( window.plugPro.JST['view_buttons.html']() );
		});

		it("should load initial view", function(){
			viewButtonsView.render();
			expect( viewButtonsView.loadView.calledOnce ).to.be.true;
		});

	});

	describe("handleButtonClick()", function(){

		beforeEach(function(){
			sinon.stub( viewButtonsView, "loadView" );
		});

		afterEach(function(){
			viewButtonsView.loadView.restore();
		});

		it("should call loadView if valid view", function(){
			$('body').html("<div id='fake-button1' data-view-name='video'></div>");
			$('body').append("<div id='fake-button2' data-view-name='avatars'></div>");
			
			var fakeEvent = {
				currentTarget: $('#fake-button1')[0]
			};
			viewButtonsView.handleButtonClick( fakeEvent );
			expect( viewButtonsView.loadView.calledOnce ).to.be.true;
			
			fakeEvent = {
				currentTarget: $('#fake-button2')[0]
			};
			viewButtonsView.handleButtonClick( fakeEvent );
			expect( viewButtonsView.loadView.calledTwice ).to.be.true;
		});


		it("should not call loadView if not valid view", function(){
			$('body').html("<div id='fake-button' data-view-name='invalid-view'></div>");
			var fakeEvent = {
				currentTarget: $('#fake-button')[0]
			};
			viewButtonsView.handleButtonClick( fakeEvent );
			expect( viewButtonsView.loadView.called ).to.be.false;
		});

	});


	describe("loadView()", function(){

		var fakeView;

		beforeEach(function(){
			fakeView = {
				render: function(){}
			};
			sinon.stub( fakeView, "render" );
			sinon.stub( viewButtonsView, "removeCurrentView" );
		});

		afterEach(function(){
			viewButtonsView.removeCurrentView.restore();
			fakeView.render.restore();
		});

		it("should remove current view", function(){
			viewButtonsView.loadView( fakeView );
			expect( viewButtonsView.removeCurrentView.calledOnce ).to.be.true;
		});

		it("should set new current view", function(){
			viewButtonsView.loadView( fakeView );
			expect( viewButtonsView.currentView ).to.equal( fakeView );
		});

		it("should render new view", function(){
			viewButtonsView.loadView( fakeView );
			expect( fakeView.render.calledOnce ).to.be.true;
		});

	});


	describe("removeCurrentView()", function(){

		it("should destroy current view", function(){

			viewButtonsView.currentView = {
				destroy: function(){}
			};
			sinon.stub( viewButtonsView.currentView, "destroy" );

			viewButtonsView.removeCurrentView();
			expect( viewButtonsView.currentView.destroy.calledOnce ).to.be.true;

			viewButtonsView.currentView.destroy.restore();
		});

		it("should not call destroy if current view not defined", function(){
			viewButtonsView.removeCurrentView();
		});

	});


});