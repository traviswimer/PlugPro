'use strict';

var chai = require('chai');
var expect = chai.expect;

var rewireHelper = require('../rewire_helper');
var Room = rewireHelper('Room');

describe("Room", function(){

	var room;

	beforeEach(function(){
		$('body').html('');
		room = new Room();
	});

	it("should add listeners", function(){

		room.on("test", function(){});
		room.on("test", function(){});
		expect( room.listeners.test.length ).to.equal(2);
	});

	it("should fire listeners on emit", function(){
		var emitted = false;

		room.on("test", function(){
			emitted = true;
		});
		expect( room.listeners.test.length ).to.equal(1);

		room.emit("test");
		expect( emitted ).to.be.true;
	});

	it("should ignore emit with no listeners", function(){
		room.emit("test");
	});

	describe("init()", function(){

		it("should emit load", function( done ){

			$('body').append( "<div id='app-menu'><div class='list'></div></div>" );
			$('body').append( "<div id='plug_pro_chrome_extension_id'></div>" );
			
			room.on('load', function(){
				done();
			});

			room.init();
			var roomDiv = document.createElement('div');
			roomDiv.id = "room";
			$('body').append( roomDiv );
		});

		it("should set loading message if necessary", function( done ){

			var loaderDiv = document.createElement('div');
			loaderDiv.id = "room-loader";
			$('body').append( loaderDiv );

			room.init();

			expect( loaderDiv.innerHTML ).to.equal( "Loading..." );

			setTimeout( done, 200 ); // Make sure message set branch is called
		});
	});

});