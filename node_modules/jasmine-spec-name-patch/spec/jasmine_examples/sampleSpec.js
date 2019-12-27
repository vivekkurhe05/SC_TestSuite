const assert = require('assert');

describe("Foo", function() {

  beforeEach(function (done, x) {
    assert.equal(x.fullName, 'Foo should something');
    done();
  });

  afterEach(function (done, x) {
    setTimeout(() => {
      assert.equal(x.fullName, 'Foo should something');
      done();
    }, 200);
  });

  it("should something", function() { });
});

const expectedNumArray = [30, 10, 50];

describe('Piyo', function() {
  beforeEach(function () {
    assert(/Piyo should something/.test(this.fullName));
  });

  afterEach(function () {
    const num = expectedNumArray.shift();
    assert.equal(this.fullName, 'Piyo should something ' + num);
  });

  [30, 10, 50].forEach(i => {
    it('should something ' + i, (done) => {
      setTimeout(() => done(), i);
    });
  });
});
