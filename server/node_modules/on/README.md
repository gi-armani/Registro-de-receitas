Custom event system for JavaScript, inspired by [JS-Signals](http://millermedeiros.github.com/js-signals/).

on.js differs from Signals in that it has slighly fewer features (by design) and encourages a slighly different interface. See "Why another Event Library" below for why this library exists and why you might use it. 

Installing
----------

To install using [NPM](http://npmjs.org/):

    npm install on

To install using [Jam](http://jamjs.org/)

    jam install on

To use in a browser with an [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD) loader (e.g. [RequireJS](http://requirejs.org/)), download one of the following releases:

* [Minified with module ID](https://github.com/downloads/usenode/on.js/on.named.js) (recommended)
* [Minified without module ID](https://github.com/downloads/usenode/on.js/on.js)

Unminified versions are provided for debugging purposes:

* [Unminified with module ID](https://github.com/downloads/usenode/on.js/on.named.debug.js)
* [Unminified without module ID](https://github.com/downloads/usenode/on.js/on.debug.js)

If you're unlucky enough to be directly writing script tags to load JavaScript, you can use the following to load on.js:

* [Minified](https://github.com/downloads/usenode/on.js/on.global.js)
* [Unminified](https://github.com/downloads/usenode/on.js/on.global.debug.js)

Loading on.js
-------------

### ...in a Browser (AMD) ###

If you are using an [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD) loader (like [RequireJS](http://requirejs.org/)), use the AMD version of on.js as follows:

    define(['on'], function (on) {
        // use on in the definition of your module
    });

### ...in a Server (e.g. Node.JS) ###

If you are using a system that can load [CommonJS modules](http://www.commonjs.org/specs/modules/1.0/) (e.g. [Node.JS](http://nodejs.org/)), use the CommonJS version of on.js as follows:
 
    var on = require('on');

Using on.js
-----------

on.js is designed to allow objects to publish events that can be subscribed to by one or more interested parties. The recommend way to publish an event is to use `on` within an object's prototype function:

    var Safe = function () {
        this.onOpen = on(this);
    };

Users of your objects can subscribe to events as follows:

    var safe = new Safe;
    safe.onOpen(function () {
        // this === safe
    });

To fire an event, use the `_fire` method on the event emitter:

    Safe.prototype.open = function () {
        this.onOpen._fire();
    });

This will result in all registered listeners being called in the order that they were added.

### Passing Data to Listeners ###

Any parameters you pass to the `_fire` function are passed into each of the event listeners:

    // in the publisher:
    this.onOpen._fire(1, 2);

    // in the subscriber
    safe.onOpen(function (a, b) {
        // a === 1, b === 2
    });

### Overriding the Invocant ###

A common pattern is to have one object subscribe to events on another. In the callback function, it is convenient be be able to maintain the value of `this` in the surrounding scope. You can override the object that the callback is invoked on (the invocant) by passing a second parameter to `onOpen` (or whatever your emitter function is called):

    var outside = this;
    safe.onOpen(function () {
        // outside === this
    }, this);

### Removing a Listener ###

To remove a listener, use the function returned from `onOpen` (or whatever your emitter function is called):

    var canceller = safe.onOpen(function () {
        // one-time only event
        canceller();
    });

### Removing all Listeners ###

It may be necessary to remove all listeners attached to an object. To do this, use the `_removeAll` method on `onOpen` (or whatever your emitter is called):

    safe.prototype.destroy = function () {
        this.onOpen._removeAll();
    };

### What About Encapsulation? ###

If you'd prefer not to let your subscribers fire events and remove listeners, you can move the `_fire` and `_removeAll` methods (they work fine as direct function calls):

    var Safe = function () {
        this.onOpen = on(this);
        
        var _fire = this.onOpen._fire;
        delete this.onOpen._fire;
        
        var _removeAll = this.onOpen._removeAll;
        delete this.onOpen._removeAll;
        
        // use _fire and _removeAll as appropriate
    };

### What About Dependency Injection? ###

In general publishers are not dependent on subscribers but subscribers are dependent on publishers (sounds obvious). For testability therefore, you should make sure that publishers that you are subscribing to can be injected.

### What About Feature X? ###

An explicit design goal of on.js is to be as light as possible, removing all extraneous features and staying as small as possible. on.js will never add support for dealing with browser events, or add many other features - expect to see few releases unless there are bugfixes.

Why Another Event Library?
--------------------------

I really like the design of [JS-Signals](http://millermedeiros.github.com/js-signals/). I have been a proponent of that library where I work, encouraging its successful adoption.

On the other hand, I'm not so keen on the recommended naming convention (naming the event in the past tense - e.g. "canceled"), prefering a more familiar (at least to those who cut their teeth on the client-side) "on" prefix with present tense event name. I can live with this for modules I use, but am not keen on it for interfaces I provide. The other design goals of on.js are strict feature minimalism and a succinct interface.

If these tradeoffs suit you then use on.js. Otherwise [JS-Signals](http://millermedeiros.github.com/js-signals/) is an excellent library and I would recommend it.

License
-------

The MIT License (MIT)

Copyright (C) 2013 by <a href="https://github.com/tomyan/on.js/commits/master">the project's contributors</a>.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


