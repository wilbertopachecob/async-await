(function () {
  function race(arr) {
    return new Promise((resolve, reject) => {
        for (const p of arr) {
            p.then(resolve).catch(reject)
        }
    })
  }
  // The below tests help you check your `race()` implementation
  test1()
    .then(test2)
    .then(() => console.log("Done!"))
    .catch((error) => console.error(error.stack));

  function test1() {
    const p1 = new Promise((r) => setTimeout(() => r(1), 10));
    const p2 = new Promise((r) => setTimeout(() => r(2), 100));
    const f = (v) => {
      if (v !== 1) throw Error("test1 failed!");
    };
    return race([p1, p2]).then(f);
  }

  function test2() {
    const error = new Error("Expected error");
    const p1 = new Promise((r) => setTimeout(() => r(1), 100));
    const p2 = new Promise((r) => setTimeout(() => r(2), 100));
    const p3 = new Promise((resolve, reject) => reject(error));
    return race([p1, p2, p3]).then(
      () => {
        throw Error("test2: race() promise must reject");
      },
      (e) => {
        if (e !== error) throw Error("test2: wrong err");
      }
    );
  }
})();
