# Assignment 2 - Web API.

Name: Jorja Holland

## Features.

A bullet-point list of the ADDITIONAL features implemented in the API **THAT WERE NOT IN THE LABS** (or modifications to existing features)
 
 + Upcoming movies
 + Top rated movies
 + Actors
 + Favorites and Watchlist specific for each user

## Setup requirements.

+ npm install
+ npm install dotenv
+ in react-app npm start
+ in movie-api npm run dev
  
## API Configuration
+ use the .env file and add it to both react-app and movies-api 
______________________
NODE_ENV=development
PORT=8080
HOST=localhost
MONGO_DB=<your_mongo_url>
TMBD_KEY=<your_tmdb_key>
SECRET=<your_secretkey>
______________________

## API Design
api

- /api/movies | GET | Gets a list of movies 
- /api/movies/{id} | GET | Gets a single movie 
- /api/movies/upcoming | GET | Gets list of upcoming
- /api/movies/toprated | GET | Gets list of toprated
- /api/movies/actors |GET| Gets list of actors
- /api/movies/actors/{id} |GET | Gets a single actor
- /api/userDetails/{username}/add | PUT | adds user details in when they sign in
- 
tmdb
- /api/movies/tmdb/movieimages/{id} | GET | Gets the images associated with a movie
- /api/movies/tmdb/moviereviews/{id} | GET | Get all reviews for a movie
- /api/movies/tmdb/movie/credits/{id} | GET | Gets the credits for a single movie
- /api/movies/tmdb/persons/{id} | GET | Gets images of specific actors 
  
## Security and Authentication

I used JWT tokens when accessing the TMDB API  
Must provide a bearer token 
Application will get the token from stortage
The discover movies page is not protected but all the other pages are and it redirects you to login


## Integrating with React App
Made slight changes to the react app to make my api work with it 
Changes the pages mainly 
Made a couple changes to components (in efforts to make things work mostly reverted back to the orginal)

