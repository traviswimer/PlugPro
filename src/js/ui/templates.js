this["JST"] = this["JST"] || {};

this["JST"]["src/html_templates/menu.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="plugpro-menu">\n\t<div class="inner-pro-menu">\n\t\t<img src="' +
((__t = ( chromeDir )) == null ? '' : __t) +
'/images/logo_large.png" alt="PlugPro" class="pro-logo">\n\t</div>\n\t<ul class="inner-pro-menu">\n\t\t<li>\n\t\t\t<div class="setting-title">AutoWoot</div>\n\t\t\t<div id="autowoot-toggle-button" class="toggle-button">\n\t\t\t\t<input id="autowoot-setting" type="checkbox">\n\t\t\t</div>\n\t\t</li>\n\t</lu>\n</div>';

}
return __p
};