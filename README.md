# inst377_Project_Group35_Movie-Discoveries

API Info: www.watchmode.com

API key: https://api.watchmode.com/v1/releases/?apiKey=ZeLov6MaUiKYAh22NDsLwOqE9SBcptOVFM7lOlfP

Due to limitations on the number of times the API can be called, we included alternative API keys

API keys: 

`vpB0RRJhNS2TfTf3gMFMnb1GLJgItUgDLLED49nT`

`ALBFOW3yuAaUXG6k0S2LQ2LZPF0sIj3D6bo2wzvo`


Supabase Database:

Project Name in Database: Movie Discoveries
    
Project URL: https://mcljyaucbvrdkwsgwpuo.supabase.co

API Key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jbGp5YXVjYnZyZGt3c2d3cHVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU4OTg2MzYsImV4cCI6MjAzMTQ3NDYzNn0.Nz6l90Pd_AQm7E_LeaS7uPtR3FHpoFESGiWdRFQsmtw`

Vercel Deployment Link:
    inst377-project-group35-movie-discoveries-mu.vercel.app





# Movie Discovery and Recommendations

Team Members 
- Michael Castro
- Gordon Brown
- Nana Kofi Brenya
- Luke Walsh
- Nicholas Majewski

### Project Description:

In today's digital age, the movie industry is booming with an ever-increasing number of films being released every year. With such a vast array of options available, it can be overwhelming for movie enthusiasts to keep track of trending movies, explore different genres, and discover hidden gems. For our team to address this need, we have developed a movie collection interface, which will provide users with a centralized platform to explore and gain knowledge about trending movies based on ratings, genres, release dates, and more. And also which streaming services (Netflix, Hulu, Plex, Amazon Prime, etc) those movies are available to watch them.

This application has been tested on both Apple Safari and Google Chrome, on Mac and Windows computers, and on Android, iOS, and iPadOS tablets and smartphones. Although the application works on all of the aforementioned devices and browsers, it works seamlessly on Google Chrome with CORS activated because it is a dependency of the voice command feature.

Link to Developer Manual: https://docs.google.com/document/d/1iQtrTg3yOZXmz6-VG2anxBNhbfzD5CX85O8qGllj_qw/edit?usp=sharing

# Developers Manual

## Installation:

### Cloning Github Repository 

Access the provided Github repository for the project (inst377_Project_Group35_Movie-Discoveries):
1. Look for the green tab called “code” on the dropdown menu:
    a. Select HTTPS and copy the link
2. On your local machine, select a suitable directory (use: pwd, cd command to navigate)
    a. Once done type: git clone Your_github_link. This will clone the remote GitHub repository into your local directory and also connect to the remote repository
3. In your local working directory terminal, type git pull. This will update your local branch with the main branch
4. This repository will work with all GitHub commands (pull, push, fetch, merge, add, commit, etc.)

To install several different dependencies associated with this project: 
1. Install node.js (Most computers have Node preinstalled, to verify type  node -v in the terminal)
    a. In the terminal, type the following code: curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    b. nvm install 22
    c. node -v # should print `v22.2.0` or newer version
    d. npm -v # should print `10.7.0` or newer version

### Dependencies
1. Install supabase: version 2.43.2 or newer version
    a. To install this, type of following code into the terminal and run it: npm install @supabase/supabase-js
    b. Create supabase PostgresQL account (https://supabase.com/):
        i. Use the provided supabase URL and API key to set up the database client, doing that connects the application to the remote database.
2. Install express.js: version 4.19.2 or newer version
    a. To install this, type of following code into the terminal and run it: npm install express.js
        i. Express makes it easy to create API and full-stack applications
3. Install nodemon: version 3.1.0 or newer version
    a. To install this, type the following code into the terminal and run it: npm install nodemon.
    b. Once installed, locate the package.json file under the key scripts[‘start’] and change the value of the server file to “nodemon -e ‘*’ ”
        i. Nodemon can be installed on a global scope or within the local working environment. It enables application server updates on the fly without having to turn on/off the server               anytime an update is done.
5. Install body-parser: version 1.20.2 or newer version
    a. To install this, type the following code into the terminal and run it: npm install body-parser.
        i. Body-parser is a middleware module for express.js used to parse incoming request bodies into a middleware before the handlers, available under the req.body property

## Running Application Server

To start the server, in your working directory terminal type: npm start
1. npm references to the “script” key in the package.json file and “start” will invoke nodemon to start the server. Also, listen to any application updates.
    a. When the server is correctly turned on, in your local directory terminal it should say “SERVER APP IS LIVE”.

## Running Application Testing

1. To perform application testing:
    a. In your computer browser ensure CORS is enabled.
    b. Ensure the server is on, in your web browser type: localhost:3000
        i. This will open the front-end home page and all necessary things needed to be displayed in the front-end 
        ii. Use console.log( value_to_log) to test output:
            1. Front-end console.log( ) will be displayed in the browser while backend console.log( ) will be displayed in the terminal window

## API/Endpoint

This application will use both external and internal API:

### Internal API:

1. localhost:3000/movie_list’s API: This API fetches movie listings from www.api.watchmode.com and builds the database. It also returns all movie listens when called.
2. localhost:3000/movieDetail API: it gets a movie title from the front end, and returns the details of a specific movie including, Title, poster, trailer, year the movie was released, description, etc
3. localhost:3000/releases API: it returns the currently released movies including where it can be streamed, year released, poster etc.
4. localhost:3000/newRelease API: it gets a movie title from the form and returns the details of the movie

### External API:

https://api.watchmode.com/v1/list-titles : This api was used to find the titles of movies. This would then be connected to the internal api to get the details of the movies. In the trending and home page, this api was used to get the trending movies and also the random movies seen on the home page. 

## Known bugs:
1. There is a limitation on API calls to watchmode api, if limit is reached it might cause the server to stop running 
2. Redirecting to the home page, sometimes an unknown middleware may default the url to localhost:3000/homepage.

## Roadmaps:
If we had the resources and time we could implement more features as well as enable multiple browser versions. We could also include full media player, increase the number page etc.

