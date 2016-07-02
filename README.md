[![Build status](https://img.shields.io/travis/pegjs/pegjs.svg)](https://travis-ci.org/pegjs/pegjs)
[![npm version](https://img.shields.io/npm/v/pegjs-dev.svg)](https://www.npmjs.com/package/pegjs-dev)
[![Bower version](https://img.shields.io/bower/v/pegjs.svg)](https://github.com/pegjs/bower)
[![License](https://img.shields.io/badge/license-mit-blue.svg)](https://opensource.org/licenses/MIT)

# about pegjs-ee

PEG.js, Extend Edition, is an extension of [PEG.js](https://github.com/pegjs/pegjs) made exclusively for Node.js 4 and above.

It adds a number of syntax extensions and compiler passes that enable the following features:

* Include statements (`@include ...`) for local grammar files
* Import statements (`@import ...`) for Node.js modules that contain grammar files
* Template rules (`rule<T> = ... b:T ...`) to avoid repeated PEG.js grammar
* Optional ECMAScript 2015+ transformers (Babel 6 or Buble) for `.pegjs` files
* Optional CoffeeScript transformer for `.pegcoffee` files
* Optional AST generator for rules with titled sequence's but no code blocks

# install

###### to use as a command line tool

```shell
npm install -g pegjs-ee
```

###### to use as a node.js module

```shell
npm install --save-dev pegjs-ee
```

# license

Released under the MIT License, [http://opensource.org/licenses/MIT](http://opensource.org/licenses/MIT).

[PEG.js](https://github.com/pegjs/pegjs) is developed by [David Majda](http://majda.cz/) ([@dmajda](http://twitter.com/dmajda)).

PEG.js, Extend Edition is developed by [Futago-za Ryuu](https://github.com/futagoza).
