'use strict';

var chai = require('chai');
var expect = chai.expect;

var rewire = require('../../rewire_helper');
var MenuView = rewire('views/MenuView');

window.plugPro = {};
var templateLoader = require('../../template_loader');
Backbone.$ = $;

describe("MenuView", function(){

	var JST;
	var menuView;

	MenuView.__set__( "ToggleSettingView", new Backbone.View.extend() );

	beforeEach(function(){
		window.plugPro.JST = templateLoader([
			'menu.html',
			'toggle_setting.html'
		]);

		$('body').html("<div id='app-menu'><div class='list'></div></div><div id='plugpro-menu'></div>");
		menuView = new MenuView({
			"fakeToggleSetting": {}
		});
		$('#app-menu').append( menuView.$el );
	});

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