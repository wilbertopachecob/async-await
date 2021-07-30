async function getWithRetry(url, numRetries) {
  let error = null;
  for (let i = 0; i < numRetries; i++) {
    try {
      return await fetch(url).then((res) => res.json());
    } catch (e) {
      error = e;
    }
  }
  throw error;
}
// Correct answer for exercise 1.1 below
async function run() {
  const root =
    "https://" + "us-central1-mastering-async-await.cloudfunctions.net";
  const posts = await getWithRetry(`${root}/posts`, 3);
  for (const p of posts) {
    console.log(`Fetch post ${p.id}`);
    const content = await getWithRetry(`${root}/post?id=${p.id}`, 3);
    if (content.content.includes("async/await hell")) {
      console.log(`Correct answer: ${p.id}`);
      break;
    }
  }
}
run().catch((error) => console.error(error.stack));
// This makes every 2nd `fetch()` fail
const _fetch = fetch;
let calls = 0;
(window || global).fetch = function (url) {
  const err = new Error("Hard-coded fetch() error");
  return ++calls % 2 === 0 ? Promise.reject(err) : _fetch(url);
};
