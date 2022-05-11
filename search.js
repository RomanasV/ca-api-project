let queryParams = document.location.search;
let urlParams = new URLSearchParams(queryParams);
let searchPhrase = urlParams.get('search');

console.log(searchPhrase);

fetch('https://jsonplaceholder.typicode.com/users?username=' + searchPhrase)
  .then(res => res.json())
  .then(users => {
    if (users.length > 0) {
      users.map(user => {
        console.log(user.name);
      })
    } else {

    }

  })

