# jasmine spec name patch

[![CircleCI](https://circleci.com/gh/Quramy/jasmine-spec-name-patch.svg?style=svg)](https://circleci.com/gh/Quramy/jasmine-spec-name-patch)
[![npm version](https://badge.fury.io/js/jasmine-spec-name-patch.svg)](https://badge.fury.io/js/jasmine-spec-name-patch)
[![Greenkeeper badge](https://badges.greenkeeper.io/Quramy/jasmine-spec-name-patch.svg)](https://greenkeeper.io/)

Allows to get spec's name in Jasmine `beforeEach` and `afterEach` callback. See also [jasmine/jasmine#611](https://github.com/jasmine/jasmine/issues/611)).

## How to use

```sh
npm i jasmine-spec-name-patch
```

```js
require('jasmine-spec-name-patch');

describe('My awesome function', function() {

  beforeEach(function() {
    console.log(this.fullName);  // -> My awesome function should returns ...
  });

  // or

  beforeEach((done, { fullName }) => {
    console.log(fullName);  // -> My awesome function should returns ...
    done();
  });

  it('should returns...', function() { /* test code */ });

  afterEach(function() {
    console.log(this.fullName);  // -> My awesome function should returns ...
  });

  // or

  afterEach((done, { fullName }) => {
    console.log(fullName);  // -> My awesome function should returns ...
    done();
  });
});
```

## Decorate beforeEach / afterEach fn
You can also intercept `afterEach` function.

```js
const wrap = require('jasmine-spec-name-patch/before-each');
// Or you can use jasmine-spec-name-patch/after-each also.

wrap(function(context, complete, delegate) {
  // something you want,,,
  if (delegate.length === 0) {
    delegate.apply(context);
    complete();
  } else {
    delegate.apply(context, [complete]);
  }
});
```

## License
MIT
