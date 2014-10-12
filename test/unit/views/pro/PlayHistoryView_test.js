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

		it("should append all songs", function(){
			playHistoryView.render();

			expect( playHistoryView.appendSong.calledTwice ).to.be.true;
		});

	});

});