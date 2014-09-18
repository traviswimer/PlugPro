'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');

var rewireHelper = require('../../rewire_helper');
var Menu = rewireHelper('ui/Menu');
//var JST = requireHelper('ui/templates').JST;

var templateLoader = require('../../template_loader');

describe("Menu", function(){

	var JST;
	var menu;

	beforeEach(function(){
		JST = templateLoader([
			'src/html_templates/menu.html',
			'src/html_templates/toggle_setting.html'
		]);

		$('body').html("<div id='app-menu'><div class='list'></div></div><div id='plugpro-menu'></div>");
		menu = new Menu( JST, {
			"fakeToggleSetting": {}
		});

	});

	it("should show and hide", function(){

		$('.list').css('left', '0px');
		menu.toggle();
		expect( $('#plugpro-menu').hasClass('expanded') ).to.be.true;

		$('.list').css('left', '10px');
		menu.toggle();
		expect( $('#plugpro-menu').hasClass('expanded') ).to.be.false;
	});

	it("should add toggle settings", function(){
		expect( $('#pro-toggle-settings').find('li').length ).to.equal(1);
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

	describe('document mousedown event',function( done ){

		var origDocumentAddEventListener = document.addEventListener;
		var mouseDownCallback;

		beforeEach(function(){
			document.addEventListener = function(event, callback){
				mouseDownCallback = callback;
			};

			menu = new Menu( JST, {
				"fakeToggleSetting": {}
			});
		});

		afterEach(function(){
			document.addEventListener = origDocumentAddEventListener;
		});

		it("should stop event bubbling if clicked on Pro menu", function( done ){
			
			mouseDownCallback({
				"target": $('#plugpro-menu')[0],
				stopPropagation: function(){
					done();
				}
			});

		});

		it("should stop event bubbling if clicked on element inside Pro menu", function( done ){
			
			mouseDownCallback({
				"target": $('.inner-pro-menu')[0],
				stopPropagation: function(){
					done();
				}
			});

		});

		it("should do nothing if not pro-menu", function(  ){
			
			mouseDownCallback({
				"target": document
			});

		});

	});

	describe('settings',function(){

		var toggleSpy;

		beforeEach(function(){
			toggleSpy = sinon.spy();
		});

		it("should toggle setting on click", function(  ){
			
			menu = new Menu( JST, {
				"fakeToggleSetting": {
					toggler: {
						toggle: toggleSpy
					}
				}
			});
			
			$('.autowoot-setting').trigger("change");
			expect( toggleSpy.called ).to.be.true;

		});
	})

});