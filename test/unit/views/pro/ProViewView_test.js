'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require("sinon");

var rewire = require('../../../rewire_helper');
var ProViewView = rewire('views/pro/ProViewView');

window.plugPro = {};
Backbone.$ = $;

describe("ProViewView", function(){

	var fakeWaitlistView;
	var fakeUserListView;
	var fakePlayHistoryView;

	beforeEach(function(){
		$('body').html("<div id='room'></div>");

		var FakeView = Backbone.View.extend({
			reposition: function(){},
			destroy: function(){}
		});

		ProViewView.waitlistView = new FakeView();
		ProViewView.userListView = new FakeView();
		ProViewView.playHistoryView = new FakeView();
		
	});

	afterEach(function(){
		document.body.className = "";
		$('body').html("");
	});

	describe("initialize()", function(){

		before(function(){

			fakeWaitlistView = Backbone.View.extend({
				render: function(){},
				destroy: function(){},
				reposition: function(){}
			});
			ProViewView.__set__( 'WaitlistView', fakeWaitlistView );

			fakeUserListView = Backbone.View.extend({
				render: function(){},
				destroy: function(){},
				reposition: function(){}
			});
			ProViewView.__set__( 'UserListView', fakeUserListView );

			fakePlayHistoryView = Backbone.View.extend({
				render: function(){},
				destroy: function(){},
				reposition: function(){}
			});
			ProViewView.__set__( 'PlayHistoryView', fakePlayHistoryView );

			ProViewView.waitlistView = undefined;
			ProViewView.userListView = undefined;
			ProViewView.playHistoryView = undefined;
		});

		it("should add views", function(){
			ProViewView.initialize();
			expect( ProViewView.waitlistView ).to.not.be.undefined;
			expect( ProViewView.userListView ).to.not.be.undefined;
			expect( ProViewView.playHistoryView ).to.not.be.undefined;
		});

	});

	describe("render()", function(){


		it("should add class to body", function(){
			ProViewView.render();
			expect( $('body').hasClass('plugpro-pro') ).to.be.true;
		});

		it("should add bg cover", function(){
			ProViewView.render();
			expect( $('.pro-bg-cover').length ).to.equal( 1 );
		});

		it("should add views", function(){
			sinon.stub( ProViewView.waitlistView, "render" );
			sinon.stub( ProViewView.userListView, "render" );
			sinon.stub( ProViewView.playHistoryView, "render" );

			ProViewView.render();
			
			expect( ProViewView.waitlistView.render.called ).to.be.true;
			expect( ProViewView.userListView.render.called ).to.be.true;
			expect( ProViewView.playHistoryView.render.called ).to.be.true;

			ProViewView.waitlistView.render.restore();
			ProViewView.userListView.render.restore();
			ProViewView.playHistoryView.render.restore();
		});

		it("should call reposition()", function(){
			sinon.stub( ProViewView, "reposition" );

			ProViewView.render();
			
			expect( ProViewView.reposition.called ).to.be.true;

			ProViewView.reposition.restore();
		});

	});

	describe("destroy()", function(){

		it("should destroy views", function(){
			sinon.stub( ProViewView.waitlistView, "destroy" );
			sinon.stub( ProViewView.userListView, "destroy" );
			sinon.stub( ProViewView.playHistoryView, "destroy" );

			ProViewView.destroy();

			expect( ProViewView.waitlistView.destroy.called ).to.be.true;
			expect( ProViewView.userListView.destroy.called ).to.be.true;
			expect( ProViewView.playHistoryView.destroy.called ).to.be.true;

			ProViewView.waitlistView.destroy.restore();
			ProViewView.userListView.destroy.restore();
			ProViewView.playHistoryView.destroy.restore();
		});

		it("should only clear intialization interval if it exists", function(){

			ProViewView.initialInterval = setTimeout(function(){}, 5000);
			ProViewView.destroy();

			expect( ProViewView.initialInterval ).to.be.undefined;

			ProViewView.destroy(); // This would throw an error if clear called while undefined

		});

	});


});