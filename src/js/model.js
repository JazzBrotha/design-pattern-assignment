//jshint esversion:6
import MovieDb from './movies.js'
import Elements from './elements.js'
import Controller from './controller.js'
import View from './view.js'
import {getAverage} from './helpers.js'
// import './polyfills.js'
// import {updateValue} from './watchers.js'

//OBJECT LITERAL THAT CONTAINS APP
export default {

      //Sets database first time app is run
      setInitialDb : function() {
        MovieDb.forEach((movie, index) => {
          localStorage.setItem(index, JSON.stringify(movie));
        });
      },

      //UPDATES THE LOCALSTORAGE LIST OF MovieDb. CALLED UPON WHENEVER THERE IS A CHANGE
      //WOULD LIKE TO AUTOMATE THIS THROUGH A WATCHER OR OBSERVER OF SOME KIND TO
      //AVOID CONSTANT CALLING. WILL ATTEMPT IN NEXT DRAFT
      // setMovieDb : function () {
      //   return localStorage.setItem("MovieDb", JSON.stringify(Elements.movieList));
      // },
      //ADDS A NEW MOVIE THROUGH THE CONSTRUCTOR AND PUSHES IT INTO THE MOVIE ARRAY
      //CALLS FUNCTIONS TO UPDATE LOCAL STORAGE AND MOVIE TABLE INTERFACE
      //USER WILL BE ABLE TO PROVIDE IMAGE COVER OF MOVIE IN NEXT DRAFT
      addMovie : function(movie) {
        let index = localStorage.length;
        localStorage.setItem(index, JSON.stringify(movie));
        return index;
      },
      //UPDATES MOVIE RATING BASED ON USER INPUT AND
      //PUSHES THE RATING OF THE CHOSEN MOIVE INTO MOVIE ARRAY AND UPDATES LOCAL STORAGE.
      //CREATES A VISUAL EFFECT IN THE MODAL WHEN RATING IS UPDATED
      //BINDS INNERHTML OF TABLE AND MODAL COMPONENT SO THAT A FUNCTION IS NOT NEEDED TO RENDER
      editMovie : function(genres, rating) {

      },
      editGenre : function(index, newVal) {
        let movie = JSON.parse(localStorage[index]);
        movie.genres = newVal;
        return localStorage.setItem(JSON.stringify(index), JSON.stringify(movie));
        },
      editRating : function(index, newVal) {
        let movie = JSON.parse(localStorage[index]);
        movie.ratings.push(newVal);
        return localStorage.setItem(JSON.stringify(index), JSON.stringify(movie));
        },
      //CALCULATE AVERAGE RATING OF RATING ARRAY FOR DISPLAY PURPOSES
      //ALSO SETS A STANDARD VALUE OF N/A IF NO RATING IS FOUND
      parseMovieArr : function () {
        let movieArr = [];
        for (let key in localStorage) {
          movieArr.push(JSON.parse(localStorage[key]));
        }
        return movieArr;
      },
      //CHECKS FOR TOP RATED MOVIE BY COMPARING EACH MOVIE'S RATING AND SORTING
      //ACCORDINGLY.
      //PREVENTS MovieDb WITH ONE OR LESS RATING TO BE DISPLAYED
      getTopRatedMovie : function() {
        let movieArr = this.parseMovieArr();
        let multipleRatings = movieArr.filter(movie => movie.ratings.length > 1);
        let topRated = multipleRatings.reduce(
          (prevVal, currVal) =>
          getAverage(prevVal.ratings) > getAverage(currVal.ratings)
          ? prevVal
          : currVal
        );
        return topRated;
      },
      //BASICALLY THE SAME FUNCTION AS ABOVE, JUST WITH A REVERSED SORTING ORDER
      getWorstRatedMovie : function () {
        let movieArr = this.parseMovieArr();
        let multipleRatings = movieArr.filter(movie => movie.ratings.length > 1);
        let worstRated = multipleRatings.reduce(
          (prevVal, currVal) =>
          getAverage(prevVal.ratings) < getAverage(currVal.ratings)
          ? prevVal
          : currVal
        );
        return worstRated;
    },
    //FINDS MovieDb THAT MATCHES THE SELECTED YEAR AND HIDES THE OTHERS
      getMoviesThisYear : function (movieYear) {
        let movieArr = this.parseMovieArr();
            return movieArr.filter(
              (movie, index) =>
              movie.year === parseInt(movieYear)
            );
      },
      //VERY SIMILIAR TO THE ABOVE FILTER FUNCTION, JUST A SLIGHT CHANGE IN SYNTAX
      //AS GENRES PROP IS AN ARRAY THAT CAN CONTAIN MULTIPLE VALUES
      getMoviesByGenre : function(movieGenre) {
        let movieArr = this.parseMovieArr();
        let genreArr = movieArr.filter(
          (movie, index) =>
          movie.genres.includes(movieGenre)
        );
        return genreArr;
      },


};
