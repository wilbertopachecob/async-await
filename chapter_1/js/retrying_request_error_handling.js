(function () {
  async function retryRequest(num) {
    let error = null;
    for (let i = 0; i < num; i++) {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts").then(response => response.json());
        return res;
      } catch (e) {
        error = e;
      }
    }
    throw error;
  }

  retryRequest(4).then(console.log).catch(console.error);
})();
