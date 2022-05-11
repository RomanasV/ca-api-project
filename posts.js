let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams);
let userId = urlParams.get('user_id');

if (userId) {
  fetch('https://jsonplaceholder.typicode.com/posts?userId=' + userId)
    .then(res => res.json())
    .then(posts => {
      let postsWrapper = document.createElement('div');
      postsWrapper.classList.add('posts-wrapper');

      posts.map(post => {
        console.log(post);
        let postItem = document.createElement('div');
        postItem.classList.add('post-item');

        postItem.innerHTML = `<h2>${post.title}</h2>`

        postsWrapper.prepend(postItem);
      })

      document.body.prepend(postsWrapper);
    })
} else {
  fetch('https://jsonplaceholder.typicode.com/posts?_limit=20')
    .then(res => res.json())
    .then(posts => {
      console.log(posts);
    })
}
