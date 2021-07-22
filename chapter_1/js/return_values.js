(function () {
  async function test() {
    // You can `await` on a non-promise without getting an error.
    const s = await "Hello Return";
    console.log(s);
    const p = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Hello Return 2");
      }, 1000);
    });
    console.log(await p);
  }
  test();

  ////////////////////////////////////////////////////
  async function computedValue() {
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    //this will be wrapped in a promise
    return `Hello from computedValue`;
  }

  async function test2() {
    console.log(await computedValue());
  }

  test2();

  async function computeValue2() {
    // The resolved value is a promise. The promise returned from
    // `computeValue2()` will be fulfilled with 'Hello, World!'
    return new Promise((resolve) => {
      setTimeout(() => resolve("Hello, World!"), 1000);
    });
  }

  const resolveValue = Promise.resolve("Hello");
  const cv = async () => resolveValue;
  async function test4() {
    // No `await` below, so `returnValue` will be a promise
    const returnValue = cv();
    // `false`. Return value never strictly equals resolved value.
    console.log(resolveValue === returnValue);
  }
  test4();
})();
