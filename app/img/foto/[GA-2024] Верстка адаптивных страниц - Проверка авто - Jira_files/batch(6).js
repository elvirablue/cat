;
/* module-key = 'com.atlassian.jira.jira-one-click-invite-plugin:one-click-invite', location = 'templates/sidebar/one-click-invite/one-click-invite.soy' */
// This file was automatically generated from one-click-invite.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace JIRA.Templates.OneClickInvite.
 */

if (typeof JIRA == 'undefined') { var JIRA = {}; }
if (typeof JIRA.Templates == 'undefined') { JIRA.Templates = {}; }
if (typeof JIRA.Templates.OneClickInvite == 'undefined') { JIRA.Templates.OneClickInvite = {}; }


JIRA.Templates.OneClickInvite.renderDialog = function(opt_data, opt_ignored) {
  return '<aui-inline-dialog id="one-click-invite-inline-dialog" alignment="left middle" persistent><h3 class="dialog-title">' + soy.$$escapeHtml('\u041f\u0440\u0438\u0433\u043b\u0430\u0441\u0438\u0442\u0435 \u0441\u0432\u043e\u044e \u043a\u043e\u043c\u0430\u043d\u0434\u0443') + '</h3><p>' + soy.$$filterNoAutoescape(AJS.format('\u0420\u0430\u0437\u043e\u0448\u043b\u0438\u0442\u0435 \u043f\u0440\u0438\u0433\u043b\u0430\u0448\u0435\u043d\u0438\u044f \u043b\u044e\u0434\u044f\u043c, \u043a\u043e\u0442\u043e\u0440\u044b\u0445 \u0432\u044b \u0445\u043e\u0442\u0438\u0442\u0435 \u043f\u0440\u0438\u0432\u043b\u0435\u0447\u044c \u043a \u0440\u0430\u0431\u043e\u0442\u0435 \u043d\u0430\u0434 \u0441\u0432\u043e\u0438\u043c\u0438 \u043f\u0440\u043e\u0435\u043a\u0442\u0430\u043c\u0438.','<br/>')) + '</p><form action="" method="post" class="aui top-label"><fieldset class="top-label"><div class="field-group"><input class="text one-click-invite-email" type="text" id="email-1" placeholder="' + soy.$$escapeHtml('\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0430\u0434\u0440\u0435\u0441 \u044d\u043b\u0435\u043a\u0442\u0440\u043e\u043d\u043d\u043e\u0439 \u043f\u043e\u0447\u0442\u044b') + '" name="email-1"/></div><div class="field-group"><input class="text one-click-invite-email" type="text" id="email-2" placeholder="' + soy.$$escapeHtml('\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0430\u0434\u0440\u0435\u0441 \u044d\u043b\u0435\u043a\u0442\u0440\u043e\u043d\u043d\u043e\u0439 \u043f\u043e\u0447\u0442\u044b') + '" name="email-2"/></div><div class="field-group"><input class="text one-click-invite-email" type="text" id="email-3" placeholder="' + soy.$$escapeHtml('\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0430\u0434\u0440\u0435\u0441 \u044d\u043b\u0435\u043a\u0442\u0440\u043e\u043d\u043d\u043e\u0439 \u043f\u043e\u0447\u0442\u044b') + '" name="email-3"/></div><div id="one-click-invite-people-collection-img"></div><div id="one-click-invite-error-message-container"></div><div class="buttons-container"><div class="buttons"><button id="one-click-invite-dialog-invite-btn" class="aui-button" type="button">' + soy.$$escapeHtml('\u041f\u0440\u0438\u0433\u043b\u0430\u0441\u0438\u0442\u044c') + '</button><button id="one-click-invite-dialog-cancel-btn" class="aui-button aui-button-link" type="button">' + soy.$$escapeHtml('\u041e\u0442\u043c\u0435\u043d\u0430') + '</button><span id="one-click-invite-spinner" class="button-spinner"></span></div></div></fieldset></form></aui-inline-dialog>';
};
if (goog.DEBUG) {
  JIRA.Templates.OneClickInvite.renderDialog.soyTemplateName = 'JIRA.Templates.OneClickInvite.renderDialog';
}


