'use strict';

var chai = require('chai');
var expect = chai.expect;

var requireHelper = require('../../require_helper');
var resourceAdder = requireHelper('util/resourceAdder');

describe("resourceAdder", function(){

	describe("scripts", function(){
		it("should add", function(){
			resourceAdder.addScript('test.js');
			expect( $("script[src*='test.js']").length ).to.equal( 1 );
		});

		it("should remove on load", function(){
			$("script[src*='test.js']")[0].onload();
			expect( $("script[src*='test.js']").length ).to.equal( 0 );
		});
	});

	describe("styles", function(){
		it("should add", function(){
			resourceAdder.addStyle('test.css');
			expect( $("link[href*='test.css']").length ).to.equal( 1 );
		});

		it("should remove on load", function(){
			$("link[href*='test.css']")[0].onload();
			expect( $("link[href*='test.css']").length ).to.equal( 0 );
		});
	});
});