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
	var fakeToggleHTML = "toggle_setting.html content<input type='checkbox'>";


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

	describe("render", function(){

		it("should append template", function(){
			var fakeOptions = {
				"setting": {
					"name": "fakeName",
					"toggler": {
						isOn: true
					}
				}
			};
			toggleSettingView = new ToggleSettingView( fakeOptions );
			var appendSpy = sinon.spy( toggleSettingView.$el, "append" );

			toggleSettingView.render();

			expect( appendSpy.calledWith( fakeToggleHTML ) ).to.be.true;
		});

		it("should check checkbox if toggler is on", function(){
			var fakeOptions = {
				"setting": {
					"name": "fakeName",
					"toggler": {
						isOn: true
					}
				}
			};
			toggleSettingView = new ToggleSettingView( fakeOptions );
			toggleSettingView.render();

			var isChecked = toggleSettingView.$el.find('input[type="checkbox"]')[0].checked;
			expect( isChecked ).to.be.true;
		});

		it("should not check checkbox if toggler is off", function(){
			var fakeOptions = {
				"setting": {
					"name": "fakeName",
					"toggler": {
						isOn: false
					}
				}
			};
			toggleSettingView = new ToggleSettingView( fakeOptions );
			toggleSettingView.render();

			var isChecked = toggleSettingView.$el.find('input[type="checkbox"]')[0].checked;
			expect( isChecked ).to.be.false;
		});

	});

	describe("toggleSetting", function(){

		it("should toggle toggler", function(){
			var fakeOptions = {
				"setting": {
					"name": "fakeName",
					"toggler": {
						isOn: true,
						toggle: function(){}
					}
				}
			};
			toggleSettingView = new ToggleSettingView( fakeOptions );
			var toggleSpy = sinon.spy( toggleSettingView.setting.toggler, "toggle" );

			toggleSettingView.toggleSetting();

			expect( toggleSpy.calledOnce ).to.be.true;
		});

	});

});