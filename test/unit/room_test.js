'use strict';

var chai = require('chai');
var expect = chai.expect;

var requireHelper = require('../require_helper');
var room = requireHelper('room');

describe("room", function(){

	var emitted = false;

	it("should add listeners", function(){

		room.on("test", function(){
			emitted = true;
		});
		expect( room.listeners.test.length ).to.equal(1);
	});

	it("should fire listeners on emit", function(){

		room.emit("test");
		expect( emitted ).to.be.true;
	});

});