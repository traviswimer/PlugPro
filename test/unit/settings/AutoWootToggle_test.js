'use strict';

var chai = require('chai');
var expect = chai.expect;

var requireHelper = require('../../require_helper');
var AutoWootToggle = requireHelper('settings/AutoWootToggle');
var Toggle = requireHelper('settings/Toggle');

describe("AutoWootToggle", function(){

	var autoWoot;


	describe("startWooting()", function(){
		/*var toggle;
		var toggleStub;

		beforeEach(function(){
			toggle = new Toggle();
			toggleStub = sinon.stub(toggle, "method");
			autoWoot = new AutoWootToggle();
		});*/

		var wootButton;

		beforeEach(function(){
			wootButton = document.createElement("div");
			wootButton.id = "woot";
			$('body').append( wootButton );
		});

		afterEach(function(){
			$('body').html("");
		});

		it("should immediately woot if no song info (Setting just turned on)", function( done ){
			$(wootButton).click(function(){
				done();
			});

			autoWoot = new AutoWootToggle();
			autoWoot.startWooting();
		});

		it("should not woot for yourself", function(){

			var wooted = false;
			$(wootButton).click(function(){
				wooted = true;
			});

			var userId = 10;
			autoWoot = new AutoWootToggle( {}, userId );
			autoWoot.startWooting({
				dj: {
					id: userId
				}
			});

			expect( wooted ).to.be.false;

		});

		it("should normally woot at random time", function(){

			var userId = 10;
			autoWoot = new AutoWootToggle( {}, userId );
			var randTime = autoWoot.startWooting({
				dj: {
					id: 11
				}
			});

			expect( randTime ).to.not.be.undefined;

		});


	});

});