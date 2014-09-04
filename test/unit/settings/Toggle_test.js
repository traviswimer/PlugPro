'use strict';

var chai = require('chai');
var expect = chai.expect;

var requireHelper = require('../../require_helper');
var Toggle = requireHelper('settings/Toggle');

describe("Toggle", function(){

	var toggle;


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

	describe("methods", function(){

		var storage = {};

		beforeEach(function(){
			toggle = new Toggle( true, storage );
		});

		it("should toggle state on toggle()", function(){
			expect( toggle.isOn ).to.be.true;
			toggle.toggle();
			expect( toggle.isOn ).to.be.false;
			toggle.toggle();
			expect( toggle.isOn ).to.be.true;
		});

		it("should call listeners onChange()", function(){
			var changed;
			toggle.onChange(function( isOn ){
				changed = isOn;
			});
			toggle.toggle();
			expect( changed ).to.be.false;
			toggle.toggle();
			expect( changed ).to.be.true;
		});

		it("should not add listeners if no onChange() callback", function(){
			var changed;
			toggle.onChange();
			expect( toggle.listeners.change.length ).to.equal( 0 );
		});

	});

});