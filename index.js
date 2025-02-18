document.getElementById("form").addEventListener("submit", createPost);
// document.getElementById("fetch-list").addEventListener("click", fetchData);
const img = document.getElementById('input-img');
const title = document.getElementById('input-title');
const bio = document.getElementById('input-bio');

const container = document.getElementById("data-container");

    //GET
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

    //POST
    const fetchUrl = 'http://localhost:3004/posts'
    async function createPost(e) {
      e.preventDefault(); 
      try {

        const postRequest = {
          method: "POST", 
          headers: { "Content-Type": "application/json" }, 
          body: JSON.stringify({
            imgDB: img.value,
            titleDB: title.value,
            bioDB: bio.value,
          }),
        };
    
        const response = await fetch(fetchUrl, postRequest);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
  
        console.log("Post creado:");
      } catch (error) {
        console.error("Hubo un problema con el POST:", error);
      }
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
