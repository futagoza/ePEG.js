[![Build status](https://img.shields.io/travis/futagoza/ePEG.js.svg)](https://travis-ci.org/futagoza/ePEG.js)
[![npm version](https://img.shields.io/npm/v/epeg.js.svg)](https://www.npmjs.com/package/epeg.js)
[![dependencies](https://img.shields.io/david/futagoza/ePEG.js.svg)](https://david-dm.org/futagoza/ePEG.js)
[![devDependencies](https://img.shields.io/david/dev/futagoza/ePEG.js.svg)](https://david-dm.org/futagoza/ePEG.js#info=devDependencies)
[![License](https://img.shields.io/badge/license-mit-blue.svg)](https://opensource.org/licenses/MIT)

# about ePEG.js

ePEG.js (Extended PEG.js) is an extension of [PEG.js](https://github.com/pegjs/pegjs) made for Node.js 4 and above.

# install

###### to use as a command line tool

```shell
npm install -g epeg.js
```

###### to use as a node.js module

```shell
npm install --save-dev epeg.js
```

# features & changes

###### command line (via `epeg [options] <files ...>`)

* Multi file glob support via command line only
* Support for `-f, --format <mode>`, mode being `umd` or `bare`
* Verbose logging if `--verbose` is passed to ePeg.js

###### core changes (via `var epeg = require('epeg.js')`)

ePeg.js adds a number of optional syntax extensions and/or compiler passes via plugins that enable the following (all available as exported plugins):

* Multi file support via `epeg.generate(input, { files: [...] })` _(no glob support)_
* Include statements (`@include ...`) for local grammar files
* Import statements (`@import ...`) for Node.js modules that contain grammar files
* Template rules (`rule<T> = ... b:T ...`) to avoid repeated PEG.js grammar
* A ECMAScript 2015+ transformer (via Babel 6) for code blocks
* AST generator for rules with titled sequence's but no code blocks

# license

Released under the MIT License, [http://opensource.org/licenses/MIT](http://opensource.org/licenses/MIT).

[PEG.js](https://github.com/pegjs/pegjs) is developed by [David Majda](http://majda.cz/) ([@dmajda](http://twitter.com/dmajda)).

[ePEG.js](https://github.com/futagoza/ePEG.js) is developed by [Futago-za Ryuu](https://github.com/futagoza).
