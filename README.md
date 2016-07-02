[![Build status](https://img.shields.io/travis/futagoza/ePEG.js.svg)](https://travis-ci.org/futagoza/ePEG.js)
[![npm version](https://img.shields.io/npm/v/epegjs.svg)](https://www.npmjs.com/package/epegjs)
[![dependencies](https://img.shields.io/david/futagoza/ePEG.js.svg)](https://david-dm.org/futagoza/ePEG.js)
[![devDependencies](https://img.shields.io/david/dev/futagoza/ePEG.js.svg)](https://david-dm.org/futagoza/ePEG.js#info=devDependencies)
[![License](https://img.shields.io/badge/license-mit-blue.svg)](https://opensource.org/licenses/MIT)

# about ePEG.js

ePEG.js (Extended PEG.js) is an extension of [PEG.js](https://github.com/pegjs/pegjs) made for Node.js 4 and above.

It adds a number of syntax extensions and compiler passes that enable the following features:

* `[TODO]` Include statements (`@include ...`) for local grammar files
* `[TODO]` Import statements (`@import ...`) for Node.js modules that contain grammar files
* `[TODO]` Template rules (`rule<T> = ... b:T ...`) to avoid repeated PEG.js grammar
* `[TODO]` Optional ECMAScript 2015+ transformers (Babel 6 or Buble) for `.pegjs` files
* `[TODO]` Optional CoffeeScript transformer for `.pegcoffee` files
* `[TODO]` Optional AST generator for rules with titled sequence's but no code blocks

# install

###### to use as a command line tool

```shell
npm install -g epegjs
```

###### to use as a node.js module

```shell
npm install --save-dev epegjs
```

# license

Released under the MIT License, [http://opensource.org/licenses/MIT](http://opensource.org/licenses/MIT).

[PEG.js](https://github.com/pegjs/pegjs) is developed by [David Majda](http://majda.cz/) ([@dmajda](http://twitter.com/dmajda)).

[ePEG.js](https://github.com/futagoza/ePEG.js) is developed by [Futago-za Ryuu](https://github.com/futagoza).
