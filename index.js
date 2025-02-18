document.getElementById("fetch-create").addEventListener("click", nameA);
// document.getElementById("fetch-list").addEventListener("click", fetchData);

const container = document.getElementById("data-container");

let form = document.getElementById('form');

function nameA() {
  event.preventDefault();
  
const img = document.getElementById('input-img').value;
const title = document.getElementById('input-title').value;
const bio = document.getElementById('input-bio').value;

  console.log(img);
  console.log(title);
  console.log(bio);
}


let newPost = {
  image: '',
  title: '',
  bio: '',
  };

    // async function getUsers() {
    //   const response = await fetch('http://localhost:3004/posts');
    //   const data = await response.json();
    //   container.appendChild (JSON.stringify(data.users, null, 2));
    // }

    // GET request
    async function fetchGET() {
      renderLoadingState();
      try {
        const response = await fetch("http://localhost:3004/posts");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      const data = await response.json();
      renderPost(data);
        
      } catch (error) {
        renderErrorState();
      }
    }

    // POST request
    async function createPost() {
      const response = await fetch('http://localhost:3004/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: 'John',
          lastName: 'Doe',
          age: 25
        })
      });
      const data = await response.json();
      output.textContent = JSON.stringify(data, null, 2);
    }

    function renderPost() {


      // const container = document.getElementById("anime-container");
      // container.innerHTML = "";
  
      // animeData.data.forEach((anime) => {
      //   const card = document.createElement("div");
      //   card.className = "card";
      //   card.innerHTML = `
      //     <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
      //     <h2>${anime.title}</h2>
      //     <p><b>Year:</b> ${anime.year}</p>
      //     <p><b>Type:</b> ${anime.type}</p>
      //     <p><b><Status:/b> ${anime.status}</p>
      //     <p><b>Episodes:</b> ${anime.episodes}</p>
      //     <p><b>Duration:</b> ${anime.duration}</p>
      //     <p><b>Rating:</b> ${anime.rating}</p>
      //   `;
      //   container.appendChild(card);
      // });
  }

    function renderLoadingState() {
      container.innerHTML = ""; 
      container.innerHTML = "<p>Loading...</p>";
  }

  function renderErrorState() {
    const container = document.getElementById("anime-container");
    container.innerHTML = "";
    container.innerHTML = "<p>Ops!, something happened</p>";
}
