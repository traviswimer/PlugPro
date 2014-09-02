'use strict';

var chai = require('chai');
var expect = chai.expect;

var requireHelper = require('../require_helper');
var room = requireHelper('room');

describe("room", function(){
	it("should exist", function(){
		expect(room).to.be;
	});
});