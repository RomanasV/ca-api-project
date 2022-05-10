// 3. Sukurti naują puslapį user.html, kuriame bus atvaizduojama vartotojo informacija:
//   3.1. Pilnas vardas.
//   3.2. Vartotojo vardas / nick'as.
//   3.3. El. paštas.
//   3.4. Adresas, kuris turės gatvę, namo numerį, miestą, pašto kodą. Paspaudus ant adreso, pagal koordinates, turėtų atidaryti šios vietos Google Maps. Kol kas naudoti bet kokią Google Map vietovę.
//   3.5. Telefono numeris.
//   3.6. Internetinio puslapio adresas.
//   3.7. Įmonės, kurioje dirba, pavadinimas.

let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams);
let userId = urlParams.get('user_id');

fetch('https://jsonplaceholder.typicode.com/users/' + userId)
  .then(res => res.json())
  .then(user => {
    let userInfo = document.createElement('div');
    userInfo.classList.add('user-info');

    let userName = document.createElement('h2');
    userName.classList.add('user-name');
    userName.textContent = `${user.name} (${user.username})`;

    let userPersonalInfo = document.createElement('ul');
    userPersonalInfo.classList.add('user-personal-info');

    userPersonalInfo.innerHTML = `<li>Email: <a href="mailto:${user.email}">${user.email}</a></li>
                                  <li>Phone: <a href="tel:${user.phone}">${user.phone}</a></li>
                                  <li>Address: <a href="https://www.google.com/maps/search/?api=1&query=${user.address.geo.lat}%2C${user.address.geo.lng}&zoom=20" target="_blank">${user.address.street} st. ${user.address.suite}, ${user.address.city} (zipcode: ${user.address.zipcode})</a></li>
                                  <li>Website: <a href="#">${user.website}</a></li>
                                  <li>Work: ${user.company.name}</li>`;
    
    userInfo.append(userName, userPersonalInfo);
    
    let userPostsWrapper = document.createElement('div');
    userPostsWrapper.classList.add('posts-wrapper');

    let postsTitle = document.createElement('h3');
    postsTitle.textContent = 'User posts:';

    let userPostsList = document.createElement('ul');

    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
      .then(res => res.json())
      .then(posts => {
        posts.map(post => {
          let postElement = document.createElement('li');
          postElement.innerHTML = `<a href="./post.html?post_id=${post.id}">${post.title}</a>`;

          userPostsList.prepend(postElement);
        })
      })

    userPostsWrapper.append(postsTitle, userPostsList);

    let userAlbumsWrapper = document.createElement('div');
    userAlbumsWrapper.classList.add('albums-wrapper');

    let albumsTitle = document.createElement('h3');
    albumsTitle.textContent = 'User albums:';

    let userAlbumsList = document.createElement('ul');

    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/albums`)
      .then(res => res.json())
      .then(albums => {
        albums.map(album => {
          let albumElement = document.createElement('li');
          albumElement.innerHTML = `<a href="./album.html?album_id=${album.id}">${album.title}</a>`;

          userAlbumsList.prepend(albumElement);
        })
      })
    
    userAlbumsWrapper.append(albumsTitle, userAlbumsList);

    document.body.prepend(userInfo, userPostsWrapper, userAlbumsWrapper);
  }).catch(error => {
    let errorMessage = document.createElement('h1');
    errorMessage.textContent = 'Tokio vartotojo nėra :(';

    document.body.prepend(errorMessage);
  })

  
// 4. Šiame puslapyje turės būti atvaizduojama:
// 4.1. Visi vartotojo parašyti įrašai (posts). Post'ų įrašuose nereikia atvaizduoti komentarų. Kiekvienas post'as turi turėti nuorodą.
// 4.2. Visi vartotojo sukurti foto albumai. Kiekvienas albumas turės:
//   4.2.1. Albumo pavadinimą, kuris turi būti nuoroda. Kol kas nuoroda gali niekur nevesti.

// fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
//   .then(res => res.json())
//   .then(posts => {
//     // console.log(posts);
//   })

// fetch(`https://jsonplaceholder.typicode.com/users/${userId}/albums`)
//   .then(res => res.json())
//   .then(albums => {
//     console.log(albums);
//   })