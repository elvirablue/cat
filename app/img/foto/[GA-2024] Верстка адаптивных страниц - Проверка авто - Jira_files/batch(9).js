;
/* module-key = 'com.atlassian.auiplugin:internal-@atlassian-aui-src-js-aui-expander', location = 'node_modules/@atlassian/aui/src/js/aui/expander.js' */
("undefined"===typeof window?global:window).__1f32101163c43c11907101e4c1c0413f=function(){"use strict";var c=__307d3e18fd611f85395c67cddeb1fe24,d=c&&c.__esModule?c:{"default":c},e=(0,d.default)(document),f=function(a){var b={};b.$trigger=(0,d.default)(a.currentTarget);b.$content=e.find("#"+b.$trigger.attr("aria-controls"));b.triggerIsParent=0!==b.$content.parent().filter(b.$trigger).length;b.$shortContent=b.triggerIsParent?b.$trigger.find(".aui-expander-short-content"):null;b.height=b.$content.css("min-height");
b.isCollapsible=!1!==b.$trigger.data("collapsible");b.replaceText=b.$trigger.attr("data-replace-text");b.replaceSelector=b.$trigger.data("replace-selector");return b},g=function(a){if(a.replaceText){var b=a.replaceSelector?a.$trigger.find(a.replaceSelector):a.$trigger;a.$trigger.attr("data-replace-text",b.text());b.text(a.replaceText)}};e.on({"aui-expander-invoke":function(a){var a=(0,d.default)(a.currentTarget),b=e.find("#"+a.attr("aria-controls")),c=!1!==a.data("collapsible");"true"===b.attr("aria-expanded")&&
c?a.trigger("aui-expander-collapse"):a.trigger("aui-expander-expand")},"aui-expander-expand":function(a){a=f(a);"true"!==a.$content.attr("aria-expanded")&&(a.$content.attr("aria-expanded","true"),a.$trigger.attr("aria-expanded","true"),0<a.$content.outerHeight()&&a.$content.attr("aria-hidden","false"),g(a),a.triggerIsParent&&a.$shortContent.hide(),a.$trigger.trigger("aui-expander-expanded"))},"aui-expander-collapse":function(a){a=f(a);"true"===a.$content.attr("aria-expanded")&&(g(a),a.$content.attr("aria-expanded",
"false"),a.$trigger.attr("aria-expanded","false"),a.triggerIsParent&&a.$shortContent.show(),0===a.$content.outerHeight()&&a.$content.attr("aria-hidden","true"),a.$trigger.trigger("aui-expander-collapsed"))},"click.aui-expander":function(a){(0,d.default)(a.currentTarget).trigger("aui-expander-invoke",a.currentTarget)}},".aui-expander-trigger");return{}}.call(this);;
;
/* module-key = 'com.atlassian.jira.plugins.jira-transition-triggers-plugin:dev-status-common-resources', location = 'js/workflow/TriggersPluginBackboneDefine.js' */
Backbone&&!Backbone.define&&(Backbone.define=function(name,ctor){eval("Backbone['Class: "+name+"'] = function() { Backbone['Class: "+name+"'].__ctor.apply(this, arguments); }");var cls=Backbone["Class: "+name];cls.__ctor=ctor,ctor.prototype.name=name,cls.prototype=ctor.prototype,_.extend(cls,ctor),_.each(ctor.prototype,function(t,e){"function"==typeof t&&(t.displayName=name+"."+e)});var context=window,parts=name.split(".");return _.each(parts,function(t,e){e===parts.length-1?context[t]=cls:context=null==context[t]?context[t]={}:context[t]}),cls});;
;
/* module-key = 'com.atlassian.jira.plugins.jira-transition-triggers-plugin:dev-status-common-resources', location = 'js/devstatus/FeedbackDialog.js' */
Backbone.define("JIRA.DevStatus.FeedbackDialog",Backbone.Model.extend({properties:["collectorId","summary"],defaults:{summary:"\u0420\u0430\u0441\u0441\u043a\u0430\u0436\u0438\u0442\u0435 \u043d\u0430\u043c, \u0447\u0442\u043e \u0432\u044b \u0434\u0443\u043c\u0430\u0435\u0442\u0435.",collectorId:"effe8b72"},show:function(){var e=this.get("collectorId");window.ATL_JQ_PAGE_PROPS=window.ATL_JQ_PAGE_PROPS||{},window.ATL_JQ_PAGE_PROPS[e]={fieldValues:{summary:this.get("summary")},triggerFunction:function(e){_.defer(function(){e()})}},AJS.$.getScript(this._collectorUrlFor(e))},_collectorUrlFor:function(e){return"https://jira.atlassian.com/s/d41d8cd98f00b204e9800998ecf8427e/en_UK-7m3tmj-1988229788/6307/131/1.4.8/_/download/batch/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector.js?collectorId="+e}}));;
;
/* module-key = 'com.atlassian.jira.plugins.jira-development-integration-plugin:devstatus-dialog-frame-resources', location = 'templates/common/devstatus-detail-dialog-frame.soy' */
// This file was automatically generated from devstatus-detail-dialog-frame.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace JIRA.Templates.DevStatus.DetailDialogFrame.
 */

if (typeof JIRA == 'undefined') { var JIRA = {}; }
if (typeof JIRA.Templates == 'undefined') { JIRA.Templates = {}; }
if (typeof JIRA.Templates.DevStatus == 'undefined') { JIRA.Templates.DevStatus = {}; }
if (typeof JIRA.Templates.DevStatus.DetailDialogFrame == 'undefined') { JIRA.Templates.DevStatus.DetailDialogFrame = {}; }


JIRA.Templates.DevStatus.DetailDialogFrame.frame = function(opt_data, opt_ignored) {
  return '<div class="jira-dialog-heading devstatus-dialog-heading ' + ((opt_data.tabs.length > 1) ? 'borderless' : '') + '"><h2>' + soy.$$escapeHtml(opt_data.title) + '</h2></div><div class="jira-dialog-content devstatus-dialog-content">' + JIRA.Templates.DevStatus.DetailDialogFrame.applicationTabs(opt_data) + '</div>';
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.DetailDialogFrame.frame.soyTemplateName = 'JIRA.Templates.DevStatus.DetailDialogFrame.frame';
}


JIRA.Templates.DevStatus.DetailDialogFrame.applicationTabs = function(opt_data, opt_ignored) {
  var output = '<div class="aui-tabs horizontal-tabs"><ul class="tabs-menu ' + ((opt_data.tabs.length == 1) ? 'hidden' : '') + '" >';
  var tabList18 = opt_data.tabs;
  var tabListLen18 = tabList18.length;
  for (var tabIndex18 = 0; tabIndex18 < tabListLen18; tabIndex18++) {
    var tabData18 = tabList18[tabIndex18];
    output += '<li id="tab-menu-' + soy.$$escapeHtml(tabData18.type) + '" data-application-type="' + soy.$$escapeHtml(tabData18.type) + '" class="menu-item ' + ((! opt_data.initialTab && tabIndex18 == 0 || tabData18.type == opt_data.initialTab) ? ' active-tab' : '') + '"><a  href="#tab-content-' + soy.$$escapeHtml(tabData18.type) + '"><strong>' + soy.$$escapeHtml(tabData18.name) + '</strong><span class="aui-badge devstatus-tab-count">' + soy.$$escapeHtml(tabData18.count) + '</span></a></li>';
  }
  output += '</ul><div class="form-body">';
  var tabList36 = opt_data.tabs;
  var tabListLen36 = tabList36.length;
  for (var tabIndex36 = 0; tabIndex36 < tabListLen36; tabIndex36++) {
    var tabData36 = tabList36[tabIndex36];
    output += '<div class="tabs-pane ' + ((tabIndex36 == 0) ? 'active-pane' : '') + '" id="tab-content-' + soy.$$escapeHtml(tabData36.type) + '"><div class="status-loading"></div><div class="detail-content-container"></div></div>';
  }
  output += '</div></div>';
  return output;
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.DetailDialogFrame.applicationTabs.soyTemplateName = 'JIRA.Templates.DevStatus.DetailDialogFrame.applicationTabs';
}
;
;
/* module-key = 'com.atlassian.jira.plugins.jira-development-integration-plugin:devstatus-dialog-all-resources', location = 'templates/viewissue/devstatus-detail-dialog.soy' */
// This file was automatically generated from devstatus-detail-dialog.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace JIRA.Templates.DevStatus.DetailDialog.
 */

if (typeof JIRA == 'undefined') { var JIRA = {}; }
if (typeof JIRA.Templates == 'undefined') { JIRA.Templates = {}; }
if (typeof JIRA.Templates.DevStatus == 'undefined') { JIRA.Templates.DevStatus = {}; }
if (typeof JIRA.Templates.DevStatus.DetailDialog == 'undefined') { JIRA.Templates.DevStatus.DetailDialog = {}; }


JIRA.Templates.DevStatus.DetailDialog.repositoryHeader = function(opt_data, opt_ignored) {
  return '<div class="repository-header' + ((opt_data.extraClasses) ? ' ' + soy.$$escapeHtml(opt_data.extraClasses) : '') + '"><div class="aui-group aui-group-split repository-header-group"><div class="aui-item project-space">' + JIRA.Templates.DevStatus.DetailDialog.projectInfo(opt_data) + '</div>' + ((opt_data.extraContent) ? '<div class="aui-item action-space">' + soy.$$filterNoAutoescape(opt_data.extraContent) + '</div>' : '') + '</div></div>';
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.DetailDialog.repositoryHeader.soyTemplateName = 'JIRA.Templates.DevStatus.DetailDialog.repositoryHeader';
}


JIRA.Templates.DevStatus.DetailDialog.projectInfo = function(opt_data, opt_ignored) {
  return '<div class="project-avatar" ' + ((opt_data.repository.avatarDescription) ? 'title="' + soy.$$escapeHtml(opt_data.repository.avatarDescription) + '"' : '') + '><span class="aui-avatar aui-avatar-small aui-avatar-project ' + ((opt_data.repository.avatar) ? 'fusion-avatar-project' : 'default-avatar-project') + '">' + ((opt_data.repository.avatar) ? '<span class="aui-avatar-inner"><img src="' + soy.$$escapeHtml(opt_data.repository.avatar) + '" /></span>' : '<span class="aui-avatar-inner aui-icon aui-icon-small aui-iconfont-devtools-repository"></span>') + '</span></div><div class="project-info">' + ((opt_data.repository.url) ? '<a class="repository-link" href="' + soy.$$escapeHtml(opt_data.repository.url) + '"' + ((opt_data.showTooltip) ? ' title="' + soy.$$escapeHtml(opt_data.repository.name) + '"' : '') + '>' + soy.$$escapeHtml(opt_data.repository.name) + '</a>' : '<span class="repository-link" ' + ((opt_data.showTooltip) ? ' title="' + soy.$$escapeHtml(opt_data.repository.name) + '"' : '') + '>' + soy.$$escapeHtml(opt_data.repository.name) + '</span>') + '</div><div class="extra-project-info">' + ((opt_data.showParent && opt_data.repository.parent && opt_data.repository.parent.name && opt_data.repository.parent.url) ? '<a class="fork-off" href="' + soy.$$escapeHtml(opt_data.repository.parent.url) + '"><span class="fork-name" title="' + soy.$$escapeHtml(AJS.format('\u0424\u043e\u0440\u043a {0}',opt_data.repository.parent.name)) + '">' + soy.$$escapeHtml(AJS.format('\u0424\u043e\u0440\u043a {0}',opt_data.repository.parent.name)) + '</span></a>' : '') + ((opt_data.extraProjectInfo) ? soy.$$filterNoAutoescape(opt_data.extraProjectInfo) : '') + '</div>';
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.DetailDialog.projectInfo.soyTemplateName = 'JIRA.Templates.DevStatus.DetailDialog.projectInfo';
}


JIRA.Templates.DevStatus.DetailDialog.oauthStatus = function(opt_data, opt_ignored) {
  return '<span class="aui-icon aui-icon-small aui-iconfont-info" /> ' + soy.$$escapeHtml(opt_data.message) + ' ';
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.DetailDialog.oauthStatus.soyTemplateName = 'JIRA.Templates.DevStatus.DetailDialog.oauthStatus';
}


JIRA.Templates.DevStatus.DetailDialog.authenticationScreen = function(opt_data, opt_ignored) {
  return '<div class="authentication-problem"><div class="image"></div><h2>' + soy.$$escapeHtml(opt_data.title) + '</h2>' + ((opt_data.userError) ? '<p class="user-error">' + soy.$$escapeHtml(opt_data.userError) + '</p>' : '') + ((opt_data.unauthInstances.length > 0) ? '<p>' + soy.$$escapeHtml(AJS.format('\u0412\u043e\u0439\u0434\u0438\u0442\u0435 \u0432 \u0441\u0438\u0441\u0442\u0435\u043c\u0443, \u0447\u0442\u043e\u0431\u044b \u0443\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044c {0,choice,1#\u0434\u0430\u043d\u043d\u043e\u0435 \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u0435|1\x3c\u0434\u0430\u043d\u043d\u044b\u0445 \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u0439}:',opt_data.unauthInstances.length)) + ' <span class="instances"></span></p>' : '') + ((opt_data.otherInstances.length > 0) ? JIRA.Templates.DevStatus.connectionProblemAsWarning({instances: opt_data.otherInstances, showContactAdminForm: opt_data.showContactAdminForm}) : '') + '</div>';
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.DetailDialog.authenticationScreen.soyTemplateName = 'JIRA.Templates.DevStatus.DetailDialog.authenticationScreen';
}


JIRA.Templates.DevStatus.DetailDialog.connectionProblemScreen = function(opt_data, opt_ignored) {
  return '<div class="connection-problem"><div class="image"></div><h2>' + soy.$$escapeHtml(opt_data.title) + '</h2>' + JIRA.Templates.DevStatus.connectionProblem(opt_data) + '</div>';
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.DetailDialog.connectionProblemScreen.soyTemplateName = 'JIRA.Templates.DevStatus.DetailDialog.connectionProblemScreen';
}


JIRA.Templates.DevStatus.DetailDialog.noPermissionToViewAll = function(opt_data, opt_ignored) {
  return '<div class="no-permission-to-view-all"><div class="lock-image"></div><span>' + soy.$$escapeHtml(opt_data.message) + '</span>' + ((opt_data.secondaryMessage) ? ' <span>' + soy.$$escapeHtml(opt_data.secondaryMessage) + '</span>' : '') + '</div>';
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.DetailDialog.noPermissionToViewAll.soyTemplateName = 'JIRA.Templates.DevStatus.DetailDialog.noPermissionToViewAll';
}


JIRA.Templates.DevStatus.DetailDialog.timestamp = function(opt_data, opt_ignored) {
  return '' + ((opt_data.timestamp) ? '<time class="livestamp date user-tz" datetime="' + soy.$$escapeHtml(opt_data.timestamp) + '" data-datetime-format="longAge">' + soy.$$escapeHtml(opt_data.timestamp) + '</time>' : '');
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.DetailDialog.timestamp.soyTemplateName = 'JIRA.Templates.DevStatus.DetailDialog.timestamp';
}


JIRA.Templates.DevStatus.DetailDialog.vcsUser = function(opt_data, opt_ignored) {
  return '<span><div class="vcs-user"><span class="extra-content-in-title ' + ((opt_data.approved) ? 'fade' : '') + '" title="' + soy.$$escapeHtml(opt_data.name) + '"><img class="author-avatar" src="' + soy.$$escapeHtml(opt_data.avatar) + '"/></span>' + ((opt_data.approved) ? '<span class="approved">\u2713</span>' : '') + '</div></span>';
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.DetailDialog.vcsUser.soyTemplateName = 'JIRA.Templates.DevStatus.DetailDialog.vcsUser';
}
;
;
/* module-key = 'com.atlassian.jira.plugins.jira-development-integration-plugin:devstatus-dialog-all-resources', location = 'templates/viewissue/build/devstatus-detail-dialog-build.soy' */
// This file was automatically generated from devstatus-detail-dialog-build.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace JIRA.Templates.DevStatus.DetailDialog.
 */

if (typeof JIRA == 'undefined') { var JIRA = {}; }
if (typeof JIRA.Templates == 'undefined') { JIRA.Templates = {}; }
if (typeof JIRA.Templates.DevStatus == 'undefined') { JIRA.Templates.DevStatus = {}; }
if (typeof JIRA.Templates.DevStatus.DetailDialog == 'undefined') { JIRA.Templates.DevStatus.DetailDialog = {}; }


JIRA.Templates.DevStatus.DetailDialog.build = function(opt_data, opt_ignored) {
  var output = '';
  var projectList3 = opt_data.projects;
  var projectListLen3 = projectList3.length;
  for (var projectIndex3 = 0; projectIndex3 < projectListLen3; projectIndex3++) {
    var projectData3 = projectList3[projectIndex3];
    output += JIRA.Templates.DevStatus.DetailDialog.projectContent({project: projectData3, projectIndex: projectIndex3, withArtifactColumn: opt_data.hasArtifacts, applicationType: opt_data.applicationType});
  }
  return output;
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.DetailDialog.build.soyTemplateName = 'JIRA.Templates.DevStatus.DetailDialog.build';
}


