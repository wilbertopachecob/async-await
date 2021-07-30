// Implement this function
async function forEachAsync(arr, fn) {
    for (const value of arr) {
        await fn(value)
    }
}
// Below is test code, don't modify this
run().catch((err) => console.log(err.stack));
async function run() {
  let i = 0;
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  async function fn1(n) {
    await new Promise((resolve) => setTimeout(resolve, 100 - n * 10));
    if (i++ !== n) throw Error("Make sure to `await` on `fn()`");
  }
  await forEachAsync(arr, fn1);
  if (i !== 10) throw Error("Call `fn()` on every array element");
  console.log("Success!");
}
