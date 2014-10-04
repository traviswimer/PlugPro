'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require("sinon");

var rewire = require('../../rewire_helper');
var ToggleSettingView = rewire('views/ToggleSettingView');

window.plugPro = {};
var templateLoader = require('../../template_loader');
Backbone.$ = $;

describe("ToggleSettingView", function(){

	var JST;
	var toggleSettingView;
	var fakeToggleHTML = "toggle_setting.html content";


	beforeEach(function(){
		sinon.stub( window.plugPro.JST, 'toggle_setting.html', function(){
			return fakeToggleHTML;
		});
	});

	afterEach(function(){
		window.plugPro.JST['toggle_setting.html'].restore();
	});

	describe("initialize", function(){

		it("should save toggleSetting HTML to public variable", function(){
			var fakeOptions = {
				"setting": {
					"name": "fakeName",
					"toggler": {
						isOn: true
					}
				}
			};
			toggleSettingView = new ToggleSettingView( fakeOptions );

			expect( toggleSettingView.toggleHTML ).to.equal( fakeToggleHTML );
		});

		it("should save setting to public variable", function(){
			var fakeOptions = {
				"setting": {
					"name": "fakeName",
					"toggler": {
						isOn: true
					}
				}
			};
			toggleSettingView = new ToggleSettingView( fakeOptions );

			expect( toggleSettingView.setting ).to.equal( fakeOptions.setting );
		});

	});

});