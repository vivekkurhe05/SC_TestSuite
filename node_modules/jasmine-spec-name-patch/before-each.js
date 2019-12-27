function wrapBeforeEach(cb) {
  if (typeof jasmine !== 'object') return;
  const jasmineEnv = jasmine.getEnv();
  const original = jasmineEnv.it;

  if (!jasmineEnv.it.__patchedBefore__) {
    jasmineEnv.it = function () {
      const spec = original.apply(this, arguments);
      const origBeforeAndAfterFns = spec.beforeAndAfterFns;
      spec.beforeAndAfterFns = function () {
        const result = origBeforeAndAfterFns.apply(this, arguments);
        if (result.befores) {
          const befores = result.befores.map(before => {
            const orig = before.fn;
            const fn = function wrappedBefore(done) {
              const self = this;
              self.fullName = spec.result.fullName;
              if (cb) {
                cb(self, done, orig);
              } else {
                orig.apply(self, [done, { fullName: self.fullName }]);
                if (orig.length === 0) done();
              }
            };
            return { fn, timeout: before.timeout };
          });
          return { afters: result.afters, befores: befores };
        } else {
          return result;
        }
      };
      return spec;
    };
    jasmineEnv.it.__patchedBefore__ = true;
  }
}

module.exports = wrapBeforeEach;
