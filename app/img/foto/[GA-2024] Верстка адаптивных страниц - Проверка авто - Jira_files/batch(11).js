;
/* module-key = 'com.atlassian.analytics.analytics-client:js-events', location = 'js/node_modules/@atlassian/cloud-analytics-js/store-1.3.1.js' */
(function(){var l={},h=window,k=h.document,c="localStorage",n="globalStorage",d="__storejs__",g;l.disabled=false;l.set=function(e,o){};l.get=function(e){};l.remove=function(e){};l.clear=function(){};l.transact=function(e,o){var p=l.get(e);if(typeof p=="undefined"){p={}}o(p);l.set(e,p)};l.serialize=function(e){return JSON.stringify(e)};l.deserialize=function(e){if(typeof e!="string"){return undefined}return JSON.parse(e)};function b(){try{return(c in h&&h[c])}catch(e){return false}}function m(){try{return(n in h&&h[n]&&h[n][h.location.hostname])}catch(e){return false}}if(b()){g=h[c];l.set=function(e,o){if(o===undefined){return l.remove(e)}g.setItem(e,l.serialize(o))};l.get=function(e){return l.deserialize(g.getItem(e))};l.remove=function(e){g.removeItem(e)};l.clear=function(){g.clear()}}else{if(m()){g=h[n][h.location.hostname];l.set=function(e,o){if(o===undefined){return l.remove(e)}g[e]=l.serialize(o)};l.get=function(e){return l.deserialize(g[e]&&g[e].value)};l.remove=function(e){delete g[e]};l.clear=function(){for(var e in g){delete g[e]}}}else{if(k.documentElement.addBehavior){var j,f;try{f=new ActiveXObject("htmlfile");f.open();f.write('<script>document.w=window<\/script><iframe src="/favicon.ico"></frame>');f.close();j=f.w.frames[0].document;g=j.createElement("div")}catch(i){g=k.createElement("div");j=k.body}function a(e){return function(){var p=Array.prototype.slice.call(arguments,0);p.unshift(g);j.appendChild(g);g.addBehavior("#default#userData");g.load(c);var o=e.apply(l,p);j.removeChild(g);return o}}l.set=a(function(p,e,o){if(o===undefined){return l.remove(e)}p.setAttribute(e,l.serialize(o));p.save(c)});l.get=a(function(o,e){return l.deserialize(o.getAttribute(e))});l.remove=a(function(o,e){o.removeAttribute(e);o.save(c)});l.clear=a(function(q){var o=q.XMLDocument.documentElement.attributes;q.load(c);for(var p=0,e;e=o[p];p++){q.removeAttribute(e.name)}q.save(c)})}}}try{l.set(d,d);if(l.get(d)!=d){l.disabled=true}l.remove(d)}catch(i){l.disabled=true}if(typeof module!="undefined"){module.exports=l}else{if(typeof define==="function"&&define.amd){define(l)}else{this.store=l}}})();;
;
/* module-key = 'com.atlassian.analytics.analytics-client:js-events', location = 'js/node_modules/@atlassian/cloud-analytics-js/page-visibility.js' */
define("atlassian/analytics/page-visibility",function(){var a=(document.hidden!==undefined);var b={supported:a,isHidden:function(){return a?document.hidden:false}};return b});;
;
/* module-key = 'com.atlassian.analytics.analytics-client:js-events', location = 'js/node_modules/@atlassian/cloud-analytics-js/user-activity-xhr-header.js' */
define("atlassian/analytics/user-activity-xhr-header",["atlassian/analytics/page-visibility"],function(f){var d="x-atlassian-mau-ignore";var e=XMLHttpRequest.prototype.send;var b=window.fetch;var g=XMLHttpRequest.prototype.open;var a=false;var i=Object.create(null);var h=new RegExp("^(?:[a-z]+:)?//","i");var c=function(j){var k=document.createElement("a");k.href=j;return k.hostname};return{install:function(){if(!a&&f.supported){XMLHttpRequest.prototype.open=function(k,j){this._url=j;return g.apply(this,arguments)};XMLHttpRequest.prototype.send=function(){var j=h.test(this._url)?c(this._url) in i:true;if(f.isHidden()&&j){this.setRequestHeader(d,f.isHidden())}e.apply(this,arguments)};if(b){window.fetch=function(j,m){var k=m||{};var l=k.headers;if(f.isHidden()){k.headers=(l)?new Headers(l):new Headers();k.headers.set(d,f.isHidden())}return b.call(this,j,k)}}a=true}},uninstall:function(){if(a){XMLHttpRequest.prototype.send=e;if(b){window.fetch=b}}a=false},addHost:function(j){i[j]=true}}});require("atlassian/analytics/user-activity-xhr-header").install();;
;
/* module-key = 'com.atlassian.analytics.analytics-client:js-events', location = 'js/node_modules/@atlassian/cloud-analytics-js/atlassian-analytics.js' */
(function(d){function e(x){var B=250*1024;var z="atlassian-analytics."+x;var y=z+".lock";var D="null";var A=(window.localStorage[z]||"").length;var C=(window.localStorage[y]||D)!==D;if(C&&A>B){window.localStorage[z]=JSON.stringify([{name:"grow0.event.queue.cleared",time:new Date().valueOf(),properties:{queueSize:A}}]);window.localStorage[y]=D}}["jira","confluence","unknown"].forEach(function(x){try{e(x)}catch(y){}});var q=AJS.$.ajax;var l="atlassian-analytics";var j=typeof AJS.contextPath=="function"?AJS.contextPath():typeof AJS.Confluence!="undefined"?AJS.Confluence.getContextPath():window.contextPath!=null?window.contextPath:"";var p=null;var m=null;var g=null;var r="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(z){var y=Math.random()*16|0,x=z=="x"?y:(y&3|8);return x.toString(16)});var t=function(){var x="unknown";if(document.body.id=="jira"){x="jira"}else{if(document.body.id=="com-atlassian-confluence"){x="confluence"}}m=l+"."+x;g=m+".lock"};var f=function(){if(store.get(g)){return false}store.set(g,r);return(store.get(g)===r)};var u=function(){store.set(g,null)};var i=function(){var y=[],A,B,x,z;if(AJS.EventQueue.length==0){return}y=store.get(m)||y;for(x=0,z=AJS.EventQueue.length;x<z;++x){B=AJS.EventQueue[x];if(B.name){A={name:B.name,properties:B.properties,time:B.time||0};y.push(A)}}AJS.EventQueue.length=0;store.set(m,y)};var v=0;var a=function(x){return Math.min(5000*Math.pow(2,x),5*60*1000)};var h=function(){var A;function y(){setTimeout(h,a(v=0))}function x(){setTimeout(h,a(++v))}if(!f()){return y()}i();A=store.get(m);if(!A||!A.length){u();return y()}store.remove(m);u();if(!o(A)){return y()}var B=new Date().getTime();for(var z=0;z<A.length;z++){if(A[z].time>0){A[z].timeDelta=A[z].time-B}else{A[z].timeDelta=z-A.length}delete A[z].time}p=q({type:"POST",url:j+"/rest/analytics/1.0/publish/bulk",data:JSON.stringify(A),contentType:"application/json",dataType:"json"});p.fail(function(){AJS.EventQueue.concat(A);i();x()});p.done(function(){y()})};var o=function(z){for(var y=z.length-1;y>=0;y--){var B="";var A=z[y];var x=A.properties;if(typeof A.name==="undefined"){B="you must provide a name for the event."}else{if(typeof x!=="undefined"&&x!==null){if(x.constructor!==Object){B="properties must be an object with key value pairs."}else{b(x)}}}if(B!==""){AJS.log("WARN: Invalid analytics event detected and ignored, "+B+"\nEvent: "+JSON.stringify(A));z.splice(y,1)}}return z.length};var b=function(z){for(var y in z){if(z.hasOwnProperty(y)){var x=z[y];if(c(x)&&k(x)){}else{if(c(x)&&x.toString){z[y]=x.toString()}else{z[y]=""}}}}};function c(x){return typeof x!=="undefined"&&x!==null}function k(x){return typeof x==="number"||typeof x==="string"||typeof x==="boolean"}var n=function(){if(p&&!(p.state()==="resolved"||p.state()==="rejected")){p.abort()}};AJS.EventQueue=AJS.EventQueue||[];var s=Array.prototype.push;AJS.EventQueue.push=function(x){x.time=new Date().getTime();s.call(AJS.EventQueue,x)};AJS.toInit(function(){t();setTimeout(h,500);w()});d(window).unload(function(){n();i()});AJS.Analytics={triggerPrivacyPolicySafeEvent:function(x,y){AJS.log("WARN: 'triggerPrivacyPolicySafeEvent' has been deprecated");AJS.EventQueue.push({name:x,properties:y})}};AJS.bind("analytics",function(x,y){AJS.EventQueue.push({name:y.name,properties:y.data})});AJS.bind("analyticsEvent",function(x,y){AJS.EventQueue.push({name:y.name,properties:y.data})});var w=function(){if(window.location.pathname.indexOf("/secure/admin/ViewApplicationProperties")>-1){AJS.$("[data-property-id='analytics-enabled']").remove()}else{if(window.location.pathname.indexOf("/secure/admin/EditApplicationProperties")>-1){var y=AJS.$(":contains(Enable Atlassian analytics)");if(y.size()>0){var x=y[y.size()-2];if(x){x.remove()}}}}}}(AJS.$));;
;
/* module-key = 'com.atlassian.plugins.atlassian-nav-links-plugin:application-header-administration-cog-resource', location = 'header/cog.js' */
var NavLinks=(function(a){a.ApplicationHeader=function(b){b.Cog=(function(){var c=function(){var d=AJS.$("#system-admin-menu-content");if(d.length>0){return d}var e=AJS.$("#admin-menu-link-content");if(e.length>0){return e}return AJS.$("#bamboo\\.global\\.header-admin\\.menu")};return{getDropdown:c}}());return b}(a.ApplicationHeader||{});return a}(NavLinks||{}));;
;
/* module-key = 'com.atlassian.plugins.atlassian-nav-links-plugin:administration-shortcuts-resources', location = 'adminshortcuts/adminshortcuts.soy' */
// This file was automatically generated from adminshortcuts.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace navlinks.templates.adminshortcuts.
 */

if (typeof navlinks == 'undefined') { var navlinks = {}; }
if (typeof navlinks.templates == 'undefined') { navlinks.templates = {}; }
if (typeof navlinks.templates.adminshortcuts == 'undefined') { navlinks.templates.adminshortcuts = {}; }


navlinks.templates.adminshortcuts.section = function(opt_data, opt_ignored) {
  var param5 = '<ul class="aui-list-truncate">';
  var linkList7 = opt_data.links;
  var linkListLen7 = linkList7.length;
  for (var linkIndex7 = 0; linkIndex7 < linkListLen7; linkIndex7++) {
    var linkData7 = linkList7[linkIndex7];
    param5 += '<li><a href="' + soy.$$escapeHtml(linkData7.link) + '">' + soy.$$escapeHtml(linkData7.label) + '</a></li>';
  }
  param5 += '</ul>';
  var output = '' + aui.dropdown2.section({id: 'nl-remote-admin-section', label: '\u041f\u0440\u043e\u0447\u0438\u0435 \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u044f', content: param5});
  return output;
};
if (goog.DEBUG) {
  navlinks.templates.adminshortcuts.section.soyTemplateName = 'navlinks.templates.adminshortcuts.section';
}
;
;
/* module-key = 'com.atlassian.plugins.atlassian-nav-links-plugin:administration-shortcuts-resources', location = 'adminshortcuts/adminnavlinks.js' */
var NavLinks=(function(a){var b=false;a.AdminShortcuts=(function(){var d=function(){return AJS.$.ajax({url:AJS.contextPath()+"/rest/menu/latest/admin",cache:false,dataType:"json"})};var c=function(){AJS.$("#nl-remote-admin-section").on("click","a",function(){NL.trackEvent("remoteAdminItemSelected",NL.getCurrentApplication(),$(this).attr("href"))})};return{renderLoading:function(){var e=AJS.$(navlinks.templates.appswitcher.loading());a.ApplicationHeader.Cog.getDropdown().append(e)},render:function(){if(!AJS.$("#nl-remote-admin-section").length&&!b){a.AdminShortcuts.renderLoading();b=true;d().done(function(f){f=_.reject(f,function(g){return g.local===true});if(f.length){var e=navlinks.templates.adminshortcuts.section({links:f});a.ApplicationHeader.Cog.getDropdown().append(e);c()}}).always(function(){b=false;a.ApplicationHeader.Cog.getDropdown().find(".app-switcher-loading").remove()})}}}}());return a}(NavLinks||{}));;
;
/* module-key = 'com.atlassian.plugins.atlassian-nav-links-plugin:administration-shortcuts', location = 'adminshortcuts/adminshortcuts.js' */
AJS.$(function(){if(AJS.DarkFeatures&&AJS.DarkFeatures.isEnabled("rotp.admin.shortcuts")){NavLinks.ApplicationHeader.Cog.getDropdown().on("aui-dropdown2-show",function(){NavLinks.AdminShortcuts.render()})}});;
;
/* module-key = 'com.atlassian.plugins.atlassian-nav-links-plugin:rotp-projectshortcuts', location = 'projectshortcuts/projectshortcuts.soy' */
// This file was automatically generated from projectshortcuts.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace navlinks.templates.projectshortcuts.
 */

if (typeof navlinks == 'undefined') { var navlinks = {}; }
if (typeof navlinks.templates == 'undefined') { navlinks.templates = {}; }
if (typeof navlinks.templates.projectshortcuts == 'undefined') { navlinks.templates.projectshortcuts = {}; }


navlinks.templates.projectshortcuts.dialogContent = function(opt_data, opt_ignored) {
  return '' + ((opt_data.localShortcuts && opt_data.localShortcuts.length > 0) ? navlinks.templates.projectshortcuts.dialogContentShortcuts({shortcuts: opt_data.localShortcuts, listClass: 'projectshortcut-links'}) : '') + ((opt_data.remoteShortcuts != null) ? (opt_data.remoteShortcuts.length > 0) ? '<h2 class="projectshortcuts-heading">Related Links</h2>' + navlinks.templates.projectshortcuts.dialogContentShortcuts(soy.$$augmentMap(opt_data.remoteShortcuts, {shortcuts: opt_data.remoteShortcuts, listClass: 'projectshortcut-links'})) : '' : navlinks.templates.projectshortcuts.dialogLoading(null));
};
if (goog.DEBUG) {
  navlinks.templates.projectshortcuts.dialogContent.soyTemplateName = 'navlinks.templates.projectshortcuts.dialogContent';
}


navlinks.templates.projectshortcuts.headingWrapper = function(opt_data, opt_ignored) {
  return '<div class="project-dialog-header-wrapper"><div class="project-header"><img class="project-img" src="' + soy.$$escapeHtml(opt_data.logoUrl) + '"><h2 class="dialog-title">' + soy.$$escapeHtml(opt_data.title) + '</h2></div><div class="project-content-wrapper">' + soy.$$filterNoAutoescape(opt_data.contentHtml) + '</div></div>';
};
if (goog.DEBUG) {
  navlinks.templates.projectshortcuts.headingWrapper.soyTemplateName = 'navlinks.templates.projectshortcuts.headingWrapper';
}


navlinks.templates.projectshortcuts.dialogContentShortcuts = function(opt_data, opt_ignored) {
  opt_data = opt_data || {};
  var output = '<ul' + ((opt_data.listClass) ? ' class="' + soy.$$escapeHtml(opt_data.listClass) + '"' : '') + '>';
  var shortcutList35 = opt_data.shortcuts;
  var shortcutListLen35 = shortcutList35.length;
  for (var shortcutIndex35 = 0; shortcutIndex35 < shortcutListLen35; shortcutIndex35++) {
    var shortcutData35 = shortcutList35[shortcutIndex35];
    output += '<li' + ((shortcutIndex35 == shortcutListLen35 - 1) ? ' class="last"' : '') + '>' + navlinks.templates.projectshortcuts.dialogContentShortcut(shortcutData35) + '</li>';
  }
  output += '</ul>';
  return output;
};
if (goog.DEBUG) {
  navlinks.templates.projectshortcuts.dialogContentShortcuts.soyTemplateName = 'navlinks.templates.projectshortcuts.dialogContentShortcuts';
}


navlinks.templates.projectshortcuts.dialogContentShortcut = function(opt_data, opt_ignored) {
  return '<a href="' + soy.$$escapeHtml(opt_data.link) + '"' + ((opt_data.tooltip) ? ' title="' + soy.$$escapeHtml(opt_data.tooltip) + '"' : '') + '>' + soy.$$escapeHtml(opt_data.label) + '</a>';
};
if (goog.DEBUG) {
  navlinks.templates.projectshortcuts.dialogContentShortcut.soyTemplateName = 'navlinks.templates.projectshortcuts.dialogContentShortcut';
}


navlinks.templates.projectshortcuts.dialogLoading = function(opt_data, opt_ignored) {
  opt_data = opt_data || {};
  return '<div class="projectshortcuts-loading">' + ((opt_data.text) ? soy.$$escapeHtml(opt_data.text) : '') + '</div>';
};
if (goog.DEBUG) {
  navlinks.templates.projectshortcuts.dialogLoading.soyTemplateName = 'navlinks.templates.projectshortcuts.dialogLoading';
}
;
;
/* module-key = 'com.atlassian.plugins.atlassian-nav-links-plugin:rotp-projectshortcuts', location = 'projectshortcuts/projectshortcuts.js' */
(function(e,g){var i,k={},m="key",b="name",j="entity-type";function f(s){var n=e(this),o=n.data(m),q=n.data(b),p=n.data(j);if(typeof o==="undefined"){return}s.preventDefault();i=new AJS.Dialog({width:600,keypressListener:function(u){if(u.which==jQuery.ui.keyCode.ESCAPE){i.remove()}},id:"project-shortcuts-dialog"}).addCancel("Close",function(){i.remove()}).addPanel("",navlinks.templates.projectshortcuts.headingWrapper({title:q,logoUrl:h(),contentHtml:navlinks.templates.projectshortcuts.dialogLoading({text:"Retrieving links…"})})).show();c(i);if(!k[o]){k[o]={entity:{title:q},localShortcuts:null,remoteShortcuts:null};d(AJS.contextPath()+"/rest/project-shortcuts/1.0/local/"+o,{entityType:p}).done(t);d(AJS.contextPath()+"/rest/project-shortcuts/1.0/remote/"+o,{entityType:p}).done(r).fail(function(){var u=i.getCurrentPanel().body.find(".project-content-wrapper");u.find(".projectshortcuts-loading").remove();AJS.messages.error(u,{body:"\u041d\u0435\u0432\u043e\u0437\u043c\u043e\u0436\u043d\u043e \u0438\u0437\u0432\u043b\u0435\u0447 \u0441\u0441\u044b\u043b\u043a\u0438 \u043f\u0440\u043e\u0435\u043a\u0442\u0430",closeable:false});c(i)})}else{l(k[o])}function t(u){k[o].localShortcuts=u.shortcuts;l(k[o])}function r(u){k[o].remoteShortcuts=u.shortcuts;l(k[o])}}function h(){return e(".project-shortcut-dialog-trigger img").attr("src")}function l(n){if(n.localShortcuts){i.getCurrentPanel().html(navlinks.templates.projectshortcuts.headingWrapper({title:n.entity.title,logoUrl:h(),contentHtml:navlinks.templates.projectshortcuts.dialogContent(n)}));c(i)}}function a(p){var o=210;if(!p||p.length<=o){return p}var n=o;while(n>0&&p.charAt(n)!=" "){n--}if(n==0){n=o}p=p.substring(0,n);if(p.length>=n){p=p+"..."}return p}function c(n){var q=n.popup.element,p=q.find(".dialog-panel-body"),o=q.find(".dialog-components");p.height("auto");q.height(o.outerHeight()-1);e(".aui-shadow").remove()}function d(n,o){return e.ajax({url:n,cache:false,data:o,dataType:"json"})}e(document).on("click",".project-shortcut-dialog-trigger",f)}(jQuery,window.NL=(window.NL||{})));;
;
/* module-key = 'com.atlassian.plugins.atlassian-nav-links-plugin:atlassian-ui-popup-display-controller', location = 'popups/DisplayController.js' */
AJS.Popups=AJS.Popups||{};AJS.Popups.DisplayController=function(){var c=[];var a=false;var b=false;AJS.toInit(function(){setTimeout(function(){AJS.Popups.DisplayController.render()},0)});return{request:function(d){c.push(d);if(a&&b===false){this.render()}},render:function(){c.sort(function(e,d){return e.weight-d.weight});a=true;if(c.length!==0){b=true;c[0].show()}}}}();;
;
/* module-key = 'com.atlassian.jira.jira-issue-link-web-plugin:issue-link-web-link', location = 'js/issuelink-weblink.js' */
define("jira-issue-link/web-link",["jquery"],function(n){function i(){c.attr("src",""),e.val(""),o.css("background-image",""),r=a(o.val()),r&&(setTimeout(function(){o.addClass("loading")},0),l=setTimeout(function(){o.removeClass("loading")},3e3),c.attr("src",r))}function a(n){var i=n.match(/^([^\/]*\/\/[^\/]+)/)[1];if(i)return i+"/favicon.ico"}var e,o,r,l,c=n("<img>");return c.load(function(){e.val(r),o.css("background-image",'url("'+r+'")'),clearTimeout(l),o.removeClass("loading")}),c.error(function(){clearTimeout(l),o.removeClass("loading")}),{init:function(a){e=n("#web-link-icon-url",a),o=n("#web-link-url",a).bind("change",i),e.val()&&o.css("background-image","url("+e.val()+")")}}});;
;
/* module-key = 'com.atlassian.jira.jira-issue-link-web-plugin:issue-link-web-link', location = 'js/issuelink-weblink-init.js' */
require(["jira-issue-link/web-link","jquery","jira/util/events","jira/util/events/types"],function(i,n,t,e){t.bind(e.NEW_PAGE_ADDED,function(n,t){i.init(t)}),t.bind(e.NEW_CONTENT_ADDED,function(i,t){n(".issue-link").tooltip({gravity:"s"})})});;
;
/* module-key = 'com.atlassian.jconnect.jconnect-plugin:common', location = 'js/ViewLocation.js' */
(function(g){var c=window,h="onJMCGMapsLoad";mapsCallbacks=[],googleLoaderRequested=false,googleMapsRequested=false;function i(){var m;while(m=mapsCallbacks.shift()){m()}}function e(n){var m=c.google.maps&&c.google.maps.LatLng;if(m){mapsCallbacks.push(n);i()}else{if(googleMapsRequested){mapsCallbacks.push(n)}else{googleMapsRequested=true;mapsCallbacks.push(n);google.load("maps","3",{other_params:"sensor=false",callback:i})}}}function f(n){if(c.google&&c.google.load){e(n)}else{if(googleLoaderRequested){mapsCallbacks.push(n)}else{googleLoaderRequested=true;c[h]=function(){e(n)};var m=document.createElement("script");m.src="https://www.google.com/jsapi?callback="+h;m.type="text/javascript";g("body").append(m)}}}function d(m){if(m.hasClass("open")){k(m)}else{l(m)}}function k(m){m.removeClass("open");b=false}function l(n){var m=n.find(".jConnectMap");n.addClass("open");b=true;if(!a){a=new google.maps.Map(m.get(0),{zoom:8,center:j[1].geometry.location,mapTypeId:google.maps.MapTypeId.ROADMAP});new google.maps.Marker({map:a,position:j[1].geometry.location,title:j[1].formatted_address})}}var j,a,b=false;JIRA.bind(JIRA.Events.NEW_CONTENT_ADDED,function(s,o,r){if(r=="panelRefreshed"||r=="pageLoad"){var p=g(".jConnectLocation.ready",o),n=p.find("> a"),m,q;if(n.length){f(function(){if(p.hasClass("ready")){m=new google.maps.LatLng(n.data("lat"),n.data("long"));q=new google.maps.Geocoder();q.geocode({latLng:m},function(u,t){if(t==google.maps.GeocoderStatus.OK){j=u;if(u[1]){n.text(u[1].formatted_address)}}});p.removeClass("ready");a=null;if(b){l(p)}n.click(function(t){t.preventDefault();t.stopPropagation();d(p)})}})}}})})(AJS.$);;
;
/* module-key = 'com.atlassian.auiplugin:internal-@atlassian-aui-src-js-aui-dialog2', location = 'node_modules/@atlassian/aui/src/js/aui/dialog2.js' */
("undefined"===typeof window?global:window).__bdbf9d213bf319eb4577ef21ac6c491c=function(){function f(a){return a&&a.__esModule?a:{"default":a}}function e(a){var c=this.$el=a?(0,g.default)(a):(0,g.default)(aui.dialog.dialog2({}));g.default.each(i,function(a,b){var d="data-"+a;c[0].hasAttribute(d)||c.attr(d,b)})}var h={};"use strict";Object.defineProperty(h,"__esModule",{value:!0});var g=f(__307d3e18fd611f85395c67cddeb1fe24),j=f(__574ac67f906effeb9d8ec2753b23cf28),k=f(__4d02fe17b8e885a34493e34af3d145dd),
b=f(__fe0cd0a7ef176e2ef4e0e105d1ce31f5),l=f(__e3152236c406a356c24f20f7bfcccf21),i={"aui-focus":"false","aui-blanketed":"true"};e.prototype.on=function(a,c){(0,b.default)(this.$el).on(a,c);return this};e.prototype.off=function(a,c){(0,b.default)(this.$el).off(a,c);return this};e.prototype.show=function(){(0,b.default)(this.$el).show();return this};e.prototype.hide=function(){(0,b.default)(this.$el).hide();return this};e.prototype.remove=function(){(0,b.default)(this.$el).remove();return this};e.prototype.isVisible=
function(){return(0,b.default)(this.$el).isVisible()};var d=(0,l.default)("dialog2",e);d.on=function(a,c){b.default.on(a,".aui-dialog2",c);return this};d.off=function(a,c){b.default.off(a,".aui-dialog2",c);return this};(0,g.default)(document).on("click",".aui-dialog2-header-close",function(a){a.preventDefault();d((0,g.default)(this).closest(".aui-dialog2")).hide()});d.on("show",function(a,c){var b;[".aui-dialog2-content",".aui-dialog2-footer",".aui-dialog2-header"].some(function(a){b=c.find(a+" :aui-tabbable");
return b.length});b&&b.first().focus()});d.on("hide",function(a,c){var d=(0,b.default)(c);c.data("aui-remove-on-hide")&&d.remove()});(0,j.default)("aui/dialog2",d);(0,k.default)("dialog2",d);h.default=d;return h=h["default"]}.call(this);;
;
/* module-key = 'com.atlassian.auiplugin:dialog2', location = 'src/soy/dialog2.soy' */
// This file was automatically generated from dialog2.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace aui.dialog.
 */

if (typeof aui == 'undefined') { var aui = {}; }
if (typeof aui.dialog == 'undefined') { aui.dialog = {}; }


aui.dialog.dialog2 = function(opt_data, opt_ignored) {
  return '' + aui.dialog.dialog2Chrome({id: opt_data.id, titleId: opt_data.id ? opt_data.id + '-dialog-title' : null, modal: opt_data.modal, tagName: opt_data.tagName, removeOnHide: opt_data.removeOnHide, visible: opt_data.visible, size: opt_data.size, extraClasses: opt_data.extraClasses, extraAttributes: opt_data.extraAttributes, content: '' + aui.dialog.dialog2Content({id: null, titleText: opt_data.titleText, titleContent: opt_data.titleContent, headerActionContent: opt_data.headerActionContent, headerSecondaryContent: opt_data.headerSecondaryContent, modal: opt_data.modal, content: opt_data.content, footerHintText: opt_data.footerHintText, footerHintContent: opt_data.footerHintContent, footerActionContent: opt_data.footerActionContent})});
};
if (goog.DEBUG) {
  aui.dialog.dialog2.soyTemplateName = 'aui.dialog.dialog2';
}


aui.dialog.dialog2Chrome = function(opt_data, opt_ignored) {
  opt_data = opt_data || {};
  return '<' + soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'section') + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + ((opt_data.titleId) ? ' aria-labelledby="' + soy.$$escapeHtml(opt_data.titleId) + '"' : '') + ' role="dialog" class=" aui-layer aui-dialog2 aui-dialog2-' + soy.$$escapeHtml(opt_data.size ? opt_data.size : 'medium') + aui.renderExtraClasses(opt_data) + '"' + ((opt_data.modal) ? 'data-aui-modal="true"' : '') + ((opt_data.removeOnHide) ? 'data-aui-remove-on-hide="true"' : '') + ((opt_data.visible != true) ? 'aria-hidden="true"' : '') + aui.renderExtraAttributes(opt_data) + '>' + ((opt_data.content) ? soy.$$filterNoAutoescape(opt_data.content) : '') + '</' + soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'section') + '>';
};
if (goog.DEBUG) {
  aui.dialog.dialog2Chrome.soyTemplateName = 'aui.dialog.dialog2Chrome';
}


aui.dialog.dialog2Content = function(opt_data, opt_ignored) {
  opt_data = opt_data || {};
  return '' + aui.dialog.dialog2Header({titleId: opt_data.id ? opt_data.id + '-dialog-title' : null, titleText: opt_data.titleText, titleContent: opt_data.titleContent, actionContent: opt_data.headerActionContent, secondaryContent: opt_data.headerSecondaryContent, modal: opt_data.modal}) + aui.dialog.dialog2Panel(opt_data) + aui.dialog.dialog2Footer({hintText: opt_data.footerHintText, hintContent: opt_data.footerHintContent, actionContent: opt_data.footerActionContent});
};
if (goog.DEBUG) {
  aui.dialog.dialog2Content.soyTemplateName = 'aui.dialog.dialog2Content';
}


aui.dialog.dialog2Header = function(opt_data, opt_ignored) {
  opt_data = opt_data || {};
  return '<header' + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + ' class="aui-dialog2-header' + aui.renderExtraClasses(opt_data) + '"' + aui.renderExtraAttributes(opt_data) + '><h2 ' + ((opt_data.titleId) ? ' id="' + soy.$$escapeHtml(opt_data.titleId) + '"' : '') + ' class="aui-dialog2-header-main">' + ((opt_data.titleText) ? soy.$$escapeHtml(opt_data.titleText) : '') + ((opt_data.titleContent) ? soy.$$filterNoAutoescape(opt_data.titleContent) : '') + '</h2>' + ((opt_data.actionContent) ? '<div class="aui-dialog2-header-actions">' + soy.$$filterNoAutoescape(opt_data.actionContent) + '</div>' : '') + ((opt_data.secondaryContent) ? '<div class="aui-dialog2-header-secondary">' + soy.$$filterNoAutoescape(opt_data.secondaryContent) + '</div>' : '') + ((opt_data.modal != true) ? '<a class="aui-dialog2-header-close"><span class="aui-icon aui-icon-small aui-iconfont-close-dialog">' + soy.$$escapeHtml('\u0417\u0430\u043a\u0440\u044b\u0442\u044c') + '</span></a>' : '') + '</header>';
};
if (goog.DEBUG) {
  aui.dialog.dialog2Header.soyTemplateName = 'aui.dialog.dialog2Header';
}


aui.dialog.dialog2Footer = function(opt_data, opt_ignored) {
  opt_data = opt_data || {};
  return '<footer' + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + ' class="aui-dialog2-footer' + aui.renderExtraClasses(opt_data) + '"' + aui.renderExtraAttributes(opt_data) + '>' + ((opt_data.actionContent) ? '<div class="aui-dialog2-footer-actions">' + soy.$$filterNoAutoescape(opt_data.actionContent) + '</div>' : '') + ((opt_data.hintText || opt_data.hintContent) ? '<div class="aui-dialog2-footer-hint">' + ((opt_data.hintText) ? soy.$$escapeHtml(opt_data.hintText) : '') + ((opt_data.hintContent) ? soy.$$filterNoAutoescape(opt_data.hintContent) : '') + '</div>' : '') + '</footer>';
};
if (goog.DEBUG) {
  aui.dialog.dialog2Footer.soyTemplateName = 'aui.dialog.dialog2Footer';
}


aui.dialog.dialog2Panel = function(opt_data, opt_ignored) {
  opt_data = opt_data || {};
  return '<div' + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + ' class="aui-dialog2-content' + aui.renderExtraClasses(opt_data) + '"' + aui.renderExtraAttributes(opt_data) + '>' + ((opt_data.content) ? soy.$$filterNoAutoescape(opt_data.content) : '') + '</div>';
};
if (goog.DEBUG) {
  aui.dialog.dialog2Panel.soyTemplateName = 'aui.dialog.dialog2Panel';
}
;
;
/* module-key = 'com.atlassian.plugins.atlassian-connect-plugin:dialog-options-v5', location = 'v5/js/iframe/host/dialog-options.js' */
(function(){window._AP=window._AP||{};var a;a=WRM.data.claim("com.atlassian.plugins.atlassian-connect-plugin:dialog-options.data");for(var b in a)a.hasOwnProperty(b)&&(window._AP[b]=a[b])})();;
;
/* module-key = 'com.atlassian.plugins.atlassian-connect-plugin:ap-core-v5', location = 'v5/js/core/connect-host.js' */
(function(y,m){"object"===typeof exports&&"undefined"!==typeof module?module.exports=m():"function"===typeof define&&define.amd?define("connectHost",m):y.connectHost=m()})(this,function(){function y(){}function m(){m.init.call(this)}function Aa(b,a,d,c){var e,g;if("function"!==typeof d)throw new TypeError('"listener" argument must be a function');(e=b._events)?(e.newListener&&(b.emit("newListener",a,d.listener?d.listener:d),e=b._events),g=e[a]):(e=b._events=new y,b._eventsCount=0);g?("function"===
typeof g?g=e[a]=c?[d,g]:[g,d]:c?g.unshift(d):g.push(d),g.warned||(d=void 0===b._maxListeners?m.defaultMaxListeners:b._maxListeners)&&0<d&&g.length>d&&(g.warned=!0,d=Error("Possible EventEmitter memory leak detected. "+g.length+" "+a+" listeners added. Use emitter.setMaxListeners() to increase limit"),d.name="MaxListenersExceededWarning",d.emitter=b,d.type=a,d.count=g.length,"function"===typeof console.warn?console.warn(d):console.log(d))):(e[a]=d,++b._eventsCount);return b}function Ba(b,a,d){function c(){b.removeListener(a,
c);e||(e=!0,d.apply(b,arguments))}var e=!1;c.listener=d;return c}function Ca(b){var a=this._events;if(a){b=a[b];if("function"===typeof b)return 1;if(b)return b.length}return 0}function Q(b,a){for(var d=Array(a);a--;)d[a]=b[a];return d}function Da(b){if(!b)throw Error("No selector to escape");return b.replace(/[!"#$%&'()*+,.\/:;<=>?@[\\\]^`{|}~]/g,"\\$\x26")}function K(b,a){return a.encode?a.strict?gb(b):encodeURIComponent(b):b}function Ea(){}function Fa(b){try{return decodeURIComponent(b)}catch(a){return String.fromCharCode(65533)}}
function hb(b){var a=4-b.length%4;1===a?b+="\x3d":2===a&&(b+="\x3d\x3d");return ib.prototype.decode(jb(b))}function ja(b){if(null===b||""===b)throw"Invalid JWT: must be neither null nor empty-string.";var a=b.indexOf("."),d=b.indexOf(".",a+1);if(0>a||d<=a)throw'Invalid JWT: must contain 2 period (".") characters.';b=b.substring(a+1,d);if(null===b||""===b)throw"Invalid JWT: encoded claims must be neither null nor empty-string.";b=hb.call(window,b);return JSON.parse(b)}function ka(b){return Z.parse(Z.extract(b)).jwt}
function Ga(b){return{addon_key:b.addon_key,key:b.key,url:b.url,options:b.options}}function aa(b){b=(b=b.attr("class"))?b.match(/ap-plugin-key-([^\s]*)/):null;return Array.isArray(b)?b[1]:!1}function la(b){b=(b=b.attr("class"))?b.match(/ap-module-key-([^\s]*)/):null;return Array.isArray(b)?b[1]:!1}function Ha(b){return aa(b)+"__"+la(b)}function Ia(b,a,d){b+="Modules";if(window._AP&&window._AP[b]&&window._AP[b][a]&&window._AP[b][a][d])return k.extend({},window._AP[b][a][d].options)}function Ja(b,a){var d=
aa(a);a=(a=a.attr("class"))?a.match(/ap-target-key-([^\s]*)/):null;a=Array.isArray(a)?a[1]:!1;return Ia(b,d,a)}function Ka(b){var a=b.attr("href"),d={},c;a||(a=b.find("a").attr("href"));if(a){var e=a.indexOf("#");if(0<=e){b=a.substring(e+1);try{c=JSON.parse(decodeURI(b))}catch(g){console.error("ACJS: cannot decode webitem anchor")}c&&window._AP&&window._AP._convertConnectOptions?d=window._AP._convertConnectOptions(c):console.error("ACJS: cannot convert webitem url to connect iframe options")}else c=
Ha(b),e=b.hasClass("ap-inline-dialog")?"inlineDialog":"dialog",d=Ja(e,b),!d&&window._AP&&window._AP[e+"Options"]&&(d=k.extend({},window._AP[e+"Options"][c])||{}),d||(d={},console.warn("no webitem "+e+"Options for "+c)),d.productContext=d.productContext||{},a=Z.parse(Z.extract(a)),k.extend(d.productContext,a),d={addon_key:aa(b),key:la(b),options:d}}return d}function D(){var b=AJS.LayerManager.global.getTopLayer();if(b&&kb.test(b.attr("id")))return b=AJS.dialog2(b),b._id=b.$el.attr("id").replace("ap-dialog-",
""),b}function La(b){var a=b.find(".header-control-panel");a.length||(a=b.find(".aui-dialog2-footer-actions"));return a}function ba(b,a){return La(a).find(".aui-button").filter(function(){return w.getIdentifier(this)===b})}function lb(b){var a={},d=["closeable","fadeout","delay","duration","id"];"object"===("undefined"===typeof b?"undefined":u(b))&&d.forEach(function(d){d in b&&(a[d]=b[d])});return a}function mb(){h(document).on("aui-message-close",function(b,a){b=a.attr("id").replace("ap-message-",
"");if(G[b]){if(h.isFunction(G[b].onCloseTrigger))G[b].onCloseTrigger();G[b]._destroy()}})}function L(b){return{constructor:function(a,d,c,e){e=k.last(arguments);var g=e._id;"string"!==typeof a&&(a="");"string"!==typeof d&&(d="");"object"!==("undefined"===typeof c?"undefined":u(c))&&(c={});c.id="ap-message-"+g;var l=a,f=d,M=c,r=e,E="AP.messages."+b;console.warn("DEPRECATED API - AP.messages."+b+" has been deprecated since ACJS 5.0 and will be removed in a future release. Use AP.flag.create instead.");
ca.trackDeprecatedMethodUsed(E,r._context.extension);if(r=p.getFrameworkAdaptor().getProviderByModuleName("messages"))E=r[b],E||(r[b]=r.generic),E(l,f,M);else{Ma||(mb(),Ma=!0);r=h("#ac-message-container");1>r.length&&(r=h('\x3cdiv id\x3d"ac-message-container" /\x3e').appendTo("body"));M=lb(M);h.extend(M,{title:l,body:AJS.escapeHtml(f)});if(0>Na.indexOf(b))throw"Invalid message type. Must be: "+Na.join(", ");Oa.test(M.id)&&(AJS.messages[b](r,M),r.css("margin-left","-"+r.innerWidth()/2+"px"))}G[g]=
this}}}function nb(){Pa||(h(document).on("aui-flag-close",function(b){b=ma.cleanKey(b.target.id);R.closed(b)}),h(document).on("click",".ac-flag-actions",function(b){var a=h(b.target);b=a.data("key");a=a.data("flag_id");R.actionInvoked(b,a)}),Pa=!0)}function Qa(b,a,d){if(S[b]){var c=S[b].extension;d=d||{};d.flagIdentifier=b;v.broadcast(a,{extension_id:c.extension_id},d)}}function Ra(){window.removeEventListener("scroll",Sa);da=na=void 0}function Sa(){var b=document.documentElement.scrollHeight,a=window.innerHeight,
d=.1*b;window.pageYOffset<=d?Ta("nearTop"):a+window.pageYOffset+d>=b?Ta("nearBottom"):da=void 0}function Ta(b){da!==b&&(v.broadcast("scroll."+b,{id:na},{}),da=b)}function ob(b){return b.map(function(a){if(a.list&&Array.isArray(a.list)){var d={heading:a.heading};d.items=a.list.map(function(d){var a={};if("string"===typeof d)a.content=d;else if(d.text&&"string"===typeof d.text)a.content=d.text,"boolean"===typeof d.disabled&&(a.disabled=d.disabled),"undefined"!==typeof d.itemId&&(a.itemId=d.itemId);
else throw Error("Unknown dropdown list item format.");return a});return d}})}y.prototype=Object.create(null);m.EventEmitter=m;m.usingDomains=!1;m.prototype.domain=void 0;m.prototype._events=void 0;m.prototype._maxListeners=void 0;m.defaultMaxListeners=10;m.init=function(){this.domain=null;!m.usingDomains||!(void 0).active||this instanceof(void 0).Domain||(this.domain=(void 0).active);this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=new y,this._eventsCount=0);this._maxListeners=
this._maxListeners||void 0};m.prototype.setMaxListeners=function(b){if("number"!==typeof b||0>b||isNaN(b))throw new TypeError('"n" argument must be a positive number');this._maxListeners=b;return this};m.prototype.getMaxListeners=function(){return void 0===this._maxListeners?m.defaultMaxListeners:this._maxListeners};m.prototype.emit=function(b){var a,d,c,e,g;e="error"===b;if(a=this._events)e=e&&null==a.error;else if(!e)return!1;d=this.domain;if(e){a=arguments[1];if(d)a||(a=Error('Uncaught, unspecified "error" event')),
a.domainEmitter=this,a.domain=d,a.domainThrown=!1,d.emit("error",a);else{if(a instanceof Error)throw a;d=Error('Uncaught, unspecified "error" event. ('+a+")");d.context=a;throw d;}return!1}d=a[b];if(!d)return!1;a="function"===typeof d;c=arguments.length;switch(c){case 1:if(a)d.call(this);else for(a=d.length,d=Q(d,a),e=0;e<a;++e)d[e].call(this);break;case 2:e=arguments[1];if(a)d.call(this,e);else for(a=d.length,d=Q(d,a),c=0;c<a;++c)d[c].call(this,e);break;case 3:e=arguments[1];c=arguments[2];if(a)d.call(this,
e,c);else for(a=d.length,d=Q(d,a),g=0;g<a;++g)d[g].call(this,e,c);break;case 4:e=arguments[1];c=arguments[2];g=arguments[3];if(a)d.call(this,e,c,g);else{a=d.length;d=Q(d,a);for(var l=0;l<a;++l)d[l].call(this,e,c,g)}break;default:e=Array(c-1);for(g=1;g<c;g++)e[g-1]=arguments[g];if(a)d.apply(this,e);else for(a=d.length,d=Q(d,a),c=0;c<a;++c)d[c].apply(this,e)}return!0};m.prototype.addListener=function(b,a){return Aa(this,b,a,!1)};m.prototype.on=m.prototype.addListener;m.prototype.prependListener=function(b,
a){return Aa(this,b,a,!0)};m.prototype.once=function(b,a){if("function"!==typeof a)throw new TypeError('"listener" argument must be a function');this.on(b,Ba(this,b,a));return this};m.prototype.prependOnceListener=function(b,a){if("function"!==typeof a)throw new TypeError('"listener" argument must be a function');this.prependListener(b,Ba(this,b,a));return this};m.prototype.removeListener=function(b,a){var d,c,e,g,l;if("function"!==typeof a)throw new TypeError('"listener" argument must be a function');
c=this._events;if(!c)return this;d=c[b];if(!d)return this;if(d===a||d.listener&&d.listener===a)0===--this._eventsCount?this._events=new y:(delete c[b],c.removeListener&&this.emit("removeListener",b,d.listener||a));else if("function"!==typeof d){e=-1;for(g=d.length;0<g--;)if(d[g]===a||d[g].listener&&d[g].listener===a){l=d[g].listener;e=g;break}if(0>e)return this;if(1===d.length){d[0]=void 0;if(0===--this._eventsCount)return this._events=new y,this;delete c[b]}else{g=e+1;for(var f=d.length;g<f;e+=1,
g+=1)d[e]=d[g];d.pop()}c.removeListener&&this.emit("removeListener",b,l||a)}return this};m.prototype.removeAllListeners=function(b){var a;a=this._events;if(!a)return this;if(!a.removeListener)return 0===arguments.length?(this._events=new y,this._eventsCount=0):a[b]&&(0===--this._eventsCount?this._events=new y:delete a[b]),this;if(0===arguments.length){a=Object.keys(a);for(var d=0,c;d<a.length;++d)c=a[d],"removeListener"!==c&&this.removeAllListeners(c);this.removeAllListeners("removeListener");this._events=
new y;this._eventsCount=0;return this}a=a[b];if("function"===typeof a)this.removeListener(b,a);else if(a){do this.removeListener(b,a[a.length-1]);while(a[0])}return this};m.prototype.listeners=function(b){var a=this._events;if(a)if(b=a[b])if("function"===typeof b)b=[b.listener||b];else{for(var a=Array(b.length),d=0;d<a.length;++d)a[d]=b[d].listener||b[d];b=a}else b=[];else b=[];return b};m.listenerCount=function(b,a){return"function"===typeof b.listenerCount?b.listenerCount(a):Ca.call(b,a)};m.prototype.listenerCount=
Ca;m.prototype.eventNames=function(){return 0<this._eventsCount?Reflect.ownKeys(this._events):[]};var u="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(b){return typeof b}:function(b){return b&&"function"===typeof Symbol&&b.constructor===Symbol&&b!==Symbol.prototype?"symbol":typeof b},n=function(b,a){if(!(b instanceof a))throw new TypeError("Cannot call a class as a function");},Ua=function(b,a){if("function"!==typeof a&&null!==a)throw new TypeError("Super expression must either be null or a function, not "+
typeof a);b.prototype=Object.create(a&&a.prototype,{constructor:{value:b,enumerable:!1,writable:!0,configurable:!0}});a&&(Object.setPrototypeOf?Object.setPrototypeOf(b,a):b.__proto__=a)},Va=function(b,a){if(!b)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!a||"object"!==typeof a&&"function"!==typeof a?b:a},f=new (function(b){function a(){n(this,a);var d=Va(this,b.call(this));d.setMaxListeners(20);return d}Ua(a,b);a.prototype.dispatch=function(d){for(var a=
arguments.length,b=Array(1<a?a-1:0),g=1;g<a;g++)b[g-1]=arguments[g];this.emit.apply(this,["before:"+d].concat(b));this.emit.apply(this,arguments);this.emit.apply(this,["after:"+d].concat(b))};a.prototype.registerOnce=function(d,a){if("string"===typeof d)this.once(d,a);else throw"ACJS: event name must be string";};a.prototype.register=function(d,a){if("string"===typeof d)this.on(d,a);else throw"ACJS: event name must be string";};a.prototype.unregister=function(d,a){if("string"===typeof d)this.removeListener(d,
a);else throw"ACJS: event name must be string";};return a}(m)),h=window.AJS&&window.AJS.$||function(){},A=new (function(){function b(){n(this,b);this._addons={}}b.prototype._track=function(a,d){var c=window;a="connect.addon."+a;d=d||{};d.version=c._AP&&c._AP.version?c._AP.version:void 0;d.userAgent=c.navigator.userAgent;if(!c.AJS)return!1;if(c.AJS.Analytics)c.AJS.Analytics.triggerPrivacyPolicySafeEvent(a,d);else if(c.AJS.trigger)AJS.trigger("analyticsEvent",{name:a,data:d});else return!1;return!0};
b.prototype._time=function(){return window.performance&&window.performance.now?window.performance.now():(new Date).getTime()};b.prototype.trackLoadingStarted=function(a){this._addons&&a&&a.id?(a.startLoading=this._time(),this._addons[a.id]=a):console.error("ACJS: cannot track loading analytics",this._addons,a)};b.prototype.trackLoadingEnded=function(a){if(this._addons&&a&&this._addons[a.id]){var d=a.url,d=void 0!==d&&-1===d.indexOf("xdm_e\x3d"),c=this._time()-this._addons[a.id].startLoading,b=this.getIframeLoadApdex(c);
this._track("iframe.performance.load",{addonKey:a.addon_key,moduleKey:a.key,iframeLoadMillis:c,iframeLoadApdex:b,iframeIsCacheable:d,value:2E4<c?"x":Math.ceil(c/100)})}else console.error("ACJS: cannot track loading end analytics",this._addons,a)};b.prototype.getIframeLoadApdex=function(a){return 300>=a?1:1200>=a?.5:0};b.prototype.trackLoadingTimeout=function(a){this._track("iframe.performance.timeout",{addonKey:a.addon_key,moduleKey:a.key});this.trackLoadingEnded(a)};b.prototype.trackLoadingCancel=
function(a){this._track("iframe.performance.cancel",{addonKey:a.addon_key,moduleKey:a.key})};b.prototype.trackUseOfDeprecatedMethod=function(a,d){this._track("jsapi.deprecated",{addonKey:d.addon_key,moduleKey:d.key,methodUsed:a})};b.prototype.trackMultipleDialogOpening=function(a,d){this._track("jsapi.dialog.multiple",{addonKey:d.addon_key,moduleKey:d.key,dialogType:a})};b.prototype.dispatch=function(a,d){this._track(a,d)};return b}());h.fn&&f.register("iframe-create",function(b){A.trackLoadingStarted(b.extension)});
f.register("iframe-bridge-start",function(b){A.trackLoadingStarted(b.extension)});f.register("iframe-bridge-established",function(b){A.trackLoadingEnded(b.extension)});f.register("iframe-bridge-timeout",function(b){A.trackLoadingTimeout(b.extension)});f.register("iframe-bridge-cancelled",function(b){A.trackLoadingCancel(b.extension)});f.register("analytics-deprecated-method-used",function(b){A.trackUseOfDeprecatedMethod(b.methodUsed,b.extension)});f.register("iframe-destroyed",function(b){delete A._addons[b.extension.extension_id]});
var Wa={timeout:function(b,a){f.dispatch("iframe-bridge-timeout",{$el:b,extension:a})},cancelled:function(b,a){f.dispatch("iframe-bridge-cancelled",{$el:b,extension:a})}},oa={loading:'\x3cdiv class\x3d"ap-loading"\x3e\x3cdiv class\x3d"small-spinner"\x3e\x3c/div\x3eLoading app...\x3c/div\x3e',"load-timeout":'\x3cdiv class\x3d"ap-load-timeout"\x3e\x3cdiv class\x3d"small-spinner"\x3e\x3c/div\x3eApp is not responding. Wait or \x3ca href\x3d"#" class\x3d"ap-btn-cancel"\x3ecancel\x3c/a\x3e?\x3c/div\x3e',
"load-error":"App failed to load."},T=new (function(){function b(){n(this,b);this._stateRegistry={}}b.prototype._loadingContainer=function(a){return a.find(".ap-status-indicator")};b.prototype.render=function(){var a=document.createElement("div");a.classList.add("ap-status-indicator");a.innerHTML=oa.loading;a=h(a);this._startSpinner(a);return a};b.prototype._startSpinner=function(a){setTimeout(function(){var d=a.find(".small-spinner");d.length&&d.spin&&d.spin({lines:12,length:3,width:2,radius:3,trail:60,
speed:1.5,zIndex:1})},10)};b.prototype.hide=function(a,d){clearTimeout(this._stateRegistry[d]);delete this._stateRegistry[d];this._loadingContainer(a)[0].style.display="none"};b.prototype.cancelled=function(a,d){d=oa["load-error"];this._loadingContainer(a).empty().text(d)};b.prototype._setupTimeout=function(a,d){this._stateRegistry[d.id]=setTimeout(function(){Wa.timeout(a,d)},12E3)};b.prototype.timeout=function(a,d){var c=h(oa["load-timeout"]),b=this._loadingContainer(a);b.empty().append(c);this._startSpinner(b);
h("a.ap-btn-cancel",b).click(function(){Wa.cancelled(a,d)});delete this._stateRegistry[d];return b};return b}());f.register("iframe-create",function(b){b.extension.options.noDom||T._setupTimeout(b.$el.parents(".ap-iframe-container"),b.extension)});f.register("iframe-bridge-established",function(b){b.extension.options.noDom||T.hide(b.$el.parents(".ap-iframe-container"),b.extension.id)});f.register("iframe-bridge-timeout",function(b){b.extension.options.noDom||T.timeout(b.$el,b.extension.id)});f.register("iframe-bridge-cancelled",
function(b){b.extension.options.noDom||T.cancelled(b.$el,b.extension.id)});for(var Xa=Function.prototype.bind,t={locationOrigin:function(){return window.location.origin?window.location.origin:window.location.protocol+"//"+window.location.hostname+(window.location.port?":"+window.location.port:"")},randomString:function(){return Math.floor(1E9*Math.random()).toString(16)},isString:function(b){return"string"===typeof b||b instanceof String},argumentsToArray:function(b){return Array.prototype.slice.call(b)},
argumentNames:function(b){return b.toString().replace(/((\/\/.*$)|(\/\*[^]*?\*\/))/mg,"").replace(/[^(]+\(([^)]*)[^]+/,"$1").match(/([^\s,]+)/g)||[]},hasCallback:function(b){var a=b.length;return 0<a&&"function"===typeof b[a-1]},error:function(b){if(window.console&&window.console.error){var a=[];"string"===typeof b?(a.push("[Simple-XDM] "+b),a=a.concat(Array.prototype.slice.call(arguments,1))):(a.push("[Simple-XDM] "),a=a.concat(Array.prototype.slice.call(arguments)));window.console.error.apply(null,
a)}},warn:function(b){window.console&&console.warn("[Simple-XDM] "+b)},log:function(b){window.console&&window.console.log("[Simple-XDM] "+b)},_bind:function(b,a){return Xa&&a.bind===Xa?a.bind(b):function(){return a.apply(b,arguments)}},throttle:function(b,a,d){var c=0;return function(){var e=Date.now();e-c>a&&(c=e,b.apply(d,arguments))}},each:function(b,a){var d,c;if(b)if(d=b.length,null!=d&&"function"!==typeof b)for(c=0;c<d&&!1!==a.call(b[c],c,b[c]);)c+=1;else for(c in b)if(b.hasOwnProperty(c)&&
!1===a.call(b[c],c,b[c]))break},extend:function(b){var a=arguments;[].slice.call(a,1,a.length).forEach(function(d){"object"===("undefined"===typeof d?"undefined":u(d))&&Object.getOwnPropertyNames(d).forEach(function(a){b[a]=d[a]})});return b},sanitizeStructuredClone:function(b){function a(b){if("function"===typeof b)return e("A function was detected and removed from the message."),null;if(c.some(function(d){return b instanceof d?(e(d.name+" object was detected and removed from the message."),!0):
!1}))return{};if(b&&"object"===("undefined"===typeof b?"undefined":u(b))&&d.every(function(d){return!(b instanceof d)})){var l=void 0;if(Array.isArray(b))l=b.map(function(d){return a(d)});else{if(-1<g.indexOf(b))return e("A circular reference was detected and removed from the message."),null;g.push(b);var l={},f;for(f in b)if(b.hasOwnProperty(f)){var h=a(b[f]);null!==h&&(l[f]=h)}g.pop()}return l}return b}var d=[Boolean,String,Date,RegExp,Blob,File,FileList,ArrayBuffer],c=[Error,Node],e=t.warn,g=[];
return a(b)},getOrigin:function(b,a){if("function"===typeof URL)try{return(new URL(b,a)).origin}catch(e){}var d=document.implementation.createHTMLDocument("");if(a){var c=d.createElement("base");c.href=a;d.head.appendChild(c)}a=d.createElement("a");a.href=b;d.body.appendChild(a);d=a.protocol+"//"+a.hostname;b.match(/\/\/[^/]+:[0-9]+\//)&&(d+=a.port?":"+a.port:"");return d}},pb=function(b){function a(d){n(this,a);d=d||{};var c=Va(this,b.call(this,d));c._registeredExtensions=d.extensions||{};c._registeredAPIModules=
{};c._registeredAPIModules._globals={};c._pendingCallbacks={};c._keycodeCallbacks={};c._clickHandler=null;c._pendingEvents={};c._messageHandlers={init:c._handleInit,req:c._handleRequest,resp:c._handleResponse,broadcast:c._handleBroadcast,event_query:c._handleEventQuery,key_triggered:c._handleKeyTriggered,addon_clicked:c._handleAddonClick,get_host_offset:c._getHostOffset,unload:c._handleUnload,sub:c._handleSubInit};return c}Ua(a,b);a.prototype._padUndefinedArguments=function(d,a){return d.length>=
a?d:d.concat(Array(a-d.length))};a.prototype._verifyAPI=function(d,a){function c(d,a){Object.getOwnPropertyNames(a).forEach(function(b){"object"===u(a[b])&&d[b]?c(d[b],a[b]):"parent"===a[b]&&d[b]&&(f=!0)})}var b=d.data.targets;if(b){var l=this.getApiSpec(),f=!1;c(l,b);d.source.postMessage({type:"api_tamper",tampered:f},a.extension.url)}};a.prototype._handleInit=function(d,a){this._registeredExtensions[a.extension_id].source=d.source;a.initCallback&&(a.initCallback(d.data.eid),delete a.initCallback);
d.data.targets&&this._verifyAPI(d,a)};a.prototype._handleSubInit=function(a,c){this.registerExtension(a.data.ext.id,{extension:a.data.ext})};a.prototype._getHostOffset=function(a,c){var d=a.source,b=null;c=c||window;c===c.top&&"function"===typeof c.getHostOffsetFunctionOverride&&(b=c.getHostOffsetFunctionOverride(d));if("number"!==typeof b)for(b=0;!this._hasSameOrigin(d);)b++,d=d.parent;a.source.postMessage({hostFrameOffset:b},a.origin)};a.prototype._hasSameOrigin=function(a){if(a===a.top)return!0;
try{var d="test_var_"+Math.random().toString(16).substr(2);a[d]=!0;return a[d]}catch(e){}return!1};a.prototype._handleResponse=function(a){a=a.data;var d=this._pendingCallbacks[a.mid];d&&(delete this._pendingCallbacks[a.mid],d.apply(window,a.args))};a.prototype.registerRequestNotifier=function(a){this._registeredRequestNotifier=a};a.prototype._handleRequest=function(a,c){function d(){var d=t.sanitizeStructuredClone(t.argumentsToArray(arguments));a.source.postMessage({mid:a.data.mid,type:"resp",forPlugin:!0,
args:d},c.extension.url)}var b=a.data,l=this._registeredAPIModules[b.mod],f=this.getRegisteredExtensions(c.extension)[0];if(l){var h=b.fn;if(b._cls){var k=l[b._cls],E=b.mod+"-"+b._cls+"-";d._id=b._id;"constructor"===h?(k._construct||(k.constructor.prototype._destroy=function(){delete this._context._proxies[E+this._id]},k._construct=function(){for(var a=arguments.length,d=Array(a),c=0;c<a;c++)d[c]=arguments[c];a=new (Function.prototype.bind.apply(k.constructor,[null].concat(d)));d=d[d.length-1];a._id=
d._id;a._context=d._context;return a._context._proxies[E+a._id]=a}),l=k,h="_construct"):l=f._proxies[E+b._id]}var m=l[h];if(m){var n=b.args,p=m.length-1;"_construct"===h&&(p=l.constructor.length-1);d._context=f;n=this._padUndefinedArguments(n,p);n.push(d);l=m.apply(l,n);m.returnsPromise&&(l&&l instanceof Promise?l.then(function(a){d(void 0,a)}).catch(function(a){a=a instanceof Error?a.message:a;d(a)}):d("Defined module method did not return a promise."));this._registeredRequestNotifier&&this._registeredRequestNotifier.call(null,
{module:b.mod,fn:b.fn,type:b.type,addon_key:c.extension.addon_key,key:c.extension.key,extension_id:c.extension_id})}}};a.prototype._handleBroadcast=function(a,c){a=a.data;this.dispatch(a.etyp,function(a){return a.extension.addon_key===c.extension.addon_key&&a.extension_id!==c.extension_id},a.evnt,null,null)};a.prototype._handleKeyTriggered=function(a,c){var d=a.data;a=this._keycodeKey(d.keycode,d.modifiers,c.extension_id);(a=this._keycodeCallbacks[a])&&a.forEach(function(a){a.call(null,{addon_key:c.extension.addon_key,
key:c.extension.key,extension_id:c.extension_id,keycode:d.keycode,modifiers:d.modifiers})},this)};a.prototype.defineAPIModule=function(a,c){c=c||"_globals";this._registeredAPIModules[c]=t.extend({},this._registeredAPIModules[c]||{},a);return this._registeredAPIModules};a.prototype._pendingEventKey=function(a,c){var d=a.addon_key||"global";a.key&&(d=d+"@@"+a.key);return d+"@@"+c};a.prototype.queueEvent=function(a,c,b,g){if(this._findRegistrations(c).some(function(a){return void 0!==a.registered_events},
this))this.dispatch(a,c,b,g);else{this._cleanupInvalidEvents();var d=(new Date).getTime();this._pendingEvents[this._pendingEventKey(c,d)]={type:a,targetSpec:c,event:b,callback:g,time:d,uid:t.randomString()}}};a.prototype._cleanupInvalidEvents=function(){var a=this,c=(new Date).getTime();Object.keys(this._pendingEvents).forEach(function(d){3E4>=c-a._pendingEvents[d].time||delete a._pendingEvents[d]})};a.prototype._handleEventQuery=function(a,c){var d=this,b={},l=(new Date).getTime();Object.keys(this._pendingEvents).forEach(function(e){var g=
d._pendingEvents[e],f=3E4>=l-g.time,h=!g.targetSpec||0!==d._findRegistrations(g.targetSpec).length;h&&g.targetSpec.key&&(h=g.targetSpec.addon_key===c.extension.addon_key&&g.targetSpec.key===c.extension.key);f&&h?(b[e]=g,g.targetSpec=g.targetSpec||{},d.dispatch(g.type,g.targetSpec,g.event,g.callback,a.source)):f||delete d._pendingEvents[e]});this._registeredExtensions[c.extension_id].registered_events=a.data.args;return b};a.prototype._handleUnload=function(a,c){c&&(c.extension_id&&this._registeredExtensions[c.extension_id]&&
delete this._registeredExtensions[c.extension_id].source,c.unloadCallback&&c.unloadCallback(a.data.eid))};a.prototype.dispatch=function(a,c,b,g,l){function d(d,c){if(d.source&&d.source.postMessage){var b;g&&(b=t.randomString(),this._pendingCallbacks[b]=g);d.source.postMessage({type:"evt",mid:b,etyp:a,evnt:c},d.extension.url)}}this._findRegistrations(c||{}).forEach(function(a){l&&!a.source&&(a.source=l);a.source&&t._bind(this,d)(a,b)},this)};a.prototype._findRegistrations=function(a){var d=this;if(0===
this._registeredExtensions.length)return t.error("no registered extensions",this._registeredExtensions),[];var b=Object.getOwnPropertyNames(a),g=Object.getOwnPropertyNames(this._registeredExtensions).map(function(a){return d._registeredExtensions[a]});return a instanceof Function?g.filter(a):g.filter(function(d){return b.every(function(c){return d.extension[c]===a[c]})})};a.prototype.registerExtension=function(a,c){c._proxies={};c.extension_id=a;this._registeredExtensions[a]=c};a.prototype._keycodeKey=
function(a,c,b){var d=a;c&&("string"===typeof c&&(c=[c]),c.sort(),c.forEach(function(a){d+="$$"+a},this));return d+"__"+b};a.prototype.registerKeyListener=function(a,c,b,g){"string"===typeof b&&(b=[b]);var d=this._registeredExtensions[a];a=this._keycodeKey(c,b,a);this._keycodeCallbacks[a]||(this._keycodeCallbacks[a]=[],d.source.postMessage({type:"key_listen",keycode:c,modifiers:b,action:"add"},d.extension.url));this._keycodeCallbacks[a].push(g)};a.prototype.unregisterKeyListener=function(a,c,b,g){var d=
this._keycodeKey(c,b,a),e=this._keycodeCallbacks[d];a=this._registeredExtensions[a];e&&(g?(g=e.indexOf(g),this._keycodeCallbacks[d].splice(g,1)):delete this._keycodeCallbacks[d],a.source&&a.source.postMessage&&a.source.postMessage({type:"key_listen",keycode:c,modifiers:b,action:"remove"},a.extension.url))};a.prototype.registerClickHandler=function(a){if("function"!==typeof a)throw Error("callback must be a function");if(null!==this._clickHandler)throw Error("ClickHandler already registered");this._clickHandler=
a};a.prototype._handleAddonClick=function(a,b){"function"===typeof this._clickHandler&&this._clickHandler({addon_key:b.extension.addon_key,key:b.extension.key,extension_id:b.extension_id})};a.prototype.unregisterClickHandler=function(){this._clickHandler=null};a.prototype.getApiSpec=function(){function a(a){function d(a){return Object.getOwnPropertyNames(a).reduce(function(b,c){var e=a[c];switch("undefined"===typeof e?"undefined":u(e)){case "function":b[c]={args:t.argumentNames(e),returnsPromise:e.returnsPromise||
!1};break;case "object":e.hasOwnProperty("constructor")&&(b[c]=d(e))}return b},{})}var c=b._registeredAPIModules[a];if(!c)throw Error("unregistered API module: "+a);return d(c)}var b=this;return Object.getOwnPropertyNames(this._registeredAPIModules).reduce(function(d,b){d[b]=a(b);return d},{})};a.prototype._originEqual=function(a,b){function d(a){return"string"===typeof a&&0<a.length}var c=t.getOrigin(a);return d(a)&&d(b)&&d(c)?b===c:!1};a.prototype._checkOrigin=function(a,b){var d=["init"],c=b&&
!b.source&&-1<d.indexOf(a.data.type),d=b&&a.source===b.source;b=b&&this._originEqual(b.extension.url,a.origin)&&(c||d);"get_host_offset"===a.data.type&&window===window.top&&(b=!0);"unload"!==a.data.type||!d&&void 0!==a.source||(b=!0);b||t.log("Failed to validate origin: "+a.origin);return b};a.prototype.getRegisteredExtensions=function(a){return a?this._findRegistrations(a):this._registeredExtensions};a.prototype.unregisterExtension=function(a){a=this._findRegistrations(a);0!==a.length&&a.forEach(function(a){var d=
this;Object.keys(this._pendingEvents).forEach(function(b){var c=d._pendingEvents[b].targetSpec||{};c.addon_key===a.extension.addon_key&&c.key===a.extension.key&&delete d._pendingEvents[b]});delete this._registeredExtensions[a.extension_id]},this)};return a}(function(){function b(a){n(this,b);this._registerListener((a||{}).listenOn)}b.prototype._registerListener=function(a){a&&a.addEventListener||(a=window);a.addEventListener("message",t._bind(this,this._receiveMessage),!1)};b.prototype._receiveMessage=
function(a){var d=this._messageHandlers[a.data.type],b=a.data.eid,e=void 0;b&&this._registeredExtensions&&(e=this._registeredExtensions[b]);if(!d||!this._checkOrigin(a,e))return!1;d.call(this,a,e)};return b}()),q=new (function(){function b(){n(this,b);this._xdm=new pb}b.prototype.dispatch=function(a,d,b,e){this._xdm.queueEvent(a,d,b,e);return this.getExtensions(d)};b.prototype.broadcast=function(a,d,b){this._xdm.dispatch(a,d,b,null,null);return this.getExtensions(d)};b.prototype._createId=function(a){if(!a.addon_key||
!a.key)throw Error("Extensions require addon_key and key");return a.addon_key+"__"+a.key+"__"+t.randomString()};b.prototype.create=function(a,d,b){d=this.registerExtension(a,d,b);b=a.options||{};b={extension_id:d,api:this._xdm.getApiSpec(),origin:t.locationOrigin(),options:b};return{id:d,name:JSON.stringify(b),src:a.url}};b.prototype.registerRequestNotifier=function(a){this._xdm.registerRequestNotifier(a)};b.prototype.registerExtension=function(a,d,b){var c=this._createId(a);this._xdm.registerExtension(c,
{extension:a,initCallback:d,unloadCallback:b});return c};b.prototype.registerKeyListener=function(a,d,b,e){this._xdm.registerKeyListener(a,d,b,e)};b.prototype.unregisterKeyListener=function(a,d,b,e){this._xdm.unregisterKeyListener(a,d,b,e)};b.prototype.registerClickHandler=function(a){this._xdm.registerClickHandler(a)};b.prototype.unregisterClickHandler=function(){this._xdm.unregisterClickHandler()};b.prototype.defineModule=function(a,d,b){this._xdm.defineAPIModule(d,a,b)};b.prototype.defineGlobals=
function(a){this._xdm.defineAPIModule(a)};b.prototype.getExtensions=function(a){return this._xdm.getRegisteredExtensions(a)};b.prototype.unregisterExtension=function(a){return this._xdm.unregisterExtension(a)};b.prototype.returnsPromise=function(a){a.returnsPromise=!0};return b}()),v={broadcast:function(b,a,d){q.dispatch(b,a,d);f.dispatch("event-dispatch",{type:b,targetSpec:a,event:d})},broadcastPublic:function(b,a,d){f.dispatch("event-public-dispatch",{type:b,event:a,sender:d});q.dispatch(b,{},{sender:{addonKey:d.addon_key,
key:d.key,options:t.sanitizeStructuredClone(d.options)},event:a})}},Ya=Object.getOwnPropertySymbols,qb=Object.prototype.hasOwnProperty,rb=Object.prototype.propertyIsEnumerable,pa=function(){try{if(!Object.assign)return!1;var b=new String("abc");b[5]="de";if("5"===Object.getOwnPropertyNames(b)[0])return!1;for(var a={},b=0;10>b;b++)a["_"+String.fromCharCode(b)]=b;if("0123456789"!==Object.getOwnPropertyNames(a).map(function(d){return a[d]}).join(""))return!1;var d={};"abcdefghijklmnopqrst".split("").forEach(function(a){d[a]=
a});return"abcdefghijklmnopqrst"!==Object.keys(Object.assign({},d)).join("")?!1:!0}catch(c){return!1}}()?Object.assign:function(b,a){var d,c;if(null===b||void 0===b)throw new TypeError("Object.assign cannot be called with null or undefined");c=Object(b);for(var e,g=1;g<arguments.length;g++){d=Object(arguments[g]);for(var l in d)qb.call(d,l)&&(c[l]=d[l]);if(Ya){e=Ya(d);for(var f=0;f<e.length;f++)rb.call(d,e[f])&&(c[e[f]]=d[e[f]])}}return c},k={escapeSelector:Da,stringToDimension:function(b){var a,
d="px";"string"===typeof b&&(a=b.indexOf("%")===b.length-1,b=parseInt(b,10),a&&(d="%"));if(!isNaN(b))return b+d},getIframeByExtensionId:function(b){return h("iframe#"+Da(b))},first:function(b,a){return a?b.slice(0,a):b[0]},last:function(b){return b[b.length-1]},pick:function(b,a){return"object"!==("undefined"===typeof b?"undefined":u(b))?{}:Object.keys(b).filter(function(d){return 0<=a.indexOf(d)}).reduce(function(a,c){var d;return pa(a,(d={},d[c]=b[c],d))},{})},debounce:function(b,a){var d;return function(){var c=
this,e=[].slice.call(arguments);d&&clearTimeout(d);d=setTimeout(function(){d=null;b.apply(c,e)},a||50)}},extend:pa},U={open:function(b,a){f.dispatch("dialog-extension-open",{extension:b,options:a})},close:function(){f.dispatch("dialog-close-active",{})},addUserButton:function(b,a){f.dispatch("dialog-button-add",{button:{text:b.text,identifier:b.identifier,data:{userButton:!0}},extension:a})}},z={close:function(b){f.dispatch("dialog-close",{dialog:b.dialog,extension:b.extension,customData:b.customData})},
closeActive:function(b){f.dispatch("dialog-close-active",b)},clickButton:function(b,a,d){f.dispatch("dialog-button-click",{identifier:b,$el:a,extension:d})},toggleButton:function(b){f.dispatch("dialog-button-toggle",b)},toggleButtonVisibility:function(b){f.dispatch("dialog-button-toggle-visibility",b)}},H={registerKeyEvent:function(b){q.registerKeyListener(b.extension_id,b.key,b.modifiers,b.callback);f.dispatch("dom-event-register",b)},unregisterKeyEvent:function(b){q.unregisterKeyListener(b.extension_id,
b.key,b.modifiers,b.callback);f.dispatch("dom-event-unregister",b)},registerWindowKeyEvent:function(b){window.addEventListener("keydown",function(a){a.keyCode===b.keyCode&&b.callback()})},registerClickHandler:function(b){q.registerClickHandler(function(a){(a=document.getElementById(a.extension_id))&&b(a)})},unregisterClickHandler:function(){q.unregisterClickHandler()}},Za=new (function(){function b(){n(this,b)}b.prototype.randomIdentifier=function(){return Math.random().toString(16).substring(7)};
return b}()),F=new (function(){function b(){n(this,b)}b.prototype._maxDimension=function(a,d){a=k.stringToDimension(a);var b=parseInt(a,10);d=parseInt(d,10);return-1<a.indexOf("%")&&100<=b||b>d?"100%":a};b.prototype._closeOnEscape=function(a){return!1===a.closeOnEscape?!1:!0};b.prototype._size=function(a){var d=a.size;"x-large"===a.size&&(d="xlarge");"maximum"!==a.size&&"100%"===a.width&&"100%"===a.height&&(d="fullscreen");return d};b.prototype._header=function(a){var d="";switch("undefined"===typeof a?
"undefined":u(a)){case "string":d=a;break;case "object":d=a.value}return d};b.prototype._hint=function(a){return"string"===typeof a?a:""};b.prototype._chrome=function(a){var d=!1;"boolean"===typeof a.chrome&&(d=a.chrome);"fullscreen"===a.size&&(d=!0);"maximum"===a.size&&(d=!1);return d};b.prototype._width=function(a){if(!a.size)return a.width?this._maxDimension(a.width,h(window).width()):"50%"};b.prototype._height=function(a){if(!a.size)return a.height?this._maxDimension(a.height,h(window).height()):
"50%"};b.prototype._actions=function(a){var d=[];a=a||{};a.actions||(d=[{name:"submit",identifier:"submit",text:a.submitText||"Submit",type:"primary",disabled:!0},{name:"cancel",identifier:"cancel",text:a.cancelText||"Cancel",type:"link",immutable:!0}]);a.buttons&&(d=d.concat(this._buttons(a)));return d};b.prototype._id=function(a){"string"!==typeof a&&(a=Math.random().toString(36).substring(2,8));return a};b.prototype._buttons=function(a){var d=[];a.buttons&&Array.isArray(a.buttons)&&a.buttons.forEach(function(a){var b,
c,l=!1;a.text&&"string"===typeof a.text&&(b=a.text);c=a.identifier&&"string"===typeof a.identifier?a.identifier:Za.randomIdentifier();a.disabled&&!0===a.disabled&&(l=!0);d.push({text:b,identifier:c,type:"secondary",custom:!0,disabled:l})});return d};b.prototype._onHide=function(a){return"function"===typeof a.onHide?a.onHide:function(){}};b.prototype.sanitizeOptions=function(a){a=a||{};a={chrome:this._chrome(a),header:this._header(a.header),hint:this._hint(a.hint),width:this._width(a),height:this._height(a),
$content:a.$content,extension:a.extension,actions:this._actions(a),id:this._id(a.id),size:a.size,closeOnEscape:this._closeOnEscape(a),onHide:this._onHide(a)};a.size=this._size(a);return a};b.prototype.moduleOptionsFromGlobal=function(a,d){var b={chrome:!0};return window._AP&&window._AP.dialogModules&&window._AP.dialogModules[a]&&window._AP.dialogModules[a][d]?k.extend({},b,window._AP.dialogModules[a][d].options):!1};b.prototype.trackMultipleDialogOpening=function(a,d){d=this._size(d);h(".ap-aui-dialog2:visible").length&&
(d=h("#macro-browser-dialog").length||AJS.Confluence&&AJS.Confluence.Editor&&AJS.Confluence.Editor.currentEditMode?"fullscreen"===d?"connect-macro-multiple-fullscreen":"connect-macro-multiple":"connect-multiple",A.trackMultipleDialogOpening(d,a))};b.prototype.assertActiveDialogOrThrow=function(a,d){if(!a.isActiveDialog(d))throw Error("Failed to find an active dialog for: "+d);};return b}()),ea={notifyIframeCreated:function(b,a){f.dispatch("iframe-create",{$el:b,extension:a})},notifyBridgeEstablished:function(b,
a){f.dispatch("iframe-bridge-established",{$el:b,extension:a})},notifyIframeDestroyed:function(b){"string"===typeof b&&(b={id:b});q.getExtensions(b).forEach(function(a){f.dispatch("iframe-destroyed",{extension:a});q.unregisterExtension({id:a.extension_id})},this)},notifyUnloaded:function(b,a){f.dispatch("iframe-unload",{$el:b,extension:a})}},gb=function(b){return encodeURIComponent(b).replace(/[!'()*]/g,function(a){return"%"+a.charCodeAt(0).toString(16).toUpperCase()})},Z={extract:function(b){return b.split("?")[1]||
""},parse:function(b){var a=Object.create(null);if("string"!==typeof b)return a;b=b.trim().replace(/^(\?|#|&)/,"");if(!b)return a;b.split("\x26").forEach(function(d){var b=d.replace(/\+/g," ").split("\x3d");d=b.shift();b=0<b.length?b.join("\x3d"):void 0;d=decodeURIComponent(d);b=void 0===b?null:decodeURIComponent(b);void 0===a[d]?a[d]=b:Array.isArray(a[d])?a[d].push(b):a[d]=[a[d],b]});return a},stringify:function(b,a){a=pa({encode:!0,strict:!0},a);return b?Object.keys(b).sort().map(function(d){var c=
b[d];if(void 0===c)return"";if(null===c)return K(d,a);if(Array.isArray(c)){var e=[];c.slice().forEach(function(b){void 0!==b&&(null===b?e.push(K(d,a)):e.push(K(d,a)+"\x3d"+K(b,a)))});return e.join("\x26")}return K(d,a)+"\x3d"+K(c,a)}).filter(function(a){return 0<a.length}).join("\x26"):""}},jb=function(b){var a,d;d=b.length;if(0<d%4)throw Error("Invalid string. Length must be a multiple of 4");var c=b.indexOf("\x3d");-1===c&&(c=d);d=[c,c===d?0:4-c%4];a=d[0];d=d[1];for(var c=new sb(3*(a+d)/4-d),e=
0,g=0<d?a-4:a,l=0;l<g;l+=4)a=x[b.charCodeAt(l)]<<18|x[b.charCodeAt(l+1)]<<12|x[b.charCodeAt(l+2)]<<6|x[b.charCodeAt(l+3)],c[e++]=a>>16&255,c[e++]=a>>8&255,c[e++]=a&255;2===d&&(a=x[b.charCodeAt(l)]<<2|x[b.charCodeAt(l+1)]>>4,c[e++]=a&255);1===d&&(a=x[b.charCodeAt(l)]<<10|x[b.charCodeAt(l+1)]<<4|x[b.charCodeAt(l+2)]>>2,c[e++]=a>>8&255,c[e++]=a&255);return c},x=[],sb="undefined"!==typeof Uint8Array?Uint8Array:Array,fa=0;64>fa;++fa)x["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charCodeAt(fa)]=
fa;x[45]=62;x[95]=63;Ea.prototype.decode=function(b){for(var a=b.length,d="",c="",a=Math.min(b.length,a||Infinity),e=0;e<a;e++)127>=b[e]?(d+=Fa(c)+String.fromCharCode(b[e]),c=""):c+="%"+b[e].toString(16);return d+Fa(c)};var ib=Ea,$a=60;f.register("jwt-skew-set",function(b){$a=b.skew});var ab={parseJwtIssuer:function(b){return ja(b).iss},parseJwtClaims:ja,isJwtExpired:function(b,a){void 0===a&&(a=$a);b=ja(b);var d=0,c=Math.floor(Date.now()/1E3);b&&b.exp&&(d=b.exp);return d-a<c?!0:!1}},N={hasJwt:function(b){return ka(b)&&
0!==ka(b).length},isJwtExpired:function(b){b=ka(b);return ab.isJwtExpired(b)}},qa={registerContentResolver:function(b){f.dispatch("content-resolver-register-by-extension",b)},requestRefreshUrl:function(b){if(!b.resolver)throw Error("ACJS: No content resolver supplied");var a=b.resolver.call(null,k.extend({classifier:"json"},b.extension));a.fail(function(a,c){f.dispatch("jwt-url-refreshed-failed",{extension:b.extension,$container:b.$container,errorText:c.text})});a.done(function(a){var d={};if("object"===
("undefined"===typeof a?"undefined":u(a)))d=a;else if("string"===typeof a)try{d=JSON.parse(a)}catch(e){console.error("ACJS: invalid response from content resolver")}b.extension.url=d.url;k.extend(b.extension.options,d.options);f.dispatch("jwt-url-refreshed",{extension:b.extension,$container:b.$container,url:b.extension.url})});f.dispatch("jwt-url-refresh-request",{data:b})},setClockSkew:function(b){"number"===typeof b?f.dispatch("jwt-skew-set",{skew:b}):console.error("ACJS: invalid JWT clock skew set")}},
tb={optionsToAttributes:function(b){var a={};b&&"object"===("undefined"===typeof b?"undefined":u(b))&&(b.width&&(a.width=k.stringToDimension(b.width)),b.height&&(a.height=k.stringToDimension(b.height)));return a}},ra=new (function(){function b(){n(this,b);this.store={}}b.prototype.set=function(a,d){if(d){var b={};b[a]=d}else b=a;k.extend(this.store,b)};b.prototype.get=function(a){return a?this.store[a]:k.extend({},this.store)};return b}()),sa={createSimpleXdmExtension:function(b){var a=Ga(b),d=ra.get();
b.options=a.options=k.extend({},a.options);b.options.globalOptions=d;d=q.create(a,function(){b.options.noDOM||(b.$el=h(document.getElementById(b.id)));ea.notifyBridgeEstablished(b.$el,b)},function(){ea.notifyUnloaded(b.$el,b)});a.id=d.id;b.id=d.id;k.extend(d,tb.optionsToAttributes(b.options));return{iframeAttributes:d,extension:b}},extensionConfigSanitizer:Ga},I=new (function(){function b(){n(this,b);this._contentResolver=!1}b.prototype.setContentResolver=function(a){this._contentResolver=a};b.prototype.resize=
function(a,d,b){a=k.stringToDimension(a);d=k.stringToDimension(d);b.css({width:a,height:d});b.trigger("resized",{width:a,height:d})};b.prototype.simpleXdmExtension=function(a,d){!a.url||N.hasJwt(a.url)&&N.isJwtExpired(a.url)?this._contentResolver?qa.requestRefreshUrl({extension:a,resolver:this._contentResolver,$container:d}):console.error("JWT is expired and no content resolver was specified"):this._appendExtension(d,this._simpleXdmCreate(a))};b.prototype._simpleXdmCreate=function(a){var d=sa.createSimpleXdmExtension(a);
a.id=d.iframeAttributes.id;a.$el=this.render(d.iframeAttributes);return a};b.prototype._appendExtension=function(a,d){var b=a.find("iframe");0<b.length&&b.destroy();d.options.hideIframeUntilLoad&&d.$el.css({visibility:"hidden"}).load(function(){d.$el.css({visibility:""})});a.prepend(d.$el);ea.notifyIframeCreated(d.$el,d)};b.prototype._appendExtensionError=function(a,d){var b=h('\x3cdiv class\x3d"connect-resolve-error"\x3e\x3c/div\x3e');d=h("\x3cp /\x3e").text(d);b.append('\x3cp class\x3d"error"\x3eError: The content resolver threw the following error:\x3c/p\x3e');
b.append(d);a.prepend(b)};b.prototype.resolverResponse=function(a){var b=this._simpleXdmCreate(a.extension);this._appendExtension(a.$container,b)};b.prototype.resolverFailResponse=function(a){this._appendExtensionError(a.$container,a.errorText)};b.prototype.render=function(a){a=a||{};a.referrerpolicy="no-referrer";return h("\x3ciframe /\x3e").attr(a).addClass("ap-iframe")};return b}());f.register("iframe-resize",function(b){I.resize(b.width,b.height,b.$el)});f.register("content-resolver-register-by-extension",
function(b){I.setContentResolver(b.callback)});f.register("jwt-url-refreshed",function(b){I.resolverResponse(b)});f.register("jwt-url-refreshed-failed",function(b){I.resolverFailResponse(b)});f.register("after:iframe-bridge-established",function(b){b.extension.options.noDom?b.extension.options.bridgeEstablished=!0:b.$el[0].bridgeEstablished=!0});var ta={clicked:function(b){f.dispatch("button-clicked",{$el:b})},toggle:function(b,a){f.dispatch("button-toggle",{$el:b,disabled:a})},toggleVisibility:function(b,
a){f.dispatch("button-toggle-visibility",{$el:b,hidden:a})}},ub=["primary","link","secondary"],bb=0,w=new (function(){function b(){n(this,b);this.AP_BUTTON_CLASS="ap-aui-button"}b.prototype.setType=function(a,b){b&&0<=ub.indexOf(b)&&a.addClass("aui-button-"+b);return a};b.prototype.setDisabled=function(a,b){"undefined"===typeof b||a.data("immutable")||a.attr("aria-disabled",b);return a};b.prototype.setHidden=function(a,b){"undefined"===typeof b||a.data("immutable")||a.toggle(!b);return a};b.prototype._setId=
function(a,b){b||(b="ap-button-"+bb,bb++);a.attr("id",b);return a};b.prototype._additionalClasses=function(a,b){b&&("string"!==typeof b&&(b=b.join(" ")),a.addClass(b));return a};b.prototype.getName=function(a){return h(a).data("name")};b.prototype.getText=function(a){return h(a).text()};b.prototype.getIdentifier=function(a){return h(a).data("identifier")};b.prototype.isVisible=function(a){return h(a).is(":visible")};b.prototype.isEnabled=function(a){return"true"!==h(a).attr("aria-disabled")};b.prototype.render=
function(a){var b=h("\x3cbutton /\x3e");a=a||{};b.addClass("aui-button "+this.AP_BUTTON_CLASS);b.text(a.text);b.data(a.data);b.data({name:a.name||a.identifier,identifier:a.identifier||Za.randomIdentifier(),immutable:a.immutable||!1});this._additionalClasses(b,a.additionalClasses);this.setType(b,a.type);this.setDisabled(b,a.disabled||!1);this._setId(b,a.id);return b};return b}());h(function(){h("body").on("click","."+w.AP_BUTTON_CLASS,function(b){b=h(b.target).closest("."+w.AP_BUTTON_CLASS);"true"!==
b.attr("aria-disabled")&&ta.clicked(b)})});f.register("button-toggle",function(b){w.setDisabled(b.$el,b.disabled)});f.register("button-toggle-visibility",function(b){w.setHidden(b.$el,b.hidden)});var vb=["ap-iframe-container"],ua=new (function(){function b(){n(this,b)}b.prototype.createExtension=function(a,b){var d=this._renderContainer();b&&!1===b.loadingIndicator||d.append(this._renderLoadingIndicator());I.simpleXdmExtension(a,d);return d};b.prototype._renderContainer=function(a){a=h("\x3cdiv /\x3e").attr(a||
{});a.addClass(vb.join(" "));return a};b.prototype._renderLoadingIndicator=function(){return T.render()};return b}());f.register("iframe-create",function(b){var a="embedded-"+b.extension.id;b.extension.$el.parents(".ap-iframe-container").attr("id",a)});var wb={defineCustomModule:function(b,a){var d={};a?(d.methods=a,d.name=b):d.methods=b;f.dispatch("module-define-custom",d)}},ca={trackDeprecatedMethodUsed:function(b,a){f.dispatch("analytics-deprecated-method-used",{methodUsed:b,extension:a})},trackIframeBridgeStart:function(b){f.dispatch("iframe-bridge-start",
{extension:b})}},B={sanitizeTriggers:function(b){var a;Array.isArray(b)?a=b.join(" "):"string"===typeof b&&(a=b.trim());return a},uniqueId:function(){return"webitem-"+Math.floor(1E9*Math.random()).toString(16)},getExtensionKey:aa,getKey:la,getOptionsForWebItem:function(b){var a=Ha(b),d=b.hasClass("ap-inline-dialog")?"inlineDialog":"dialog",c=Ja(d,b);!c&&window._AP&&window._AP[d+"Options"]&&(c=k.extend({},window._AP[d+"Options"][a])||{});c||(c={},console.warn("no webitem "+d+"Options for "+a));c.productContext=
c.productContext||{};c.structuredContext=c.structuredContext||{};(b=Ka(b))&&b.options&&(k.extend(c.productContext,b.options.productContext),k.extend(c.structuredContext,b.options.structuredContext),c.contextJwt=b.options.contextJwt);return c},getModuleOptionsByAddonAndModuleKey:Ia,getConfigFromTarget:Ka},V=new function a(){var d=this;n(this,a);this._providers={};this.registerProvider=function(a,e){d._providers[a]=e};this.getProvider=function(a){return d._providers[a]}},xb=new (function(){function a(){this.moduleNamesToModules=
new Map}a.prototype.registerModule=function(a,c){c=a.getModuleRegistrationName();this.moduleNamesToModules.set(c,a)};a.prototype.getModuleByName=function(a){return this.moduleNamesToModules.get(a)};a.prototype.getProviderByModuleName=function(a){if((a=this.moduleNamesToModules.get(a))&&a.isEnabled())return a.getProvider()};return a}()),p=new (function(){function a(){var d=this;n(this,a);this.create=function(a){return ua.createExtension(sa.extensionConfigSanitizer(a))};this.dialog={create:function(a,
d){var c=B.getModuleOptionsByAddonAndModuleKey("dialog",a.addon_key,a.key);d=k.extend({},c||{},d);U.open(a,d)},close:function(){U.close()}};this.registerContentResolver={resolveByExtension:function(a){d._contentResolver=a;qa.registerContentResolver({callback:a})}};this.getContentResolver=function(){return d._contentResolver};this.registerProvider=function(a,d){V.registerProvider(a,d)};this.getProvider=function(a){return V.getProvider(a)};this.frameworkAdaptor=xb}a.prototype.createExtension=function(a){a.options=
a.options||{};a.options.noDom=!0;a=sa.createSimpleXdmExtension(a);ca.trackIframeBridgeStart(a.extension);return a};a.prototype.setFrameworkAdaptor=function(a){this.frameworkAdaptor=a};a.prototype.getFrameworkAdaptor=function(){return this.frameworkAdaptor};a.prototype._cleanExtension=function(a){return k.pick(a,["id","addon_key","key","options","url"])};a.prototype.onIframeEstablished=function(a){a._wrapper=function(d){a.call({},{$el:d.$el,extension:this._cleanExtension(d.extension)})}.bind(this);
f.register("after:iframe-bridge-established",a._wrapper)};a.prototype.offIframeEstablished=function(a){if(a._wrapper)f.unregister("after:iframe-bridge-established",a._wrapper);else throw Error("cannot unregister event dispatch listener without _wrapper reference");};a.prototype.onIframeUnload=function(a){var d=this;f.register("after:iframe-unload",function(c){a.call({},{$el:c.$el,extension:d._cleanExtension(c.extension)})})};a.prototype.onPublicEventDispatched=function(a){a._wrapper=function(d){a.call({},
{type:d.type,event:d.event,extension:this._cleanExtension(d.sender)})}.bind(this);f.register("after:event-public-dispatch",a._wrapper)};a.prototype.offPublicEventDispatched=function(a){if(a._wrapper)f.unregister("after:event-public-dispatch",a._wrapper);else throw Error("cannot unregister event dispatch listener without _wrapper reference");};a.prototype.onKeyEvent=function(a,c,e,g){H.registerKeyEvent({extension_id:a,key:c,modifiers:e,callback:g})};a.prototype.offKeyEvent=function(a,c,e,g){H.unregisterKeyEvent({extension_id:a,
key:c,modifiers:e,callback:g})};a.prototype.onFrameClick=function(a){if("function"!==typeof a)throw Error("handleIframeClick must be a function");H.registerClickHandler(a)};a.prototype.offFrameClick=function(){H.unregisterClickHandler()};a.prototype.destroy=function(a){ea.notifyIframeDestroyed({id:a})};a.prototype.defineModule=function(a,c){wb.defineCustomModule(a,c)};a.prototype.broadcastEvent=function(a,c,e){v.broadcast(a,c,e)};a.prototype.getExtensions=function(a){return q.getExtensions(a)};a.prototype.trackDeprecatedMethodUsed=
function(a,c){ca.trackDeprecatedMethodUsed(a,c)};a.prototype.setJwtClockSkew=function(a){qa.setClockSkew(a)};a.prototype.isJwtExpired=function(a,c){return c?ab.isJwtExpired(a):N.isJwtExpired(a)};a.prototype.hasJwt=function(a){return N.hasJwt(a)};a.prototype.setExtensionConfigurationOptions=function(a,c){ra.set(a,c)};a.prototype.getExtensionConfigurationOption=function(a){return ra.get(a)};return a}()),kb=/^ap-dialog-[0-9A-Za-z]+$/,yb="small medium large xlarge fullscreen maximum".split(" "),J=new (function(){function a(){n(this,
a)}a.prototype._renderHeaderCloseBtn=function(){var a=h("\x3ca /\x3e").addClass("aui-dialog2-header-close"),c=h("\x3cspan /\x3e").addClass("aui-icon aui-icon-small aui-iconfont-close-dialog").text("Close");a.append(c);return a};a.prototype._renderFullScreenHeader=function(a,c){var d=h("\x3cdiv /\x3e").addClass("header-title-container aui-item expanded"),g=h("\x3cdiv /\x3e").append(h("\x3cspan /\x3e").addClass("header-title").text(c.header||""));d.append(g);a.append(d).append(this._renderHeaderActions(c.actions,
c.extension));return a};a.prototype._renderHeader=function(a){var d=h("\x3cheader /\x3e").addClass("aui-dialog2-header");if("fullscreen"===a.size)return this._renderFullScreenHeader(d,a);a.header&&(a=h("\x3ch2 /\x3e").addClass("aui-dialog2-header-main").text(a.header),d.append(a));d.append(this._renderHeaderCloseBtn());return d};a.prototype._renderHeaderActions=function(a,c){var d=h("\x3cdiv /\x3e").addClass("aui-item header-control-panel");a[0].additionalClasses=["aui-icon","aui-icon-small","aui-iconfont-success"];
a[1].additionalClasses=["aui-icon","aui-icon-small","aui-iconfont-close-dialog"];this._renderActionButtons(a,c).forEach(function(a){d.append(a)});return d};a.prototype._renderContent=function(a){var d=h("\x3cdiv /\x3e").addClass("aui-dialog2-content");a&&d.append(a);return d};a.prototype._renderFooter=function(a){var d=h("\x3cfooter /\x3e").addClass("aui-dialog2-footer");if("fullscreen"!==a.size){var e=this._renderFooterActions(a.actions,a.extension);d.append(e)}a.hint&&(a=h("\x3cdiv /\x3e").addClass("aui-dialog2-footer-hint").text(a.hint),
d.append(a));return d};a.prototype._renderActionButtons=function(a,c){var d=this,g=[];[].concat(a).forEach(function(a){g.push(d._renderDialogButton({text:a.text,name:a.name,type:a.type,additionalClasses:a.additionalClasses,custom:a.custom||!1,identifier:a.identifier,immutable:a.immutable,disabled:a.disabled||!1},c))});return g};a.prototype._renderFooterActions=function(a,c){var d=h("\x3cdiv /\x3e").addClass("aui-dialog2-footer-actions");this._renderActionButtons(a,c).forEach(function(a){d.append(a)});
return d};a.prototype._renderDialogButton=function(a,c){a.additionalClasses=a.additionalClasses||[];a.additionalClasses.push("ap-aui-dialog-button");a.custom&&a.additionalClasses.push("ap-dialog-custom-button");a=w.render(a);a.extension=c;return a};a.prototype.render=function(a){var d=k.extend({},a);a=F.sanitizeOptions(a);var e=h("\x3csection /\x3e").attr({role:"dialog",id:"ap-dialog-"+a.id});e.attr("data-aui-modal","true");e.data({"aui-remove-on-hide":!0,extension:a.extension});e.addClass("aui-layer aui-dialog2 ap-aui-dialog2");
0<=yb.indexOf(a.size)&&e.addClass("aui-dialog2-"+a.size);if("fullscreen"===a.size||"maximum"===a.size)a.chrome&&e.addClass("ap-header-controls"),e.addClass("aui-dialog2-maximum");e.append(this._renderContent(a.$content));a.chrome?(e.prepend(this._renderHeader({header:a.header,actions:a.actions,size:a.size})),e.append(this._renderFooter({extension:a.extension,actions:a.actions,hint:a.hint,size:a.size}))):e.addClass("aui-dialog2-chromeless");var g=AJS.dialog2(e);g._id=a.id;"fullscreen"===a.size&&(a.height=
a.width="100%");a.size&&"fullscreen"!==a.size||AJS.layer(e).changeSize(a.width,a.height);if(a.onHide)g.on("hide",a.onHide);g.show();g.$el.data("extension",a.extension);g.$el.data("originalOptions",d);return e};a.prototype.setIframeDimensions=function(a){I.resize("100%","100%",a)};a.prototype.getActive=function(){return D()};a.prototype.buttonIsEnabled=function(a){var d=D();if(d)return a=ba(a,d.$el),w.isEnabled(a)};a.prototype.buttonIsVisible=function(a){var d=D();if(d)return a=ba(a,d.$el),w.isVisible(a)};
a.prototype.getByExtension=function(a){var d;if("function"===typeof a)d=a;else{var e=Object.getOwnPropertyNames(a);d=function(d){var c=h(d).data("extension");return e.every(function(d){return c[d]===a[d]})}}return h(".ap-aui-dialog2").toArray().filter(d).map(function(a){return AJS.dialog2(a)})};a.prototype.addButton=function(a,c){c.custom=!0;c=this._renderDialogButton(c,a);a=this.getByExtension({addon_key:a.addon_key,key:a.key})[0].$el;La(a).append(c);return a};return a}());f.register("iframe-bridge-established",
function(a){if(a.extension.options.isDialog){var d=void 0,c=p.getFrameworkAdaptor().getProviderByModuleName("dialog");c?(d=c.close,c.setButtonDisabled("submit",!1)):(z.toggleButton({identifier:"submit",enabled:!0}),d=function(){z.close({dialog:D(),extension:a.extension})});a.extension.options.preventDialogCloseOnEscape||(H.registerKeyEvent({extension_id:a.extension.id,key:27,callback:d}),f.registerOnce("dialog-close",function(d){H.unregisterKeyEvent({extension_id:a.extension.id,key:27})}))}});f.register("dialog-close-active",
function(a){var d=D();d&&z.close({customData:a.customData,dialog:d,extension:a.extension})});f.register("dialog-close",function(a){a.dialog&&a.dialog.hide()});f.register("dialog-button-toggle",function(a){var d=D();d&&(d=ba(a.identifier,d.$el),ta.toggle(d,!a.enabled))});f.register("dialog-button-toggle-visibility",function(a){var d=D();d&&(d=ba(a.identifier,d.$el),ta.toggleVisibility(d,a.hidden))});f.register("button-clicked",function(a){a=a.$el;if(a.hasClass("ap-aui-dialog-button")){var d=a.parents(".ap-aui-dialog2"),
c=d.find("iframe");c.length&&c[0].bridgeEstablished?z.clickButton(w.getIdentifier(a),a,d.data("extension")):z.close({dialog:D(),extension:a.extension})}});h.fn&&(f.register("iframe-create",function(a){a.extension.options&&a.extension.options.isDialog&&J.setIframeDimensions(a.extension.$el)}),f.register("dialog-button-add",function(a){J.addButton(a.extension,a.button)}),f.register("host-window-resize",k.debounce(function(){h(".ap-aui-dialog2").each(function(a,d){a=h(d);a=F.sanitizeOptions(a.data("originalOptions"));
d.style.width=a.width;d.style.height=a.height})},100)));H.registerWindowKeyEvent({keyCode:27,callback:function(){z.closeActive({customData:{},extension:null})}});var O=new (function(){function a(){n(this,a)}a.prototype.render=function(a,c){a.options=a.options||{};c=c||{};a.options.isDialog=!0;a.options.dialogId=c.id;a.options.preventDialogCloseOnEscape=!1===c.closeOnEscape;a.options.hideIframeUntilLoad=!0;var d=ua.createExtension(a);return J.render({extension:a,$content:d,chrome:c.chrome,width:c.width,
height:c.height,size:c.size,header:c.header,hint:c.hint,submitText:c.submitText,cancelText:c.cancelText,buttons:c.buttons,onHide:c.onHide})};a.prototype.getActiveDialog=function(){return J.getActive()};a.prototype.buttonIsEnabled=function(a){return J.buttonIsEnabled(a)};a.prototype.buttonIsVisible=function(a){return J.buttonIsVisible(a)};a.prototype.getByExtension=function(a){"string"===typeof a&&(a={id:a});return J.getByExtension(a)};return a}());f.register("dialog-extension-open",function(a){O.render(a.extension,
a.options)});var cb={};f.register("dialog-close",function(a){a.dialog&&a.extension&&v.broadcast("dialog.close",{addon_key:a.extension.addon_key},a.customData)});f.register("dialog-button-click",function(a){var d={button:{name:w.getName(a.$el),identifier:w.getIdentifier(a.$el),text:w.getText(a.$el)}};a.$el.hasClass("ap-dialog-custom-button")||v.broadcast("dialog."+d.button.name,{addon_key:a.extension.addon_key,key:a.extension.key},d);v.broadcast("dialog.button.click",{addon_key:a.extension.addon_key,
key:a.extension.key},d)});var C=function(){function a(d,c){n(this,a);c=k.last(arguments);var e=p.getFrameworkAdaptor().getProviderByModuleName("dialog");if(e)F.assertActiveDialogOrThrow(e,c._context.extension.addon_key),this.identifier=this.name=d;else{if(!O.getActiveDialog())throw Error("Failed to find an active dialog.");this.identifier=this.name=d;this.enabled=O.buttonIsEnabled(d);this.hidden=!O.buttonIsVisible(d)}}a.prototype.enable=function(){this.setState({enabled:!0})};a.prototype.disable=
function(){this.setState({enabled:!1})};a.prototype.isEnabled=function(a){a=k.last(arguments);var d=p.getFrameworkAdaptor().getProviderByModuleName("dialog");d?a(!d.isButtonDisabled(this.identifier)):a(this.enabled)};a.prototype.toggle=function(){var a=p.getFrameworkAdaptor().getProviderByModuleName("dialog");a?a.toggleButton(this.identifier):this.setState({enabled:!this.enabled})};a.prototype.setState=function(a){var d=p.getFrameworkAdaptor().getProviderByModuleName("dialog");d?d.setButtonDisabled(this.identifier,
!a.enabled):(this.enabled=a.enabled,z.toggleButton({identifier:this.identifier,enabled:this.enabled}))};a.prototype.trigger=function(a){a=k.last(arguments);this.enabled&&z.dialogMessage({name:this.name,extension:a._context.extension})};a.prototype.isHidden=function(a){a=k.last(arguments);var d=p.getFrameworkAdaptor().getProviderByModuleName("dialog");d?a(d.isButtonHidden(this.identifier)):a(this.hidden)};a.prototype.hide=function(){this.setHidden(!0)};a.prototype.show=function(){this.setHidden(!1)};
a.prototype.setHidden=function(a){var d=p.getFrameworkAdaptor().getProviderByModuleName("dialog");d?d.setButtonHidden(this.identifier,a):(this.hidden=a,z.toggleButtonVisibility({identifier:this.identifier,hidden:this.hidden}))};return a}(),zb={create:{constructor:function d(c,e){n(this,d);e=k.last(arguments);var g=e._id,f=e._context.extension,f={addon_key:f.addon_key,key:c.key,options:k.pick(f.options,["customData","productContext"])};f.options.customData=c.customData;var h=F.moduleOptionsFromGlobal(f.addon_key,
f.key);c=k.extend({},h||{},c);c.id=g;if(h=p.getFrameworkAdaptor().getProviderByModuleName("dialog")){var m=function(d){var c=e._context.extension.key,g=e._context.extension.addon_key,f={button:{identifier:d.identifier,name:d.identifier,text:d.text}};0<=["submit","cancel"].indexOf(d.identifier)&&v.broadcast("dialog."+d.identifier,{addon_key:g,key:c},f);v.broadcast("dialog.button.click",{addon_key:g,key:c},f)},r=F.sanitizeOptions(c);f.options.preventDialogCloseOnEscape=!1===r.closeOnEscape;r.actions.map(function(d){return d.onClick=
m.bind(null,d)});h.create(r,f)}else F.trackMultipleDialogOpening(f,c),U.open(f,c);this.customData=c.customData;cb[g]=this}},close:function(d,c){c=k.last(arguments);var e=p.getFrameworkAdaptor().getProviderByModuleName("dialog");e?(F.assertActiveDialogOrThrow(e,c._context.extension.addon_key),v.broadcast("dialog.close",{addon_key:c._context.extension.addon_key},d),e.close()):(e=c._context.extension.options.isDialog?O.getByExtension(c._context.extension.id)[0]:O.getActiveDialog(),z.close({customData:d,
dialog:e,extension:c._context.extension}))},getCustomData:function(d){d=k.last(arguments);var c=cb[d._context.extension.options.dialogId];c?d(c.customData):d(void 0)},getButton:{constructor:C,enable:C.prototype.enable,disable:C.prototype.disable,toggle:C.prototype.toggle,isEnabled:C.prototype.isEnabled,trigger:C.prototype.trigger,hide:C.prototype.hide,show:C.prototype.show,isHidden:C.prototype.isHidden},createButton:{constructor:function c(e,g){n(this,c);g=k.last(arguments);var f=p.getFrameworkAdaptor().getProviderByModuleName("dialog");
f?(F.assertActiveDialogOrThrow(f,g._context.extension.addon_key),f.createButton({identifier:e.identifier,text:e.text,hidden:!1,disabled:e.disabled||!1,onClick:function(){v.broadcast("dialog.button.click",{addon_key:g._context.extension.addon_key,key:g._context.extension.key},{button:{identifier:e.identifier,text:e.text}})}})):U.addUserButton({identifier:e.identifier,text:e.text},g._context.extension)}}};f.register("iframe-resize",function(c){I.resize(c.width,c.height,c.$el)});f.register("iframe-size-to-parent",
function(c){var e=k.getIframeByExtensionId(c.extensionId);c.hideFooter?(e.addClass("full-size-general-page-no-footer"),h("#footer").css({display:"none"}),c=h(window).height()-h("#header \x3e nav").outerHeight()):(c=h(window).height()-h("#header \x3e nav").outerHeight()-h("#footer").outerHeight()-1,e.removeClass("full-size-general-page-no-footer"),h("#footer").css({display:"block"}));f.dispatch("iframe-resize",{width:"100%",height:c+"px",$el:e})});f.register("hide-footer",function(c){c&&h("#footer").css({display:"none"})});
window.addEventListener("resize",function(c){f.dispatch("host-window-resize",c)},!0);var ga={iframeResize:function(c,e,g){var l;l=g.extension_id?k.getIframeByExtensionId(g.extension_id):g;f.dispatch("iframe-resize",{width:c,height:e,$el:l,extension:g.extension})},sizeToParent:function(c,e){f.dispatch("iframe-size-to-parent",{hideFooter:e,extensionId:c})},hideFooter:function(c){f.dispatch("hide-footer",c)}},db=k.debounce,ha={},P=[],ia={},Ab={getLocation:function(c){c=k.last(arguments);c(window.location.href)},
resize:function(c,e,g){g=k.last(arguments);var f=V.getProvider("addon");if(f)f.resize(c,e,g._context);else{var f=g._context.extension.id,h=g._context.extension.options;if(-1!==P.indexOf(f)||h&&h.isDialog)return!1;ha[f]||(ha[f]=db(function(c,e,g){ga.iframeResize(c,e,g._context)},50));ha[f](c,e,g)}return!0},sizeToParent:db(function(c,e){e=k.last(arguments);var g=V.getProvider("addon");g?g.sizeToParent(c,e._context):e._context.extension.options.isFullPage?(k.getIframeByExtensionId(e._context.extension_id).addClass("full-size-general-page"),
ga.sizeToParent(e._context.extension_id,c),ia[e._context.extension_id]={hideFooter:c}):k.getIframeByExtensionId(e._context.extension_id).addClass("full-size-general-page-fail")}),hideFooter:function(c){c&&ga.hideFooter(c)}};f.register("host-window-resize",function(c){Object.getOwnPropertyNames(ia).forEach(function(c){ga.sizeToParent(c,ia[c].hideFooter)})});f.register("after:iframe-unload",function(c){delete ha[c.extension.id];delete ia[c.extension.id];-1!==P.indexOf(c.extension.id)&&P.splice(P.indexOf(c.extension.id),
1)});f.register("before:iframe-size-to-parent",function(c){-1===P.indexOf(c.extensionId)&&P.push(c.extensionId)});var va={hide:function(c){f.dispatch("inline-dialog-hide",{$el:c})},refresh:function(c){f.dispatch("inline-dialog-refresh",{$el:c})},hideTriggered:function(c,e){f.dispatch("inline-dialog-hidden",{extension_id:c,$el:e})},close:function(){f.dispatch("inline-dialog-close",{})},created:function(c){f.dispatch("inline-dialog-opened",{$el:c.$el,trigger:c.trigger,extension:c.extension})}},Na="generic error warning success info hint".split(" "),
Oa=/^ap-message-[0-9A-fa-f]+$/,G={},Ma=!1,Bb={clear:function(c){c="ap-message-"+c._id;if(Oa.test(c)){var e=p.getFrameworkAdaptor().getProviderByModuleName("messages");e?e.clear(c):h("#"+c).closeMessage()}},onClose:function(c,e){e=k.last(arguments);var g=c._id,f=p.getFrameworkAdaptor().getProviderByModuleName("messages");if(f)f.onClose("ap-message-"+c._id,e);else G[g]&&(G[g].onCloseTrigger=e)},generic:L("generic"),error:L("error"),warning:L("warning"),success:L("success"),info:L("info"),hint:L("hint")},
R={actionInvoked:function(c,e){f.dispatch("flag-action-invoked",{id:e,actionId:c})},open:function(c){f.dispatch("flag-open",{id:c})},close:function(c){f.dispatch("flag-close",{id:c})},closed:function(c){f.dispatch("flag-closed",{id:c})}},ma=new (function(){function c(){n(this,c)}c.prototype.cleanKey=function(c){return(c=c.match(/^ap-flag-(.+)$/))&&c[1]?c[1]:null};c.prototype._toHtmlString=function(c){if("string"===h.type(c))return c;if("object"===h.type(c)&&c instanceof h)return c.html()};c.prototype._renderBody=
function(c){c=this._toHtmlString(c);c=h("\x3cdiv /\x3e").html(c);h("\x3cp /\x3e").addClass("ac-flag-actions").appendTo(c);return c.html()};c.prototype._renderActions=function(c,g,f){var e=c.find(".ac-flag-actions");f=f||{};var l;Object.getOwnPropertyNames(f).forEach(function(c){l=h("\x3ca /\x3e").attr("href","#").data({key:c,flag_id:g}).text(f[c]);e.append(l)},this);return c};c.prototype.render=function(c){nb();var e="ap-flag-"+c.id,f=AJS.flag({type:c.type,title:c.title,body:this._renderBody(c.body),
close:c.close});f.setAttribute("id",e);e=h(f);this._renderActions(e,c.id,c.actions);e.addClass("ac-aui-flag");e.close=f.close;return e};c.prototype.close=function(c){document.getElementById(c).close()};return c}()),Pa=!1;f.register("flag-close",function(c){ma.close(c.id)});var S={},eb=function(){function c(e,g){n(this,c);g=k.last(arguments);if("object"===("undefined"===typeof e?"undefined":u(e))){var f=g._id,h=p.getFrameworkAdaptor().getProviderByModuleName("flag");if(h){var m=[];"object"===u(e.actions)&&
(m=Object.getOwnPropertyNames(e.actions).map(function(c){return{actionKey:c,actionText:e.actions[c],executeAction:R.actionInvoked.bind(null,c,f)}}));m={id:f,title:e.title,body:e.body,actions:m,onClose:R.closed,close:e.close,type:(e.type||"info").toLowerCase()};this.flag=h.create(m);(h=V.getProvider("addon"))&&h.registerUnmountCallback&&h.registerUnmountCallback(this.close.bind(this),g._context)}else this.flag=ma.render({type:e.type,title:e.title,body:AJS.escapeHtml(e.body),actions:e.actions,close:e.close,
id:f}),R.open(this.flag.attr("id"));this.onTriggers={};this.extension=g._context.extension;S[g._id]=this;g.call(null,g._id)}}c.prototype.close=function(){this.flag.close()};return c}();f.register("flag-closed",function(c){Qa(c.id,"flag.close");S[c.id]&&delete S[c.id]});f.register("flag-action-invoked",function(c){Qa(c.id,"flag.action",{actionIdentifier:c.actionId})});var Cb={create:{constructor:eb,close:eb.prototype.close}},na=void 0,da=void 0;f.register("iframe-bridge-established",function(c){c.extension.options.isFullPage&&
(window.addEventListener("scroll",Sa),na=c.extension.id)});f.register("iframe-destroyed",function(c){Ra()});f.register("iframe-unload",function(c){Ra()});var fb={itemSelected:function(c,e,g){f.dispatch("dropdown-item-selected",{id:c,item:e,extension:g})}};f.register("dropdown-item-selected",function(c){v.broadcast("dropdown-item-selected",{addon_key:c.extension.addon_key,key:c.extension.key},{dropdownId:c.id,item:c.item})});f.register("iframe-destroyed",function(c){var e=p.getFrameworkAdaptor().getProviderByModuleName("dropdown");
e&&e.destroyByExtension(c.extension.extension_id)});f.register("after:iframe-unload",function(c){var e=p.getFrameworkAdaptor().getProviderByModuleName("dropdown");e&&e.destroyByExtension(c.extension.extension_id)});var W=new (function(){function c(){n(this,c);this._webitems={};this._contentResolver=function(){}}c.prototype.setContentResolver=function(c){this._contentResolver=c};c.prototype.requestContent=function(c){if(c.addon_key&&c.key)return this._contentResolver.call(null,k.extend({classifier:"json"},
c))};c.prototype.getWebItemsBySelector=function(c){var e=this,f=void 0;Object.getOwnPropertyNames(this._webitems).some(function(g){g=e._webitems[g];return g.selector&&g.selector.trim()===c.trim()?(f=g,!0):!1});return f};c.prototype.setWebItem=function(c){return this._webitems[c.name]={name:c.name,selector:c.selector,triggers:c.triggers}};c.prototype._removeTriggers=function(c){var e=this,f=B.sanitizeTriggers(c.triggers);h(function(){h("body").off(f,c.selector,e._webitems[c.name]._on)});delete this._webitems[c.name]._on};
c.prototype._addTriggers=function(c){var e=B.sanitizeTriggers(c.triggers);c._on=function(e){e.preventDefault();var g=h(e.target).closest(c.selector),f=B.getConfigFromTarget(g),f=f&&f.url?f.url:void 0,g={addon_key:B.getExtensionKey(g),key:B.getKey(g),options:B.getOptionsForWebItem(g),url:f};wa.webitemInvoked(c,e,g)};h(function(){h("body").on(e,c.selector,c._on)})};return c}());f.register("webitem-added",function(c){W._addTriggers(c.webitem)});f.register("content-resolver-register-by-extension",function(c){W.setContentResolver(c.callback)});
document.addEventListener("aui-responsive-menu-item-created",function(c){var e=c.detail.originalItem.querySelector('a[class*\x3d"ap-"]');if(e){var g=c.detail.newItem.querySelector("a");[].slice.call(e.classList).forEach(function(c){/^ap-/.test(c)&&g.classList.add(c)})}});var wa={addWebItem:function(c){if(W.getWebItemsBySelector(c.selector))return!1;c=W.setWebItem(c);f.dispatch("webitem-added",{webitem:c})},webitemInvoked:function(c,e,g){f.dispatch("webitem-invoked:"+c.name,{webitem:c,event:e,extension:g})}},
Db={addExtension:function(c){f.dispatch("inline-dialog-extension",{$el:c.$el,extension:c.extension})}},X=new (function(){function c(){n(this,c)}c.prototype.resize=function(c){var e=k.stringToDimension(c.width),f=k.stringToDimension(c.height),h=c.$el.find(".contents");1===h.length&&(h.css({width:e,height:f}),va.refresh(c.$el))};c.prototype.refresh=function(c){c[0].popup.reset()};c.prototype._getInlineDialog=function(c){return AJS.InlineDialog(c)};c.prototype._renderContainer=function(){return h("\x3cdiv /\x3e").addClass("aui-inline-dialog-contents")};
c.prototype._displayInlineDialog=function(c){va.created({$el:c.$el,trigger:c.trigger,extension:c.extension})};c.prototype.hideInlineDialog=function(c){c.hide()};c.prototype.closeInlineDialog=function(){h(".aui-inline-dialog").filter(function(){return 0<h(this).find(".ap-iframe-container").length}).hide()};c.prototype.render=function(c){var e=this,f=h(document.getElementById("inline-dialog-"+c.id));0!==f.length&&f.remove();return AJS.InlineDialog(c.bindTo,c.id,function(g,f,h){g.append(c.$content);
e._displayInlineDialog({extension:c.extension,$el:g,trigger:f});h()},c.inlineDialogOptions)};return c}());f.register("iframe-resize",function(c){var e=c.$el.parents(".aui-inline-dialog");1===e.length&&X.resize({width:c.width,height:c.height,$el:e})});f.register("inline-dialog-refresh",function(c){X.refresh(c.$el)});f.register("inline-dialog-hide",function(c){X.hideInlineDialog(c.$el)});f.register("inline-dialog-close",function(c){X.closeInlineDialog()});var Eb=["mouseover","click"],Y=new (function(){function c(){n(this,
c);this._inlineDialogWebItemSpec={name:"inline-dialog",selector:".ap-inline-dialog",triggers:Eb};this._inlineDialogWebItems={}}c.prototype.getWebItem=function(){return this._inlineDialogWebItemSpec};c.prototype._createInlineDialog=function(c){return X.render({extension:c.extension,id:c.id,bindTo:c.$target,$content:h("\x3cdiv /\x3e"),inlineDialogOptions:c.extension.options})};c.prototype.triggered=function(c){if("click"===c.event.type||c.extension.options.onHover){var e=h(c.event.currentTarget),f=
e.data("inline-dialog-target-uid");this._createInlineDialog({id:f,extension:c.extension,$target:e,options:c.extension.options||{}}).show()}};c.prototype.opened=function(c){var e=c.$el.find("iframe");if(e&&1===e.length&&(e=e.attr("src"),0<e.length)){var f=N.hasJwt(e);if(f&&!N.isJwtExpired(e)||!f)return!1}e=W.requestContent(c.extension);if(!e)return console.warn("no content resolver found"),!1;e.then(function(e){e.options=e.options||{};k.extend(e.options,{autoresize:!0,widthinpx:!0});Db.addExtension({$el:c.$el,
extension:e})});return!0};c.prototype.addExtension=function(c){var e=ua.createExtension(c.extension);c.$el.empty().append(e)};c.prototype.createIfNotExists=function(c){c=h(c.event.currentTarget);var e=c.data("inline-dialog-target-uid");e||(e=B.uniqueId(),c.data("inline-dialog-target-uid",e))};return c}()),xa=Y.getWebItem();f.register("before:webitem-invoked:"+xa.name,function(c){Y.createIfNotExists(c)});f.register("webitem-invoked:"+xa.name,function(c){Y.triggered(c)});f.register("inline-dialog-opened",
function(c){Y.opened(c)});f.register("inline-dialog-extension",function(c){Y.addExtension(c)});wa.addWebItem(xa);var Fb=["click"],Gb={chrome:!0},ya=new (function(){function c(){n(this,c);this._dialogWebItem={name:"dialog",selector:".ap-dialog",triggers:Fb}}c.prototype.getWebItem=function(){return this._dialogWebItem};c.prototype._dialogOptions=function(c){return k.extend({},Gb,c||{})};c.prototype.triggered=function(c){var e=h(c.event.currentTarget).data("dialog-target-uid"),f=this._dialogOptions(c.extension.options);
f.id=e;U.open(c.extension,f)};c.prototype.createIfNotExists=function(c){c=h(c.event.currentTarget);var e=c.data("dialog-target-uid");e||(e=B.uniqueId(),c.data("dialog-target-uid",e))};return c}()),za=ya.getWebItem();f.register("webitem-invoked:"+za.name,function(c){ya.triggered(c)});f.register("before:webitem-invoked:"+za.name,ya.createIfNotExists);wa.addWebItem(za);window._AP||(window._AP={});window._AP.version||(window._AP.version="5.1.69");q.defineModule("messages",Bb);q.defineModule("flag",Cb);
q.defineModule("dialog",zb);q.defineModule("inlineDialog",{hide:function(c){c=k.last(arguments);var e=p.getFrameworkAdaptor().getProviderByModuleName("inlineDialog");e?e.hide(c._context):va.close()}});q.defineModule("env",Ab);q.defineModule("events",{emit:function(c){for(var e=arguments.length,f=Array(1<e?e-1:0),h=1;h<e;h++)f[h-1]=arguments[h];e=k.last(f);f=k.first(f,-1);v.broadcast(c,{addon_key:e._context.extension.addon_key},f)},emitPublic:function(c){for(var e=arguments.length,f=Array(1<e?e-1:
0),h=1;h<e;h++)f[h-1]=arguments[h];e=k.last(f)._context.extension;f=k.first(f,-1);v.broadcastPublic(c,f,e)}});q.defineModule("_analytics",{trackDeprecatedMethodUsed:function(c,e){e=k.last(arguments);ca.trackDeprecatedMethodUsed(c,e._context.extension)}});q.defineModule("scrollPosition",{getPosition:function(c){c=k.last(arguments);if(c._context.extension.options.isFullPage){var e=k.getIframeByExtensionId(c._context.extension_id).offset(),f=h(window);c({scrollY:f.scrollTop()-e.top,scrollX:f.scrollLeft()-
e.left,width:window.innerWidth,height:window.innerHeight})}},setVerticalPosition:function(c,e){e=k.last(arguments);if(e._context.extension.options&&e._context.extension.options.isFullPage){var f=k.getIframeByExtensionId(e._context.extension_id).offset();"number"===typeof c&&(document.documentElement.scrollTop=f.top+c)}}});q.defineModule("dropdown",{create:function(c,e){e=k.last(arguments);if("object"===("undefined"===typeof c?"undefined":u(c))){var f=p.getFrameworkAdaptor().getProviderByModuleName("dropdown");
if(f){var h=ob(c.list),h={dropdownId:c.dropdownId,dropdownGroups:h,dropdownItemNotifier:function(c){fb.itemSelected(c.dropdownId,c.item,e._context.extension)}};f.create(h,e._context);return h}}},showAt:function(c,e,f,h){var g=k.last(arguments),l={left:0,top:0},m=document.getElementById(g._context.extension_id);m?l=m.getBoundingClientRect():console.error("ACJS: no iframe found for dropdown");(m=p.getFrameworkAdaptor().getProviderByModuleName("dropdown"))&&m.showAt({dropdownId:c,x:e,y:f,width:h},{iframeDimensions:l,
onItemSelection:function(c,e){fb.itemSelected(c,e,g._context.extension)}})},hide:function(c){var e=p.getFrameworkAdaptor().getProviderByModuleName("dropdown");e&&e.hide(c)},itemDisable:function(c,e){var f=p.getFrameworkAdaptor().getProviderByModuleName("dropdown");f&&f.itemDisable(c,e)},itemEnable:function(c,e){var f=p.getFrameworkAdaptor().getProviderByModuleName("dropdown");f&&f.itemEnable(c,e)}});f.register("module-define-custom",function(c){q.defineModule(c.name,c.methods)});q.registerRequestNotifier(function(c){A.dispatch("bridge.invokemethod",
{module:c.module,fn:c.fn,addonKey:c.addon_key,moduleKey:c.key})});return p});;
;
/* module-key = 'com.atlassian.plugins.atlassian-connect-plugin:ap-navigator-v5', location = 'v5/js/iframe/host/_uritemplate.js' */
(function(x){function n(a){var b;if(null===a||void 0===a)return!1;if(e.isArray(a))return 0<a.length;if("string"===typeof a||"number"===typeof a||"boolean"===typeof a)return!0;for(b in a)if(a.hasOwnProperty(b)&&n(a[b]))return!0;return!1}var m=function(){function a(b){this.options=b}a.prototype.toString=function(){return JSON&&JSON.stringify?JSON.stringify(this.options):this.options};return a}(),e=function(){function a(b){if("function"===typeof Object.freeze&&"object"===typeof b&&null!==b){Object.freeze(b);
var c,k;for(k in b)b.hasOwnProperty(k)&&(c=b[k],"object"===typeof c&&a(c))}return b}return{isArray:function(b){return"[object Array]"===Object.prototype.toString.apply(b)},isString:function(b){return"[object String]"===Object.prototype.toString.apply(b)},isNumber:function(b){return"[object Number]"===Object.prototype.toString.apply(b)},isBoolean:function(b){return"[object Boolean]"===Object.prototype.toString.apply(b)},join:function(b,c){var a="",d=!0,f;for(f=0;f<b.length;f+=1)d?d=!1:a+=c,a+=b[f];
return a},map:function(b,c){for(var a=[],d=0;d<b.length;d+=1)a.push(c(b[d]));return a},filter:function(b,c){for(var a=[],d=0;d<b.length;d+=1)c(b[d])&&a.push(b[d]);return a},deepFreeze:a}}(),t=function(){function a(b){return"0"<=b&&"9">=b}return{isAlpha:function(b){return"a"<=b&&"z">=b||"A"<=b&&"Z">=b},isDigit:a,isHexDigit:function(b){return a(b)||"a"<=b&&"f">=b||"A"<=b&&"F">=b}}}(),u=function(){function a(b,a){return"%"===b.charAt(a)&&t.isHexDigit(b.charAt(a+1))&&t.isHexDigit(b.charAt(a+2))}var b=
{encode:function(b){return unescape(encodeURIComponent(b))},numBytes:function(b){return 127>=b?1:194<=b&&223>=b?2:224<=b&&239>=b?3:240<=b&&244>=b?4:0},isValidFollowingCharCode:function(b){return 128<=b&&191>=b}};return{encodeCharacter:function(a){var c="";a=b.encode(a);var d,f;for(f=0;f<a.length;f+=1)d=a.charCodeAt(f),c+="%"+(16>d?"0":"")+d.toString(16).toUpperCase();return c},isPctEncoded:function(c){if(!a(c,0))return!1;var k=parseInt(c.substr(1,2),16),k=b.numBytes(k);if(0===k)return!1;for(var d=
1;d<k;d+=1)if(!a(c,3*d)||!b.isValidFollowingCharCode(parseInt(c.substr(3*d+1,2),16)))return!1;return!0},pctCharAt:function(c,k){var d=c.charAt(k);if(!a(c,k))return d;var f=parseInt(c.substr(k+1,2),16),f=b.numBytes(f);if(0===f)return d;for(var e=1;e<f;e+=1)if(!a(c,k+3*e)||!b.isValidFollowingCharCode(parseInt(c.substr(k+3*e+1,2),16)))return d;return c.substr(k,3*f)}}}(),v=function(){return{isVarchar:function(a){return t.isAlpha(a)||t.isDigit(a)||"_"===a||u.isPctEncoded(a)},isUnreserved:function(a){return t.isAlpha(a)||
t.isDigit(a)||"-"===a||"."===a||"_"===a||"~"===a},isReserved:function(a){return":"===a||"/"===a||"?"===a||"#"===a||"["===a||"]"===a||"@"===a||"!"===a||"$"===a||"\x26"===a||"("===a||")"===a||"*"===a||"+"===a||","===a||";"===a||"\x3d"===a||"'"===a}}}(),w=function(){function a(b,a){var c="",d,f;if("number"===typeof b||"boolean"===typeof b)b=b.toString();for(d=0;d<b.length;d+=f.length)f=b.charAt(d),c+=v.isUnreserved(f)||a&&v.isReserved(f)?f:u.encodeCharacter(f);return c}return{encode:a,encodePassReserved:function(b){return a(b,
!0)},encodeLiteral:function(b){var a="",k,d;for(k=0;k<b.length;k+=d.length)d=u.pctCharAt(b,k),a=1<d.length?a+d:a+(v.isReserved(d)||v.isUnreserved(d)?d:u.encodeCharacter(d));return a},encodeLiteralCharacter:function(b,a){b=u.pctCharAt(b,a);return 1<b.length?b:v.isReserved(b)||v.isUnreserved(b)?b:u.encodeCharacter(b)}}}(),A=function(){function a(a){b[a]={symbol:a,separator:"?"===a?"\x26":""===a||"+"===a||"#"===a?",":a,named:";"===a||"\x26"===a||"?"===a,ifEmpty:"\x26"===a||"?"===a?"\x3d":"",first:"+"===
a?"":a,encode:"+"===a||"#"===a?w.encodePassReserved:w.encode,toString:function(){return this.symbol}}}var b={};a("");a("+");a("#");a(".");a("/");a(";");a("?");a("\x26");return{valueOf:function(a){return b[a]?b[a]:0<="\x3d,!@|".indexOf(a)?null:b[""]}}}(),y=function(){function a(b){this.literal=w.encodeLiteral(b)}a.prototype.expand=function(){return this.literal};a.prototype.toString=a.prototype.expand;return a}(),C=function(){function a(b){function a(){var a=b.substring(q,g);if(0===a.length)throw new m({expressionText:b,
message:"a varname must be specified",position:g});e={varname:a,exploded:!1,maxLength:null};q=null}function k(){if(p===g)throw new m({expressionText:b,message:"after a ':' you have to specify the length",position:g});e.maxLength=parseInt(b.substring(p,g),10);p=null}var d,f=[],e=null,q=null,p=null,g,h="";d=function(a){var c=A.valueOf(a);if(null===c)throw new m({expressionText:b,message:"illegal use of reserved operator",position:g,operator:a});return c}(b.charAt(0));for(q=g=d.symbol.length;g<b.length;g+=
h.length){h=u.pctCharAt(b,g);if(null!==q){if("."===h){if(q===g)throw new m({expressionText:b,message:"a varname MUST NOT start with a dot",position:g});continue}if(v.isVarchar(h))continue;a()}if(null!==p){if(g===p&&"0"===h)throw new m({expressionText:b,message:"A :prefix must not start with digit 0",position:g});if(t.isDigit(h)){if(4<=g-p)throw new m({expressionText:b,message:"A :prefix must have max 4 digits",position:g});continue}k()}if(":"===h){if(null!==e.maxLength)throw new m({expressionText:b,
message:"only one :maxLength is allowed per varspec",position:g});if(e.exploded)throw new m({expressionText:b,message:"an exploeded varspec MUST NOT be varspeced",position:g});p=g+1}else if("*"===h){if(null===e)throw new m({expressionText:b,message:"exploded without varspec",position:g});if(e.exploded)throw new m({expressionText:b,message:"exploded twice",position:g});if(e.maxLength)throw new m({expressionText:b,message:"an explode (*) MUST NOT follow to a prefix",position:g});e.exploded=!0}else if(","===
h)f.push(e),e=null,q=g+1;else throw new m({expressionText:b,message:"illegal character",character:h,position:g});}null!==q&&a();null!==p&&k();f.push(e);return new B(b,d,f)}return function(b){var c,e,d=[],f=null,n=0;for(c=0;c<b.length;c+=1)if(e=b.charAt(c),null!==n){if("}"===e)throw new m({templateText:b,message:"unopened brace closed",position:c});"{"===e&&(n<c&&d.push(new y(b.substring(n,c))),n=null,f=c)}else if(null!==f){if("{"===e)throw new m({templateText:b,message:"brace already opened",position:c});
if("}"===e){if(f+1===c)throw new m({templateText:b,message:"empty braces",position:f});try{d.push(a(b.substring(f+1,c)))}catch(q){if(q.prototype===m.prototype)throw new m({templateText:b,message:q.options.message,position:f+q.options.position,details:q.options});throw q;}f=null;n=c+1}}else throw Error("reached unreachable code");if(null!==f)throw new m({templateText:b,message:"unclosed brace",position:f});n<b.length&&d.push(new y(b.substr(n)));return new z(b,d)}}(),B=function(){function a(a){if(!n(a))return!0;
if(e.isString(a))return""===a;if(e.isNumber(a)||e.isBoolean(a))return!1;if(e.isArray(a))return 0===a.length;for(var b in a)if(a.hasOwnProperty(b))return!1;return!0}function b(a){var b=[],c;for(c in a)a.hasOwnProperty(c)&&b.push({name:c,value:a[c]});return b}function c(a,b,c){this.templateText=a;this.operator=b;this.varspecs=c}function k(a,b,c){var d="";c=c.toString();if(b.named){d+=w.encodeLiteral(a.varname);if(""===c)return d+=b.ifEmpty;d+="\x3d"}null!==a.maxLength&&(c=c.substr(0,a.maxLength));return d+=
b.encode(c)}function d(a){return n(a.value)}function f(c,g,f){var h=[],l="";if(g.named){l+=w.encodeLiteral(c.varname);if(a(f))return l+=g.ifEmpty;l+="\x3d"}e.isArray(f)?(h=e.filter(f,n),h=e.map(h,g.encode)):(h=b(f),h=e.filter(h,d),h=e.map(h,function(a){return g.encode(a.name)+","+g.encode(a.value)}));return l+=e.join(h,",")}function m(c,g,f){var h=[];e.isArray(f)?(h=e.filter(f,n),h=e.map(h,function(b){var d=w.encodeLiteral(c.varname);return d=a(b)?d+g.ifEmpty:d+("\x3d"+g.encode(b))})):(h=b(f),h=e.filter(h,
d),h=e.map(h,function(b){var c=w.encodeLiteral(b.name);return c=a(b.value)?c+g.ifEmpty:c+("\x3d"+g.encode(b.value))}));return e.join(h,g.separator)}function q(a,c){var d=[],f="";e.isArray(c)?(d=e.filter(c,n),d=e.map(d,a.encode)):(d=b(c),d=e.filter(d,function(a){return n(a.value)}),d=e.map(d,function(b){return a.encode(b.name)+"\x3d"+a.encode(b.value)}));return f+=e.join(d,a.separator)}c.prototype.toString=function(){return this.templateText};c.prototype.expand=function(b){var c=[],d,p,l,r=this.operator;
for(d=0;d<this.varspecs.length;d+=1)if(p=this.varspecs[d],l=b[p.varname],null!==l&&void 0!==l)if(e.isArray(l),"string"===typeof l||"number"===typeof l||"boolean"===typeof l)c.push(k(p,r,l));else{if(p.maxLength&&n(l))throw b=Error,l=JSON&&JSON.stringify?JSON.stringify(l):l,new b("Prefix modifiers are not applicable to variables that have composite values. You tried to expand "+this+" with "+l);p.exploded?n(l)&&(r.named?c.push(m(p,r,l)):c.push(q(r,l))):!r.named&&a(l)||c.push(f(p,r,l))}return 0===c.length?
"":r.first+e.join(c,r.separator)};return c}(),z=function(){function a(a,c){this.templateText=a;this.expressions=c;e.deepFreeze(this)}a.prototype.toString=function(){return this.templateText};a.prototype.expand=function(a){var b,e="";for(b=0;b<this.expressions.length;b+=1)e+=this.expressions[b].expand(a);return e};a.parse=C;a.UriTemplateError=m;return a}();x(z)})(function(x){"function"===typeof define?define("_uritemplate",[],function(){return x}):"undefined"!==typeof window?window.UriTemplate=x:global.UriTemplate=
x});;
;
/* module-key = 'com.atlassian.plugins.atlassian-connect-plugin:ap-navigator-v5', location = 'v5/js/navigator/context.js' */
define("ac/navigator/context",function(){var a;return{setContextFunction:function(b){a=b},getContextFunction:function(){return a}}});;
;
/* module-key = 'com.atlassian.plugins.atlassian-connect-plugin:ap-navigator-v5', location = 'v5/js/navigator/module.js' */
define("ac/navigator/module",["ac/navigator/utils","ac/navigator/routes","ac/navigator/context"],function(d,e,f){return{getLocation:function(a){var b=f.getContextFunction();$.isFunction(b)?(context=b(),"object"===$.type(context)?a(context):console.error("navigator context callback did not return an object")):console.error("no context function defined")},go:function(a,b,c){a=a.toLowerCase();b=b||{};b.addonKey||(b.addonKey=c._context.extension.addon_key);if(d.isApiEnabled())if(c=e.getRoutes(),e.hasRoutes()&&
a in c)if("function"===typeof c[a])c[a](b,d.goToUrl);else d.goToUrl(d.buildUrl(c[a],b));else console.error("The URL target "+a+" is not available. Valid targets are: "+Object.keys(c).toString());else console.error("connect navigation api not yet implemented for this product")},reload:function(){window.location.reload()}}});;
;
/* module-key = 'com.atlassian.plugins.atlassian-connect-plugin:ap-navigator-v5', location = 'v5/js/navigator/routes.js' */
define("ac/navigator/routes",function(){function f(a){return Object.keys(a).map(function(b){return["ac."+b,a[b]].map(encodeURIComponent).join("\x3d")}).join("\x26")}var b={addonmodule:function(a,b){var d=a&&a.addonKey,e=a&&a.moduleKey;if(!d)throw Error("Missing addonKey parameter in the context.");if(!e)throw Error("Missing moduleKey parameter in the context.");var c=[d,e].map(encodeURIComponent).join("/"),c=AJS.contextPath()+"/plugins/servlet/ac/"+c;void 0!=a.context&&(console.warn("DEPRECATED API - The context field has been deprecated in favor of customData."),
connectHost.trackDeprecatedMethodUsed("AP.navigate-context",{addon_key:d,moduleKey:e}));a=AJS.$.extend({},a.context||{},a.customData||{});a=f(a);b.apply(this,[""!=a?c+"?"+a:c])}};return{hasRoutes:function(){return b&&0!==Object.getOwnPropertyNames(b).length},addRoutes:function(a){b=AJS.$.extend(b,a)},getRoutes:function(){return b}}});;
;
/* module-key = 'com.atlassian.plugins.atlassian-connect-plugin:ap-navigator-v5', location = 'v5/js/navigator/utils.js' */
define("ac/navigator/utils",["_uritemplate"],function(d){var c=!1;return{enableApi:function(){c=!0},disableApi:function(){c=!1},isApiEnabled:function(){return c},buildUrl:function(a,b){"/"!==a[0]&&(a="/"+a);return AJS.contextPath()+d.parse(a).expand(b)},goToUrl:function(a){window.location.href=a},hasContext:function(a,b){return a[b]?!0:(AJS.error("Missing "+b+" in navigator context"),!1)},appendQueryParam:function(a,b,c){return a+(-1<a.indexOf("?")?"\x26":"?")+b+"\x3d"+encodeURIComponent(c)}}});;
;
/* module-key = 'com.atlassian.plugins.atlassian-connect-plugin:ap-extensions-v5', location = 'v5/js/core/connect-host-cookie.js' */
(function(p){"object"===typeof exports&&"undefined"!==typeof module?module.exports=p():"function"===typeof define&&define.amd?define([],p):("undefined"!==typeof window?window:"undefined"!==typeof global?global:"undefined"!==typeof self?self:this).connectHostCookie=p()})(function(){return function r(k,h,l){function m(b,e){if(!h[b]){if(!k[b]){var f="function"==typeof require&&require;if(!e&&f)return f(b,!0);if(n)return n(b,!0);e=Error("Cannot find module '"+b+"'");throw e.code="MODULE_NOT_FOUND",e;
}e=h[b]={exports:{}};k[b][0].call(e.exports,function(e){var a=k[b][1][e];return m(a?a:e)},e,e.exports,r,k,h,l)}return h[b].exports}for(var n="function"==typeof require&&require,f=0;f<l.length;f++)m(l[f]);return m}({1:[function(r,k,h){function l(a){a=new RegExp("\\b"+a.replace(q,"\\$\x26")+"\x3d((?:[^\\\\;]+|\\\\.)*)(?:;|$)");return(a=document.cookie.match(a))&&a[1].replace(b,"")}function m(a,d,c){var g=l("AJS.conglomerate.cookie"),b=new RegExp("(\\s|\\|)*\\b"+a.replace(q,"\\$\x26")+"\x3d[^|]*[|]*"),
g=(g||"").replace(b,"|");""!==d&&(a=a+"\x3d"+d,4020>g.length+a.length&&(g+="|"+a));g=g.replace(e,"|");c=c||365;a="";d='"'+g.replace(t,'\\"')+'"';c&&(a=new Date,a.setTime(+a+864E5*c),a="; expires\x3d"+a.toGMTString());document.cookie="AJS.conglomerate.cookie\x3d"+d+a+";path\x3d/"}function n(a,d){if(!a||0===a.length)throw Error("addon key must be defined on cookies");if(!d||0===d.length)throw Error("Name must be defined");return a+"$$"+d}function f(a){if(a&&a._context)return a._context.extension.addon_key;
throw Error("addon key not found in callback");}Object.defineProperty(h,"__esModule",{value:!0});var b=/(\\|^"|"$)/g,e=/\|\|+/g,t=/"/g,q=/[.*+?|^$()[\]{\\]/g;h["default"]={save:function(a,d,c){var g=arguments[arguments.length-1],b=n(f(g),a);g._context&&m(b,d,c)},read:function(a,d){d=arguments[arguments.length-1];var c;var b=n(f(d),a);c=(c=l("AJS.conglomerate.cookie"))||"";b=new RegExp(b.replace(q,"\\$\x26")+"\x3d([^|]+)");c=(c=c.match(b))&&c[1];c=null!=c?c:void 0;d(c);return c},erase:function(a){var b=
n(f(arguments[arguments.length-1]),a);m(b,"")}};k.exports=h["default"]},{}]},{},[1])(1)});;
;
/* module-key = 'com.atlassian.plugins.atlassian-connect-plugin:ap-extensions-v5', location = 'v5/js/core/connect-host-history.js' */
(function(C){"object"===typeof exports&&"undefined"!==typeof module?module.exports=C():"function"===typeof define&&define.amd?define([],C):("undefined"!==typeof window?window:"undefined"!==typeof global?global:"undefined"!==typeof self?self:this).connectHostHistory=C()})(function(){return function p(t,c,k){function g(f,b){if(!c[f]){if(!t[f]){var e="function"==typeof require&&require;if(!b&&e)return e(f,!0);if(m)return m(f,!0);b=Error("Cannot find module '"+f+"'");throw b.code="MODULE_NOT_FOUND",b;
}b=c[f]={exports:{}};t[f][0].call(b.exports,function(a){var b=t[f][1][a];return g(b?b:a)},b,b.exports,p,t,c,k)}return c[f].exports}for(var m="function"==typeof require&&require,q=0;q<k.length;q++)g(k[q]);return g}({1:[function(p,t,c){function k(a,r){(0,e.callConnectHost)(function(h){(0,e.values)(h.getExtensions()).forEach(function(e){e=e.extension.addon_key;var f=new b.Current({url:window.location.href,state:r.state}),f=new b.Route(f);h.broadcastEvent(a,{addon_key:e},f.render(e))})})}function g(){a||
(window.addEventListener("popstate",function(a){var b=(0,e.createEvent)("ap_popstate");b.state=(0,e.unwrapState)(a.state);window.dispatchEvent(b)}),window.addEventListener("ap_popstate",function(a){var b=(0,e.createEvent)("ap_changestate");b.state=a.state;window.dispatchEvent(b);k(f.HISTORY_POPSTATE,a)}),window.addEventListener("ap_pushstate",function(a){var b=(0,e.createEvent)("ap_changestate");b.state=a.state;window.dispatchEvent(b);k(f.HISTORY_PUSHSTATE,a)}),window.addEventListener("ap_replacestate",
function(a){var b=(0,e.createEvent)("ap_changestate");b.state=a.state;window.dispatchEvent(b);k(f.HISTORY_REPLACESTATE,a)}),window.addEventListener("ap_changestate",function(a){k(f.HISTORY_CHANGESTATE,a)}),a=!0)}function m(a){var b=a.state.render();a=a.url.render();window.history.pushState((0,e.wrapState)(b),a.title,a.url)}function q(a){var b=a.state.render();a=a.url.render();window.history.replaceState((0,e.wrapState)(b),a.title,a.url)}Object.defineProperty(c,"__esModule",{value:!0});var f=p("./constants"),
b=p("./models"),e=p("./utils"),a=!1;c["default"]={_registerWindowListeners:function(){g()},back:function(a){a=arguments[arguments.length-1];this.go(-1,a)},forward:function(a){a=arguments[arguments.length-1];this.go(1,a)},go:function(a){arguments[arguments.length-1]._context.extension.options.isFullPage?window.history.go(a):(0,e.log)("History is only available to page modules")},getState:function(a,f){f=arguments[arguments.length-1];var c=f._context.extension.addon_key,h=new b.Current({url:window.location.href,
state:(0,e.unwrapState)(window.history.state)}),c=(new b.Route(h)).render(c);a=a?"string"===typeof a?a:"hash":"hash";if("hash"===a)f(c.hash);else if("all"===a)f(c);else throw Error("invalid type for getState");},pushState:function(a,f){f=arguments[arguments.length-1];var c=f._context.extension.addon_key,h=new b.Current({url:window.location.href,state:(0,e.unwrapState)(window.history.state)}),h=new b.Route(h),c=new b.Change(a,c),c=new b.Route(c);f._context.extension.options.isFullPage?(c.url.isURLEqual(h.url)?
(h.merge(c),q(h)):c.url.isPathnameEqual(h.url)?(h.merge(c),m(h)):m(c),h=(0,e.createEvent)("ap_pushstate"),h.state=(0,e.unwrapState)(window.history.state),window.dispatchEvent(h)):(0,e.log)("History is only available to page modules")},replaceState:function(a,f){f=arguments[arguments.length-1];var c=f._context.extension.addon_key,h=new b.Current({url:window.location.href,state:(0,e.unwrapState)(window.history.state)}),h=new b.Route(h),c=new b.Change(a,c),c=new b.Route(c);f._context.extension.options.isFullPage?
(c.url.isURLEqual(h.url)?(h.merge(c),q(h)):c.url.isPathnameEqual(h.url)?(h.merge(c),q(h)):q(c),h=(0,e.createEvent)("ap_replacestate"),h.state=(0,e.unwrapState)(window.history.state),window.dispatchEvent(h)):(0,e.log)("History is only available to page modules")}};t.exports=c["default"]},{"./constants":7,"./models":8,"./utils":9}],2:[function(p,t,c){(function(k){(function(g){function m(a){throw RangeError(d[a]);}function q(a,d){for(var b=a.length;b--;)a[b]=d(a[b]);return a}function f(a,d){return q(a.split(w),
d).join(".")}function b(a){for(var d=[],b=0,l=a.length,e,c;b<l;)e=a.charCodeAt(b++),55296<=e&&56319>=e&&b<l?(c=a.charCodeAt(b++),56320==(c&64512)?d.push(((e&1023)<<10)+(c&1023)+65536):(d.push(e),b--)):d.push(e);return d}function e(a){return q(a,function(a){var d="";65535<a&&(a-=65536,d+=A(a>>>10&1023|55296),a=56320|a&1023);return d+=A(a)}).join("")}function a(a,d){return a+22+75*(26>a)-((0!=d)<<5)}function h(a,d,b){var l=0;a=b?z(a/700):a>>1;for(a+=z(a/d);455<a;l+=36)a=z(a/35);return z(l+36*a/(a+38))}
function r(a){var d=[],b=a.length,l,c=0,f=128,y=72,g,r,n,k,w;g=a.lastIndexOf("-");0>g&&(g=0);for(r=0;r<g;++r)128<=a.charCodeAt(r)&&m("not-basic"),d.push(a.charCodeAt(r));for(g=0<g?g+1:0;g<b;){r=c;l=1;for(n=36;;n+=36){g>=b&&m("invalid-input");k=a.charCodeAt(g++);k=10>k-48?k-22:26>k-65?k-65:26>k-97?k-97:36;(36<=k||k>z((2147483647-c)/l))&&m("overflow");c+=k*l;w=n<=y?1:n>=y+26?26:n-y;if(k<w)break;k=36-w;l>z(2147483647/k)&&m("overflow");l*=k}l=d.length+1;y=h(c-r,l,0==r);z(c/l)>2147483647-f&&m("overflow");
f+=z(c/l);c%=l;d.splice(c++,0,f)}return e(d)}function x(d){var l,e,c,f,g,k,r,y,n,w=[],u,x,q;d=b(d);u=d.length;l=128;e=0;g=72;for(k=0;k<u;++k)n=d[k],128>n&&w.push(A(n));for((c=f=w.length)&&w.push("-");c<u;){r=2147483647;for(k=0;k<u;++k)n=d[k],n>=l&&n<r&&(r=n);x=c+1;r-l>z((2147483647-e)/x)&&m("overflow");e+=(r-l)*x;l=r;for(k=0;k<u;++k)if(n=d[k],n<l&&2147483647<++e&&m("overflow"),n==l){y=e;for(r=36;;r+=36){n=r<=g?1:r>=g+26?26:r-g;if(y<n)break;q=y-n;y=36-n;w.push(A(a(n+q%y,0)));y=z(q/y)}w.push(A(a(y,
0)));g=h(e,x,c==f);e=0;++c}++e;++l}return w.join("")}var u="object"==typeof c&&c,p="object"==typeof t&&t&&t.exports==u&&t,v="object"==typeof k&&k;if(v.global===v||v.window===v)g=v;var B=/^xn--/,l=/[^ -~]/,w=/\x2E|\u3002|\uFF0E|\uFF61/g,d={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input \x3e\x3d 0x80 (not a basic code point)","invalid-input":"Invalid input"},z=Math.floor,A=String.fromCharCode,n,v={version:"1.2.4",ucs2:{decode:b,encode:e},decode:r,encode:x,toASCII:function(a){return f(a,
function(a){return l.test(a)?"xn--"+x(a):a})},toUnicode:function(a){return f(a,function(a){return B.test(a)?r(a.slice(4).toLowerCase()):a})}};if(u&&!u.nodeType)if(p)p.exports=v;else for(n in v)v.hasOwnProperty(n)&&(u[n]=v[n]);else g.punycode=v})(this)}).call(this,"undefined"!==typeof global?global:"undefined"!==typeof self?self:"undefined"!==typeof window?window:{})},{}],3:[function(p,t,c){function k(){this.href=this.path=this.pathname=this.query=this.search=this.hash=this.hostname=this.port=this.host=
this.auth=this.slashes=this.protocol=null}function g(a,b,d){if(a&&m(a)&&a instanceof k)return a;var l=new k;l.parse(a,b,d);return l}function m(a){return"object"===typeof a&&null!==a}var q=p("punycode");c.parse=g;c.resolve=function(a,b){return g(a,!1,!0).resolve(b)};c.resolveObject=function(a,b){return a?g(a,!1,!0).resolveObject(b):b};c.format=function(a){"string"===typeof a&&(a=g(a));return a instanceof k?a.format():k.prototype.format.call(a)};c.Url=k;var f=/^([a-z0-9.+-]+:)/i,b=/:[0-9]*$/;t="{}|\\^`".split("").concat('\x3c\x3e"` \r\n\t'.split(""));
var e=["'"].concat(t),a=["%","/","?",";","#"].concat(e),h=["/","?","#"],r=/^[a-z0-9A-Z_-]{0,63}$/,x=/^([a-z0-9A-Z_-]{0,63})(.*)$/,u={javascript:!0,"javascript:":!0},D={javascript:!0,"javascript:":!0},v={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0},B=p("querystring");k.prototype.parse=function(b,c,d){if("string"!==typeof b)throw new TypeError("Parameter 'url' must be a string, not "+typeof b);b=b.trim();var l=f.exec(b);if(l){var l=l[0],k=l.toLowerCase();
this.protocol=k;b=b.substr(l.length)}if(d||l||b.match(/^\/\/[^@\/]+@[^@\/]+/)){var n="//"===b.substr(0,2);!n||l&&D[l]||(b=b.substr(2),this.slashes=!0)}if(!D[l]&&(n||l&&!v[l])){n=-1;for(d=0;d<h.length;d++)l=b.indexOf(h[d]),-1!==l&&(-1===n||l<n)&&(n=l);n=-1===n?b.lastIndexOf("@"):b.lastIndexOf("@",n);-1!==n&&(d=b.slice(0,n),b=b.slice(n+1),this.auth=decodeURIComponent(d));n=-1;for(d=0;d<a.length;d++)l=b.indexOf(a[d]),-1!==l&&(-1===n||l<n)&&(n=l);-1===n&&(n=b.length);this.host=b.slice(0,n);b=b.slice(n);
this.parseHost();this.hostname=this.hostname||"";n="["===this.hostname[0]&&"]"===this.hostname[this.hostname.length-1];if(!n){var g=this.hostname.split(/\./);d=0;for(l=g.length;d<l;d++){var m=g[d];if(m&&!m.match(r)){for(var w="",p=0,t=m.length;p<t;p++)w=127<m.charCodeAt(p)?w+"x":w+m[p];if(!w.match(r)){l=g.slice(0,d);d=g.slice(d+1);if(m=m.match(x))l.push(m[1]),d.unshift(m[2]);d.length&&(b="/"+d.join(".")+b);this.hostname=l.join(".");break}}}}this.hostname=255<this.hostname.length?"":this.hostname.toLowerCase();
if(!n){m=this.hostname.split(".");g=[];for(d=0;d<m.length;++d)l=m[d],g.push(l.match(/[^A-Za-z0-9_-]/)?"xn--"+q.encode(l):l);this.hostname=g.join(".")}d=this.port?":"+this.port:"";this.host=(this.hostname||"")+d;this.href+=this.host;n&&(this.hostname=this.hostname.substr(1,this.hostname.length-2),"/"!==b[0]&&(b="/"+b))}if(!u[k])for(d=0,l=e.length;d<l;d++)n=e[d],m=encodeURIComponent(n),m===n&&(m=escape(n)),b=b.split(n).join(m);d=b.indexOf("#");-1!==d&&(this.hash=b.substr(d),b=b.slice(0,d));d=b.indexOf("?");
-1!==d?(this.search=b.substr(d),this.query=b.substr(d+1),c&&(this.query=B.parse(this.query)),b=b.slice(0,d)):c&&(this.search="",this.query={});b&&(this.pathname=b);v[k]&&this.hostname&&!this.pathname&&(this.pathname="/");if(this.pathname||this.search)d=this.pathname||"",l=this.search||"",this.path=d+l;this.href=this.format();return this};k.prototype.format=function(){var a=this.auth||"";a&&(a=encodeURIComponent(a),a=a.replace(/%3A/i,":"),a+="@");var b=this.protocol||"",d=this.pathname||"",e=this.hash||
"",c=!1,f="";this.host?c=a+this.host:this.hostname&&(c=a+(-1===this.hostname.indexOf(":")?this.hostname:"["+this.hostname+"]"),this.port&&(c+=":"+this.port));this.query&&m(this.query)&&Object.keys(this.query).length&&(f=B.stringify(this.query));a=this.search||f&&"?"+f||"";b&&":"!==b.substr(-1)&&(b+=":");this.slashes||(!b||v[b])&&!1!==c?(c="//"+(c||""),d&&"/"!==d.charAt(0)&&(d="/"+d)):c||(c="");e&&"#"!==e.charAt(0)&&(e="#"+e);a&&"?"!==a.charAt(0)&&(a="?"+a);d=d.replace(/[?#]/g,function(a){return encodeURIComponent(a)});
a=a.replace("#","%23");return b+c+d+a+e};k.prototype.resolve=function(a){return this.resolveObject(g(a,!1,!0)).format()};k.prototype.resolveObject=function(a){if("string"===typeof a){var b=new k;b.parse(a,!1,!0);a=b}var d=new k;Object.keys(this).forEach(function(a){d[a]=this[a]},this);d.hash=a.hash;if(""===a.href)return d.href=d.format(),d;if(a.slashes&&!a.protocol)return Object.keys(a).forEach(function(b){"protocol"!==b&&(d[b]=a[b])}),v[d.protocol]&&d.hostname&&!d.pathname&&(d.path=d.pathname="/"),
d.href=d.format(),d;if(a.protocol&&a.protocol!==d.protocol){if(!v[a.protocol])return Object.keys(a).forEach(function(b){d[b]=a[b]}),d.href=d.format(),d;d.protocol=a.protocol;if(a.host||D[a.protocol])d.pathname=a.pathname;else{for(var e=(a.pathname||"").split("/");e.length&&!(a.host=e.shift()););a.host||(a.host="");a.hostname||(a.hostname="");""!==e[0]&&e.unshift("");2>e.length&&e.unshift("");d.pathname=e.join("/")}d.search=a.search;d.query=a.query;d.host=a.host||"";d.auth=a.auth;d.hostname=a.hostname||
a.host;d.port=a.port;if(d.pathname||d.search)d.path=(d.pathname||"")+(d.search||"");d.slashes=d.slashes||a.slashes;d.href=d.format();return d}var b=d.pathname&&"/"===d.pathname.charAt(0),c=a.host||a.pathname&&"/"===a.pathname.charAt(0),f=b=c||b||d.host&&a.pathname,h=d.pathname&&d.pathname.split("/")||[],e=a.pathname&&a.pathname.split("/")||[],g=d.protocol&&!v[d.protocol];g&&(d.hostname="",d.port=null,d.host&&(""===h[0]?h[0]=d.host:h.unshift(d.host)),d.host="",a.protocol&&(a.hostname=null,a.port=null,
a.host&&(""===e[0]?e[0]=a.host:e.unshift(a.host)),a.host=null),b=b&&(""===e[0]||""===h[0]));if(c)d.host=a.host||""===a.host?a.host:d.host,d.hostname=a.hostname||""===a.hostname?a.hostname:d.hostname,d.search=a.search,d.query=a.query,h=e;else if(e.length)h||(h=[]),h.pop(),h=h.concat(e),d.search=a.search,d.query=a.query;else if(null!=a.search){g&&(d.hostname=d.host=h.shift(),g=d.host&&0<d.host.indexOf("@")?d.host.split("@"):!1)&&(d.auth=g.shift(),d.host=d.hostname=g.shift());d.search=a.search;d.query=
a.query;if(null!==d.pathname||null!==d.search)d.path=(d.pathname?d.pathname:"")+(d.search?d.search:"");d.href=d.format();return d}if(!h.length)return d.pathname=null,d.path=d.search?"/"+d.search:null,d.href=d.format(),d;for(var c=h.slice(-1)[0],e=(d.host||a.host)&&("."===c||".."===c)||""===c,l=0,r=h.length;0<=r;r--)c=h[r],"."==c?h.splice(r,1):".."===c?(h.splice(r,1),l++):l&&(h.splice(r,1),l--);if(!b&&!f)for(;l--;l)h.unshift("..");!b||""===h[0]||h[0]&&"/"===h[0].charAt(0)||h.unshift("");e&&"/"!==h.join("/").substr(-1)&&
h.push("");f=""===h[0]||h[0]&&"/"===h[0].charAt(0);g&&(d.hostname=d.host=f?"":h.length?h.shift():"",g=d.host&&0<d.host.indexOf("@")?d.host.split("@"):!1)&&(d.auth=g.shift(),d.host=d.hostname=g.shift());(b=b||d.host&&h.length)&&!f&&h.unshift("");h.length?d.pathname=h.join("/"):(d.pathname=null,d.path=null);if(null!==d.pathname||null!==d.search)d.path=(d.pathname?d.pathname:"")+(d.search?d.search:"");d.auth=a.auth||d.auth;d.slashes=d.slashes||a.slashes;d.href=d.format();return d};k.prototype.parseHost=
function(){var a=this.host,e=b.exec(a);e&&(e=e[0],":"!==e&&(this.port=e.substr(1)),a=a.substr(0,a.length-e.length));a&&(this.hostname=a)}},{punycode:2,querystring:6}],4:[function(p,t,c){t.exports=function(c,m,q,f){q=q||"\x3d";var b={};if("string"!==typeof c||0===c.length)return b;var e=/\+/g;c=c.split(m||"\x26");m=1E3;f&&"number"===typeof f.maxKeys&&(m=f.maxKeys);f=c.length;0<m&&f>m&&(f=m);for(m=0;m<f;++m){var a=c[m].replace(e,"%20"),h=a.indexOf(q),g;0<=h?(g=a.substr(0,h),a=a.substr(h+1)):(g=a,a=
"");g=decodeURIComponent(g);a=decodeURIComponent(a);Object.prototype.hasOwnProperty.call(b,g)?k(b[g])?b[g].push(a):b[g]=[b[g],a]:b[g]=a}return b};var k=Array.isArray||function(c){return"[object Array]"===Object.prototype.toString.call(c)}},{}],5:[function(p,t,c){function k(c,b){if(c.map)return c.map(b);for(var e=[],a=0;a<c.length;a++)e.push(b(c[a],a));return e}var g=function(c){switch(typeof c){case "string":return c;case "boolean":return c?"true":"false";case "number":return isFinite(c)?c:"";default:return""}};
t.exports=function(c,b,e,a){b=b||"\x26";e=e||"\x3d";null===c&&(c=void 0);return"object"===typeof c?k(q(c),function(a){var h=encodeURIComponent(g(a))+e;return m(c[a])?k(c[a],function(a){return h+encodeURIComponent(g(a))}).join(b):h+encodeURIComponent(g(c[a]))}).join(b):a?encodeURIComponent(g(a))+e+encodeURIComponent(g(c)):""};var m=Array.isArray||function(c){return"[object Array]"===Object.prototype.toString.call(c)},q=Object.keys||function(c){var b=[],e;for(e in c)Object.prototype.hasOwnProperty.call(c,
e)&&b.push(e);return b}},{}],6:[function(p,t,c){c.decode=c.parse=p("./decode");c.encode=c.stringify=p("./encode")},{"./decode":4,"./encode":5}],7:[function(p,t,c){Object.defineProperty(c,"__esModule",{value:!0});c.STATE_AP_KEY="_AP";c.QUERY_KEY_PREFIX="ac";c.QUERY_KEY_DELIMITER=".";c.ANCHOR_PREFIX="!";c.HISTORY_POPSTATE="history_popstate";c.HISTORY_PUSHSTATE="history_pushstate";c.HISTORY_REPLACESTATE="history_replacestate";c.HISTORY_CHANGESTATE="history_changestate"},{}],8:[function(p,t,c){function k(a){a=
a||{};if(!a.key)throw Error("missing key for addon");this.key=a.key;this.state=a.state;this.query=a.query||{};return this}function g(a){a=a||{};a.models=a.models||[];a.models instanceof Array||(a.models=[a.models]);a.models=a.models.map(function(a){return a instanceof k?a:new k(a)});this.models=a.models;return this}function m(a){a=a||{};a.addons=a.addons||[];a.addons instanceof g||(a.addons=new g(a.addons));this.addons=a.addons;return this}function q(a){a=a||{};a.addons=a.addons||[];a.global=a.global||
[];a.parsed instanceof b["default"].Url||(a.parsed=b["default"].parse(a.url));a.addons instanceof g||(a.addons=new g(a.addons));this.parsed=a.parsed;this.addons=a.addons;this.global=a.global;this.title=a.title||window.document.title}function f(a){a=a||{};if(!a.url)throw Error("missing url option");a.url instanceof q||(a.url=new q(a.url));if(!a.state)throw Error("missing state option");a.state instanceof m||(a.state=new m(a.state));this.url=a.url;this.state=a.state}Object.defineProperty(c,"__esModule",
{value:!0});c.Addon=k;c.Addons=g;c.Current=function(a){a=a||{};if(!a.url)throw Error("missing url");var c=b["default"].parse(a.url),f=new g,c=(0,e.parseQuery)(c.query).map(e.stripAddonQueryPrefix),x=(0,e.normalizeQueryByAddons)(c),c=x.filter(function(a){return a.key}),x=x.filter(function(a){return!a.key});c.forEach(function(a){a=new k(a);f.add(a)});this.url=new q({url:a.url,addons:f,global:x});this.state=new m(a.state);return this};c.Change=function(a,c){var h=typeof a,f=b["default"].parse(window.location.href),
u={},p,t;if("string"===h)u.protocol=f.protocol,u.slashes=f.slashes,u.hostname=f.hostname,u.pathname=f.pathname,u.port=f.port,u.search=f.search,u.query=f.query,u.hash=(0,e.addHash)((0,e.addHashPrefix)(a));else if("object"===h)t=a.href?b["default"].parse(a.href):f,u.protocol=f.protocol,u.slashes=f.slashes,u.hostname=f.hostname,u.port=f.port,u.pathname=t.pathname||f.pathname,u.search=null,u.query=null,u.hash=a.hash?(0,e.addHash)((0,e.addHashPrefix)(a.hash)):null,p=a.state,t=a.query;else throw Error("invalid option type");
f=new g;a=new g;p&&(p=new k({key:c,state:p}),f.add(p));t&&(c=new k({key:c,query:t}),a.add(c));c=new m({addons:f});u=new q({url:b["default"].format(u),addons:a});this.state=c;this.url=u;return this};c.State=m;c.URL=q;c.Route=f;var b=(t=p("url"))&&t.__esModule?t:{"default":t},e=p("./utils");g.prototype.add=function(a){this.models.push(a)};g.prototype.remove=function(a){this.models.splice(this.models.indexOf(a),1)};g.prototype.find=function(a){return(0,e.find)(this.models,function(b){return b.key===
a})};g.prototype.merge=function(a){var b=this.find(a.key);b&&this.remove(b);this.add(a)};m.prototype.merge=function(a){var b=this;a.addons.models.forEach(function(a){b.addons.merge(a)})};m.prototype.render=function(){return(0,e.deepCopy)(this)};q.prototype.isURLEqual=function(a){return this.render().url===a.render().url};q.prototype.isPathnameEqual=function(a){var b=this.parsed.slashes===a.parsed.slashes,c=this.parsed.hostname===a.parsed.hostname,e=this.parsed.pathname===a.parsed.pathname;return this.parsed.protocol===
a.parsed.protocol&&b&&c&&e};q.prototype.merge=function(a){var b=this;b.parsed.hash=a.parsed.hash;a.addons.models.forEach(function(a){b.addons.merge(a)})};q.prototype.render=function(){var a=(0,e.deepCopy)(this),c=a.parsed,f=(0,e.denormalizeQueryByAddons)(this.addons.models),g=(0,e.denormalizeQueryByAddons)(this.global),f=f.concat(g).map(e.addAddonQueryPrefix),f=(0,e.formatQuery)(f);c.query=f;c.search=c.query?"?"+c.query:null;a.url=b["default"].format(c);return a};f.prototype.merge=function(a){this.url.merge(a.url);
this.state.merge(a.state)};f.prototype.render=function(a){return(0,e.deepCopy)({key:a,hash:(0,e.stripHashPrefix)((0,e.stripHash)(this.url.parsed.hash)),query:this.url.addons.find(a)?this.url.addons.find(a).query:null,title:this.url.title,href:this.url.parsed.href,state:this.state.addons.find(a)?this.state.addons.find(a).state:null})}},{"./utils":9,url:3}],9:[function(p,t,c){function k(b,c,a){c in b?Object.defineProperty(b,c,{value:a,enumerable:!0,configurable:!0,writable:!0}):b[c]=a;return b}function g(b){return void 0===
b||null===b||""===b?"":b.toString().replace(new RegExp("^"+f.ANCHOR_PREFIX),"")}function m(b){b=b?b.split("\x3d"):[];return 2===b.length?{key:b[0],value:b[1]}:null}function q(b){return"key"in b&&"value"in b?[b.key,"\x3d",b.value].join(""):null}Object.defineProperty(c,"__esModule",{value:!0});c.find=function(b,c){for(var a=0,e=b.length;a<e;a+=1)if(c(b[a]))return b[a]};c.values=function(b){var c=[];if(!b)return c;for(var a in b)c.push(b[a]);return c};c.stripHash=function(b){return b?b.slice(b.search("#")+
1):null};c.stripHashPrefix=g;c.addHash=function(b){return"#"+b};c.addHashPrefix=function(b){if(void 0===b||null===b)throw"You must supply text to prefix";return f.ANCHOR_PREFIX+g(b)};c.splitQueryParam=m;c.joinQueryParam=q;c.parseQuery=function(b){return(b?b.split("\x26"):[]).map(function(b){return m(b)}).filter(function(b){return b})};c.formatQuery=function(b){b=b.map(function(b){return q(b)}).filter(function(b){return b});return b.length?b.join("\x26"):null};c.stripAddonQueryPrefix=function(b){var c=
b.key?b.key.split(f.QUERY_KEY_DELIMITER):[],a=f.QUERY_KEY_PREFIX;return 3<=c.length&&a===c[0]?(a=c.slice(1,c.length-1).join(f.QUERY_KEY_DELIMITER),c=c.slice(c.length-1).join(f.QUERY_KEY_DELIMITER),{addonKey:a,key:c,value:b.value}):b};c.addAddonQueryPrefix=function(b){var c=f.QUERY_KEY_PREFIX;return"addonKey"in b&&b.addonKey?{key:[c,b.addonKey,b.key].join(f.QUERY_KEY_DELIMITER),value:b.value}:b};c.normalizeQueryByAddons=function(b){var c=[];b.forEach(function(a){var b=a.key,e=a.value,f=a.addonKey;
(a=c.filter(function(a){return a.key===f}))&&a.length?a[0].query[b]=e:c.push({key:f,query:k({},b,e)})});return c};c.denormalizeQueryByAddons=function(b){var c=[];b.forEach(function(a){var b=a.key;Object.keys(a.query).forEach(function(e){c.push({addonKey:b,key:e,value:a.query[e]})})});return c};c.deepCopy=function(b){return JSON.parse(JSON.stringify(b))};c.wrapState=function(b){var c={};c[f.STATE_AP_KEY]=b;return c};c.unwrapState=function(b){return b&&b[f.STATE_AP_KEY]?b[f.STATE_AP_KEY]:null};c.createEvent=
function(b){if("function"===typeof Event)var c=new Event(b);else c=document.createEvent("Event"),c.initEvent(b,!1,!1);return c};c.callConnectHost=function(b){p&&p.amd?p(["connect-host"],function(c){b(c)}):b(window.connectHost)};c.log=function(b,c){c||(c="log");console[c].call(null,"Atlassian Connect JS History: ",b)};var f=p("./constants")},{"./constants":7}]},{},[1])(1)});;
;
/* module-key = 'com.atlassian.plugins.atlassian-connect-plugin:ap-extensions-v5', location = 'v5/js/core/connect-host-request.js' */
(function(q){"object"===typeof exports&&"undefined"!==typeof module?module.exports=q():"function"===typeof define&&define.amd?define([],q):("undefined"!==typeof window?window:"undefined"!==typeof global?global:"undefined"!==typeof self?self:this).connectHostRequest=q()})(function(){return function t(n,h,l){function m(d,f){if(!h[d]){if(!n[d]){var k="function"==typeof require&&require;if(!f&&k)return k(d,!0);if(p)return p(d,!0);f=Error("Cannot find module '"+d+"'");throw f.code="MODULE_NOT_FOUND",f;
}f=h[d]={exports:{}};n[d][0].call(f.exports,function(a){var e=n[d][1][a];return m(e?e:a)},f,f.exports,t,n,h,l)}return h[d].exports}for(var p="function"==typeof require&&require,k=0;k<l.length;k++)m(l[k]);return m}({1:[function(t,n,h){function l(a){return a.replace(/(http[s]?:\/\/[^"]*?&jwt=[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*.*?)\\"/gi,'\\"')}function m(a){var e={headers:{}};d.forEach(function(c,d){e[c]=a[c];if("responseText"===c)try{JSON.parse(a[c]),e[c]=l(a[c])}catch(v){}},this);
f.forEach(function(c,d){e.headers[c]=a.getResponseHeader(c)},this);return e}function p(a,e,c){c._isBlob&&c.blob&&c.name?a.append(e,c.blob,c.name):a.append(e,c);return a}function k(a){a.contentType=!1;a.processData=!1;if(a.data&&"object"===typeof a.data){var e=new FormData;Object.keys(a.data).forEach(function(c){var d=a.data[c];Array.isArray(d)?d.forEach(function(a,b){e=p(e,c+"["+b+"]",a)}):e=p(e,c,d)});a.data=e;a.headers["X-Atlassian-Token"]="no-check"}else throw Error("For a Multipart request, data must to be an Object");
return a}Object.defineProperty(h,"__esModule",{value:!0});var d=["status","statusText","responseText"],f=["Content-Type","ETag"],u=["If-Match","If-None-Match"];h.stripJWTUrls=l;h["default"]={request:function(a,e){function c(a,b,c){e(c,m(a),c)}var d=AJS.contextPath(),f={};e=arguments[arguments.length-1];"string"===typeof a&&(a={url:a});d+=a.url;d=d.replace(/\/\.\.\//ig,"");a.headers=a.headers||{};Object.getOwnPropertyNames(a.headers).forEach(function(b){f[b.toLowerCase()]=a.headers[b]},this);var b=
{url:d,type:a.type||"GET",data:a.data,dataType:"text",contentType:a.contentType,cache:"undefined"!==typeof a.cache?!!a.cache:void 0,headers:{Accept:f.accept||"*/*","AP-Client-Key":e._context.extension.addon_key}};"multipart/form-data"===b.contentType&&(b=k(b));b.data&&"object"===typeof b.data&&"GET"===b.type.toUpperCase()&&Object.keys(b.data).forEach(function(a){b.url+=(0<=b.url.indexOf("?")?"\x26":"?")+encodeURIComponent(a)+"\x3d"+encodeURIComponent(b.data[a])});!0===a.experimental&&(b.headers["X-ExperimentalApi"]=
"opt-in");u.forEach(function(a,c){f[a.toLowerCase()]&&(b.headers[a]=f[a.toLowerCase()])},this);b.cache||(b.url+=(0<=b.url.indexOf("?")?"\x26":"?")+"_r\x3d"+(new Date).getTime());var g=new XMLHttpRequest;g.open(b.type,b.url,!0);b.contentType&&(b.headers["Content-type"]=b.contentType);Object.getOwnPropertyNames(b.headers).forEach(function(a){g.setRequestHeader(a,b.headers[a])});g.onload=function(){if(200<=this.status&&300>this.status){var a=g.responseText;e(!1,m(g),a)}else c(g,g.statusText,g.responseText)};
g.onerror=function(){c(g,g.statusText,g.responseText)};try{g.send(b.data||null)}catch(r){c(g,void 0,r),console.error("ACJS Request: ",r.message,r)}}}},{}]},{},[1])(1)});;
;
/* module-key = 'com.atlassian.plugins.atlassian-connect-plugin:ap-user-v5', location = 'v5/js/iframe/host/user.js' */
define("ac/user",function(){return{getUser:function(a){var b=a._context.extension.options.apiMigrations;if(b&&b.gdpr)throw Error("ACJS: Deprecated API usage while in GDPR mode.");var b=a._context.extension.options.user,c=AJS.Meta.get("remote-user-fullname")||AJS.Meta.get("current-user-fullname")||null;a({fullName:c,id:b.uid,key:b.ukey})},getCurrentUser:function(a){var b=AJS.Meta.get("atlassian-account-id")||null;a({atlassianAccountId:b})},getTimeZone:function(a){a(a._context.extension.options.user.timeZone)}}});;
;
/* module-key = 'com.atlassian.plugins.atlassian-connect-plugin:content-resolver-v5', location = 'v5/js/iframe/host/content-resolver.js' */
(function(){function g(a,b){return AJS.contextPath()+"/plugins/servlet/ac/"+encodeURIComponent(a)+"/"+encodeURIComponent(b)}function h(a){var b={};_.keys(a).forEach(function(d){b["ac."+d]=a[d]});return b}function k(a,b){var d={};_.keys(a).forEach(function(c){b(c,a[c])&&(d[c]=a[c])});return d}function f(a){a=a.getResponseHeader("Date");a=Math.round(Date.parse(a)/1E3);var b=Math.round(Date.now()/1E3);isNaN(a)||(a=Math.abs(b-a),connectHost.setJwtClockSkew(a+60))}function l(a){a=a.addon_key+"__"+a.key;
if(window._AP&&window._AP.cacheableIframeUrls&&window._AP.cacheableIframeUrls[a])return window._AP.cacheableIframeUrls[a]}function e(a,b){return AJS.$.Deferred(function(d){var c=l(a);if(c&&!b)d.resolve(window._AP._convertConnectOptions({addon_key:a.addon_key,key:a.key,url:c,productCtx:JSON.stringify(a.options.productContext||{})}));else{c={"plugin-key":a.addon_key,"product-context":JSON.stringify(a.options.productContext||{}),key:a.key,width:a.width||"100%",height:a.height||"100%",classifier:a.classifier||
"raw"};a.options.contentClassifier&&(c.classifier=[a.options.contentClassifier,c.classifier]);var e=k(a.options.customData||{},function(a,b){return _.isObject(b)?!1:"string"===typeof b||b instanceof String?255>b.length:!0});AJS.$.ajax(g(a.addon_key,a.key),{dataType:"json"===a.classifier?"json":"html",data:AJS.$.extend({},c,h(e)),type:"POST"}).then(function(a,c,e){f(e);b?d.resolve(window._AP._convertConnectOptions(a)):require(["ac/create"],function(b){d.resolve(window._AP._convertConnectOptions(a))})}).fail(function(b,
c,e){f(b);d.reject({addon_key:a.addon_key,key:a.key,options:a.options},{text:"Unable to retrieve addon module URL. Please check your specified module key."})})}}).promise()}define("ac/content-resolver",function(){return{resolveByExtension:e}});connectHost.registerContentResolver.resolveByExtension(e)})();;
;
/* module-key = 'com.atlassian.plugins.atlassian-connect-plugin:ap-context-v5', location = 'v5/js/context/util.js' */
define("ac/context/util",function(){return{isValidExtensionOptionsForCache:function(a){var b=(!a.contextJwt||!connectHost.isJwtExpired(a.contextJwt,!0))&&!!a.structuredContext;if(b){var c=a.productContext&&0<Object.getOwnPropertyNames(a.productContext).length;a=0<Object.getOwnPropertyNames(a.structuredContext).length;c&&!a&&(b=!1)}return b}}});;
;
/* module-key = 'com.atlassian.plugins.atlassian-connect-plugin:ap-context-v5', location = 'v5/js/context/main.js' */
define("ac/context",["ac/content-resolver","ac/context/util"],function(h,k){function d(a){if(a.id&&1<a.id.length)return a.id;throw Error("ACJS: cannot generate cache key for extension");}function l(a){a=3E4+a;var b=Date.now();return a<b}function f(a,b){return{cachedAt:Date.now(),contextJwt:b,contextObj:a}}function e(a){var b=d(a);if(!c[b]||!c[b].promise&&c[b].context&&l(c[b].context.cachedAt))a.classifier="json",c[b]={promise:h.resolveByExtension(a,!0).done(function(a){c[b].context=f(a.options.structuredContext,
a.options.contextJwt)})}}function g(a){if(!a||2>a.length)throw Error("ACJS: Cannot get token. Add-on does not support JWT authentication");}var c={};window.connectHost.onIframeEstablished(function(a){if(k.isValidExtensionOptionsForCache(a.extension.options)){var b=d(a.extension);c[b]={context:f(a.extension.options.structuredContext,a.extension.options.contextJwt)}}else e(a.extension)});window.connectHost.onIframeUnload(function(a){delete c[d(a.extension)]});return{getToken:function(a){var b=d(a._context.extension);
e(a._context.extension);c[b].promise?c[b].promise.done(function(b){g(b.options.contextJwt);try{a(b.options.contextJwt)}catch(m){}}.bind(this)).fail(function(){console.error("ACJS: content resolver failed to get context jwt token")}).always(function(){delete c[b].promise}.bind(this)):(g(c[b].context.contextJwt),a(c[b].context.contextJwt))},getContext:function(a){var b=d(a._context.extension);e(a._context.extension);c[b].promise?c[b].promise.done(function(d){try{a(c[b].context.contextObj)}catch(m){}}.bind(this)).fail(function(){console.error("ACJS: content resolver failed to get context")}).always(function(){delete c[b].promise}.bind(this)):
a(c[b].context.contextObj)}}});;
;
/* module-key = 'com.atlassian.plugins.atlassian-connect-plugin:module-loader-v5', location = 'v5/js/iframe/host/module-loader.js' */
connectHost.defineModule("cookie",connectHostCookie);connectHost.defineModule("history",connectHostHistory);connectHost.defineModule(connectHostRequest.default);connectHost.defineModule("navigator",require("ac/navigator/module"));connectHost.defineModule("user",require("ac/user"));connectHost.defineModule("context",require("ac/context"));;
;
/* module-key = 'com.atlassian.plugins.atlassian-connect-plugin:iframe-insertion-v5', location = 'v5/js/iframe/combined/iframe-insertion.js' */
(function(){function h(a){var c;if("string"===typeof a&&1<a.length)try{c=JSON.parse(a)}catch(b){console.error("ACJS: failed to decode context",a)}"object"!==typeof c&&(c={});return c}function l(a,c){if("number"!==typeof a)return window.top;c=c||window;for(var b=0;b<a;b++)c=c.parent;return c}function g(a){function c(){var a=document.getElementById(b.containerId);window._AP.addonAttemptCounter[b.containerId]++;if(a)if(delete window._AP.addonAttemptCounter[b.containerId],window._AP.isSubHost){a.appendChild(d);
var a=d.contentDocument,f="(function(){ var w \x3d window; for (var i\x3d0; i\x3c"+b.options.hostFrameOffset+"; i++){w \x3d w.parent; } w.postMessage("+JSON.stringify({type:"set_inner_iframe_url",iframeData:b})+', "*");}());';a.open();a.write("\x3cscript\x3e"+f+"\x3c/script\x3e");a.close()}else{if(f=a.querySelector(".ap-iframe-container"))f.parentNode.removeChild(f),AJS.log&&AJS.log("AJS: duplicate iframe removed",b,a);d.appendTo(a);d.data("addon-key",b.addon_key);d.data("key",b.key)}else 10>=window._AP.addonAttemptCounter[b.containerId]&&
m(c)}window._AP.isSubHost=l(a.hostFrameOffset)!==window;var b=window._AP._convertConnectOptions(a),d;window._AP.isSubHost?d=window._AP._createSub(b):(n({addon_key:b.addon_key,key:b.key}).forEach(function(a){if(a.extension.options.uniqueKey===b.options.uniqueKey){var c=document.getElementById(a.extension_id);e().destroy(a.extension_id);c&&AJS.$(c).closest(".ap-iframe-container").remove()}},this),d=e().create(b));window._AP.addonAttemptCounter[b.containerId]=0;c()}var m=function(){return window.requestAnimationFrame||
window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(a){window.setTimeout(a,50)}}(),e=function(){return window.connectHost||window.AP},n=function(a){return e().getExtensions(a).filter(function(a){return!!document.getElementById(a.extension_id)})},k=function(a,c,b){try{var d=require(a);c(d)}catch(p){0>=b?(console.error("Unable to load module: "+a),c(null)):setTimeout(function(){k(a,c,b-1)},500)}};window._AP=window._AP||{};window._AP.addonAttemptCounter=window._AP.addonAttemptCounter||
{};window._AP._convertConnectOptions=function(a){var c={url:a.url,ns:a.uniqueKey,addon_key:a.addon_key,key:a.key,containerId:"embedded-"+a.uniqueKey,options:{history:{state:""},uniqueKey:a.uniqueKey,origin:a.origin,hostOrigin:a.hostOrigin,isFullPage:"1"===a.general,autoresize:!0,user:{timeZone:a.timeZone,fullName:a.fullName,uid:a.uid,ukey:a.ukey},productContext:h(a.productCtx),structuredContext:h(a.structuredContext),contextJwt:a.contextJwt,contextPath:a.cp,width:a.w||a.width,height:a.h||a.height,
targets:{env:{resize:"both"}}}};"string"===typeof a.contentClassifier&&(c.options.contentClassifier=a.contentClassifier);"number"===typeof a.hostFrameOffset&&(c.options.hostFrameOffset=a.hostFrameOffset+1);window._AP.isSubHost||(c.options.history.state=window.location.hash?window.location.hash.substr(2):"");return c};window._AP._createSub=function(a){var c=document.createElement("iframe"),b=e().subCreate(a);b.width=a.options.width||"";b.height=a.options.height||"";b.style="border:0;";b["class"]="ap-iframe";
b["data-addon-key"]=a.addon_key;b["data-key"]=a.key;delete b.src;Object.getOwnPropertyNames(b).forEach(function(a){c.setAttribute(a,b[a])});return c};window._AP.appendConnectAddon=function(a){var c=!1;try{window.top.karma&&(c=!0)}catch(d){}if(window===window.top||c)/com\.atlassian\.(jira|confluence)\.emcee(;|$|\.local|\.staging)/g.test(a.addon_key)?k("ac/marketplace",function(b){b&&e().defineModule("marketplace",b);g(a)},20):g(a);else{var b=function(c){c.source===window.top&&c.data&&void 0!==c.data.hostFrameOffset&&
(window.removeEventListener("message",b),a.hostFrameOffset=c.data.hostFrameOffset,g(a))};window.addEventListener("message",b);window.top.postMessage({type:"get_host_offset"},"*")}}})();;
;
/* module-key = 'com.atlassian.plugins.atlassian-connect-plugin:iframe-host-js-v5', location = 'v5/js/iframe/host/util.js' */
_AP.util={escapeSelector:function(a){if(!a)throw Error("No selector to escape");return a.replace(/[!"#$%&'()*+,.\/:;<=>?@[\\\]^`{|}~]/g,"\\$\x26")}};;
;
/* module-key = 'com.atlassian.plugins.atlassian-connect-plugin:iframe-host-js-v5', location = 'v5/js/iframe/host/main.js' */
_AP.addonAttemptCounter={};connectHost.onIframeEstablished(function(a){a.$el.closest(".ap-iframe-container").addClass("iframe-init")});AJS.$(window).on("blur",function(){var a=AJS.LayerManager.global.getTopLayer();if(a&&a.hasClass("aui-dialog2"))return!1;AJS.$(document.activeElement).hasClass("ap-iframe")&&document.documentElement.click()});define("ac/create",function(){return{appendConnectAddon:function(a){return window._AP.appendConnectAddon(a)}}});
window.addEventListener("message",function(a){"set_inner_iframe_url"===a.data.type&&(a.source.location=a.data.iframeData.url)});connectHost.setExtensionConfigurationOptions("crev",window._AP.allJsVersion);;
;
/* module-key = 'com.atlassian.plugins.atlassian-connect-plugin:jira-workflow-post-function-v5', location = 'v5/js/jira/workflow-post-function/workflow-post-function.js' */
define("ac/jira/workflow-post-function",["ac/jira/workflow-post-function-utils"],function(a){var d=function(){};connectHost.onIframeEstablished(function(b){if(a.isOnWorkflowPostFunctionPage()&&a.isPostFunctionExtension(b.extension)){var c=a.getPostFunctionId();"string"===typeof c&&a.registerSubmissionButton(c,function(a){d=a;connectHost.broadcastEvent("jira_workflow_post_function_submit",{id:b.extension.id})})}});return{getWorkflowConfiguration:function(b){if(!a.isOnWorkflowPostFunctionPage()||"function"!==
typeof b)return!1;var c=a.postFunctionConfigInput(b._context.extension.options.productContext["postFunction.id"]);b&&b(c)},_submitWorkflowConfigurationResponse:function(b,a){d(b)}}});;
;
/* module-key = 'com.atlassian.plugins.atlassian-connect-plugin:jira-workflow-post-function-v5', location = 'v5/js/jira/workflow-post-function/workflow-post-function-utils.js' */
(function(c,e){e("ac/jira/workflow-post-function-utils",function(){function f(a,b){a=c("#postFunction-config-"+a);b&&a.val(b);return a.val()}function d(){return 0<c("input[name\x3d'postFunction.id']").length}return{postFunctionConfigInput:f,isOnWorkflowPostFunctionPage:d,registerSubmissionButton:function(a,b,e){if(!d())throw"Not on a workflow configuration page";var g=!1;c(document).delegate("#add_submit, #update_submit","click",function(d){if(!g||e)d.preventDefault(),b(function(b){b.valid&&(f(a,
b.value),g=!0,c(d.target).click())})})},getPostFunctionId:function(){return c("input[name\x3d'postFunction.id']").val()},isPostFunctionExtension:function(a){return a&&a.options&&a.options.productContext&&(a=a.options.productContext,a["postFunction.id"]&&5<a["postFunction.id"].length)?!0:!1}}})})(AJS.$,define);;
;
/* module-key = 'jira.webresources:calendar', location = '/includes/lib/calendar/Calendar.js' */
Calendar=function(e,t,a,n,r){if(this.activeDiv=null,this.currentDateEl=null,this.getDateStatus=null,this.getDateToolTip=null,this.getDateText=null,this.timeout=null,this.onSelected=n||null,this.onClose=r||null,this.dragging=!1,this.hidden=!1,this.minYear=1970,this.maxYear=2050,this.dateFormat=Calendar._TT.DEF_DATE_FORMAT,this.ttDateFormat=Calendar._TT.TT_DATE_FORMAT,this.isPopup=!0,this.weekNumbers=!0,this.firstDayOfWeek="number"==typeof e?e:Calendar._FD,this.showsOtherMonths=!1,this.dateStr=t,this.todayDateStr=a,this.ar_days=null,this.showsTime=!1,this.time24=!0,this.yearStep=2,this.hiliteToday=!0,this.multiple=null,this.table=null,this.element=null,this.tbody=null,this.firstdayname=null,this.monthsCombo=null,this.yearsCombo=null,this.hilitedMonth=null,this.activeMonth=null,this.hilitedYear=null,this.activeYear=null,this.dateClicked=!1,"undefined"==typeof Calendar._SDN){"undefined"==typeof Calendar._SDN_len&&(Calendar._SDN_len=3);for(var l=new Array,i=8;i>0;)l[--i]=Calendar._DN[i].substr(0,Calendar._SDN_len);Calendar._SDN=l,"undefined"==typeof Calendar._SMN_len&&(Calendar._SMN_len=3),l=new Array;for(var i=12;i>0;)l[--i]=Calendar._MN[i].substr(0,Calendar._SMN_len);Calendar._SMN=l}},Calendar._C=null,Calendar.is_ie=/msie/i.test(navigator.userAgent)&&!/opera/i.test(navigator.userAgent),Calendar.is_ie5=Calendar.is_ie&&/msie 5\.0/i.test(navigator.userAgent),Calendar.is_ie6=Calendar.is_ie&&/msie 6\.0/i.test(navigator.userAgent),Calendar.is_opera=/opera/i.test(navigator.userAgent),Calendar.is_khtml=/Konqueror|Safari|KHTML/i.test(navigator.userAgent),Calendar.getAbsolutePos=function(e){var t=jQuery(e).offset();return t.x=t.left,t.y=t.top,t},Calendar.isRelated=function(e,t){var a=t.relatedTarget;if(!a){var n=t.type;"mouseover"==n?a=t.fromElement:"mouseout"==n&&(a=t.toElement)}for(;a;){if(a==e)return!0;a=a.parentNode}return!1},Calendar.removeClass=function(e,t){if(e&&e.className){for(var a=e.className.split(" "),n=new Array,r=a.length;r>0;)a[--r]!=t&&(n[n.length]=a[r]);e.className=n.join(" ")}},Calendar.addClass=function(e,t){Calendar.removeClass(e,t),e.className+=" "+t},Calendar.getElement=function(e){for(var t=Calendar.is_ie?window.event.srcElement:e.currentTarget;1!=t.nodeType||/^div$/i.test(t.tagName);)t=t.parentNode;return t},Calendar.getTargetElement=function(e){for(var t=Calendar.is_ie?window.event.srcElement:e.target;1!=t.nodeType;)t=t.parentNode;return t},Calendar.stopEvent=function(e){return e||(e=window.event),e.stopPropagation?(e.preventDefault(),e.stopPropagation()):(e.cancelBubble=!0,e.returnValue=!1),!1},Calendar.addEvent=function(e,t,a){e.attachEvent?e.attachEvent("on"+t,a):e.addEventListener?e.addEventListener(t,a,!0):e["on"+t]=a},Calendar.removeEvent=function(e,t,a){e.detachEvent?e.detachEvent("on"+t,a):e.removeEventListener?e.removeEventListener(t,a,!0):e["on"+t]=null},Calendar.createElement=function(e,t){var a=null;return a=document.createElementNS?document.createElementNS("http://www.w3.org/1999/xhtml",e):document.createElement(e),"undefined"!=typeof t&&t.appendChild(a),a},Calendar._add_evs=function(e){Calendar.addEvent(e,"mouseover",Calendar.dayMouseOver),Calendar.addEvent(e,"mousedown",Calendar.dayMouseDown),Calendar.addEvent(e,"mouseout",Calendar.dayMouseOut),Calendar.is_ie&&(Calendar.addEvent(e,"dblclick",Calendar.dayMouseDblClick),e.setAttribute("unselectable",!0))},Calendar.findMonth=function(e){return"undefined"!=typeof e.month?e:"undefined"!=typeof e.parentNode.month?e.parentNode:null},Calendar.findYear=function(e){return"undefined"!=typeof e.year?e:"undefined"!=typeof e.parentNode.year?e.parentNode:null},Calendar.showMonthsCombo=function(){var e=Calendar._C;if(!e)return!1;var e=e,t=e.activeDiv,a=e.monthsCombo;e.hilitedMonth&&Calendar.removeClass(e.hilitedMonth,"hilite"),e.activeMonth&&Calendar.removeClass(e.activeMonth,"active");var n=e.monthsCombo.getElementsByTagName("div")[e.date.getMonth()];Calendar.addClass(n,"active"),e.activeMonth=n;var r=a.style;if(r.display="block",t.navtype<0)r.left=t.offsetLeft+"px";else{var l=a.offsetWidth;"undefined"==typeof l&&(l=50),r.left=t.offsetLeft+t.offsetWidth-l+"px"}r.top=t.offsetTop+t.offsetHeight+"px"},Calendar.showYearsCombo=function(e){var t=Calendar._C;if(!t)return!1;var t=t,a=t.activeDiv,n=t.yearsCombo;t.hilitedYear&&Calendar.removeClass(t.hilitedYear,"hilite"),t.activeYear&&Calendar.removeClass(t.activeYear,"active"),t.activeYear=null;for(var r=t.date.getFullYear()+(e?1:-1),l=n.firstChild,i=!1,s=12;s>0;--s)r>=t.minYear&&r<=t.maxYear?(l.innerHTML=r,l.year=r,l.style.display="block",i=!0):l.style.display="none",l=l.nextSibling,r+=e?t.yearStep:-t.yearStep;if(i){var o=n.style;if(o.display="block",a.navtype<0)o.left=a.offsetLeft+"px";else{var d=n.offsetWidth;"undefined"==typeof d&&(d=50),o.left=a.offsetLeft+a.offsetWidth-d+"px"}o.top=a.offsetTop+a.offsetHeight+"px"}},Calendar.tableMouseUp=function(e){var t=Calendar._C;if(!t)return!1;t.timeout&&clearTimeout(t.timeout);var a=t.activeDiv;if(!a)return!1;var n=Calendar.getTargetElement(e);e||(e=window.event),Calendar.removeClass(a,"active"),n!=a&&n.parentNode!=a||Calendar.cellClick(a,e);var r=Calendar.findMonth(n),l=null;if(r)l=new Date(t.date),r.month!=l.getMonth()&&(l.setMonth(r.month),t.setDate(l),t.dateClicked=!1,t.callHandler());else{var i=Calendar.findYear(n);i&&(l=new Date(t.date),i.year!=l.getFullYear()&&(l.setFullYear(i.year),t.setDate(l),t.dateClicked=!1,t.callHandler()))}return Calendar.removeEvent(document,"mouseup",Calendar.tableMouseUp),Calendar.removeEvent(document,"mouseover",Calendar.tableMouseOver),Calendar.removeEvent(document,"mousemove",Calendar.tableMouseOver),t._hideCombos(),Calendar._C=null,Calendar.stopEvent(e)},Calendar.tableMouseOver=function(e){var t=Calendar._C;if(t){var a=t.activeDiv,n=Calendar.getTargetElement(e);if(n==a||n.parentNode==a?(Calendar.addClass(a,"hilite active"),Calendar.addClass(a.parentNode,"rowhilite")):(("undefined"==typeof a.navtype||50!=a.navtype&&(0==a.navtype||Math.abs(a.navtype)>2))&&Calendar.removeClass(a,"active"),Calendar.removeClass(a,"hilite"),Calendar.removeClass(a.parentNode,"rowhilite")),e||(e=window.event),50==a.navtype&&n!=a){var r,l=Calendar.getAbsolutePos(a),i=a.offsetWidth,s=e.clientX,o=!0;s>l.x+i?(r=s-l.x-i,o=!1):r=l.x-s,r<0&&(r=0);for(var d=a._range,u=a._current,h=Math.floor(r/10)%d.length,c=d.length;--c>=0&&d[c]!=u;);for(;h-- >0;)o?--c<0&&(c=d.length-1):++c>=d.length&&(c=0);var C=d[c];a.innerHTML=C,t.onUpdateTime()}var m=Calendar.findMonth(n);if(m)m.month!=t.date.getMonth()?(t.hilitedMonth&&Calendar.removeClass(t.hilitedMonth,"hilite"),Calendar.addClass(m,"hilite"),t.hilitedMonth=m):t.hilitedMonth&&Calendar.removeClass(t.hilitedMonth,"hilite");else{t.hilitedMonth&&Calendar.removeClass(t.hilitedMonth,"hilite");var p=Calendar.findYear(n);p&&p.year!=t.date.getFullYear()?(t.hilitedYear&&Calendar.removeClass(t.hilitedYear,"hilite"),Calendar.addClass(p,"hilite"),t.hilitedYear=p):t.hilitedYear&&Calendar.removeClass(t.hilitedYear,"hilite")}return Calendar.stopEvent(e)}},Calendar.tableMouseDown=function(e){if(Calendar.getTargetElement(e)==Calendar.getElement(e))return Calendar.stopEvent(e)},Calendar.calDragIt=function(e){var t=Calendar._C;if(!t||!t.dragging)return!1;var a,n;Calendar.is_ie?(n=window.event.clientY+document.body.scrollTop,a=window.event.clientX+document.body.scrollLeft):(a=e.pageX,n=e.pageY);var r=t.element.style;return r.left=a-t.xOffs+"px",r.top=n-t.yOffs+"px",Calendar.stopEvent(e)},Calendar.calDragEnd=function(e){var t=Calendar._C;return!!t&&(t.dragging=!1,Calendar.removeEvent(document,"mousemove",Calendar.calDragIt),Calendar.removeEvent(document,"mouseup",Calendar.calDragEnd),void Calendar.tableMouseUp(e))},Calendar.dayMouseDown=function(e){var t=Calendar.getElement(e);if(t.disabled)return!1;var a=t.calendar;return a.activeDiv=t,Calendar._C=a,300!=t.navtype?(50==t.navtype?(t._current=t.innerHTML,Calendar.addEvent(document,"mousemove",Calendar.tableMouseOver)):Calendar.addEvent(document,Calendar.is_ie5?"mousemove":"mouseover",Calendar.tableMouseOver),Calendar.addClass(t,"hilite active"),Calendar.addEvent(document,"mouseup",Calendar.tableMouseUp)):a.isPopup&&a._dragStart(e),t.navtype==-1||1==t.navtype?(a.timeout&&clearTimeout(a.timeout),a.timeout=setTimeout("Calendar.showMonthsCombo()",250)):t.navtype==-2||2==t.navtype?(a.timeout&&clearTimeout(a.timeout),a.timeout=setTimeout(t.navtype>0?"Calendar.showYearsCombo(true)":"Calendar.showYearsCombo(false)",250)):a.timeout=null,Calendar.stopEvent(e)},Calendar.dayMouseDblClick=function(e){Calendar.cellClick(Calendar.getElement(e),e||window.event),Calendar.is_ie&&document.selection.empty()},Calendar.dayMouseOver=function(e){var t=Calendar.getElement(e);return!(Calendar.isRelated(t,e)||Calendar._C||t.disabled)&&(t.ttip&&("_"==t.ttip.substr(0,1)&&(t.ttip=t.caldate.print(t.calendar.ttDateFormat)+t.ttip.substr(1)),t.calendar.tooltips.innerHTML=t.ttip),300!=t.navtype&&(Calendar.addClass(t,"hilite"),t.caldate&&Calendar.addClass(t.parentNode,"rowhilite")),Calendar.stopEvent(e))},Calendar.dayMouseOut=function(e){var t=Calendar.getElement(e);return!(Calendar.isRelated(t,e)||Calendar._C||t.disabled)&&(Calendar.removeClass(t,"hilite"),t.caldate&&Calendar.removeClass(t.parentNode,"rowhilite"),t.calendar&&(t.calendar.tooltips.innerHTML=Calendar._TT.SEL_DATE),Calendar.stopEvent(e))},Calendar.cellClick=function(e,t){function a(e){var t=i.getDate(),a=i.getMonthDays(e);t>a&&i.setDate(a),i.setMonth(e)}var n=e.calendar,r=!1,l=!1,i=null;if("undefined"==typeof e.navtype){n.currentDateEl&&(Calendar.removeClass(n.currentDateEl,"selected"),Calendar.addClass(e,"selected"),r=n.currentDateEl==e,r||(n.currentDateEl=e)),n.date.setDateOnly(e.caldate),i=n.date;var s=!(n.dateClicked=!e.otherMonth);s||n.currentDateEl?l=!e.disabled:n._toggleMultipleDate(new Date(i)),s&&n._init(n.firstDayOfWeek,i)}else{if(200==e.navtype)return Calendar.removeClass(e,"hilite"),void n.callCloseHandler();i=new Date(n.date),0==e.navtype&&(n.todayDateStr?i=new Date(n.todayDateStr):i.setDateOnly(new Date)),n.dateClicked=!1;var o=i.getFullYear(),d=i.getMonth();switch(e.navtype){case 400:Calendar.removeClass(e,"hilite");var u=Calendar._TT.ABOUT;return"undefined"!=typeof u?u+=n.showsTime?Calendar._TT.ABOUT_TIME:"":u='Help and about box text is not translated into this language.\nIf you know this language and you feel generous please update\nthe corresponding file in "lang" subdir to match calendar-en.js\nand send it back to <mihai_bazon@yahoo.com> to get it into the distribution  ;-)\n\nThank you!\nhttp://dynarch.com/mishoo/calendar.epl\n',void alert(u);case-2:o>n.minYear&&i.setFullYear(o-1);break;case-1:d>0?a(d-1):o-- >n.minYear&&(i.setFullYear(o),a(11));break;case 1:d<11?a(d+1):o<n.maxYear&&(i.setFullYear(o+1),a(0));break;case 2:o<n.maxYear&&i.setFullYear(o+1);break;case 100:return void n.setFirstDayOfWeek(e.fdow);case 50:for(var h=e._range,c=e.innerHTML,C=h.length;--C>=0&&h[C]!=c;);t&&t.shiftKey?--C<0&&(C=h.length-1):++C>=h.length&&(C=0);var m=h[C];return e.innerHTML=m,void n.onUpdateTime();case 0:if("function"==typeof n.getDateStatus&&n.getDateStatus(i,i.getFullYear(),i.getMonth(),i.getDate()))return!1}i.equalsTo(n.date)?0==e.navtype&&(l=r=!0):(n.setDate(i),l=!0)}l&&t&&n.callHandler(),r&&(Calendar.removeClass(e,"hilite"),t&&n.callCloseHandler())},Calendar.prototype.create=function(e){var t=null;e?(t=e,this.isPopup=!1):(t=document.getElementsByTagName("body")[0],this.isPopup=!0),this.dateStr&&(this.date=new Date(this.dateStr)),this.date&&!isNaN(this.date)||(this.date=new Date);var a=Calendar.createElement("table");this.table=a,a.cellSpacing=0,a.cellPadding=0,a.calendar=this,Calendar.addEvent(a,"mousedown",Calendar.tableMouseDown);var n=Calendar.createElement("div");this.element=n,n.className="calendar",this.isPopup&&(n.style.position="absolute",n.style.display="none"),n.appendChild(a);var r=Calendar.createElement("thead",a),l=null,i=null,s=this,o=function(e,t,a){return l=Calendar.createElement("td",i),l.colSpan=t,l.className="button",0!=a&&Math.abs(a)<=2&&(l.className+=" nav"),Calendar._add_evs(l),l.calendar=s,l.navtype=a,l.innerHTML="<div unselectable='on'>"+e+"</div>",l};i=Calendar.createElement("tr",r);var d=6;this.isPopup&&--d,this.weekNumbers&&++d,o("?",1,400).ttip=Calendar._TT.INFO,this.title=o("",d,300),this.title.className="title",this.isPopup&&(this.title.ttip=Calendar._TT.DRAG_TO_MOVE,this.title.style.cursor="move",o("&#x00d7;",1,200).ttip=Calendar._TT.CLOSE),i=Calendar.createElement("tr",r),i.className="headrow",this._nav_py=o("&#x00ab;",1,-2),this._nav_py.ttip=Calendar._TT.PREV_YEAR,this._nav_pm=o("&#x2039;",1,-1),this._nav_pm.ttip=Calendar._TT.PREV_MONTH,this._nav_now=o(Calendar._TT.TODAY,this.weekNumbers?4:3,0),this._nav_now.ttip=Calendar._TT.GO_TODAY,this._nav_nm=o("&#x203a;",1,1),this._nav_nm.ttip=Calendar._TT.NEXT_MONTH,this._nav_ny=o("&#x00bb;",1,2),this._nav_ny.ttip=Calendar._TT.NEXT_YEAR,i=Calendar.createElement("tr",r),i.className="daynames",this.weekNumbers&&(l=Calendar.createElement("td",i),l.className="name wn",l.innerHTML=Calendar._TT.WK);for(var u=7;u>0;--u)l=Calendar.createElement("td",i),u||(l.navtype=100,l.calendar=this,Calendar._add_evs(l));this.firstdayname=this.weekNumbers?i.firstChild.nextSibling:i.firstChild,this._displayWeekdays();var h=Calendar.createElement("tbody",a);for(this.tbody=h,u=6;u>0;--u){i=Calendar.createElement("tr",h),this.weekNumbers&&(l=Calendar.createElement("td",i));for(var c=7;c>0;--c)l=Calendar.createElement("td",i),l.calendar=this,Calendar._add_evs(l)}this.showsTime?(i=Calendar.createElement("tr",h),i.className="time",l=Calendar.createElement("td",i),l.className="time",l.colSpan=2,l.innerHTML=Calendar._TT.TIME||"&nbsp;",l=Calendar.createElement("td",i),l.className="time",l.colSpan=this.weekNumbers?4:3,function(){function e(e,t,a,n){var r=Calendar.createElement("span",l);if(r.className=e,r.innerHTML=t,r.calendar=s,r.ttip=Calendar._TT.TIME_PART,r.navtype=50,r._range=[],"number"!=typeof a)r._range=a;else for(var i=a;i<=n;++i){var o;o=i<10&&n>=10?"0"+i:""+i,r._range[r._range.length]=o}return Calendar._add_evs(r),r}var t=s.date.getHours(),a=s.date.getMinutes(),n=!s.time24,r=t>12;n&&r&&(t-=12);var o=e("hour",t,n?1:0,n?12:23),d=Calendar.createElement("span",l);d.innerHTML=":",d.className="colon";var u=e("minute",a,0,59),h=null;l=Calendar.createElement("td",i),l.className="time",l.colSpan=2,n?h=e("ampm",r?Calendar._TT.PM:Calendar._TT.AM,[Calendar._TT.am,Calendar._TT.pm]):l.innerHTML="&nbsp;",s.onSetTime=function(){var e,t=this.date.getHours(),a=this.date.getMinutes();n&&(e=t>=12,e&&(t-=12),0==t&&(t=12),h.innerHTML=e?Calendar._TT.pm:Calendar._TT.am),o.innerHTML=t<10?"0"+t:t,u.innerHTML=a<10?"0"+a:a},s.onUpdateTime=function(){var e=this.date,t=parseInt(o.innerHTML,10);n&&(new RegExp(Calendar._TT.pm,"i").test(h.innerHTML)&&t<12?t+=12:new RegExp(Calendar._TT.am,"i").test(h.innerHTML)&&12==t&&(t=0));var a=e.getDate(),r=e.getMonth(),l=e.getFullYear();e.setHours(t),e.setMinutes(parseInt(u.innerHTML,10)),e.setFullYear(l),e.setMonth(r),e.setDate(a),this.dateClicked=!1,this.callHandler()}}()):this.onSetTime=this.onUpdateTime=function(){};var C=Calendar.createElement("tfoot",a);for(i=Calendar.createElement("tr",C),i.className="footrow",l=o(Calendar._TT.SEL_DATE,this.weekNumbers?8:7,300),l.className="ttip",this.isPopup&&(l.ttip=Calendar._TT.DRAG_TO_MOVE,l.style.cursor="move"),this.tooltips=l,n=Calendar.createElement("div",this.element),this.monthsCombo=n,n.className="combo",u=0;u<Calendar._MN.length;++u){var m=Calendar.createElement("div");m.className=Calendar.is_ie?"label-IEfix":"label",m.month=u,m.innerHTML=Calendar._SMN[u],n.appendChild(m)}for(n=Calendar.createElement("div",this.element),this.yearsCombo=n,n.className="combo",u=12;u>0;--u){var p=Calendar.createElement("div");p.className=Calendar.is_ie?"label-IEfix":"label",n.appendChild(p)}this._init(this.firstDayOfWeek,this.date),t.appendChild(this.element),Calendar.addEvent(this.element,"mousedown",function(e){e.preventDefault?e.preventDefault():e.returnValue=!1})},Calendar._upkeyEvent=function(e){27===e.keyCode&&window.setTimeout(function(){var e=window._dynarch_popupCalendar;return!(!e||e.multiple)&&void e.callCloseHandler()},0)},Calendar._keyEvent=function(e){function t(){h=r.currentDateEl;var e=h.pos;o=15&e,d=e>>4,u=r.ar_days[d][o]}function a(){var e=new Date(r.date);e.setDate(e.getDate()-c),r.setDate(e)}function n(){var e=new Date(r.date);e.setDate(e.getDate()+c),r.setDate(e)}var r=window._dynarch_popupCalendar;if(!r||r.multiple)return!1;var l=Calendar.is_ie||"keydown"==e.type,i=e.keyCode;if(e.ctrlKey)switch(i){case 37:l&&Calendar.cellClick(r._nav_pm);break;case 38:l&&Calendar.cellClick(r._nav_py);break;case 39:l&&Calendar.cellClick(r._nav_nm);break;case 40:l&&Calendar.cellClick(r._nav_ny)}else switch(i){case 32:Calendar.cellClick(r._nav_now);break;case 37:case 38:case 39:case 40:if(l){var s,o,d,u,h,c;for(s=37==i||38==i,c=37==i||39==i?1:7,t();;){switch(i){case 37:if(!(--o>=0)){o=6,i=38;continue}u=r.ar_days[d][o];break;case 38:--d>=0?u=r.ar_days[d][o]:(a(),t());break;case 39:if(!(++o<7)){o=0,i=40;continue}u=r.ar_days[d][o];break;case 40:++d<r.ar_days.length?u=r.ar_days[d][o]:(n(),t())}break}u&&(u.disabled?s?a():n():Calendar.cellClick(u))}break;case 13:l&&Calendar.cellClick(r.currentDateEl,e)}return Calendar.stopEvent(e)},Calendar.prototype._init=function(e,t){var a=new Date(t);a.setHours(13);var n=new Date,r=n.getFullYear(),l=n.getMonth(),i=n.getDate();this.table.style.visibility="hidden";var s=a.getFullYear();s<this.minYear?(s=this.minYear,a.setFullYear(s)):s>this.maxYear&&(s=this.maxYear,a.setFullYear(s)),this.firstDayOfWeek=e;var o=a.getMonth(),d=a.getDate();a.getMonthDays();a.setDate(1);var u=(a.getDay()-this.firstDayOfWeek)%7;u<0&&(u+=7),a.setDate(-u),a.setDate(a.getDate()+1);for(var h=this.tbody.firstChild,c=(Calendar._SMN[o],this.ar_days=new Array),C=Calendar._TT.WEEKEND,m=this.multiple?this.datesCells={}:null,p=0;p<6;++p,h=h.nextSibling){var v=h.firstChild;if(this.weekNumbers){v.className="day wn";var f=a;0==o&&0==p&&0==Date.useISO8601WeekNumbers&&(f=new Date(s,o,1)),v.innerHTML=f.getWeekNumber(this.firstDayOfWeek),v=v.nextSibling}h.className="daysrow";for(var y,g=!1,_=c[p]=[],D=0;D<7;++D,v=v.nextSibling,a.setDate(y+1)){y=a.getDate();var b=a.getDay();v.className="day day-"+y,v.pos=p<<4|D,_[D]=v;var T=a.getMonth()==o;if(T)v.otherMonth=!1,g=!0;else{if(!this.showsOtherMonths){v.className="emptycell",v.innerHTML="&nbsp;",v.disabled=!0;continue}v.className+=" othermonth",v.otherMonth=!0}if(v.disabled=!1,v.innerHTML=this.getDateText?this.getDateText(a,y):y,m&&(m[a.print("%Y%m%d")]=v),this.getDateStatus){var w=this.getDateStatus(a,s,o,y);if(this.getDateToolTip){var M=this.getDateToolTip(a,s,o,y);M&&(v.title=M)}w===!0?(v.className+=" disabled",v.disabled=!0):(/disabled/i.test(w)&&(v.disabled=!0),v.className+=" "+w)}v.disabled||(v.caldate=new Date(a),v.ttip="_",!this.multiple&&T&&y==d&&this.hiliteToday&&(v.className+=" selected",this.currentDateEl=v),a.getFullYear()==r&&a.getMonth()==l&&y==i&&(v.className+=" today",v.ttip+=Calendar._TT.PART_TODAY),C.indexOf(b.toString())!=-1&&(v.className+=v.otherMonth?" oweekend":" weekend"))}g||this.showsOtherMonths||(h.className="emptyrow")}this.date=new Date(t),this.onSetTime(),this.title.innerHTML=Calendar._MN[o]+", "+s,this.table.style.visibility="visible",this._initMultipleDates()},Calendar.prototype._initMultipleDates=function(){if(this.multiple)for(var e in this.multiple){var t=this.datesCells[e],a=this.multiple[e];a&&t&&(t.className+=" selected")}},Calendar.prototype._toggleMultipleDate=function(e){if(this.multiple){var t=e.print("%Y%m%d"),a=this.datesCells[t];if(a){var n=this.multiple[t];n?(Calendar.removeClass(a,"selected"),delete this.multiple[t]):(Calendar.addClass(a,"selected"),this.multiple[t]=e)}}},Calendar.prototype.setDateToolTipHandler=function(e){this.getDateToolTip=e},Calendar.prototype.setDate=function(e){e.equalsTo(this.date)||this._init(this.firstDayOfWeek,e)},Calendar.prototype.refresh=function(){this._init(this.firstDayOfWeek,this.date)},Calendar.prototype.setFirstDayOfWeek=function(e){this._init(e,this.date),this._displayWeekdays()},Calendar.prototype.setDateStatusHandler=Calendar.prototype.setDisabledHandler=function(e){this.getDateStatus=e},Calendar.prototype.setRange=function(e,t){this.minYear=e,this.maxYear=t},Calendar.prototype.callHandler=function(){this.onSelected&&this.onSelected(this,this.date.print(this.dateFormat))},Calendar.prototype.callCloseHandler=function(){this.onClose&&this.onClose(this)},Calendar.prototype.destroy=function(){var e=this.element.parentNode;e.removeChild(this.element),Calendar._C=null,window._dynarch_popupCalendar=null},Calendar.prototype.reparent=function(e){var t=this.element;t.parentNode.removeChild(t),e.appendChild(t)},Calendar._checkCalendar=function(e){var t=window._dynarch_popupCalendar;if(!t)return!1;for(var a=Calendar.is_ie?Calendar.getElement(e):Calendar.getTargetElement(e);null!=a&&a!=t.element;a=a.parentNode);return null==a?(window._dynarch_popupCalendar.callCloseHandler(),Calendar.stopEvent(e)):void 0},Calendar.prototype.show=function(){if(!this.params.inputField.disabled){for(var e=this.table.getElementsByTagName("tr"),t=e.length;t>0;){var a=e[--t];Calendar.removeClass(a,"rowhilite");for(var n=a.getElementsByTagName("td"),r=n.length;r>0;){var l=n[--r];Calendar.removeClass(l,"hilite"),Calendar.removeClass(l,"active")}}Calendar.current=this,this.element.style.display="block",this.element.className+=" active",this.hidden=!1,this.isPopup&&(window._dynarch_popupCalendar=this,Calendar.addEvent(document,"keyup",Calendar._upkeyEvent),Calendar.addEvent(document,"keydown",Calendar._keyEvent),Calendar.addEvent(document,"mousedown",Calendar._checkCalendar))}},Calendar.prototype.hide=function(){this.isPopup&&(Calendar.removeEvent(document,"keyup",Calendar._upkeyEvent),Calendar.removeEvent(document,"keydown",Calendar._keyEvent),Calendar.removeEvent(document,"mousedown",Calendar._checkCalendar)),Calendar.current=null,this.element.style.display="none",this.element.className=this.element.className.replace(/active/gi,""),this.hidden=!0},Calendar.prototype.showAt=function(e,t){var a=this.element.style;a.left=e+"px",a.top=t+"px",this.show()},Calendar.prototype.showAtElement=function(e,t){function a(e){e.x<0&&(e.x=0),e.y<0&&(e.y=0);var t=document.createElement("div"),a=t.style;a.position="absolute",a.right=a.bottom=a.width=a.height="0px",document.body.appendChild(t);var n=Calendar.getAbsolutePos(t);document.body.removeChild(t),n.y+=jQuery(window).scrollTop(),n.x+=jQuery(window).scrollLeft();var r=e.x+e.width-n.x;r>0&&(e.x-=r),r=e.y+e.height-n.y,r>0&&(e.y-=r)}var n=this,r=Calendar.getAbsolutePos(e);return t&&"string"==typeof t?(this.element.style.display="block",Calendar.continuation_for_the_khtml_browser=function(){var l=jQuery(n.element).outerWidth(),i=jQuery(n.element).outerHeight();n.element.style.display="none";var s=t.substr(0,1),o="l";switch(t.length>1&&(o=t.substr(1,1)),s){case"T":r.y-=i;break;case"B":r.y+=jQuery(e).outerHeight();break;case"C":r.y+=(jQuery(e).outerHeight()-i)/2;break;case"t":r.y+=jQuery(e).outerHeight()-i;break;case"b":}switch(o){case"L":r.x-=l;break;case"R":r.x+=jQuery(e).outerWidth();break;case"C":r.x+=(jQuery(e).outerWidth()-l)/2;break;case"l":r.x+=jQuery(e).outerWidth()-l;break;case"r":}r.width=l,r.height=i+40,n.monthsCombo.style.display="none",a(r),n.showAt(r.x,r.y)},void Calendar.continuation_for_the_khtml_browser()):(this.showAt(r.x,r.y+e.offsetHeight),!0)},Calendar.prototype.setDateFormat=function(e){this.dateFormat=e},Calendar.prototype.setTtDateFormat=function(e){this.ttDateFormat=e},Calendar.prototype.parseDate=function(e,t){t||(t=this.dateFormat),this.setDate(Date.parseDate(e,t))},Calendar.prototype._displayWeekdays=function(){for(var e=this.firstDayOfWeek,t=this.firstdayname,a=Calendar._TT.WEEKEND,n=0;n<7;++n){t.className="day name";var r=(n+e)%7;n&&(t.ttip=Calendar._TT.DAY_FIRST.replace("%s",Calendar._DN[r]),t.navtype=100,t.calendar=this,t.fdow=r,Calendar._add_evs(t)),a.indexOf(r.toString())!=-1&&Calendar.addClass(t,"weekend"),t.innerHTML=Calendar._SDN[(n+e)%7],t=t.nextSibling}},Calendar.prototype._hideCombos=function(){this.monthsCombo.style.display="none",this.yearsCombo.style.display="none"},Calendar.prototype._dragStart=function(e){if(!this.dragging){this.dragging=!0;var t,a;Calendar.is_ie?(a=window.event.clientY+document.body.scrollTop,t=window.event.clientX+document.body.scrollLeft):(a=e.clientY+window.scrollY,t=e.clientX+window.scrollX);var n=this.element.style;this.xOffs=t-parseInt(n.left),this.yOffs=a-parseInt(n.top),Calendar.addEvent(document,"mousemove",Calendar.calDragIt),Calendar.addEvent(document,"mouseup",Calendar.calDragEnd)}},Date._MD=new Array(31,28,31,30,31,30,31,31,30,31,30,31),Date.SECOND=1e3,Date.MINUTE=60*Date.SECOND,Date.HOUR=60*Date.MINUTE,Date.DAY=24*Date.HOUR,Date.WEEK=7*Date.DAY,Date._multisplit=function(e,t){if(null==e)return null;null==t&&(t="");var a=[],n=e.length,r="",l=!1;for(i=0;i<n;i++){var s=e.charAt(i);t.indexOf(s)==-1?(l=!0,r+=s):l&&(a[a.length]=r,r="",l=!1)}return r.length>0&&(a[a.length]=r),0==a.length&&(a[a.length]=""),a},Date._parseNonDateFormatChars=function(e){var t="aAbBCdeHIJklmMnpPRSstUWVuwyY%",a="",n=e.length;for(i=0;i<n;i++){var r=e.charAt(i);if("%"==r){var l="";if(i+1<n&&(l=e.charAt(i+1)),i+=1,l.length>0&&t.indexOf(l)!=-1)continue;a.indexOf(r)==-1&&(a+=r),l.length>0&&a.indexOf(l)==-1&&(a+=l)}else a.indexOf(r)==-1&&(a+=r)}return a},Date.splitDate=function(e,t){var a=0,n=-1,r=0,l=Date._parseNonDateFormatChars(t),i=Date._multisplit(e,l),s=t.match(/%./g),o=0,d=0,u=0,h=0;for(o=0;o<i.length;++o)if(i[o])switch(s[o]){case"%d":case"%e":r=Number(i[o]);break;case"%m":n=Number(i[o])-1;break;case"%Y":case"%y":a=Number(i[o]),a<100&&(a+=a>29?1900:2e3);break;case"%b":case"%B":var c=i[o].toLowerCase(),C=!1;if("%b"==s[o])for(d=0;d<12;++d)if(Calendar._SMN[d].substr(0,c.length).toLowerCase()==c){n=d,C=!0;break}if(!C)for(d=0;d<12;++d)if(Calendar._MN[d].substr(0,c.length).toLowerCase()==c){n=d;break}break;case"%H":case"%I":case"%k":case"%l":u=Number(i[o]);break;case"%P":case"%p":/pm/i.test(i[o])&&u<12?u+=12:/am/i.test(i[o])&&u>=12&&(u-=12);break;case"%M":h=Number(i[o]);break;case"%R":var m=i[o],p=m.indexOf(":"),v=m.substring(0,p),f=p==-1?0:m.substring(p+1);u=Number(v),h=Number(f)}return{parts:i,year:a,month:n,day:r,hour:u,minute:h}},Date.parseDate=function(e,t){var a=new Date,n=Date.splitDate(e,t),r=n.parts,l=n.year,i=n.month,s=n.day,o=n.hour,d=n.minute,u=0,h=0;if(isNaN(l)&&(l=a.getFullYear()),isNaN(i)&&(i=a.getMonth()),isNaN(s)&&(s=a.getDate()),isNaN(o)&&(o=a.getHours()),isNaN(d)&&(d=a.getMinutes()),0!=l&&i!=-1&&0!=s)return new Date(l,i,s,o,d,0);for(l=0,i=-1,s=0,u=0;u<r.length;++u)if(r[u].search(/[a-zA-Z]+/)!=-1){var c=-1;for(h=0;h<12;++h)if(Calendar._MN[h].substr(0,r[u].length).toLowerCase()==r[u].toLowerCase()){c=h;break}c!=-1&&(i!=-1&&(s=i+1),i=c)}else Number(r[u])<=12&&i==-1?i=r[u]-1:Number(r[u])>31&&0==l?(l=Number(r[u]),l<100&&(l+=l>29?1900:2e3)):0==s&&(s=r[u]);return 0==l&&(l=a.getFullYear()),i!=-1&&0!=s?new Date(l,i,s,o,d,0):a},Date.prototype.getMonthDays=function(e){var t=this.getFullYear();return"undefined"==typeof e&&(e=this.getMonth()),0!=t%4||0==t%100&&0!=t%400||1!=e?Date._MD[e]:29},Date.prototype.getDayOfYear=function(){var e=new Date(this.getFullYear(),this.getMonth(),this.getDate(),13,0,0),t=new Date(this.getFullYear(),0,0,13,0,0),a=e-t;return Math.floor(a/Date.DAY)},Date.prototype.getWeekNumber=function(e){return Date.useISO8601WeekNumbers?this.getISO8601WeekNumber():this.getSimpleWeekNumber(e)},Date.prototype.getISO8601WeekNumber=function(){function e(e,t,a){return y=e,m=t,t<3&&(y-=1),t<3&&(m+=12),Math.floor(365.25*y)-Math.floor(y/100)+Math.floor(y/400)+Math.floor(30.6*(m+1))+a-62}function t(t){return year=t.getFullYear(),month=t.getMonth(),day=t.getDate(),wday=t.getDay(),weekday=(wday+6)%7+1,isoyear=year,d0=e(year,1,0),weekday0=(d0+4)%7+1,d=e(year,month+1,day),isoweeknr=Math.floor((d-d0+weekday0+6)/7)-Math.floor((weekday0+3)/7),11==month&&day-weekday>27&&(isoweeknr=1,isoyear+=1),0==month&&weekday-day>3&&(d0=e(year-1,1,0),weekday0=(d0+4)%7+1,isoweeknr=Math.floor((d-d0+weekday0+6)/7)-Math.floor((weekday0+3)/7),isoyear-=1),isoweeknr}return t(this)},Date.prototype.getSimpleWeekNumber=function(e){function t(e,t,a){var n,r=e.getFullYear(),l=new Date(r,0,1);return n=Math.round((e-l)/864e5),null!=t&&(n-=(7+t-l.getDay())%7),null!=a&&(n+=a),[r,1+n/7|0,1+(7+n)%7]}return t(this,e?e:6,6)[1]},Date.prototype.equalsTo=function(e){return this.getFullYear()==e.getFullYear()&&this.getMonth()==e.getMonth()&&this.getDate()==e.getDate()&&this.getHours()==e.getHours()&&this.getMinutes()==e.getMinutes()},Date.prototype.setDateOnly=function(e){var t=new Date(e);this.setDate(1),this.setFullYear(t.getFullYear()),this.setMonth(t.getMonth()),this.setDate(t.getDate())},Date.prototype.print=function(e){var t=this.getMonth(),a=this.getDate(),n=this.getFullYear(),r=this.getWeekNumber(),l=this.getDay(),i={},s=this.getHours(),o=s>=12,d=o?s-12:s,u=this.getDayOfYear();0==d&&(d=12);var h=this.getMinutes(),c=this.getSeconds();i["%a"]=Calendar._SDN[l],i["%A"]=Calendar._DN[l],i["%b"]=Calendar._SMN[t],i["%B"]=Calendar._MN[t],i["%C"]=1+Math.floor(n/100),i["%d"]=a<10?"0"+a:a,i["%e"]=a,i["%H"]=s<10?"0"+s:s,i["%I"]=d<10?"0"+d:d,i["%j"]=u<100?u<10?"00"+u:"0"+u:u,i["%k"]=s,i["%l"]=d,i["%m"]=t<9?"0"+(1+t):1+t,i["%M"]=h<10?"0"+h:h,i["%n"]="\n",i["%p"]=o?Calendar._TT.PM:Calendar._TT.AM,i["%P"]=o?Calendar._TT.PM:Calendar._TT.AM,i["%R"]=i["%k"]+":"+i["%M"],i["%s"]=Math.floor(this.getTime()/1e3),i["%S"]=c<10?"0"+c:c,i["%t"]="\t",i["%U"]=i["%W"]=i["%V"]=r<10?"0"+r:r,i["%u"]=l+1,i["%w"]=l,i["%y"]=(""+n).slice(-2),i["%Y"]=n,i["%%"]="%";var C=/%./g;if(!Calendar.is_ie5&&!Calendar.is_khtml)return e.replace(C,function(e){return i[e]||e});for(var m=e.match(C),p=0;p<m.length;p++){var v=i[m[p]];v&&(C=new RegExp(m[p],"g"),e=e.replace(C,v))}return e},Date.prototype.__msh_oldSetFullYear=Date.prototype.setFullYear,Date.prototype.setFullYear=function(e){var t=new Date(this);t.__msh_oldSetFullYear(e),t.getMonth()!=this.getMonth()&&this.setDate(28),this.__msh_oldSetFullYear(e)},window._dynarch_popupCalendar=null;;
;
/* module-key = 'jira.webresources:calendar', location = '/includes/lib/calendar/Calendar.setup.js' */
Calendar.setup=function(e){function t(t,a){"undefined"==typeof e[t]&&(e[t]=a)}function a(e){var t=e.params,a=e.dateClicked||t.electric;a&&t.inputField&&(t.inputField.value=e.date.print(t.ifFormat),jQuery(t.inputField).change()),a&&t.displayArea&&(t.displayArea.innerHTML=e.date.print(t.daFormat)),a&&"function"==typeof t.onUpdate&&t.onUpdate(e),a&&t.flat&&"function"==typeof t.flatCallback&&t.flatCallback(e),"true"===t.singleClick?t.singleClick=!0:"false"===t.singleClick&&(t.singleClick=!1),a&&t.singleClick&&e.dateClicked&&e.callCloseHandler()}function n(){if(Calendar._UNSUPPORTED===!0)return void alert("The JIRA Calendar does not currently support your language.");var t=e.inputField||e.displayArea,n=e.inputField?e.ifFormat:e.daFormat,l=!1,i=window.calendar;if(i&&i.hide(),t&&(t.value||t.innerHTML)&&(e.date=Date.parseDate(t.value||t.innerHTML,n)),i&&e.cache?(e.date&&i.setDate(e.date),i.hide()):(window.calendar=i=new Calendar(e.firstDay,e.date,e.todayDate,e.onSelect||a,e.onClose||function(e){e.hide()}),i.showsTime=e.showsTime,i.time24="24"==e.timeFormat,i.weekNumbers=e.weekNumbers,Date.useISO8601WeekNumbers=e.useISO8601WeekNumbers,e.useISO8601WeekNumbers&&(i.firstDayOfWeek=1),l=!0),e.multiple){i.multiple={};for(var r=e.multiple.length;--r>=0;){var u=e.multiple[r],s=u.print("%Y%m%d");i.multiple[s]=u}}return i.showsOtherMonths=e.showOthers,i.yearStep=e.step,i.setRange(e.range[0],e.range[1]),i.params=e,i.setDateStatusHandler(e.dateStatusFunc),i.getDateText=e.dateText,i.setDateFormat(n),l&&i.create(),i.refresh(),e.position?i.showAt(e.position[0],e.position[1]):i.showAtElement(e.button||e.displayArea||e.inputField,e.align),!1}function l(){var t=jQuery(e.inputField);e.button&&jQuery(e.button).mousedown(function(e){e.preventDefault(),!t.is(":focus")&&t.is(":enabled")&&t.focus()}),t.keydown(function(e){var t=window.calendar;40===e.keyCode&&(t&&!t.hidden||setTimeout(function(){n()},1))})}e=e||{},t("inputField",null),t("context",null),t("displayArea",null),t("button",null),t("eventName","click"),t("ifFormat","%Y/%m/%d"),t("daFormat","%Y/%m/%d"),t("singleClick",!0),t("disableFunc",null),t("dateStatusFunc",e.disableFunc),t("dateText",null),t("firstDay",null),t("align","Br"),t("range",[1900,2999]),t("weekNumbers",!0),t("useISO8601WeekNumbers",!1),t("flat",null),t("flatCallback",null),t("onSelect",null),t("onClose",null),t("onUpdate",null),t("date",null),t("todayDate",null),t("showsTime",!1),t("timeFormat","24"),t("electric",!0),t("step",1),t("position",null),t("cache",!1),t("showOthers",!1),t("multiple",null);var i,r,u=["context","inputField","button","displayArea"];for(i in u)r=u[i],e[r]instanceof jQuery&&(e[r]=e[r][0]);var s=["inputField","displayArea","button"];for(i in s)if(r=s[i],"string"==typeof e[r]){var o="#"+e[r].escapejQuerySelector(),d=jQuery(e.context||document.body).find(o);e[r]=d[0]}if(!(e.flat||e.multiple||e.inputField||e.displayArea||e.button))return AJS.log("Calendar.setup:\n  Nothing to setup (no fields found).  Please check your code"),!1;if(e.firstDay&&null!==e.firstDay&&(e.firstDay=+e.firstDay),null!=e.flat){if("string"==typeof e.flat&&(e.flat=document.getElementById(e.flat)),!e.flat)return AJS.log("Calendar.setup:\n  Flat specified but can't find parent."),!1;var p=new Calendar(e.firstDay,e.date,e.todayDate,e.onSelect||a);return p.showsOtherMonths=e.showOthers,p.showsTime=e.showsTime,p.time24="24"==e.timeFormat,p.params=e,p.weekNumbers=e.weekNumbers,p.setRange(e.range[0],e.range[1]),p.setDateStatusHandler(e.dateStatusFunc),p.getDateText=e.dateText,e.ifFormat&&p.setDateFormat(e.ifFormat),e.inputField&&"string"==typeof e.inputField.value&&p.parseDate(e.inputField.value),p.create(e.flat),p.show(),!1}var f=e.button||e.displayArea||e.inputField;return jQuery(f).bind(e.eventName,function(e){e.preventDefault(),n()}),e.inputField&&l(),p};;
;
/* module-key = 'com.atlassian.plugins.atlassian-connect-plugin:jira-date-picker-widget-v5', location = 'v5/js/jira/date-picker/date-picker.js' */
(function(e,b){b("ac/jira/date-picker",["ac/jira/date-picker-utils"],function(b){var d={_options:function(a,c){a.onSelect=function(a,b){connectHost.broadcastEvent("jira_date_selected",{id:c._context.extension_id},{isoDate:a.date.toISOString(),date:b});a.dateClicked&&a.callCloseHandler()}.bind(this);var b=document.getElementById(c._context.extension_id).getBoundingClientRect();a.position=a.position||{top:0,left:0};a.position.top+=b.top;a.position.left+=b.left;return a},openDatePicker:function(a,c){a=
d._options(a,c);b.show(a);return a}};return d})})(AJS.$,define);;
;
/* module-key = 'com.atlassian.plugins.atlassian-connect-plugin:jira-date-picker-widget-v5', location = 'v5/js/jira/date-picker/date-picker-utils.js' */
define("ac/jira/date-picker-utils",["underscore"],function(c){var d=WRM.data.claim("com.atlassian.plugins.atlassian-connect-plugin:jira-date-picker-widget.config");return{show:function(a){var b=window.calendar,e=Calendar._FD?void 0:1;b&&b.hide();a=a||{};a=c.extend(a,d,{singleClick:"true",inputField:{}});window.calendar=b=new Calendar(a.useISO8601WeekNumbers?1:e,a.date,(new Date).toISOString(),a.onSelect||function(){},function(a){a.hide();a.destroy()});b.weekNumbers=!0;b.showsOtherMonths=!1;b.params=
a;b.showsTime=a.showTime;b.time24="24"==a.timeFormat;b.setDateFormat(a.showTime?a.dateTimeFormat:a.dateFormat);b.create();b.refresh();b.showAt(a.position.left||0,a.position.top||0);return b}}});;
;
/* module-key = 'com.atlassian.plugins.atlassian-connect-plugin:jira-events-v5', location = 'v5/js/jira/events/events.js' */
(function(d,c){c("ac/jira/events",function(){return{refreshIssuePage:function(){try{JIRA.trigger(JIRA.Events.REFRESH_ISSUE_PAGE,[JIRA.Issue.getIssueId(),{mergeIntoCurrent:!1}])}catch(a){throw Error("Failed to refresh the issue page");}},updateIssueGlance:function(a,b){try{JIRA.trigger(JIRA.Events.UPDATE_ISSUE_GLANCE,[JIRA.Issue.getIssueId(),{addonKey:b._context.extension.addon_key,moduleKey:b._context.extension.key,data:a}])}catch(e){throw Error("Failed to update issue glance");}}}})})(AJS.$,define);;
;
/* module-key = 'com.atlassian.plugins.atlassian-connect-plugin:jira-create-issue-dialog-v5', location = 'v5/js/jira/issue/issue.js' */
define("ac/jira/issue",function(){return{openCreateIssueDialog:function(e,b){WRM.require(["wr!com.atlassian.jira.jira-quick-edit-plugin:quick-create-issue"]).then(function(){if(!JIRA||!JIRA.Forms||!JIRA.Forms.createCreateIssueForm)return console&&console.warn&&console.warn("Connect: Create issue form is not available"),!1;var a=JIRA.Forms.createCreateIssueForm(e).asDialog({trigger:document.createElement("a"),id:"create-issue-dialog",windowTitle:AJS.I18n.getText("admin.issue.operations.create")});
a.show();var c=[];JIRA.one("QuickCreateIssue.sessionComplete",function(b,a){var d;c=[];for(d in a)c.push(a[d].createdIssueDetails)});a.bind("Dialog.hide",function(){$.isFunction(b)&&b.call({},c)})}.bind(this))}}});;
;
/* module-key = 'com.atlassian.plugins.atlassian-connect-plugin:jira-dashboard-item-v5', location = 'v5/js/jira/dashboard-item/dashboard-item.js' */
define("ac/jira/dashboard-item",[],function(){function c(a,b){a=AJS.$(a).parents(".gadget-inline");if(0<a.length){a=a.first();var c=a.attr("id");new AG.InlineGadgetAPI(a);var d=AG.DashboardManager.getLayout(),e=d.getGadgets().filter(function(a){return"gadget-".concat(a.getId())==c});b&&a.find("iframe").css("height",b);e[0].resize();d.refresh()}}connectHost.onIframeEstablished(function(a){c(a.$el)});AJS.$(document).ready(function(){AJS.$("body").on("resized",".ap-container",function(a,b){c(a.target,
b.height)})});return{setDashboardItemTitle:function(a,b){b=document.getElementById(b._context.extension_id);$(b).parents(".gadget-container").find("h3.dashboard-item-title").text(a)},isDashboardItemEditable:function(a){var b=document.getElementById(a._context.extension_id),b=$(b).parents(".gadget-container").find("li.configure");a(0!==b.length)}}});
define("atlassian-connect/connect-dashboard-item",function(){return function(){return{render:function(){},renderEdit:function(c){c=c.find("iframe");1===c.parent().length&&connectHost.broadcastEvent("jira_dashboard_item_edit",{id:c.attr("id")})}}}});;
;
/* module-key = 'com.atlassian.plugins.atlassian-connect-plugin:jira-navigator-routes-v5', location = 'v5/js/jira/navigator/routes.js' */
(function(f,b){b(["ac/navigator/routes","ac/navigator/utils"],function(b,c){var d=c.hasContext,e=c.appendQueryParam;b.addRoutes({dashboard:"/secure/Dashboard.jspa?selectPageId\x3d{dashboardId}",issue:"/browse/{issueKey}",userprofile:function(a,b){a=d(a,"userAccountId")?e("/secure/admin/user/ViewProfile.jspa","accountId",a.userAccountId):d(a,"username")?e("/secure/admin/user/ViewProfile.jspa","username",a.username):"/secure/admin/user/ViewProfile.jspa?name\x3d";b(a)},projectadminsummary:"/plugins/servlet/project-config/{projectKey}/summary",
projectadmintabpanel:"/plugins/servlet/ac/{addonKey}/{adminPageKey}?project.key\x3d{projectKey}\x26project.id\x3d{projectId}"});c.enableApi()})})(AJS.$,require);;
;
/* module-key = 'com.atlassian.plugins.atlassian-connect-plugin:jira-product-extensions-v5', location = 'v5/js/jira/main.js' */
define("ac/jira",["ac/jira/events","ac/jira/workflow-post-function","ac/jira/dashboard-item","ac/jira/date-picker","ac/jira/issue"],function(a,b,c,d,e){return{refreshIssuePage:a.refreshIssuePage,updateIssueGlance:a.updateIssueGlance,getWorkflowConfiguration:b.getWorkflowConfiguration,_submitWorkflowConfigurationResponse:b._submitWorkflowConfigurationResponse,isDashboardItemEditable:c.isDashboardItemEditable,openCreateIssueDialog:e.openCreateIssueDialog,setDashboardItemTitle:c.setDashboardItemTitle,
openDatePicker:d.openDatePicker}});;
;
/* module-key = 'com.atlassian.plugins.atlassian-connect-plugin:jira-dropdown-list-v5', location = 'v5/js/jira/dropdown-list/dropdown-list-component.js' */
define("ac/jira/dropdown-list/component",["jira/ajs/layer/inline-layer-factory","jira/ajs/list/list","jira/ajs/layer/layer-constants","jira/ajs/list/item-descriptor","jquery"],function(f,g,h,k,d){var e=JIRA.Connect.Suggestions,b=function(a){a=a||{};a.maxInlineResultsDisplayed=a.maxInlineResultsDisplayed||5;a.expandAllResults=a.expandAllResults||!1;this.$container=d(e.container({id:a.id}));this.$target=d(e.target()).appendTo(d("body"));this.listController=new g({containerSelector:this.$container,maxInlineResultsDisplayed:a.maxInlineResultsDisplayed,
expandAllResults:a.expandAllResults,selectionHandler:function(){var a=this.getCurrent();this.onSelected(a);this.hide()}.bind(this)});this.inlineLayer=f.createInlineLayers({alignment:h.LEFT,offsetTarget:this.$target,maxInlineResultsDisplayed:a.maxInlineResultsDisplayed,content:this.$container});this.inlineLayer.onhide(function(){this.hide()}.bind(this));this.visible=!1};b.prototype.showAt=function(a,b,l){var c=arguments[arguments.length-1];this.visible||(c=document.getElementById(c._context.extension_id).getBoundingClientRect(),
a+=c.left,b+=c.top,this.$target.css({left:a+"px",top:b+"px"}),this.listController.enable(),this.inlineLayer.show(),this.inlineLayer.setPosition(),this.inlineLayer.setWidth(l),this.visible=!0)};b.prototype.setItems=function(a,b){b="string"===typeof b||"";this.suggestions=a.map(function(a){return new k({value:a.value,label:a.label,icon:a.iconUrl})});this.listController.generateListFromJSON(this.suggestions,b)};b.prototype.hide=function(){this.visible&&(this.visible=!1,this.listController.disable(),
this.inlineLayer.hide(),this.onHidden())};b.prototype.moveUp=function(){this.listController.moveToPrevious()};b.prototype.moveDown=function(){this.listController.moveToNext()};b.prototype.query=function(a){this.listController.generateListFromJSON(this.suggestions,a)};b.prototype.select=function(){var a=this.listController.getFocused();0!==a.length&&a.is(":visible")&&this.listController._acceptSuggestion(a)};b.prototype.isVisible=function(a){a(this.visible)};b.prototype.getSelected=function(a){a(this.getCurrent())};
b.prototype.getCurrent=function(){var a=this.listController.getFocused();return 0!==a.length&&a.is(":visible")?(a=a.data("descriptor"),{value:a.value(),label:a.label(),iconUrl:a.icon()}):null};b.prototype.onSelected=function(a){connectHost.broadcastEvent("dropdown_list_select",{addon_key:this._context.extension.addon_key,key:this._context.extension.key},{id:this._id,data:a})};b.prototype.onHidden=function(){connectHost.broadcastEvent("dropdown_list_hide",{addon_key:this._context.extension.addon_key,
key:this._context.extension.key},{id:this._id})};return b});;
;
/* module-key = 'com.atlassian.plugins.atlassian-connect-plugin:jira-dropdown-list-v5', location = 'v5/js/jira/dropdown-list/dropdown-list.soy' */
// This file was automatically generated from dropdown-list.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace JIRA.Connect.Suggestions.
 */

if (typeof JIRA == 'undefined') { var JIRA = {}; }
if (typeof JIRA.Connect == 'undefined') { JIRA.Connect = {}; }
if (typeof JIRA.Connect.Suggestions == 'undefined') { JIRA.Connect.Suggestions = {}; }


JIRA.Connect.Suggestions.container = function(opt_data, opt_ignored) {
  return '<div class="aui-list ac-suggestions-container" ' + ((opt_data.id) ? 'id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + '></div>';
};
if (goog.DEBUG) {
  JIRA.Connect.Suggestions.container.soyTemplateName = 'JIRA.Connect.Suggestions.container';
}


JIRA.Connect.Suggestions.target = function(opt_data, opt_ignored) {
  return '<div class="ac-suggestions-target"></div>';
};
if (goog.DEBUG) {
  JIRA.Connect.Suggestions.target.soyTemplateName = 'JIRA.Connect.Suggestions.target';
}
;
;
/* module-key = 'com.atlassian.plugins.atlassian-connect-plugin:jira-dropdown-list-v5', location = 'v5/js/jira/dropdown-list/dropdown-list.js' */
define("ac/dropdown-list",["ac/jira/dropdown-list/component"],function(a){return{create:{constructor:a,showAt:a.prototype.showAt,setItems:a.prototype.setItems,hide:a.prototype.hide,moveUp:a.prototype.moveUp,moveDown:a.prototype.moveDown,query:a.prototype.query,select:a.prototype.select,isVisible:a.prototype.isVisible,getSelected:a.prototype.getSelected,onHide:function(){},onSelect:function(){}}}});;
;
/* module-key = 'com.atlassian.plugins.atlassian-connect-plugin:jira-module-loader-v5', location = 'v5/js/jira/module-loader.js' */
connectHost.defineModule("jira",require("ac/jira"));connectHost.defineModule("dropdownList",require("ac/dropdown-list"));;
;
/* module-key = 'com.atlassian.plugins.atlassian-connect-plugin:jira-spa-inlinedialog-cleanup', location = 'v5/js/iframe/host/spa-inline-dialog-cleanup.js' */
require(["skate"],function(a){a("ap-inline-dialog",{type:function(){var b;(b=a&&a.types&&a.types.CLASS)||(b=a&&a.type&&a.type.CLASSNAME);return b}(),detached:function(a){document.querySelectorAll('iframe[id^\x3d"'+window._AP.util.escapeSelector(a.id)+'"]').forEach(function(a){AJS.$(a).parents(".aui-inline-dialog").remove()})}})});;
;
/* module-key = 'com.atlassian.product.fabric.pf-jira-confluence-integration-plugin:app-switcher-initial-resources', location = 'webpack/init.js' */
!function(e){function t(i){if(n[i])return n[i].exports;var r=n[i]={exports:{},id:i,loaded:!1};return e[i].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}({0:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},s=n(501),o=i(s),a=n(503),u=i(a),c=n(504),d=i(c);AJS.toInit(function(){function e(e,t){AJS.EventQueue.push({name:e,properties:r({},t)})}function t(t){if(c(t)){t.preventDefault(),h("#appswitcher-button").unbind("click").unbind("keydown"),h("body").addClass("loading-cursor"),e("appswitcher.trigger.click");var o=WRM.require("wr!com.atlassian.product.fabric.pf-jira-confluence-integration-plugin:app-switcher-resources"),d=h.ajax({url:p+"/rest/menu/latest/appswitcher",dataType:"json"}),f=v?h.Deferred().reject():h.ajax({url:n()+"/api/client/recent/containers?cloudId="+g,xhrFields:{withCredentials:!0}});i([o,d,f]).then(function(t,n,i){if(h("body").removeClass("loading-cursor"),e("appswitcher.dropdown.show"),!t.success)return void e("appswitcher.dropdown.display.error",{reason:"WRM.require() failed"});n.success||e("appswitcher.dropdown.display.error");var o=s(n.response),c={recentContainers:i.success?i.response.data:[],linkedApplications:{configureLink:!!y.isUserAdmin&&m,apps:n.success?n.response.map(function(e){return{name:e.label,url:e.link,product:e.applicationType}}):[],error:!n.success},suggestedApplication:0===o.length?{show:!1}:r({show:y.isAppSuggestionAvailable,onDontShowAgainClick:function(){return a("key-no-thanks","true")}},o[0]),isAnonymousUser:v,i18n:u.default,analytics:e};requirejs("fabric/app-switcher").initAppSwitcher(c)})}}function n(){var e=window.location.hostname;return e.indexOf("jira-dev.com")>-1?"https://activity.staging.atlassian.io":"https://activity.atlassian.io"}function i(e){return h.when.apply(h,h.map(e,function(e){var t=h.Deferred();return e.done(function(e){t.resolve({success:!0,response:e})}).fail(function(e){t.resolve({success:!1,response:e})}),t.promise()}))}function s(e){var t=[{application:"jira",url:y.isUserAdmin?"/admin/billing/addapplication":"https://www.atlassian.com/software/jira"},{application:"confluence",url:y.isUserAdmin?"/admin/billing/addapplication?product=confluence.ondemand":"https://www.atlassian.com/software/confluence"}],n=new Set;return e.map(function(e){return e.applicationType.toLowerCase()}).forEach(function(e){return n.add(e)}),t.filter(function(e){return!n.has(e.application)})}function a(e,t){h.ajax({url:p+"/rest/menu/latest/userdata/",type:"PUT",contentType:"application/json",data:JSON.stringify({key:e,value:t})})}function c(e){return"click"===e.type||"keydown"===e.type&&(40===e.which||32===e.which||13===e.which)}(0,d.default)();var p=AJS.contextPath(),f=p.indexOf("/wiki")===-1,l=requirejs(f?"jira/util/data/meta":"confluence/meta"),h=requirejs("jquery"),g=WRM.data.claim("com.atlassian.product.fabric.pf-jira-confluence-integration-plugin:app-switcher-initial-resources.cloud-id"),v=WRM.data.claim("com.atlassian.product.fabric.pf-jira-confluence-integration-plugin:app-switcher-initial-resources.is-anonymous"),y=h("#app-switcher").data("environment"),m=p+"/plugins/servlet/customize-application-navigator";l.getBoolean("show-new-app-switcher")&&(h(".app-switcher-trigger").filter(":visible").length&&(h(".app-switcher-trigger, #app-switcher").remove(),h(".aui-header-before").append('\n            <span id="appswitcher-container">\n                <a id="appswitcher-button" tabindex="0">\n                    <span class="aui-icon aui-icon-small aui-iconfont-appswitcher"></span>\n                </a>\n            </span>'),h("#appswitcher-button").click(t).keydown(t)),h(window).load(o.default))})},501:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){var e={analyticsscheme:"https",analyticsserver:"analytics.atlassian.com",server:window.location.hostname,product:"home",queue:[],storage_key:"atlassian.home.analytics",save_interval:5e3,publish_interval:1e4},t=(0,s.default)(e);t.start()};var r=n(502),s=i(r)},502:function(e,t,n){!function(){var t,n;t=function(){var e={},t={};return e.getLocalStorage=function(){return window.localStorage},e.getSessionStorage=function(){return window.sessionStorage},e.getInternalStorage=function(){return t.getItem=function(e){return t[e]},t.setItem=function(e,n){t[e]=n},t.clear=function(){t={}},t},e.getStorage=function(){var t;try{var n=e.getLocalStorage();t="undefined"!=typeof n?n:e.getSessionStorage()}catch(e){}return"undefined"==typeof t&&(t=e.getInternalStorage()),t},e.isCORSRequest=function(e){var t=document.createElement("a");return t.href=e,t.host!==window.location.host},e.useXDomainRequest=function(t){return e.isCORSRequest(t)&&!!window.XDomainRequest&&(navigator.appVersion.indexOf("MSIE 8.")!==-1||navigator.appVersion.indexOf("MSIE 9.")!==-1)},e.getCookieValue=function(e){for(var t=e+"=",n=document.cookie.split(";"),i=0;i<n.length;i++){for(var r=n[i];" "===r.charAt(0);)r=r.substring(1,r.length);if(0===r.indexOf(t))return r.substring(t.length,r.length)}return null},e}(),n=function(e){function t(e){return i&&i.is_started?(i.stop(),i.config=i.parseConfig(e)):(i=new n(e),window["herment-gas-client"]=i),i}function n(t){return this.STORAGE_KEY_PREAMBLE="herment",this.MAXEVENTS=100,this.PUBLISH_INTERVAL=5e3,this.SAVE_INTERVAL=1e3,this.config=this.parseConfig(t),this.storage=e.getStorage(),this.is_started=!1,"undefined"!=typeof window.addEventListener?window.addEventListener("unload",function(){this.moveQueueToStorage()}.bind(this)):window.attachEvent("onunload",function(){this.moveQueueToStorage()}.bind(this)),this}var i=window["herment-gas-client"];return n.prototype={getAtlPath:function(){return e.getCookieValue("__atl_path")},getServerName:function(){var e;return"undefined"!=typeof document.location&&"undefined"!=typeof document.location.hostname&&(e=document.location.hostname),""===e&&(e="-"),e},getProductNameFromServerName:function(e){return"undefined"!=typeof e?e.replace(".com","").replace(".net","").replace(".org","").replace(".au","").replace(".io",""):"-"},getSubdomain:function(e){var t="-",n=e.match(/^([a-z0-9\.]*)[\-\.]{1}([a-z0-9]+)+\.([a-z]{2,6})$/i);if(n){var i=e.split(".");i=2===i[i.length-1].length?i.slice(0,i.length-3):i.slice(0,i.length-2),0!==i.length&&(t=i.join("."))}return t},generateRandomStorageKey:function(){var e=2,t=12,n=(Math.random()+"").slice(e,t),i=(Math.random()+"").slice(e,t);return n.concat(i)},ajaxPost:function(t,n){var i;if(e.useXDomainRequest(t))i=new window.XDomainRequest;else if(window.XMLHttpRequest)i=new XMLHttpRequest;else{if(!window.ActiveXObject)return;i=new window.ActiveXObject("Microsoft.XMLHTTP")}i.open("POST",t,!0),"undefined"!=typeof i.setRequestHeader&&(i.setRequestHeader("Content-Type","application/json"),i.setRequestHeader("Accept","application/json, text/javascript, */*;")),i.send(n)},parseConfig:function(e){var t,n,i,r,s,o,a,u,c,d,p,f,l,h,g,v,y,m,w,S,b;if("undefined"==typeof e||"undefined"==typeof e.queue){var _=window.AJS=window.AJS||{};_.EventQueue=_.EventQueue||[],t=_.EventQueue}else t=e.queue;return n="undefined"==typeof e||"undefined"==typeof e.analyticsscheme?"https":e.analyticsscheme,i="undefined"==typeof e||"undefined"==typeof e.analyticsserver?"mgas.prod.public.atl-paas.net":e.analyticsserver,r="undefined"==typeof e||"undefined"==typeof e.analyticsurl?"/v1/events":e.analyticsurl,s="undefined"==typeof e||"undefined"==typeof e.server?this.getServerName():e.server,o="undefined"==typeof e||"undefined"==typeof e.product?this.getProductNameFromServerName(s):e.product,"undefined"==typeof e||"undefined"==typeof e.subproduct?(a=this.getSubdomain(s),"undefined"==typeof a&&(a="-")):a=e.subproduct,u="undefined"==typeof e||"undefined"==typeof e.version?null:e.version,c="undefined"==typeof e||"undefined"==typeof e.session?null:e.session,d="undefined"==typeof e||"undefined"==typeof e.sen?null:e.sen,p="undefined"==typeof e||"undefined"==typeof e.sourceip?null:e.sourceip,f="undefined"==typeof e||"undefined"==typeof e.atlpath?this.getAtlPath():e.atlpath,l="undefined"==typeof e||"undefined"==typeof e.ajax?this.ajaxPost:e.ajax,h="undefined"==typeof e||"undefined"==typeof e.maxevents?this.MAXEVENTS:e.maxevents,g="undefined"==typeof e||"undefined"==typeof e.storage_key?this.STORAGE_KEY_PREAMBLE+this.generateRandomStorageKey()+this.generateRandomStorageKey():e.storage_key,v="undefined"==typeof e||"undefined"==typeof e.user?"default":e.user,y="undefined"==typeof e||"undefined"==typeof e.publish_interval?this.PUBLISH_INTERVAL:e.publish_interval,m="undefined"==typeof e||"undefined"==typeof e.save_interval?this.SAVE_INTERVAL:e.save_interval,w="undefined"==typeof e||"undefined"==typeof e.cloud_id?null:e.cloud_id,S="undefined"==typeof e||"undefined"==typeof e.user_id?null:e.user_id,b="undefined"==typeof e||"undefined"==typeof e.user_id_type?null:e.user_id_type,{cloud_id:w,queue:t,gasScheme:n,gasServer:i,gasUrl:r,serverName:s,productName:o,subProductName:a,version:u,session:c,sen:d,sourceIP:p,atlPath:f,post:l,maxevents:h,storageKey:g,user:v,user_id:S,user_id_type:b,publishInterval:y,saveInterval:m}},pushToServer:function(e,t){var n="undefined"!=typeof t?t:this.config.post,i=this.config.gasScheme+"://"+this.config.gasServer+this.config.gasUrl,r={events:e},s=JSON.stringify(r);n(i,s)},addEventsToArray:function(e,t,n){if("undefined"!=typeof n&&"undefined"!=typeof n.server&&"undefined"!=typeof n.product&&"undefined"!=typeof n.subproduct&&"undefined"!=typeof n.user)for(var i in e)if(e.hasOwnProperty(i)){var r=e[i];if(t.length>=this.config.maxevents)break;if(r.name&&r.properties){var s={cloud_id:n.cloud_id,name:r.name,properties:r.properties,serverTime:r.time||(new Date).getTime(),server:n.server,user:r.user||n.user,user_id:n.user_id,user_id_type:n.user_id_type,product:n.product,subproduct:n.subproduct,version:n.version,session:n.session,sen:n.sen,sourceIP:n.sourceIP,atlPath:n.atlPath};t.push(s)}}},publishFromQueueAndStorage:function(e){try{var t="undefined"!=typeof e?e:this.pushToServer.bind(this),n=[];if(this.config.queue.length<1&&("undefined"==typeof this.storage||this.storage.length<1))return;var i={cloud_id:this.config.cloud_id,server:this.config.serverName,user:this.config.user,user_id:this.config.user_id,user_id_type:this.config.user_id_type,product:this.config.productName,subproduct:this.config.subProductName,version:this.config.version,session:this.config.session,sen:this.config.sen,sourceIP:this.config.sourceIP,atlPath:this.config.atlPath};this.addEventsToArray(this.config.queue,n,i);var r=this.popEventsFromStorage();this.addEventsToArray(r,n,i),this.config.queue.length=0,n&&n.length&&t(n)}catch(e){}},serialiseEventsToString:function(e){return JSON.stringify(e)},deserialiseEvents:function(e){return JSON.parse(e)},storeEvents:function(e){if("undefined"!=typeof this.storage)try{if(this.storage[this.config.storageKey]){var t=this.deserialiseEvents(this.storage[this.config.storageKey])||[];t.length<this.config.maxevents&&t.push.apply(t,e),e=t}this.storage.setItem(this.config.storageKey,this.serialiseEventsToString(e))}catch(e){}},popEventsFromStorage:function(){if("undefined"==typeof this.storage)return[];try{if(this.storage[this.config.storageKey]){var e=this.deserialiseEvents(this.storage[this.config.storageKey]);return this.storage[this.config.storageKey]=this.serialiseEventsToString([]),e}}catch(e){}return[]},moveQueueToStorage:function(){0!==this.config.queue.length&&"undefined"!=typeof this.storage&&(this.storeEvents(this.config.queue),this.config.queue.length=0)},start:function(){this.is_started=!0;var e=Array.prototype.push;this.config.queue.push=function(t){t.time=(new Date).getTime(),e.call(this.config.queue,t)}.bind(this),this.initialSaveTimeout=setTimeout(this.publishFromQueueAndStorage.bind(this),this.config.saveInterval),this.saveInterval=setInterval(this.moveQueueToStorage.bind(this),this.config.saveInterval),this.startPublisher()},stop:function(){this.is_started=!1,this.publishFromQueueAndStorage(),clearTimeout(this.initialSaveTimeout),clearInterval(this.saveInterval),this.stopPublisher()},stopPublisher:function(){clearInterval(this.publishInterval)},startPublisher:function(){this.publishInterval=setInterval(this.publishFromQueueAndStorage.bind(this),this.config.publishInterval)},destroy:function(){this.stop(),window["herment-gas-client"]=t}},t}(t),window["herment-gas-client"]=n,e.exports=n}()},503:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={home:"\u0414\u043e\u043c\u0430\u0448\u043d\u044f\u044f \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0430",apps:"\u041f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u044f",configure:"\u041d\u0430\u0441\u0442\u0440\u043e\u0438\u0442\u044c",recent:"\u041d\u0435\u0434\u0430\u0432\u043d\u0435\u0435","try.other.apps":"\u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0434\u0440\u0443\u0433\u0438\u0435 \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u044f Atlassian","don't.show.this.again":"\u041d\u0435 \u043f\u043e\u043a\u0430\u0437\u044b\u0432\u0430\u0442\u044c \u044d\u0442\u043e \u0441\u043d\u043e\u0432\u0430","container.confluence-space":"\u041f\u0440\u043e\u0441\u0442\u0440\u0430\u043d\u0441\u0442\u0432\u043e","container.jira-project":"\u041f\u0440\u043e\u0435\u043a\u0442","suggested.application.description.confluence":"\u0412\u0437\u0430\u0438\u043c\u043e\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u0438 \u043e\u0431\u043c\u0435\u043d \u0441\u043e\u0434\u0435\u0440\u0436\u0438\u043c\u044b\u043c","suggested.application.description.jira":"Issue & project tracking software","applinks.error":"\u041d\u0435\u0432\u043e\u0437\u043c\u043e\u0436\u043d\u043e \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c \u0441\u0432\u044f\u0437\u0430\u043d\u043d\u044b\u0435 \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u044f"}},504:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){"function"!=typeof Object.assign&&(Object.assign=function(e,t){if(null==e)throw new TypeError("Cannot convert undefined or null to object");for(var n=Object(e),i=1;i<arguments.length;i++){var r=arguments[i];if(null!=r)for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&(n[s]=r[s])}return n})}}});;
;
/* module-key = 'com.atlassian.plugin.jslibs:moment-2.6.0', location = 'libs/moment/2.6.0/moment-2.6.0.js' */
(function(A){define("atlassian/libs/moment-2.6.0",function(){var z={};A.call(z);return z.moment})})(function(){for(var A=function(){return{empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1}},z=function(a,b){var c=!0;return l(function(){c&&(!1===e.suppressDeprecationWarnings&&("undefined"!==typeof console&&console.warn)&&console.warn("Deprecation warning: "+a),c=!1);return b.apply(this,arguments)},b)},X=function(a,
b){return function(c){return j(a.call(this,c),b)}},ua=function(a,b){return function(c){return this.lang().ordinal(a.call(this,c),b)}},Y=function(){},F=function(a){Z(a);l(this,a)},G=function(a){var a=$(a),b=a.year||0,c=a.quarter||0,d=a.month||0,g=a.week||0,e=a.day||0;this._milliseconds=+(a.millisecond||0)+1E3*(a.second||0)+6E4*(a.minute||0)+36E5*(a.hour||0);this._days=+e+7*g;this._months=+d+3*c+12*b;this._data={};this._bubble()},l=function(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c]);b.hasOwnProperty("toString")&&
(a.toString=b.toString);b.hasOwnProperty("valueOf")&&(a.valueOf=b.valueOf);return a},v=function(a){return 0>a?Math.ceil(a):Math.floor(a)},j=function(a,b,c){for(var d=""+Math.abs(a);d.length<b;)d="0"+d;return(0<=a?c?"+":"":"-")+d},I=function(a,b,c,d){var g=b._milliseconds,f=b._days,b=b._months,d=null==d?!0:d;g&&a._d.setTime(+a._d+g*c);f&&aa(a,"Date",H(a,"Date")+f*c);b&&ba(a,H(a,"Month")+b*c);d&&e.updateOffset(a,f||b)},J=function(a){return"[object Array]"===Object.prototype.toString.call(a)},ca=function(a,
b,c){var d=Math.min(a.length,b.length),g=Math.abs(a.length-b.length),e=0,h;for(h=0;h<d;h++)(c&&a[h]!==b[h]||!c&&i(a[h])!==i(b[h]))&&e++;return e+g},r=function(a){if(a)var b=a.toLowerCase().replace(/(.)s$/,"$1"),a=va[a]||wa[b]||b;return a},$=function(a){var b={},c,d;for(d in a)a.hasOwnProperty(d)&&(c=r(d))&&(b[c]=a[d]);return b},xa=function(a){var b,c;if(0===a.indexOf("week"))b=7,c="day";else if(0===a.indexOf("month"))b=12,c="month";else return;e[a]=function(d,g){var f,h,i=e.fn._lang[a],j=[];"number"===
typeof d&&(g=d,d=void 0);h=function(a){a=e().utc().set(c,a);return i.call(e.fn._lang,a,d||"")};if(null!=g)return h(g);for(f=0;f<b;f++)j.push(h(f));return j}},i=function(a){var a=+a,b=0;0!==a&&isFinite(a)&&(b=0<=a?Math.floor(a):Math.ceil(a));return b},K=function(a,b){return(new Date(Date.UTC(a,b+1,0))).getUTCDate()},da=function(a,b,c){return B(e([a,11,31+b-c]),b,c).week},L=function(a){return 0===a%4&&0!==a%100||0===a%400},Z=function(a){var b;if(a._a&&-2===a._pf.overflow){b=0>a._a[s]||11<a._a[s]?s:
1>a._a[o]||a._a[o]>K(a._a[p],a._a[s])?o:0>a._a[m]||23<a._a[m]?m:0>a._a[w]||59<a._a[w]?w:0>a._a[C]||59<a._a[C]?C:0>a._a[D]||999<a._a[D]?D:-1;if(a._pf._overflowDayOfYear&&(b<p||b>o))b=o;a._pf.overflow=b}},ea=function(a){null==a._isValid&&(a._isValid=!isNaN(a._d.getTime())&&0>a._pf.overflow&&!a._pf.empty&&!a._pf.invalidMonth&&!a._pf.nullInput&&!a._pf.invalidFormat&&!a._pf.userInvalidated,a._strict&&(a._isValid=a._isValid&&0===a._pf.charsLeftOver&&0===a._pf.unusedTokens.length));return a._isValid},M=
function(a){return a?a.toLowerCase().replace("_","-"):a},N=function(a,b){return b._isUTC?e(a).zone(b._offset||0):e(a).local()},q=function(a){var b=0,c,d,g,f,h=function(a){if(!x[a]&&ya)try{require("./lang/"+a)}catch(b){}return x[a]};if(!a)return e.fn._lang;if(!J(a)){if(d=h(a))return d;a=[a]}for(;b<a.length;){f=M(a[b]).split("-");c=f.length;for(g=(g=M(a[b+1]))?g.split("-"):null;0<c;){if(d=h(f.slice(0,c).join("-")))return d;if(g&&g.length>=c&&ca(f,g,!0)>=c-1)break;c--}b++}return e.fn._lang},P=function(a,
b){if(!a.isValid())return a.lang().invalidDate();b=fa(b,a.lang());if(!O[b]){var c=O,d=b,g=b,e=g.match(ga),h,i;h=0;for(i=e.length;h<i;h++)e[h]=t[e[h]]?t[e[h]]:e[h].match(/\[[\s\S]/)?e[h].replace(/^\[|\]$/g,""):e[h].replace(/\\/g,"");c[d]=function(a){var b="";for(h=0;h<i;h++)b+=e[h]instanceof Function?e[h].call(a,g):e[h];return b}}return O[b](a)},fa=function(a,b){function c(a){return b.longDateFormat(a)||a}var d=5;for(E.lastIndex=0;0<=d&&E.test(a);)a=a.replace(E,c),E.lastIndex=0,d-=1;return a},Ka=function(a,
b){var c=b._strict;switch(a){case "Q":return ha;case "DDDD":return ia;case "YYYY":case "GGGG":case "gggg":return c?za:Aa;case "Y":case "G":case "g":return Ba;case "YYYYYY":case "YYYYY":case "GGGGG":case "ggggg":return c?Ca:Da;case "S":if(c)return ha;case "SS":if(c)return ja;case "SSS":if(c)return ia;case "DDD":return Ea;case "MMM":case "MMMM":case "dd":case "ddd":case "dddd":return Fa;case "a":case "A":return q(b._l)._meridiemParse;case "X":return Ga;case "Z":case "ZZ":return Q;case "T":return Ha;
case "SSSS":return Ia;case "MM":case "DD":case "YY":case "GG":case "gg":case "HH":case "hh":case "mm":case "ss":case "ww":case "WW":return c?ja:ka;case "M":case "D":case "d":case "H":case "h":case "m":case "s":case "w":case "W":case "e":case "E":return ka;case "Do":return Ja;default:var c=RegExp,d;d=a.replace("\\","").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(a,b,c,d,e){return b||c||d||e}).replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&");return c(d)}},la=function(a){var a=(a||"").match(Q)||[],
a=((a[a.length-1]||[])+"").match(La)||["-",0,0],b=+(60*a[1])+i(a[2]);return"+"===a[0]?-b:b},S=function(a){var b,c=[],d,g,f,h,j;if(!a._d){d=new Date;d=a._useUTC?[d.getUTCFullYear(),d.getUTCMonth(),d.getUTCDate()]:[d.getFullYear(),d.getMonth(),d.getDate()];a._w&&(null==a._a[o]&&null==a._a[s])&&(b=function(b){var c=parseInt(b,10);return b?3>b.length?68<c?1900+c:2E3+c:c:null==a._a[p]?e().weekYear():a._a[p]},g=a._w,null!=g.GG||null!=g.W||null!=g.E?b=ma(b(g.GG),g.W||1,g.E,4,1):(f=q(a._l),h=null!=g.d?na(g.d,
f):null!=g.e?parseInt(g.e,10)+f._week.dow:0,j=parseInt(g.w,10)||1,null!=g.d&&h<f._week.dow&&j++,b=ma(b(g.gg),j,h,f._week.doy,f._week.dow)),a._a[p]=b.year,a._dayOfYear=b.dayOfYear);if(a._dayOfYear){b=null==a._a[p]?d[p]:a._a[p];if(a._dayOfYear>(L(b)?366:365))a._pf._overflowDayOfYear=!0;b=R(b,0,a._dayOfYear);a._a[s]=b.getUTCMonth();a._a[o]=b.getUTCDate()}for(b=0;3>b&&null==a._a[b];++b)a._a[b]=c[b]=d[b];for(;7>b;b++)a._a[b]=c[b]=null==a._a[b]?2===b?1:0:a._a[b];c[m]+=i((a._tzm||0)/60);c[w]+=i((a._tzm||
0)%60);a._d=(a._useUTC?R:Ma).apply(null,c)}},T=function(a){a._a=[];a._pf.empty=!0;var b=q(a._l),c=""+a._i,d,g,f,h,j=c.length,k=0;g=fa(a._f,b).match(ga)||[];for(b=0;b<g.length;b++){f=g[b];if(d=(c.match(Ka(f,a))||[])[0])h=c.substr(0,c.indexOf(d)),0<h.length&&a._pf.unusedInput.push(h),c=c.slice(c.indexOf(d)+d.length),k+=d.length;if(t[f]){d?a._pf.empty=!1:a._pf.unusedTokens.push(f);h=a;var l=void 0,n=h._a;switch(f){case "Q":null!=d&&(n[s]=3*(i(d)-1));break;case "M":case "MM":null!=d&&(n[s]=i(d)-1);break;
case "MMM":case "MMMM":l=q(h._l).monthsParse(d);null!=l?n[s]=l:h._pf.invalidMonth=d;break;case "D":case "DD":null!=d&&(n[o]=i(d));break;case "Do":null!=d&&(n[o]=i(parseInt(d,10)));break;case "DDD":case "DDDD":null!=d&&(h._dayOfYear=i(d));break;case "YY":n[p]=e.parseTwoDigitYear(d);break;case "YYYY":case "YYYYY":case "YYYYYY":n[p]=i(d);break;case "a":case "A":h._isPm=q(h._l).isPM(d);break;case "H":case "HH":case "h":case "hh":n[m]=i(d);break;case "m":case "mm":n[w]=i(d);break;case "s":case "ss":n[C]=
i(d);break;case "S":case "SS":case "SSS":case "SSSS":n[D]=i(1E3*("0."+d));break;case "X":h._d=new Date(1E3*parseFloat(d));break;case "Z":case "ZZ":h._useUTC=!0;h._tzm=la(d);break;case "w":case "ww":case "W":case "WW":case "d":case "dd":case "ddd":case "dddd":case "e":case "E":f=f.substr(0,1);case "gg":case "gggg":case "GG":case "GGGG":case "GGGGG":f=f.substr(0,2),d&&(h._w=h._w||{},h._w[f]=d)}}else a._strict&&!d&&a._pf.unusedTokens.push(f)}a._pf.charsLeftOver=j-k;0<c.length&&a._pf.unusedInput.push(c);
a._isPm&&12>a._a[m]&&(a._a[m]+=12);!1===a._isPm&&12===a._a[m]&&(a._a[m]=0);S(a);Z(a)},Ma=function(a,b,c,d,e,f,h){b=new Date(a,b,c,d,e,f,h);1970>a&&b.setFullYear(a);return b},R=function(a){var b=new Date(Date.UTC.apply(null,arguments));1970>a&&b.setUTCFullYear(a);return b},na=function(a,b){if("string"===typeof a)if(isNaN(a)){if(a=b.weekdaysParse(a),"number"!==typeof a)return null}else a=parseInt(a,10);return a},Na=function(a,b,c,d,e){return e.relativeTime(b||1,!!c,a,d)},B=function(a,b,c){b=c-b;c-=
a.day();c>b&&(c-=7);c<b-7&&(c+=7);a=e(a).add("d",c);return{week:Math.ceil(a.dayOfYear()/7),year:a.year()}},ma=function(a,b,c,d,e){var f=R(a,0,1).getUTCDay(),b=7*(b-1)+((null!=c?c:e)-e)+(e-f+(f>d?7:0)-(f<e?7:0))+1;return{year:0<b?a:a-1,dayOfYear:0<b?b:(L(a-1)?366:365)+b}},pa=function(a){var b=a._i,c=a._f;if(null===b||void 0===c&&""===b)return e.invalid({nullInput:!0});"string"===typeof b&&(a._i=b=q().preparse(b));if(e.isMoment(b)){var a=b,d={},g;for(g in a)a.hasOwnProperty(g)&&oa.hasOwnProperty(g)&&
(d[g]=a[g]);a=d;a._d=new Date(+b._d)}else if(c)if(J(c)){var b=a,f,h;if(0===b._f.length)b._pf.invalidFormat=!0,b._d=new Date(NaN);else{for(g=0;g<b._f.length;g++)if(c=0,d=l({},b),d._pf=A(),d._f=b._f[g],T(d),ea(d)&&(c+=d._pf.charsLeftOver,c+=10*d._pf.unusedTokens.length,d._pf.score=c,null==h||c<h))h=c,f=d;l(b,f||d)}}else T(a);else if(d=a,f=d._i,h=Oa.exec(f),void 0===f)d._d=new Date;else if(h)d._d=new Date(+h[1]);else if("string"===typeof f)if(b=d._i,g=Pa.exec(b)){d._pf.iso=!0;f=0;for(h=U.length;f<h;f++)if(U[f][1].exec(b)){d._f=
U[f][0]+(g[6]||" ");break}f=0;for(h=V.length;f<h;f++)if(V[f][1].exec(b)){d._f+=V[f][0];break}b.match(Q)&&(d._f+="Z");T(d)}else e.createFromInputFallback(d);else J(f)?(d._a=f.slice(0),S(d)):"[object Date]"===Object.prototype.toString.call(f)||f instanceof Date?d._d=new Date(+f):"object"===typeof f?d._d||(f=$(d._i),d._a=[f.year,f.month,f.day,f.hour,f.minute,f.second,f.millisecond],S(d)):"number"===typeof f?d._d=new Date(f):e.createFromInputFallback(d);return new F(a)},ba=function(a,b){var c;if("string"===
typeof b&&(b=a.lang().monthsParse(b),"number"!==typeof b))return a;c=Math.min(a.date(),K(a.year(),b));a._d["set"+(a._isUTC?"UTC":"")+"Month"](b,c);return a},H=function(a,b){return a._d["get"+(a._isUTC?"UTC":"")+b]()},aa=function(a,b,c){return"Month"===b?ba(a,c):a._d["set"+(a._isUTC?"UTC":"")+b](c)},u=function(a,b){return function(c){return null!=c?(aa(this,a,c),e.updateOffset(this,b),this):H(this,a)}},Qa=function(a){e.duration.fn[a]=function(){return this._data[a]}},qa=function(a,b){e.duration.fn["as"+
a]=function(){return+this/b}},e,Ra="undefined"!==typeof global?global:this,y=Math.round,k,p=0,s=1,o=2,m=3,w=4,C=5,D=6,x={},oa={_isAMomentObject:null,_i:null,_f:null,_l:null,_strict:null,_isUTC:null,_offset:null,_pf:null,_lang:null},ya="undefined"!==typeof module&&module.exports,Oa=/^\/?Date\((\-?\d+)/i,Sa=/(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,Ta=/^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/,ga=/(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|X|zz?|ZZ?|.)/g,
E=/(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g,ka=/\d\d?/,Ea=/\d{1,3}/,Aa=/\d{1,4}/,Da=/[+\-]?\d{1,6}/,Ia=/\d+/,Fa=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,Q=/Z|[\+\-]\d\d:?\d\d/gi,Ha=/T/i,Ga=/[\+\-]?\d+(\.\d{1,3})?/,Ja=/\d{1,2}/,ha=/\d/,ja=/\d\d/,ia=/\d{3}/,za=/\d{4}/,Ca=/[+-]?\d{6}/,Ba=/[+-]?\d+/,Pa=/^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
U=[["YYYYYY-MM-DD",/[+-]\d{6}-\d{2}-\d{2}/],["YYYY-MM-DD",/\d{4}-\d{2}-\d{2}/],["GGGG-[W]WW-E",/\d{4}-W\d{2}-\d/],["GGGG-[W]WW",/\d{4}-W\d{2}/],["YYYY-DDD",/\d{4}-\d{3}/]],V=[["HH:mm:ss.SSSS",/(T| )\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss",/(T| )\d\d:\d\d:\d\d/],["HH:mm",/(T| )\d\d:\d\d/],["HH",/(T| )\d\d/]],La=/([\+\-]|\d\d)/gi,W={Milliseconds:1,Seconds:1E3,Minutes:6E4,Hours:36E5,Days:864E5,Months:2592E6,Years:31536E6},va={ms:"millisecond",s:"second",m:"minute",h:"hour",d:"day",D:"date",w:"week",W:"isoWeek",
M:"month",Q:"quarter",y:"year",DDD:"dayOfYear",e:"weekday",E:"isoWeekday",gg:"weekYear",GG:"isoWeekYear"},wa={dayofyear:"dayOfYear",isoweekday:"isoWeekday",isoweek:"isoWeek",weekyear:"weekYear",isoweekyear:"isoWeekYear"},O={},ra="DDD w W M D d".split(" "),sa="MDHhmswW".split(""),t={M:function(){return this.month()+1},MMM:function(a){return this.lang().monthsShort(this,a)},MMMM:function(a){return this.lang().months(this,a)},D:function(){return this.date()},DDD:function(){return this.dayOfYear()},d:function(){return this.day()},
dd:function(a){return this.lang().weekdaysMin(this,a)},ddd:function(a){return this.lang().weekdaysShort(this,a)},dddd:function(a){return this.lang().weekdays(this,a)},w:function(){return this.week()},W:function(){return this.isoWeek()},YY:function(){return j(this.year()%100,2)},YYYY:function(){return j(this.year(),4)},YYYYY:function(){return j(this.year(),5)},YYYYYY:function(){var a=this.year();return(0<=a?"+":"-")+j(Math.abs(a),6)},gg:function(){return j(this.weekYear()%100,2)},gggg:function(){return j(this.weekYear(),
4)},ggggg:function(){return j(this.weekYear(),5)},GG:function(){return j(this.isoWeekYear()%100,2)},GGGG:function(){return j(this.isoWeekYear(),4)},GGGGG:function(){return j(this.isoWeekYear(),5)},e:function(){return this.weekday()},E:function(){return this.isoWeekday()},a:function(){return this.lang().meridiem(this.hours(),this.minutes(),!0)},A:function(){return this.lang().meridiem(this.hours(),this.minutes(),!1)},H:function(){return this.hours()},h:function(){return this.hours()%12||12},m:function(){return this.minutes()},
s:function(){return this.seconds()},S:function(){return i(this.milliseconds()/100)},SS:function(){return j(i(this.milliseconds()/10),2)},SSS:function(){return j(this.milliseconds(),3)},SSSS:function(){return j(this.milliseconds(),3)},Z:function(){var a=-this.zone(),b="+";0>a&&(a=-a,b="-");return b+j(i(a/60),2)+":"+j(i(a)%60,2)},ZZ:function(){var a=-this.zone(),b="+";0>a&&(a=-a,b="-");return b+j(i(a/60),2)+j(i(a)%60,2)},z:function(){return this.zoneAbbr()},zz:function(){return this.zoneName()},X:function(){return this.unix()},
Q:function(){return this.quarter()}},ta=["months","monthsShort","weekdays","weekdaysShort","weekdaysMin"];ra.length;)k=ra.pop(),t[k+"o"]=ua(t[k],k);for(;sa.length;)k=sa.pop(),t[k+k]=X(t[k],2);t.DDDD=X(t.DDD,3);l(Y.prototype,{set:function(a){var b,c;for(c in a)b=a[c],"function"===typeof b?this[c]=b:this["_"+c]=b},_months:"January February March April May June July August September October November December".split(" "),months:function(a){return this._months[a.month()]},_monthsShort:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
monthsShort:function(a){return this._monthsShort[a.month()]},monthsParse:function(a){var b,c;this._monthsParse||(this._monthsParse=[]);for(b=0;12>b;b++)if(this._monthsParse[b]||(c=e.utc([2E3,b]),c="^"+this.months(c,"")+"|^"+this.monthsShort(c,""),this._monthsParse[b]=RegExp(c.replace(".",""),"i")),this._monthsParse[b].test(a))return b},_weekdays:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),weekdays:function(a){return this._weekdays[a.day()]},_weekdaysShort:"Sun Mon Tue Wed Thu Fri Sat".split(" "),
weekdaysShort:function(a){return this._weekdaysShort[a.day()]},_weekdaysMin:"Su Mo Tu We Th Fr Sa".split(" "),weekdaysMin:function(a){return this._weekdaysMin[a.day()]},weekdaysParse:function(a){var b,c;this._weekdaysParse||(this._weekdaysParse=[]);for(b=0;7>b;b++)if(this._weekdaysParse[b]||(c=e([2E3,1]).day(b),c="^"+this.weekdays(c,"")+"|^"+this.weekdaysShort(c,"")+"|^"+this.weekdaysMin(c,""),this._weekdaysParse[b]=RegExp(c.replace(".",""),"i")),this._weekdaysParse[b].test(a))return b},_longDateFormat:{LT:"h:mm A",
L:"MM/DD/YYYY",LL:"MMMM D YYYY",LLL:"MMMM D YYYY LT",LLLL:"dddd, MMMM D YYYY LT"},longDateFormat:function(a){var b=this._longDateFormat[a];!b&&this._longDateFormat[a.toUpperCase()]&&(b=this._longDateFormat[a.toUpperCase()].replace(/MMMM|MM|DD|dddd/g,function(a){return a.slice(1)}),this._longDateFormat[a]=b);return b},isPM:function(a){return"p"===(a+"").toLowerCase().charAt(0)},_meridiemParse:/[ap]\.?m?\.?/i,meridiem:function(a,b,c){return 11<a?c?"pm":"PM":c?"am":"AM"},_calendar:{sameDay:"[Today at] LT",
nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},calendar:function(a,b){var c=this._calendar[a];return"function"===typeof c?c.apply(b):c},_relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},relativeTime:function(a,b,c,d){var e=this._relativeTime[c];return"function"===typeof e?e(a,b,c,
d):e.replace(/%d/i,a)},pastFuture:function(a,b){var c=this._relativeTime[0<a?"future":"past"];return"function"===typeof c?c(b):c.replace(/%s/i,b)},ordinal:function(a){return this._ordinal.replace("%d",a)},_ordinal:"%d",preparse:function(a){return a},postformat:function(a){return a},week:function(a){return B(a,this._week.dow,this._week.doy).week},_week:{dow:0,doy:6},_invalidDate:"Invalid date",invalidDate:function(){return this._invalidDate}});e=function(a,b,c,d){var e;"boolean"===typeof c&&(d=c,c=
void 0);e={_isAMomentObject:!0};e._i=a;e._f=b;e._l=c;e._strict=d;e._isUTC=!1;e._pf=A();return pa(e)};e.suppressDeprecationWarnings=!1;e.createFromInputFallback=z("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.",function(a){a._d=new Date(a._i)});e.utc=function(a,b,c,d){var e;"boolean"===typeof c&&(d=c,c=void 0);e={_isAMomentObject:!0,_useUTC:!0,_isUTC:!0};e._l=
c;e._i=a;e._f=b;e._strict=d;e._pf=A();return pa(e).utc()};e.unix=function(a){return e(1E3*a)};e.duration=function(a,b){var c=a,d=null,g;if(e.isDuration(a))c={ms:a._milliseconds,d:a._days,M:a._months};else if("number"===typeof a)c={},b?c[b]=a:c.milliseconds=a;else if(d=Sa.exec(a))g="-"===d[1]?-1:1,c={y:0,d:i(d[o])*g,h:i(d[m])*g,m:i(d[w])*g,s:i(d[C])*g,ms:i(d[D])*g};else if(d=Ta.exec(a))g="-"===d[1]?-1:1,c=function(a){a=a&&parseFloat(a.replace(",","."));return(isNaN(a)?0:a)*g},c={y:c(d[2]),M:c(d[3]),
d:c(d[4]),h:c(d[5]),m:c(d[6]),s:c(d[7]),w:c(d[8])};d=new G(c);e.isDuration(a)&&a.hasOwnProperty("_lang")&&(d._lang=a._lang);return d};e.version="2.6.0";e.defaultFormat="YYYY-MM-DDTHH:mm:ssZ";e.momentProperties=oa;e.updateOffset=function(){};e.lang=function(a,b){if(!a)return e.fn._lang._abbr;if(b){var c=M(a);b.abbr=c;x[c]||(x[c]=new Y);x[c].set(b)}else null===b?(delete x[a],a="en"):x[a]||q(a);return(e.duration.fn._lang=e.fn._lang=q(a))._abbr};e.langData=function(a){a&&(a._lang&&a._lang._abbr)&&(a=
a._lang._abbr);return q(a)};e.isMoment=function(a){return a instanceof F||null!=a&&a.hasOwnProperty("_isAMomentObject")};e.isDuration=function(a){return a instanceof G};for(k=ta.length-1;0<=k;--k)xa(ta[k]);e.normalizeUnits=function(a){return r(a)};e.invalid=function(a){var b=e.utc(NaN);null!=a?l(b._pf,a):b._pf.userInvalidated=!0;return b};e.parseZone=function(){return e.apply(null,arguments).parseZone()};e.parseTwoDigitYear=function(a){return i(a)+(68<i(a)?1900:2E3)};l(e.fn=F.prototype,{clone:function(){return e(this)},
valueOf:function(){return+this._d+6E4*(this._offset||0)},unix:function(){return Math.floor(+this/1E3)},toString:function(){return this.clone().lang("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")},toDate:function(){return this._offset?new Date(+this):this._d},toISOString:function(){var a=e(this).utc();return 0<a.year()&&9999>=a.year()?P(a,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):P(a,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")},toArray:function(){return[this.year(),this.month(),this.date(),this.hours(),this.minutes(),
this.seconds(),this.milliseconds()]},isValid:function(){return ea(this)},isDSTShifted:function(){return this._a?this.isValid()&&0<ca(this._a,(this._isUTC?e.utc(this._a):e(this._a)).toArray()):!1},parsingFlags:function(){return l({},this._pf)},invalidAt:function(){return this._pf.overflow},utc:function(){return this.zone(0)},local:function(){this.zone(0);this._isUTC=!1;return this},format:function(a){a=P(this,a||e.defaultFormat);return this.lang().postformat(a)},add:function(a,b){var c;c="string"===
typeof a?e.duration(+b,a):e.duration(a,b);I(this,c,1);return this},subtract:function(a,b){var c;c="string"===typeof a?e.duration(+b,a):e.duration(a,b);I(this,c,-1);return this},diff:function(a,b,c){var a=N(a,this),d=6E4*(this.zone()-a.zone()),g,b=r(b);"year"===b||"month"===b?(g=432E5*(this.daysInMonth()+a.daysInMonth()),d=12*(this.year()-a.year())+(this.month()-a.month()),d+=(this-e(this).startOf("month")-(a-e(a).startOf("month")))/g,d-=6E4*(this.zone()-e(this).startOf("month").zone()-(a.zone()-e(a).startOf("month").zone()))/
g,"year"===b&&(d/=12)):(g=this-a,d="second"===b?g/1E3:"minute"===b?g/6E4:"hour"===b?g/36E5:"day"===b?(g-d)/864E5:"week"===b?(g-d)/6048E5:g);return c?d:v(d)},from:function(a,b){return e.duration(this.diff(a)).lang(this.lang()._abbr).humanize(!b)},fromNow:function(a){return this.from(e(),a)},calendar:function(){var a=N(e(),this).startOf("day"),a=this.diff(a,"days",!0);return this.format(this.lang().calendar(-6>a?"sameElse":-1>a?"lastWeek":0>a?"lastDay":1>a?"sameDay":2>a?"nextDay":7>a?"nextWeek":"sameElse",
this))},isLeapYear:function(){return L(this.year())},isDST:function(){return this.zone()<this.clone().month(0).zone()||this.zone()<this.clone().month(5).zone()},day:function(a){var b=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=a?(a=na(a,this.lang()),this.add({d:a-b})):b},month:u("Month",!0),startOf:function(a){a=r(a);switch(a){case "year":this.month(0);case "quarter":case "month":this.date(1);case "week":case "isoWeek":case "day":this.hours(0);case "hour":this.minutes(0);case "minute":this.seconds(0);
case "second":this.milliseconds(0)}"week"===a?this.weekday(0):"isoWeek"===a&&this.isoWeekday(1);"quarter"===a&&this.month(3*Math.floor(this.month()/3));return this},endOf:function(a){a=r(a);return this.startOf(a).add("isoWeek"===a?"week":a,1).subtract("ms",1)},isAfter:function(a,b){b="undefined"!==typeof b?b:"millisecond";return+this.clone().startOf(b)>+e(a).startOf(b)},isBefore:function(a,b){b="undefined"!==typeof b?b:"millisecond";return+this.clone().startOf(b)<+e(a).startOf(b)},isSame:function(a,
b){b=b||"ms";return+this.clone().startOf(b)===+N(a,this).startOf(b)},min:function(a){a=e.apply(null,arguments);return a<this?this:a},max:function(a){a=e.apply(null,arguments);return a>this?this:a},zone:function(a,b){var c=this._offset||0;if(null!=a)"string"===typeof a&&(a=la(a)),16>Math.abs(a)&&(a*=60),this._offset=a,this._isUTC=!0,c!==a&&(!b||this._changeInProgress?I(this,e.duration(c-a,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,e.updateOffset(this,!0),this._changeInProgress=null));
else return this._isUTC?c:this._d.getTimezoneOffset();return this},zoneAbbr:function(){return this._isUTC?"UTC":""},zoneName:function(){return this._isUTC?"Coordinated Universal Time":""},parseZone:function(){this._tzm?this.zone(this._tzm):"string"===typeof this._i&&this.zone(this._i);return this},hasAlignedHourOffset:function(a){a=a?e(a).zone():0;return 0===(this.zone()-a)%60},daysInMonth:function(){return K(this.year(),this.month())},dayOfYear:function(a){var b=y((e(this).startOf("day")-e(this).startOf("year"))/
864E5)+1;return null==a?b:this.add("d",a-b)},quarter:function(a){return null==a?Math.ceil((this.month()+1)/3):this.month(3*(a-1)+this.month()%3)},weekYear:function(a){var b=B(this,this.lang()._week.dow,this.lang()._week.doy).year;return null==a?b:this.add("y",a-b)},isoWeekYear:function(a){var b=B(this,1,4).year;return null==a?b:this.add("y",a-b)},week:function(a){var b=this.lang().week(this);return null==a?b:this.add("d",7*(a-b))},isoWeek:function(a){var b=B(this,1,4).week;return null==a?b:this.add("d",
7*(a-b))},weekday:function(a){var b=(this.day()+7-this.lang()._week.dow)%7;return null==a?b:this.add("d",a-b)},isoWeekday:function(a){return null==a?this.day()||7:this.day(this.day()%7?a:a-7)},isoWeeksInYear:function(){return da(this.year(),1,4)},weeksInYear:function(){var a=this._lang._week;return da(this.year(),a.dow,a.doy)},get:function(a){a=r(a);return this[a]()},set:function(a,b){a=r(a);if("function"===typeof this[a])this[a](b);return this},lang:function(a){if(void 0===a)return this._lang;this._lang=
q(a);return this}});e.fn.millisecond=e.fn.milliseconds=u("Milliseconds",!1);e.fn.second=e.fn.seconds=u("Seconds",!1);e.fn.minute=e.fn.minutes=u("Minutes",!1);e.fn.hour=e.fn.hours=u("Hours",!0);e.fn.date=u("Date",!0);e.fn.dates=z("dates accessor is deprecated. Use date instead.",u("Date",!0));e.fn.year=u("FullYear",!0);e.fn.years=z("years accessor is deprecated. Use year instead.",u("FullYear",!0));e.fn.days=e.fn.day;e.fn.months=e.fn.month;e.fn.weeks=e.fn.week;e.fn.isoWeeks=e.fn.isoWeek;e.fn.quarters=
e.fn.quarter;e.fn.toJSON=e.fn.toISOString;l(e.duration.fn=G.prototype,{_bubble:function(){var a=this._milliseconds,b=this._days,c=this._months,d=this._data;d.milliseconds=a%1E3;a=v(a/1E3);d.seconds=a%60;a=v(a/60);d.minutes=a%60;a=v(a/60);d.hours=a%24;b+=v(a/24);d.days=b%30;c+=v(b/30);d.months=c%12;b=v(c/12);d.years=b},weeks:function(){return v(this.days()/7)},valueOf:function(){return this._milliseconds+864E5*this._days+2592E6*(this._months%12)+31536E6*i(this._months/12)},humanize:function(a){var b=
+this,c;c=!a;var d=this.lang(),e=y(Math.abs(b)/1E3),f=y(e/60),h=y(f/60),i=y(h/24),j=y(i/365),e=45>e&&["s",e]||1===f&&["m"]||45>f&&["mm",f]||1===h&&["h"]||22>h&&["hh",h]||1===i&&["d"]||25>=i&&["dd",i]||45>=i&&["M"]||345>i&&["MM",y(i/30)]||1===j&&["y"]||["yy",j];e[2]=c;e[3]=0<b;e[4]=d;c=Na.apply({},e);a&&(c=this.lang().pastFuture(b,c));return this.lang().postformat(c)},add:function(a,b){var c=e.duration(a,b);this._milliseconds+=c._milliseconds;this._days+=c._days;this._months+=c._months;this._bubble();
return this},subtract:function(a,b){var c=e.duration(a,b);this._milliseconds-=c._milliseconds;this._days-=c._days;this._months-=c._months;this._bubble();return this},get:function(a){a=r(a);return this[a.toLowerCase()+"s"]()},as:function(a){a=r(a);return this["as"+a.charAt(0).toUpperCase()+a.slice(1)+"s"]()},lang:e.fn.lang,toIsoString:function(){var a=Math.abs(this.years()),b=Math.abs(this.months()),c=Math.abs(this.days()),d=Math.abs(this.hours()),e=Math.abs(this.minutes()),f=Math.abs(this.seconds()+
this.milliseconds()/1E3);return!this.asSeconds()?"P0D":(0>this.asSeconds()?"-":"")+"P"+(a?a+"Y":"")+(b?b+"M":"")+(c?c+"D":"")+(d||e||f?"T":"")+(d?d+"H":"")+(e?e+"M":"")+(f?f+"S":"")}});for(k in W)W.hasOwnProperty(k)&&(qa(k,W[k]),Qa(k.toLowerCase()));qa("Weeks",6048E5);e.duration.fn.asMonths=function(){return(+this-31536E6*this.years())/2592E6+12*this.years()};e.lang("en",{ordinal:function(a){var b=a%10,b=1===i(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+b}});"undefined"===typeof ender&&
(Ra.moment=e)});;
;
/* module-key = 'jira.webresources:momentjs', location = '/static/lib/moment/moment.lib.js' */
define("jira/moment/moment.lib",["atlassian/libs/moment-2.6.0"],function(n){return n});;
;
/* module-key = 'jira.webresources:momentjs', location = '/static/lib/moment/moment.jira.formatter.js' */
define("jira/moment/moment.jira.formatter",["underscore","exports"],function(t,e){"use strict";function r(e){return u[e]||t.reduce(e,function(t,e){return t+(u[e]||e)},"")}function n(e){var n=!1,u=!1,a="",o=t.reduce(e,function(t,e,o,i){return u?u=!1:"'"===e?(a&&(t+=r(a),a=""),"'"===i[o+1]?(t+=e,u=!0):(t+=n?"]":"[",n=!n)):n?t+=e:/[a-zA-Z]/.test(e)?a&&a[a.length-1]!==e?(t+=r(a),a=e):a+=e:(a&&(t+=r(a),a=""),t+=e),t},"");return a&&(o+=r(a)),o}var u={d:"D",y:"Y",a:"A",E:"d",u:"d",Z:"ZZ",z:"[GMT]ZZ",XX:"ZZ",XXX:"Z"};e.translateSimpleDateFormat=n});;
;
/* module-key = 'jira.webresources:momentjs', location = '/static/lib/moment/moment.jira.i18n.js' */
define("jira/moment/moment.jira.i18n",["jira/moment/moment.lib","jira/moment/moment.jira.formatter","jira/util/formatter","jira/util/data/meta","wrm/data"],function(e,t,a,m,o){"use strict";var r=o.claim("jira.webresources:dateFormatProvider.dateFormat");e.lang("jira",{months:r.months,monthsShort:r.monthsShort,weekdays:r.weekdays,weekdaysShort:r.weekdaysShort,weekdaysMin:r.weekdaysShort,longDateFormat:{LT:t.translateSimpleDateFormat(m.get("date-time")),L:t.translateSimpleDateFormat(m.get("date-day")),LL:t.translateSimpleDateFormat(m.get("date-dmy")),LLL:t.translateSimpleDateFormat(m.get("date-complete"))},meridiem:function(e){return r.meridiem[+(e>11)]},calendar:{sameDay:"LLL",nextDay:"LLL",nextWeek:"LLL",lastDay:"LLL",lastWeek:"LLL",sameElse:"LLL"},relativeTime:{future:a.format("\u0447\u0435\u0440\u0435\u0437 {0}","%s"),past:a.format("{0} \u043d\u0430\u0437\u0430\u0434","%s"),s:"\u043d\u0435\u0441\u043a\u043e\u043b\u044c\u043a\u043e \u0441\u0435\u043a\u0443\u043d\u0434",m:"\u043c\u0438\u043d\u0443\u0442\u0430",mm:a.format("{0} \u043c\u0438\u043d\u0443\u0442","%d"),h:"\u0432 \u0447\u0430\u0441",hh:a.format("{0} \u0447\u0430\u0441\u043e\u0432","%d"),d:"\u0434\u0435\u043d\u044c",dd:a.format("{0} \u0434\u043d\u0435\u0439","%d"),M:"\u043c\u0435\u0441\u044f\u0446",MM:a.format("{0} \u043c\u0435\u0441\u044f\u0446\u0435\u0432","%d"),y:"\u0433\u043e\u0434",yy:a.format("{0} \u043b\u0435\u0442","%d")}})});;
;
/* module-key = 'jira.webresources:momentjs', location = '/static/lib/moment/moment.js' */
define("jira/moment",["jira/moment/moment.lib","jira/moment/moment.jira.i18n"],function(t,n){return t.splitDate=function(t,n){return Date.splitDate(t,n)},t});;
;
/* module-key = 'jira.webresources:momentjs', location = '/static/lib/moment/moment.legacy.js' */
!function(){AJS.namespace("JIRA.translateSimpleDateFormat",null,require("jira/moment/moment.jira.formatter").translateSimpleDateFormat),AJS.namespace("window.moment",null,require("jira/moment"))}();;
;
/* module-key = 'com.atlassian.jira.plugins.jira-dnd-attachment-plugin:shared-utility', location = 'js/ctrlv/time.js' */
define("dndattachment/ctrlv/time",[],function(){"use strict";return moment});;
;
/* module-key = 'com.atlassian.jira.plugins.jira-dnd-attachment-plugin:shared-utility', location = 'js/ctrlv/base64decode.js' */
define("dndattachment/ctrlv/base64decode",["exports"],function(e){"use strict";function n(e){return e>64&&e<91?e-65:e>96&&e<123?e-71:e>47&&e<58?e+4:43===e?62:47===e?63:0}var r=function(e){for(var r,t,a=e.replace(/[^A-Za-z0-9\+\/]/g,""),c=a.length,i=3*c+1>>2,d=new Uint8Array(i),o=0,s=0,f=0;f<c;f++)if(t=3&f,o|=n(a.charCodeAt(f))<<18-6*t,3===t||c-f===1){for(r=0;r<3&&s<i;r++,s++)d[s]=o>>>(16>>>r&24)&255;o=0}return d};e.base64decode=r,e.decodeBase64DataUri=function(e){var n=";base64,",t=e.slice(0,e.indexOf(n))+n,a=e.substring(t.length);return r(a)}});;
;
/* module-key = 'com.atlassian.jira.plugins.jira-dnd-attachment-plugin:shared-utility', location = 'js/ctrlv/utility.js' */
define("dndattachment/ctrlv/utility",["jquery","underscore","dndattachment/ctrlv/base64decode","dndattachment/ctrlv/time","jira/flag","jira/util/navigator","exports"],function(t,e,n,a,i,r,o){"use strict";o.isKeyPasteEvent=function(t,e){var n=86,a=(e||"").indexOf("Mac")!==-1||r.isMac();return t.which===n&&(a?t.metaKey:t.ctrlKey)},o.isImagePasteEvent=function(t){if(t&&t.clipboardData){var n=e.union(e.toArray(t.clipboardData.items),e.toArray(t.clipboardData.files)),a=n.some(function(t){return t.type.indexOf("image")!==-1}),i=n.some(function(t){return t.type.indexOf("rtf")!==-1});return a&&!i}};var s=function(n){if(n.clipboardData&&n.clipboardData.types&&e.contains(n.clipboardData.types,"text/html")){var a=t(n.clipboardData.getData("text/html"));return 1===a.length&&0===a.children().length&&"img"===a[0].nodeName.toLowerCase()?a[0].src:null}};o.getHtmlImagePaste=s,o.isHtmlImagePasteEvent=function(t){return null!=s(t)},o.isTextPasteEvent=function(t){return t.clipboardData.types&&(e.contains(t.clipboardData.types,"text/plain")||e.contains(t.clipboardData.types,"text/html"))},o.isContentEditable=function(e){return"true"==e.contentEditable||""==e.contentEditable||"inherit"==e.contentEditable&&t(e).parents().is("[contenteditable=true]")},o.isValidFileName=function(t){return!e(["\\","/",'"',":","?","*","<","|",">","!"]).any(function(e){return t.indexOf(e)>-1})},o.getTextPasteContent=function(t){return t.clipboardData.types&&e.contains(t.clipboardData.types,"text/plain")&&t.clipboardData.getData("text/plain")||""},o.getTextContent=function(e){return e?r.isIE()&&"undefined"!=typeof e.innerText?e.innerText:t(e).text():""},o.normalizePasteEvent=function(t){return t&&t.originalEvent&&t.originalEvent.clipboardData&&(t.clipboardData=t.originalEvent.clipboardData),t&&!t.clipboardData&&window.clipboardData&&(t.clipboardData={files:window.clipboardData.files,types:{contains:function(t){if("text/plain"==t)return!!window.clipboardData.getData("Text")}},getData:function(t){if("text/plain"==t)return window.clipboardData.getData("Text")}}),t},o.browserIsSupported=function(e){var n=(e||"").indexOf("Mac")!==-1||r.isMac(),a=r.isSafari(),i=r.isIE();if(n&&a)return!1;if(i&&!r.isEdge()){var o=document.documentElement.className.split(/\s+/),s=t.inArray("msie-gt-10",o)>-1,l=t.inArray("msie-gt-11",o)>-1,c=i&&s&&!l;return c}return!0},o.browserIsNativePaste=function(){return r.isChrome()||r.isSafari()},o.isWikiTextfield=function(t){return t.is(":input")&&t.hasClass("wiki-textfield")};var l=function(t){return t.is("input#summary")},c=function(n,a,i,r){var s=t(a);if((o.isWikiTextfield(s)||l(s))&&n){s.is(":focus")||s.one("focus",function(){var t=s[0];t.selectionStart=t.selectionEnd=i+n.length});var c=s.val(),u=c.substring(0,i),d=c.substring(r,c.length),f=s.data("wikiEditor");f&&f.undoRedoEl&&e.isFunction(f.undoRedoEl.recordHistoryItem)&&f.undoRedoEl.recordHistoryItem(),s.val(u+n+d),s.trigger("input"),a.selectionStart=a.selectionEnd=i+n.length,f&&f.undoRedoEl&&e.isFunction(f.undoRedoEl.updateCurrent)&&f.undoRedoEl.updateCurrent()}};o.insertToInput=c,o.getMarkup=function(t){var n=["gif"],a=["bmp","jpeg","jpg","png"],i=t.split("."),r=i[i.length-1].toLowerCase();return e.contains(n,r)?"!"+t+"!":e.contains(a,r)?"!"+t+"|thumbnail!":"[^"+t+"]"},o.insertWikiMarkup=function(t,e,n,a){var i=o.getMarkup(t);i&&(i=" "+i+" ",c(i,e,n,a))},o.loadImage=function(e){var n=new t.Deferred,a=new Image;return a.setAttribute("crossOrigin","anonymous"),a.onload=function(){n.resolve(a)},a.onerror=n.reject.bind(n),a.src=e,a.width>0&&a.height>0&&n.resolve(a),n},o.convertImageToBlob=function(e){var a=t("<canvas>").attr("width",e.width).attr("height",e.height)[0];a.getContext("2d").drawImage(e,0,0);try{if(a.mozGetAsFile)return a.mozGetAsFile("image/png");if(a.toDataURL)return new Blob([n.decodeBase64DataUri(a.toDataURL("image/png"))],{type:"image/png"})}catch(t){return null}},o.convertBlobToImage=function(t,e){var n=new Blob([t.slice()],{type:t.type});return n.lastModifiedDate=new Date,n.name=e,n},o.dropFileToElement=function(e,n){var a=e.name;a||(a=this.generateFileName(),e.name=a+".png");var i=t.Event("drop",{dataTransfer:{files:[e]},isPasteEvent:!0}),r=!1;return t(document).on("dropHandled.dropFileToElement",function(){r=!0}),n.trigger(i),t(document).off(".dropFileToElement"),r},o.generateFileName=function(){return"image-"+a().format("YYYY-MM-DD-HH-mm-ss-SSS")},o.getCurrentIssueId=function(){return JIRA.Issues.Api.getSelectedIssueId()},o.showErrorMsg=function(t,e){i.showErrorMsg(t,e)},o.createBlobFromFile=function(t){var e=new Blob([t.slice()],{type:t.type});return e.name=t.name,e},o.dragEventContainsFiles=function(t){if(!t.dataTransfer||!t.dataTransfer.types)return!0;var n=t.dataTransfer.types;return r.isMozilla()?e.contains(n,"application/x-moz-file"):e.contains(n,"Files")}});;
;
/* module-key = 'com.atlassian.jira.plugins.jira-dnd-attachment-plugin:dnd-utility', location = 'js/util/Configuration.js' */
define("dndattachment/util/Configuration",["underscore"],function(n){function t(t){return n.isFunction(WRM.data)?WRM.data(t):WRM.data.claim(t)}var a="com.atlassian.jira.plugins.jira-dnd-attachment-plugin:dnd-issue-drop-zone.";return{getWRM:n.memoize(function(n){return t(a+n)})}});;
;
/* module-key = 'com.atlassian.jira.plugins.jira-dnd-attachment-plugin:dnd-utility', location = 'js/util/DataTransfer.js' */
define("dndattachment/util/DataTransfer",["jquery"],function(e){return Class.extend({init:function(e){this._dataTransfer=e},getFiles:function(){var n=this._dataTransfer.files,r=this._dataTransfer.items;return r&&r.length>0&&_.any(r,function(e){return!!e.webkitGetAsEntry})?this.readEntries(r):n&&n.length>0?this.readFiles(this._dataTransfer.files):(new e.Deferred).reject()},readFiles:function(n){var r=new e.Deferred;return e.when.apply(window,_.map(n,function(r){var t=new e.Deferred,i=!r.name.match(/\.([a-z0-9]+)$/i);return i&&r.size<=8192||8192==r.size||4096==r.size||r.size<=1024?this.readFileAsText(r).fail(function(){n=_(n).without(r)}).always(t.resolve.bind(t)):t.resolve(),t}.bind(this))).always(function(){r.resolve(n)}),r},readFileAsText:function(n){var r=new e.Deferred,t=new FileReader;return t.onload=function(){r.resolve(this.result)},t.onerror=function(){r.reject(this.error)},t.readAsText(n),r},readEntries:function(n){var r=new e.Deferred;return n=_.filter(n,function(e){return"file"===e.kind}),e.when.apply(window,_.map(n,function(e){return this.readEntry(e.webkitGetAsEntry(),e)}.bind(this))).then(function(){r.resolve(_.union.apply(_,arguments))},r.reject.bind(r)),r},readEntry:function(n,r){var t=new e.Deferred;return n.isFile?r&&r.getAsFile?t.resolve([r.getAsFile()]):n.file(function(e){t.resolve([e])}):n.isDirectory&&n.createReader().readEntries(function(n){var r=[];e.when.apply(window,_.map(n,function(e){return this.readEntry(e).then(function(e){return r.push.apply(r,e)})}.bind(this))).always(function(){t.resolve(r)})}.bind(this)),t}})});;
;
/* module-key = 'com.atlassian.jira.plugins.jira-dnd-attachment-plugin:dnd-utility', location = 'js/util/FileSizeUtil.js' */
define("dndattachment/util/FileSizeUtil",function(){function n(n){return n>u?t(n):n>i?r(n):e(n)}function t(n){var t=n/u;return t.toFixed(2)+a}function r(n){var t=Math.round(n/i);return t+o}function e(n){var t=n/i;return t.toFixed(1)+o}var i=1024,u=i*i,o=" kB",a=" MB";return{format:n}});;
;
/* module-key = 'com.atlassian.jira.plugins.jira-dnd-attachment-plugin:dnd-utility', location = 'js/util/AttachmentEvents.js' */
define("dndattachment/util/events/types",{ATTACHMENT_FOR_PAGE_RECEIVED:"attachmentForPageReceived"});;
;
/* module-key = 'com.atlassian.jira.plugins.jira-dnd-attachment-plugin:dnd-upload', location = 'js/upload/UploadHandler.js' */
define("dndattachment/upload/handler",["jira/util/events","dndattachment/util/events/types","underscore","jquery","dndattachment/ctrlv/utility","exports","dndattachment/upload/default/executor"],function(e,t,n,i,a,r,o){var u,l,s=[],c=function(e,t){return n.find(s,function(n){return n.isValid(e,t)})},f=function(e,t){var r=i.Deferred(),o=JIRA.Dialog.current;if(o){AJS.trigger("analytics",{name:"attach.screenshot.html5.dialogPaste",data:{}});var l=a.createBlobFromFile(t.files[0]);a.dropFileToElement(l,o.$form)&&r.resolve([t.files[0].name])}else{var s=c(e,t);s&&(r=s.processFiles(t.files,u),t.successCallback&&r.done(t.successCallback),t.failureCallback&&r.fail(t.failureCallback),t.alwaysCallback&&r.always(t.alwaysCallback))}r.done(function(e,r){if(!r&&t.isWikiTextfieldFocused){var u=t.wikiTextfield;n.each(e,function(e){a.insertWikiMarkup(e,u,u.selectionStart,u.selectionStart)}),o&&t.isPaste&&AJS.trigger("analytics",{name:"attach.screenshot.html5.dialogPaste.insertWikiMarkup",data:{}}),i(t.wikiTextfield).is(":focus")||setTimeout(function(){t.wikiTextfield.focus()},0)}})},d=function(e){if(e){var t="undefined"!=typeof e.isValid,n="undefined"!=typeof e.processFiles,i="undefined"!=typeof e.weight,a="undefined"!=typeof e.name;return t&&n&&i&&a}return!1};r.registerExecutor=function(e){var t=d(e);if(t){var i=n.reject(s,function(t){return t.name===e.name});i.push(e),s=n.sortBy(i,function(e){return-e.weight})}return t},r.unregisterExecutor=function(e){s=n.reject(s,function(t){return t.name===e.name})},r.initialize=function(){e.bind(t.ATTACHMENT_FOR_PAGE_RECEIVED,f)},r.disable=function(){e.unbind(t.ATTACHMENT_FOR_PAGE_RECEIVED,f)},r.setAttachmentDropZone=function(e){u=e,this.setCurrentDropZone(e)},r.isDefaultExecutor=function(e){var t=c(null,e);return t&&t.name===o.name},r.setCurrentDropZone=function(e){l=e},r.doUpload=function(e){return!(!l||!l.browseFilesAndUpload)&&l.browseFilesAndUpload(i.Event("upload"),e)},r.disconnectCurrentDropZone=function(){l=u}});;
;
/* module-key = 'com.atlassian.jira.plugins.jira-dnd-attachment-plugin:dnd-upload', location = 'js/upload/DefaultUploadExecutor.js' */
define("dndattachment/upload/default/executor",["jquery","underscore","dndattachment/ctrlv/utility","exports"],function(t,e,n,u){u.name="Default attachment executor",u.weight=0,u.isValid=function(t,e){return!0},u.processFiles=function(t,e){return e.uploadFiles(t)}});;
;
/* module-key = 'com.atlassian.jira.plugins.jira-dnd-attachment-plugin:attachment-integration', location = 'js/integration/register.js' */
define("dndattachment/integration-register",function(){function r(r){return e[r]}function t(r,t){return"function"==typeof t&&(e[r]=t,!0)}var e={attachmentMenuLink:null,attachmentsZoneCreator:null,browseLink:null,temporaryAttachmentCreatorFactory:null,attachmentCreatorFactoryForBrowseLink:null,attachmentCreatorFactoryForAttachLink:null,temporaryBinaryUploadHandler:null,connectedTemporaryBinaryUploadHandler:null};return{getAttachmentMenuHandler:function(){var t=r("attachmentCreatorFactoryForAttachLink");return t&&t("attachment-menu")},registerAttachmentMenuHandlerFactory:function(r){return t("attachmentCreatorFactoryForAttachLink",r)},getBrowseLinkHandler:function(){const t=r("attachmentCreatorFactoryForBrowseLink");return t&&t("browse-link")},registerBrowseLinkHandlerFactory:function(r){return t("attachmentCreatorFactoryForBrowseLink",r)},getAttachmentsZoneCreator:function(){return r("attachmentsZoneCreator")},registerAttachmentsZoneCreator:function(r){return t("attachmentsZoneCreator",r)},registerTemporaryAttachmentCreatorFactory:function(r){return t("temporaryAttachmentCreatorFactory",r)},getTemporaryAttachmentCreator:function(t,e,n){var a=r("temporaryAttachmentCreatorFactory");return a&&a(t,e,n)},getTemporaryAttachmentZoneCreator:function(){return r("temporaryAttachmentsZoneCreator")},registerTemporaryAttachmentZoneCreator:function(r){return t("temporaryAttachmentsZoneCreator",r)},getTemporaryBinaryUploadHandler:function(){return r("temporaryBinaryUploadHandler")},registerTemporaryBinaryUploadHandler:function(r){return t("temporaryBinaryUploadHandler",r)},getConnectedTemporaryBinaryUploadHandler:function(){return r("connectedTemporaryBinaryUploadHandler")},registerConnectedTemporaryBinaryUploadHandler:function(r){return t("connectedTemporaryBinaryUploadHandler",r)},unregisterAllHandlers:function(){for(var r in e)e[r]=null}}});;
;
/* module-key = 'com.atlassian.jira.plugins.jira-dnd-attachment-plugin:jira-html5-attach-images-resources', location = 'js/ctrlv/path.js' */
define("dndattachment/ctrlv/path",["exports"],function(t){"use strict";var n=function(t){return t.split(/\//).pop()};t.basename=n,t.dirname=function(t){var e=n(t);return t.substring(0,t.length-e.length)}});;
;
/* module-key = 'com.atlassian.jira.plugins.jira-dnd-attachment-plugin:jira-html5-attach-images-resources', location = 'templates/soy/attach-screenshot-form.soy' */
// This file was automatically generated from attach-screenshot-form.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace JIRA.Templates.Html5Screenshot.
 */

if (typeof JIRA == 'undefined') { var JIRA = {}; }
if (typeof JIRA.Templates == 'undefined') { JIRA.Templates = {}; }
if (typeof JIRA.Templates.Html5Screenshot == 'undefined') { JIRA.Templates.Html5Screenshot = {}; }


JIRA.Templates.Html5Screenshot.attachScreenshotForm = function(opt_data, opt_ignored) {
  return '<h2 class="dialog-title">' + soy.$$escapeHtml('\u041f\u0440\u0438\u043b\u043e\u0436\u0438\u0442\u044c \u0441\u043a\u0440\u0438\u043d\u0448\u043e\u0442\u044b') + '</h2><form action="ShowAttachScreenshotFormAction.jspa" class="aui" method="post" id="attach-screenshot-form"><input type="hidden" name="id" value="' + soy.$$escapeHtml(opt_data.id) + '"/><input type="hidden" name="projectId" value="' + soy.$$escapeHtml(opt_data.projectId) + '"/><input type="hidden" name="atl_token" value="' + soy.$$escapeHtml(opt_data.atlToken) + '"><input type="hidden" name="formToken" value="' + soy.$$escapeHtml(opt_data.formToken) + '"><input type="hidden" name="filetoconvert" value=""><div class="attach-screenshot-padding"><div class="attach-screenshot-container"><div id="attach-screenshot-inner-container"><div class="mod-content"><ul class="item-details"><li><dl><dt>' + soy.$$escapeHtml('\u0421\u0434\u0435\u043b\u0430\u0442\u044c \u0441\u043d\u0438\u043c\u043e\u043a \u044d\u043a\u0440\u0430\u043d\u0430:') + '</dt>' + ((opt_data.userPlatform == 'pc') ? '<dd>' + soy.$$filterNoAutoescape('\x3ckbd\x3ePrt Scr\x3c/kbd\x3e') + '</dd>' : '<dd>' + soy.$$filterNoAutoescape('\x3ckbd\x3e\x26#8963; Ctrl\x3c/kbd\x3e + \x3ckbd\x3e\x26#8984; Cmd\x3c/kbd\x3e + \x3ckbd\x3e\x26#8679; Shift\x3c/kbd\x3e + \x3ckbd\x3e3\x3c/kbd\x3e') + '</dd>') + '</dl></li><li><dl><dt>' + soy.$$escapeHtml('\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u044c \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435:') + '</dt>' + ((opt_data.userPlatform == 'pc') ? '<dd>' + soy.$$filterNoAutoescape('\x3ckbd\x3eCtrl\x3c/kbd\x3e + \x3ckbd\x3ev\x3c/kbd\x3e') + '</dd>' : '<dd>' + soy.$$filterNoAutoescape('\x3ckbd\x3e\x26#8984; Cmd\x3c/kbd\x3e + \x3ckbd\x3ev\x3c/kbd\x3e') + '</dd>') + '</dl></li></ul></div><input type="text" id="attach-screenshot-fake-input"><div class="attach-screenshot-padding attach-screenshot-padding-inner"><div id="attach-screenshot-image-container" class="attach-screenshot-image-container"><div class="attach-screenshot-placeholder"><div class="mod-content"><ul class="item-details"><li><dl><dt id="attach-screenshot-placeholder-message">' + soy.$$escapeHtml('\u0412\u0430\u0448\u0435 \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435 \u043f\u043e\u043c\u0435\u0441\u0442\u0438\u0442\u0435 \u0437\u0434\u0435\u0441\u044c') + '</dt></dl></li></ul></div></div></div></div><div id=\'attach-max-size\' class="hidden">' + soy.$$escapeHtml(opt_data.maxSize) + '</div></div></div></div><fieldset><div><legend><span>' + soy.$$escapeHtml('\u041f\u0440\u0438\u043b\u043e\u0436\u0438\u0442\u044c \u0441\u043a\u0440\u0438\u043d\u0448\u043e\u0442\u044b') + '</span></legend><div id="attach-screenshot-filename-group" class="field-group"><div id="attach-screenshot-progress-container"></div><label for="attachscreenshotname">' + soy.$$escapeHtml('\u0418\u043c\u044f \u0444\u0430\u0439\u043b\u0430') + ' <span class="aui-icon icon-required">' + soy.$$escapeHtml('\u041e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u043e') + '</span></label><input class="text" type="text" id="attachscreenshotname" name="attachscreenshotname" title="File Name" value="' + soy.$$escapeHtml(opt_data.nextScreenshotName) + '"><div class="description">' + soy.$$escapeHtml('\u0414\u043b\u044f \u0438\u043c\u0435\u043d\u0438 \u0444\u0430\u0439\u043b\u0430 \u0431\u0443\u0434\u0435\u0442 \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u043d\u043e \u0438\u043c\u044f \u043f\u0440\u0438\u043a\u0440\u0435\u043f\u043b\u0435\u043d\u043d\u043e\u0433\u043e \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u044f') + '</div></div></div></fieldset><div class="buttons-container form-footer"><div class="buttons"><button class="aui-button aui-button-primary" id="attach-screenshot-html5-upload">' + soy.$$escapeHtml('\u0412\u044b\u0433\u0440\u0443\u0437\u0438\u0442\u044c') + '</button><a href="#" class="cancel">' + soy.$$escapeHtml('\u041e\u0442\u043c\u0435\u043d\u0430') + '</a></div></div></form>';
};
if (goog.DEBUG) {
  JIRA.Templates.Html5Screenshot.attachScreenshotForm.soyTemplateName = 'JIRA.Templates.Html5Screenshot.attachScreenshotForm';
}
;
;
/* module-key = 'com.atlassian.jira.plugins.jira-dnd-attachment-plugin:jira-html5-attach-images-resources', location = 'js/ctrlv/html5.js' */
define("dndattachment/ctrlv/html5",["jquery","underscore","dndattachment/integration-register","dndattachment/ctrlv/base64decode","dndattachment/ctrlv/utility","jira/dialog/dialog","jira/dialog/dialog-register","jira/ajs/ajax/smart-ajax","jira/attachment/inline-attach","dndattachment/ctrlv/tracking","exports"],function(e,t,n,i,r,a,o,s,l,c,d){"use strict";d.getFileFromEvent=function(n){var i=new e.Deferred;return r.isImagePasteEvent(n)?i.resolve(t(n.clipboardData.items).filter(function(e){return e.type.indexOf("image")!==-1}).map(function(e){return e.getAsFile()})[0]||t(n.clipboardData.files).filter(function(e){return e.type.indexOf("image")!==-1})[0]):i.reject(),i.promise()},d.REQUEST_TIMEOUT_MILLIS=3e5,d.screenshotFileUpload={},d.screenshotFileUploadUri=null,d.$document=void 0,d.$window=void 0,d.$container=void 0,d.$fakeInput=void 0,d.uploadError=!1,d.uploadErrorMsg="",d.progressView={hidden:!1,progress:0,old:0,progressBarContainer:void 0,progressEl:void 0,container:void 0,options:void 0,staticProgress:void 0,initProgress:function(){this.container=this.buildContainer(),this.progressEl=this.buildProgress(),this.container.append(this.progressEl),this.options={showPercentage:!1,height:"5px"},this.progressBarContainer=e("#attach-screenshot-progress-container"),this.progressBarContainer.empty(),this.progressBarContainer.append(this.container),this.staticProgress=this.container,this.hidden=!0},finish:function(){this.value(100)},progressHandler:function(e){var t=Math.round(100*e.loaded/e.total);this.value(t)},value:function(e){e>100?e=100:e<0&&(e=0),this.hidden&&(this.progressEl.show(),this.hidden=!1),this.old!==e&&(this.progressEl.progressBar(e,this.options),e>=100&&this.progressEl.fadeOut(),this.old=e)},buildContainer:function(){return e("<div>").addClass("file-progress")},buildProgress:function(){return e("<div>").attr("id","attach-screenshot-upload-progress")}},d.dialogView={pasteCatcher:{},presenter:void 0,getMaxSize:function(){return e("#attach-max-size").text()},getFileSize:function(){return e.isPlainObject(this.presenter.screenshotFileUpload)&&t.isEmpty(this.presenter.screenshotFileUpload)?0:this.presenter.screenshotFileUpload.size||this.presenter.screenshotFileUpload.byteLength||this.presenter.screenshotFileUpload.length},cleanGeneralErrors:function(){e("#error-attach-screenshot-image").closest(".field-group").remove()},cleanFileErrors:function(){e("#error-attach-screenshot-filename").remove()},displayErrors:function(e){"compatibility"in e&&r.showErrorMsg("",e.compatibility),"fileName"in e&&r.showErrorMsg("",e.fileName),"fileUpload"in e&&r.showErrorMsg("",e.fileUpload)},appendBlobImage:function(e){var t=window.URL||window.webkitURL,n=t.createObjectURL(e);this.presenter.screenshotFileUpload=e,this.createImage(n)},createImage:function(n){var i=new Image;i.onload=function(){},i.src=n,this.presenter.screenshotToUpload=i;var r=e(i);r.addClass("attach-screenshot-pasted-image");var a=e("#attach-screenshot-image-container");a.empty(),a.append(r),this.presenter.$fakeInput.focus(),t.defer(function(){d.imageCreatedHandler()})},checkInput:function(){var e,t=d.dialogView.pasteCatcher.childNodes[0];return t&&("IMG"===t.tagName&&0===t.src.indexOf("data:")&&(e=t.src),d.dialogView.pasteCatcher.innerHTML=""),e||d.$fakeInput.focus(),e},onPaste:function(e){d.dialogView.cleanFileErrors(),d.dialogView.cleanGeneralErrors(),r.isImagePasteEvent(e)?d.getFileFromEvent(e).then(function(e){this.appendBlobImage(e)}.bind(this)):setTimeout(function(){var e=this.checkInput();e&&(d.screenshotFileUpload=i.decodeBase64DataUri(e),d.dialogView.createImage(e))}.bind(this),0)},getFakeInput:function(){return e("#attach-screenshot-fake-input")},getContainer:function(){return e("#attach-screenshot-image-container")},getIssueKey:function(){return e("input[name='id']").val()},getProjectId:function(){return e("input[name='projectId']").val()},getDocument:function(){return e(document)},getWindow:function(){return e(window)},getFileNameInput:function(){return e("#attachscreenshotname")},hasPngExtension:function(e){var t=/\.png$/i;return t.test(e)},setFileToConvert:function(t){e("input[name='filetoconvert']").val(t)},buildPasteCatcher:function(){if(document.getElementById("attach-screenshot-form")){var e=document.createElement("div");return e.setAttribute("contenteditable","true"),e.style.width=0,e.style.height=0,e.style.position="absolute",e.style.top="-5000px",document.getElementById("attach-screenshot-form").appendChild(e),e}},_getFormSubmits:function(){return e("#attach-screenshot-form").find("button.aui-button")},disable:function(){return this._getFormSubmits().attr("disabled","disabled"),this},enable:function(){return this._getFormSubmits().removeAttr("disabled"),this},isEnabled:function(){return this.isVisible()&&!this._getFormSubmits().attr("disabled")},isVisible:function(){return e("#attach-screenshot-form").length>0},initDialog:function(e){this.pasteCatcher={},this.presenter=e,this.pasteCatcher=this.buildPasteCatcher()}},d.initScreenshotPasteHandler=function(){var e=d.dialogView;d.screenshotFileUpload={},d.resetUploadErrors(),d.dialogView.initDialog(d),d.$document=e.getDocument(),d.$window=e.getWindow(),d.$container=e.getContainer(),d.$fakeInput=e.getFakeInput(),d.bindOnce(d.$container,"click",d.setFocusOnClickHandler),d.bindOnce(d.$fakeInput,"focus",d.showFocusOnFieldHandler),d.bindOnce(d.$fakeInput,"blur",d.hideFocusOnFieldHandler),d.bindOnce(d.$fakeInput,"keydown",d.keyDownHandler),r.browserIsSupported()?d.bindOnce(d.$window,"paste",d.pasteHandler):e.displayErrors({compatibility:AJS.format("\u0412\u0430\u0448 browser \u043d\u0435 \u043f\u043e\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442\u0441\u044f. \u0420\u0430\u0441\u0441\u043c\u043e\u0442\u0440\u0438\u0442\u0435 \u0432\u043e\u0437\u043c\u043e\u0436\u043d\u043e\u0441\u0442\u044c \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u043d\u0438\u044f \u043f\u043e\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u043c\u044b\u0445 {0}Google Chrome{1} \u0438\u043b\u0438 {2}Firefox{3}.",'<a href="//www.google.com/chrome/browser/">',"</a>",'<a href="//www.mozilla.org/firefox/">',"</a>")})},d.resetUploadErrors=function(){d.uploadError=!1,d.uploadErrorMsg=void 0},d.setUploadError=function(e){d.uploadError=!0,d.uploadErrorMsg=e},d.bindOnce=function(e,t,n){e.unbind(t,n),e.bind(t,n)},d.showFocusOnFieldHandler=function(){d.$container.addClass("focus")},d.hideFocusOnFieldHandler=function(){d.$container.addClass("focus")},d.setFocusOnClickHandler=function(){d.$fakeInput.focus()},d.pasteHandler=function(e){d.dialogView.isEnabled()&&(e=r.normalizePasteEvent(e),d.dialogView.onPaste(e))},d.polyPasteHandler=function(e,t,n){d.dialogView.isEnabled()&&(d.screenshotFileUpload={length:-1},d.screenshotFileUploadUri=t,d.dialogView.createImage(n))},d.keyDownHandler=function(e){r.isKeyPasteEvent(e)&&d.dialogView.pasteCatcher.focus&&d.dialogView.pasteCatcher.focus()},d.imageCreatedHandler=function(){d.doAjaxUpload(this.dialogView.getIssueKey(),this.dialogView.getFileNameInput().val())},d.getMimeType=function(){return"image/png"},d.createData=function(){return d.screenshotFileUpload},d.clipboardDataIsEmpty=function(e){return null==window.clipboardData&&!(e&&e.clipboardData&&e.clipboardData.types&&e.clipboardData.types.length>0)},d.validateFileSize=function(e,t,n){var t=t||d.dialogView.getFileSize(),n=n||d.dialogView.getMaxSize();if(t>n){var i=l.Text.fileSize(n,t);e.fileUpload=AJS.format("\u041a\u043e\u043f\u0438\u044f \u044d\u043a\u0440\u0430\u043d\u0430 \u0441\u043b\u0438\u0448\u043a\u043e\u043c \u0431\u043e\u043b\u044c\u0448\u0430\u044f \u0434\u043b\u044f \u0432\u043b\u043e\u0436\u0435\u043d\u0438\u044f. Attachment is {0} but the largest allowed attachment is {1}.",i[1],i[0])}},d.validateFormData=function(n,i){var a={};return e.isPlainObject(n)&&t.isEmpty(n)&&(a.fileUpload="\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u0432\u0441\u0442\u0430\u0432\u044c\u0442\u0435 \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435 \u043a\u043e\u0442\u043e\u0440\u043e\u0435 \u0432\u044b \u0445\u043e\u0442\u0438\u0442\u0435 \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c"),d.validateFileSize(a),d.uploadError&&(a.fileUpload="\u041f\u0440\u043e\u0438\u0437\u043e\u0448\u043b\u0430 \u043e\u0448\u0438\u0431\u043a\u0430 \u0432\u043e \u0432\u0440\u0435\u043c\u044f \u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0438 \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u044f - \u043f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0432\u0441\u0442\u0430\u0432\u0438\u0442\u044c \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435 \u0437\u0430\u043d\u043e\u0432\u043e. \u041f\u0440\u0438\u043d\u043e\u0441\u0438\u043c \u0438\u0437\u0432\u0438\u043d\u0435\u043d\u0438\u044f \u0437\u0430 \u043d\u0435\u0443\u0434\u043e\u0431\u0441\u0442\u0432\u0430."),""==i&&(a.fileName="\u0412\u044b \u0434\u043e\u043b\u0436\u043d\u044b \u043e\u043f\u0440\u0435\u0434\u0435\u043b\u0438\u0442\u044c \u0438\u043c\u044f \u0444\u0430\u0439\u043b\u0430 \u0434\u043b\u044f \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u044f."),r.isValidFileName(i)||(a.fileName="\u0412 \u0438\u043c\u0435\u043d\u0438 \u0444\u0430\u0439\u043b\u0430 \u043d\u0435 \u0434\u043e\u043b\u0436\u043d\u043e \u0431\u044b\u0442\u044c \u0441\u043b\u0435\u0434\u0443\u044e\u0449\u0438\u0445 \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432 \'\\\', \'/\', \'\"\', \':\', \'?\', \'*\', \'\u003c\', \'|\', \'\u003e\', \'!\'"),a},d.doAjaxUpload=function(i,r){d.dialogView.disable();var a={};if(d.validateFileSize(a),!t.isEmpty(a))return d.dialogView.displayErrors(a),void d.dialogView.enable();var o=d.createData(),l=d.getMimeType(),c=e("#attach-screenshot-form").find("input[name='formToken']").attr("value"),u=encodeURIComponent(this.dialogView.getProjectId()),p=AJS.contextPath()+"/rest/internal/2/AttachTemporaryFile?size="+d.dialogView.getFileSize()+"&filename="+encodeURIComponent(r)+"&atl_token="+encodeURIComponent(atl_token())+"&issueId="+encodeURIComponent(this.dialogView.getIssueKey())+(c?"&formToken="+encodeURIComponent(c):"");d.resetUploadErrors();var h=n.getTemporaryBinaryUploadHandler(),g=h?h(u,o,r,encodeURIComponent(c)):d.executeAjaxUpload(o,p,l);g.progress(function(e){"init"==e&&d.progressView.initProgress()}).done(function(e){"string"==typeof e&&(e=JSON.parse(e)),d.dialogView.setFileToConvert(e.id)}).fail(function(e,t,n,i){var r;if("abort"===i.statusText)r="\u0412\u044b\u0437\u043e\u0432 \u0441\u0435\u0440\u0432\u0435\u0440\u0430 JIRA \u043d\u0435 \u0431\u044b\u043b \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043d \u0432 \u0442\u0435\u0447\u0435\u043d\u0438\u0435 \u0442\u0430\u0439\u043c-\u0430\u0443\u0442\u0430. \u041c\u044b \u043d\u0435 \u0443\u0432\u0435\u0440\u0435\u043d\u044b \u0432 \u0440\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442\u0435 \u044d\u0442\u043e\u0439 \u043e\u043f\u0435\u0440\u0430\u0446\u0438\u0438.";else if(i.hasData){var a=JSON.parse(i.data);r=a.errorMessage?a.errorMessage:s.buildSimpleErrorContent(i,{alert:!1})}d.setUploadError(r),d.dialogView.displayErrors({fileUpload:r})}).always(function(){var t=e.Deferred();t.resolve(),t.then(function(){d.dialogView.enable(),d.progressView.finish()})}).progress(function(e){"init"!=e&&d.progressView.progressHandler(e)})},d.executeAjaxUpload=function(t,n,i){c.trigger("attach.screenshot.html5.jira.upload");var r=e.Deferred(),a=s.makeRequest({type:"POST",url:n,contentType:i,processData:!1,data:t,timeout:d.REQUEST_TIMEOUT_MILLIS,success:r.resolve.bind(r),error:r.reject.bind(r),xhr:function(){var t=e.ajaxSettings.xhr();return r.notify("init"),t.upload.addEventListener("progress",r.notify.bind(r)),t}});return r.always(function(){e.ajaxSettings.xhr().removeEventListener("progress",d.progressView.progressHandler),e(o.attachScreenshotDialog).off("Dialog.hide",a.abort)}),e(o.attachScreenshotDialog).one("Dialog.hide",a.abort),r.promise()},d.show=function(){var n=new e.Deferred,i=e(".issueaction-attach-screenshot-html5");return null!=a.current?n.reject().promise():0==i.length?n.reject().promise():(t.defer(function(){i.trigger("click")}),e(document).on("dialogContentReady",function(e,t){t===o.attachScreenshotDialog&&d.dialogView.isEnabled()?n.resolve(t):n.reject()}),e(document).on("ajaxComplete.jira.screenshot.dialog",function(e,t,r){r.url.indexOf(i.attr("href"))>-1&&setTimeout(function(){n.isResolved()||n.reject()},1e3)}),n.always(function(){e(document).off("ajaxComplete.jira.screenshot.dialog")}),n.promise())}});;
;
/* module-key = 'com.atlassian.jira.plugins.jira-dnd-attachment-plugin:jira-html5-attach-images-resources', location = 'js/ctrlv/issue-paste.js' */
define("dndattachment/ctrlv/issue-paste",["jquery","dndattachment/ctrlv/trace","dndattachment/ctrlv/tracking","dndattachment/ctrlv/utility","dndattachment/ctrlv/html5","dndattachment/ctrlv/base64decode","jira/dialog/dialog","jira/util/events","dndattachment/util/events/types","exports"],function(t,e,n,a,i,r,o,u,c,s){"use strict";function l(t,e){e.stateName=t;var n=function(){var n=e.apply(null,arguments);return n.stateName=t,n};return n.stateName=t,n}function d(t,e,n){return l(t,function(){var a=setTimeout(function(){f(_)},n),i=e.apply(null,arguments),r=function(t,e){var n=i(t,e);if(n)return clearTimeout(a),n};return r.stateName=t,r})}function f(t,e){if(f.eventQueue)return void f.eventQueue.push({type:t,object:e});for(f.eventQueue=[{type:t,object:e}];f.eventQueue.length>0;){var n=f.eventQueue.splice(0,1)[0],a=A(n.type,n.object);a&&(A=a)}delete f.eventQueue}var g=0,E=1,v=2,m=3,p=4,h=5,I=6,T=7,w=8,_=9,N=l("idle",function(){function i(e){if(!t(e.target).is(":input:not(.wiki-textfield, #summary)")&&!a.isContentEditable(e.target))return!0}return function(r,o){if(r==g&&a.isKeyPasteEvent(o)){if(a.browserIsNativePaste()||!i(o)||!a.browserIsSupported())return;return n.trigger("attach.screenshot.html5.catchClipboard"),new D(o)}if(r==E){if(a.isImagePasteEvent(o))return n.trigger("attach.screenshot.html5.handlePaste"),i(o)?(t(o.target).is(":input.wiki-textfield")&&o.preventDefault(),new L(o)):void e("jira/attach-images-plugin/pasteIgnored");e("jira/attach-images-plugin/pasteIgnoredNotImage")}}}),D=d("catchClipboard",function(e){function n(){o.remove()}var i=document.activeElement;e.selectionStart=e.target.selectionStart,e.selectionEnd=e.target.selectionEnd;var o=t('<div contenteditable="true" class="attach-screenshot-paste-catcher"></div>').appendTo("body");return o.focus(),t(i).is(":focusable:input,:aui-focusable:input")&&setTimeout(function(){i.focus()}),function(t,u){if(t==E){if(a.isImagePasteEvent(u))return n(),u.target=i,new L(u);if(a.isHtmlImagePasteEvent(u))return n(),u.target=i,new b(u);if(a.isTextPasteEvent(u)){n();var c=a.getTextPasteContent(u);return a.insertToInput(c,e.target,e.selectionStart,e.selectionEnd),u.preventDefault(),new N}}if(t==_){n();var s=o.find(">img");if(s.is(":only-child")){var l=s.attr("src");if(0===l.toLowerCase().indexOf("http"))return N();var d=r.decodeBase64DataUri(l),f=new Blob([d],{type:"image/png"});return new O(f,e)}var g=a.getTextContent(o[0]);return a.insertToInput(g,e.target,e.selectionStart,e.selectionEnd),N()}}}),b=l("imageLoading",function(t){var e=a.getHtmlImagePaste(t);return e?a.loadImage(e).then(function(t){f(p,t)},f.bind(null,h)):f(h),function(e,n){if(e==p){var i=a.convertImageToBlob(n);return i?new O(i,t):new N}if(e==_||e==h)return new N}}),L=d("fileLoading",function(t){return i.getFileFromEvent(t).done(function(t){f(v,t)}).fail(function(){f(m)}),function(e,n){return e==v?new O(n,t):e==m||e==_?new N:void 0}},1e3),O=l("attachImage",function(e,n){var i=n.target,r=a.generateFileName()+".png",o=a.convertBlobToImage(e,r);return u.trigger(c.ATTACHMENT_FOR_PAGE_RECEIVED,{files:[o],isWikiTextfieldFocused:a.isWikiTextfield(t(i)),wikiTextfield:i,isPaste:!0,successCallback:function(){f(I)}}),function(t,e){return new N}}),A=new N;s._getStateMap=function(){return{events:{EVENT_WINDOW_KEYDOWN:g,EVENT_WINDOW_PASTE:E,EVENT_FILE_LOADED:v,EVENT_FILE_LOAD_ERROR:m,EVENT_IMAGE_LOADED:p,EVENT_IMAGE_LOAD_ERROR:h,EVENT_DIALOG_LOADED:I,EVENT_DIALOG_CLOSED:T,EVENT_DIALOG_CANCELED:w,EVENT_TIMEOUT:_},states:{StateIdle:N,StateCatchClipboard:D,StateImageLoading:b,StateFileLoading:L,StateAttachImage:O}}},s.initIssuePaste=function(){t(window).on("keydown",function(t){f(g,t)}),t(window).on("paste",function(t){f(E,a.normalizePasteEvent(t))}),u.bind("Dialog.hide",function(t,e,n){n?f(w,e):f(T,e)})}});;
;
/* module-key = 'com.atlassian.jira.plugins.jira-dnd-attachment-plugin:jira-html5-attach-images-resources', location = 'js/ctrlv/trace.js' */
define("dndattachment/ctrlv/trace",[],function(){"use strict";return function(){return JIRA.trace.apply(void 0,arguments)}});;
;
/* module-key = 'com.atlassian.jira.plugins.jira-dnd-attachment-plugin:jira-html5-attach-images-resources', location = 'js/ctrlv/tracking.js' */
define("dndattachment/ctrlv/tracking",["exports"],function(t){"use strict";t.trigger=function(t,n){AJS.trigger("analytics",{name:t,data:n||{}})}});;
;
/* module-key = 'com.atlassian.jira.plugins.jira-dnd-attachment-plugin:jira-html5-attach-images-resources', location = 'js/ctrlv/executor.js' */
define("dndattachment/ctrlv/executor",["jquery","jira/util/events","dndattachment/ctrlv/html5","dndattachment/upload/handler","exports"],function(e,t,n,r,a){a.register=function(){var a={name:"JIRA Ctrl+V attachment executor",weight:5,isValid:function(e,t){return!!t.isPaste},processFiles:function(r,a){var c=e.Deferred();return n.show().done(function(n){var a=e("#attach-screenshot-placeholder-message"),i=e.Event("paste");i.clipboardData={files:r},a.focus(),setTimeout(function(){a.trigger(i)}),t.bind("Dialog.hide",function(e,t,n){n?c.reject():c.resolve([t.find("#attachscreenshotname").val()+".png"])})}),c}};r.registerExecutor(a)}});;
;
/* module-key = 'com.atlassian.jira.plugins.jira-dnd-attachment-plugin:jira-html5-attach-images-resources', location = 'js/ctrlv/initialize.js' */
define("dndattachment/ctrlv/initialize",["jquery","underscore","dndattachment/ctrlv/utility","dndattachment/ctrlv/html5","dndattachment/ctrlv/issue-paste","dndattachment/ctrlv/tracking","dndattachment/ctrlv/executor","jira/dialog/dialog-register","jira/dialog/form-dialog","exports"],function(t,e,n,i,a,r,o,c,s,d){"use strict";d.init=function(){var n=s.extend({options:{}});JIRA.ScreenshotDialog=n,a.initIssuePaste(),t(document).ready(function(){var a=t.Deferred();a.resolve(),c.attachScreenshotDialog=new n({id:"attach-screenshot-dialog",trigger:"a.issueaction-attach-screenshot-html5",isIssueDialog:!0,onContentRefresh:function(){this.$form.bind("before-submit",function(n){var a=i.validateFormData(i.screenshotFileUpload,t.trim(i.dialogView.getFileNameInput().val()));return 0==i.dialogView.getFileSize()?(n.preventDefault(),!1):!!e.isEmpty(a)||(i.dialogView.displayErrors(a),n.preventDefault(),!1)})},delayShowUntil:function(){return a}}),t(document).bind("dialogContentReady",function(t,e){e===c.attachScreenshotDialog&&null!==document.getElementById("attach-screenshot-form")&&(r.trigger("attach.screenshot.html5.contentReady"),i.initScreenshotPasteHandler())}),t(document).ready(function(){t(document).on("click","#attach-screenshot-html5",function(){r.trigger("attach.screenshot.html5.display")})})}),o.register()}}),require(["dndattachment/ctrlv/initialize","jquery"],function(t,e){"use strict";e(function(){t.init()})});;
;
/* module-key = 'com.atlassian.jira.plugins.jira-dnd-attachment-plugin:dnd-amd', location = 'js/jira-amd.js' */
define("dndattachment/JIRA",function(){return JIRA});;
;
/* module-key = 'com.atlassian.jira.plugins.jira-dnd-attachment-plugin:dnd-amd', location = 'js/aui-amd.js' */
define("dndattachment/aui",function(){return AJS});;
;
/* module-key = 'com.atlassian.jira.plugins.jira-dnd-attachment-plugin:attachment-menu-link-init', location = 'js/menu/initAttachmentMenuLink.js' */
require(["jquery","dndattachment/aui","jira/util/events","dndattachment/util/events/types","dndattachment/integration-register","dndattachment/upload/handler"],function(t,n,e,a,i,c){var l="issueaction-attach-file",u=function(t){t.addClass(l),t.click()},r=function(){var n=t('<input type="file" multiple />');n.change(function(t){e.trigger(a.ATTACHMENT_FOR_PAGE_RECEIVED,{files:n[0].files})}),n.click()},s=function(t){return!!t.data("issuekey")},d=function(e){var a=t(e.target);if(n.trigger("analytics",{name:"issue.dnd.attachment.opsbar.attachFiles.linkClick",data:{}}),!a.hasClass(l)){e.preventDefault();var i=t(".issue-drop-zone").length;i&&!s(a)?r():u(a)}},f=function(){t(document).on("click",".unified-attach-file",function(t){var n=i.getAttachmentMenuHandler();"function"==typeof n&&c.isDefaultExecutor({})?n.call(null,t):d.call(null,t)})},o=function(){f()};t.isReady?o():n.$(o)});;
;
/* module-key = 'com.atlassian.plugin.jslibs:bluebird-2.3.6', location = 'libs/bluebird/2.3.6/bluebird-2.3.6.js' */
/*
 The MIT License (MIT)

 Copyright (c) 2014 Petka Antonov

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:</p>

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.

*/
(function(r){define("atlassian/libs/bluebird-2.3.6",function(){var t={};r(t);return"undefined"!==typeof exports?module.exports.noConflict():t.Promise.noConflict()})})(function(r){var t=function(){return function d(o,b,a){function k(f,j){if(!b[f]){if(!o[f]){var l="function"==typeof require&&require;if(!j&&l)return l(f,!0);if(m)return m(f,!0);throw Error("Cannot find module '"+f+"'");}l=b[f]={exports:{}};o[f][0].call(l.exports,function(a){var h=o[f][1][a];return k(h?h:a)},l,l.exports,d,o,b,a)}return b[f].exports}
for(var m="function"==typeof require&&require,i=0;i<a.length;i++)k(a[i]);return k}({1:[function(d,o){o.exports=function(b){function a(a){var a=new k(a),b=a.promise();if(b.isRejected())return b;a.setHowMany(1);a.setUnwrap();a.init();return b}var k=b._SomePromiseArray;b.any=function(b){return a(b)};b.prototype.any=function(){return a(this)}}},{}],2:[function(d,o){function b(){this._isTickUsed=!1;this._schedule=a;this._length=0;this._lateBuffer=new k(16);this._functionBuffer=new k(65536);var b=this;
this.consumeFunctionBuffer=function(){b._consumeFunctionBuffer()}}var a=d("./schedule.js"),k=d("./queue.js"),m=d("./util.js").errorObj,i=d("./util.js").tryCatch1,f="undefined"!==typeof process?process:void 0;b.prototype.haveItemsQueued=function(){return 0<this._length};b.prototype.invokeLater=function(a,b,n){void 0!==f&&(null!=f.domain&&!a.domain)&&(a=f.domain.bind(a));this._lateBuffer.push(a,b,n);this._queueTick()};b.prototype.invoke=function(a,b,n){void 0!==f&&(null!=f.domain&&!a.domain)&&(a=f.domain.bind(a));
var h=this._functionBuffer;h.push(a,b,n);this._length=h.length();this._queueTick()};b.prototype._consumeFunctionBuffer=function(){for(var a=this._functionBuffer;0<a.length();){var b=a.shift(),n=a.shift(),h=a.shift();b.call(n,h)}this._reset();this._consumeLateBuffer()};b.prototype._consumeLateBuffer=function(){for(var a=this._lateBuffer;0<a.length();){var b=a.shift(),n=a.shift(),h=a.shift(),n=i(b,n,h);if(n===m)if(this._queueTick(),null!=b.domain)b.domain.emit("error",n.e);else throw n.e;}};b.prototype._queueTick=
function(){this._isTickUsed||(this._schedule(this.consumeFunctionBuffer),this._isTickUsed=!0)};b.prototype._reset=function(){this._isTickUsed=!1;this._length=0};o.exports=new b},{"./queue.js":25,"./schedule.js":28,"./util.js":35}],3:[function(d,o){var b=d("./promise.js")();o.exports=b},{"./promise.js":20}],4:[function(d,o){var b=Object.create;if(b){var a=b(null),k=b(null);a[" size"]=k[" size"]=0}o.exports=function(b){function i(a){return new Function("obj","                                             \n        'use strict'                                                         \n        var len = this.length;                                               \n        switch(len) {                                                        \n            case 1: return obj.methodName(this[0]);                          \n            case 2: return obj.methodName(this[0], this[1]);                 \n            case 3: return obj.methodName(this[0], this[1], this[2]);        \n            case 0: return obj.methodName();                                 \n            default: return obj.methodName.apply(obj, this);                 \n        }                                                                    \n        ".replace(/methodName/g,
a))}function f(a){return new Function("obj","                                             \n        'use strict';                                                        \n        return obj.propertyName;                                             \n        ".replace("propertyName",a))}function j(a,g,c){var b=c[a];if("function"!==typeof b){if(!q(a))return null;b=g(a);c[a]=b;c[" size"]++;if(512<c[" size"]){a=Object.keys(c);for(g=0;256>g;++g)delete c[a[g]];c[" size"]=a.length-256}}return b}function l(a){return a[this.pop()].apply(a,
this)}function n(a){return a[this]}function h(a){return a[this]}var c=d("./util.js"),e=c.canEvaluate,q=c.isIdentifier;b.prototype.call=function(p){for(var g=arguments.length,c=Array(g-1),b=1;b<g;++b)c[b-1]=arguments[b];if(e&&(g=j(p,i,a),null!==g))return this._then(g,void 0,void 0,c,void 0);c.push(p);return this._then(l,void 0,void 0,c,void 0)};b.prototype.get=function(a){var g;"number"!==typeof a?e?(g=j(a,f,k),g=null!==g?g:n):g=n:g=h;return this._then(g,void 0,void 0,a,void 0)}}},{"./util.js":35}],
5:[function(d,o){o.exports=function(b,a){var k=d("./errors.js"),m=k.canAttach,i=d("./async.js"),f=k.CancellationError;b.prototype._cancel=function(a){if(!this.isCancellable())return this;for(var b,n=this;void 0!==(b=n._cancellationParent)&&b.isCancellable();)n=b;n._attachExtraTrace(a);n._rejectUnchecked(a)};b.prototype.cancel=function(a){if(!this.isCancellable())return this;a=void 0!==a?m(a)?a:Error(a+""):new f;i.invokeLater(this._cancel,this,a);return this};b.prototype.cancellable=function(){if(this._cancellable())return this;
this._setCancellable();this._cancellationParent=void 0;return this};b.prototype.uncancellable=function(){var m=new b(a);m._propagateFrom(this,6);m._follow(this);m._unsetCancellable();return m};b.prototype.fork=function(a,b,n){a=this._then(a,b,n,void 0,void 0);a._setCancellable();a._cancellationParent=void 0;return a}}},{"./async.js":2,"./errors.js":10}],6:[function(d,o){o.exports=function(){function b(a){var b;if("function"===typeof a)b="[function "+(a.name||"anonymous")+"]";else{b=a.toString();if(/\[object [a-zA-Z0-9$_]+\]/.test(b))try{b=
JSON.stringify(a)}catch(c){}0===b.length&&(b="(empty array)")}a=41>b.length?b:b.substr(0,38)+"...";return"(<"+a+">, no stack trace)"}function a(b,h){this.captureStackTrace(a,h)}var k=d("./util.js").inherits,m=d("./es5.js").defineProperty,i=RegExp("\\b(?:[a-zA-Z0-9.]+\\$_\\w+|tryCatch(?:1|2|3|4|Apply)|new \\w*PromiseArray|\\w*PromiseArray\\.\\w*PromiseArray|setTimeout|CatchFilter\\$_\\w+|makeNodePromisified|processImmediate|process._tickCallback|nextTick|Async\\$\\w+)\\b"),f=null,j=null;k(a,Error);
a.prototype.captureStackTrace=function(a,b){l(this,a,b)};a.possiblyUnhandledRejection=function(a){"object"===typeof console&&(a="object"===typeof a||"function"===typeof a?"Possibly unhandled "+j(a.stack,a):"Possibly unhandled "+String(a),"function"===typeof console.error||"object"===typeof console.error?console.error(a):("function"===typeof console.log||"object"===typeof console.log)&&console.log(a))};a.combine=function(a,b){for(var c=a.length-1,e=b.length-1;0<=e;--e)if(a[c]===b[e])a.pop(),c--;else break;
a.push("From previous event:");for(var c=a.concat(b),q=[],e=0,p=c.length;e<p;++e)i.test(c[e])&&f.test(c[e])||0<e&&!f.test(c[e])&&"From previous event:"!==c[e]||q.push(c[e]);return q};a.protectErrorMessageNewlines=function(a){for(var b=0;b<a.length&&!f.test(a[b]);++b);if(!(1>=b)){for(var c=[],e=0;e<b;++e)c.push(a.shift());a.unshift(c.join("\u0002\x00\u0001"))}};a.isSupported=function(){return"function"===typeof l};var l=function h(){if("number"===typeof Error.stackTraceLimit&&"function"===typeof Error.captureStackTrace){f=
/^\s*at\s*/;j=function(a,g){return"string"===typeof a?a:void 0!==g.name&&void 0!==g.message?g.name+". "+g.message:b(g)};var a=Error.captureStackTrace;return function(b,g){a(b,g)}}var e=Error();if("string"===typeof e.stack&&"function"===typeof"".startsWith&&e.stack.startsWith("stackDetection@")&&"stackDetection"===h.name){m(Error,"stackTraceLimit",{writable:!0,enumerable:!1,configurable:!1,value:25});f=/@/;var q=/[@\n]/;j=function(a,g){return"string"===typeof a?g.name+". "+g.message+"\n"+a:void 0!==
g.name&&void 0!==g.message?g.name+". "+g.message:b(g)};return function(a){for(var b=Error().stack.split(q),c=b.length,e="",h=0;h<c;h+=2)e+=b[h],e+="@",e+=b[h+1],e+="\n";a.stack=e}}j=function(a,g){return"string"===typeof a?a:("object"===typeof g||"function"===typeof g)&&void 0!==g.name&&void 0!==g.message?g.name+". "+g.message:b(g)};return null}();return a}},{"./es5.js":12,"./util.js":35}],7:[function(d,o){o.exports=function(b){function a(a,b,c){this._instances=a;this._callback=b;this._promise=c}var k=
d("./util.js"),m=d("./errors.js"),i=k.tryCatch1,f=k.errorObj,j=d("./es5.js").keys,l=m.TypeError;a.prototype.doFilter=function(a){for(var h=this._callback,c=this._promise._boundTo,e=0,q=this._instances.length;e<q;++e){var p=this._instances[e],g=p===Error||null!=p&&p.prototype instanceof Error;if(g&&a instanceof p)return a=i(h,c,a),a===f?(b.e=a.e,b):a;if("function"===typeof p&&!g)if(g={},p=i(p,g,a),p!==f&&j(g).length&&(f.e=new l("Catch filter must inherit from Error or be a simple predicate function"),
p=f),p===f){a=m.canAttach(f.e)?f.e:Error(f.e+"");this._promise._attachExtraTrace(a);a=f.e;break}else if(p)return a=i(h,c,a),a===f?(b.e=a.e,b):a}b.e=a;return b};return a}},{"./errors.js":10,"./es5.js":12,"./util.js":35}],8:[function(d,o){var b=d("./util.js"),a=b.isPrimitive,k=b.wrapsPrimitiveReceiver;o.exports=function(b){var i=function(){return this},f=function(){throw this;},d=function(a,b){if(1===b)return function(){throw a;};if(2===b)return function(){return a}};b.prototype["return"]=b.prototype.thenReturn=
function(b){return k&&a(b)?this._then(d(b,2),void 0,void 0,void 0,void 0):this._then(i,void 0,void 0,b,void 0)};b.prototype["throw"]=b.prototype.thenThrow=function(b){return k&&a(b)?this._then(d(b,1),void 0,void 0,void 0,void 0):this._then(f,void 0,void 0,b,void 0)}}},{"./util.js":35}],9:[function(d,o){o.exports=function(b,a){var k=b.reduce;b.prototype.each=function(b){return k(this,b,null,a)};b.each=function(b,i){return k(b,i,null,a)}}},{}],10:[function(d,o){function b(a,b){function p(c){if(!(this instanceof
p))return new p(c);this.message="string"===typeof c?c:b;this.name=a;Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor)}i(p,Error);return p}function a(a){this.name="OperationalError";this.cause=this.message=a;this.isOperational=!0;a instanceof Error?(this.message=a.message,this.stack=a.stack):Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor)}var k=d("./es5.js").freeze,m=d("./util.js"),i=m.inherits,f=m.notEnumerableProp,j,l,m=b("CancellationError","cancellation error"),
n=b("TimeoutError","timeout error"),h=b("AggregateError","aggregate error");try{j=TypeError,l=RangeError}catch(c){j=b("TypeError","type error"),l=b("RangeError","range error")}for(var e="join pop push shift unshift slice filter forEach some every map indexOf lastIndexOf reduce reduceRight sort reverse".split(" "),q=0;q<e.length;++q)"function"===typeof Array.prototype[e[q]]&&(h.prototype[e[q]]=Array.prototype[e[q]]);h.prototype.length=0;h.prototype.isOperational=!0;var p=0;h.prototype.toString=function(){var a=
Array(4*p+1).join(" "),b="\n"+a+"AggregateError of:\n";p++;for(var a=Array(4*p+1).join(" "),c=0;c<this.length;++c){for(var e=this[c]===this?"[Circular AggregateError]":this[c]+"",e=e.split("\n"),h=0;h<e.length;++h)e[h]=a+e[h];e=e.join("\n");b+=e+"\n"}p--;return b};i(a,Error);e=Error.__BluebirdErrorTypes__;e||(e=k({CancellationError:m,TimeoutError:n,OperationalError:a,RejectionError:a,AggregateError:h}),f(Error,"__BluebirdErrorTypes__",e));o.exports={Error:Error,TypeError:j,RangeError:l,CancellationError:e.CancellationError,
OperationalError:e.OperationalError,TimeoutError:e.TimeoutError,AggregateError:e.AggregateError,originatesFromRejection:function(b){return b==null?false:b instanceof a||b.isOperational===true},markAsOriginatingFromRejection:function(a){try{f(a,"isOperational",true)}catch(b){}},canAttach:function(a){return a instanceof Error}}},{"./es5.js":12,"./util.js":35}],11:[function(d,o){o.exports=function(b){var a=d("./errors.js").TypeError;return function(k){var k=new a(k),m=b.rejected(k),i=m._peekContext();
null!=i&&i._attachExtraTrace(k);return m}}},{"./errors.js":10}],12:[function(d,o){var b=function(){return void 0===this}();if(b)o.exports={freeze:Object.freeze,defineProperty:Object.defineProperty,keys:Object.keys,getPrototypeOf:Object.getPrototypeOf,isArray:Array.isArray,isES5:b};else{var a={}.hasOwnProperty,k={}.toString,m={}.constructor.prototype;o.exports={isArray:function(a){try{return"[object Array]"===k.call(a)}catch(b){return!1}},keys:function(b){var f=[],m;for(m in b)a.call(b,m)&&f.push(m);
return f},defineProperty:function(a,b,m){a[b]=m.value;return a},freeze:function(a){return a},getPrototypeOf:function(a){try{return Object(a).constructor.prototype}catch(b){return m}},isES5:b}}},{}],13:[function(d,o){o.exports=function(b,a){var k=b.map;b.prototype.filter=function(b,d){return k(this,b,d,a)};b.filter=function(b,d,f){return k(b,d,f,a)}}},{}],14:[function(d,o){o.exports=function(b,a,k){function m(){return this}function i(){throw this;}function f(a,b,g){g=h&&c(b)?g?function(){return b}:
function(){throw b;}:g?m:i;return a._then(g,e,void 0,b,void 0)}function j(c){var p=this.promise,g=this.handler,g=p._isBound()?g.call(p._boundTo):g();return void 0!==g&&(g=k(g,void 0),g instanceof b)?f(g,c,p.isFulfilled()):p.isRejected()?(a.e=c,a):c}function l(a){var c=this.promise,g=this.handler,c=c._isBound()?g.call(c._boundTo,a):g(a);return void 0!==c&&(c=k(c,void 0),c instanceof b)?f(c,a,!0):a}var n=d("./util.js"),h=n.wrapsPrimitiveReceiver,c=n.isPrimitive,e=n.thrower;b.prototype._passThroughHandler=
function(a,b){return"function"!==typeof a?this.then():this._then(b?j:l,b?j:void 0,void 0,{promise:this,handler:a},void 0)};b.prototype.lastly=b.prototype["finally"]=function(a){return this._passThroughHandler(a,!0)};b.prototype.tap=function(a){return this._passThroughHandler(a,!1)}}},{"./util.js":35}],15:[function(d,o){o.exports=function(b,a,k,m){function i(a,g){for(var h=c,q=b,n=g.length,l=0;l<n;++l){var f=e(g[l],void 0,a);if(f===h)return q.reject(h.e);f=m(f,i);if(f instanceof q)return f}return null}
function f(a,c,e){(this._promise=new b(k))._setTrace(void 0);this._generatorFunction=a;this._receiver=c;this._generator=void 0;this._yieldHandlers="function"===typeof e?[e].concat(q):q}var j=d("./errors.js"),l=j.TypeError,n=d("./util.js").deprecated,h=d("./util.js"),c=h.errorObj,e=h.tryCatch1,q=[];f.prototype.promise=function(){return this._promise};f.prototype._run=function(){this._generator=this._generatorFunction.call(this._receiver);this._receiver=this._generatorFunction=void 0;this._next(void 0)};
f.prototype._continue=function(a){if(a===c){this._generator=void 0;var e=j.canAttach(a.e)?a.e:Error(a.e+"");this._promise._attachExtraTrace(e);this._promise._reject(a.e,e)}else if(e=a.value,!0===a.done)this._generator=void 0,this._promise._tryFollow(e)||this._promise._fulfill(e);else{a=m(e,void 0);if(!(a instanceof b)&&(a=i(a,this._yieldHandlers),null===a)){this._throw(new l("A value was yielded that could not be treated as a promise"));return}a._then(this._next,this._throw,void 0,this,null)}};f.prototype._throw=
function(a){j.canAttach(a)&&this._promise._attachExtraTrace(a);this._continue(e(this._generator["throw"],this._generator,a))};f.prototype._next=function(a){this._continue(e(this._generator.next,this._generator,a))};b.coroutine=function(a,b){if("function"!==typeof a)throw new l("generatorFunction must be a function");var c=Object(b).yieldHandler;return function(){var b=a.apply(this,arguments),e=new f(void 0,void 0,c);e._generator=b;e._next(void 0);return e.promise()}};b.coroutine.addYieldHandler=function(a){if("function"!==
typeof a)throw new l("fn must be a function");q.push(a)};b.spawn=function(c){n("Promise.spawn is deprecated. Use Promise.coroutine instead.");if("function"!==typeof c)return a("generatorFunction must be a function");var c=new f(c,this),e=c.promise();c._run(b.spawn);return e}}},{"./errors.js":10,"./util.js":35}],16:[function(d,o){o.exports=function(b,a,k,m){var i=d("./util.js"),f=i.canEvaluate,j=i.tryCatch1,l=i.errorObj;if(f){for(var i=function(a){for(var b=[],c=1;c<=a;++c)b.push("holder.p"+c);return new Function("holder",
"                                      \n            'use strict';                                                    \n            var callback = holder.fn;                                        \n            return callback(values);                                         \n            ".replace(/values/g,b.join(", ")))},n=[],h=[void 0],c=1;5>=c;++c)n.push(new Function("value","holder","                             \n            'use strict';                                                    \n            holder.pIndex = value;                                           \n            holder.checkFulfillment(this);                                   \n            ".replace(/Index/g,
c))),h.push(i(c));var e=function(a,b){this.p1=this.p2=this.p3=this.p4=this.p5=null;this.fn=b;this.total=a;this.now=0};e.prototype.callers=h;e.prototype.checkFulfillment=function(a){var b=this.now;b++;var c=this.total;b>=c?(b=j(this.callers[c],void 0,this),b===l?a._rejectUnchecked(b.e):a._tryFollow(b)||a._fulfillUnchecked(b)):this.now=b}}b.join=function(){var c=arguments.length-1,h;if(0<c&&"function"===typeof arguments[c]&&(h=arguments[c],6>c&&f)){var g=new b(m);g._setTrace(void 0);h=new e(c,h);for(var l=
g._reject,d=n,i=0;i<c;++i){var j=k(arguments[i],void 0);j instanceof b?j.isPending()?j._then(d[i],l,void 0,g,h):j.isFulfilled()?d[i].call(g,j._settledValue,h):(g._reject(j._settledValue),j._unsetRejectionIsUnhandled()):d[i].call(g,j,h)}return g}c=arguments.length;g=Array(c);for(l=0;l<c;++l)g[l]=arguments[l];g=(new a(g)).promise();return void 0!==h?g.spread(h):g}}},{"./util.js":35}],17:[function(d,o){o.exports=function(b,a,k,m,i){function f(a,b,c,h){this.constructor$(a);this._callback=b;this._preservedValues=
h===i?Array(this.length()):null;this._limit=c;this._inFlight=0;this._queue=1<=c?[]:e;this._init$(void 0,-2)}function j(a,b,c,e){c="object"===typeof c&&null!==c?c.concurrency:0;c="number"===typeof c&&isFinite(c)&&1<=c?c:0;return new f(a,b,c,e)}var l=d("./util.js"),n=l.tryCatch3,h=l.errorObj,c={},e=[];l.inherits(f,a);f.prototype._init=function(){};f.prototype._promiseFulfilled=function(a,e){var g=this._values;if(null!==g){var l=this.length(),f=this._preservedValues,d=this._limit;if(g[e]===c){if(g[e]=
a,1<=d&&(this._inFlight--,this._drainQueue(),this._isResolved()))return}else{if(1<=d&&this._inFlight>=d){g[e]=a;this._queue.push(e);return}null!==f&&(f[e]=a);var k=n(this._callback,this._promise._boundTo,a,e,l);if(k===h)return this._reject(k.e);var i=m(k,void 0);if(i instanceof b){if(i.isPending())return 1<=d&&this._inFlight++,g[e]=c,i._proxyPromiseArray(this,e);if(i.isFulfilled())k=i.value();else return i._unsetRejectionIsUnhandled(),this._reject(i.reason())}g[e]=k}++this._totalResolved>=l&&(null!==
f?this._filter(g,f):this._resolve(g))}};f.prototype._drainQueue=function(){for(var a=this._queue,b=this._limit,c=this._values;0<a.length&&this._inFlight<b;){var e=a.pop();this._promiseFulfilled(c[e],e)}};f.prototype._filter=function(a,b){for(var c=b.length,e=Array(c),h=0,l=0;l<c;++l)a[l]&&(e[h++]=b[l]);e.length=h;this._resolve(e)};f.prototype.preservedValues=function(){return this._preservedValues};b.prototype.map=function(a,b){return"function"!==typeof a?k("fn must be a function"):j(this,a,b,null).promise()};
b.map=function(a,b,c,e){return"function"!==typeof b?k("fn must be a function"):j(a,b,c,e).promise()}}},{"./util.js":35}],18:[function(d,o){o.exports=function(b){function a(a){throw a;}function k(b,e){if(!f.isArray(b))return m(b,e);var l=f.tryCatchApply(this,[null].concat(b),e);l===h&&j.invokeLater(a,void 0,l.e)}function m(b,e){var f=void 0===b?n(this,e,null):l(this,e,null,b);f===h&&j.invokeLater(a,void 0,f.e)}function i(b,e){var l=n(this,e,b);l===h&&j.invokeLater(a,void 0,l.e)}var f=d("./util.js"),
j=d("./async.js"),l=f.tryCatch2,n=f.tryCatch1,h=f.errorObj;b.prototype.nodeify=function(a,b){if("function"==typeof a){var h=m;void 0!==b&&Object(b).spread&&(h=k);this._then(h,i,void 0,a,this._boundTo)}return this}}},{"./async.js":2,"./util.js":35}],19:[function(d,o){o.exports=function(b,a){var k=d("./util.js"),m=d("./async.js"),i=d("./errors.js"),f=k.tryCatch1,j=k.errorObj;b.prototype.progressed=function(a){return this._then(void 0,void 0,a,void 0,void 0)};b.prototype._progress=function(a){this._isFollowingOrFulfilledOrRejected()||
this._progressUnchecked(a)};b.prototype._clearFirstHandlerData$Base=b.prototype._clearFirstHandlerData;b.prototype._clearFirstHandlerData=function(){this._clearFirstHandlerData$Base();this._progressHandler0=void 0};b.prototype._progressHandlerAt=function(a){return 0===a?this._progressHandler0:this[(a<<2)+a-5+2]};b.prototype._doProgressWith=function(a){var n=a.promise,a=f(a.handler,a.receiver,a.value);if(a===j){if(null!=a.e&&"StopProgressPropagation"!==a.e.name){var h=i.canAttach(a.e)?a.e:Error(a.e+
"");n._attachExtraTrace(h);n._progress(a.e)}}else a instanceof b?a._then(n._progress,null,null,n,void 0):n._progress(a)};b.prototype._progressUnchecked=function(f){if(this.isPending())for(var n=this._length(),h=this._progress,c=0;c<n;c++){var e=this._progressHandlerAt(c),d=this._promiseAt(c);if(d instanceof b)"function"===typeof e?m.invoke(this._doProgressWith,this,{handler:e,promise:d,receiver:this._receiverAt(c),value:f}):m.invoke(h,d,f);else{var p=this._receiverAt(c);"function"===typeof e?e.call(p,
f,d):p instanceof b&&p._isProxied()?p._progressUnchecked(f):p instanceof a&&p._promiseProgressed(f,d)}}}}},{"./async.js":2,"./errors.js":10,"./util.js":35}],20:[function(d,o){var b;"undefined"!==typeof Promise&&(b=Promise);o.exports=function(){function a(b){if("function"!==typeof b)throw new s("the promise constructor requires a resolver function");if(this.constructor!==a)throw new s("the promise constructor cannot be invoked directly");this._bitField=0;this._boundTo=this._settledValue=this._receiver0=
this._promise0=this._rejectionHandler0=this._fulfillmentHandler0=void 0;b!==l&&this._resolveFromResolver(b)}function k(a){return a[0]}function m(){return new a.PromiseInspection(this)}var i=d("./util.js"),f=d("./async.js"),j=d("./errors.js"),l=function(){},n={},h={e:null},c=d("./thenables.js")(a,l),e=d("./promise_array.js")(a,l,c),q=d("./captured_trace.js")(),p=d("./catch_filter.js")(h),g=d("./promise_resolver.js"),o=i.isArray,u=i.errorObj,z=i.tryCatch1,D=i.tryCatch2,B=i.tryCatchApply,G=j.RangeError,
s=j.TypeError,H=j.CancellationError,I=j.TimeoutError,E=j.OperationalError,J=j.originatesFromRejection,F=j.markAsOriginatingFromRejection,x=j.canAttach,r=i.thrower,y=d("./errors_api_rejection")(a),t=function(){return new s("circular promise resolution chain")};a.prototype.bind=function(b){var e=c(b,void 0),h=new a(l);e instanceof a?(b=e.then(function(a){h._setBoundTo(a)}),b=a.all([this,b]).then(k),h._follow(b)):(h._follow(this),h._setBoundTo(b));h._propagateFrom(this,3);return h};a.prototype.toString=
function(){return"[object Promise]"};a.prototype.caught=a.prototype["catch"]=function(b){var c=arguments.length;if(1<c){var e=Array(c-1),h=0,g;for(g=0;g<c-1;++g){var f=arguments[g];if("function"===typeof f)e[h++]=f;else return c=new s("A catch filter must be an error constructor or a filter function"),this._attachExtraTrace(c),a.reject(c)}e.length=h;b=arguments[g];this._resetTrace();c=new p(e,b,this);return this._then(void 0,c.doFilter,void 0,c,void 0)}return this._then(void 0,b,void 0,void 0,void 0)};
a.prototype.reflect=function(){return this._then(m,m,void 0,this,void 0)};a.prototype.then=function(a,b,c){return this._then(a,b,c,void 0,void 0)};a.prototype.done=function(a,b,c){this._then(a,b,c,void 0,void 0)._setIsFinal()};a.prototype.spread=function(a,b){return this._then(a,b,void 0,n,void 0)};a.prototype.isCancellable=function(){return!this.isResolved()&&this._cancellable()};a.prototype.toJSON=function(){var a={isFulfilled:!1,isRejected:!1,fulfillmentValue:void 0,rejectionReason:void 0};this.isFulfilled()?
(a.fulfillmentValue=this._settledValue,a.isFulfilled=!0):this.isRejected()&&(a.rejectionReason=this._settledValue,a.isRejected=!0);return a};a.prototype.all=function(){return(new e(this)).promise()};a.is=function(b){return b instanceof a};a.all=function(a){return(new e(a)).promise()};a.prototype.error=function(a){return this.caught(J,a)};a.prototype._resolveFromSyncValue=function(b){if(b===u)this._cleanValues(),this._setRejected(),this._settledValue=b.e,this._ensurePossibleRejectionHandled();else{var e=
c(b,void 0);e instanceof a?this._follow(e):(this._cleanValues(),this._setFulfilled(),this._settledValue=b)}};a.method=function(b){if("function"!==typeof b)throw new s("fn must be a function");return function(){var c;switch(arguments.length){case 0:c=z(b,this,void 0);break;case 1:c=z(b,this,arguments[0]);break;case 2:c=D(b,this,arguments[0],arguments[1]);break;default:c=arguments.length;for(var e=Array(c),h=0;h<c;++h)e[h]=arguments[h];c=B(b,e,this)}e=new a(l);e._setTrace(void 0);e._resolveFromSyncValue(c);
return e}};a.attempt=a["try"]=function(b,c,e){if("function"!==typeof b)return y("fn must be a function");b=o(c)?B(b,c,e):z(b,e,c);c=new a(l);c._setTrace(void 0);c._resolveFromSyncValue(b);return c};a.defer=a.pending=function(){var b=new a(l);b._setTrace(void 0);return new g(b)};a.bind=function(b){var e=c(b,void 0),h=new a(l);h._setTrace(void 0);e instanceof a?(b=e.then(function(a){h._setBoundTo(a)}),h._follow(b)):(h._setBoundTo(b),h._setFulfilled());return h};a.cast=function(b){b=c(b,void 0);if(!(b instanceof
a)){var e=b,b=new a(l);b._setTrace(void 0);b._setFulfilled();b._cleanValues();b._settledValue=e}return b};a.resolve=a.fulfilled=a.cast;a.reject=a.rejected=function(b){var c=new a(l);c._setTrace(void 0);F(b);c._cleanValues();c._setRejected();c._settledValue=b;x(b)||c._setCarriedStackTrace(Error(b+""));c._ensurePossibleRejectionHandled();return c};a.onPossiblyUnhandledRejection=function(a){q.possiblyUnhandledRejection="function"===typeof a?a:void 0};var C;a.onUnhandledRejectionHandled=function(a){C=
"function"===typeof a?a:void 0};var v=!!("undefined"!==typeof process&&"string"===typeof process.execPath&&"object"===typeof process.env&&(process.env.BLUEBIRD_DEBUG||"development"===process.env.NODE_ENV));a.longStackTraces=function(){if(f.haveItemsQueued()&&!1===v)throw Error("cannot enable long stack traces after promises have been created");v=q.isSupported()};a.hasLongStackTraces=function(){return v&&q.isSupported()};a.prototype._then=function(b,c,e,h,g){var p=void 0!==g,g=p?g:new a(l);p||(v&&
(p=this._peekContext()===this._traceParent,g._traceParent=p?this._traceParent:this),g._propagateFrom(this,7));b=this._addCallbacks(b,c,e,g,h);this.isResolved()&&f.invoke(this._queueSettleAt,this,b);return g};a.prototype._length=function(){return this._bitField&262143};a.prototype._isFollowingOrFulfilledOrRejected=function(){return 0<(this._bitField&939524096)};a.prototype._isFollowing=function(){return 536870912===(this._bitField&536870912)};a.prototype._setLength=function(a){this._bitField=this._bitField&
-262144|a&262143};a.prototype._setFulfilled=function(){this._bitField|=268435456};a.prototype._setRejected=function(){this._bitField|=134217728};a.prototype._setFollowing=function(){this._bitField|=536870912};a.prototype._setIsFinal=function(){this._bitField|=33554432};a.prototype._isFinal=function(){return 0<(this._bitField&33554432)};a.prototype._cancellable=function(){return 0<(this._bitField&67108864)};a.prototype._setCancellable=function(){this._bitField|=67108864};a.prototype._unsetCancellable=
function(){this._bitField&=-67108865};a.prototype._setRejectionIsUnhandled=function(){this._bitField|=2097152};a.prototype._unsetRejectionIsUnhandled=function(){this._bitField&=-2097153;this._isUnhandledRejectionNotified()&&(this._unsetUnhandledRejectionIsNotified(),this._notifyUnhandledRejectionIsHandled())};a.prototype._isRejectionUnhandled=function(){return 0<(this._bitField&2097152)};a.prototype._setUnhandledRejectionIsNotified=function(){this._bitField|=524288};a.prototype._unsetUnhandledRejectionIsNotified=
function(){this._bitField&=-524289};a.prototype._isUnhandledRejectionNotified=function(){return 0<(this._bitField&524288)};a.prototype._setCarriedStackTrace=function(a){this._bitField|=1048576;this._fulfillmentHandler0=a};a.prototype._unsetCarriedStackTrace=function(){this._bitField&=-1048577;this._fulfillmentHandler0=void 0};a.prototype._isCarryingStackTrace=function(){return 0<(this._bitField&1048576)};a.prototype._getCarriedStackTrace=function(){return this._isCarryingStackTrace()?this._fulfillmentHandler0:
void 0};a.prototype._receiverAt=function(a){a=0===a?this._receiver0:this[(a<<2)+a-5+4];return this._isBound()&&void 0===a?this._boundTo:a};a.prototype._promiseAt=function(a){return 0===a?this._promise0:this[(a<<2)+a-5+3]};a.prototype._fulfillmentHandlerAt=function(a){return 0===a?this._fulfillmentHandler0:this[(a<<2)+a-5+0]};a.prototype._rejectionHandlerAt=function(a){return 0===a?this._rejectionHandler0:this[(a<<2)+a-5+1]};a.prototype._addCallbacks=function(a,b,c,e,h){var g=this._length();262138<=
g&&(g=0,this._setLength(0));if(0===g){if(this._promise0=e,void 0!==h&&(this._receiver0=h),"function"===typeof a&&!this._isCarryingStackTrace()&&(this._fulfillmentHandler0=a),"function"===typeof b&&(this._rejectionHandler0=b),"function"===typeof c)this._progressHandler0=c}else{var f=(g<<2)+g-5;this[f+3]=e;this[f+4]=h;this[f+0]="function"===typeof a?a:void 0;this[f+1]="function"===typeof b?b:void 0;this[f+2]="function"===typeof c?c:void 0}this._setLength(g+1);return g};a.prototype._setProxyHandlers=
function(a,b){var c=this._length();262138<=c&&(c=0,this._setLength(0));if(0===c)this._promise0=b,this._receiver0=a;else{var e=(c<<2)+c-5;this[e+3]=b;this[e+4]=a;this[e+0]=this[e+1]=this[e+2]=void 0}this._setLength(c+1)};a.prototype._proxyPromiseArray=function(a,b){this._setProxyHandlers(a,b)};a.prototype._proxyPromise=function(a){a._setProxied();this._setProxyHandlers(a,-15)};a.prototype._setBoundTo=function(a){void 0!==a?(this._bitField|=8388608,this._boundTo=a):this._bitField&=-8388609};a.prototype._isBound=
function(){return 8388608===(this._bitField&8388608)};a.prototype._resolveFromResolver=function(a){var b=this;this._setTrace(void 0);this._pushContext();a=D(a,void 0,function(a){b._tryFollow(a)||b._fulfill(a)},function(a){var c=x(a)?a:Error(a+"");b._attachExtraTrace(c);F(a);b._reject(a,c===a?void 0:c)});this._popContext();if(void 0!==a&&a===u){var a=a.e,c=x(a)?a:Error(a+"");b._reject(a,c)}};a.prototype._spreadSlowCase=function(a,b,c,h){c=(new e(c)).promise()._then(function(){return a.apply(h,arguments)},
void 0,void 0,n,void 0);b._follow(c)};a.prototype._callSpread=function(b,e,h){var g=this._boundTo;if(o(h))for(var f=0,p=h.length;f<p;++f)if(c(h[f],void 0)instanceof a){this._spreadSlowCase(b,e,h,g);return}e._pushContext();return B(b,h,g)};a.prototype._callHandler=function(a,b,c,e){b===n&&!this.isRejected()?a=this._callSpread(a,c,e):(c._pushContext(),a=z(a,b,e));c._popContext();return a};a.prototype._settlePromiseFromHandler=function(b,e,g,f){f instanceof a?(b=this._callHandler(b,e,f,g),f._isFollowing()||
(b===u||b===f||b===h?(g=b===f?t():b.e,e=x(g)?g:Error(g+""),b!==h&&f._attachExtraTrace(e),f._rejectUnchecked(g,e)):(g=c(b,f),g instanceof a?(g.isRejected()&&(!g._isCarryingStackTrace()&&!x(g._settledValue))&&(e=Error(g._settledValue+""),f._attachExtraTrace(e),g._setCarriedStackTrace(e)),f._follow(g),f._propagateFrom(g,1)):f._fulfillUnchecked(b)))):b.call(e,g,f)};a.prototype._follow=function(a){this._setFollowing();a.isPending()?(this._propagateFrom(a,1),a._proxyPromise(this)):a.isFulfilled()?this._fulfillUnchecked(a._settledValue):
this._rejectUnchecked(a._settledValue,a._getCarriedStackTrace());a._isRejectionUnhandled()&&a._unsetRejectionIsUnhandled();v&&null==a._traceParent&&(a._traceParent=this)};a.prototype._tryFollow=function(b){if(this._isFollowingOrFulfilledOrRejected()||b===this)return!1;b=c(b,void 0);if(!(b instanceof a))return!1;this._follow(b);return!0};a.prototype._resetTrace=function(){v&&(this._trace=new q(void 0===this._peekContext()))};a.prototype._setTrace=function(a){if(v){var b=this._peekContext();this._traceParent=
b;this._trace=void 0!==a&&a._traceParent===b?a._trace:new q(void 0===b)}return this};a.prototype._attachExtraTrace=function(a){if(v){var b=this,c=a.stack,c="string"===typeof c?c.split("\n"):[];q.protectErrorMessageNewlines(c);for(var e=1;null!=b&&null!=b._trace;)c=q.combine(c,b._trace.stack.split("\n")),b=b._traceParent,e++;b=((Error.stackTraceLimit||10)+1)*e;e=c.length;e>b&&(c.length=b);0<e&&(c[0]=c[0].split("\u0002\x00\u0001").join("\n"));a.stack=1>=c.length?"(No stack trace)":c.join("\n")}};a.prototype._cleanValues=
function(){this._cancellable()&&(this._cancellationParent=void 0)};a.prototype._propagateFrom=function(a,b){0<(b&1)&&a._cancellable()&&(this._setCancellable(),this._cancellationParent=a);0<(b&4)&&this._setBoundTo(a._boundTo);0<(b&2)&&this._setTrace(a)};a.prototype._fulfill=function(a){this._isFollowingOrFulfilledOrRejected()||this._fulfillUnchecked(a)};a.prototype._reject=function(a,b){this._isFollowingOrFulfilledOrRejected()||this._rejectUnchecked(a,b)};a.prototype._settlePromiseAt=function(b){var c=
this.isFulfilled()?this._fulfillmentHandlerAt(b):this._rejectionHandlerAt(b),h=this._settledValue,g=this._receiverAt(b),f=this._promiseAt(b);if("function"===typeof c)this._settlePromiseFromHandler(c,g,h,f);else{var c=!1,p=this.isFulfilled();void 0!==g&&(g instanceof a&&g._isProxied()?(g._unsetProxied(),p?g._fulfillUnchecked(h):g._rejectUnchecked(h,this._getCarriedStackTrace()),c=!0):g instanceof e&&(p?g._promiseFulfilled(h,f):g._promiseRejected(h,f),c=!0));c||(p?f._fulfill(h):f._reject(h,this._getCarriedStackTrace()))}4<=
b&&this._queueGC()};a.prototype._isProxied=function(){return 4194304===(this._bitField&4194304)};a.prototype._setProxied=function(){this._bitField|=4194304};a.prototype._unsetProxied=function(){this._bitField&=-4194305};a.prototype._isGcQueued=function(){return-1073741824===(this._bitField&-1073741824)};a.prototype._setGcQueued=function(){this._bitField|=-1073741824};a.prototype._unsetGcQueued=function(){this._bitField&=1073741823};a.prototype._queueGC=function(){this._isGcQueued()||(this._setGcQueued(),
f.invokeLater(this._gc,this,void 0))};a.prototype._gc=function(){for(var a=5*this._length()-5,b=0;b<a;b++)delete this[b];this._clearFirstHandlerData();this._setLength(0);this._unsetGcQueued()};a.prototype._clearFirstHandlerData=function(){this._receiver0=this._promise0=this._rejectionHandler0=this._fulfillmentHandler0=void 0};a.prototype._queueSettleAt=function(a){this._isRejectionUnhandled()&&this._unsetRejectionIsUnhandled();f.invoke(this._settlePromiseAt,this,a)};a.prototype._fulfillUnchecked=
function(a){if(this.isPending()){if(a===this)return a=t(),this._attachExtraTrace(a),this._rejectUnchecked(a,void 0);this._cleanValues();this._setFulfilled();this._settledValue=a;a=this._length();0<a&&f.invoke(this._settlePromises,this,a)}};a.prototype._rejectUncheckedCheckError=function(a){var b=x(a)?a:Error(a+"");this._rejectUnchecked(a,b===a?void 0:b)};a.prototype._rejectUnchecked=function(a,b){if(this.isPending()){if(a===this){var c=t();this._attachExtraTrace(c);return this._rejectUnchecked(c)}this._cleanValues();
this._setRejected();this._settledValue=a;this._isFinal()?f.invokeLater(r,void 0,void 0===b?a:b):(c=this._length(),void 0!==b&&this._setCarriedStackTrace(b),0<c?f.invoke(this._rejectPromises,this,null):this._ensurePossibleRejectionHandled())}};a.prototype._rejectPromises=function(){this._settlePromises();this._unsetCarriedStackTrace()};a.prototype._settlePromises=function(){for(var a=this._length(),b=0;b<a;b++)this._settlePromiseAt(b)};a.prototype._ensurePossibleRejectionHandled=function(){this._setRejectionIsUnhandled();
void 0!==q.possiblyUnhandledRejection&&f.invokeLater(this._notifyUnhandledRejection,this,void 0)};a.prototype._notifyUnhandledRejectionIsHandled=function(){"function"===typeof C&&f.invokeLater(C,void 0,this)};a.prototype._notifyUnhandledRejection=function(){if(this._isRejectionUnhandled()){var a=this._settledValue,b=this._getCarriedStackTrace();this._setUnhandledRejectionIsNotified();void 0!==b&&(this._unsetCarriedStackTrace(),a=b);"function"===typeof q.possiblyUnhandledRejection&&q.possiblyUnhandledRejection(a,
this)}};var A=[];a.prototype._peekContext=function(){var a=A.length-1;if(0<=a)return A[a]};a.prototype._pushContext=function(){v&&A.push(this)};a.prototype._popContext=function(){v&&A.pop()};a.noConflict=function(){var c=a;try{Promise===c&&(Promise=b)}catch(e){}return c};a.setScheduler=function(a){if("function"!==typeof a)throw new s("fn must be a function");f._schedule=a};q.isSupported()||(a.longStackTraces=function(){},v=!1);a._makeSelfResolutionError=t;d("./finally.js")(a,h,c);d("./direct_resolve.js")(a);
d("./synchronous_inspection.js")(a);d("./join.js")(a,e,c,l);a.RangeError=G;a.CancellationError=H;a.TimeoutError=I;a.TypeError=s;a.OperationalError=E;a.RejectionError=E;a.AggregateError=j.AggregateError;i.toFastProperties(a);i.toFastProperties(a.prototype);a.Promise=a;d("./timers.js")(a,l,c);d("./race.js")(a,l,c);d("./call_get.js")(a);d("./generators.js")(a,y,l,c);d("./map.js")(a,e,y,c,l);d("./nodeify.js")(a);d("./promisify.js")(a,l);d("./props.js")(a,e,c);d("./reduce.js")(a,e,y,c,l);d("./settle.js")(a,
e);d("./some.js")(a,e,y);d("./progress.js")(a,e);d("./cancel.js")(a,l);d("./filter.js")(a,l);d("./any.js")(a,e);d("./each.js")(a,l);d("./using.js")(a,y,c);a.prototype=a.prototype;return a}},{"./any.js":1,"./async.js":2,"./call_get.js":4,"./cancel.js":5,"./captured_trace.js":6,"./catch_filter.js":7,"./direct_resolve.js":8,"./each.js":9,"./errors.js":10,"./errors_api_rejection":11,"./filter.js":13,"./finally.js":14,"./generators.js":15,"./join.js":16,"./map.js":17,"./nodeify.js":18,"./progress.js":19,
"./promise_array.js":21,"./promise_resolver.js":22,"./promisify.js":23,"./props.js":24,"./race.js":26,"./reduce.js":27,"./settle.js":29,"./some.js":30,"./synchronous_inspection.js":31,"./thenables.js":32,"./timers.js":33,"./using.js":34,"./util.js":35}],21:[function(d,o){o.exports=function(b,a,k){function m(a){switch(a){case -2:return[];case -3:return{}}}function i(f){var n=this._promise=new b(a),h=void 0;f instanceof b&&(h=f,n._propagateFrom(h,5));n._setTrace(h);this._values=f;this._totalResolved=
this._length=0;this._init(void 0,-2)}var f=d("./errors.js").canAttach,j=d("./util.js").isArray;i.prototype.length=function(){return this._length};i.prototype.promise=function(){return this._promise};i.prototype._init=function n(a,c){var e=k(this._values,void 0);if(e instanceof b)if(this._values=e,e._setBoundTo(this._promise._boundTo),e.isFulfilled()){if(e=e._settledValue,!j(e)){e=new b.TypeError("expecting an array, a promise or a thenable");this.__hardReject__(e);return}}else{e.isPending()?e._then(n,
this._reject,void 0,this,c):(e._unsetRejectionIsUnhandled(),this._reject(e._settledValue));return}else if(!j(e)){e=new b.TypeError("expecting an array, a promise or a thenable");this.__hardReject__(e);return}if(0===e.length)-5===c?this._resolveEmptyArray():this._resolve(m(c));else{for(var f=this.getActualLength(e.length),p=this.shouldCopyValues()?Array(f):this._values,g=!1,d=0;d<f;++d){var i=k(e[d],void 0);i instanceof b?i.isPending()?i._proxyPromiseArray(this,d):(i._unsetRejectionIsUnhandled(),g=
!0):g=!0;p[d]=i}this._values=p;this._length=f;g&&this._scanDirectValues(f)}};i.prototype._settlePromiseAt=function(a){var h=this._values[a];h instanceof b?h.isFulfilled()?this._promiseFulfilled(h._settledValue,a):h.isRejected()&&this._promiseRejected(h._settledValue,a):this._promiseFulfilled(h,a)};i.prototype._scanDirectValues=function(a){for(var b=0;b<a&&!this._isResolved();++b)this._settlePromiseAt(b)};i.prototype._isResolved=function(){return null===this._values};i.prototype._resolve=function(a){this._values=
null;this._promise._fulfill(a)};i.prototype.__hardReject__=i.prototype._reject=function(a){this._values=null;var b=f(a)?a:Error(a+"");this._promise._attachExtraTrace(b);this._promise._reject(a,b)};i.prototype._promiseProgressed=function(a,b){this._isResolved()||this._promise._progress({index:b,value:a})};i.prototype._promiseFulfilled=function(a,b){this._isResolved()||(this._values[b]=a,++this._totalResolved>=this._length&&this._resolve(this._values))};i.prototype._promiseRejected=function(a){this._isResolved()||
(this._totalResolved++,this._reject(a))};i.prototype.shouldCopyValues=function(){return!0};i.prototype.getActualLength=function(a){return a};return i}},{"./errors.js":10,"./util.js":35}],22:[function(d,o){function b(a){return function(b,e){if(null!==a){if(b){var d=k(b),d=d instanceof Error&&l.getPrototypeOf(d)===Error.prototype?new f(d):d;m.markAsOriginatingFromRejection(d);a._attachExtraTrace(d);a._reject(d)}else if(2<arguments.length){for(var d=arguments.length,p=Array(d-1),g=1;g<d;++g)p[g-1]=arguments[g];
a._fulfill(p)}else a._fulfill(e);a=null}}}var a=d("./util.js"),k=a.maybeWrapAsError,m=d("./errors.js"),i=m.TimeoutError,f=m.OperationalError,j=d("./async.js"),a=a.haveGetters,l=d("./es5.js"),n;n=a?function(a){this.promise=a}:function(a){this.promise=a;this.callback=this.asCallback=b(a)};a&&(a={get:function(){return b(this.promise)}},l.defineProperty(n.prototype,"asCallback",a),l.defineProperty(n.prototype,"callback",a));n._nodebackForPromise=b;n.prototype.toString=function(){return"[object PromiseResolver]"};
n.prototype.resolve=n.prototype.fulfill=function(a){if(!(this instanceof n))throw new TypeError("Illegal invocation, resolver resolve/reject must be called within a resolver context. Consider using the promise constructor instead.");var b=this.promise;b._tryFollow(a)||j.invoke(b._fulfill,b,a)};n.prototype.reject=function(a){if(!(this instanceof n))throw new TypeError("Illegal invocation, resolver resolve/reject must be called within a resolver context. Consider using the promise constructor instead.");
var b=this.promise;m.markAsOriginatingFromRejection(a);var e=m.canAttach(a)?a:Error(a+"");b._attachExtraTrace(e);j.invoke(b._reject,b,a);e!==a&&j.invoke(this._setCarriedStackTrace,this,e)};n.prototype.progress=function(a){if(!(this instanceof n))throw new TypeError("Illegal invocation, resolver resolve/reject must be called within a resolver context. Consider using the promise constructor instead.");j.invoke(this.promise._progress,this.promise,a)};n.prototype.cancel=function(){j.invoke(this.promise.cancel,
this.promise,void 0)};n.prototype.timeout=function(){this.reject(new i("timeout"))};n.prototype.isResolved=function(){return this.promise.isResolved()};n.prototype.toJSON=function(){return this.promise.toJSON()};n.prototype._setCarriedStackTrace=function(a){this.promise.isRejected()&&this.promise._setCarriedStackTrace(a)};o.exports=n},{"./async.js":2,"./errors.js":10,"./es5.js":12,"./util.js":35}],23:[function(d,o){o.exports=function(b,a){function k(a){try{return!0===a.__isPromisified__}catch(b){return!1}}
function m(a){return n.isIdentifier(a)?"."+a:"['"+a.replace(/(['\\])/g,"\\$1")+"']"}function i(g,f,d,p,i){for(var p=Math.max(0,("number"===typeof p.length?Math.max(Math.min(p.length,1024),0):0)-1),k=[p],j=Math.max(0,p-1-5),q=p-1;q>=j;--q)q!==p&&k.push(q);for(q=p+1;5>=q;++q)k.push(q);d="string"===typeof d&&n.isIdentifier(d)?d+i:"promisified";return(new Function("Promise","callback","receiver","withAppended","maybeWrapAsError","nodebackForPromise","INTERNAL","                                         \n        var ret = function FunctionName(Parameters) {                        \n            'use strict';                                                    \n            var len = arguments.length;                                      \n            var promise = new Promise(INTERNAL);                             \n            promise._setTrace(void 0);                                       \n            var fn = nodebackForPromise(promise);                            \n            try {                                                            \n                switch(len) {                                                \n                    [CodeForSwitchCase]                                      \n                }                                                            \n            } catch (e) {                                                    \n                var wrapped = maybeWrapAsError(e);                           \n                promise._attachExtraTrace(wrapped);                          \n                promise._reject(wrapped);                                    \n            }                                                                \n            return promise;                                                  \n        };                                                                   \n        ret.__isPromisified__ = true;                                        \n        return ret;                                                          \n        ".replace("FunctionName",
d).replace("Parameters",n.filledRange(p,"_arg","")).replace("[CodeForSwitchCase]",function(){for(var a="",b=0;b<k.length;++b){var c="case "+k[b]+":",e,h=k[b];e=n.filledRange(h,"arguments[","]").join(", ");var h=0<h?", ":"",d=void 0,d="string"===typeof g?"                                                          \n                this.method({{args}}, fn);                                   \n                break;                                                       \n            ".replace(".method",
m(g)):f===l?"                                                         \n                callback.call(this, {{args}}, fn);                           \n                break;                                                       \n            ":void 0!==f?"                                                         \n                callback.call(receiver, {{args}}, fn);                       \n                break;                                                       \n            ":"                                                         \n                callback({{args}}, fn);                                      \n                break;                                                       \n            ";
e=d.replace("{{args}}",e).replace(", ",h);a+=c+e}b="string"===typeof g?"                                                  \n                this.property.apply(this, args);                             \n            ".replace(".property",m(g)):f===l?"                                                  \n                callback.apply(this, args);                                  \n            ":"                                                  \n                callback.apply(receiver, args);                              \n            ";
return a+="                                                             \n        default:                                                             \n            var args = new Array(len + 1);                                   \n            var i = 0;                                                       \n            for (var i = 0; i < len; ++i) {                                  \n               args[i] = arguments[i];                                       \n            }                                                                \n            args[i] = fn;                                                    \n            [CodeForCall]                                                    \n            break;                                                           \n        ".replace("[CodeForCall]",
b)}())))(b,g,f,c,e,h,a)}function f(g,f){function d(){var p=f;f===l&&(p=this);"string"===typeof g&&(g=p[g]);var k=new b(a);k._setTrace(void 0);var i=h(k);try{g.apply(p,c(arguments,i))}catch(m){p=e(m),k._attachExtraTrace(p),k._reject(p)}return k}d.__isPromisified__=!0;return d}function j(a,b,c,e){for(var g=RegExp(b.replace(/([$])/,"\\$")+"$"),h=n.inheritedDataKeys(a),f=[],d=0;d<h.length;++d){var i=h[d],m=a[i],j;if(j="function"===typeof m)if(j=!k(m))j=n.getDataPropertyOrDefault(a,i+b,o),j=!(j&&k(j))&&
c(i,m,a);j&&f.push(i,m)}for(c=0;c<f.length;c+=2)if(h=f[c],g.test(h)){h=h.replace(g,"");for(d=0;d<f.length;d+=2)if(f[d]===h)throw new p("Cannot promisify an API that has normal methods with '"+b+"'-suffix");}g=0;for(c=f.length;g<c;g+=2)h=f[g],d=f[g+1],a[h+b]=e===u?u(h,l,h,d,b):e(d);n.toFastProperties(a);return a}var l={},n=d("./util.js"),h=d("./promise_resolver.js")._nodebackForPromise,c=n.withAppended,e=n.maybeWrapAsError,q=n.canEvaluate,p=d("./errors").TypeError,g=function(a,b){return n.isIdentifier(a)&&
"_"!==a.charAt(0)&&!n.isClass(b)},o={__isPromisified__:!0},u=q?i:f;b.promisify=function(a,b){if("function"!==typeof a)throw new p("fn must be a function");return k(a)?a:u(a,2>arguments.length?l:b,void 0,a)};b.promisifyAll=function(a,b){if("function"!==typeof a&&"object"!==typeof a)throw new p("the target of promisifyAll must be an object or a function");var b=Object(b),c=b.suffix;"string"!==typeof c&&(c="Async");var e=b.filter;"function"!==typeof e&&(e=g);var h=b.promisifier;"function"!==typeof h&&
(h=u);if(!n.isIdentifier(c))throw new RangeError("suffix must be a valid identifier");for(var f=n.inheritedDataKeys(a,{includeHidden:!0}),d=0;d<f.length;++d){var k=a[f[d]];"constructor"!==f[d]&&n.isClass(k)&&(j(k.prototype,c,e,h),j(k,c,e,h))}return j(a,c,e,h)}}},{"./errors":10,"./promise_resolver.js":22,"./util.js":35}],24:[function(d,o){o.exports=function(b,a,k){function m(a){for(var b=n.keys(a),e=b.length,f=Array(2*e),d=0;d<e;++d){var g=b[d];f[d]=a[g];f[d+e]=g}this.constructor$(f)}function i(a){var c=
k(a,void 0);if(l(c))a=c instanceof b?c._then(b.props,void 0,void 0,void 0,void 0):(new m(c)).promise();else return j("cannot await properties of a non-object");c instanceof b&&a._propagateFrom(c,4);return a}var f=d("./util.js"),j=d("./errors_api_rejection")(b),l=f.isObject,n=d("./es5.js");f.inherits(m,a);m.prototype._init=function(){this._init$(void 0,-3)};m.prototype._promiseFulfilled=function(a,b){if(!this._isResolved()&&(this._values[b]=a,++this._totalResolved>=this._length)){for(var e={},f=this.length(),
d=0,g=this.length();d<g;++d)e[this._values[d+f]]=this._values[d];this._resolve(e)}};m.prototype._promiseProgressed=function(a,b){this._isResolved()||this._promise._progress({key:this._values[b+this.length()],value:a})};m.prototype.shouldCopyValues=function(){return!1};m.prototype.getActualLength=function(a){return a>>1};b.prototype.props=function(){return i(this)};b.props=function(a){return i(a)}}},{"./errors_api_rejection":11,"./es5.js":12,"./util.js":35}],25:[function(d,o){function b(a,b,d,f,j){for(var l=
0;l<j;++l)d[l+f]=a[l+b]}function a(a){this._capacity=a;this._front=this._length=0;this._makeCapacity()}a.prototype._willBeOverCapacity=function(a){return this._capacity<a};a.prototype._pushOne=function(a){var b=this.length();this._checkCapacity(b+1);this[this._front+b&this._capacity-1]=a;this._length=b+1};a.prototype.push=function(a,b,d){var f=this.length()+3;if(this._willBeOverCapacity(f))this._pushOne(a),this._pushOne(b),this._pushOne(d);else{var j=this._front+f-3;this._checkCapacity(f);var l=this._capacity-
1;this[j+0&l]=a;this[j+1&l]=b;this[j+2&l]=d;this._length=f}};a.prototype.shift=function(){var a=this._front,b=this[a];this[a]=void 0;this._front=a+1&this._capacity-1;this._length--;return b};a.prototype.length=function(){return this._length};a.prototype._makeCapacity=function(){for(var a=this._capacity,b=0;b<a;++b)this[b]=void 0};a.prototype._checkCapacity=function(a){this._capacity<a&&this._resizeTo(this._capacity<<3)};a.prototype._resizeTo=function(a){var d=this._front,i=this._capacity,f=Array(i),
j=this.length();b(this,0,f,0,i);this._capacity=a;this._makeCapacity();this._front=0;d+j<=i?b(f,d,this,0,j):(a=j-(d+j&i-1),b(f,d,this,0,a),b(f,0,this,a,j-a))};o.exports=a},{}],26:[function(d,o){o.exports=function(b,a,k){function m(d,n){var h=k(d,void 0);if(h instanceof b)return h.then(function(a){return m(a,h)});if(!f(d))return i("expecting an array, a promise or a thenable");var c=new b(a);void 0!==n?c._propagateFrom(n,7):c._setTrace(void 0);for(var e=c._fulfill,q=c._reject,p=0,g=d.length;p<g;++p){var o=
d[p];(void 0!==o||j.call(d,p))&&b.cast(o)._then(e,q,void 0,c,null)}return c}var i=d("./errors_api_rejection.js")(b),f=d("./util.js").isArray,j={}.hasOwnProperty;b.race=function(a){return m(a,void 0)};b.prototype.race=function(){return m(this,void 0)}}},{"./errors_api_rejection.js":11,"./util.js":35}],27:[function(d,o){o.exports=function(b,a,k,m,i){function f(a,c,h,g){this.constructor$(a);this._preservedValues=g===i?[]:null;this._zerothIsAccum=void 0===h;this._gotAccum=!1;this._reducingIndex=this._zerothIsAccum?
1:0;this._valuesPhase=void 0;var a=m(h,void 0),g=!1,f=a instanceof b;f&&(a.isPending()?a._proxyPromiseArray(this,-1):a.isFulfilled()?(h=a.value(),this._gotAccum=!0):(a._unsetRejectionIsUnhandled(),this._reject(a.reason()),g=!0));!f&&!this._zerothIsAccum&&(this._gotAccum=!0);this._callback=c;this._accum=h;g||this._init$(void 0,-5)}function j(a,b,c,g){return"function"!==typeof b?k("fn must be a function"):(new f(a,b,c,g)).promise()}var l=d("./util.js"),n=l.tryCatch4,h=l.tryCatch3,c=l.errorObj;l.inherits(f,
a);f.prototype._init=function(){};f.prototype._resolveEmptyArray=function(){if(this._gotAccum||this._zerothIsAccum)this._resolve(null!==this._preservedValues?[]:this._accum)};f.prototype._promiseFulfilled=function(a,f){var d=this._values;if(null!==d){var g=this.length(),i=this._preservedValues,k=null!==i,j=this._gotAccum,l=this._valuesPhase,o;if(!l){l=this._valuesPhase=Array(g);for(o=0;o<g;++o)l[o]=0}o=l[f];0===f&&this._zerothIsAccum?(j||(this._accum=a,this._gotAccum=j=!0),l[f]=0===o?1:2):-1===f?
j||(this._accum=a,this._gotAccum=j=!0):0===o?l[f]=1:(l[f]=2,j&&(this._accum=a));if(j){for(var j=this._callback,t=this._promise._boundTo,s=this._reducingIndex;s<g;++s)if(o=l[s],2===o)this._reducingIndex=s+1;else{if(1!==o)return;a=d[s];if(a instanceof b)if(a.isFulfilled())a=a._settledValue;else{if(a.isPending())return;a._unsetRejectionIsUnhandled();return this._reject(a.reason())}k?(i.push(a),o=h(j,t,a,s,g)):o=n(j,t,this._accum,a,s,g);if(o===c)return this._reject(o.e);var r=m(o,void 0);if(r instanceof
b){if(r.isPending())return l[s]=4,r._proxyPromiseArray(this,s);if(r.isFulfilled())o=r.value();else return r._unsetRejectionIsUnhandled(),this._reject(r.reason())}this._reducingIndex=s+1;this._accum=o}this._reducingIndex<g||this._resolve(k?i:this._accum)}}};b.prototype.reduce=function(a,b){return j(this,a,b,null)};b.reduce=function(a,b,c,g){return j(a,b,c,g)}}},{"./util.js":35}],28:[function(d,o){var b;if("object"===typeof process&&"string"===typeof process.version)b=function(a){process.nextTick(a)};
else if("undefined"!==typeof MutationObserver&&(b=MutationObserver)||"undefined"!==typeof WebKitMutationObserver&&(b=WebKitMutationObserver)){var a=document.createElement("div"),k=void 0;(new b(function(){var a=k;k=void 0;a()})).observe(a,{attributes:!0});b=function(b){k=b;a.classList.toggle("foo")}}else if("undefined"!==typeof setTimeout)b=function(a){setTimeout(a,0)};else throw Error("no async scheduler available");o.exports=b},{}],29:[function(d,o){o.exports=function(b,a){function k(a){this.constructor$(a)}
var m=b.PromiseInspection;d("./util.js").inherits(k,a);k.prototype._promiseResolved=function(a,b){this._values[a]=b;++this._totalResolved>=this._length&&this._resolve(this._values)};k.prototype._promiseFulfilled=function(a,b){if(!this._isResolved()){var d=new m;d._bitField=268435456;d._settledValue=a;this._promiseResolved(b,d)}};k.prototype._promiseRejected=function(a,b){if(!this._isResolved()){var d=new m;d._bitField=134217728;d._settledValue=a;this._promiseResolved(b,d)}};b.settle=function(a){return(new k(a)).promise()};
b.prototype.settle=function(){return(new k(this)).promise()}}},{"./util.js":35}],30:[function(d,o){o.exports=function(b,a,k){function m(a){this.constructor$(a);this._howMany=0;this._initialized=this._unwrap=!1}function i(a,b){if((b|0)!==b||0>b)return k("expecting a positive integer");var e=new m(a),f=e.promise();if(f.isRejected())return f;e.setHowMany(b);e.init();return f}var f=d("./util.js"),j=d("./errors.js").RangeError,l=d("./errors.js").AggregateError,n=f.isArray;f.inherits(m,a);m.prototype._init=
function(){if(this._initialized)if(0===this._howMany)this._resolve([]);else{this._init$(void 0,-5);var a=n(this._values);!this._isResolved()&&(a&&this._howMany>this._canPossiblyFulfill())&&this._reject(this._getRangeError(this.length()))}};m.prototype.init=function(){this._initialized=!0;this._init()};m.prototype.setUnwrap=function(){this._unwrap=!0};m.prototype.howMany=function(){return this._howMany};m.prototype.setHowMany=function(a){this._isResolved()||(this._howMany=a)};m.prototype._promiseFulfilled=
function(a){this._isResolved()||(this._addFulfilled(a),this._fulfilled()===this.howMany()&&(this._values.length=this.howMany(),1===this.howMany()&&this._unwrap?this._resolve(this._values[0]):this._resolve(this._values)))};m.prototype._promiseRejected=function(a){if(!this._isResolved()&&(this._addRejected(a),this.howMany()>this._canPossiblyFulfill())){for(var a=new l,b=this.length();b<this._values.length;++b)a.push(this._values[b]);this._reject(a)}};m.prototype._fulfilled=function(){return this._totalResolved};
m.prototype._rejected=function(){return this._values.length-this.length()};m.prototype._addRejected=function(a){this._values.push(a)};m.prototype._addFulfilled=function(a){this._values[this._totalResolved++]=a};m.prototype._canPossiblyFulfill=function(){return this.length()-this._rejected()};m.prototype._getRangeError=function(a){return new j("Input array must contain at least "+this._howMany+" items but contains only "+a+" items")};m.prototype._resolveEmptyArray=function(){this._reject(this._getRangeError(0))};
b.some=function(a,b){return i(a,b)};b.prototype.some=function(a){return i(this,a)};b._SomePromiseArray=m}},{"./errors.js":10,"./util.js":35}],31:[function(d,o){o.exports=function(b){function a(a){void 0!==a?(this._bitField=a._bitField,this._settledValue=a.isResolved()?a._settledValue:void 0):(this._bitField=0,this._settledValue=void 0)}a.prototype.isFulfilled=b.prototype.isFulfilled=function(){return 0<(this._bitField&268435456)};a.prototype.isRejected=b.prototype.isRejected=function(){return 0<(this._bitField&
134217728)};a.prototype.isPending=b.prototype.isPending=function(){return 0===(this._bitField&402653184)};a.prototype.value=b.prototype.value=function(){if(!this.isFulfilled())throw new TypeError("cannot get fulfillment value of a non-fulfilled promise");return this._settledValue};a.prototype.error=a.prototype.reason=b.prototype.reason=function(){if(!this.isRejected())throw new TypeError("cannot get rejection reason of a non-rejected promise");return this._settledValue};a.prototype.isResolved=b.prototype.isResolved=
function(){return 0<(this._bitField&402653184)};b.PromiseInspection=a}},{}],32:[function(d,o){o.exports=function(b,a){var k=d("./util.js"),m=d("./errors.js").canAttach,i=k.errorObj,f=k.isObject,j={}.hasOwnProperty;return function(d,k){if(f(d)){if(d instanceof b)return d;if(j.call(d,"_promise0")){var h=new b(a);h._setTrace(void 0);d._then(h._fulfillUnchecked,h._rejectUncheckedCheckError,h._progressUnchecked,h,null);h._setFollowing();return h}try{h=d.then}catch(c){i.e=c,h=i}if(h===i)return void 0!==
k&&m(h.e)&&k._attachExtraTrace(h.e),b.reject(h.e);if("function"===typeof h){var e=function(a){w||(w=!0,d===a?(a=b._makeSelfResolutionError(),void 0!==k&&k._attachExtraTrace(a),g.promise._reject(a,void 0)):g.resolve(a))},o=function(a){if(!w){w=!0;var b=m(a)?a:Error(a+"");void 0!==k&&k._attachExtraTrace(b);g.promise._reject(a,b)}},p=function(a){if(!w){var b=g.promise;"function"===typeof b._progress&&b._progress(a)}},g=b.defer(),w=!1;try{h.call(d,e,o,p)}catch(u){w||(w=!0,h=m(u)?u:Error(u+""),void 0!==
k&&k._attachExtraTrace(h),g.promise._reject(u,h))}return g.promise}}return d}}},{"./errors.js":10,"./util.js":35}],33:[function(d,o){var b=function(a,b){var d=arguments[2],i=arguments[3],f=5<=arguments.length?arguments[4]:void 0;setTimeout(function(){a(d,i,f)},b|0)};o.exports=function(a,k,m){d("./util.js");var i=d("./errors.js");d("./errors_api_rejection")(a);var f=a.TimeoutError,j=function(a,b,e){a.isPending()&&("string"!==typeof b&&(b="operation timed out after "+e+" ms"),b=new f(b),i.markAsOriginatingFromRejection(b),
a._attachExtraTrace(b),a._cancel(b))},l=function(a,b){b._fulfill(a)},n=a.delay=function(d,c){void 0===c&&(c=d,d=void 0);var c=+c,e=m(d,void 0),f=new a(k);if(e instanceof a)return f._propagateFrom(e,7),f._follow(e),f.then(function(b){return a.delay(b,c)});f._setTrace(void 0);b(l,c,d,f);return f};a.prototype.delay=function(a){return n(this,a)};a.prototype.timeout=function(d,c){var d=+d,e=new a(k);e._propagateFrom(this,7);e._follow(this);b(j,d,e,c,d);return e.cancellable()}}},{"./errors.js":10,"./errors_api_rejection":11,
"./util.js":35}],34:[function(d,o){o.exports=function(b,a,k){function m(a){for(var c=a.length,e=0;e<c;++e){var d=a[e];if(d.isRejected())return b.reject(d.error());a[e]=d.value()}return a}function i(a){setTimeout(function(){throw a;},0)}function f(a,c){function e(){if(d>=f)return h.resolve();var j;j=a[d++];var l=k(j,void 0);l!==j&&("function"===typeof j._isDisposable&&"function"===typeof j._getDisposer&&j._isDisposable())&&l._setDisposable(j._getDisposer());j=l;if(j instanceof b&&j._isDisposable()){try{j=
k(j._getDisposer().tryDispose(c),void 0)}catch(m){return i(m)}if(j instanceof b)return j._then(e,i,null,null,null)}e()}var d=0,f=a.length,h=b.defer();e();return h.promise}function j(a){var b=new o;b._settledValue=a;b._bitField=268435456;return f(this,b).thenReturn(a)}function l(a){var b=new o;b._settledValue=a;b._bitField=134217728;return f(this,b).thenThrow(a)}function n(a,b){this._data=a;this._promise=b}function h(a,b){this.constructor$(a,b)}var c=d("./errors.js").TypeError,e=d("./util.js").inherits,
o=b.PromiseInspection;n.prototype.data=function(){return this._data};n.prototype.promise=function(){return this._promise};n.prototype.resource=function(){return this.promise().isFulfilled()?this.promise().value():null};n.prototype.tryDispose=function(a){var b=this.resource(),a=null!==b?this.doDispose(b,a):null;this._promise._unsetDisposable();this._data=this._promise=null;return a};n.isDisposer=function(a){return null!=a&&"function"===typeof a.resource&&"function"===typeof a.tryDispose};e(h,n);h.prototype.doDispose=
function(a,b){return this.data().call(a,a,b)};b.using=function(){var c=arguments.length;if(2>c)return a("you must pass at least 2 arguments to Promise.using");var e=arguments[c-1];if("function"!==typeof e)return a("fn must be a function");c--;for(var d=Array(c),f=0;f<c;++f){var h=arguments[f];if(n.isDisposer(h)){var i=h,h=h.promise();h._setDisposable(i)}d[f]=h}return b.settle(d).then(m).spread(e)._then(j,l,void 0,d,void 0)};b.prototype._setDisposable=function(a){this._bitField|=262144;this._disposer=
a};b.prototype._isDisposable=function(){return 0<(this._bitField&262144)};b.prototype._getDisposer=function(){return this._disposer};b.prototype._unsetDisposable=function(){this._bitField&=-262145;this._disposer=void 0};b.prototype.disposer=function(a){if("function"===typeof a)return new h(a,this);throw new c;}}},{"./errors.js":10,"./util.js":35}],35:[function(d,o){function b(a){return"string"===typeof a?a:""+a}function a(a){return null==a||!0===a||!1===a||"string"===typeof a||"number"===typeof a}
var k=d("./es5.js"),m;try{var i={};k.defineProperty(i,"f",{get:function(){return 3}});m=3===i.f}catch(f){m=!1}var i="undefined"==typeof navigator,j={e:{}},l=function(){return"string"!==this}.call("string"),n;n=k.isES5?function(a,b){for(var d=[],f=Object.create(null),g=Object(b).includeHidden?Object.getOwnPropertyNames:Object.keys;null!=a;){var h;try{h=g(a)}catch(j){break}for(var i=0;i<h.length;++i){var l=h[i];if(!f[l]){f[l]=!0;var m=Object.getOwnPropertyDescriptor(a,l);null!=m&&(null==m.get&&null==
m.set)&&d.push(l)}}a=k.getPrototypeOf(a)}return d}:function(a){var b=[],d;for(d in a)b.push(d);return b};var h=/^[a-z$_][a-z$_0-9]*$/i;o.exports={isClass:function(a){try{if("function"===typeof a){var b=k.keys(a.prototype);return 0<b.length&&!(1===b.length&&"constructor"===b[0])}return!1}catch(d){return!1}},isIdentifier:function(a){return h.test(a)},inheritedDataKeys:n,getDataPropertyOrDefault:function(a,b,d){if(k.isES5){if(a=Object.getOwnPropertyDescriptor(a,b),null!=a)return null==a.get&&null==a.set?
a.value:d}else return{}.hasOwnProperty.call(a,b)?a[b]:void 0},thrower:function(a){throw a;},isArray:k.isArray,haveGetters:m,notEnumerableProp:function(b,e,d){if(a(b))return b;k.defineProperty(b,e,{value:d,configurable:!0,enumerable:!1,writable:!0});return b},isPrimitive:a,isObject:function(b){return!a(b)},canEvaluate:i,errorObj:j,tryCatch1:function(a,b,d){try{return a.call(b,d)}catch(f){return j.e=f,j}},tryCatch2:function(a,b,d,f){try{return a.call(b,d,f)}catch(g){return j.e=g,j}},tryCatch3:function(a,
b,d,f,g){try{return a.call(b,d,f,g)}catch(h){return j.e=h,j}},tryCatch4:function(a,b,d,f,g,h){try{return a.call(b,d,f,g,h)}catch(i){return j.e=i,j}},tryCatchApply:function(a,b,d){try{return a.apply(d,b)}catch(f){return j.e=f,j}},inherits:function(a,b){function d(){this.constructor=a;this.constructor$=b;for(var g in b.prototype)f.call(b.prototype,g)&&"$"!==g.charAt(g.length-1)&&(this[g+"$"]=b.prototype[g])}var f={}.hasOwnProperty;d.prototype=b.prototype;a.prototype=new d;return a.prototype},withAppended:function(a,
b){var d=a.length,f=Array(d+1),g;for(g=0;g<d;++g)f[g]=a[g];f[g]=b;return f},asString:b,maybeWrapAsError:function(c){return!a(c)?c:Error(b(c))},wrapsPrimitiveReceiver:l,toFastProperties:function(a){function b(){}b.prototype=a;return b},filledRange:function(a,b,d){for(var f=Array(a),g=0;g<a;++g)f[g]=b+g+d;return f}}},{"./es5.js":12}]},{},[3])(3)};"object"==typeof exports?module.exports=t():"function"==typeof define&&define.amd?define(t):"undefined"!=typeof r?r.Promise=t():"undefined"!=typeof global?
global.Promise=t():"undefined"!=typeof self&&(self.Promise=t());!0;"undefined"!==typeof r&&null!==r?r.P=r.Promise:"undefined"!==typeof self&&null!==self&&(self.P=self.Promise)});;
;
/* module-key = 'com.atlassian.jira.jira-onboarding-assets-plugin:promise', location = 'lib/bluebird-promise-amd.js' */
define("bluebird/Promise",["atlassian/libs/bluebird-2.3.6"],function(i){return i});;
;
/* module-key = 'com.atlassian.jira.plugins.jira-development-integration-plugin:repository-shortcuts-administer-notifier', location = 'templates/repository-shortcuts/admin-notifications.soy' */
// This file was automatically generated from admin-notifications.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace JIRA.Software.RepositoryShortcuts.Notification.Templates.
 */

if (typeof JIRA == 'undefined') { var JIRA = {}; }
if (typeof JIRA.Software == 'undefined') { JIRA.Software = {}; }
if (typeof JIRA.Software.RepositoryShortcuts == 'undefined') { JIRA.Software.RepositoryShortcuts = {}; }
if (typeof JIRA.Software.RepositoryShortcuts.Notification == 'undefined') { JIRA.Software.RepositoryShortcuts.Notification = {}; }
if (typeof JIRA.Software.RepositoryShortcuts.Notification.Templates == 'undefined') { JIRA.Software.RepositoryShortcuts.Notification.Templates = {}; }


JIRA.Software.RepositoryShortcuts.Notification.Templates.notifyAdminProjectLinkFragment = function(opt_data, opt_ignored) {
  return '<a href="' + soy.$$escapeHtml("") + '/projects/' + soy.$$escapeHtml(opt_data.projectKey) + '" class="repo-shortcuts-notification__show-me-link">' + ((opt_data.isAdg3AddItemEnabled) ? soy.$$escapeHtml('\u0421\u043c. \u0437\u0430\u043f\u0440\u043e\u0441 \u043e\u0442 \u0430\u0434\u043c\u0438\u043d\u0438\u0441\u0442\u0440\u0430\u0442\u043e\u0440\u0430 \u043f\u0440\u043e\u0435\u043a\u0442\u0430') : soy.$$escapeHtml('\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c, \u0433\u0434\u0435')) + '</a>';
};
if (goog.DEBUG) {
  JIRA.Software.RepositoryShortcuts.Notification.Templates.notifyAdminProjectLinkFragment.soyTemplateName = 'JIRA.Software.RepositoryShortcuts.Notification.Templates.notifyAdminProjectLinkFragment';
}
;
;
/* module-key = 'com.atlassian.jira.plugins.jira-development-integration-plugin:repository-shortcuts-administer-notifier', location = 'js/repository-shortcuts/services/URLMatcher.js' */
"use strict";define("repository-shortcuts/services/url-matcher",[],function(){return{parseUrl:function(t){function s(t,s,e){if(t&&t[1]&&s.indexOf(t[1])===-1&&e.indexOf(t[2])===-1)return{dvcsOrg:t[1],dvcsRepo:t[2]}}function e(){var e=/https:\/\/bitbucket\.org(?:\/([^\/\?#]+)(?:\/([^\/\?#]+))?)?/,r=t.match(e),c=["snippets","account","dashboard"],i=["profile"];return s(r,c,i)}function r(){var e=/https:\/\/github\.com(?:\/([^\/\?#]+)(?:\/([^\/\?#]+))?)?/,r=t.match(e),c=["pulls","issues","notifications","explore","integrations","settings","blog","about","site","security"],i=[];return s(r,c,i)}if("string"!=typeof t)throw new Error("parseUrl expects URLs to be strings");return e()?{dvcsType:"bitbucket",dvcsOrg:e().dvcsOrg,dvcsRepo:e().dvcsRepo}:r()?{dvcsType:"github",dvcsOrg:r().dvcsOrg,dvcsRepo:r().dvcsRepo}:{dvcsType:"unsupported"}}}});;
;
/* module-key = 'com.atlassian.jira.plugins.jira-development-integration-plugin:repository-shortcuts-administer-notifier', location = 'js/repository-shortcuts/services/DVCSAccountMatcher.js' */
"use strict";define("repository-shortcuts/services/dvcs-account-matcher",["jquery","underscore","bluebird/Promise","wrm/context-path","repository-shortcuts/services/url-matcher","jira/featureflags/feature-manager"],function(e,t,r,n,s,i){return{matchUrlAgainstNetwork:function(u){function c(s){var i=n()+"/rest/bitbucket/1.0/repository/summary/find?type="+s.dvcsType+"&orgName="+s.dvcsOrg+"&repoSlug="+s.dvcsRepo;return r.resolve(e.get(i)).then(function(e){return t.extend({},s,e)})["catch"](function(e){return e&&404===e.status?a(s):s})}function a(t){var s=n()+"/rest/bitbucket/1.0/organization/find?name="+t.dvcsOrg+"&type="+t.dvcsType;return r.resolve(e.get(s)).then(function(e){var r=e.dvcsType,n=e.name,s=e.approvalState,i=r===t.dvcsType,u=n===t.dvcsOrg,c="APPROVED"===s;return t.isOrganisationLinked=i&&u&&c,t})["catch"](function(e){return t})}function o(t){var s=n()+"/rest/devinfoadmin/1.0/githubAppDetails";return r.resolve(e.get(s)).then(function(e){var r=e.githubAppInstalled;return r&&(t.isOrganisationLinked=!0,t.isRepositoryLinked=!0),t.githubAppInstalled=r,t})["catch"](function(e){return t})}try{var d=s.parseUrl(u);if("unsupported"===d.dvcsType)return r.resolve(d);var v=i.isFeatureEnabled("fusion-dvcs-new-github-integrations-allowed");return d.newGithubDvcsIntegrationsAllowed=v,v||"github"!==d.dvcsType?d.dvcsRepo?c(d):a(d):o(d)}catch(p){return r.reject(p)}}}});;
;
/* module-key = 'com.atlassian.jira.plugins.jira-development-integration-plugin:repository-shortcuts-administer-notifier', location = 'js/repository-shortcuts/notify-admin.js' */
"use strict";require(["jquery","bluebird/Promise","wrm/context-path","repository-shortcuts/services/dvcs-account-matcher","jira/featureflags/simplified-ux-feature-manager"],function(t,e,o,r,i){function n(e){e.forEach(function(e){var o=!0;r.matchUrlAgainstNetwork(e.shortcutUrl).then(function(r){if(o=!r.isRepositoryLinked,o===!0){AJS.trigger("analyticsEvent",{name:"jira-software.fe.web.notifications.connect-repo.integration-request.show",data:{projectId:e.projectId}});var n="bitbucket"===e.dvcsType?"Bitbucket":"GitHub",a=i.isAdg3ModeOn(),c=a?AJS.format("\u0417\u0430\u043f\u0440\u043e\u0448\u0435\u043d\u0430 \u0438\u043d\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u044f \u0441 {0}",n):AJS.format("\u0417\u0430\u043f\u0440\u043e\u0441 \u043d\u0430 \u0438\u043d\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u044e {0}",n),s=AJS.flag({type:"info",title:c,body:JIRA.Software.RepositoryShortcuts.Notification.Templates.notifyAdminProjectLinkFragment({projectKey:e.projectKey,isAdg3AddItemEnabled:a})});t(s).find(".repo-shortcuts-notification__show-me-link").on("click",function(){AJS.trigger("analyticsEvent",{name:"jira-software.fe.web.notifications.connect-repo.integration-request.show-me.click",data:{projectId:e.projectId}})})}})["catch"](function(t){console.error("Caught Error"+t)})})}var a="repository-shortcuts-pending-requests",c=localStorage.getItem(a)||Date.now(),s=36e5;c+s<Date.now()&&(e.resolve(t.ajax({type:"POST",url:o()+"/rest/projects/1.0/project/shortcut/pending",data:JSON.stringify({clearPendingFlag:!0}),contentType:"application/json"})).then(function(t){n(t)})["catch"](function(t){console.error(t)}),localStorage.setItem(a,Date.now()))});;
;
/* module-key = 'com.atlassian.jira.plugins.jira-development-integration-plugin:devsummarycf-resources-init', location = 'js/customfields/devsummary/dev-summary-custom-field-init.js' */
"use strict";require(["jira/skate","jquery"],function(e,t){var i="wrc!com.atlassian.jira.plugins.jira-development-integration-plugin:devsummarycf-resources";e("fusion-devsummary-cf",{type:e.type.CLASS,created:function(e){WRM.require([i],function(){var i=require("jira-development-status/customfields/dev-summary-custom-field-column-view"),r=require("jira-development-status/component/tooltip"),o=t(e);new i({el:o}),r.tipsify({selector:".fusion-widget-tooltip",context:o,html:!0})})}})});;
;
/* module-key = 'com.atlassian.jira.jira-atlaskit-plugin:sidebar', location = 'js/global-sidebar-api.js' */
!function(){var n,e=new Promise(function(e){n=e});e.done=function(n){return this.then(n)},AJS.namespace("JIRA.API"),JIRA.API.getSidebar=function(){return e},define("jira/globalnavigator/sidebar/bridge",function(){return function(e){n(e)}}),define("jira/globalnavigator/sidebar",function(){return e})}();
//# sourceMappingURL=global-sidebar-api-min.js.map
;
;
/* module-key = 'com.atlassian.jira.jira-atlaskit-plugin:sidebar', location = 'js/imperative-api.js' */
!function(){var n,i=new Promise(function(i){n=i});AJS.namespace("JIRA.API"),JIRA.API.getNavigationApi=function(){return i},define("jira/navigation/bridge",function(){return function(i){n(i)}}),define("jira/navigation",function(){return i})}();
//# sourceMappingURL=imperative-api-min.js.map
;
;
/* module-key = 'com.atlassian.jira.jira-atlaskit-plugin:sidebar', location = 'js/check-both-apis.js' */
require(["jira/globalnavigator/sidebar","jira/navigation","jira/analytics"],function(a,i,n){Promise.all([a,i]).then(function(){n.send({name:"navigation.imperative-api.both-apis-resolves"})})});
//# sourceMappingURL=check-both-apis-min.js.map
;
;
/* module-key = 'com.atlassian.jira.jira-projects-plugin:data', location = 'data/web-resource-manager.js' */
define("jira/projects/data/WRM",window.WRM);;
;
/* module-key = 'com.atlassian.jira.jira-projects-plugin:projects-api', location = 'page/projects-api.js' */
define("jira/api/projects",["jira/projects/data/WRM"],function(e){"use strict";function t(t,r){if(void 0!==t)return t;var i=e.data.claim(r);return void 0!==i?i:AJS.Meta.get(r)}var r=e.data.claim("project-key"),i=e.data.claim("project-id"),c=e.data.claim("project-name"),n=e.data.claim("project-type"),a=e.data.claim("is-project-admin"),o=e.data.claim("project-simplified");return{ProjectType:Object.freeze({SOFTWARE:"software",BUSINESS:"business"}),getCurrentProjectId:function(){return i=t(i,"project-id")},getCurrentProjectKey:function(){return r=t(r,"project-key")},getCurrentProjectName:function(){return c=t(c,"project-name")},getCurrentProjectType:function(){return n=t(n,"project-type")},isCurrentUserProjectAdmin:function(){return a=t(a,"is-project-admin")},isCurrentProjectSimplified:function(){return o=t(o,"project-simplified")}}}),AJS.namespace("JIRA.API.Projects",null,require("jira/api/projects"));;
;
/* module-key = 'com.atlassian.jira.jira-atlaskit-plugin:breadcrumbs', location = 'js/global-breadcrumbs-api.js' */
!function(){var n,r=new Promise(function(r){n=r});r.done=function(n){return this.then(n)},define("jira/globalnavigator/breadcrumbs/bridge",function(){return function(r){n(r)}}),define("jira/globalnavigator/breadcrumbs",function(){return r})}();
//# sourceMappingURL=global-breadcrumbs-api-min.js.map
;
;
/* module-key = 'com.atlassian.jira.jira-atlaskit-plugin:breadcrumbs', location = 'js/breadcrumbs-api.js' */
define("jira/atlaskit/breadcrumbs",["jira/featureflags/simplified-ux-feature-manager"],function(e){var t=AJS.contextPath(),r=JIRA.API.Projects&&JIRA.API.Projects.getCurrentProjectKey()||AJS.Meta.get("project-key"),n=function(){return require("jira/globalnavigator/breadcrumbs")};return{Items:{REPORTS:{id:"breadcrumbs-item-reports",index:0,text:"\u041e\u0442\u0447\u0435\u0442\u044b",href:r&&t+"/projects/"+r+"?selectedItem=com.atlassian.jira.jira-projects-plugin:report-page"},RELEASES:{id:"breadcrumbs-item-releases-versions",index:0,text:"\u0412\u044b\u043f\u0443\u0441\u043a\u0438",href:r&&t+"/projects/"+r+"?selectedItem=com.atlassian.jira.jira-projects-plugin:release-page"},VERSIONS:{id:"breadcrumbs-item-releases-versions",index:0,text:"\u0412\u0435\u0440\u0441\u0438\u0438",href:r&&t+"/projects/"+r+"?selectedItem=com.atlassian.jira.jira-projects-plugin:release-page"}},render:function(){var e=document.getElementById("breadcrumbs-container");e?n().done(function(t){t.render(e)}):(AJS.trigger("analyticsEvent",{name:"jira.atlaskit.plugin.breadcrumbs.render.without.container"}),window.console&&console.warn("Attempted to render breadcrumbs, but container element with id: 'breadcrumbs-container' not found in DOM."))},isEnabled:function(){return e.isAdg3ModeOn()},insertItem:function(e){n().done(function(t){t.insertItem(e)})},removeItem:function(e){n().done(function(t){t.removeItem(e)})}}});
//# sourceMappingURL=breadcrumbs-api-min.js.map
;
;
/* module-key = 'com.atlassian.plugin.jslibs:underscore-1.5.2', location = 'libs/underscore/1.5.2/underscore-1.5.2.js' */
(function(l){define("atlassian/libs/underscore-1.5.2",function(){var o={};l.call(o);return"undefined"!==typeof exports?"undefined"!==typeof module&&module.exports?module.exports.noConflict():exports.noConflict():o._.noConflict()})})(function(){(function(){var l=this,o=l._,p={},k=Array.prototype,q=Object.prototype,t=k.push,i=k.slice,r=k.concat,m=q.toString,L=q.hasOwnProperty,A=k.forEach,B=k.map,C=k.reduce,D=k.reduceRight,E=k.filter,F=k.every,G=k.some,s=k.indexOf,H=k.lastIndexOf,q=Array.isArray,M=Object.keys,
u=Function.prototype.bind,b=function(a){if(a instanceof b)return a;if(!(this instanceof b))return new b(a);this._wrapped=a};"undefined"!==typeof exports?("undefined"!==typeof module&&module.exports&&(exports=module.exports=b),exports._=b):l._=b;b.VERSION="1.5.2";var j=b.each=b.forEach=function(a,c,d){if(a!=null)if(A&&a.forEach===A)a.forEach(c,d);else if(a.length===+a.length)for(var e=0,f=a.length;e<f;e++){if(c.call(d,a[e],e,a)===p)break}else for(var g=b.keys(a),e=0,f=g.length;e<f;e++)if(c.call(d,
a[g[e]],g[e],a)===p)break};b.map=b.collect=function(a,c,b){var e=[];if(a==null)return e;if(B&&a.map===B)return a.map(c,b);j(a,function(a,g,h){e.push(c.call(b,a,g,h))});return e};b.reduce=b.foldl=b.inject=function(a,c,d,e){var f=arguments.length>2;a==null&&(a=[]);if(C&&a.reduce===C){e&&(c=b.bind(c,e));return f?a.reduce(c,d):a.reduce(c)}j(a,function(a,b,N){if(f)d=c.call(e,d,a,b,N);else{d=a;f=true}});if(!f)throw new TypeError("Reduce of empty array with no initial value");return d};b.reduceRight=b.foldr=
function(a,c,d,e){var f=arguments.length>2;a==null&&(a=[]);if(D&&a.reduceRight===D){e&&(c=b.bind(c,e));return f?a.reduceRight(c,d):a.reduceRight(c)}var g=a.length;if(g!==+g)var h=b.keys(a),g=h.length;j(a,function(b,i,j){i=h?h[--g]:--g;if(f)d=c.call(e,d,a[i],i,j);else{d=a[i];f=true}});if(!f)throw new TypeError("Reduce of empty array with no initial value");return d};b.find=b.detect=function(a,c,b){var e;I(a,function(a,g,h){if(c.call(b,a,g,h)){e=a;return true}});return e};b.filter=b.select=function(a,
c,b){var e=[];if(a==null)return e;if(E&&a.filter===E)return a.filter(c,b);j(a,function(a,g,h){c.call(b,a,g,h)&&e.push(a)});return e};b.reject=function(a,c,d){return b.filter(a,function(a,b,g){return!c.call(d,a,b,g)},d)};b.every=b.all=function(a,c,d){c||(c=b.identity);var e=true;if(a==null)return e;if(F&&a.every===F)return a.every(c,d);j(a,function(a,b,h){if(!(e=e&&c.call(d,a,b,h)))return p});return!!e};var I=b.some=b.any=function(a,c,d){c||(c=b.identity);var e=false;if(a==null)return e;if(G&&a.some===
G)return a.some(c,d);j(a,function(a,b,h){if(e||(e=c.call(d,a,b,h)))return p});return!!e};b.contains=b.include=function(a,c){return a==null?false:s&&a.indexOf===s?a.indexOf(c)!=-1:I(a,function(a){return a===c})};b.invoke=function(a,c){var d=i.call(arguments,2),e=b.isFunction(c);return b.map(a,function(a){return(e?c:a[c]).apply(a,d)})};b.pluck=function(a,c){return b.map(a,function(a){return a[c]})};b.where=function(a,c,d){return b.isEmpty(c)?d?void 0:[]:b[d?"find":"filter"](a,function(a){for(var b in c)if(c[b]!==
a[b])return false;return true})};b.findWhere=function(a,c){return b.where(a,c,true)};b.max=function(a,c,d){if(!c&&b.isArray(a)&&a[0]===+a[0]&&a.length<65535)return Math.max.apply(Math,a);if(!c&&b.isEmpty(a))return-Infinity;var e={computed:-Infinity,value:-Infinity};j(a,function(a,b,h){b=c?c.call(d,a,b,h):a;b>e.computed&&(e={value:a,computed:b})});return e.value};b.min=function(a,c,d){if(!c&&b.isArray(a)&&a[0]===+a[0]&&a.length<65535)return Math.min.apply(Math,a);if(!c&&b.isEmpty(a))return Infinity;
var e={computed:Infinity,value:Infinity};j(a,function(a,b,h){b=c?c.call(d,a,b,h):a;b<e.computed&&(e={value:a,computed:b})});return e.value};b.shuffle=function(a){var c,d=0,e=[];j(a,function(a){c=b.random(d++);e[d-1]=e[c];e[c]=a});return e};b.sample=function(a,c,d){return arguments.length<2||d?a[b.random(a.length-1)]:b.shuffle(a).slice(0,Math.max(0,c))};var v=function(a){return b.isFunction(a)?a:function(c){return c[a]}};b.sortBy=function(a,c,d){var e=v(c);return b.pluck(b.map(a,function(a,c,b){return{value:a,
index:c,criteria:e.call(d,a,c,b)}}).sort(function(a,c){var b=a.criteria,d=c.criteria;if(b!==d){if(b>d||b===void 0)return 1;if(b<d||d===void 0)return-1}return a.index-c.index}),"value")};var w=function(a){return function(c,d,e){var f={},g=d==null?b.identity:v(d);j(c,function(b,d){var i=g.call(e,b,d,c);a(f,i,b)});return f}};b.groupBy=w(function(a,c,d){(b.has(a,c)?a[c]:a[c]=[]).push(d)});b.indexBy=w(function(a,c,b){a[c]=b});b.countBy=w(function(a,c){b.has(a,c)?a[c]++:a[c]=1});b.sortedIndex=function(a,
c,d,e){for(var d=d==null?b.identity:v(d),c=d.call(e,c),f=0,g=a.length;f<g;){var h=f+g>>>1;d.call(e,a[h])<c?f=h+1:g=h}return f};b.toArray=function(a){return!a?[]:b.isArray(a)?i.call(a):a.length===+a.length?b.map(a,b.identity):b.values(a)};b.size=function(a){return a==null?0:a.length===+a.length?a.length:b.keys(a).length};b.first=b.head=b.take=function(a,c,b){return a==null?void 0:c==null||b?a[0]:i.call(a,0,c)};b.initial=function(a,c,b){return i.call(a,0,a.length-(c==null||b?1:c))};b.last=function(a,
c,b){return a==null?void 0:c==null||b?a[a.length-1]:i.call(a,Math.max(a.length-c,0))};b.rest=b.tail=b.drop=function(a,b,d){return i.call(a,b==null||d?1:b)};b.compact=function(a){return b.filter(a,b.identity)};var J=function(a,c,d){if(c&&b.every(a,b.isArray))return r.apply(d,a);j(a,function(a){b.isArray(a)||b.isArguments(a)?c?t.apply(d,a):J(a,c,d):d.push(a)});return d};b.flatten=function(a,b){return J(a,b,[])};b.without=function(a){return b.difference(a,i.call(arguments,1))};b.uniq=b.unique=function(a,
c,d,e){if(b.isFunction(c)){e=d;d=c;c=false}var d=d?b.map(a,d,e):a,f=[],g=[];j(d,function(d,e){if(c?!e||g[g.length-1]!==d:!b.contains(g,d)){g.push(d);f.push(a[e])}});return f};b.union=function(){return b.uniq(b.flatten(arguments,true))};b.intersection=function(a){var c=i.call(arguments,1);return b.filter(b.uniq(a),function(a){return b.every(c,function(c){return b.indexOf(c,a)>=0})})};b.difference=function(a){var c=r.apply(k,i.call(arguments,1));return b.filter(a,function(a){return!b.contains(c,a)})};
b.zip=function(){for(var a=b.max(b.pluck(arguments,"length").concat(0)),c=Array(a),d=0;d<a;d++)c[d]=b.pluck(arguments,""+d);return c};b.object=function(a,b){if(a==null)return{};for(var d={},e=0,f=a.length;e<f;e++)b?d[a[e]]=b[e]:d[a[e][0]]=a[e][1];return d};b.indexOf=function(a,c,d){if(a==null)return-1;var e=0,f=a.length;if(d)if(typeof d=="number")e=d<0?Math.max(0,f+d):d;else{e=b.sortedIndex(a,c);return a[e]===c?e:-1}if(s&&a.indexOf===s)return a.indexOf(c,d);for(;e<f;e++)if(a[e]===c)return e;return-1};
b.lastIndexOf=function(a,b,d){if(a==null)return-1;var e=d!=null;if(H&&a.lastIndexOf===H)return e?a.lastIndexOf(b,d):a.lastIndexOf(b);for(d=e?d:a.length;d--;)if(a[d]===b)return d;return-1};b.range=function(a,b,d){if(arguments.length<=1){b=a||0;a=0}for(var d=arguments[2]||1,e=Math.max(Math.ceil((b-a)/d),0),f=0,g=Array(e);f<e;){g[f++]=a;a=a+d}return g};var x=function(){};b.bind=function(a,c){var d,e;if(u&&a.bind===u)return u.apply(a,i.call(arguments,1));if(!b.isFunction(a))throw new TypeError;d=i.call(arguments,
2);return e=function(){if(!(this instanceof e))return a.apply(c,d.concat(i.call(arguments)));x.prototype=a.prototype;var b=new x;x.prototype=null;var g=a.apply(b,d.concat(i.call(arguments)));return Object(g)===g?g:b}};b.partial=function(a){var b=i.call(arguments,1);return function(){return a.apply(this,b.concat(i.call(arguments)))}};b.bindAll=function(a){var c=i.call(arguments,1);if(c.length===0)throw Error("bindAll must be passed function names");j(c,function(c){a[c]=b.bind(a[c],a)});return a};b.memoize=
function(a,c){var d={};c||(c=b.identity);return function(){var e=c.apply(this,arguments);return b.has(d,e)?d[e]:d[e]=a.apply(this,arguments)}};b.delay=function(a,b){var d=i.call(arguments,2);return setTimeout(function(){return a.apply(null,d)},b)};b.defer=function(a){return b.delay.apply(b,[a,1].concat(i.call(arguments,1)))};b.throttle=function(a,b,d){var e,f,g,h=null,i=0;d||(d={});var j=function(){i=d.leading===false?0:new Date;h=null;g=a.apply(e,f)};return function(){var k=new Date;!i&&d.leading===
false&&(i=k);var K=b-(k-i);e=this;f=arguments;if(K<=0){clearTimeout(h);h=null;i=k;g=a.apply(e,f)}else!h&&d.trailing!==false&&(h=setTimeout(j,K));return g}};b.debounce=function(a,b,d){var e,f,g,h,i;return function(){g=this;f=arguments;h=new Date;var j=function(){var k=new Date-h;if(k<b)e=setTimeout(j,b-k);else{e=null;d||(i=a.apply(g,f))}},k=d&&!e;e||(e=setTimeout(j,b));k&&(i=a.apply(g,f));return i}};b.once=function(a){var b=false,d;return function(){if(b)return d;b=true;d=a.apply(this,arguments);a=
null;return d}};b.wrap=function(a,b){return function(){var d=[a];t.apply(d,arguments);return b.apply(this,d)}};b.compose=function(){var a=arguments;return function(){for(var b=arguments,d=a.length-1;d>=0;d--)b=[a[d].apply(this,b)];return b[0]}};b.after=function(a,b){return function(){if(--a<1)return b.apply(this,arguments)}};b.keys=M||function(a){if(a!==Object(a))throw new TypeError("Invalid object");var c=[],d;for(d in a)b.has(a,d)&&c.push(d);return c};b.values=function(a){for(var c=b.keys(a),d=
c.length,e=Array(d),f=0;f<d;f++)e[f]=a[c[f]];return e};b.pairs=function(a){for(var c=b.keys(a),d=c.length,e=Array(d),f=0;f<d;f++)e[f]=[c[f],a[c[f]]];return e};b.invert=function(a){for(var c={},d=b.keys(a),e=0,f=d.length;e<f;e++)c[a[d[e]]]=d[e];return c};b.functions=b.methods=function(a){var c=[],d;for(d in a)b.isFunction(a[d])&&c.push(d);return c.sort()};b.extend=function(a){j(i.call(arguments,1),function(b){if(b)for(var d in b)a[d]=b[d]});return a};b.pick=function(a){var b={},d=r.apply(k,i.call(arguments,
1));j(d,function(d){d in a&&(b[d]=a[d])});return b};b.omit=function(a){var c={},d=r.apply(k,i.call(arguments,1)),e;for(e in a)b.contains(d,e)||(c[e]=a[e]);return c};b.defaults=function(a){j(i.call(arguments,1),function(b){if(b)for(var d in b)a[d]===void 0&&(a[d]=b[d])});return a};b.clone=function(a){return!b.isObject(a)?a:b.isArray(a)?a.slice():b.extend({},a)};b.tap=function(a,b){b(a);return a};var y=function(a,c,d,e){if(a===c)return a!==0||1/a==1/c;if(a==null||c==null)return a===c;if(a instanceof
b)a=a._wrapped;if(c instanceof b)c=c._wrapped;var f=m.call(a);if(f!=m.call(c))return false;switch(f){case "[object String]":return a==String(c);case "[object Number]":return a!=+a?c!=+c:a==0?1/a==1/c:a==+c;case "[object Date]":case "[object Boolean]":return+a==+c;case "[object RegExp]":return a.source==c.source&&a.global==c.global&&a.multiline==c.multiline&&a.ignoreCase==c.ignoreCase}if(typeof a!="object"||typeof c!="object")return false;for(var g=d.length;g--;)if(d[g]==a)return e[g]==c;var g=a.constructor,
h=c.constructor;if(g!==h&&(!b.isFunction(g)||!(g instanceof g&&b.isFunction(h)&&h instanceof h)))return false;d.push(a);e.push(c);g=0;h=true;if(f=="[object Array]"){g=a.length;if(h=g==c.length)for(;g--;)if(!(h=y(a[g],c[g],d,e)))break}else{for(var i in a)if(b.has(a,i)){g++;if(!(h=b.has(c,i)&&y(a[i],c[i],d,e)))break}if(h){for(i in c)if(b.has(c,i)&&!g--)break;h=!g}}d.pop();e.pop();return h};b.isEqual=function(a,b){return y(a,b,[],[])};b.isEmpty=function(a){if(a==null)return true;if(b.isArray(a)||b.isString(a))return a.length===
0;for(var c in a)if(b.has(a,c))return false;return true};b.isElement=function(a){return!!(a&&a.nodeType===1)};b.isArray=q||function(a){return m.call(a)=="[object Array]"};b.isObject=function(a){return a===Object(a)};j("Arguments Function String Number Date RegExp".split(" "),function(a){b["is"+a]=function(b){return m.call(b)=="[object "+a+"]"}});b.isArguments(arguments)||(b.isArguments=function(a){return!(!a||!b.has(a,"callee"))});"function"!==typeof/./&&(b.isFunction=function(a){return typeof a===
"function"});b.isFinite=function(a){return isFinite(a)&&!isNaN(parseFloat(a))};b.isNaN=function(a){return b.isNumber(a)&&a!=+a};b.isBoolean=function(a){return a===true||a===false||m.call(a)=="[object Boolean]"};b.isNull=function(a){return a===null};b.isUndefined=function(a){return a===void 0};b.has=function(a,b){return L.call(a,b)};b.noConflict=function(){l._=o;return this};b.identity=function(a){return a};b.times=function(a,b,d){for(var e=Array(Math.max(0,a)),f=0;f<a;f++)e[f]=b.call(d,f);return e};
b.random=function(a,b){if(b==null){b=a;a=0}return a+Math.floor(Math.random()*(b-a+1))};var n={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;"}};n.unescape=b.invert(n.escape);var O={escape:RegExp("["+b.keys(n.escape).join("")+"]","g"),unescape:RegExp("("+b.keys(n.unescape).join("|")+")","g")};b.each(["escape","unescape"],function(a){b[a]=function(b){return b==null?"":(""+b).replace(O[a],function(b){return n[a][b]})}});b.result=function(a,c){if(a!=null){var d=a[c];return b.isFunction(d)?
d.call(a):d}};b.mixin=function(a){j(b.functions(a),function(c){var d=b[c]=a[c];b.prototype[c]=function(){var a=[this._wrapped];t.apply(a,arguments);a=d.apply(b,a);return this._chain?b(a).chain():a}})};var P=0;b.uniqueId=function(a){var b=++P+"";return a?a+b:b};b.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var z=/(.)^/,Q={"'":"'","\\":"\\","\r":"r","\n":"n","\t":"t","\u2028":"u2028","\u2029":"u2029"},R=/\\|'|\r|\n|\t|\u2028|\u2029/g;b.template=
function(a,c,d){var e,d=b.defaults({},d,b.templateSettings),f=RegExp([(d.escape||z).source,(d.interpolate||z).source,(d.evaluate||z).source].join("|")+"|$","g"),g=0,h="__p+='";a.replace(f,function(b,c,d,e,f){h=h+a.slice(g,f).replace(R,function(a){return"\\"+Q[a]});c&&(h=h+("'+\n((__t=("+c+"))==null?'':_.escape(__t))+\n'"));d&&(h=h+("'+\n((__t=("+d+"))==null?'':__t)+\n'"));e&&(h=h+("';\n"+e+"\n__p+='"));g=f+b.length;return b});h=h+"';\n";d.variable||(h="with(obj||{}){\n"+h+"}\n");h="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+
h+"return __p;\n";try{e=new Function(d.variable||"obj","_",h)}catch(i){i.source=h;throw i;}if(c)return e(c,b);c=function(a){return e.call(this,a,b)};c.source="function("+(d.variable||"obj")+"){\n"+h+"}";return c};b.chain=function(a){return b(a).chain()};b.mixin(b);j("pop push reverse shift sort splice unshift".split(" "),function(a){var c=k[a];b.prototype[a]=function(){var d=this._wrapped;c.apply(d,arguments);(a=="shift"||a=="splice")&&d.length===0&&delete d[0];return this._chain?b(d).chain():d}});
j(["concat","join","slice"],function(a){var c=k[a];b.prototype[a]=function(){var a=c.apply(this._wrapped,arguments);return this._chain?b(a).chain():a}});b.extend(b.prototype,{chain:function(){this._chain=true;return this},value:function(){return this._wrapped}})}).call(this)});;
;
/* module-key = 'com.atlassian.applinks.applinks-plugin:lodash-amd', location = 'applinks/internal/lib/lodash-jslibs.js' */
define('applinks/lib/lodash', ['atlassian/libs/underscore-1.5.2'], function(lodash) {
        return lodash;
    });;
;
/* module-key = 'com.atlassian.applinks.applinks-plugin:applinks-lib', location = 'applinks/internal/lib/lib-version.js' */
// NOTE: this is in "lib" because it's required by aui-amd.js. This module _cannot_ have any dependencies on non-lib
// modules (like "common")
define('applinks/lib/version', [
    'applinks/lib/lodash'
], function(
    _
) {

    function checkIntValue(value, desc) {
        if (_.isUndefined(value)) {
            return 0;
        } else if (typeof value !== 'number' || isNaN(value)) {
            throw new Error(desc + ': expected a number, was: <' + value + '>');
        } else {
            return Math.floor(value);
        }
    }

    function checkVersionObject(object, desc) {
        if (!object || !(object instanceof Version)) {
            throw new Error(desc + ': expected a Version object, was: <' + object + '>');
        }
        return object;
    }

    function compareInt(intOne, intTwo) {
        return intOne > intTwo ? 1 : intOne == intTwo ? 0 : -1;
    }

    /**
     * Constructs a version object that contains version information and can be compared with other version objects.
     *
     * @param major major version component
     * @param minor minor version component
     * @param bugfix bugfix version component
     * @constructor
     */
    function Version(major, minor, bugfix) {
        this.major = checkIntValue(major, 'major');
        this.minor = checkIntValue(minor, 'minor');
        this.bugfix = checkIntValue(bugfix, 'bugfix');
    }

    /**
     * Constructs a Version by parsing a version string.
     *
     * @param versionString version string to parse, expected to be in the form of <major>.<minor>.<bugfix>
     * @param versionDesc what version does the `versionString` represent
     */
    Version.parse = function(versionString, versionDesc) {
        versionDesc = versionDesc || 'versionString';
        if (!versionString) {
            throw new Error(versionDesc + ': expected a non-empty string');
        }
        var versionSplit = versionString.split('.');
        if (versionSplit.length !== 3) {
            throw new Error(versionDesc + ': expected <major>.<minor>.<bugfix> string, was: <' + versionString + '>');
        }
        return new Version(parseInt(versionSplit[0]), parseInt(versionSplit[1]), parseInt(versionSplit[2]));
    };

    /**
     * Comparator function to sort Version objects.
     *
     * @param versionOne first version object
     * @param versionTwo second version object
     * @returns {Number} comparison result
     * @see Version.compareTo(that)
     */
    Version.comparator = function(versionOne, versionTwo) {
        return checkVersionObject(versionOne, 'versionOne').compareTo(checkVersionObject(versionTwo, 'versionTwo'));
    };

    /**
     * Return -1, 0 or 1 as this Version object represents a version less than, equal to, or greater than `that`.
     *
     * @param that the other version to compare to
     * @returns {Number} comparison result
     */
    Version.prototype.compareTo = function(that) {
        checkVersionObject(that, 'that');
        var majorResult = compareInt(this.major, that.major);
        if (majorResult != 0) {
            return majorResult;
        }
        var minorResult = compareInt(this.minor, that.minor);
        if (minorResult != 0) {
            return minorResult;
        }
        return compareInt(this.bugfix, that.bugfix);
    };

    Version.prototype.greaterThan = function(that) {
        return this.compareTo(that) > 0;
    };

    Version.prototype.greaterThanOrEqual = function(that) {
        return this.compareTo(that) >= 0;
    };

    Version.prototype.lessThan = function(that) {
        return this.compareTo(that) < 0;
    };

    Version.prototype.lessThanOrEqual = function(that) {
        return this.compareTo(that) <= 0;
    };

    Version.prototype.equals = function(that) {
        return this.compareTo(that) == 0;
    };

    Version.prototype.toMinor = function() {
        return new Version(this.major, this.minor);
    };

    Version.prototype.toMajor = function() {
        return new Version(this.major);
    };

    Version.prototype.toString = function() {
        return this.major + '.' + this.minor + '.' + this.bugfix;
    };

    return Version;
});;
;
/* module-key = 'com.atlassian.applinks.applinks-plugin:applinks-lib', location = 'applinks/internal/lib/aui-version-details.js' */
define('applinks/lib/aui-version-details', [
    'applinks/lib/version'
], function(
    Version
) {
    // minimum 5.8.x and 5.9.x AUI versions - lower versions ship with bugs that break some of the Applinks functionality
    var MINIMUM_58_VERSION = new Version(5, 8, 15);
    var MINIMUM_59_VERSION = new Version(5, 9, 13);
    var VERSION_58 = new Version(5, 8);
    var VERSION_59 = new Version(5, 9);

    function checkVersion(version) {
        // must be >= the minimum required 5.8.x version
        if (version.lessThan(MINIMUM_58_VERSION)) {
            throw new Error('AUI version ' + version + ' is too low, you need to upgrade AUI to ' + MINIMUM_58_VERSION +
                ' or ' + MINIMUM_59_VERSION + ' for Applinks to work');
        }
        // if 5.9, must be >= the minimum required 5.9.x version
        if (version.greaterThanOrEqual(VERSION_59) && version.lessThan(MINIMUM_59_VERSION)) {
            throw new Error('AUI version ' + version + ' is too low, you need to upgrade AUI to ' + MINIMUM_59_VERSION +
                ' for Applinks to work');
        }
    }

    function addVersionDetails(AJS) {
        var ajsVersion = Version.parse(AJS.version, 'AUI version');
        checkVersion(ajsVersion);

        AJS.versionDetails = ajsVersion;
        AJS.versionDetails.is58 = ajsVersion.toMinor().equals(VERSION_58);
        AJS.versionDetails.is59 = ajsVersion.toMinor().equals(VERSION_59);

        return AJS;
    }

    return  {
        /**
         * Check AUI version for compatibility with Applinks and add `versionDetails` field.
         */
        addVersionDetails: addVersionDetails
    };
});;
;
/* module-key = 'com.atlassian.applinks.applinks-plugin:applinks-lib', location = 'applinks/internal/lib/console-amd.js' */
define('applinks/lib/console', function() {
    return window.console;
});;
;
/* module-key = 'com.atlassian.applinks.applinks-plugin:applinks-lib', location = 'applinks/internal/lib/jquery-amd.js' */
define('applinks/lib/jquery', function() {
   return window.jQuery;
});;
;
/* module-key = 'com.atlassian.applinks.applinks-plugin:applinks-lib', location = 'applinks/internal/lib/aui-amd.js' */
define('applinks/lib/aui', [
    'applinks/lib/window',
    'applinks/lib/aui-version-details'
], function(
    window,
    VersionDetails
) {
    var AJS = window.AJS;
    if (!AJS) {
        throw new Error('window.AJS not defined, cannot load AUI');
    }

    return VersionDetails.addVersionDetails(AJS);
});;
;
/* module-key = 'com.atlassian.applinks.applinks-plugin:applinks-lib', location = 'applinks/internal/lib/wrm-amd.js' */
/**
 * Define Web resource manager as an AMD dependency. This should also be present in apps using Atlassian Plugins Web
 * Resources framework.
 */
define('applinks/lib/wrm', function() {
   return window.WRM;
});;
;
/* module-key = 'com.atlassian.applinks.applinks-plugin:applinks-lib', location = 'applinks/internal/lib/skate-amd.js' */
define('applinks/lib/skate', function() {
   // window.skate is not exposed as a global from AUI 5.9, this will return undefined with that version or later
   return window.skate;
});
;
;
/* module-key = 'com.atlassian.applinks.applinks-plugin:applinks-lib', location = 'applinks/internal/lib/window-amd.js' */
/**
 * Define window as AMD module to facilitate unit testing of some modules
 */
define('applinks/lib/window', function() {
    return window;
});;
;
/* module-key = 'com.atlassian.applinks.applinks-plugin:applinks-public', location = 'js/applinks.public.js' */
// NOTE: this is used outside of Applinks. See atlassian-plugin.xml for more details about the associated restrictions

/**
 * Support code to provide appropriate behavior for HTML elements created by
 * ApplicationLinkUIService; also, public functions that can be used from JS code
 * in other plugins to create the same kinds of HTML elements, in case it's not
 * convenient to do so on the back end.
 */
var ApplinksUtils = ApplinksUtils || (function($) {

    var pendingRequests = {},
        pendingConfirmations = {};
    
    // Provide a well-defined name for the authentication window/tab we create with
    // window.open() - may be useful in debugging, and is used by integration tests.
    // Note, IE8 does not allow this name to contain hyphens or periods.
    var authWindowName = "com_atlassian_applinks_authentication";

    /**
     * This function is basically duplicated from messages.js in AJS, because some products
     * only provide a stub version of messages.js within gadgets.
     */
    function makeCloseable(message) {
        var $icon = $('<span class="aui-icon icon-close"></span>').click(function () {
            message.trigger("messageClose", [this]).remove();
        });
        message.append($icon);
    }

    /**
     * Helper function to get the DOM object of the current iframe.
     * @return {Object} a DOM object, or null if we are not in an iframe
     */
    function getCurrentIframe() {
        if (window === parent.window) {
            return null;
        }
        var ret = null,
            myFrameWindow = window;
        $('iframe', parent.document.body).each(function(index) {
            if (this.contentWindow.window === myFrameWindow) {
                ret = this;
            }
        });
        return ret;
    }

    /**
     * Event handler that is called by the applinks authorization completion servlet.  It triggers
     * the completion function for any pending authorization request that matches the given applink
     * ID, and also redispatches the event to any other iframes in the current window.
     * @param {Object} eventObject  JQuery event object
     * @param {string} applinkId  application link ID
     * @param {boolean} success  true if the request was approved
     * @param {string} authAdminUri  URI of the "OAuth Access Tokens" page (will be displayed in the
     *   confirmation message)
     * @param {boolean} wasRedispatched  true if the event has been retriggered from another frame
     * @param {Object} [messages]
     *      'userError': an error message relevant to a non-admin user,
     *      'adminError': an error message relevant to an admin user,
     *      'adminErrorDetails': a list of details related to the admin message if there is one 
     */
    function onAuthCompletion(eventObject, applinkId, success, authAdminUri, wasRedispatched, messages) {
        if (applinkId in pendingRequests) {
            var request = pendingRequests[applinkId];
            if (success) {
                request.authAdminUri = authAdminUri;
                delete pendingRequests[applinkId];
            }
            completeAuthRequest(request, success, messages);
        }
        if (!wasRedispatched && parent && (parent !== window)) {
            var myWindow = window;
            $('iframe', parent.document.body).each(function(index, frame) {
                var scope = frame.contentWindow;
                if (scope !== myWindow) {
                    if (scope.AJS && scope.AJS.$) {
                        scope.AJS.$(scope.document).trigger('applinks.auth.completion',
                            [applinkId, success, authAdminUri, true, messages]);
                    }
                }
            });
        }
    }
      
    /**
     * Fires the appropriate event when the authorization flow has completed.  On approval, reloads
     * the window/frame unless an event handler calls {@code preventDefault()} on the event.
     * @param {Object} applinkProperties  has the same properties passed to {@link createAuthRequestBanner}
     * @param {boolean} approved  true if the request was approved
     * @param {Object} [messages]
     *      'userError': an error message relevant to a non-admin user,
     *      'adminError': an error message relevant to an admin user,
     *      'adminErrorDetails': a list of details related to the admin message if there is one
     */
    function completeAuthRequest(applinkProperties, approved, messages) {
        var $scope = $(document);
        if (approved) {
            // Temporarily bind an event handler so our handler runs after any other handlers that
            // may exist.
            var defaultApprovalHandler = function (eventObject) {
                if (eventObject.isDefaultPrevented()) {
                    // Don't reload, just show the confirmation message
                    showAuthConfirmationBanner(applinkProperties);
                } else {
                    // Reload, but first save a reminder to make us show a confirmation message
                    // after we've reloaded.
                    registerPendingConfirmation(applinkProperties);
                    document.location.reload(true);
                }
            };
            $scope.bind('applinks.auth.approved', defaultApprovalHandler);
            $scope.trigger('applinks.auth.approved', applinkProperties);
            $scope.unbind('applinks.auth.approved', defaultApprovalHandler);
        } else {
            // There's no default behavior for a request that was denied, but fire an event in case
            // anyone is interested.
            $scope.trigger('applinks.auth.denied', [applinkProperties, messages]);
        }
    }

    /**
     * Used internally to make the applink support code aware of a "please authenticate" message
     * element that has been displayed, by wiring the appropriate event handlers and adding the
     * applink's properties to an internal list of authentication requests.
     * @param $element {Object}  a JQuery object
     * @param applinkProperties {Object}  has the same properties passed to {@link createAuthRequestBanner}
     */
    function initAuthRequest($element, applinkProperties) {
        var $authLink = $element.find("a.applink-authenticate");
        
        if ($element.hasClass('aui-message')) {
            // Workaround for incomplete AJS availability in some products
            makeCloseable($element);
        }
        
        $authLink.click(function(e) {
            window.open(applinkProperties.authUri, authWindowName);
            e.preventDefault();
        });
        
        pendingRequests[applinkProperties.id] = applinkProperties;
        
        return $element;
    }
    
    /**
     * Used internally to ensure that {@link initAuthRequest} is called for every
     * authorisation request element that was generated as HTML from the back end,
     * rather than by calling {@link createAuthRequestBanner} or
     * {@link createAuthRequestInline}.  The parameters of the request are passed
     * from the back end in hidden input elements.
     */
    function initAuthRequestElements() {
        $('.applinks-auth-request').each(function(index) {
            var $e = $(this),
                applinkId = $e.find(".applinkId").val(),
                appName = $e.find(".appName").val(),
                appUri = $e.find(".appUri").val(),
                authUri = $e.find(".authUri").val();
            // Ignore request banners that have already been created (by {@link createAuthRequestBanner} or
            // {@link createAuthRequestInline})
            if (applinkId && authUri) {
                initAuthRequest($e, {
                    id: applinkId,
                    appName: appName,
                    appUri: appUri,
                    authUri: authUri});
            }
        });
    }

    /**
     * Builds a "please authenticate" banner (in a standard AUI message box) containing a link that
     * that will start authorization for an application link that needs credentials.
     * <p>
     * On completion of the authorization flow, a JQuery event will be triggered on the document,
     * with the event type "applinks.auth.approved" or "applinks.auth.denied", and an additional
     * parameter equal to the {@code applinkProperties} parameter that was passed here.
     * <p>
     * If authorization is granted (event "applinks.auth.approved"), the default behavior is for the
     * window or frame to be reloaded; also, a confirmation banner will be displayed either within
     * a &lt;div&gt; element of class "applinks-auth-confirmation-container" if one exists, or at the top of
     * the document otherwise.  Reloading of the window/frame can be disabled by having an event
     * handler call {@code preventDefault()} on the event.
     *
     * @param {Object} applinkProperties contains the following application link properties:
     *   {@code id}: the application link identifier;
     *   {@code appName}: the name of the remote application;
     *   {@code appUri}: the base URI of the remote application;
     *   {@code authUri}: the URI for starting the authorization flow
     * @return {Object} a JQuery object referring to a {@code <div>} element, which has not yet
     *   been inserted anywhere on the page; its class is "applinks-auth-request"
     */
    function createAuthRequestBanner(applinkProperties) {
        var $banner = $('<div class="aui-message warning closeable applinks-auth-request"><p><span class="aui-icon icon-applinks-key"></span></p></div>');
        // Note that we can't just use the AJS.messages.warning() function, because it will put a
        // standard warning icon in the message box and we want a custom icon.
        $banner.append(AJS.format("\u041c\u043e\u0436\u0435\u0442 \u0431\u044b\u0442\u044c \u0434\u043e\u0441\u0442\u0443\u043f\u043d\u0430 \u0434\u043e\u043f\u043e\u043b\u043d\u0438\u0442\u0435\u043b\u044c\u043d\u0430\u044f \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044f, \u043f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430 \u003ca class=\"applink-authenticate\" href=\"{0}\"\u003e\u043f\u0440\u043e\u0432\u0435\u0440\u043a\u0443 \u043f\u043e\u0434\u043b\u0438\u043d\u043d\u043e\u0441\u0442\u0438\u003c/a\u003e \u0441 \u003ca href=\"{1}\"\u003e{2}\u003c/a\u003e .",
                                        AJS.escapeHtml(applinkProperties.authUri),
                                        AJS.escapeHtml(applinkProperties.appUri),
                                        AJS.escapeHtml(applinkProperties.appName)));
        initAuthRequest($banner, applinkProperties);
        return $banner;
    }

    /**
     * Builds a "please authenticate" message suitable for displaying inline (in a span
     * with the class "applinks-auth-request"), containing a link that will start authorization.
     * This behaves identically to {@link createAuthRequestBanner}, except it creates a {@code <span>}
     * element instead of a {@code div} and also allows additional text to be displayed.
     * 
     * @param {string} content  optional HTML content to be displayed within the inline
     *   element (e.g. a description of the entity for which authorization is required);
     *   will not be escaped; may be null
     * @param {Object} applinkProperties  see {@link createAuthRequestBanner}
     * @return {Object} a JQuery object referring to a {@code <span>} element, which has not yet
     *   been inserted anywhere on the page; its class is "applinks-auth-request"
     */
    function createAuthRequestInline(content, applinkProperties) {
        var $lozenge = $('<span class="applinks-auth-request"></span>'),
            $contentSpan = $('<span class="applinks-request-description"></span>'),
            message = AJS.format("\u003ca class=\"applink-authenticate\" href=\"{0}\"\u003e\u0410\u0432\u0442\u043e\u0440\u0438\u0437\u0443\u0439\u0442\u0435\u0441\u044c\u003c/a\u003e , \u0447\u0442\u043e\u0431\u044b \u0443\u0432\u0438\u0434\u0435\u0442\u044c \u0434\u043e\u043f\u043e\u043b\u043d\u0438\u0442\u0435\u043b\u044c\u043d\u0443\u044e \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044e.", AJS.escapeHtml(applinkProperties.authUri));
        if (content) {
            $contentSpan.append(content);
            $contentSpan.append(" - ");
        }
        $contentSpan.append(message);
        $lozenge.append($contentSpan);
        initAuthRequest($lozenge, applinkProperties);
        return $lozenge;
    }

    /**
     * Used internally to remember the fact that we have just completed authorizing an
     * applink and are about to refresh the iframe associated with it, so that we can
     * display a confirmation message after the iframe is refreshed.
     */
    function registerPendingConfirmation(applinkProperties) {
        var frame = getCurrentIframe();
        if ((!frame) || (!frame.id)) {
            return;
        }
        if (! parent.ApplinksUtils.pendingConfirmations) {
            parent.ApplinksUtils.pendingConfirmations = { };
        }
        if (!(frame.id in parent.ApplinksUtils.pendingConfirmations)) {
            parent.ApplinksUtils.pendingConfirmations[frame.id] = [];
        }
        parent.ApplinksUtils.pendingConfirmations[frame.id].push(applinkProperties);
        return;
    }

    /**
     * Called after a page load, to see if we've been refreshed due to a successful authorization.
     * If we're in an iframe, a variable will have been set on the parent window to tell us that
     * this happened.  If so, insert a confirmation banner at the top of the iframe.
     */
    function checkForPendingConfirmations() {
        if (parent && parent.ApplinksUtils && parent.ApplinksUtils.pendingConfirmations) {
            var myFrame = getCurrentIframe();
            if (myFrame) {
                if (myFrame.id in parent.ApplinksUtils.pendingConfirmations) {
                    var pendingConfirmations = parent.ApplinksUtils.pendingConfirmations[myFrame.id];
                    delete parent.ApplinksUtils.pendingConfirmations[myFrame.id];
                    for (var i = 0, n = pendingConfirmations.length; i < n; i++) {
                        showAuthConfirmationBanner(pendingConfirmations[i]);
                    }
                }
            }
        }
    }

    /**
     * Displays a confirmation banner.  If an element exists with the class
     * "applinks-auth-confirmation-contianer", it is inserted there, otherwise at the top of the
     * document.
     */
    function showAuthConfirmationBanner(applinkProperties) {
        var scope = $(document),
            banner = $('<div class="aui-message success closeable applinks-auth-confirmation"><p><span class="aui-icon icon-applinks-key-success"></span></p></div>'),
            container = scope.find('div.applinks-auth-confirmation-container');
        if (!container.length) {
            container = scope.find('body');
        }
        banner.append(AJS.format("\u042d\u0442\u043e \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u0435 \u0442\u0435\u043f\u0435\u0440\u044c \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0435\u0442 \u0443\u0447\u0435\u0442\u043d\u044b\u0435 \u0434\u0430\u043d\u043d\u044b\u0435 \u003ca hrefapplinks.util.auth.request=\u041c\u043e\u0436\u0435\u0442 \u0431\u044b\u0442\u044c \u0434\u043e\u0441\u0442\u0443\u043f\u043d\u0430 \u0434\u043e\u043f\u043e\u043b\u043d\u0438\u0442\u0435\u043b\u044c\u043d\u0430\u044f \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044f, \u043f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430 \u003ca classapplinks.util.auth.request.inline=\u003ca classapplinks.v3.config.action.cancel=\u041e\u0442\u043c\u0435\u043d\u0438\u0442\u044c",
                                        AJS.escapeHtml(applinkProperties.appUri),
                                        AJS.escapeHtml(applinkProperties.appName),
                                        AJS.escapeHtml(applinkProperties.authAdminUri)));
        makeCloseable(banner);
        container.prepend(banner);
        setTimeout(function() {
            banner.fadeOut(1000, function() {
                $(this).remove();
            });
        }, 5000);
    }
    
    /**
     * Initialization function to be called once at document ready time.
     */
    function setup() {
        // If we're in an iframe, set up an object in the parent window that we can use to
        // keep track of state even if the iframe is refreshed.
        if (parent && !(parent === window)) {
            if (! parent.ApplinksUtils) {
                parent.ApplinksUtils = { };
            }
        }
        
        $(document).bind('applinks.auth.completion', onAuthCompletion);

        initAuthRequestElements();
        checkForPendingConfirmations();
    }

    $(document).ready(setup);
    
    return {      
        createAuthRequestBanner: createAuthRequestBanner,
        createAuthRequestInline: createAuthRequestInline
    };
})(AJS.$);
;
;
/* module-key = 'com.atlassian.applinks.applinks-plugin:applinks-common-exported', location = 'applinks/internal/common/docs.js' */
define('applinks/common/docs', [
    'applinks/lib/jquery',
    'applinks/lib/aui',
    'applinks/common/help-paths'
], function(
    $,
    AJS,
    ApplinksHelpPaths
) {
    // NOTE: should be moved to applinks/feature/help-link, see APLDEV-593

    return {
        /**
         * NOTE: this is a dynamically generated version of the link build in _help_link.vm, any update here should be
         * applied there.
         * @method createDocLink
         * @param pageKey a key that maps to a page in ual-help-paths.properties
         * @param sectionKey (Optional) a key that maps to an anchor section id in ual-help-paths.properties
         * @param classNames (Optional) Whitespace separated list of additional class names
         * @return an html &lt;a&gt; element targeting the specified page & section
         */
        createDocLink: function(pageKey, sectionKey, classNames) {
            if (!classNames) {
                classNames = '';
            } else {
                classNames = ' ' + classNames;
            }
            return $('<a/>', {
                'class': 'ual-help-link help-link' + classNames,
                href: this.getDocHref(pageKey, sectionKey),
                target: '_blank',
                'data-help-link-key': pageKey,
                text: "\u041f\u043e\u043c\u043e\u0449\u044c",
                title: "\u041f\u043e\u043c\u043e\u0449\u044c"
            });
        },
        /**
         * @method getDocHref
         * @param pageKey a key that maps to a page in ual-help-paths.properties
         * @param sectionKey (Optional) a key that maps to an anchor section id in ual-help-paths.properties
         * @return the url of the given page and section (if specified)
         */
        getDocHref: function(pageKey, sectionKey) {
            var link = ApplinksHelpPaths.getFullPath(pageKey);
            if (sectionKey) {
                link += '#' + ApplinksHelpPaths.getPath(sectionKey);
            }
            return link;
        }
    };

});
;
;
/* module-key = 'com.atlassian.applinks.applinks-plugin:applinks-common-exported', location = 'applinks/internal/common/help-paths.js' */
define('applinks/common/help-paths', [
    'applinks/lib/console',
    'applinks/lib/wrm',
    'applinks/lib/lodash',
    'applinks/common/modules',
    'applinks/common/preconditions'
], function(
    console,
    WRM,
    _,
    ApplinksModules,
    Preconditions
) {
    // NOTE: should be moved to applinks/feature/help-link, see APLDEV-593

    // lazy-load help paths, facilitates unit-testing
    var allHelpPaths = _.memoize(function() {
        var helpPaths = WRM.data.claim(ApplinksModules.dataFqn(ApplinksModules.COMMON_EXPORTED, 'applinks-help-paths'));
        if (!helpPaths.entries) {
            console.warn('Help paths not found, all help links are likely to be broken.');
        }
        return helpPaths.entries || {};
    });

    var getPath = function(key, sectionKey) {
        Preconditions.nonEmptyString(key, 'key');
        var path = allHelpPaths()[key] || key;
        if (sectionKey) {
            Preconditions.nonEmptyString(sectionKey, 'sectionKey');
            var prefix = path.replace(/\+/g, ''); // "g" flag to remove _all_ '+' signs
            path += '#' +prefix + '-' + sectionKey;
        }
        return path;
    };

    function endsWith(string, suffix) {
        return string.indexOf(suffix, string.length - suffix.length) !== -1;
    }

    function addSuffixIfRequired(string, suffix) {
        return endsWith(string, suffix) ? string : string + suffix;
    }

    return {
        /**
         * @param key {string} key to get the path for
         * @returns {string} relative help path that can be appended to any relevant docs base URL
         */
        getPath: getPath,

        /**
         * @param key {string} key to get the path for
         * @param sectionKey {string} optional key of the anchor on the target page
         * @returns {string} full help path including the base URL
         */
        getFullPath: function(key, sectionKey) {
            var baseUrl = this.baseUrl();
            return addSuffixIfRequired(baseUrl, '/') + this.getPath(key, sectionKey);
        },

        /**
         * @returns {string} configured base URL for the help paths
         */
        baseUrl: _.partial(getPath, 'applinks.docs.root')
    }
});;
;
/* module-key = 'com.atlassian.applinks.applinks-plugin:applinks-common-exported', location = 'applinks/internal/common/events.js' */
define('applinks/common/events', [
    'applinks/lib/jquery',
    'applinks/lib/lodash',
    'applinks/lib/window',
    'applinks/common/preconditions'
], function(
    $,
    _,
    window,
    Preconditions
) {
    var PREFIX = 'applinks.event.';

    function applinksEvent(eventId) {
        return PREFIX + Preconditions.nonEmptyString(eventId, 'eventId');
    }

    /**
     * Provides common Applinks event IDs and a simple event system facade API. This is a preferred way to subscribe to
     * and raise Applinks-specific events as it does not depend on a specific event bus or event target (such as
     * `document`), as well as facilitates unit testing.
     */
    return {
        PREREADY: applinksEvent('preready'),
        READY: applinksEvent('ready'),

        /**
         * Raised when applinks list is first loaded
         */
        APPLINKS_LOADED: applinksEvent('loaded'),
        /**
         * Raised when applinks list is updated
         */
        APPLINKS_UPDATED: applinksEvent('updated'),

        /**
         * This event is only raised when linking to Atlassian applications
         * Can be consumed by other plugins
         */
        NEW_APPLINK_CREATED: applinksEvent('created'),

        /**
         * Raised when v3 onboarding has finished or, or has never run on the current page (and won't).
         */
        V3_ONBOARDING_FINISHED: applinksEvent('v3-onboarding-finished'),

        // legacy events
        Legacy: {
            MESSAGE_BOX_DISPLAYED: applinksEvent('message-box-displayed')
        },

        applinksEvent: applinksEvent,

        on: function(events, handler, context) {
            var handlerWithContext = context ? _.bind(handler, context) : handler;
            $(window.document).on(events, handlerWithContext);
        },

        off: function(events, handler) {
            $(window.document).off(events, handler);
        },

        trigger: function(event, data) {
            $(window.document).trigger(event, data);
        }
    }
});;
;
/* module-key = 'com.atlassian.applinks.applinks-plugin:applinks-common-exported', location = 'applinks/internal/common/i18n.js' */
define('applinks/common/i18n', [
    'applinks/lib/lodash',
    'applinks/lib/jquery',
    'applinks/lib/wrm',
    'applinks/common/modules',
    'applinks/common/preconditions',
    'applinks/common/products'
], function(
    _,
    $,
    WRM,
    ApplinksModules,
    Preconditions,
    ApplinksProducts
) {
    var getAllEntityTypes = _.memoize(function() {
        var val = WRM.data.claim(ApplinksModules.dataFqn(ApplinksModules.COMMON_EXPORTED, 'entity-types'));
        return Preconditions.hasValue(val, 'entity-types', 'Entity Types data not found');
    });

    var getAllAuthTypes = _.memoize(function() {
        var val = WRM.data.claim(ApplinksModules.dataFqn(ApplinksModules.COMMON_EXPORTED, 'authentication-types'));
        return Preconditions.hasValue(val, 'authentication-types', 'Authentication Types data not found');
    });

    return {
        
        /**
         * @param typeId ID of the application type to resolve
         * @returns {string} resolved i18n-ed type name, or the original `typeId` if there is no mapping
         */
        getApplicationTypeName: function(typeId) {
            return ApplinksProducts.getTypeName(typeId);
        },

        /**
         * @param typeId ID of the entity type to resolve
         * @returns {string} resolved i18n-ed singular entity type name, or the original `typeId` if there is no mapping
         */
        getEntityTypeName: function(typeId) {
            return getAllEntityTypes().singular[typeId] || typeId;
        },

        /**
         * @param typeId ID of the entity type to resolve
         * @returns {string} resolved i18n-ed plural entity type name, or the original `typeId` if there is no mapping
         */
        getPluralizedEntityTypeName: function(typeId) {
            return getAllEntityTypes().plural[typeId] || typeId;
        },

        /**
         * @param type ID of the authentication type to resolve (usually in a form of full class name)
         * @returns {string} resolved i18n-ed authentication type name, or the original `type` if there is no mapping
         */
        getAuthenticationTypeName: function(type) {
            return getAllAuthTypes()[type] || type;
        }
    };
});
;
;
/* module-key = 'com.atlassian.applinks.applinks-plugin:applinks-common-exported', location = 'applinks/internal/common/modules.js' */
/**
 * Applinks plugin modules core constants and definitions.
 */
define('applinks/common/modules', function() {
    return {
        /**
         * Applinks plugin key
         */
        PLUGIN_KEY: 'com.atlassian.applinks.applinks-plugin',

        // key web resource keys
        COMMON_EXPORTED: 'applinks-common-exported',
        COMMON: 'applinks-common',

        /**
         * Fully qualifies a module name using the plugin key.
         *
         * @param {string} moduleName module name to qualify
         * @returns {string} fully qualified name
         */
        fqn: function(moduleName) {
            return this.PLUGIN_KEY + ':' + moduleName;
        },

        /**
         * Fully qualifies web-resource data using module name and data key.
         *
         * @param {string} moduleName module name
         * @param {string} dataKey key of the data element
         * @returns {string} fully qualified name
         */
        dataFqn: function(moduleName, dataKey) {
            return this.fqn(moduleName) + '.' + dataKey;
        }
    };
});;
;
/* module-key = 'com.atlassian.applinks.applinks-plugin:applinks-common-exported', location = 'applinks/internal/common/preconditions.js' */
define('applinks/common/preconditions', [
    'applinks/lib/lodash'
], function(
    _
) {
    function nonEmptyString(value, varName, customMessage) {
        return _checkArgument(
            _.isString(value) && !_.isEmpty(value),
            customMessage,
            _withVarName(varName, ': expected a non-empty string, was: <' + value + '>'),
            value
        );
    }

    function isFunction(value, varName, customMessage) {
        return _checkArgument(
            _.isFunction(value),
            customMessage,
            _withVarName(varName, ': expected a function, was: ' + value),
            value
        );
    }

    function isArray(value, varName, customMessage) {
        return _checkArgument(
            _.isArray(value),
            customMessage,
            _withVarName(varName, ': expected an array, was: ' + value),
            value
        );
    }

    function hasValue(value, varName, customMessage) {
        return _checkArgument(
            value,
            customMessage,
            _withVarName(varName, ': expected a value'),
            value
        );
    }

    function _checkArgument(test, message, defaultMessage, actualValue) {
        var actualMessage = message ? message : defaultMessage;
        if (!test) {
            throw new Error(actualMessage)
        }
        return actualValue || test;
    }

    function _withVarName(varName, msg) {
        return (varName || '[unspecified]') + msg;
    }

    return {
        checkArgument: _.partial(_checkArgument, _, _, '', _),
        nonEmptyString: nonEmptyString,
        isArray: isArray,
        isFunction: isFunction,
        hasValue: hasValue
    };
});;
;
/* module-key = 'com.atlassian.applinks.applinks-plugin:applinks-common-exported', location = 'applinks/internal/common/products.js' */
define('applinks/common/products', [
    'applinks/lib/lodash',
    'applinks/lib/wrm',
    'applinks/common/modules',
    'applinks/common/preconditions'
], function(
    _,
    WRM,
    ApplinksModules,
    Preconditions
) {
    var getAllTypes = _.memoize(function() {
        var val = WRM.data.claim(ApplinksModules.dataFqn(ApplinksModules.COMMON_EXPORTED, 'applinks-types'));
        return Preconditions.hasValue(val, 'types', 'Application Types data not found');
    });

    /**
     * @param typeId ID of the application type to resolve
     * @returns {string} resolved i18n-ed type name, or the original `typeId` if there is no mapping
     */
    function getTypeName(typeId) {
        return getAllTypes()[typeId] || typeId;
    }

    /**
     * Map of Atlassian product keys to application type IDs
     */
    return {
        BAMBOO: 'bamboo',
        BITBUCKET: 'stash', // special case, see java class com.atlassian.applinks.application.bitbucket.BitbucketApplicationTypeImpl.TYPE_ID
        CONFLUENCE: 'confluence',
        FECRU: 'fecru',
        JIRA: 'jira',
        REFAPP: 'refapp',
        STASH: 'stash',
        getTypeName: getTypeName
    };
});;
;
/* module-key = 'com.atlassian.applinks.applinks-plugin:applinks-util-js', location = 'applinks/internal/non-amd/rest-service.js' */
// NOTE: this is used outside of Applinks. See atlassian-plugin.xml for more details about the associated restrictions

(function(AppLinksI18n, ApplinksDocs, ApplinksEvents) {
    /**
     * The triggering of AppLinks initialisation can be customised by setting a function on
     * AJS.AppLinksInitialisationBinder. The binder function should take a single argument which is a zero-arg function to
     * run and should execute this function when appropriate.
     */
    AppLinks = AJS.$.extend(window.AppLinks || {}, {
        Event: {
            NAMESPACE: 'applinks'
        },
        I18n: AppLinksI18n,
        Docs: ApplinksDocs
    });
    AppLinks.Event = AJS.$.extend(window.AppLinks.Event, ApplinksEvents);

    // Is there an overridden initialisation binder?
    if (AJS.AppLinksInitialisationBinder) {
        AppLinks.initialisationBinder = AJS.AppLinksInitialisationBinder;
    } else {
        // The default bind if no specific binder is specified
        AppLinks.initialisationBinder = function(f) {
            AJS.toInit(f);
        }
    }

    AppLinks.initialisationBinder(function() {
        //$ is passed in by AJS.toInit but initilizationBinder can be over loaded by products so that $ is unsafe.
        var $ = AJS.$;
        AppLinks = $.extend(window.AppLinks || {}, {
            failure: function(data) {
                if (data.status == 401) {
                    window.location.reload();
                } else {
                    var message = AppLinks.parseError(data);
                    var errorDivs = $('.page-error');

                    if (errorDivs.length > 0) {
                        errorDivs.html(message).fadeIn('slow');
                    } else {
                        alert('REST request failed: ' + message);
                    }
                }
            },
            jsonRequest: function(url, type, data, success, error) {
                if (data) {
                    data = JSON.stringify(data);
                }
                $(".page-error").fadeOut('fast');
                if (!error) error = AppLinks.failure;
                return jQuery.ajax({
                    url: url,
                    type: type,
                    data: data,
                    dataType: 'json',
                    contentType: "application/json; charset=utf-8",
                    cache: false,
                    success: success,
                    error: error
                });
            },
            xmlRequest: function(url, type, data, success, error) {
                if (data) {
                    data = JSON.stringify(data);
                }
                $(".page-error").fadeOut('fast');
                if (!error) error = AppLinks.failure;
                return jQuery.ajax({
                    url: url,
                    type: type,
                    data: data,
                    dataType: 'xml',
                    contentType: "application/xml; charset=utf-8",
                    cache: false,
                    success: success,
                    error: error
                });
            },
            parseError: function(errorData) {
                var error;
                try {
                    error = JSON.parse(errorData.responseText);
                } catch (e) {
                    if (errorData.statusText) {
                        return error = errorData.statusText;
                    } else {
                        return errorData;
                    }
                }
                if (error.message) {
                    if ($.isArray(error.message)) {
                        return error.message.join(' ');
                    }
                    return error.message;
                }
                else {
                    return errorData.statusText;
                }
            },
            put: function(url, data, success, error) {
                return AppLinks.jsonRequest(url, 'PUT', data, success, error);
            },
            post: function(url, data, success, error) {
                return AppLinks.jsonRequest(url, 'POST', data, success, error);
            },
            update: function(data, success, error) {
                AppLinks.put(AppLinks.self_link(data), data, success, error);
            },
            get: function(url, success, error) {
                return AppLinks.jsonRequest(url, 'GET', null, success, error);
            },
            getXml: function(url, success, error) {
                return AppLinks.xmlRequest(url, 'GET', null, success, error);
            },
            self_link: function(item) {
                for (var i = 0, _i = item.link.length; i < _i; i++) {
                    var link = item.link[i];
                    if (link.rel == "self") return link.href;
                }

                throw "No self-link found";
            },
            del: function(urlOrObject, success, error) {
                var url;
                if (typeof(urlOrObject) == 'string') url = urlOrObject;
                else url = AppLinks.self_link(urlOrObject);
                return AppLinks.jsonRequest(url, 'DELETE', null, success, error);
            },
            SPI: $.extend({}, {
                API_VERSION: "1.0",
                REST_RESOURCE_URL: AJS.contextPath() + "/rest/applinks/",
                BASE_URL: AJS.contextPath() + "/rest/applinks/1.0",
                OAUTH_REST_RESOURCE_URL: AJS.contextPath() + "/rest/applinks-oauth/",
                OAUTH_BASE_URL: AJS.contextPath() + "/rest/applinks-oauth/1.0",

                /**
                 * Update the API version and associated urls.
                 * @param version
                 */
                setApiVersion: function(version){
                    AppLinks.SPI.API_VERSION = version;
                    AppLinks.SPI.setBaseUrl(AppLinks.SPI.REST_RESOURCE_URL + AppLinks.SPI.API_VERSION);
                },
                setBaseUrl: function(url){
                    AppLinks.SPI.BASE_URL = url;
                },
                setOAuthBaseUrl: function(url){
                    AppLinks.SPI.OAUTH_BASE_URL = url;
                },
                /**
                 * Build a base URL for rest calls using the specified baseUrl.
                 * @param baseUrl
                 * @returns {string}
                 */
                getRemoteRestBaseUrl: function(baseUrl) {
                    return baseUrl + "/rest/applinks/" + AppLinks.SPI.API_VERSION;
                },
                /**
                 * Build a base URL for plugin servlet calls using the specified baseUrl.
                 * @param baseUrl
                 * @returns {string}
                 */
                getRemotePluginServletBaseUrl: function(baseUrl) {
                    return baseUrl + "/plugins/servlet";
                },
                getAllLinks: function(success, failure) {
                    var url = AppLinks.SPI.BASE_URL + "/applicationlink";
                    return AppLinks.get(url, success, failure);
                },
                getAllLinksWithAuthInfo: function(success, failure) {
                    var url = AppLinks.SPI.BASE_URL + "/listApplicationlinks";
                    return AppLinks.get(url, success, failure);
                },
                getApplicationLinkState: function(id, success, failure) {
                    var url = AppLinks.SPI.BASE_URL + "/listApplicationlinkstates/id/" + id;
                    return AppLinks.get(url, success, failure);
                },
                getLinksOfType: function(typeId, success, failure) {
                    var url = AppLinks.SPI.BASE_URL + "/applicationlink/type/" + typeId;
                    return AppLinks.get(url, success, failure);
                },
                tryToFetchManifest: function(url, success, failure) {
                    var restUrl = AppLinks.SPI.BASE_URL + '/applicationlinkForm/manifest.json?url=' + encodeURIComponent(url);
                    return AppLinks.get(restUrl, success, failure);
                },
                getManifestFor: function(id, success, failure) {
                    var url = AppLinks.SPI.BASE_URL + '/manifest/' + id + ".json";
                    return AppLinks.get(url, success, failure);
                },
                getLocalManifest: function(success, failure){
                    var url = AppLinks.SPI.BASE_URL + '/manifest.json';
                    return AppLinks.get(url, success, failure);
                },
                /**
                 * Attempt to get the Manifest of the remote application, via a direct REST call.
                 * Requires CORS enabled on the REST resource.
                 * @param url
                 * @param success
                 * @param failure
                 * @returns {*}
                 */
                getRemoteManifest: function(remoteBaseUrl, success, failure){
                    var remoteManifestUrl = AppLinks.SPI.getRemoteRestBaseUrl(remoteBaseUrl) + '/manifest.json';
                    return AppLinks.get(remoteManifestUrl, success, failure);
                },
                /**
                 * Attempt to get the OAuth Consumer Info of the remote application, via a direct call.
                 * Requires CORS enabled on the REST resource.
                 * @param url
                 * @param success
                 * @param failure
                 * @returns {*}
                 */
                getRemoteOAuthConsumerInfo: function(remoteBaseUrl, success, failure){
                    var remoteManifestUrl = AppLinks.SPI.getRemotePluginServletBaseUrl(remoteBaseUrl) + '/oauth/consumer-info';
                    return AppLinks.getXml(remoteManifestUrl, success, failure);
                },
                getApplinkStatus: function (applinkId, success, failure) {
                    var url = AppLinks.SPI.BASE_URL + '/status/' + applinkId;
                    return AppLinks.get(url, success, failure);
                },
                createStaticUrlAppLink: function(applicationType, success, failure) {
                    var restUrl = AppLinks.SPI.BASE_URL + '/applicationlinkForm/createStaticUrlAppLink?typeId=' + applicationType;
                    return AppLinks.post(restUrl, null, success, failure);
                },
                createLink: function(applicationLink, username, password, createTwoWayLink, customRpcUrl, rpcUrl, configFormValues, success, failure) {
                    var url = AppLinks.SPI.BASE_URL + '/applicationlinkForm/createAppLink';
                    var data = {
                        applicationLink: applicationLink,
                        username: username,
                        password: password,
                        createTwoWayLink: createTwoWayLink,
                        customRpcURL: customRpcUrl,
                        rpcUrl: rpcUrl,
                        configFormValues: configFormValues
                    };
                    return AppLinks.post(url, data, success, failure);
                },
                verifyTwoWayLinkDetails : function (remoteUrl, rpcUrl, username, password, success, failure) {
                    var url = AppLinks.SPI.BASE_URL + '/applicationlinkForm/details';
                    var data = {
                        username: username,
                        password: password,
                        remoteUrl: remoteUrl,
                        rpcUrl: rpcUrl
                    };
                    return AppLinks.post(url, data, success, failure);
                },
                getApplicationLinkInfo: function (appId, success, error) {
                    var url = AppLinks.SPI.BASE_URL + "/applicationlinkInfo/id/" + appId;
                    return AppLinks.get(url, success, error);
                },
                deleteLink: function(applicationLink, reciprocate, success, error) {
                    var url = AppLinks.SPI.BASE_URL + "/applicationlink/" + applicationLink.id;
                    if (reciprocate) url += "?reciprocate=true";
                    return AppLinks.del(url, success, error);
                },
                makePrimary: function(applicationLink, success) {
                    var url = AppLinks.SPI.BASE_URL + "/applicationlink/primary/" + applicationLink.id;
                    return AppLinks.post(url, null, success);
                },
                relocate: function(applicationLink, newUrl, suppressWarnings, success, error) {
                    var url = AppLinks.SPI.BASE_URL + "/relocateApplicationlink/" + applicationLink.id + "?newUrl=" + encodeURIComponent(newUrl) +
                        "&nowarning=" + (suppressWarnings ? "true" : "false");
                    return AppLinks.post(url, null, success, error);
                },
                legacyUpgrade: function(applicationLink, success, error) {
                    var url = AppLinks.SPI.BASE_URL + "/upgrade/legacy/" + applicationLink.id;
                    return AppLinks.post(url, null, success, error);
                },
                ualUpgrade: function(applicationLink, body, success, error) {
                    var url = AppLinks.SPI.BASE_URL + "/upgrade/ual/" + applicationLink.id;
                    return AppLinks.post(url, body, success, error);
                },
                getEntityTypesForApplicationType: function(applicationType, success, error) {
                    var url = AppLinks.SPI.BASE_URL + "/type/entity/" + applicationType;
                    return AppLinks.get(url, success, error);
                },
                getLocalEntitiesWithLinksToApplication: function(applicationLinkId, success, error) {
                    var url = AppLinks.SPI.BASE_URL + "/entitylink/localEntitiesWithLinksTo/" + applicationLinkId + ".json";
                    return AppLinks.get(url, success, error);
                },
                getEntityLinksForApplication: function(applicationLinkId, success, error) {
                    var url = AppLinks.SPI.BASE_URL + "/entities/" + applicationLinkId + ".json";
                    AppLinks.get(url, success, error);
                },
                getEntityLinksForApplicationUsingAnonymousAccess: function(applicationLinkId, success, error) {
                    var url = AppLinks.SPI.BASE_URL + "/entities/anonymous/" + applicationLinkId + ".json";
                    return AppLinks.get(url, success, error);
                },
                createNonUalEntityLink: function(localType, localKey, applicationId, remoteTypeId, remoteKey, name, success, error) {
                    var url = AppLinks.SPI.BASE_URL + "/entitylink/" + localType + "/" + localKey + "?reciprocate=false";
                    var data = {
                        applicationId: applicationId,
                        typeId: remoteTypeId,
                        key: remoteKey,
                        name: name,
                        isPrimary: false
                    };
                    return AppLinks.put(url, data, success, error);
                },
                createEntityLink: function(localType, localKey, entity, reciprocate, success, failure) {
                    var url = AppLinks.SPI.BASE_URL + "/entitylink/" + localType + "/" + localKey + "?reciprocate=";
                    url += (reciprocate ? "true" : "false");
                    return AppLinks.put(url, entity, success, failure);
                },
                getConfiguredEntityLinks: function(localType, localKey, success, error) {
                    var url = AppLinks.SPI.BASE_URL + "/entitylink/primaryLinks/" + localType + "/" + localKey + ".json";
                    return AppLinks.get(url, success, error);
                },
                deleteEntityLink: function(localTypeId, localKey, entity, reciprocate, success, error) {
                    var url = AppLinks.SPI.BASE_URL + "/entitylink/" + localTypeId + "/" + localKey + "?typeId=" + entity.typeId + "&key=" + entity.key + "&applicationId=" + entity.applicationId + "&reciprocate=" + reciprocate;
                    return AppLinks.del(url, success, error);
                },
                makePrimaryEntityLink: function(localTypeID, localKey, entity, success, error) {
                    var url = AppLinks.SPI.BASE_URL + "/entitylink/primary/" + localTypeID + "/" + localKey + "?typeId=" + entity.typeId + "&key=" + entity.key + "&applicationId=" + entity.applicationId;
                    return AppLinks.post(url, null, success, error);
                },
                canDeleteAppLink: function(applicationId, success, error) {
                    var url = AppLinks.SPI.BASE_URL + "/permission/reciprocate-application-delete/" + applicationId;
                    return AppLinks.get(url, success, error);
                },
                canDeleteEntityLink: function(localTypeId, localKey, entity, success, error) {
                    var url = AppLinks.SPI.BASE_URL + "/permission/reciprocate-entity-delete/" + entity.applicationId + "/" + localTypeId + "/" + localKey + "/" + entity.typeId + "/" + entity.key;
                    return AppLinks.get(url, success, error);
                },
                canCreateReciprocateEntityLink: function(applicationId, success, error) {
                    var url = AppLinks.SPI.BASE_URL + "/permission/reciprocate-entity-create/" + applicationId;
                    return AppLinks.get(url, success, error);
                },
                processPermissionCode: function(settings) {
                    var config = {
                        noPermission: function() {},
                        missing: function() {},
                        credentialsRequired: function(authUrl) {},
                        authenticationFailed: function(authUrl) {},
                        noAuthentication: function(authUrl) {},
                        noAuthenticationConfigured: function() {},
                        noConnection: function() {},
                        allowed: function() {},
                        unrecognisedCode: function(code) {},
                        updateView: function(message, icon, button) {}
                    };

                    if (!settings) settings = {};

                    settings = $.extend(config, settings);

                    return function(data) {
                        var code = data.code;
                        if (code == "NO_PERMISSION") {
                            settings.noPermission();
                        } else if (code == "MISSING") {
                            settings.missing();
                        } else if (code == "CREDENTIALS_REQUIRED") {
                            settings.credentialsRequired(data.url);
                        } else if (code == "AUTHENTICATION_FAILED") {
                            settings.authenticationFailed(data.url);
                        } else if (code == "NO_AUTHENTICATION") {
                            settings.noAuthentication(data.url);
                        } else if (code == "NO_AUTHENTICATION_CONFIGURED") {
                            settings.noAuthenticationConfigured();
                        } else if (code == "NO_CONNECTION") {
                            settings.noConnection();
                        } else if (code == "ALLOWED") {
                            settings.allowed();
                        } else {
                            settings.unrecognisedCode(data.code);
                        }
                    };
                },
                addAuthenticationTrigger: function(target, authUrl, callbacks) {
                    if (!callbacks) {
                        callbacks = {};
                    }

                    if (typeof callbacks.onSuccess == "undefined") {
                        callbacks.onSuccess = function() {
                            location.reload();
                        }
                    }

                    if (typeof callbacks.onFailure == "undefined") {
                        callbacks.onFailure = function() {
                            return true;
                        }
                    }
                    //Unbind previous click listener, otherwise we might end up opening multiple windows.
                    $(target).unbind('click');
                    $(target).click(function() {
                        if (callbacks.before) {
                            callbacks.before();
                        }
                        AppLinks.authenticateRemoteCredentials(authUrl, callbacks.onSuccess, callbacks.onFailure);
                    });
                },
                showCreateEntityLinkSuggestion: function() {
                    return true;
                },
                getApplicationLink: function(id, success, failure) {
                    var url = AppLinks.SPI.BASE_URL + '/applicationlink/' + id;
                    return AppLinks.get(url, success, failure);
                },
                createApplicationLink: function(id, name, rpcUrl, displayUrl, typeId, success, failure) {
                    var url = AppLinks.SPI.BASE_URL + '/applicationlink';
                    var data = {
                        id: id,
                        name: name,
                        rpcUrl: rpcUrl,
                        displayUrl: displayUrl,
                        typeId: typeId
                    };
                    return AppLinks.put(url, data, success, failure);
                },
// TODO APLDEV-3 extract OAuth creation code into OAuth specific js files in the Oauth plugin.
                createConsumer: function(id, key, name, description, sharedSecret, publicKey, twoLOAllowed, executingTwoLOUser, twoLOImpersonationAllowed, outgoing, success, failure) {
                    var url = AppLinks.SPI.OAUTH_BASE_URL + '/applicationlink/' + id + '/authentication/consumer';
                    var data = {
                        key: key,
                        name: name,
                        description: description,
                        sharedSecret: sharedSecret,
                        publicKey: publicKey,
                        outgoing: outgoing,
                        twoLOAllowed: twoLOAllowed,
                        executingTwoLOUser: executingTwoLOUser,
                        twoLOImpersonationAllowed: twoLOImpersonationAllowed
                    };
                    return AppLinks.put(url, data, success, failure);
                },
                createConsumerAutoConfigure: function(id, twoLOAllowed, executingTwoLOUser, twoLOImpersonationAllowed, success, failure) {
                    var url = AppLinks.SPI.OAUTH_BASE_URL + '/applicationlink/' + id + '/authentication/consumer?autoConfigure=true';
                    var data = {
                        twoLOAllowed: twoLOAllowed,
                        executingTwoLOUser: executingTwoLOUser,
                        twoLOImpersonationAllowed: twoLOImpersonationAllowed
                    };
                    return AppLinks.put(url, data, success, failure);
                },
                registerProvider: function(id, provider, config, success, failure) {
                    var url = AppLinks.SPI.BASE_URL + '/applicationlink/' + id + '/authentication/provider';
                    var data = {
                        config : config,
                        provider : provider
                    };
                    return AppLinks.put(url, data, success, failure);
                },
                enableFeature: function(featureName, success, failure) {
                    var url = AppLinks.SPI.BASE_URL + '/features/' + featureName;
                    return AppLinks.put(url, {}, success, failure);
                },
                disableFeature: function(featureName, success, failure) {
                    var url = AppLinks.SPI.BASE_URL + '/features/' + featureName;
                    return AppLinks.del(url, success, failure);
                }
            }, (window.AppLinks && window.AppLinks.SPI) || {})
        });

        AppLinks.UI = {
            showInfoBox: function(message) {
                $('.aui-message.success').remove();
                AppLinks.UI.createMessage('success', message, 'page-info');
            },
            hideInfoBox: function() {
                $('.aui-message.success').remove();
            },
            showErrorBox: function(message) {
                AppLinks.UI.createMessage('error', message, 'page-error');
            },
            hideErrorBox: function() {
                $('.aui-message.error').remove();
            },
            showWarningBox: function(messages) {
                if ($.isArray(messages) && messages.length > 0) {
                    var ulEl = $("<ul></ul>");
                    $(messages).each(function(index) {
                        ulEl.append($("<li/>", {
                            text: messages[index]
                        }));
                    });
                    var messageEl = $('<div class="page-warning"></div>').append(ulEl);
                    AppLinks.UI.createMessage('warning', messageEl.html(), 'page-warning');
                } else {
                    AppLinks.UI.createMessage('warning', messages, 'page-warning');
                }
            },
            hideWarningBox: function() {
                $('.aui-message.warning').remove();
            },
            shortenString: function(message, maxLength) {
                if (message.length  > maxLength) {
                    message = message.substring(0, maxLength) + "...";
                }
                return message;
            },
            createMessage: function(type, message, cssClass) {
                var messageEl = $('<div class="' + cssClass + '">');
                messageEl.html(message);
                AJS.messages[type](".applinks-message-bar", {
                    title: "",
                    body: messageEl.wrap('<div></div>').parent().html(),
                    closeable: true
                });
                $(document).trigger(AppLinks.Event.Legacy.MESSAGE_BOX_DISPLAYED);
            },
            displayValidationErrorMessages: function (errorClass, rootEl, messages) {
                if ($.isArray(messages)) {
                    $(messages).each(function(i,v) {
                        var d = $('<div class="error applinks-error">');
                        d.text(v);
                        $(rootEl).find("." + errorClass).append(d);
                    });
                } else if(typeof messages != 'undefined'){
                    var d = $('<div class="error applinks-error">');
                    d.text(messages.toString());
                    $(rootEl).find("." + errorClass).append(d);
                }
            },
            displayValidationError: function(errorClass, rootEl, errorFn) {
                return function(xhr) {
                    if (xhr.status == 401) {
                        window.location.reload();
                        return;
                    }

                    $('.applinks-error').remove();
                    $('.loading').remove();
                    var respJSON = xhr.responseText;
                    var respObj = $.parseJSON(respJSON);
                    var messages = respObj.message;
                    if (typeof respObj.fields == "undefined") {
                        AppLinks.UI.displayValidationErrorMessages(errorClass, rootEl, messages);
                    } else {
                        var fields = respObj.fields;
                        $(fields).each(function(index) {
                            var d = $('<div class="error applinks-error" id="' + fields[index] + '-error">');
                            d.text(messages[index]);
                            if ($(rootEl).find('.' + fields[index]).length > 0) {
                                d.insertAfter($(rootEl).find('.' + fields[index]));
                            } else {
                                d.insertAfter($(rootEl).find('.' + errorClass).append(d));
                            }
                        });
                    }
                    $(rootEl).find('.' + errorClass).addClass("fully-populated-errors");
                    if (errorFn) {
                        errorFn();
                    }
                }
            },
            addProtocolToURL : function(url) {
                var newUrl = $.trim(url);
                var tempURL = newUrl.toLowerCase();
                var hasProtocol = false;
                if (tempURL.length >= 7) {
                    if (tempURL.substring(0,7).indexOf('http') != -1) {
                        hasProtocol = true;
                    }
                }
                //default protocol is http
                if (!hasProtocol) {
                    newUrl = 'http://' + newUrl;
                }
                return newUrl;
            },
            /**
             * Similar to the standard Javascript join() method, but nicer in that
             * it uses a different delimiter for the last node (by default "and"),
             * so that:
             * {code}
             * "1, 2 and 3" == prettyJoin(['1', '2', '3'], function(value) {return value;});
             * {code}
             *
             * @param inputArray
             * @param resolveFn
             * @param finalDelimiter
             */
            prettyJoin : function(inputArray, resolveFn, finalDelimiter) {
                if (!finalDelimiter) {
                    finalDelimiter = "\u0438";
                }
                var maxLength = inputArray.length;
                var message = "";
                $.each(inputArray, function(index, value) {
                    if (index == (maxLength - 1) && maxLength > 1) {
                        message += " " + finalDelimiter + "  " + resolveFn(value);
                    } else {
                        message += resolveFn(value);
                        if (index + 2 < maxLength) {
                            message += ", ";
                        }
                    }
                });
                return message;
            },
            showLoadingIcon: function(element) {
                $('<span class="loading">&nbsp;</span>').insertAfter(element);
            },
            hideLoadingIcon: function(element) {
                $(element).next('.loading').remove();
            },
            findUrl: function(text) {
                var url = undefined;
                var lcText = text.toLowerCase();
                var startOfUrl = lcText.indexOf('http:');
                if (startOfUrl == -1) {
                    startOfUrl = lcText.indexOf('https:');
                }
                if (startOfUrl > -1) {
                    var endOfUrl = lcText.indexOf(' ', startOfUrl);
                    if (endOfUrl == -1) {
                        endOfUrl = lcText.length;
                    }
                    url = text.substring(startOfUrl, endOfUrl); // use _case-sensitive_ version to retrieve the actual URL
                }
                return url;
            },
            findApplicationType : function(id) {
                id = id.toLowerCase();
                if (id.indexOf("jira") != -1) {
                    return "jira";
                } else if (id.indexOf("fisheye") != -1) {
                    return "fecru";
                } else if (id.indexOf("confluence") != -1) {
                    return "confluence";
                } else if (id.indexOf("refapp") != -1) {
                    return "refapp";
                } else {
                    return undefined;
                }
            },
            escapeSelector: function(selector) {
                // based on http://samuelsjoberg.com/archive/2009/09/escape-jquery-selectors
                return selector.replace(/([#;&,\.\+\*\~':"\!\^$\[\]\(\)=>\|])/g, "\\$1");
            },
            sanitiseHTML: function(input) {
                var replacements = {
                    "<": "&lt;",
                    '"': "&quot;",
                    "&": "&amp;"
                };
                return input.replace(/[<"&]/g, function(match) {
                    return replacements[match];
                });
            },
            removeCssClass: function(element, prefix) {
                $(element).removeClass( function(index, className) {
                    var classes = className.split(' ');
                    var classToRemove = "";
                    $.each(classes, function(index, value) {
                        if (value.indexOf(prefix) != -1) {
                            classToRemove = value;
                        }
                    });
                    return classToRemove;
                } );
            }
        };

        /**
         * Add jQuery event system to AppLinks.UI namespace.
         */
        (function(){
            var eventBus = $({});
            $.each(['bind', 'unbind', 'trigger'], function(i, current){
                AppLinks.UI[current] = function(){
                    return eventBus[current].apply(eventBus, arguments);
                }
            });
        })();

        $(document).trigger(AppLinks.Event.PREREADY);
        $(document).trigger(AppLinks.Event.READY);
    });
})(require('applinks/common/i18n'), require('applinks/common/docs'), require('applinks/common/events'));
;
;
/* module-key = 'com.atlassian.applinks.applinks-plugin:applinks-util-js', location = 'applinks/internal/non-amd/autocomplete.js' */
// NOTE: this is used outside of Applinks. See atlassian-plugin.xml for more details about the associated restrictions

AJS.$(document).bind(AppLinks.Event.READY, function() {
/**
 * TODO: THIS CODE IS COPIED FROM CONFLUENCE and should be part of AUI/AJS.
 * IF AUI comes with the InputDrivenDropDown when can remove this file.
 * https://studio.atlassian.com/browse/AJS-471
 *
 * A simple cache manager that supports a
 * FIFO cache invalidation strategy.
 *
 * @class cacheManager
 * @namespace AJS.Confluence
 * @constructor
 * @param cacheSize the size of the cache before keys are invalidated
 */
AppLinks.autoComplete = {
        cacheManager : function (cacheSize) {
    var cache = {},
        cacheStack = [],
        cacheSize = cacheSize || 30;

    return {
        /**
         * Return the value stored in the cache for the given key
         * @method get
         * @param key {String}
         */
        get: function(key) {
            return cache[key];
        },
        /**
         * Put the given key, value in the cache
         * @method put
         * @param key {String}
         * @param value {Object}
         */
        put: function(key, value) {
            cache[key] = value;
            cacheStack.push(key);
            if (cacheStack.length > cacheSize) {
                delete cache[cacheStack.shift()];
            }
        },
        /**
         * Clear the cache.
         */
        clear : function() {
            cache = {};
            cacheStack = [];
        }
    };
}};


(function($){
    /**
     * Check that all items in the drop down can be displayed - show ellipses at the end of any that
     * are too long. Also remove any unused properties that the dropDown may have stored for each
     * item in the list.
     *
     * @method truncateText
     * @private
     */
    var truncateText = function (dd) {
        AJS.log("InputDrivenDropDown: truncating text");
        var width = dd.$.closest(".aui-dropdown").width(),
            rightPadding = 20; // add some padding so the ellipsis doesn't run over the edge of the box

        $("a span:not(.icon)", dd.$).each(function () {
            var $a = $(this),
                elpss = AJS("var", "&#8230;"),
                elwidth = elpss.width(),
                isLong = false;

            $a.wrapInner($("<em>"));
            $("em", $a).each(function () {
                var $label = $(this);

                $label.show();
                if (this.offsetLeft + this.offsetWidth > width) {
                    var childNodes = this.childNodes,
                        success = false;

                    for (var j = childNodes.length - 1; j >= 0; j--) {
                        var childNode = childNodes[j],
                            truncatedChars = 1,
                            valueAttr = (childNode.nodeType == 3) ? "nodeValue" : "innerHTML",
                            nodeText = childNode[valueAttr];

                        do {
                            if (truncatedChars <= nodeText.length) {
                                childNode[valueAttr] = nodeText.substr(0, nodeText.length - truncatedChars++);
                            } else { // if we cannot fit even one character of the next word, then try truncating the node just previous to this
                                break;
                            }
                        } while (this.offsetLeft + this.offsetWidth + elwidth > width - rightPadding);

                        if (truncatedChars <= nodeText.length) {
                            // we've managed truncate part of the word and fit it in
                            success = true;
                            break;
                        }
                    }

                    if (success) {
                        isLong = true;
                    } else {
                        $label.hide();
                    }
                }
            });
            if (isLong) {
                $a.append(elpss);
                this.elpss = elpss;
            }
        });
    };

    var highlightTokens = function(dd, tokens) {
        if (!tokens.length || !tokens[0]) return;

        AJS.log("InputDrivenDropDown: highlighting tokens");

        // escape regex chars .*+?|()[]{}\ first
        for (var i = 0, ii = tokens.length; i < ii; i++) {
            var token = tokens[i];
            tokens[i] = token ? token.replace(/[\.\*\+\?\|\(\)\[\]{}\\]/g, "\\$") : "";
        }

        var regex = new RegExp("(" + tokens.join("|") + ")", "gi");

        $("li a:not(.dropdown-prevent-highlight) span", dd.$).each(function() {
            var span = $(this),
                html = span.html().replace(regex, "<strong>$1</strong>");
            span.html(html);
        });
    };

    /**
     * Builds and shows the dropdown.
     *
     * @param idd the InputDrivenDropdown
     * @param dropdownData in the form { matrix, query, queryTokens }
     * @private
     */
    var makeDropdown = function (idd, dropdownData) {
        var options = idd.options,
            old_dd = idd.dd;

        if (old_dd) {
            old_dd.hide();
            old_dd.$.remove();
        }

        options.ajsDropDownOptions = options.ajsDropDownOptions || {};
        if (options.ajsDropDownOptions && !options.ajsDropDownOptions.alignment) { // default to left alignment
            options.ajsDropDownOptions.alignment = "left";
        }
        //this needs to be moved into aui
        options.ajsDropDownOptions.selectionHandler = options.ajsDropDownOptions.selectionHandler || function(e, element) {
            if(e.type != "click") {
                e.preventDefault();
                $("a",element).click();
                document.location = $("a",element).attr("href");
            }
        };

        /* Fixing an AUI bug in here:  AJS.dropdown puts the raw 'matrix[i].name' as html, without escaping it !
           The solution is to override their displayHandler
         */
        /**
         * Escape obj.name and return it
         */
        options.ajsDropDownOptions.displayHandler = function (obj) {
            return AJS.escapeHtml(obj.name);
        }

        var dd = idd.dd = new AJS.dropDown(dropdownData.matrix, options.ajsDropDownOptions)[0];

        // could move into dropdown.js in AUI
        if (options.ajsDropDownOptions && options.ajsDropDownOptions.className) {
            dd.$.addClass(options.ajsDropDownOptions.className);
        }

        // place the created drop down using the configured dropdownPlacement function
        // if there is none then use a default behaviour
        if (options.dropdownPlacement) {
            options.dropdownPlacement(dd.$);
        } else {
            AJS.log("No dropdownPlacement function specified. Appending dropdown to the body.");
            $("body").append(dd.$);
        }

        highlightTokens(dd, dropdownData.queryTokens || [dropdownData.query]);
        truncateText(dd);

        if (options.dropdownPostprocess) {
            options.dropdownPostprocess(dd.$);
        }
        dd.show(idd._effect);

        if (typeof options.onShow == "function") {
            options.onShow.call(dd, dd.$);
        }

        return dd;
    };

    /**
     * Provides a controller-agnostic object that listens for controller changes and populates a dropdown
     * via a callback. Most aspects can be customized via the options object parameter.
     * <br>
     * Options are:
     * <li>
     *   getDataAndRunCallback - (required) callback method used to provide data for the dropdown. It must take
     *                          two parameters, user input value and the callback function to execute.
     * </li>
     * <li>
     *   onShow - function to call when the drop-down is displayed
     * </li>
     * <li>
     *   dropdownPlacement - a function that will be called with the drop down and which should place it in the
     *                          correct place on the page. The supplied arguments are 1) the input that issued the
     *                          search, 2) the dropDown to be placed.
     * </li>
     * <li>
     *   ajsDropDownOptions - any options the underlying dropDown component can handle expects
     * </li>
     * <li>
     *   onDeath - callback to run when dropdown dies
     * </li>
     * @class InputDrivenDropDown
     * @namespace AJS
     */
    function InputDrivenDropDown(id, options) {
        this._effect = "appear";
        this._timer = null;

        this.id = id;
        this.options = options;
        this.inactive = false;
        this.busy = false;
        this.cacheManager = AppLinks.autoComplete.cacheManager();
    }

    /**
     * Clears the cache.
     */
    InputDrivenDropDown.prototype.clearCache = function () {
        this.cacheManager.clear();
    };

    /**
     * This method should be called when the user input for this dropdown has changed.
     * It will check the cache before fetching data (via options.getDataAndRunCallback)
     * and displaying the dropdown.
     *
     * @param value {String} the new value of the user input
     * @param force {Boolean} force a change to occur regardless of user input
     */
    InputDrivenDropDown.prototype.change = function (value, force) {
        var t = this;
        if (value != t._value || force) {
            t._value = value;
            t.busy = false;

            clearTimeout(t._timer);

            if (force || (/\S{0,}/).test(value)) {
                var cachedVal = t.cacheManager.get(value);
                if (cachedVal) {
                    makeDropdown(t, cachedVal);
                } else {
                    t.busy = true;
                    t._timer = setTimeout(function () { // delay sending a request to give the user a chance to finish typing their search term(s)
                        t.options.getDataAndRunCallback.call(t, value, t.show);
                    }, 200);
                }
            } else {
                t.dd && t.dd.hide();
            }
        }
    };

    /**
     * Gets the number of visible options in the dropdown.
     */
    InputDrivenDropDown.prototype.dropDownLength = function () {
        return this.dd.links ? this.dd.links.length : 0;
    };
    
    /**
     * Gets the specified menu item from the dropdown list.
     * 
     * @param index {Integer} the 0-based index of the dropdown option list
     */
    InputDrivenDropDown.prototype.dropDownItem = function (index) {
        return this.dropDownLength() > index ? this.dd.links[index] : null;
    };
    
    /**
     * Hides the drop down
     */
    InputDrivenDropDown.prototype.hide = function () {
        this.dd && this.dd.hide();
    };

    /**
     * Hides and removes the drop down from the DOM.
     */
    InputDrivenDropDown.prototype.remove = function () {
        var dd = this.dd;
        if (dd) {
            this.hide();
            dd.$.remove();
        }
        this.inactive = true;
        this.options.onDeath && this.options.onDeath();
    };

    /**
     * Shows the drop down with the given matrix data and query.
     * <br>
     * Matrix property should be an array of arrays, where the sub-arrays represent the different
     * search categories.
     *
     * Expected properties of category sub-array objects are:
     *  - href
     *  - name
     *  - className
     *  - html (optional, replaces href and name)
     *  - icon (optional)
     *
     *
     * @param matrix {Array} matrix to populate the drop down from
     * @param query {String} the user input string that triggered this show
     * @param queryTokens {Array} an array of strings of the query tokens. Use for highlighting search terms.
     */
    InputDrivenDropDown.prototype.show = function (matrix, query, queryTokens) {
        if (this.inactive) {
            AJS.log("Quick search abandoned before server response received, ignoring. " + this);
            return;
        }

        var dropdownData = {
            matrix: matrix,
            query: query,
            queryTokens: queryTokens
        };
        this.cacheManager.put(query, dropdownData);

        makeDropdown(this, dropdownData);
        this.busy = false;
    };

    /**
     * Returns an InputDrivenDropDown. See InputDrivenDropDown for more documentation.
     * @param options {Object} options for the InputDrivenDropDown
     * @constructor
     */
    AppLinks.inputDrivenDropdown = function (options) {
        return new InputDrivenDropDown("inputdriven-dropdown", options);
    };

})(jQuery);
});
;
;
/* module-key = 'com.atlassian.jira.jira-issue-link-applinks-common-plugin:issue-link-applinks', location = 'js/issuelink-applinks.js' */
define("issue-link-app-links/app-links",["jquery","wrm/context-path","jira/util/formatter","aui/message","require"],function(e,n,i,t,a){function s(n,a,s){function l(e){f=u(n,e);var i=f&&f.requireCredentials;return c(i,a),{authenticationRequired:i}}function r(e,i){var t=u(n,e);t&&(t.requireCredentials=i,f&&f.id===e&&c(i,a))}function c(n,i){e(".issue-link-applinks-authentication-message",i).empty(),n?(p(e(".issue-link-applinks-authentication-message",i),i),e(".issue-link-oauth-toggle").hide(),e(".buttons-container input[type=submit]",i).attr("disabled","disabled")):(e(".issue-link-oauth-toggle").show(),e(".buttons-container input[type=submit]",i).removeAttr("disabled"))}function p(n,a){var u={onSuccess:function(){f.requireCredentials=!1,c(!1,a),s.onAuthenticationSuccessCallback&&s.onAuthenticationSuccessCallback(a,f.id,k)},onFailure:function(){s.onAuthenticationFailedCallback&&s.onAuthenticationFailedCallback(a,f.id,k)}},l=AJS.escapeHtml(f.name);if(f.authUrl){var o=e('<div class="aui-message warning closeable shadowed applinks-auth-request"><p><span class="aui-icon icon-applinks-key"></span></p></div>');o.append(i.format("\u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044f \u0430\u0432\u0442\u043e\u0440\u0438\u0437\u0430\u0446\u0438\u044f \u0434\u043b\u044f \u0441\u043e\u0437\u0434\u0430\u043d\u0438\u044f \u0441\u0432\u044f\u0437\u0438 \u0437\u0430\u0434\u0430\u0447\u0438. \u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u003ca href=\"{0}\" class=\"applink-authenticate\"\u003e\u0430\u0432\u0442\u043e\u0440\u0438\u0437\u0443\u0439\u0442\u0435\u0441\u044c\u003c/a\u003e \u043d\u0430 \u003ca href=\"{1}\"\u003e{2}\u003c/a\u003e.",f.authUrl,f.url,l)),e("a",o).addClass("applink-authenticate"),e(".applink-authenticate",o).click(function(e){d(f.authUrl,u.onSuccess,u.onFailure),e.preventDefault()}),n.append(o)}else{var r=i.format("\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u0441\u043e\u0437\u0434\u0430\u0442\u044c \u0441\u0441\u044b\u043b\u043a\u0443 \u043d\u0430 \u003ca href=\"{0}\"\u003e{1}\u003c/a\u003e, \u0442\u0430\u043a \u043a\u0430\u043a \u043d\u0435 \u043d\u0430\u0441\u0442\u0440\u043e\u0435\u043d\u0430 \u0430\u0443\u0442\u0435\u043d\u0442\u0438\u0444\u0438\u043a\u0430\u0446\u0438\u044f \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u044f.",f.url,l);t.warning(n,{body:r})}}function h(){o.OAuthCallback||"undefined"!=typeof window.oauthCallback||(o.OAuthCallback=function(){},o.OAuthCallback.prototype.success=function(){this.aouthWindow.close(),this.onSuccess(),delete window.oauthCallback,delete o.OAuthCallback},o.OAuthCallback.prototype.failure=function(){this.aouthWindow.close(),this.onFailure(),delete window.oauthCallback,delete o.OAuthCallback},o.OAuthCallback.prototype.show=function(e,n,i){this.onSuccess=n,this.onFailure=i,this.aouthWindow=window.open(e,"com_atlassian_applinks_authentication")},window.oauthCallback=new o.OAuthCallback)}function d(n,i,t){h(),e(".applinks-error").remove(),window.oauthCallback.show(n,i,t)}var k={},f=null;return e.extend(k,{selectServer:l,setAuthenticationRequired:r})}function u(e,n){var i;if(e.length)for(i=0;i<e.length;i++)if(e[i].id===n)return e[i];return null}function l(i,t,a){var l=i.getCurrentAppId(t),o=e(".issue-link-applinks-application-type",t).val(),r=i.getIssueId(t);e.get(n()+"/rest/issueLinkAppLink/1/appLink/info",{type:o,issueIdOrKey:r},function(n){var o,r=s(n,t,i);if(n&&n.length){var c=u(n,l);c&&(o=e(".issue-link-applinks-authentication-message",t).hasClass("required"),o&&(c.requireCredentials=!0),r.selectServer(l)),a.resolve(t,r)}else a.reject(t)})}var o=window.AppLinks;return{init:function(n,i){var t=e.Deferred(),a=0!==e(".issue-link-applinks-authentication-message",i).length;return a&&n.shouldExecute(i)&&l(n,i,t),t.promise()}}});;
;
/* module-key = 'com.atlassian.jira.jira-issue-link-remote-jira-plugin:issue-link-remote-jira-js', location = 'js/issuelink-jira.js' */
require(["jquery","wrm/context-path","jira/util/events","jira/util/events/types","issue-link-app-links/app-links"],function(e,t,a,r,i){e(function(){var n={getCurrentAppId:function(t){return e("#jira-app-link",t).val()},shouldExecute:function(t){return 0!==e("#jira-app-link",t).length},getIssueId:function(t){return e("input[name=id]",t).val()}},c=function(e,a){e.length&&(e.attr("data-ajax-options.data.app-id",a),a&&""!==a?e.attr("data-ajax-options.url",t()+"/rest/remoteJiraIssueLink/1/remoteJira/picker"):e.attr("data-ajax-options.url",t()+"/rest/api/2/issue/picker"),e.trigger("updateOptions"),e.trigger("clearSelection"))},l=function(t,a){var r=e("#create-reciprocal",a);if(r.length)if(t&&""!==t){var i="true"==e("#create-reciprocal-default",a).val();i?r.attr("checked","checked"):r.removeAttr("checked"),r.removeAttr("disabled"),e("#create-reciprocal-fieldset",a).removeClass("disabled")}else r.attr("checked","checked"),r.attr("disabled","disabled"),e("#create-reciprocal-fieldset",a).addClass("disabled")};a.bind(r.NEW_PAGE_ADDED,function(t,a){var r=e("#jira-issue-keys",a);if(r.length){var s=e("#jira-app-link",a).val();c(r,s),l(s,a)}i.init(n,a).done(function(t,a){e("#jira-app-link",t).change(function(){var i=e(this).val();a.selectServer(i),c(r,i),l(i,t)})})})})});;
;
/* module-key = 'com.atlassian.jira.jira-issue-link-remote-jira-plugin:issue-link-jira-search-js', location = 'js/issuelink-jira-jqlautocomplete.js' */
define("jira-issue-link-remote-jira/issue-link-jira/jql-autocomplete",["jquery","jira/util/forms","require"],function(e,r,t){return{initialize:function(i){var l=t("jira/autocomplete/jql-autocomplete"),o=t("jira/jql/jql-parser"),n=i.fieldID,a=i.errorID,u=i.autoCompleteUrl,s=i.autoCompleteData,d=i.formSubmitFunction,c=e("#"+n),m=c.length>0&&c[0]==document.activeElement,p=s.visibleFieldNames||[],j=s.visibleFunctionNames||[],f=s.jqlReservedWords||[],q=function(){var e=t("jira/featureflags/feature-manager");return e.isFeatureEnabled("jira.jql.autoselectfirst")},C=l({fieldID:n,parser:o(f),queryDelay:.65,jqlFieldNames:p,jqlFunctionNames:j,minQueryLength:0,allowArrowCarousel:!0,autoSelectFirst:q(),errorID:a,autoCompleteUrl:u});c.unbind("keypress",r.submitOnEnter),d&&c.keypress(function(e){if(null===C.dropdownController||!C.dropdownController.displayed||C.selectedIndex<0)return!(13===e.keyCode&&!e.ctrlKey&&!e.shiftKey)||(d(),!1)}),C.buildResponseContainer(),C.parse(c.text()),C.updateColumnLineCount(),c.click(function(){C.dropdownController.hideDropdown()}),m&&c.select()}}});;
;
/* module-key = 'com.atlassian.jira.jira-issue-link-remote-jira-plugin:issue-link-jira-search-js', location = 'templates/dialog/linkjiraissue-search.soy' */
// This file was automatically generated from linkjiraissue-search.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace JIRA.Templates.RemoteJiraIssueSearch.
 */

if (typeof JIRA == 'undefined') { var JIRA = {}; }
if (typeof JIRA.Templates == 'undefined') { JIRA.Templates = {}; }
if (typeof JIRA.Templates.RemoteJiraIssueSearch == 'undefined') { JIRA.Templates.RemoteJiraIssueSearch = {}; }


JIRA.Templates.RemoteJiraIssueSearch.dialog = function(opt_data, opt_ignored) {
  return '<h2>' + soy.$$escapeHtml('\u041f\u043e\u0438\u0441\u043a \u0437\u0430\u0434\u0430\u0447 JIRA') + '</h2><form class="aui search-form" id="remote-jira-simple-search-form" action="#" method="post"><div class="field-group"><label for="link-search-text">' + soy.$$escapeHtml('\u041f\u043e\u0438\u0441\u043a') + ':</label><input id="link-search-text" type="text" tabindex="0" class="text" size="50"> <input type="submit" tabindex="0" class="button" id="simple-search-panel-button" value="' + soy.$$escapeHtml('\u041f\u043e\u0438\u0441\u043a') + '"> <a id="advanced-search-toggle" href="#" title="' + soy.$$escapeHtml('\u0412\u044b\u043f\u043e\u043b\u043d\u0438\u0442\u044c \u0437\u0430\u043f\u0440\u043e\u0441 JQL') + '">' + soy.$$escapeHtml('\u0420\u0430\u0441\u0448\u0438\u0440\u0435\u043d\u043d\u044b\u0439 \u043f\u043e\u0438\u0441\u043a') + '</a><span id="link-search-loading" class="icon loading throbber hidden"/></div></form><form class="aui search-form" id="remote-jira-advanced-search-form" action="#" method="post"><div class="field-group"><label for="jql-search-text">' + soy.$$escapeHtml('\u041f\u043e\u0438\u0441\u043a JQL') + '<span id="autocomplete-loading" class="hidden"><span class="icon loading throbber"/>' + soy.$$escapeHtml('\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430 \u0430\u0432\u0442\u043e-\u0434\u043e\u043f\u043e\u043b\u043d\u0435\u043d\u0438\u044f') + '</span><span id="autocomplete-failed" class="hidden">' + soy.$$escapeHtml('(\u0430\u0432\u0442\u043e-\u0434\u043e\u043f\u043e\u043b\u043d\u0435\u043d\u0438\u0435 \u043d\u0435 \u0434\u043e\u0441\u0442\u0443\u043f\u043d\u043e)') + '</span></label><div id="jql-search-container"><span id="jql-search-error" class="icon jqlgood" /><div class="atlassian-autocomplete"><textarea id="jql-search-text" class="text full-width-field" tabindex="0" /></div></div><button class="aui-button aui-button-subtle search-button" id="advanced-search-panel-button" type="submit"><span class="aui-icon aui-icon-small aui-iconfont-search" title="' + soy.$$escapeHtml('\u041f\u043e\u0438\u0441\u043a') + '"></span></button> <a id="simple-search-toggle" href="#" title="' + soy.$$escapeHtml('\u0412\u044b\u043f\u043e\u043b\u043d\u0438\u0442\u044c \u043f\u043e\u0438\u0441\u043a \u043f\u0440\u043e\u0441\u0442\u043e\u0433\u043e \u0442\u0435\u043a\u0441\u0442\u0430') + '">' + soy.$$escapeHtml('\u041f\u0440\u043e\u0441\u0442\u043e\u0439 \u043f\u043e\u0438\u0441\u043a') + '</a><span id="link-search-loading" class="icon loading throbber hidden"/></div></form><div class="message-panel hidden"></div><div id="search-results-table" class="data-table"></div><div class="buttons-container form-footer"><div class="buttons"><button type="button" class="aui-button" id="linkjiraissue-add-selected">' + soy.$$escapeHtml('\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c') + '</button><button class="aui-button aui-button-link cancel" href="#" id="remote-jira-link-cancel" title="' + soy.$$escapeHtml('\u0427\u0442\u043e\u0431\u044b \u0437\u0430\u043a\u0440\u044b\u0442\u044c, \u043d\u0430\u0436\u043c\u0438\u0442\u0435 Esc') + '">' + soy.$$escapeHtml('\u0417\u0430\u043a\u0440\u044b\u0442\u044c') + '</button></div></div>';
};
if (goog.DEBUG) {
  JIRA.Templates.RemoteJiraIssueSearch.dialog.soyTemplateName = 'JIRA.Templates.RemoteJiraIssueSearch.dialog';
}


JIRA.Templates.RemoteJiraIssueSearch.resultsTable = function(opt_data, opt_ignored) {
  var output = '';
  if (opt_data.result.issues.length > 0) {
    output += '<table id="remote-jira-searchresult" class="aui"><thead><tr><th class="selection" ><input id="linkjiraissue-select-all" type="checkbox"/></th><th class="type">' + soy.$$escapeHtml('\u0422\u0438\u043f') + '</th><th class="key">' + soy.$$escapeHtml('\u041a\u043b\u044e\u0447') + '</th><th class="summary">' + soy.$$escapeHtml('\u0422\u0435\u043c\u0430') + '</th><th class="status">' + soy.$$escapeHtml('\u0421\u0442\u0430\u0442\u0443\u0441') + '</th></tr></thead><tbody>';
    var issueList44 = opt_data.result.issues;
    var issueListLen44 = issueList44.length;
    for (var issueIndex44 = 0; issueIndex44 < issueListLen44; issueIndex44++) {
      var issueData44 = issueList44[issueIndex44];
      output += '<tr title="' + soy.$$escapeHtml(issueData44.key) + '"><td class="selection" data-key="' + soy.$$escapeHtml(issueData44.key) + '"><input type="checkbox"/></td><td class="type">' + JIRA.Templates.RemoteJiraIssueSearch.issueType({issueType: issueData44.fields.issuetype}) + '</td><td class="key" title="' + soy.$$escapeHtml(issueData44.key) + '">' + soy.$$escapeHtml(issueData44.key) + '</td><td class="summary" title="' + soy.$$escapeHtml(issueData44.fields.summary) + '">' + soy.$$escapeHtml(issueData44.fields.summary) + '</td><td class="status">' + JIRA.Templates.RemoteJiraIssueSearch.status({status: issueData44.fields.status}) + '</td></tr>';
    }
    output += '</tbody></table>';
  } else {
    output += '<div class="aui-message info"><span class="aui-icon icon-info"></span><p>' + soy.$$escapeHtml('\u041d\u0438\u0447\u0435\u0433\u043e \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u043e.') + '</p></div>';
  }
  return output;
};
if (goog.DEBUG) {
  JIRA.Templates.RemoteJiraIssueSearch.resultsTable.soyTemplateName = 'JIRA.Templates.RemoteJiraIssueSearch.resultsTable';
}


JIRA.Templates.RemoteJiraIssueSearch.issueType = function(opt_data, opt_ignored) {
  return '<img src="' + soy.$$escapeHtml(opt_data.issueType.iconUrl) + '" alt="' + soy.$$escapeHtml(opt_data.issueType.name) + '" title="' + soy.$$escapeHtml(opt_data.issueType.name) + ' - ' + soy.$$escapeHtml(opt_data.issueType.description) + '"/>';
};
if (goog.DEBUG) {
  JIRA.Templates.RemoteJiraIssueSearch.issueType.soyTemplateName = 'JIRA.Templates.RemoteJiraIssueSearch.issueType';
}


JIRA.Templates.RemoteJiraIssueSearch.status = function(opt_data, opt_ignored) {
  return '' + JIRA.Template.Util.Issue.Status.issueStatusResolver({issueStatus: opt_data.status});
};
if (goog.DEBUG) {
  JIRA.Templates.RemoteJiraIssueSearch.status.soyTemplateName = 'JIRA.Templates.RemoteJiraIssueSearch.status';
}
;
;
/* module-key = 'com.atlassian.jira.jira-issue-link-remote-jira-plugin:issue-link-jira-search-js', location = 'js/remote-jira-issue-search-template.js' */
define("jira-issue-link-remote-jira/dialog/remote-jira-issue-search/templates",[],function(){"use strict";return window.JIRA.Templates.RemoteJiraIssueSearch});;
;
/* module-key = 'com.atlassian.jira.jira-issue-link-remote-jira-plugin:issue-link-jira-search-js', location = 'js/issuelink-jira-search.js' */
require(["jquery","wrm/context-path","jira/dialog/form-dialog","jira-issue-link-remote-jira/dialog/remote-jira-issue-search/templates","jira/ajs/ajax/smart-ajax","aui/message","jira/util/formatter","wrm/require","jira-issue-link-remote-jira/issue-link-jira/jql-autocomplete"],function(e,t,r,a,i,s,l,n,o){e(function(){function c(t){var r=e("#jira-app-link").val(),a=v(r);e("#simple-search-panel-button",t).click(function(){e("#search-results-table",t).empty();var r=e("#link-search-text",t).val();return r=e.trim(r),r?j(r,t):s.info("#search-results-table",{body:"\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0435 \u0434\u043b\u044f \u043f\u043e\u0438\u0441\u043a\u0430.",closeable:!1}),!1}),e("#advanced-search-panel-button",t).click(function(){return d(t),!1}),e("#simple-search-toggle",t).click(function(){return e("#remote-jira-simple-search-form",t).show(),e("#remote-jira-advanced-search-form",t).hide(),!1}),e("#linkjiraissue-add-selected",t).click(function(){e("table tbody tr:visible  td.selection input:checked",t).each(function(){var t=e(this).parent().data("key");e("#jira-issue-keys").trigger("selectOption",[{value:t}])}),e("#link-issue-dialog .error").hide(),x.hide(),e("#link-issue-dialog").show().trigger("multiSelectRevealed"),e("#jira-issue-keys-textarea").focus().select()}),e("#advanced-search-toggle",t).click(function(){e("#remote-jira-advanced-search-form",t).show(),e("#remote-jira-simple-search-form",t).hide();var i=e("#jql-search-text");return i.attr("jql-initialized")||(p(!0,t),n("wr!jira.webresources:jqlautocomplete",function(){a.done(function(e){e.successful?o.initialize({fieldID:"jql-search-text",errorID:"jql-search-error",autoCompleteUrl:u(r),autoCompleteData:e.data,formSubmitFunction:function(){d(t)}}):(f(!1,t),h(!0,t)),p(!1,t),i.attr("jql-initialized",1)})})),i.focus(),!1}),e("#simple-search-toggle",t).trigger("click")}function u(e){return e&&""!==e?y+"/rest/remoteJiraIssueLink/1/remoteJira/autocomplete?appId="+e:""}function d(t){e("#search-results-table",t).empty();var r=e("#jql-search-text",t).val();r=e.trim(r),r?k(r,t):s.info("#search-results-table",{body:"\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0435 \u0434\u043b\u044f \u043f\u043e\u0438\u0441\u043a\u0430.",closeable:!1})}function m(t,r){e("#link-search-loading",r).toggleClass("hidden",!t)}function p(t,r){e("#autocomplete-loading",r).toggleClass("hidden",!t)}function h(t,r){e("#autocomplete-failed",r).toggleClass("hidden",!t)}function f(t,r){e("#jql-search-error",r).toggleClass("hidden",!t)}function j(t,r){m(!0,r);var a=e("#jira-app-link").val(),i='key = "'+t+'"',s='project = "'+t+'"',l='summary ~ "'+t+'" OR description ~ "'+t+'" OR comment ~ "'+t+'"';g(i,a).done(function(e){e.successful&&e.data.issues.length>0?(m(!1,r),b(e,r)):g(s,a).done(function(e){e.successful&&e.data.issues.length>0?(m(!1,r),b(e,r)):g(l,a).done(function(e){m(!1,r),e.successful?b(e,r):q(e)})})})}function k(t,r){m(!0,r);var a=e("#jira-app-link").val();g(t,a).done(function(e){m(!1,r),e.successful?b(e,r):400===e.status?s.warning("#search-results-table",{body:"\u041d\u0435\u0432\u0435\u0440\u043d\u044b\u0439 \u0437\u0430\u043f\u0440\u043e\u0441 JQL.",closeable:!1}):q(e)})}function g(t,r){var a,s=e.Deferred();if(r&&""!==r)a=y+"/rest/remoteJiraIssueLink/1/remoteJira/search?jql="+t+"&appId="+r+"&maxResults=10";else{var l=e("#current-issue-key").val();t="("+t+") and key != "+l,a=y+"/rest/api/2/search?jql="+t+"&maxResults=10"}return i.makeRequest({url:a,complete:function(e,t,r){s.resolve(r)}}),s.promise()}function v(t){var r,a,s=e.Deferred();return t&&""!==t?(a=y+"/rest/remoteJiraIssueLink/1/remoteJira/autocompletedata?appId="+t,r=!0):(a=y+"/rest/api/2/jql/autocompletedata",r=!1),i.makeRequest({url:a,complete:function(e,a,l){!l.successful&&r?i.makeRequest({url:y+"/rest/remoteJiraIssueLink/1/remoteJira/autocompletedata/legacy?appId="+t,complete:function(e,t,r){s.resolve(r)}}):s.resolve(l)}}),s.promise()}function b(t,r){var i=a.resultsTable({result:t.data});e("#search-results-table",r).html(i),e("#linkjiraissue-select-all",r).click(function(){var t=e(this).prop("checked");e("tbody tr td.selection input",r).prop("checked",t)}),e("tbody tr",r).click(function(t){if(!e(t.target).is(":checkbox")){var r=e(this).find("td.selection input");r.prop("checked",!r.prop("checked"))}})}function q(e){s.error("#search-results-table",{body:i.buildSimpleErrorContent(e),closeable:!1})}var y=t(),x=new r({id:"remote-jira-search-dialog",trigger:"#link-jira-issue .remote-jira-search-trigger",widthClass:"large",content:function(e){e(a.dialog()),c(this.$popup)},submitHandler:function(t,r){t.preventDefault(),e("#simple-search-panel-button").removeAttr("disabled"),e("#advanced-search-panel-button").removeAttr("disabled"),"remote-jira-simple-search-form"===e(t.target).attr("id")?e("#simple-search-panel-button").click():e("#advanced-search-panel-button").click(),r()}})})});;
;
/* module-key = 'com.atlassian.teams:teams-wr-custom-field-scripts-common', location = '/teams/scripts-plugin/field-common.min.js' */
(function(){define("com/atlassian/rm/common/customfields/common",[],function(){var a,b,c,d,e,f,g,h,i,j;return c=window.JIRA,a=AJS.$,d=AJS.SingleSelect,b=AJS.ItemDescriptor,j=AJS.escapeHTML,f=function(a){return c.bind(c.Events.NEW_CONTENT_ADDED,function(b,d,e){if(e!==c.CONTENT_ADDED_REASON.panelRefreshed)return a({context:d})})},g=function(a){var b,c,d;return d=a.url,b=a.createQueryData,c=a.formatResponse,{url:d,type:"POST",query:!0,data:function(a){return b({query:a})},dataType:"json",contentType:"application/json",formatResponse:c,keyInputPeriod:200}},i=function(a){var c,d;return d=a.text,c=a.additionalStyles,new b({label:d,html:j(d),highlighted:!0,styleClass:"jpo-dropdown-item-unselectable "+c,unselectableItem:!0})},e=function(a){var b;if(b=a.items,0===b.length)return b.push(i({text:"No Matches",additionalStyles:"jpo-dropdown-item-italic"}))},h=function(b){var c,e;return c=b.ajaxOptions,e=b.getNoMatchingValueMessage,d.extend({init:function(b){return a.extend(b,{submitInputVal:!0,showDropdownButton:!0,ajaxOptions:c}),this._super(b)},setSelection:function(a){if(!a.properties.unselectableItem)return this._super.apply(this,arguments)},handleFreeInput:function(b){var c,d;if(this._super.apply(this,arguments),null==b&&(b=a.trim(this.$field.val())),d=this.model.getDescriptor(b),null==d&&this.$container.hasClass("aui-ss-editing"))return c=null!=b&&b.length>0,c?(this.options.errorMessage=e(b),this.showErrorMessage(b),this.clear(),this.model.removeFreeInputVal()):this.hideErrorMessage()}})},{bindInitializationCallback:f,createDropdownAjaxOptions:g,createInfoMessageListItem:i,addNoMatchesItemIfEmpty:e,createDropdownClass:h}})}).call(this);;
;
/* module-key = 'com.atlassian.teams:teams-wr-custom-field-team', location = '/teams/scripts-plugin/field-team.min.js' */
(function(){require(["com/atlassian/rm/common/customfields/common"],function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p;return b=AJS.$,e=AJS.ItemDescriptor,d=AJS.GroupDescriptor,j=AJS.contextPath,f=100,g=".jpo-team-selection-dropdown",h=j()+"/rest/teams/1.0/teams/find",c=j()+"/download/resources/com.atlassian.teams:jpo-wr-images-and-fonts/images/teams/default-avatar.svg",p=function(a){var b,c,e;return e=a.teams,b=new d({weight:0,items:[k()]}),c=new d({weight:1,label:"Shared teams",items:o({teams:e})}),[b,c]},n=function(a){var b,d,f;return d=a.id,f=a.title,b=a.avatarUrl,new e({value:""+d,fieldText:f,label:f,icon:b||c})},o=function(b){var c,d,e;return e=b.teams,c=function(){var a,b,c;for(c=[],a=0,b=e.length;a<b;a++)d=e[a],c.push(n(d));return c}(),a.addNoMatchesItemIfEmpty({items:c}),c},k=function(){return a.createInfoMessageListItem({text:"Plan-specific teams can only be selected through a Portfolio plan",additionalStyles:"jpo-dropdown-item-italic"})},l=function(a){var b;return b=a.query,JSON.stringify({query:b,excludedIds:[],maxResults:f})},i=a.createDropdownClass({ajaxOptions:a.createDropdownAjaxOptions({url:h,createQueryData:l,formatResponse:p}),getNoMatchingValueMessage:function(a){return AJS.format("No team matching query \'\'{0}\'\' was found.",a)}}),m=function(a){return b(g,a).each(function(){return new i({element:b(this)})})},a.bindInitializationCallback(function(a){var b;return b=a.context,m(b)})})}).call(this);;
;
/* module-key = 'com.atlassian.jira.jira-issue-nav-components:ajs-helper', location = 'util/ajshelper.js' */
define("jira/components/utils/ajshelper",[],function(){"use strict";var e=window.AJS;return{escapeHtml:e.escapeHtml.bind(e),LEFT:e.LEFT,Templates:e.Templates,HIDE_REASON:e.HIDE_REASON,trigger:e.trigger.bind(e),log:e.log.bind(e),extractBodyFromResponse:e.extractBodyFromResponse,whenIType:function(){return e.whenIType},activeShortcuts:function(){return e.activeShortcuts}}});
//# sourceMappingURL=ajshelper-min.js.map
;
;
/* module-key = 'com.atlassian.jira.jira-issue-nav-components:underscore', location = 'libs/underscore.js' */
define("jira/components/libs/underscore",["require"],function(e){"use strict";return e("atlassian/libs/underscore-1.5.2")});
//# sourceMappingURL=underscore-min.js.map
;
;
/* module-key = 'com.atlassian.jira.jira-issue-nav-components:analytics-tracker', location = 'analytics-tracker/tracker.js' */
define("jira/components/analytics-tracker/tracker",["jira/components/libs/underscore","jira/issue","jira/components/utils/ajshelper","jquery"],function(e,t,n,i){"use strict";function r(){if(!y)try{y=require("jira/api/projects")}catch(e){y=null}}function o(){return m?m:(r(),y?y.getCurrentProjectId():void 0)}function a(){return j?j:(r(),y?y.getCurrentProjectType():void 0)}function c(){return g?g:t?t.getIssueId():void 0}function s(e){if(e.attr("class")||e.attr("id"))return e;var t=e.parent().closest("[class], [id]");return t.length?t:e}function u(e){var t=i(e.target).closest(p),n=s(t);l("viewissue","generic-action",{className:n.attr("class")||"no-element-className",id:n.attr("id")||"no-element-id"}),k=!1}function d(){i(".issue-container").off("click",p,u).on("click",p,u),i("#create_link").off("click",u).on("click",u),w&&clearTimeout(w),w=setTimeout(function(){k&&l("viewissue","inactive-timeout")},v)}function l(t,i,r){var s=f+"."+t+"."+i;I=I||Math.round(performance.now());var u=Math.round(performance.now())-I;r=r||{};var d={projectId:r.projectId||o(),projectType:r.projectType||a(),issueId:r.issueId||c(),userAgent:window.navigator.userAgent,timeSinceIssueLoaded:u},l=e.extend(d,r);n.trigger("analyticsEvent",{name:s,data:l})}var f="jira.platform.fe.web",v=3e5,p="a, .editable-field, button",m=void 0,j=void 0,g=void 0,k=void 0,w=void 0,I=void 0,y=void 0;return{initialize:function(e,t,n){m=e,j=t,g=n,k=!0,I=Math.round(performance.now()),d()},trackEvent:l}});
//# sourceMappingURL=tracker-min.js.map
;
;
/* module-key = 'com.atlassian.jira.jira-view-issue-plugin:issuelink-bridge-global-init', location = 'viewissue/issuelink/linkedissue-modal-bridge.js' */
define("jira/view-issue-plugin/issuelink/linkedissue-modal-bridge",["jquery","jira/featureflags/feature-manager","jira/featureflags/simplified-ux-feature-manager","jira/components/analytics-tracker/tracker"],function(e,r,n,i){function a(e){i.trackEvent(u,"linkedissue-modal.load.failed",{errorMessage:e})}function s(){if(null===o){o=e.Deferred();try{l.then(function(e){e.loadResource().then(function(){o.resolve(e)},function(){a("Call to linkedIssueModalApp#loadResource failed"),o.reject()})})}catch(e){var r=e&&e.stack||"An unknown error occurred when loading linkedIssueModalApp bridge";a(r),o.reject()}}return o}if(!n.isAdg3ModeOn()||!r.isFeatureEnabled("jira.linked.issues.modal"))return{};var u="viewissue.issuelink",l=e.Deferred();define("jira/components/linkedissue/bridge",function(){return function(e){l.resolve(e)}});var o=null;return{loadResource:s}});;
;
/* module-key = 'com.atlassian.growth.product-growth-jira-plugin:growth-web-resources', location = 'js/growth-helper.js' */
var GROW=GROW||{};(function(c){var b=require("jira/util/users/logged-in-user");var a=require("jira/util/browser");GROW.isLoggedIn=function(){return b.isAnonymous()!==true};GROW.isAdmin=function(){return b.isAdmin()};AJS.toInit(function(){if(location.search.indexOf("triggerCreateProject=true")>-1){if(b.isAnonymous()){var d=c("#header nav .login-link");if(d.size()===1){a.reloadViaWindowLocation(d.attr("href"))}}else{JPT.DialogController.handleProjectTemplateTriggered()}}})})(AJS.$);;
;
/* module-key = 'com.atlassian.growth.product-growth-jira-plugin:growth-web-resources', location = 'js/store.js' */
var GROW=GROW||{};GROW.Store=GROW.Store||{};(function(a){GROW.Store.get=function(b){return AJS.Meta.get(b)};GROW.Store.getNumber=function(b){return AJS.Meta.getNumber(b)};GROW.Store.getBoolean=function(b){return AJS.Meta.getBoolean(b)};GROW.Store.set=function(c,d,b){AJS.Meta.set(c,d);return a.ajax({url:contextPath+"/rest/growth/1/store",type:"PUT",contentType:"application/json",data:JSON.stringify({key:c,value:d,eventName:b})})};GROW.Store.setGlobal=function(c,d,b){AJS.Meta.set(c,d);return a.ajax({url:contextPath+"/rest/growth/1/store/global",type:"PUT",contentType:"application/json",data:JSON.stringify({key:c,value:d,eventName:b})})};GROW.Store.remove=function(c,b){AJS.Meta.set(c,null);return a.ajax({url:contextPath+"/rest/growth/1/store",type:"DELETE",contentType:"application/json",data:JSON.stringify({key:c,eventName:b})})};GROW.Store.removeGlobal=function(c,b){AJS.Meta.set(c,null);return a.ajax({url:contextPath+"/rest/growth/1/store/global",type:"DELETE",contentType:"application/json",data:JSON.stringify({key:c,eventName:b})})}})(AJS.$);;
;
/* module-key = 'com.atlassian.crowd.user-provisioning-vertigo-plugin:util-resources', location = '/js/atlassian/um-utils.js' */
define('user-management/helpers/um-utils', [
    'jquery'
], function (
    $
) {
    var isSiteAdminWRM = WRM.data.claim("com.atlassian.crowd.user-provisioning-plugin:create-users-resources.isSiteAdmin");
    /*
        This is going to have to change when UM moves to a different URL.
        We'll also need to look at usages of this because commumication
        will need to be a bit different, eg. using CORS
     */
    function restBaseUrl() {
        return '/admin';
    }

    return {

        /**
         * @returns A promise which resolves to a boolean.
         */
        isSiteAdmin: function() {
            return $.when(isSiteAdminWRM).promise();
        },
        restBaseUrl: restBaseUrl,
        productName: function() {
            var contextPath = AJS.contextPath();
            var productName = "Unknown";
            if (contextPath === "") {
                productName = "jira";
            } else if (contextPath === "/builds") {
                productName = "bamboo";
            } else if (contextPath === "/wiki") {
                productName = "confluence";
            }
            return productName;
        }
    };
});;
;
/* module-key = 'com.atlassian.crowd.user-provisioning-vertigo-plugin:adminmenu-analytics', location = 'js/atlassian/analytics-upp.js' */
require([
    'user-management/helpers/um-utils'
], function(
    umUtils
) {
    var triggerAnalytics = function (name, properties) {
        AJS.trigger("analytics", {
            name: "unified.admin." + name,
            data: properties || {}
        });
    };

    var getProductName = umUtils.productName;

    AJS.$(document)
        .on("click", "#admin-billing-link", function () {
            triggerAnalytics("menu.billing.click", {product:getProductName()});
        })
        .on("click", "#admin-discovernewapps-link", function () {
            triggerAnalytics("menu.addApplications.click", {product:getProductName()});
        })
        .on("click", "#admin-management-link", function () {
            triggerAnalytics("menu.userManagement.click", {product:getProductName()});
        })
        // handle admin menu links from JIRA due to required use of web sections
        .on("click", "#admin_billing_section", function () {
            triggerAnalytics("menu.billing.click", {product:getProductName()});
        })
        .on("click", "#admin_discovernewapps_section", function () {
            triggerAnalytics("menu.addApplications.click", {product:getProductName()});
        })
        .on("click", "#user_management_section", function () {
            triggerAnalytics("menu.userManagement.click", {product:getProductName()});
        })
        .on("click", "#pending-invites-flag .icon-close", function () {
            triggerAnalytics("inproduct.invite.pending.message.dismissed")
        })
    ;

});
;
;
/* module-key = 'com.atlassian.crowd.user-provisioning-vertigo-plugin:common-flag-resources', location = '/js/atlassian/aui-polyfill/flag.js' */
/*
 * Polyfill for aui/flag for use in products that don't provide a version (due to using an ancient AUI version).
 */
(function() {
    try {
        require('aui/flag')
    } catch (e) {
        define('aui/flag', [], displayFlagAsMessage);
    }

    function displayFlagAsMessage(args) {
        var type = (args.type || "").toLowerCase();
        var message = typeof AJS.messages[type] == 'function' ? AJS.messages[type] : AJS.messages.generic;

        // for some reason we display info messages as warnings... keeping that for backward compatibility
        message(".notifications", { body: args.message });
    }
})();
;
;
/* module-key = 'com.atlassian.crowd.user-provisioning-vertigo-plugin:common-flag-resources', location = '/js/atlassian/flag.js' */
/**
 * This is a wrapper around AUI Flag which will escape the body text of the Flag unless explicitly told not to.
 *
 * The body will NOT be escaped iff the passed in object has an attribute 'isHtml' and it is set to true.
 */
define('user-management-common/flag', [
    'aui/flag',
    'underscore',
    'jquery'
], function(
    flag,
    _,
    $
) {
    return function(options){
        var createdFlag;
        // If not explicitly HTML, escape the body
        if(!options.isHtml) {
            options.body = _.escape(options.body);
        }

        createdFlag = flag(options);
        $(createdFlag).on('aui-flag-close', function(){
            createdFlag.dispatchEvent(new CustomEvent('um-flag-close', { bubbles: true }));
        });
        return createdFlag;
    };
});
;
;
/* module-key = 'com.atlassian.crowd.user-provisioning-vertigo-plugin:impersonation-resources', location = '/js/atlassian/helpers/cookies.js' */
define('user-management-common/helpers/cookies', [], function() {
    return {
        readCookie: function (name) {
            //document.cookie lists cookies in the format "name1=value1; name2=value2" etc
            //see https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
            var nameEQ = name + "=";
            var cookieList = document.cookie.split(';');
            for (var i = 0; i < cookieList.length; i++) {
                var cookie = cookieList[i];

                //Remove any leading spaces (normally 1, but I don't want to make assumptions)
                while (cookie.charAt(0) == ' ') {
                    cookie = cookie.substring(1, cookie.length);
                }

                //Remove the name1= part and return what is left
                if (cookie.indexOf(nameEQ) === 0) {
                    return decodeURIComponent(cookie.substring(nameEQ.length, cookie.length));
                }
            }
            return null;
        }
    };
});
;
;
/* module-key = 'com.atlassian.crowd.user-provisioning-vertigo-plugin:impersonation-resources', location = '/js/atlassian/impersonation/impersonation.js' */
/**
 * This module displays an informational message with a link to drop the impersonation, if the current user is
 * being impersonated. This script is used in both user management and user provisioning plugins.
 */
define('user-management-common/impersonation/impersonation', [
    'jquery',
    'underscore',
    'user-management-common/flag',
    'user-management-common/helpers/cookies'
], function(
    $,
    _,
    flag,
    cookies
) {
    var showImpersonationMessaging = function(username){
        var message = AJS.format("\u0412\u044b \u0432\u0440\u0435\u043c\u0435\u043d\u043d\u043e \u0432\u043e\u0448\u043b\u0438 \u043a\u0430\u043a {0}. \u041a\u043e\u0433\u0434\u0430 \u0437\u0430\u043a\u043e\u043d\u0447\u0438\u0442\u0435, {1}\u043f\u0435\u0440\u0435\u043a\u043b\u044e\u0447\u0438\u0442\u0435\u0441\u044c \u043e\u0431\u0440\u0430\u0442\u043d\u043e{2} \u043d\u0430 \u0441\u0432\u043e\u044e \u0443\u0447\u0435\u0442\u043d\u0443\u044e \u0437\u0430\u043f\u0438\u0441\u044c.",
            _.escape(impersonation.getDisplayName()),
            '<a id="impersonation-dismiss-trigger" href="#">', '</a>');

        var messageFlag = flag({ type: 'info', isHtml: true, body: message });

        $(messageFlag).find("#impersonation-dismiss-trigger").click(function (e) {
            e.preventDefault();
            impersonation.dropImpersonation().then(function () {
                if (username) {
                    window.open("/admin/users/view?username=" + encodeURIComponent(username), "_top");
                } else {
                    window.open("/admin/users", "_top");
                }
            });
        });
    };

    var impersonation = {
        init: function () {
            if (impersonation.isImpersonated()) {
                showImpersonationMessaging(impersonation.getUsername());
            }
        },

        getUsername: function () {
            return cookies.readCookie("um.user.impersonated.username");
        },

        getDisplayName: function () {
            return cookies.readCookie("um.user.impersonated.displayname");
        },

        dropImpersonation: function () {
            return $.ajax({
                type: "POST",
                contentType: 'application/json',
                url: "/admin/rest/um/1/impersonate/release"
            });
        },

        isImpersonated: function () {
            return !!impersonation.getUsername();
        }
    };
    return impersonation;
});
;
;
/* module-key = 'com.atlassian.crowd.user-provisioning-vertigo-plugin:impersonation-resources', location = '/js/atlassian/impersonation-init.js' */
require(['jquery', 'user-management-common/impersonation/impersonation'],
function($, impersonation) {
    $(impersonation.init);
});;
;
/* module-key = 'com.atlassian.crowd.user-provisioning-vertigo-plugin:create-users-resources', location = '/js/atlassian/create-user/request-invite.js' */
/**
 * This module allows external products to request an invite for a user.
 */
define('user-management-common/create-user/request-invite', [
    'jquery',
    'user-management/helpers/um-utils'
], function(
    $,
    umUtils
) {
    function requestInvite(emailAddresses, extraProductId, extraGroups){
        return $.ajax({
            type: 'PUT',
            url: umUtils.restBaseUrl() + '/rest/um/1/requestaccess',
            contentType: 'application/json',
            data: JSON.stringify({
                emailAddresses: emailAddresses,
                extraProductId: extraProductId,
                extraGroups: extraGroups
            })
        });
    }
    return {
        createUser: requestInvite
    };
});;
;
/* module-key = 'com.atlassian.crowd.user-provisioning-vertigo-plugin:create-users-resources', location = '/js/atlassian/create-user/pending-invites.js' */
/**
 * This module allows external products to request an invite for a user.
 */
define('user-management-common/create-user/pending-invites', [
    'jquery',
    'user-management-common/flag',
    'user-management-common/create-user/request-invite',
    'user-management/helpers/um-utils'
], function(
    $,
    flag,
    requestInvite,
    umUtils
) {
    var pendingInvites = {};
    pendingInvites.hasCompleted = false;
    var pendingInvitesFlag;
    var INVITES_FLAG_CLOSED_KEY = "uppPendingInvitesFlagClosed";
    var LAST_CHECK_FOR_PENDING_INVITES_TIME = "uppLastCheckForPendingInvitesTime";
    var PENDING_INVITES = "uppLastPendingInvites";
    var ONE_HOUR = (1000 * 60 * 60);

    pendingInvites.flagHasBeenDismissed = function () { //visible for testing
        var dismissed = false;
        var lastClosed = localStorage[INVITES_FLAG_CLOSED_KEY];
        if (lastClosed) {
            dismissed = (new Date().getTime() - lastClosed) < ONE_HOUR; // Show the flag again after one hour
        }
        return dismissed;
    };

    function pendingInviteCount() {
        var deferredCount = $.Deferred();
        if (localStorage[LAST_CHECK_FOR_PENDING_INVITES_TIME] != null && (new Date().getTime() - localStorage[LAST_CHECK_FOR_PENDING_INVITES_TIME]) < ONE_HOUR) {
            deferredCount.resolve(localStorage[PENDING_INVITES]);
        } else {
            $.ajax({
                url: umUtils.restBaseUrl() + '/rest/um/1/user/search?activeFilter=pending&max-results=1',
                dataType: 'json',
                // Revert JIRA's override of jQuery's default. This means the &_=<timestamp>
                // query param is not included on requests
                cache: true
            }).then(function (invites) {
                localStorage[PENDING_INVITES] = invites.length;
                localStorage[LAST_CHECK_FOR_PENDING_INVITES_TIME] = new Date().getTime();
                deferredCount.resolve(invites.length);
            }, deferredCount.reject);
        }

        return deferredCount.promise();
    }

    function showPendingInvitesFlag() {
        pendingInvitesFlag = flag({
            id: 'pending-invites-flag',
            type: 'info',
            isHtml: true,
            body: AJS.format("\u0415\u0441\u0442\u044c \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0438 \u0441 \u043f\u0440\u0438\u0433\u043b\u0430\u0448\u0435\u043d\u0438\u044f\u043c\u0438 \u0432 \u0432\u0430\u0448 Atlassian Cloud, \u043e\u0436\u0438\u0434\u0430\u044e\u0449\u0438\u043c\u0438 \u043f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d\u0438\u044f. {0}\u0423\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435 \u0437\u0434\u0435\u0441\u044c{1}.", '<a href="/admin/users?activeFilter=pending&src=pending.flag.' + encodeURIComponent(umUtils.productName()) + '">', '</a>')
        });
        $(pendingInvitesFlag).on('um-flag-close', function() {
            localStorage[INVITES_FLAG_CLOSED_KEY] = new Date().getTime();
        });
    }

    pendingInvites.closePendingInvitesFlag = function() {
        if (pendingInvitesFlag != null) {
            pendingInvitesFlag.close();
        }
    };

    pendingInvites.init = function() {
        umUtils.isSiteAdmin().then(function (isSiteAdmin) {
            if (isSiteAdmin && !pendingInvites.flagHasBeenDismissed()) {
                return pendingInviteCount().then(function (inviteCount) {
                    if (inviteCount > 0) {
                        showPendingInvitesFlag();
                    }
                });
            }
        }).always(function() { pendingInvites.hasCompleted = true; })
    };

    return pendingInvites;
});;
;
/* module-key = 'com.atlassian.crowd.user-provisioning-vertigo-plugin:create-users-resources', location = '/js/atlassian/create-user-init.js' */
require(['jquery', 'user-management-common/create-user/request-invite', 'user-management-common/create-user/pending-invites'],
function($, requestInvite, pendingInvites) {
    $(pendingInvites.init);
});;
;
/* module-key = 'com.atlassian.pas:pas-everypage-static', location = 'js/ajs-amd.js' */
define("pas/ajs",[],function(){"use strict";return AJS});;
;
/* module-key = 'com.atlassian.pas:pas-everypage-static', location = 'js/store_js/store.js' */
!function(){var t=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e=function(e){var r=0;for(var i in e)t(e,i)&&r++;return r},r=function(t,e,r){for(var i=t.length>>>0,s=r<0?Math.max(0,i+r):r||0;s<i;s++)if(t[s]===e)return s;return-1},i=function(t,e,i){return r(t,e,i)!==-1},s=function(t,e){return i(t,e)||t.push(e),t},n=this.Store=function(t,e,r){this.name=t,this.defaults=e||{},this.watcherSpeed=r||500,this.listeners={},this.applyDefaults()};n.clear=function(){localStorage.clear()},n.prototype.applyDefaults=function(){for(var e in this.defaults)t(this.defaults,e)&&void 0===this.get(e)&&this.set(e,this.defaults[e]);return this},n.prototype.watcher=function(r){if(this.watcherTimer&&clearTimeout(this.watcherTimer),e(this.listeners)||r){if(this.newObject=this.toObject(),this.oldObject){for(var i in this.newObject)t(this.newObject,i)&&this.newObject[i]!==this.oldObject[i]&&this.fireEvent(i,this.newObject[i]);for(var i in this.oldObject)t(this.oldObject,i)&&!t(this.newObject,i)&&this.fireEvent(i,this.newObject[i])}this.oldObject=this.newObject;var s=this;this.watcherTimer=setTimeout(function(){s.watcher()},this.watcherSpeed)}return this},n.prototype.get=function(t){var e=localStorage.getItem("store."+this.name+"."+t);if(null!==e)try{return JSON.parse(e)}catch(t){return null}},n.prototype.set=function(t,e){if(void 0===e)this.remove(t);else{"function"==typeof e&&(e=null);try{e=JSON.stringify(e)}catch(t){e=null}localStorage.setItem("store."+this.name+"."+t,e)}return this},n.prototype.remove=function(t){return localStorage.removeItem("store."+this.name+"."+t),this.applyDefaults()},n.prototype.reset=function(){for(var t="store."+this.name+".",e=localStorage.length-1;e>=0;e--)localStorage.key(e).substring(0,t.length)===t&&localStorage.removeItem(localStorage.key(e));return this.applyDefaults()},n.prototype.toObject=function(){for(var t={},e="store."+this.name+".",r=localStorage.length-1;r>=0;r--)if(localStorage.key(r).substring(0,e.length)===e){var i=localStorage.key(r).substring(e.length),s=this.get(i);void 0!==s&&(t[i]=s)}return t},n.prototype.fromObject=function(e,r){r||this.reset();for(var i in e)t(e,i)&&this.set(i,e[i]);return this},n.prototype.addEvent=function(t,e){return this.watcher(!0),this.listeners[t]||(this.listeners[t]=[]),s(this.listeners[t],e),this},n.prototype.removeEvent=function(t,e){for(var r=this.listeners[t].length-1;r>=0;r--)this.listeners[t][r]===e&&this.listeners[t].splice(r,1);return this.listeners[t].length||delete this.listeners[t],this},n.prototype.fireEvent=function(t,e){for(var r=[t,"*"],i=0;i<r.length;i++){var s=r[i];if(this.listeners[s])for(var n=0;n<this.listeners[s].length;n++)this.listeners[s][n](e,t,this.name)}return this}}();;
;
/* module-key = 'com.atlassian.pas:pas-everypage-static', location = 'js/store_js/store-amd.js' */
define("pas/js/store_js/store",function(){return Store});;
;
/* module-key = 'com.atlassian.pas:pas-everypage-static', location = 'js/pasConfig.js' */
define("pas/js/pas-config",["jquery","pas/ajs","pas/js/store_js/store"],function(e,t,n){"use strict";var a=6e4;return{timeUpdateInterval:a,pollingInterval:15*a,url:t.contextPath()+"/rest/pas/latest/announcement",store:new n("Atlassian.PAS.Announcements."+document.location.hostname+t.contextPath()+"."+e("meta[name='ajs-remote-user']").attr("content")),nextAnnouncementKey:"nextAnnouncement",timeStampKey:"timeStamp",config:{url:t.contextPath()+"/rest/pas/latest/settings",timeStampKey:"configTimeStampKey",pollingInterval:18e5,currentConfigKey:"currentConfigKey"},cookieKey:t.contextPath().replace("/","")+"_pas.dismiss"}});;
;
/* module-key = 'com.atlassian.pas:pas-everypage-static', location = 'js/pas.js' */
require(["jquery","aui/flag","pas/ajs","pas/js/pas-config"],function(n,e,t,a){"use strict";t.toInit(function(){function i(e){n.ajax({type:"GET",contentType:"application/json",url:a.url,cache:!1,global:!1,timeout:5e3,success:function(n,t){o(a.timeStampKey,E()),o(a.nextAnnouncementKey,n),e()},error:function(n,e,a){t.log("Could not get announcement from server: "+a)}})}function r(n){return a.store.get(n)}function o(n,e){return a.store.set(n,e)}function u(n,e){var t=r(n),a=E()-t;return void 0==t||a>e}function c(){return u(a.timeStampKey,a.pollingInterval)}function s(){n("#more-info").live("click",function(e){t.trigger("analyticsEvent",{name:"com.atlassian.plugins.pas.more-info.click",data:{message:n("#pas-announcement span:first").text()}})})}function l(){c()?i(b):b()}var m,f,p,g=null,d=null,T=null,v=0,h=function(n){var e=function(n,e,t){for(n=""+n;n.length<t;)n=e+n;return n},t=function(n,e){var t=n+" "+e;return 1!=n&&(t+="s"),t},a=6e4,i=36e5,r=864e5;if(n<a)return"in less than a minute";if(n<i)return"in "+t(Math.round(n/a),"min");if(n<r)return"in "+t(Math.round(n/i),"hour")+" "+t(Math.round(n%i/a),"minute");var o=new Date;return o.setSeconds(o.getSeconds()+Math.round(n/1e3)),e(o.getFullYear(),"0",4)+"/"+e(o.getMonth()+1,"0",2)+"/"+e(o.getDate(),"0",2)+" "+e(o.getHours(),"0",2)+":"+e(o.getMinutes(),"0",2)},y=function(){null!=g&&clearTimeout(g),null!=d&&clearTimeout(d),null!=T&&clearInterval(T),document.getElementById("pas-announcement").close()},S=function(){function n(n){return n.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")}var i=a.announcementText,r=a.announcementUrl||"",o=a.announcementTime,u=a.announcementId,c=a.announcementTicket;m=a.announcementSource;var s=/([A-Z])\w+/g,l=/\d+/g;f=s.exec(c),p=l.exec(c);var g,d=n(a.announcementTargetPath)||"",T=new RegExp(d);null!==location.href.match(T)&&(g=e({type:"info",title:"\u0421\u043b\u0443\u0436\u0431\u0430 \u043f\u0443\u0431\u043b\u0438\u0447\u043d\u044b\u0445 \u043e\u0431\u044a\u044f\u0432\u043b\u0435\u043d\u0438\u0439",body:i+r+o,close:"manual"}),"alertr"==m&&M({name:"pas.alertr.announcement.display"})),void 0!==g&&(g.setAttribute("id","pas-announcement"),g.setAttribute("announcementId",u),g.addEventListener("aui-flag-close",function(){x()})),k()},k=function(){t.$("#more-info").on("click",function(){"alertr"==m&&M({name:"pas.alertr.announcement.url.clicked"})})},x=function(){var e,i=a.announcementId,r=new Date;r.setMonth(r.getMonth()+1),e=i+"; expires="+r.toUTCString(),document.cookie=a.cookieKey+"="+e+"; path=/",t.trigger("analyticsEvent",{name:"com.atlassian.plugins.pas.dismiss-announcement.click",data:{message:n("#pas-announcement span:first").text()}}),"alertr"==m&&M({name:"pas.alertr.announcement.dismissed"})},I=function(n,e){for(var t=document.cookie.split(";"),a=0;a<t.length;a++){var i=t[a],r=i.indexOf("="),o=i.substr(0,r).trim(),u=i.substr(r+1).trim();if(o==e)return u==n}return!1},A=function(){if(v>0){var n=v-a.timeUpdateInterval;v=n,a.announcementTime=Atlassian.PAS.Templates.pasTime({time:h(n)})}else clearInterval(T),T=null},M=function(n){var e=f[0];t.trigger("analyticsEvent",{name:n.name,data:{issueNumber:p,project:e}})},b=function(){function n(){return e.timeToStart-K()}var e=r(a.nextAnnouncementKey);if(null!=e&&null!=e.message&&!I(e.id,a.cookieKey)){v=e.timeLeft,a.announcementText=e.message,a.announcementTime=Atlassian.PAS.Templates.pasTime({time:h(v)}),T=setInterval(A,a.timeUpdateInterval),e.url&&(a.announcementUrl=Atlassian.PAS.Templates.pasUrl({url:e.url})),a.announcementTargetPath=e.targetPath,a.announcementId=e.id;var t=e.duration;e.timeToStart=n(),e.source&&(a.announcementSource=e.source),e.incidentTicket&&(a.announcementTicket=e.incidentTicket),e.timeToStart>0?(t+=e.timeToStart,g=setTimeout(function(){S()},e.timeToStart)):S(),t>0&&(d=setTimeout(function(){y()},t))}},E=function(){return(new Date).getTime()},K=function(){return E()-r(a.timeStampKey)};s(),l()})});;
;
/* module-key = 'com.atlassian.pas:pas-everypage-static', location = 'templates/soy/pas.soy' */
// This file was automatically generated from pas.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Atlassian.PAS.Templates.
 */

if (typeof Atlassian == 'undefined') { var Atlassian = {}; }
if (typeof Atlassian.PAS == 'undefined') { Atlassian.PAS = {}; }
if (typeof Atlassian.PAS.Templates == 'undefined') { Atlassian.PAS.Templates = {}; }


Atlassian.PAS.Templates.pasTime = function(opt_data, opt_ignored) {
  return '<span class="pas-announcement-time">' + soy.$$escapeHtml(opt_data.time) + '</span>';
};
if (goog.DEBUG) {
  Atlassian.PAS.Templates.pasTime.soyTemplateName = 'Atlassian.PAS.Templates.pasTime';
}


Atlassian.PAS.Templates.pasUrl = function(opt_data, opt_ignored) {
  return '<p><a id="more-info" target="_blank" href=\'' + soy.$$escapeHtml(opt_data.url) + '\'>' + soy.$$escapeHtml('\u0411\u043e\u043b\u044c\u0448\u0435 \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u0438') + '</a></p>';
};
if (goog.DEBUG) {
  Atlassian.PAS.Templates.pasUrl.soyTemplateName = 'Atlassian.PAS.Templates.pasUrl';
}
;
;
/* module-key = 'jira.webresources:jira-analytics', location = '/includes/jira/analytics/analytics.js' */
define("jira/analytics/analytics",["jquery","jira/ajs/dark-features","jira/analytics"],function(e,r,i){function n(){return e("li.active a.browse-tab").attr("id")}function t(){s.on("click","#project-admin-link",function(){var e=n();i.send({name:"browseproject.administerproject",properties:{selectedtab:e}})}),s.on("click","#browse-projects-create-project",function(){i.send({name:"projects.browse.createProject",properties:{}})}),s.on("click","#no-issues-create-issue",function(){i.send({name:"browseproject.issuesblankslate.createissue",properties:{}})}),s.on("click","a.issue-filter-link",function(){var r=e(this),n=r.attr("id").replace("filter_",""),t=r.attr("data-type");i.send({name:"browse"+t+".issuefilter."+n,properties:{}})}),s.on("click",".issueaction-viewworkflow",function(){var n=e(this).attr("class"),t=n.indexOf("new-workflow-designer")>-1||n.indexOf("jira-workflow-designer-link")>-1,s=t?"new":"old",a=r.isEnabled("casper.VIEW_ISSUE");i.send({name:"issue.viewworkflow",properties:{version:s,newEnabled:a}})})}var s=e(document);return{bindEvents:t}});;
;
/* module-key = 'jira.webresources:jira-analytics', location = '/includes/jira/analytics/analytics-init.js' */
require(["jira/analytics/analytics"],function(n){AJS.toInit(function(){n.bindEvents()})});;
;
/* module-key = 'jira.webresources:avatar-picker', location = '/includes/jquery/plugins/avataror/avataror.js' */
jQuery.fn.avataror=function(i){var t=jQuery,e=t(document);this.each(function(){var r=t(this),a=r.find("img").attr("src");r.css({"-moz-border-radius":"10px","-webkit-border-radius":"10px"}),r.html("<p>Loading?</p>");var o={previewSize:48};o.preview=t("<div/>").addClass("avataror-preview").css({border:"solid 1px #000",float:"left",height:o.previewSize+"px",overflow:"hidden",width:o.previewSize+"px",position:"relative",top:"-9999em",left:"-9999em"}),o.preview.prependTo(i.previewElement),o.img=t('<img alt="Avatar Source"/>'),o.img.load(function(){o.image=t("<div/>").css({background:"url('"+a+"') no-repeat",clear:"left",position:"relative","background-size":"cover"}),o.marker=t("<div/>").css({cursor:"move",position:"relative"}),o.dash=t("<div/>"),o.shadow=t("<div/>"),o.dash.add(o.shadow).css({cursor:"move",opacity:.5,left:0,top:0,position:"absolute"}),o.image.append(o.shadow).append(o.dash).append(o.marker),r.append(o.image),o.marker.html("<div></div><div></div><div></div><div></div>"),t("div",o.marker).each(function(i){var e=t(this);e.css({background:"#000",border:"solid 1px #fff",width:"10px",height:"10px",position:"absolute","font-size":"1px"}),e.css(["left","right","right","left"][i],"-6px"),e.css(["top","top","bottom","bottom"][i],"-6px"),e.css("cursor",["nw-resize","ne-resize","se-resize","sw-resize"][i]),e.mousedown(function(t){t.preventDefault(),t.stopPropagation(),o.dragging={x:t.pageX,y:t.pageY,ax:o.x,ay:o.y,w:o.width,h:o.height,i:i+1},o.shadow.hide()})}),o.marker.add(o.image).mousedown(function(i){i.preventDefault(),o.dragging={x:i.pageX,y:i.pageY,ax:o.x,ay:o.y,w:o.width,h:o.height},o.shadow.hide()}),e.mouseup(function(i){o.handleMouseUp(i)}),e.mousemove(function(i){o.dragging&&(o.handleMouseMove(i.pageX,i.pageY),i.preventDefault())}),o.imgwidth=o.img[0].naturalWidth,o.imgheight=o.img[0].naturalHeight,o.imgwidth>500?(o.ratio=o.imgwidth/500,o.imgwidth=500,o.imgheight/=o.ratio):o.ratio=1;var i=+t("#avatar-offsetX").val(),g=+t("#avatar-offsetY").val(),h=+t("#avatar-width").val();if(i+h>o.imgwidth||g+h>o.imgheight){i=h>=o.imgwidth?0:(o.imgwidth-h)/5,g=h>=o.imgheight?0:(o.imgheight-h)/5;var d=Math.min(o.imgwidth,o.imgheight);d<=h&&(h=d)}o.x=i,o.y=g,o.width=h,o.height=h,o.image.css({width:o.imgwidth+"px",height:o.imgheight+"px"}),o.setMarker(),r.css({width:o.imgwidth+"px"}),o.preview.css({position:"static"}),t("p",r).remove(),r.trigger("AvatarImageLoaded"),o.adjustPreview()}),o.img.attr("src",a),o.preview.append(o.img),o.setMarker=function(){o.marker.css("border","dashed 1px #fff"),o.dash.css("border","solid 1px #000"),o.shadow.css("border","solid 1px #000"),o.marker.add(this.dash).css("left",this.x-1+"px"),o.marker.add(o.dash).css("top",o.y-1+"px"),o.shadow.css("border-left-width",o.x+"px"),o.shadow.css("border-right-width",o.imgwidth-o.x-o.width+"px"),o.shadow.css("border-top-width",o.y+"px"),o.shadow.css("border-bottom-width",o.imgheight-o.y-o.height+"px"),o.shadow.css("width",o.width+"px"),o.shadow.css("height",o.height+"px"),o.marker.add(o.dash).css("width",o.width+"px"),o.marker.add(o.dash).css("height",o.height+"px")},o.adjustPreview=function(){o.img.attr("width",o.imgwidth*o.previewSize/o.width),o.img.attr("height",o.imgheight*o.previewSize/o.height),o.img.css("margin-left","-"+o.x*o.previewSize/o.width+"px"),o.img.css("margin-top","-"+o.y*o.previewSize/o.height+"px"),o.preview.select()},o.handleMouseMove=function(i,t){var e=i-o.dragging.x,r=t-o.dragging.y;if(this.dragging.i){var a=o.resizeHandlers[this.dragging.i-1];a(e,r)}else o.x=o.dragging.ax+e,o.y=o.dragging.ay+r,o.x+o.width>o.imgwidth&&(o.x=o.imgwidth-o.width),o.y+o.height>o.imgheight&&(o.y=o.imgheight-o.height),o.x<0&&(o.x=0),o.y<0&&(o.y=0);o.setMarker(),o.adjustPreview()},o.handleMouseUp=function(i){t("#avatar-offsetX").val(Math.floor(o.x*o.ratio)),t("#avatar-offsetY").val(Math.floor(o.y*o.ratio)),t("#avatar-width").val(Math.floor(o.width*o.ratio)),o.dragging=null,o.shadow.show()},o.originX=function(){return o.dragging.ax},o.originY=function(){return o.dragging.ay},o.originBottomX=function(){return o.dragging.ax+o.dragging.w},o.originBottomY=function(){return o.dragging.ay+o.dragging.h},o.originNw=function(){return{x:o.originX(),y:o.originY()}},o.originNe=function(){return{x:o.originBottomX(),y:o.originY()}},o.originSe=function(){return{x:o.originBottomX(),y:o.originBottomY()}},o.originSw=function(){return{x:o.originX(),y:o.originBottomY()}},o.nwHandler=function(i,t){var e=o.originSe(),r={x:o.originX()+i,y:o.originY()+t},a=Math.abs(r.x-e.x),g=Math.abs(r.y-e.y),h=Math.min(a,g);h<20&&(h=20),e.x-h<0&&(h=e.x),e.y-h<0&&(h=e.y),o.x=e.x-h,o.y=e.y-h,o.width=o.height=h},o.neHandler=function(i,t){var e=o.originSw(),r={x:o.originBottomX()+i,y:o.originY()+t},a=Math.abs(r.x-e.x),g=Math.abs(r.y-e.y),h=Math.min(a,g);h<20&&(h=20),e.x+h>o.imgwidth&&(h=o.imgwidth-e.x),e.y-h<0&&(h=e.y),o.y=e.y-h,o.width=o.height=h},o.seHandler=function(i,t){var e=o.originNw(),r={x:o.originBottomX()+i,y:o.originBottomY()+t},a=Math.abs(r.x-e.x),g=Math.abs(r.y-e.y),h=Math.min(a,g);h<20&&(h=20),e.x+h>o.imgwidth&&(h=o.imgwidth-e.x),e.y+h>o.imgheight&&(h=o.imgheight-e.y),o.width=o.height=h},o.swHandler=function(i,t){var e=o.originNe(),r={x:o.originX()+i,y:o.originBottomY()+t},a=Math.abs(r.x-e.x),g=Math.abs(r.y-e.y),h=Math.min(a,g);h<20&&(h=20),e.x-h<0&&(h=e.x),e.y+h>o.imgheight&&(h=o.imgheight-e.y),o.x=e.x-h,o.width=o.height=h},o.resizeHandlers=[o.nwHandler,o.neHandler,o.seHandler,o.swHandler]})};;
;
/* module-key = 'jira.webresources:avatar-picker', location = '/includes/ajs/avatarpicker/Avatar.js' */
define("jira/ajs/avatarpicker/avatar",["jira/lib/class"],function(t){return t.extend({init:function(t){this._id=t.id,this._isSystemAvatar=t.isSystemAvatar,this._isSelected=t.isSelected,this._urls=t.urls},setUnSelected:function(){this._isSelected=!1},setSelected:function(){this._isSelected=!0},isSelected:function(){return!!this._isSelected},isSystemAvatar:function(){return this._isSystemAvatar},getId:function(){return this._id},getUrl:function(t){return this._urls[t]},toJSON:function(){return{id:this._id,isSystemAvatar:this._isSystemAvatar,isSelected:this._isSelected,urls:this._urls}}})});;
;
/* module-key = 'jira.webresources:avatar-picker', location = '/includes/ajs/avatarpicker/avatar-sizes.js' */
define("jira/ajs/avatarpicker/avatar/sizes",["exports","jquery"],function(a,e){a.getSizeObjectFromName=function(r){if("object"==typeof r)return r;"string"==typeof r?e.trim(r):"";return a.LARGE.param===r?a.LARGE:a.MEDIUM.param===r?a.MEDIUM:a.SMALL.param===r?a.SMALL:"xsmall"===r?a.SMALL:a.LARGE},a.LARGE={param:"large",height:48,width:48},a.MEDIUM={param:"medium",width:32,height:32},a.SMALL={param:"small",width:16,height:16}});;
;
/* module-key = 'jira.webresources:avatar-picker', location = '/includes/ajs/avatarpicker/avatar-factory.js' */
define("jira/ajs/avatarpicker/avatar-factory",["jira/ajs/avatarpicker/avatar","exports"],function(a,t){t.createCustomAvatar=function(t){return t.isSystemAvatar=!1,new a(t)},t.createSystemAvatar=function(t){return t.isSystemAvatar=!0,new a(t)}});;
;
/* module-key = 'jira.webresources:avatar-picker', location = '/includes/ajs/avatarpicker/AvatarManager.js' */
define("jira/ajs/avatarpicker/avatar-manager",["jira/util/formatter","jira/lib/class","wrm/context-path","jquery"],function(t,r,e,a){var s=e();return r.extend({init:function(t){this.store=t.store,this.ownerId=t.ownerId,this.username=t.username,this.anonymousAvatarId=t.anonymousAvatarId,this.avatarSrcBaseUrl=t.avatarSrcBaseUrl},selectAvatar:function(t,r){return this.store.selectAvatar(t,r)},getById:function(t){return this.store.getById(t)},destroy:function(t,r){this.store.destroy(t,r)},update:function(t,r){this.store.update(t,r)},add:function(t,r){this.store._add(t,r)},getAllSystemAvatars:function(){return this.store.getAllSystemAvatars()},getAllCustomAvatars:function(){return this.store.getAllCustomAvatars()},getSelectedAvatar:function(){return this.store.getSelectedAvatar()},getAllAvatars:function(){return this.store.getAllAvatars()},getAllAvatarsRenderData:function(t){var r,e=this,a=this.getAllAvatars(),s={system:[],custom:[]};for(r=0;r<a.system.length;r++)s.system.push(e.getAvatarRenderData(a.system[r],t));for(r=0;r<a.custom.length;r++)s.custom.push(e.getAvatarRenderData(a.custom[r],t));return s},getAvatarRenderData:function(t,r){var e=t.toJSON();return e.src=this.getAvatarSrc(t,r),e.width=r.width,e.height=r.height,e},refreshStore:function(t){this.store.refresh(t)},getAvatarSrc:function(r,e){return this.store.isTempAvatar(r)?s+"/secure/temporaryavatar?"+a.param({cropped:!0,magic:(new Date).getTime(),size:e.param}):r.getUrl(t.format("{0}x{1}",e.height,e.width))},createTemporaryAvatar:function(t,r){this.store.createTemporaryAvatar(t,r)},createAvatar:function(t,r,e){this.store.createAvatar(t,r,e)},createAvatarFromTemporary:function(t,r){this.store.createAvatarFromTemporary(t,r)},getAnonymousAvatarId:function(){return this.anonymousAvatarId}})});;
;
/* module-key = 'jira.webresources:avatar-picker', location = 'includes/ajs/avatarpicker/avatar-manager-factory.js' */
define("jira/ajs/avatarpicker/avatar-manager-factory",["jira/ajs/avatarpicker/avatar-store","jira/ajs/avatarpicker/avatar-manager","wrm/context-path","exports"],function(a,r,e,t){var s=e();t.createUniversalAvatarManager=function(e){var t,v="",n="",p="",l="",c="";if(e.projectId){var o=s+"/rest/api/latest/universal_avatar/type/"+e.avatarType+"/owner/"+e.projectId;t=o;var u=o+"/avatar";v=null,n=o+"/temp",p=o,l=u,c=u}else t=s+"/rest/api/latest/avatar/project/system",n=s+"/rest/api/latest/avatar/project/temporary",l=s+"/rest/api/latest/avatar/project/temporaryCrop";var i=new a({restQueryUrl:t,restUpdateUrl:v,restCreateTempUrl:n,restCreateUrl:p,restUpdateTempUrl:l,restSingleAvatarUrl:c,defaultAvatarId:e.defaultAvatarId});return new r({store:i,ownerId:e.projectId,avatarSrcBaseUrl:s+"/secure/projectavatar"})},t.createProjectAvatarManager=function(a){return a.avatarType="project",t.createUniversalAvatarManager(a)},t.createUserAvatarManager=function(e){var t=s+"/rest/api/latest/user",v=new a({restQueryUrl:t+"/avatars",restUpdateUrl:t+"/avatar",restCreateTempUrl:t+"/avatar/temporary",restUpdateTempUrl:t+"/avatar",restSingleAvatarUrl:t+"/avatar",restParams:{username:e.username},defaultAvatarId:e.defaultAvatarId});return new r({store:v,username:e.username,avatarSrcBaseUrl:s+"/secure/useravatar"})}});;
;
/* module-key = 'jira.webresources:avatar-picker', location = '/includes/ajs/avatarpicker/AvatarStore.js' */
define("jira/ajs/avatarpicker/avatar-store",["jira/util/formatter","jira/ajs/avatarpicker/avatar-util","jira/ajs/avatarpicker/avatar-factory","jira/ajs/ajax/smart-ajax","jira/lib/class","jquery"],function(t,e,r,a,s,i){return s.extend({TEMP_ID:"TEMP",init:function(t){if(!t.restQueryUrl)throw new Error("JIRA.AvatarStore.init: You must specify [restQueryUrl], The rest url for querying avatars (see class description)");if(!t.restCreateTempUrl)throw new Error("JIRA.AvatarStore.init: You must specify [restCreateTempUrl], The rest url for creating a temporary avatar (see class description)");if(!t.restUpdateTempUrl)throw new Error("JIRA.AvatarStore.init: You must specify [restUpdateTempUrl], The rest url for updating a temporary avatar (see class description)");if(!t.defaultAvatarId)throw new Error("JIRA.AvatarStore.init: You must specify [defaultAvatarId] to the contructor so the store knows what to select if you delete the selected one");this.restQueryUrl=t.restQueryUrl,this.restUpdateUrl=t.restUpdateUrl,this.restCreateTempUrl=t.restCreateTempUrl,this.restCreateUrl=t.restCreateUrl,this.restUpdateTempUrl=t.restUpdateTempUrl,this.restSingleAvatarUrl=t.restSingleAvatarUrl,this.restParams=t.restParams||{},this.restParams.atl_token=atl_token(),this.defaultAvatarId=t.defaultAvatarId,this.avatars={system:[],custom:[]}},_buildCompleteUrl:function(e){var r=e;if(this.restParams){var a="";for(var s in this.restParams)a+=t.format("&{0}={1}",encodeURIComponent(s),encodeURIComponent(this.restParams[s]));r+="?"+a.substr(1)}return r},getById:function(t){var e;return i.each(this.avatars.system,function(r,a){if(this.getId()===t)return e=a,!1}),e||i.each(this.avatars.custom,function(r,a){if(this.getId()===t)return e=a,!1}),e},isTempAvatar:function(t){return t.getId()===this.TEMP_ID},_selectAvatar:function(t){var e=this.getSelectedAvatar();e&&e.setUnSelected(),t.setSelected()},selectAvatar:function(t,e){var r=this;if(!t)throw new Error("JIRA.AvatarStore.selectAvatar: Cannot select Avatar that does not exist");this.restUpdateUrl?a.makeRequest({type:"PUT",contentType:"application/json",dataType:"json",url:this._buildCompleteUrl(this.restUpdateUrl),data:JSON.stringify(t.toJSON()),success:function(){r._selectAvatar(t),e.success&&e.success.call(this,t)},error:e.error}):(r._selectAvatar(t),e.success&&e.success.call(this,t))},_destory:function(t){var e=i.inArray(t,this.avatars.custom);if(e===-1)throw new Error("JIRA.AvatarStore._destroy: Cannot remove avatar ["+t.getId()+"], it might be a system avatar (readonly) or does not exist.");this.avatars.custom.splice(e,1)},destroy:function(t,e){var r=this;if(e=e||{},!t)throw new Error("JIRA.AvatarStore.destroy: Cannot delete Avatar that does not exist");a.makeRequest({type:"DELETE",url:this.getRestUrlForAvatar(t),success:function(){r._destory(t),t.isSelected()?r.selectAvatar(r.getById(r.defaultAvatarId),e):e.success&&e.success.apply(this,arguments)},error:e.error})},getSelectedAvatar:function(){for(var t=0;t<this.avatars.custom.length;t++)if(this.avatars.custom[t].isSelected())return this.avatars.custom[t];for(t=0;t<this.avatars.system.length;t++)if(this.avatars.system[t].isSelected())return this.avatars.system[t]},_update:function(t){var e=this;if(!this.getById(t.getId()))throw new Error("JIRA.AvatarStore._update: Cannot update avatar ["+t.getId()+"], it might be a system avatar (readonly) or does not exist.");i.each(this.avatars.custom,function(r){this.getId()===t.getId()&&(e.avatars.custom[r]=t)})},update:function(t,e){var r=this;e=e||{},a.makeRequest({type:"PUT",url:this.getRestUrlForAvatar(t),error:e.error,success:function(){r._update(t),e.success&&e.success.apply(this,arguments)}})},_add:function(t){t.isSystemAvatar()?this.avatars.system.push(t):this.avatars.custom.push(t)},createAvatarFromTemporary:function(t,e){var s=this;e=e||{},this.restUpdateTempUrl&&a.makeRequest({type:"POST",url:this._buildCompleteUrl(this.restUpdateTempUrl),data:JSON.stringify(t),contentType:"application/json",dataType:"json",success:function(t){t||(t={id:s.TEMP_ID,isSelected:!0});var a=r.createCustomAvatar(t);s._add(a),e.success&&e.success.call(this,t)},error:e.error})},createTemporaryAvatar:function(t,r){r=i.extend(!0,{},r,{params:this.restParams}),e.uploadTemporaryAvatar(this.restCreateTempUrl,t,r)},createAvatar:function(t,r,a){var s={x:r.cropperOffsetX,y:r.cropperOffsetY,size:r.cropperWidth};a=i.extend(!0,{},a,{params:this.restParams},{params:s}),e.uploadAvatar(this.restCreateUrl,t,a)},_refresh:function(t){var e=this;e.avatars.system=[],e.avatars.custom=[],t.system&&i.each(t.system,function(t,a){e.avatars.system.push(r.createSystemAvatar(a))}),t.custom&&i.each(t.custom,function(t,a){e.avatars.custom.push(r.createCustomAvatar(a))})},refresh:function(t){var e=this,r=this.getById(e.TEMP_ID);t=t||{},a.makeRequest({url:this._buildCompleteUrl(this.restQueryUrl),error:t.error,success:function(a){e._refresh(a),r&&e._add(r),t.success&&t.success.apply(this,arguments)}})},getAllAvatars:function(){return this.avatars},getAllSystemAvatars:function(){return this.avatars.system},getAllCustomAvatars:function(){return this.avatars.custom},getRestUrlForAvatar:function(t){return this._buildCompleteUrl(this.restSingleAvatarUrl+"/"+t.getId())}})});;
;
/* module-key = 'jira.webresources:avatar-picker', location = '/includes/ajs/avatarpicker/AvatarUtil.js' */
define("jira/ajs/avatarpicker/avatar-util",["jira/util/logger","jira/attachment/inline-attach","jquery"],function(r,e,a){var n={uploadUsingIframeRemoting:function(o,t,i){i=i||{};var s=t.val(),l=new e.Form(new e.FileInput(t,(!1))),u=l.addStaticProgress(s),d=l.cloneFileInput();l.fileSelector.clear();var c=new e.Timer(function(){},this),p=new e.FormUpload({$input:d,url:o,params:a.extend({},i.params,{filename:s,atl_token:window.atl_token()}),scope:this,before:function(){!this.cancelled&&u.start()},success:function(r,e){r.errorMessages&&r.errorMessages.length?l.addErrorWithFileName(r.errorMessages[0],s,n.getErrorTarget(l)):i.success&&i.success(r,e)},error:function(a){r.log(a),this.cancelled||(a.indexOf("SecurityTokenMissing")>=0?l.addError(e.Text.tr("upload.xsrf.timeout",s),n.getErrorTarget(l)):l.addError(e.Text.tr("upload.error.unknown",s),n.getErrorTarget(l)))},after:function(){c.cancel(),u.remove(),this.cancelled||l.enable()}});u.onCancel(function(){p.abort()}),p.upload()},uploadTemporaryUsingFileApi:function(r,n,o){var t=new e.Form(new e.FileInput(n,(!1))),i=n[0].files[0];o=o||{},o.params=a.extend({},o.params,{filename:i.name,size:i.size,atl_token:window.atl_token()}),this.handleFileUpload(r,n,i,t,o)},uploadUsingFileApi:function(r,o,t){var i=a(o),s=new e.Form(new e.FileInput(a(i),(!1)));e.AjaxPresenter.isSupported(i)||s.addError(e.Text.tr("upload.error.unsupported.browser"),n.getErrorTarget(s));var l=o.files[0];this.handleFileUpload(r,i,l,s,t||{})},handleFileUpload:function(r,o,t,i,s){var l,u=i.addProgress(t),d=new e.Timer(function(){l||u.show()}),c=new e.AjaxUpload({file:t,params:a.extend({},s.params),scope:this,url:r,before:function(){o.hide(),!l&&u.start()},progress:function(r){u.progress.$progress.parent().parent().show(),!l&&u.update(r)},success:function(r,e){l||(r.errorMessages&&r.errorMessages.length?(i.addErrorWithFileName(r.errorMessages[0],t.name,n.getErrorTarget(i)),s.error&&s.error(r.errorMessages[0],e)):201===e&&s.success(r,e))},error:function(r,a){a<0?i.addError(r,n.getErrorTarget(i)):i.addError(e.Text.tr("upload.error.unknown",t.name),n.getErrorTarget(i)),s.error&&s.error(r,a)},after:function(){d.cancel(),u.finish().remove(),o.val("").show()}});c.upload(),u.onCancel(function(){c.abort()})},getErrorTarget:function(r){return{$element:r.$form.find(".error")}},uploadTemporaryAvatar:function(r,a,n){e.AjaxPresenter.isSupported(a)?this.uploadTemporaryUsingFileApi(r,a,n):this.uploadUsingIframeRemoting(r,a,n)},uploadAvatar:function(r,e,a){this.uploadUsingFileApi(r,e,a)}};return n});;
;
/* module-key = 'jira.webresources:avatar-picker', location = '/includes/ajs/avatarpicker/ClientFileReader.js' */
define("jira/ajs/avatarpicker/client-file-reader",["jira/attachment/inline-attach","jira/util/formatter","underscore"],function(e,t,i){"use strict";var r=function(e){this.init(e)};return r.prototype.defaults={fileTypeFilter:/^image.*/,fileSizeLimit:10485760},r.prototype.init=function(e){this.options=i.defaults({},e,this.defaults)},r.prototype.readFileAsDataUri=function(e){var t=Array.prototype.slice.call(e,0,1)[0],i=this.validateFile(t);if(i.valid===!1){var r=new Error(i.error);return r.name="ValidationError",Promise.reject(r)}var a=new FileReader,n=new Promise(function(e,t){a.addEventListener("load",function(){e(a.result)}),a.addEventListener("error",function(e){t(e)})});return a.readAsDataURL(t),n},r.prototype.validateFile=function(i){var r="";return this.options.fileTypeFilter.test(i.type)?i.size>this.options.fileSizeLimit&&(r=t.format("\u0420\u0438\u0441\u0443\u043d\u043e\u043a {0} \u0441\u043b\u0438\u0448\u043a\u043e\u043c \u0431\u043e\u043b\u044c\u0448\u043e\u0439. \u041c\u0430\u043a\u0441\u0438\u043c\u0430\u043b\u044c\u043d\u043e \u0434\u043e\u043f\u0443\u0441\u0442\u0438\u043c\u044b\u0439 \u0440\u0430\u0437\u043c\u0435\u0440 {1}.",i.name,e.Text.fileSize(this.options.fileSizeLimit))):r="\u0421\u043e\u0434\u0435\u0440\u0436\u0430\u043d\u0438\u0435 \u0444\u0430\u0439\u043b\u0430, \u043a\u043e\u0442\u043e\u0440\u044b\u0439 \u0432\u044b \u043f\u0440\u0435\u0434\u043b\u043e\u0436\u0438\u043b\u0438 \u043d\u0435 \u043f\u043e\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442 \u0444\u043e\u0440\u043c\u0430\u0442 \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u044f. \u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u043f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 JPEG, GIF \u0438\u043b\u0438 PNG \u0444\u0430\u0439\u043b.",""===r?{valid:!0}:{valid:!1,error:r}},r});;
;
/* module-key = 'jira.webresources:avatar-picker', location = '/includes/ajs/avatarpicker/avatar-picker.js' */
define("jira/ajs/avatarpicker/avatar-picker",["jira/util/logger","jira/util/formatter","jira/ajs/avatarpicker/client-file-reader","jira/ajs/avatarpicker/avatar-picker/image-editor","jira/ajs/ajax/smart-ajax","jira/dialog/dialog","jira/ajs/control","jquery","underscore"],function(a,e,r,t,i,n,o,c,l){return o.extend({defaults:{cropOffline:!1,maxImageDimension:2e3},init:function(a){a=l.defaults(a,this.defaults),this.avatarManager=a.avatarManager,this.avatarRenderer=a.avatarRenderer,this.imageEditor=a.imageEditor,this.size=a.size,this.selectCallback=a.select,this.cropperDialog=null,this.initialSelection=a.initialSelection,this.cropOffline=a.cropOffline,this.maxImageDimension=a.maxImageDimension},render:function(a){var e=this;this.avatarManager.refreshStore({success:function(){e.cropperDialog instanceof n&&(e.cropperDialog.hide(),delete e.cropperDialog),e.element=c('<div id="jira-avatar-picker" />'),e.element.html(JIRA.Templates.AvatarPicker.picker({avatars:e.avatarManager.getAllAvatarsRenderData(e.size)})),e._assignEvents("selectAvatar",e.element.find(".jira-avatar button")),e._assignEvents("deleteAvatar",e.element.find(".jira-delete-avatar")),e._assignEvents("uploader",e.element.find("#jira-avatar-uploader")),e._assignEvents("selectFilePicker",e.element.find("label.jira-avatar-uploader")),e._assignEvents("selectFilePicker",e.element.find("#jira-avatar-uploader-button")),e.$fileErrorContainer=e.element.find(".jira-avatar-upload-form .error"),void 0!==e.initialSelection&&e.getAvatarElById(e.initialSelection).addClass("jira-selected-avatar"),a(e.element),e.element.find("#jira-avatar-uploader-button").addClass("aui-button")},error:function(r,t,i,n){e.appendErrorContent(e.element,n),a(e.element)}})},appendErrorContent:function(a,e){try{var r=JSON.parse(e.data);r&&r.errorMessages?c.each(r.errorMessages,function(e,r){AJS.messages.error(a,{body:AJS.escapeHTML(r),closeable:!1,shadowed:!1})}):a.append(i.buildDialogErrorContent(e,!0))}catch(r){a.append(i.buildDialogErrorContent(e,!0))}},showFileError:function(a){this.$fileErrorContainer.text(a)},clearFileError:function(){this.$fileErrorContainer.text("")},createCropperDialog:function(a,e){var r=this;return new n({id:"project-avatar-cropper",width:560,content:function(t){var i=r.imageEditor.render(e);r.imageEditor.edit({confirm:function(e){r.imageEditor.startProgress(),r.avatarManager.createAvatar(a,e,{success:function(a){r.render(function(){r.selectAvatar(a.id)})},error:function(){r.resetCropping()}})},cancel:r.resetCropping.bind(r)}),t(i)}})},cropLocalFile:function(e){var i,n=this,o=new r;o.readFileAsDataUri(e.files).then(function(a){return i=a,n.validateImage(i)}).then(function(){var a={cropperOffsetX:100,cropperOffsetY:100,cropperWidth:100,url:i};n.cropperDialog=n.createCropperDialog(e,a),n.cropperDialog.bind("dialogContentReady",function(){c(n).trigger(t.LOADED)}),n.cropperDialog.bind("Dialog.hide",function(){c(n).trigger(t.DISMISSED)}),n.cropperDialog.show()}).catch(function(e){"ValidationError"===e.name?n.showFileError(e.message):a.error(e)})},resetCropping:function(){this.cropperDialog&&this.cropperDialog.hide(),this.element.find("#jira-avatar-uploader").val("")},validateImage:function(a){var r=new Image,t=this,i=new Promise(function(a,i){r.onload=function(){if(this.naturalHeight>t.maxImageDimension||this.naturalWidth>t.maxImageDimension){var r=new Error(e.format("\u0420\u0430\u0437\u043c\u0435\u0440 \u0432\u044b\u0431\u0440\u0430\u043d\u043d\u043e\u0433\u043e \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u044f \u0441\u043b\u0438\u0448\u043a\u043e\u043c \u0432\u0435\u043b\u0438\u043a. \u041c\u0430\u043a\u0441\u0438\u043c\u0430\u043b\u044c\u043d\u044b\u0439 \u0440\u0430\u0437\u0440\u0435\u0448\u0435\u043d\u043d\u044b\u0439 \u0440\u0430\u0437\u043c\u0435\u0440 \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u044f \u0440\u0430\u0432\u0435\u043d {0}\u00a0px\u00a0\u00d7 {0}\u00a0px",t.maxImageDimension));r.name="ValidationError",i(r)}else a(this.naturalWidth,this.naturalHeight)},r.onerror=function(){var a=new Error("\u041d\u0435 \u0443\u0434\u0430\u0435\u0442\u0441\u044f \u043f\u0440\u043e\u0447\u0438\u0442\u0430\u0442\u044c \u0432\u044b\u0431\u0440\u0430\u043d\u043d\u043e\u0435 \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435. \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0435 \u0440\u0430\u0437 \u0438\u043b\u0438 \u0432\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0434\u0440\u0443\u0433\u043e\u0435 \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435.");a.name="ValidationError",i(a)}});return r.src=a,i},uploadTempAvatar:function(e){var r=this;this.avatarManager.createTemporaryAvatar(e,{success:function(a){a.id?r.render(function(){r.selectAvatar(a.id)}):(e.val(""),r.cropperDialog=new n({id:"project-avatar-cropper",width:560,content:function(e){function t(){var a=i.find("input[type=submit]"),e=c("<span class='icon throbber loading'></span>");return a.attr("aria-disabled","true").attr("disabled",""),a.before(e),function(){e.remove(),a.removeAttr("aria-disabled").removeAttr("disabled")}}var i=r.imageEditor.render(a);r.imageEditor.edit({confirm:function(a){var e=t();r.avatarManager.createAvatarFromTemporary(a,{success:function(a){r.render(function(){r.selectAvatar(a.id)})},error:e})}}),i.find(".cancel").click(function(){r.cropperDialog.hide()}),e(i)}}),r.cropperDialog.bind("dialogContentReady",function(){c(r).trigger(t.LOADED)}),r.cropperDialog.bind("Dialog.hide",function(){c(r).trigger(t.DISMISSED)}),r.cropperDialog.show())},error:function(){a.log(arguments)}})},getAvatarElById:function(a){return this.element.find(".jira-avatar[data-id='"+a+"']")},selectAvatar:function(a){var e=this.avatarManager.getById(a),r=this;this.avatarManager.selectAvatar(this.avatarManager.getById(a),{error:function(){},success:function(){r.getAvatarElById(a).remove(),r.selectCallback&&r.selectCallback.call(r,e,r.avatarManager.getAvatarSrc(e,r.size))}})},selectFilePicker:function(){var a=c("#jira-avatar-uploader");a&&a.click()},deleteAvatar:function(a){var r=this;confirm("\u0412\u044b \u0443\u0432\u0435\u0440\u0435\u043d\u044b \u0447\u0442\u043e \u0445\u043e\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043b\u0438\u0442\u044c \u0430\u0432\u0430\u0442\u0430\u0440?")&&this.avatarManager.destroy(this.avatarManager.getById(a),{error:function(){},success:function(){var e=r.avatarManager.getSelectedAvatar(),t=r.getAvatarElById(a);t.fadeOut(function(){t.remove()}),e.getId()!==a&&(r.getAvatarElById(e.getId()).addClass("jira-selected-avatar"),r.selectCallback.call(r,e,r.avatarManager.getAvatarSrc(e,r.size),!0))}})},_events:{uploader:{change:function(a,e){this.clearFileError(),this.cropOffline?this.cropLocalFile(e[0]):this.uploadTempAvatar(e)}},deleteAvatar:{click:function(a,e){this.deleteAvatar(e.attr("data-id"))}},selectAvatar:{click:function(a,e){"select-avatar-button"===e[0].id&&this.selectAvatar(e.attr("data-id"))}},selectFilePicker:{click:function(a,e){this.selectFilePicker()}}}})});;
;
/* module-key = 'jira.webresources:avatar-picker', location = '/includes/ajs/avatarpicker/avatar-picker-factory.js' */
define("jira/ajs/avatarpicker/avatar-picker-factory",["jira/util/formatter","jira/ajs/avatarpicker/avatar-picker","jira/ajs/avatarpicker/avatar-picker/image-editor","jira/ajs/avatarpicker/avatar-manager","jira/ajs/avatarpicker/avatar-manager-factory","jira/ajs/avatarpicker/avatar","jira/ajs/avatarpicker/avatar/sizes","jira/dialog/form-dialog","wrm/context-path","wrm/data","jquery","exports"],function(a,e,t,r,i,c,n,o,d,v,p,l){l.createUniversalAvatarPicker=function(a){return new e({avatarManager:i.createUniversalAvatarManager({projectKey:a.projectKey,projectId:a.projectId,defaultAvatarId:a.defaultAvatarId,avatarType:a.avatarType}),initialSelection:a.initialSelection,imageEditor:new t,size:a.hasOwnProperty("avatarSize")?a.avatarSize:n.LARGE,select:a.select,cropOffline:!0})},l.createProjectAvatarPicker=function(a){return new e({avatarManager:i.createProjectAvatarManager({projectKey:a.projectKey,projectId:a.projectId,defaultAvatarId:a.defaultAvatarId}),imageEditor:new t,size:n.LARGE,select:a.select,cropOffline:!0})},l.createUserAvatarPicker=function(a){return new e({avatarManager:i.createUserAvatarManager({username:a.username,defaultAvatarId:a.defaultAvatarId}),imageEditor:new t,size:n.LARGE,select:a.select})},l.createUniversalAvatarPickerDialog=function(e){var t=e.initialSelection||e.defaultAvatarId,r=new o({trigger:e.trigger,id:"project-avatar-picker",width:600,stacked:!0,content:function(i){var c,n;n=p('<div id="projectavatar-content-wrapper"/>'),p("<h2 />").text(e.title||"\u0412\u044b\u0431\u0440\u0430\u0442\u044c \u0410\u0432\u0430\u0442\u0430\u0440 \u041f\u0440\u043e\u0435\u043a\u0442\u0430").appendTo(n),c=l.createUniversalAvatarPicker({projectKey:e.projectKey,projectId:e.projectId,defaultAvatarId:e.defaultAvatarId,initialSelection:t,avatarType:e.avatarType,avatarSize:e.avatarSize,select:function(a,i,c){t=String(a.getId()),e.select&&e.select.apply(this,arguments),c||r.hide()}}),c.render(function(a){n.append(a),i(n)})}});r._focusFirstField=function(){}},l.createProjectAvatarPickerDialog=function(e){var t=new o({trigger:e.trigger,id:"project-avatar-picker",width:600,stacked:!0,content:function(r){var i,c;c=p('<div id="projectavatar-content-wrapper"/>'),p("<h2 />").text("\u0412\u044b\u0431\u0440\u0430\u0442\u044c \u0410\u0432\u0430\u0442\u0430\u0440 \u041f\u0440\u043e\u0435\u043a\u0442\u0430").appendTo(c),i=l.createProjectAvatarPicker({projectKey:e.projectKey,projectId:e.projectId,defaultAvatarId:e.defaultAvatarId,select:function(a,r,i){e.select&&e.select.apply(this,arguments),i||t.hide()}}),i.render(function(a){c.append(a),r(c)})}});t._focusFirstField=function(){}};var s=v.claim("jira.webresources:avatar-picker.data");l.createUserAvatarPickerDialog=function(e){if(s&&s.isEnabled)return void p(e.trigger).click(function(a){var e=d()+s.url,t=e.indexOf("?")>-1?"&":"?";e+=t+"continue="+encodeURIComponent(window.location.href),a.preventDefault(),a.stopPropagation(),AJS.reloadViaWindowLocation(e)});var t=new o({trigger:e.trigger,id:"user-avatar-picker",width:600,stacked:!0,content:function(r){var i,c;c=p('<div id="useravatar-content-wrapper"/>'),p("<h2 />").text("\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0410\u0432\u0430\u0442\u0430\u0440 \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044f").appendTo(c),i=l.createUserAvatarPicker({username:e.username,defaultAvatarId:e.defaultAvatarId,select:function(a,r,i){e.select&&e.select.apply(this,arguments),p(".avatar-image").attr("src",r),i||t.hide()}}),i.render(function(a){c.append(a),r(c)})}})}});;
;
/* module-key = 'jira.webresources:avatar-picker', location = '/includes/ajs/avatarpicker/avatar-picker-image-editor.js' */
define("jira/ajs/avatarpicker/avatar-picker/image-editor",["jira/ajs/control","jquery"],function(e,t){var a=e.extend({render:function(e){return this.element=t('<div id="avatar-picker-image-editor"/>').html(JIRA.Templates.AvatarPicker.imageEditor(e)),this.element},edit:function(e){var a=this,i=this.element.find(".avataror");e=e||{},i.unbind(),i.bind("AvatarImageLoaded",function(){e.ready&&e.ready()}),i.find("img").load(function(){i.avataror({previewElement:a.element.find(".jira-avatar-cropper-header"),parent:a.element})}),this.element.find("#avataror").submit(function(a){a.preventDefault(),e.confirm&&e.confirm({cropperOffsetX:t("#avatar-offsetX").val(),cropperOffsetY:t("#avatar-offsetY").val(),cropperWidth:t("#avatar-width").val()})}).find(".cancel").click(function(t){t.preventDefault(),e.cancel&&e.cancel()})},startProgress:function(){this.element.find("input[type=submit]").attr("aria-disabled","true").attr("disabled",""),this.element.find(".spinner").spin()},stopProgress:function(){this.element.find("input[type=submit]").removeAttr("aria-disabled").removeAttr("disabled"),this.element.find(".spinner").spinStop()}});return a.LOADED="imageEditorLoaded",a.DISMISSED="imageEditorDismissed",a});;
;
/* module-key = 'jira.webresources:avatar-picker', location = '/includes/ajs/avatarpicker/GravatarUtil.js' */
define("jira/ajs/avatarpicker/gravatar-util",["jquery","exports"],function(a,e){e.showGravatarHelp=function(e){"undefined"!=typeof e&&"undefined"!=typeof e.entry&&(a(".gravatar-signup-text").addClass("hidden"),a(".gravatar-login-text").removeClass("hidden"))},e.displayGravatarHelp=function(){var r=a("#gravatar_json_url");r.length&&a.ajax(r.val(),{dataType:"jsonp",success:e.showGravatarHelp})}});;
;
/* module-key = 'jira.webresources:avatar-picker', location = '/includes/ajs/avatarpicker/initAvatarPicker.js' */
!function(){var a=require("jquery"),r=require("jira/ajs/avatarpicker/avatar/sizes"),e=require("jira/ajs/avatarpicker/avatar-factory"),t=require("jira/ajs/avatarpicker/avatar-manager-factory"),c=require("jira/ajs/avatarpicker/avatar-picker-factory"),A=require("jira/ajs/avatarpicker/gravatar-util");AJS.namespace("JIRA.Avatar",null,require("jira/ajs/avatarpicker/avatar")),AJS.namespace("JIRA.Avatar.createCustomAvatar",null,e.createCustomAvatar),AJS.namespace("JIRA.Avatar.createSystemAvatar",null,e.createSystemAvatar),AJS.namespace("JIRA.Avatar.getSizeObjectFromName",null,r.getSizeObjectFromName),AJS.namespace("JIRA.Avatar.LARGE",null,r.LARGE),AJS.namespace("JIRA.Avatar.MEDIUM",null,r.MEDIUM),AJS.namespace("JIRA.Avatar.SMALL",null,r.SMALL),AJS.namespace("JIRA.AvatarManager",null,require("jira/ajs/avatarpicker/avatar-manager")),AJS.namespace("JIRA.AvatarManager.createUniversalAvatarManager",null,t.createUniversalAvatarManager),AJS.namespace("JIRA.AvatarManager.createProjectAvatarManager",null,t.createProjectAvatarManager),AJS.namespace("JIRA.AvatarManager.createUserAvatarManager",null,t.createUserAvatarManager),AJS.namespace("JIRA.AvatarPicker",null,require("jira/ajs/avatarpicker/avatar-picker")),AJS.namespace("JIRA.AvatarPicker.ImageEditor",null,require("jira/ajs/avatarpicker/avatar-picker/image-editor")),AJS.namespace("JIRA.AvatarPicker.createUniversalAvatarPicker",null,c.createUniversalAvatarPicker),AJS.namespace("JIRA.AvatarPicker.createProjectAvatarPicker",null,c.createProjectAvatarPicker),AJS.namespace("JIRA.AvatarPicker.createUserAvatarPicker",null,c.createUserAvatarPicker),AJS.namespace("JIRA.createUniversalAvatarPickerDialog",null,c.createUniversalAvatarPickerDialog),AJS.namespace("JIRA.createProjectAvatarPickerDialog",null,c.createProjectAvatarPickerDialog),AJS.namespace("JIRA.createUserAvatarPickerDialog",null,c.createUserAvatarPickerDialog),AJS.namespace("JIRA.AvatarStore",null,require("jira/ajs/avatarpicker/avatar-store")),AJS.namespace("JIRA.AvatarUtil",null,require("jira/ajs/avatarpicker/avatar-util")),AJS.namespace("JIRA.GravatarUtil.showGravatarHelp",null,A.showGravatarHelp),a(function(){c.createUserAvatarPickerDialog({trigger:"#user_avatar_image",username:a("#avatar-owner-id").text(),defaultAvatarId:a("#default-avatar-id").text()}),a("#gravatar_help_params")&&A.displayGravatarHelp()})}();;
;
/* module-key = 'jira.webresources:avatar-picker', location = 'includes/ajs/avatarpicker/AvatarPicker.soy.js' */
if("undefined"==typeof JIRA)var JIRA={};"undefined"==typeof JIRA.Templates&&(JIRA.Templates={}),"undefined"==typeof JIRA.Templates.AvatarPicker&&(JIRA.Templates.AvatarPicker={}),JIRA.Templates.AvatarPicker.picker=function(a,t){for(var e='<form class="jira-avatar-upload-form aui top-label" action="#"><input name="id" value="10000" type="hidden" ><input name="pid" value="10000" type="hidden" ><div class="field-group"><button id="jira-avatar-uploader-button" type="button">'+soy.$$escapeHtml("\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c \u043d\u043e\u0432\u044b\u0439 \u0430\u0432\u0430\u0442\u0430\u0440")+'</button><input type="file" class="ignore-inline-attach" name="avatar" id="jira-avatar-uploader" style="visibility:hidden;"/><div class="error"></div></div></form><div class="form-body"><ul class="jira-avatars">',i=a.avatars.system,s=i.length,r=0;r<s;r++){var l=i[r];e+='<li class="jira-avatar jira-system-avatar '+(l.isSelected?"jira-selected-avatar":"")+'" title="Select this Avatar" data-id="'+soy.$$escapeHtml(l.id)+'"><button id="select-avatar-button" data-id="'+soy.$$escapeHtml(l.id)+'" class="jira-icon-button" title="'+soy.$$escapeHtml("\u0412\u044b\u0431\u0440\u0430\u0442\u044c \u044d\u0442\u043e\u0442 \u0430\u0432\u0430\u0442\u0430\u0440")+'"><img id="avatar-'+soy.$$escapeHtml(l.id)+'" src="'+soy.$$escapeHtml(l.src)+'" width="'+soy.$$escapeHtml(l.width)+'" height="'+soy.$$escapeHtml(l.height)+'" alt="'+soy.$$escapeHtml("\u0412\u044b\u0431\u0440\u0430\u0442\u044c \u044d\u0442\u043e\u0442 \u0430\u0432\u0430\u0442\u0430\u0440")+'"/></button></li>'}for(var c=a.avatars.custom,o=c.length,p=0;p<o;p++){var d=c[p];e+='<li class="jira-avatar jira-custom-avatar '+(d.isSelected?"jira-selected-avatar":"")+'" title="Select this avatar" data-id="'+soy.$$escapeHtml(d.id)+'"><button id="select-avatar-button" data-id="'+soy.$$escapeHtml(d.id)+'" class="jira-icon-button" title="'+soy.$$escapeHtml("\u0412\u044b\u0431\u0440\u0430\u0442\u044c \u044d\u0442\u043e\u0442 \u0430\u0432\u0430\u0442\u0430\u0440")+'"><img id="avatar-'+soy.$$escapeHtml(d.id)+'" src="'+soy.$$escapeHtml(d.src)+'" width="'+soy.$$escapeHtml(d.width)+'" height="'+soy.$$escapeHtml(d.height)+'" alt="'+soy.$$escapeHtml("\u0412\u044b\u0431\u0440\u0430\u0442\u044c \u044d\u0442\u043e\u0442 \u0430\u0432\u0430\u0442\u0430\u0440")+'" /></span><button class="jira-delete-avatar jira-icon-button" data-id="'+soy.$$escapeHtml(d.id)+'" title="'+soy.$$escapeHtml("\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0410\u0432\u0430\u0442\u0430\u0440")+'">'+soy.$$escapeHtml("\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0410\u0432\u0430\u0442\u0430\u0440")+"</button></li>"}return e+="</ul></div>"},JIRA.Templates.AvatarPicker.imageEditor=function(a,t){return'<form id="avataror" class="jira-avatar-cropper-form aui" action="/jira/secure/project/AvatarPicker.jspa"><input type="hidden" name="cropperOffsetX" id="avatar-offsetX" value="'+soy.$$escapeHtml(a.cropperOffsetX)+'"><input type="hidden" name="cropperOffsetY" id="avatar-offsetY" value="'+soy.$$escapeHtml(a.cropperOffsetY)+'"><input type="hidden" name="cropperWidth" id="avatar-width"  value="'+soy.$$escapeHtml(a.cropperWidth)+'"><div class="jira-avatar-cropper-header"><p>'+soy.$$escapeHtml("\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u0432\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0442\u0443 \u0447\u0430\u0441\u0442\u044c \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043d\u043d\u043e\u0433\u043e \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u044f, \u043a\u043e\u0442\u043e\u0440\u0443\u044e \u0432\u044b \u0445\u043e\u0442\u0438\u0442\u0435 \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u044c \u043a\u0430\u043a \u0430\u0432\u0430\u0442\u0430\u0440.")+'</p></div><div class="form-body"><div class="avataror"><img src="'+soy.$$escapeHtml(a.url)+'" height="300" /></div></div><div class="form-footer buttons-container"><div class="buttons"><span class="icon spinner"></span><input type="submit" class="aui-button aui-button-primary" value="'+soy.$$escapeHtml("\u041f\u043e\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044c")+'"><a class="aui-button aui-button-link cancel" href="#">'+soy.$$escapeHtml("\u041e\u0442\u043c\u0435\u043d\u0430")+"</a></div></div></form>"};;
;
/* module-key = 'jira.webresources:avatar-picker-trigger', location = '/includes/jira/admin/initAvatarPickerTrigger.js' */
define("jira/admin/init/avatar-picker-trigger",["jira/ajs/layer/layer-constants","jira/util/events","jira/util/events/types","jira/util/events/reasons","jira/ajs/layer/inline-layer","jira/ajs/contentretriever/content-retriever","jira/ajs/avatarpicker/avatar","jira/ajs/avatarpicker/avatar-picker-factory","jira/ajs/avatarpicker/avatar-picker","jira/ajs/avatarpicker/avatar-picker/image-editor","jquery"],function(t,a,e,r,i,n,c,s,v,o,d){"use strict";function f(t){var a=d(".jira-avatar-picker-trigger"),e=d(".jira-avatar-picker-trigger img, img.jira-avatar-picker-trigger",t),r=d(t).find("#avatar-picker-avatar-id"),i=d(t).find("#avatar-picker-iconurl"),n=d(t).find("#avatar-type");""!==n.text()&&s.createUniversalAvatarPickerDialog({trigger:a,title:d(t).find("#avatar-dialog-title").text(),projectId:d(t).find("#avatar-owner-id").text(),projectKey:d(t).find("#avatar-owner-key").text(),defaultAvatarId:d(t).find("#default-avatar-id").text(),initialSelection:r.val(),avatarSize:c.getSizeObjectFromName(d(t).find("#avatar-size").text()),avatarType:n.text(),select:function(t,a){e.attr("src",a),i.val(a),r.val(t.getId())}})}function l(a){var e=d(".jira-inline-avatar-picker-trigger",a);e.length&&new j({offsetTarget:e,projectId:d(a).find("#avatar-owner-id").text(),projectKey:d(a).find("#avatar-owner-key").text(),defaultAvatarId:d(a).find("#default-avatar-id").text(),alignment:t.LEFT,width:420,allowDownsize:!0})}var g=n.extend({init:function(t){this.avatarPicker=t},content:function(t){this.avatarPicker.render(function(a){t(d("<div />").html(a))})},cache:function(){return!1},isLocked:function(){},startingRequest:function(){},finishedRequest:function(){}}),j=i.extend({init:function(t){var a=this;this.avatarPicker=v.createProjectAvatarPicker({projectId:t.projectId,projectKey:t.projectKey,defaultAvatarId:t.defaultAvatarId,select:function(e,r,i){t.select&&t.select.apply(this,arguments),i||a.hide(),a.offsetTarget().attr("src",r),a.offsetTarget().trigger("AvatarSelected")}}),t.contentRetriever=new g(this.avatarPicker),d(this.avatarPicker.imageEditor).bind(o.LOADED,function(){a.setWidth(a.layer().attr("scrollWidth"))}),this._super(t);var e=this.offsetTarget(),r=d("<span class='jira-avatar-picker-trigger'></span>");r.insertBefore(e).append(e),this._assignEvents("offsetTarget",r)},_events:{offsetTarget:{click:function(t){this.show()}}}});a.bind(e.NEW_CONTENT_ADDED,function(t,a,e){e!==r.panelRefreshed&&(f(a),l(a))})});;
;
/* module-key = 'jira.webresources:avatar-picker-trigger', location = '/includes/jira/admin/init/init-avatar-picker.js' */
require("jira/admin/init/avatar-picker-trigger");;
;
/* module-key = 'jira.webresources:croneditor', location = '/includes/js/cron/croneditor.js' */
define("jira/util/cron",["exports"],function(n){n.hideCronEdit=function(n){document.getElementById(n).style.display="none"},n.showCronEdit=function(n){document.getElementById(n).style.display=""},n.toggleFrequencyControl=function(n,i){var e=document.getElementById(n+"interval");0==e.value?switchToOnce(n,i):switchToMany(n,i)},n.switchToOnce=function(n,i){hideCronEdit(n+"runMany"),showCronEdit(n+"runOnce"),i&&(timesOnce[n]=!0)},n.switchToMany=function(n,i){hideCronEdit(n+"runOnce"),showCronEdit(n+"runMany"),i&&(timesOnce[n]=!1)},n.switchToDaysOfMonth=function(n){hideCronEdit(n+"daysOfWeek"),showCronEdit(n+"daysOfMonth"),showCronEdit(n+"freqDiv"),hideCronEdit(n+"innerFreqDiv"),hideCronEdit(n+"advanced"),switchToOnce(n,!1)},n.switchToDaysOfWeek=function(n){showCronEdit(n+"daysOfWeek"),hideCronEdit(n+"daysOfMonth"),showCronEdit(n+"freqDiv"),showCronEdit(n+"innerFreqDiv"),hideCronEdit(n+"advanced"),switchToOriginal(n)},n.switchToDaily=function(n){hideCronEdit(n+"daysOfWeek"),hideCronEdit(n+"daysOfMonth"),showCronEdit(n+"freqDiv"),showCronEdit(n+"innerFreqDiv"),hideCronEdit(n+"advanced"),switchToOriginal(n)},n.switchToAdvanced=function(n){hideCronEdit(n+"daysOfWeek"),hideCronEdit(n+"daysOfMonth"),hideCronEdit(n+"runOnce"),hideCronEdit(n+"runMany"),hideCronEdit(n+"freqDiv"),showCronEdit(n+"advanced")},n.switchToOriginal=function(n){timesOnce[n]?switchToOnce(n,!1):switchToMany(n,!1)}}),AJS.namespace("hideCronEdit",null,require("jira/util/cron").hideCronEdit),AJS.namespace("showCronEdit",null,require("jira/util/cron").showCronEdit),AJS.namespace("toggleFrequencyControl",null,require("jira/util/cron").toggleFrequencyControl),AJS.namespace("switchToOnce",null,require("jira/util/cron").switchToOnce),AJS.namespace("switchToMany",null,require("jira/util/cron").switchToMany),AJS.namespace("switchToDaysOfMonth",null,require("jira/util/cron").switchToDaysOfMonth),AJS.namespace("switchToDaysOfWeek",null,require("jira/util/cron").switchToDaysOfWeek),AJS.namespace("switchToDaily",null,require("jira/util/cron").switchToDaily),AJS.namespace("switchToAdvanced",null,require("jira/util/cron").switchToAdvanced),AJS.namespace("switchToOriginal",null,require("jira/util/cron").switchToOriginal);;
;
/* module-key = 'com.atlassian.jira.jira-quick-edit-plugin:loading-indicator', location = 'js/util/loading-indicator.js' */
define("quick-edit/util/loading-indicator",["jira/loading/loading","jira/flag"],function(i,n){var o=AJS.dim,a=AJS.undim;return{showLoadingIndicator:function(){o(),i.showLoadingIndicator()},hideLoadingIndicator:function(o){a(),i.hideLoadingIndicator(),o&&n.showErrorMsg(null,"The Jira server could not be contacted. This may be a temporary glitch or the server may be down.")}}});;
;
/* module-key = 'com.atlassian.jira.jira-quick-edit-plugin:quick-create-issue-bootstrap', location = 'js/init/create-dialogs.js' */
define("quick-edit/init/create-dialogs",["wrm/require","quick-edit/util/loading-indicator","jira/ajs/keyboardshortcut/keyboard-shortcut-toggle"],function(i,e,a){var t=function(){a.disable(),e.showLoadingIndicator()},n=function(){e.hideLoadingIndicator(!0),a.enable()},r=!1,u=function(e){if(!r){r=!0,t();var u="wr!com.atlassian.jira.jira-quick-edit-plugin:quick-create-issue",o=i([u]);o.then(function(){var i=require("quick-edit/init/create");i.initIssueDialog(e),a.enable(),r=!1},function(){n(),r=!1})}},o=!1,c=function(e){if(!o){o=!0,t();var r="wr!com.atlassian.jira.jira-quick-edit-plugin:quick-create-issue",u=i([r]);u.then(function(){var i=require("quick-edit/init/create");i.initSubtaskDialog(e),a.enable(),o=!1},function(){n(),o=!1})}};return{showCreateDialog:u,showCreateSubtaskDialog:c}});;
;
/* module-key = 'com.atlassian.jira.jira-quick-edit-plugin:quick-create-issue-bootstrap', location = 'js/init/create-bootstrap-wrm.js' */
require(["jquery","quick-edit/init/create-dialogs","jira/featureflags/simplified-ux-feature-manager"],function(e,t,i){i.isGlobalSidebarEnabled()&&JIRA.API.getSidebar().then(function(e){e.on(e.events.JIRA_SUMMON_CREATE_ISSUE_DIALOG,function(e){t.showCreateDialog(e)})}),e(function(){var e=document.getElementById("stqc_show");e&&(e.onclick=null)}),e(document).on("simpleClick",".create-issue, .create-issue-type",function(e){e.preventDefault(),t.showCreateDialog(e)}),e(document).on("simpleClick",".issueaction-create-subtask",function(e){e.preventDefault(),t.showCreateSubtaskDialog(e)})});;
;
/* module-key = 'com.atlassian.jira.jira-npmbridge-plugin:atlassiansox-origin-tracing', location = 'node_modules/@atlassiansox/origin-tracing/dist/origin-tracing.js' */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("OriginTracing",[],t):"object"==typeof exports?exports.OriginTracing=t():e.OriginTracing=t()}(window,function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},r.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=7)}([function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.base64ToBase64Url=function(e){if(null==e)return"";return String(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,"")},t.base64UrlToBase64=function(e){if(null==e)return"";var t=String(e).replace(/-/g,"+").replace(/_/g,"/"),r=(4-e.length%4)%4,n="===".slice(0,r);return t+n}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.encode=function(e){var t=JSON.stringify(i(e)),r=btoa(t);return(0,n.base64ToBase64Url)(r)},t.decode=function(e){var t=(0,n.base64UrlToBase64)(e),r=atob(t);return u(JSON.parse(r))},t.toJSONObject=i,t.fromJSONObject=u;var n=r(0),o={confluence:"c",jira:"j",stride:"s",bitbucket:"b",trello:"t"};function i(e){var t=e.id,r=e.product;return{i:t,p:r in o?o[r]:r}}function u(e){var t={};return e.i&&(t.id=e.i),e.p&&(t.product=function(e){for(var t=Object.keys(o),r=0;r<t.length;r++){var n=t[r],i=o[n];if(e===i)return n}return e}(e.p)),t}},function(e,t,r){"use strict";var n=Object.prototype.hasOwnProperty;function o(e){return decodeURIComponent(e.replace(/\+/g," "))}t.stringify=function(e,t){t=t||"";var r=[];for(var o in"string"!=typeof t&&(t="?"),e)n.call(e,o)&&r.push(encodeURIComponent(o)+"="+encodeURIComponent(e[o]));return r.length?t+r.join("&"):""},t.parse=function(e){for(var t,r=/([^=?&]+)=?([^&]*)/g,n={};t=r.exec(e);n[o(t[1])]=o(t[2]));return n}},function(e,t){for(var r=[],n=0;n<256;++n)r[n]=(n+256).toString(16).substr(1);e.exports=function(e,t){var n=t||0,o=r;return o[e[n++]]+o[e[n++]]+o[e[n++]]+o[e[n++]]+"-"+o[e[n++]]+o[e[n++]]+"-"+o[e[n++]]+o[e[n++]]+"-"+o[e[n++]]+o[e[n++]]+"-"+o[e[n++]]+o[e[n++]]+o[e[n++]]+o[e[n++]]+o[e[n++]]+o[e[n++]]}},function(e,t){var r="undefined"!=typeof crypto&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&msCrypto.getRandomValues.bind(msCrypto);if(r){var n=new Uint8Array(16);e.exports=function(){return r(n),n}}else{var o=new Array(16);e.exports=function(){for(var e,t=0;t<16;t++)0==(3&t)&&(e=4294967296*Math.random()),o[t]=e>>>((3&t)<<3)&255;return o}}},function(e,t,r){var n=r(4),o=r(3);e.exports=function(e,t,r){var i=t&&r||0;"string"==typeof e&&(t="binary"===e?new Array(16):null,e=null);var u=(e=e||{}).random||(e.rng||n)();if(u[6]=15&u[6]|64,u[8]=63&u[8]|128,t)for(var a=0;a<16;++a)t[i+a]=u[a];return t||o(u)}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,o=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),i=r(5),u=(n=i)&&n.__esModule?n:{default:n},a=f(r(2)),c=f(r(1));function f(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function d(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function s(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function p(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var y=function(){function e(t){var r=t.id,n=void 0===r?e.generateId():r,o=t.product,i=t.dangerouslySkipValidation,u=void 0!==i&&i;p(this,e),this.id=n,this.product=o,u||this.validate()}return o(e,[{key:"encode",value:function(){return c.encode({id:this.id,product:this.product})}},{key:"addToUrl",value:function(e){var t=this;return b(e,function(e){var r=a.parse(e);return r.atlOrigin=t.encode(),a.stringify(r)})}},{key:"isEmpty",value:function(){return!1}},{key:"isMalformed",value:function(){return!this.isEmpty()&&!this.isValid()}},{key:"isValid",value:function(){return!0}},{key:"toAnalyticsAttributes",value:function(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=t.transformValue,n=void 0===r?function(e){return e}:r,o=t.hasGeneratedId;return s(e={},void 0!==o&&o?"originIdGenerated":"originId",n(this.id)),s(e,"originProduct",n(this.product)),e}},{key:"validate",value:function(){if(!e.isValidId(this.id))throw new TypeError("Invalid Origin id");if(!e.isValidProduct(this.product))throw new TypeError("Missing/invalid Origin product")}}],[{key:"isValidId",value:function(e){return"string"==typeof e&&/^[-a-zA-Z0-9]{1,36}$/.test(e)}},{key:"isValidProduct",value:function(e){return"string"==typeof e&&/^[-a-zA-Z0-9]{1,20}$/.test(e)}},{key:"generateId",value:function(){return(0,u.default)().replace(/-/g,"")}},{key:"createEmpty",value:function(){return new v}},{key:"createMalformed",value:function(){return new g}},{key:"fromUrl",value:function(t){var r={};return b(t,function(e){r=a.parse(e)}),e.fromEncoded(r.atlOrigin)}},{key:"fromEncoded",value:function(t){if(!t)return e.createEmpty();try{return e.decode(t)}catch(t){return e.createMalformed()}}},{key:"removeFromUrl",value:function(e){return b(e,function(e){var t=a.parse(e);return delete t.atlOrigin,a.stringify(t)})}},{key:"decode",value:function(t){return new e(c.decode(t))}}]),e}();t.default=y;var v=function(e){function t(){return p(this,t),l(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,{id:null,product:null,dangerouslySkipValidation:!0}))}return d(t,y),o(t,[{key:"isValid",value:function(){return!1}},{key:"isEmpty",value:function(){return!0}},{key:"toAnalyticsAttributes",value:function(){return{}}}]),t}(),g=function(e){function t(){return p(this,t),l(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,{id:null,product:null,dangerouslySkipValidation:!0}))}return d(t,y),o(t,[{key:"isValid",value:function(){return!1}},{key:"isEmpty",value:function(){return!1}},{key:"toAnalyticsAttributes",value:function(){return{originMalformed:!0}}}]),t}();function b(e,t){return String(e).replace(/(^[^?]*)(?:\?)?([^#]*?)(#.*|$)$/,function(e,r,n,o){var i=t(n);return i&&(i="?"+i),""+r+i+o})}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(6);Object.defineProperty(t,"default",{enumerable:!0,get:function(){return(e=n,e&&e.__esModule?e:{default:e}).default;var e}})}])});;
;
/* module-key = 'com.atlassian.jira.jira-npmbridge-plugin:atlassiansox-origin-tracing-amd', location = 'origin-tracing/origin-tracing-amd.js' */
!function(n){define("OriginTracing",function(){return n.default})}(window.OriginTracing);;
;
/* module-key = 'jira.webresources:origin-tracing', location = '/js/handle-origin-tracing.js' */
define("jira/handle-origin-tracing",["OriginTracing","jira/featureflags/feature-manager","jira/analytics"],function(i,r,a){var e="jira.origin-tracing.share-issue.urls",t=r.isFeatureEnabled(e);if(t){var n=window.location.href,o=i.fromUrl(n);if(!o.isEmpty()){var s=i.removeFromUrl(n);window.history.replaceState({},document.title,s),a.send({name:"jira.page.with-atl-origin.viewed",properties:o.toAnalyticsAttributes()})}}});;
;
/* module-key = 'jira.webresources:origin-tracing-init', location = '/js/handle-origin-tracing-init.js' */
require("jira/handle-origin-tracing");;
;
/* module-key = 'com.atlassian.labs.hipchat.hipchat-for-jira-plugin:update-plugin-banner-resources', location = 'js/banner/update-hipchat-link-banner.js' */
(function(a){AJS.toInit(function(){var e="HIPCHAT_ADMIN_BANNER_DISMISS_2";var c;if(!d()&&AJS.Meta.get("is-admin")&&!g()){a.ajax({url:AJS.contextPath()+"/rest/hipchat/integrations/1.0/configuration/status",dataType:"json",cache:false}).done(function(i){if(i.installationCheckResult.required||i.v1){c=b(i)}})}function b(k){var j=JIRA.Templates.HipChat.Banner.updateHipChatLink({removeV1link:!k.v2&&k.v1,reinstallationDiscoveryTitle:k.installationCheckResult.discoveryTitle,reinstallationDiscoveryText:k.installationCheckResult.discoveryText,reinstallationDiscoveryButton:k.installationCheckResult.discoveryButton});var i=JIRA.Messages.showWarningMsg(j);a(document).on("click","#remove-hipchat-v1-link",h);a(document).on("aui-flag-close",".aui-flag",f);return i}function d(){return window.location.toString().indexOf("/plugins/servlet/hipchat/configure")>0}function f(i){if(a(i.target).find(".hipchat-update-banner").length>0){AJS.Cookie.save(e,true)}}function g(){return AJS.Cookie.read(e)=="true"}function h(i){i.preventDefault();a.ajax({url:AJS.contextPath()+"/rest/hipchat/integrations/1.0/configuration/v1",cache:false,type:"DELETE"}).error(function(j){if(c){c.hide()}JIRA.Messages.showErrorMsg(AJS.format("\u041c\u044b \u043d\u0435 \u0441\u043c\u043e\u0433\u043b\u0438 \u043d\u0430\u0439\u0442\u0438 \u0432\u0430\u0448\u0443 \u0438\u043d\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u044e. \u0415\u0441\u043b\u0438 \u043f\u0440\u043e\u0431\u043b\u0435\u043c\u0430 \u043d\u0435 \u0440\u0435\u0448\u0438\u0442\u0441\u044f, \u0442\u043e \u0441\u0432\u044f\u0436\u0438\u0442\u0435\u0441\u044c \u0441 \u043f\u043e\u0434\u0434\u0435\u0440\u0436\u043a\u043e\u0439 Atlassian.\u003cbr/\u003e \u0421\u0442\u0430\u0442\u0443\u0441 \u043e\u0448\u0438\u0431\u043a\u0438 [{0}]",j.status))}).done(function(j){if(c){c.hide()}JIRA.Messages.showSuccessMsg("\u0421\u0440\u0435\u0434\u0441\u0442\u0432\u043e \u0438\u043d\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u0438 \u0431\u044b\u043b\u043e \u0443\u0441\u043f\u0435\u0448\u043d\u043e \u0443\u0434\u0430\u043b\u0435\u043d\u043e")})}})})(AJS.$);;
;
/* module-key = 'com.atlassian.labs.hipchat.hipchat-for-jira-plugin:update-plugin-banner-resources', location = 'soy/banner/update-hipchat-link-banner.soy' */
// This file was automatically generated from update-hipchat-link-banner.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace JIRA.Templates.HipChat.Banner.
 */

if (typeof JIRA == 'undefined') { var JIRA = {}; }
if (typeof JIRA.Templates == 'undefined') { JIRA.Templates = {}; }
if (typeof JIRA.Templates.HipChat == 'undefined') { JIRA.Templates.HipChat = {}; }
if (typeof JIRA.Templates.HipChat.Banner == 'undefined') { JIRA.Templates.HipChat.Banner = {}; }


JIRA.Templates.HipChat.Banner.updateHipChatLink = function(opt_data, opt_ignored) {
  return '<div class="hipchat-update-banner"><b>' + soy.$$escapeHtml(opt_data.reinstallationDiscoveryTitle) + '</b><p>' + soy.$$escapeHtml(opt_data.reinstallationDiscoveryText) + '</p><p/><a href="' + soy.$$escapeHtml("" + '/plugins/servlet/hipchat/configure') + '">' + soy.$$escapeHtml(opt_data.reinstallationDiscoveryButton) + '</a>' + ((opt_data.removeV1link) ? '<a id="remove-hipchat-v1-link">' + soy.$$escapeHtml('\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0438\u043d\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u044e') + '</a>' : '') + '</div>';
};
if (goog.DEBUG) {
  JIRA.Templates.HipChat.Banner.updateHipChatLink.soyTemplateName = 'JIRA.Templates.HipChat.Banner.updateHipChatLink';
}
;
;
/* module-key = 'com.atlassian.feedback.jira-feedback-plugin:button-resources-loader', location = '/js/feedback-resource-loader.js' */
define("jira/feedback/loader",["wrm/require","jira/skate"],function(e,a){"use strict";a("jira-feedback-plugin",{type:a.type.CLASS,attached:function(){e(["wrc!com.atlassian.feedback.jira-feedback-plugin:button-resources"])}})});;
;
/* module-key = 'com.atlassian.feedback.jira-feedback-plugin:button-resources-init', location = '/js/feedback-init.js' */
require(["jira/feedback/loader"],function(){"use strict"});;
;
/* module-key = 'com.atlassian.feedback.jira-feedback-plugin:umux-resources', location = '/template/umux.soy' */
// This file was automatically generated from umux.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace JIRA.Feedback.Plugin.Umux.
 */

if (typeof JIRA == 'undefined') { var JIRA = {}; }
if (typeof JIRA.Feedback == 'undefined') { JIRA.Feedback = {}; }
if (typeof JIRA.Feedback.Plugin == 'undefined') { JIRA.Feedback.Plugin = {}; }
if (typeof JIRA.Feedback.Plugin.Umux == 'undefined') { JIRA.Feedback.Plugin.Umux = {}; }


JIRA.Feedback.Plugin.Umux.renderIntroducer = function(opt_data, opt_ignored) {
  return '<div id="umux-introducer-dialog-id"><div class="umux-introducer-dialog-id-imageContainer"><img class="umux-introducer-dialog-id-image" src="' + soy.$$escapeHtml("") + '/download/resources/com.atlassian.feedback.jira-feedback-plugin:umux-resources/lingbo.jpg"></div><div><p>Hi! I\'m Lingbo, a product manager at Atlassian.<br>I\'d love to hear your thoughts on Jira.</p><button class="umux-introducer-dialog-id-showMe aui-button aui-button-link">Answer 3 short questions</button></div><div class="umux-introducer-dialog-id-dismiss"><span class="aui-icon aui-icon-small aui-iconfont-close-dialog">Close survey dialog</span></div></div>';
};
if (goog.DEBUG) {
  JIRA.Feedback.Plugin.Umux.renderIntroducer.soyTemplateName = 'JIRA.Feedback.Plugin.Umux.renderIntroducer';
}


JIRA.Feedback.Plugin.Umux.renderSurvey = function(opt_data, opt_ignored) {
  return '<div id="umux-survey-dialog-id"><form class="aui">' + JIRA.Feedback.Plugin.Umux.renderQuestion({questionNo: 1, questionText: '1. The capabilities of Jira meet my requirements.', type: 'radio'}) + JIRA.Feedback.Plugin.Umux.renderQuestion({questionNo: 2, questionText: '2. Jira is easy to use.', type: 'radio'}) + JIRA.Feedback.Plugin.Umux.renderQuestion({questionNo: 3, questionText: '3. Tell us why you rate Jira this way?', type: 'text'}) + '</form></div>';
};
if (goog.DEBUG) {
  JIRA.Feedback.Plugin.Umux.renderSurvey.soyTemplateName = 'JIRA.Feedback.Plugin.Umux.renderSurvey';
}


JIRA.Feedback.Plugin.Umux.renderQuestion = function(opt_data, opt_ignored) {
  var output = '<div class="question" data-question-id="' + soy.$$escapeHtml(opt_data.questionNo) + '"><p class="question-text">' + soy.$$escapeHtml(opt_data.questionText) + '</p>';
  if (opt_data.type == 'radio') {
    output += '<div class="group q1"><div><p class="scale-text">Strongly disagree</p></div>';
    for (var score30 = 1; score30 < 8; score30++) {
      var inputId__soy31 = 'q' + opt_data.questionNo + 'rating' + score30;
      var inputName__soy32 = 'q' + opt_data.questionNo;
      output += '<div class="horizontal-radio"><input class="radio" type="radio" name="' + soy.$$escapeHtml(inputName__soy32) + '" id="' + soy.$$escapeHtml(inputId__soy31) + '" data-rating="' + soy.$$escapeHtml(score30) + '"><label for="' + soy.$$escapeHtml(inputId__soy31) + '">' + soy.$$escapeHtml(score30) + '</label></div>';
    }
    output += '<div><p class="scale-text">Strongly agree</p></div></div>';
  } else if (opt_data.type == 'text') {
    output += '<div class="group q1">';
    var textAreaName__soy47 = 'q' + opt_data.questionNo + 'text';
    output += '<textarea class="textarea long-field" name="' + soy.$$escapeHtml(textAreaName__soy47) + '" placeholder="Your comment here..."></textarea></div>';
  }
  output += '<div class="validation-message">Please select a rating.</div></div>';
  return output;
};
if (goog.DEBUG) {
  JIRA.Feedback.Plugin.Umux.renderQuestion.soyTemplateName = 'JIRA.Feedback.Plugin.Umux.renderQuestion';
}
;
;
/* module-key = 'com.atlassian.feedback.jira-feedback-plugin:umux-resources', location = '/js/umux-init.js' */
require(["jira/feedback/umux/controller","jira/feedback/umux/common","jira/featureflags/simplified-ux-feature-manager","jquery"],function(e,a,r,t){"use strict";t(document).ready(function(){var t=a.locationPathname(),u=!!AJS.Meta.get("remote-user"),n=0===t.indexOf(AJS.contextPath()+"/secure/WelcomeToJIRA.jspa"),i=r.isUmuxLiteInAdg2Enabled();i&&u&&!n&&e.run()})});;
;
/* module-key = 'com.atlassian.feedback.jira-feedback-plugin:umux-resources', location = '/js/umux-common.js' */
define("jira/feedback/umux/common",[],function(){"use strict";function n(){return null==a&&(a=""===AJS.Meta.get("adg3-start-time")),a}function t(){if("undefined"!=typeof window)return window.location}function e(){var n=t();return n?n.pathname:""}var a=null;return{hasNeverOptedInAdg3:n,locationPathname:e}});;
;
/* module-key = 'com.atlassian.feedback.jira-feedback-plugin:umux-resources', location = '/js/umux-survey.js' */
define("jira/feedback/umux/survey",["jquery","aui/dialog"],function(n,e){"use strict";function i(){return new Promise(function(n){v=n,t()})}function t(){var i=JIRA.Feedback.Plugin.Umux.renderSurvey(),t=new e(700,420);t.addHeader("").addPanel("Survey",i).addSubmit("Send",function(n){s(n)}).addCancel("Cancel",function(n){c(n)}).show(),n(t.popup.element).find("button").focus(),u()}function u(){a(1).find("input").change(function(){d(1)}),a(2).find("input").change(function(){d(2)})}function a(n){var e=r();return e.find(".question[data-question-id="+n+"]")}function r(){return l||(l=n("#umux-survey-dialog-id")),l}function d(n){var e=Boolean(o(n));return a(n).find(".validation-message").toggleClass("show",!e),e}function o(n){return a(n).find("input:checked").data("rating")}function f(n){return a(n).find("textarea").val()}function c(n){n.hide(),v()}function s(n){var e=d(1),i=d(2);if(e&&i){var t=o(1),u=o(2),a=f(3);n.hide(),v({ratingQ1:t,ratingQ2:u,textQ3:a})}}var l,v;return{start:i}});;
;
/* module-key = 'com.atlassian.feedback.jira-feedback-plugin:umux-resources', location = '/js/umux-introducer.js' */
define("jira/feedback/umux/introducer",["jira/feedback/umux/common","jquery"],function(e,t){"use strict";function a(){return new Promise(function(e){n(),r(e)})}function n(){var t=document.createElement("div");t.innerHTML=JIRA.Feedback.Plugin.Umux.renderIntroducer(),document.body.appendChild(t),AJS.trigger("analytics",{name:"grow0.umux.adg2.introducer.dialog.show",data:{where:e.locationPathname(),hasNeverOptedInAdg3:e.hasNeverOptedInAdg3()}})}function r(t){var a=document.querySelector("#"+u),n=document.querySelector("."+u+"-showMe"),r=document.querySelector("."+u+"-dismiss");n.addEventListener("click",function(){a.open=!1,t({showme:!0}),d(!1),AJS.trigger("analytics",{name:"grow0.umux.adg2.introducer.dialog.showme",data:{where:e.locationPathname(),hasNeverOptedInAdg3:e.hasNeverOptedInAdg3()}})},!1),r.addEventListener("click",function(){a.open=!1,t({showme:!1}),d(!0),AJS.trigger("analytics",{name:"grow0.umux.adg2.introducer.dialog.dismiss",data:{where:e.locationPathname(),hasNeverOptedInAdg3:e.hasNeverOptedInAdg3()}})},!1)}function d(a){localStorage.setItem(u,!0),AJS.trigger("analytics",{name:"grow0.umux.adg2.introducer.set.introduced.success",data:{where:e.locationPathname(),hasNeverOptedInAdg3:e.hasNeverOptedInAdg3()}});var n="grow0.umux.adg2.update.survey.time."+(a?"ondismiss.":"ondone.");t.ajax({context:this,type:"POST",url:AJS.contextPath()+"/rest/internal/2/umuxLite/updateSurveyTime"}).done(function(){AJS.trigger("analytics",{name:n+"success",data:{where:e.locationPathname(),hasNeverOptedInAdg3:e.hasNeverOptedInAdg3()}})}).fail(function(){AJS.trigger("analytics",{name:n+"fail",data:{where:e.locationPathname(),hasNeverOptedInAdg3:e.hasNeverOptedInAdg3()}})})}function o(){localStorage.removeItem(u),AJS.trigger("analytics",{name:"grow0.umux.adg2.introducer.reset.success",data:{where:e.locationPathname(),hasNeverOptedInAdg3:e.hasNeverOptedInAdg3()}})}function i(){t("#"+u).fadeOut(500)}var u="umux-introducer-dialog-id";return{run:a,reset:o,hideDialog:i}});;
;
/* module-key = 'com.atlassian.feedback.jira-feedback-plugin:umux-resources', location = '/js/umux-controller.js' */
define("jira/feedback/umux/controller",["jquery","jira/feedback/umux/common","jira/feedback/umux/introducer","jira/feedback/umux/survey","aui/flag","jira/moment"],function(e,t,a,r,n,o){"use strict";function u(){AJS.trigger("analytics",{name:"grow0.umux.adg2.run",data:{where:t.locationPathname(),hasNeverOptedInAdg3:t.hasNeverOptedInAdg3()}});try{window.UMUX_ADG2_RESET=function(){localStorage.removeItem(I),localStorage.removeItem(x),localStorage.removeItem(p),localStorage.removeItem(w),localStorage.removeItem(h),localStorage.removeItem(A),localStorage.removeItem(D)},window.UMUX_ADG2_DEBUG=function(e,t,a,r){localStorage.setItem(p,"true"),localStorage.setItem(w,e),localStorage.setItem(h,t),localStorage.setItem(A,a),localStorage.setItem(D,r)}}catch(e){}e.ajax({type:"GET",url:AJS.contextPath()+"/rest/internal/2/umuxLite/info"}).done(function(e){i(e)?g():v()})}function i(e){return y()||m(e.currentTime,e.npsSurveyInfo.lastSurveyDate,e.npsSurveyInfo.nextSurveyDate)&&s(e.currentTime,e.umuxLiteSurveyInfo.nextSurveyDate)&&l()&&c()}function s(e,t){if(t){var a=o(parseInt(e)),r=o(parseInt(t));return a.isSame(r,"days")||a.isAfter(r,"days")}return!0}function c(){return 0===e("body.adg3").size()}function l(){return!localStorage.getItem(I)}function m(e,t,a){var r=!0,n=!1,u=o(parseInt(e)),i=AJS.Meta.get("remote-user"),s=t||localStorage.getItem("nps-"+i+"-lastSurveyDate");if(s){var c=o(parseInt(t)),l=c.add(14,"days");r=l.isSame(u,"days")||l.isBefore(u,"days")}if(a){var m=o(parseInt(a)),g=m.subtract(14,"days");n=g.isSame(u,"days")||g.isAfter(u,"days")}return r&&n}function g(){var e=localStorage.getItem(x);if(e){var t=parseInt(e);t>=3?S():localStorage.setItem(x,t+1)}else localStorage.setItem(x,1);a.run().then(function(e){a.hideDialog(),e.showme&&d()})}function d(){r.start().then(function(a){a?(AJS.trigger("analytics",{name:"grow0.umux.adg2.survey.results",data:{ratingQ1:a.ratingQ1,ratingQ2:a.ratingQ2,textQ3:a.textQ3,where:t.locationPathname(),hasNeverOptedInAdg3:t.hasNeverOptedInAdg3()}}),e.ajax({type:"POST",url:AJS.contextPath()+"/rest/internal/2/umuxLite/saveSurvey",data:JSON.stringify({ratingQ1:a.ratingQ1,ratingQ2:a.ratingQ2,surveyText:a.textQ3}),contentType:"application/json",success:function(){AJS.trigger("analytics",{name:"grow0.umux.adg2.survey.results.success",data:{where:t.locationPathname(),hasNeverOptedInAdg3:t.hasNeverOptedInAdg3()}})}}),f()):AJS.trigger("analytics",{name:"grow0.umux.adg2.survey.cancel",data:{where:t.locationPathname(),hasNeverOptedInAdg3:t.hasNeverOptedInAdg3()}}),S()})}function S(){e.ajax({type:"POST",url:AJS.contextPath()+"/rest/internal/2/umuxLite/updateSurveyTime"})}function v(){localStorage.removeItem(I),localStorage.removeItem(x)}function f(){n({type:"success",title:"Thanks! We'll use your response to improve Jira.",close:"auto"})}function y(){try{var e="true"===localStorage.getItem(p);if(e){var t="true"===localStorage.getItem(w);if(t)return!0;var a=localStorage.getItem(h),r=localStorage.getItem(A),n=localStorage.getItem(D);return m(Date.now(),o(a,"MM-DD-YYYY").valueOf(),o(r,"MM-DD-YYYY").valueOf())&&s(Date.now(),o(n,"MM-DD-YYYY").valueOf())&&l()&&c()}}catch(e){}return!1}var I="umux-introducer-dialog-id",x="umux-introducer-times",p="umux-debug",h="umux-debug-npsLastSurveyDate",A="umux-debug-npsNextSurveyDate",D="umux-debug-umuxLiteNextSurveyDate",w="umux-always-show-introducer";return{run:u}});;
;
/* module-key = 'com.atlassian.jira.plugins.jira-admin-helper-plugin:dialog-resources', location = 'js/dialog.js' */
define("jira/admin-helper/dialog",["jquery","jira/dialog/dialog","jira/focus/set-focus"],function(e,t,i){return t.extend({_getDefaultOptions:function(){return e.extend(this._super(),{cached:!1,widthClass:"large",stacked:!0})},defineResources:function(){this._super(),this.requireResource("com.atlassian.jira.plugins.jira-admin-helper-plugin:whereismycf-resources")},decorateContent:function(){var e=this;this.get$popupContent().find(".cancel").click(function(t){e.hide(),t.preventDefault()})},_onShowContent:function(){if(this._super(),t.current===this){var e=new i.FocusConfiguration;e.context=this.get$popup()[0],e.parentElementSelectors=[".form-body"],i.pushConfiguration(e),i.triggerFocus()}},hide:function(e){return this._super(e)!==!1&&void i.popConfiguration()}})});;
;
/* module-key = 'com.atlassian.jira.plugins.jira-admin-helper-plugin:dialog-resources', location = 'js/notification-helper-init.js' */
require(["jquery","jira/admin-helper/dialog","jira/util/data/meta"],function(e,i,n){n.get("is-admin")&&e(document).delegate(".notificationhelper-trigger","click",function(e){e.preventDefault(),new i({id:"notification-helper-dialog",content:function(e){var i=this;require(["jira/admin-helper/notification-helper/content-loader"],function(n){n.loadContent(i,e)})}}).show()})});;
;
/* module-key = 'com.atlassian.jira.plugins.jira-admin-helper-plugin:dialog-resources', location = 'js/permission-helper-init.js' */
require(["jquery","jira/admin-helper/dialog","jira/util/data/meta","jira/featureflags/simplified-ux-feature-manager"],function(e,i,r,a){r.get("is-admin")&&e(document).delegate(".permissionhelper-trigger","click",function(e){e.preventDefault(),new i({id:"permission-helper-dialog",widthClass:a.isAdg3StylesEnabled()?"medium":"large",content:function(e){var i=this;require(["jira/admin-helper/permission-helper/content-loader"],function(r){r.loadContent(i,e)})}}).show()})});;
;
/* module-key = 'com.atlassian.jira.plugins.jira-admin-helper-plugin:dialog-resources', location = 'js/whereismycf-init.js' */
require(["jquery","jira/admin-helper/dialog","jira/util/data/meta","jira/dialog/dialog","jira/featureflags/simplified-ux-feature-manager"],function(e,i,n,r,a){function t(){AJS.InlineDialog.current=null}if(n.get("is-admin")){var l="\u0413\u0434\u0435 \u043c\u043e\u0435 \u043f\u043e\u043b\u0435?";e(document).delegate(".whereismycf-trigger","click",function(e){e.preventDefault(),new i({id:"whereismycf-dialog",widthClass:a.isAdg3StylesEnabled()?"small":"large",content:function(e){var i=this;require(["jira/admin-helper/whereismycf/content-loader"],function(n){n.loadContentForView(i,e)})}}).show()}),e(document).bind("showLayer",function(n,o,d){if("inlineDialog"==o&&"inline-dialog-field_picker_popup"==d.popup.attr("id")&&0==d.popup.find("#whereismycf-qfpicker-link-id").length){var c=e("<a href='#' id='whereismycf-qfpicker-link-id'>"+l+"</a>").appendTo(d.popup.find("#qf-picker-custom-link"));c.click(function(e){e.preventDefault(),d.hide(),t();var n=r.current;new i({id:"whereismycf-dialog",widthClass:a.isAdg3StylesEnabled()?"small":"large",content:function(e){var i=this;require(["jira/admin-helper/whereismycf/content-loader"],function(r){r.loadContentForEditAndCreate(i,n,e)})}}).show()})}})}});;
;
/* module-key = 'jira.webresources:field-templates', location = 'includes/jira/field/templates/singleUserPicker.soy.js' */
if("undefined"==typeof JIRA)var JIRA={};"undefined"==typeof JIRA.Templates&&(JIRA.Templates={}),"undefined"==typeof JIRA.Templates.Fields&&(JIRA.Templates.Fields={}),"undefined"==typeof JIRA.Templates.Fields.Pickers&&(JIRA.Templates.Fields.Pickers={}),"undefined"==typeof JIRA.Templates.Fields.Pickers.User&&(JIRA.Templates.Fields.Pickers.User={}),JIRA.Templates.Fields.Pickers.User.single=function(e,s){for(var t='<select id="'+soy.$$escapeHtml(e.field.id)+'" name="'+soy.$$escapeHtml(e.field.name)+'" class="single-user-picker js-'+(e.type?soy.$$escapeHtml(e.type):"default-user-picker")+'"'+(e.inputText?' data-input-text="'+soy.$$escapeHtml(e.inputText)+'"':"")+(e.editValue?' data-edit-value="'+soy.$$escapeHtml(e.editValue)+'"':"")+(e.showDropdownButton?' data-show-dropdown-button="true"':"")+(e.userType?' data-user-type="'+soy.$$escapeHtml(e.userType)+'"':"")+(e.containerClass?' data-container-class="'+soy.$$escapeHtml(e.containerClass)+'"':"")+">",a=e.options,l=a.length,o=0;o<l;o++){var i=a[o];if(i.optionGroup){t+='<optgroup id="'+soy.$$escapeHtml(e.field.id)+"-group-"+soy.$$escapeHtml(i.id)+'" label="'+soy.$$escapeHtml(i.display)+'"'+(i.footer?' data-footer-text="'+soy.$$escapeHtml(i.footer)+'"':"")+(i.weight!=-1?' data-weight="'+soy.$$escapeHtml(i.weight)+'"':"")+">";for(var p=i.groupOptions,d=p.length,r=0;r<d;r++){var n=p[r];t+=JIRA.Templates.Fields.Pickers.User.option(n)}t+="</optgroup>"}else t+=JIRA.Templates.Fields.Pickers.User.option(i)}return t+="</select>"},JIRA.Templates.Fields.Pickers.User.option=function(e,s){return"<option "+(e.loggedInUser?'class="current-user" ':"")+(e.selected?'selected="selected" ':"")+'value="'+soy.$$escapeHtml(e.optionName)+'" data-field-text="'+soy.$$escapeHtml(e.displayName)+'" data-field-label="'+soy.$$escapeHtml(e.displayName)+(e.emailAddress?" - "+soy.$$escapeHtml(e.emailAddress):"")+(e.optionName&&"-1"!=e.optionName?" ("+soy.$$escapeHtml(e.optionName)+")":"")+'" data-icon="'+soy.$$escapeHtml(e.avatarURL)+'" >'+soy.$$escapeHtml(e.displayName)+"</option>"};;
;
/* module-key = 'jira.webresources:field-templates', location = 'includes/jira/field/templates/assigneeField.soy.js' */
if("undefined"==typeof JIRA)var JIRA={};"undefined"==typeof JIRA.Templates&&(JIRA.Templates={}),"undefined"==typeof JIRA.Templates.Fields&&(JIRA.Templates.Fields={}),"undefined"==typeof JIRA.Templates.Fields.Pickers&&(JIRA.Templates.Fields.Pickers={}),"undefined"==typeof JIRA.Templates.Fields.Pickers.User&&(JIRA.Templates.Fields.Pickers.User={}),JIRA.Templates.Fields.Pickers.User.assignee=function(e,s){return""+JIRA.Templates.Fields.Pickers.User.single(soy.$$augmentMap(e,{options:e.assigneeOptions.options,showDropdownButton:!0,userType:"assignee",type:"assignee-picker",containerClass:"long-field"}))+(e.isLoggedInUserAssignable?'<a href="#'+soy.$$escapeHtml(e.field.id)+'" id="assign-to-me-trigger">'+soy.$$escapeHtml("\u041d\u0430\u0437\u043d\u0430\u0447\u0438\u0442\u044c \u043c\u043d\u0435")+"</a>":"")+'<fieldset class="hidden parameters"><input type="hidden" title="projectKeys" value="'+soy.$$escapeHtml(e.projectKeys)+'"/>'+(e.issueKey?'<input type="hidden" title="assigneeEditIssueKey" value="'+soy.$$escapeHtml(e.issueKey)+'"/>':"")+(e.actionDescriptorId?'<input type="hidden" title="actionDescriptorId" value="'+soy.$$escapeHtml(e.actionDescriptorId)+'"/>':"")+"</fieldset>"};;
;
/* module-key = 'jira.webresources:field-templates', location = '/includes/jira/field/templates/user-picker-template-wrapper.js' */
define("jira/field/user-picker/templates",[],function(){"use strict";return window.JIRA.Templates.Fields.Pickers.User});;
;
/* module-key = 'jira.webresources:user-pickers', location = '/includes/jira/field/userPickerUtil.js' */
define("jira/field/user-picker-util",["jira/ajs/list/item-descriptor","jira/ajs/list/group-descriptor","jquery"],function(e,i,r){return{formatResponse:function(t){var a=[];return r(t).each(function(t,l){var s=new i({weight:t,label:l.footer});r(l.users).each(function(){s.addItem(new e({value:this.name,label:this.displayName,html:this.html,icon:this.avatarUrl,allowDuplicate:!1,highlighted:!0}))}),a.push(s)}),a}}}),AJS.namespace("JIRA.UserPickerUtil",null,require("jira/field/user-picker-util"));;
;
/* module-key = 'jira.webresources:user-pickers', location = '/includes/jira/field/initSingleUserPickers.js' */
define("jira/field/init-single-user-pickers",["jquery","jira/ajs/select/single-select","jira/util/events/reasons","jira/util/events/types","jira/util/events","jira/field/user-picker-util","jira/util/formatter"],function(e,t,i,a,r,s,n){function u(i){var a="/rest/api/1.0/users/picker";e(".js-default-user-picker",i).each(function(){var i=e(this);if(!i.data("aui-ss")){var r={showAvatar:!0},u=i.data("inputValue");new t({element:i,submitInputVal:!0,showDropdownButton:!!i.data("show-dropdown-button"),errorMessage:n.format("\u041d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c \'\'{0}\'\'.","'{0}'"),ajaxOptions:{url:contextPath+a,query:!0,data:r,formatResponse:s.formatResponse},inputText:u})}})}r.bind(a.NEW_CONTENT_ADDED,function(e,t,a){a!==i.panelRefreshed&&u(t)})});;
;
/* module-key = 'jira.webresources:user-pickers', location = '/includes/jira/field/NoBrowseUserNamePicker.js' */
define("jira/field/no-browser-user-name-picker",["require"],function(e){var t=e("jquery"),r=e("jira/ajs/list/item-descriptor"),a=e("jira/ajs/select/multi-select"),i=e("jira/util/formatter");return a.extend({_getDefaultOptions:function(){return t.extend(!0,this._super(),{errorMessage:"\u0417\u0430\u043f\u0440\u043e\u0448\u0435\u043d\u043d\u044b\u0439 \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c \u043d\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442",showDropdownButton:!1,removeOnUnSelect:!0,itemAttrDisplayed:"label"})},_handleCharacterInput:function(){},_setSuggestions:function(){},_handleServerError:function(e){404===e.status?this.showErrorMessage():this._super()},_deactivate:function(){this.validateAndAdd()},validateAndAdd:function(){var e=this;""===t.trim(this.$field.val())?this.hideErrorMessage():t.ajax({url:contextPath+"/rest/api/2/user",data:{username:t.trim(e.getQueryVal())},success:function(t){e.hideErrorMessage(),e.$field.val(""),e.addItem(new r({label:t.displayName,value:t.name}))},error:function(){e.showErrorMessage()}})},_handleSpace:function(){this.validate()},_handleServerSuggestions:function(){this.hideErrorMessage(),this.handleFreeInput()},handleFreeInput:function(){var e=t.trim(this.$field.val());""!==e&&(this.addItem({value:e,label:e}),this.model.$element.trigger("change")),this.$field.val("")},keys:{Return:function(e){e.preventDefault(),this.validateAndAdd()},Spacebar:function(e){e.preventDefault(),this.validateAndAdd()}}})}),AJS.namespace("AJS.NoBrowseUserNamePicker",null,require("jira/field/no-browser-user-name-picker"));;
;
/* module-key = 'jira.webresources:user-pickers', location = '/includes/jira/field/initMultiUserPickers.js' */
define("jira/field/init-multi-user-pickers",["jquery","jira/ajs/select/multi-select","jira/util/events/reasons","jira/util/events/types","jira/util/events","jira/field/no-browser-user-name-picker","jira/field/user-picker-util"],function(e,t,r,i,n,s,a){function u(r){r.find(".js-default-multi-user-picker").each(function(){var r=e(this);AJS.params.currentUserCanBrowseUsers?new t({element:this,itemAttrDisplayed:"label",showDropdownButton:!1,removeOnUnSelect:!0,submitInputVal:!0,ajaxOptions:{url:contextPath+"/rest/api/1.0/users/picker",query:!0,data:function(e){return{showAvatar:!0,query:e,exclude:r.val()}},formatResponse:a.formatResponse}}):new s({element:this})})}n.bind(i.NEW_CONTENT_ADDED,function(e,t,i){i!==r.panelRefreshed&&u(t)})});;
;
/* module-key = 'jira.webresources:user-pickers', location = '/includes/jira/field/init/init-user-pickers-webresource.js' */
require("jira/field/init-multi-user-pickers"),require("jira/field/init-single-user-pickers");;
;
/* module-key = 'com.atlassian.jira.project-templates-plugin:project-templates-plugin-resources', location = '/js/lib/jquery.dotdotdot-1.5.7.js' */
!function(t){function e(t,e,n){var o=t.children(),i=!1;t.empty();for(var d=0,a=o.length;d<a;d++){var l=o.eq(d);if(t.append(l),n&&t.append(n),r(t,e)){l.remove(),i=!0;break}n&&n.remove()}return i}function n(e,i,d,a,l){var u=e.contents(),f=!1;e.empty();for(var c="table, thead, tbody, tfoot, tr, col, colgroup, object, embed, param, ol, ul, dl, select, optgroup, option, textarea, script, style",s=0,h=u.length;s<h&&!f;s++){var p=u[s],g=t(p);"undefined"!=typeof p&&(e.append(g),l&&e[e.is(c)?"after":"append"](l),3==p.nodeType?r(d,a)&&(f=o(g,i,d,a,l)):f=n(g,i,d,a,l),f||l&&l.remove())}return f}function o(t,e,n,d,u){var f=!1,c=t[0];if("undefined"==typeof c)return!1;for(var s="letter"==d.wrap?"":" ",h=l(c).split(s),p=-1,g=-1,v=0,w=h.length-1;v<=w;){var m=Math.floor((v+w)/2);if(m==g)break;g=m,a(c,h.slice(0,g+1).join(s)+d.ellipsis),r(n,d)?w=g:(p=g,v=g)}if(p==-1||1==h.length&&0==h[0].length){var y=t.parent();t.remove();var b=u?u.length:0;if(y.contents().size()>b){var x=y.contents().eq(-1-b);f=o(x,e,n,d,u)}else{var c=y.prev().contents().eq(-1)[0];if("undefined"!=typeof c){var T=i(l(c),d);a(c,T),y.remove(),f=!0}}}else{var T=i(h.slice(0,p+1).join(s),d);f=!0,a(c,T)}return f}function r(t,e){return t.innerHeight()>e.maxHeight}function i(e,n){for(;t.inArray(e.slice(-1),n.lastCharacter.remove)>-1;)e=e.slice(0,-1);return t.inArray(e.slice(-1),n.lastCharacter.noEllipsis)<0&&(e+=n.ellipsis),e}function d(t){return{width:t.innerWidth(),height:t.innerHeight()}}function a(t,e){t.innerText?t.innerText=e:t.nodeValue?t.nodeValue=e:t.textContent&&(t.textContent=e)}function l(t){return t.innerText?t.innerText:t.nodeValue?t.nodeValue:t.textContent?t.textContent:""}function u(e,n){return"undefined"!=typeof e&&(!!e&&("string"==typeof e?(e=t(e,n),!!e.length&&e):"object"==typeof e&&("undefined"!=typeof e.jquery&&e)))}function f(t){for(var e=t.innerHeight(),n=["paddingTop","paddingBottom"],o=0,r=n.length;o<r;o++){var i=parseInt(t.css(n[o]),10);isNaN(i)&&(i=0),e-=i}return e}function c(t,e){return!!t&&(e="string"==typeof e?"dotdotdot: "+e:["dotdotdot:",e],"undefined"!=typeof window.console&&"undefined"!=typeof window.console.log&&window.console.log(e),!1)}if(!t.fn.dotdotdot){t.fn.dotdotdot=function(o){if(0==this.length)return o&&o.debug===!1||c(!0,'No element found for "'+this.selector+'".'),this;if(this.length>1)return this.each(function(){t(this).dotdotdot(o)});var i=this;i.data("dotdotdot")&&i.trigger("destroy.dot"),i.bind_events=function(){return i.bind("update.dot",function(o,d){o.preventDefault(),o.stopPropagation(),l.maxHeight="number"==typeof l.height?l.height:f(i),l.maxHeight+=l.tolerance,"undefined"!=typeof d&&(("string"==typeof d||d instanceof HTMLElement)&&(d=t("<div />").append(d).contents()),d instanceof t&&(a=d)),v=i.wrapInner('<div class="dotdotdot" />').children(),v.empty().append(a.clone(!0)).css({height:"auto",width:"auto",border:"none",padding:0,margin:0});var u=!1,c=!1;return h.afterElement&&(u=h.afterElement.clone(!0),h.afterElement.remove()),r(v,l)&&(c="children"==l.wrap?e(v,l,u):n(v,i,v,l,u)),v.replaceWith(v.contents()),v=null,t.isFunction(l.callback)&&l.callback.call(i[0],c,a),h.isTruncated=c,c}).bind("isTruncated.dot",function(t,e){return t.preventDefault(),t.stopPropagation(),"function"==typeof e&&e.call(i[0],h.isTruncated),h.isTruncated}).bind("originalContent.dot",function(t,e){return t.preventDefault(),t.stopPropagation(),"function"==typeof e&&e.call(i[0],a),a}).bind("destroy.dot",function(t){t.preventDefault(),t.stopPropagation(),i.unwatch().unbind_events().empty().append(a).data("dotdotdot",!1)}),i},i.unbind_events=function(){return i.unbind(".dot"),i},i.watch=function(){if(i.unwatch(),"window"==l.watch){var e=t(window),n=e.width(),o=e.height();e.bind("resize.dot"+h.dotId,function(){n==e.width()&&o==e.height()&&l.windowResizeFix||(n=e.width(),o=e.height(),g&&clearInterval(g),g=setTimeout(function(){i.trigger("update.dot")},10))})}else p=d(i),g=setInterval(function(){var t=d(i);p.width==t.width&&p.height==t.height||(i.trigger("update.dot"),p=d(i))},100);return i},i.unwatch=function(){return t(window).unbind("resize.dot"+h.dotId),g&&clearInterval(g),i};var a=i.contents(),l=t.extend(!0,{},t.fn.dotdotdot.defaults,o),h={},p={},g=null,v=null;return h.afterElement=u(l.after,i),h.isTruncated=!1,h.dotId=s++,i.data("dotdotdot",!0).bind_events().trigger("update.dot"),l.watch&&i.watch(),i},t.fn.dotdotdot.defaults={ellipsis:"... ",wrap:"word",lastCharacter:{remove:[" ",",",";",".","!","?"],noEllipsis:[]},tolerance:0,callback:null,after:null,height:null,watch:!1,windowResizeFix:!0,debug:!1};var s=1,h=t.fn.html;t.fn.html=function(t){return"undefined"!=typeof t?this.data("dotdotdot")&&"function"!=typeof t?this.trigger("update",[t]):h.call(this,t):h.call(this)};var p=t.fn.text;t.fn.text=function(e){if("undefined"!=typeof e){if(this.data("dotdotdot")){var n=t("<div />");return n.text(e),e=n.html(),n.remove(),this.trigger("update",[e])}return p.call(this,e)}return p.call(this)}}}(require("jquery"));;
;
/* module-key = 'com.atlassian.jira.project-templates-plugin:project-templates-plugin-resources', location = '/soy/ProjectTemplatesList.soy' */
// This file was automatically generated from ProjectTemplatesList.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace JIRA.Templates.ProjectTemplates.
 */

if (typeof JIRA == 'undefined') { var JIRA = {}; }
if (typeof JIRA.Templates == 'undefined') { JIRA.Templates = {}; }
if (typeof JIRA.Templates.ProjectTemplates == 'undefined') { JIRA.Templates.ProjectTemplates = {}; }


JIRA.Templates.ProjectTemplates.renderProjectTemplates = function(opt_data, opt_ignored) {
  return '' + ((soy.$$getMapKeys(opt_data.projectTemplates).length == 0) ? JIRA.Templates.errorMsg({closeable: false, msg: 'No project templates could be found.'}) : JIRA.Templates.ProjectTemplates.renderTemplates(opt_data));
};
if (goog.DEBUG) {
  JIRA.Templates.ProjectTemplates.renderProjectTemplates.soyTemplateName = 'JIRA.Templates.ProjectTemplates.renderProjectTemplates';
}


JIRA.Templates.ProjectTemplates.renderProjectTemplatesGroupedByType = function(opt_data, opt_ignored) {
  var output = '';
  if (opt_data.projectTemplatesByType.length == 0) {
    output += JIRA.Templates.errorMsg({closeable: false, msg: 'No project templates could be found.'});
  } else {
    var projectTypeTemplatesGroupList18 = opt_data.projectTemplatesByType;
    var projectTypeTemplatesGroupListLen18 = projectTypeTemplatesGroupList18.length;
    for (var projectTypeTemplatesGroupIndex18 = 0; projectTypeTemplatesGroupIndex18 < projectTypeTemplatesGroupListLen18; projectTypeTemplatesGroupIndex18++) {
      var projectTypeTemplatesGroupData18 = projectTypeTemplatesGroupList18[projectTypeTemplatesGroupIndex18];
      output += '<div class="template-group" id="project-template-group-' + soy.$$escapeHtml(projectTypeTemplatesGroupData18.projectTypeBean.projectTypeKey) + '"><div class="template-group-header"><h6><img class="project-type-icon" src="data:image/svg+xml;base64, ' + soy.$$escapeHtml(projectTypeTemplatesGroupData18.projectTypeBean.icon) + ' "/><span>' + soy.$$escapeHtml(projectTypeTemplatesGroupData18.projectTypeBean.projectTypeDisplayKey) + '</span></h6></div>' + JIRA.Templates.ProjectTemplates.renderTemplates({projectTemplates: projectTypeTemplatesGroupData18.projectTemplates, projectTypeKey: projectTypeTemplatesGroupData18.projectTypeBean.projectTypeKey}) + '</div>';
    }
  }
  return output;
};
if (goog.DEBUG) {
  JIRA.Templates.ProjectTemplates.renderProjectTemplatesGroupedByType.soyTemplateName = 'JIRA.Templates.ProjectTemplates.renderProjectTemplatesGroupedByType';
}


JIRA.Templates.ProjectTemplates.renderTemplates = function(opt_data, opt_ignored) {
  return '<div class="pt-templates-list">' + JIRA.Templates.ProjectTemplates.renderItems(opt_data) + '</div>';
};
if (goog.DEBUG) {
  JIRA.Templates.ProjectTemplates.renderTemplates.soyTemplateName = 'JIRA.Templates.ProjectTemplates.renderTemplates';
}


JIRA.Templates.ProjectTemplates.renderItems = function(opt_data, opt_ignored) {
  var output = '<ol class="templates" tabindex="100">';
  var maxItemsWithoutViewMoreLink__soy39 = 4;
  if (opt_data.projectTemplates.length > maxItemsWithoutViewMoreLink__soy39 && opt_data.projectTypeKey == 'business') {
    output += JIRA.Templates.ProjectTemplates.renderBusinessTemplatesWithViewMoreTemplate({templates: opt_data.projectTemplates, maxItemsWithoutViewMoreLink: maxItemsWithoutViewMoreLink__soy39});
  } else {
    var templateList46 = opt_data.projectTemplates;
    var templateListLen46 = templateList46.length;
    for (var templateIndex46 = 0; templateIndex46 < templateListLen46; templateIndex46++) {
      var templateData46 = templateList46[templateIndex46];
      output += JIRA.Templates.ProjectTemplates.renderItem({templateItem: templateData46});
    }
  }
  output += '</ol>';
  return output;
};
if (goog.DEBUG) {
  JIRA.Templates.ProjectTemplates.renderItems.soyTemplateName = 'JIRA.Templates.ProjectTemplates.renderItems';
}


JIRA.Templates.ProjectTemplates.renderItem = function(opt_data, opt_ignored) {
  return '<li class="template ' + ((opt_data.additionalClasses) ? soy.$$escapeHtml(opt_data.additionalClasses) : '') + '"' + ((opt_data.templateItem.itemModuleCompleteKey) ? 'data-item-module-complete-key="' + soy.$$escapeHtml(opt_data.templateItem.itemModuleCompleteKey) + '"' : '') + ((opt_data.templateItem.projectTemplateModuleCompleteKey) ? 'data-project-template-module-complete-key="' + soy.$$escapeHtml(opt_data.templateItem.projectTemplateModuleCompleteKey) + '"' : '') + ((opt_data.templateItem.createProject) ? 'data-create-project="' + soy.$$escapeHtml(opt_data.templateItem.createProject) + '"' : '') + ((opt_data.templateItem.demoProject) ? 'data-demo-project="' + soy.$$escapeHtml(opt_data.templateItem.demoProject) + '"' : '') + ((opt_data.templateItem.backgroundIconUrl) ? 'data-background-icon-url="' + soy.$$escapeHtml(opt_data.templateItem.backgroundIconUrl) + '"' : '') + ((opt_data.templateItem.name) ? 'data-name="' + soy.$$escapeHtml(opt_data.templateItem.name) + '"' : '') + ((opt_data.templateItem.description) ? 'data-description="' + soy.$$escapeHtml(opt_data.templateItem.description) + '"' : '') + ((opt_data.templateItem.longDescriptionContent) ? 'data-long-description-content="' + soy.$$escapeHtml(opt_data.templateItem.longDescriptionContent) + '"' : '') + ((opt_data.templateItem.infoSoyPath) ? 'data-info-soy-path="' + soy.$$escapeHtml(opt_data.templateItem.infoSoyPath) + '"' : '') + ((opt_data.templateItem.projectTypeKey) ? 'data-project-type="' + soy.$$escapeHtml(opt_data.templateItem.projectTypeKey) + '"' : '') + '><img class="template-preview" src="' + soy.$$escapeHtml(opt_data.templateItem.iconUrl) + '" /><div class="template-meta"><div class="template-name">' + soy.$$escapeHtml(opt_data.templateItem.name) + '</div><div class="template-description">' + soy.$$escapeHtml(opt_data.templateItem.description) + '</div></div></li>';
};
if (goog.DEBUG) {
  JIRA.Templates.ProjectTemplates.renderItem.soyTemplateName = 'JIRA.Templates.ProjectTemplates.renderItem';
}


JIRA.Templates.ProjectTemplates.renderBusinessTemplatesWithViewMoreTemplate = function(opt_data, opt_ignored) {
  var output = '';
  var iLimit115 = opt_data.templates.length;
  for (var i115 = 0; i115 < iLimit115; i115++) {
    var firstIndexToHide__soy116 = opt_data.maxItemsWithoutViewMoreLink - 1;
    output += JIRA.Templates.ProjectTemplates.renderItem({templateItem: opt_data.templates[i115], additionalClasses: '' + ((i115 >= firstIndexToHide__soy116) ? 'more-business-templates' : '')});
  }
  output += JIRA.Templates.ProjectTemplates.renderViewMoreBusinessTemplatesItem(null);
  return output;
};
if (goog.DEBUG) {
  JIRA.Templates.ProjectTemplates.renderBusinessTemplatesWithViewMoreTemplate.soyTemplateName = 'JIRA.Templates.ProjectTemplates.renderBusinessTemplatesWithViewMoreTemplate';
}


JIRA.Templates.ProjectTemplates.renderViewMoreBusinessTemplatesItem = function(opt_data, opt_ignored) {
  var output = '';
  var name__soy125 = '\u0411\u043e\u043b\u044c\u0448\u0435 \u0448\u0430\u0431\u043b\u043e\u043d\u043e\u0432 \u043f\u0440\u043e\u0435\u043a\u0442\u043e\u0432';
  var description__soy126 = '\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0438\u0437 \u0434\u0440\u0443\u0433\u0438\u0445 \u0442\u0438\u043f\u043e\u0432 \u043f\u0440\u043e\u0435\u043a\u0442\u043e\u0432, \u0442\u0430\u043a\u0438\u0445 \u043a\u0430\u043a \u0443\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u0435 \u0441\u043e\u0434\u0435\u0440\u0436\u0438\u043c\u044b\u043c \u0438\u043b\u0438 \u043d\u0430\u0451\u043c.';
  output += '<li id="view-more-business-templates" class="template"><div class="template-preview" /><div class="template-meta"><div class="template-name">' + soy.$$escapeHtml(name__soy125) + '</div><div class="template-description">' + soy.$$escapeHtml(description__soy126) + '</div></div></li>';
  return output;
};
if (goog.DEBUG) {
  JIRA.Templates.ProjectTemplates.renderViewMoreBusinessTemplatesItem.soyTemplateName = 'JIRA.Templates.ProjectTemplates.renderViewMoreBusinessTemplatesItem';
}


JIRA.Templates.ProjectTemplates.loadingTemplatesList = function(opt_data, opt_ignored) {
  return '<div class="wait-container"><img class="wait-icon" src="' + soy.$$escapeHtml("") + '/images/icons/wait.gif"><span class="wait-text">' + soy.$$escapeHtml('\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430 \u0448\u0430\u0431\u043b\u043e\u043d\u043e\u0432 \u043f\u0440\u043e\u0435\u043a\u0442\u043e\u0432') + '&hellip;</span></div>';
};
if (goog.DEBUG) {
  JIRA.Templates.ProjectTemplates.loadingTemplatesList.soyTemplateName = 'JIRA.Templates.ProjectTemplates.loadingTemplatesList';
}


JIRA.Templates.ProjectTemplates.footerLinks = function(opt_data, opt_ignored) {
  return '<div class="footer-links">' + ((opt_data.projectImportAvailable) ? '<a class="import-project-trigger button-panel-link" href="' + soy.$$escapeHtml("") + '/secure/admin/views/ExternalImport1.jspa">' + soy.$$escapeHtml('\u0418\u043c\u043f\u043e\u0440\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u043f\u0440\u043e\u0435\u043a\u0442') + '</a>|' : '') + '<a class="create-with-shared-config button-panel-link" href="#"><span class="aui-icon aui-icon-create-shared">' + soy.$$escapeHtml('\u0421\u043e\u0437\u0434\u0430\u0442\u044c, \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u044f \u043e\u0431\u0449\u0443\u044e \u043a\u043e\u043d\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u044e') + '</span> ' + soy.$$escapeHtml('\u0421\u043e\u0437\u0434\u0430\u0442\u044c, \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u044f \u043e\u0431\u0449\u0443\u044e \u043a\u043e\u043d\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u044e') + '</a>' + ((opt_data.showDemoLink && opt_data.projectImportAvailable) ? '| <a class="add-demo-project-trigger button-panel-link" href="#">' + soy.$$escapeHtml('\u0421\u043e\u0437\u0434\u0430\u0442\u044c \u043f\u0440\u0438\u043c\u0435\u0440 \u0434\u0430\u043d\u043d\u044b\u0445') + '</a>' : '') + '</div>';
};
if (goog.DEBUG) {
  JIRA.Templates.ProjectTemplates.footerLinks.soyTemplateName = 'JIRA.Templates.ProjectTemplates.footerLinks';
}


JIRA.Templates.ProjectTemplates.addWorkflowsLink = function(opt_data, opt_ignored) {
  return '<a class="add-workflow-link" href="' + soy.$$escapeHtml(opt_data.baseUrl) + '/plugins/servlet/wfshare-import?src=projecttemplates" tabindex="-1">' + soy.$$escapeHtml('\u041f\u043e\u0441\u043c\u043e\u0442\u0440\u0435\u0442\u044c \u0431\u0438\u0437\u043d\u0435\u0441-\u043f\u0440\u043e\u0446\u0435\u0441\u0441\u044b \u0432 Marketplace') + '</a>';
};
if (goog.DEBUG) {
  JIRA.Templates.ProjectTemplates.addWorkflowsLink.soyTemplateName = 'JIRA.Templates.ProjectTemplates.addWorkflowsLink';
}
;
;
/* module-key = 'com.atlassian.jira.project-templates-plugin:project-templates-plugin-resources', location = '/soy/AddProject.soy' */
// This file was automatically generated from AddProject.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace JIRA.Templates.ProjectTemplates.
 */

if (typeof JIRA == 'undefined') { var JIRA = {}; }
if (typeof JIRA.Templates == 'undefined') { JIRA.Templates = {}; }
if (typeof JIRA.Templates.ProjectTemplates == 'undefined') { JIRA.Templates.ProjectTemplates = {}; }


JIRA.Templates.ProjectTemplates.addProjectForm = function(opt_data, opt_ignored) {
  var output = '' + ((opt_data.warnUserUnableToAccessApplication) ? JIRA.Templates.ProjectTemplates.warnApplicationAccess(opt_data) : '');
  if (opt_data.errors.errorMessages) {
    var errorList9 = opt_data.errors.errorMessages;
    var errorListLen9 = errorList9.length;
    for (var errorIndex9 = 0; errorIndex9 < errorListLen9; errorIndex9++) {
      var errorData9 = errorList9[errorIndex9];
      output += JIRA.Templates.errorMsg({closeable: false, msg: errorData9});
    }
  }
  output += '<div class="add-project-wrapper"><div class="add-project-form-wrapper">' + aui.form.form({content: '' + aui.form.fieldset({legendContent: '', content: '' + JIRA.Templates.ProjectTemplates.longTextField({id: 'name', name: 'name', isRequired: false, maxLength: opt_data.maxNameLength, labelContent: '\u0418\u043c\u044f', descriptionText: AJS.format('\u041c\u0430\u043a\u0441\u0438\u043c\u0443\u043c {0} \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432',opt_data.maxNameLength), value: opt_data.currentName ? opt_data.currentName : '', errorTexts: opt_data.errors.errors.projectName ? [opt_data.errors.errors.projectName] : []}) + JIRA.Templates.ProjectTemplates.textFieldWithHelpIcon({id: 'key', name: 'key', isRequired: false, maxLength: opt_data.maxKeyLength, labelContent: '\u041a\u043b\u044e\u0447', descriptionText: AJS.format('\u041c\u0430\u043a\u0441\u0438\u043c\u0443\u043c {0} \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432',opt_data.maxKeyLength), helpTitle: '\u0427\u0442\u043e \u044f\u0432\u043b\u044f\u0435\u0442\u0441\u044f \u043a\u043b\u044e\u0447\u043e\u043c \u043f\u0440\u043e\u0435\u043a\u0442\u0430?', value: opt_data.currentKey ? opt_data.currentKey : '', errorTexts: opt_data.errors.errors.projectKey ? [opt_data.errors.errors.projectKey] : []}) + ((opt_data.shouldShowLead) ? JIRA.Templates.ProjectTemplates.projectLeadField({field: opt_data.projectLeadPickerField, isRequired: false, errorTexts: opt_data.errors.errors.projectLead ? [opt_data.errors.errors.projectLead] : [], options: opt_data.leadOptions}) : '') + '<input type="hidden" name="keyEdited" id="keyEdited" value="false"><input type="hidden" name="projectTemplateWebItemKey" value="' + soy.$$escapeHtml(opt_data.projectTemplateWebItemKey) + '"><input type="hidden" name="projectTemplateModuleKey" value="' + soy.$$escapeHtml(opt_data.projectTemplateModuleKey) + '"><input type="submit" class="pt-hidden-submit offscreen-left">'}), id: 'add-project-form'}) + '</div>' + ((opt_data.projectTemplateDescriptionContent) ? '<div class="add-project-description-wrapper"><div class="project-template-title"><h3>' + soy.$$escapeHtml(opt_data.projectTemplateTitle) + '</h3></div><div class="project-template-description">' + soy.$$filterNoAutoescape(opt_data.projectTemplateDescriptionContent) + '</div></div>' : '') + '</div>';
  return output;
};
if (goog.DEBUG) {
  JIRA.Templates.ProjectTemplates.addProjectForm.soyTemplateName = 'JIRA.Templates.ProjectTemplates.addProjectForm';
}


JIRA.Templates.ProjectTemplates.keyHelp = function(opt_data, opt_ignored) {
  return '<div class="project-key-help"><h6>' + soy.$$escapeHtml('\u041a\u041b\u042e\u0427 \u041f\u0420\u041e\u0415\u041a\u0422\u0410') + '</h6><p>' + soy.$$filterNoAutoescape('\u041a\u043e\u0434 \u043f\u0440\u043e\u0435\u043a\u0442\u0430 - \u044d\u0442\u043e \u0443\u043d\u0438\u043a\u0430\u043b\u044c\u043d\u044b\u0439 \u0438\u0434\u0435\u043d\u0442\u0438\u0444\u0438\u043a\u0430\u0442\u043e\u0440, \u043a\u043e\u0442\u043e\u0440\u044b\u0439 \u043f\u043e\u043c\u043e\u0433\u0430\u0435\u0442 \u043e\u0442\u043b\u0438\u0447\u0438\u0442\u044c \u043f\u0440\u043e\u0435\u043a\u0442\u044b \u0434\u0440\u0443\u0433 \u043e\u0442 \u0434\u0440\u0443\u0433\u0430.\x3cbr/\x3e\u041e\u043d \u0442\u0430\u043a \u0436\u0435 \u044f\u0432\u043b\u044f\u0435\u0442\u0441\u044f \u043f\u0440\u0435\u0444\u0438\u043a\u0441\u043e\u043c \u0434\u043b\u044f \u0432\u0441\u0435\u0445 \u0437\u0430\u0434\u0430\u0447 \u0432 \u043f\u0440\u043e\u0435\u043a\u0442\u0435.') + '</p></div>';
};
if (goog.DEBUG) {
  JIRA.Templates.ProjectTemplates.keyHelp.soyTemplateName = 'JIRA.Templates.ProjectTemplates.keyHelp';
}


JIRA.Templates.ProjectTemplates.projectLeadField = function(opt_data, opt_ignored) {
  var param70 = '' + aui.form.label({forField: opt_data.field.name + '-field', isRequired: opt_data.isRequired, content: '\u0420\u0443\u043a\u043e\u0432\u043e\u0434\u0438\u0442\u0435\u043b\u044c \u043f\u0440\u043e\u0435\u043a\u0442\u0430'}) + JIRA.Templates.Fields.Pickers.User.single({field: opt_data.field, options: opt_data.options, editValue: opt_data.value}) + aui.form.fieldDescription({message: '\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0438\u043c\u044f \u0433\u043b\u0430\u0432\u043d\u043e\u0433\u043e \u043f\u043e \u043f\u0440\u043e\u0435\u043a\u0442\u0443.'});
  if (opt_data.errorTexts) {
    var errorList83 = opt_data.errorTexts;
    var errorListLen83 = errorList83.length;
    for (var errorIndex83 = 0; errorIndex83 < errorListLen83; errorIndex83++) {
      var errorData83 = errorList83[errorIndex83];
      param70 += aui.form.fieldError({message: errorData83});
    }
  }
  var output = '' + aui.form.fieldGroup({content: param70});
  return output;
};
if (goog.DEBUG) {
  JIRA.Templates.ProjectTemplates.projectLeadField.soyTemplateName = 'JIRA.Templates.ProjectTemplates.projectLeadField';
}


JIRA.Templates.ProjectTemplates.warnApplicationAccess = function(opt_data, opt_ignored) {
  var output = '';
  var helpLinkTag__soy89 = '' + JIRA.Templates.Links.basicHelpLink({url: '/admin/apps', desc: '\u041e\u0431\u043d\u043e\u0432\u0438\u0442\u0435 \u0434\u043e\u0441\u0442\u0443\u043f', title: '\u041e\u0431\u043d\u043e\u0432\u0438\u0442\u0435 \u0434\u043e\u0441\u0442\u0443\u043f', isLocal: false});
  var message__soy95 = '' + ((opt_data.applicationName != null && opt_data.applicationName.length > 2) ? soy.$$filterNoAutoescape(AJS.format('\u0412\u043e\u0442 \u043d\u0435\u0437\u0430\u0434\u0430\u0447\u0430. \u0412\u044b \u043c\u043e\u0436\u0435\u0442\u0435 \u0441\u043e\u0437\u0434\u0430\u0442\u044c \u044d\u0442\u043e\u0442 \u043f\u0440\u043e\u0435\u043a\u0442, \u043d\u043e \u043e\u043d \u043d\u0435 \u0431\u0443\u0434\u0435\u0442 \u043f\u043e\u043b\u043d\u043e\u0441\u0442\u044c\u044e \u0444\u0443\u043d\u043a\u0446\u0438\u043e\u043d\u0430\u043b\u0435\u043d, \u043f\u043e\u043a\u0430 \u0443 \u0432\u0430\u0441 \u043d\u0435 \u0431\u0443\u0434\u0435\u0442 \u0442\u0440\u0435\u0431\u0443\u0435\u043c\u043e\u0433\u043e \u0434\u043e\u0441\u0442\u0443\u043f\u0430 \u0434\u043b\u044f {0}. {1} \u0441\u0435\u0439\u0447\u0430\u0441 \u0438\u043b\u0438 \u0441\u0432\u044f\u0436\u0438\u0442\u0435\u0441\u044c \u0441 \u0430\u0434\u043c\u0438\u043d\u0438\u0441\u0442\u0440\u0430\u0442\u043e\u0440\u043e\u043c \u0441\u0430\u0439\u0442\u0430.',opt_data.applicationName,helpLinkTag__soy89)) : soy.$$filterNoAutoescape(AJS.format('\u0412\u043e\u0442 \u043d\u0435\u0437\u0430\u0434\u0430\u0447\u0430. \u0412\u044b \u043c\u043e\u0436\u0435\u0442\u0435 \u0441\u043e\u0437\u0434\u0430\u0442\u044c \u044d\u0442\u043e\u0442 \u043f\u0440\u043e\u0435\u043a\u0442, \u043d\u043e \u043e\u043d \u043d\u0435 \u0431\u0443\u0434\u0435\u0442 \u043f\u043e\u043b\u043d\u043e\u0441\u0442\u044c\u044e \u0444\u0443\u043d\u043a\u0446\u0438\u043e\u043d\u0430\u043b\u0435\u043d, \u043f\u043e\u043a\u0430 \u0443 \u0432\u0430\u0441 \u043d\u0435 \u0431\u0443\u0434\u0435\u0442 \u0442\u0440\u0435\u0431\u0443\u0435\u043c\u043e\u0433\u043e \u0434\u043e\u0441\u0442\u0443\u043f\u0430 \u0434\u043b\u044f \u044d\u0442\u043e\u0433\u043e \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u044f. {0} \u0441\u0435\u0439\u0447\u0430\u0441 \u0438\u043b\u0438 \u0441\u0432\u044f\u0436\u0438\u0442\u0435\u0441\u044c \u0441 \u0430\u0434\u043c\u0438\u043d\u0438\u0441\u0442\u0440\u0430\u0442\u043e\u0440\u043e\u043c \u0441\u0430\u0439\u0442\u0430.',helpLinkTag__soy89)));
  output += aui.message.hint({id: 'project-create-admin-access-error', content: '' + soy.$$filterNoAutoescape(message__soy95)});
  return output;
};
if (goog.DEBUG) {
  JIRA.Templates.ProjectTemplates.warnApplicationAccess.soyTemplateName = 'JIRA.Templates.ProjectTemplates.warnApplicationAccess';
}


JIRA.Templates.ProjectTemplates.textFieldWithHelpIcon = function(opt_data, opt_ignored) {
  var param109 = '' + aui.form.label({forField: opt_data.name, isRequired: opt_data.isRequired, content: opt_data.labelContent}) + aui.form.input({id: opt_data.id, name: opt_data.name, type: 'text', maxLength: opt_data.maxLength, value: opt_data.value}) + '<a class="help-lnk" title="' + soy.$$escapeHtml(opt_data.helpTitle) + '" id="' + soy.$$escapeHtml(opt_data.id) + '-help-icon"><span class="aui-icon aui-icon-help">' + soy.$$escapeHtml(opt_data.helpTitle) + '</span></a>' + ((opt_data.descriptionText) ? aui.form.fieldDescription({message: opt_data.descriptionText}) : '');
  if (opt_data.errorTexts) {
    var errorList133 = opt_data.errorTexts;
    var errorListLen133 = errorList133.length;
    for (var errorIndex133 = 0; errorIndex133 < errorListLen133; errorIndex133++) {
      var errorData133 = errorList133[errorIndex133];
      param109 += aui.form.fieldError({message: errorData133});
    }
  }
  var output = '' + aui.form.fieldGroup({content: param109});
  return output;
};
if (goog.DEBUG) {
  JIRA.Templates.ProjectTemplates.textFieldWithHelpIcon.soyTemplateName = 'JIRA.Templates.ProjectTemplates.textFieldWithHelpIcon';
}


JIRA.Templates.ProjectTemplates.longTextField = function(opt_data, opt_ignored) {
  var param139 = '' + aui.form.label({forField: opt_data.name, isRequired: opt_data.isRequired, content: opt_data.labelContent}) + aui.form.input({id: opt_data.id, name: opt_data.name, type: 'text', maxLength: opt_data.maxLength, value: opt_data.value, extraClasses: 'long-field'}) + ((opt_data.descriptionText) ? aui.form.fieldDescription({message: opt_data.descriptionText}) : '');
  if (opt_data.errorTexts) {
    var errorList157 = opt_data.errorTexts;
    var errorListLen157 = errorList157.length;
    for (var errorIndex157 = 0; errorIndex157 < errorListLen157; errorIndex157++) {
      var errorData157 = errorList157[errorIndex157];
      param139 += aui.form.fieldError({message: errorData157});
    }
  }
  var output = '' + aui.form.fieldGroup({content: param139});
  return output;
};
if (goog.DEBUG) {
  JIRA.Templates.ProjectTemplates.longTextField.soyTemplateName = 'JIRA.Templates.ProjectTemplates.longTextField';
}


JIRA.Templates.ProjectTemplates.spinner = function(opt_data, opt_ignored) {
  return '<span id=\'' + soy.$$escapeHtml(opt_data.id) + '\' class=\'icon throbber loading\'/>';
};
if (goog.DEBUG) {
  JIRA.Templates.ProjectTemplates.spinner.soyTemplateName = 'JIRA.Templates.ProjectTemplates.spinner';
}


JIRA.Templates.ProjectTemplates.formatAnchor = function(opt_data, opt_ignored) {
  return '<a href="' + soy.$$escapeHtml(opt_data.href) + '"' + ((opt_data.title) ? ' title="' + soy.$$escapeHtml(opt_data.title) + '"' : '') + '>' + soy.$$escapeHtml(opt_data.body) + '</a>';
};
if (goog.DEBUG) {
  JIRA.Templates.ProjectTemplates.formatAnchor.soyTemplateName = 'JIRA.Templates.ProjectTemplates.formatAnchor';
}
;
;
/* module-key = 'com.atlassian.jira.project-templates-plugin:project-templates-plugin-resources', location = '/soy/CreateSharedProject.soy' */
// This file was automatically generated from CreateSharedProject.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace JIRA.Templates.ProjectTemplates.
 */

if (typeof JIRA == 'undefined') { var JIRA = {}; }
if (typeof JIRA.Templates == 'undefined') { JIRA.Templates = {}; }
if (typeof JIRA.Templates.ProjectTemplates == 'undefined') { JIRA.Templates.ProjectTemplates = {}; }


JIRA.Templates.ProjectTemplates.createSharedProjectForm = function(opt_data, opt_ignored) {
  return '<div class="create-shared-project-wrapper"><div class="create-shared-project-form-wrapper">' + aui.form.form({content: '' + aui.form.fieldset({content: '<p>' + soy.$$escapeHtml('\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044e\u0449\u0438\u0439 \u043f\u0440\u043e\u0435\u043a\u0442 \u0441 \u043a\u043e\u0442\u043e\u0440\u044b\u043c \u0432\u044b \u0445\u043e\u0442\u0438\u0442\u0435 \u043f\u043e\u0434\u0435\u043b\u0438\u0442\u044c\u0441\u044f \u043a\u043e\u043d\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u0435\u0439.') + '<a class="help-lnk" title="' + soy.$$escapeHtml('\u041a \u0447\u0435\u043c\u0443 \u0438\u043c\u0435\u043d\u043d\u043e \u043e\u0431\u0435\u0441\u043f\u0435\u0447\u0438\u0442\u044c \u043e\u0431\u0449\u0438\u0439 \u0434\u043e\u0441\u0442\u0443\u043f?') + '" id="shared-help-icon"><span class="aui-icon aui-icon-help">' + soy.$$escapeHtml('\u041a \u0447\u0435\u043c\u0443 \u0438\u043c\u0435\u043d\u043d\u043e \u043e\u0431\u0435\u0441\u043f\u0435\u0447\u0438\u0442\u044c \u043e\u0431\u0449\u0438\u0439 \u0434\u043e\u0441\u0442\u0443\u043f?') + '</span></a></p>' + aui.form.fieldGroup({extraClasses: 'project-picker-group', content: '' + aui.form.label({forField: 'project-picker', isRequired: false, content: '\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u043f\u0440\u043e\u0435\u043a\u0442'}) + aui.form.input({id: 'project-picker', name: 'project', type: 'text'}) + '<div id="project-picker-options" data-suggestions="' + soy.$$escapeHtml(opt_data.projectSuggestions) + '"></div>'}) + '<p class="create-shared-info">' + soy.$$escapeHtml('\u0415\u0441\u043b\u0438 \u043a\u043e\u043d\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u044f \u043e\u0431\u0449\u0430\u044f \u0434\u043b\u044f \u043d\u0435\u0441\u043a\u043e\u043b\u044c\u043a\u0438\u0445 \u043f\u0440\u043e\u0435\u043a\u0442\u043e\u0432, \u0442\u043e \u0432\u0441\u0435 \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u044f \u043a\u043e\u043d\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u0438 \u0432\u043b\u0438\u044f\u044e\u0442 \u043d\u0430 \u0432\u0441\u0435 \u043f\u0440\u043e\u0435\u043a\u0442\u044b.') + '</p>'}), id: 'create-shared-project-form'}) + '</div></div>';
};
if (goog.DEBUG) {
  JIRA.Templates.ProjectTemplates.createSharedProjectForm.soyTemplateName = 'JIRA.Templates.ProjectTemplates.createSharedProjectForm';
}


JIRA.Templates.ProjectTemplates.loading = function(opt_data, opt_ignored) {
  return '<div><div class="dialog-spinner"></div></div>';
};
if (goog.DEBUG) {
  JIRA.Templates.ProjectTemplates.loading.soyTemplateName = 'JIRA.Templates.ProjectTemplates.loading';
}


JIRA.Templates.ProjectTemplates.noProjects = function(opt_data, opt_ignored) {
  return '<p>' + soy.$$escapeHtml('\u0414\u0440\u0443\u0433\u0438\u0445 \u043f\u0440\u043e\u0435\u043a\u0442\u043e\u0432 \u0435\u0449\u0435 \u043d\u0435\u0442. \u041f\u0435\u0440\u0435\u0434 \u0442\u0435\u043c, \u043a\u0430\u043a \u043f\u043e\u0434\u0435\u043b\u0438\u0442\u044c\u0441\u044f \u043a\u043e\u043d\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u0435\u0439, \u0441\u043e\u0437\u0434\u0430\u0439\u0442\u0435 \u043d\u043e\u0432\u044b\u0439 \u043f\u0440\u043e\u0435\u043a\u0442.') + '</p>';
};
if (goog.DEBUG) {
  JIRA.Templates.ProjectTemplates.noProjects.soyTemplateName = 'JIRA.Templates.ProjectTemplates.noProjects';
}


JIRA.Templates.ProjectTemplates.sharedHelp = function(opt_data, opt_ignored) {
  return '<div class="shared-help"><p><strong>' + soy.$$escapeHtml('\u041a \u0447\u0435\u043c\u0443 \u0438\u043c\u0435\u043d\u043d\u043e \u043e\u0431\u0435\u0441\u043f\u0435\u0447\u0438\u0442\u044c \u043e\u0431\u0449\u0438\u0439 \u0434\u043e\u0441\u0442\u0443\u043f?') + '</strong></p><p>' + soy.$$escapeHtml('\u041a\u043e\u043d\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u044f \u0441\u0441\u044b\u043b\u0430\u0435\u0442\u0441\u044f \u043d\u0430 \u0441\u0445\u0435\u043c\u044b \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0435\u043c\u044b\u0435 \u0432 \u043f\u0440\u043e\u0435\u043a\u0442\u0435') + '</p><ul><li>' + soy.$$escapeHtml('\u0421\u0445\u0435\u043c\u044b \u043f\u0440\u0430\u0432 \u0434\u043e\u0441\u0442\u0443\u043f\u0430') + '</li><li>' + soy.$$escapeHtml('\u0421\u0445\u0435\u043c\u0430 \u0443\u0432\u0435\u0434\u043e\u043c\u043b\u0435\u043d\u0438\u0439') + '</li><li>' + soy.$$escapeHtml('\u0421\u0445\u0435\u043c\u0430 \u0431\u0435\u0437\u043e\u043f\u0430\u0441\u043d\u043e\u0441\u0442\u0438 \u0437\u0430\u0434\u0430\u0447') + '</li><li>' + soy.$$escapeHtml('\u0421\u0445\u0435\u043c\u044b \u0431\u0438\u0437\u043d\u0435\u0441-\u043f\u0440\u043e\u0446\u0435\u0441\u0441\u0430') + '</li><li>' + soy.$$escapeHtml('\u0421\u0445\u0435\u043c\u0430 \u0442\u0438\u043f\u0430 \u0437\u0430\u0434\u0430\u0447\u0438') + '</li><li>' + soy.$$escapeHtml('\u0421\u0445\u0435\u043c\u0430 \u044d\u043a\u0440\u0430\u043d\u0430 \u0434\u043b\u044f \u0442\u0438\u043f\u043e\u0432 \u0437\u0430\u0434\u0430\u0447') + '</li><li>' + soy.$$escapeHtml('\u0421\u0445\u0435\u043c\u0430 \u043a\u043e\u043d\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u0438 \u043f\u043e\u043b\u0435\u0439') + '</li></ul></div>';
};
if (goog.DEBUG) {
  JIRA.Templates.ProjectTemplates.sharedHelp.soyTemplateName = 'JIRA.Templates.ProjectTemplates.sharedHelp';
}
;
;
/* module-key = 'com.atlassian.jira.project-templates-plugin:project-templates-plugin-resources', location = 'js/config.js' */
define("jira/project-templates/config",{model:{}});;
;
/* module-key = 'com.atlassian.jira.project-templates-plugin:project-templates-plugin-resources', location = 'js/project-key-generator.js' */
define("jira/project-templates/project-key-generator",["jquery","underscore"],function(A,e){var R={};return R.IGNORED_WORDS=["THE","A","AN","AS","AND","OF","OR"],R.CHARACTER_MAP={},R.CHARACTER_MAP[199]="C",R.CHARACTER_MAP[231]="c",R.CHARACTER_MAP[252]="u",R.CHARACTER_MAP[251]="u",R.CHARACTER_MAP[250]="u",R.CHARACTER_MAP[249]="u",R.CHARACTER_MAP[233]="e",R.CHARACTER_MAP[234]="e",R.CHARACTER_MAP[235]="e",R.CHARACTER_MAP[232]="e",R.CHARACTER_MAP[226]="a",R.CHARACTER_MAP[228]="a",R.CHARACTER_MAP[224]="a",R.CHARACTER_MAP[229]="a",R.CHARACTER_MAP[225]="a",R.CHARACTER_MAP[239]="i",R.CHARACTER_MAP[238]="i",R.CHARACTER_MAP[236]="i",R.CHARACTER_MAP[237]="i",R.CHARACTER_MAP[196]="A",R.CHARACTER_MAP[197]="A",R.CHARACTER_MAP[201]="E",R.CHARACTER_MAP[230]="ae",R.CHARACTER_MAP[198]="Ae",R.CHARACTER_MAP[244]="o",R.CHARACTER_MAP[246]="o",R.CHARACTER_MAP[242]="o",R.CHARACTER_MAP[243]="o",R.CHARACTER_MAP[220]="U",R.CHARACTER_MAP[255]="Y",R.CHARACTER_MAP[214]="O",R.CHARACTER_MAP[241]="n",R.CHARACTER_MAP[209]="N",R.desiredKeyLength=4,R.maxKeyLength=10,R.getTotalLength=function(A){return A.join("").length},R.removeIgnoredWords=function(C){return e.reject(C,function(e){return A.inArray(e,R.IGNORED_WORDS)!==-1})},R.createAcronym=function(e){var R="";return A.each(e,function(A,e){R+=e.charAt(0)}),R},R.getFirstSyllable=function(A){var e,C=!1;for(e=0;e<A.length;e++)if(R.isVowelOrY(A[e]))C=!0;else if(C)return A.substring(0,e+1);return A},R.isVowelOrY=function(A){return A&&1===A.length&&A.search("[AEIOUY]")!==-1},R.init=function(A,e){R.desiredKeyLength=A,R.maxKeyLength=e},R.generate=function(e){if(e=A.trim(e),!e)return"";for(var C=[],r=0,n=e.length;r<n;r++){var t=R.CHARACTER_MAP[e.charCodeAt(r)];C.push(t?t:e[r])}e=C.join("");var i=[];A.each(e.split(/\s+/),function(A,e){e&&(e=e.replace(/[^a-zA-Z]/g,""),e=e.toUpperCase(),e.length&&i.push(e))}),R.desiredKeyLength&&R.getTotalLength(i)>R.desiredKeyLength&&(i=R.removeIgnoredWords(i));var E;if(0==i.length)E="";else if(1==i.length){var a=i[0];E=R.desiredKeyLength&&a.length>R.desiredKeyLength?R.getFirstSyllable(a):a}else E=R.createAcronym(i);return R.maxKeyLength&&E.length>R.maxKeyLength&&(E=E.substr(0,R.maxKeyLength)),E},R});;
;
/* module-key = 'com.atlassian.jira.project-templates-plugin:project-templates-plugin-resources', location = 'js/dialog-view.js' */
define("jira/project-templates/dialog-view",["jira/project-templates/dialog-view-impl","jquery"],function(e,i){return new e({el:i(document)})});;
;
/* module-key = 'com.atlassian.jira.project-templates-plugin:project-templates-plugin-resources', location = 'js/dialog-view-impl.js' */
define("jira/project-templates/dialog-view-impl",["require","backbone","underscore","jira/featureflags/simplified-ux-feature-manager","jira/featureflags/feature-manager"],function(e,t,o,i,r){var a=AJS.Dialog,l=AJS.trigger;return t.View.extend({events:{"click   .add-project-trigger":"_onClickAddProject","click   .add-demo-project-trigger":"_onClickAddDemoProject","click   .add-workflow-link":"_onClickViewMarketplaceWorkflows","click   #add-project-dialog .add-demo-project-trigger":"_onCreateProjectAddDemoProjectClick","click   #add-project-dialog .import-project-trigger":"_onClickImportProject","click   #add-project-dialog .create-with-shared-config":"_onClickCreateShared","keydown #add-project-dialog .pt-templates-list":"_onKeydownInTemplatesList"},initialize:function(){i.isGlobalSidebarEnabled()&&JIRA.API.getSidebar().then(function(e){e.on(e.events.JIRA_SUMMON_CREATE_PROJECT_DIALOG,function(){this.getDialogController().handleProjectTemplateTriggered()}.bind(this))}.bind(this))},draw:function(){var e=new a({width:840,height:400,id:"add-project-dialog",closeOnOutsideClick:!1,keypressListener:o.bind(this._onKeyPressed,this)}),t=e.popup.element;return e.addPage("project-templates-page"),e.addHeader("\u0421\u043e\u0437\u0434\u0430\u0442\u044c \u043f\u0440\u043e\u0435\u043a\u0442","add-project-dialog-header"),e.addPanel("ProjectTemplatesListPanel",JIRA.Templates.ProjectTemplates.loadingTemplatesList(),"pt-content"),this._dialog=e,this._$dialogElement=t,e.show(),e},remove:function(){this._dialog&&this._dialog.remove()},showErrorMessage:function(e){this._dialog.getPanel(1,0).html(JIRA.Templates.errorMsg({closable:!1,msg:e}))},get$PTContent:function(){return this.getDialogController().$dialogElement.find(".pt-content")},_onKeyPressed:function(e){var t=27;return!this._dialog||e.keyCode!==t||(this.getDialogController().hideDialogFromNewUser("dismissed"),this._dialog.remove(),!1)},_onKeydownInTemplatesList:function(e){var t=13;return!this._dialog||e.keyCode!==t||(this._$dialogElement.find(".pt-submit-button:visible").click(),!1)},_onClickAddProject:function(e){e.preventDefault(),this.getDialogController().handleProjectTemplateTriggered()},_onCreateProjectAddDemoProjectClick:function(){l("analyticsEvent",{name:"jira.project.templates.dialog.create.demo.create.project.clicked"})},_onClickViewMarketplaceWorkflows:function(){l("analyticsEvent",{name:"jira.project.templates.dialog.create.viewmarketplaceworkflows.clicked"})},_onClickAddDemoProject:function(e){e.preventDefault();var t=this.getDialogController().dialog;t&&t.popup&&t.popup.element&&t.remove(),this.getDialogController().handleDemoProjectTemplateTriggered()},_onClickImportProject:function(e){this.getDialogController().hideDialogFromNewUser("importproject")},_onClickCreateShared:function(e){this.getDialogController().handleCreateShared()},getDialogController:function(){return e("jira/project-templates/dialog-controller")}})});;
;
/* module-key = 'com.atlassian.jira.project-templates-plugin:project-templates-plugin-resources', location = 'js/dialog-controller.js' */
define("jira/project-templates/dialog-controller",["jira/project-templates/dialog-view","jira/project-templates/config","jira/ajs/ajax/smart-ajax","jira/util/data/meta","jira/lib/class","jquery","underscore","wrm/data"],function(e,t,a,i,o,r,n,l){function d(e,t){AJS.trigger("analyticsEvent",{name:e,data:t})}var s,c=AJS.contextPath(),m=AJS.isDevMode,p=AJS.log,u=function(){return s||(s=l.claim("com.atlassian.jira.project-templates-plugin:project-templates-plugin-resources.ptAnalyticsData")||{}),s},h=o.extend({WELCOME_REST_URL:c+"/rest/welcome/1.0/show/welcome",onboarding:{isOptimusPrimeOnboarding:!1},initialize:function(){n.bindAll(this,"handleProjectTemplateTriggered","hideDialogFromNewUser"),i.getBoolean("show-welcome-screen")&&this.handleProjectTemplateTriggered()},handleProjectTemplateTriggered:function(e){e&&e.onboarding&&(this.onboarding=e.onboarding),this.demoProject=!1,d("jira.project.templates.dialog.create.show"),this.openWithFirstProjectTemplateOfTypePreSelected()},handleDemoProjectTemplateTriggered:function(e){e&&e.onboarding&&(this.onboarding=e.onboarding),this.demoProject=!0;var t=this.getTemplateController().loadDemoProjectTemplatesData();this.openWithFirstProjectTemplateOfTypePreSelected(null,t),this._addAnalyticsToCreateDemoShow(t)},_addAnalyticsToCreateDemoShow:function(e){e.done(function(e){var t={},a=function(e){return e.projectTemplatesGroupedByType.map(function(e){return e.projectTemplates.map(function(e){return e.itemModuleCompleteKey}).join()}).join()};t.demoSets=a(e),t.instanceCreatedDate=u().instanceCreatedDate,d("jira.project.templates.dialog.create.demo.show",t)}.bind(this))},openWithFirstProjectTemplateOfTypePreSelected:function(a,i){var o=this.onboarding;i=i||this.getTemplateController().loadProjectTemplatesData(),this.dialog=e.draw(),i.fail(n.bind(function(e){this._handleUnknownErrorOfPTRetrieval()},this)),i.done(function(e){this.$dialogElement=this.dialog.popup.element;var i;n.isUndefined(t.model.selectedTemplate)||(i=t.model.selectedTemplate),t.model=e,t.model.selectedTemplate=i,this.getTemplateController().init(e,a,o)}.bind(this))},handleCreateShared:function(){d("jira.project.templates.dialog.create.shared.clicked"),this.demoProject=!1,this.openWithCreateShared()},openWithCreateShared:function(){var e=require("jira/project-templates/create-shared-controller");e.initCreateShared()},callbackWithResize:function(e){return n.bind(n.wrap(e,function(e){e.call(this),this.dialog.updateHeight()}),this)},addPage:function(e){var t=this.dialog.addPage(e.name).page[this.dialog.curpage];this.dialog.addHeader(e.title,"add-project-dialog-header"),this.dialog.addPanel(e.panelName,"","pt-content"),e.backButton&&this._addBackButton(t,{panelName:e.panelName}),this.dialog.addButton(e.submitButtonText,this.callbackWithResize(e.submitButtonCallback),e.submitButtonClass+" pt-submit-button");var a=this.$dialogElement.find("."+e.submitButtonClass);return a.removeClass("button-panel-button").addClass("aui-button aui-button-primary"),a.focus(),this.onboarding.isOptimusPrimeOnboarding||this.dialog.addCancel("\u041e\u0442\u043c\u0435\u043d\u0430",n.bind(function(e){this.hideDialogFromNewUser("dismissed"),this.dialog.remove()},this)),t},_backButtonOnClickCallback:function(t,a){if(this.onboarding.isOptimusPrimeOnboarding&&"ProjectTemplatesListPanel"===a.panelName){var i=function(){this.dialog.remove()}.bind(this);return i}return n.bind(function(){d(this.demoProject?"jira.project.templates.dialog.demo.back":"jira.project.templates.dialog.create.back");var a=e.get$PTContent();a.css("background-image","none"),this.dialog.prevPage(),t.remove(),this.dialog.page.pop()},this)},_addBackButton:function(e,t){this.dialog.addButton("\u041d\u0430\u0437\u0430\u0434",this.callbackWithResize(this._backButtonOnClickCallback(e,t)),"add-project-back-button");var a=this.$dialogElement.find(".add-project-back-button");a.removeClass("button-panel-button").addClass("aui-button")},_handleUnknownErrorOfPTRetrieval:function(){e.showErrorMessage("\u0412\u043e\u0437\u043d\u0438\u043a\u043b\u0430 \u043e\u0448\u0438\u0431\u043a\u0430 \u043f\u0440\u0438 \u043f\u043e\u043f\u044b\u0442\u043a\u0435 \u0441\u043e\u0435\u0434\u0438\u043d\u0435\u043d\u0438\u044f \u0441 JIRA")},hideDialogFromNewUser:function(e){"dismissed"===e?d(this.demoProject?"jira.project.templates.dialog.demo.dismissed":"jira.project.templates.dialog.create.dismissed"):"importproject"===e?d("jira.project.templates.dialog.import.clicked"):"templateselected"===e&&d(this.demoProject?"jira.project.templates.dialog.demo.templateselected":"jira.project.templates.dialog.create.templateselected"),i.getBoolean("show-welcome-screen")&&r.ajax({url:this.WELCOME_REST_URL+"/"+e,type:"DELETE",success:function(){m&&m()&&p("don't show project template dialog anymore")}})},getTemplateController:function(){return require("jira/project-templates/select-project-template-controller")}});return new h});;
;
/* module-key = 'com.atlassian.jira.project-templates-plugin:project-templates-plugin-resources', location = 'js/add-project-view.js' */
define("jira/project-templates/add-project-view",["jira/project-templates/add-project-view-impl","jira/project-templates/dialog-view","jquery"],function(e,t,i){return new e({el:i(document),dialogView:t})});;
;
/* module-key = 'com.atlassian.jira.project-templates-plugin:project-templates-plugin-resources', location = 'js/add-project-view-impl.js' */
define("jira/project-templates/add-project-view-impl",["jira/project-templates/dialog-controller","jira/project-templates/config","jira/util/events","jira/util/events/types","require","backbone","jquery","underscore"],function(e,t,n,i,a,r,o,l){var d=AJS.InlineDialog;return r.View.extend({TIMEOUT_MS:100,postDrawCallbacks:[],events:{"submit #add-project-form":"onSubmitForm"},page:void 0,isSubmitting:!1,initialize:function(e){l.bindAll(this,"bindHook")},addPostDrawCallback:function(e){this.postDrawCallbacks.push(e)},prepareDialog:function(t){this.page=e.addPage({name:"add-project",title:t,panelName:"add-project",backButton:!0,submitButtonText:"\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c",submitButtonCallback:this.onSubmitForm.bind(this),submitButtonClass:"add-project-dialog-create-button"})},draw:function(r){function s(e){return e.errors||(e.errors={}),e}this.isSubmitting=!1,e.dialog.gotoPage(this.page.id);var m=r.webItemData.projectTemplateModuleCompleteKey||r.webItemData.itemModuleCompleteKey,c=l.find(t.model.projectTemplatesGroupedByType,function(e){return l.any(e.projectTemplates,function(e){return e.itemModuleCompleteKey===m})}),u=c&&c.applicationInfo||{},p={maxNameLength:t.model.maxNameLength,maxKeyLength:t.model.maxKeyLength,shouldShowLead:t.model.shouldShowProjectLead,projectTemplateWebItemKey:t.model.selectedTemplate||r.webItemData.itemModuleCompleteKey,projectTemplateModuleKey:m,projectTemplateTitle:r.webItemData.name,projectTemplateDescriptionContent:r.webItemData.longDescriptionContent,currentKey:r.currentKey||"",currentName:r.currentName||"",errors:s(r.errors),projectLeadPickerField:{id:"lead",name:"lead"},leadOptions:[{selected:!0,displayName:r.currentUserDisplayName,optionName:r.currentUserName,avatarURL:r.currentUserAvatarUrl}],applicationName:u.applicationName||"",warnUserUnableToAccessApplication:!u.canUserUseApplication},h=JIRA.Templates.ProjectTemplates.addProjectForm(p);if(e.dialog.getPanel(this.page.id,0).html(h),r.webItemData&&r.webItemData.backgroundIconUrl){var f=e.$dialogElement.find(".pt-content");f.css("background-image",'url("'+r.webItemData.backgroundIconUrl+'")')}var g=o("#add-project-form");n.trigger(i.NEW_CONTENT_ADDED,[g]),this.nameElement=e.$dialogElement.find("#name"),this.keyElement=e.$dialogElement.find("#key"),this.keyEditedElement=e.$dialogElement.find("#keyEdited"),this.leadDisplayElement=e.$dialogElement.find("#lead-field"),this.leadValueElement=e.$dialogElement.find("#lead");var b=this.keyElement.parent().find(".aui-icon-help");b.length&&new d(b,"project-key-help-popup",function(e,t,n){e.html(JIRA.Templates.ProjectTemplates.keyHelp()),n()},{width:280,gravity:"w"}),this.keyElement.attr("style","text-transform: uppercase");var E=a("jira/project-templates/add-project-controller");this.nameElement.focus(l.bind(function(e){this.bindHook(e,E.nameTimeout)},this));var y=this;this.nameElement.change(function(e){E.validateName(),y.unbindHook(e)}),this.nameElement.focus(),this.keyElement.focus(l.bind(function(e){var t=o(e.target);t.data("lastValue",t.val()),this.bindHook(e,E.keyTimeout)},this)),this.keyElement.blur(l.bind(function(e){this.unbindHook(e)},this)),this.keyElement.change(function(){E.validateKey(),E.autofillKeyIfNeeded()}),l.isEmpty(this.postDrawCallbacks)||l.each(this.postDrawCallbacks,function(e){e({projectType:r&&r.webItemData&&(r.webItemData.projectTemplateModuleCompleteKey||r.webItemData.itemModuleCompleteKey)})}),e.dialog.updateHeight()},onSubmitForm:function(e){var t=a("jira/project-templates/add-project-controller");return t.submit(),!1},get$SubmitButton:function(){return e.$dialogElement.find(".add-project-dialog-create-button")},get$BackButton:function(){return e.$dialogElement.find(".add-project-back-button")},bindHook:function(e,t){var n=o(e.target),i=l.bind(function(){this.unbindHook(e),t.apply(),n.is(":visible")&&n.data("checkHook",setTimeout(i,this.TIMEOUT_MS))},this);n.data("checkHook")||n.data("checkHook",setTimeout(i,0))},unbindHook:function(e){var t=o(e.target);clearTimeout(t.data("checkHook")),t.removeData("checkHook")},showInlineError:function(e,t){if(!this.isSubmitting){var n=e.parent().find(".error");n.length||(n=o("<div class='error'></div>"),e.parent().append(n)),n.text(t),n.show()}},showInlineErrorForName:function(e){this.showInlineError(this.nameElement,e)},showInlineErrorForKey:function(e){this.showInlineError(this.keyElement,e)},hideInlineError:function(e){e.parent().find(".error").hide()},hideInlineErrorForName:function(){this.hideInlineError(this.nameElement)},hideInlineErrorForKey:function(){this.hideInlineError(this.keyElement)},setName:function(e){this.nameElement.val(e)},getName:function(){return this.nameElement.val()},setKey:function(e){this.keyElement.val(e)},getKey:function(){return this.keyElement.val().toUpperCase()},getLeadDisplayName:function(){return this.leadDisplayElement.val()},getLeadUserName:function(){return this.leadValueElement.val()},getAvatarUrlOfSelectedLead:function(){var t=e.$dialogElement.find("#lead-single-select .aui-ss-entity-icon").css("background-image");if(l.isUndefined(t))return"";var n=t.match(/^url\((.+)\)$/);return n&&n[1]?n[1]:""},setKeyEdited:function(e){this.keyEditedElement.val(e)},getKeyEdited:function(){return this.keyEditedElement.val()},setKeyEdited:function(){var e=this.getKey();this.keyElement.data("lastValue")!==e&&this.keyEditedElement.val(e?"true":"false"),this.keyElement.data("lastValue",e)},hasNameErrors:function(){return this.nameElement.parent().find(".error").size()>0},getAddProjectForm:function(){return o("#add-project-form")},get$FormFields:function(){return e.$dialogElement.find(":input")},enterLoadingState:function(){var e=this.get$SubmitButton();if(e.attr("disabled"))return!1;var t=this.get$BackButton();return e.attr("disabled","disabled"),t.attr("disabled","disabled"),t.before(JIRA.Templates.ProjectTemplates.spinner({id:"addproject-loading"})),this.get$FormFields().attr("disabled","disabled"),this.isSubmitting=!0,!0},hideLoadingState:function(){e.$dialogElement.find("#addproject-loading").remove(),this.get$SubmitButton().removeAttr("disabled"),this.get$BackButton().removeAttr("disabled"),this.get$FormFields().removeAttr("disabled")},avoidDirtyFormWarning:function(){o.fn.removeDirtyWarning&&this.getAddProjectForm().removeDirtyWarning()},hasInlineErrors:function(){return 0!==e.$dialogElement.find(".field-group .error:visible").length}})});;
;
/* module-key = 'com.atlassian.jira.project-templates-plugin:project-templates-plugin-resources', location = 'js/add-project-controller.js' */
define("jira/project-templates/add-project-controller",["jira/project-templates/add-project-controller-impl","jquery"],function(e,r){return new e({el:r(document)})});;
;
/* module-key = 'com.atlassian.jira.project-templates-plugin:project-templates-plugin-resources', location = 'js/add-project-controller-impl.js' */
define("jira/project-templates/add-project-controller-impl",["jira/project-templates/add-project-view","jira/project-templates/project-key-generator","jira/project-templates/dialog-controller","jira/project-templates/config","jira/lib/class","jira/analytics/web-client","jira/featureflags/feature-manager","jquery","underscore"],function(e,t,r,a,i,o,s,n,c){var d=AJS.contextPath(),l=AJS.trigger;return i.extend({postProjectCreationCallbacks:[],projectKeyValidationCallbacks:[],projectNamesUpperCased:[],init:function(e){this._window=e.window||window,c.bindAll(this,"projectCreatedHandler","projectValidationFailedHandler","nameTimeout","keyTimeout","submit")},initCreateShared:function(e){this.existingProjectData=e,this._initAddProject("\u0421\u043e\u0437\u0434\u0430\u0442\u044c, \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u044f \u043e\u0431\u0449\u0443\u044e \u043a\u043e\u043d\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u044e")},initProjectTemplate:function(e){this.existingProjectData=void 0,this.webItemData=e,this._initAddProject(e.name)},_initAddProject:function(r){this.desiredKeyLength=4,this.lastKeyValidated="",this._getExistingProjects(),t.init(this.desiredKeyLength,a.model.maxKeyLength),e.prepareDialog(r),e.draw({webItemData:this.webItemData||{},maxKeyLength:a.model.maxKeyLength,maxNameLength:a.model.maxNameLength,currentUserName:a.model.currentUserName,currentUserDisplayName:a.model.currentUserDisplayName,currentUserAvatarUrl:a.model.currentUserAvatarUrl,errors:{}})},_resetProjectLeadValues:function(){a.model.currentUserDisplayName="",a.model.currentUserName="",a.model.currentUserAvatarUrl=""},_hasFullyConfiguredProjectLead:function(){return e.getLeadDisplayName()&&""!=e.getAvatarUrlOfSelectedLead()},submit:function(t){var r;r=this.existingProjectData?{key:e.getKey(),name:e.getName(),lead:e.getLeadUserName()&&e.getLeadUserName()[0]}:jQuery.param(e.getAddProjectForm().serializeArray().map(function(e){return"key"===e.name&&(e.value=e.value.toUpperCase()),e})),e.hasInlineErrors()||e.enterLoadingState()&&(this._hasFullyConfiguredProjectLead()?(a.model.currentUserDisplayName=e.getLeadDisplayName(),a.model.currentUserName=a.model.currentUserDisplayName?e.getLeadUserName():"",a.model.currentUserAvatarUrl=e.getAvatarUrlOfSelectedLead()):this._resetProjectLeadValues(),this.existingProjectData?n.ajax({url:d+"/rest/project-templates/1.0/createshared/"+this.existingProjectData.existingProjectId,type:"POST",contentType:"application/json",data:JSON.stringify(r)}).then(this.projectCreatedHandler,this.projectValidationFailedHandler):n.ajax({url:d+(this.webItemData.demoProject?"/rest/jira-importers-plugin/1.0/demo/create":"/rest/project-templates/1.0/templates"),type:"POST",data:r,headers:{"X-Atlassian-Token":"no-check"}}).then(this.projectCreatedHandler,this.projectValidationFailedHandler))},registerPostProjectCreationCallback:function(e){this.postProjectCreationCallbacks.push(e)},registerProjectKeyValidationCallback:function(e){this.projectKeyValidationCallbacks.push(e)},localStoragePrefix:"jira.projecttemplates.",isSimplified:function(){return"com.pyxis.greenhopper.jira:simplified-project-template"===this.webItemData.projectTemplateModuleCompleteKey},projectCreatedHandler:function(t){this.existingProjectData?l("analyticsEvent",{name:"jira.project.templates.dialog.create.shared.project.create.success"}):this.webItemData.demoProject?l("analyticsEvent",{name:"jira.project.templates.dialog.create.demo.success"}):l("analyticsEvent",{name:"jira.project.templates.dialog.create.project.success"});const a={action:"created",source:"createProjectModal",actionSubject:"project",containerType:"project",containerId:String(t.projectId),attributes:{}};this.existingProjectData?(a.attributes.sharedConfigurationProjectId=this.existingProjectData.existingProjectId,a.attributes.createdUsing="sharedConfiguration"):this.webItemData.demoProject?a.attributes.createdUsing="sample":(a.attributes.projectTemplateKey=this.webItemData.projectTemplateModuleCompleteKey,a.attributes.createdUsing="template",a.attributes.projectType=this.webItemData.projectType,a.attributes.simplified=this.isSimplified(),a.attributes.projectAccessLevel=this.isSimplified()?"open":""),o.sendTrackEvent(a),e.avoidDirtyFormWarning();var i=this.localStoragePrefix,s=["confluenceProject","fisheyeProject","crucibleProject","bambooProject"];c.map(s,function(e){t.remoteProjectLinks&&t.remoteProjectLinks[e]&&localStorage.setItem(i+e,t.remoteProjectLinks[e])}),c.isEmpty(this.postProjectCreationCallbacks)?this._window.location=d+t.returnUrl:(r.dialog.addPage("post-project-created-page"),c.each(this.postProjectCreationCallbacks,function(e){e(r.dialog,t.returnUrl,t.projectId,t.projectKey,t.projectName)}))},projectValidationFailedHandler:function(t,r){this.existingProjectData?l("analyticsEvent",{name:"jira.project.templates.dialog.create.shared.project.create.failure"}):this.webItemData.demoProject?l("analyticsEvent",{name:"jira.project.templates.dialog.create.demo.failure"}):l("analyticsEvent",{name:"jira.project.templates.dialog.create.project.failure"});var i={};if(this.isBadRequest(t))i=JSON.parse(t.responseText);else if(this.isUnDefinedServerSideError(t))i={errorMessages:["\u0425\u043c\u043c... \u043d\u0435 \u0443\u0434\u0430\u0435\u0442\u0441\u044f \u0441\u043e\u0437\u0434\u0430\u0442\u044c \u043f\u0440\u043e\u0435\u043a\u0442 \u0438\u0437-\u0437\u0430 \u043d\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043d\u043e\u0439 \u043e\u0448\u0438\u0431\u043a\u0438. \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u043e\u0431\u043d\u043e\u0432\u0438\u0442\u044c \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0443 \u0438 \u043f\u043e\u043f\u0440\u043e\u0431\u043e\u0432\u0430\u0442\u044c \u0435\u0449\u0435 \u0440\u0430\u0437."]};else{if(this.isDefinedServerSideError(t)){var o=JSON.parse(t.responseText);return JIRA.Messages.showReloadErrorMsg(o.message),e.avoidDirtyFormWarning(),void(this._window.location=d+o.returnUrl)}i=this.isTimeoutError(r)?{errorMessages:["Request timeout when creating project"]}:{errorMessages:[AJS.format("\u041e\u0448\u0438\u0431\u043a\u0430 \u0441\u043e\u0437\u0434\u0430\u043d\u0438\u044f \u043f\u0440\u043e\u0435\u043a\u0442\u0430, {0}",t.responseText)]}}e.draw({webItemData:this.webItemData||{},errors:i,currentName:e.getName(),currentKey:e.getKey(),currentUserDisplayName:a.model.currentUserDisplayName,currentUserName:a.model.currentUserName,currentUserAvatarUrl:a.model.currentUserAvatarUrl}),e.hideLoadingState()},isBadRequest:function(e){return 400===e.status},isUnDefinedServerSideError:function(e){if(500===e.status)try{JSON.parse(e.responseText)}catch(e){return!0}return!1},isDefinedServerSideError:function(e){return 500===e.status&&!c.isUndefined(JSON.parse(e.responseText).message)},isTimeoutError:function(e){return"timeout"===e},_updateAndValidateKey:function(t){e.setKey(t),this.validateKey()},_shouldUpdateKey:function(){return"true"!=e.getKeyEdited()},autofillKeyIfNeeded:function(){if(this._shouldUpdateKey()){var r=t.generate(e.getName());r.length>1?this._updateAndValidateKey(r):e.setKey("")}},_doesProjectNameExists:function(e){var t;for(t in this.projectNamesUpperCased)if(e.toUpperCase()==this.projectNamesUpperCased[t])return!0;return!1},validateName:function(){var t=n.trim(e.getName());if(t)return t.length<a.model.minNameLength?void e.showInlineErrorForName(AJS.format("\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u043f\u0440\u043e\u0435\u043a\u0442\u0430 \u0434\u043e\u043b\u0436\u043d\u043e \u0431\u044b\u0442\u044c \u0434\u043b\u0438\u043d\u043e\u0439 \u043d\u0435 \u043c\u0435\u043d\u0435\u0435 {0} \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432.",a.model.minNameLength)):t.length>a.model.maxNameLength?void e.showInlineErrorForName(AJS.format("\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u043f\u0440\u043e\u0434\u0443\u043a\u0442\u0430 \u043d\u0435 \u0434\u043e\u043b\u0436\u043d\u043e \u043f\u0440\u0435\u0432\u044b\u0448\u0430\u0442\u044c {0} \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432 \u0432 \u0434\u043b\u0438\u043d\u0443.",a.model.maxNameLength)):this._doesProjectNameExists(t)?void e.showInlineErrorForName("\u041f\u0440\u043e\u0435\u043a\u0442 \u0441 \u0442\u0430\u043a\u0438\u043c \u0438\u043c\u0435\u043d\u0435\u043c \u0443\u0436\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442."):void e.hideInlineErrorForName()},_performKeyValidationChecks:function(t){var r=n.ajax({url:d+"/rest/api/latest/projectvalidate/key?key="+t.toUpperCase()});r.done(c.bind(function(r){if(r.errors&&r.errors.projectKey)e.showInlineErrorForKey(r.errors.projectKey);else{var a=!1;c.each(this.projectKeyValidationCallbacks,function(r){var i=r(t.toUpperCase());i.errors&&i.errors.projectKey&&(a=!0,e.showInlineErrorForKey(i.errors.projectKey))}),a||e.hideInlineErrorForKey()}},this))},validateKey:function(){var t=e.getKey();this.lastKeyValidated!==t&&(t?(this.lastKeyValidated=t,this._performKeyValidationChecks(t)):e.hideInlineErrorForKey())},nameTimeout:function(){this.autofillKeyIfNeeded()},keyTimeout:function(){e.setKeyEdited()},_getExistingProjects:function(){if(this.projectNamesUpperCased.length>0)return this.projectNamesUpperCased;var e=n.ajax({url:d+"/rest/api/latest/project"});e.done(c.bind(function(e){this.projectNamesUpperCased=c.map(e,function(e){return e.name.toUpperCase()})},this))}})});;
;
/* module-key = 'com.atlassian.jira.project-templates-plugin:project-templates-plugin-resources', location = 'js/template-info-view.js' */
define("jira/project-templates/template-info-view",["jira/project-templates/dialog-controller","require","backbone","jquery","underscore"],function(t,e,n,a,i){var o=AJS.trigger;return n.View.extend({initialize:function(t){i.bindAll(this,"draw","onNext")},draw:function(e,n){var a=t.addPage({name:"template-info",title:n,panelName:"template-info",backButton:!0,submitButtonText:"\u0412\u044b\u0431\u0440\u0430\u0442\u044c",submitButtonCallback:this.onNext,submitButtonClass:"template-info-dialog-create-button"}),i=this._nameToObj(e)();t.dialog.getPanel(a.id,0).html(i),t.dialog.gotoPage(a.id)},_nameToObj:function(t){return i.reduce(t.split("."),function(t,e){if(t)return t[e]},window)},onNext:function(t){o("analyticsEvent",{name:"jira.project.templates.dialog.create.templateinfo.next"});var n=e("jira/project-templates/template-info-controller");return n.next(),!1}})});;
;
/* module-key = 'com.atlassian.jira.project-templates-plugin:project-templates-plugin-resources', location = 'js/template-info-controller.js' */
define("jira/project-templates/template-info-controller",["jira/project-templates/template-info-view","jira/lib/class","require","underscore"],function(e,t,n,a){var i=t.extend({init:function(e){a.bindAll(this,"initTemplateInfo","next")},initTemplateInfo:function(t){this.projectTemplateData=t;var n=new e;n.draw(t.infoSoyPath,t.name)},next:function(){var e=n("jira/project-templates/select-project-template-controller");e.openAddProjectPage(this.projectTemplateData)}});return new i});;
;
/* module-key = 'com.atlassian.jira.project-templates-plugin:project-templates-plugin-resources', location = 'js/select-project-template-view.js' */
define("jira/project-templates/select-project-template-view",["jira/project-templates/dialog-controller","jira/project-templates/config","jira/featureflags/feature-manager","require","backbone","jquery","underscore"],function(e,t,i,a,o,r,n){var l=AJS.contextPath(),s=AJS.preventDefault,c=AJS.trigger;return{ROW_LENGTH:2,DIALOG_BODY_CLASS:"select-project-templates-page",DIALOG_WIDTH:800,draw:function(o,n,s){function p(){return m.isProjectTypesEnabled(o)?JIRA.Templates.ProjectTemplates.renderProjectTemplatesGroupedByType({projectTemplatesByType:o.projectTemplatesGroupedByType}):JIRA.Templates.ProjectTemplates.renderProjectTemplates({projectTemplates:o.projectTemplates})}function d(e){return!e.isOptimusPrimeOnboarding||e.isOptimusPrimeOnboarding&&e.hasProjectsInSystem}var m=a("jira/project-templates/select-project-template-controller");this.page=e.addPage({name:this.DIALOG_BODY_CLASS,title:o.demoProjects?"\u0421\u043e\u0437\u0434\u0430\u0442\u044c \u0434\u0435\u043c\u043e\u043d\u0441\u0442\u0440\u0430\u0446\u0438\u043e\u043d\u043d\u044b\u0439 \u043f\u0440\u043e\u0435\u043a\u0442":"\u0421\u043e\u0437\u0434\u0430\u0442\u044c \u043f\u0440\u043e\u0435\u043a\u0442",panelName:"ProjectTemplatesListPanel",backButton:s.isOptimusPrimeOnboarding,submitButtonText:"\u0414\u0430\u043b\u0435\u0435",submitButtonCallback:m.dialogSubmitted,submitButtonClass:"create-project-dialog-create-button"}),e.dialog.getPanel(this.page.id,0).html(p()),t.model.projectCount>=2&&!o.demoProjects&&r(JIRA.Templates.ProjectTemplates.addWorkflowsLink({baseUrl:l})).appendTo(e.$dialogElement.find(".dialog-title"));var u=e.$dialogElement.find(".create-project-dialog-create-button"),f=this;this.getTemplateItems().click(function(){var e=r(this);e.addClass("selected"),f.getTemplateItems().not(this).removeClass("selected")}).dblclick(function(){u.click()}).focus(function(){r(this).click()});var g=this.get$TemplatesContainer();!o.demoProjects&&d(s)&&r(JIRA.Templates.ProjectTemplates.footerLinks({showDemoLink:i.isFeatureEnabled("jira.onboarding.cyoa"),projectImportAvailable:o.projectImportAvailable})).prependTo(e.$dialogElement.find(".dialog-button-panel")),this.bindKeyboardEvents(g),m.isProjectTypesEnabled(o)?0==o.projectTemplatesGroupedByType.length&&u.attr("disabled","disabled"):0==o.projectTemplates.length&&u.attr("disabled","disabled"),this.focusOnFirstTemplate(g,n),e.dialog.updateHeight(),this.truncateTemplateDescriptions(),this.resizeTemplateWidths();var h=e.$dialogElement.find("#view-more-business-templates");h.click(function(){c("analyticsEvent",{name:"jira.project.templates.dialog.create.more-business-templates.clicked"}),e.$dialogElement.find("#project-template-group-business").addClass("view-more-business-templates-selected"),requestAnimationFrame(function(){e.dialog.updateHeight(),this.resizeTemplateWidths()}.bind(this)),this.focusOnFirstTemplate(this.get$TemplatesContainer())}.bind(this))},get$TemplatesContainer:function(){return e.$dialogElement.find(".templates")},focusOnFirstTemplate:function(e,t){t?this.getFirstTemplateItemOfProjectType(t).click():this.getFirstTemplateItem().click(),setTimeout(function(){e.focus()},0)},getSelectedTemplateData:function(){var t=e.$dialogElement.find(".template.selected");return t.data()},getMoveDeltaForKey:function(e){switch(e){case 37:return-1;case 39:return 1;case 38:return-this.ROW_LENGTH;case 40:return+this.ROW_LENGTH}return 0},bindKeyboardEvents:function(e){e.bind("keydown",n.bind(function(t){var i=this.getMoveDeltaForKey(t.which);if(i)return this.moveSelection(e,i),s(t)},this))},moveSelection:function(e,t){var i=e.find(".template"),a=i.filter(".selected"),o=i.index(a)+t;if(o<i.length&&o>=0){var r=i.eq(o);r.click().focus(),this.scrollToSelectedElement(r)}},scrollToSelectedElement:function(e){var t=r(".dialog-panel-body.pt-content"),i=t.offset().top,a=e.offset().top,o=a+e.height(),n=i+t.height();a<i?t.scrollTop(t.scrollTop()-(i-a)):o>i+t.height()&&t.scrollTop(t.scrollTop()+o-n)},get$NextButton:function(){return e.$dialogElement.find(".create-project-dialog-create-button")},disableNextButton:function(){this.get$NextButton().attr("disabled","disabled")},truncateTemplateDescriptions:function(){var t=AJS.Meta.get("user-locale"),i="word";"ja_JP"===t&&(i="letter"),e.$dialogElement.find(".template-description").each(function(){r(this).dotdotdot({wrap:i,lastCharacter:{remove:[" ",",",";",".","!","?","。"],noEllipsis:[]}})})},getTemplatesDialogContainer:function(){return e.$dialogElement.find("."+this.DIALOG_BODY_CLASS).find(".dialog-panel-body.pt-content").get(0)},getFirstTemplateItem:function(){return this.getTemplateItems().first()},getFirstTemplateItemOfProjectType:function(e){return this.getTemplateItems().filter("#project-template-group-"+e+" *").first()},getTemplateItems:function(){return e.$dialogElement.find(".template")},widthOfScrollbarForElement:function(e){var t=e.offsetWidth,i=e.clientWidth;return t-i},widthOfDialogAvailableForTemplateList:function(){var e=this.getTemplatesDialogContainer(),t=this.widthOfScrollbarForElement(e),i=r(e).width()||this.DIALOG_WIDTH;return i-t},widthOfTemplateItem:function(){var e=this.widthOfDialogAvailableForTemplateList()/this.ROW_LENGTH;return e-this.borderWidthOfTemplateItem()},borderWidthOfTemplateItem:function(){var e=this.getFirstTemplateItem().css("border-top-width");return parseInt(e,10)},resizeTemplateWidths:function(){this.getTemplateItems().each(n.bind(function(e,t){r(t).css("width",this.widthOfTemplateItem())},this))}}});;
;
/* module-key = 'com.atlassian.jira.project-templates-plugin:project-templates-plugin-resources', location = 'js/select-project-template-controller.js' */
define("jira/project-templates/select-project-template-controller",["jira/project-templates/select-project-template-view","jira/project-templates/template-info-controller","jira/project-templates/add-project-controller","jira/project-templates/dialog-controller","jira/project-templates/dialog-view","jira/project-templates/config","wrm/context-path","jquery","underscore"],function(e,t,o,r,a,l,n,i,p){var c=n(),s={init:function(t,o,r){this.onboarding=r,e.draw(t,o,r)},isProjectTypesEnabled:function(e){return null!=e.projectTemplatesGroupedByType},loadProjectTemplatesData:function(){return i.ajax({url:c+"/rest/project-templates/1.0/templates",type:"GET"})},loadDemoProjectTemplatesData:function(){return i.ajax({url:c+"/rest/project-templates/1.0/templates/demo-projects",type:"GET"}).then(function(e){return e.demoProjects=!0,e})},dialogSubmitted:function(){var o=e.getSelectedTemplateData();r.hideDialogFromNewUser("templateselected"),s.raiseAtlassianEvent(o.itemModuleCompleteKey),p.isUndefined(o.infoSoyPath)?s.openAddProjectPage(o):t.initTemplateInfo(o)},openAddProjectPage:function(e){return e?void(e.createProject?(o.initProjectTemplate(e),this.onboarding&&"function"==typeof this.onboarding.handleSuccessfulProjectCreation&&o.registerPostProjectCreationCallback(this.onboarding.handleSuccessfulProjectCreation)):(r.dialog.addPage("blank-template-page"),i("body").trigger(e.itemModuleCompleteKey,r.dialog))):void a.showErrorMessage("\u0412\u043e\u0437\u043d\u0438\u043a\u043b\u0430 \u043e\u0448\u0438\u0431\u043a\u0430 \u043f\u0440\u0438 \u043f\u043e\u043f\u044b\u0442\u043a\u0435 \u0441\u043e\u0435\u0434\u0438\u043d\u0435\u043d\u0438\u044f \u0441 JIRA")},raiseAtlassianEvent:function(e){l.model.selectedTemplate=e,AJS.EventQueue&&AJS.EventQueue.push({name:"projecttemplates.templateselected",properties:{selectedTemplate:e}})}};return s});;
;
/* module-key = 'com.atlassian.jira.project-templates-plugin:project-templates-plugin-resources', location = 'js/create-shared-view.js' */
define("jira/project-templates/create-shared-view",["jira/project-templates/dialog-controller","jira/project-templates/dialog-view","jira/ajs/select/scrollable-single-select","jira/ajs/select/suggestion-collection-model","require","backbone","jquery"],function(e,t,r,o,a,i,n){"use strict";var l=AJS.InlineDialog,s=AJS.trigger,c=i.View.extend({events:{"submit #create-shared-project-form":"onSubmitForm"},page:void 0,prepareDialog:function(t){var r=a("jira/project-templates/create-shared-controller");this.page=e.addPage({name:"create-shared-project",title:t,panelName:"create-shared-project",backButton:!0,submitButtonText:"\u0414\u0430\u043b\u0435\u0435",submitButtonCallback:r.dialogSubmitted,submitButtonClass:"create-shared-dialog-button"})},draw:function(t){e.dialog.gotoPage(this.page.id);var r=JIRA.Templates.ProjectTemplates.createSharedProjectForm({projectSuggestions:JSON.stringify(t.projectSuggestions)});e.dialog.getPanel(this.page.id,0).html(r),this._createProjectPicker();var o=e.$dialogElement.find("#shared-help-icon");o.length&&new l(o,"shared-project-help-popup",function(e,t,r){e.html(JIRA.Templates.ProjectTemplates.sharedHelp()),r()},{width:330,offsetX:-30}),e.$dialogElement.find(".dialog-button-panel button").removeAttr("disabled")},showProjectMissingError:function(){this._clearFormErrors(),this._getProjectPickerInput().after(aui.form.fieldError({extraClasses:"project-picker-missing-error",message:"\u0412\u043d\u0430\u0447\u0430\u043b\u0435 \u0432\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044e\u0449\u0438\u0439 \u043f\u0440\u043e\u0435\u043a\u0442."}))},drawEmptyInfo:function(){var t=JIRA.Templates.ProjectTemplates.noProjects();e.dialog.getPanel(this.page.id,0).html(t),e.$dialogElement.find(".dialog-button-panel button").hide()},drawError:function(t){e.dialog.getPanel(this.page.id,0).html(JIRA.Templates.errorMsg({closable:!1,msg:t}))},drawLoading:function(){e.dialog.gotoPage(this.page.id);var t=JIRA.Templates.ProjectTemplates.loading();e.dialog.getPanel(this.page.id,0).html(t),e.$dialogElement.find(".dialog-spinner").spin(),e.$dialogElement.find(".dialog-button-panel button").attr("disabled","disabled")},_clearFormErrors:function(){e.$dialogElement.find(".project-picker-missing-error").remove()},_getProjectPickerInput:function(){return e.$dialogElement.find("#project-picker")},onSubmitForm:function(e){this._clearFormErrors();var t=a("jira/project-templates/create-shared-controller");return t.dialogSubmitted(),!1},_getExtraInfoMessage:function(){return e.$dialogElement.find(".create-shared-info")},_createProjectPicker:function(){this._getExtraInfoMessage().hide(),this.projectSelect=new r({element:this._getProjectPickerInput(),revertOnInvalid:!0,pageSize:50,pagingThreshold:100,model:o}),this.projectSelect.$field.focus();var e=this;this._getProjectPickerInput().on("selected",function(t,r){r.value()&&(s("analyticsEvent",{name:"jira.project.templates.dialog.create.shared.project.selected"}),e._getExtraInfoMessage().show())})},getSelectedProject:function(){return this.projectSelect.getSelectedDescriptor()&&this.projectSelect.getSelectedDescriptor().value()}});return new c({el:n(document),dialogView:t})});;
;
/* module-key = 'com.atlassian.jira.project-templates-plugin:project-templates-plugin-resources', location = 'js/create-shared-controller.js' */
define("jira/project-templates/create-shared-controller",["jira/project-templates/create-shared-controller-impl","jquery"],function(e,r){return new e({el:r(document)})});;
;
/* module-key = 'com.atlassian.jira.project-templates-plugin:project-templates-plugin-resources', location = 'js/create-shared-controller-impl.js' */
define("jira/project-templates/create-shared-controller-impl",["jira/project-templates/add-project-controller","jira/project-templates/create-shared-view","jira/lib/class","jquery","underscore"],function(e,t,r,i,a){"use strict";var n=AJS.contextPath();return r.extend({init:function(e){this._window=e.window||window,a.bindAll(this,"dialogSubmitted")},initCreateShared:function(){t.prepareDialog("\u0421\u043e\u0437\u0434\u0430\u0442\u044c, \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u044f \u043e\u0431\u0449\u0443\u044e \u043a\u043e\u043d\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u044e");var e=this;this._getProjectSuggestions().done(function(r){e._hasSuggestions(r)?t.draw({projectSuggestions:r}):t.drawEmptyInfo()}).fail(function(){t.drawError("\u0412\u043e\u0437\u043d\u0438\u043a\u043b\u0430 \u043e\u0448\u0438\u0431\u043a\u0430 \u043f\u0440\u0438 \u043f\u043e\u043f\u044b\u0442\u043a\u0435 \u0441\u043e\u0435\u0434\u0438\u043d\u0435\u043d\u0438\u044f \u0441 JIRA")}),t.drawLoading()},_hasSuggestions:function(e){var t=!1;return i.each(e,function(e,r){r&&r.items&&r.items.length>0&&(t=!0)}),t},_getProjectSuggestions:function(){return i.ajax({url:n+"/rest/project-templates/1.0/createshared"})},dialogSubmitted:function(){var r=t.getSelectedProject();r?e.initCreateShared({existingProjectId:r}):t.showProjectMissingError()}})});;
;
/* module-key = 'com.atlassian.jira.project-templates-plugin:project-templates-plugin-resources', location = '/js/RemoteProjectsCreatedMessage.js' */
var $=require("jquery");$(function(){function e(e,o){return JIRA.Templates.ProjectTemplates.formatAnchor({href:e,body:o,title:o})}function o(o,t,r,a){var c=[];return c.push("\u043f\u0440\u043e\u0435\u043a\u0442 JIRA"),o&&c.push(e(o,"\u043f\u0440\u043e\u0441\u0442\u0440\u0430\u043d\u0441\u0442\u0432\u043e Confluence")),t&&c.push(e(t,"\u0440\u0435\u043f\u043e\u0437\u0438\u0442\u043e\u0440\u0438\u0439 FishEye")),r&&c.push(e(r,"\u043f\u0440\u043e\u0435\u043a\u0442 Crucible")),a&&c.push(e(a,"\u043f\u0440\u043e\u0435\u043a\u0442 Bamboo")),c}function t(e,t,r,c){var l="\u0411\u044b\u043b\u0438 \u0441\u043e\u0437\u0434\u0430\u043d\u044b \u043e\u0431\u044a\u0435\u043a\u0442\u044b {0} \u0438 {1}.",m=o(e,t,r,c),n=m.pop();return m.length>0?a(l,m.join(", "),n):null}function r(e){var o=$(e).offset();o&&window.scrollTo(o.left,o.top)}var a=AJS.format,c=require("jira/project-templates/add-project-controller"),l=localStorage.getItem(c.localStoragePrefix+"confluenceProject"),m=localStorage.getItem(c.localStoragePrefix+"fisheyeProject"),n=localStorage.getItem(c.localStoragePrefix+"crucibleProject"),s=localStorage.getItem(c.localStoragePrefix+"bambooProject");localStorage.removeItem(c.localStoragePrefix+"confluenceProject"),localStorage.removeItem(c.localStoragePrefix+"fisheyeProject"),localStorage.removeItem(c.localStoragePrefix+"crucibleProject"),localStorage.removeItem(c.localStoragePrefix+"bambooProject");var g;(l||m||n||s)&&(g=t(l,m,n,s),g&&JIRA.Messages.showSuccessMsg(g,{closeable:!0}),r("#project-config-webpanel-summary-settings"))});;
;
/* module-key = 'com.atlassian.jira.project-templates-plugin:project-templates-plugin-resources', location = 'js/namespace.js' */
AJS.namespace("JPT.AddProjectController",null,require("jira/project-templates/add-project-controller")),AJS.namespace("JPT.AddProjectView",null,require("jira/project-templates/add-project-view")),AJS.namespace("JPT.CreateSharedController",null,require("jira/project-templates/create-shared-controller")),AJS.namespace("JPT.DialogView",null,require("jira/project-templates/dialog-view")),AJS.namespace("JPT.ConfigModel",null,require("jira/project-templates/config")),AJS.namespace("JPT.CreateSharedView",null,require("jira/project-templates/create-shared-view")),AJS.namespace("JPT.DialogController",null,require("jira/project-templates/dialog-controller")),AJS.namespace("JPT.ProjectKeyGenerator",null,require("jira/project-templates/project-key-generator")),AJS.namespace("JPT.SelectProjectTemplateController",null,require("jira/project-templates/select-project-template-controller")),AJS.namespace("JPT.SelectProjectTemplateView",null,require("jira/project-templates/select-project-template-view")),AJS.namespace("JPT.TemplateInfoControllerImpl",null,require("jira/project-templates/template-info-controller")),AJS.namespace("JPT.TemplateInfoView",null,require("jira/project-templates/template-info-view"));;
;
/* module-key = 'com.atlassian.jira.project-templates-plugin:project-templates-plugin-resources', location = 'js/project-create-bridge.js' */
!function(){function e(e){n(e)}var n,t=new Promise(function(e){n=e});t.done=function(e){return this.then(e)},define("jira/project-templates/new-project-create/bridge",function(){return e}),define("jira/project-templates/new-project-create",function(){return t})}();;
;
/* module-key = 'com.atlassian.jira.project-templates-plugin:project-templates-plugin-resources', location = 'js/project-create-experience.js' */
define("jira/project-templates/project-create-experience",["jira/featureflags/simplified-ux-feature-manager","jira/project-templates/dialog-controller"],function(e,r){return{trigger:function(t){t.preventDefault(),e.isGlobalSidebarEnabled()?JIRA.API.getSidebar().then(function(e){e.openDrawerForProjectCreate()}):r.handleProjectTemplateTriggered()}}});;
;
/* module-key = 'com.atlassian.jira.project-templates-plugin:project-templates-plugin-resources', location = 'js/project-create-onboarding-experience.js' */
define("jira/project-templates/project-create-onboarding-experience",["jquery","jira/featureflags/simplified-ux-feature-manager","jira/project-templates/dialog-controller","jira/project-templates/new-project-create","jira/featureflags/feature-manager"],function(e,r,t,a,n){function o(e){AJS.trigger("analyticsEvent",{name:e})}var c="project.config.dw.onboarding.project.create",i="jira.project.templates.onboarding.",l=i+"new-project-create.",d=i+"old-project-create.",p=l+"opened",j=l+"created",g=l+"cancelled",f=l+"load-error",u=d+"opened";return{trigger:function(i){if(i.preventDefault(),n.isFeatureEnabled(c)&&r.isGlobalSidebarEnabled()){o(p);const l=e("#onboarding");a.then(function(e){l.hide();var r=document.getElementById("new-project-create");e.renderNewProjectCreate(r,function(e){o(j),window.location.assign(e.returnUrl)},function(){o(g),l.show()})}).catch(function(){o(f),l.show(),t.handleProjectTemplateTriggered()})}else o(u),t.handleProjectTemplateTriggered()}}});;
;
/* module-key = 'com.atlassian.jira.project-templates-plugin:project-templates-plugin-resources', location = 'js/project-create-experience-init.js' */
require(["jquery","jira/project-templates/project-create-experience","jira/project-templates/project-create-onboarding-experience"],function(e,r,c){e(document).ready(function(){e(".trigger-project-create-experience").click(r.trigger),e(document).on("click",".trigger-onboarding-project-create-experience",c.trigger)})});;
;
/* module-key = 'com.atlassian.jira-core-project-templates:jira-core-project-templates-resources', location = '/soy/CoreProjectTemplates.soy' */
// This file was automatically generated from CoreProjectTemplates.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace JIRA.Templates.ProjectTemplates.CoreTemplates.
 */

if (typeof JIRA == 'undefined') { var JIRA = {}; }
if (typeof JIRA.Templates == 'undefined') { JIRA.Templates = {}; }
if (typeof JIRA.Templates.ProjectTemplates == 'undefined') { JIRA.Templates.ProjectTemplates = {}; }
if (typeof JIRA.Templates.ProjectTemplates.CoreTemplates == 'undefined') { JIRA.Templates.ProjectTemplates.CoreTemplates = {}; }


JIRA.Templates.ProjectTemplates.CoreTemplates.taskManagementInfoDialog = function(opt_data, opt_ignored) {
  return '' + JIRA.Templates.ProjectTemplates.CoreTemplates.templateInfoDialog({description: '\u0421\u043e\u0437\u0434\u0430\u0432\u0430\u0439\u0442\u0435 \u043f\u043e\u0432\u0441\u0435\u0434\u043d\u0435\u0432\u043d\u044b\u0435 \u0437\u0430\u0434\u0430\u0447\u0438 \u0438 \u043d\u0430\u0437\u043d\u0430\u0447\u0430\u0439\u0442\u0435 \u0438\u0445 \u0441\u0432\u043e\u0435\u0439 \u043a\u043e\u043c\u0430\u043d\u0434\u0435.', projectTemplate: 'taskManagement'});
};
if (goog.DEBUG) {
  JIRA.Templates.ProjectTemplates.CoreTemplates.taskManagementInfoDialog.soyTemplateName = 'JIRA.Templates.ProjectTemplates.CoreTemplates.taskManagementInfoDialog';
}


JIRA.Templates.ProjectTemplates.CoreTemplates.projectManagementInfoDialog = function(opt_data, opt_ignored) {
  return '' + JIRA.Templates.ProjectTemplates.CoreTemplates.templateInfoDialog({description: '\u041e\u0446\u0435\u043d\u0438\u0432\u0430\u0439\u0442\u0435 \u0437\u0430\u0434\u0430\u0447\u0438, \u043f\u0440\u0435\u0434\u0443\u0441\u043c\u0430\u0442\u0440\u0438\u0432\u0430\u0439\u0442\u0435 \u043e\u0431\u044a\u0435\u043c\u044b \u0440\u0430\u0431\u043e\u0442\u044b, \u0443\u0441\u0442\u0430\u043d\u0430\u0432\u043b\u0438\u0432\u0430\u0439\u0442\u0435 \u0441\u0440\u043e\u043a\u0438 \u0438 \u0441 \u043b\u0435\u0433\u043a\u043e\u0441\u0442\u044c\u044e \u0432\u0435\u0434\u0438\u0442\u0435 \u043e\u0442\u0447\u0435\u0442\u043d\u043e\u0441\u0442\u044c \u043f\u043e \u043f\u0440\u043e\u0433\u0440\u0435\u0441\u0441\u0443 \u043f\u0440\u043e\u0435\u043a\u0442\u0430.', projectTemplate: 'projectManagement'});
};
if (goog.DEBUG) {
  JIRA.Templates.ProjectTemplates.CoreTemplates.projectManagementInfoDialog.soyTemplateName = 'JIRA.Templates.ProjectTemplates.CoreTemplates.projectManagementInfoDialog';
}


JIRA.Templates.ProjectTemplates.CoreTemplates.processManagementInfoDialog = function(opt_data, opt_ignored) {
  return '' + JIRA.Templates.ProjectTemplates.CoreTemplates.templateInfoDialog({description: '\u0412\u0435\u0434\u0438\u0442\u0435 \u043c\u043e\u043d\u0438\u0442\u043e\u0440\u0438\u043d\u0433 \u043f\u043e\u0432\u0442\u043e\u0440\u044f\u044e\u0449\u0438\u0445\u0441\u044f \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0439, \u0442\u0430\u043a\u0438\u0445 \u043a\u0430\u043a \u0443\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d\u0438\u0435 \u0440\u0430\u0441\u0445\u043e\u0434\u043e\u0432, \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u043a\u0430 \u0434\u0438\u0437\u0430\u0439\u043d\u0430 \u0438\u043b\u0438 \u043f\u0440\u043e\u0446\u0435\u0441\u0441\u044b \u043e\u0442\u0447\u0435\u0442\u043d\u043e\u0441\u0442\u0438.', projectTemplate: 'processManagement'});
};
if (goog.DEBUG) {
  JIRA.Templates.ProjectTemplates.CoreTemplates.processManagementInfoDialog.soyTemplateName = 'JIRA.Templates.ProjectTemplates.CoreTemplates.processManagementInfoDialog';
}


JIRA.Templates.ProjectTemplates.CoreTemplates.contentManagementInfoDialog = function(opt_data, opt_ignored) {
  return '' + JIRA.Templates.ProjectTemplates.CoreTemplates.templateInfoDialog({description: '\u0421\u043e\u0437\u0434\u0430\u0439\u0442\u0435 \u0437\u0430\u0434\u0430\u0447\u0443 \u043f\u043e \u043a\u0430\u0436\u0434\u043e\u043c\u0443 \u0444\u0440\u0430\u0433\u043c\u0435\u043d\u0442\u0443 \u0441\u043e\u0434\u0435\u0440\u0436\u0438\u043c\u043e\u0433\u043e \u0438 \u0443\u043f\u0440\u0430\u0432\u043b\u044f\u0439\u0442\u0435 \u0435\u044e \u0441 \u043f\u043e\u043c\u043e\u0449\u044c\u044e \u0441\u0432\u043e\u0438\u0445 \u043f\u0440\u043e\u0446\u0435\u0441\u0441\u043e\u0432 \u043f\u0443\u0431\u043b\u0438\u043a\u0430\u0446\u0438\u0438.', projectTemplate: 'contentManagement', issueTypesHtml: '' + JIRA.Templates.ProjectTemplates.CoreTemplates.assetIssueType(null)});
};
if (goog.DEBUG) {
  JIRA.Templates.ProjectTemplates.CoreTemplates.contentManagementInfoDialog.soyTemplateName = 'JIRA.Templates.ProjectTemplates.CoreTemplates.contentManagementInfoDialog';
}


JIRA.Templates.ProjectTemplates.CoreTemplates.recruitmentInfoDialog = function(opt_data, opt_ignored) {
  return '' + JIRA.Templates.ProjectTemplates.CoreTemplates.templateInfoDialog({description: '\u0421\u043e\u0437\u0434\u0430\u0439\u0442\u0435 \u0437\u0430\u0434\u0430\u0447\u0443 \u043f\u043e \u043a\u0430\u0436\u0434\u043e\u043c\u0443 \u043a\u0430\u043d\u0434\u0438\u0434\u0430\u0442\u0443 \u0438 \u0443\u043f\u0440\u0430\u0432\u043b\u044f\u0439\u0442\u0435 \u0435\u044e \u0441 \u043f\u043e\u043c\u043e\u0449\u044c\u044e \u043f\u0440\u043e\u0446\u0435\u0441\u0441\u0430 \u043d\u0430\u0439\u043c\u0430 \u0432\u0430\u0448\u0435\u0439 \u043a\u043e\u043c\u043f\u0430\u043d\u0438\u0438.', projectTemplate: 'recruitment', issueTypesHtml: '' + JIRA.Templates.ProjectTemplates.CoreTemplates.candidateIssueType(null)});
};
if (goog.DEBUG) {
  JIRA.Templates.ProjectTemplates.CoreTemplates.recruitmentInfoDialog.soyTemplateName = 'JIRA.Templates.ProjectTemplates.CoreTemplates.recruitmentInfoDialog';
}


JIRA.Templates.ProjectTemplates.CoreTemplates.documentApprovalInfoDialog = function(opt_data, opt_ignored) {
  return '' + JIRA.Templates.ProjectTemplates.CoreTemplates.templateInfoDialog({description: '\u0421\u043e\u0437\u0434\u0430\u0439\u0442\u0435 \u0437\u0430\u0434\u0430\u0447\u0443 \u043f\u043e \u043a\u0430\u0436\u0434\u043e\u043c\u0443 \u0434\u043e\u043a\u0443\u043c\u0435\u043d\u0442\u0443 \u0438 \u0443\u043f\u0440\u0430\u0432\u043b\u044f\u0439\u0442\u0435 \u0435\u044e \u0447\u0435\u0440\u0435\u0437 \u043f\u0440\u043e\u0446\u0435\u0441\u0441\u044b \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u043a\u0438, \u0440\u0430\u0441\u0441\u043c\u043e\u0442\u0440\u0435\u043d\u0438\u044f \u0438 \u0443\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d\u0438\u044f.', projectTemplate: 'documentApproval', issueTypesHtml: '' + JIRA.Templates.ProjectTemplates.CoreTemplates.documentIssueType(null)});
};
if (goog.DEBUG) {
  JIRA.Templates.ProjectTemplates.CoreTemplates.documentApprovalInfoDialog.soyTemplateName = 'JIRA.Templates.ProjectTemplates.CoreTemplates.documentApprovalInfoDialog';
}


JIRA.Templates.ProjectTemplates.CoreTemplates.leadTrackingInfoDialog = function(opt_data, opt_ignored) {
  return '' + JIRA.Templates.ProjectTemplates.CoreTemplates.templateInfoDialog({description: '\u0421\u043e\u0437\u0434\u0430\u0439\u0442\u0435 \u0437\u0430\u0434\u0430\u0447\u0443 \u043f\u043e \u043a\u0430\u0436\u0434\u043e\u043c\u0443 \u043f\u043e\u0442\u0435\u043d\u0446\u0438\u0430\u043b\u044c\u043d\u043e\u043c\u0443 \u043a\u043b\u0438\u0435\u043d\u0442\u0443 \u0438 \u043e\u0442\u0441\u043b\u0435\u0436\u0438\u0432\u0430\u0439\u0442\u0435 \u0432\u043e\u0437\u043c\u043e\u0436\u043d\u043e\u0441\u0442\u0438 \u043e\u0442 \u043f\u0435\u0440\u0435\u0433\u043e\u0432\u043e\u0440\u043e\u0432 \u0434\u043e \u043a\u043e\u043d\u0432\u0435\u0440\u0441\u0438\u0438.', projectTemplate: 'leadTracking', issueTypesHtml: '' + JIRA.Templates.ProjectTemplates.CoreTemplates.leadIssueType(null)});
};
if (goog.DEBUG) {
  JIRA.Templates.ProjectTemplates.CoreTemplates.leadTrackingInfoDialog.soyTemplateName = 'JIRA.Templates.ProjectTemplates.CoreTemplates.leadTrackingInfoDialog';
}


JIRA.Templates.ProjectTemplates.CoreTemplates.procurementInfoDialog = function(opt_data, opt_ignored) {
  return '' + JIRA.Templates.ProjectTemplates.CoreTemplates.templateInfoDialog({description: '\u0421\u043e\u0437\u0434\u0430\u0439\u0442\u0435 \u0437\u0430\u0434\u0430\u0447\u0443 \u043f\u043e \u043a\u0430\u0436\u0434\u043e\u0439 \u0437\u0430\u0434\u0430\u0447\u0435 \u043d\u0430 \u0437\u0430\u043a\u0443\u043f\u043a\u0438 \u0438 \u043e\u0442\u0441\u043b\u0435\u0436\u0438\u0432\u0430\u0439\u0442\u0435 \u0435\u0435 \u043d\u0430 \u043f\u0440\u043e\u0442\u044f\u0436\u0435\u043d\u0438\u0438 \u0432\u0441\u0435\u0433\u043e \u043f\u0440\u043e\u0446\u0435\u0441\u0441\u0430 \u043e\u0442 \u0443\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d\u0438\u044f \u0434\u043e \u043a\u043e\u043d\u0435\u0447\u043d\u043e\u0439 \u043f\u043e\u0441\u0442\u0430\u0432\u043a\u0438.', projectTemplate: 'procurement', issueTypesHtml: '' + JIRA.Templates.ProjectTemplates.CoreTemplates.orderIssueType(null)});
};
if (goog.DEBUG) {
  JIRA.Templates.ProjectTemplates.CoreTemplates.procurementInfoDialog.soyTemplateName = 'JIRA.Templates.ProjectTemplates.CoreTemplates.procurementInfoDialog';
}


JIRA.Templates.ProjectTemplates.CoreTemplates.templateInfoDialog = function(opt_data, opt_ignored) {
  return '<div><div class="top-panel"><p>' + soy.$$escapeHtml(opt_data.description) + '</p></div><div class="left-panel"><h6>' + soy.$$escapeHtml('\u0422\u0438\u043f\u044b \u0437\u0430\u0434\u0430\u0447') + '</h6><ul class="project-template-issuetype-list">' + ((opt_data.issueTypesHtml != null) ? soy.$$filterNoAutoescape(opt_data.issueTypesHtml) : JIRA.Templates.ProjectTemplates.CoreTemplates.taskIssueType(null) + JIRA.Templates.ProjectTemplates.CoreTemplates.subtaskIssueType(null)) + '</ul></div><div class="right-panel"><h6>' + soy.$$escapeHtml('\u0411\u0438\u0437\u043d\u0435\u0441-\u043f\u0440\u043e\u0446\u0435\u0441\u0441') + '</h6><div class="workflow ' + soy.$$escapeHtml(opt_data.projectTemplate) + '"></div></div></div>';
};
if (goog.DEBUG) {
  JIRA.Templates.ProjectTemplates.CoreTemplates.templateInfoDialog.soyTemplateName = 'JIRA.Templates.ProjectTemplates.CoreTemplates.templateInfoDialog';
}


JIRA.Templates.ProjectTemplates.CoreTemplates.issueType = function(opt_data, opt_ignored) {
  return '<li><span class="issuetype-list-label"><span class="issuetype-icon ' + soy.$$escapeHtml(opt_data.iconKey) + '"></span><span class="issuetype-name">' + soy.$$escapeHtml(opt_data.label) + '</span></span></li>';
};
if (goog.DEBUG) {
  JIRA.Templates.ProjectTemplates.CoreTemplates.issueType.soyTemplateName = 'JIRA.Templates.ProjectTemplates.CoreTemplates.issueType';
}


JIRA.Templates.ProjectTemplates.CoreTemplates.taskIssueType = function(opt_data, opt_ignored) {
  return '' + JIRA.Templates.ProjectTemplates.CoreTemplates.issueType({iconKey: 'task', label: '\u0417\u0430\u0434\u0430\u0447\u0430'});
};
if (goog.DEBUG) {
  JIRA.Templates.ProjectTemplates.CoreTemplates.taskIssueType.soyTemplateName = 'JIRA.Templates.ProjectTemplates.CoreTemplates.taskIssueType';
}


JIRA.Templates.ProjectTemplates.CoreTemplates.subtaskIssueType = function(opt_data, opt_ignored) {
  return '' + JIRA.Templates.ProjectTemplates.CoreTemplates.issueType({iconKey: 'subtask', label: '\u041f\u043e\u0434\u0437\u0430\u0434\u0430\u0447\u0438'});
};
if (goog.DEBUG) {
  JIRA.Templates.ProjectTemplates.CoreTemplates.subtaskIssueType.soyTemplateName = 'JIRA.Templates.ProjectTemplates.CoreTemplates.subtaskIssueType';
}


JIRA.Templates.ProjectTemplates.CoreTemplates.assetIssueType = function(opt_data, opt_ignored) {
  return '' + JIRA.Templates.ProjectTemplates.CoreTemplates.issueType({iconKey: 'asset', label: '\u0410\u043a\u0442\u0438\u0432'});
};
if (goog.DEBUG) {
  JIRA.Templates.ProjectTemplates.CoreTemplates.assetIssueType.soyTemplateName = 'JIRA.Templates.ProjectTemplates.CoreTemplates.assetIssueType';
}


JIRA.Templates.ProjectTemplates.CoreTemplates.candidateIssueType = function(opt_data, opt_ignored) {
  return '' + JIRA.Templates.ProjectTemplates.CoreTemplates.issueType({iconKey: 'candidate', label: '\u041a\u0430\u043d\u0434\u0438\u0434\u0430\u0442'});
};
if (goog.DEBUG) {
  JIRA.Templates.ProjectTemplates.CoreTemplates.candidateIssueType.soyTemplateName = 'JIRA.Templates.ProjectTemplates.CoreTemplates.candidateIssueType';
}


JIRA.Templates.ProjectTemplates.CoreTemplates.documentIssueType = function(opt_data, opt_ignored) {
  return '' + JIRA.Templates.ProjectTemplates.CoreTemplates.issueType({iconKey: 'document', label: '\u0414\u043e\u043a\u0443\u043c\u0435\u043d\u0442'});
};
if (goog.DEBUG) {
  JIRA.Templates.ProjectTemplates.CoreTemplates.documentIssueType.soyTemplateName = 'JIRA.Templates.ProjectTemplates.CoreTemplates.documentIssueType';
}


JIRA.Templates.ProjectTemplates.CoreTemplates.leadIssueType = function(opt_data, opt_ignored) {
  return '' + JIRA.Templates.ProjectTemplates.CoreTemplates.issueType({iconKey: 'lead', label: '\u041f\u043e\u0442\u0435\u043d\u0446\u0438\u0430\u043b\u044c\u043d\u044b\u0439 \u043a\u043b\u0438\u0435\u043d\u0442'});
};
if (goog.DEBUG) {
  JIRA.Templates.ProjectTemplates.CoreTemplates.leadIssueType.soyTemplateName = 'JIRA.Templates.ProjectTemplates.CoreTemplates.leadIssueType';
}


JIRA.Templates.ProjectTemplates.CoreTemplates.orderIssueType = function(opt_data, opt_ignored) {
  return '' + JIRA.Templates.ProjectTemplates.CoreTemplates.issueType({iconKey: 'order', label: '\u0423\u043f\u043e\u0440\u044f\u0434\u043e\u0447\u0438\u0442\u044c'});
};
if (goog.DEBUG) {
  JIRA.Templates.ProjectTemplates.CoreTemplates.orderIssueType.soyTemplateName = 'JIRA.Templates.ProjectTemplates.CoreTemplates.orderIssueType';
}
;
;
/* module-key = 'com.atlassian.jira.ui.selector:ui-selector', location = 'js/ui-version-selector.js' */
define("jira/ui-selector",["jquery","wrm/context-path","wrm/data"],function(i,t,e){var o=t(),r=e.claim("com.atlassian.jira.ui.selector:ui-selector.uri-override");return{init:function(t){function e(i){var e=t.find("span");i?(e.removeClass("aui-iconfont-workflow").addClass("aui-iconfont-approve"),e.attr("title",i)):(e.removeClass("aui-iconfont-approve").addClass("aui-iconfont-workflow"),e.removeAttr("title"))}const a=i("#jira-ui-selector-form"),n=i("#jira-ui-selector-dialog-submit-button"),u=i("#jira-ui-selector-dialog-delete-button"),l=i("#jira-ui-selector-dialog"),c=i("#jira-ui-selector-url");c.val(r.uri),e(r.uri),t.click(function(i){i.preventDefault(),AJS.dialog2(l).show()}),n.click(function(){a.submit()}),u.click(function(){i.ajax({url:o+"/rest/uiselector/1.0/uri",contentType:"application/json",type:"POST",data:JSON.stringify({uri:""})}).then(function(){c.val(""),AJS.dialog2(l).hide(),e()})}),a.submit(function(t){t.preventDefault();var r=c.val();i.ajax({url:o+"/rest/uiselector/1.0/uri",contentType:"application/json",type:"POST",data:JSON.stringify({uri:r})}).then(function(){AJS.dialog2(l).hide(),e(r)})})}}}),AJS.$(function(){require("jira/ui-selector").init(AJS.$("#jira-ui-selector-link"))});;
;
/* module-key = 'com.atlassian.jira.jira-issue-link-confluence-plugin:issue-link-confluence-js', location = 'js/issuelink-confluence.js' */
require(["jquery","jira/util/events","jira/util/events/types","issue-link-app-links/app-links"],function(n,e,i,u){var t={getCurrentAppId:function(e){return n("#issue-link-confluence-app-id",e).val()},shouldExecute:function(e){return 0!==n("#confluence-page-link",e).length},getIssueId:function(e){return n("input[name=id]",e).val()}};e.bind(i.NEW_PAGE_ADDED,function(n,e){u.init(t,e)})});;
;
/* module-key = 'com.atlassian.jira.jira-issue-link-confluence-plugin:confluence-page-resource', location = 'templates/dialog/searchresult.soy' */
// This file was automatically generated from searchresult.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace JIRA.Templates.ConfluencePageSearch.
 */

if (typeof JIRA == 'undefined') { var JIRA = {}; }
if (typeof JIRA.Templates == 'undefined') { JIRA.Templates = {}; }
if (typeof JIRA.Templates.ConfluencePageSearch == 'undefined') { JIRA.Templates.ConfluencePageSearch = {}; }


JIRA.Templates.ConfluencePageSearch.result = function(opt_data, opt_ignored) {
  var output = '<h2>' + soy.$$escapeHtml('\u041d\u0430\u0439\u0442\u0438 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0443 Confluence') + '</h2><form class="aui search-form" id="confluence-page-search-form" action="#" method="post"><div class="field-group"><label for="confluence-app-link">' + soy.$$escapeHtml('\u0421\u0435\u0440\u0432\u0435\u0440') + ':</label>';
  if (opt_data.appLinks.length == 1) {
    output += '<span class="field-value">' + soy.$$escapeHtml(opt_data.appLinks[0].name) + '</span><input id="confluence-app-link" class="hidden" type="hidden" name="appId" value="' + soy.$$escapeHtml(opt_data.appLinks[0].id) + '"/>';
  } else {
    output += '<select id="confluence-app-link" class="select medium-field" name="appId">';
    var appLinkList17 = opt_data.appLinks;
    var appLinkListLen17 = appLinkList17.length;
    for (var appLinkIndex17 = 0; appLinkIndex17 < appLinkListLen17; appLinkIndex17++) {
      var appLinkData17 = appLinkList17[appLinkIndex17];
      output += '<option value="' + soy.$$escapeHtml(appLinkData17.id) + '">' + soy.$$escapeHtml(appLinkData17.name) + '</option>';
    }
    output += '</select>';
  }
  output += '</div><div class="issue-link-applinks-authentication-message applinks-message-bar"></div><div class="hidden"><input class="issue-link-applinks-application-type" type="hidden" value="com.atlassian.applinks.api.application.confluence.ConfluenceApplicationType"/></div><div class="issue-link-oauth-toggle field-group"><label for="link-search-text" id="linkSearch-label">' + soy.$$escapeHtml('\u041f\u043e\u0438\u0441\u043a') + ':</label><input id="link-search-text" type="text" tabindex="0" class="text" name="linkSearch" size="50" /> <select tabindex="0" class="search-space select" id="search-panel-space"><option value="">' + soy.$$escapeHtml('\u0412\u0441\u0435 \u043f\u0440\u043e\u0441\u0442\u0440\u0430\u043d\u0441\u0442\u0432\u0430') + '</option></select> <input type="submit" tabindex="0" class="aui-button" id="search-panel-button" value="' + soy.$$escapeHtml('\u041f\u043e\u0438\u0441\u043a') + '"/><span id="link-search-loading" class="icon loading throbber hidden"/></div><div class="message-panel hidden"></div><div id="search-results-table" class="data-table"></div><div class="buttons-container form-footer"><div class="buttons"><button class="aui-button aui-button-link cancel" id="confluence-link-cancel" title="' + soy.$$escapeHtml('\u0427\u0442\u043e\u0431\u044b \u0437\u0430\u043a\u0440\u044b\u0442\u044c, \u043d\u0430\u0436\u043c\u0438\u0442\u0435 Esc') + '">' + soy.$$escapeHtml('\u0417\u0430\u043a\u0440\u044b\u0442\u044c') + '</button></div></div></form>';
  return output;
};
if (goog.DEBUG) {
  JIRA.Templates.ConfluencePageSearch.result.soyTemplateName = 'JIRA.Templates.ConfluencePageSearch.result';
}


JIRA.Templates.ConfluencePageSearch.resultsTable = function(opt_data, opt_ignored) {
  var output = '';
  if (opt_data.results.length > 0) {
    output += '<table id="confluence-searchresult" class="aui"><thead><tr><th width="180px">' + soy.$$escapeHtml('\u0417\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a') + '</th><th width="550px">' + soy.$$escapeHtml('\u0412\u044b\u0431\u043e\u0440\u043a\u0430') + '</th></tr></thead><tbody>';
    var resultList44 = opt_data.results;
    var resultListLen44 = resultList44.length;
    for (var resultIndex44 = 0; resultIndex44 < resultListLen44; resultIndex44++) {
      var resultData44 = resultList44[resultIndex44];
      output += '<tr title="' + soy.$$escapeHtml(resultData44.title) + '"><td class="title" data-url="' + soy.$$escapeHtml(resultData44.url) + '">' + soy.$$escapeHtml(resultData44.title) + '</td><td class="excerpt">' + soy.$$escapeHtml(resultData44.excerpt) + '</td></tr>';
    }
    output += '</tbody></table>';
  } else {
    output += '<div class="aui-message info"><span class="aui-icon icon-info"></span><p>' + soy.$$escapeHtml('\u041d\u0438\u0447\u0435\u0433\u043e \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u043e.') + '</p></div>';
  }
  return output;
};
if (goog.DEBUG) {
  JIRA.Templates.ConfluencePageSearch.resultsTable.soyTemplateName = 'JIRA.Templates.ConfluencePageSearch.resultsTable';
}


JIRA.Templates.ConfluencePageSearch.spaceOptions = function(opt_data, opt_ignored) {
  var output = '<option value="">' + soy.$$escapeHtml('\u0412\u0441\u0435 \u043f\u0440\u043e\u0441\u0442\u0440\u0430\u043d\u0441\u0442\u0432\u0430') + '</option>';
  var spaceList64 = opt_data.spaces;
  var spaceListLen64 = spaceList64.length;
  for (var spaceIndex64 = 0; spaceIndex64 < spaceListLen64; spaceIndex64++) {
    var spaceData64 = spaceList64[spaceIndex64];
    output += '<option value="' + soy.$$escapeHtml(spaceData64.key) + '">' + soy.$$escapeHtml(spaceData64.name) + '</option>';
  }
  return output;
};
if (goog.DEBUG) {
  JIRA.Templates.ConfluencePageSearch.spaceOptions.soyTemplateName = 'JIRA.Templates.ConfluencePageSearch.spaceOptions';
}


JIRA.Templates.ConfluencePageSearch.allSpacesOption = function(opt_data, opt_ignored) {
  return '<option value="">' + soy.$$escapeHtml('\u0412\u0441\u0435 \u043f\u0440\u043e\u0441\u0442\u0440\u0430\u043d\u0441\u0442\u0432\u0430') + '</option><option value="" disabled="disabled">' + soy.$$escapeHtml('\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430\u2026') + '</option>';
};
if (goog.DEBUG) {
  JIRA.Templates.ConfluencePageSearch.allSpacesOption.soyTemplateName = 'JIRA.Templates.ConfluencePageSearch.allSpacesOption';
}
;
;
/* module-key = 'com.atlassian.jira.jira-issue-link-confluence-plugin:confluence-page-resource', location = 'templates/dialog/template-wrapper.js' */
define("jira-issue-link-confluence/dialog/searchresult/templates",[],function(){"use strict";return window.JIRA.Templates.ConfluencePageSearch});;
;
/* module-key = 'com.atlassian.jira.jira-issue-link-confluence-plugin:confluence-page-resource', location = 'js/ConfluencePageSearch.js' */
require(["jquery","wrm/context-path","jira/util/formatter","aui/message","jira/ajs/ajax/smart-ajax","jira-issue-link-confluence/dialog/searchresult/templates","jira/dialog/form-dialog","issue-link-app-links/app-links"],function(e,a,n,t,s,l,r,c){e(function(){function i(a,s){e("#confluence-app-link",a).change(function(){var n=s.selectServer(e(this).val()).authenticationRequired;n||u(a,e(this).val(),s),e("#search-results-table",a).empty(),o(!0,a)}),e("#search-panel-button",a).click(function(){e("#search-results-table",a).empty();var s=e("#link-search-text",a).val();return s=e.trim(s),s?d(s,a):t.info("#search-results-table",{body:"\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430, \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0435 \u0434\u043b\u044f \u043f\u043e\u0438\u0441\u043a\u0430.",closeable:!1}),!1})}function u(r,c,i){e("select#search-panel-space",r).html(l.allSpacesOption());var u=++m;s.makeRequest({url:a()+"/rest/confluenceIssueLink/1/confluence/space?appId="+c,complete:function(a,s,p){if(u===m)if(p.successful){var d=p.data.spaces;e("select#search-panel-space",r).html(l.spaceOptions({spaces:d}))}else if(401===p.status)i.setAuthenticationRequired(c,!0);else{o(!1,r);var f;f=403===p.status?"\u041d\u0435 \u0443\u0434\u0430\u0435\u0442\u0441\u044f \u043f\u043e\u043b\u0443\u0447\u0438\u0442\u044c \u0434\u043e\u0441\u0442\u0443\u043f \u043a \u0441\u043e\u0434\u0435\u0440\u0436\u0438\u043c\u043e\u043c\u0443 Confluence, \u0442.\u043a. \u0444\u0443\u043d\u043a\u0446\u0438\u044f \"Remote API\" \u043e\u0442\u043a\u043b\u044e\u0447\u0435\u043d\u0430. \u0410\u0434\u043c\u0438\u043d\u0438\u0441\u0442\u0440\u0430\u0442\u043e\u0440 Confluence \u0434\u043e\u043b\u0436\u0435\u043d \u0432\u043a\u043b\u044e\u0447\u0438\u0442\u044c \u0444\u0443\u043d\u043a\u0446\u0438\u044e \"Remote API\", \u0447\u0442\u043e\u0431\u044b JIRA \u0441\u043c\u043e\u0433\u043b\u0430 \u043e\u0442\u043e\u0431\u0440\u0430\u0437\u0438\u0442\u044c \u0437\u0430\u043f\u0440\u043e\u0448\u0435\u043d\u043d\u043e\u0435 \u0441\u043e\u0434\u0435\u0440\u0436\u0438\u043c\u043e\u0435.":"\u041d\u0435\u0442 \u0432\u043e\u0437\u043c\u043e\u0436\u043d\u043e\u0441\u0442\u0438 \u043f\u043e\u043b\u0443\u0447\u0438\u0442\u044c \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044e \u0438\u0437 \u0443\u043a\u0430\u0437\u0430\u043d\u043d\u044b\u0445 \u044d\u043a\u0437\u0435\u043c\u043f\u043b\u044f\u0440\u043e\u0432 Confluence.",t.error("#search-results-table",{body:f,closeable:!1})}}})}function o(a,n){a?(e("#link-search-text",n).removeAttr("disabled"),e("#search-panel-space",n).removeAttr("disabled"),e("#search-panel-button",n).removeAttr("disabled")):(e("#link-search-text",n).attr("disabled","disabled"),e("#search-panel-space",n).attr("disabled","disabled"),e("#search-panel-button",n).attr("disabled","disabled"))}function p(a,n){e("#link-search-loading",n).toggleClass("hidden",!a)}function d(r,c){p(!0,c);var i=e("#confluence-app-link",c).val(),u=e("#search-panel-space option:selected",c).val();s.makeRequest({url:a()+"/rest/confluenceIssueLink/1/confluence/search?query="+r+"&appId="+i+"&spaceKey="+u+"&maxResults=10",complete:function(a,s,r){if(p(!1,c),r.successful){var i=r.data.result,u=l.resultsTable({results:i});e("#search-results-table",c).html(u)}else{var o;o=r.hasData?"The Jira server was contacted but has returned an error response. We are unsure of the result of this operation.":"The Jira server could not be contacted. This may be a temporary glitch or the server may be down.",t.error("#search-results-table",{body:o,closeable:!1})}e("#confluence-searchresult tbody tr",c).click(function(){var a=e(this).children().first().data("url");e("#confluence-page-url").val(a),e("#link-issue-dialog .error").hide(),h.hide(),e("#link-issue-dialog").show(),e("#confluence-page-url").focus().select()})}})}function f(a){var n={getCurrentAppId:function(a){return e("#confluence-app-link",a).val()},shouldExecute:function(a){return 0!==e("#confluence-app-link",a).length},onAuthenticationSuccessCallback:function(e,a,n){u(e,a,n)},getIssueId:function(a){return e("#confluence-page-link input[name=id]").val()}};return c.init(n,a.$popup).done(function(e,a){u(e,n.getCurrentAppId(e),a)})}var h=new r({id:"confluence-page-search-dialog",trigger:"#confluence-page-link .confluence-search-trigger",widthClass:"large",height:"565px",content:function(r){var c=this;s.makeRequest({url:a()+"/rest/confluenceIssueLink/1/confluence/applink",complete:function(a,s,u){if(u.successful){var o=u.data.applicationLinks;r(l.result({appLinks:o})),f(c).done(function(a,n){i(a,n),e("#link-search-text",a).focus()})}else t.error("#search-results-table",{body:"The Jira server could not be contacted. This may be a temporary glitch or the server may be down.",closeable:!1}),r()}})},submitHandler:function(a,n){a.preventDefault(),e("#search-panel-button").click().removeAttr("disabled"),n()}}),m=0})});;
;
/* module-key = 'com.atlassian.plugins.atlassian-nps-plugin:nps-amd-shims', location = '/js/amd-shims/ajs.js' */
define("atlassian-nps-plugin/js/amd-shims/ajs",function(){return AJS});;
;
/* module-key = 'com.atlassian.plugins.atlassian-nps-plugin:nps-amd-shims', location = '/js/amd-shims/templates.js' */
define("atlassian-nps-plugin/js/amd-shims/templates",function(){return NPS.Templates});;
;
/* module-key = 'com.atlassian.plugins.atlassian-nps-plugin:nps-amd-shims', location = '/js/amd-shims/wrm.js' */
define("atlassian-nps-plugin/js/amd-shims/wrm",function(){return WRM});;
;
/* module-key = 'com.atlassian.plugins.atlassian-nps-plugin:nps-util', location = '/js/nps/util.js' */
define("atlassian-nps-plugin/js/nps/util",["atlassian-nps-plugin/js/nps/product","atlassian-nps-plugin/js/amd-shims/ajs"],function(b,a){var c={};c.kfyShuffle=function(g){for(var f=g.length-1;f>0;f--){var d=Math.floor(Math.random()*(f+1));var e=g[f];g[f]=g[d];g[d]=e}return g};c.sendAnalyticsEvent=function(d,e){e=e||{};e.product=b.getProductName().toLowerCase();e.page=window.location.pathname.replace(/\//g," ");var f={name:"nps."+d,data:e};a.trigger("analyticsEvent",f)};c.hasShowingDialog=function(){return a.$(".aui-dialog:visible, aui-dialog2:visible").length>0};return c});;
;
/* module-key = 'com.atlassian.plugins.atlassian-nps-plugin:nps-util', location = '/js/nps/submission.js' */
define("atlassian-nps-plugin/js/nps/submission",["atlassian-nps-plugin/js/nps/util"],function(b){var a={};a.showNotification=function(c){b.sendAnalyticsEvent("notification.show",c)};a.startSurvey=function(){b.sendAnalyticsEvent("survey.start",{})};a.cancelSurvey=function(c){var d={};if(c){d.cancelContext=c}b.sendAnalyticsEvent("survey.cancel",d)};a.ignoreSurvey=function(){b.sendAnalyticsEvent("survey.ignore",{})};a.submitSurvey=function(c){b.sendAnalyticsEvent("survey.submit",c)};a.scheduleNextSurveyDate=function(c){b.sendAnalyticsEvent("survey.schedule",c)};a.showAcknowledgementFlag=function(c){b.sendAnalyticsEvent("server.acknowledge.show",c)};a.acceptAcknowledgementFlag=function(c){b.sendAnalyticsEvent("server.acknowledge.accept",c)};a.closeAcknowledgementFlag=function(c){b.sendAnalyticsEvent("server.acknowledge.close",c)};a.updateNpsStatus=function(c){b.sendAnalyticsEvent("server.status.changed",c)};return a});;
;
/* module-key = 'com.atlassian.plugins.atlassian-nps-plugin:atlassian-nps-plugin-resources', location = '/js/nps/product/jira.js' */
define("atlassian-nps-plugin/js/nps/product",["atlassian-nps-plugin/js/amd-shims/ajs","atlassian-nps-plugin/js/amd-shims/wrm"],function(h,b){var a="#navigation-app";var c;var g;var i;var f="JIRA";require(["atlassian-nps-plugin/js/nps/client-storage"],function(k){var j=k.get("application-key");var l=h.Meta.get("application-key");if(d()){f="jira-service-desk"}else{if(e(l)){f=l;k.set("application-key",l)}else{if(e(j)){f=j}}}});function e(j){return j==="jira-software"||j==="jira-core"}function d(){if(g===undefined){var j=b.data.claim("com.atlassian.plugins.atlassian-nps-plugin:atlassian-nps-plugin-resources.is-current-user-jsd-agent-data-provider");g=(j===true)}return g}return{getProductName:function(){if(d()===true){return"JIRA Service Desk"}else{return"JIRA"}},setBindings:function(){return false},getUserKey:function(){return h.Meta.get("remote-user")},hasAdg3NavigationSidebar:function(){return h.$(a).length>0},getAdg3SurveyInlineDialogClass:function(){return"jira-adg3-nps-survey-dialog"},getAdg3Flags:function(){var j=h.Meta.get("feature-flags");var k=h.Meta.get("enabled-dark-features");var l=j?JSON.parse(j):{};return{simplifiedNavigationEnabled:Boolean(l["fd-77.labs.navigation.simplified.ux"]),adg3GraduatedStylesEnabled:Boolean(l["fd-81.labs.navigation.adg3.styles.graduated"]),userAdg3Enabled:k?k.indexOf("labs.navigation.user.opt-in.simplified.ux.enabled")>-1:false}},isServerMode:function(){if(c===undefined){var j=b.data.claim("com.atlassian.plugins.atlassian-nps-plugin:atlassian-nps-plugin-resources.is-server-instance-data-provider");c=(j===true)}return c},allowDisplayNotification:function(){var l=(window.location.pathname.toLowerCase().indexOf("/servicedesk/agent/")>=0);var k=h.Meta.getBoolean("is-servicedesk-rendered");var j=l||k;if(d()===true){return j}else{return !j}},getSurveyTrigger:function(){return this.hasAdg3NavigationSidebar()?a:"#header-details-user-fullname"},getInlineDialogAlignment:function(){return this.hasAdg3NavigationSidebar()?"right top":"bottom right"},allowDisplayAcknowledgementFlag:function(){return true},enableABTesting:function(){return this.isServerMode()},getApplicationKey:function(){return f},isUserSiteAdmin:function(){if(i===undefined){var j=b.data.claim("com.atlassian.plugins.atlassian-nps-plugin:atlassian-nps-plugin-resources.is-user-site-admin");i=(j===true)}return i}}});;
;
/* module-key = 'com.atlassian.plugins.atlassian-nps-plugin:atlassian-nps-plugin-resources', location = '/js/nps/client-storage.js' */
define("atlassian-nps-plugin/js/nps/client-storage",["atlassian-nps-plugin/js/amd-shims/ajs","atlassian-nps-plugin/js/nps/product"],function(b,d){var f;function c(){if(f===undefined){f="nps-"+d.getUserKey()}return f}function a(g){return c()+"-"+g}function e(g){return a(d.getProductName().toLowerCase().replace(/\s+/g,"")+"-"+g)}return{set:function(g,h){try{localStorage.setItem(a(g),h)}catch(i){b.warn("Could not set NPS value: "+i)}},setProductValue:function(g,h){try{localStorage.setItem(e(g),h)}catch(i){b.warn("Could not set NPS value: "+i)}},get:function(g){return localStorage.getItem(a(g))},getProductValue:function(g){return localStorage.getItem(e(g))},remove:function(g){localStorage.removeItem(a(g))},removeProductValue:function(g){localStorage.removeItem(e(g))},containsKey:function(g){return localStorage.getItem(a(g))!==null},getNumber:function(g){var h=parseInt(this.get(g),10);if(isNaN(h)){return 0}return h},increment:function(g){this.set(g,(this.getNumber(g)+1))}}});;
;
/* module-key = 'com.atlassian.plugins.atlassian-nps-plugin:atlassian-nps-plugin-resources', location = '/js/nps/config-manager-server.js' */
define("atlassian-nps-plugin/js/nps/config-manager-server",["atlassian-nps-plugin/js/amd-shims/ajs","jquery","atlassian-nps-plugin/js/nps/client-storage","atlassian-nps-plugin/js/nps/submission"],function(a,e,d,b){var c={optedOut:null,dismissedCount:null,timeToNextSurvey:null};return{getCachedData:function(){return c},removeCachedData:function(){c={optedOut:null,dismissedCount:null,timeToNextSurvey:null}},fetchConfig:function(){return e.ajax({url:a.contextPath()+"/rest/nps/1.0/config",type:"GET",contentType:"application/json",cache:false,success:function(f){if(f.dismissedCount===null){f.dismissedCount=0}c=f;d.setProductValue("nextSurveyDate",Date.now()+c.timeToNextSurvey)},error:function(f){a.warn("Error getting NPS config: ",f)}})},setConfig:function(){var f;if(typeof arguments[0]==="object"){f=arguments[0]}else{if(arguments.length!==2){throw ("Need to provide key/value as argument to set NPS server config")}f={};f[arguments[0]]=arguments[1]}if(localStorage&&localStorage.getItem("nps-testing")==="true"){f.forceUpdate=true}return e.ajax({url:a.contextPath()+"/rest/nps/1.0/config",type:"PUT",contentType:"application/json",data:JSON.stringify(f),success:function(){e.extend(c,f)},error:function(g){a.warn("Error setting NPS config: ",g)}})},scheduleNextSurveyDate:function(){return e.ajax({url:a.contextPath()+"/rest/nps/1.0/config/nextSurveyDate",type:"POST",contentType:"application/json",success:function(f){b.scheduleNextSurveyDate({nextSurveyDate:f});d.setProductValue("nextSurveyDate",f)},error:function(f){a.warn("Error scheduling next survey date for NPS: ",f)}})}}});;
;
/* module-key = 'com.atlassian.plugins.atlassian-nps-plugin:atlassian-nps-plugin-resources', location = '/js/nps/session-manager.js' */
define("atlassian-nps-plugin/js/nps/session-manager",["atlassian-nps-plugin/js/nps/client-storage"],function(e){var b=1000*60;var c=5*b;var g=60*b;var f=10*b;function a(){if(!e.containsKey("sessionStart")){e.set("sessionStart",Date.now())}else{if((Date.now()-e.getNumber("lastActive"))>g){e.set("sessionStart",Date.now())}}}function d(){if(!e.containsKey("idleStart")){e.set("idleStart",Date.now())}}return{update:function(){d();a();e.set("lastActive",Date.now())},isSurveyTime:function(){return this.isInSession()&&this.isIdle()},isIdle:function(){var h=Date.now()-e.getNumber("idleStart");return h>c},isInSession:function(){var h=Date.now()-e.getNumber("sessionStart");return h>f},reset:function(){e.remove("lastActive");e.remove("sessionStart");e.remove("idleStart")}}});;
;
/* module-key = 'com.atlassian.plugins.atlassian-nps-plugin:atlassian-nps-plugin-resources', location = '/js/atlassian-nps-plugin.js' */
define("atlassian-nps-plugin/js/atlassian-nps-plugin",["atlassian-nps-plugin/js/amd-shims/ajs","atlassian-nps-plugin/js/amd-shims/wrm","atlassian-nps-plugin/js/nps/client-storage","atlassian-nps-plugin/js/nps/product","atlassian-nps-plugin/js/nps/session-manager","atlassian-nps-plugin/js/nps/submission","atlassian-nps-plugin/js/nps/util","jquery"],function(j,a,b,g,d,i,k,e){var m;var o=1000*60*60*24*30;function n(p){m=p;var q=b.getNumber("displayCount");g.setBindings();d.update();if(b.get("optedOut")==="true"){m.setConfig("optedOut",true)}else{if(q!==0){l()}else{if(Date.now()-b.get("lastSurveyDate")>=o){if(b.getProductValue("nextSurveyDate")===null){m.fetchConfig().then(h)}else{if(b.getProductValue("nextSurveyDate")-Date.now()<0){m.fetchConfig().then(h)}}}}}}function h(){c().then(f)}function c(){var q=30000;var p=e.Deferred();if(j.DarkFeatures&&j.DarkFeatures.isEnabled("nps.survey.inline.dialog")){q=5000}if(localStorage&&localStorage.getItem("nps-testing")==="true"){q=0}setTimeout(function(){var r=!k.hasShowingDialog();if(r&&d.isSurveyTime()&&m.getCachedData().timeToNextSurvey!=null&&m.getCachedData().timeToNextSurvey<=0){p.resolve()}},q);return p.promise()}function f(){if(g.allowDisplayNotification()===true){a.require("wr!com.atlassian.plugins.atlassian-nps-plugin:nps-specific-resources-async",function(){require(["atlassian-nps-plugin/js/nps/main"],function(p){p.launch(m);b.increment("displayCount");i.showNotification({displayCount:b.getNumber("displayCount"),dismissedCount:parseInt(m.getCachedData().dismissedCount,10)});b.set("lastSurveyDate",Date.now())})})}}function l(){a.require("wr!com.atlassian.plugins.atlassian-nps-plugin:nps-submission-resources",function(){require(["atlassian-nps-plugin/js/nps/submission"],function(p){b.remove("displayCount");p.ignoreSurvey();m.scheduleNextSurveyDate();d.reset()})})}return{init:n}});;
;
/* module-key = 'com.atlassian.plugins.atlassian-nps-plugin:atlassian-nps-plugin-resources', location = '/js/bootstrap.js' */
require(["atlassian-nps-plugin/js/amd-shims/ajs","atlassian-nps-plugin/js/atlassian-nps-plugin","atlassian-nps-plugin/js/nps/config-manager-server","atlassian-nps-plugin/js/nps/product"],function(b,d,a,c){if(!c.getUserKey()){return}var e=function(){b.toInit(function(){d.init(a)})};if(c.waitBeforeStart){c.waitBeforeStart(e)}else{e()}});;
;
/* module-key = 'com.atlassian.jira.jira-client-analytics-plugin:client-analytics-runtime', location = '/client-analytics/project-api-resolver/project-api-resolver.js' */
define("client-analytics/project-api-resolver/project-api-resolver",["jquery","exports"],function(e,r){r.resolve=function(){return new Promise(function(r,t){window.JIRA&&window.JIRA.API&&window.JIRA.API.getSidebar?JIRA.API.getSidebar().done(function(){var t=JIRA.Issues&&JIRA.Issues.Api&&JIRA.Issues.Api.getSelectedIssueId;r({getCurrentProjectId:JIRA.API.Projects.getCurrentProjectId,getCurrentProjectType:JIRA.API.Projects.getCurrentProjectType,getCurrentIssueId:t||e.noop})}).fail(t):t()})}});;
;
/* module-key = 'com.atlassian.jira.jira-client-analytics-plugin:client-analytics-runtime', location = '/client-analytics/runtime/client-analytics-runtime.js' */
define("client-analytics/runtime/client-analytics-runtime",["jquery","jira/analytics","client-analytics/project-api-resolver/project-api-resolver","exports"],function(e,t,r,n){function i(e,t){var r=t.trigger.split(" "),n=r[0],i=r[1],c=Object.keys(t.properties||{}).map(function(e){var r=t.properties[e].split(" "),n=r[0],i=r[1];return{analyticEventPropertyName:e,elementAttribute:n,elementSelector:i}});return{analyticEventName:e,trigger:{eventType:n,selector:i},properties:c}}function c(e){return Object.keys(e).map(function(t){var r=e[t].events||{};return Object.keys(r).map(function(e){var n=r[e],c=["jira",t,e].join(".");return i(c,n)})}).reduce(function(e,t){return e.concat(t)},[])}function a(t){var r=e(t.elementSelector),n=u[t.elementAttribute];if(r.length&&n)return n(r)}function o(n){e(document).on(n.trigger.eventType,n.trigger.selector,function(){var e=n.analyticEventName,i={};n.properties.forEach(function(e){var t;t=a(e),t&&(i[e.analyticEventPropertyName]=t)}),r.resolve().then(function(r){var n=r.getCurrentProjectId(),c=r.getCurrentProjectType(),a=r.getCurrentIssueId();n&&(i.projectId=n),c&&(i.projectType=c),a&&(i.issueId=a),t.send({name:e,properties:i})}).catch(function(){t.send({name:e,properties:i})})})}var u={"value.length":function(e){var t=e.val();if(t)return t.length}};n.registerEvents=function(e){var t=c(e);t.forEach(o)}});;
;
/* module-key = 'com.atlassian.jira.jira-client-analytics-plugin:client-analytics-runtime-init', location = '/client-analytics/client-analytics-init.js' */
require(["jira/analytics/context-provider","client-analytics/runtime/client-analytics-runtime"],function(t,e){var i=t.getContext();i&&e.registerEvents(i.analyticsResource)});;
;
/* module-key = 'com.atlassian.jira.jira-client-analytics-plugin:logging-client', location = '/client-analytics/logging-client.js' */
define("jira/analytics/logging-client",["jquery","wrm/context-path","jira/featureflags/feature-manager"],function(a,n,t){function e(){return t.isFeatureEnabled(u)}var r=n()+"/rest/internal/2/log/unsafe/emau",u="jira.tracking.subproduct.and.url.emau";return{logEMAU:function(n,t,u){e()&&a.ajax({url:r,contentType:"application/json",type:"POST",data:JSON.stringify({eventData:{url:t,urlParams:u,subproduct:n}})})}}});;
;
/* module-key = 'com.atlassian.jira.jira-client-analytics-plugin:track-emau', location = '/client-analytics/track-emau.js' */
require(["jira/analytics/web-client","jira/analytics/logging-client","jquery"],function(n,i,t){t(document).ready(function(){n.startUIViewedEvent(function(n){i.logEMAU(n.subproduct,window.location.pathname,window.location.search)})})});;
;
/* module-key = 'com.pyxis.greenhopper.jira:gh-issue-type-whitelist', location = 'includes/js/rapid/analytics/register-software-issue-types.js' */
function _defineProperty(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}require(["jira/analytics/transformers/issue-type"],function(e){var r,t=(r={},_defineProperty(r,"\u0418\u0441\u0442\u043e\u0440\u0438\u044f","Story"),_defineProperty(r,"\u042d\u043f\u0438\u043a","Epic"),r);e.registerAll(t)});;
;
/* module-key = 'com.pyxis.greenhopper.jira:gh-analytics-tracker', location = 'includes/js/rapid/AnalyticsTracker.js' */
define("jira-agile/rapid/analytics-tracker",["require"],function(e){function a(e,a,r){if(i.isUndefined(e))throw new Error("You must specify a category");this.params={},this.params.category=e;var t=0;i.isUndefined(a)||(this.params.action=a,t++,i.isUndefined(r)||(this.params.label=r,t++)),this.requiredArgumentNames=["action","label","value"].slice(t),this.useAsync=!0}var i=e("underscore");return a.prototype.setAsync=function(e){return this.useAsync=e,this},a.prototype.trigger=function(){for(var e=i.clone(this.params),a=0;a<arguments.length&&!i.isUndefined(this.requiredArgumentNames[a]);a++)e[this.requiredArgumentNames[a]]=arguments[a];this._validateParams(e);var r="gh.analytics.async";AJS.$(AJS).trigger(r,e)},a.prototype._validateParams=function(e){var a=["category","action","label"];i.each(a,function(a){i.isUndefined(e[a])||i.isString(e[a])?i.isUndefined(e[a])&&(e[a]=""):e[a]=e[a].toString()}),i.each(["category","action"],function(a){e[a]=e[a].replace(/\s+/g,"")}),i.isUndefined(e.value)||(e.value=parseInt(e.value,10),isNaN(e.value)&&(e.value=void 0))},a}),AJS.namespace("GH.AnalyticsTracker",null,require("jira-agile/rapid/analytics-tracker"));;
;
/* module-key = 'com.pyxis.greenhopper.jira:gh-help-analytics', location = 'includes/js/rapid/ui/help/HelpAnalytics.js' */
AJS.$(function(){var e=require("jira-agile/rapid/analytics-tracker"),r=function(r){return new e(r).setAsync(!1)};AJS.$("#gh_view_help").click(function(e){return r("gh.gethelp").trigger("usermenu","docs"),n(AJS.$(this))}),AJS.$("#greenhopper-my-jira-home-enablement").click(function(e){return r("gh.myjirahome").trigger("usermenu","enabled"),n(AJS.$(this))}),AJS.$("#greenhopper-my-jira-home-enablement-ondemand").click(function(e){return r("gh.myjirahome").trigger("usermenu","set"),n(AJS.$(this))}),AJS.$("#greenhopper-my-jira-home-disablement-ondemand").click(function(e){return r("gh.myjirahome").trigger("usermenu","disable"),n(AJS.$(this))}),AJS.$("#greenhopper-my-jira-home-set").click(function(e){return r("gh.myjirahome").trigger("usermenu","set"),n(AJS.$(this))}),AJS.$("#beta_gh\\.configuration\\.rapid\\.removal").click(function(e){var n=AJS.$(this),t=n.attr("checked")?"on":"off";return r("gh.labs.feature").trigger("rapid_removal",t),!0}),AJS.$(document).delegate("#js-classic-link_lnk","click",function(e){return r("gh.agile.menu").trigger("classic"),!0});var n=function(e){return"_blank"==e.attr("target")||(setTimeout('document.location = "'+e.attr("href")+'"',100),!1)}});;
;
/* module-key = 'com.pyxis.greenhopper.jira:gh-help-analytics', location = 'includes/js/rapid/Analytics.js' */
"undefined"==typeof GH&&(window.GH={}),function(n,a,e,i){function t(){a(document).on(c,function(n,a){l(a)})}function l(a){var i={},t=a.category;e.isUndefined(a.action)||(t=t+"."+a.action),e.isUndefined(a.label)||(i.label=a.label),e.isUndefined(a.value)||(i.value=a.value),n.trigger("analytics",{name:t,data:i})}i.AnalyticsEnabled=!0;var c="gh.analytics.async";t()}(AJS,AJS.$,_,GH);;
;
/* module-key = 'com.pyxis.greenhopper.jira:gh-globalissueoperations', location = 'includes/js/gh-globalissueoperations.js' */
!function(){var r=require("jira-agile/rapid/analytics-tracker"),i=new r("gh.issueaction.gotorapidboard").setAsync(!1),e=require("jira/dialog/form-dialog"),a=require("jira/dialog/dialog-register"),o=e.extend({_performRedirect:function(r){i.trigger("direct"),window.location.href=r}}),n=new o({id:"gh-rapidboard-dialog",trigger:"a.issueaction-greenhopper-rapidboard-operation",ajaxOptions:function(){return a.getDefaultAjaxOptions.apply(this,arguments)}}),t=function(r,i){var e="",a=AJS.$(r);return a.hasClass("js-rapidboard-operation-sprint")?e="sprint.":a.hasClass("js-rapidboard-operation-issue")&&(e="issue."),e+=i};AJS.$(function(){AJS.$(document).on("simpleClick",".issueaction-greenhopper-rapidboard-operation",function(r){r.preventDefault();var e=t(r.currentTarget,"open");i.trigger(e),n.show()}),AJS.$(document).on("simpleClick",".js-select-rapidboard",function(r){var e=t(r.currentTarget,"chosen");i.trigger(e)})})}();;
;
/* module-key = 'com.pyxis.greenhopper.jira:gh-custom-field-pickers', location = 'includes/js/field/initFieldPickers.js' */
!function(e){function i(i){e(".js-epic-picker",i).each(function(){var i=e(this),n=new JIRA.EpicPicker({element:i});e(document).trigger(JIRA.EpicPicker.READY_EVENT,n)})}function n(i){e(".js-sprint-picker",i).each(function(){var i=e(this),n=new JIRA.SprintPicker({element:i});e(document).trigger(JIRA.SprintPicker.READY_EVENT,n)})}var r=require("jira/util/events/types");JIRA.bind(r.NEW_CONTENT_ADDED,function(e,r,t){t!==JIRA.CONTENT_ADDED_REASON.panelRefreshed&&(i(r),n(r))})}(AJS.$);;
;
/* module-key = 'com.pyxis.greenhopper.jira:gh-custom-field-pickers', location = 'includes/js/field/EpicPicker.js' */
!function(){"use strict";var e=require("jira/ajs/select/single-select");JIRA.EpicPicker=e.extend({init:function(e){function r(e){var r=!p();return{searchQuery:e,projectKey:AJS.$(g).attr("data-project-key"),maxResults:100,hideDone:r}}function t(e,r,t,i){e=AJS.escapeHTML(String(e)),r=AJS.escapeHTML(String(r)),t=t,i=AJS.escapeHTML(String(i));var n,o=i.toUpperCase(),s=e.toUpperCase(),a=r.toUpperCase(),o=(o+"").replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g,"\\$1"),c=new RegExp("("+o+")","gi"),l=s.search(c);l>-1&&(n=e.slice(l,l+i.length),e=e.replace(n,"<em>"+n+"</em>")),l=a.search(c),l>-1&&(n=r.slice(l,l+i.length),r=r.replace(n,"<em>"+n+"</em>"));var p=t?" &#8226; "+"\u0413\u043e\u0442\u043e\u0432\u043e":"";return e+" - <span class='epic-menu-metadata'>("+r+p+")</span>"}function i(e){if(!e||!e.epicLists||0===e.total)return[];for(var r=[],t=d.getQueryVal(),i=0,s=0;s<e.epicLists.length;s++){var a=e.epicLists[s],c=a.epicNames,l=o(s+1,a.listDescriptor);c.length>0&&(_.each(c,function(e){l.addItem(n(e,t))}),r.push(l)),i+=c.length}if(i>0){var h=new AJS.GroupDescriptor({weight:0,showLabel:!1,items:[new AJS.ItemDescriptor({label:t,highlighted:!0,styleClass:"ghx-epic-menu-header",customItem:!0,html:"<li><h5>"+AJS.format("\u041e\u0442\u043e\u0431\u0440\u0430\u0436\u0430\u0435\u0442\u0441\u044f \u0441\u043e\u0432\u043f\u0430\u0434\u0435\u043d\u0438\u0439 \u044d\u043f\u0438\u043a\u043e\u0432: {0} \u0438\u0437 {1}",i,e.total)+"</h5><label for='chkShowDoneEpic'><input type='checkbox' id='chkShowDoneEpic'"+(p()?" checked":"")+">"+"\u041f\u0440\u043e\u0441\u043c\u043e\u0442\u0440 \u0432\u044b\u043f\u043e\u043b\u043d\u0435\u043d\u043d\u044b\u0445 \u044d\u043f\u0438\u043a\u043e\u0432"+"</label></li>"})]});r.unshift(h)}return r}function n(e,r){var i=e.key,n=e.name,o=e.isDone,s=t(n,i,o,r);return new AJS.ItemDescriptor({value:"key:"+i,fieldText:n,label:s,html:s,allowDuplicate:!1,highlighted:!0})}function o(e,r){return new AJS.GroupDescriptor({weight:e,label:r,replace:!0})}function s(e,r,t){var i=AJS.$(g);i.siblings(".ghx-error").remove(),i.before(GH.tpl.rapid.notification.renderAuiMessage({message:"\u041e\u0448\u0438\u0431\u043a\u0430"+": "+t,type:"error",className:"ghx-error aui-ss"}))}function a(e){var r="",t=!1;return e&&e.length>0&&(r=AJS.format("\u042d\u043f\u0438\u043a \u0441 \u043a\u043b\u044e\u0447\u043e\u043c \u00ab{0}\u00bb \u043d\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442.",e),t=!0),{isError:t,message:r}}function c(e){var r,t;u.apply(d,[e]),e=e||AJS.$.trim(d.$field.val()),t=d.model.getDescriptor(e),!t&&d.$container.hasClass("aui-ss-editing")&&(r=a(e),r.isError?(d.options.errorMessage=r.message,d.showErrorMessage(e)):d.hideErrorMessage())}function l(){d._super(e),u=d.handleFreeInput,d.handleFreeInput=c;var r=require("jira/ajs/layer/inline-layer");d.dropdownController.bind(r.EVENTS.show,function(e,r){r.off("click",'.ghx-epic-menu-header label[for="chkShowDoneEpic"]',h),r.on("click",'.ghx-epic-menu-header label[for="chkShowDoneEpic"]',h)})}function p(){return"true"===localStorage.getItem("gh.epicpicker.showdone")}function h(e){e.preventDefault();var r=!p();return localStorage.setItem("gh.epicpicker.showdone",r),d.$field.click(),!1}var u,g=e.element,d=this;AJS.$.extend(e,{submitInputVal:!0,showDropdownButton:!0,removeDuplicates:!0,ajaxOptions:{url:contextPath+"/rest/greenhopper/1.0/epics",query:!0,data:r,formatResponse:i,error:s}});var m=this.setSelection;this.setSelection=function(e,r){e.properties.customItem||m.apply(this,arguments)},l()}}),JIRA.EpicPicker.READY_EVENT="gh.epic-picker.ready"}();;
;
/* module-key = 'com.pyxis.greenhopper.jira:gh-custom-field-pickers', location = 'includes/js/field/SprintPicker.js' */
JIRA.SprintPicker=AJS.SingleSelect.extend({init:function(e){function n(e){var n=h.apply(this,arguments);return n.find("a").append(GH.tpl.customfields.sprintpicker.renderSuggestionMeta(e.properties)),n}function t(e){var n,t=this.getSelectedDescriptor();e||t||p(null),o(),this.hideErrorMessage(),n=t?r(t):i(e),n.message&&(this.options.errorMessage=n.message,f.apply(this,arguments),this.$errorMessage.addClass("inline-edit-error")),n.needsScopeChangeWarning&&s()}function i(e){var n=null,t=!1;return e&&e.length>0?v?(n=AJS.format("{0} \u043d\u0435 \u044f\u0432\u043b\u044f\u0435\u0442\u0441\u044f \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u043c \u0438\u043c\u0435\u043d\u0435\u043c \u0441\u043f\u0440\u0438\u043d\u0442\u0430. \u0414\u0430\u043d\u043d\u0430\u044f \u0437\u0430\u0434\u0430\u0447\u0430 \u0431\u0443\u0434\u0435\u0442 \u0432\u043e\u0437\u0432\u0440\u0430\u0449\u0435\u043d\u0430 \u0432 \u0431\u044d\u043a\u043b\u043e\u0433.",e),v===m.ACTIVE&&(t=!0)):n=AJS.format("{0} \u043d\u0435 \u044f\u0432\u043b\u044f\u0435\u0442\u0441\u044f \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u043c \u0438\u043c\u0435\u043d\u0435\u043c \u0441\u043f\u0440\u0438\u043d\u0442\u0430.",e):v===m.ACTIVE&&(t=!0),{message:n,needsScopeChangeWarning:t}}function r(e){var n=!1;return v===m.ACTIVE?n=!!u()||x!=e.properties.value:v===m.FUTURE?e.properties.stateKey===m.ACTIVE&&(n=!0):v||e.properties.stateKey===m.ACTIVE&&(n=!0),{message:null,needsScopeChangeWarning:n}}function s(){if(!S){u()||(S=AJS.$(GH.tpl.rapid.notification.renderAuiMessage({type:"warning",className:"ghx-sprint-picker-scope-warning",icon:!0,title:"\u042d\u0442\u0430 \u043e\u043f\u0435\u0440\u0430\u0446\u0438\u044f \u0437\u0430\u0442\u0440\u0430\u0433\u0438\u0432\u0430\u0435\u0442 \u043e\u0431\u044a\u0435\u043c \u0441\u043f\u0440\u0438\u043d\u0442\u0430."})));var e=I.$container.closest(".inline-edit-fields");e.size()>0?u()?(S=AJS.$('<div class="ghx-estimate-scope-warning"></div>'),S.text("\u042d\u0442\u0430 \u043e\u043f\u0435\u0440\u0430\u0446\u0438\u044f \u0437\u0430\u0442\u0440\u0430\u0433\u0438\u0432\u0430\u0435\u0442 \u043e\u0431\u044a\u0435\u043c \u0441\u043f\u0440\u0438\u043d\u0442\u0430."),0===e.find(".field-group .ghx-estimate-scope-warning").length&&e.find(".field-group").append(S)):0===e.find(".field-group .ghx-estimate-scope-warning").length&&e.closest(".editable-field").append(S):(u()&&(S=AJS.$(GH.tpl.rapid.notification.renderAuiMessage({type:"warning",className:"ghx-sprint-picker-scope-warning",icon:!0,title:"\u042d\u0442\u0430 \u043e\u043f\u0435\u0440\u0430\u0446\u0438\u044f \u0437\u0430\u0442\u0440\u0430\u0433\u0438\u0432\u0430\u0435\u0442 \u043e\u0431\u044a\u0435\u043c \u0441\u043f\u0440\u0438\u043d\u0442\u0430."}))),0===I.$container.closest(".field-group .ghx-sprint-picker-scope-warning").length&&I.$container.closest(".field-group").append(S))}S.show()}function o(){S&&(S.remove(),S=null)}function a(e){if(!e.suggestions&&!e.allMatches)return[];var n=new AJS.GroupDescriptor({weight:0,label:"\u041f\u0440\u0435\u0434\u043b\u043e\u0436\u0435\u043d\u0438\u044f"}),t=new AJS.GroupDescriptor({weight:1,label:"\u0412\u0441\u0435 \u0441\u043f\u0440\u0438\u043d\u0442\u044b"});return _.each(l(e.suggestions),function(e){n.addItem(g(e,!0))}),_.each(l(e.allMatches),function(e){t.addItem(g(e,!1))}),[n,t]}function g(e,n){var t=AJS.escapeHTML(String(e.name));return new AJS.ItemDescriptor({value:e.id.toString(),label:e.name,html:t,stateKey:e.stateKey,boardName:e.boardName,allowDuplicate:!1,isSuggestion:n})}function l(e){return _.sortBy(e,function(e){return e.name.toLowerCase()})}function p(e){GH.SprintConfig&&AJS.$(GH).trigger("QuickEdit.fieldChange",{fieldId:GH.SprintConfig.getSprintFieldId(),fieldChangeData:{original:x,updated:e?e.properties.value:null}})}function d(){if(I._super(e),h=I.listController._renders.suggestion,f=I.showErrorMessage,I.listController._renders.suggestion=n,I.showErrorMessage=t,u()){var i=I.$container.closest(".inline-edit-fields"),r=i.size()>0;if(r){var s=w.parent().find("input");s.on("focus",function(){I.showErrorMessage()})}}w.bind("selected",function(e,n,t){u()&&r||t.showErrorMessage(t.getQueryVal()),p(n),I.showErrorMessage()}),I.suggestionsHandler=new J(I.options,I.model)}function c(e,n,t){var i=AJS.$(w);i.siblings(".ghx-error").remove(),i.before(GH.tpl.rapid.notification.renderAuiMessage({message:"\u041e\u0448\u0438\u0431\u043a\u0430"+": "+t,type:"error",className:"ghx-error aui-ss"}))}function u(){return GH&&GH.DetailsView}var h,f,S,m={ACTIVE:"ACTIVE",FUTURE:"FUTURE",CLOSED:"CLOSED"},A=10,w=e.element,v=w.data("saved-state"),x=w.data("saved-id"),I=this,J=AJS.SelectSuggestHandler.extend({formatSuggestions:function(e,n){return e=this._super(e,n),0===n.length&&e[e.length-1].footerText("\u041d\u0430\u0447\u043d\u0438\u0442\u0435 \u0432\u0432\u043e\u0434 \u0441\u043f\u0440\u0438\u043d\u0442\u043e\u0432."),e}});AJS.$.extend(e,{submitInputVal:!1,showDropdownButton:!0,removeOnUnSelect:!1,maxInlineResultsDisplayed:A,ajaxOptions:{url:contextPath+"/rest/greenhopper/1.0/sprint/picker",query:!0,formatResponse:a,error:c}}),d()}}),JIRA.SprintPicker.READY_EVENT="gh.sprint-picker.ready";;
;
/* module-key = 'com.pyxis.greenhopper.jira:gh-custom-field-pickers', location = 'includes/js/field/SprintPicker.soy' */
// This file was automatically generated from SprintPicker.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace GH.tpl.customfields.sprintpicker.
 */

if (typeof GH == 'undefined') { var GH = {}; }
if (typeof GH.tpl == 'undefined') { GH.tpl = {}; }
if (typeof GH.tpl.customfields == 'undefined') { GH.tpl.customfields = {}; }
if (typeof GH.tpl.customfields.sprintpicker == 'undefined') { GH.tpl.customfields.sprintpicker = {}; }


GH.tpl.customfields.sprintpicker.renderSuggestionMeta = function(opt_data, opt_ignored) {
  return '' + ((opt_data.boardName && ! opt_data.isSuggestion) ? '<span class=\'ghx-sprint-picker-meta\'> (' + GH.tpl.customfields.sprintpicker.renderMetaWithBoardName(opt_data) + ')</span>' : '<span class=\'ghx-sprint-picker-meta\'> (' + GH.tpl.customfields.sprintpicker.renderMetaWithoutBoardName(opt_data) + ')</span>');
};
if (goog.DEBUG) {
  GH.tpl.customfields.sprintpicker.renderSuggestionMeta.soyTemplateName = 'GH.tpl.customfields.sprintpicker.renderSuggestionMeta';
}


GH.tpl.customfields.sprintpicker.renderMetaWithoutBoardName = function(opt_data, opt_ignored) {
  return '' + ((opt_data.stateKey == 'ACTIVE') ? soy.$$escapeHtml('\u0410\u043a\u0442\u0438\u0432\u043d\u044b\u0439 \u0441\u043f\u0440\u0438\u043d\u0442') : (opt_data.stateKey == 'FUTURE') ? soy.$$escapeHtml('\u0411\u0443\u0434\u0443\u0449\u0438\u0439 \u0441\u043f\u0440\u0438\u043d\u0442') : '');
};
if (goog.DEBUG) {
  GH.tpl.customfields.sprintpicker.renderMetaWithoutBoardName.soyTemplateName = 'GH.tpl.customfields.sprintpicker.renderMetaWithoutBoardName';
}


GH.tpl.customfields.sprintpicker.renderMetaWithBoardName = function(opt_data, opt_ignored) {
  return '' + ((opt_data.stateKey == 'ACTIVE') ? soy.$$escapeHtml(AJS.format('\u0410\u043a\u0442\u0438\u0432\u043d\u044b\u0439 \u0441\u043f\u0440\u0438\u043d\u0442 \u0432 {0}',opt_data.boardName)) : (opt_data.stateKey == 'FUTURE') ? soy.$$escapeHtml(AJS.format('\u0411\u0443\u0434\u0443\u0449\u0438\u0439 \u0441\u043f\u0440\u0438\u043d\u0442 \u0432 {0}',opt_data.boardName)) : '');
};
if (goog.DEBUG) {
  GH.tpl.customfields.sprintpicker.renderMetaWithBoardName.soyTemplateName = 'GH.tpl.customfields.sprintpicker.renderMetaWithBoardName';
}
;
;
/* module-key = 'com.pyxis.greenhopper.jira:gh-custom-field-pickers', location = 'includes/js/rapid/ui/notification/Notification.js' */
!function(){AJS.namespace("GH.Notification"),GH.Notification.autoHideEnabled=!0;var e=Object.freeze({INFO:"info",SUCCESS:"success"});GH.Notification.showErrors=function(e,i){var t=GH.Notification.prepareNotificationDiv(),a=GH.tpl.rapid.notification.renderErrorMessages(e);"undefined"==typeof i&&(i=!0),AJS.messages.error(t,{title:"\u041e\u0448\u0438\u0431\u043a\u0430",body:a,closeable:i}),GH.Notification._divStyle(t)&&t.css(GH.Notification._divStyle(t)),t.show()},GH.Notification.showError=function(e,i,t){var a=GH.Notification.prepareNotificationDiv();"undefined"==typeof t&&(t=!0),AJS.messages.error(a,{title:e,body:i,closeable:t}),GH.Notification._divStyle(a)&&a.css(GH.Notification._divStyle(a)),a.show()},GH.Notification.showWarnings=function(e,i){var t={autoHide:!0,autoHideDelay:5e3,preRendered:!1,showTitle:!1};i=_.extend({},t,i);var a,o=GH.Notification.prepareNotificationDiv();a=i.preRendered?e:GH.tpl.rapid.notification.renderErrorMessages({errors:e});var s={body:a,closeable:!0};i.showTitle&&(s.title="\u041f\u0440\u0435\u0434\u0443\u043f\u0440\u0435\u0436\u0434\u0435\u043d\u0438\u0435"),AJS.messages.warning(o,s),GH.Notification._divStyle(o)&&o.css(GH.Notification._divStyle(o)),o.show(),i.autoHide&&GH.Notification.autoHideEnabled&&setTimeout(function(){o.hide()},i.autoHideDelay)},GH.Notification.showWarning=function(e){var i=GH.Notification.prepareNotificationDiv();AJS.messages.warning(i,{body:e,closeable:!0}),GH.Notification._divStyle(i)&&i.css(GH.Notification._divStyle(i)),i.show()},GH.Notification.clear=function(){GH.Notification.prepareNotificationDiv().hide()},GH.Notification.handleDateFormatMismatchError=function(e){var i='<a href="'+GH.Ajax.CONTEXT_PATH+'/secure/admin/AdvancedApplicationProperties.jspa">';i+="\u0414\u043e\u043f\u043e\u043b\u043d\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0435 \u043d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438",i+="</a>";var t=AJS.format("\u041f\u043e\u0445\u043e\u0436\u0435, \u0447\u0442\u043e \u043f\u0430\u0440\u0430\u043c\u0435\u0442\u0440\u044b \u043d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438 \u0444\u043e\u0440\u043c\u0430\u0442\u0430 \u0434\u0430\u0442\u044b \u0432 Jira \u0443\u0441\u0442\u0430\u043d\u043e\u0432\u043b\u0435\u043d\u044b \u043d\u0435\u043a\u043e\u0440\u0440\u0435\u043a\u0442\u043d\u043e. \u041f\u0440\u043e\u0432\u0435\u0440\u044c\u0442\u0435 {0} \u0438 \u0443\u0431\u0435\u0434\u0438\u0442\u0435\u0441\u044c, \u0447\u0442\u043e \u0432\u044b\u0445\u043e\u0434\u043d\u044b\u0435 \u0434\u0430\u043d\u043d\u044b\u0435 \u043f\u0430\u0440\u0430\u043c\u0435\u0442\u0440\u043e\u0432 \u00abjira.date.time.picker.java.format\u00bb \u0438 \u00abjira.date.time.picker.javascript.format\u00bb \u0441\u043e\u0432\u043f\u0430\u0434\u0430\u044e\u0442.",i);GH.Notification.showWarnings(t,{autoHide:!1,preRendered:!0})},GH.Notification.auiMessage=function(e){var i=_.extend({type:"generic",icon:!0,messageHtml:!1},e);return GH.tpl.rapid.notification.renderAuiMessage({type:i.type,title:i.title,icon:i.icon,messageHtml:i.messageHtml,message:i.message})},GH.Notification.Handler={_defaultNotificationHandler:function(){var e=AJS.$("<div/>");return AJS.$(".global-msg").remove(),e.addClass("global-msg").appendTo("body"),e},_defaultDivStyleHandler:function(e){return{marginLeft:-e.outerWidth()/2,top:20}},setCustomDivStyleHandler:function(e){this._customDivStyleHandler=e,this._useDefault=!1},_useDefault:!0,setCustomNotificationHandler:function(e){this._customNotificationHandler=e,this._useDefault=!1},removeCustomHandlers:function(){this._useDefault=!0},getNotificationHandler:function(){return this._useDefault||null==this._customNotificationHandler?this._defaultNotificationHandler:this._customNotificationHandler},getDivStyleHandler:function(){return this._useDefault||null==this._customDivStyleHandler?this._defaultDivStyleHandler:this._customDivStyleHandler}},GH.Notification._divStyle=function(e){var i=GH.Notification.Handler.getDivStyleHandler();return i(e)},GH.Notification.prepareNotificationDiv=function(){var e=GH.Notification.Handler.getNotificationHandler();return e()},GH.Notification.showSuccess=function(t,a){i(e.SUCCESS,t,a)},GH.Notification.showInfo=function(t,a){i(e.INFO,t,a)};var i=function(e,i,t){clearTimeout(GH.Notification.current);var a={timeout:5e3,closeable:!0,shadowed:!0};t=_.extend(a,t,{body:i});var o=GH.Notification.prepareNotificationDiv();AJS.messages[e](o,t),GH.Notification._divStyle(o)&&o.css(GH.Notification._divStyle(o)),o.show(),GH.Notification.autoHideEnabled&&(GH.Notification.current=setTimeout(function(){AJS.$(".global-msg").hide()},t.timeout))};GH.Notification.showIssueMessage=function(e){var i=JIRA.SessionStorage,t=null,a=null;e||(e=i.getItem("selectedIssueId")),e&&(a=i.getItem("selectedIssueKey"),t=i.getItem("selectedIssueMsg"),GH.Notification.showIssueMessageImpl(e,t,a)),i.removeItem("selectedIssueId"),i.removeItem("selectedIssueKey"),i.removeItem("selectedIssueMsg")},GH.Notification.showIssueMessageImpl=function(e,i,t){i||(i="thanks_issue_updated");var a=AJS.params[i];a&&t&&(a=AJS.format(a,t),GH.Notification.showSuccess(a))},GH.Notification.addPageLoadMessage=function(e,i){var t=GH.storage.get("gh.pageloadmessages",!0)||[];t.push({message:e,type:i||"success"}),GH.storage.put("gh.pageloadmessages",t,!0)},GH.Notification._displayPageLoadMessages=function(){var e=GH.storage.get("gh.pageloadmessages",!0);if(e){var i=e[0].type,t="";switch(_.each(e,function(e){t.length>0&&(t+="<br>"),t+=e.message}),i){case"warning":GH.Notification.showWarning(t);break;case"success":default:GH.Notification.showSuccess(t)}GH.storage.put("gh.pageloadmessages",null,!0)}};var t=null;GH.Notification.showBoardUpdatedMessage=function(){var e=require("jira/featureflags/simplified-ux-feature-manager"),i=void 0,a=AJS.$.Deferred();if(e.isAdg3StylesEnabled()){if(0===AJS.$(".aui-flag[aria-hidden=false]").length){var o=GH.tpl.rapid.notification.renderGHtvMessage({showIgnore:!1});t=AJS.flag({type:"info",body:o}),i=AJS.$(o)}}else GH.Notification.clearBoardUpdatedMessage(),i=AJS.$(GH.tpl.rapid.notification.renderGHtvMessage({showIgnore:!0})).appendTo("#gh"),i.data("deferred",a);if(e.isAdg3StylesEnabled()){var s=function(e){e.preventDefault(),GH.Notification.clearBoardUpdatedMessage(),a.resolve()};AJS.$(".js-refresh-now").off("click",s).click(s)}else i.find(".js-refresh-now").click(function(e){e.preventDefault(),i.removeData("deferred"),GH.Notification.clearBoardUpdatedMessage(),a.resolve()}),i.find(".js-ignore-refresh").click(function(e){e.preventDefault(),GH.Notification.clearBoardUpdatedMessage()});return a.promise()},GH.Notification.clearBoardUpdatedMessage=function(){var e=require("jira/featureflags/simplified-ux-feature-manager");if(e.isAdg3StylesEnabled())t&&t.close();else{var i=AJS.$("#ghx-update-message");if(i.length){var a=i.data("deferred");a&&a.reject&&a.reject(),i.remove()}}},GH.Notification.isBoardUpdatedMessageVisible=function(){var e=AJS.$("#ghx-update-message");return e.length>0},AJS.$(document).ready(function(){GH.Notification.showIssueMessage(),GH.storage&&GH.Notification._displayPageLoadMessages()})}();;
;
/* module-key = 'com.pyxis.greenhopper.jira:gh-custom-field-pickers', location = 'includes/js/rapid/ui/notification/Notification.soy' */
// This file was automatically generated from Notification.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace GH.tpl.rapid.notification.
 */

if (typeof GH == 'undefined') { var GH = {}; }
if (typeof GH.tpl == 'undefined') { GH.tpl = {}; }
if (typeof GH.tpl.rapid == 'undefined') { GH.tpl.rapid = {}; }
if (typeof GH.tpl.rapid.notification == 'undefined') { GH.tpl.rapid.notification = {}; }


GH.tpl.rapid.notification.renderErrorMessages = function(opt_data, opt_ignored) {
  var output = '';
  if (opt_data.errors.length > 1) {
    output += '<ul>';
    var errorList6 = opt_data.errors;
    var errorListLen6 = errorList6.length;
    for (var errorIndex6 = 0; errorIndex6 < errorListLen6; errorIndex6++) {
      var errorData6 = errorList6[errorIndex6];
      output += '<li>' + ((errorData6.noAutoescape) ? soy.$$filterNoAutoescape(errorData6.message) : soy.$$escapeHtml(errorData6.message)) + '</li>';
    }
    output += '</ul>';
  } else {
    var errorList18 = opt_data.errors;
    var errorListLen18 = errorList18.length;
    for (var errorIndex18 = 0; errorIndex18 < errorListLen18; errorIndex18++) {
      var errorData18 = errorList18[errorIndex18];
      output += '<p>' + ((errorData18.noAutoescape) ? soy.$$filterNoAutoescape(errorData18.message) : soy.$$escapeHtml(errorData18.message)) + '</p>';
    }
  }
  return output;
};
if (goog.DEBUG) {
  GH.tpl.rapid.notification.renderErrorMessages.soyTemplateName = 'GH.tpl.rapid.notification.renderErrorMessages';
}


GH.tpl.rapid.notification.renderContextualErrors = function(opt_data, opt_ignored) {
  var output = '';
  var errorList29 = opt_data.errors;
  var errorListLen29 = errorList29.length;
  for (var errorIndex29 = 0; errorIndex29 < errorListLen29; errorIndex29++) {
    var errorData29 = errorList29[errorIndex29];
    output += '<div class="ghx-error">' + soy.$$escapeHtml(errorData29.message) + '</div>';
  }
  return output;
};
if (goog.DEBUG) {
  GH.tpl.rapid.notification.renderContextualErrors.soyTemplateName = 'GH.tpl.rapid.notification.renderContextualErrors';
}


GH.tpl.rapid.notification.renderMessageHolder = function(opt_data, opt_ignored) {
  return '<div class="ghx-body-warning">' + soy.$$escapeHtml(AJS.format('\u042d\u0442\u0430 \u0432\u0435\u0440\u0441\u0438\u044f {0} \u043d\u0435 \u043f\u043e\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442\u0441\u044f.',opt_data.browser)) + ' <a href="' + soy.$$escapeHtml(opt_data.docsUrl) + '">' + soy.$$escapeHtml('\u0421\u043c\u043e\u0442\u0440\u0438\u0442\u0435 \u0432 \u043d\u0430\u0448\u0435\u0439 \u0434\u043e\u043a\u0443\u043c\u0435\u043d\u0442\u0430\u0446\u0438\u0438 \u0441\u043f\u0438\u0441\u043e\u043a \u043f\u043e\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u043c\u044b\u0445 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u043e\u0432.') + '</a></div>';
};
if (goog.DEBUG) {
  GH.tpl.rapid.notification.renderMessageHolder.soyTemplateName = 'GH.tpl.rapid.notification.renderMessageHolder';
}


GH.tpl.rapid.notification.renderAuiMessage = function(opt_data, opt_ignored) {
  return '<div id="ghx-global-message" class="aui-message ' + soy.$$escapeHtml(opt_data.type) + ((opt_data.className) ? ' ' + soy.$$escapeHtml(opt_data.className) : '') + '">' + ((opt_data.title) ? '<p class="title">' + ((opt_data.icon) ? '<span class="aui-icon icon-' + soy.$$escapeHtml(opt_data.type) + '"></span>' : '') + '<strong>' + soy.$$escapeHtml(opt_data.title) + '</strong></p>' : '') + ((opt_data.message) ? '<p>' + ((! opt_data.title && opt_data.icon) ? '<span class="aui-icon icon-' + soy.$$escapeHtml(opt_data.type) + '"></span>' : '') + ((opt_data.messageHtml) ? soy.$$filterNoAutoescape(opt_data.message) : soy.$$escapeHtml(opt_data.message)) + '</p>' : '') + '</div>';
};
if (goog.DEBUG) {
  GH.tpl.rapid.notification.renderAuiMessage.soyTemplateName = 'GH.tpl.rapid.notification.renderAuiMessage';
}


GH.tpl.rapid.notification.renderGHtvMessage = function(opt_data, opt_ignored) {
  opt_data = opt_data || {};
  return '<div id="ghx-update-message" class="ghx-tv-message"><p>' + soy.$$escapeHtml('\u0414\u043e\u0441\u043a\u0430 \u043e\u0431\u043d\u043e\u0432\u043b\u0435\u043d\u0430') + ': <a href="" class="js-refresh-now">' + soy.$$escapeHtml('\u041e\u0431\u043d\u043e\u0432\u0438\u0442\u044c') + '</a>' + ((opt_data.showIgnore) ? '<span class="ghx-divider">&bull;</span><a href="" class="js-ignore-refresh">' + soy.$$escapeHtml('\u0418\u0433\u043d\u043e\u0440\u0438\u0440\u043e\u0432\u0430\u0442\u044c') + '</a>' : '') + '</p></div>';
};
if (goog.DEBUG) {
  GH.tpl.rapid.notification.renderGHtvMessage.soyTemplateName = 'GH.tpl.rapid.notification.renderGHtvMessage';
}
;
;
/* module-key = 'com.pyxis.greenhopper.jira:gh-custom-field-pickers', location = 'includes/js/field/SprintMultiselect.js' */
!function(){"use strict";var e=require("jira/util/events/types");JIRA.bind(e.NEW_CONTENT_ADDED,function(e,t){function n(e){var t=new AJS.GroupDescriptor({weight:0,label:"\u041f\u0440\u0435\u0434\u043b\u043e\u0436\u0435\u043d\u0438\u044f",items:_.map(e.suggestions,s)}),n=new AJS.GroupDescriptor({weight:1,label:"\u0412\u0441\u0435 \u0441\u043f\u0440\u0438\u043d\u0442\u044b",items:_.map(e.allMatches,s)});return[t,n]}function s(e){e.date=moment(e.date,"YYYY-MM-DDTHH:mm:ssZ").format("LL");var t=GH.tpl.customfields.sprintmultiselect.renderSuggestionMeta(e);return new AJS.ItemDescriptor({value:e.id,label:e.name,html:t,title:GH.tpl.customfields.sprintmultiselect.renderTooltip(e),date:e.date,boardName:e.boardName,stateKey:e.stateKey,highlighted:!0,allowDuplicate:!1})}AJS.$(".js-sprint-checkboxmultiselect",t).each(function(){var e=new AJS.CheckboxMultiSelect({element:this,maxInlineResultsDisplayed:5,content:"ajax",removeOnUnSelect:!0,ajaxOptions:{url:AJS.contextPath()+"/rest/greenhopper/1.0/sprint/picker",error:function(){e._setSuggestions([])},data:{excludeCompleted:!1},query:!0,formatResponse:n},suggestionsHandler:GH.SprintSuggestHandler})})})}();;
;
/* module-key = 'com.pyxis.greenhopper.jira:gh-custom-field-pickers', location = 'includes/js/field/SprintMultiselect.soy' */
// This file was automatically generated from SprintMultiselect.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace GH.tpl.customfields.sprintmultiselect.
 */

if (typeof GH == 'undefined') { var GH = {}; }
if (typeof GH.tpl == 'undefined') { GH.tpl = {}; }
if (typeof GH.tpl.customfields == 'undefined') { GH.tpl.customfields = {}; }
if (typeof GH.tpl.customfields.sprintmultiselect == 'undefined') { GH.tpl.customfields.sprintmultiselect = {}; }


GH.tpl.customfields.sprintmultiselect.renderSuggestionMeta = function(opt_data, opt_ignored) {
  return '<div>' + soy.$$escapeHtml(opt_data.name) + '</div><div><span class=\'ghx-sprint-multiselect-meta\'> ' + ((opt_data.boardName) ? GH.tpl.customfields.sprintmultiselect.renderMetaWithBoardName(opt_data) : GH.tpl.customfields.sprintmultiselect.renderMetaWithoutBoardName(opt_data)) + '</span></div>';
};
if (goog.DEBUG) {
  GH.tpl.customfields.sprintmultiselect.renderSuggestionMeta.soyTemplateName = 'GH.tpl.customfields.sprintmultiselect.renderSuggestionMeta';
}


GH.tpl.customfields.sprintmultiselect.renderMetaWithoutBoardName = function(opt_data, opt_ignored) {
  return '' + ((opt_data.stateKey == 'ACTIVE') ? soy.$$escapeHtml('\u0410\u043a\u0442\u0438\u0432\u043d\u043e') : (opt_data.stateKey == 'FUTURE') ? soy.$$escapeHtml('\u0411\u0443\u0434\u0443\u0449\u0435\u0435') : (opt_data.stateKey == 'CLOSED') ? soy.$$escapeHtml('\u0417\u0430\u043a\u0440\u044b\u0442\u043e') : '');
};
if (goog.DEBUG) {
  GH.tpl.customfields.sprintmultiselect.renderMetaWithoutBoardName.soyTemplateName = 'GH.tpl.customfields.sprintmultiselect.renderMetaWithoutBoardName';
}


GH.tpl.customfields.sprintmultiselect.renderMetaWithBoardName = function(opt_data, opt_ignored) {
  return '' + ((opt_data.stateKey == 'ACTIVE') ? soy.$$escapeHtml(AJS.format('\u0410\u043a\u0442\u0438\u0432 \xb7 {0}',opt_data.boardName)) : (opt_data.stateKey == 'FUTURE') ? soy.$$escapeHtml(AJS.format('\u0411\u0443\u0434\u0443\u0449\u0435\u0435 \xb7 {0}',opt_data.boardName)) : (opt_data.stateKey == 'CLOSED') ? soy.$$escapeHtml(AJS.format('\u0417\u0430\u043a\u0440\u044b\u0442\u043e \xb7 {0}',opt_data.boardName)) : '');
};
if (goog.DEBUG) {
  GH.tpl.customfields.sprintmultiselect.renderMetaWithBoardName.soyTemplateName = 'GH.tpl.customfields.sprintmultiselect.renderMetaWithBoardName';
}


GH.tpl.customfields.sprintmultiselect.renderTooltip = function(opt_data, opt_ignored) {
  return '' + ((opt_data.stateKey == 'ACTIVE') ? soy.$$escapeHtml(AJS.format('\u0417\u0430\u043f\u0443\u0441\u043a: {0}',opt_data.date)) : (opt_data.stateKey == 'FUTURE') ? soy.$$escapeHtml('\u0411\u0443\u0434\u0443\u0449\u0435\u0435') : (opt_data.stateKey == 'CLOSED') ? soy.$$escapeHtml(AJS.format('\u0414\u0430\u0442\u0430 \u0437\u0430\u043a\u0440\u044b\u0442\u0438\u044f: {0}',opt_data.date)) : '');
};
if (goog.DEBUG) {
  GH.tpl.customfields.sprintmultiselect.renderTooltip.soyTemplateName = 'GH.tpl.customfields.sprintmultiselect.renderTooltip';
}
;
;
/* module-key = 'com.pyxis.greenhopper.jira:gh-custom-field-pickers', location = 'includes/js/field/SprintSuggestHandler.js' */
function prepareSelectedDescriptors(e){_.each(e,function(e){var t=JSON.parse(e.properties.meta);t.date=moment(t.date).format("LL"),e.properties.title=GH.tpl.customfields.sprintmultiselect.renderTooltip(t),e.properties.html=GH.tpl.customfields.sprintmultiselect.renderSuggestionMeta(t)})}define("includes/js/field/sprint-suggest-handler",["jira/ajs/select/suggestions/checkbox-multi-select-suggest-handler"],function(e){return e.extend({formatSuggestions:function(e,t){var r=this.model.getDisplayableSelectedDescriptors();prepareSelectedDescriptors(r);var s=function(e){var t;for(t in r)if(r[t].properties.value===e.properties.value.toString())return!1;return!0};return e=_.map(e,function(e){var t=_.filter(e.properties.items,s);return e.properties.items=t,e}),this._super(e,t)}})}),AJS.namespace("GH.SprintSuggestHandler",null,require("includes/js/field/sprint-suggest-handler"));;
;
/* module-key = 'com.pyxis.greenhopper.jira:gh-custom-field-pickers', location = 'includes/js/field/EpicLinkMultiselect.js' */
require(["require"],function(e){function t(e){return 0!==e.indexOf("project")?"":i(e).trim()}function i(e){function t(e){var t=e.match(/\bproject\s*=\s*(\S+)/i);return t?t[1]:null}function i(e){var t=e.match(/\bproject\s+in\s+\((.*?)\)/i);return t?t[1]:null}return t(e)||i(e)}var n=e("jquery"),r=e("underscore"),s=e("jira/util/events/types");JIRA.bind(s.NEW_CONTENT_ADDED,function(e,i){var s=n("#jql",this).val();i.find(".js-epiclink-checkboxmultiselect").each(function(){var e=new AJS.CheckboxMultiSelect({element:this,matchingStrategy:"(^|.*?(.*))({0})(.*)",maxInlineResultsDisplayed:5,content:"ajax",removeOnUnSelect:!0,ajaxOptions:{url:AJS.contextPath()+"/rest/greenhopper/1.0/epics",error:function(){e._setSuggestions([])},data:{searchQuery:"",projectKey:t(s),filterEpicsByGivenProjects:!0,maxResults:100},query:!0,minQueryLength:0,formatResponse:function(e){var t=[];if(t.push(new AJS.GroupDescriptor({weight:1,items:[new AJS.ItemDescriptor({highlighted:!0,label:"\u041d\u0435\u0442 \u0441\u0441\u044b\u043b\u043a\u0438 \u043d\u0430 \u044d\u043f\u0438\u043a",value:"EMPTY",title:"EMPTY"})]})),!e||!e.epicLists||0===e.total)return t;for(var i=0;i<e.epicLists.length;i++){var n=e.epicLists[i],s=n.epicNames,c=new AJS.GroupDescriptor({label:n.listDescriptor,weight:i});s.length>0&&(r.each(s,function(e){c.addItem(new AJS.ItemDescriptor({highlighted:!0,label:e.name+" - ("+e.key+")",value:e.key,title:e.key}))}),t.push(c))}return t}},suggestionsHandler:GH.EpicLinkSuggestHandler})})})});;
;
/* module-key = 'com.pyxis.greenhopper.jira:gh-custom-field-pickers', location = 'includes/js/field/EpicLinkSuggestHandler.js' */
define("includes/js/field/epic-link-suggest-handler",["jira/ajs/select/suggestions/checkbox-multi-select-suggest-handler"],function(e){return e.extend({formatSuggestions:function(e,r){var i=this.model.getDisplayableSelectedDescriptors(),t=function(e){var r;for(r in i)if(i[r].properties.value===e.properties.value.toString())return!1;return!0};return e=_.map(e,function(e){var r=_.filter(e.properties.items,t);return e.properties.items=r,e}),this._super(e,r)}})}),AJS.namespace("GH.EpicLinkSuggestHandler",null,require("includes/js/field/epic-link-suggest-handler"));;
;
/* module-key = 'com.pyxis.greenhopper.jira:project-template-resources', location = '/projecttemplates/soy/ProjectTemplates.soy' */
// This file was automatically generated from ProjectTemplates.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace GH.tpl.projecttemplates.
 */

if (typeof GH == 'undefined') { var GH = {}; }
if (typeof GH.tpl == 'undefined') { GH.tpl = {}; }
if (typeof GH.tpl.projecttemplates == 'undefined') { GH.tpl.projecttemplates = {}; }


GH.tpl.projecttemplates.simpleProjectInfoPage = function(opt_data, opt_ignored) {
  return '' + GH.tpl.projecttemplates.simpleInfoDialog({description: '\u0417\u0430\u043f\u0443\u0441\u0442\u0438\u0442\u0435 \u0440\u0430\u0431\u043e\u0442\u0443 \u0441\u0432\u043e\u0435\u0439 \u043a\u043e\u043c\u0430\u043d\u0434\u044b \u043e\u043f\u0435\u0440\u0430\u0442\u0438\u0432\u043d\u043e \u043f\u0440\u0438 \u043f\u043e\u043c\u043e\u0449\u0438 \u044d\u0442\u043e\u0439 \u0431\u0430\u0437\u043e\u0432\u043e\u0439 \u043a\u043e\u043d\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u0438.', workflowScreenshotClass: 'simple-workflow-screenshot'});
};
if (goog.DEBUG) {
  GH.tpl.projecttemplates.simpleProjectInfoPage.soyTemplateName = 'GH.tpl.projecttemplates.simpleProjectInfoPage';
}


GH.tpl.projecttemplates.agilityProjectInfoPage = function(opt_data, opt_ignored) {
  return '<div><div class="top-panel"><p>' + soy.$$escapeHtml('\u0417\u0430\u043f\u0443\u0441\u0442\u0438\u0442\u0435 \u0440\u0430\u0431\u043e\u0442\u0443 \u0441\u0432\u043e\u0435\u0439 \u043a\u043e\u043c\u0430\u043d\u0434\u044b \u043e\u043f\u0435\u0440\u0430\u0442\u0438\u0432\u043d\u043e \u043f\u0440\u0438 \u043f\u043e\u043c\u043e\u0449\u0438 \u044d\u0442\u043e\u0439 \u0431\u0430\u0437\u043e\u0432\u043e\u0439 \u043a\u043e\u043d\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u0438.') + '</p></div><div class="left-panel"><h6>' + soy.$$escapeHtml('\u0422\u0438\u043f\u044b \u0437\u0430\u0434\u0430\u0447') + '</h6><ul class="project-template-issuetype-list" ><li><span class="issuetype-list-label"><span class="issuetype-icon story"></span><span class="issuetype-name">' + soy.$$escapeHtml('\u0418\u0441\u0442\u043e\u0440\u0438\u044f') + '</span></span></li></ul></div><div class="right-panel"><h6>' + soy.$$escapeHtml('\u0420\u0430\u0431\u043e\u0447\u0438\u0439 \u043f\u0440\u043e\u0446\u0435\u0441\u0441') + '</h6><div class="workflow simple-workflow-screenshot"></div></div></div>';
};
if (goog.DEBUG) {
  GH.tpl.projecttemplates.agilityProjectInfoPage.soyTemplateName = 'GH.tpl.projecttemplates.agilityProjectInfoPage';
}


GH.tpl.projecttemplates.kanbanInfoPageJira7 = function(opt_data, opt_ignored) {
  return '' + GH.tpl.projecttemplates.templateInfoDialog({description: '\u0418\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0439\u0442\u0435 \u0434\u0430\u043d\u043d\u044b\u0439 \u043f\u0440\u043e\u0435\u043a\u0442 \u0434\u043b\u044f \u043e\u043f\u0442\u0438\u043c\u0438\u0437\u0430\u0446\u0438\u0438 \u0431\u0438\u0437\u043d\u0435\u0441-\u043f\u0440\u043e\u0446\u0435\u0441\u0441\u043e\u0432 \u0432 \u043f\u0440\u043e\u0435\u043a\u0442\u0435 \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u043a\u0438. \u0414\u043e\u0431\u0430\u0432\u043b\u044f\u0439\u0442\u0435 \u043e\u0433\u0440\u0430\u043d\u0438\u0447\u0435\u043d\u0438\u044f \u043f\u043e \u043d\u0435\u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043d\u043d\u044b\u043c \u043e\u043f\u0435\u0440\u0430\u0446\u0438\u044f\u043c, \u0430\u043d\u0430\u043b\u0438\u0437\u0438\u0440\u0443\u0439\u0442\u0435 \u0432\u0440\u0435\u043c\u044f, \u0437\u0430\u0442\u0440\u0430\u0447\u0438\u0432\u0430\u0435\u043c\u043e\u0435 \u043d\u0430 \u0432\u044b\u043f\u043e\u043b\u043d\u0435\u043d\u0438\u0435 \u0437\u0430\u0434\u0430\u0447, \u043d\u0430\u0445\u043e\u0434\u0438\u0442\u0435 \u0443\u0437\u043a\u0438\u0435 \u043c\u0435\u0441\u0442\u0430 \u0432 \u043f\u0440\u043e\u0446\u0435\u0441\u0441\u0430\u0445 \u0438 \u0442.\xa0\u0434. \u0414\u0430\u043d\u043d\u044b\u0439 \u043f\u0440\u043e\u0435\u043a\u0442 \u0432\u043a\u043b\u044e\u0447\u0430\u0435\u0442 \u0434\u043e\u0441\u043a\u0443 Kanban, \u0431\u0430\u0437\u043e\u0432\u044b\u0439 \u0431\u0438\u0437\u043d\u0435\u0441-\u043f\u0440\u043e\u0446\u0435\u0441\u0441 Agile \u0438 \u043a\u043e\u043d\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u044e \u0442\u0438\u043f\u0430 \u0437\u0430\u0434\u0430\u0447\u0438, \u043a\u043e\u0442\u043e\u0440\u0443\u044e \u043c\u043e\u0436\u043d\u043e \u0438\u0437\u043c\u0435\u043d\u0438\u0442\u044c \u043f\u043e\u0437\u0434\u043d\u0435\u0435.', extraIssueTypes: '<li><span class="issuetype-list-label"><span class="issuetype-icon story"></span><span class="issuetype-name">' + soy.$$escapeHtml('\u0418\u0441\u0442\u043e\u0440\u0438\u044f') + '</span></span></li><li><span class="issuetype-list-label"><span class="issuetype-icon epic"></span><span class="issuetype-name">' + soy.$$escapeHtml('\u042d\u043f\u0438\u043a') + '</span></span></li>', workflowScreenshotClass: 'kanban-workflow-screenshot'});
};
if (goog.DEBUG) {
  GH.tpl.projecttemplates.kanbanInfoPageJira7.soyTemplateName = 'GH.tpl.projecttemplates.kanbanInfoPageJira7';
}


GH.tpl.projecttemplates.scrumInfoPageJira7 = function(opt_data, opt_ignored) {
  return '' + GH.tpl.projecttemplates.templateInfoDialog({description: '\u0418\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0439\u0442\u0435 \u0434\u0430\u043d\u043d\u044b\u0439 \u043f\u0440\u043e\u0435\u043a\u0442 \u0434\u043b\u044f \u0443\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u044f \u043e\u043f\u0435\u0440\u0430\u0446\u0438\u044f\u043c\u0438 \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u043a\u0438 \u0434\u043b\u044f Agile. \u0421\u043e\u0437\u0434\u0430\u0432\u0430\u0439\u0442\u0435 \u0431\u044d\u043a\u043b\u043e\u0433, \u043e\u0440\u0433\u0430\u043d\u0438\u0437\u0443\u0439\u0442\u0435 \u043e\u043f\u0435\u0440\u0430\u0446\u0438\u0438 \u0432 \u0432\u0438\u0434\u0435 \u0441\u043f\u0440\u0438\u043d\u0442\u043e\u0432, \u043e\u0442\u0441\u043b\u0435\u0436\u0438\u0432\u0430\u0439\u0442\u0435 \u043f\u0440\u043e\u0433\u0440\u0435\u0441\u0441 \u043f\u043e\u0441\u0440\u0435\u0434\u0441\u0442\u0432\u043e\u043c \u043e\u0442\u0447\u0435\u0442\u043e\u0432 \u0438 \u0442.\xa0\u0434. \u0414\u0430\u043d\u043d\u044b\u0439 \u043f\u0440\u043e\u0435\u043a\u0442 \u0432\u043a\u043b\u044e\u0447\u0430\u0435\u0442 \u0434\u043e\u0441\u043a\u0443 Scrum, \u0431\u0430\u0437\u043e\u0432\u044b\u0439 \u0431\u0438\u0437\u043d\u0435\u0441-\u043f\u0440\u043e\u0446\u0435\u0441\u0441 Agile \u0438 \u043a\u043e\u043d\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u044e \u0442\u0438\u043f\u0430 \u0437\u0430\u0434\u0430\u0447\u0438, \u043a\u043e\u0442\u043e\u0440\u0443\u044e \u043c\u043e\u0436\u043d\u043e \u0438\u0437\u043c\u0435\u043d\u0438\u0442\u044c \u043f\u043e\u0437\u0434\u043d\u0435\u0435.', extraIssueTypes: '<li><span class="issuetype-list-label"><span class="issuetype-icon story"></span><span class="issuetype-name">' + soy.$$escapeHtml('\u0418\u0441\u0442\u043e\u0440\u0438\u044f') + '</span></span></li><li><span class="issuetype-list-label"><span class="issuetype-icon epic"></span><span class="issuetype-name">' + soy.$$escapeHtml('\u042d\u043f\u0438\u043a') + '</span></span></li>', workflowScreenshotClass: 'scrum-workflow-screenshot'});
};
if (goog.DEBUG) {
  GH.tpl.projecttemplates.scrumInfoPageJira7.soyTemplateName = 'GH.tpl.projecttemplates.scrumInfoPageJira7';
}


GH.tpl.projecttemplates.softwareDevelopmentInfoPageJira7 = function(opt_data, opt_ignored) {
  return '' + GH.tpl.projecttemplates.templateInfoDialog({description: '\u0414\u0430\u043d\u043d\u044b\u0439 \u043f\u0440\u043e\u0435\u043a\u0442 \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0435\u0442\u0441\u044f \u0434\u043b\u044f \u0440\u0430\u0431\u043e\u0442\u044b \u0441 \u043d\u043e\u0432\u044b\u043c\u0438 \u0444\u0443\u043d\u043a\u0446\u0438\u044f\u043c\u0438 \u043f\u043e \u043f\u0440\u043e\u0434\u0443\u043a\u0442\u0443 \u0438 \u043e\u0442\u0441\u043b\u0435\u0436\u0438\u0432\u0430\u043d\u0438\u044f \u0431\u0430\u0433\u043e\u0432. \u041f\u0440\u043e\u0435\u043a\u0442 \u043f\u0440\u0435\u0434\u043e\u0441\u0442\u0430\u0432\u043b\u044f\u0435\u0442 \u0431\u0430\u0437\u043e\u0432\u044b\u0439 \u0431\u0438\u0437\u043d\u0435\u0441-\u043f\u0440\u043e\u0446\u0435\u0441\u0441 \u0438 \u043a\u043e\u043d\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u044e \u0442\u0438\u043f\u0430 \u0437\u0430\u0434\u0430\u0447\u0438, \u043a\u043e\u0442\u043e\u0440\u0443\u044e \u043c\u043e\u0436\u043d\u043e \u043f\u043e\u0437\u0434\u043d\u0435\u0435 \u0438\u0437\u043c\u0435\u043d\u0438\u0442\u044c.', extraIssueTypes: '<li><span class="issuetype-list-label"><span class="issuetype-icon improvement"></span><span class="issuetype-name">' + soy.$$escapeHtml('\u0423\u043b\u0443\u0447\u0448\u0435\u043d\u0438\u0435') + '</span></span></li><li><span class="issuetype-list-label"><span class="issuetype-icon newfeature"></span><span class="issuetype-name">' + soy.$$escapeHtml('\u041d\u043e\u0432\u0430\u044f \u0444\u0443\u043d\u043a\u0446\u0438\u043e\u043d\u0430\u043b\u044c\u043d\u043e\u0441\u0442\u044c') + '</span></span></li><li><span class="issuetype-list-label"><span class="issuetype-icon epic"></span><span class="issuetype-name">' + soy.$$escapeHtml('\u042d\u043f\u0438\u043a') + '</span></span></li>', workflowScreenshotClass: 'basic-development-workflow-screenshot'});
};
if (goog.DEBUG) {
  GH.tpl.projecttemplates.softwareDevelopmentInfoPageJira7.soyTemplateName = 'GH.tpl.projecttemplates.softwareDevelopmentInfoPageJira7';
}


GH.tpl.projecttemplates.templateInfoDialog = function(opt_data, opt_ignored) {
  return '<div><div class="top-panel"><p>' + soy.$$escapeHtml(opt_data.description) + '</p></div><div class="left-panel"><h6>' + soy.$$escapeHtml('\u0422\u0438\u043f\u044b \u0437\u0430\u0434\u0430\u0447') + '</h6><ul class="project-template-issuetype-list" ><li><span class="issuetype-list-label"><span class="issuetype-icon bug"></span><span class="issuetype-name">' + soy.$$escapeHtml('\u0411\u0430\u0433') + '</span></span></li><li><span class="issuetype-list-label"><span class="issuetype-icon task"></span><span class="issuetype-name">' + soy.$$escapeHtml('\u0417\u0430\u0434\u0430\u0447\u0430') + '</span></span></li><li><span class="issuetype-list-label"><span class="issuetype-icon subtask"></span><span class="issuetype-name">' + soy.$$escapeHtml('\u041f\u043e\u0434\u0437\u0430\u0434\u0430\u0447\u0438') + '</span></span></li>' + soy.$$filterNoAutoescape(opt_data.extraIssueTypes) + '</ul></div><div class="right-panel"><h6>' + soy.$$escapeHtml('\u0420\u0430\u0431\u043e\u0447\u0438\u0439 \u043f\u0440\u043e\u0446\u0435\u0441\u0441') + '</h6><div class="workflow ' + soy.$$escapeHtml(opt_data.workflowScreenshotClass) + '"></div></div></div>';
};
if (goog.DEBUG) {
  GH.tpl.projecttemplates.templateInfoDialog.soyTemplateName = 'GH.tpl.projecttemplates.templateInfoDialog';
}


GH.tpl.projecttemplates.simpleInfoDialog = function(opt_data, opt_ignored) {
  return '<div><div class="top-panel"><p>' + soy.$$escapeHtml(opt_data.description) + '</p></div><div class="left-panel"><h6>' + soy.$$escapeHtml('\u0422\u0438\u043f\u044b \u0437\u0430\u0434\u0430\u0447') + '</h6><ul class="project-template-issuetype-list" ><li><span class="issuetype-list-label"><span class="issuetype-icon task"></span><span class="issuetype-name">' + soy.$$escapeHtml('\u0417\u0430\u0434\u0430\u0447\u0430') + '</span></span></li></ul></div><div class="right-panel"><h6>' + soy.$$escapeHtml('\u0420\u0430\u0431\u043e\u0447\u0438\u0439 \u043f\u0440\u043e\u0446\u0435\u0441\u0441') + '</h6><div class="workflow ' + soy.$$escapeHtml(opt_data.workflowScreenshotClass) + '"></div></div></div>';
};
if (goog.DEBUG) {
  GH.tpl.projecttemplates.simpleInfoDialog.soyTemplateName = 'GH.tpl.projecttemplates.simpleInfoDialog';
}
;
;
/* module-key = 'com.pyxis.greenhopper.jira:gh-globalkeyboardshortcuts', location = 'includes/js/gh-globalkeyboardshortcuts.js' */
!function(e){e.namespace("gh.app.globalkeyboardshortcuts");var s=gh.app.globalkeyboardshortcuts;s.findSelectedIssueId=function(){var e;return jira&&jira.app&&jira.app.issuenavigator&&jira.app.issuenavigator.getSelectedIssueId&&(e=jira.app.issuenavigator.getSelectedIssueId()),!e&&jira&&jira.app&&jira.app.issue&&jira.app.issue.getIssueId&&(e=jira.app.issue.getIssueId()),e},s.goToAgile=function(){var e=(contextPath?contextPath:"")+"/secure/RapidBoard.jspa";window.location.href=e},s.followLink=function(s){var t=e(s);t.length>0&&("a"===t[0].nodeName.toLowerCase()||"link"===t[0].nodeName.toLowerCase())&&(t.click(),window.location.href=t.attr("href"))},s.sendToTop=function(e,t,o){if(window.GH&&GH.RapidBoard&&GH.Shortcut&&GH.Shortcut.sendToTop)return GH.Shortcut.sendToTop(e,o),void s.closeDialogAndPopMessage();if("Action"===e){var a=t||s.findSelectedIssueId();contextPath||(contextPath=""),JIRA.SmartAjax.makeRequest({type:"post",contentType:"application/json",url:contextPath+"/rest/greenhopper/1.0/rank/global/first",data:JSON.stringify({issueId:a}),success:s.handleRankSuccess}),AJS.$(AJS).trigger("gh.global.rankissues",{action:"rankToTop"+(e?e:""),count:1})}},s.sendToBottom=function(e,t,o){if(window.GH&&GH.RapidBoard&&GH.Shortcut&&GH.Shortcut.sendToBottom)return GH.Shortcut.sendToBottom(e,o),void s.closeDialogAndPopMessage();if("Action"===e){var a=t||s.findSelectedIssueId();contextPath||(contextPath=""),JIRA.SmartAjax.makeRequest({type:"post",contentType:"application/json",url:contextPath+"/rest/greenhopper/1.0/rank/global/last",data:JSON.stringify({issueId:a}),success:s.handleRankSuccess}),AJS.$(AJS).trigger("gh.global.rankissues",{action:"rankToBottom"+(e?e:""),count:1})}},s.closeDialogAndPopMessage=function(){JIRA.IssueNavigator.isNavigator()?AJS.reloadViaWindowLocation():(JIRA.Dialog&&JIRA.Dialog.current&&JIRA.Dialog.current.hide(),window.GH?(GH.Message&&GH.Message.showIssueMessage?GH.Message.showIssueMessage():GH.RapidBoard&&GH.Notification&&GH.Notification.showIssueMessage&&GH.Notification.showIssueMessage(),window.Boards&&Boards.refreshAll()):JIRA.IssueNavigator&&JIRA.IssueNavigator.Shortcuts&&JIRA.IssueNavigator.Shortcuts.flashIssueRow&&JIRA.IssueNavigator.Shortcuts.flashIssueRow())},s.handleRankSuccess=function(e,t,o){s.storeSuccessMessage(e.issueId,e.issueKey,"thanks_issue_updated"),s.closeDialogAndPopMessage()},s.storeSuccessMessage=function(e,s,t){var o=JIRA.SessionStorage;o.setItem("selectedIssueId",e),o.setItem("selectedIssueKey",s),o.setItem("selectedIssueMsg",t)},AJS.$(function(){AJS.$(document).delegate(".issueaction-greenhopper-rank-top-operation","click",function(e){e.preventDefault();var t=AJS.$(this).attr("data-issueid");s.sendToTop("Action",t)}),AJS.$(document).delegate(".issueaction-greenhopper-rank-bottom-operation","click",function(e){e.preventDefault();var t=AJS.$(this).attr("data-issueid");s.sendToBottom("Action",t)})})}(AJS.$);;
;
/* module-key = 'com.atlassian.jira.plugin.ext.bamboo:bamboo-soy-resources', location = 'templates/plugins/bamboo/components.soy' */
// This file was automatically generated from components.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace bamboo.components.
 */

if (typeof bamboo == 'undefined') { var bamboo = {}; }
if (typeof bamboo.components == 'undefined') { bamboo.components = {}; }


bamboo.components.pageHeader = function(opt_data, opt_ignored) {
  return '' + aui.page.pageHeader({content: '' + ((opt_data.headerImageContent) ? aui.page.pageHeaderImage({content: opt_data.headerImageContent}) : '') + aui.page.pageHeaderMain({content: opt_data.headerMainContent}) + ((opt_data.headerActionsContent) ? aui.page.pageHeaderActions({content: opt_data.headerActionsContent}) : '')});
};
if (goog.DEBUG) {
  bamboo.components.pageHeader.soyTemplateName = 'bamboo.components.pageHeader';
}


bamboo.components.icon = function(opt_data, opt_ignored) {
  return '<span class="bamboo-icon bamboo-icon-' + soy.$$escapeHtml(opt_data.type) + '"' + ((opt_data.text && opt_data.showTitle) ? ' title="' + soy.$$escapeHtml(opt_data.text) + '"' : '') + '>' + ((opt_data.text) ? '<span>' + soy.$$escapeHtml(opt_data.text) + '</span>' : '') + '</span>';
};
if (goog.DEBUG) {
  bamboo.components.icon.soyTemplateName = 'bamboo.components.icon';
}


bamboo.components.buildDetail = function(opt_data, opt_ignored) {
  return '<dl><dt class="' + soy.$$escapeHtml(opt_data.keyClass) + '">' + soy.$$escapeHtml(opt_data.key) + '</dt><dd>' + soy.$$filterNoAutoescape(opt_data.value) + '</dd></dl>';
};
if (goog.DEBUG) {
  bamboo.components.buildDetail.soyTemplateName = 'bamboo.components.buildDetail';
}


bamboo.components.artifacts = function(opt_data, opt_ignored) {
  var output = '<ul id="shared-artifacts">';
  var artifactList42 = opt_data.artifacts;
  var artifactListLen42 = artifactList42.length;
  for (var artifactIndex42 = 0; artifactIndex42 < artifactListLen42; artifactIndex42++) {
    var artifactData42 = artifactList42[artifactIndex42];
    output += bamboo.components.artifactItem(soy.$$augmentMap(artifactData42, {id: artifactData42.name, url: artifactData42.link.href}));
  }
  output += '</ul>';
  return output;
};
if (goog.DEBUG) {
  bamboo.components.artifacts.soyTemplateName = 'bamboo.components.artifacts';
}


bamboo.components.artifactItem = function(opt_data, opt_ignored) {
  return '<li>' + bamboo.components.icon({type: 'artifact-shared'}) + ' <a class="artifact-link" id="artifact-' + soy.$$escapeHtml(opt_data.id) + '" href="' + soy.$$escapeHtml(opt_data.url) + '" title="' + soy.$$escapeHtml(opt_data.name) + '">' + soy.$$escapeHtml(opt_data.name) + '</a><span class="filesize">(' + soy.$$escapeHtml(opt_data.prettySizeDescription) + ')</span></li>';
};
if (goog.DEBUG) {
  bamboo.components.artifactItem.soyTemplateName = 'bamboo.components.artifactItem';
}


bamboo.components.labels = function(opt_data, opt_ignored) {
  var output = '<ul class="labels">';
  var labelList65 = opt_data.labels;
  var labelListLen65 = labelList65.length;
  for (var labelIndex65 = 0; labelIndex65 < labelListLen65; labelIndex65++) {
    var labelData65 = labelList65[labelIndex65];
    output += bamboo.components.labelItem(soy.$$augmentMap(labelData65, {url: opt_data.baseBambooUrl + '/browse/label/' + labelData65.name}));
  }
  output += '</ul>';
  return output;
};
if (goog.DEBUG) {
  bamboo.components.labels.soyTemplateName = 'bamboo.components.labels';
}


bamboo.components.labelItem = function(opt_data, opt_ignored) {
  return '<li><a class="lozenge" href="' + soy.$$escapeHtml(opt_data.url) + '" title="' + soy.$$escapeHtml(opt_data.name) + '"><span>' + soy.$$escapeHtml(opt_data.name) + '</span></a></li>';
};
if (goog.DEBUG) {
  bamboo.components.labelItem.soyTemplateName = 'bamboo.components.labelItem';
}


bamboo.components.errorResponseMessage = function(opt_data, opt_ignored) {
  return '' + bamboo.components.auiWarning({body: '' + ((opt_data.errorMessage.messageBody) ? '<p>' + soy.$$escapeHtml(opt_data.errorMessage.messageBody) + '</p>' : (opt_data.errorMessage.oauthCallback) ? '<p><a href="' + soy.$$filterNoAutoescape(opt_data.errorMessage.oauthCallback) + '&amp;redirectUrl=' + soy.$$filterNoAutoescape(opt_data.oAuthDanceReturnUrl) + '">' + soy.$$escapeHtml('\u0412\u043e\u0439\u0442\u0438 \u0438 \u0443\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044c') + '</a></p>' : '<p>' + soy.$$escapeHtml(opt_data.errorMessage.message) + '</p>')});
};
if (goog.DEBUG) {
  bamboo.components.errorResponseMessage.soyTemplateName = 'bamboo.components.errorResponseMessage';
}


bamboo.components.auiWarning = function(opt_data, opt_ignored) {
  return '<div class="aui-message warning"><span class="aui-icon icon-warning"></span>' + soy.$$filterNoAutoescape(opt_data.body) + '</div>';
};
if (goog.DEBUG) {
  bamboo.components.auiWarning.soyTemplateName = 'bamboo.components.auiWarning';
}
;
;
/* module-key = 'com.atlassian.administration.atlassian-admin-quicksearch-jira:admin-quicksearch-webresources', location = 'com/atlassian/administration/quicksearch/jira/js/adminQuickNav.js' */
require(["jquery","underscore","jira/ajs/ajax/smart-ajax","jira/shifter","wrm/context-path"],function(e,n,t,r,i){r.register(function(){function r(e){return{label:e.label,value:e.linkUrl,keywords:e.aliases}}function a(e){return n.map(e.items,r).concat(n.map(e.sections,a))}function u(e){return n.flatten(a(e))}var o=e.Deferred();return t.makeRequest({dataType:"json",url:i()+"/rest/adminquicksearch/latest/links/default"}).pipe(u).done(function(e){o.resolve(e)}).fail(function(){o.reject()}),{id:"admin",name:"\u0410\u0434\u043c\u0438\u043d\u0438\u0441\u0442\u0440\u0430\u0442\u0438\u0432\u043d\u044b\u0439 \u043f\u043e\u0438\u0441\u043a",weight:500,getSuggestions:function(){return o},onSelection:function(n){return window.location=n,e.Deferred()}}})});;
;
/* module-key = 'com.atlassian.jpo:jpo-wr-custom-field-scripts-parent', location = '/jpo2/scripts-plugin/field-parent.min.js' */
(function(){require(["com/atlassian/rm/common/customfields/common"],function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L;if(j=window.JIRA,b=AJS.$,i=AJS.ItemDescriptor,d=AJS.GroupDescriptor,p=AJS.contextPath,w=AJS.escapeHTML,k=100,l=".jpo-parent-selection-dropdown",f=".jpo-initial-issue-type-name",e=".jpo-initial-epic-link",g=".jpo-initial-issue-project",c=".jpo-client-error-message-container",h="#issuetype-field",m=p()+"/rest/jpo/1.0/parent/suggest",B="",E=void 0,v=void 0,F=void 0,z=function(a){var b,c,d,e;for(b={},d=0,e=a.length;d<e;d++)c=a[d],b[c.id]=c;return b},I=function(){return B=b(f).val()},D=function(){return b(h).change(function(a){var b;if(b=a.target.value,null!=b&&b.length>0)return B=b})},A=function(){return null!=v&&v.length>0},H=function(){return v=b(e).val()},J=function(){return F=b(g).val()},C=function(a){return a.$field.change(function(a){return v=a.target.value,o()})},o=function(){return A()?L("Cannot use parent link when epic link is set."):y()},K=function(a){if(null!=E)return E.$container.toggle(a)},L=function(a){return K(!1),b(c).html("<span class='error'>"+w(a)+"</span>")},y=function(){return K(!0),b(c).empty()},x=function(a){var b,c,e,f,g;return e=a.issues,c=a.issueTypes,g=a.projects,b=new d({weight:0,showLabel:!1,items:[q()]}),f=new d({weight:1,items:u({issues:e,issueTypes:c,projects:g})}),[b,f]},t=function(a){var b,c,d,e,f,g,h;return d=a.issue,g=a.issueType,h=a.project,e=d.issueKey,f=d.issueSummary,b=h.key+"-"+e,c=b+" "+f,new i({value:b,fieldText:c,label:c,icon:g.iconUrl})},u=function(b){var c,d,e,f,g,h,i;return f=b.issues,d=b.issueTypes,h=b.projects,e=z(d),i=z(h),g=function(){var a,b,d;for(d=[],a=0,b=f.length;a<b;a++)c=f[a],d.push(t({issue:c,issueType:e[c.issueTypeId],project:i[c.projectId]}));return d}(),a.addNoMatchesItemIfEmpty({items:g}),g},q=function(){return a.createInfoMessageListItem({text:"To set an epic as the parent, use the epic link instead",additionalStyles:"jpo-dropdown-item-italic"})},r=function(a){var b;return b=a.query,JSON.stringify({query:b,issueTypeName:B,maxResults:k,projectId:F})},n=a.createDropdownClass({ajaxOptions:a.createDropdownAjaxOptions({url:m,createQueryData:r,formatResponse:x}),getNoMatchingValueMessage:function(a){return AJS.format("No valid parent matching \'\'{0}\'\' was found.",a)}}),s=function(a){return b(l,a).each(function(){return E=new n({element:b(this)}),o()})},a.bindInitializationCallback(function(a){var b;return b=a.context,H(),I(),J(),D(),s(b)}),null!=(null!=(G=j.EpicPicker)?G.READY_EVENT:void 0))return j.bind(j.EpicPicker.READY_EVENT,function(a,b){return C(b)})})}).call(this);;
;
/* module-key = 'com.atlassian.jira.ext.calendar:browse-project-tip', location = 'com/atlassian/jira/ext/calendar/resources/js/BrowseProjectTip.js' */
require(["jira/util/formatter","jira/util/events","jira/util/events/types","wrm/data","jquery"],function(e,t,a,n,i){AJS.toInit(function(){var r=n.claim("com.atlassian.jira.ext.calendar:tipDataProvider.tip").suppressTip;if(!r){var s="browse-project-calendar-info",o=function(t){if(t.length){var a=i("<div/>");AJS.messages.info(a,{body:e.format("\u042d\u0442\u043e\u0442 \u043a\u0430\u043b\u0435\u043d\u0434\u0430\u0440\u044c \u043e\u0442\u043e\u0431\u0440\u0430\u0436\u0430\u0435\u0442\u0441\u044f, \u043a\u043e\u0433\u0434\u0430 \u0435\u0441\u0442\u044c \u0437\u0430\u0434\u0430\u0447\u0438, \u043a\u043e\u0442\u043e\u0440\u044b\u0435 \u0434\u043e\u043b\u0436\u043d\u044b \u0431\u044b\u0442\u044c \u0432\u044b\u043f\u043e\u043b\u043d\u0435\u043d\u044b. \u0414\u043b\u044f \u0437\u0430\u0434\u0430\u0447\u0438 \u044d\u0442\u043e \u0443\u0441\u0442\u0430\u043d\u0430\u0432\u043b\u0438\u0432\u0430\u0435\u0442\u0441\u044f \u043f\u043e\u043b\u0435\u043c {0}.","\u0421\u0440\u043e\u043a \u0438\u0441\u043f\u043e\u043b\u043d\u0435\u043d\u0438\u044f"),closeable:!0}),a.find(".aui-message").attr("id",s),t.prepend(a)}};t.bind(a.NEW_CONTENT_ADDED,function(e,t,a){var n;n="project-tab"==t.attr("id")?i(".issues-calendar-container",t):i("#project-tab .issues-calendar-container",t),o(n)}),o(i("#project-tab .issues-calendar-container")),AJS.bind("messageClose",function(e,t){t.attr("id")==s&&(AJS.EventQueue&&AJS.EventQueue.push({name:"browseprojectcalendarinfo.closebutton"}),i.ajax({data:{tipKey:"browseProjectCalendarTab",atl_token:atl_token()},type:"POST",url:contextPath+"/rest/calendar-plugin/1.0/suppressedTips"}))})}})});;
;
/* module-key = 'com.atlassian.plugins.browser.metrics.browser-metrics-plugin:api', location = 'probe.js' */
!function(){var n,t,e,r,i,o,u,a,c,s,f,l,h,d,y,p,v,m,w;n=function(){return window}(),t=function(n){return!(!n.performance||!n.performance.now)}(n),e=[],r=function(n){return function(t){n.unshift({addReporter:t})}}(e),i=function(n){return function(t){for(;n.length;)t(n.splice(0,1)[0]);n.unshift=t,n.push=t}}(e),o=function(n,t){return function(e){n.push({end:{key:e.key,timestamp:t.performance.now()}})}}(e,n),u=function(n){return n.document}(n),a=function(n){return n.Promise}(n),c=function(){function n(){this._={}}var t=function(e){var r=e[0],i=e[1];i instanceof n?e.length>=3?Object.keys(i._).forEach(function(n){t([r,i._[n],n].concat(e.slice(2)))}):Object.keys(i._).forEach(function(n){t([r,i._[n],n])}):Array.isArray(i)&&r.apply(null,[i].concat(e.slice(2)))};n.prototype.forEach=function(n){t([n,this])},n.prototype.add=function(){for(var t=this,e=null,r=null,i=0;i<arguments.length;i++){if(r=arguments[i],i===arguments.length-1&&Array.isArray(t)){t.push(r);break}i<arguments.length-2&&!t._.hasOwnProperty(r)?t._[r]=new n:i!==arguments.length-2||t._.hasOwnProperty(r)||(t._[r]=[]),t=t._[r],e=r}};var e=function(n,t){if(0!==n.length){var r=n.pop(),i=r[0],o=r[1];i===t?e(n,i):o._.hasOwnProperty(t)&&delete o._[t],0===Object.keys(o).length&&e(n,i)}};return n.prototype.remove=function(){for(var n,t=!1,r=null,i=this,o=[[r,i]],u=null,a=0;a<arguments.length;a++)if(u=arguments[a],Array.isArray(i))n=i.indexOf(u),n>-1&&(i.splice(n,1),0===i.length&&o.length>1&&e(o,r),t=!0);else{if(!i._.hasOwnProperty(u))break;a===arguments.length-1&&(delete i._[u],0===Object.keys(i).length&&o.length>1&&e(o,r),t=!0),r=u,i=i._[u],o.push([r,i])}return t},n.prototype.get=function(n){return this._.hasOwnProperty(n)?this._[n]:[]},n}(),s=function(n,t,e,r){function i(n){return!n||null==n||"null"===n||"undefined"===n}function o(t,e,r){l||(c.observe(n,{attributes:!0,childList:!0,subtree:!0}),l=!0),s.add(t,e,r)}function u(t,e){var r=n.querySelectorAll(t);return r.length&&(i(e)||Array.prototype.every.call(r,function(n){return!n.querySelector(e)}))}function a(n,e){var r;n.forEach||(n=[n]),!i(e)&&Array.isArray(e)&&(e=e.join(", "));var a=new t(function(i,a){var c=[],f=[];n.forEach(function(n){var r,i;u(n,e)||(r=new t(function(t){o(n,e,t),i=function(){s.remove(n,e,t)},f.push(i)}),c.push(r))});var l=function(){f.forEach(function(n){n()})};t.all(c).then(l).then(i,a),r=function(){l(),a()}});return a.dismiss=r,a}var c,s,f=r.MutationObserver,l=!1;return f&&t?(s=new e,c=new f(function(){s.forEach(function(n,t,e){u(e,t)&&(n.forEach(function(n){n()}),s.remove(e,t))})}),a):void 0}(u,a,c,n),f=function(n){return!!n}(s),l=function(n){function t(){c(),n.body.classList.add(u)}function e(){function e(){n.body.classList.remove(u),n.removeEventListener(i,s),n.removeEventListener(o,c),r=null}if(r)return r;var c,s,f=!1;return r=new Promise(function(e,r){"visible"!==n.visibilityState?r():(s=function(){f=!0},c=function(n){n.animationName===a&&(f?r():e())},n.addEventListener(i,s),n.addEventListener(o,c),t())}),r.then(e,e),r}var r,i="visibilitychange",o="animationend",u="browser-metrics-visibility-test",a="browser-metrics-visibility-animation",c=function(){var t=n.createElement("style"),e=["."+u+" {","-webkit-animation-duration: 0.001s;","animation-duration: 0.001s;","-webkit-animation-name: "+a+";","animation-name: "+a+";","-webkit-animation-iteration-count: 1;","animation-iteration-count: 1;","}","@keyframes "+a+" {}","@-webkit-keyframes "+a+" {","from {}","to {}","}"].join("\n");t.type="text/css",t.styleSheet?t.styleSheet.cssText=e:t.appendChild(n.createTextNode(e)),n.head.appendChild(t),c=function(){}};return e}(u),h=function(n,t,e,r,i){function o(n){return Array.isArray(n)||(n=[n]),n.map(function(n){return"string"==typeof n?{selector:n,hasNone:null}:n})}function u(n){return Array.isArray(n)||"string"==typeof n}function a(n){return u(n)&&(n={rules:n}),n.rules=o(n.rules),n.requirePaint="undefined"==typeof n.requirePaint?!1:n.requirePaint,n}return function(i,o){if(n){i=a(i);var u=function(){},c=new e(function(n,r){var o=[],a=i.rules.map(function(n){var e=new t(n.selector,n.hasNone);return o.push(function(){e.dismiss()}),e});u=function(){o.forEach(function(n){n()}),r()},e.all(a).then(function(n){}).then(n,r)});return c.cancel=u,i.requirePaint&&(c=c.then(r)),"function"==typeof o&&c.then(o),c}}}(f,s,a,l,n),d=function(n,t){function e(){return r}var r=!1;return n.addEventListener("DOMContentLoaded",function(){t.setTimeout(function(){r=!0})}),e}(u,n),y=function(n,t,e,r,i,o,u){function a(){c=null}var c;return function(o){var s="isInitial"in o?o.isInitial:i()===!1,f="threshold"in o?o.threshold:1e3,l="reporters"in o?o.reporters:[];r.push({start:{key:o.key,isInitial:s,threshold:f,timestamp:s?0:u.performance.now(),reporters:Array.isArray(l)?l:[l]}}),c&&(c.cancel(),a()),o.ready&&e&&(c=n(o.ready),c.then(function(){t({key:o.key})}).then(a,a))}}(h,o,f,e,d,a,n),p=function(n){return function(t){n.push({subscribe:t})}}(e),v=function(){return window}(),m=function(n){return n.performance}(v),w=function(n,t,e,r,i,o,u){var a=function(){};return u?{start:n?i:a,end:n?r:a,addReporter:n?t:a,delegateTo:n?e:a,subscribe:n?o:a}:void 0}(t,r,i,o,y,p,m),window["browser-metrics"]=w,window.define&&window.define("internal/browser-metrics",function(){return w})}();;
;
/* module-key = 'com.atlassian.plugins.browser.metrics.browser-metrics-plugin:api', location = 'internal/browser-metrics-aa-beacon.js' */
!function(){var e={};e=function(e){function n(e,n){Object.keys(n).forEach(function(r){e[r]=n[r]})}Object.defineProperty(e,"__esModule",{value:!0});var r,t=[],o=[];return e.addUrlCleaner=function(e){o.push(e)},e.cleanUrl=function(e){return o.reduce(function(n,r){var t=r(e);return t.length>n.length?t:n},"")},e.addReportMarshaller=function(e){t.push(e)},e.setEventQueue=function(e){r=e},e.beacon=function(e){var o={};t.forEach(function(r){var t=r(e);"object"==typeof t&&n(o,t)});var a={name:"browser.metrics.navigation",properties:o};(r||AJS.EventQueue).push(a)},e}(e),window["browser-metrics-aa-beacon"]=e,window.define&&window.define("internal/browser-metrics-aa-beacon",function(){return e})}();;
;
/* module-key = 'com.atlassian.plugins.browser.metrics.browser-metrics-plugin:api', location = 'loader.js' */
!function(){var n={},r={};r=function(n,r,i){function e(){t===u&&o&&(o(),o=null)}Object.defineProperty(n,"__esModule",{value:!0});var t=0,u=0,o=null,c={install:function(n){t+=1,n(function(){u+=1,e()})}};return r["browser-metrics-plugin"]=c,i.require(["wrc!browser-metrics-plugin.contrib"],function(){r.require(["internal/browser-metrics-plugin/collector"],function(n){o=function(){n.install()},e()})}),n}(r,n=window,n.WRM)}();;
;
/* module-key = 'com.atlassian.jira.plugins.jira-browser-metrics:sensors', location = 'sensors.js' */
require(["internal/browser-metrics","jira/util/events","jira/featureflags/feature-manager","jira/featureflags/simplified-ux-feature-manager"],function(e,i,a,o){var d,t={},r={},l={};t=function(e,i,a){function o(){function e(e){return o.hasOwnProperty(e)?o[e]:null}var o={"browse_link-content":"jira.header.menu.projects","find_link-content":"jira.header.menu.issues","greenhopper_menu-content":"jira.header.menu.agile","home_link-content":"jira.header.menu.dashboards","plugins-jira-webitem-main-content":"jira.header.menu.portfolio","servicedesk-section-content":"jira.header.menu.service-desk","system-admin-menu-content":"jira.header.menu.admin","system-help-menu-content":"jira.header.menu.help","user-options-content":"jira.header.menu.profile"};i.bind("aui-dropdown2-show-before",function(i){var o=i.target,d=e(o&&o.id);d&&a.start({key:d,isInitial:!1,threshold:250})}),i.bind("aui-dropdown2-show-after",function(i){var o=i.target,d=e(o&&o.id);d&&a.end({key:d})})}return e.applicationMenusSensorInit=o,e}(t,i,e),r=function(e){function i(e){var i;if(a.hasOwnProperty(e))return e;for(i=0;i<o.length;i++)if(e.match(o[i].pattern))return o[i].dialogId;return null}e.safeDialogId=i;var a=["about-dialog","add-basicuser-dialog","add-developer-dialog","add-field-configuration-dialog","add-field-configuration-scheme-dialog","add-field-dialog","add-field-screen-dialog","add-field-screen-scheme-dialog","add-incoming-mail-handler-dialog","add-issue-type-dialog","add-issue-type-field-configuration-association-dialog","add-issue-type-screen-scheme-configuration-association-dialog","add-issue-type-screen-scheme-dialog","add-new-issue-type-to-scheme-dialog","add-screen-scheme-item-dialog","add-subtask-type-dialog","add-workflow-dialog","add_workflowscheme-dialog","assign-dialog","assign-issue-types-dialog","assign-to-me-link-handler","attach-file-dialog","attach-screenshot-dialog","auditing-settings-dialog","clone-issue-dialog","comment-add-dialog","configure_wallboard_dialog","confluence-page-search-dialog","copy_classic default workflow-dialog","copy-filter-dialog","copy_jira-dialog","create-issue-dialog","create-issue-dialog.issueType","create-issue-dialog.projectId","create-request-dialog","create-service-desk-dialog","create-status-dialog","create-story-dialog","create-story-dialog.issueType","create-story-dialog.projectId","create-subtask-dialog","create-subtask-dialog.issueType","create-team-dialog","create_user-dialog","credits-dialog","delete-attachment-dialog","delete-comment-dialog","delete-dshboard","delete-filter-dialog","delete-issue-dialog","delete-issue-link-dialog","delete-log-work-dialog","delete-metric","delete-queue","delete-status-dialog","deleteuser_link-dialog","devstatus-branch-detail-dialog","devstatus-build-detail-dialog","devstatus-commit-detail-dialog","devstatus-cta-dialog","devstatus-deployment-detail-dialog","devstatus-pullrequest-detail-dialog","devstatus-review-detail-dialog","discard-draft-dialog","discard_draft_workflow-dialog","edit-attachments-dialog","edit-comment","editgroups_admin-dialog","editgroups_link-dialog","editgroups_sysadmin-dialog","edit-issue-dialog","edit-labels-dialog","edit-log-work-dialog","edit-status-dialog","edituser_link_admin-dialog","edit-workflow-dialog","gh-rapidboard-dialog","inline-issue-create-dialog","invite_user-dialog","issue-actions-dialog","issue-tab-error-dialog","jim-create-project-dialog","keyboard-shortcuts-dialog","link-issue-dialog","log-work-dialog","manage-attachment-dialog","metric-pre-save-dialog","modal-field-view","permission-helper-dialog","project-avatar-cropper","project-avatar-picker","project-config-details-project-category-dialog","project-config-project-edit-dialog","project-config-project-edit-lead-and-default-assignee-dialog","project-email-dialog","publish_draft_workflow-dialog","queue-dirty-edits","QuickCreateIssue.error","QuickCreateIssue.success","QuickCreateSubtask.error","QuickCreateSubtask.success","QuickEdit.error","QuickEdit.success","remote-jira-search-dialog","rename-filter-dialog","report-dirty-edits","save-filter-dialog","sd-add-default-value","sd-add-remove-agent-dialog","sd-remove-field-dialog","server-error-dialog","report-delete-confirm","user-avatar-picker","user-defaults-edit-dialog","versionsMergeDialog","view-workflow-dialog","view-workflow-dialog-project-admin","view-workflow-dialog-workflow-schemes","wait-migrate-dialog","whereismycf-dialog","workflow-text-view"].reduce(function(e,i){return e[i]=!0,e},{}),o=[{dialogId:"component-delete-dialog",pattern:/^component-\d+-delete-dialog$/i},{dialogId:"version-delete-dialog",pattern:/^version-\d+-delete-dialog$/i},{dialogId:"workflow-transition-dialog",pattern:/^workflow-transition-\d+-dialog$/i}];return e}(r),l=function(e,i,a,o){function d(){i.bind("beforeShow",function(e,i){if("string"==typeof i){var d=(0,o.safeDialogId)(i);d&&a.start({key:"jira.dialog.open."+d,isInitial:!1,threshold:1e3})}}),i.bind("dialogContentReady",function(e,i){if("string"==typeof i.options.id){var d=(0,o.safeDialogId)(i.options.id);d&&a.end({key:"jira.dialog.open."+d})}})}return e.dialogsSensorInit=d,e}(l,i,e,r),d=function(e,i){(0,e.applicationMenusSensorInit)(),(0,i.dialogsSensorInit)()}(t,l)});;
;
/* module-key = 'com.atlassian.plugin.jslibs:keymaster-1.6.2', location = 'libs/keymaster/1.6.2/keymaster-1.6.2.js' */
(function(e){define("atlassian/libs/keymaster-1.6.2",function(){var j={};e(j);return"undefined"!==typeof module?module.exports.noConflict():j.key.noConflict()})})(function(e){function j(a,b){for(var d=a.length;d--;)if(a[d]===b)return d;return-1}function v(a){var b,d,c,e,o,r;b=a.keyCode;-1==j(l,b)&&l.push(b);if(93==b||224==b)b=91;if(b in f)for(c in f[b]=!0,k)k[c]==b&&(m[c]=!0);else{for(g in f)f[g]=a[w[g]];if(m.filter.call(this,a)&&b in h){r=p();for(e=0;e<h[b].length;e++)if(d=h[b][e],d.scope==r||"all"==
d.scope){o=0<d.mods.length;for(c in f)if(!f[c]&&-1<j(d.mods,+c)||f[c]&&-1==j(d.mods,+c))o=!1;if((0==d.mods.length&&!f[16]&&!f[18]&&!f[17]&&!f[91]||o)&&!1===d.method(a,d))a.preventDefault?a.preventDefault():a.returnValue=!1,a.stopPropagation&&a.stopPropagation(),a.cancelBubble&&(a.cancelBubble=!0)}}}}function m(a,b,d){var c,e;c=s(a);void 0===d&&(d=b,b="all");for(var f=0;f<c.length;f++)e=[],a=c[f].split("+"),1<a.length&&(e=t(a),a=[a[a.length-1]]),a=a[0],a=n[a]||a.toUpperCase().charCodeAt(0),a in h||
(h[a]=[]),h[a].push({shortcut:c[f],scope:b,method:d,key:c[f],mods:e})}function p(){return u||"all"}function s(a){a=a.replace(/\s/g,"");a=a.split(",");""==a[a.length-1]&&(a[a.length-2]+=",");return a}function t(a){for(var a=a.slice(0,a.length-1),b=0;b<a.length;b++)a[b]=k[a[b]];return a}function q(a,b,d){a.addEventListener?a.addEventListener(b,d,!1):a.attachEvent&&a.attachEvent("on"+b,function(){d(window.event)})}var g,h={},f={16:!1,18:!1,17:!1,91:!1},u="all",k={"\u21e7":16,shift:16,"\u2325":18,alt:18,
option:18,"\u2303":17,ctrl:17,control:17,"\u2318":91,command:91},n={backspace:8,tab:9,clear:12,enter:13,"return":13,esc:27,escape:27,space:32,left:37,up:38,right:39,down:40,del:46,"delete":46,home:36,end:35,pageup:33,pagedown:34,",":188,".":190,"/":191,"`":192,"-":189,"=":187,";":186,"'":222,"[":219,"]":221,"\\":220},l=[];for(g=1;20>g;g++)n["f"+g]=111+g;var w={16:"shiftKey",18:"altKey",17:"ctrlKey",91:"metaKey"};for(g in k)m[g]=!1;q(document,"keydown",function(a){v(a)});q(document,"keyup",function(a){var a=
a.keyCode,b,d=j(l,a);0<=d&&l.splice(d,1);if(93==a||224==a)a=91;if(a in f)for(b in f[a]=!1,k)k[b]==a&&(m[b]=!1)});q(window,"focus",function(){for(g in f)f[g]=!1;for(g in k)m[g]=!1});var x=e.key;e.key=m;e.key.setScope=function(a){u=a||"all"};e.key.getScope=p;e.key.deleteScope=function(a){var b,d,c;for(b in h){d=h[b];for(c=0;c<d.length;)d[c].scope===a?d.splice(c,1):c++}};e.key.filter=function(a){a=(a.target||a.srcElement).tagName;return!("INPUT"==a||"SELECT"==a||"TEXTAREA"==a)};e.key.isPressed=function(a){"string"==
typeof a&&(a=n[a]||a.toUpperCase().charCodeAt(0));return-1!=j(l,a)};e.key.getPressedKeyCodes=function(){return l.slice(0)};e.key.noConflict=function(){var a=e.key;e.key=x;return a};e.key.unbind=function(a,b){var d,c,e=[],f,g;d=s(a);for(g=0;g<d.length;g++){c=d[g].split("+");1<c.length&&(e=t(c),a=c[c.length-1]);a=n[a]||a.toUpperCase().charCodeAt(0);void 0===b&&(b=p());if(!h[a])break;for(f in h[a]){c=h[a][f];var i;if(i=c.scope===b)a:if(c=c.mods,c.length!=e.length)i=!1;else{for(i=0;i<c.length;i++)if(c[i]!==
e[i]){i=!1;break a}i=!0}i&&(h[a][f]={})}}};"undefined"!==typeof module&&(module.exports=e.key)});;
;
/* module-key = 'com.atlassian.jira.plugins.jira-dnd-attachment-plugin:attachments-api', location = 'js/AttachmentsAPI.js' */
define("jira/attachments/api",["dndattachment/upload/handler"],function(n){return{doUpload:function(a){return n.doUpload(a)}}});;
;
/* module-key = 'com.atlassian.jira.plugins.jira-wiki-editor:wiki-editor-resources', location = 'js/wrappers/aui.js' */
define("wiki-edit/aui",function(){return AJS});;
;
/* module-key = 'com.atlassian.jira.plugins.jira-wiki-editor:wiki-editor-resources', location = 'js/wrappers/jira.js' */
define("wiki-edit/JIRA",function(){return JIRA});;
;
/* module-key = 'com.atlassian.jira.plugins.jira-wiki-editor:wiki-editor-resources', location = 'js/wrappers/keymaster.js' */
define("wiki-edit/keymaster",["wiki-edit/aui","atlassian/libs/keymaster-1.6.2"],function(e,i){return e.Meta.get("keyboard-shortcuts-enabled")===!1?function(){}:i});;
;
/* module-key = 'com.atlassian.jira.plugins.jira-wiki-editor:wiki-editor-resources', location = '/templates/wiki-editor.soy' */
// This file was automatically generated from wiki-editor.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace JIRA.Templates.Plugins.WikiEditor.
 */

if (typeof JIRA == 'undefined') { var JIRA = {}; }
if (typeof JIRA.Templates == 'undefined') { JIRA.Templates = {}; }
if (typeof JIRA.Templates.Plugins == 'undefined') { JIRA.Templates.Plugins = {}; }
if (typeof JIRA.Templates.Plugins.WikiEditor == 'undefined') { JIRA.Templates.Plugins.WikiEditor = {}; }


JIRA.Templates.Plugins.WikiEditor.renderEditor = function(opt_data, opt_ignored) {
  var output = '<div id="wiki-edit-dropdown2-text-style-' + soy.$$escapeHtml(opt_data.editorId) + '" class="aui-dropdown2 aui-style-default wiki-edit-dropdown"><div class="aui-dropdown2-section"><ul class="aui-list-truncate"><li><a href="#" class="wiki-edit-operation" data-operation="paragraph" title="' + soy.$$escapeHtml('\u0410\u0431\u0437\u0430\u0446') + '">' + soy.$$escapeHtml('\u0410\u0431\u0437\u0430\u0446') + '</a></li><li><a href="#" class="wiki-edit-operation wiki-edit-operation-h1" data-operation="h1" title="' + soy.$$escapeHtml('\u0417\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a 1') + '">' + soy.$$escapeHtml('\u0417\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a 1') + '</a></li><li><a href="#" class="wiki-edit-operation wiki-edit-operation-h2" data-operation="h2" title="' + soy.$$escapeHtml('\u0417\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a 2') + '">' + soy.$$escapeHtml('\u0417\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a 2') + '</a></li><li><a href="#" class="wiki-edit-operation wiki-edit-operation-h3" data-operation="h3" title="' + soy.$$escapeHtml('\u0417\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a 3') + '">' + soy.$$escapeHtml('\u0417\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a 3') + '</a></li><li><a href="#" class="wiki-edit-operation wiki-edit-operation-h4" data-operation="h4" title="' + soy.$$escapeHtml('\u0417\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a 4') + '">' + soy.$$escapeHtml('\u0417\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a 4') + '</a></li><li><a href="#" class="wiki-edit-operation wiki-edit-operation-h5" data-operation="h5" title="' + soy.$$escapeHtml('\u0417\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a 5') + '">' + soy.$$escapeHtml('\u0417\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a 5') + '</a></li><li><a href="#" class="wiki-edit-operation wiki-edit-operation-h6" data-operation="h6" title="' + soy.$$escapeHtml('\u0417\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a 6') + '">' + soy.$$escapeHtml('\u0417\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a 6') + '</a></li><li><a href="#" class="wiki-edit-operation wiki-edit-operation-monospace" data-operation="monospace" title="' + soy.$$escapeHtml('\u0424\u043e\u0440\u043c\u0430\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u043d\u044b\u0439') + '">' + soy.$$escapeHtml('\u0424\u043e\u0440\u043c\u0430\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u043d\u044b\u0439') + '</a></li><li><a href="#" class="wiki-edit-operation" data-operation="paragraph-quote" title="' + soy.$$escapeHtml('\u0426\u0438\u0442\u0430\u0442\u0430 \u0430\u0431\u0437\u0430\u0446\u0430') + '">' + soy.$$escapeHtml('\u0426\u0438\u0442\u0430\u0442\u0430 \u0430\u0431\u0437\u0430\u0446\u0430') + '</a></li><li><a href="#" class="wiki-edit-operation" data-operation="block-quote" title="' + soy.$$escapeHtml('\u0426\u0438\u0442\u0430\u0442\u0430 \u0431\u043b\u043e\u043a\u0430') + '">' + soy.$$escapeHtml('\u0426\u0438\u0442\u0430\u0442\u0430 \u0431\u043b\u043e\u043a\u0430') + '</a></li></ul></div></div><div id="wiki-edit-dropdown2-more-' + soy.$$escapeHtml(opt_data.editorId) + '" class="aui-dropdown2 aui-style-default wiki-edit-dropdown"><div class="aui-dropdown2-section"><ul class="aui-list-truncate"><li><a href="#" class="wiki-edit-operation" data-operation="delete" data-shortcut="ctrl+shift+s, command+shift+s" title="' + soy.$$escapeHtml('\u0417\u0430\u0447\u0435\u0440\u043a\u043d\u0443\u0442\u044b\u0439') + ' (' + soy.$$escapeHtml(opt_data.controlKey) + '+Shift+S)">' + soy.$$escapeHtml('\u0417\u0430\u0447\u0435\u0440\u043a\u043d\u0443\u0442\u044b\u0439') + '</a></li><li><a href="#" class="wiki-edit-operation" data-operation="superscript">' + soy.$$escapeHtml('\u041d\u0430\u0434\u0441\u0442\u0440\u043e\u0447\u043d\u044b\u0439') + '</a></li><li><a href="#" class="wiki-edit-operation" data-operation="subscript">' + soy.$$escapeHtml('\u041f\u043e\u0434\u0441\u0442\u0440\u043e\u0447\u043d\u044b\u0439 \u0442\u0435\u043a\u0441\u0442') + '</a></li><li><a href="#" class="wiki-edit-operation" data-operation="cite">' + soy.$$escapeHtml('\u0426\u0438\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435') + '</a></li></ul></div></div><div id="wiki-edit-dropdown2-link-' + soy.$$escapeHtml(opt_data.editorId) + '" class="aui-dropdown2 aui-style-default wiki-edit-dropdown wiki-edit-dropdown-link"><div class="aui-dropdown2-section"><ul class="aui-list-truncate"><li><a href="#" class="wiki-edit-operation" data-operation="link" data-shortcut="ctrl+k, command+k" title="' + soy.$$escapeHtml('\u0412\u043d\u0435\u0448\u043d\u044f\u044f \u0441\u0432\u044f\u0437\u044c') + ' (' + soy.$$escapeHtml(opt_data.controlKey) + '+K)">' + soy.$$escapeHtml('\u0412\u043d\u0435\u0448\u043d\u044f\u044f \u0441\u0432\u044f\u0437\u044c') + '</a></li><li><a href="#" class="wiki-edit-operation" data-operation="link-mail">' + soy.$$escapeHtml('\u041f\u043e\u0447\u0442\u043e\u0432\u0430\u044f \u0441\u0441\u044b\u043b\u043a\u0430') + '</a></li><li><a href="#" class="wiki-edit-operation" data-operation="link-anchor">' + soy.$$escapeHtml('\u041f\u0440\u0438\u0432\u044f\u0437\u043a\u0430 \u0441\u0441\u044b\u043b\u043a\u0438') + '</a></li></ul></div></div><div id="wiki-edit-dropdown2-attachment-' + soy.$$escapeHtml(opt_data.editorId) + '" class="aui-dropdown2 aui-style-default wiki-edit-dropdown wiki-edit-dropdown-attachment"><div class="aui-dropdown2-section wiki-edit-insert-attachment"><ul class="aui-list-truncate"><li><a href="#"></a></li></ul></div><div class="aui-dropdown2-section wiki-edit-browse-image"><ul class="aui-list-truncate"><li><a href="#" class="wiki-attachment-browse"><span class="aui-icon aui-icon-small aui-iconfont-add"></span>&nbsp;&nbsp;' + soy.$$escapeHtml('\u041f\u0440\u043e\u0441\u043c\u043e\u0442\u0440') + '</a></li></ul></div></div><div id="wiki-edit-color-picker-' + soy.$$escapeHtml(opt_data.editorId) + '" class="aui-dropdown2 aui-style-default wiki-edit-picker wiki-edit-color-picker">';
  var colors__soy78 = ['333333', '707070', 'cccccc', '205081', '59afe1', '14892c', '8eb021', 'd04437', 'f79232', 'f6c342', '654982', 'f691b2'];
  output += '<div class="aui-dropdown2-section"><ul>';
  var colorList80 = colors__soy78;
  var colorListLen80 = colorList80.length;
  for (var colorIndex80 = 0; colorIndex80 < colorListLen80; colorIndex80++) {
    var colorData80 = colorList80[colorIndex80];
    output += '<li><a href="#" style="background-color: #' + soy.$$escapeHtml(colorData80) + '" data-operation="color" data-color="#' + soy.$$escapeHtml(colorData80) + '">&nbsp;</a></li>';
  }
  output += '</ul></div></div><div id="wiki-edit-dropdown2-icon-picker-' + soy.$$escapeHtml(opt_data.editorId) + '" class="aui-dropdown2 aui-style-default wiki-edit-picker wiki-edit-icon-picker"><div class="aui-dropdown2-section"><ul><li><a href="#" class="wiki-edit-operation" title=":)" data-operation=":)"><img src="' + soy.$$escapeHtml("") + '/images/icons/emoticons/smile.gif" alt="' + soy.$$escapeHtml('smile') + '" /></a></li><li><a href="#" class="wiki-edit-operation" title=":(" data-operation=":("><img src="' + soy.$$escapeHtml("") + '/images/icons/emoticons/sad.gif" alt="' + soy.$$escapeHtml('sad') + '" /></a></li><li><a href="#" class="wiki-edit-operation" title=":P" data-operation=":P"><img src="' + soy.$$escapeHtml("") + '/images/icons/emoticons/tongue.gif" alt="' + soy.$$escapeHtml('tongue') + '" /></a></li><li><a href="#" class="wiki-edit-operation" title=":D" data-operation=":D"><img src="' + soy.$$escapeHtml("") + '/images/icons/emoticons/biggrin.gif" alt="' + soy.$$escapeHtml('biggrin') + '" /></a></li><li><a href="#" class="wiki-edit-operation" title=";)" data-operation=";)"><img src="' + soy.$$escapeHtml("") + '/images/icons/emoticons/wink.gif" alt="' + soy.$$escapeHtml('wink') + '" /></a></li><li><a href="#" class="wiki-edit-operation" title="(y)" data-operation="(y)"><img src="' + soy.$$escapeHtml("") + '/images/icons/emoticons/thumbs_up.gif" alt="' + soy.$$escapeHtml('thumbs up') + '" /></a></li><li><a href="#" class="wiki-edit-operation" title="(n)" data-operation="(n)"><img src="' + soy.$$escapeHtml("") + '/images/icons/emoticons/thumbs_down.gif" alt="' + soy.$$escapeHtml('thumbs down') + '" /></a></li><li><a href="#" class="wiki-edit-operation" title="(i)" data-operation="(i)"><img src="' + soy.$$escapeHtml("") + '/images/icons/emoticons/information.gif" alt="' + soy.$$escapeHtml('\u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044f') + '" /></a></li><li><a href="#" class="wiki-edit-operation" title="(/)" data-operation="(/)"><img src="' + soy.$$escapeHtml("") + '/images/icons/emoticons/check.gif" alt="' + soy.$$escapeHtml('\u043f\u0440\u043e\u0432\u0435\u0440\u0438\u0442\u044c') + '" /></a></li><li><a href="#" class="wiki-edit-operation" title="(x)" data-operation="(x)"><img src="' + soy.$$escapeHtml("") + '/images/icons/emoticons/error.gif" alt="' + soy.$$escapeHtml('\u043e\u0448\u0438\u0431\u043a\u0430') + '" /></a></li><li><a href="#" class="wiki-edit-operation" title="(!)" data-operation="(!)"><img src="' + soy.$$escapeHtml("") + '/images/icons/emoticons/warning.gif" alt="' + soy.$$escapeHtml('\u043f\u0440\u0435\u0434\u0443\u043f\u0440\u0435\u0436\u0434\u0435\u043d\u0438\u0435') + '" /></a></li><li><a href="#" class="wiki-edit-operation" title="(+)" data-operation="(+)"><img src="' + soy.$$escapeHtml("") + '/images/icons/emoticons/add.gif" alt="' + soy.$$escapeHtml('\u0434\u043e\u0431\u0430\u0432\u0438\u0442\u044c') + '" /></a></li><li><a href="#" class="wiki-edit-operation" title="(-)" data-operation="(-)"><img src="' + soy.$$escapeHtml("") + '/images/icons/emoticons/forbidden.gif" alt="' + soy.$$escapeHtml('\u0437\u0430\u043f\u0440\u0435\u0449\u0435\u043d\u043e') + '" /></a></li><li><a href="#" class="wiki-edit-operation" title="(?)" data-operation="(?)"><img src="' + soy.$$escapeHtml("") + '/images/icons/emoticons/help_16.gif" alt="' + soy.$$escapeHtml('\u043f\u043e\u043c\u043e\u0449\u044c') + '" /></a></li><li><a href="#" class="wiki-edit-operation" title="(on)" data-operation="(on)"><img src="' + soy.$$escapeHtml("") + '/images/icons/emoticons/lightbulb_on.gif" alt="' + soy.$$escapeHtml('lightbulb on') + '" /></a></li><li><a href="#" class="wiki-edit-operation" title="(off)" data-operation="(off)"><img src="' + soy.$$escapeHtml("") + '/images/icons/emoticons/lightbulb.gif" alt="' + soy.$$escapeHtml('lightbulb') + '" /></a></li><li><a href="#" class="wiki-edit-operation" title="(*)" data-operation="(*)"><img src="' + soy.$$escapeHtml("") + '/images/icons/emoticons/star_yellow.gif" alt="' + soy.$$escapeHtml('star yellow') + '" /></a></li><li><a href="#" class="wiki-edit-operation" title="(*r)" data-operation="(*r)"><img src="' + soy.$$escapeHtml("") + '/images/icons/emoticons/star_red.gif" alt="' + soy.$$escapeHtml('star red') + '" /></a></li><li><a href="#" class="wiki-edit-operation" title="(*g)" data-operation="(*g)"><img src="' + soy.$$escapeHtml("") + '/images/icons/emoticons/star_green.gif" alt="' + soy.$$escapeHtml('star green') + '" /></a></li><li><a href="#" class="wiki-edit-operation" title="(*b)" data-operation="(*b)"><img src="' + soy.$$escapeHtml("") + '/images/icons/emoticons/star_blue.gif" alt="' + soy.$$escapeHtml('star blue') + '" /></a></li><li><a href="#" class="wiki-edit-operation" title="(*y)" data-operation="(*y)"><img src="' + soy.$$escapeHtml("") + '/images/icons/emoticons/star_yellow.gif" alt="' + soy.$$escapeHtml('star yellow') + '" /></a></li><li><a href="#" class="wiki-edit-operation" title="(flag)" data-operation="(flag)"><img src="' + soy.$$escapeHtml("") + '/images/icons/emoticons/flag.gif" alt="' + soy.$$escapeHtml('\u043e\u0442\u043c\u0435\u0442\u0438\u0442\u044c') + '" /></a></li><li><a href="#" class="wiki-edit-operation" title="(flagoff)" data-operation="(flagoff)"><img src="' + soy.$$escapeHtml("") + '/images/icons/emoticons/flag_grey.gif" alt="' + soy.$$escapeHtml('\u0441\u043d\u044f\u0442\u044c \u043e\u0442\u043c\u0435\u0442\u043a\u0443') + '" /></a></li></ul></div></div><div id="wiki-edit-dropdown2-other-' + soy.$$escapeHtml(opt_data.editorId) + '" class="aui-dropdown2 aui-style-default wiki-edit-dropdown"><div class="aui-dropdown2-section"><ul class="aui-list-truncate"><li><a href="#" class="wiki-edit-operation" data-operation="mention">' + soy.$$escapeHtml('\u0423\u043f\u043e\u043c\u0438\u043d\u0430\u043d\u0438\u0435 \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044f') + '</a></li><li><a href="#" class="wiki-edit-operation" data-operation="table">' + soy.$$escapeHtml('\u0422\u0430\u0431\u043b\u0438\u0446\u0430') + '</a></li><li><a href="#" class="wiki-edit-operation" data-operation="code">' + soy.$$escapeHtml('\u041a\u043e\u0434') + '</a></li><li><a href="#" class="wiki-edit-operation" data-operation="noformat">' + soy.$$escapeHtml('\u0424\u043e\u0440\u043c\u0430\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u043d\u044b\u0439') + '</a></li><li><a href="#" class="wiki-edit-operation" data-operation="panel">' + soy.$$escapeHtml('\u041f\u0430\u043d\u0435\u043b\u044c') + '</a></li><li><a href="#" class="wiki-edit-operation" data-operation="hr">' + soy.$$escapeHtml('\u0413\u043e\u0440\u0438\u0437\u043e\u043d\u0442\u0430\u043b\u044c\u043d\u0430\u044f \u043b\u0438\u043d\u0435\u0439\u043a\u0430') + '</a></li><li class="wiki-edit-speech-item hidden"><a href="#" class="wiki-edit-operation" data-operation="speech">' + soy.$$escapeHtml('\u0420\u0430\u0441\u043f\u043e\u0437\u043d\u0430\u0432\u0430\u043d\u0438\u0435 \u0440\u0435\u0447\u0438') + '</a></li></ul></div></div><div class="wiki-edit-toolbar" id="wiki-edit-' + soy.$$escapeHtml(opt_data.editorId) + '"><div class="aui-toolbar2"><div class="aui-toolbar2-inner"><div class="aui-toolbar2-primary"><div class="aui-buttons"><a href="#" tabindex="-1" class="aui-button aui-button-subtle aui-dropdown2-trigger wiki-edit-style-picker-trigger" aria-owns="wiki-edit-dropdown2-text-style-' + soy.$$escapeHtml(opt_data.editorId) + '" aria-haspopup="true" aria-controls="wiki-edit-dropdown2-text-style-' + soy.$$escapeHtml(opt_data.editorId) + '">' + soy.$$escapeHtml('\u0421\u0442\u0438\u043b\u044c') + '</a></div><div class="aui-buttons wiki-edit-toolbar-section"><a href="#" tabindex="-1" class="aui-button aui-button-subtle wiki-edit-operation" data-operation="bold" data-shortcut="ctrl+b, command+b" title="' + soy.$$escapeHtml('\u041f\u043e\u043b\u0443\u0436\u0438\u0440\u043d\u044b\u0439') + ' (' + soy.$$escapeHtml(opt_data.controlKey) + '+B)"><span class="aui-icon aui-icon-small aui-iconfont-editor-bold">' + soy.$$escapeHtml('\u041f\u043e\u043b\u0443\u0436\u0438\u0440\u043d\u044b\u0439') + '</span></a><a href="#" tabindex="-1" class="aui-button aui-button-subtle wiki-edit-operation" data-operation="italic" data-shortcut="ctrl+i, command+i" title="' + soy.$$escapeHtml('\u041a\u0443\u0440\u0441\u0438\u0432') + ' (' + soy.$$escapeHtml(opt_data.controlKey) + '+I)"><span class="aui-icon aui-icon-small aui-iconfont-editor-italic">' + soy.$$escapeHtml('\u041a\u0443\u0440\u0441\u0438\u0432') + '</span></a><a href="#" tabindex="-1" class="aui-button aui-button-subtle wiki-edit-operation" data-operation="underline" data-shortcut="ctrl+u, command+u" title="' + soy.$$escapeHtml('\u041f\u043e\u0434\u0447\u0435\u0440\u043a\u043d\u0443\u0442\u044b\u0439') + ' (' + soy.$$escapeHtml(opt_data.controlKey) + '+U)"><span class="aui-icon aui-icon-small aui-iconfont-editor-underline">' + soy.$$escapeHtml('\u041f\u043e\u0434\u0447\u0435\u0440\u043a\u043d\u0443\u0442\u044b\u0439') + '</span></a><a href="#" tabindex="-1" class="aui-button aui-button-subtle wiki-edit-operation wiki-edit-operation-color" data-operation="color" data-color="red" title="' + soy.$$escapeHtml('\u0426\u0432\u0435\u0442 \u0442\u0435\u043a\u0441\u0442\u0430') + '"><span class="aui-icon aui-icon-small aui-iconfont-editor-color">' + soy.$$escapeHtml('\u0426\u0432\u0435\u0442 \u0442\u0435\u043a\u0441\u0442\u0430') + '</span><span class="wiki-edit-color-indicator"></span></a><a href="#" tabindex="-1" class="aui-button aui-button-subtle aui-dropdown2-trigger wiki-edit-color-picker-trigger" data-operation="color-parameter" aria-owns="wiki-edit-color-picker-' + soy.$$escapeHtml(opt_data.editorId) + '" aria-haspopup="true" title="' + soy.$$escapeHtml('\u0411\u043e\u043b\u044c\u0448\u0435 \u0446\u0432\u0435\u0442\u043e\u0432') + '"><span>' + soy.$$escapeHtml('\u0411\u043e\u043b\u044c\u0448\u0435 \u0446\u0432\u0435\u0442\u043e\u0432') + '</span></a><a href="#" tabindex="-1" class="aui-button aui-button-subtle aui-dropdown2-trigger wiki-edit-more-picker-trigger" aria-owns="wiki-edit-dropdown2-more-' + soy.$$escapeHtml(opt_data.editorId) + '" aria-haspopup="true" aria-controls="wiki-edit-dropdown2-more-' + soy.$$escapeHtml(opt_data.editorId) + '" title="' + soy.$$escapeHtml('\u0415\u0449\u0435') + '"><span class="aui-icon aui-icon-small aui-iconfont-editor-styles">' + soy.$$escapeHtml('\u0415\u0449\u0435') + '</span></a></div><div class="aui-buttons"><a href="#" tabindex="-1" class="aui-button aui-button-subtle aui-dropdown2-trigger wiki-edit-link-picker-trigger" aria-owns="wiki-edit-dropdown2-link-' + soy.$$escapeHtml(opt_data.editorId) + '" aria-haspopup="true" aria-controls="wiki-edit-dropdown2-link-' + soy.$$escapeHtml(opt_data.editorId) + '" title="' + soy.$$escapeHtml('\u0421\u0441\u044b\u043b\u043a\u0430') + ' (' + soy.$$escapeHtml(opt_data.controlKey) + '+K)"><span class="aui-icon aui-icon-small aui-iconfont-link">' + soy.$$escapeHtml('\u0421\u0441\u044b\u043b\u043a\u0430') + '</span></a><a href="#" tabindex="-1" class="aui-button aui-button-subtle aui-dropdown2-trigger wiki-edit-attachment-picker-trigger" aria-owns="wiki-edit-dropdown2-attachment-' + soy.$$escapeHtml(opt_data.editorId) + '" aria-haspopup="true" aria-controls="wiki-edit-dropdown2-attachment-' + soy.$$escapeHtml(opt_data.editorId) + '" title="' + soy.$$escapeHtml('\u0412\u043b\u043e\u0436\u0435\u043d\u0438\u0435') + '"><span class="aui-icon aui-icon-small aui-iconfont-file-generic">' + soy.$$escapeHtml('\u0412\u043b\u043e\u0436\u0435\u043d\u0438\u0435') + '</span></a></div><div class="aui-buttons wiki-edit-toolbar-section"><a href="#" tabindex="-1" class="aui-button aui-button-subtle wiki-edit-operation" data-operation="bullet-list" data-shortcut="ctrl+shift+b, command+shift+b" title="' + soy.$$escapeHtml('\u041c\u0430\u0440\u043a\u0438\u0440\u043e\u0432\u0430\u043d\u043d\u044b\u0439 \u0441\u043f\u0438\u0441\u043e\u043a') + ' (' + soy.$$escapeHtml(opt_data.controlKey) + '+Shift+B)"><span class="aui-icon aui-icon-small aui-iconfont-editor-list-bullet">' + soy.$$escapeHtml('\u041c\u0430\u0440\u043a\u0438\u0440\u043e\u0432\u0430\u043d\u043d\u044b\u0439 \u0441\u043f\u0438\u0441\u043e\u043a') + '</span></a><a href="#" tabindex="-1" class="aui-button aui-button-subtle wiki-edit-operation" data-operation="numbered-list" data-shortcut="ctrl+shift+n, command+shift+n" title="' + soy.$$escapeHtml('\u041d\u0443\u043c\u0435\u0440\u043e\u0432\u0430\u043d\u043d\u044b\u0439 \u0441\u043f\u0438\u0441\u043e\u043a') + ' (' + soy.$$escapeHtml(opt_data.controlKey) + '+Shift+N)"><span class="aui-icon aui-icon-small aui-iconfont-editor-list-number">' + soy.$$escapeHtml('\u041d\u0443\u043c\u0435\u0440\u043e\u0432\u0430\u043d\u043d\u044b\u0439 \u0441\u043f\u0438\u0441\u043e\u043a') + '</span></a></div><div class="aui-buttons"><a href="#" tabindex="-1" class="aui-button aui-button-subtle aui-dropdown2-trigger wiki-edit-icon-picker-trigger wiki-edit-tooltip" aria-owns="wiki-edit-dropdown2-icon-picker-' + soy.$$escapeHtml(opt_data.editorId) + '" aria-haspopup="true" aria-controls="wiki-edit-dropdown2-icon-picker-' + soy.$$escapeHtml(opt_data.editorId) + '" title="' + soy.$$escapeHtml('\u0417\u043d\u0430\u0447\u043a\u0438') + '"><span class="aui-icon aui-icon-small aui-iconfont-editor-emoticon">' + soy.$$escapeHtml('\u0417\u043d\u0430\u0447\u043a\u0438') + '</span></a><a href="#" tabindex="-1" class="aui-button aui-button-subtle aui-dropdown2-trigger wiki-edit-other-picker-trigger wiki-edit-tooltip" aria-owns="wiki-edit-dropdown2-other-' + soy.$$escapeHtml(opt_data.editorId) + '" aria-haspopup="true" aria-controls="wiki-edit-dropdown2-other-' + soy.$$escapeHtml(opt_data.editorId) + '" title="' + soy.$$escapeHtml('\u0414\u0440\u0443\u0433\u043e\u0435') + '"><span class="aui-icon aui-icon-small aui-iconfont-add">' + soy.$$escapeHtml('\u0414\u0440\u0443\u0433\u043e\u0435') + '</span></a></div><div class="aui-buttons wiki-edit-toolbar-last"><a href="#" tabindex="-1" class="aui-button aui-button-subtle wiki-edit-visible-toggle wiki-edit-tooltip" title="' + soy.$$escapeHtml('\u041f\u0435\u0440\u0435\u043a\u043b\u044e\u0447\u0435\u043d\u0438\u0435 \u0432\u0438\u0434\u0438\u043c\u043e\u0441\u0442\u0438') + '"><span class="aui-icon icon-toolbartoggle">Lock / Unlock</span></a></div></div></div><!-- .aui-toolbar-inner --></div></div>';
  return output;
};
if (goog.DEBUG) {
  JIRA.Templates.Plugins.WikiEditor.renderEditor.soyTemplateName = 'JIRA.Templates.Plugins.WikiEditor.renderEditor';
}


JIRA.Templates.Plugins.WikiEditor.renderListItem = function(opt_data, opt_ignored) {
  return '<li><a href="#" ' + soy.$$escapeHtml(opt_data.attachmentType ? 'data-attachment-type=' + opt_data.attachmentType : '') + '><span class="wiki-edit-attachment-type-icon aui-icon aui-icon-small ' + soy.$$escapeHtml(((opt_data.attachmentTypeIcon == null) ? null : opt_data.attachmentTypeIcon.cssClass) != null ? ((opt_data.attachmentTypeIcon == null) ? null : opt_data.attachmentTypeIcon.cssClass) : 'aui-iconfont-file-txt') + '" title="' + soy.$$escapeHtml(((opt_data.attachmentTypeIcon == null) ? null : opt_data.attachmentTypeIcon.title) != null ? ((opt_data.attachmentTypeIcon == null) ? null : opt_data.attachmentTypeIcon.title) : '\u0424\u0430\u0439\u043b') + '"></span>&nbsp;&nbsp;<span class="wiki-edit-attachment-name">' + soy.$$escapeHtml(opt_data.text) + '</span></a></li>';
};
if (goog.DEBUG) {
  JIRA.Templates.Plugins.WikiEditor.renderListItem.soyTemplateName = 'JIRA.Templates.Plugins.WikiEditor.renderListItem';
}
;
;
/* module-key = 'com.atlassian.jira.plugins.jira-wiki-editor:wiki-editor-resources', location = '/js/Analytics.js' */
define("wiki-edit/analytics",["wiki-edit/aui"],function(i){function r(i){var r,t=0;if(!i)return"";for(var a=0;a<i.length;a+=1)r=i.charCodeAt(a),t=32*t-t+r,t|=0;return t}var t=i.Analytics&&i.Analytics.triggerPrivacyPolicySafeEvent?function(r,t){i.Analytics.triggerPrivacyPolicySafeEvent("jira.wikieditor."+r,t||{})}:function(r,t){i.trigger("analytics",{name:"jira.wikieditor."+r,data:t||{}})};return{trigger:t,hashCode:r}});;
;
/* module-key = 'com.atlassian.jira.plugins.jira-wiki-editor:wiki-editor-resources', location = '/js/KeyTester.js' */
define("wiki-edit/KeyTester",function(){return{getActionType:function(i){return this.isNavigation(i)?"navigating":this.isDeleting(i)?"deleting":this.isReturn(i)?"newline":this.isEscape(i)?"escape":this.isTyping(i)?"typing":void 0},isNavigation:function(i){return i>=33&&i<=40||i>=63232&&i<=63235},isDeleting:function(i){return 8==i||46==i||127==i},isReturn:function(i){return 13==i},isEscape:function(i){return 27==i},isTyping:function(i){return i>47&&i<58||i>95&&i<112||i>64&&i<91||i>185&&i<193||i>218&&i<223||32==i||13==i}}});;
;
/* module-key = 'com.atlassian.jira.plugins.jira-wiki-editor:wiki-editor-resources', location = '/js/UndoManager.js' */
define("wiki-edit/UndoManager",function(){var t=function(){this._undoStack=[],this._redoStack=[],this._current=void 0};return t.prototype.MAX_STACK=1e3,t.prototype.updateCurrent=function(t,n){t!=this._current&&(this._current=t,n||(this._redoStack.length=0))},t.prototype.push=function(t){this._redoStack.length=0,this._undoStack.length&&_.isEqual(t,this._undoStack[this._undoStack.length-1])||(this._undoStack.push(t),this._current=t),this._undoStack.length>this.MAX_STACK&&this._undoStack.splice(0,this._undoStack.length-this.MAX_STACK)},t.prototype.undo=function(){if(this.canUndo()){var t;do t=this._undoStack.pop();while(_.isEqual(t,this._current)&&this.canUndo());return this._redoStack.push(this._current),this._current=t,t}},t.prototype.redo=function(){if(this.canRedo()){var t=this._redoStack.pop();return this._undoStack.push(this._current),this._current=t,t}},t.prototype.canUndo=function(){return!!this._undoStack.length},t.prototype.canRedo=function(){return!!this._redoStack.length},t});;
;
/* module-key = 'com.atlassian.jira.plugins.jira-wiki-editor:wiki-editor-resources', location = '/js/UndoableTextarea.js' */
define("wiki-edit/UndoableTextarea",["wiki-edit/UndoManager","wiki-edit/KeyTester","jquery"],function(e,t,n){function i(e,t){t!==a&&o==t||("newline"!=o&&e.recordHistoryItem(),o=t)}function r(e,t){if(e.undoManager["can"+t[0].toUpperCase()+t.substring(1)]()){var n=e.undoManager[t]();e.element.value=n.value,e.element.selectionStart=n.selectionStart,e.element.selectionEnd=n.selectionEnd}}var a="cut-paste",o="",s=function(r){this.element=r,this.$el=n(r),this.undoManager=new e,this.undoManager.updateCurrent(this.getValue()),this.undoManager.push(this.getValue());var o=function(e){var n=e.keyCode,r=String.fromCharCode(n);if(n)if(e.ctrlKey||e.metaKey){if((e.ctrlKey||e.metaKey)&&!e.altKey)switch(r.toLowerCase()){case"y":this.undoManager.updateCurrent(this.getValue(),!0),this.redo(),e.preventDefault();break;case"z":this.undoManager.updateCurrent(this.getValue(),!0),e.shiftKey?this.redo():this.undo(),e.preventDefault()}}else this.undoManager.updateCurrent(this.getValue()),i(this,t.getActionType(n));else this.undoManager.updateCurrent(this.getValue()),i(this,"other")}.bind(this);this.$el.on("keydown",o),this.$el.on("paste cut",function(){this.undoManager.updateCurrent(this.getValue()),i(this,a)}.bind(this))};return s.prototype.getValue=function(){return{value:this.element.value,selectionStart:this.element.selectionStart,selectionEnd:this.element.selectionEnd}},s.prototype.updateCurrent=function(){this.undoManager.updateCurrent(this.getValue())},s.prototype.recordHistoryItem=function(){this.undoManager.push(this.getValue())},s.prototype.undo=function(){i(this,"undo"),r(this,"undo"),this.element.scrollTop=this.element.scrollHeight},s.prototype.redo=function(){r(this,"redo"),this.element.scrollTop=this.element.scrollHeight},s});;
;
/* module-key = 'com.atlassian.jira.plugins.jira-wiki-editor:wiki-editor-resources', location = '/js/TextareaManipulator.js' */
define("wiki-edit/TextareaManipulator",function(){var t=function(t){this.el=t};return t.prototype.NEW_LINE_TOKEN="\n",t.prototype.getSelection=function(){return{start:this.el.selectionStart,end:this.el.selectionEnd,length:this.el.selectionEnd-this.el.selectionStart,text:this.el.value.substring(this.el.selectionStart,this.el.selectionEnd)}},t.prototype.setSelection=function(t,e){1===arguments.length&&(e=t),this.el.selectionStart=t,this.el.selectionEnd=e},t.prototype.replaceSelectionWith=function(t,e){var n=this.el.selectionStart,i=this.el.value;this.el.value=i.substring(0,this.el.selectionStart)+t+i.substring(this.el.selectionEnd,i.length),this.el.selectionEnd=n+t.length,this.el.selectionStart=e?n:this.el.selectionEnd},t.prototype.wrapSelectionWith=function(t,e,n){arguments.length<3&&(n=""),1===arguments.length&&(e=t);var i=this.getSelection(),s=this.el.value;if(s.substring(i.start-t.length,i.start)!==t||s.substring(i.end,i.end+e.length)!==e){var l=s.substring(i.start,i.end);0==l.length&&(l=n),this.el.value=s.substring(0,i.start)+t+l+e+s.substring(i.end,s.length);var r=i.start+t.length;this.setSelection(r,r+l.length)}},t.prototype._getSelectedLines=function(){var t=this.el.value,e=this.getSelection(),n=t.substring(0,e.start).split(this.NEW_LINE_TOKEN).length-1,i=n+t.substring(e.start,e.end).split(this.NEW_LINE_TOKEN).length-1,s=t.split(this.NEW_LINE_TOKEN);return{lines:s,start:n,end:i}},t.prototype.getLineAtCursor=function(){var t=this._getSelectedLines();return t.lines[t.end]},t.prototype.getFirstLineMatch=function(t){var e=this._getSelectedLines(),n=e.lines[e.start].match(t);if(n)return n[0]},t.prototype.areSelectedLinesPrefixed=function(t){var e,n=this._getSelectedLines();for(e=n.start;e<=n.end;e++)if(0==n.lines[e].indexOf(t))return!0;return!1},t.prototype.prefixSelectedLines=function(t){var e,n=this.getSelection(),i=this._getSelectedLines(),s=0,l=!0;for(e=i.start;e<=i.end;e++)0!=i.lines[e].indexOf(t)?(s+=1,i.lines[e]=t+i.lines[e]):e==i.start&&(l=!1);this.el.value=i.lines.join(this.NEW_LINE_TOKEN);var r=t.length*s;this.setSelection(n.start+(l?t.length:0),n.end+r)},t.prototype.unprefixSelectedLines=function(t){var e,n=this.getSelection(),i=this._getSelectedLines(),s=!1,l=0;for(e=i.start;e<=i.end;e++)0==i.lines[e].indexOf(t)&&(l+=1,i.lines[e]=i.lines[e].substring(t.length),e==i.start&&(s=!0));this.el.value=i.lines.join(this.NEW_LINE_TOKEN);var r=t.length*l;this.setSelection(n.start-(s?t.length:0),n.end-r)},t});;
;
/* module-key = 'com.atlassian.jira.plugins.jira-wiki-editor:wiki-editor-resources', location = '/js/keymaster-setup.js' */
define("wiki-edit/keymaster-setup",["jquery","wiki-edit/keymaster"],function(e,i){return{init:function(){i.filter=function(t){var n,r=t.target||t.srcElement||!1;return!!(r&&(" "+r.className+" ").indexOf(" wiki-textfield ")>-1&&(n=e(r).data("wikiEditor")))&&(i.setScope(n.id),!0)}}}});;
;
/* module-key = 'com.atlassian.jira.plugins.jira-wiki-editor:wiki-editor-resources', location = '/js/WikiEnabledTextarea.js' */
define("wiki-edit/WikiEnabledTextarea",["wiki-edit/TextareaManipulator","wiki-edit/UndoableTextarea","wiki-edit/keymaster","wiki-edit/keymaster-setup","wiki-edit/SpeechRecognition","jquery"],function(e,i,t,n,o,r){n.init();var a=0,l=/^[#\*]+ /,p=function(n){if(this.el=n,this.$el=r(n),this.$el.data("wikiEditor"))return this.$el.data("wikiEditor");this.id="wikiEdit"+a,a+=1,this.manipulationEngine=new e(this.el),this.undoRedoEl=new i(n);var o=this;t("enter",o.id,function(e){var i=o.manipulationEngine.getSelection(),t=o.manipulationEngine.getFirstLineMatch(l);t&&(0==i.length&&o.manipulationEngine.getLineAtCursor()===t?o.manipulationEngine.unprefixSelectedLines(t):o.manipulationEngine.replaceSelectionWith("\n"+t),e.preventDefault())}),this.$el.data("wikiEditor",this)},d={bold:["*","*","\u0430\u043a\u0446\u0435\u043d\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u043d\u044b\u0439 \u0442\u0435\u043a\u0441\u0442"],italic:["_","_","\u0432\u044b\u0434\u0435\u043b\u0435\u043d\u043d\u044b\u0439 \u0442\u0435\u043a\u0441\u0442"],underline:["+","+","\u043f\u043e\u0434\u0447\u0435\u0440\u043a\u043d\u0443\u0442\u044b\u0439 \u0442\u0435\u043a\u0441\u0442"],delete:["-","-","\u0443\u0434\u0430\u043b\u0435\u043d\u043d\u044b\u0439 \u0442\u0435\u043a\u0441\u0442"],superscript:["^","^","\u043d\u0430\u0434\u0441\u0442\u0440\u043e\u0447\u043d\u044b\u0439 \u0442\u0435\u043a\u0441\u0442"],subscript:["~","~","\u043f\u043e\u0434\u0441\u0442\u0440\u043e\u0447\u043d\u044b\u0439 \u0442\u0435\u043a\u0441\u0442"],monospace:["{{","}}","\u043c\u043e\u043d\u043e\u0448\u0438\u0440\u0438\u043d\u043d\u044b\u0439 \u0442\u0435\u043a\u0441\u0442"],cite:["??","??","\u0446\u0438\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435"],"block-quote":["{quote}","{quote}","\u0446\u0438\u0442\u0438\u0440\u0443\u0435\u043c\u044b\u0439 \u0442\u0435\u043a\u0441\u0442"],color:["{color:$1}","{color}","\u0446\u0432\u0435\u0442\u043d\u043e\u0439 \u0442\u0435\u043a\u0441\u0442","red"],link:["[","|http://example.com]","\u043f\u0440\u0438\u0432\u044f\u0437\u0430\u0442\u044c \u0437\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a"],"link-anchor":["[#","]","\u044f\u043a\u043e\u0440\u044c"],"link-mail":["[mailto:","]","mail@example.com"],image:["!","!","http://example.com/image.png"],mention:["@","","\u0423\u043f\u043e\u043c\u044f\u043d\u0438\u0442\u0435 \u043a\u043e\u0433\u043e-\u043d\u0438\u0431\u0443\u0434\u044c, \u043d\u0430\u0431\u0440\u0430\u0432 \u0435\u0433\u043e \u0438\u043c\u044f\u2026"],code:["\n{code:java}\n","\n{code}\n","// Some comments here\npublic String getFoo()\n{\n    return foo;\n}"],noformat:["\n{noformat}\n","\n{noformat}\n","\u0434\u0430\u043b\u044c\u043d\u0435\u0439\u0448\u0435\u0435 _\u0444\u043e\u0440\u043c\u0430\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435_ *\u043d\u0435* \u0432\u044b\u043f\u043e\u043b\u043d\u044f\u0435\u0442\u0441\u044f"],panel:["\n{panel:title="+"\u041c\u043e\u0439 \u0437\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a"+"}\n","\n{panel}\n","\u041d\u0435\u043a\u0438\u0439 \u0442\u0435\u043a\u0441\u0442 \u0441 \u0437\u0430\u0433\u043e\u043b\u043e\u0432\u043a\u043e\u043c"],table:["\n||"+"\u0417\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a"+" 1||"+"\u0417\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a"+" 2||\n|","|"+"\u0421\u0442\u043e\u043b\u0431\u0435\u0446"+" A2|\n","\u0421\u0442\u043e\u043b\u0431\u0435\u0446"+" A1"]};for(var h in d)p.prototype[h]=function(e,i){var t=0;return e.length>3&&(t=e.length-3),function(){var i,n=e[0],o=e[1],r=e[2];for(i=1;i<=t;i++)n=n.replace("$"+i,arguments[i-1]||e[2+i]),o=o.replace("$"+i,arguments[i-1]||e[2+i]);var a=this.el.value,l=this.manipulationEngine.getSelection();this.undoRedoEl.recordHistoryItem(),a.substring(l.start-n.length,l.start)===n&&a.substring(l.end,l.end+o.length)===o?(this.el.value=a.substring(0,l.start-n.length)+a.substring(l.start,l.end)+a.substring(l.end+o.length,a.length),this.manipulationEngine.setSelection(l.start-n.length,l.end-n.length)):this.manipulationEngine.wrapSelectionWith.call(this.manipulationEngine,n,o,r),this.undoRedoEl.recordHistoryItem(),this.$el.trigger("input")}}(d[h],h);var c={paragraph:"","bullet-list":"* ","numbered-list":"# ",h1:"h1. ",h2:"h2. ",h3:"h3. ",h4:"h4. ",h5:"h5. ",h6:"h6. ","paragraph-quote":"bq. "};for(var h in c)p.prototype[h]=function(e){return function(){this.undoRedoEl.recordHistoryItem();for(var i in c)this.manipulationEngine.areSelectedLinesPrefixed(c[i])&&this.manipulationEngine.unprefixSelectedLines(c[i]);this.manipulationEngine.prefixSelectedLines.call(this.manipulationEngine,e),this.undoRedoEl.recordHistoryItem(),this.$el.trigger("input")}}(c[h]);var g={hr:"\n----\n",":)":":)",":(":":(",":P":":P",":D":":D",";)":";)","(y)":"(y)","(n)":"(n)","(i)":"(i)","(/)":"(/)","(x)":"(x)","(!)":"(!)","(+)":"(+)","(-)":"(-)","(?)":"(?)","(on)":"(on)","(off)":"(off)","(*)":"(*)","(*r)":"(*r)","(*g)":"(*g)","(*b)":"(*b)","(*y)":"(*y)","(flag)":"(flag)","(flagoff)":"(flagoff)","image-attachment":[" !$1|thumbnail! ","attachment-name.jpg"],"image-attachment-full":[" !$1! ","attachment-name.gif"],"link-attachment":[" [^$1] ","attachment-name.zip"]};for(var h in g)p.prototype[h]=function(e){var i,t=0;return _.isArray(e)&&(t=e.length-1,i=e.slice(1),e=e[0]),function(){var n,o=e;for(n=1;n<=t;n++)o=e.replace("$"+n,arguments[n-1]||i[n-1]);this.undoRedoEl.recordHistoryItem(),this.manipulationEngine.replaceSelectionWith.call(this.manipulationEngine,o,!1),this.undoRedoEl.recordHistoryItem(),this.$el.trigger("input")}}(g[h]);return p.prototype.speech=function(){o.start(this)},p});;
;
/* module-key = 'com.atlassian.jira.plugins.jira-wiki-editor:wiki-editor-resources', location = '/js/WikiEditor.js' */
define("wiki-edit/WikiEditor",["wiki-edit/WikiEnabledTextarea","jquery","underscore","wiki-edit/JIRA","wiki-edit/keymaster","wiki-edit/analytics","wiki-edit/WikiEditorUtil","jira/util/events","jira/attachments/api","jira/featureflags/feature-manager"],function(t,e,i,a,n,o,r,d,l,c){function s(t){var e=AJS.$(t).closest(".aui-dropdown2");e.length&&e[0].hide()}var f="Ctrl";navigator.platform.indexOf("Mac")!=-1&&(f="⌘");var h=function(t){return t.match(/\.(bmp|gif|jpg|jpeg|png|tiff|webp)$/i)?"image":"file"},p=function(t,e,i){"image"==i?(e.match(/\.gif$/i)?t["image-attachment-full"](e):t["image-attachment"](e),o.trigger("operation.attachment.image")):(t["link-attachment"](e),o.trigger("operation.attachment.link"))};return{create:function(i){function d(t){t.preventDefault(),t.stopPropagation(),W=!W,S.toggleClass("active",W),u.toggleClass("wiki-edit-toolbar-compact",W),localStorage.setItem("jira.wikieditor.visibility"+i.name+"."+i.id,W?"true":"false"),o.trigger(W?"hide":"show")}if("undefined"!=typeof i.selectionStart){var l=e(i);if(!l.data("wikiEditor")){var c=new t(i);this.wikiEditor=c;var g=e(a.Templates.Plugins.WikiEditor.renderEditor({editorId:c.id,controlKey:f})),u=g.filter(".wiki-edit-toolbar");"webkitSpeechRecognition"in window&&g.find(".wiki-edit-speech-item").removeClass("hidden"),l.parent().before(g);var m,v=l.closest(".jira-dialog").length>0||l.closest("form#issue-create").length>0,k=l.closest("#create-issue-dialog").length>0,w=e("#issue-content").length>0,b=l.closest("#addcomment").length>0,y=g.find(".wiki-edit-operation[title], .aui-dropdown2-trigger, .wiki-edit-tooltip");m=v?"Dialog.beforeHide":a.Events.BEFORE_INLINE_EDIT_CANCEL,y.each(function(){var t=e(this),i={aria:!0,hideOnClick:!0,hoverable:!1};t.parent().is("li")&&(i.gravity="w"),t.tooltip(i)});var E=function(){y.each(function(){e(this).tooltip("hide")})};a.bind(m,E);var C=!1,T=g.filter(".aui-dropdown2");T.on({"aui-dropdown2-show":function(){C=!0,l.focus()},"aui-dropdown2-hide":function(){C=!1,E()}}),l.on("keydown",function(t){C&&t.keyCode===AJS.keyCode.ESCAPE&&(v?a.one("Dialog.beforeHide",function(t){t.preventDefault()}):w&&!b&&a.one(a.Events.BEFORE_INLINE_EDIT_CANCEL,function(t){t.preventDefault()}))});var I=g.filter(".wiki-edit-dropdown-image, .wiki-edit-dropdown-attachment"),_=I.find(".wiki-edit-insert-image, .wiki-edit-insert-attachment"),j=I.find(".wiki-edit-insert-image ul, .wiki-edit-insert-attachment ul");j.on("click","a",function(t){t.preventDefault(),s(t.target);var i=e(this).attr("data-attachment-type");"undefined"==typeof i&&(i="file");var a=e(this).find(".wiki-edit-attachment-name").text();p(c,a,i)}),I.on("aui-dropdown2-show",function(){var t=[],i=[];v&&e(".upload-progress-bar:not(.upload-progress-bar__upload-error) span.upload-progress-bar__file-name").each(function(e,i){t.push(i)}),!k&&w&&e("#attachment_thumbnails li.attachment-content, #file_attachments li.attachment-content").each(function(e,i){t.push(i)});var n=function(t,e){if(!t)return null;var i=r.getFileExtension(t);return{name:t,type:e,icon:r.translateFileExtensionToAttachmentTypeIcon(i)}},o=e("#ghx-tab-attachments .ghx-container");o.find("#file_attachments li.attachment-content > dl dt.attachment-title a, #file_attachments div.verbose dt.attachment-title a").each(function(t,e){var a=n(e.textContent,"file");a&&i.push(a)}),o.find("#attachment_thumbnails a.attachment-title").each(function(t,e){var a=n(e.textContent,"image");a&&i.push(a)}),j.empty(),_.addClass("hidden"),(v||w)&&t.length?(_.removeClass("hidden"),e(t).each(function(){var t=e(this).is("span.upload-progress-bar__file-name")?e(this).text():e(this).find("a.attachment-title, .attachment-title a").first().text(),i=e(this).attr("data-attachment-type");void 0===i&&(i=h(t));var n=r.defaultAttachmentTypeIcon,o=e(this).attr("data-downloadurl");if(void 0===o&&(o=e(this).find("[data-downloadurl]").attr("data-downloadurl")),void 0!==o&&"string"==typeof o){var d=o.split(":");if(d.length>0){var l=d[0];n=r.translateMimeTypeToAttachmentTypeIcon(l)}}else if(void 0!==t&&"string"==typeof t){var c=t.match(/\.(\w{1,5})$/i);if(c&&c.length>1){var s=c[1];n=r.translateFileExtensionToAttachmentTypeIcon(s)}}j.append(e(a.Templates.Plugins.WikiEditor.renderListItem({text:t,attachmentType:i,attachmentTypeIcon:n})))})):!k&&i.length>0&&(_.removeClass("hidden"),i.forEach(function(t){if(null!=t&&null!=t.name){var i=t.name,n=t.type?t.type:"file",o=t.icon?t.icon:{cssClass:"aui-iconfont-devtools-file",title:""};j.append(e(a.Templates.Plugins.WikiEditor.renderListItem({text:i,attachmentType:n,attachmentTypeIcon:o})))}}))}),r.compareVersion(AJS.version,"5.8.0")<0&&I.on("aui-dropdown2-item-selected",function(){var t=e(this).find(".aui-dropdown2-active");if("object"==typeof t){var i=t.closest("div");if("object"==typeof i){var a=i.offset().top,n=a+i.height(),o=t.offset().top,r=o+t.height();o<a&&i.scrollTop(i.scrollTop()-(a-o)),r>n&&i.scrollTop(i.scrollTop()+(r-n))}}}),g.filter(".wiki-edit-dropdown, .wiki-edit-picker").on("mousedown",function(t){t.preventDefault()}),g.find(".wiki-edit-operation:not(.wiki-edit-operation-color)").each(function(){var t=e(this),i=function(e){e&&(e.preventDefault&&e.preventDefault(),s(e.target),l.focus(),c[t.data("operation")](),o.trigger("operation",{name:t.data("operation"),nameHash:o.hashCode(t.data("operation")),trigger:e.type}),o.trigger("operation."+t.data("operation"),{trigger:e.type}))};t.click(i),t.data("shortcut")&&n(t.data("shortcut"),c.id,i)}),g.find(".wiki-edit-operation-color").each(function(){var t=e(this),i=function(e){e&&(e.preventDefault&&e.preventDefault(),s(e.target),l.focus(),c[t.data("operation")](t.data("color")),o.trigger("operation",{name:t.data("operation"),nameHash:o.hashCode(t.data("operation")),trigger:e.type}),o.trigger("operation."+t.data("operation"),{trigger:e.type}))};t.click(i),t.data("shortcut")&&n(t.data("shortcut"),c.id,i)});var x=window.localStorage.getItem("jira.wikieditor.last.color")?window.localStorage.getItem("jira.wikieditor.last.color"):"red",D=g.find(".wiki-edit-operation-color");D.data("color",x);var A=u.find(".wiki-edit-color-indicator");A.css("background-color",x),g.filter(".wiki-edit-color-picker").on("click","a",function(t){t.preventDefault(),s(t.target),l.focus();var i=e(this).data("color");c.color(i),o.trigger("operation",{name:"color"}),o.trigger("operation.color.picked",{color:i}),D.data("color",i),A.css("background-color",i),window.localStorage.setItem("jira.wikieditor.last.color",i)});var S=g.find(".wiki-edit-visible-toggle"),W="true"===localStorage.getItem("jira.wikieditor.visibility"+i.name+"."+i.id);W&&(S.addClass("active"),u.addClass("wiki-edit-toolbar-compact")),S.on("click",d),u.parent().on("click",".wiki-edit-toolbar-compact",d),e(document).on("showWikiPreview",function(t,a){e(a).find(i).length&&u.addClass("hidden")}),e(document).on("showWikiInput",function(t,a){e(a).find(i).length&&u.removeClass("hidden")})}}},initBrowseLink:function(t){var i=this.wikiEditor,a=e(t),n=a.parent().siblings().find(".wiki-attachment-browse"),r=e("#dnd-metadata-webpanel").data("can-attach"),c=a.closest(".jira-dialog").length>0||a.closest("form#issue-create").length>0;if(c){var f=["#create-issue-dialog:visible","#create-subtask-dialog:visible","#edit-issue-dialog:visible","#create-linked-issue-dialog:visible"],g=e(f.join(",")),u=g.length>0;r=e(".jira-dialog fieldset span:contains('Attachment')").length>0,u||(g=a.closest(".dialog-can-receive-files:visible"),u=g.length>0,r=g.data("can-attach"));var m=g.data("insert-markup-on-browse")}var v=a.parent().siblings().find(".wiki-edit-attachment-picker-trigger");if(!r||c&&!u){n.closest("div").addClass("hidden");var k=e("#attachment_thumbnails li.attachment-content, #file_attachments li.attachment-content"),w=k.length>0,b=c&&u&&("create-issue-dialog"===g.attr("id")||"create-subtask-dialog"===g.attr("id")),y=w&&!b;y||v.addClass("hidden")}else n.closest("div").removeClass("hidden"),v.removeClass("hidden"),n.data("initialised")||(n.on("click",function(t){t.preventDefault(),s(t.target);var a=function(){var t=e('<input type="file" multiple />');t.change(function(a){var n=t[0].files;if(c){var o=e.Event("drop");o.dataTransfer={files:n},g.find(".issue-drop-zone__target").trigger(o)}else d.trigger("attachmentForPageReceived",{files:n,isWikiTextfieldFocused:!0});if(!c||m)for(var r=0;r<n.length;r++){var l=n[r].name;p(i,l,h(l))}}),t.click(),o.trigger("attachment.dropdown.button.clicked.browse")},n={onFileUploadStarted:function(t){p(i,t.name,h(t.name))},blockWikiEditorMarkupInsert:!0};l.doUpload(n)?o.trigger("issue.wiki-editor.browse-link.media-picker"):(o.trigger("issue.wiki-editor.browse-link.fallback"),a())}),n.data("initialised",!0))}}});;
;
/* module-key = 'com.atlassian.jira.plugins.jira-wiki-editor:wiki-editor-resources', location = '/js/WikiEditorUtil.js' */
define("wiki-edit/WikiEditorUtil",["jquery","underscore"],function(i,e){var t={cssClass:"aui-iconfont-devtools-file",title:"\u0424\u0430\u0439\u043b"},n={pdf:"aui-iconfont-file-pdf",gif:"aui-iconfont-image",png:"aui-iconfont-image",jpeg:"aui-iconfont-image",jpg:"aui-iconfont-image",xml:"aui-iconfont-file-code",html:"aui-iconfont-file-code",htm:"aui-iconfont-file-code",txt:"aui-iconfont-file-txt",zip:"aui-iconfont-file-zip",gz:"aui-iconfont-file-zip",tar:"aui-iconfont-file-zip",rar:"aui-iconfont-file-zip","7z":"aui-iconfont-file-zip",doc:"aui-iconfont-file-doc",docx:"aui-iconfont-file-doc",xls:"aui-iconfont-file-xls",xlsx:"aui-iconfont-file-xls",xlsm:"aui-iconfont-file-xls",ppt:"aui-iconfont-file-ppt",pptx:"aui-iconfont-file-ppt",java:"aui-iconfont-file-code",c:"aui-iconfont-file-code",h:"aui-iconfont-file-code",cpp:"aui-iconfont-file-code",hpp:"aui-iconfont-file-code",scala:"aui-iconfont-file-code",php:"aui-iconfont-file-code",css:"aui-iconfont-file-code",less:"aui-iconfont-file-code",soy:"aui-iconfont-file-code",js:"aui-iconfont-file-code",jar:"aui-iconfont-file-zip",war:"aui-iconfont-file-zip",obr:"aui-iconfont-file-zip"},o={pdf:"PDF \u0444\u0430\u0439\u043b",gif:"GIF \u0444\u0430\u0439\u043b",png:"PNG \u0444\u0430\u0439\u043b",jpeg:"JPEG \u0444\u0430\u0439\u043b",jpg:"JPEG \u0444\u0430\u0439\u043b",xml:"XML \u0444\u0430\u0439\u043b",html:"HTML \u0444\u0430\u0439\u043b",htm:"HTML \u0444\u0430\u0439\u043b",txt:"\u0422\u0435\u043a\u0441\u0442\u043e\u0432\u044b\u0439 \u0444\u0430\u0439\u043b",zip:"ZIP \u0430\u0440\u0445\u0438\u0432",gz:"GZip \u0430\u0440\u0445\u0438\u0432",doc:"Microsoft Word",docx:"Microsoft Word",xls:"Microsoft Excel",xlsx:"Microsoft Excel",xlsm:"Microsoft Excel",ppt:"Microsoft PowerPoint",pptx:"Microsoft PowerPoint",java:"\u0424\u0430\u0439\u043b \u0438\u0441\u0445\u043e\u0434\u043d\u043e\u0433\u043e \u043a\u043e\u0434\u0430 Java",jar:"\u0424\u0430\u0439\u043b \u0430\u0440\u0445\u0438\u0432\u0430 Java",war:"\u0424\u0430\u0439\u043b \u0430\u0440\u0445\u0438\u0432\u0430 Java"};return{defaultAttachmentTypeIcon:t,translateMimeTypeToAttachmentTypeIcon:function(i){return{cssClass:JIRA.Templates.ViewIssue.matchFileClass({mimetype:i}),title:JIRA.Templates.ViewIssue.matchFileIconAlt({mimetype:i})}},translateFileExtensionToAttachmentTypeIcon:function(i){var c=e.clone(t);if("string"!=typeof i)return c;i=i.toLowerCase(),i=i.replace(/^\.+/,"");var f=n[i];"string"==typeof f&&(c.cssClass=f);var a=o[i];return"string"==typeof a&&(c.title=a),c},compareVersion:function(e,t){var n=e.split("."),o=t.split("."),c=NaN;return i(n).each(function(i,e){if(i>=o.length)return!1;var t=Number(e),n=Number(o[i]);return isNaN(t)||isNaN(n)?(c=NaN,!1):t<n?(c=-1,!1):t>n?(c=1,!1):void(c=0)}),0==c&&n.length!=o.length?n.length>o.length?1:-1:c},getFileExtension:function(i){if("string"!=typeof i)return"";var e=i.match(/\.(\w{1,5})$/i);return e&&e.length>1?e[1]:""}}});;
;
/* module-key = 'com.atlassian.jira.plugins.jira-wiki-editor:wiki-editor-resources', location = '/js/SpeechRecognition.js' */
define("wiki-edit/SpeechRecognition",["jquery","aui/flag"],function(e,t){function i(e){return e&&e[0]&&e[0].isFinal}function r(e){return e&&e[0]&&e[0][0]&&e[0][0].transcript||""}return{start:function(e){var t=this,o=new webkitSpeechRecognition;o.continuous=!1,o.interimResults=!0,o.lang=AJS.Meta.get("user-locale").replace("_","-"),o.stop(),o.start(),o.onstart=function(){t.showTimedMessage({title:"\u041c\u043e\u0436\u043d\u043e \u043d\u0430\u0447\u0438\u043d\u0430\u0442\u044c \u0433\u043e\u0432\u043e\u0440\u0438\u0442\u044c )"},"info",10),t.selectionStart=e.manipulationEngine.getSelection().start},o.onresult=function(n){t.dismissCurrentMessage();var s=i(n.results),a=r(n.results);a=a.charAt(0).toUpperCase()+a.slice(1),s&&e.undoRedoEl.recordHistoryItem(),e.manipulationEngine.replaceSelectionWith.call(e.manipulationEngine,a,!1);var l=t.selectionStart+a.length;s?(e.manipulationEngine.setSelection(l),e.undoRedoEl.recordHistoryItem(),e.$el.trigger("input"),o.stop()):e.manipulationEngine.setSelection(t.selectionStart,l)},o.onerror=function(e){o.stop();var i={title:"\u0418\u0437\u0432\u0438\u043d\u0438\u0442\u0435, \u044f \u0432\u0430\u0441 \u043d\u0435 \u0441\u043b\u044b\u0448\u0443 (",body:""};switch(e.error){case"not-allowed":i.title="\u0420\u0430\u0441\u043f\u043e\u0437\u043d\u0430\u0432\u0430\u043d\u0438\u0435 \u0440\u0435\u0447\u0438 \u0432 \u0434\u0430\u043d\u043d\u044b\u0439 \u043c\u043e\u043c\u0435\u043d\u0442 \u043e\u0442\u043a\u043b\u044e\u0447\u0435\u043d\u043e",i.body="\u0427\u0442\u043e\u0431\u044b \u0432\u043a\u043b\u044e\u0447\u0438\u0442\u044c \u043a\u0430\u043c\u0435\u0440\u0443, \u043d\u0430\u0436\u043c\u0438\u0442\u0435 \u0435\u0435 \u0437\u043d\u0430\u0447\u043e\u043a \u0432 \u0430\u0434\u0440\u0435\u0441\u043d\u043e\u0439 \u0441\u0442\u0440\u043e\u043a\u0435 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0430";break;case"network":i.title="\u041d\u0435\u0442 \u0418\u043d\u0442\u0435\u0440\u043d\u0435\u0442-\u0441\u043e\u0435\u0434\u0438\u043d\u0435\u043d\u0438\u044f",i.body="\u0414\u043b\u044f \u0440\u0430\u0441\u043f\u043e\u0437\u043d\u0430\u0432\u0430\u043d\u0438\u044f \u0440\u0435\u0447\u0438 \u0442\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044f \u0440\u0430\u0431\u043e\u0447\u0435\u0435 \u0418\u043d\u0442\u0435\u0440\u043d\u0435\u0442-\u0441\u043e\u0435\u0434\u0438\u043d\u0435\u043d\u0438\u0435.";break;case"no-speech":i.title="\u0418\u0437\u0432\u0438\u043d\u0438\u0442\u0435, \u044f \u043d\u0438\u0447\u0435\u0433\u043e \u043d\u0435 \u0440\u0430\u0441\u0441\u043b\u044b\u0448\u0430\u043b (",i.body="\u0412\u0430\u0448 \u043c\u0438\u043a\u0440\u043e\u0444\u043e\u043d \u0440\u0430\u0431\u043e\u0442\u0430\u0435\u0442, \u043d\u0435 \u043e\u0442\u043a\u043b\u044e\u0447\u0435\u043d?";break;case"aborted":return}t.showTimedMessage(i,"warning",5)},o.onend=function(){o.stop()}},showTimedMessage:function(e,i,r){this.dismissCurrentMessage(),this.speakFlag=t({type:i,title:e.title,body:e.body,persistent:!0}),clearTimeout(this.flagTimer),this.flagTimer=setTimeout(this.dismissCurrentMessage.bind(this),1e3*r)},dismissCurrentMessage:function(){this.speakFlag&&this.speakFlag.close&&(this.speakFlag.close(),this.speakFlag=null)}}});;
;
/* module-key = 'com.atlassian.jira.plugins.jira-wiki-editor:skate', location = '/js/lib/skate.js' */
define("wiki-edit/skate",["jira/skate"],function(e){return e});;
;
/* module-key = 'com.atlassian.jira.plugins.jira-wiki-editor:wiki-editor-resources-init', location = '/js/wiki-editor-init.js' */
require(["wiki-edit/WikiEditor","wiki-edit/JIRA","wiki-edit/skate","jquery","underscore"],function(i,t,e,o,n){function s(t){var e=this instanceof Element?this:t,s=function(t){i.create(t),i.initBrowseLink(t),t.wikiEnabled=!0};e.wikiEnabled===!1&&(o(e).is(":hidden")?n.defer(s,e):s(e))}function d(){return{type:e.type.CLASSNAME,attached:s,prototype:{wikiEnabled:!1}}}e("wiki-textfield",d()),e("wiki-enabled-textfield",d()),o(function(){o("#gh").length>0&&(t.Dialogs.comment.options.width=810,t.Dialogs.assignIssue.options.width=810,t.Dialogs.attachFile.options.width=810,t.Dialogs.logWork.options.width=810,t.Dialogs.logWork.options.width=810)})});;
;
/* module-key = 'jira.webresources:calendar-localisation-moment', location = '/includes/lib/calendar/Calendar-localisation-moment.js' */
define("jira/calendar/localisation-moment",["require"],function(a){"use strict";if("function"==typeof moment&&null!==moment&&"function"==typeof Calendar&&null!==Calendar){var e=moment.langData("jira");null!==e&&"object"==typeof e&&(Calendar._DN=e._weekdays.concat(e._weekdays[0]),Calendar._SDN=e._weekdaysShort.concat(e._weekdaysShort[0]),Calendar._MN=[].concat(e._months),Calendar._SMN=[].concat(e._monthsShort))}}),require("jira/calendar/localisation-moment");;
;
/* module-key = 'jira.webresources:autocomplete', location = '/includes/jira/dropdown/Dropdown.js' */
define("jira/dropdown",["require"],function(i){function o(){try{return Boolean(n.require("jira/dialog/dialog").current)}catch(i){}return!1}var n=i("jira/util/top-same-origin-window")(window),t=i("jquery"),d=[];return{current:null,addInstance:function(){d.push(this)},hideInstances:function(){var i=this;t(d).each(function(){i!==this&&this.hideDropdown()})},getHash:function(){return this.hash||(this.hash={container:this.dropdown,hide:this.hideDropdown,show:this.displayDropdown}),this.hash},displayDropdown:function(){if(this.current!==this){this.hideInstances(),this.current=this,this.dropdown.css({display:"block"}),this.displayed=!0;var i=this.dropdown;o()||setTimeout(function(){var o=t(window),n=i.offset().top+i.prop("offsetHeight")-o.height()+10;o.scrollTop()<n&&t("html,body").animate({scrollTop:n},300,"linear")},100)}},hideDropdown:function(){this.displayed!==!1&&(this.current=null,this.dropdown.css({display:"none"}),this.displayed=!1)},init:function(i,o){var n=this;this.addInstance(this),this.dropdown=t(o),this.dropdown.css({display:"none"}),t(document).keydown(function(i){9===i.keyCode&&n.hideDropdown()}),i.target?t.aop.before(i,function(){n.displayed||n.displayDropdown()}):(n.dropdown.css("top",t(i).outerHeight()+"px"),i.click(function(i){n.displayed?n.hideDropdown():(n.displayDropdown(),i.stopPropagation()),i.preventDefault()})),t(document.body).click(function(){n.displayed&&n.hideDropdown()})}}}),AJS.namespace("JIRA.Dropdown",null,require("jira/dropdown")),AJS.namespace("jira.widget.dropdown",null,require("jira/dropdown"));;
;
/* module-key = 'jira.webresources:autocomplete', location = '/includes/jira/autocomplete/AutoComplete.js' */
define("jira/autocomplete/autocomplete",["jira/ajs/ajax/smart-ajax","jira/util/objects","jquery","jira/featureflags/feature-manager"],function(e,t,o,n){return function(){var i,s=function(e,t){s.t&&(clearTimeout(s.t),s.t=void 0),s.t=setTimeout(e,1e3*t)},r={9:!0,13:!0,14:!0,25:!0,27:!0,38:!0,40:!0,224:!0};return{dispatcher:function(){},getSavedResponse:function(){},saveResponse:function(){},renderSuggestions:function(){},disable:function(){this.disabled=!0},enable:function(){this.disabled=!1},set:function(e){for(var t in e)e.hasOwnProperty(t)&&(this[t]=e[t])},completeField:function(e){e&&(this.field.val(e).focus(),this.field.trigger("change"))},textToSuggestionCursorPosition:function(){return this.field.val()},_makeRequest:function(o){var n=this,i=t.copyObject(o);return this.pendingRequest&&this.pendingRequest.abort(),i.complete=function(){n.pendingRequest=null},i.error=function(e){!e.aborted&&0!==e.status&&o.error&&o.error.apply(this,arguments)},this.pendingRequest=e.makeRequest(i)},addSuggestionControls:function(e){function t(e){d.dropdownController.displayed&&a(e.data.index)}function s(e){0===e.data.index&&(d.selectedIndex=-1),o(this).removeClass("active")}function r(e){d.completeField(d.suggestionNodes[e.data.index][1])}var d=this,l=function(e,t){var o=d.autoSelectFirst===!1?-1:0;return d.allowArrowCarousel?e>t?o:e<o?t:e:e>t?t:e<o?(d.responseContainer.scrollTop(0),o):e},a=function(e){void 0!==d.selectedIndex&&d.selectedIndex>-1&&d.suggestionNodes[d.selectedIndex][0].removeClass("active"),d.selectedIndex=l(e,d.suggestionNodes.length-1),d.selectedIndex>-1&&d.suggestionNodes[d.selectedIndex][0].addClass("active")},u=function(){return d.suggestionNodes&&d.suggestionNodes[d.selectedIndex]&&d.suggestionNodes[d.selectedIndex][0].hasClass("active")},p=function(){return n.isFeatureEnabled("jira.jql.autoselectfirst")},c=function(e){d.responseContainer.is(":visible")&&13===e.keyCode&&(u()&&!d.pendingRequest&&(d.completeField(d.suggestionNodes[d.selectedIndex][1]),p()&&d.dispatcher(d.field.val())),e.preventDefault(),e.stopPropagation())},h=function(e){if(d.responseContainer.is(":visible"))if(d.field[0]!==document.activeElement&&d.field.focus(),40===e.keyCode){if(a(d.selectedIndex+1),d.selectedIndex>=0){var t=d.responseContainer.height(),o=d.suggestionNodes[d.selectedIndex][0].position().top+d.suggestionNodes[d.selectedIndex][0].outerHeight();o-t>0&&d.responseContainer.scrollTop(d.responseContainer.scrollTop()+o-t+2)}else d.responseContainer.scrollTop(0);e.preventDefault()}else if(38===e.keyCode){if(a(d.selectedIndex-1),d.selectedIndex>=0){var n=d.suggestionNodes[d.selectedIndex][0].position().top;n<0&&d.responseContainer.scrollTop(d.responseContainer.scrollTop()+n-2)}e.preventDefault()}else 9===e.keyCode&&(u()?(d.completeField(d.suggestionNodes[d.selectedIndex][1]),e.preventDefault()):d.dropdownController.hideDropdown())};if(e.length){this.selectedIndex=0,this.suggestionNodes=e;for(var f=0;f<d.suggestionNodes.length;f++){var g={instance:this,index:f};this.suggestionNodes[f][0].bind("mouseover",g,t).bind("mouseout",g,s).bind("click",g,r).bind("mousedown",function(e){e.preventDefault()})}this.keyboardHandlerBinded||(o(this.field).keypress(c),o(this.field).keydown(h),this.keyboardHandlerBinded=!0),a(d.autoSelectFirst===!1?-1:0),i=this}},clearResponseContainer:function(){this.responseContainer.empty(),this.suggestionNodes=void 0},delay:s,buildResponseContainer:function(){var e=this.field.parent().addClass("atlassian-autocomplete");this.responseContainer=o(document.createElement("div")),this.responseContainer.addClass("suggestions"),this.positionResponseContainer(),this.responseContainer.appendTo(e)},positionResponseContainer:function(){this.responseContainer.css({top:this.field.outerHeight()})},keyUpHandler:function(){function e(){this.responseContainer||this.buildResponseContainer(),this.dispatcher(this.field.val())}return function(t){return this.field.val().length>=this.minQueryLength&&(t.keyCode in r&&(!this.responseContainer||this.responseContainer.is(":visible")||38!==t.keyCode&&40!==t.keyCode)||e.call(this)),t}}(),addMultiSelectAdvice:function(e){var t=this,n=function(e){if(!n.isAlerting){n.isAlerting=!0;var i=o(document.createElement("div")).css({float:"left",display:"none"}).addClass("warningBox").html("Oops! You have already entered the value <em>"+e+"</em>").appendTo(t.field.parent()).show("fast",function(){t.delay(function(){i.hide("fast",function(){i.remove(),n.isAlerting=!1})},4)})}};o.aop.before({target:this,method:"dispatcher"},function(t){var n=this.field.val();return t[0]=o.trim(n.slice(n.lastIndexOf(e)+1)),t}),o.aop.before({target:this,method:"completeField"},function(t){var i=t[0],s=this.field.val().split(e),r=o(s).map(function(){return o.trim(this)}).get();return!this.allowDuplicates&&new RegExp("(?:^|[\\s"+e+"])"+i+"\\s*"+e).test(this.field.val())?(n(i),r[r.length-1]=""):(r[r.length-1]=i,r[r.length]=""),t[0]=r.join(e.replace(/([^\s]$)/,"$1 ")),t})},addDropdownAdvice:function(){o.aop.after({target:this,method:"buildResponseContainer"},function(e){return this.dropdownController=JIRA.Dropdown.AutoComplete({target:this,method:"renderSuggestions"},this.responseContainer),o.aop.after({target:this.dropdownController,method:"hideDropdown"},function(){this.dropdown.removeClass("dropdown-ready")}),e}),o.aop.after({target:this,method:"renderSuggestions"},function(e){return e&&e.length>0?(this.dropdownController.displayDropdown(),this.maxHeight&&this.dropdownController.dropdown.prop("scrollHeight")>this.maxHeight?this.dropdownController.dropdown.css({height:this.maxHeight,overflowX:"visible",overflowY:"scroll"}):this.maxHeight&&this.dropdownController.dropdown.css({height:"",overflowX:"",overflowY:""}),this.dropdownController.dropdown.addClass("dropdown-ready")):this.dropdownController.hideDropdown(),e}),o.aop.after({target:this,method:"completeField"},function(e){return this.dropdownController.hideDropdown(),e}),o.aop.after({target:this,method:"keyUpHandler"},function(e){return this.field.val().length>=this.minQueryLength&&27!==e.keyCode||!this.dropdownController||!this.dropdownController.displayed||(this.dropdownController.hideDropdown(),27===e.keyCode&&e.stopPropagation()),e})},init:function(e){var t=this;this.set(e),this.field=this.field||o("#"+this.fieldID),this.field.attr("autocomplete","off").keyup(function(e){t.disabled||t.keyUpHandler(e)}).keydown(function(e){var o=27;e.keyCode===o&&t.responseContainer&&t.responseContainer.is(":visible")&&e.preventDefault()}).click(function(e){i===t&&e.stopPropagation()}).blur(function(){t.pendingRequest&&t.pendingRequest.abort()}),this.addDropdownAdvice(),e.delimChar&&this.addMultiSelectAdvice(e.delimChar)}}}()}),AJS.namespace("jira.widget.autocomplete",null,require("jira/autocomplete/autocomplete")),AJS.namespace("JIRA.AutoComplete",null,require("jira/autocomplete/autocomplete"));;
;
/* module-key = 'jira.webresources:autocomplete', location = '/includes/jira/autocomplete/RESTAutoComplete.js' */
define("jira/autocomplete/rest-autocomplete",["jira/autocomplete/autocomplete","jira/util/objects"],function(e,t){return function(){var s=t.begetObject(e);return s.dispatcher=function(e){var t=this;e.length<this.minQueryLength||(this.getSavedResponse(e)?(t.renderSuggestions(t.getSavedResponse(e)),t.responseContainer.scrollTop(0)):this.delay(function(){var s=t.getAjaxParams();s.data.query=e,s.success=function(s){t.saveResponse(e,s),t.responseContainer.scrollTop(0),t.renderSuggestions(s)},t._makeRequest(s)},t.queryDelay))},s.getAjaxParams=function(){},s.getSavedResponse=function(e){return this.requested||(this.requested={}),this.requested[e]},s.saveResponse=function(e,t){"string"==typeof e&&"object"==typeof t&&(this.requested||(this.requested={}),this.requested[e]=t)},s}()}),AJS.namespace("jira.widget.autocomplete.REST",null,require("jira/autocomplete/rest-autocomplete")),AJS.namespace("JIRA.RESTAutoComplete",null,require("jira/autocomplete/rest-autocomplete"));;
;
/* module-key = 'jira.webresources:autocomplete', location = '/includes/jira/autocomplete/IssueAutoComplete.js' */
define("jira/autocomplete/issue-autocomplete",["jira/data/parse-options-from-fieldset","jira/field/issue-picker","jira/autocomplete/rest-autocomplete","jira/util/objects","wrm/context-path","jquery"],function(e,t,s,a,i,n){var r=i(),d=function(e){var t=a.begetObject(s);return t.getAjaxParams=function(){return{url:r+"/rest/api/2/issue/picker",data:e.ajaxData,dataType:"json",type:"GET"}},t.renderSuggestions=function(s){var a,i=[];if(this.clearResponseContainer(),s&&s.sections&&s.sections.length>0)return a=n("<ul/>").appendTo(this.responseContainer),n(s.sections).each(function(){var t=this,s=n("<div/>").attr("id",e.fieldID+"_s_"+t.id).addClass("yag").text(t.label);if(t.sub&&s.append(n("<span/>").addClass("yagt").text("("+t.sub+")")),a.append(n("<li/>").append(s).mouseover(function(){n(this).addClass("active")}).mouseout(function(){n(this).removeClass("active")})),t.msg){var d=n("<div/>").attr("id",e.fieldID+"_i_"+t.id+"_n").addClass("yad").text(t.msg);a.append(n("<li/>").append(d).mouseover(function(){n(this).addClass("active")}).mouseout(function(){n(this).removeClass("active")}))}t.issues&&t.issues.length>0&&n(t.issues).each(function(){var s;s=/^http/.test(this.img)?this.img:r+this.img;var d=n("<li/>").append(n("<div/>").attr("id",e.fieldID+"_i_"+t.id+"_"+this.key).addClass("yad").append(n("<table/>").addClass("yat").attr({cellpadding:"0",cellspacing:"0"}).append(n("<tr/>").append(n("<td/>").append(n("<img/>").attr("src",s))).append(n("<td/>").append(n("<div/>").addClass("yak").html(this.keyHtml))).append(n("<td/>").css("width","100%").html(this.summary)))));a.append(d),i.push([d,this.key])})}),t.addSuggestionControls(i),i},e.minQueryLength=1,e.queryDelay=.25,t.init(e),t};return d.init=function(){n("fieldset.issue-picker-params").each(function(){var s=e(n(this)),a=n("#"+s.fieldId+"-container").add("#"+s.fieldName+"_container");a.find("a.popup-trigger").click(function(e){var a=r+"/secure/popups/IssuePicker.jspa?";a+="currentIssue="+s.currentIssueKey+"&",a+="singleSelectOnly="+s.singleSelectOnly+"&",a+="showSubTasks="+s.showSubTasks+"&",a+="showSubTasksParent="+s.showSubTaskParent,s.currentProjectId&&""!==s.currentProjectId&&(a+="&selectedProjectId="+s.currentProjectId),t.callback=function(e){var t,a=[];e=JSON.parse(e),s.fieldId&&a&&(t=n("#"+s.fieldId),t&&(n.each(e,function(){a.push(this.value)}),t.val(a.join(", "))))};var i=window.open(a,"IssueSelectorPopup","status=no,resizable=yes,top=100,left=200,width=620,height=500,scrollbars=yes,resizable");i.opener=self,i.focus(),e.preventDefault()}),s.fieldId||(s.fieldId=s.fieldName),s.issuePickerEnabled===!0&&d({fieldID:s.fieldId,delimChar:s.singleSelectOnly===!0?void 0:",",ajaxData:s})})},d}),AJS.namespace("jira.widget.autocomplete.Issues",null,require("jira/autocomplete/issue-autocomplete")),AJS.namespace("JIRA.IssueAutoComplete",null,require("jira/autocomplete/issue-autocomplete"));;
;
/* module-key = 'jira.webresources:autocomplete', location = '/includes/jira/autocomplete/UserAutoComplete.js' */
define("jira/autocomplete/user-autocomplete",["jira/autocomplete/rest-autocomplete","jira/data/parse-options-from-fieldset","jira/util/browser","jira/util/elements","jira/util/objects","jquery"],function(e,t,i,r,o,a){var n=function(t){function n(e){var t=!1,i=e.closest("form");return i.length&&i.hasClass("submitting")&&(t=!0),t}var s=o.begetObject(e);return s.getAjaxParams=function(){return{url:contextPath+"/rest/api/1.0/users/picker",data:{fieldName:t.fieldID,fieldConfigId:t.fieldConfigID,projectId:t.projectId},dataType:"json",type:"GET"}},s.renderSuggestions=function(e){if(n(this.field)||!i.isSelenium()&&!r.elementIsFocused(this.field))return!1;var t,o=[];return this.clearResponseContainer(),e&&e.users&&e.users.length>0&&(t=a("<ul/>").appendTo(this.responseContainer),a(e.users).each(function(){o.push([a("<li/>").html(this.html).appendTo(t),this.name])})),e.footer&&this.responseContainer.append(a("<div/>").addClass("yui-ac-ft").html(e.footer).css("display","block")),o.length>0&&(s.addSuggestionControls(o),a(".atlassian-autocomplete div.yad, .atlassian-autocomplete .labels li").textOverflow({autoUpdate:!0})),o},t.minQueryLength=2,t.queryDelay=.25,s.init(t),s};return n.init=function(e){a("fieldset.user-picker-params",e).each(function(){var i=t(a(this)),r=i.fieldId||i.fieldName,o=a("#"+r+"_container");o.find("a.popup-trigger").click(function(e){var t,n=contextPath;if(e.preventDefault(),i.formName||(i.formName=o.find("#"+r).parents("form").attr("name")),n+=i.actionToOpen?i.actionToOpen:"/secure/popups/UserPickerBrowser.jspa",n+="?formName="+i.formName+"&",n+="multiSelect="+i.multiSelect+"&",n+="decorator=popup&",n+="element="+r,i.fieldConfigId&&(n+="&fieldConfigId="+i.fieldConfigId),i.projectId)if(a.isArray(i.projectId))for(var s in i.projectId)n+="&projectId="+s;else n+="&projectId="+i.projectId;t=window.open(n,"UserPicker","status=yes,resizable=yes,top=100,left=100,width=800,height=750,scrollbars=yes"),t.opener=self,t.focus()}),i.userPickerEnabled===!0&&n({field:e?e.find("#"+r):null,fieldID:r,fieldConfigID:i.fieldConfigId,projectId:i.projectId,delimChar:i.multiSelect===!1?void 0:",",ajaxData:{fieldName:i.fieldName}})})},n}),AJS.namespace("jira.widget.autocomplete.Users",null,require("jira/autocomplete/user-autocomplete")),AJS.namespace("JIRA.UserAutoComplete",null,require("jira/autocomplete/user-autocomplete"));;
;
/* module-key = 'jira.webresources:autocomplete', location = '/includes/jira/autocomplete/initAutoCompleteFields.js' */
!function(){JIRA.bind(JIRA.Events.NEW_CONTENT_ADDED,function(e,t,i){i!==JIRA.CONTENT_ADDED_REASON.panelRefreshed&&(JIRA.UserAutoComplete.init(t),JIRA.IssueAutoComplete.init(t))}),JIRA.bind(JIRA.Events.NEW_CONTENT_ADDED,function(e,t,i){i!==JIRA.CONTENT_ADDED_REASON.panelRefreshed&&AJS.$("fieldset.user-searcher-params",t).each(function(){var e=JIRA.parseOptionsFromFieldset(AJS.$(this)),i=AJS.$("#"+e.fieldId+"_container",t);if(e.userPickerEnabled===!0)var r=JIRA.UserAutoComplete({fieldID:e.fieldId,delimChar:e.multiSelect===!0?",":void 0,ajaxData:{fieldName:e.fieldName}});var s=function(i){var s=AJS.$("#"+e.fieldId,t),o=AJS.$("#"+e.fieldId+"Image",t),l=AJS.$("#"+e.fieldId+"GroupImage",t),a=AJS.$("#"+e.fieldId+"_desc",t);"select.list.none"===i?(s.val("").attr("disabled","true"),o.hide(),l.hide(),a.hide()):(s.removeAttr("disabled"),"select.list.group"===i?(o.hide(),l.show(),e.userPickerEnabled===!0&&(r.disable(),a.hide())):(o.show(),l.hide(),e.userPickerEnabled===!0&&(r.enable(),a.show())))};AJS.$("#"+e.userSelect,t).change(function(){var e=AJS.$(this).find("option:selected").attr("rel");s(e)}).find("option:selected").each(function(){s(AJS.$(this).attr("rel"))}),i.find("a.user-popup-trigger").click(function(t){var i=contextPath+"/secure/popups/UserPickerBrowser.jspa?";i+="formName="+e.formName+"&",i+="multiSelect="+e.multiSelect+"&",i+="decorator=popup&",i+="element="+e.fieldId;var r=window.open(i,"UserPicker","status=yes,resizable=yes,top=100,left=100,width=800,height=750,scrollbars=yes");r.opener=self,r.focus(),t.preventDefault()}),i.find("a.group-popup-trigger").click(function(t){var i=contextPath+"/secure/popups/GroupPickerBrowser.jspa?";i+="formName="+e.formName+"&",i+="multiSelect="+e.multiSelect+"&",i+="decorator=popup&",i+="element="+e.fieldId;var r=window.open(i,"GroupPicker","status=yes,resizable=yes,top=100,left=100,width=800,height=750,scrollbars=yes");r.opener=self,r.focus(),t.preventDefault()})})})}();;
;
/* module-key = 'jira.webresources:group-label-lozenge', location = '/includes/jira/admin/group-browser/group-label-lozenge.js' */
define("jira/admin/group-browser/group-label-lozenge",["jquery","jira/skate"],function(e,t){t("group-label-lozenge",{type:t.type.CLASSNAME,attached:function(t){e(t).tooltip({gravity:"w",html:!0})}})});;
;
/* module-key = 'jira.webresources:group-label-lozenge', location = 'includes/jira/admin/group-browser/group-label-lozenge.soy.js' */
if("undefined"==typeof JIRA)var JIRA={};"undefined"==typeof JIRA.Templates&&(JIRA.Templates={}),JIRA.Templates.groupLabelLozenge=function(e,l){return""+aui.lozenges.lozenge({text:e.label.text,title:e.label.title,isSubtle:!0,extraClasses:"group-label-lozenge"})};;
;
/* module-key = 'jira.webresources:groupbrowser', location = '/includes/jira/admin/group-browser/group-browser.js' */
require(["jquery","jira/admin/group-browser/group-label-lozenge"],function(i){i(function(){i(".operations-list .aui-button[disabled]").tooltip({gravity:"e",html:!1})})});;
;
/* module-key = 'jira.webresources:group-pickers', location = 'includes/jira/field/templates/groupPickerUtil.soy.js' */
if("undefined"==typeof JIRA)var JIRA={};"undefined"==typeof JIRA.Templates&&(JIRA.Templates={}),"undefined"==typeof JIRA.Templates.GroupPickerUtil&&(JIRA.Templates.GroupPickerUtil={}),JIRA.Templates.GroupPickerUtil.formatResponseWithLabels=function(e,s){return""+JIRA.Templates.GroupPickerUtil.formatResponse(soy.$$augmentMap(e,{showLabels:!0}))},JIRA.Templates.GroupPickerUtil.formatResponse=function(e,s){var t='<div class="group-suggestion-item"><span class="group-suggestion-item__name">'+soy.$$filterNoAutoescape(e.html)+"</span>";if(e.showLabels){t+='<span class="group-suggestion-item__labels group-labels-lozenges">';for(var a=e.labels,o=a.length,l=0;l<o;l++){var p=a[l];t+=JIRA.Templates.groupLabelLozenge({label:p})+" "}t+="</span>"}return t+="</div>"};;
;
/* module-key = 'jira.webresources:group-pickers', location = '/includes/jira/field/templates/group-picker-util-template-wrapper.js' */
define("jira/field/group-picker-util/templates",[],function(){"use strict";return window.JIRA.Templates.GroupPickerUtil});;
;
/* module-key = 'jira.webresources:group-pickers', location = '/includes/jira/field/groupPickerUtil.js' */
define("jira/field/group-picker-util",["jira/ajs/list/item-descriptor","jira/ajs/list/group-descriptor","jquery","jira/field/group-picker-util/templates"],function(e,i,r,t){var a=function(a,n){var s=[],u=n?t.formatResponseWithLabels:t.formatResponse;return r(a).each(function(t,a){var n=new i({weight:t,label:a.header});r(a.groups).each(function(){n.addItem(new e({value:this.name,label:this.name,title:this.name,html:u(this),highlighted:!0}))}),s.push(n)}),s};return{formatResponseWithLabels:function(e){return a(e,!0)},formatResponse:function(e,i){return a(e,i)}}}),AJS.namespace("JIRA.GroupPickerUtil",null,require("jira/field/group-picker-util"));;
;
/* module-key = 'jira.webresources:group-pickers', location = '/includes/jira/field/initMultiGroupPickers.js' */
define("jira/field/init-multi-group-pickers",["jquery","jira/ajs/select/multi-select","jira/util/events/reasons","jira/util/events/types","jira/util/events","jira/field/group-picker-util"],function(e,t,i,a,r,n){function s(i){i.find(".js-default-multi-group-picker").each(function(){var i=e(this),a=i.data("show-labels")===!0,r=i.data("user-name");new t({element:this,itemAttrDisplayed:"label",showDropdownButton:!1,ajaxOptions:{data:function(e){return{userName:r,query:e,exclude:i.val()}},url:contextPath+"/rest/api/2/groups/picker",query:!0,formatResponse:a?n.formatResponseWithLabels:n.formatResponse}})})}r.bind(a.NEW_CONTENT_ADDED,function(e,t,a){a!==i.panelRefreshed&&s(t)})});;
;
/* module-key = 'jira.webresources:group-pickers', location = '/includes/jira/field/initSingleGroupPickers.js' */
define("jira/field/init-single-group-pickers",["jira/ajs/select/single-select","jquery","jira/ajs/list/item-descriptor","jira/util/events/reasons","jira/util/events/types","jira/util/events","jira/field/group-picker-util"],function(e,t,i,n,a,r,s){function l(n){n.find(".js-default-single-group-picker").each(function(){var n=t(this),a=n.find("option[data-empty]"),r=n.data("show-labels")===!0,l=n.data("user-name");new e({element:this,itemAttrDisplayed:"label",revertOnInvalid:!0,ajaxOptions:{data:function(e){return{userName:l,query:e,exclude:n.val()}},url:contextPath+"/rest/api/2/groups/picker",query:!0,formatResponse:function(e){var t=s.formatResponse(e,r);return a.length&&""!==n.val()&&t.unshift(new i({value:"",label:a.text(),highlighted:!0})),t}}})})}r.bind(a.NEW_CONTENT_ADDED,function(e,t,i){i!==n.panelRefreshed&&l(t)})});;
;
/* module-key = 'jira.webresources:group-pickers', location = '/includes/jira/field/init/init-group-pickers-webresource.js' */
require("jira/field/init-multi-group-pickers"),require("jira/field/init-single-group-pickers");;
;
/* module-key = 'jira.webresources:ie-imitation-placeholder', location = '/includes/jira/field/IEImitationPlaceholder.js' */
require(["jquery"],function(e){e.fn.ieImitationPlaceholder=function(){function a(){var a=e(this);""===a.val()&&(a.val(a.attr("placeholder")),a.addClass("input-placeholder"))}function l(){var a=e(this);a.val()===a.attr("placeholder")&&(a.val(""),a.removeClass("input-placeholder"))}function i(){t.each(l)}if(e.browser.msie){var r=this,t=r.find("[placeholder]");t.focus(l),t.blur(a),r.submit(i),t.each(a)}}});;
;
/* module-key = 'jira.webresources:jira-project-issuetype-fields', location = '/includes/jira/field/ProjectIssueTypeSelect.js' */
define("jira/field/project-issue-type-select",["jira/lib/class"],function(e){return e.extend({init:function(e){var s,t=this;this.$project=e.project,this.issueTypeSelect=e.issueTypeSelect,this.$projectIssueTypesSchemes=e.projectIssueTypesSchemes,this.$issueTypeSchemeIssueDefaults=e.issueTypeSchemeIssueDefaults,this.projectIssueTypeSchemes=JSON.parse(this.$projectIssueTypesSchemes.html()),this.issueTypesSchemeDefaults=JSON.parse(this.$issueTypeSchemeIssueDefaults.html()||"[]"),t.$project.length>0&&(s=t.$project.val(),t.setIssueTypeScheme(t.getIssueTypeSchemeForProject(s)),this.$project.change(function(){var e=t.$project.val();t.setIssueTypeScheme(t.getIssueTypeSchemeForProject(e))}))},getIssueTypeSchemeForProject:function(e){return this.projectIssueTypeSchemes[e]},getDefaultIssueTypeForScheme:function(e){return this.issueTypesSchemeDefaults[e]},setIssueTypeScheme:function(e){var s=this.issueTypeSelect.model.getValue();this.issueTypeSelect.model.setFilterGroup(e),this.issueTypeSelect.model.setSelected(s,!1)||this.setDefaultIssueType(e),this.issueTypeSelect.model.$element.data("project",this.$project.val())},setDefaultIssueType:function(e){var s=this.getDefaultIssueTypeForScheme(e),t=this.issueTypeSelect.model.getDescriptor(s);t||(t=this.issueTypeSelect.model.getAllDescriptors()[0]),this.issueTypeSelect.setSelection(t,!1)}})}),AJS.namespace("JIRA.ProjectIssueTypeSelect",null,require("jira/field/project-issue-type-select"));;
;
/* module-key = 'jira.webresources:jira-project-issuetype-fields', location = '/includes/jira/field/initProjectIssueTypeSelect.js' */
define("jira/field/init-project-issue-type-select",["jira/ajs/select/suggestion-collection-model","jquery","jira/ajs/select/single-select","jira/util/events/reasons","jira/util/events/types","jira/util/events","jira/field/project-issue-type-select"],function(e,t,i,s,n,l,r){function c(s){var n=s||t("body");n.find(".issuetype-field").each(function(s){var l=n.find(".project-field, .project-field-readonly"),c=t(this),d=n.find("#"+c.attr("id")+"-projects"),o=n.find("#"+c.attr("id")+"-defaults"),a=new i({element:c,revertOnInvalid:!0,model:e});a.model.remove(""),l.length>0&&new r({project:l.eq(s),issueTypeSelect:a,projectIssueTypesSchemes:d,issueTypeSchemeIssueDefaults:o})})}l.bind(n.NEW_CONTENT_ADDED,function(e,t,i){i!==s.panelRefreshed&&c(t)})});;
;
/* module-key = 'jira.webresources:jira-project-issuetype-fields', location = '/includes/jira/field/initIssueTypePickers.js' */
;
;
/* module-key = 'jira.webresources:jira-project-issuetype-fields', location = '/includes/jira/field/initProjectPickers.js' */
define("jira/field/init-project-pickers",["jira/ajs/select/scrollable-single-select","jira/ajs/select/suggestion-collection-model","jira/util/events/reasons","jira/util/events/types","jira/util/events"],function(e,i,n,t,l){function s(n){n.find(".project-field").each(function(){new e({element:this,revertOnInvalid:!0,pageSize:50,pagingThreshold:100,model:i})})}l.bind(t.NEW_CONTENT_ADDED,function(e,i,t){t!==n.panelRefreshed&&s(i)})});;
;
/* module-key = 'jira.webresources:jira-project-issuetype-fields', location = '/includes/jira/field/init/init-jira-project-issuetype-fields-webresource.js' */
require("jira/field/init-project-issue-type-select"),require("jira/field/init-project-pickers");;
;
/* module-key = 'jira.webresources:jira-fields', location = 'includes/jira/field/field-templates.soy.js' */
if("undefined"==typeof JIRA)var JIRA={};"undefined"==typeof JIRA.Templates&&(JIRA.Templates={}),"undefined"==typeof JIRA.Templates.Fields&&(JIRA.Templates.Fields={}),JIRA.Templates.Fields.username=function(e,s){return""+(e.escape?soy.$$escapeHtml(e.displayName):soy.$$filterNoAutoescape(e.displayName))},JIRA.Templates.Fields.recipientUsername=function(e,s){return'<li data-username="'+soy.$$escapeHtml(e.username)+'" title='+soy.$$escapeHtml(e.username)+'><span><span class="user-hover" rel="'+soy.$$escapeHtml(e.username)+'"><img alt="" src="'+soy.$$escapeHtml(e.icon)+'" title="'+JIRA.Templates.Fields.username(e)+'"><span title="'+JIRA.Templates.Fields.username(e)+'">'+JIRA.Templates.Fields.username(e)+"</span></span>"+(e.readOnly?"":'<button type="button" class="remove-recipient item-delete"><span class="icon-default aui-icon aui-icon-small aui-iconfont-delete">'+soy.$$escapeHtml(AJS.format("\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u043d\u0430\u0431\u043b\u044e\u0434\u0430\u0442\u0435\u043b\u044f: {0}",e.username))+"</span></button>")+"</span></li>"},JIRA.Templates.Fields.recipientEmail=function(e,s){return'<li data-email="'+soy.$$escapeHtml(e.email)+'" title='+soy.$$escapeHtml(e.email)+'><span><img src="'+soy.$$escapeHtml(e.icon)+'" title="'+soy.$$escapeHtml(e.email)+'"><span title="'+soy.$$escapeHtml(e.email)+'">'+soy.$$escapeHtml(e.email)+'</span><span class="remove-recipient item-delete"><span class="icon-default aui-icon aui-icon-small aui-iconfont-delete"></span></span></span></li>'};;
;
/* module-key = 'jira.webresources:jira-fields', location = '/includes/jira/field/LabelPicker.js' */
define("jira/field/label-picker",["jira/util/formatter","jira/ajs/select/multi-select","jira/ajs/list/group-descriptor","jira/ajs/list/item-descriptor","wrm/context-path","jquery"],function(e,t,i,s,a,l){var n=a();return t.extend({_getDefaultOptions:function(){return l.extend(!0,this._super(),{ajaxOptions:{url:n+"/includes/js/ajs/layer/labeldata.js",query:!0,formatResponse:this._formatResponse},removeDuplicates:!0,removeOnUnSelect:!0,userEnteredOptionsMsg:"\u041d\u043e\u0432\u0430\u044f \u043c\u0435\u0442\u043a\u0430"})},isValidItem:function(e){return!/\s/.test(e)},_handleServerSuggestions:function(e){e&&e.token&&l.trim(this.$field.val())!==e.token||this._super(e)},_handleSpace:function(){""!==l.trim(this.$field.val())&&this.handleFreeInput()&&this.hideSuggestions()},keys:{Spacebar:function(e){this._handleSpace(),e.preventDefault()}},_formatResponse:function(t){var a=new i({label:"\u041f\u0440\u0435\u0434\u043b\u043e\u0436\u0435\u043d\u0438\u044f",type:"optgroup",styleClass:"labels-suggested"});return t&&t.suggestions&&l.each(t.suggestions,function(){a.addItem(new s({value:this.label,label:this.label,html:this.html,highlighted:!0}))}),[a]},handleFreeInput:function(){var e=l.trim(this.$field.val()).match(/\S+/g);if(e){for(var t,i=0;t=e[i];i++)this.addItem({value:t,label:t});this.model.$element.trigger("change")}this.$field.val("")}})}),AJS.namespace("AJS.LabelPicker",null,require("jira/field/label-picker")),AJS.namespace("JIRA.LabelPicker",null,require("jira/field/label-picker"));;
;
/* module-key = 'jira.webresources:jira-fields', location = '/includes/jira/field/LabelPickerFactory.js' */
define("jira/field/label-picker-factory",["jira/field/label-picker","jira/data/parse-options-from-fieldset","jquery","exports"],function(e,i,t,a){a.createPicker=function(a,r){var s=i(a),d=t("#"+s.id,r),l=s.issueId,c={};/customfield_\d/.test(s.id)&&(c.customFieldId=parseInt(s.id.replace("customfield_",""),10)),new e({element:d,ajaxOptions:{url:contextPath+"/rest/api/1.0/labels"+(l?"/"+l:"")+"/suggest",data:c}})}});;
;
/* module-key = 'jira.webresources:jira-fields', location = '/includes/jira/field/MultiUserListPicker.Item.js' */
define("jira/field/multi-user-list-picker/item",["jira/util/data/meta","jira/ajs/control","jquery"],function(e,t,i){return t.extend({init:function(e){this._setOptions(e),this.$lozenge=this._render("item"),this.$removeButton=this.$lozenge.find(".remove-recipient"),this._assignEvents("instance",this),this._assignEvents("lozenge",this.$lozenge),this._assignEvents("removeButton",this.$removeButton),this.$lozenge.prependTo(this.options.container)},_getDefaultOptions:function(){return{label:null,title:null,container:null,focusClass:"focused"}},_renders:{item:function(){var t,n=this.options.descriptor;return n.noExactMatch()!==!0?(t={escape:!1,username:n.value(),icon:n.icon(),displayName:AJS.escapeHtml(n.label())},i(JIRA.Templates.Fields.recipientUsername(t))):(t={email:n.value(),icon:e.get("default-avatar-url")},i(JIRA.Templates.Fields.recipientEmail(t)))}},_events:{instance:{remove:function(){this.$lozenge.remove()}},removeButton:{click:function(e){e.stopPropagation(),this.trigger("remove")}}}})});;
;
/* module-key = 'jira.webresources:jira-fields', location = '/includes/jira/field/MultiUserListPicker.js' */
define("jira/field/multi-user-list-picker",["jira/util/formatter","jira/field/multi-user-list-picker/item","jira/ajs/select/suggestions/user-list-suggest-handler","jira/ajs/select/multi-select","jira/ajs/list/item-descriptor","jira/ajs/list/group-descriptor","jira/ajs/group","jquery"],function(e,t,i,r,s,n,a,l){return r.extend({init:function(r){function u(e){var t=[];return l(e).each(function(e,i){var r=new n({weight:e,label:i.footer});l(i.users).each(function(){r.addItem(new s({value:this.name,label:this.displayName,html:this.html,icon:this.avatarUrl,allowDuplicate:!1,highlighted:!0}))}),t.push(r)}),t}var o="/rest/api/1.0/users/picker";l.extend(r,{itemAttrDisplayed:"label",userEnteredOptionsMsg:"\u0410\u0434\u0440\u0435\u0441 \u044d\u043b\u0435\u043a\u0442\u0440\u043e\u043d\u043d\u043e\u0439 \u043f\u043e\u0447\u0442\u044b",showDropdownButton:!1,removeOnUnSelect:!0,ajaxOptions:{url:contextPath+o,query:!0,data:{showAvatar:!0},formatResponse:u},suggestionsHandler:i,itemGroup:new a,itemBuilder:function(e){return new t({descriptor:e,container:this.$selectedItemsContainer})}}),this._super(r)},_createFurniture:function(e){this._super(e),this.options.description&&this._render("description",this.options.description).insertAfter(this.$field)},updateItemsIndent:l.noop,_renders:{selectedItemsWrapper:function(){return l('<div class="recipients" />')},selectedItemsContainer:function(){return l("<ol />")},description:function(e){return l("<div />").addClass("description").text(e)}}})}),AJS.namespace("JIRA.MultiUserListPicker",null,require("jira/field/multi-user-list-picker")),AJS.namespace("JIRA.MultiUserListPicker.Item",null,require("jira/field/multi-user-list-picker/item"));;
;
/* module-key = 'jira.webresources:jira-fields', location = '/includes/jira/field/initCascadingSelects.js' */
define("jira/field/init-cascading-selects",["jquery","jira/util/events/reasons","jira/util/events/types","jira/util/events"],function(e,i,n,t){function a(i){e(i||document.body).find("div.aui-field-cascadingselect").add("tr.aui-field-cascadingselect").add("td.aui-field-cascadingselect").each(function(){function i(){var i,n=t.find("option:selected").attr("class");n!==a&&(i=e("<span />").insertAfter(d),d.detach(),d.find("option").each(function(e,i){i.parentNode.removeChild(this)}),d.insertAfter(i),i.remove(),c.filter("."+t.find("option:selected").attr("class")).appendTo(d),s.hasClass(t.find("option:selected").attr("class"))?d.val(s.val()):d.val(d.find("option:first").val()),a=n)}var n=e(this),t=n.find(".cascadingselect-parent"),a=(t.find("option"),""),d=n.find(".cascadingselect-child"),c=d.find("option"),s=d.find(":selected");t.bind("cascadingSelectChanged",i).change(function(){e(this).trigger("cascadingSelectChanged")}).trigger("cascadingSelectChanged")})}t.bind(n.NEW_CONTENT_ADDED,function(e,n,t){t!==i.panelRefreshed&&a(n)})});;
;
/* module-key = 'jira.webresources:jira-fields', location = '/includes/jira/field/ComponentPicker.js' */
define("jira/field/component-picker",["jira/util/formatter","jira/util/events","jira/ajs/select/suggestions/only-new-items-suggest-handler","jira/ajs/select/multi-select","underscore","jquery"],function(e,t,n,s,i,r){return s.extend({init:function(e){this._super(e),this.suggestionsHandler=new n(this.options,this.model)},_getDefaultOptions:function(t){var n=!1;return t&&t.element&&(n=r(t.element).data("create-permission")),n?r.extend(!0,this._super(),{userEnteredOptionsMsg:"\u041d\u043e\u0432\u044b\u0439 \u043a\u043e\u043c\u043f\u043e\u043d\u0435\u043d\u0442"}):this._super(t)},_selectionHandler:function(e,n){var s=this.model.getDisplayableSelectedDescriptors().concat(this.model.getDisplayableUnSelectedDescriptors()),r=e.data("descriptor"),o=i.find(s,function(e){return e.label()===r.label()});o||(r.properties.value="nv_"+r.value(),t.trigger("Issue.Component.new.selected",[r.value()])),this._super(e,n)}})}),AJS.namespace("JIRA.ComponentPicker",null,require("jira/field/component-picker"));;
;
/* module-key = 'jira.webresources:jira-fields', location = '/includes/jira/field/initComponentPickers.js' */
define("jira/field/init-component-pickers",["jira/field/component-picker","jira/util/formatter","jira/util/events","jira/util/events/types","jira/util/events/reasons","jquery"],function(e,n,r,t,i,o){function l(r){new e({element:r,itemAttrDisplayed:"label",errorMessage:"{0} - \u043d\u0435\u043a\u043e\u0440\u0440\u0435\u043a\u0442\u043d\u044b\u0439 \u043a\u043e\u043c\u043f\u043e\u043d\u0435\u043d\u0442.",maxInlineResultsDisplayed:15,expandAllResults:!0})}function a(e){var n,r=o(e);return n=r.is("select")?r:r.find("select")}function c(e,n){n=n||s.join(", "),o(n,e).each(function(){var e=a(this);e.length&&l(e)})}var s=["div.aui-field-componentspicker.frother-control-renderer","td.aui-field-componentspicker.frother-control-renderer","tr.aui-field-componentspicker.frother-control-renderer"];r.bind(t.NEW_CONTENT_ADDED,function(e,n,r){r!==i.panelRefreshed&&c(n)})});;
;
/* module-key = 'jira.webresources:jira-fields', location = '/includes/jira/field/initMultiselectPickers.js' */
define("jira/field/init-multi-select-pickers",["jquery","jira/ajs/select/multi-select","jira/util/events/reasons","jira/util/events/types","jira/util/events","jira/util/formatter"],function(e,t,i,n,l,r){function s(e){new t({element:e,itemAttrDisplayed:"label",errorMessage:"{0} \u043d\u0435 \u044f\u0432\u043b\u044f\u0435\u0442\u0441\u044f \u0434\u043e\u043f\u0443\u0441\u0442\u0438\u043c\u044b\u043c \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0435\u043c.",maxInlineResultsDisplayed:15,submitInputVal:!0,expandAllResults:!0})}function a(t){var i,n=e(t);return i=n.is("select")?n:n.find("select")}function u(t,i){i=i||c.join(", "),e(i,t).each(function(){var e=a(this);e.length&&s(e)})}var c=["div.aui-field-multiselectpicker.frother-control-renderer"];l.bind(n.NEW_CONTENT_ADDED,function(e,t,n){n!==i.panelRefreshed&&u(t)})});;
;
/* module-key = 'jira.webresources:jira-fields', location = '/includes/jira/field/initDatePickers.js' */
define("jira/field/init-date-pickers",["jquery","jira/data/parse-options-from-fieldset","jira/util/events/reasons","jira/util/events/types","jira/util/events"],function(e,i,t,d,n){function a(t){e(t||document.body).find("div.aui-field-datepicker").add("tr.aui-field-datepicker").add("td.aui-field-datepicker").each(function(){function d(){a.prop("disabled",r.is(":checked"))}var n=e(this),a=n.find("input:text"),r=n.find("#useCurrentDate"),f=i(n.find("fieldset.datepicker-params"));f.context=t,Calendar.setup(f),r.length&&(d(),r.click(d))})}n.bind(d.NEW_CONTENT_ADDED,function(e,i,d){d!==t.panelRefreshed&&a(i)})});;
;
/* module-key = 'jira.webresources:jira-fields', location = '/includes/jira/field/initLegacyGroupPickers.js' */
define("jira/field/init-legacy-group-pickers",["jquery","jira/util/events/reasons","jira/util/events/types","jira/util/events"],function(e,i,r,t){function n(i){e(i||document.body).find("div.aui-field-grouppicker").add("tr.aui-field-grouppicker").add("td.aui-field-grouppicker").each(function(){function i(e){e.preventDefault(),window.open(n,"GroupPicker","status=yes,resizable=yes,top=100,left=100,width=800,height=750,scrollbars=yes")}var r=e(this),t=r.find("a.grouppicker-trigger"),n=t.attr("href");t.click(i)})}t.bind(r.NEW_CONTENT_ADDED,function(e,r,t){t!==i.panelRefreshed&&n(r)})});;
;
/* module-key = 'jira.webresources:jira-fields', location = '/includes/jira/field/initIssuePickers.js' */
define("jira/field/init-issue-pickers",["jira/field/issue-picker","jira/util/events","jira/util/events/types","jira/util/events/reasons","jquery","jira/util/formatter"],function(e,i,n,t,s,r){function u(i){s(i||document.body).find(".aui-field-issuepicker").each(function(){new e({element:s(this),userEnteredOptionsMsg:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043a\u043b\u044e\u0447 \u0437\u0430\u0434\u0430\u0447\u0438",uppercaseUserEnteredOnSelect:!0})})}i.bind(n.NEW_CONTENT_ADDED,function(e,i,n){n!==t.panelRefreshed&&u(i)})});;
;
/* module-key = 'jira.webresources:jira-fields', location = '/includes/jira/field/initLabelPickers.js' */
define("jira/field/init-label-pickers",["jira/field/label-picker-factory","jira/util/events","jira/util/events/types","jira/util/events/reasons","jquery"],function(e,i,n,r,a){function t(e){var i,n=a(e);return i=n.is(c)?n:n.find(c)}function l(i,n){n=n||".aui-field-labelpicker",a(n,i).each(function(){var n=t(this);n.length>0&&e.createPicker(n,i)})}var c="fieldset.labelpicker-params";i.bind(n.NEW_CONTENT_ADDED,function(e,i,n){n!==r.panelRefreshed&&l(i)})});;
;
/* module-key = 'jira.webresources:jira-fields', location = '/includes/jira/field/VersionPicker.js' */
define("jira/field/version-picker",["jira/util/formatter","jira/util/events","jira/ajs/select/suggestions/only-new-items-suggest-handler","jira/ajs/select/multi-select","underscore","jquery"],function(e,t,s,i,n,r){return i.extend({init:function(e){this._super(e),this.suggestionsHandler=new s(this.options,this.model)},_getDefaultOptions:function(t){var s=!1;return t&&t.element&&(s=r(t.element).data("create-permission")),s?r.extend(!0,this._super(),{userEnteredOptionsMsg:"\u041d\u043e\u0432\u0430\u044f \u0432\u0435\u0440\u0441\u0438\u044f"}):this._super(t)},_selectionHandler:function(e,s){var i=this.model.getDisplayableSelectedDescriptors().concat(this.model.getDisplayableUnSelectedDescriptors()),r=e.data("descriptor"),l=n.find(i,function(e){return e.label()===r.label()});l||(r.properties.value="nv_"+r.value(),t.trigger("Issue.Version.new.selected",[r.value()])),this._super(e,s)}})}),AJS.namespace("JIRA.VersionPicker",null,require("jira/field/version-picker"));;
;
/* module-key = 'jira.webresources:jira-fields', location = '/includes/jira/field/initVersionPickers.js' */
define("jira/field/init-version-pickers",["jira/field/version-picker","jira/util/formatter","jira/util/events","jira/util/events/types","jira/util/events/reasons","jquery"],function(e,i,n,r,t,s){function l(n){new e({element:n,itemAttrDisplayed:"label",removeOnUnSelect:!1,submitInputVal:!0,errorMessage:"{0} \u043d\u0435 \u044f\u0432\u043b\u044f\u0435\u0442\u0441\u044f \u043a\u043e\u0440\u0440\u0435\u043a\u0442\u043d\u043e\u0439 \u0432\u0435\u0440\u0441\u0438\u0435\u0439.",maxInlineResultsDisplayed:15,expandAllResults:!0})}function a(e){var i,n=s(e);return i=n.is("select")?n:n.find("select")}function o(e,i){i=i||".aui-field-versionspicker.frother-control-renderer",s(i,e).each(function(){var e=a(this);e.length&&l(e)})}n.bind(r.NEW_CONTENT_ADDED,function(e,i,n){n!==t.panelRefreshed&&o(i)})});;
;
/* module-key = 'jira.webresources:jira-fields', location = '/includes/jira/field/initCommentControls.js' */
define("jira/field/init-comment-controls",["jira/skate","jira/ajs/select/security-level-select","jira/wikipreview/wiki-preview"],function(e,i,t){e("jira-wikifield",{type:e.type.CLASSNAME,created:function(e){var i={fieldId:e.getAttribute("field-id"),trigger:e.querySelector(".wiki-preview").id,issueKey:e.getAttribute("issue-key"),rendererType:e.getAttribute("renderer-type")};t(i,e).init()}}),e("security-level",{type:e.type.CLASSNAME,created:function(e){var t=e.querySelector("#commentLevel");t&&new i(t)}})});;
;
/* module-key = 'jira.webresources:jira-fields', location = '/includes/jira/field/initLogWorkControls.js' */
define("jira/field/init-log-work-controls",["jira/util/events","jira/util/events/types","jira/util/events/reasons","jquery"],function(e,t,a,i){function n(e,t){var a=i(e).find("#worklog-logworkcontainer"),n=i(e).find("#worklog-timetrackingcontainer"),d=i(e).find("#log-work-activate");t?(a.removeClass("hidden"),n.addClass("hidden"),d.prop("checked",!0)):(a.addClass("hidden"),n.removeClass("hidden"),d.prop("checked",!1))}function d(e){i("#log-work-adjust-estimate-new-value, #log-work-adjust-estimate-manual-value",e).attr("disabled","disabled"),i("#log-work-adjust-estimate-"+i("input[name=worklog_adjustEstimate]:checked,input[name=adjustEstimate]:checked",e).val()+"-value",e).removeAttr("disabled"),i("input[name=worklog_adjustEstimate],input[name=adjustEstimate]",e).change(function(){i("#log-work-adjust-estimate-new-value,#log-work-adjust-estimate-manual-value",e).attr("disabled","disabled"),i("#log-work-adjust-estimate-"+i(this).val()+"-value",e).removeAttr("disabled")}),i("#delete-log-work-adjust-estimate-new-value").change(function(){i("#delete-log-work-adjust-estimate-new").prop("checked",!0)}),i("#delete-log-work-adjust-estimate-manual-value").change(function(){i("#delete-log-work-adjust-estimate-manual").prop("checked",!0)}),i(e).find("#log-work-activate").change(function(){n(e,i(this).is(":checked"))})}e.bind(t.VALIDATE_TIMETRACKING,function(e,t){n(t,!0)}),e.bind(t.NEW_CONTENT_ADDED,function(e,t,i){i!==a.panelRefreshed&&d(t)})});;
;
/* module-key = 'jira.webresources:jira-fields', location = '/includes/jira/field/initPriorityPickers.js' */
define("jira/field/init-priority-pickers",["jira/ajs/select/single-select","jira/util/events/reasons","jira/util/events/types","jira/util/events"],function(e,i,n,t){function r(i){i.find("select#priority").each(function(i,n){new e({element:n,revertOnInvalid:!0})})}t.bind(n.NEW_CONTENT_ADDED,function(e,n,t){t!==i.panelRefreshed&&r(n)})});;
;
/* module-key = 'jira.webresources:jira-fields', location = '/includes/jira/field/initInlineAttach.js' */
define("jira/field/init-inline-attach",["jquery","jira/util/events","jira/util/events/types","jira/util/events/reasons","jira/analytics","jira/jquery/plugins/attachment/inline-attach"],function(i,n,e,t,a){function r(i){i.find("input[type=file]:not('.ignore-inline-attach')").inlineAttach()}n.bind(e.NEW_CONTENT_ADDED,function(i,n,e){if(e!==t.panelRefreshed)try{r(n)}catch(i){a.send({name:"field.inline.attach.error",properties:{reason:i}})}})});;
;
/* module-key = 'jira.webresources:jira-fields', location = '/includes/jira/issue/initIssueFields.js' */
require(["jira/skate","jira/ajs/select/single-select","jira/ajs/select/multi-select","jira/util/formatter","jquery"],function(e,t,l,s,a){e("single-select-issue-field",{type:e.type.CLASSNAME,attached:function(e){a(e).hasClass("aui-ss-select")||new t({element:e,revertOnInvalid:!0})}}),e("multi-select-issue-field",{type:e.type.CLASSNAME,attached:function(e){a(e).hasClass("multi-select-select")||new l({element:e,itemAttrDisplayed:"label",removeOnUnSelect:!1,submitInputVal:!0,errorMessage:"{0} \u043d\u0435 \u044f\u0432\u043b\u044f\u0435\u0442\u0441\u044f \u0434\u043e\u043f\u0443\u0441\u0442\u0438\u043c\u044b\u043c \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0435\u043c.",maxInlineResultsDisplayed:15,expandAllResults:!0})}})});;
;
/* module-key = 'jira.webresources:jira-fields', location = '/includes/jira/field/init/init-jira-fields-webresource.js' */
require("jira/field/init-cascading-selects"),require("jira/field/init-component-pickers"),require("jira/field/init-multi-select-pickers"),require("jira/field/init-date-pickers"),require("jira/field/init-legacy-group-pickers"),require("jira/field/init-issue-pickers"),require("jira/field/init-label-pickers"),require("jira/field/init-version-pickers"),require("jira/field/init-comment-controls"),require("jira/field/init-log-work-controls"),require("jira/field/init-priority-pickers"),require("jira/field/init-inline-attach");;
;
/* module-key = 'com.atlassian.jira.jira-tzdetect-plugin:tzdetect-lib', location = 'banner/tzdetect-banner.js' */
!function(){"use strict";require(["jquery","jira/flag","jira/featureflags/simplified-ux-feature-manager"],function(e,t,n){function i(e){return 60*(+e||0)*1e3}function a(e){return Math.floor((+e||0)/1e3/60)}function r(e){return function(t){1!==t.which||t.shiftKey||t.ctrlKey||t.metaKey||e.apply(this,arguments)}}var s=AJS.contextPath()+"/rest/tzdetect/1",o={$tzFlag:null,$link:null,$dropdown:null,prefs:{},detected:{}};o.init=function(){if(!o.$tzFlag&&(o.detectTimezoneOffsets(),null!=o.detected.janOffset&&null!=o.detected.julyOffset&&o.prefs.tzid)){var e=o.detected.janOffset!=o.prefs.janOffset||o.detected.julyOffset!=o.prefs.julyOffset;e&&o.prefs.enabled&&o.create()}},o.detectTimezoneOffsets=function(){o.prefs=o.getPreferences(),o.prefs.tzid&&(o.detected.janOffset=o.getTzOffset(0),o.detected.julyOffset=o.getTzOffset(6))},o.create=function(){var a=n.isPeopleProfileEnabled()?o.personalSettingsLink():o.profileLink()+"#zone-set",s=AJS.format("Your computer\'\'s time zone does not appear to match your Jira time zone preference of {0}.",o.prefs.tzname),f="\u041e\u0431\u043d\u043e\u0432\u0438\u0442\u0435 \u0432\u0430\u0448 \u0444\u043e\u0440\u043c\u0430\u0442 JIRA",c=JIRA.plugins.tzdetect.soy.banner({message:s,updateLinkText:f,updateLink:a}),l=[i(o.detected.janOffset),i(o.detected.julyOffset)].join(","),u=t.showInfoMsg(null,c,{dismissalKey:"com.atlassian.jira.tzdetect."+l});u&&(o.$tzFlag=e(u),o.getPotentialZones(),o.$tzFlag.on("aui-flag-close",function(){o.track("clicked.nothanks"),o.$tzFlag=void 0}),o.$link=o.$tzFlag.find(".tz-yes"),o.$link.click(r(function(e){e.preventDefault(),o.getPotentialZones().then(o.handleZoneData)})),o.track("shown"))},o.track=function(e,t){var n={name:"tzdetect.banner."+e};t&&(n.data=t),AJS.trigger("analyticsEvent",n)},o.profileLink=function(){return AJS.contextPath()+"/secure/ViewProfile.jspa"},o.personalSettingsLink=function(){return AJS.contextPath()+"/secure/ViewPersonalSettings.jspa"},o.redirect=function(e){window.location=e},o.getPreferences=function(){var e=WRM.data.claim("com.atlassian.jira.jira-tzdetect-plugin:tzdetect-lib.time-zone-data");return e.janOffset=a(e.janOffset),e.julyOffset=a(e.julyOffset),e},o.handleZoneData=function(e){var t=o.filterZoneData(e.zones),n=t.length;t.regions={};for(var i,a=e.regions.length;a--;)i=e.regions[a],t.regions[i.key]=i.displayName;if(t.sort(function(e,t){var n=e.regionKey,i=t.regionKey;return n==i?e.city<t.city?-1:1:n<i?-1:1}),o.track("clicked.update",{matchingZoneCount:n}),!n)return void o.redirect(o.$link.attr("href"));if(1===n)return void o.setUserTimeZone(t[0].timeZoneId,"banner");if(!o.$dropdown){var s="timezone-selection-list";o.$link.addClass("aui-dropdown2-trigger").attr("aria-owns",s).attr("aria-haspopup","true"),o.$dropdown=AJS.$(JIRA.plugins.tzdetect.soy.dropdown({id:s,sections:o.getListSections(t),baseHref:o.profileLink()})).css("z-index",5e3).on("click","a",r(function(e){var t=AJS.$(this),n=t.attr("data-tzid");if(n)e.preventDefault(),o.setUserTimeZone(n,"menu");else if(t.attr("data-tzother")){var i={offsets:[o.detected.janOffset,o.detected.julyOffset].join(",")};o.track("menu.other",i)}})).appendTo("body")}o.$dropdown.trigger("aui-button-invoke")},o.filterZoneData=function(e){var t=["Antarctica","Etc"];return _.filter(e,function(e){return!_.contains(t,e.regionKey)})},o.getListSections=function(e){for(var t,n,i,a=[],r=0,s=e.length;r<s;r++)t=e[r].regionKey,t!==n&&(i={region:e.regions[t]||t,zones:[]},a.push(i),n=t),i.zones.push(e[r]);return a.push({other:"\u0414\u0440\u0443\u0433\u043e\u0435\u2026"}),a},o.getTzOffset=function(e){var t=(new Date).getFullYear(),n=new Date(t,e,1,12,0,0);return-n.getTimezoneOffset()},o.getPotentialZones=function(){var t=e.Deferred();if(o.zoneList)t.resolve(o.zoneList);else{var n={janOffset:i(o.detected.janOffset),julyOffset:i(o.detected.julyOffset)};JIRA.SmartAjax.makeRequest({url:s+"/zones",type:"GET",data:n,contentType:"application/json",complete:function(e,n,i){"abort"!=n&&i.successful?(o.zoneList=i.data,t.resolve(o.zoneList)):t.reject(i)}})}return t.promise()},o.setUserTimeZone=function(e,t){o.track("setzone",{zoneId:e,source:t}),JIRA.SmartAjax.makeRequest({url:s+"/update",type:"POST",data:e,contentType:"application/json",complete:function(e,t,n){if("abort"!=t&&n.successful&&(o.$tzFlag&&o.$tzFlag.find(".aui-icon.icon-close").click(),JIRA.Messages)){var i=n.data,a=AJS.format("\u0412\u0430\u0448 \u0447\u0430\u0441\u043e\u0432\u043e\u0439 \u043f\u043e\u044f\u0441 \u043f\u043e \u0443\u043c\u043e\u043b\u0447\u0430\u043d\u0438\u044e: {0}.",i.gmtOffset+" "+i.city);JIRA.Messages.showSuccessMsg(a,{closeable:!0})}}})},e(function(){window.__tzTesting||o.init()}),(JIRA.plugins||(JIRA.plugins={})).tzBanner=o})}();;
;
/* module-key = 'com.atlassian.jira.jira-tzdetect-plugin:tzdetect-lib', location = 'banner/tzdetect-banner.soy' */
// This file was automatically generated from tzdetect-banner.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace JIRA.plugins.tzdetect.soy.
 */

if (typeof JIRA == 'undefined') { var JIRA = {}; }
if (typeof JIRA.plugins == 'undefined') { JIRA.plugins = {}; }
if (typeof JIRA.plugins.tzdetect == 'undefined') { JIRA.plugins.tzdetect = {}; }
if (typeof JIRA.plugins.tzdetect.soy == 'undefined') { JIRA.plugins.tzdetect.soy = {}; }


JIRA.plugins.tzdetect.soy.banner = function(opt_data, opt_ignored) {
  return soy.$$escapeHtml(opt_data.message) + '<p><a class="tz-yes" href="' + soy.$$escapeHtml(opt_data.updateLink) + '">' + soy.$$escapeHtml(opt_data.updateLinkText) + '</a></p>';
};
if (goog.DEBUG) {
  JIRA.plugins.tzdetect.soy.banner.soyTemplateName = 'JIRA.plugins.tzdetect.soy.banner';
}


JIRA.plugins.tzdetect.soy.dropdown = function(opt_data, opt_ignored) {
  var output = '<div class="aui-dropdown2 aui-style-default"' + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + '>';
  var sectionList17 = opt_data.sections;
  var sectionListLen17 = sectionList17.length;
  for (var sectionIndex17 = 0; sectionIndex17 < sectionListLen17; sectionIndex17++) {
    var sectionData17 = sectionList17[sectionIndex17];
    output += '<div class="aui-dropdown2-section">';
    if (sectionData17.region) {
      output += '<strong>' + soy.$$escapeHtml(sectionData17.region) + '</strong><ul class="aui-list-truncate">';
      var zoneList24 = sectionData17.zones;
      var zoneListLen24 = zoneList24.length;
      for (var zoneIndex24 = 0; zoneIndex24 < zoneListLen24; zoneIndex24++) {
        var zoneData24 = zoneList24[zoneIndex24];
        output += '<li><a href="' + soy.$$escapeHtml(opt_data.baseHref) + '#zone-' + soy.$$escapeHtml(zoneData24.timeZoneId) + '" data-tzid="' + soy.$$escapeHtml(zoneData24.timeZoneId) + '">' + soy.$$escapeHtml(zoneData24.gmtOffset) + ' ' + soy.$$escapeHtml(zoneData24.city) + '</a></li>';
      }
      output += '</ul>';
    } else if (sectionData17.other) {
      output += '<ul class="aui-list-truncate"><li><a href="' + soy.$$escapeHtml(opt_data.baseHref) + '#zone-other" data-tzother="true">' + soy.$$escapeHtml(sectionData17.other) + '</a></li></ul>';
    }
    output += '</div>';
  }
  output += '</div>';
  return output;
};
if (goog.DEBUG) {
  JIRA.plugins.tzdetect.soy.dropdown.soyTemplateName = 'JIRA.plugins.tzdetect.soy.dropdown';
}
;
;
/* module-key = 'com.atlassian.labs.hipchat.hipchat-for-jira-plugin:resources-init', location = 'js/resources-init.js' */
AJS.toInit(function(){var a=WRM.data.claim("com.atlassian.labs.hipchat.hipchat-for-jira-plugin:resources-init.is-hipchat-enabled-data-provider");if(a){WRM.require("wrc!com.atlassian.labs.hipchat.hipchat-for-jira-plugin:resources")}});;
;
/* module-key = 'jira.webresources:user-message-flags', location = '/includes/jira/admin/admin-flags.js' */
require(["jira/util/logger","wrm/data","jquery","jira/flag"],function(s,a,e,i){"use strict";e(function(){var c=a.claim("jira.webresources:user-message-flags.adminLockout")||{};if(c.noprojects){var n=JIRA.Templates.Flags.Admin,r=n.adminIssueAccessFlagTitle({}),l=n.adminIssueAccessFlagBody({manageAccessUrl:c.manageAccessUrl}),g=i.showWarningMsg(r,l,{dismissalKey:c.flagId});e(g).find("a").on("click",function(){g.dismiss()})}s.trace("admin.flags.done")})});;
;
/* module-key = 'jira.webresources:user-message-flags', location = 'includes/jira/admin/admin-flags.soy.js' */
if("undefined"==typeof JIRA)var JIRA={};"undefined"==typeof JIRA.Templates&&(JIRA.Templates={}),"undefined"==typeof JIRA.Templates.Flags&&(JIRA.Templates.Flags={}),"undefined"==typeof JIRA.Templates.Flags.Admin&&(JIRA.Templates.Flags.Admin={}),JIRA.Templates.Flags.Admin.adminIssueAccessFlagTitle=function(e,s){return""+soy.$$escapeHtml("\u0412\u0430\u0448\u0438 \u0442\u0435\u043a\u0443\u0449\u0438\u0435 \u043e\u0433\u0440\u0430\u043d\u0438\u0447\u0435\u043d\u0438\u044f")},JIRA.Templates.Flags.Admin.adminIssueAccessFlagBody=function(e,s){var a="";'<a href="'+soy.$$escapeHtml(AJS.contextPath())+"/"+soy.$$escapeHtml(e.manageAccessUrl)+'">';return a+='<p id="admin-noprojects">'+soy.$$escapeHtml("\u0412\u044b \u0432\u043e\u0448\u043b\u0438 \u043a\u0430\u043a \u0430\u0434\u043c\u0438\u043d\u0438\u0441\u0442\u0440\u0430\u0442\u043e\u0440, \u043d\u043e \u0443 \u0432\u0430\u0441 \u043d\u0435\u0442 \u0434\u043e\u0441\u0442\u0443\u043f\u0430 \u043a \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u044f\u043c JIRA. \u0412\u044b \u043c\u043e\u0436\u0435\u0442\u0435 \u0432\u044b\u043f\u043e\u043b\u043d\u044f\u0442\u044c \u0430\u0434\u043c\u0438\u043d\u0438\u0441\u0442\u0440\u0430\u0442\u043e\u0440\u0441\u043a\u0438\u0435 \u0437\u0430\u0434\u0430\u0447\u0438, \u043d\u043e \u043d\u0435 \u043c\u043e\u0436\u0435\u0442\u0435 \u043f\u0440\u043e\u0441\u043c\u0430\u0442\u0440\u0438\u0432\u0430\u0442\u044c \u0438 \u0440\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u0437\u0430\u0434\u0430\u0447\u0438.")+'</p><p><a href="'+soy.$$escapeHtml(AJS.contextPath())+"/"+soy.$$escapeHtml(e.manageAccessUrl)+'">'+soy.$$escapeHtml("\u0423\u043f\u0440\u0430\u0432\u043b\u044f\u0439\u0442\u0435 \u0432\u0430\u0448\u0438\u043c \u0434\u043e\u0441\u0442\u0443\u043f\u043e\u043c \u043a \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u044f\u043c.")+"</a></p>"};;
;
/* module-key = 'com.atlassian.plugins.helptips.jira-help-tips:analytics', location = 'util/analytics.js' */
define("jira-help-tips/util/analytics",function(){"use strict";function t(t){return t=""+(t||""),t.replace(/\./g,"-")}function e(){return AJS&&AJS.EventQueue}function i(i,n){if(e()&&n&&n.attributes.id){var r={},u=t(n.attributes.id),a="";n.attributes.eventPrefix&&(a=n.attributes.eventPrefix,"."!==a.charAt(a.length-1)&&(a+=".")),r.name=a+"helptips."+u+"."+i,r.properties={},e().push(r)}}return{clean:t,send:i}});;
;
/* module-key = 'com.atlassian.plugins.helptips.jira-help-tips:help-tip-manager', location = 'js/HelpTipManager.js' */
define("jira-help-tips/feature/help-tip-manager",["require"],function(s){var e=s("jquery"),i=s("underscore"),t=s("wrm/context-path"),n=s("wrm/data"),r=t()+"/rest/helptips/1.0/tips",d=n.claim("com.atlassian.plugins.helptips.jira-help-tips:help-tip-manager.JiraHelpTipData"),a={dismissedTipIds:[],sequences:[],loaded:e.Deferred(),url:function(){return r},sync:function(s,i){var t=e.Deferred();return s||(s="get"),i||(i=null),"get"===s&&d&&d.dismissed?t.resolve(d.dismissed):e.ajax(this.url(),{type:s,dataType:"json",contentType:"application/json",data:i&&JSON.stringify(i),processData:!1}).done(function(s){t.resolve(s)}).fail(function(){t.reject()}),t.promise()},fetch:function(){var s=this.sync();return s.done(e.proxy(function(s){e.merge(this.dismissedTipIds,s),this.loaded.resolve()},this)),s.promise()},show:function(s){this.loaded.done(s)},dismiss:function(s){var e=s.attributes.id;e?(this.dismissedTipIds.push(e),this.sync("post",{id:e})):s._dismissed=!0},undismiss:function(s){var i=s.attributes.id;i?(this.dismissedTipIds.splice(e.inArray(i,this.dismissedTipIds),1),this.sync("delete",{id:i})):s._dismissed=!1},isDismissed:function(s){var i=s.attributes.id;return i?e.inArray(i,this.dismissedTipIds)>=0:s._dismissed},clearSequences:function(){this.sequences=[]},hideSequences:function(){i.each(this.sequences,function(s){s.view.dismiss()})},showSequences:function(){if(!this._showStarted){var s=this,t=0;this._showStarted=!0,e.when(this.loaded).done(function(){s.sequences.sort(function(s,e){return s.attributes.weight-e.attributes.weight}),s.sequences=i.filter(s.sequences,function(e){var n=i.indexOf(s.dismissedTipIds,e.attributes.id)===-1;return n&&(e.attributes.position=t++),n}),s.sequences.length>0&&(i.last(s.sequences).attributes.showCloseButton=!0,s.sequences[0].show({force:!0})),s._showStarted=!1})}}};return a});;
;
/* module-key = 'com.atlassian.plugins.helptips.jira-help-tips:help-tip', location = 'templates/HelpTip.soy' */
// This file was automatically generated from HelpTip.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace AJS.Templates.HelpTip.
 */

if (typeof AJS == 'undefined') { var AJS = {}; }
if (typeof AJS.Templates == 'undefined') { AJS.Templates = {}; }
if (typeof AJS.Templates.HelpTip == 'undefined') { AJS.Templates.HelpTip = {}; }


AJS.Templates.HelpTip.tipContent = function(opt_data, opt_ignored) {
  return ((opt_data.title) ? '<h2 class="helptip-title">' + soy.$$escapeHtml(opt_data.title) + '</h2>' : '') + '<p class="helptip-body">' + soy.$$filterNoAutoescape(opt_data.bodyHtml) + '</p>' + ((opt_data.url) ? '<p><a class="helptip-link" href="' + soy.$$escapeHtml(opt_data.url) + '" target="_blank">' + ((opt_data.linkText) ? soy.$$escapeHtml(opt_data.linkText) : soy.$$escapeHtml('\u0423\u0437\u043d\u0430\u0442\u044c \u0431\u043e\u043b\u044c\u0448\u0435')) + '</a></p>' : '') + AJS.Templates.HelpTip.tipFooter(opt_data);
};
if (goog.DEBUG) {
  AJS.Templates.HelpTip.tipContent.soyTemplateName = 'AJS.Templates.HelpTip.tipContent';
}


AJS.Templates.HelpTip.tipFooter = function(opt_data, opt_ignored) {
  return '<form class="tip-footer">' + AJS.Templates.HelpTip.nextButton(opt_data) + AJS.Templates.HelpTip.closeButton(opt_data) + AJS.Templates.HelpTip.sequencePaging(opt_data) + '</form>';
};
if (goog.DEBUG) {
  AJS.Templates.HelpTip.tipFooter.soyTemplateName = 'AJS.Templates.HelpTip.tipFooter';
}


AJS.Templates.HelpTip.nextButton = function(opt_data, opt_ignored) {
  return '' + ((opt_data.showNextButton) ? '<button class="aui-button helptip-next" type="button">' + ((opt_data.nextButtonText) ? soy.$$escapeHtml(opt_data.nextButtonText) : soy.$$escapeHtml('\u0414\u0430\u043b\u0435\u0435')) + '</button>' : '');
};
if (goog.DEBUG) {
  AJS.Templates.HelpTip.nextButton.soyTemplateName = 'AJS.Templates.HelpTip.nextButton';
}


AJS.Templates.HelpTip.closeButton = function(opt_data, opt_ignored) {
  return '' + ((opt_data.showCloseButton) ? '<button class="aui-button ' + ((opt_data.showNextButton) ? ' aui-button-link ' : '') + ' helptip-close" type="button">' + ((opt_data.closeButtonText) ? soy.$$escapeHtml(opt_data.closeButtonText) : soy.$$escapeHtml('\u0417\u0430\u043a\u0440\u044b\u0442\u044c')) + '</button>' : '');
};
if (goog.DEBUG) {
  AJS.Templates.HelpTip.closeButton.soyTemplateName = 'AJS.Templates.HelpTip.closeButton';
}


AJS.Templates.HelpTip.sequencePaging = function(opt_data, opt_ignored) {
  return '' + ((opt_data.isSequence && opt_data.length > 1) ? '<span class="helptip-sequence-paging">' + soy.$$escapeHtml(opt_data.position + 1) + '/' + soy.$$escapeHtml(opt_data.length) + '</span>' : '');
};
if (goog.DEBUG) {
  AJS.Templates.HelpTip.sequencePaging.soyTemplateName = 'AJS.Templates.HelpTip.sequencePaging';
}
;
;
/* module-key = 'com.atlassian.plugins.helptips.jira-help-tips:help-tip', location = 'js/HelpTip.js' */
define("jira-help-tips/feature/help-tip",["require"],function(i){"use strict";function t(){return!1}function e(){return!0}function s(){return"jira-help-tip-"+d+c++}var n=i("jquery"),o=i("underscore"),h=i("jira-help-tips/feature/help-tip-manager"),l=i("jira-help-tips/util/analytics"),r=i("aui/inline-dialog"),a=AJS.Popups,u=AJS.Templates.HelpTip,c=0,d=(new Date).getTime(),p="jira-help-tip aui-help",f=function(i){var t;this.attributes=n.extend({},i),this.attributes.id||(this.attributes.id=!1),this.attributes.callbacks||(this.attributes.callbacks={}),this.attributes.isSequence&&(this.attributes.weight||(this.attributes.weight=Number.MAX_VALUE),h.sequences.push(this)),this.attributes.body&&(this.attributes.bodyHtml=this.attributes.body,delete this.attributes.body),this.cid=s(),t=this.attributes.anchor,delete this.attributes.anchor,this.view=t?new b(this,t):new m(this)};n.extend(f.prototype,{show:function(i){i=i||{};var t=this,e=n.Deferred();if(this.attributes.callbacks.beforeShow){var s=this.attributes.callbacks.beforeShow();s&&o.isFunction(s.done)?s.done(e.resolve):e.resolve()}else e.resolve();e.done(function(){h.show(function(){t.isDismissed()||(!i.force&&a&&a.DisplayController?a.DisplayController.request({name:t.id,weight:1e3,show:function(){t.view.show()}}):t.view.show(),l.send("shown",t))})})},dismiss:function(){var i=l.clean(arguments[0]||"programmatically");this.view.dismiss(),"close-button"===i&&this.attributes.isSequence&&h.clearSequences(),this.isDismissed()||(h.dismiss(this),l.send("dismissed."+i,this))},isVisible:function(){return this.view.$el.is(":visible")},isDismissed:function(){return h.isDismissed(this)},refresh:function(){this.isDismissed()||this.view.refresh()},hide:function(){this.isDismissed()||this.view.dismiss()},showNextHelpTipInSequence:function(){this.view.clickNext()}});var b=function(i,t){this.initialize(i,t)};n.extend(b.prototype,{initialize:function(i,e){this.model=i,this.anchorSelector=e,this.anchor=n(e),this._initDialog(e),n(document).bind("showLayer",function(e,s,o){"inlineDialog"===s&&o.id===i.cid&&(r.current=null,n(document.body).unbind("click."+i.cid+".inline-dialog-check"),o._validateClickToClose=t,o.hide=t)})},show:function(){this.beforeHide=t,this.popup.show()},refresh:function(){var i=n(this.anchorSelector);i.is(":visible")?i.get(0)!==this.anchor.get(0)?this.changeAnchor(i):this.isVisible()?this.popup.refresh():this.show():this.dismiss()},changeAnchor:function(i){var t=this.isVisible();this.dismiss(),this.$el.remove(),this.anchor=i,this._initDialog(i),t&&this.show()},dismiss:function(){this.beforeHide=e,this._popupHide()},clickNext:function(){var i=n(this.$el).find(".helptip-next");i.length>0&&i.click()},isVisible:function(){return this.$el.is(":visible")},_initDialog:function(i){var e=this,s=this.model;this.popup=r(n(i),s.cid,o.bind(this._createDialog,this),o.extend({container:"#content",noBind:!0,preHideCallback:function(){return e.beforeHide()},calculatePositions:function(i,t,e,s){var o=r.opts.calculatePositions(i,t,e,s),h=n(this.container),l=h.offset();return"auto"!==o.popupCss.left&&(o.popupCss.left-=l.left,o.popupCss.right="auto"),o.popupCss.top-=l.top,o},addActiveClass:!1,initCallback:s.attributes.callbacks.init,hideCallback:s.attributes.callbacks.hide,persistent:!0},s.attributes.inlineDialogOpts)),this._popupHide=this.popup.hide,this.popup.hide=t,this.$el=n(this.popup[0]),this.$el.addClass(p)},_createDialog:function(i,t,e){var s=this,r=h.sequences,a=this.model.attributes.position,c=this.model.attributes.isSequence;i.removeClass("contents"),i.html(n(u.tipContent(o.extend({showNextButton:c&&r.length>1&&a+1<r.length,length:r.length,position:a,showCloseButton:!0},this.model.attributes)))),i.unbind("mouseover mouseout"),i.find(".helptip-link").click(function(){l.send("learn-more.clicked",s.model)}),i.find(".helptip-close").click(function(i){i.preventDefault(),s.model.dismiss("close-button")}),i.find(".helptip-next").click(function(i){i.preventDefault(),s.model.dismiss("next-button");var t=a+1;r[t]&&r[t].show({force:!0})}),e()}});var m=function(i){this.initialize(i)};return n.extend(m.prototype,{initialize:function(){this.$el=n("<div></div>"),this.$el.addClass(p)},show:function(){},dismiss:function(){}}),f});;
;
/* module-key = 'com.atlassian.plugins.helptips.jira-help-tips:initialiser', location = 'js/initialiser.js' */
define("jira-help-tips/page/initialiser",["jira-help-tips/feature/help-tip-manager","jira/util/users/logged-in-user","underscore"],function(e,i,n){function r(){i.isAnonymous()||e.fetch()}return{init:n.once(r)}});;
;
/* module-key = 'com.atlassian.plugins.helptips.jira-help-tips:common', location = 'js/legacy.js' */
!function(){"use strict";AJS.namespace("AJS.HelpTip",null,require("jira-help-tips/feature/help-tip")),AJS.namespace("AJS.HelpTip.Manager",null,require("jira-help-tips/feature/help-tip-manager")),require("jira-help-tips/page/initialiser").init()}();;
;
/* module-key = 'jira.webresources:mobile-getmobile', location = '/includes/jira/mobile/show-get-mobile-dialog.js' */
define("jira/mobile/show-get-mobile-dialog",["wrm/data","wrm/context-path","jquery"],function(t,e,n){"use strict";function i(){0==n(r).length&&(n("body").append(JIRA.Templates.Mobile.getmobile({contextPath:c})),s(),n(p).click(function(){var t=n(d).intlTelInput("getNumber");u(t),AJS.dialog2(r).hide(),n(d).intlTelInput("setNumber",""),a(!1)})),AJS.dialog2(n(r)).show()}function l(){return n("head").append("<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/9.0.9/css/intlTelInput.css'>"),n.getScript("https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/9.0.9/js/intlTelInput.min.js")}function s(){l().done(function(){n.fn.intlTelInput.loadUtils("https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/9.0.9/js/utils.js"),o()})}function o(){n(d).intlTelInput({preferredCountries:["us","gb","au","de","es","jp"]}),n(d).on("input",function(){a(n(d).intlTelInput("isValidNumber"))}),n(d).on("countrychange",function(){a(n(d).intlTelInput("isValidNumber"))}),n("#jira-get-mobile-content").css("overflow","visible"),n(".country-list").css("width","359px")}function a(t){n("#jira-get-mobile-continue").prop("disabled",!t)}function u(t){return n.ajax({url:"https://simple-sms-sender.us-east-1.prod.public.atl-paas.net/rest/send/EE-29",type:"POST",contentType:"application/json",data:JSON.stringify({to:t,name:"there",atlassianAccount:AJS.Meta.get("atlassian-account-id")})}).then(function(){analytics.send({name:"getmobile.sendsms"})})}var c=e(),r="#jira-get-mobile-dialog",p="#jira-get-mobile-continue",d="#jira-get-mobile-phone";return i});;
;
/* module-key = 'jira.webresources:mobile-getmobile', location = '/includes/jira/mobile/getmobile.js' */
require(["jira/mobile/show-get-mobile-dialog","jira/analytics","jquery"],function(e,i,t){"use strict";t(function(){var n=t("#view_get_mobile");n.length>0&&(n.attr("href","#"),n.click(function(){e(),i.send({name:"getmobile.click"})}))})});;
;
/* module-key = 'jira.webresources:mobile-getmobile', location = 'includes/jira/mobile/getmobile.soy.js' */
if("undefined"==typeof JIRA)var JIRA={};"undefined"==typeof JIRA.Templates&&(JIRA.Templates={}),"undefined"==typeof JIRA.Templates.Mobile&&(JIRA.Templates.Mobile={}),JIRA.Templates.Mobile.getmobile=function(e,i){return'<section role="dialog" id="jira-get-mobile-dialog" class="aui-layer aui-dialog2 aui-dialog2-small" aria-hidden="true"><header class="aui-dialog2-header" style="background-image: url('+soy.$$escapeHtml(e.contextPath)+'/images/mobile/getmobile.png);"><h2 class="aui-dialog2-header-main"></h2><a class="aui-dialog2-header-close"><span class="aui-icon aui-icon-small aui-iconfont-close-dialog">'+soy.$$escapeHtml("\u0417\u0430\u043a\u0440\u044b\u0442\u044c")+'</span></a></header><div id="jira-get-mobile-content" class="aui-dialog2-content"><div><h2>'+soy.$$escapeHtml("\u0421\u043e\u0437\u0434\u0430\u0439\u0442\u0435 \u0441\u0432\u043e\u044e \u0441\u043b\u0435\u0434\u0443\u044e\u0449\u0443\u044e \u0437\u0430\u0434\u0430\u0447\u0443 \u0433\u0434\u0435 \u0443\u0433\u043e\u0434\u043d\u043e.")+'</h2></div><div class="jira-get-mobile-content-copy">'+soy.$$escapeHtml("\u0413\u0434\u0435 \u0431\u044b \u0432\u044b \u043d\u0438 \u043d\u0430\u0445\u043e\u0434\u0438\u043b\u0438\u0441\u044c \u2014 \u0432 \u043f\u043e\u0435\u0437\u0434\u0435 \u0438\u043b\u0438 \u043d\u0430 \u043f\u0435\u0440\u0435\u0440\u044b\u0432\u0435 \u043c\u0435\u0436\u0434\u0443 \u0441\u043e\u0432\u0435\u0449\u0430\u043d\u0438\u044f\u043c\u0438, \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u0435 JIRA \u0432\u0441\u0435\u0433\u0434\u0430 \u043f\u043e\u0434 \u0440\u0443\u043a\u043e\u0439, \u0435\u0441\u043b\u0438 \u043a \u0432\u0430\u043c \u043f\u0440\u0438\u0434\u0435\u0442 \u0432\u0434\u043e\u0445\u043d\u043e\u0432\u0435\u043d\u0438\u0435.")+'<form class="aui" style="padding-top: 15px; padding-bottom: 8px" onsubmit="return false;"><div style="display: inline-block; white-space: nowrap"><input type="tel" id="jira-get-mobile-phone" style="border-top-right-radius: 0; border-bottom-right-radius: 0; width: 261px;" class="text long-field form-control" autofocus><button id="jira-get-mobile-continue" style="border-bottom-left-radius: 0; border-top-left-radius: 0; margin-left: -4px;" class="aui-button aui-button-primary" disabled>'+soy.$$escapeHtml("\u041f\u043e\u043b\u0443\u0447\u0438\u0442\u044c \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u0435")+"</button></div></form><small>"+soy.$$escapeHtml("\u041d\u0430 \u043f\u043e\u043b\u0443\u0447\u0435\u043d\u043d\u043e\u0435 \u0442\u0435\u043a\u0441\u0442\u043e\u0432\u043e\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435 \u0440\u0430\u0441\u043f\u0440\u043e\u0441\u0442\u0440\u0430\u043d\u044f\u044e\u0442\u0441\u044f \u0441\u0442\u0430\u043d\u0434\u0430\u0440\u0442\u043d\u044b\u0435 \u0442\u0430\u0440\u0438\u0444\u044b \u0432\u0430\u0448\u0435\u0433\u043e \u043e\u043f\u0435\u0440\u0430\u0442\u043e\u0440\u0430.")+'</small></div></div><footer class="aui-dialog2-footer"></footer></section>'};;
;
/* module-key = 'com.atlassian.auiplugin:internal-@atlassian-aui-src-js-aui-header-async', location = 'node_modules/@atlassian/aui/src/js/aui/header-async.js' */
("undefined"===typeof window?global:window).__b85c25eb273a1b11a40084d04bbc6270=function(){var b={};"use strict";Object.defineProperty(b,"__esModule",{value:!0});var a=__906ea2ee8af7ec57662c322a720a678d,c=a&&a.__esModule?a:{"default":a},a=(a=__c1ce1f1e3e613f564fc234ff043570f1)&&a.__esModule?a:{"default":a},a=(0,a.default)("aui-header",{type:a.default.type.CLASSNAME,created:function(a){(0,c.default)(a)}});b.default=a;return b=b["default"]}.call(this);;
;
/* module-key = 'com.atlassian.plugins.atlassian-nav-links-plugin:rotp-menu', location = 'appswitcher/appswitcher.soy' */
// This file was automatically generated from appswitcher.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace navlinks.templates.appswitcher.
 */

if (typeof navlinks == 'undefined') { var navlinks = {}; }
if (typeof navlinks.templates == 'undefined') { navlinks.templates = {}; }
if (typeof navlinks.templates.appswitcher == 'undefined') { navlinks.templates.appswitcher = {}; }


navlinks.templates.appswitcher.linkSection = function(opt_data, opt_ignored) {
  var output = '';
  if (opt_data.list.length > 0) {
    output += '<div class="aui-nav-heading sidebar-section-header">' + soy.$$escapeHtml(opt_data.title) + '</div><ul class="aui-nav nav-links">';
    var linkList8 = opt_data.list;
    var linkListLen8 = linkList8.length;
    for (var linkIndex8 = 0; linkIndex8 < linkListLen8; linkIndex8++) {
      var linkData8 = linkList8[linkIndex8];
      output += navlinks.templates.appswitcher.applicationsItem(linkData8);
    }
    output += '</ul>';
  }
  return output;
};
if (goog.DEBUG) {
  navlinks.templates.appswitcher.linkSection.soyTemplateName = 'navlinks.templates.appswitcher.linkSection';
}


navlinks.templates.appswitcher.applicationsItem = function(opt_data, opt_ignored) {
  return '<li class="nav-link"><a href="' + soy.$$escapeHtml(opt_data.link) + '" ' + ((opt_data.self) ? 'class="checked"' : '') + ' title="' + soy.$$escapeHtml(opt_data.link) + '"><span class="nav-link-label">' + soy.$$escapeHtml(opt_data.label) + '</span></a></li>';
};
if (goog.DEBUG) {
  navlinks.templates.appswitcher.applicationsItem.soyTemplateName = 'navlinks.templates.appswitcher.applicationsItem';
}


navlinks.templates.appswitcher.shortcutsItem = function(opt_data, opt_ignored) {
  return '<li class="nav-link"><a href="' + soy.$$escapeHtml(opt_data.link) + '" ' + ((opt_data.self) ? 'class="checked"' : '') + ' title="' + soy.$$escapeHtml(opt_data.link) + '"><span class="nav-link-label">' + soy.$$escapeHtml(opt_data.label) + '</span>' + ((opt_data.showDescription && opt_data.description) ? '<span class="nav-link-description">' + soy.$$escapeHtml(opt_data.description) + '</span>' : '') + '</a></li>';
};
if (goog.DEBUG) {
  navlinks.templates.appswitcher.shortcutsItem.soyTemplateName = 'navlinks.templates.appswitcher.shortcutsItem';
}


navlinks.templates.appswitcher.error = function(opt_data, opt_ignored) {
  return '<div class="app-switcher-error">' + soy.$$filterNoAutoescape('\u0427\u0442\u043e-\u0442\u043e \u043f\u043e\u0448\u043b\u043e \u043d\u0435 \u0442\u0430\u043a, \u043f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430 \x3cspan classappswitcher.featureDiscovery.button\x3d\u041c\u0435\u043d\u044e \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u0439') + '</div>';
};
if (goog.DEBUG) {
  navlinks.templates.appswitcher.error.soyTemplateName = 'navlinks.templates.appswitcher.error';
}


navlinks.templates.appswitcher.sidebarContents = function(opt_data, opt_ignored) {
  return '<div class="aui-page-panel-nav"><nav class="aui-navgroup aui-navgroup-vertical"><div class="app-switcher-section app-switcher-applications"><div class="aui-nav-heading">' + soy.$$escapeHtml('\u0421\u0441\u044b\u043b\u043a\u0438 \u043d\u0430 \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u044f') + '</div><div class="app-switcher-loading">' + soy.$$filterNoAutoescape('\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430\x26hellip;') + '</div></div><div class="app-switcher-section app-switcher-shortcuts"><div class="aui-nav-heading">' + soy.$$escapeHtml('\u042f\u0440\u043b\u044b\u043a\u0438') + '</div><div class="app-switcher-loading">' + soy.$$filterNoAutoescape('\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430\x26hellip;') + '</div></div></nav></div>';
};
if (goog.DEBUG) {
  navlinks.templates.appswitcher.sidebarContents.soyTemplateName = 'navlinks.templates.appswitcher.sidebarContents';
}


navlinks.templates.appswitcher.loading = function(opt_data, opt_ignored) {
  return '<div class="app-switcher-loading">' + soy.$$filterNoAutoescape('\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430\x26hellip;') + '</div>';
};
if (goog.DEBUG) {
  navlinks.templates.appswitcher.loading.soyTemplateName = 'navlinks.templates.appswitcher.loading';
}


navlinks.templates.appswitcher.trigger = function(opt_data, opt_ignored) {
  return '<span class="aui-icon aui-icon-small aui-iconfont-appswitcher">' + soy.$$escapeHtml('\u0421\u0432\u044f\u0437\u0430\u043d\u043d\u044b\u0435 \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u044f') + '</span>';
};
if (goog.DEBUG) {
  navlinks.templates.appswitcher.trigger.soyTemplateName = 'navlinks.templates.appswitcher.trigger';
}


navlinks.templates.appswitcher.projectHeaderSection = function(opt_data, opt_ignored) {
  return '<div class="app-switcher-title">' + aui.avatar.avatar({size: 'large', avatarImageUrl: opt_data.avatarUrl, isProject: true, title: opt_data.name}) + '<div class="sidebar-project-name">' + soy.$$escapeHtml(opt_data.name) + '</div></div>';
};
if (goog.DEBUG) {
  navlinks.templates.appswitcher.projectHeaderSection.soyTemplateName = 'navlinks.templates.appswitcher.projectHeaderSection';
}


navlinks.templates.appswitcher.cogDropdown = function(opt_data, opt_ignored) {
  var output = '';
  var dropdownList__soy79 = '' + navlinks.templates.appswitcher.dropdownList({list: opt_data.links});
  output += aui.dropdown2.dropdown2({menu: {id: opt_data.id, content: dropdownList__soy79, extraClasses: 'aui-style-default sidebar-customize-section'}, trigger: {showIcon: false, content: '<span class="aui-icon aui-icon-small aui-iconfont-configure"></span>', container: '#app-switcher'}});
  return output;
};
if (goog.DEBUG) {
  navlinks.templates.appswitcher.cogDropdown.soyTemplateName = 'navlinks.templates.appswitcher.cogDropdown';
}


navlinks.templates.appswitcher.dropdownList = function(opt_data, opt_ignored) {
  var output = '<ul class="sidebar-admin-links">';
  var linkList87 = opt_data.list;
  var linkListLen87 = linkList87.length;
  for (var linkIndex87 = 0; linkIndex87 < linkListLen87; linkIndex87++) {
    var linkData87 = linkList87[linkIndex87];
    output += '<li class="nav-link"><a href="' + soy.$$escapeHtml(linkData87.href) + '" title="' + soy.$$escapeHtml(linkData87.title) + '"><span class="nav-link-label">' + soy.$$escapeHtml(linkData87.label) + '</span></a></li>';
  }
  output += '</ul>';
  return output;
};
if (goog.DEBUG) {
  navlinks.templates.appswitcher.dropdownList.soyTemplateName = 'navlinks.templates.appswitcher.dropdownList';
}


navlinks.templates.appswitcher.switcher = function(opt_data, opt_ignored) {
  var output = '';
  var loadingContent__soy98 = '' + navlinks.templates.appswitcher.loading(null);
  var triggerContent__soy100 = '' + navlinks.templates.appswitcher.trigger(null);
  output += aui.dropdown2.dropdown2({menu: {id: 'app-switcher', content: loadingContent__soy98, extraClasses: 'aui-style-default', extraAttributes: {'data-environment': {}, 'data-is-switcher': 'true'}}, trigger: {showIcon: false, content: triggerContent__soy100, extraClasses: 'app-switcher-trigger', extraAttributes: {href: '#app-switcher'}}});
  return output;
};
if (goog.DEBUG) {
  navlinks.templates.appswitcher.switcher.soyTemplateName = 'navlinks.templates.appswitcher.switcher';
}


navlinks.templates.appswitcher.suggestionApp = function(opt_data, opt_ignored) {
  var output = '';
  var href__soy106 = opt_data.isBillingSystemEnabled == true ? opt_data.suggestionApp.billingSystemDiscoveryUrl : opt_data.suggestionApp.discoveryUrl;
  output += '<li class="app-discovery-suggestion-app"><a id="' + soy.$$escapeHtml(opt_data.suggestionApp.appName) + '" href="' + soy.$$escapeHtml(href__soy106) + '" class="app-discovery-link aui-icon-container app-discovery-' + soy.$$escapeHtml(opt_data.suggestionApp.appName) + '-product-icon" title="' + soy.$$escapeHtml(href__soy106) + '" target="_blank"/><div class="app-discovery-small">' + soy.$$escapeHtml(opt_data.suggestionApp.appDesc) + '</div></li>';
  return output;
};
if (goog.DEBUG) {
  navlinks.templates.appswitcher.suggestionApp.soyTemplateName = 'navlinks.templates.appswitcher.suggestionApp';
}


navlinks.templates.appswitcher.suggestionApps = function(opt_data, opt_ignored) {
  return '<ul class=\'nav-links suggestion-apps\'><li><span class=\'app-discovery-suggest-title nav-link-label\'><h6>' + soy.$$escapeHtml('\u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0434\u0440\u0443\u0433\u0438\u0435 \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u044f Atlassian') + '</h6></span></li></ul><div class=\'buttons-container app-discovery-suggest-apps-buttons\'><div class=\'buttons\'><button class=\'aui-button aui-button-link app-discovery-cancel-button\' name=\'cancel\' accesskey=\'c\' href=\'#\'>' + soy.$$escapeHtml('\u041d\u0435 \u043f\u043e\u043a\u0430\u0437\u044b\u0432\u0430\u0442\u044c \u044d\u0442\u043e \u0441\u043d\u043e\u0432\u0430') + '</button></div></div>';
};
if (goog.DEBUG) {
  navlinks.templates.appswitcher.suggestionApps.soyTemplateName = 'navlinks.templates.appswitcher.suggestionApps';
}


navlinks.templates.appswitcher.applications = function(opt_data, opt_ignored) {
  return '' + navlinks.templates.appswitcher.applicationsSection({list: opt_data.apps, listClass: 'nav-links', showDescription: opt_data.showDescription}) + ((opt_data.custom) ? navlinks.templates.appswitcher.applicationsSection({list: opt_data.custom, showDescription: opt_data.showDescription}) : '') + ((opt_data.showAdminLink) ? navlinks.templates.appswitcher.adminSection(opt_data) : '');
};
if (goog.DEBUG) {
  navlinks.templates.appswitcher.applications.soyTemplateName = 'navlinks.templates.appswitcher.applications';
}


navlinks.templates.appswitcher.applicationsSection = function(opt_data, opt_ignored) {
  var output = '';
  if (opt_data.list.length > 0) {
    var param141 = '<ul' + ((opt_data.listClass) ? ' class="' + soy.$$escapeHtml(opt_data.listClass) + '"' : '') + '>';
    var linkList149 = opt_data.list;
    var linkListLen149 = linkList149.length;
    for (var linkIndex149 = 0; linkIndex149 < linkListLen149; linkIndex149++) {
      var linkData149 = linkList149[linkIndex149];
      param141 += navlinks.templates.appswitcher.applicationsSectionItem(soy.$$augmentMap(linkData149, {showDescription: opt_data.showDescription}));
    }
    param141 += '</ul>';
    output += aui.dropdown2.section({content: param141});
  }
  return output;
};
if (goog.DEBUG) {
  navlinks.templates.appswitcher.applicationsSection.soyTemplateName = 'navlinks.templates.appswitcher.applicationsSection';
}


navlinks.templates.appswitcher.applicationsSectionItem = function(opt_data, opt_ignored) {
  return '<li class="nav-link' + ((opt_data.self) ? ' nav-link-local' : '') + '"><a href="' + soy.$$escapeHtml(opt_data.link) + '" class="aui-dropdown2-radio ' + ((opt_data.self) ? 'aui-dropdown2-checked' : '') + '" title="' + soy.$$escapeHtml(opt_data.link) + '"><span class="nav-link-label">' + soy.$$escapeHtml(opt_data.label) + '</span>' + ((opt_data.showDescription && opt_data.description) ? '<span class="nav-link-description">' + soy.$$escapeHtml(opt_data.description) + '</span>' : '') + '</a></li>';
};
if (goog.DEBUG) {
  navlinks.templates.appswitcher.applicationsSectionItem.soyTemplateName = 'navlinks.templates.appswitcher.applicationsSectionItem';
}


navlinks.templates.appswitcher.adminSection = function(opt_data, opt_ignored) {
  return '' + aui.dropdown2.section({content: '<ul class="nav-links"><li><a class="nav-link-edit-wrapper" href="' + soy.$$escapeHtml(opt_data.adminLink) + '"><span class="nav-link-edit">' + soy.$$filterNoAutoescape('\u041d\u0430\u0441\u0442\u0440\u043e\u0438\u0442\u044c\x26hellip;') + '</span></a></li></ul>'});
};
if (goog.DEBUG) {
  navlinks.templates.appswitcher.adminSection.soyTemplateName = 'navlinks.templates.appswitcher.adminSection';
}
;
;
/* module-key = 'com.atlassian.plugins.atlassian-nav-links-plugin:rotp-menu', location = 'appswitcher/appswitcher.js' */
var APPSWITCHER_TRIGGER_CLICK="appswitcher.trigger.click";var APPSWITCHER_DROPDOWN_SHOW="appswitcher.dropdown.show";var APPSWITCHER_DROPDOWN_DISPLAY_ERROR="appswitcher.dropdown.display.error";var APPSWITCHER_APP_LINK_CLICK="appswitcher.app.link.click";var APPSWITCHER_CONFIGURE_LINK_CLICK="appswitcher.configure.link.click";(function(c,f){var b="isAppSuggestionAvailable";var d="isSiteAdminUser";var e="isUserAdmin";var a="#app-switcher";f.AppSwitcher=function(j){var l=AJS.contextPath()+"/plugins/servlet/customize-application-navigator";var k="unified.usermanagement";var m=this;this.$dropdown=null;j=c.extend({dropdownContents:null},j);this.getLinks=function(){return c.ajax({url:AJS.contextPath()+"/rest/menu/latest/appswitcher",cache:false,dataType:"json"}).done(this.updateDropdown).fail(this.showError)};this.getDropdown=function(){if(!this.$dropdown){this.$dropdown=c(j.dropdownContents);this.envData=this.$dropdown.data("environment")}return this.$dropdown};this.updateDropdown=function(n){this.getDropdown().html(navlinks.templates.appswitcher.applications({apps:n,showAdminLink:this.envData[e],adminLink:l}));this.bindAnalyticsHandlers();if(this.envData[b]===true){this.handleSuggestionApps(n)}}.bind(this);this.bindAnalyticsHandlers=function(){c(".app-switcher-trigger").on("click",function(){AJS.trigger("analyticsEvent",{name:APPSWITCHER_TRIGGER_CLICK})});c("#app-switcher").on("aui-dropdown2-show",function(){AJS.trigger("analyticsEvent",{name:APPSWITCHER_DROPDOWN_SHOW})});c("#app-switcher .nav-link").on("click",function(){var p="custom";var q=c(this).find("a");var o=q.attr("href");var n=window.location.hostname;if(o.indexOf(n+"/wiki")>-1){p="confluence"}else{if(o.indexOf(n+"/build")>-1){p="bamboo"}else{if(o.indexOf(n)>-1){p="jira"}}}AJS.trigger("analyticsEvent",{name:APPSWITCHER_APP_LINK_CLICK,data:{product:p}})});c(".nav-link-edit-wrapper").on("click",function(){AJS.trigger("analyticsEvent",{name:APPSWITCHER_CONFIGURE_LINK_CLICK})})};this.isBillingSystemEnabled=function(){return(this.envData[d]===true)&&AJS.DarkFeatures.isEnabled(k)};this.handleSuggestionApps=function(q){var r=_.map(q,function(s){return s.applicationType.toLowerCase()});var o=c("<div id='app-switcher-suggestion-apps' class='aui-dropdown2-section'/>");o.html(navlinks.templates.appswitcher.suggestionApps);var p=o.find(".suggestion-apps");var n=false;_.each(g,function(s){if(!_.contains(r,s.appName)){n=true;p.append(navlinks.templates.appswitcher.suggestionApp({suggestionApp:s,isBillingSystemEnabled:m.isBillingSystemEnabled()}))}});if(!n){return}c("#app-switcher").append(o);c(".app-discovery-suggestion-app").click(function(){var t=c(this).find("a");var s;if(m.envData[d]===true){s="appswitcher.discovery.siteadmin.select.inproduct."}else{s="appswitcher.discovery.user.select."}s=s+t.attr("id").toLowerCase();AJS.trigger("analytics",{name:s})});c(".app-discovery-suggestion-app").hover(function(){c(this).find("a").removeClass("active").removeClass("aui-dropdown2-active")});c(".app-discovery-cancel-button").click(function(){AJS.trigger("analytics",{name:"appswitcher.discovery.nothanks.button.click"});i(h,"true");o.remove()})};this.showError=function(){AJS.trigger("analyticsEvent",{name:APPSWITCHER_DROPDOWN_DISPLAY_ERROR});this.getDropdown().html(navlinks.templates.appswitcher.error()).off(".appswitcher").on("click.appswitcher",".app-switcher-retry",c.proxy(m.retryLoading,m))}.bind(this);this.retryLoading=function(n){this.getDropdown().html(navlinks.templates.appswitcher.loading());this.getLinks();n&&n.stopPropagation()};c(".app-switcher-trigger").on("click",function(){if(!this.$dropdown){this.getLinks()}}.bind(this))};var h="key-no-thanks";var g=[{appName:"jira",appDesc:"Issue & project tracking software",discoveryUrl:"https://www.atlassian.com/software/jira",billingSystemDiscoveryUrl:"/admin/billing/addapplication"},{appName:"confluence",appDesc:"\u0412\u0437\u0430\u0438\u043c\u043e\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u0438 \u043e\u0431\u043c\u0435\u043d \u0441\u043e\u0434\u0435\u0440\u0436\u0438\u043c\u044b\u043c",discoveryUrl:"https://www.atlassian.com/software/confluence",billingSystemDiscoveryUrl:"/admin/billing/addapplication?product=confluence.ondemand"}];var i=function(j,k){c.ajax({url:AJS.contextPath()+"/rest/menu/latest/userdata/",type:"PUT",contentType:"application/json",data:JSON.stringify({key:j,value:k})})};c(function(){if(c(a).data("is-switcher")===true){new f.AppSwitcher({dropdownContents:a})}})}(jQuery,window.NL=(window.NL||{})));;
;
/* module-key = 'com.atlassian.jira.jira-header-plugin:jira-header', location = 'soy/headerDropdown.soy' */
// This file was automatically generated from headerDropdown.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace JIRA.Templates.Menu.Dropdowns.
 */

if (typeof JIRA == 'undefined') { var JIRA = {}; }
if (typeof JIRA.Templates == 'undefined') { JIRA.Templates = {}; }
if (typeof JIRA.Templates.Menu == 'undefined') { JIRA.Templates.Menu = {}; }
if (typeof JIRA.Templates.Menu.Dropdowns == 'undefined') { JIRA.Templates.Menu.Dropdowns = {}; }


JIRA.Templates.Menu.Dropdowns.dropdown2Fragment = function(opt_data, opt_ignored) {
  var output = '';
  var sectionList3 = opt_data.sections;
  var sectionListLen3 = sectionList3.length;
  for (var sectionIndex3 = 0; sectionIndex3 < sectionListLen3; sectionIndex3++) {
    var sectionData3 = sectionList3[sectionIndex3];
    var hasItems__soy4 = sectionData3.items && sectionData3.items.length > 0;
    if (hasItems__soy4) {
      output += '<div class="aui-dropdown2-section">' + ((sectionData3.label) ? '<strong>' + soy.$$escapeHtml(sectionData3.label) + '</strong>' : '') + '<ul class=\'aui-list-truncate\'' + ((sectionData3.id) ? ' id="' + soy.$$escapeHtml(sectionData3.id) + '"' : '') + ((sectionData3.style) ? ' class="' + soy.$$escapeHtml(sectionData3.style) + '"' : '') + '>';
      var itemList25 = sectionData3.items;
      var itemListLen25 = itemList25.length;
      for (var itemIndex25 = 0; itemIndex25 < itemListLen25; itemIndex25++) {
        var itemData25 = itemList25[itemIndex25];
        output += JIRA.Templates.Menu.Dropdowns.dropdown2Item(itemData25);
      }
      output += '</ul></div>';
    }
  }
  return output;
};
if (goog.DEBUG) {
  JIRA.Templates.Menu.Dropdowns.dropdown2Fragment.soyTemplateName = 'JIRA.Templates.Menu.Dropdowns.dropdown2Fragment';
}


JIRA.Templates.Menu.Dropdowns.dropdown2Item = function(opt_data, opt_ignored) {
  var output = '<li' + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '') + ((opt_data.style) ? ' class="' + soy.$$escapeHtml(opt_data.style) + '"' : '') + '><a href="' + soy.$$escapeHtml(opt_data.url) + '"' + ((opt_data.id) ? ' id="' + soy.$$escapeHtml(opt_data.id) + '_lnk"' : '') + ((opt_data.title) ? ' title="' + soy.$$escapeHtml(opt_data.title) + '"' : '') + ' class="' + ((opt_data.iconUrl) ? 'aui-icon-container' : '') + ((opt_data.parameters && opt_data.parameters['class']) ? ' ' + soy.$$escapeHtml(opt_data.parameters['class']) : '') + '"';
  if (opt_data.parameters) {
    var keyList66 = soy.$$getMapKeys(opt_data.parameters);
    var keyListLen66 = keyList66.length;
    for (var keyIndex66 = 0; keyIndex66 < keyListLen66; keyIndex66++) {
      var keyData66 = keyList66[keyIndex66];
      output += (keyData66 != 'class') ? ' ' + soy.$$escapeHtml(keyData66) + '="' + soy.$$escapeHtml(opt_data.parameters[keyData66]) + '"' : '';
    }
  }
  output += '>' + ((opt_data.iconUrl) ? '<img class="icon" src="' + soy.$$escapeHtml(opt_data.iconUrl) + '" />' : '') + soy.$$escapeHtml(opt_data.label) + '</a></li>';
  return output;
};
if (goog.DEBUG) {
  JIRA.Templates.Menu.Dropdowns.dropdown2Item.soyTemplateName = 'JIRA.Templates.Menu.Dropdowns.dropdown2Item';
}
;
;
/* module-key = 'com.atlassian.jira.jira-header-plugin:jira-header', location = 'js/init-dropdown2.js' */
require(["jira/ajs/ajax/smart-ajax","jira/skate","jira/util/data/meta","wrm/context-path","jquery"],function(a,e,o,n,t){t(document).on("aui-responsive-menu-item-created",function(a){var e=a.originalEvent.detail.originalItem,o=a.originalEvent.detail.newItem,n=!!t(e).find(".aui-dropdown2-ajax").length;n&&t(o).find("a").addClass("aui-dropdown2-ajax")}),e("aui-dropdown2-ajax",{type:e.type.CLASSNAME,attached:function(e){var r=t(document.getElementById(e.getAttribute("aria-controls")));!r.length&&e.hasAttribute("aria-owns")&&"undefined"!=typeof console&&console.warn&&console.warn('Deprecation warning: Since AUI 5.9.4 "aria-owns" attribute has been change for "aria-controls"');var d=r.data("aui-dropdown2-ajax-key");r.on("aui-dropdown2-show.aui-dropdown2-ajax",function(e,t){r.trigger("aui-dropdown2-show-before"),d?(r.empty(),r.addClass("aui-dropdown2-loading"),a.makeRequest({url:n()+"/rest/api/1.0/menus/"+d,data:{inAdminMode:o.getBoolean("in-admin-mode")},dataType:"json",cache:!1,success:function(a){r.removeClass("aui-dropdown2-loading"),r.html(JIRA.Templates.Menu.Dropdowns.dropdown2Fragment(a)),r.trigger("aui-dropdown2-show-after")}})):r.trigger("aui-dropdown2-show-after")}),e.setAttribute("data-dropdown2-loaded",""),t(e).trigger("jira-header-plugin-dropdown2-menu-loaded",{bubbles:!0})},detached:function(a){var e=t(document.getElementById(a.getAttribute("aria-controls")));e.off("aui-dropdown2-show.aui-dropdown2-ajax")}})});;
;
/* module-key = 'com.atlassian.jira.jira-header-plugin:jira-header', location = 'js/app-switcher-analytics.js' */
require(["jquery"],function(i){i(document).on("aui-dropdown2-show-before","#app-switcher",function(){AJS.trigger("analyticsEvent",{name:"navigation.header.appswitcher.open"})}),i(document).on("click","#app-switcher a, #app-switcher button",function(n){var e,t=i(n.target),a=t.closest("li").index();t.is(".nav-link-edit")?e="configure":t.is(".app-discovery-link")?e=this.id?this.id:"unknown.app.discovery":t.is(".app-discovery-cancel-button")?(e="dont.show",a=0):e="application",AJS.trigger("analyticsEvent",{name:"navigation.header.appswitcher.click",data:{position:a,linkType:e}})}),i(document).on("aui-dropdown2-hide","#app-switcher",function(){AJS.trigger("analyticsEvent",{name:"navigation.header.appswitcher.close"})})});;
;
/* module-key = 'com.atlassian.jira.jira-header-plugin:analytics-header', location = 'js/header-analytics.js' */
require(["jira/util/logger","jquery"],function(n,e){function t(n,e){var t=void 0;return n.forEach(function(n){n.id===e&&(t=n.analyticEventKey)}),t}var i="jira.navigation.header.",o="jira.header.analytics.event",r=function(n,e){return n.some(function(n){return n.id===e})},a=function(e,r,a){var c=t(r,e),u=i+c+a;AJS.EventQueue.push({name:u}),n.trace(o)},c=e(document);c.on("click","#logo",function(){AJS.EventQueue.push({name:i+"home"}),n.trace(o)}),c.on("click","#create_link",function(){AJS.EventQueue.push({name:i+"createissue.click"})});var u=[{id:"home_link-content",analyticEventKey:"dashboards"},{id:"browse_link-content",analyticEventKey:"projects"},{id:"find_link-content",analyticEventKey:"issues"},{id:"greenhopper_menu-content",analyticEventKey:"boards"},{id:"plugins-jira-webitem-main-content",analyticEventKey:"portfolio"},{id:"system-help-menu-content",analyticEventKey:"help"},{id:"system-admin-menu-content",analyticEventKey:"admin"}],d="#system-help-menu-content, #user-options-content, #system-admin-menu-content, #app-switcher",s=u.map(function(n){return"#"+n.id}).join(", ");c.on("aui-dropdown2-show",s,function(){var n=e(this).attr("id");r(u,n)&&a(n,u,".open")}),c.on("aui-dropdown2-hide",s,function(){var n=e(this).attr("id");r(u,n)&&a(n,u,".close")}),c.on("aui-dropdown2-show",d,function(){var n=e(this);n.trigger("aui-dropdown2-show-before"),n.trigger("aui-dropdown2-show-after")});var l=u.reduce(function(n,e){return n+"a.aui-dropdown2-trigger[aria-controls="+e.id+"], "},"");c.on("click",l,function(){var n=this.getAttribute("aria-controls");r(u,n)&&a(n,u,".click")}),c.on("click",".aui-dropdown2 .aui-dropdown2-section a",function(r){var a=e(r.target).closest(s).first();if(null!==a){var c=a.find("a").index(r.target),d=a.attr("id"),l=t(u,d),p=e(this).parents("ul").attr("id"),m={name:i+l+".item.click",properties:{itemIndex:c}};p&&(m.properties.itemType=p),AJS.EventQueue.push(m),n.trace(o)}})});;