JIRA.Templates.OneClickInvite.renderErrorMessages = function(opt_data, opt_ignored) {
  return '' + aui.message.error({content: '' + soy.$$filterNoAutoescape(opt_data.errorMessageContent)});
};
if (goog.DEBUG) {
  JIRA.Templates.OneClickInvite.renderErrorMessages.soyTemplateName = 'JIRA.Templates.OneClickInvite.renderErrorMessages';
}
;
;
/* module-key = 'com.atlassian.jira.jira-one-click-invite-plugin:one-click-invite', location = 'js/sidebar/one-click-invite/one-click-invite-view.js' */
define("sidebar/oneclickinvite/one-click-invite-view",["backbone","jira/skate","user-management-common/create-user/request-invite","aui/flag","sidebar/oneclickinvite/one-click-invite-error-messages","one-click-invite/uri","underscore","aui/inline-dialog2"],function(e,i,t,n,s,r,a){return e.View.extend({initialize:function(e){this.parent=e.model.parent,this.sidebarLink=e.model.sidebarLink},setElement:function(t){if(t)return e.View.prototype.setElement.call(this,t),i.init(this.el),this},render:function(){var e=document.createElement("div");e.innerHTML=JIRA.Templates.OneClickInvite.renderDialog({}),this.dialog=e.firstChild,this.parent.appendChild(this.dialog),this.setElement(this.dialog),this.sidebarLink.setAttribute("aria-controls","one-click-invite-inline-dialog"),this.sidebarLink.setAttribute("data-aui-trigger",""),this.sidebarLink.addEventListener("click",function(e){e.stopPropagation(),e.preventDefault(),this.toggleDialog()}.bind(this)),AJS.$(window).on("keydown",function(e){e.which===AJS.$.ui.keyCode.ESCAPE&&this.hideDialog()}.bind(this))},events:{"click #one-click-invite-dialog-invite-btn":function(e){e.preventDefault(),AJS.trigger("analyticsEvent",{name:"invite.user.user.creation.sent",data:{invitationCount:this.getEmailAddresses().length}}),this.setInviteButtonLoading(!0);var i=this.showSuccessFlag.bind(this),n=this.displayErrors.bind(this);t.createUser(this.getEmailAddresses()).done(i).fail(n)},"click #one-click-invite-dialog-cancel-btn":function(e){AJS.trigger("analyticsEvent",{name:"invite.user.dialog.cancelled",data:{invitationCount:this.getEmailAddresses().length}}),this.hideDialog()},"keydown .one-click-invite-email":function(e){13!==e.keyCode&&13!==e.which||AJS.$("#one-click-invite-dialog-invite-btn").trigger("click")}},getEmailAddresses:function(){for(var e=[],i=document.getElementsByClassName("one-click-invite-email"),t=0;t<i.length;t++){var n=i[t].value;n&&e.push(n)}return e},toggleDialog:function(){this.dialog.open?this.hideDialog():(AJS.trigger("analyticsEvent",{name:"invite.user.dialog.opened"}),this.dialog.open=!0)},hideDialog:function(){this.dialog.open=!1,this.sidebarLink.blur(),AJS.$(".one-click-invite-email").val(""),document.getElementById("one-click-invite-error-message-container").innerHTML="",AJS.$(this.dialog).removeClass("has-error")},showSuccessFlag:function(e){AJS.trigger("analyticsEvent",{name:"invite.user.user.creation.success",data:{invitationCount:this.getEmailAddresses().length,createdUsersCount:e.createdUsers.length,existingUsersCount:e.existingActiveUsers.length+e.existingInactiveUsers.length}}),this.setInviteButtonLoading(!1),this.hideDialog(),n({type:"success",close:"auto",body:this.getSuccessMessage(e)})},getSuccessMessage:function(e){var i=e.createdUsers,t=a.map(e.existingActiveUsers.concat(e.existingInactiveUsers),function(e){return e.username});return this.getMessageBasedOnSuccessType(i,t)},getMessageBasedOnSuccessType:function(e,i){var t='<a href="'+r(AJS.contextPath()+"/admin/users").addSearch("n",e.concat(i).join(","))+'">';switch(e.length){case 0:if(1==i.length)return AJS.format("{0} \u0443\u0436\u0435 \u044f\u0432\u043b\u044f\u0435\u0442\u0441\u044f \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0435\u043c. \u0414\u043b\u044f \u043f\u0440\u043e\u0432\u0435\u0440\u043a\u0438 \u0438\u0445 \u043f\u043e\u043b\u043d\u043e\u043c\u043e\u0447\u0438\u0439 {1}\u043f\u0440\u043e\u0441\u043c\u043e\u0442\u0440\u0438\u0442\u0435 \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0435\u0439 \u0438 \u0440\u043e\u043b\u0438{2}.","<b>"+i[0]+"</b>",t,"</a>");if(2==i.length)return AJS.format("{0} \u0438 {1} \u0443\u0436\u0435 \u044f\u0432\u043b\u044f\u044e\u0442\u0441\u044f \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044f\u043c\u0438. \u0414\u043b\u044f \u043f\u0440\u043e\u0432\u0435\u0440\u043a\u0438 \u0438\u0445 \u043f\u043e\u043b\u043d\u043e\u043c\u043e\u0447\u0438\u0439 {2}\u043f\u0440\u043e\u0441\u043c\u043e\u0442\u0440\u0438\u0442\u0435 \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0435\u0439 \u0438 \u0440\u043e\u043b\u0438{3}.","<b>"+i[0]+"</b>","<b>"+i[1]+"</b>",t,"</a>");if(3==i.length)return AJS.format("{0}, {1} \u0438 {2} \u0443\u0436\u0435 \u044f\u0432\u043b\u044f\u044e\u0442\u0441\u044f \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044f\u043c\u0438. \u0414\u043b\u044f \u043f\u0440\u043e\u0432\u0435\u0440\u043a\u0438 \u0438\u0445 \u043f\u043e\u043b\u043d\u043e\u043c\u043e\u0447\u0438\u0439 {3}\u043f\u0440\u043e\u0441\u043c\u043e\u0442\u0440\u0438\u0442\u0435 \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0435\u0439 \u0438 \u0440\u043e\u043b\u0438{4}.","<b>"+i[0]+"</b>","<b>"+i[1]+"</b>","<b>"+i[2]+"</b>",t,"</a>");break;case 1:return 1==i.length?AJS.format("{0} \u0443\u0441\u043f\u0435\u0448\u043d\u043e \u043f\u0440\u0438\u0433\u043b\u0430\u0448\u0435\u043d. {1} \u0443\u0436\u0435 \u044f\u0432\u043b\u044f\u0435\u0442\u0441\u044f \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0435\u043c. \u0414\u043b\u044f \u043f\u0440\u043e\u0432\u0435\u0440\u043a\u0438 \u0438\u0445 \u043f\u043e\u043b\u043d\u043e\u043c\u043e\u0447\u0438\u0439 {2}\u043f\u0440\u043e\u0441\u043c\u043e\u0442\u0440\u0438\u0442\u0435 \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0435\u0439 \u0438 \u0440\u043e\u043b\u0438{3}.","<b>"+e[0]+"</b>","<b>"+i[0]+"</b>",t,"</a>"):2==i.length?AJS.format("{0} \u0443\u0441\u043f\u0435\u0448\u043d\u043e \u043f\u0440\u0438\u0433\u043b\u0430\u0448\u0435\u043d. {1} \u0438 {2} \u0443\u0436\u0435 \u044f\u0432\u043b\u044f\u044e\u0442\u0441\u044f \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044f\u043c\u0438. \u0414\u043b\u044f \u043f\u0440\u043e\u0432\u0435\u0440\u043a\u0438 \u0438\u0445 \u043f\u043e\u043b\u043d\u043e\u043c\u043e\u0447\u0438\u0439 {3}\u043f\u0440\u043e\u0441\u043c\u043e\u0442\u0440\u0438\u0442\u0435 \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0435\u0439 \u0438 \u0440\u043e\u043b\u0438{4}.","<b>"+e[0]+"</b>","<b>"+i[0]+"</b>","<b>"+i[1]+"</b>",t,"</a>"):AJS.format("{0} \u0443\u0441\u043f\u0435\u0448\u043d\u043e \u043f\u0440\u0438\u0433\u043b\u0430\u0448\u0435\u043d. \u0414\u043b\u044f \u043f\u0440\u043e\u0432\u0435\u0440\u043a\u0438 \u0438\u0445 \u043f\u043e\u043b\u043d\u043e\u043c\u043e\u0447\u0438\u0439 {1}\u043f\u0440\u043e\u0441\u043c\u043e\u0442\u0440\u0438\u0442\u0435 \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0435\u0439 \u0438 \u0440\u043e\u043b\u0438{2}.","<b>"+e[0]+"</b>",t,"</a>");case 2:return 1==i.length?AJS.format("{0} \u0438 {1} \u0443\u0441\u043f\u0435\u0448\u043d\u043e \u043f\u0440\u0438\u0433\u043b\u0430\u0448\u0435\u043d\u044b. {2} \u0443\u0436\u0435 \u044f\u0432\u043b\u044f\u0435\u0442\u0441\u044f \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0435\u043c. \u0414\u043b\u044f \u043f\u0440\u043e\u0432\u0435\u0440\u043a\u0438 \u0438\u0445 \u043f\u043e\u043b\u043d\u043e\u043c\u043e\u0447\u0438\u0439 {3}\u043f\u0440\u043e\u0441\u043c\u043e\u0442\u0440\u0438\u0442\u0435 \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0435\u0439 \u0438 \u0440\u043e\u043b\u0438{4}.","<b>"+e[0]+"</b>","<b>"+e[1]+"</b>","<b>"+i[0]+"</b>",t,"</a>"):AJS.format("{0} \u0438 {1} \u0443\u0441\u043f\u0435\u0448\u043d\u043e \u043f\u0440\u0438\u0433\u043b\u0430\u0448\u0435\u043d\u044b. \u0414\u043b\u044f \u043f\u0440\u043e\u0432\u0435\u0440\u043a\u0438 \u0438\u0445 \u043f\u043e\u043b\u043d\u043e\u043c\u043e\u0447\u0438\u0439 {2}\u043f\u0440\u043e\u0441\u043c\u043e\u0442\u0440\u0438\u0442\u0435 \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0435\u0439 \u0438 \u0440\u043e\u043b\u0438{3}.","<b>"+e[0]+"</b>","<b>"+e[1]+"</b>",t,"</a>");case 3:return AJS.format("{0}, {1} \u0438 {2} \u0443\u0441\u043f\u0435\u0448\u043d\u043e \u043f\u0440\u0438\u0433\u043b\u0430\u0448\u0435\u043d\u044b. \u0414\u043b\u044f \u043f\u0440\u043e\u0432\u0435\u0440\u043a\u0438 \u0438\u0445 \u043f\u043e\u043b\u043d\u043e\u043c\u043e\u0447\u0438\u0439 {3}\u043f\u0440\u043e\u0441\u043c\u043e\u0442\u0440\u0438\u0442\u0435 \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0435\u0439 \u0438 \u0440\u043e\u043b\u0438{4}.","<b>"+e[0]+"</b>","<b>"+e[1]+"</b>","<b>"+e[2]+"</b>",t,"</a>")}},displayErrors:function(e){var i=this.getErrorFromResponse(e);this.doAnalyticEventFor(i.statusCode),this.setInviteButtonLoading(!1),AJS.$(this.dialog).addClass("has-error"),document.getElementById("one-click-invite-error-message-container").innerHTML=JIRA.Templates.OneClickInvite.renderErrorMessages({errorMessageContent:this.getErrorMessage(i)})},getErrorMessage:function(e){var i=e.statusCode;if("INVALID_EMAILS"===i){var t=s.INVALID_EMAILS;return 1==e.invalidEmailAddresses.length?t.SINGLE:t.MULTIPLE}return s[i]?s[i]:s.GENERIC_ERROR},getErrorFromResponse:function(e){return 401===e.status?{statusCode:"SESSION_ERROR"}:e.responseText?JSON.parse(e.responseText):{statusCode:"NETWORK_ERROR"}},setInviteButtonLoading:function(e){var i=document.getElementById("one-click-invite-dialog-invite-btn"),t=AJS.$("#one-click-invite-spinner");e?(i.disabled=!0,t.spin()):(i.disabled=!1,t.spinStop())},doAnalyticEventFor:function(e){AJS.trigger("analyticsEvent",{name:"invite.user.user.creation.error.generic",data:{invitationCount:this.getEmailAddresses().length}});var i=e.replace("_",".").toLowerCase();i&&AJS.trigger("analyticsEvent",{name:"invite.user.user.creation.error."+i,data:{invitationCount:this.getEmailAddresses().length}})}})});;
;
/* module-key = 'com.atlassian.jira.jira-one-click-invite-plugin:one-click-invite', location = 'js/sidebar/one-click-invite/one-click-invite.js' */
require(["sidebar/oneclickinvite/one-click-invite-view","jira/skate"],function(e,i){i("one-click-invite-link",{type:i.type.CLASSNAME,created:function(i){var n=new e({model:{parent:document.getElementsByTagName("body")[0],sidebarLink:i}});n.render()}})});;
;
/* module-key = 'com.atlassian.jira.jira-one-click-invite-plugin:one-click-invite', location = 'js/sidebar/one-click-invite/uri.js' */
define("one-click-invite/uri",["atlassian/libs/uri-1.14.1"],function(i){return i});;
;
/* module-key = 'com.atlassian.jira.jira-one-click-invite-plugin:one-click-invite', location = 'js/sidebar/one-click-invite/one-click-invite-error-messages.js' */
define("sidebar/oneclickinvite/one-click-invite-error-messages",[],function(){return OneClickInviteErrorMessages={GENERIC_ERROR:"\u0427\u0442\u043e-\u0442\u043e \u043d\u0435 \u0440\u0430\u0431\u043e\u0442\u0430\u0435\u0442. \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u043f\u0440\u0438\u0433\u043b\u0430\u0441\u0438\u0442\u044c \u043b\u044e\u0434\u0435\u0439 \u043f\u043e\u0437\u0436\u0435.",NETWORK_ERROR:"\u0421\u0435\u0442\u044c \u043d\u0435\u0434\u043e\u0441\u0442\u0443\u043f\u043d\u0430. \u041f\u0440\u043e\u0432\u0435\u0440\u044c\u0442\u0435 \u0441\u043e\u0435\u0434\u0438\u043d\u0435\u043d\u0438\u0435 \u0438 \u043f\u043e\u0432\u0442\u043e\u0440\u0438\u0442\u0435 \u043f\u043e\u043f\u044b\u0442\u043a\u0443.",UNKNOWN_ERROR:"\u041d\u0435 \u0443\u0434\u0430\u0435\u0442\u0441\u044f \u043f\u043e\u0434\u043a\u043b\u044e\u0447\u0438\u0442\u044c\u0441\u044f \u043a \u0441\u0435\u0440\u0432\u0435\u0440\u0443 \u0432 \u043d\u0430\u0441\u0442\u043e\u044f\u0449\u0438\u0439 \u043c\u043e\u043c\u0435\u043d\u0442. \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u043f\u0440\u0438\u0433\u043b\u0430\u0441\u0438\u0442\u044c \u043b\u044e\u0434\u0435\u0439 \u043f\u043e\u0437\u0436\u0435.",NO_EMAIL:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0430\u0434\u0440\u0435\u0441 \u044d\u043b\u0435\u043a\u0442\u0440\u043e\u043d\u043d\u043e\u0439 \u043f\u043e\u0447\u0442\u044b \u043b\u0438\u0446\u0430.",SESSION_ERROR:"\u041f\u0440\u043e\u0448\u043b\u043e \u0441\u043b\u0438\u0448\u043a\u043e\u043c \u043c\u043d\u043e\u0433\u043e \u0432\u0440\u0435\u043c\u0435\u043d\u0438, \u0438 \u0434\u043b\u044f \u0432\u0430\u0448\u0435\u0439 \u0443\u0447\u0435\u0442\u043d\u043e\u0439 \u0437\u0430\u043f\u0438\u0441\u0438 \u0431\u044b\u043b \u0432\u044b\u043f\u043e\u043b\u043d\u0435\u043d \u0432\u044b\u0445\u043e\u0434. \u041d\u0430\u0436\u043c\u0438\u0442\u0435 \u00ab\u041e\u0431\u043d\u043e\u0432\u0438\u0442\u044c\u00bb, \u0447\u0442\u043e\u0431\u044b \u0441\u043d\u043e\u0432\u0430 \u0432\u043e\u0439\u0442\u0438.",INVALID_EMAILS:{SINGLE:"\u0421 \u0430\u0434\u0440\u0435\u0441\u043e\u043c \u044d\u043b\u0435\u043a\u0442\u0440\u043e\u043d\u043d\u043e\u0439 \u043f\u043e\u0447\u0442\u044b \u0447\u0442\u043e-\u0442\u043e \u043d\u0435 \u0442\u0430\u043a. \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0432\u0432\u0435\u0441\u0442\u0438 \u0435\u0433\u043e \u0435\u0449\u0435 \u0440\u0430\u0437.",MULTIPLE:"\u0427\u0442\u043e-\u0442\u043e \u043d\u0435 \u0442\u0430\u043a \u0441 \u0430\u0434\u0440\u0435\u0441\u0430\u043c\u0438 \u044d\u043b\u0435\u043a\u0442\u0440\u043e\u043d\u043d\u043e\u0439 \u043f\u043e\u0447\u0442\u044b. \u041f\u0440\u043e\u0432\u0435\u0440\u044c\u0442\u0435 \u0438\u0445 \u0438 \u043f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0435 \u0440\u0430\u0437."},LICENSE_EXCEEDED:AJS.format("\u041f\u043e\u0445\u043e\u0436\u0435, \u0447\u0442\u043e \u0443 \u0432\u0430\u0441 \u043d\u0435\u0434\u043e\u0441\u0442\u0430\u0442\u043e\u0447\u043d\u043e \u043b\u0438\u0446\u0435\u043d\u0437\u0438\u0439, \u0447\u0442\u043e\u0431\u044b \u043f\u0440\u0438\u0433\u043b\u0430\u0441\u0438\u0442\u044c \u0432\u0441\u0435\u0445 \u043f\u0435\u0440\u0435\u0447\u0438\u0441\u043b\u0435\u043d\u043d\u044b\u0445 \u043b\u044e\u0434\u0435\u0439. \u0412\u044b \u043c\u043e\u0436\u0435\u0442\u0435 \u043f\u0440\u0438\u043e\u0431\u0440\u0435\u0441\u0442\u0438 \u0434\u043e\u043f\u043e\u043b\u043d\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0435 \u043b\u0438\u0446\u0435\u043d\u0437\u0438\u0438 \u043d\u0430 {0}\u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0435 \u043e\u0431\u043d\u043e\u0432\u043b\u0435\u043d\u0438\u044f \u043f\u0440\u043e\u0434\u0443\u043a\u0442\u0430{1}.",'<a href="'+AJS.contextPath()+'/admin/billing/overview">',"</a>")}});;