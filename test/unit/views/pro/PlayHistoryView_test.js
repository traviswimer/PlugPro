'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require("sinon");

var rewire = require('../../../rewire_helper');
var PlayHistoryView = rewire('views/pro/PlayHistoryView');

window.plugPro = {};
Backbone.$ = $;

describe("PlayHistoryView", function(){

	var playHistoryView;

	beforeEach(function(){
		window.plugPro.JST['play_history.html'] = function(){};
		playHistoryView = new PlayHistoryView();
	});

	describe("initialize()", function(){

		it("should define html template", function(){
			expect( playHistoryView.historyHTML ).to.not.be.undefined;
		});

	});


	describe("render()", function(){

		beforeEach(function(){
			API.getHistory = function(){
				return [{},{}];
			};
			sinon.stub( playHistoryView, "appendSong" );
		});

		afterEach(function(){
			playHistoryView.appendSong.restore();
		});

		it("should append all songs", function(){
			playHistoryView.render();

			expect( playHistoryView.appendSong.calledTwice ).to.be.true;
		});

	});


	describe("appendSong()", function(){

		var fakeTemplate = "history_template";

		beforeEach(function(){

			sinon.stub( playHistoryView, "historyHTML", function(){
				return fakeTemplate
			});
			sinon.stub( playHistoryView.$el, "append" );
		});

		afterEach(function(){
			playHistoryView.$el.append.restore();
			playHistoryView.historyHTML.restore();
		});

		it("should append song template", function(){
			playHistoryView.appendSong({});

			expect( playHistoryView.$el.append.calledWith( fakeTemplate ) ).to.be.true;
		});

	});


	describe("destroy()", function(){

		beforeEach(function(){
			sinon.stub( playHistoryView, "remove" );
		});

		afterEach(function(){
			playHistoryView.remove.restore();
		});

		it("should remove the entire view", function(){
			playHistoryView.destroy();

			expect( playHistoryView.remove.called ).to.be.true;
		});

	});

});