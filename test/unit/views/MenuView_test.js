'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require("sinon");

var rewire = require('../../rewire_helper');
var MenuView = rewire('views/MenuView');

window.plugPro = {};
var templateLoader = require('../../template_loader');
Backbone.$ = $;

describe("MenuView", function(){

	var JST;
	var menuView;
	var fakeToggleSettings;


	beforeEach(function(){
		MenuView.__set__( "ToggleSettingView", Backbone.View.extend() );

		window.plugPro.JST = templateLoader([
			'menu.html',
			'toggle_setting.html'
		]);
		

		$('body').html("<div id='app-menu'><div class='list'></div></div><div id='plugpro-menu'></div>");
		fakeToggleSettings = {
			"toggleSettings": {
				"fakeSetting1": {},
				"fakeSetting2": {}
			}
		};
		

		menuView = new MenuView( fakeToggleSettings );
		$('#app-menu').append( menuView.$el );

	});

	describe("initialize", function(){

		it("should add toggleSettings to list", function(){
			expect( menuView.settingViews.length ).to.equal(2);
		});

		it("should load menu template", function(){

			sinon.spy( window.plugPro.JST, 'menu.html' )

			menuView = new MenuView( fakeToggleSettings );
			$('#app-menu').append( menuView.$el );

			expect( window.plugPro.JST['menu.html'].calledOnce ).to.be.true;
		});

	});

	describe("updateVisibility", function(){

		it("should show and hide", function(){
			menuView.render();

			$('.list').css('left', '0px');
			menuView.updateVisibility();
			expect( $('#plugpro-menu').hasClass('expanded') ).to.be.true;

			$('.list').css('left', '10px');
			menuView.updateVisibility();
			expect( $('#plugpro-menu').hasClass('expanded') ).to.be.false;
		});

	});

});