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
		userListView = new UserListView();
	});

	describe("initialize()", function(){

		it("should define html template", function(){
			expect( userListView.userlistHTML ).to.equal( fakeTemplate );
		});

	});

});