JIRA.Templates.DevStatus.DetailDialog.projectContent = function(opt_data, opt_ignored) {
  var output = '<div class="detail-builds-container">' + JIRA.Templates.DevStatus.DetailDialog.projectHeader(opt_data) + '<div class="devstatus-detail-table builds-table' + ((opt_data.withArtifactColumn) ? ' builds-table-with-artifact-column' : '') + '"><table class="aui"><thead><tr><th class="plan">' + soy.$$escapeHtml('\u041f\u043b\u0430\u043d') + '</th><th class="build cell-type-collapsed">' + soy.$$escapeHtml('\u041f\u043e\u0441\u043b\u0435\u0434\u043d\u044f\u044f \u0441\u0431\u043e\u0440\u043a\u0430') + '</th><th class="result cell-type-collapsed">' + soy.$$escapeHtml('\u0420\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442') + '</th><th class="timestamp cell-type-collapsed">' + soy.$$escapeHtml('\u0417\u0430\u0432\u0435\u0440\u0448\u0435\u043d\u043e') + '</th>' + ((opt_data.withArtifactColumn) ? '<th class="actions cell-type-collapsed"></th>' : '') + '</tr></thead><tbody>';
  var planList30 = opt_data.project.plans;
  var planListLen30 = planList30.length;
  for (var planIndex30 = 0; planIndex30 < planListLen30; planIndex30++) {
    var planData30 = planList30[planIndex30];
    var planHasArtifacts__soy31 = planData30.build.artifacts && planData30.build.artifacts.length;
    var uniqueIdSuffix__soy32 = opt_data.projectIndex + '-' + planIndex30;
    output += '<tr class="plan-row' + ((planHasArtifacts__soy31) ? ' merge' : '') + '"><td class="plan">' + JIRA.Templates.DevStatus.DetailDialog.planName({plan: planData30}) + '</td><td class="build">' + JIRA.Templates.DevStatus.DetailDialog.buildIcon({build: planData30.build}) + ' <a class="build-link" href="' + soy.$$escapeHtml(planData30.build.url) + '">' + soy.$$escapeHtml(AJS.format('#{0}',planData30.build.buildNumber)) + '</a></td><td class="result">' + JIRA.Templates.DevStatus.DetailDialog.buildResult({build: planData30.build}) + '</td><td class="timestamp">' + JIRA.Templates.DevStatus.DetailDialog.timestamp({timestamp: planData30.build.finishedDate}) + '</td>' + ((opt_data.withArtifactColumn) ? '<td class="actions">' + ((planHasArtifacts__soy31) ? aui.expander.trigger({id: 'detail-dialog-build-show-artifacts-trigger-' + uniqueIdSuffix__soy32, contentId: 'detail-dialog-build-show-artifacts-content-' + uniqueIdSuffix__soy32, tag: 'a', content: '\u041f\u0440\u043e\u0441\u043c\u043e\u0442\u0440 \u0430\u0440\u0442\u0435\u0444\u0430\u043a\u0442\u043e\u0432', replaceText: '\u0421\u043a\u0440\u044b\u0442\u044c \u0430\u0440\u0442\u0435\u0444\u0430\u043a\u0442\u044b'}) : '') + '</td>' : '') + '</tr>' + ((planHasArtifacts__soy31) ? '<tr class="artifacts"><td colspan="5">' + aui.expander.content({id: 'detail-dialog-build-show-artifacts-content-' + uniqueIdSuffix__soy32, content: '' + JIRA.Templates.DevStatus.DetailDialog.artifactsTable({build: planData30.build})}) + '</td></tr>' : '');
  }
  output += '</tbody></table></div></div>';
  return output;
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.DetailDialog.projectContent.soyTemplateName = 'JIRA.Templates.DevStatus.DetailDialog.projectContent';
}


JIRA.Templates.DevStatus.DetailDialog.projectHeader = function(opt_data, opt_ignored) {
  return '<div class="builds-header"><div class="project-info"><h2 class="ellipsis"><a class="project-link" href="' + soy.$$escapeHtml(opt_data.project.url) + '" title="' + soy.$$escapeHtml(opt_data.project.name) + '">' + soy.$$escapeHtml(opt_data.project.name) + '</a></h2></div></div>';
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.DetailDialog.projectHeader.soyTemplateName = 'JIRA.Templates.DevStatus.DetailDialog.projectHeader';
}


JIRA.Templates.DevStatus.DetailDialog.planName = function(opt_data, opt_ignored) {
  return '<div><span class="plan-name">' + ((opt_data.plan.isBranch) ? '<a class="plan-link" href="' + soy.$$escapeHtml(opt_data.plan.url) + '" title="' + soy.$$escapeHtml(opt_data.plan.name) + ' &rsaquo; ' + soy.$$escapeHtml(opt_data.plan.branchName) + '">' + soy.$$escapeHtml(opt_data.plan.name) + '</a> &rsaquo; <span class="aui-icon aui-icon-small aui-iconfont-devtools-branch-small">' + soy.$$escapeHtml(opt_data.plan.branchName) + '</span><a class="plan-link" href="' + soy.$$escapeHtml(opt_data.plan.url) + '" title="' + soy.$$escapeHtml(opt_data.plan.name) + ' &rsaquo; ' + soy.$$escapeHtml(opt_data.plan.branchName) + '">' + soy.$$escapeHtml(opt_data.plan.branchName) + '</a>' : '<a class="plan-link" href="' + soy.$$escapeHtml(opt_data.plan.url) + '" title="' + soy.$$escapeHtml(opt_data.plan.name) + '">' + soy.$$escapeHtml(opt_data.plan.name) + '</a>') + '</span>' + ((opt_data.plan.disabled) ? '<span class="aui-lozenge aui-lozenge-subtle disabled" title="' + soy.$$escapeHtml('\u042d\u0442\u043e\u0442 \u043f\u043b\u0430\u043d \u043e\u0442\u043a\u043b\u044e\u0447\u0435\u043d') + '">' + soy.$$escapeHtml('\u041e\u0442\u043a\u043b\u044e\u0447\u0435\u043d\u043e') + '</span>' : '') + '</div>';
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.DetailDialog.planName.soyTemplateName = 'JIRA.Templates.DevStatus.DetailDialog.planName';
}


JIRA.Templates.DevStatus.DetailDialog.buildResult = function(opt_data, opt_ignored) {
  var output = '';
  if (opt_data.build.buildState == 'SUCCESS' || opt_data.build.buildState == 'FAILED') {
    if (opt_data.build.testSummary) {
      var duration__soy131 = '' + JIRA.Templates.DevStatus.DetailDialog.buildDuration(opt_data);
      output += '<span>' + ((opt_data.build.testSummary.failedTestCount > 0) ? (opt_data.build.testSummary.successfulTestCount) ? soy.$$escapeHtml(AJS.format('\u041d\u0435\u0443\u0434\u0430\u0447\u043d\u044b\u0445 \u0442\u0435\u0441\u0442\u043e\u0432 \u0432 {2}: {0} \u0438\u0437 {1}',opt_data.build.testSummary.failedTestCount,opt_data.build.testSummary.totalTestCount,duration__soy131)) : soy.$$escapeHtml(AJS.format('\u043d\u0435\u0443\u0434\u0430\u0447\u043d\u043e\u0435 \u0432\u044b\u043f\u043e\u043b\u043d\u0435\u043d\u0438\u0435 {0} {0,choice,1#\u0442\u0435\u0441\u0442|1\x3c\u0442\u0435\u0441\u0442\u043e\u0432} \u0432 {1}',opt_data.build.testSummary.failedTestCount,duration__soy131)) : (opt_data.build.testSummary.successfulTestCount > 0) ? soy.$$escapeHtml(AJS.format('{0} \u041f\u0440\u043e\u0439\u0434\u0435\u043d\u043e {0,choice,1#\u0442\u0435\u0441\u0442|1\x3c\u0442\u0435\u0441\u0442\u043e\u0432} \u0432 {1}',opt_data.build.testSummary.successfulTestCount,duration__soy131)) : (opt_data.build.buildState == 'SUCCESS') ? soy.$$escapeHtml(AJS.format('\u041f\u0435\u0440\u0435\u0434\u0430\u043d\u043e \u0432 {0}',duration__soy131)) : soy.$$escapeHtml(AJS.format('\u041d\u0435\u0443\u0434\u0430\u0447\u043d\u043e\u0435 \u0432\u044b\u043f\u043e\u043b\u043d\u0435\u043d\u0438\u0435 \u0432 {0}',duration__soy131))) + '</span>';
    }
  } else {
    output += soy.$$escapeHtml('\u0421\u0431\u043e\u0440\u043a\u0430 \u043d\u0435 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043d\u0430');
  }
  return output;
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.DetailDialog.buildResult.soyTemplateName = 'JIRA.Templates.DevStatus.DetailDialog.buildResult';
}


JIRA.Templates.DevStatus.DetailDialog.buildDuration = function(opt_data, opt_ignored) {
  return '' + ((opt_data.build) ? (opt_data.build.durationInSeconds < 1) ? soy.$$escapeHtml('\u043c\u0435\u043d\u0435\u0435 1 \u0441\u0435\u043a\u0443\u043d\u0434\u044b') : (opt_data.build.durationInSeconds < 90) ? soy.$$escapeHtml(AJS.format('{0} {0,choice,1#\u0441\u0435\u043a\u0443\u043d\u0434\u0430|1\x3c\u0441\u0435\u043a\u0443\u043d\u0434\u044b}',opt_data.build.durationInSeconds)) : (opt_data.build.durationInSeconds < 5400) ? soy.$$escapeHtml(AJS.format('{0} {0,choice,1#\u043c\u0438\u043d|1\x3c\u043c\u0438\u043d}',Math.floor(opt_data.build.durationInSeconds / 60))) : soy.$$escapeHtml(AJS.format('{0} {0,choice,1#\u0447|1\x3c\u0447}',Math.floor(opt_data.build.durationInSeconds / 60 / 60))) : '');
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.DetailDialog.buildDuration.soyTemplateName = 'JIRA.Templates.DevStatus.DetailDialog.buildDuration';
}


JIRA.Templates.DevStatus.DetailDialog.buildIcon = function(opt_data, opt_ignored) {
  var output = '';
  var iconClass__soy167 = '' + ((opt_data.build.buildState == 'SUCCESS') ? 'aui-iconfont-approve' : (opt_data.build.buildState == 'FAILED') ? 'aui-iconfont-error' : 'aui-iconfont-devtools-task-cancelled');
  output += '<span class="aui-icon aui-icon-small ' + soy.$$escapeHtml(iconClass__soy167) + '">' + soy.$$escapeHtml(opt_data.build.buildState) + '</span>';
  return output;
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.DetailDialog.buildIcon.soyTemplateName = 'JIRA.Templates.DevStatus.DetailDialog.buildIcon';
}


JIRA.Templates.DevStatus.DetailDialog.artifactsTable = function(opt_data, opt_ignored) {
  var output = '';
  var column1Height__soy181 = Math.ceil(opt_data.build.artifacts.length / 3);
  var column2Height__soy182 = Math.ceil((opt_data.build.artifacts.length - 1) / 3);
  var column3Height__soy183 = Math.ceil((opt_data.build.artifacts.length - 2) / 3);
  output += '<div class="build-artifacts-table"><table class="aui"><tbody>';
  var artifactIndexLimit185 = column1Height__soy181;
  for (var artifactIndex185 = 0; artifactIndex185 < artifactIndexLimit185; artifactIndex185++) {
    output += '<tr><td>' + JIRA.Templates.DevStatus.DetailDialog.artifactName({artifact: opt_data.build.artifacts[artifactIndex185]}) + '</td><td>' + ((artifactIndex185 < column2Height__soy182) ? JIRA.Templates.DevStatus.DetailDialog.artifactName({artifact: opt_data.build.artifacts[artifactIndex185 + column1Height__soy181]}) : '') + '</td><td>' + ((artifactIndex185 < column3Height__soy183) ? JIRA.Templates.DevStatus.DetailDialog.artifactName({artifact: opt_data.build.artifacts[artifactIndex185 + column1Height__soy181 + column2Height__soy182]}) : '') + '</td></tr>';
  }
  output += '</tbody></table></div>';
  return output;
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.DetailDialog.artifactsTable.soyTemplateName = 'JIRA.Templates.DevStatus.DetailDialog.artifactsTable';
}


JIRA.Templates.DevStatus.DetailDialog.artifactName = function(opt_data, opt_ignored) {
  return '' + ((opt_data.artifact && opt_data.artifact.name) ? (opt_data.artifact.url) ? '<a class="artifact-link" href="' + soy.$$escapeHtml(opt_data.artifact.url) + '">' + soy.$$escapeHtml(opt_data.artifact.name) + '</a>' : soy.$$escapeHtml(opt_data.artifact.name) : '');
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.DetailDialog.artifactName.soyTemplateName = 'JIRA.Templates.DevStatus.DetailDialog.artifactName';
}
;
;
/* module-key = 'com.atlassian.jira.plugins.jira-development-integration-plugin:devstatus-dialog-all-resources', location = 'templates/viewissue/deployment/devstatus-detail-dialog-deployment.soy' */
// This file was automatically generated from devstatus-detail-dialog-deployment.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace JIRA.Templates.DevStatus.DetailDialog.Deployment.
 */

if (typeof JIRA == 'undefined') { var JIRA = {}; }
if (typeof JIRA.Templates == 'undefined') { JIRA.Templates = {}; }
if (typeof JIRA.Templates.DevStatus == 'undefined') { JIRA.Templates.DevStatus = {}; }
if (typeof JIRA.Templates.DevStatus.DetailDialog == 'undefined') { JIRA.Templates.DevStatus.DetailDialog = {}; }
if (typeof JIRA.Templates.DevStatus.DetailDialog.Deployment == 'undefined') { JIRA.Templates.DevStatus.DetailDialog.Deployment = {}; }


JIRA.Templates.DevStatus.DetailDialog.Deployment.deployment = function(opt_data, opt_ignored) {
  var output = '';
  var projectList3 = opt_data.deploymentProjects;
  var projectListLen3 = projectList3.length;
  for (var projectIndex3 = 0; projectIndex3 < projectListLen3; projectIndex3++) {
    var projectData3 = projectList3[projectIndex3];
    output += JIRA.Templates.DevStatus.DetailDialog.Deployment.projectContent({project: projectData3, applicationType: opt_data.applicationType});
  }
  return output;
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.DetailDialog.Deployment.deployment.soyTemplateName = 'JIRA.Templates.DevStatus.DetailDialog.Deployment.deployment';
}


JIRA.Templates.DevStatus.DetailDialog.Deployment.projectContent = function(opt_data, opt_ignored) {
  var output = '<div class="detail-deployments-container">' + JIRA.Templates.DevStatus.DetailDialog.Deployment.projectHeader(opt_data) + '<div class="devstatus-detail-table deployments-table"><table class="aui"><thead><tr><th class="environment">' + soy.$$escapeHtml('\u041e\u043a\u0440\u0443\u0436\u0435\u043d\u0438\u0435') + '</th><th class="status cell-type-collapsed">' + soy.$$escapeHtml('\u0421\u0442\u0430\u0442\u0443\u0441') + '</th><th class="release cell-type-collapsed">' + soy.$$escapeHtml('\u041f\u043e\u0441\u043b\u0435\u0434\u043d\u044f\u044f \u0432\u0435\u0440\u0441\u0438\u044f') + '</th><th class="timestamp cell-type-collapsed">' + soy.$$escapeHtml('\u041f\u043e\u0441\u043b\u0435\u0434\u043d\u0435\u0435 \u0432\u043d\u0435\u0434\u0440\u0435\u043d\u0438\u0435') + '</th></tr></thead><tbody>';
  var environmentList20 = opt_data.project.environments;
  var environmentListLen20 = environmentList20.length;
  for (var environmentIndex20 = 0; environmentIndex20 < environmentListLen20; environmentIndex20++) {
    var environmentData20 = environmentList20[environmentIndex20];
    output += '<tr class="environment-row"><td class="environment">' + JIRA.Templates.DevStatus.DetailDialog.Deployment.environmentName({environment: environmentData20}) + '</td><td class="status cell-type-collapsed">' + JIRA.Templates.DevStatus.DetailDialog.Deployment.statusLozenge({environment: environmentData20}) + '</td><td class="release">' + ((environmentData20.deployedVersion) ? JIRA.Templates.DevStatus.DetailDialog.Deployment.release({release: environmentData20.deployedVersion}) : '') + '</td><td class="timestamp">' + JIRA.Templates.DevStatus.DetailDialog.timestamp({timestamp: environmentData20.lastDeployed}) + '</td></tr>';
  }
  output += '</tbody></table></div></div>';
  return output;
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.DetailDialog.Deployment.projectContent.soyTemplateName = 'JIRA.Templates.DevStatus.DetailDialog.Deployment.projectContent';
}


