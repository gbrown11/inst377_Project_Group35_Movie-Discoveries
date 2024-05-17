document.addEventListener('DOMContentLoaded', function() {
    const apiKey = '3lnbol8HSBB3eqsEeDJVDwXeR7r6HjhBEzOMeBOh';
    let moviesData = null;
    let currentIndex = 0;

    const slideContainer = document.getElementById('movie-slide');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');

    // Function to fetch movies once
    function fetchMovies() {
      fetch(`https://api.watchmode.com/v1/list-titles/?apiKey=${apiKey}&type=movie&page=1&num_results=10`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          // Check if data is valid and contains movies
          if (data && data.titles && data.titles.length > 0) {
            moviesData = data.titles;
            // Display a random movie initially
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

    // Function to display a movie at a specific index
    function displayMovie(index) {
      if (moviesData && moviesData.length > 0 && index >= 0 && index < moviesData.length) {
        const movie = moviesData[index];
        const title = movie.title;
        const movieType = movie.type ? movie.type.replace(/_/g, ' ') : 'Type not available';

        slideContainer.innerHTML = `
          <p class="movie-details"><strong>Title:</strong> ${title}</p>
          <p class="movie-details"><strong>Type:</strong> ${movieType}</p>
        `;
        currentIndex = index;
      }
    }

    // Function to show next movie
    function showNextMovie() {
      if (currentIndex < moviesData.length - 1) {
        displayMovie(currentIndex + 1);
      }
    }

    // Function to show previous movie
    function showPreviousMovie() {
      if (currentIndex > 0) {
        displayMovie(currentIndex - 1);
      }
    }

    // Event listeners for next and previous buttons
    nextButton.addEventListener('click', showNextMovie);
    prevButton.addEventListener('click', showPreviousMovie);

    // Fetch movies initially
    fetchMovies();
});