let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams);
let albumId = urlParams.get('album_id');

fetch('https://jsonplaceholder.typicode.com/albums/' + albumId)
  .then(res => res.json())
  .then(album => {
    let albumsWrapper = document.createElement('div');
    let albumTitle = document.createElement('h1');
    albumTitle.textContent = album.title;

    let authorName = document.createElement('span');

    fetch('https://jsonplaceholder.typicode.com/users/' + album.userId)
      .then(res => res.json())
      .then(user => {
        authorName.innerHTML = `<strong>Album author:</strong> <a href="./user.html?user_id=${user.id}">${user.name}</a>`;
      })

    let albumsList = document.createElement('div');

    fetch('https://jsonplaceholder.typicode.com/albums/' + albumId + '/photos')
      .then(res => res.json())
      .then(photos => {
        photos.map(photo => {
          let galleryImage = document.createElement('img');
          galleryImage.src = photo.thumbnailUrl;

          albumsList.append(galleryImage);
        })
      })
    
    albumsWrapper.append(albumTitle, authorName, albumsList);

    document.body.prepend(albumsWrapper);
  })