JIRA.Templates.DevStatus.DetailDialog.Deployment.projectHeader = function(opt_data, opt_ignored) {
  return '<div class="deployments-header"><div class="project-info"><h2 class="ellipsis"><a class="project-link" href="' + soy.$$escapeHtml(opt_data.project.url) + '" title="' + ((opt_data.project.description) ? soy.$$escapeHtml(opt_data.project.description) : soy.$$escapeHtml(opt_data.project.name)) + '">' + soy.$$escapeHtml(opt_data.project.name) + '</a></h2><div class="ellipsis"><strong class="commit-info">' + soy.$$escapeHtml(AJS.format('\u0424\u0438\u043a\u0441\u0430\u0446\u0438\u0438 \u043e\u0442\u043d\u043e\u0441\u044f\u0442\u0441\u044f \u043a \u0432\u044b\u043f\u0443\u0441\u043a\u0443 {0}',opt_data.project.latestVersions[0].name)) + '</strong></div></div></div>';
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.DetailDialog.Deployment.projectHeader.soyTemplateName = 'JIRA.Templates.DevStatus.DetailDialog.Deployment.projectHeader';
}


JIRA.Templates.DevStatus.DetailDialog.Deployment.environmentName = function(opt_data, opt_ignored) {
  return '<a class="environment-link" href="' + soy.$$escapeHtml(opt_data.environment.url) + '" title="' + ((opt_data.environment.description) ? soy.$$escapeHtml(opt_data.environment.description) : soy.$$escapeHtml(opt_data.environment.name)) + '">' + soy.$$escapeHtml(opt_data.environment.name) + '</a>';
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.DetailDialog.Deployment.environmentName.soyTemplateName = 'JIRA.Templates.DevStatus.DetailDialog.Deployment.environmentName';
}


JIRA.Templates.DevStatus.DetailDialog.Deployment.statusLozenge = function(opt_data, opt_ignored) {
  return '' + ((opt_data.environment.status == 'DEPLOYED') ? '<span class="aui-lozenge aui-lozenge-subtle aui-lozenge-success">' + soy.$$escapeHtml('\u0420\u0430\u0437\u0432\u0435\u0440\u043d\u0443\u0442\u043e') + '</span>' : (opt_data.environment.status == 'FAILED') ? '<span class="aui-lozenge aui-lozenge-subtle aui-lozenge-error">' + soy.$$escapeHtml('\u041e\u0448\u0438\u0431\u043a\u0430') + '</span>' : (opt_data.environment.status == 'NOT_DEPLOYED') ? '<span class="aui-lozenge aui-lozenge-subtle">' + soy.$$escapeHtml('\u041d\u0435 \u0432\u043d\u0435\u0434\u0440\u0435\u043d\u043e') + '</span>' : '');
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.DetailDialog.Deployment.statusLozenge.soyTemplateName = 'JIRA.Templates.DevStatus.DetailDialog.Deployment.statusLozenge';
}


JIRA.Templates.DevStatus.DetailDialog.Deployment.release = function(opt_data, opt_ignored) {
  return '' + ((opt_data.release.url) ? '<a class="release-link" href="' + soy.$$escapeHtml(opt_data.release.url) + '" title="' + soy.$$escapeHtml(opt_data.release.name) + '">' + soy.$$escapeHtml(opt_data.release.name) + '</a>' : soy.$$escapeHtml(opt_data.release.name));
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.DetailDialog.Deployment.release.soyTemplateName = 'JIRA.Templates.DevStatus.DetailDialog.Deployment.release';
}
;
;
/* module-key = 'com.atlassian.jira.plugins.jira-development-integration-plugin:devstatus-dialog-all-resources', location = 'templates/viewissue/devstatus-detail-dialog-commit.soy' */
// This file was automatically generated from devstatus-detail-dialog-commit.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace JIRA.Templates.DevStatus.DetailDialog.
 */

if (typeof JIRA == 'undefined') { var JIRA = {}; }
if (typeof JIRA.Templates == 'undefined') { JIRA.Templates = {}; }
if (typeof JIRA.Templates.DevStatus == 'undefined') { JIRA.Templates.DevStatus = {}; }
if (typeof JIRA.Templates.DevStatus.DetailDialog == 'undefined') { JIRA.Templates.DevStatus.DetailDialog = {}; }


JIRA.Templates.DevStatus.DetailDialog.commit = function(opt_data, opt_ignored) {
  var output = '' + ((opt_data.canCreateReview) ? '<div class="aui-group aui-group-split"><div class="aui-item"></div><div class="aui-item"><div class="create-review-instance"><a href="#">' + soy.$$escapeHtml('\u0421\u043e\u0437\u0434\u0430\u0442\u044c \u043e\u0431\u0437\u043e\u0440 \u043d\u0430 \u0432\u0441\u0435 \u043a\u043e\u043c\u043c\u0438\u0442\u044b') + '</a></div></div></div>' : '');
  var repoList8 = opt_data.repositories;
  var repoListLen8 = repoList8.length;
  for (var repoIndex8 = 0; repoIndex8 < repoListLen8; repoIndex8++) {
    var repoData8 = repoList8[repoIndex8];
    output += JIRA.Templates.DevStatus.DetailDialog.commitContent(soy.$$augmentMap(opt_data, {repository: repoData8, repositoryIndex: repoIndex8}));
  }
  return output;
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.DetailDialog.commit.soyTemplateName = 'JIRA.Templates.DevStatus.DetailDialog.commit';
}


JIRA.Templates.DevStatus.DetailDialog.commitContent = function(opt_data, opt_ignored) {
  var output = '<div class="detail-commits-container' + ((opt_data.repository.showReviews) ? ' has-reviews' : '') + ((opt_data.repository.showBranches) ? ' has-branches' : '') + ((opt_data.repository.showFiles) ? ' has-files' : '') + ' ' + ((opt_data.repository.showCreateReview) ? 'has-actions' : '') + '" data-repository-index="' + soy.$$escapeHtml(opt_data.repositoryIndex) + '" >' + JIRA.Templates.DevStatus.DetailDialog.repositoryHeader(soy.$$augmentMap(opt_data, {showParent: true, extraProjectInfo: '' + ((opt_data.repository.showInstance && opt_data.repository.instance) ? '<div class="repository-instance" title="' + soy.$$escapeHtml(opt_data.repository.instance.name) + '">(' + soy.$$escapeHtml(opt_data.repository.instance.name) + ')</div>' : ''), extraContent: '' + ((opt_data.repository.showFiles) ? '<div class="file-expand"><a href="#">' + soy.$$escapeHtml('\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u0432\u0441\u0435 \u0444\u0430\u0439\u043b\u044b') + '</a></div>' : '')})) + '<div class="devstatus-detail-table commits-table"><table class="aui"><thead><tr><th class="author cell-type-collapsed">' + soy.$$escapeHtml('\u0410\u0432\u0442\u043e\u0440') + '</th><th class="changeset cell-type-collapsed">' + soy.$$escapeHtml('\u041a\u043e\u043c\u043c\u0438\u0442') + '</th><th class="message">' + soy.$$escapeHtml('\u0421\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435') + '</th>' + ((opt_data.repository.showBranches) ? '<th class="branches"></th>' : '') + ((opt_data.repository.showReviews) ? '<th class="reviews">' + soy.$$escapeHtml('\u0420\u0430\u0441\u0441\u043c\u043e\u0442\u0440\u0435\u043d\u0438\u044f') + '</th>' : '') + '<th class="timestamp">' + soy.$$escapeHtml('\u0414\u0430\u0442\u0430') + '</th>' + ((opt_data.repository.showFiles) ? '<th class="filecount">' + soy.$$escapeHtml('\u0424\u0430\u0439\u043b\u044b') + '</th>' : '') + ((opt_data.repository.showCreateReview) ? '<th class="commit-actions">' + soy.$$escapeHtml('\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044f') + '</th>' : '') + '</tr></thead><tbody>';
  var commitList76 = opt_data.repository.commits;
  var commitListLen76 = commitList76.length;
  for (var commitIndex76 = 0; commitIndex76 < commitListLen76; commitIndex76++) {
    var commitData76 = commitList76[commitIndex76];
    output += '<tr data-changesetid="' + soy.$$escapeHtml(commitData76.id) + '" class="commitrow' + ((commitData76.merge) ? ' merge' : '') + '" data-commit-index="' + soy.$$escapeHtml(commitIndex76) + '"><td class="author">' + JIRA.Templates.DevStatus.DetailDialog.vcsUser(commitData76.author) + '</td><td class="changeset">' + ((commitData76.url) ? '<a class="changesetid" href="' + soy.$$escapeHtml(commitData76.url) + '">' + soy.$$escapeHtml(commitData76.displayId) + '</a>' : '<span class="changesetid">' + soy.$$escapeHtml(commitData76.displayId) + '</span>') + ((commitData76.merge) ? JIRA.Templates.DevStatus.DetailDialog.mergeLozenge(null) : '') + '</td><td class="message"><span class="ellipsis" title="' + soy.$$escapeHtml(commitData76.message) + '">' + soy.$$truncate(soy.$$escapeHtml(commitData76.message), 500, true) + '</span></td>' + JIRA.Templates.DevStatus.DetailDialog.branchesColumn(soy.$$augmentMap(opt_data, {commit: commitData76})) + JIRA.Templates.DevStatus.DetailDialog.reviewColumn(soy.$$augmentMap(opt_data, {commit: commitData76, entryIndex: commitIndex76})) + '<td class="timestamp"><time class="livestamp" datetime="' + soy.$$escapeHtml(commitData76.authorTimestamp) + '" data-datetime-format="longAge"> ' + soy.$$escapeHtml(commitData76.authorTimestamp) + '</time></td>' + ((opt_data.repository.showFiles) ? JIRA.Templates.DevStatus.DetailDialog.filesColumn({count: commitData76.fileCount}) : '') + ((opt_data.repository.showCreateReview) ? JIRA.Templates.DevStatus.DetailDialog.actionsColumn(soy.$$augmentMap(opt_data, {commit: commitData76})) : '') + '</tr>' + ((opt_data.repository.showFiles) ? JIRA.Templates.DevStatus.DetailDialog.filesRow(soy.$$augmentMap(opt_data, {repository: opt_data.repository, commit: commitData76})) : '');
  }
  output += '</tbody></table></div></div>';
  return output;
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.DetailDialog.commitContent.soyTemplateName = 'JIRA.Templates.DevStatus.DetailDialog.commitContent';
}


JIRA.Templates.DevStatus.DetailDialog.mergeLozenge = function(opt_data, opt_ignored) {
  return '<span class="aui-lozenge merge" title="' + soy.$$escapeHtml('\u042d\u0442\u043e\u0442 \u043a\u043e\u043c\u043c\u0438\u0442 - \u0441\u043b\u0438\u044f\u043d\u0438\u0435') + '">' + soy.$$escapeHtml('\u041c') + '</span>';
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.DetailDialog.mergeLozenge.soyTemplateName = 'JIRA.Templates.DevStatus.DetailDialog.mergeLozenge';
}


JIRA.Templates.DevStatus.DetailDialog.branchesColumn = function(opt_data, opt_ignored) {
  return '' + ((opt_data.repository.showBranches) ? '<td class="branches">' + ((opt_data.commit.branches && opt_data.commit.branches.totalCount > 0) ? '<span class="branches-link aui-lozenge ref-lozenge"><span class="aui-icon aui-icon-small aui-iconfont-devtools-branch-small">Branch</span></button>' + ((opt_data.commit.branches.totalCount > 1) ? '<span class="branch-count">' + soy.$$escapeHtml(opt_data.commit.branches.totalCount) + '</span>' : '') + '</span>' : '') + '</td>' : '');
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.DetailDialog.branchesColumn.soyTemplateName = 'JIRA.Templates.DevStatus.DetailDialog.branchesColumn';
}


JIRA.Templates.DevStatus.DetailDialog.branchesTooltip = function(opt_data, opt_ignored) {
  var output = '<span class="branch-tooltip">';
  var branchList156 = opt_data.branchData.branches;
  var branchListLen156 = branchList156.length;
  for (var branchIndex156 = 0; branchIndex156 < branchListLen156; branchIndex156++) {
    var branchData156 = branchList156[branchIndex156];
    output += '<div class="branch-name-tooltip">' + soy.$$escapeHtml(branchData156.name) + '</div>';
  }
  output += ((opt_data.branchData.totalCount > opt_data.branchData.branches.length) ? '<div class="branch-tooltip-summary">' + soy.$$escapeHtml(AJS.format('\u0438 \u0435\u0449\u0435 {0}',opt_data.branchData.totalCount - opt_data.branchData.branches.length)) + '</div>' : '') + '</span>';
  return output;
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.DetailDialog.branchesTooltip.soyTemplateName = 'JIRA.Templates.DevStatus.DetailDialog.branchesTooltip';
}


JIRA.Templates.DevStatus.DetailDialog.reviewColumn = function(opt_data, opt_ignored) {
  return '' + ((opt_data.repository.showReviews) ? '<td class="reviews">' + ((opt_data.commit.reviews && opt_data.commit.reviews.totalCount > 0) ? '<span data-aui-trigger aria-controls="commit-reviews-tooltip-' + soy.$$escapeHtml(opt_data.entryIndex) + '" class="review-tooltip">' + JIRA.Templates.FusionWidget.Common.reviewsStateViewIssue({state: opt_data.commit.reviews.reviews[0].state}) + '</span><aui-inline-dialog class="detail-dialog-tooltip reviews-dialog" id="commit-reviews-tooltip-' + soy.$$escapeHtml(opt_data.entryIndex) + '" responds-to="hover">' + JIRA.Templates.DevStatus.DetailDialog.reviewsInlineDialog({reviewData: opt_data.commit.reviews}) + '</aui-inline-dialog>' : '') + '</td>' : '');
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.DetailDialog.reviewColumn.soyTemplateName = 'JIRA.Templates.DevStatus.DetailDialog.reviewColumn';
}


JIRA.Templates.DevStatus.DetailDialog.actionsColumn = function(opt_data, opt_ignored) {
  return '<td class="commit-actions">' + ((opt_data.commit.createReviewUrl) ? '<div class="create-review-commit"><a href="' + soy.$$escapeHtml(opt_data.commit.createReviewUrl) + '">' + soy.$$escapeHtml('\u0421\u043e\u0437\u0434\u0430\u0442\u044c \u0440\u0430\u0441\u0441\u043c\u043e\u0442\u0440\u0435\u043d\u0438\u0435') + '</a></div>' : '') + '</td>';
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.DetailDialog.actionsColumn.soyTemplateName = 'JIRA.Templates.DevStatus.DetailDialog.actionsColumn';
}


JIRA.Templates.DevStatus.DetailDialog.filesColumn = function(opt_data, opt_ignored) {
  return '<td class="filecount">' + ((opt_data.count > 0) ? '<a href="#" class="extra-content-in-title" title="' + soy.$$escapeHtml('\u041d\u0430\u0436\u043c\u0438\u0442\u0435, \u0447\u0442\u043e\u0431\u044b \u0443\u0432\u0438\u0434\u0435\u0442\u044c \u0444\u0430\u0439\u043b\u044b') + '">' + ((opt_data.count < 100) ? soy.$$escapeHtml(AJS.format('{0} {0,choice,1#\u0444\u0430\u0439\u043b|1\x3c\u0444\u0430\u0439\u043b\u043e\u0432}',opt_data.count)) : soy.$$escapeHtml(AJS.format('{0}+ \u0444\u0430\u0439\u043b\u044b',100))) + '</a>' : '') + '</td>';
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.DetailDialog.filesColumn.soyTemplateName = 'JIRA.Templates.DevStatus.DetailDialog.filesColumn';
}


JIRA.Templates.DevStatus.DetailDialog.filesRow = function(opt_data, opt_ignored) {
  return '<tr class="hidden ' + soy.$$escapeHtml(opt_data.commit.fileCount > 0 && opt_data.commit.files ? 'filerow' : '') + '"><td colspan="5">' + JIRA.Templates.DevStatus.DetailDialog.Commit.Files.fileRow({files: opt_data.commit.files, max: 5}) + JIRA.Templates.DevStatus.DetailDialog.Commit.Files.moreFiles({files: opt_data.commit.files, fileCount: opt_data.commit.fileCount, instanceName: opt_data.repository.name, moreFilesUrl: opt_data.commit.url}) + '</td></tr>';
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.DetailDialog.filesRow.soyTemplateName = 'JIRA.Templates.DevStatus.DetailDialog.filesRow';
}


