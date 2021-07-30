class HTTPRequest {
  // Only modify the `then()` function below
  static create() {
    return new HTTPRequest();
  }
  get(url) {
    this.method = "get";
    this.url = url;
    return this;
  }
  exec(callback) {
    fetch(this.url, this)
      .then((res) => res.json())
      .then((res) => callback(null, res))
      .catch(callback);
  }
  //The keyword calls under the hood and pauses the async function until onFulfilled or onRejected is called
  then(onFulfilled, onRejected) {
    const f = (error, res = undefined) =>
      !error ? onFulfilled(res) : onRejected(error);
    this.exec(f);
  }
}
// Don't modify the below code
run().catch((error) => console.error(error.stack));

async function run() {
  const url = "https://jsonplaceholder.typicode.com/posts";
  const res = await HTTPRequest.create().get(url);
  console.log("Success", res[0].id === 1);
}
