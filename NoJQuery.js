﻿define([], function() {
    'use strict';
    var NoJQuery = {
        elmts: [],
        ajax: {
            getJson: function ajaxGet(url, onSuccess, onError) {
                var request = new XMLHttpRequest(),
                    dataSuccess,
                    dataError;

                request.open('GET', url, true);

                request.onload = function onload(evt) {
                    var options = {};
                    options.evt = evt;
                    options.request = request;
                    options.onSuccess = onSuccess;
                    options.onError = onError;
                    options.dataSuccess = dataSuccess;
                    options.dataError = dataError;

                    NoJQuery.ajax.jsonRequestOnLoad(options);
                };
                request.onerror = function onerror() {
                    onError();
                };
                request.send();
            },
            postJson: function ajaxPost(url, data, onSuccess, onError) {
                var request = new XMLHttpRequest(),
                    dataSuccess,
                    dataError;

                request.open('POST', url, true);
                request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
                request.onload = function onload(evt) {
                    var options = {};
                    options.evt = evt;
                    options.request = request;
                    options.onSuccess = onSuccess;
                    options.onError = onError;
                    options.dataSuccess = dataSuccess;
                    options.dataError = dataError;

                    NoJQuery.ajax.jsonRequestOnLoad(options);
                };
                request.onerror = function onerror() {
                    onError();
                };
                request.send(data);
            },
            get: function ajaxGet(url, onSuccess, onError) {
                var request = new XMLHttpRequest(),
                    dataSuccess,
                    dataError;

                request.open('GET', url, true);

                request.onload = function onload(evt) {
                    var options = {};
                    options.evt = evt;
                    options.request = request;
                    options.onSuccess = onSuccess;
                    options.onError = onError;
                    options.dataSuccess = dataSuccess;
                    options.dataError = dataError;

                    NoJQuery.ajax.requestOnLoad(options);
                };
                request.onerror = function onerror() {
                    onError();
                };
                request.send();
            },
            onLoad: function(options, returnData) {
                if (options.request.status >= 200 && options.request.status < 400) {
                    options.dataSuccess = returnData;
                    options.onSuccess(options.dataSuccess);
                } else {
                    options.dataError = {
                        message: options.evt.currentTarget.responseURL + ' - ' + options.evt.currentTarget.statusText,
                        statusText: options.evt.currentTarget.statusText,
                        responseURL: options.evt.currentTarget.responseURL,
                        status: options.evt.currentTarget.status
                    };
                    options.onError();
                }
            },
            jsonRequestOnLoad: function(options) {
                NoJQuery.ajax.onLoad(options, JSON.parse(options.request.responseText));
            },
            requestOnLoad: function(options) {
                NoJQuery.ajax.onLoad(options, options.request.responseText);
            }
        },
        select: function(selector) {
            return this.find(selector);
        },
        find: function(selector) {
            var elmts = document.querySelectorAll(selector);
            this.elmts = elmts;
            return this;
        },
        closestParent: function(child, className) {
            if (!child || child === document) {
                return null;
            }
            if (child.classList.contains(className)) {
                return child;
            } else {
                return NoJQuery.closestParent(child.parentNode, className);
            }
        },
        on: function(eventName, eventHandler) {
            var total = this.elmts.length,
                i = 0;
            for (i; i < total; i++) {
                this.elmts[i].addEventListener(eventName, eventHandler, false);
            }

            return this;
        },
        off: function(eventName, eventHandler) {
            var total = this.elmts.length,
                i = 0;
            for (i; i < total; i++) {
                this.elmts[i].removeEventListener(eventName, eventHandler, false);
                console.log(this.elmts[i]);
            }

            return this;
        },
        addClass: function(className) {
            var total = this.elmts.length,
                i = 0;
            for (i; i < total; i++) {
                if (this.elmts[i].classList) {
                    this.elmts[i].classList.add(className);
                } else {
                    this.elmts[i].className += ' ' + className;
                }
            }

            return this;
        },
        hasClass: function(className) {
            var result = false;
            var total = this.elmts.length,
                i = 0;
            for (i; i < total; i++) {
                if (this.elmts[i].classList) {
                    result = this.elmts[i].classList.contains(className);
                } else {
                    result = new RegExp('(^| )' + className + '( |$)', 'gi').test(this.elmts[i].className);
                }
            }

            return result;
        },
        removeClass: function(className) {
            var total = this.elmts.length,
                i = 0;
            for (i; i < total; i++) {
                if (this.elmts[i].classList) {
                    this.elmts[i].classList.remove(className);
                } else {
                    this.elmts[i].className = this.elmts[i].className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
                }
            }

            return this;
        },
        redraw: function(elmt) {
            elmt.offsetHeight;
        },
        containsSelector: function(elmt, selector) {
            var result = elmt.querySelector(selector) !== null;
            return result;
        },
        each: function(selector, eachFunc) {
            var elmts = document.querySelectorAll(selector);
            Array.prototype.forEach.call(elmts, function(el, i) {
                eachFunc(el, i);
            });
        },
        empty: function(elmt) {
            elmt.innerHTML = '';
        },
        getAttr: function(elmt, attr) {
            var result = elmt.getAttribute(attr);
            return result;
        },
        setAttr: function(elmt, attr, val) {
            elmt.setAttribute(attr, val);
        },
        remove: function(elmt) {
            elmt.parentNode.removeChild(NoJQuery.elmt);
        },
        prev: function(elmt) {
            var prevElmt = elmt.previousElementSibling;
            return prevElmt;
        },
        next: function(elmt) {
            var nextElmt = elmt.nextElementSibling;
            return nextElmt;
        },
        proxy: function(fn, context) {
            fn.bind(context);
        },
        html: function(elmt, string) {
            elmt.innerHTML = string;
        },
        text: function(elmt, string) {
            elmt.textContent = string;
        },
        append: function(elmt, el) {
            elmt.appendChild(el);
        },
        prepend: function(elmt, el) {
            var parent = elmt;
            parent.insertBefore(el, parent.firstChild);
        },
        parseHtml: function(str) {
            var tmp = document.implementation.createHTMLDocument();
            tmp.body.innerHTML = str;
            return tmp.body.children;
        }
    };

    return NoJQuery;
});