JIRA.Templates.DevStatus.DetailDialog.reviewsInlineDialog = function(opt_data, opt_ignored) {
  var output = '<table><tbody>';
  var reviewList224 = opt_data.reviewData.reviews;
  var reviewListLen224 = reviewList224.length;
  for (var reviewIndex224 = 0; reviewIndex224 < reviewListLen224; reviewIndex224++) {
    var reviewData224 = reviewList224[reviewIndex224];
    output += '<tr class="inline-review-row"><td class="inline-review-id"><a href="' + soy.$$escapeHtml(reviewData224.url) + '">' + soy.$$escapeHtml(reviewData224.id) + '</a></td><td class="inline-review-state">' + JIRA.Templates.FusionWidget.Common.reviewsStateViewIssue({state: reviewData224.state}) + '</td></tr>';
  }
  output += ((opt_data.reviewData.totalCount > opt_data.reviewData.reviews.length) ? '<tr><td class="inline-review-summary" colspan="2">' + ((opt_data.reviewData.url) ? '<a href="' + soy.$$escapeHtml(opt_data.reviewData.url) + '">' + soy.$$escapeHtml(AJS.format('\u0438 \u0435\u0449\u0435 {0}',opt_data.reviewData.totalCount - opt_data.reviewData.reviews.length)) + '</a>' : '<span>' + soy.$$escapeHtml(AJS.format('\u0438 \u0435\u0449\u0435 {0}',opt_data.reviewData.totalCount - opt_data.reviewData.reviews.length)) + '</span>') + '</td></tr>' : '') + '</tbody></table>';
  return output;
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.DetailDialog.reviewsInlineDialog.soyTemplateName = 'JIRA.Templates.DevStatus.DetailDialog.reviewsInlineDialog';
}
;
;
/* module-key = 'com.atlassian.jira.plugins.jira-development-integration-plugin:devstatus-dialog-all-resources', location = 'templates/viewissue/commit/devstatus-detail-dialog-commit-files.soy' */
// This file was automatically generated from devstatus-detail-dialog-commit-files.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace JIRA.Templates.DevStatus.DetailDialog.Commit.Files.
 */

if (typeof JIRA == 'undefined') { var JIRA = {}; }
if (typeof JIRA.Templates == 'undefined') { JIRA.Templates = {}; }
if (typeof JIRA.Templates.DevStatus == 'undefined') { JIRA.Templates.DevStatus = {}; }
if (typeof JIRA.Templates.DevStatus.DetailDialog == 'undefined') { JIRA.Templates.DevStatus.DetailDialog = {}; }
if (typeof JIRA.Templates.DevStatus.DetailDialog.Commit == 'undefined') { JIRA.Templates.DevStatus.DetailDialog.Commit = {}; }
if (typeof JIRA.Templates.DevStatus.DetailDialog.Commit.Files == 'undefined') { JIRA.Templates.DevStatus.DetailDialog.Commit.Files = {}; }


JIRA.Templates.DevStatus.DetailDialog.Commit.Files.fileRow = function(opt_data, opt_ignored) {
  var output = '';
  var fileList3 = opt_data.files;
  var fileListLen3 = fileList3.length;
  for (var fileIndex3 = 0; fileIndex3 < fileListLen3; fileIndex3++) {
    var fileData3 = fileList3[fileIndex3];
    output += (fileIndex3 < opt_data.max) ? '<div class="file"><div class="change">' + ((fileData3.linesAdded != null && fileData3.linesRemoved != null) ? '<div class="lines">' + ((fileData3.changeType == 'ADDED') ? '<span class="aui-lozenge added">' + soy.$$escapeHtml('\u0414\u043e\u0431\u0430\u0432\u043b\u0435\u043d') + '</span>' : (fileData3.changeType == 'DELETED') ? '<span class="aui-lozenge removed">' + soy.$$escapeHtml('\u0423\u0434\u0430\u043b\u0435\u043d') + '</span>' : '<span class="aui-lozenge added count">+' + soy.$$escapeHtml(fileData3.linesAdded) + '</span><span class="aui-lozenge removed count">-' + soy.$$escapeHtml(fileData3.linesRemoved) + '</span>') + '</div>' : '<div class="changetype">' + JIRA.Templates.DevStatus.DetailDialog.Commit.Files.fileChangeLozenge({changeType: fileData3.changeType}) + '</div>') + '</div><div class="filename ellipsis">' + ((fileData3.url) ? '<a href="' + soy.$$escapeHtml(fileData3.url) + '" title="' + soy.$$escapeHtml(fileData3.path) + '">' + soy.$$escapeHtml(fileData3.path) + '</a>' : soy.$$escapeHtml(fileData3.path)) + '</div></div>' : '';
  }
  return output;
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.DetailDialog.Commit.Files.fileRow.soyTemplateName = 'JIRA.Templates.DevStatus.DetailDialog.Commit.Files.fileRow';
}


JIRA.Templates.DevStatus.DetailDialog.Commit.Files.moreFiles = function(opt_data, opt_ignored) {
  var output = '';
  if (opt_data.files.length < opt_data.fileCount) {
    if (opt_data.moreFilesUrl) {
      output += '<a class="more-files-info" href="' + soy.$$escapeHtml(opt_data.moreFilesUrl) + '">' + soy.$$escapeHtml(AJS.format('\u0421\u043c. \u0431\u043e\u043b\u044c\u0448\u0435 \u0444\u0430\u0439\u043b\u043e\u0432 \u0432 {0}',opt_data.instanceName)) + '</a>';
    } else {
      var notShownFileCount__soy56 = opt_data.fileCount - opt_data.files.length;
      output += '<span class="more-files-info">' + soy.$$escapeHtml(AJS.format('\u0438 \u0435\u0449\u0435 {0}',notShownFileCount__soy56)) + '</span>';
    }
  }
  return output;
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.DetailDialog.Commit.Files.moreFiles.soyTemplateName = 'JIRA.Templates.DevStatus.DetailDialog.Commit.Files.moreFiles';
}


JIRA.Templates.DevStatus.DetailDialog.Commit.Files.fileChangeLozenge = function(opt_data, opt_ignored) {
  var output = '';
  var text__soy61 = '';
  switch (opt_data.changeType) {
    case 'ADDED':
      text__soy61 += soy.$$escapeHtml('\u0414\u043e\u0431\u0430\u0432\u043b\u0435\u043d');
      break;
    case 'COPIED':
      text__soy61 += soy.$$escapeHtml('\u0421\u043a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u043d');
      break;
    case 'DELETED':
      text__soy61 += soy.$$escapeHtml('\u0423\u0434\u0430\u043b\u0435\u043d');
      break;
    case 'MOVED':
      text__soy61 += soy.$$escapeHtml('\u041f\u0435\u0440\u0435\u043c\u0435\u0449\u0435\u043d');
      break;
    default:
      text__soy61 += soy.$$escapeHtml('\u0418\u0437\u043c\u0435\u043d\u0435\u043d\u043e');
  }
  var class__soy73 = '';
  switch (opt_data.changeType) {
    case 'ADDED':
      class__soy73 += 'success';
      break;
    case 'COPIED':
      class__soy73 += 'current';
      break;
    case 'DELETED':
      class__soy73 += 'error';
      break;
    case 'MOVED':
      class__soy73 += 'moved';
      break;
    default:
      class__soy73 += 'complete';
  }
  output += '<span class="aui-lozenge aui-lozenge-' + soy.$$escapeHtml(class__soy73) + ' aui-lozenge-subtle">' + soy.$$escapeHtml(text__soy61) + '</span>';
  return output;
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.DetailDialog.Commit.Files.fileChangeLozenge.soyTemplateName = 'JIRA.Templates.DevStatus.DetailDialog.Commit.Files.fileChangeLozenge';
}
;
;
/* module-key = 'com.atlassian.jira.plugins.jira-development-integration-plugin:devstatus-dialog-all-resources', location = 'templates/viewissue/devstatus-detail-dialog-branch-pullrequest.soy' */
// This file was automatically generated from devstatus-detail-dialog-branch-pullrequest.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace JIRA.Templates.DevStatus.DetailDialog.
 */

if (typeof JIRA == 'undefined') { var JIRA = {}; }
if (typeof JIRA.Templates == 'undefined') { JIRA.Templates = {}; }
if (typeof JIRA.Templates.DevStatus == 'undefined') { JIRA.Templates.DevStatus = {}; }
if (typeof JIRA.Templates.DevStatus.DetailDialog == 'undefined') { JIRA.Templates.DevStatus.DetailDialog = {}; }


JIRA.Templates.DevStatus.DetailDialog.pullRequest = function(opt_data, opt_ignored) {
  return '<div class="detail-pullrequests-container"><div class="devstatus-detail-table pullrequests-table"><table class="aui"><thead><tr><th class="pullrequest-id">' + soy.$$escapeHtml('ID') + '</th><th class="title">' + soy.$$escapeHtml('\u0417\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a') + '</th><th class="state">' + soy.$$escapeHtml('\u0421\u0442\u0430\u0442\u0443\u0441') + '</th><th class="author">' + soy.$$escapeHtml('\u0410\u0432\u0442\u043e\u0440') + '</th><th class="reviewer">' + soy.$$escapeHtml('\u041f\u0440\u043e\u0432\u0435\u0440\u044f\u044e\u0449\u0438\u0439') + '</th><th class="comment cell-type-collapsed"></th><th class="last-updated">' + soy.$$escapeHtml('\u041e\u0431\u043d\u043e\u0432\u043b\u0435\u043d\u043e') + '</th></tr></thead><tbody>' + JIRA.Templates.DevStatus.DetailDialog.pullRequestEntry(opt_data) + '</tbody></table></div></div>';
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.DetailDialog.pullRequest.soyTemplateName = 'JIRA.Templates.DevStatus.DetailDialog.pullRequest';
}


JIRA.Templates.DevStatus.DetailDialog.pullRequestEntry = function(opt_data, opt_ignored) {
  var output = '';
  var pullRequestList19 = opt_data.pullRequests;
  var pullRequestListLen19 = pullRequestList19.length;
  for (var pullRequestIndex19 = 0; pullRequestIndex19 < pullRequestListLen19; pullRequestIndex19++) {
    var pullRequestData19 = pullRequestList19[pullRequestIndex19];
    output += '<tr class="pullrequest-row"><td class="pullrequest-id"><a class="pullrequest-link" href="' + soy.$$escapeHtml(pullRequestData19.url) + '">' + soy.$$escapeHtml(pullRequestData19.id) + '</a></td><td class="title"><a class="pullrequest-link ellipsis" title="' + soy.$$escapeHtml(pullRequestData19.name) + '" href="' + soy.$$escapeHtml(pullRequestData19.url) + '">' + soy.$$escapeHtml(pullRequestData19.name) + '</a></td><td class="state">' + JIRA.Templates.DevStatus.DetailDialog.pullRequestState({status: pullRequestData19.status, isSubtle: true}) + '</td><td class="author"><img class="author-avatar extra-content-in-title" src="' + soy.$$escapeHtml(pullRequestData19.author.avatar) + '" title="' + soy.$$escapeHtml(pullRequestData19.author.name) + '"/></td><td class="reviewer">' + ((pullRequestData19.reviewers && pullRequestData19.reviewers.length != 0) ? JIRA.Templates.DevStatus.DetailDialog.reviewersList(soy.$$augmentMap(pullRequestData19, {countThreshold: opt_data.reviewersThreshold, entryIndex: 'pr' + pullRequestIndex19})) : '') + '</td><td class="comment cell-type-collapsed">' + JIRA.Templates.DevStatus.DetailDialog.commentCount({pullRequest: pullRequestData19}) + '</td><td class="last-updated"><time class="livestamp" data-datetime-format="longAge" datetime="' + soy.$$escapeHtml(pullRequestData19.lastUpdate) + '">' + soy.$$escapeHtml(pullRequestData19.lastUpdate) + '</time></td></tr>';
  }
  return output;
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.DetailDialog.pullRequestEntry.soyTemplateName = 'JIRA.Templates.DevStatus.DetailDialog.pullRequestEntry';
}


JIRA.Templates.DevStatus.DetailDialog.commentCount = function(opt_data, opt_ignored) {
  return '' + ((opt_data.pullRequest.commentCount) ? '<div class="comment-container"><a class="comment-link" href="' + soy.$$escapeHtml(opt_data.pullRequest.url) + '" title="' + soy.$$escapeHtml('\u041a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0438') + '"><span class="aui-icon aui-icon-small aui-iconfont-comment">Comments</span></a><span class="count">' + soy.$$escapeHtml(opt_data.pullRequest.commentCount) + '</span></div>' : '');
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.DetailDialog.commentCount.soyTemplateName = 'JIRA.Templates.DevStatus.DetailDialog.commentCount';
}


JIRA.Templates.DevStatus.DetailDialog.reviewersList = function(opt_data, opt_ignored) {
  var output = '<div class="reviewer-container">';
  var showThreshold__soy65 = opt_data.countThreshold + 1;
  var indexLimit66 = Math.min(opt_data.countThreshold, opt_data.reviewers.length);
  for (var index66 = 0; index66 < indexLimit66; index66++) {
    output += JIRA.Templates.DevStatus.DetailDialog.vcsUser(opt_data.reviewers[index66]);
  }
  output += ((opt_data.reviewers.length == showThreshold__soy65) ? JIRA.Templates.DevStatus.DetailDialog.vcsUser(opt_data.reviewers[opt_data.countThreshold]) : (opt_data.reviewers.length > showThreshold__soy65) ? '<span data-aui-trigger aria-controls="extrareviewers-tooltip-' + soy.$$escapeHtml(opt_data.entryIndex) + '" class="aui-badge extrareviewers-tooltip">' + soy.$$escapeHtml(opt_data.reviewers.length - opt_data.countThreshold) + '</span><aui-inline-dialog class="detail-dialog-tooltip extrareviewers-dialog" id="extrareviewers-tooltip-' + soy.$$escapeHtml(opt_data.entryIndex) + '" responds-to="hover">' + JIRA.Templates.DevStatus.DetailDialog.extraReviewersTooltip({reviewers: opt_data.extraReviewers}) + '</aui-inline-dialog>' : '') + '</div>';
  return output;
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.DetailDialog.reviewersList.soyTemplateName = 'JIRA.Templates.DevStatus.DetailDialog.reviewersList';
}


JIRA.Templates.DevStatus.DetailDialog.branch = function(opt_data, opt_ignored) {
  return '<div class="detail-branches-container"><div class="devstatus-detail-table branches-table"><table class="aui"><thead><tr><th class="repository">' + soy.$$escapeHtml('\u0420\u0435\u043f\u043e\u0437\u0438\u0442\u043e\u0440\u0438\u0439') + '</th><th class="branch">' + soy.$$escapeHtml('\u0412\u0435\u0442\u043a\u0430') + '</th>' + ((opt_data.features.lastCommitId) ? '<th class="changeset cell-type-collapsed">' + soy.$$escapeHtml('\u041f\u043e\u0441\u043b\u0435\u0434\u043d\u0438\u0439 \u043a\u043e\u043c\u043c\u0438\u0442') + '</th>' : '') + ((opt_data.features.lastCommitTimestamp) ? '<th class="last-updated cell-type-collapsed">' + soy.$$escapeHtml('\u041f\u043e\u0441\u043b\u0435\u0434\u043d\u0435\u0435 \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u0435') + '</th>' : '') + ((opt_data.features.pullRequests) ? '<th class="pullrequest">' + soy.$$escapeHtml('Pull-\u0437\u0430\u043f\u0440\u043e\u0441') + '</th>' : '') + ((opt_data.features.reviews) ? '<th class="review">' + soy.$$escapeHtml('\u041e\u0431\u0437\u043e\u0440') + '</th>' : '') + ((opt_data.features.pullRequests || opt_data.features.reviews) ? '<th class="action">' + soy.$$escapeHtml('\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u0435') + '</th>' : '') + '</tr></thead><tbody>' + JIRA.Templates.DevStatus.DetailDialog.branchEntry(opt_data) + '</tbody></table></div></div>';
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.DetailDialog.branch.soyTemplateName = 'JIRA.Templates.DevStatus.DetailDialog.branch';
}


