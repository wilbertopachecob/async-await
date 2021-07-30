(function () {
  class Promise {
    constructor(executor) {
      this.state = "PENDING";
      this.chained = []; // Not used yet
      this.value = undefined;
      try {
        // Reject if the executor throws a sync error
        executor(
          (v) => this.resolve(v),
          (err) => this.reject(err)
        );
      } catch (err) {
        this.reject(err);
      }
    }
    // Constructor is the same as before, omitted for brevity
    then(onFulfilled, onRejected) {
      const { value, state } = this;
      // If promise is already settled, call the right handler
      if (state === "FULFILLED") return setImmediate(onFulfilled, value);
      if (state === "REJECTED") return setImmediate(onRejected, value);
      // Otherwise, store handlers so you can call them later
      this.chained.push({ onFulfilled, onRejected });
    }

    // Define `resolve()` and `reject()` to change the promise state
    resolve(value) {
      if (this.state !== "PENDING") return;
      Object.assign(this, { value, state: "FULFILLED" });
      // Loop over `chained`, find `onFulfilled()` functions.
      // Remember that `.then(null, onRejected)` is valid.
      this.chained
        .filter((obj) => obj.onFulfilled instanceof Function)
        // The ES6 spec section 25.4 says `onFulfilled` and
        // `onRejected` must be called on next event loop tick
        .forEach((obj) => setImmediate(obj.onFulfilled, value));
    }
    
    reject(value) {
      if (this.state !== "PENDING") return;
      Object.assign(this, { value, state: "REJECTED" });
      this.chained
        .filter((obj) => obj.onRejected instanceof Function)
        .forEach((obj) => setImmediate(obj.onRejected, value));
    }

    static all(arr) {
      let remaining = arr.length;
      if (remaining === 0) return Promise.resolve([]);
      // `result` stores the value each promise is fulfilled with
      let result = [];
      return new Promise((resolve, reject) => {
        // Call `then()` on every promise in the array. When a
        // promise fulfills, store the value in `result`. If any
        // promise rejects, the `all()` promise rejects immediately
        arr.forEach((p, i) =>
          p.then(
            (res) => {
              result[i] = res;
              --remaining || resolve(result);
            },
            (err) => reject(err)
          )
        );
      });
    }
  }

  async function testPromise() {
    // Works, even though this is a custom `Promise` class. All
    // you need is a `then()` function to support `await`.
    const res = await new Promise((resolve) => {
      setTimeout(() => resolve("Hello"), 50);
    });
    assert.equal(res, "Hello");
  }

  testPromise();
})();
