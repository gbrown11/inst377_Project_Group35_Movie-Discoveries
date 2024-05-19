document.addEventListener('DOMContentLoaded', function() {
  const apiKey = '3lnbol8HSBB3eqsEeDJVDwXeR7r6HjhBEzOMeBOh';
  let moviesData = null;
  let currentIndex = 0;

  const slideContainer = document.getElementById('movie-slide');
  const prevButton = document.getElementById('prev');
  const nextButton = document.getElementById('next');

  //Fetches the movies
  function fetchMovies() {
    fetch(`https://api.watchmode.com/v1/list-titles/?apiKey=${apiKey}&type=movie&page=1&num_results=10`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        //make sure there is a movie 
        if (data && data.titles && data.titles.length > 0) {
          moviesData = data.titles;
          //show random movie when loaded
          currentIndex = Math.floor(Math.random() * moviesData.length);
          displayMovie(currentIndex);
        } else {
          slideContainer.innerHTML = '<p class="movie-details">No movies found</p>';
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        slideContainer.innerHTML = '<p class="movie-details">Error fetching data</p>';
      });
  }



 

  function displayMovie(index) {
    if (moviesData && moviesData.length > 0 && index >= 0 && index < moviesData.length) {
      const movie = moviesData[index];
      const title = movie.title;
      const movieType = movie.type ? movie.type.replace(/_/g, ' ') : 'Type not available';

      

      //Get the wrap the innerHTML and create a link to call the movieDetail API for details
      slideContainer.innerHTML = `
        <p class="movie-details"><strong>Title:</strong><a href="#" onclick="movieDetail(this.textContent)">${title}</a></p>
        <p class="movie-details"><strong>Type:</strong> ${movieType}</p>
      `;
      currentIndex = index;
    }
  }

  //gets next movie
  function showNextMovie() {
    if (currentIndex < moviesData.length - 1) {
      displayMovie(currentIndex + 1);
    }
  }

  //gets previous movie
  function showPreviousMovie() {
    if (currentIndex > 0) {
      displayMovie(currentIndex - 1);
    }
  }

  //next and previous buttons
  nextButton.addEventListener('click', showNextMovie);
  prevButton.addEventListener('click', showPreviousMovie);


  fetchMovies();
});

async function movieDetail(movieTitle){

  const detailpage = document.getElementById('movieDetails')
  
  const host = window.location.origin 

  fetch(`${host}/movieDetails?title=${encodeURIComponent(movieTitle)}`)
      .then((res)=>res.json())
      .then((res)=>{

        console.log(res)
        console.log('TITLE',res.title)
        const title = document.getElementById('title')
        const genre = document.getElementById('genre')
        const year = document.getElementById('year')
        const plot = document.getElementById('plot')
        const trailer = document.getElementById('trailer')
        


        title.innerHTML = `<strong>Movie Title:</strong> ${res.title}`
        genre.innerHTML = `<strong>Genre:</strong> ${res.genre_names[0]}`
        year.innerHTML = `<strong>Year released:</strong> ${res.year}`
        plot.innerHTML =`<strong>Movie plot:</strong><br>${res.plot_overview}`
        trailer.innerHTML = `<strong>Trailer: </strong><a href=${res.trailer}>movie link</a>`

        const poster = document.getElementById("poster")

        let existingImage = poster.querySelector('img')

        if(existingImage){
          existingImage.remove();
        }

        const img = document.createElement('img')
        img.src = res.poster
        img.alt = "Movie poster"
        img.width = 490
        img.height = 450
        poster.appendChild(img)



        

        

          
      })
      
  





}