JIRA.Templates.DevStatus.DetailDialog.branchEntry = function(opt_data, opt_ignored) {
  var output = '';
  var branchList119 = opt_data.branches;
  var branchListLen119 = branchList119.length;
  for (var branchIndex119 = 0; branchIndex119 < branchListLen119; branchIndex119++) {
    var branchData119 = branchList119[branchIndex119];
    output += '<tr class="branch-row"><td class="repository">' + JIRA.Templates.DevStatus.DetailDialog.repositoryHeader(soy.$$augmentMap(opt_data, {repository: branchData119.repository, showTooltip: true})) + '</td><td class="branch">' + JIRA.Templates.DevStatus.DetailDialog.branchLozenge(branchData119) + '</td>' + ((opt_data.features.lastCommitId) ? '<td class="changeset cell-type-collapsed">' + ((branchData119.lastCommit && branchData119.lastCommit.displayId) ? (branchData119.lastCommit.url) ? '<a class="changeset-link changesetid" href="' + soy.$$escapeHtml(branchData119.lastCommit.url) + '">' + soy.$$escapeHtml(branchData119.lastCommit.displayId) + '</a>' : '<span class="changeset-link changesetid">' + soy.$$escapeHtml(branchData119.lastCommit.displayId) + '</span>' : '') + '</td>' : '') + ((opt_data.features.lastCommitTimestamp) ? '<td class="last-updated cell-type-collapsed">' + ((branchData119.lastCommit && branchData119.lastCommit.authorTimestamp) ? JIRA.Templates.DevStatus.DetailDialog.timestamp({timestamp: branchData119.lastCommit.authorTimestamp}) : '') + '</td>' : '') + ((opt_data.features.pullRequests) ? '<td class="pullrequest">' + JIRA.Templates.DevStatus.DetailDialog.pullRequestStatusForBranch(soy.$$augmentMap(branchData119.pullRequestState, {entryIndex: branchIndex119})) + '</td>' : '') + ((opt_data.features.reviews) ? '<td class="review">' + JIRA.Templates.DevStatus.DetailDialog.reviewStatusForBranch({reviewData: branchData119.reviews, entryIndex: branchIndex119}) + '</td>' : '') + ((opt_data.features.pullRequests || opt_data.features.reviews) ? '<td class="action">' + ((branchData119.createPullRequestUrl && branchData119.createPullRequestUrl.length > 0) ? '<a class="create-pullrequest-link" href="' + soy.$$escapeHtml(branchData119.createPullRequestUrl) + '">' + soy.$$escapeHtml('\u0421\u043e\u0437\u0434\u0430\u0442\u044c pull-\u0437\u0430\u043f\u0440\u043e\u0441') + '</a>' : '') + ((branchData119.createReviewUrl && branchData119.createReviewUrl.length > 0) ? '<a class="create-review-link" href="' + soy.$$escapeHtml(branchData119.createReviewUrl) + '">' + soy.$$escapeHtml('\u0421\u043e\u0437\u0434\u0430\u0442\u044c \u0440\u0430\u0441\u0441\u043c\u043e\u0442\u0440\u0435\u043d\u0438\u0435') + '</a>' : '') + '</td>' : '') + '</tr>';
  }
  return output;
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.DetailDialog.branchEntry.soyTemplateName = 'JIRA.Templates.DevStatus.DetailDialog.branchEntry';
}


JIRA.Templates.DevStatus.DetailDialog.pullRequestStatusForBranch = function(opt_data, opt_ignored) {
  return '' + ((opt_data.total > 0) ? '<span data-aui-trigger aria-controls="pullrequest-tooltip-' + soy.$$escapeHtml(opt_data.entryIndex) + '" class="pullrequest-tooltip">' + JIRA.Templates.DevStatus.DetailDialog.pullRequestState({status: opt_data.status, isSubtle: true}) + '</span><aui-inline-dialog class="detail-dialog-tooltip pullrequest-dialog" id="pullrequest-tooltip-' + soy.$$escapeHtml(opt_data.entryIndex) + '" responds-to="hover">' + JIRA.Templates.DevStatus.DetailDialog.pullRequestToolTip({pullRequests: opt_data.data}) + '</aui-inline-dialog>' : '');
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.DetailDialog.pullRequestStatusForBranch.soyTemplateName = 'JIRA.Templates.DevStatus.DetailDialog.pullRequestStatusForBranch';
}


JIRA.Templates.DevStatus.DetailDialog.reviewStatusForBranch = function(opt_data, opt_ignored) {
  return '' + ((opt_data.reviewData && opt_data.reviewData.totalCount > 0) ? '<span data-aui-trigger aria-controls="reviews-tooltip-' + soy.$$escapeHtml(opt_data.entryIndex) + '" class="review-tooltip">' + JIRA.Templates.FusionWidget.Common.reviewsStateViewIssue({state: opt_data.reviewData.reviews[0].state}) + '</span><aui-inline-dialog class="detail-dialog-tooltip reviews-dialog" id="reviews-tooltip-' + soy.$$escapeHtml(opt_data.entryIndex) + '" responds-to="hover">' + JIRA.Templates.DevStatus.DetailDialog.reviewsInlineDialog(opt_data) + '</aui-inline-dialog>' : '');
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.DetailDialog.reviewStatusForBranch.soyTemplateName = 'JIRA.Templates.DevStatus.DetailDialog.reviewStatusForBranch';
}


JIRA.Templates.DevStatus.DetailDialog.pullRequestSingle = function(opt_data, opt_ignored) {
  return '<a class="pullrequest-link' + ((opt_data.extraClasses) ? ' ' + soy.$$escapeHtml(opt_data.extraClasses) : '') + '" href="' + soy.$$escapeHtml(opt_data.url) + '" ><span>' + soy.$$escapeHtml(opt_data.id) + ' ' + soy.$$escapeHtml(opt_data.name) + '</span></a>';
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.DetailDialog.pullRequestSingle.soyTemplateName = 'JIRA.Templates.DevStatus.DetailDialog.pullRequestSingle';
}


JIRA.Templates.DevStatus.DetailDialog.extraReviewersTooltip = function(opt_data, opt_ignored) {
  var output = '<div class="reviewer"><div class="reviewer-container"><table><tbody>';
  var reviewerList229 = opt_data.reviewers;
  var reviewerListLen229 = reviewerList229.length;
  for (var reviewerIndex229 = 0; reviewerIndex229 < reviewerListLen229; reviewerIndex229++) {
    var reviewerData229 = reviewerList229[reviewerIndex229];
    output += '<tr><td class="reviewer-avatar">' + JIRA.Templates.DevStatus.DetailDialog.vcsUser(reviewerData229) + '</td><td class="reviewer-name"><span title="' + soy.$$escapeHtml(reviewerData229.name) + '">' + soy.$$escapeHtml(reviewerData229.name) + '</span></td></tr>';
  }
  output += '</tbody></table></div></div>';
  return output;
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.DetailDialog.extraReviewersTooltip.soyTemplateName = 'JIRA.Templates.DevStatus.DetailDialog.extraReviewersTooltip';
}


JIRA.Templates.DevStatus.DetailDialog.pullRequestToolTip = function(opt_data, opt_ignored) {
  var output = '<table><tbody>';
  var pullRequestList241 = opt_data.pullRequests;
  var pullRequestListLen241 = pullRequestList241.length;
  for (var pullRequestIndex241 = 0; pullRequestIndex241 < pullRequestListLen241; pullRequestIndex241++) {
    var pullRequestData241 = pullRequestList241[pullRequestIndex241];
    output += '<tr><td class="pullrequest-name">' + JIRA.Templates.DevStatus.DetailDialog.pullRequestSingle(pullRequestData241) + '</td><td class="lozenge">' + JIRA.Templates.DevStatus.DetailDialog.pullRequestState({status: pullRequestData241.status, isSubtle: true}) + '</td></tr>';
  }
  output += '</tbody></table>';
  return output;
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.DetailDialog.pullRequestToolTip.soyTemplateName = 'JIRA.Templates.DevStatus.DetailDialog.pullRequestToolTip';
}


JIRA.Templates.DevStatus.DetailDialog.pullRequestState = function(opt_data, opt_ignored) {
  return '' + JIRA.Templates.FusionWidget.Common.reviewsState({isSubtle: opt_data.isSubtle, state: opt_data.status, stateClasses: {OPEN: 'aui-lozenge-complete', MERGED: 'aui-lozenge-success', DECLINED: 'aui-lozenge-error'}, stateText: {OPEN: '\u041e\u0422\u041a\u0420\u042b\u0422\u041e', MERGED: '\u0421\u041b\u0418\u042f\u041d\u0418\u0415', DECLINED: '\u041e\u0422\u041a\u041b\u041e\u041d\u0415\u041d\u041e'}, classes: 'pullrequest-state'});
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.DetailDialog.pullRequestState.soyTemplateName = 'JIRA.Templates.DevStatus.DetailDialog.pullRequestState';
}


JIRA.Templates.DevStatus.DetailDialog.branchLozenge = function(opt_data, opt_ignored) {
  return '<div class="branch-name"><span class="aui-icon aui-icon-small aui-iconfont-devtools-branch-small"></span>' + ((opt_data.url) ? '<a class="branch-link' + ((opt_data.extraClasses) ? ' ' + soy.$$escapeHtml(opt_data.extraClasses) : '') + '" href="' + soy.$$escapeHtml(opt_data.url) + '" title="' + soy.$$escapeHtml(opt_data.name) + '">' + soy.$$escapeHtml(opt_data.name) + '</a>' : '<span class="branch-link' + ((opt_data.extraClasses) ? ' ' + soy.$$escapeHtml(opt_data.extraClasses) : '') + '" title="' + soy.$$escapeHtml(opt_data.name) + '">' + soy.$$escapeHtml(opt_data.name) + '</span>') + '</div>';
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.DetailDialog.branchLozenge.soyTemplateName = 'JIRA.Templates.DevStatus.DetailDialog.branchLozenge';
}
;
;
/* module-key = 'com.atlassian.jira.plugins.jira-development-integration-plugin:devstatus-dialog-all-resources', location = 'templates/viewissue/devstatus-detail-dialog-review.soy' */
// This file was automatically generated from devstatus-detail-dialog-review.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace JIRA.Templates.DevStatus.DetailDialog.
 */

if (typeof JIRA == 'undefined') { var JIRA = {}; }
if (typeof JIRA.Templates == 'undefined') { JIRA.Templates = {}; }
if (typeof JIRA.Templates.DevStatus == 'undefined') { JIRA.Templates.DevStatus = {}; }
if (typeof JIRA.Templates.DevStatus.DetailDialog == 'undefined') { JIRA.Templates.DevStatus.DetailDialog = {}; }


