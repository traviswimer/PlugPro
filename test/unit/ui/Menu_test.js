'use strict';

var chai = require('chai');
var expect = chai.expect;

var requireHelper = require('../../require_helper');
var Menu = requireHelper('ui/Menu');

describe("Menu", function(){

	var menu;
	var JST = {};
	JST['src/html_templates/menu.html'] = function(){return "";};

	beforeEach(function(){
		$('body').html("<div id='app-menu'><div class='list'></div></div><div id='plugpro-menu'></div>");
		menu = new Menu( JST );
	});

	it("should show and hide", function(){

		$('.list').css('left', '0px');
		menu.toggle();
		expect( $('#plugpro-menu').hasClass('expanded') ).to.be.true;

		$('.list').css('left', '10px');
		menu.toggle();
		expect( $('#plugpro-menu').hasClass('expanded') ).to.be.false;
	});

	describe("getTransitionEvent()", function(){

		var fakeEl;

		beforeEach(function(){
			fakeEl = document.createElement('div');
		});

		it("should return transition for webkit", function(){
			fakeEl.style.WebkitAnimation = true;
			var transition = menu.getTransitionEvent( fakeEl );
			expect( transition ).to.equal('webkitTransitionEnd');
		});

		it("should return for mozilla", function(){
			fakeEl.style.MozAnimation = true;
			var transition = menu.getTransitionEvent( fakeEl );
			expect( transition ).to.equal('transitionend');
		});

		it("should return for opera", function(){
			fakeEl.style.OAnimation = true;
			var transition = menu.getTransitionEvent( fakeEl );
			expect( transition ).to.equal('oTransitionEnd');
		});

		it("should return for modern/universal", function(){
			fakeEl.style.animation = true;
			var transition = menu.getTransitionEvent( fakeEl );
			expect( transition ).to.equal('transitionend');
		});
	});

});