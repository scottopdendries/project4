/// This is for showing the backdrop and poster image - Raymond
const posterMovies = document.querySelector(".poster-container");
const movieOverview = document.querySelector(".details-container");
const backdrop = document.querySelector(".backdrop");

//trailer
const trailerContainer = document.querySelector(".trailerContainer");
let currentId;
const urlParams = new URLSearchParams(window.location.search);
currentId = urlParams.get("id");

fetch(
  `https://api.themoviedb.org/3/movie/${currentId}?api_key=477f5f5debaf48768ed55d725362b931`
)
  .then((res) => res.json())
  .then((json) => {
    const movies = json;
    console.log(movies);
    displayMovie(movies);
    // console.log(movies.results);
  })
  .catch((err) => console.log(err));

function displayMovie(movie) {
  /// Grabs the current url ID and stores to currentID - Raymond

  let backDrop = `<div class="backdrop-container">
          <img src="https://image.tmdb.org/t/p/original/${movie.backdrop_path}" class="backdrop-img" alt="">
        </div>`;

  backdrop.innerHTML = backDrop;

  /// Takes the currently selected movie and loads the poster image - Raymond
  let selectedMovie = `<div class="poster-image-container">
            <img src="https://image.tmdb.org/t/p/original/${
              movie.poster_path
            }" class="poster-img" alt="">
                <p class="rating" style="color: var(--gray);">${movie.vote_average.toFixed(
                  1
                )}</p>
                </div>
                  `;
  console.log(selectedMovie);
  posterMovies.innerHTML = selectedMovie;

  /// Movie details - Raymond
  // let movieDetails = movies
  //   .map((item) => {
  //     if (currentId == item.id) {
  //       const releaseDate = new Date(item.release_date);
  //       const monthName = releaseDate.toLocaleString("default", {
  //         month: "long",
  //       });
  //       const day = releaseDate.getDate();
  //       const year = releaseDate.getFullYear();
  //       const newReleaseDate = `${monthName} ${day}, ${year}`;

  //       return `<div class="movie-info">
  //       <h1>${item.title}</h1>
  //       <p>${item.overview}</p>
  //       <p>Release Date: ${newReleaseDate}</p>
  //       </div>`;
  //     }
  //   })
  //   .join("");
  // movieOverview.innerHTML = movieDetails;
}

//trailer-----

fetch(
  `https://api.themoviedb.org/3/movie/${currentId}/videos?api_key=477f5f5debaf48768ed55d725362b931`
)
  .then((res) => res.json())
  .then((json) => {
    const trailer = json.results;
    // console.log(trailer);
    displayTrailer(trailer);
  })
  .catch((err) => console.log(err));

function displayTrailer(trailer) {
  console.log("trailer ", trailer);
  const trailerVideo = trailer.filter((movie) => {
    return movie.name === "Official Trailer";
  });

  if (trailerVideo.length) {
    let details = trailer
      .map((item) => {
        return ` 
        <button id="openBtn" class="open" >WATCH TRAILER</button>
        <div id="fade" class="hide"></div>
         <div id="trailer" class="hide">
         <iframe 
           width="750px"
           height="500"
           src="https://www.youtube.com/embed/${trailerVideo[0].key}"
           alt=""
         ></iframe>
         <button id="closeBtn" class="close">Close</button>
       </div>`;
      })
      .splice(0, 1);

    trailerContainer.innerHTML = details;
    toggleBtn();
  }
}

function toggleBtn() {
  const openBtn = document.querySelector("#openBtn");
  const closeBtn = document.querySelector("#closeBtn");
  const fade = document.querySelector("#fade");
  const trailer1 = document.querySelector("#trailer");

  [openBtn, closeBtn].forEach((el) => {
    el.addEventListener("click", () => {
      fade.classList.toggle("hide");
      trailer1.classList.toggle("hide");
    });
  });
}
