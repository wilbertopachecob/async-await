(async function () {
  const p = {
    then: (onFullFilled) => {
      onFullFilled("hello onFullFilled");
    },
  };
  console.log(await p);
})();

// The await keyword causes JavaScript to pause execution until the next iteration of the event loop
(async function () {
  const startId = 0;
  let currentId = 0;
  process.nextTick(() => ++currentId);
  const p = {
    then: (onFulfilled) => {
      console.log("then():", currentId - startId); // "then(): 1"
      onFulfilled("Hello, World!");
    },
  };
  console.log("Before:", currentId - startId); // "Before: 0"
  await p;
  console.log("After:", currentId - startId); // "After: 1"
})();
