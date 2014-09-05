/**
 * UI for the PlugPro Menu
 * @module settings/AutoWootToggle
 */

/**
 * Menu UI constructor
 * @constructor
 */
function Menu( JST ){
	this.$parent = $('#app-menu');
	this.visible = false;

	var menuHTML = JST['src/html_templates/menu.html']({
		chromeDir: "chromeDir"
	});
	this.$parent.append( menuHTML );

	//this.$parent.find('.button').click( this.toggle.bind(this) );


	this.$parent.find('.list')[0].addEventListener(
		this.getTransitionEvent(),
		this.toggle.bind(this),
		false
	);
}


Menu.prototype.toggle = function(){
	var left = this.$parent.find('.list').css("left");
	if( left === "0px" ){
		this.show();
	}else{
		this.hide();
	}
};

Menu.prototype.show = function(){
	$('#plugpro-menu').addClass("expanded");
	this.visible = true;
};

Menu.prototype.hide = function(){
	$('#plugpro-menu').removeClass("expanded");
	this.visible = false;
};


Menu.prototype.getTransitionEvent = function(){
	var el = document.createElement('div');
	var animations = {
		'animation':'transitionend',
		'OAnimation':'oTransitionEnd',
		'MozAnimation':'transitionend',
		'WebkitAnimation':'webkitTransitionEnd'
	};

	for(var t in animations){
		if( el.style[t] !== undefined ){
			return animations[t];
		}
	}
};

module.exports = Menu;