fetch('https://jsonplaceholder.typicode.com/posts?_limit=11&_start=5')
  .then(res => res.json())
  .then(posts => {
    let postsWrapper = document.createElement('div');
    postsWrapper.classList.add('posts-wrapper');

    posts.map((post) => {
      let title = post.title;
      let body = post.body;
      let userId = post.userId;
      let postId = post.id;

      let postElement = document.createElement('div');

      fetch('https://jsonplaceholder.typicode.com/users/' + userId)
        .then(res => res.json())
        .then(user => {

          fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
            .then(res => res.json())
            .then(comments => {
              postElement.innerHTML = `<h2>${title}</h2>
                                       <span>Author: <a href="./user.html?user_id=${userId}">${user.name}</a></span>
                                       <p>${body}</p>`;

              let commentsList = document.createElement('ul');

              comments.map(comment => {
                let commentElement = document.createElement('li');
                commentElement.innerHTML = `<h3>${comment.name}</h3>
                                            <span>Commented by: ${comment.email}</span>
                                            <p>${comment.body}</p>`;

                commentsList.prepend(commentElement);
              })

              postElement.append(commentsList);
            })
        })
      postsWrapper.prepend(postElement);
    });

    
    // 5. Pagrindiniame (index.html) puslapyje pridėti skiltį, kurioje atvaizduojamas albumų sąrašas. Kiekvienas albumas turės:
    // 5.1. Pavadinimą, o paspaudus ant jo - nukreipiama į albumą (album.html).
    // 5.2. Albumo autoriaus vardą.
    // 5.3. Nuotrauką.

    let albumsWrapperElement = document.createElement('div');
    albumsWrapperElement.classList.add('albums-wrapper');

    fetch('https://jsonplaceholder.typicode.com/albums?_limit=5')
      .then(res => res.json())
      .then(albums => {
        let albumsListTitle = document.createElement('h3');
        albumsListTitle.textContent = 'Albumai:';

        let albumsListElement = document.createElement('div');
        albumsListElement.classList.add('albums-list');

        albums.map(album => {
          console.log(album);

          let albumItem = document.createElement('div');
          albumItem.classList.add('album-item');

          let albumTitle = document.createElement('h4');
          albumTitle.innerHTML = `<a href="./album.html?album_id=${album.id}">${album.title}</a>`;

          let albumImage = document.createElement('img');

          fetch(`https://jsonplaceholder.typicode.com/albums/${album.id}/photos?_limit=1`)
            .then(res => res.json())
            .then(image => {
              albumImage.src = image[0].thumbnailUrl;
            })

          albumItem.append(albumTitle, albumImage);

          albumsListElement.prepend(albumItem);
        })

        albumsWrapperElement.append(albumsListTitle, albumsListElement);
      })


    document.body.prepend(albumsWrapperElement, postsWrapper);
  })
