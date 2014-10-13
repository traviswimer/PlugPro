'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require("sinon");

var rewire = require('../../../rewire_helper');
var UserListView = rewire('views/pro/UserListView');

window.plugPro = {};
Backbone.$ = $;

describe("UserListView", function(){

	var userListView;
	var fakeTemplate = "fake_template";

	beforeEach(function(){
		window.plugPro.JST['userlist.html'] = function(){
			return fakeTemplate;
		};

		var FakeCollection = Backbone.Collection.extend();
		var FakeView = Backbone.View.extend();

		UserListView.__set__( "UserListCollection", FakeCollection );
		UserListView.__set__( "UserView", FakeView );

		userListView = new UserListView();
	});

	describe("initialize()", function(){

		it("should define html template", function(){
			expect( userListView.userlistHTML ).to.equal( fakeTemplate );
		});

		it("should initialize collection", function(){
			expect( userListView.userListCollection ).to.exist;
		});

	});

	describe("render()", function(){

		beforeEach(function(){
			sinon.stub( userListView.userListCollection, "fetch" );
			sinon.stub( userListView.userListCollection, "each", function( callback ){
				callback({});
			});
			sinon.stub( userListView, "appendUser" );
		});

		it("should fetch collection", function(){
			userListView.render();
			expect( userListView.userListCollection.fetch.called ).to.be.true;
		});

	});

});