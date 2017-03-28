[![Build status](https://img.shields.io/travis/futagoza/ePEG.js.svg)](https://travis-ci.org/futagoza/ePEG.js)
[![npm version](https://img.shields.io/npm/v/epeg.js.svg)](https://www.npmjs.com/package/epeg.js)
[![dependencies](https://img.shields.io/david/futagoza/ePEG.js.svg)](https://david-dm.org/futagoza/ePEG.js)
[![devDependencies](https://img.shields.io/david/dev/futagoza/ePEG.js.svg)](https://david-dm.org/futagoza/ePEG.js#info=devDependencies)
[![License](https://img.shields.io/badge/license-mit-blue.svg)](https://opensource.org/licenses/MIT)

# about ePEG.js

Originally intended to be a set of plugins for [PEG.js](https://github.com/pegjs/pegjs) itself, ePEG.js (Extended PEG.js) is now a extended rewrite of PEG.js made for Node.js v4 and above.

# features

- Multi file glob support via command line: `epegjs [OPTIONS] <...files>`
- __[todo]__ An _optional_ location field returned with every AST of a ePEG.js grammar file
- __[todo]__ `@import FILENAME` will import all rules from `FILENAME`, which can be a PEG.js or ePEG.js gammar file
- __[todo]__ `@import RULE = FILENAME` will import the given `RULE` only from the `FILENAME` grammar
- __[todo]__ Template rules (`Sequence<T R> = (__ R __ T)*`) to avoid repeated PEG.js grammar
- __[todo]__ Default arguments for templates (`EXPRESSION` or `GROUP`): `ElementList<T S=','> = T Sequence<T S>`
- __[todo]__ Spread operator to concat a sequence with only 2 expressions: `ArgumentList<T> = T ...Sequence<T ','>`
- __[todo]__ Control of Repetition (`RULE = EXPRESSION+ / EXPRESSION*`) using `++RULE` or `--RULE` (see 1)
- __[todo]__ AST generator for rules with labeled sequence's but no code blocks
- __[todo]__ Sequence extraction using `@` to return a single result from a sequence (see 2): `Sequence<T R> = (__ R __ @T)*`
- __[todo]__ Sequence selection using [positive integer's](https://en.wikipedia.org/wiki/Integer) as labels to return an array (no code blocks allowed)
- __[todo]__ Attributes used by the ePEG.js compiler passes and generator to customize the generated parser
- __[todo]__ [Memoization](https://en.wikipedia.org/wiki/Memoization) attribute: `[memoization] RULE = EXPRESSION`
- __[todo]__ Return type attribute for type-based languages: `[returns = 'Object<Any>'] RULE = EXPRESSION`
- __[todo]__ Range based repetition: `RULE = RANGE|EXPRESSION`, where `RANGE` can be `min..`, `min..max`, `..max` or `exact`
- __[todo]__ A language independent bytecode generator that can be used to build a parser in any language
- __[todo]__ Class based and single function based JavaScript (ES5 or ES2015) parser generators

1) [https://github.com/pegjs/pegjs/issues/217#issuecomment-286595368](https://github.com/pegjs/pegjs/issues/217#issuecomment-286595368)
2) [https://github.com/pegjs/pegjs/issues/217#issuecomment-287097614](https://github.com/pegjs/pegjs/issues/217#issuecomment-287097614)

# install

###### command line tool

```shell
npm install -g epeg.js
```

###### node.js module

```shell
npm install --save-dev epeg.js
```

###### development version

```shell
git clone https://github.com/futagoza/ePEG.js.git
cd ePEG.js
npm install
npm run build
```

# license

Released under the MIT License, [http://opensource.org/licenses/MIT](http://opensource.org/licenses/MIT).

[PEG.js](https://github.com/pegjs/pegjs) is developed by [David Majda](http://majda.cz/) ([@dmajda](http://twitter.com/dmajda)).

[ePEG.js](https://github.com/futagoza/ePEG.js) is developed by [Futago-za Ryuu](https://github.com/futagoza).