JIRA.Templates.DevStatus.DetailDialog.review = function(opt_data, opt_ignored) {
  var output = '<div class="devstatus-detail-table detail-reviews-container"><div class="devstatus-detail-table reviews-table"><table class="aui"><thead><tr><th class="review cell-type-collapsed">' + soy.$$escapeHtml('ID') + '</th><th class="title">' + soy.$$escapeHtml('\u0417\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a') + '</th><th class="state cell-type-collapsed">' + soy.$$escapeHtml('\u0421\u0442\u0430\u0442\u0443\u0441') + '</th><th class="author cell-type-collapsed">' + soy.$$escapeHtml('\u0410\u0432\u0442\u043e\u0440') + '</th><th class="reviewer cell-type-collapsed">' + soy.$$escapeHtml('\u041f\u0440\u043e\u0432\u0435\u0440\u044f\u044e\u0449\u0438\u0435') + '</th><th class="comment cell-type-collapsed"></th><th class="timestamp">' + soy.$$escapeHtml('\u0414\u0430\u0442\u0430') + '</th></tr></thead><tbody>';
  var reviewList16 = opt_data.reviews;
  var reviewListLen16 = reviewList16.length;
  for (var reviewIndex16 = 0; reviewIndex16 < reviewListLen16; reviewIndex16++) {
    var reviewData16 = reviewList16[reviewIndex16];
    output += '<tr data-id="' + soy.$$escapeHtml(reviewData16.id) + '" class="review-row"><td class="review"><a href="' + soy.$$escapeHtml(reviewData16.url) + '" class="review-link">' + soy.$$escapeHtml(reviewData16.id) + '</a></td><td class="title"><span class="ellipsis" title="' + soy.$$escapeHtml(reviewData16.title) + '">' + soy.$$escapeHtml(reviewData16.title) + '</span></td><td class="state">' + JIRA.Templates.FusionWidget.Common.reviewsStateViewIssue({state: reviewData16.state}) + '</td><td class="author">' + ((reviewData16.author) ? JIRA.Templates.DevStatus.DetailDialog.vcsUser(reviewData16.author) : '') + '</td><td class="reviewer">' + JIRA.Templates.DevStatus.DetailDialog.reviewersList(soy.$$augmentMap(reviewData16, {countThreshold: opt_data.reviewersThreshold, extraReviewers: reviewData16.extraReviewers, entryIndex: 'review' + reviewIndex16})) + '</td><td class="comment cell-type-collapsed">' + JIRA.Templates.DevStatus.DetailDialog.commentCount({pullRequest: {commentCount: reviewData16.commentCount, url: reviewData16.url}}) + '</td><td class="timestamp">' + JIRA.Templates.DevStatus.Review.reviewDate(soy.$$augmentMap(reviewData16, {lastUpdated: reviewData16.lastModified, showUpdatedText: false})) + '</td></tr>';
  }
  output += '</tbody></table></div></div>';
  return output;
};
if (goog.DEBUG) {
  JIRA.Templates.DevStatus.DetailDialog.review.soyTemplateName = 'JIRA.Templates.DevStatus.DetailDialog.review';
}
;
;
/* module-key = 'com.atlassian.jira.plugins.jira-development-integration-plugin:devstatus-dialog-all-resources', location = 'js/util/Helpers.js' */
"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};define("jira-development-status/util/helpers",["underscore"],function(t){var e=function(){return soydata.VERY_UNSAFE?soydata.VERY_UNSAFE.ordainSanitizedHtml:function(t){return new soydata.SanitizedHtml(t)}};return{getContextPath:AJS.contextPath,copyAndMarkStringPropertiesAsSanitised:function n(o){var r=e(),i=Array.isArray(o)?[]:{};return t.each(t.keys(o),function(e){var y=o[e];y&&("string"==typeof y?i[e]=r(y):"object"===("undefined"==typeof y?"undefined":_typeof(y))?t.keys(y).length>0&&(i[e]=n(y)):i[e]=y)}),i}}});;
;
/* module-key = 'com.atlassian.jira.plugins.jira-development-integration-plugin:devstatus-dialog-all-resources', location = 'js/viewissue/dialog/CreateReviewFormDialog.js' */
"use strict";define("jira/devstatus/create-review-form-dialog",["backbone","jquery","require","underscore","jira/dialog/form-dialog","jira-development-status/util/WRM","jira/dev-status/util/url","jira-development-status/util/navigate"],function(e,i,t,a,n,r,s,c){return e.View.extend({initialize:function(e){this.linkSelector=e.linkSelector,this.applicationType=e.applicationType,this.instances=e.instances,this.issueId=e.issueId,this.dialog.instance=this},renderSuccess:function(){i(".create-review-instance a").attr("href",s.getCreateReviewDetailUrl(this.applicationType))},_processTargets:function(e){var i=this,t=a.map(e,function(e){var t=a.find(i.instances,function(i){return i.applicationLinkId===e.applicationLinkId});return t?a.extend({},e,t):null});return a.sortBy(a.filter(t,a.identity),"name")},dialog:new n({id:"devstatus-cta-create-review-dialog",trigger:".create-review-instance a",width:560,content:function(e){var a=this.instance,n=this;r.requireDetailDialogResources(function(){var r=t("jira/devstatus/instance-picker-view");n.pickerView=new r({el:n.$popup,activeTrigger:n.$activeTrigger,cta:"devstatus.cta.createreview",issueId:a.issueId,processTargets:function(e){return n.instance._processTargets.call(n.instance,e)},uniqueResultAction:function(e){JIRA.DevStatus.CommitsAnalytics.fireDetailCreateReviewClicked(a.applicationType,!0),c.navigate(e.url)}}),n.pickerView.render().always(function(t){e(t),i(n.$popup).find(".primary.target").eq(0).focus(),i(".target").click(function(e){JIRA.DevStatus.CommitsAnalytics.fireDetailCreateReviewClicked(a.applicationType,!0)})})})},autoClose:!0})})}),Backbone.define("JIRA.DevStatus.CreateReviewFormDialog",require("jira/devstatus/create-review-form-dialog"));;
;
/* module-key = 'com.atlassian.jira.plugins.jira-development-integration-plugin:devstatus-dialog-all-resources', location = 'js/viewissue/dialog/BaseDetailDialogView.js' */
"use strict";define("jira/devstatus/base-detail-dialog-view",["backbone","jquery","underscore","jira-development-status/util/dev-status-local-storage","jira-development-status/util/applinks-utils"],function(t,e,n,i,a){return t.View.extend({frameEvents:{"click .menu-item":"_doTabClick"},frameTemplate:JIRA.Templates.DevStatus.DetailDialogFrame.frame,oauthStatusTemplate:JIRA.Templates.DevStatus.DetailDialog.oauthStatus,authenticationTemplate:JIRA.Templates.DevStatus.DetailDialog.authenticationScreen,connectionProblemTemplate:JIRA.Templates.DevStatus.DetailDialog.connectionProblemScreen,connectionProblemWarningTemplate:JIRA.Templates.DevStatus.connectionProblemAsWarning,noPermissionToViewAllTemplate:JIRA.Templates.DevStatus.DetailDialog.noPermissionToViewAll,oauthDanceFailedTemplate:JIRA.Templates.DevStatus.DetailDialog.oauthDanceFailed,initialize:function(t){this.options=n.defaults({},t,{width:560,model:new JIRA.DevStatus.BaseDetailDialogModel(t)}),this.model=this.options.model,this._initFetchHandlers(),this._initFormDialog()},renderSuccess:function(t,e){return this},shouldRefreshOnTabSwitch:function(t){return!1},getTitle:function(t,e){return console.warn("Unimplemented getTitle() function",this),e},getOAuthMessageInFooter:function(t){return AJS.format("\u041f\u0440\u043e\u0441\u043c\u043e\u0442\u0440 \u0431\u043e\u043b\u0435\u0435 \u043f\u043e\u0434\u0440\u043e\u0431\u043d\u043e\u0439 \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u0438 \u0434\u043e\u0441\u0442\u0443\u043f\u0435\u043d \u043f\u0440\u0438 \u0430\u0432\u0442\u043e\u0440\u0438\u0437\u0430\u0446\u0438\u0438 \u0432 {0,choice,1#\u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u0438|1\u003c\u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u044f\u0445}:",t.length)},getOAuthMessageInCanvas:function(){return "\u0410\u0432\u0442\u043e\u0440\u0438\u0437\u0443\u0439\u0442\u0435\u0441\u044c \u0434\u043b\u044f \u043f\u0440\u043e\u0441\u043c\u043e\u0442\u0440\u0430 \u0441\u0432\u044f\u0437\u0430\u043d\u043d\u043e\u0439 \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u0438 \u043f\u043e \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u043a\u0435"},getConnectionMessageInCanvas:function(){return "\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u043f\u043e\u043b\u0443\u0447\u0438\u0442\u044c \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044e \u043f\u043e \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u043a\u0435"},getNoPermissionToViewAllMessageInCanvas:function(){return "\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u043f\u043e\u043b\u0443\u0447\u0438\u0442\u044c \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044e \u043f\u043e \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u043a\u0435"},getContactAdmistratorsOrLoginMessageInCanvas:function(){return JIRA.Users.LoggedInUser.isAnonymous()?"\u0427\u0442\u043e\u0431\u044b \u043f\u0440\u043e\u0441\u043c\u043e\u0442\u0440\u0435\u0442\u044c \u0431\u043e\u043b\u044c\u0448\u0435 \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u0438, \u043d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u043e \u0430\u0432\u0442\u043e\u0440\u0438\u0437\u043e\u0432\u0430\u0442\u044c\u0441\u044f \u0432 JIRA.":"\u041e\u0431\u0440\u0430\u0442\u0438\u0442\u0435\u0441\u044c \u043a \u0432\u0430\u0448\u0435\u043c\u0443 \u0430\u0434\u043c\u0438\u043d\u0438\u0441\u0442\u0440\u0430\u0442\u043e\u0440\u0443."},hasData:function(t){return t.length>0},show:function(){this.dialog.show()},hide:function(){this.dialog.hide()},_getPane:function(t){return t?this.$el.find("#tab-content-"+t.replace(/(:|\.|\[|\])/g,"\\$1")):e()},getContentContainer:function(t){return this._getPane(t||this._getActiveApplicationType()).find(".detail-content-container")},_doTabClick:function(t){t.preventDefault();var e=this._getActiveApplicationType();i.setItem(this._getTabStorageId(),e),this.model.switchTab(e,this.shouldRefreshOnTabSwitch(e)),this.analytics&&this.analytics.fireDetailTabClicked(e)},_redirectToLoginIf401:function(t){return!(!t||401!==t.status)&&(JIRA.DevStatus.Navigate.redirectToLogin(),!0)},_initFetchHandlers:function(){this.model.on("fetchRequested",this._showLoadingIndicator,this),this.model.on("fetchSucceeded",this._handleFetchSucceeded,this),this.model.on("fetchFailed",this._handleFetchFailed,this)},_handleFetchSucceeded:function(t,e){this._hideLoadingIndicator(t);var n=e.detail&&this.hasData(e.detail);n&&this.renderSuccess(t,e.detail),this._renderError(t,e.errors,n),this._postRender()},_handleFetchFailed:function(t,e){this._hideLoadingIndicator(t),this._redirectToLoginIf401(e)||this._renderError(t,[],!1,!0)},_initAuthenticationCallbacks:function(){this._patchAJSIconsForAppLinks();var t=this,n=function(e,n){t.model.oauthStatusChanged(n.appType),t.model.fetchAuthenticationStatuses(),e.preventDefault()},i=function(t){var e=null;return t.id&&t.appUri&&t.appName&&t.appType&&(e={applicationLinkId:t.id,baseUrl:t.appUri,name:t.appName,type:t.appType}),e},a=function(e,n){var a=[i(e)],o=require("jira-development-status/util/helpers"),s=o.copyAndMarkStringPropertiesAsSanitised(n),r=function(){JIRA.isAdmin()?t._renderConnectionError(t.model._getCurrentApplicationType(),a,{message:s.adminError,details:s.adminErrorDetails}):t._renderConnectionError(t.model._getCurrentApplicationType(),a)},c=function(){t._renderAuthenticationError(t.model._getCurrentApplicationType(),a,[],s.userError)};s.adminError?r():s.userError&&c()},o=function(n,i,o){o&&a(i,o),e.ajax(AJS.contextPath()+"/rest/auth/1/session").promise().fail(function(e){t._redirectToLoginIf401(e)})},s=e(document);s.bind("applinks.auth.approved",n),s.bind("applinks.auth.denied",o),e(this.dialog).bind("Dialog.beforeHide",function(){s.unbind("applinks.auth.approved",n),s.unbind("applinks.auth.denied",o),t.model.off(null,null,t),t.instanceListPopup&&t.instanceListPopup.remove()}),e('<div class="applinks-auth-confirmation-container hidden"></div>').appendTo(this.$el)},_initRemoveInlineDialogsOnDialogClose:function(){e(this.dialog).bind("Dialog.beforeHide",function(){return e(".detail-dialog-tooltip").remove()})},_initFetchAuthenticationHandlers:function(){this.model.on("fetchAuthRequested",this._showLoadingIndicator,this),this.model.on("fetchAuthSucceeded",this._handleAuthSucceeded,this),this.model.on("fetchAuthFailed",this._handleAuthFailed,this)},_handleAuthSucceeded:function(t){var e=n.filter(t,function(t){return t.configured&&!t.authenticated&&t.source&&t.source.applicationLinkId}),i=this._getOAuthStatusDiv();e.length>0&&!JIRA.Users.LoggedInUser.isAnonymous()?(i.html(this.oauthStatusTemplate({message:this.getOAuthMessageInFooter(e)})),this._renderUnauthInstancesInFooter(e),i.show()):i.hide()},_handleAuthFailed:function(t){this._redirectToLoginIf401(t),this._getOAuthStatusDiv().hide()},_renderUnauthInstancesInFooter:function(t){var i=this._getOAuthStatusDiv(),a=n.map(n.pluck(t,"source"),this._createOAuthInstanceDiv);if(a.length>0&&(i.append(a[0]),a.length>1&&(i.append(", "),i.append(a[1]),a.length>2))){i.append(" ");var o=e('<span class="more-instances"><a href="#">'+"... \u0431\u043e\u043b\u044c\u0448\u0435"+"</a></span>");i.append(o);var s=e('<ul class="instance-list"></ul>');n.each(a.slice(2),function(t){s.append(e('<li class="instance-in-popup"></li>').append(t))}),AJS.InlineDialog(o,"instance-list-popup",function(t,e,n){return t.html(s),n(),!1},{width:150,offsetX:-100,onTop:!0})}},_createOAuthInstanceDiv:function(t){var n=a.createAuthRequestInline(null,{id:t.applicationLinkId,authUri:AJS.contextPath()+"/plugins/servlet/applinks/oauth/login-dance/authorize?applicationLinkID="+encodeURIComponent(t.applicationLinkId),appUri:t.baseUrl,appName:t.name,appType:t.type});return e('<span class="instance"></span>').append(n.find("a.applink-authenticate").text(t.name))},_patchAJSIconsForAppLinks:function(){AJS.icons=AJS.icons||{},AJS.icons.addIcon=AJS.icons.addIcon||{},AJS.icons.addIcon.init=AJS.icons.addIcon.init||function(){}},_getOAuthStatusDiv:function(){var t=this.$el.find(".buttons-container .oauth-status");return t.length?t:e('<div class="oauth-status" />').appendTo(this.$el.find(".buttons-container.form-footer"))},_renderError:function(t,e,i,a){var o=n.groupBy(e,function(t){var e=t.error;return"unauthorized"===e||"incapable"===e?e:"others"}),s=n.pluck(o.unauthorized,"instance"),r=n.pluck(o.others,"instance");s.length>0&&this.model.fetchAuthenticationStatuses(),i?r.length>0&&this._renderConnectionErrorBeforeData(t,r):s.length>0?this._renderAuthenticationError(t,s,r):a||r.length>0?this._renderConnectionError(t,r):this._renderNoPermissionToViewAllWarning(t)},_renderConnectionErrorBeforeData:function(t,e){this.getContentContainer(t).prepend(this.connectionProblemWarningTemplate({instances:e,showContactAdminForm:this.options.showContactAdminForm}))},_renderConnectionError:function(t,e,n){this.getContentContainer(t).html(this.connectionProblemTemplate({instances:e,adminError:n,showContactAdminForm:this.options.showContactAdminForm,title:this.getConnectionMessageInCanvas()}))},renderNoPermissionToViewAllWarningAtBottom:function(t,e){var n=this.model.get("tabs")[t]||{},i=this.model.get("contentMap")[t]||{};e<n.count&&(0===(i.errors||[]).length||JIRA.Users.LoggedInUser.isAnonymous())&&this.getContentContainer(t).append(this._getNoPermissionToViewAllHtml())},_getNoPermissionToViewAllHtml:function(){return this.noPermissionToViewAllTemplate({message:this.getNoPermissionToViewAllMessageInCanvas(),secondaryMessage:this.getContactAdmistratorsOrLoginMessageInCanvas()})},_renderNoPermissionToViewAllWarning:function(t){this.getContentContainer(t).html(this._getNoPermissionToViewAllHtml())},_renderAuthenticationError:function(t,e,i,a){var o=this.getContentContainer(t);o.html(this.authenticationTemplate({unauthInstances:e,title:this.getOAuthMessageInCanvas(),otherInstances:i,showContactAdminForm:this.options.showContactAdminForm,userError:a}));var s=n.map(e,this._createOAuthInstanceDiv),r=o.find(".instances");n.each(s,function(t,e){0!==e&&r.append(", "),r.append(t)})},_initFormDialog:function(){var t=this;this.dialog=new JIRA.FormDialog({id:this.options.id,width:this.options.width,content:function(e){t.setElement(this.$popup),t.delegateEvents(n.extend({},t.frameEvents,t.events)),t._renderFrame(),t._initAuthenticationCallbacks(),t._initFetchAuthenticationHandlers(),t.model.fetchAuthenticationStatuses();var a=i.getItem(t._getTabStorageId());t._tabHasContent(a)&&t._activateTab(a),t.model.switchTab(t._getActiveApplicationType()),t._initRemoveInlineDialogsOnDialogClose(),e()},autoClose:!0})},_postRender:function(){this.$el.find(".extra-content-in-title").tooltip(),this.dialog._positionInCenter(),this.$el.find(".active-pane a:eq(0)").focus()},_getActiveApplicationType:function(){return this.$el.find(".menu-item.active-tab").data("applicationType")},_getStorageRef:function(){var t=this.options.issueKey.split("-")[0];return t+"-"+this.options.type},_getTabStorageId:function(){return"stored-tab-"+this._getStorageRef()},_tabHasContent:function(t){return this.$el.find("#tab-menu-"+t).length>0},_activateTab:function(t){this.$el.find(".menu-item.active-tab").toggleClass("active-tab"),this.$el.find(".tabs-pane.active-pane").toggleClass("active-pane"),this.$el.find("#tab-menu-"+t).toggleClass("active-tab"),this.$el.find("#tab-content-"+t).toggleClass("active-pane")},_showLoadingIndicator:function(t){var e=this._getPane(t);e._removeClass("ready"),e.addClass("loading");var n=e.find(".status-loading");n.spin("large"),n.show()},_hideLoadingIndicator:function(t){var e=this._getPane(t);e.addClass("ready");var n=e.find(".status-loading");n&&(e.removeClass("loading"),n.hide(),n.spinStop())},_renderFrame:function(){this.$el.html(this.frameTemplate({title:this.getTitle(this.options.count,this.options.issueKey),tabs:this._convertTabsForSoy(),initialTab:this.options.initialTab})),this.options.height&&this.$el.find(".form-body").css("min-height",this.options.height)},_convertTabsForSoy:function(){return n.chain(this.model.get("tabs")).map(function(t,e){return n.extend({type:e},t)}).sortBy(function(t){return t.type}).value()},_sortReviewsByStatus:function(t){var e=["REVIEW","APPROVAL","SUMMARIZE","REJECTED","CLOSED"];return n.chain(t).filter(function(t){return n.contains(e,t.state)}).sortBy(function(t){return n.indexOf(e,t.state)}).value()}})}),Backbone.define("JIRA.DevStatus.BaseDetailDialogView",require("jira/devstatus/base-detail-dialog-view"));;
;
/* module-key = 'com.atlassian.jira.plugins.jira-development-integration-plugin:devstatus-dialog-all-resources', location = 'js/viewissue/dialog/BaseDetailDialogModel.js' */
"use strict";define("jira/devstatus/base-detail-dialog-model",["backbone","jquery","underscore"],function(t,e,s){return t.Model.extend({TAB_PREFIX:"#tab-menu-",PANE_PREFIX:"#tab-content-",properties:["tabs","contentMap","oauthStatuses","selectedTab","selectedPane"],namedEvents:["fetchRequested","fetchFailed","fetchSucceeded","fetchAuthRequested","fetchAuthFailed","fetchAuthSucceeded"],initialize:function(t){this.issueKey=t.issueKey,this.issueId=t.issueId,this.type=t.dataType,this.set("contentMap",{}),this.set("tabs",t.tabs)},switchTab:function(t,e){this.set("selectedTab",this.TAB_PREFIX+t),this.set("selectedPane",this.PANE_PREFIX+t),(null==this.get("contentMap")[t]||e)&&this._fetchContents(t)},_fetchContents:function(t){this.trigger("fetchRequested",t),this._handleFetch(t,e.ajax({url:AJS.contextPath()+"/rest/dev-status/1.0/issue/detail",data:{issueId:this.issueId,applicationType:t,dataType:this.type}}).promise())},_handleFetch:function(t,e){var s=this;e.done(function(e){s._fireSuccessResult(t,e)}).fail(function(e,i){s._fireFailResult(t,e)})},_fireSuccessResult:function(t,e){this._updateContents(t,e),this.trigger("fetchSucceeded",t,e)},_fireFailResult:function(t,e){this._updateContents(t),this.trigger("fetchFailed",t,e)},_updateContents:function(t,e){this.get("contentMap")[t]=e},fetchAuthenticationStatuses:function(){var t=s.keys(this.get("tabs")||{});if(!s.isEmpty(t)){var i=this;e.ajax({url:AJS.contextPath()+"/rest/dev-status/1.0/provider/auth-status",data:{applicationType:t}}).promise().done(function(t){t&&t.data?(i._updateOAuthStatuses(t.data),i.trigger("fetchAuthSucceeded",t.data)):(i._updateOAuthStatuses(),i.trigger("fetchAuthFailed",null,t))}).fail(function(t,e){i._updateOAuthStatuses(),i.trigger("fetchAuthFailed",t)})}},oauthStatusChanged:function(t){if(s.has(this.get("tabs"),t)){var e=this._getCurrentApplicationType();e===t?this._fetchContents(e):this.get("contentMap")[t]=null}},_getCurrentApplicationType:function(){var t=this.get("selectedTab");return t?t.slice(this.TAB_PREFIX.length):null},_updateOAuthStatuses:function(t){this.set("oauthStatuses",t)}})}),Backbone.define("JIRA.DevStatus.BaseDetailDialogModel",require("jira/devstatus/base-detail-dialog-model"));;
;
/* module-key = 'com.atlassian.jira.plugins.jira-development-integration-plugin:devstatus-dialog-all-resources', location = 'js/viewissue/dialog/build/DetailDialogBuildView.js' */
"use strict";define("jira/devstatus/detail-dialog-build-view",["underscore","jira/devstatus/base-detail-dialog-view"],function(t,e){return e.extend({template:JIRA.Templates.DevStatus.DetailDialog.build,events:{"click a.project-link":"_onClickProjectLink","click a.plan-link":"_onClickPlanLink","click a.build-link":"_onClickBuildLink"},initialize:function(n){this.analytics=JIRA.DevStatus.BuildsAnalytics,e.prototype.initialize.call(this,t.extend({type:"build",width:1e3,height:400},n))},renderSuccess:function(e,n){var i=t.reduce(n,function(t,e){return t.concat(e.projects||[])},[]),a=this.getContentContainer(e);return a.html(this.template({applicationType:e,projects:this.sortProjectsAndPlans(i),hasArtifacts:this.hasArtifacts(i)})),this.renderNoPermissionToViewAllWarningAtBottom(e,this.getBuildCount(i)),JIRA.DevStatus.Date.addTooltip(a),this},getTitle:function(t,e){return AJS.format("{1}: {0} {0,choice,1#\u0441\u0431\u043e\u0440\u043a\u0430|1\u003c\u0441\u0431\u043e\u0440\u043e\u043a)}",t,e)},getOAuthMessageInFooter:function(t){return AJS.format("\u041f\u0440\u043e\u0441\u043c\u043e\u0442\u0440 \u0431\u043e\u043b\u044c\u0448\u0435\u0433\u043e \u043a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u0430 \u0441\u0431\u043e\u0440\u043e\u043a \u0434\u043e\u0441\u0442\u0443\u043f\u0435\u043d \u043f\u0440\u0438 \u0430\u0432\u0442\u043e\u0440\u0438\u0437\u0430\u0446\u0438\u0438 \u0432 {0,choice,1#\u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u0438|1\u003c\u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u044f\u0445}:",t.length)},getOAuthMessageInCanvas:function(){return "\u0410\u0432\u0442\u043e\u0440\u0438\u0437\u0443\u0439\u0442\u0435\u0441\u044c \u0434\u043b\u044f \u043f\u0440\u043e\u0441\u043c\u043e\u0442\u0440\u0430 \u0441\u0432\u044f\u0437\u0430\u043d\u043d\u044b\u0445 \u0441\u0431\u043e\u0440\u043e\u043a"},getConnectionMessageInCanvas:function(){return "\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u043f\u043e\u043b\u0443\u0447\u0438\u0442\u044c \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044e \u043e \u0441\u0431\u043e\u0440\u043a\u0430\u0445"},getNoPermissionToViewAllMessageInCanvas:function(){return "\u041d\u0435\u0442 \u0434\u043e\u0441\u0442\u0443\u043f\u0430 \u043a \u043f\u0440\u043e\u0441\u043c\u043e\u0442\u0440\u0443 \u0432\u0441\u0435\u0445 \u0441\u0432\u044f\u0437\u0430\u043d\u043d\u044b\u0445 \u0441\u0431\u043e\u0440\u043e\u043a."},hasData:function(e){return t.reduce(e,function(t,e){return t.concat(e.projects||[])},[]).length>0},sortProjectsAndPlans:function(e){return e=t.sortBy(e,function(e){return t.last(t.sortBy(e.plans,function(t){return t.build.finishedDate})).build.finishedDate}).reverse(),t.each(e,function(e){e.plans=t.sortBy(e.plans,function(t){return t.build.finishedDate}).reverse()}),e},hasArtifacts:function(e){return t.any(e,function(e){return t.any(e.plans,function(t){return t.build&&t.build.artifacts&&t.build.artifacts.length})})},getBuildCount:function(e){return t.union.apply(null,t.map(e,function(e){return t.pluck(e.plans,"key")})).length},_onClickProjectLink:function(){JIRA.DevStatus.BuildsAnalytics.fireDetailProjectClicked()},_onClickPlanLink:function(){JIRA.DevStatus.BuildsAnalytics.fireDetailPlanClicked()},_onClickBuildLink:function(){JIRA.DevStatus.BuildsAnalytics.fireDetailBuildClicked()}})}),Backbone.define("JIRA.DevStatus.DetailDialogBuildView",require("jira/devstatus/detail-dialog-build-view"));;
;
/* module-key = 'com.atlassian.jira.plugins.jira-development-integration-plugin:devstatus-dialog-all-resources', location = 'js/viewissue/dialog/deployment/DetailDialogDeploymentView.js' */
"use strict";define("jira/devstatus/detail-dialog-deployment-view",["underscore","jira/devstatus/base-detail-dialog-view"],function(e,t){return t.extend({template:JIRA.Templates.DevStatus.DetailDialog.Deployment.deployment,events:{"click a.project-link":"_onClickProjectLink","click a.environment-link":"_onClickEnvironmentLink","click a.release-link":"_onClickReleaseLink"},initialize:function(n){this.analytics=JIRA.DevStatus.DeploymentsAnalytics,t.prototype.initialize.call(this,e.extend({type:"deployment",width:1e3,height:400},n))},renderSuccess:function(t,n){var i=e.reduce(n,function(e,t){return e.concat(t.deploymentProjects||[])},[]),o=this.getContentContainer(t);return o.html(this.template({applicationType:t,deploymentProjects:this.sortProjects(i)})),this.renderNoPermissionToViewAllWarningAtBottom(t,this.getEnvironmentCount(i)),JIRA.DevStatus.Date.addTooltip(o),this},getTitle:function(e,t){return AJS.format("{1}: {0} {0,choice,1#\u0432\u043d\u0435\u0434\u0440\u0435\u043d\u0438\u0435|1\u003c\u0432\u043d\u0435\u0434\u0440\u0435\u043d\u0438\u0439}",e,t)},getOAuthMessageInFooter:function(e){return AJS.format("\u041f\u0440\u043e\u0441\u043c\u043e\u0442\u0440 \u0431\u043e\u043b\u044c\u0448\u0435\u0433\u043e \u043a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u0430 \u0432\u043d\u0435\u0434\u0440\u0435\u043d\u0438\u0439 \u0434\u043e\u0441\u0442\u0443\u043f\u0435\u043d \u043f\u0440\u0438 \u0430\u0432\u0442\u043e\u0440\u0438\u0437\u0430\u0446\u0438\u0438 \u0432 {0,choice,1#\u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u0438|1\u003c\u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u044f\u0445}:",e.length)},getOAuthMessageInCanvas:function(){return "\u0410\u0432\u0442\u043e\u0440\u0438\u0437\u0443\u0439\u0442\u0435\u0441\u044c \u0434\u043b\u044f \u043f\u0440\u043e\u0441\u043c\u043e\u0442\u0440\u0430 \u0441\u0432\u044f\u0437\u0430\u043d\u043d\u044b\u0445 \u0432\u043d\u0435\u0434\u0440\u0435\u043d\u0438\u0439"},getConnectionMessageInCanvas:function(){return "\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u043f\u043e\u043b\u0443\u0447\u0438\u0442\u044c \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044e \u043e \u0432\u043d\u0435\u0434\u0440\u0435\u043d\u0438\u0438"},getNoPermissionToViewAllMessageInCanvas:function(){return "\u041d\u0435\u0442 \u0434\u043e\u0441\u0442\u0443\u043f\u0430 \u043a \u043f\u0440\u043e\u0441\u043c\u043e\u0442\u0440\u0443 \u0432\u0441\u0435\u0445 \u0441\u0432\u044f\u0437\u0430\u043d\u043d\u044b\u0445 \u0432\u043d\u0435\u0434\u0440\u0435\u043d\u0438\u0439."},hasData:function(t){return e.reduce(t,function(e,t){return e.concat(t.deploymentProjects||[])},[]).length>0},sortProjects:function(t){return e.sortBy(t,function(t){return e.last(e.sortBy(t.environments,function(e){return new Date(e.lastDeployed||0).getTime()})).lastDeployed}).reverse()},getEnvironmentCount:function(t){return e.union.apply(null,e.map(t,function(t){return e.pluck(t.environments,"environmentId")})).length},_onClickProjectLink:function(){JIRA.DevStatus.DeploymentsAnalytics.fireDetailProjectClicked()},_onClickEnvironmentLink:function(){JIRA.DevStatus.DeploymentsAnalytics.fireDetailEnvironmentClicked()},_onClickReleaseLink:function(){JIRA.DevStatus.DeploymentsAnalytics.fireDetailReleaseClicked()}})}),Backbone.define("JIRA.DevStatus.DetailDialogDeploymentView",require("jira/devstatus/detail-dialog-deployment-view"));;
;
/* module-key = 'com.atlassian.jira.plugins.jira-development-integration-plugin:devstatus-dialog-all-resources', location = 'js/viewissue/dialog/DetailDialogCommitView.js' */
"use strict";define("jira/devstatus/detail-dialog-commit-view",["jquery","underscore","jira/devstatus/base-detail-dialog-view","jira/util/data/meta"],function(e,t,i,n){return i.extend({template:JIRA.Templates.DevStatus.DetailDialog.commit,events:{"click a.repository-link":"_onClickRepositoryLink","click a.changesetid":"_onClickChangesetId","click .filecount a":"_onClickFiles","click .file-expand a":"_onClickExpand","click .create-review-commit a":"_onClickCreateReview","mouseenter .review-tooltip":"_onHoverReviewsTooltip","click .detail-dialog-tooltip a":"_onClickReview","click .filename a":"_onClickFile"},initialize:function(e){this.analytics=JIRA.DevStatus.CommitsAnalytics,this.issueId=e.issueId;var a,s=n.get("fusion-open-detail-dialog");JIRA.DevStatus.URL.isCreateReviewDetailDialogLink(s)&&(a=JIRA.DevStatus.URL.getCreateReviewDetailDialogApplicationType(s)),i.prototype.initialize.call(this,t.extend({type:"commit",width:1e3,height:400,initialTab:a},e))},concatResults:function(e){return t.reduce(e,function(e,i){var n=i.repositories||[];return t.each(n,function(e){e.showInstance=i._instance&&!i._instance.singleInstance,e.instance=i._instance}),e.concat(n)},[])},_clipEllipsis:function(){function t(e){return e.outerWidth()}this.$el.find(".detail-content-container .file .ellipsis").each(function(i,n){var a=e(n),s=t(a);if(0!=s){var o=a.find("a");if(t(o)>s)for(var r=o.text();t(o)>s;)r=r.slice(1),o.text("…"+r)}})},renderSuccess:function(e,t){var i=this.concatResults(t),n=this.getContentContainer(e);this.transformedRepositories=this.transformRepositories(i);var a=this.setupCreateReviewDialog(this.transformedRepositories);return n.html(this.template({applicationType:e,repositories:this.transformedRepositories,canCreateReview:a})),this.renderNoPermissionToViewAllWarningAtBottom(e,this.getUniqueCommitCount(i)),JIRA.DevStatus.Date.addTooltip(n),this.setupBranchesTooltip(),this.createReviewDialog&&this.createReviewDialog.renderSuccess(),this},setupCreateReviewDialog:function(e){var i=t.chain(e).filter(function(e){return e.showCreateReview}).pluck("instance").value(),a=!1;if(i.length){var s=require("jira/devstatus/create-review-form-dialog");this.createReviewDialog=new s({analytics:this.analytics,applicationType:this._getActiveApplicationType(),issueId:this.issueId,instances:i}),a=!0}var o=n.get("fusion-open-detail-dialog");return JIRA.DevStatus.URL.isCreateReviewDetailDialogLink(o)&&JIRA.DevStatus.URL.getCreateReviewDetailDialogApplicationType(o)===this._getActiveApplicationType()&&(n.set("fusion-open-detail-dialog",void 0),a&&this.createReviewDialog.dialog.show()),a},setupBranchesTooltip:function(){var t=this;e(".branches-link").tooltip({title:function(){var i=t._getCommitDetails(e(this)).branches;return JIRA.DevStatus.CommitsAnalytics.fireDetailBranchesShown(t._getActiveApplicationType()),JIRA.Templates.DevStatus.DetailDialog.branchesTooltip({branchData:i})},html:!0})},getTitle:function(i,n){var a=t.chain(this.model.get("tabs")).map(function(e){return e.count}).reduce(function(e,t){return e+t},0).value(),s=Math.max(a-i,0);return e.trim(AJS.format("{1}: {0} \u0443\u043d\u0438\u043a\u0430\u043b\u044c\u043d\u044b\u0445 {0,choice,1#\u0444\u0438\u043a\u0441\u0430\u0446\u0438\u044f\u20051\u003c\u0444\u0438\u043a\u0441\u0430\u0446\u0438\u0439}{2,choice,0# \u20050\u003c (\u0438 {2} \u0434\u0443\u0431\u043b\u0438\u043a\u0430\u0442\u043e\u0432}",i,n,s))},getOAuthMessageInFooter:function(e){return AJS.format("\u041f\u0440\u043e\u0441\u043c\u043e\u0442\u0440 \u0431\u043e\u043b\u044c\u0448\u0435\u0433\u043e \u043a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u0430 \u0444\u0438\u043a\u0441\u0430\u0446\u0438\u0439 \u0434\u043e\u0441\u0442\u0443\u043f\u0435\u043d \u043f\u0440\u0438 \u0430\u0432\u0442\u043e\u0440\u0438\u0437\u0430\u0446\u0438\u0438 \u0432 {0,choice,1#\u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u0438|1\u003c\u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u044f\u0445}:",e.length)},getOAuthMessageInCanvas:function(){return "\u0410\u0432\u0442\u043e\u0440\u0438\u0437\u0443\u0439\u0442\u0435\u0441\u044c \u0434\u043b\u044f \u043f\u0440\u043e\u0441\u043c\u043e\u0442\u0440\u0430 \u0441\u0432\u044f\u0437\u0430\u043d\u043d\u044b\u0445 \u043a\u043e\u043c\u043c\u0438\u0442\u043e\u0432"},getConnectionMessageInCanvas:function(){return "\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u043f\u043e\u043b\u0443\u0447\u0438\u0442\u044c \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044e \u043e \u043a\u043e\u043c\u043c\u0438\u0442\u0435"},getNoPermissionToViewAllMessageInCanvas:function(){return "\u0423 \u0412\u0430\u0441 \u043d\u0435\u0442 \u043f\u0440\u0430\u0432 \u0434\u043b\u044f \u043f\u0440\u043e\u0441\u043c\u043e\u0442\u0440\u0430 \u0432\u0441\u0435\u0445 \u0441\u0432\u044f\u0437\u0430\u043d\u043d\u044b\u0445 \u043a\u043e\u043c\u043c\u0438\u0442\u043e\u0432."},hasData:function(e){return this.concatResults(e).length>0},transformRepositories:function(e){e=this.sortRepositoriesAndCommits(e);var i=this,n=[["reviews","showReviews"],["branches","showBranches"],["files","showFiles"],["createReviewUrl","showCreateReview"]];return t.each(n,function(t){e=i._setRepositoryFromFromCommitField(e,t[0],t[1])}),e=this.prepareReviews(e)},_setRepositoryFromFromCommitField:function(e,i,n){return t.each(e,function(e){e[n]=null!=t.find(e.commits,function(e){return null!=e[i]})}),e},prepareReviews:function(e){var i=this;return t.each(e,function(e){t.each(e.commits,i._orderCommitReviews,i)}),e},_orderCommitReviews:function(e){e.reviews&&e.reviews.reviews&&(e.reviews.reviews=this._sortReviewsByStatus(e.reviews.reviews))},sortRepositoriesAndCommits:function(e){return e=t.sortBy(e,function(e){return e.name.toLowerCase()}),t.each(e,function(e){e.commits=t.sortBy(e.commits,"authorTimestamp").reverse()}),e},getUniqueCommitCount:function(e){return t.union.apply(null,t.map(e,function(e){return t.filter(t.pluck(e.commits,"id"),function(e){return e})})).length},_getRepoDetails:function(e){return this.transformedRepositories[parseInt(e.parents(".detail-commits-container").data("repository-index"))]},_getCommitDetails:function(e){return this._getRepoDetails(e).commits[parseInt(e.parents("tr").data("commit-index"))]},_onClickRepositoryLink:function(){JIRA.DevStatus.CommitsAnalytics.fireDetailRepoClicked(this._getActiveApplicationType())},_onClickChangesetId:function(){JIRA.DevStatus.CommitsAnalytics.fireDetailCommitClicked(this._getActiveApplicationType())},_onClickExpand:function(t){t.preventDefault();var i=this._getFileExpand(e(t.target));i.toggle(i.getRows())&&JIRA.DevStatus.CommitsAnalytics.fireDetailFilesExpandedClicked(this._getActiveApplicationType()),this._clipEllipsis()},_onClickFiles:function(t){t.preventDefault();var i=this._getFileExpand(e(t.target)).toggle(e(t.target).closest(".commitrow").next(".filerow"));this._clipEllipsis(),i&&JIRA.DevStatus.CommitsAnalytics.fireDetailFileExpandedClicked(this._getActiveApplicationType())},_onClickCreateReview:function(){JIRA.DevStatus.CommitsAnalytics.fireDetailCreateReviewClicked(this._getActiveApplicationType(),!1)},_onClickReview:function(){JIRA.DevStatus.CommitsAnalytics.fireDetailReviewClicked(this._getActiveApplicationType())},_onHoverReviewsTooltip:function(){JIRA.DevStatus.CommitsAnalytics.fireDetailReviewsShown(this._getActiveApplicationType())},_onClickFile:function(){JIRA.DevStatus.CommitsAnalytics.fireDetailFileClicked(this._getActiveApplicationType())},_getFileExpand:function(e){function t(e){return e.length>e.filter(".hidden").length}var i=e.closest(".detail-commits-container");return{getRows:function(){return i.find(".filerow")},toggle:function(e){var i=t(e);return e.toggleClass("hidden",i),this._updateExpandLabel(),!i},_updateExpandLabel:function(){i.find(".file-expand a").text(t(this.getRows())?"\u0421\u043a\u0440\u044b\u0442\u044c \u0444\u0430\u0439\u043b\u044b":"\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u0432\u0441\u0435 \u0444\u0430\u0439\u043b\u044b")}}}})}),Backbone.define("JIRA.DevStatus.DetailDialogCommitView",require("jira/devstatus/detail-dialog-commit-view"));;
;
/* module-key = 'com.atlassian.jira.plugins.jira-development-integration-plugin:devstatus-dialog-all-resources', location = 'js/viewissue/dialog/DetailDialogBranchView.js' */
"use strict";define("jira/devstatus/detail-dialog-branch-view",["jquery","underscore","jira/devstatus/base-detail-dialog-view"],function(t,e,i){return i.extend({template:JIRA.Templates.DevStatus.DetailDialog.branch,STATE_ORDER:["OPEN","MERGED","DECLINED"],events:{"click a.repository-link":"_onClickRepositoryLink","click a.branch-link":"_onClickBranchLink","click a.create-pullrequest-link":"_onClickCreatePullRequestLink","click a.create-review-link":"_onClickCreateReviewLink","mouseenter .pullrequest-tooltip":"_onHoverPullRequestsToolTip","mouseenter .review-tooltip":"_onHoverReviewsToolTip"},initialize:function(t){this.analyticIssueData=t.analyticIssueData||{},this.analytics=JIRA.DevStatus.BranchesAnalytics,i.prototype.initialize.call(this,e.extend({},t,{type:"branch",width:1e3,height:400,dataType:"pullrequest"}))},renderSuccess:function(t,e){var i=this._sortBranchesByName(this._removeWithNoRepos(this._extractAllBranches(e))),n=this._extractAllPullRequests(e);this._populatePullRequestStateByBranch(i,n),this._prepareBranchReviews(i);var a=this._getBranchFeatures(i),s=this._getBranchCount(i),r=this.getContentContainer(t);return s>0?(r.html(this.template({applicationType:t,branches:i,features:a,branchCount:s})),JIRA.DevStatus.Date.addTooltip(r)):r.empty(),this.renderNoPermissionToViewAllWarningAtBottom(t,s),this},getTitle:function(t,e){return AJS.format("{1}: {0} {0,choice,1#\u0432\u0435\u0442\u043a\u0430|1\u003c\u0432\u0435\u0442\u043e\u043a)}",t,e)},getOAuthMessageInFooter:function(t){return AJS.format("\u041f\u0440\u043e\u0441\u043c\u043e\u0442\u0440 \u0431\u043e\u043b\u044c\u0448\u0435\u0433\u043e \u043a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u0430 \u0432\u0435\u0442\u043e\u043a \u0434\u043e\u0441\u0442\u0443\u043f\u0435\u043d \u043f\u0440\u0438 \u0430\u0432\u0442\u043e\u0440\u0438\u0437\u0430\u0446\u0438\u0438 \u0432 {0,choice,1#\u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u0438|1\u003c\u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u044f\u0445}:",t.length)},getOAuthMessageInCanvas:function(){return "\u0410\u0432\u0442\u043e\u0440\u0438\u0437\u0443\u0439\u0442\u0435\u0441\u044c \u0434\u043b\u044f \u043f\u0440\u043e\u0441\u043c\u043e\u0442\u0440\u0430 \u0441\u0432\u044f\u0437\u0430\u043d\u043d\u044b\u0445 \u0432\u0435\u0442\u043e\u043a"},getConnectionMessageInCanvas:function(){return "\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u043f\u043e\u043b\u0443\u0447\u0438\u0442\u044c \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044e \u043e \u0432\u0435\u0442\u043a\u0430\u0445"},getNoPermissionToViewAllMessageInCanvas:function(){return "\u041d\u0435\u0442 \u0434\u043e\u0441\u0442\u0443\u043f\u0430 \u043a \u043f\u0440\u043e\u0441\u043c\u043e\u0442\u0440\u0443 \u0432\u0441\u0435\u0445 \u0441\u0432\u044f\u0437\u0430\u043d\u043d\u044b\u0445 \u0432\u0435\u0442\u043e\u043a."},hasData:function(t){return this._removeWithNoRepos(this._extractAllBranches(t)).length>0},_extractAllBranches:function(t){return e.compact(e.flatten(e.pluck(t,"branches")))},_getBranchFeatures:function(t){return{pullRequests:null!=e.find(t,function(t){return t.createPullRequestUrl||t.pullRequestState&&t.pullRequestState.total}),lastCommitId:null!=e.find(t,function(t){return t.lastCommit&&t.lastCommit.displayId}),lastCommitTimestamp:null!=e.find(t,function(t){return t.lastCommit&&t.lastCommit.authorTimestamp}),reviews:null!=e.find(t,function(t){return t.createReviewUrl||t.reviews&&t.reviews.totalCount})}},_removeWithNoRepos:function(t){return e.filter(t,function(t){return t.repository})},_prepareBranchReviews:function(t){var i=this._sortReviewsByStatus;e.each(t,function(t){t.reviews&&t.reviews.reviews&&(t.reviews.reviews=i(t.reviews.reviews))})},_extractAllPullRequests:function(t){return e.flatten(e.compact(e.pluck(t,"pullRequests")))},_sortBranchesByName:function(t){return e.sortBy(t,function(t){return t.repository.name+t.name})},_onClickRepositoryLink:function(){this.analytics.fireDetailRepoClicked(this._getActiveApplicationType())},_onClickBranchLink:function(){this.analytics.fireDetailBranchClicked(this._getActiveApplicationType())},_onClickCreatePullRequestLink:function(){this.analytics.fireDetailCreatePullRequestClicked(this._getActiveApplicationType(),this.analyticIssueData.isAssignee,this.analyticIssueData.isAssignable)},_onClickCreateReviewLink:function(){this.analytics.fireDetailCreateReviewClicked(this._getActiveApplicationType(),this.analyticIssueData.isAssignee,this.analyticIssueData.isAssignable)},_onHoverPullRequestsToolTip:function(){this.analytics.fireDetailPullRequestLozengeClick(this._getActiveApplicationType())},_onHoverReviewsToolTip:function(){this.analytics.fireDetailReviewLozengeClick(this._getActiveApplicationType())},_getBranchCount:function(t){return t.length},_populatePullRequestStateByBranch:function(t,i){var n=this;return e.each(t,function(t){var a=e.filter(i,function(e){return e.source.url===t.url});t.pullRequestState=n._summarisePullRequestState(a)}),t},_sortPullRequestsByStatus:function(t){return e.sortBy(t,function(t){return("OPEN"===t.status?"2":"MERGED"===t.status?"1":"0")+t.lastUpdated}).reverse()},_getFirstStatusWithCount:function(t){return e.find(this.STATE_ORDER,function(e){return t[e]})},_summarisePullRequestState:function(t){var i=e.groupBy(t,function(t){return t.status});return{status:this._getFirstStatusWithCount(i),data:this._sortPullRequestsByStatus(t),total:e.size(t)}}})}),Backbone.define("JIRA.DevStatus.DetailDialogBranchView",require("jira/devstatus/detail-dialog-branch-view"));;
;
/* module-key = 'com.atlassian.jira.plugins.jira-development-integration-plugin:devstatus-dialog-all-resources', location = 'js/viewissue/dialog/DetailDialogPullRequestView.js' */
"use strict";define("jira/devstatus/detail-dialog-pull-request-view",["underscore","jira/devstatus/base-detail-dialog-view"],function(e,t){return t.extend({template:JIRA.Templates.DevStatus.DetailDialog.pullRequest,events:{"click a.pullrequest-link":"_onClickPullRequestLink"},initialize:function(i){this.analytics=JIRA.DevStatus.PullRequestsAnalytics,t.prototype.initialize.call(this,e.extend({type:"pullrequest",width:1e3,height:400},i))},renderSuccess:function(t,i){var n=this._removeAuthorFromReviewers(this._extractAllPullRequests(i)),s=this._getSortedPullRequestsByDate(n),r=e.size(s),u=this.getContentContainer(t);return r>0?(u.html(this.template({pullRequests:s,pullRequestCount:r,reviewersThreshold:this.options.reviewersThreshold})),JIRA.DevStatus.Date.addTooltip(u)):u.empty(),this.renderNoPermissionToViewAllWarningAtBottom(t,r),this},getTitle:function(e,t){return AJS.format("{1}: {0} {0,choice,1#pull-\u0437\u0430\u043f\u0440\u043e\u0441|1\u003cpull-\u0437\u0430\u043f\u0440\u043e\u0441\u043e\u0432}",e,t)},getOAuthMessageInFooter:function(e){return AJS.format("\u041f\u0440\u043e\u0441\u043c\u043e\u0442\u0440 \u0431\u043e\u043b\u044c\u0448\u0435\u0433\u043e \u043a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u0430 pull-\u0437\u0430\u043f\u0440\u043e\u0441\u043e\u0432 \u0434\u043e\u0441\u0442\u0443\u043f\u0435\u043d \u043f\u0440\u0438 \u0430\u0432\u0442\u043e\u0440\u0438\u0437\u0430\u0446\u0438\u0438 \u0432 {0,choice,1#\u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u0438|1\u003c\u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u044f\u0445}:",e.length)},getOAuthMessageInCanvas:function(){return "\u0410\u0432\u0442\u043e\u0440\u0438\u0437\u0443\u0439\u0442\u0435\u0441\u044c \u0434\u043b\u044f \u043f\u0440\u043e\u0441\u043c\u043e\u0442\u0440\u0430 \u0441\u0432\u044f\u0437\u0430\u043d\u043d\u044b\u0445 pull-\u0437\u0430\u043f\u0440\u043e\u0441\u043e\u0432"},getConnectionMessageInCanvas:function(){return "\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u043f\u043e\u043b\u0443\u0447\u0438\u0442\u044c \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044e pull-\u0437\u0430\u043f\u0440\u043e\u0441\u0430"},getNoPermissionToViewAllMessageInCanvas:function(){return "\u041d\u0435\u0442 \u0434\u043e\u0441\u0442\u0443\u043f\u0430 \u043a \u043f\u0440\u043e\u0441\u043c\u043e\u0442\u0440\u0443 \u0432\u0441\u0435\u0445 \u0441\u0432\u044f\u0437\u0430\u043d\u043d\u044b\u0445 pull-\u0437\u0430\u043f\u0440\u043e\u0441\u043e\u0432."},hasData:function(e){return this._extractAllPullRequests(e).length>0},_extractAllPullRequests:function(t){return e.compact(e.flatten(e.pluck(t,"pullRequests")))},_removeAuthorFromReviewers:function(t){return e.map(t,function(t){if(t.reviewers&&t.author){var i=e.filter(t.reviewers,function(e){return e.name!=t.author.name});if(t.reviewers.length==i.length)return t;var n=e.clone(t);return n.reviewers=i,n}return t})},_sortReviewers:function(t){var i=this.options.reviewersThreshold;e.each(t,function(t,n){e.size(t.reviewers)>0&&(t.reviewers=e.sortBy(e.filter(t.reviewers,function(e){return e.name}),function(e){return e.approved?"0"+e.name:"1"+e.name}),t.reviewers.length>i+1&&(t.extraReviewers=t.reviewers.slice(i)))})},_getSortedPullRequestsByDate:function(t){return this._sortReviewers(t),e.sortBy(t,"lastUpdate").reverse()},_onClickPullRequestLink:function(){this.analytics.fireDetailPullRequestClicked(this._getActiveApplicationType())}})}),Backbone.define("JIRA.DevStatus.DetailDialogPullRequestView",require("jira/devstatus/detail-dialog-pull-request-view"));;
;
/* module-key = 'com.atlassian.jira.plugins.jira-development-integration-plugin:devstatus-dialog-all-resources', location = 'js/viewissue/dialog/DetailDialogReviewView.js' */
"use strict";define("jira/devstatus/detail-dialog-review-view",["underscore","jira/devstatus/base-detail-dialog-view"],function(e,t){return t.extend({template:JIRA.Templates.DevStatus.DetailDialog.review,events:{"click a.review-link":"_onClickReviewLink","click a.comment-link":"_onClickReviewLink"},initialize:function(i){this.analytics=JIRA.DevStatus.ReviewsAnalytics,this.finalStates=["REJECTED","CLOSED"],this.nonFinalStates=["REVIEW","APPROVAL","SUMMARIZE"],this.validStates=e.union(this.finalStates,this.nonFinalStates),t.prototype.initialize.call(this,e.extend({type:"review",width:1e3,height:400},i))},_updateReviewers:function(t){return t.reviewers=e.chain(t.reviewers).filter(function(i){return!(i&&t.author&&t.author.name&&i.name)||!e.isEqual(i.name,t.author.name)}).sortBy(function(e){return(e.complete?"0":"1")+e.name}).map(function(e){return e.approved=e.complete,e}).value(),t.moderator&&!e.isEqual(t.moderator,t.author)&&(t.reviewers=[e.extend(t.moderator,{name:"\u041c\u043e\u0434\u0435\u0440\u0430\u0442\u043e\u0440:"+" "+t.moderator.name})].concat(t.reviewers)),t},_updateReview:function(t){return function(i){return i.state&&i.dueDate&&e.contains(t,i.state)&&delete i.dueDate,i.dueDate&&moment(i.dueDate).isBefore(moment())&&(i.overDue=!0),i}},_addExtraReviewers:function(e){return function(t){return t.reviewers&&(t.extraReviewers=t.reviewers.slice(e)),t}},_reviewCompare:function(e,t){return e.dueDate&&!t.dueDate?-1:!e.dueDate&&t.dueDate?1:e.dueDate&&t.dueDate?e.dueDate.localeCompare(t.dueDate):e.lastModified&&t.lastModified?t.lastModified.localeCompare(e.lastModified):0},_mergeInstanceData:function(e,t){return e.concat(t.reviews||[])},_prepareReviews:function(t){var i=this;return e.chain(t).reduce(this._mergeInstanceData,[]).filter(function(t){return t.state=t.state&&t.state.toUpperCase(),e.contains(i.validStates,t.state)}).map(e.compose(this._addExtraReviewers(this.options.reviewersThreshold),this._updateReviewers,this._updateReview(this.finalStates))).sort(this._reviewCompare).value()},renderSuccess:function(e,t){var i=this._prepareReviews(t),a=this.getContentContainer(e);return i.length>0?(a.html(this.template({applicationType:e,reviews:i,reviewersThreshold:this.options.reviewersThreshold})),JIRA.DevStatus.Date.addTooltip(a)):a.empty(),this.renderNoPermissionToViewAllWarningAtBottom(e,i.length),this},getTitle:function(e,t){return AJS.format("{1}: {0} {0,choice,1#\u0440\u0430\u0441\u0441\u043c\u043e\u0442\u0440\u0435\u043d\u0438\u0435|1\u003c\u0440\u0430\u0441\u0441\u043c\u043e\u0442\u0440\u0435\u043d\u0438\u0439}",e,t)},getNoPermissionToViewAllMessageInCanvas:function(){return "\u041d\u0435\u0442 \u0434\u043e\u0441\u0442\u0443\u043f\u0430 \u043a \u043f\u0440\u043e\u0441\u043c\u043e\u0442\u0440\u0443 \u0432\u0441\u0435\u0445 \u0441\u0432\u044f\u0437\u0430\u043d\u043d\u044b\u0445 \u0440\u0430\u0441\u0441\u043c\u043e\u0442\u0440\u0435\u043d\u0438\u0439."},getOAuthMessageInCanvas:function(){return "\u0410\u0432\u0442\u043e\u0440\u0438\u0437\u0443\u0439\u0442\u0435\u0441\u044c \u0434\u043b\u044f \u043f\u0440\u043e\u0441\u043c\u043e\u0442\u0440\u0430 \u0441\u0432\u044f\u0437\u0430\u043d\u043d\u044b\u0445 \u0440\u0430\u0441\u0441\u043c\u043e\u0442\u0440\u0435\u043d\u0438\u0439"},getOAuthMessageInFooter:function(e){return AJS.format("\u041f\u0440\u043e\u0441\u043c\u043e\u0442\u0440 \u0431\u043e\u043b\u044c\u0448\u0435\u0433\u043e \u043a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u0430 \u0440\u0430\u0441\u0441\u043c\u043e\u0442\u0440\u0435\u043d\u0438\u0439 \u0434\u043e\u0441\u0442\u0443\u043f\u0435\u043d \u043f\u0440\u0438 \u0430\u0432\u0442\u043e\u0440\u0438\u0437\u0430\u0446\u0438\u0438 \u0432 {0,choice,1#\u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u0438|1\u003c\u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u044f\u0445}:",e.length)},getConnectionMessageInCanvas:function(){return "\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u043f\u043e\u043b\u0443\u0447\u0438\u0442\u044c \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044e \u043f\u043e \u0440\u0430\u0441\u0441\u043c\u043e\u0442\u0440\u0435\u043d\u0438\u044f\u043c"},hasData:function(t){return e.flatten(e.pluck(t,"reviews"),!0).length>0},_onClickReviewLink:function(){this.analytics.fireDetailReviewClicked()}})}),Backbone.define("JIRA.DevStatus.DetailDialogReviewView",require("jira/devstatus/detail-dialog-review-view"));;