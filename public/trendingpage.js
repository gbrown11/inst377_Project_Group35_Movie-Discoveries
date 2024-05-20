const apiKey = "b3fXsmueuBQAjP9E5U6tSSjbYelOpmNTLnG2pd9i";

// function to fetch details for a movie/show by ID
function fetchDetailsById(id) {
  return fetch(`https://api.watchmode.com/v1/title/${id}/details/?apiKey=${apiKey}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch data for ID ${id}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error(`Error fetching details for ID ${id}:`, error);
    });
}

// function to fetch and show 5 trending shows/movies
function fetchAndDisplayTrendingTitles() {
  fetch(`https://api.watchmode.com/v1/list-titles/?apiKey=${apiKey}&type=all&page=1&num_results=50`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // pick 5 trending titles
      const trendingTitles = data.titles.sort(() => 0.5 - Math.random()).slice(0, 5);
      // fetch details for the selected titles
      const fetchPromises = trendingTitles.map(title => fetchDetailsById(title.id));
      return Promise.all(fetchPromises);
    })
    .then(titles => {
      // display the titles
      const container = document.getElementById("moviesContainer");
      container.innerHTML = ""; // Clear previous content
      titles.forEach((title, index) => {
        const listItem = document.createElement("li");
        listItem.classList.add("list-group-item");

        // capitizing the first letter just to make it look nicer
        const capitalizedType = title.type.charAt(0).toUpperCase() + title.type.slice(1).replace(/_/g, ' ');
        listItem.innerHTML = `
          <h5>${index + 1}. ${title.title}</h5>
          <p>Type: ${capitalizedType}</p> 
          <p>Rating: ${title.user_rating || 'N/A'}</p>
        `;
        container.appendChild(listItem);
      });
    })
    .catch(error => {
      console.error('There was a problem:', error);
    });
}

// fetch and display 5 trending shows/movies on page
fetchAndDisplayTrendingTitles();


//Voice Commands

document.addEventListener('DOMContentLoaded', function () {
  if (window.annyang) {
    var commands = {
      'navigate to about': function () {
        window.location.href = 'aboutpage.html';
      },
      'navigate to trending': function () {
        window.location.href = 'trendingpage.html';
      },
      'navigate to recommended': function () {
        window.location.href = 'recommendedpage.html';
      },
      'navigate to home': function () {
        window.location.href = 'index.html';
      },
    };
    annyang.addCommands(commands);
  } else {
    console.log("Annyang not available.");
  }

  document.getElementById('startButton').addEventListener('click', function () {
    if (window.annyang) {
      annyang.start({ continuous: true, autoRestart: false });
    }
  });

  document.getElementById('stopButton').addEventListener('click', function () {
    if (window.annyang) {
      annyang.abort();
    }
  });
});