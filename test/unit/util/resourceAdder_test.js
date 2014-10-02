'use strict';

var chai = require('chai');
var expect = chai.expect;

var rewireHelper = require('../../rewire_helper');
var resourceAdder = rewireHelper('util/resourceAdder');

describe("resourceAdder", function(){

	describe("scripts", function(){

		beforeEach(function(){
			resourceAdder.addScript('test.js');
		});

		it("should add", function(){
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
	});
});