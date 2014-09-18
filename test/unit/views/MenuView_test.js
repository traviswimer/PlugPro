'use strict';

var chai = require('chai');
var expect = chai.expect;

var rewire = require('../../rewire_helper');
var MenuView = rewire('views/MenuView');

var plugPro = {};

describe("MenuView", function(){

	var JST;
	var menuView;

	beforeEach(function(){
		plugPro.JST = templateLoader([
			'src/html_templates/menu.html',
			'src/html_templates/toggle_setting.html'
		]);

		$('body').html("<div id='app-menu'><div class='list'></div></div><div id='plugpro-menu'></div>");
		menuView = new menuView({
			"fakeToggleSetting": {}
		});
	});

	it("should show and hide", function(){

		$('.list').css('left', '0px');
		menuView.updateVisibility();
		expect( $('#plugpro-menu').hasClass('expanded') ).to.be.true;

		$('.list').css('left', '10px');
		menuView.updateVisibility();
		expect( $('#plugpro-menu').hasClass('expanded') ).to.be.false;
	});

});