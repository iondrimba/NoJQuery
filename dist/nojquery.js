!function(root,factory){"object"==typeof exports?module.exports=factory():"function"==typeof define&&define.amd?define([],function(){return root.NoJQuery=factory()}):root.NoJQuery=factory()}(this,function(){"use strict";function parseHTML(html){var content,nodes,t=document.createElement("template");return t.innerHTML=html,content=t.content||t.firstChild,nodes=content.cloneNode(!0)}function isString(selector){var result="string"==typeof selector;return result}function NoJQuery(){return this.elmts=[],this.length=0,this.currentSelector="",this.previousElmt,this.previousObject,function(selector){return this.currentSelector="",isString(selector)?this.find(selector):this.elmts.push(selector),this.length=this.elmts.length,this}.bind(this)}return NoJQuery.prototype.find=function(selector){var total=0,nodes=[],i=0;try{for(this.currentSelector+=" "+selector,nodes=document.querySelectorAll(this.currentSelector),total=nodes.length,total?(this.previousElmt=this.elmts,this.elmts=[],this.length=total):(this.previousElmt=[],this.length=0),i;total>i;i++)this.elmts[i]=nodes[i]}catch(err){throw new Error("find:: "+err.message)}return this},NoJQuery.prototype.each=function(callback){Array.prototype.forEach.call(this.elmts,function(el,i){callback(el,i)})},NoJQuery.prototype.addClass=function(className){var total=0,i=0;try{for(total=this.elmts.length,i;total>i;i++)this.elmts[i].classList&&this.elmts[i].classList.contains?this.elmts[i].classList.add(className):this.elmts[i].className+=" "+className}catch(err){throw new Error("addClass:: "+err.message)}return this},NoJQuery.prototype.hasClass=function(className){var result=!1,total=0,i=0;try{for(total=this.elmts.length,i;total>i;i++)result=this.elmts[i].classList&&this.elmts[i].classList.contains?this.elmts[i].classList.contains(className):new RegExp("(^| )"+className+"( |$)","gi").test(this.elmts[i].className)}catch(err){throw new Error("hasClass:: "+err.message)}return result},NoJQuery.prototype.removeClass=function(className){var total=0,i=0;try{for(total=this.elmts.length,i;total>i;i++)this.elmts[i].classList&&this.elmts[i].classList.remove?this.elmts[i].classList.remove(className):this.elmts[i].className=this.elmts[i].className.replace(new RegExp("(^|\\b)"+className.split(" ").join("|")+"(\\b|$)","gi")," ")}catch(err){throw new Error("removeClass:: "+err.message)}return this},NoJQuery.prototype.contains=function(selector){var result={},total=0,i=0;try{for(total=this.elmts.length,i;total>i;i++)if(result=this.elmts[i].querySelector(selector)){this.length=1;break}}catch(err){throw new Error("contains:: "+err.message)}return result},NoJQuery.prototype.empty=function(){var total=0,i=0;try{for(total=this.elmts.length,i;total>i;i++)this.elmts[i].innerHTML=""}catch(err){throw new Error("empty:: "+err.message)}return this},NoJQuery.prototype.text=function(string){var total=0,i=0,result="";try{for(total=this.elmts.length,i;total>i;i++)string&&string.length>0?this.elmts[i].textContent=string:result+=this.elmts[i].textContent}catch(err){throw new Error("text:: "+err.message)}return string?this:result},NoJQuery.prototype.html=function(string){var total=0,i=0;try{for(total=this.elmts.length,i;total>i;i++)this.elmts[i].innerHTML=string}catch(err){throw new Error("html:: "+err.message)}return this},NoJQuery.prototype.getAttr=function(attr){var total=0,i=0,result="";try{for(total=1,i;total>i;i++)result=this.elmts[i].getAttribute(attr)}catch(err){throw new Error("getAttr:: "+err.message)}return result},NoJQuery.prototype.setAttr=function(attr,val){var total=0,i=0;try{for(total=this.elmts.length,i;total>i;i++)this.elmts[i].setAttribute(attr,val)}catch(err){throw new Error("setAttr:: "+err.message)}return this},NoJQuery.prototype.remove=function(elmt){var total=0,i=0,elmt={},removed=[];try{for(total=this.elmts.length,i;total>i;i++)elmt=this.elmts[i],elmt.parentNode.removeChild(elmt),removed[i]=elmt}catch(err){throw new Error("remove:: "+err.message)}return this.previousElmt=[],this.length=0,removed},NoJQuery.prototype.removeAttr=function(attr){var total=0,i=0,elmt={};try{for(total=this.elmts.length,i;total>i;i++)elmt=this.elmts[i],elmt.removeAttribute(attr)}catch(err){throw new Error("removeAttr:: "+err.message)}return this},NoJQuery.prototype.prev=function(elmt){var total=0,i=0;try{for(total=this.elmts.length,i;total>i;i++)this.elmts[i]=this.elmts[i].previousElementSibling}catch(err){console.error("prev::",err)}return this},NoJQuery.prototype.next=function(){var total=0,i=0;try{for(total=this.elmts.length,i;total>i;i++)this.elmts[i]=this.elmts[i].nextElementSibling}catch(err){throw new Error("next:: "+err.message)}return this},NoJQuery.prototype.append=function(el){var node,textNode,total=0,i=0;try{for(total=this.previousElmt.length,textNode=isString(el),textNode===!1&&(node=el.elmts[0]),i;total>i;i++)textNode?this.html(el):(this.previousElmt[i].appendChild(node),node=el.elmts[0].cloneNode(!0))}catch(err){console.error("append::",err)}return this},NoJQuery.prototype.prepend=function(el){var node,textNode,parent,total=0,i=0;try{for(total=this.previousElmt.length,textNode=isString(el),textNode===!1&&(node=el.elmts[0]),i;total>i;i++)textNode?(parent=this.elmts[i].parentNode||this.elmts[i].parent,node=parseHTML(el),parent.insertBefore(node,parent.firstChild)):(parent=this.previousElmt[i].parentNode||this.previousElmt[i].parent,parent.insertBefore(node,parent.firstChild),node=el.elmts[0].cloneNode(!0))}catch(err){console.error("prepend::",err)}return this},NoJQuery.prototype.on=function(eventName,eventHandler){var total=0,i=0;try{for(total=this.elmts.length,i;total>i;i++)this.elmts[i][eventName]=eventHandler,this.elmts[i].addEventListener(eventName,this.elmts[i][eventName],!1)}catch(err){console.log("on::",err)}return this},NoJQuery.prototype.off=function(eventName,eventHandler){var total=0,i=0;try{for(total=this.elmts.length,i=0;total>i;i++)this.elmts[i].removeEventListener(eventName,this.elmts[i][eventName],!1),this.elmts[i][eventName]=null}catch(err){console.log("off::",err)}return this},new NoJQuery});