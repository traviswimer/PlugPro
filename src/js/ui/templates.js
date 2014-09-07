this["JST"] = this["JST"] || {};

this["JST"]["src/html_templates/menu.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="plugpro-menu">\n\t<div class="inner-pro-menu">\n\t\t<img src="' +
((__t = ( chromeDir )) == null ? '' : __t) +
'/images/logo_large.png" alt="PlugPro" class="pro-logo">\n\t</div>\n\t<ul id="pro-toggle-settings" class="inner-pro-menu">\n\t\t\n\t</lu>\n</div>';

}
return __p
};

this["JST"]["src/html_templates/toggle_setting.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<li>\n\t<div class="setting-title">' +
((__t = ( title )) == null ? '' : __t) +
'</div>\n\t<div id="autowoot-toggle-button" class="toggle-button">\n\t\t<input id="autowoot-setting" type="checkbox">\n\t</div>\n</li>';

}
return __p
};