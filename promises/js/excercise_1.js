const root = 'https://' +
  'us-central1-mastering-async-await.cloudfunctions.net';
function run() {
  // Example of using `fetch()` API
  return fetch(`${root}/posts`).then(res => res.json()).
    then(posts => console.log(posts[0]));
}
run().catch(error => console.error(error.stack));