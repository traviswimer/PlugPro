'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require("sinon");

var rewire = require('../../../rewire_helper');
var AvatarsViewView = rewire('views/avatars/AvatarsViewView');

window.plugPro = {};
Backbone.$ = $;

describe("AvatarsViewView", function(){

	var avatarsClass = "plugpro-avatars";

	afterEach(function(){
		document.body.className = "";
		$('body').html("");
	});

	describe("render()", function(){

		it("should add avatars class to body", function(){
			AvatarsViewView.render();
			expect( $('body').hasClass( avatarsClass ) ).to.be.true;
		});

	});

	describe("destroy()", function(){

		it("should remove avatars class from body", function(){
			$('body').addClass( avatarsClass );
			AvatarsViewView.destroy();
			expect( $('body').hasClass( avatarsClass ) ).to.be.false;
		});

	});

});
