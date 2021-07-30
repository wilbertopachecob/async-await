const root = "https://jsonplaceholder.typicode.com";

function hasString(haystack, needle) {
  return haystack.includes(needle);
}

async function getPost(id) {
  let res = await fetch(`${root}/posts/${id}`);
  res = await res.json();
  return res;
}

async function run() {
  let posts = await fetch(`${root}/posts`);
  posts = await posts.json();
  for (const post of posts) {
    const fullPost = await getPost(post.id);
    if (hasString(fullPost.body, "doloribus")) {
      return fullPost;
    }
  }
  return null;
}

run()
  .then(console.log)
  .catch((error) => console.log(error.stack));
