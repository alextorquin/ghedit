var __extends=this&&this.__extends||function(t,e){function n(){this.constructor=t}for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i]);t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)},__decorate=this&&this.__decorate||function(t,e,n,i){var u,o=arguments.length,s=o<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,n,i);else for(var p=t.length-1;p>=0;p--)(u=t[p])&&(s=(o<3?u(s):o>3?u(e,n,s):u(e,n))||s);return o>3&&s&&Object.defineProperty(e,n,s),s},__param=this&&this.__param||function(t,e){return function(n,i){e(n,i,t)}};define(["require","exports","vs/nls","vs/base/common/lifecycle","vs/base/common/strings","vs/base/common/async","vs/workbench/common/editor/stringEditorInput","vs/workbench/parts/output/common/output","vs/platform/instantiation/common/instantiation","vs/platform/event/common/event","vs/workbench/common/events","vs/workbench/services/panel/common/panelService"],function(t,e,n,i,u,o,s,p,r,c,a,h){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";var l=function(t){function e(i,u,s,r,c){var h=this;t.call(this,n.localize("output","Output"),i?n.localize("outputChannel","for '{0}'",i.label):"","",p.OUTPUT_MIME,!0,u),this.outputChannel=i,this.outputService=s,this.panelService=r,this.eventService=c,this.bufferedOutput="",this.toDispose=[],this.toDispose.push(this.outputService.onOutput(this.onOutputReceived,this)),this.toDispose.push(this.outputService.onActiveOutputChannel(function(){return h.scheduleOutputAppend()})),this.toDispose.push(this.eventService.addListener2(a.EventType.COMPOSITE_OPENED,function(t){t.compositeId===p.OUTPUT_PANEL_ID&&h.appendOutput()})),this.appendOutputScheduler=new o.RunOnceScheduler(function(){h.isVisible()&&h.appendOutput()},e.OUTPUT_DELAY)}return __extends(e,t),e.getInstances=function(){return Object.keys(e.instances).map(function(t){return e.instances[t]})},e.getInstance=function(t,n){return e.instances[n.id]?e.instances[n.id]:(e.instances[n.id]=t.createInstance(e,n),e.instances[n.id])},e.prototype.appendOutput=function(){this.value.length+this.bufferedOutput.length>p.MAX_OUTPUT_LENGTH?this.setValue(this.outputChannel.output):this.append(this.bufferedOutput),this.bufferedOutput="";var t=this.panelService.getActivePanel();t.revealLastLine()},e.prototype.onOutputReceived=function(t){this.outputSet&&t.channelId===this.outputChannel.id&&(t.output?(this.bufferedOutput=u.appendWithLimit(this.bufferedOutput,t.output,p.MAX_OUTPUT_LENGTH),this.scheduleOutputAppend()):null===t.output&&this.clearValue())},e.prototype.isVisible=function(){var t=this.panelService.getActivePanel();return t&&t.getId()===p.OUTPUT_PANEL_ID&&this.outputService.getActiveChannel().id===this.outputChannel.id},e.prototype.scheduleOutputAppend=function(){this.isVisible()&&this.bufferedOutput&&!this.appendOutputScheduler.isScheduled()&&this.appendOutputScheduler.schedule()},e.prototype.getTypeId=function(){return p.OUTPUT_EDITOR_INPUT_ID},e.prototype.resolve=function(e){var n=this;return t.prototype.resolve.call(this,e).then(function(t){return n.outputSet?t:(n.setValue(n.outputChannel.output),n.outputSet=!0,t)})},e.prototype.matches=function(n){if(n instanceof e){var i=n;if(i.outputChannel.id===this.outputChannel.id)return t.prototype.matches.call(this,n)}return!1},e.prototype.dispose=function(){this.appendOutputScheduler.dispose(),this.toDispose=i.dispose(this.toDispose),t.prototype.dispose.call(this)},e.OUTPUT_DELAY=300,e.instances=Object.create(null),e=__decorate([__param(1,r.IInstantiationService),__param(2,p.IOutputService),__param(3,h.IPanelService),__param(4,c.IEventService)],e)}(s.StringEditorInput);e.OutputEditorInput=l});