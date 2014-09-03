'use strict';

var chai = require('chai');
var expect = chai.expect;

var requireHelper = require('../../require_helper');
var Toggle = requireHelper('settings/Toggle');

describe("Toggle", function(){

	var toggle;

	beforeEach(function(){
	});

	describe("constructor", function(){

		it("should set defaults if parameters empty", function(){
			toggle = new Toggle();
			expect( toggle.isOn ).to.be.false;
			expect( toggle.storage ).to.be.undefined;
		});

		it("should set defaults from parameters", function(){
			var storage = {};
			toggle = new Toggle( true, storage );
			expect( toggle.isOn ).to.be.true;
			expect( toggle.storage ).to.equal( storage );
		});

	});

});