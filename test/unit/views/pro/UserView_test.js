'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require("sinon");

var rewire = require('../../../rewire_helper');
var UserView = rewire('views/pro/UserView');

window.plugPro = {};
Backbone.$ = $;

describe("UserView", function(){

	var userView;
	var fakeTemplate = "fake_template";

	beforeEach(function(){
		window.plugPro.JST['user.html'] = function(){
			return fakeTemplate;
		};

		userView = new UserView();
	});

	describe("initialize()", function(){

		it("should define html template", function(){
			expect( userView.userHTML ).to.exist;
		});

	});

	describe("render()", function(){

		beforeEach(function(){
			sinon.stub( userView.$el, "addClass" );
		});

		afterEach(function(){
			userView.$el.addClass.restore();
		});

		it("should add class if necessary", function(){
			userView.model = new Backbone.Model({
				userClass: "fake"
			});
			userView.render();
			expect( userView.$el.addClass.called ).to.be.true;
		});

	});

	describe("destroy()", function(){

		beforeEach(function(){
			sinon.stub( userView, "remove" );
		});

		afterEach(function(){
			userView.remove.restore();
		});

		it("should remove entire view", function(){
			userView.destroy();
			expect( userView.remove.called ).to.be.true;
		});

	});

});