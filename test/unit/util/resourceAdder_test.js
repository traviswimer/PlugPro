'use strict';

var chai = require('chai');
var expect = chai.expect;

var requireHelper = require('../../require_helper');
var resourceAdder = requireHelper('util/resourceAdder');

describe("resourceAdder", function(){

	it("should add scripts", function(){
		resourceAdder.addScript('test.js');
		expect( $("script[src*='test.js']").length ).to.equal( 1 );
	});

	it("should add styles", function(){
		resourceAdder.addStyle('test.css');
		expect( $("link[href*='test.css']").length ).to.equal( 1 );
	});
});