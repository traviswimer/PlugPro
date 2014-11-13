(function() {(window["plugPro"]["JST"] = window["plugPro"]["JST"] || {})["artwork.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<img class="plugpro-artwork-background" src="' +
((__t = ( url )) == null ? '' : __t) +
'" alt="Album Artwork Background">\n<img class="plugpro-artwork-small" src="' +
((__t = ( url )) == null ? '' : __t) +
'" alt="Album Artwork">';

}
return __p
}})();
(function() {(window["plugPro"]["JST"] = window["plugPro"]["JST"] || {})["menu.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="inner-pro-menu">\n\t<img src="' +
((__t = ( chromeDir )) == null ? '' : __t) +
'/images/logo_large.png" alt="PlugPro" class="pro-logo">\n\t<ul id="pro-toggle-settings" class="inner-pro-menu">\n\t\t\n\t</lu>\n</div>\n';

}
return __p
}})();
(function() {(window["plugPro"]["JST"] = window["plugPro"]["JST"] || {})["play_history.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="row playlist-media-item">\n\t<img src="' +
((__t = ( media.image )) == null ? '' : __t) +
'">\n\t<div class="meta">\n\t\t<span class="author">' +
((__t = ( media.author )) == null ? '' : __t) +
' - ' +
((__t = ( media.title )) == null ? '' : __t) +
'</span>\n\t\t<span class="name">' +
((__t = ( user.username )) == null ? '' : __t) +
'</span>\n\t</div>\n\t<div class="score">\n\t\t<div class="item positive">\n\t\t\t<i class="icon icon-history-positive"></i><span>' +
((__t = ( score.positive )) == null ? '' : __t) +
'</span>\n\t\t</div>\n\t\t<div class="item grabs">\n\t\t\t<i class="icon icon-history-grabs"></i><span>' +
((__t = ( score.grabs )) == null ? '' : __t) +
'</span>\n\t\t</div>\n\t\t<div class="item negative">\n\t\t\t<i class="icon icon-history-negative"></i><span>' +
((__t = ( score.negative )) == null ? '' : __t) +
'</span>\n\t\t</div>\n\t\t<div class="item listeners">\n\t\t\t<i class="icon icon-history-listeners"></i><span>' +
((__t = ( score.listeners )) == null ? '' : __t) +
'</span>\n\t\t</div>\n\t</div>\n</div>';

}
return __p
}})();
(function() {(window["plugPro"]["JST"] = window["plugPro"]["JST"] || {})["toggle_setting.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="setting-title">' +
((__t = ( title )) == null ? '' : __t) +
'</div>\n<div class="onoffswitch">\n\t<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="' +
((__t = ( title )) == null ? '' : __t) +
'">\n\t<label class="onoffswitch-label" for="' +
((__t = ( title )) == null ? '' : __t) +
'">\n\t\t<span class="onoffswitch-inner"></span>\n\t\t<span class="onoffswitch-switch"></span>\n\t</label>\n</div>';

}
return __p
}})();
(function() {(window["plugPro"]["JST"] = window["plugPro"]["JST"] || {})["updates_modal.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="plugpro-bg-fader"></div>\n<div class="plugpro-modal">\n\t<div class="plugpro-modal-scrollable">\n\t\t<div class="plugpro-modal-logo"><img src="' +
((__t = ( chromeDir )) == null ? '' : __t) +
'/images/logo_large.png" alt="PlugPro Logo" height="100"></div>\n\t\t<div class="plug-pro-modal-title">Updated to v' +
((__t = ( version )) == null ? '' : __t) +
'</div>\n\t\t<ul>\n\t\t\t';
 _.each(updates, function(item) { ;
__p += '\n\t\t\t<li>' +
((__t = ( item )) == null ? '' : __t) +
'</li>\n\t\t\t';
 }); ;
__p += '\n\t\t</ul>\n\t</div>\n\t<div class="plugpro-modal-close-button">Close</div>\n</div>\n';

}
return __p
}})();
(function() {(window["plugPro"]["JST"] = window["plugPro"]["JST"] || {})["user.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 if( iconClass ){ ;
__p += '\n<i class="icon ' +
((__t = ( iconClass )) == null ? '' : __t) +
'"></i>\n';
 } ;
__p += '\n<span class="name">' +
((__t = ( username )) == null ? '' : __t) +
'</span>';

}
return __p
}})();
(function() {(window["plugPro"]["JST"] = window["plugPro"]["JST"] || {})["userlist.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="plugpro-userlist-list"></div>\n';

}
return __p
}})();
(function() {(window["plugPro"]["JST"] = window["plugPro"]["JST"] || {})["video_chat.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="plugpro-expand-chat-button">Expand Chat</div>\n<div class=\'plugpro-messages\'>\n</div>\n<div>\n\t<form id="plugpro-chat-input-form" action="?">\n\t\t<input type="text" value="" placeholder="Click here to join the conversation" maxlength="256">\n\t</form>\n</div>';

}
return __p
}})();
(function() {(window["plugPro"]["JST"] = window["plugPro"]["JST"] || {})["view_buttons.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div data-view-name="pro" class="plugpro-view-button">Pro</div>\n<div data-view-name="video" class="plugpro-view-button">Video</div>\n<div data-view-name="avatars" class="plugpro-view-button">Avatars</div>';

}
return __p
}})();
(function() {(window["plugPro"]["JST"] = window["plugPro"]["JST"] || {})["waitlist.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="plugpro-waitlist-list"></div>\n';

}
return __p
}})();
(function() {(window["plugPro"]["JST"] = window["plugPro"]["JST"] || {})["waitlist_user.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<span class="position">' +
((__t = ( position )) == null ? '' : __t) +
'</span>\n';
 if( iconClass ){ ;
__p += '\n<i class="icon ' +
((__t = ( iconClass )) == null ? '' : __t) +
'"></i>\n';
 } ;
__p += '\n<span class="name">' +
((__t = ( username )) == null ? '' : __t) +
'</span>';

}
return __p
}})();