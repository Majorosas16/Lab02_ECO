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

    // DELETE

document.getElementById("post-render").addEventListener("click", async (e) => {
  if (e.target.classList.contains("deleteBtn")) {
    const postId = e.target.id;
    if (postId) {
      await fetchDeletePost(postId);
      alert('Post eliminado con éxito');
      fetchGET(); //Actualizar la BD
    } else {
      console.error("ID del post no encontrado");
    }
  }
});

async function fetchDeletePost(id) {
  // const fetchDeleteUrl = `http://localhost:3004/posts/${id}`
  try {
    const deletePost = { 
      method: 'DELETE',
      headers: { 
        'Content-Type': 'application/json' ,
      },
    }
    const response = await fetch(`http://localhost:3004/posts/${id}`, deletePost);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

  } catch (error) {
    console.error('Error al eliminar el post:', error.message);
    alert(error.message)
  }
}

//RENDER
const renderPost = (post) => {
  const containerPostsRender = document.getElementById("post-render");
  containerPostsRender.innerHTML = "";

  post.forEach((element) => {
      const cardPost = document.createElement("div");
      cardPost.innerHTML = `
      <img src="${element.img}" alt="${element.title}">
      <div>
        <h3>${element.title}</h3>
        <p>${element.bio}</p>
      </div>
      <button class="deleteBtn" id="${element.id}">Delete</button>
      `;
      containerPostsRender.appendChild(cardPost);
  });
}

const goToCreatePostBtn = document.getElementById("go-create-post").addEventListener("click", () => {
  const container = document.querySelector(".create-post");
  container.style.display = "block";

  const allPostContainer = document.querySelector(".list-post");
  allPostContainer.style.display = "none";
});


    function renderLoadingState() {
      container.innerHTML = ""; 
      container.innerHTML = "<p>Loading...</p>";
  }

  function renderErrorState() {
    const container = document.getElementById("anime-container");
    container.innerHTML = "";
    container.innerHTML = "<p>Ops!, something happened</p>";
}
