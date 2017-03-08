(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports = function Movie(title, year, genres, image) {
    this.title = title;
    this.year = year;
    this.genres = genres;
    this.ratings = [];
    this.image = image || 'dist/pics/movie-placeholder.svg';
};

},{}],2:[function(require,module,exports){
'use strict';

//FIRST MAIN PROPERTY THAT CONTAINS ALL THE HTML ELEMENTS FOR REFERENCE
module.exports = {
    genreButton: document.getElementById('genre-button'),
    genreErrorMessage: document.getElementById('error-message-genre'),
    genreForm: document.forms.editGenre,
    genreInput: document.forms.editGenre.genre,
    genreSuccess: document.getElementById('genre-success'),
    listGenre: document.getElementsByClassName('list-genre'),
    listRating: document.getElementsByClassName('list-rating'),
    modalGenres: document.getElementById('modal-movie-genres'),
    modalOpener: document.getElementsByClassName('modal-opener'),
    modalPoster: document.getElementById('modal-movie-poster'),
    modalRating: document.getElementById('modal-movie-rating'),
    modalTitle: document.getElementById('modal-movie-title'),
    modalYear: document.getElementById('modal-movie-year'),
    movieCreator: document.getElementById('movie-creator'),
    movieGenreInput: document.forms.movieGenreInput,
    movieGenres: document.forms.movieAdder.genres,
    movieList: JSON.parse(localStorage.getItem("MovieDb")),
    movieModal: document.getElementById('movie-modal'),
    movieResult: document.getElementById('movie-result'),
    movieTable: document.getElementById('movie-table'),
    movieTitle: document.forms.movieAdder.title,
    movieYear: document.forms.movieAdder.year,
    movieYearInput: document.forms.movieYearInput,
    overlay: document.getElementById('overlay'),
    ratingButton: document.getElementById('rating-button'),
    ratingCirle: document.getElementById('rating-circle'),
    ratingSort: document.getElementById('rating-sort'),
    selectedMovieQuestion: document.getElementById("selected-movie-question"),
    selectedRating: document.getElementById('selected-rating'),
    titleSort: document.getElementById('title-sort'),
    yearSort: document.getElementById('year-sort')
};

},{}],3:[function(require,module,exports){
'use strict';

var _movies = require('./movies.js');

var _movies2 = _interopRequireDefault(_movies);

var _elements = require('./elements.js');

var _elements2 = _interopRequireDefault(_elements);

var _constructor = require('./constructor.js');

var _constructor2 = _interopRequireDefault(_constructor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
THIS APPPLICATION USES AN OBJECT LITERAL WITH A MIX OF PRIVACY STRUCTURE BETWEEN
A CLASSIC MODULE PATTERN AND A REVEALING MODULE PATTERN. THE OBJECT LITERAL CONTAINS
THREE DIRECTLY BINDED PROPERTIES: "ELEMENTS", "CONTSTRUCTOR", "METHODS", WHO ALL
CONTAIN PROPERTIES OF DIFFERENT PURPOSES TO MAKE A MORE LOGICAL API. THIS STRUCTURE
WAS INSPIRED BY VUE.JS API, BUT CHANGED SINCE VUE HAS ITS OWN CONTEXTUAL BINDINGS.
THE BIGGEST ADVANTAGE WITH STRUCTURING AN OBJECT LITERAL WITH THREE MAIN PROPERTIES IS
TWO-FOLD. FIRSTLY, THERE IS NO NEED TO REDECLARE VARIABLES OR BIND THEM DIRECTLY
TO THE MAIN OBJECT. THEY ARE ALL ACCESSIBLE FROM THE OBJECT'S "ELEMENT" PROPERTY
AND KEPT PRIVATE FROM THE OBJECTS METHODS AND CONSTRUCTOR. THE SECOND ADVANTAGE
IS THAT THE CONTEXTUAL BINDING OF THE KEYWORD "THIS" ALWAYS POINTS TO ONE OF
THE THREE MAIN OBJECT PROPERTIES AND NOT THE MAIN OBJECT ITSELF. THE PURPOSE OF
THIS IS MAINLY TO MAKE ALL THE OBJECT'S METHODS EASILY ACCESSIBLE TO EACH OTHER.
THAT IS WHERE THE APP TAKES A SIMILAR APPROACH TO A REVEALING MODULE PATTERN.
A DISADVANTAGE WITH THIS TYPE OF BINDING IS WHEN REFERENCING CROSS-PROPERTY (
E.G. FROM "ELEMENTS" TO "METHODS") THE LINE OF EXECUTING CAN FEEL A BIT AWKWARD
AND COMPLEX, AS YOU NEED TO REFER THROUGH OBJECT LITERAL NOTION. THIS IS
SIMILAR TO A MORE CLASSIC MODULE PATTERN.
*/

//PROPER README TO BE INCLUDED IN NEXT DRAFT WITH CLEAR
//INSTRUCTIONS ON HOW TO MAKE THE MOST OF ITS USE CASE.

//CHECKS IF THE USER HAS AN EMPTY STORAGE AND SETS IT IF NEEDED
//DB OF MovieDb ARE SET FROM AN ARRAY IN MovieDb.JS
//SOMETIMES DOESN'T LOAD ON FIRST ATTEMPT AND THE USER NEEDS TO REFRESH PAGE
//HAVE TRIED FIXING THIS BY SHIFITING LOADING ORDER OF SCRIPTS BUT TO NO
//PERMANENT SOLUTION. WILL FIX IN NEXT DRAFT
window.onload = function () {
  if (typeof Storage !== "undefined") {
    if (localStorage.getItem("MovieDb") === null) {
      localStorage.setItem("MovieDb", JSON.stringify(_movies2.default));
    }
  }
  //INFORMS THE READER IF LOCAL STORAGE IS NOT SUPPORTED
  else {
      alert("Sorry! No Web Storage support available. Please consider switching to another browser.");
    }
  //CALLS FUNCTION TO RENDER THE INERFACE OF THE APP
  MovieWiki.methods.createMovieList();
};

//OBJECT LITERAL THAT CONTAINS APP
//jshint esversion:6
var MovieWiki = {

  //CONSTRUCTOR THAT CREATEs MovieDb WITH PROPER PROPERTIES WHEN CALLED
  //SEPERATED FROM REST OF THE METHODS FOR CLARITY
  //FORMAT VALIDATION IS DONE IN HTML FORM
  constructor: {
    Movie: function Movie(title, year, genres, image) {
      this.title = title;
      this.year = year;
      this.genres = genres;
      this.ratings = [];
      this.image = image || 'dist/pics/movie-placeholder.svg';
    }
  },
  //THIRD MAIN PROPERTY THAT CONTAINS ALL OF THE APP'S FUNCTIONALITY
  methods: {
    //CREATES A TABLE OF THE MovieDb IN THE DB AS THE INTERFACE FOR THE USER TO NAVIGATE
    //CALLED EACH TIME A NEW MOVIE IS ADDED
    createMovieList: function createMovieList() {
      _elements2.default.movieTable.innerHTML = '';

      var _loop = function _loop(i) {
        _elements2.default.movieTable.innerHTML += '<tr class="modal-opener" data-toggle="modal" data-id="' + (i + 1) + '">\n                <td><figure class="avatar avatar-xl avatar-rectangle"><img src="' + _elements2.default.movieList[i].image + '"></img></figure></td>\n                <td>' + _elements2.default.movieList[i].title + '</td>\n                <td>' + _elements2.default.movieList[i].year + '</td>\n                <td class="list-genre">' + _elements2.default.movieList[i].genres + '</td>\n                <td class="list-rating">' + MovieWiki.methods.getAverage(_elements2.default.movieList[i].ratings) + '</td>\n            </tr>\n              <button type="button" name="button" id="testbutton">Test Me</button>\n              ';
        var test = document.getElementById('testbutton');
        test.onclick = function () {
          _elements2.default.movieModal.classList.add('active');
          MovieWiki.methods.createModal(i);
        };
      };

      for (var i = 0; i < _elements2.default.movieList.length; i++) {
        _loop(i);
      }
    },
    //UPDATES THE LOCALSTORAGE LIST OF MovieDb. CALLED UPON WHENEVER THERE IS A CHANGE
    //WOULD LIKE TO AUTOMATE THIS THROUGH A WATCHER OR OBSERVER OF SOME KIND TO
    //AVOID CONSTANT CALLING. WILL ATTEMPT IN NEXT DRAFT
    setMovieDb: function setMovieDb() {
      return localStorage.setItem("MovieDb", JSON.stringify(_elements2.default.movieList));
    },
    //THIS FUNCTION USES JUST ONE DIV ELEMENT BUT INDIVIDUAL DATA FOR EACH MOVIE.
    //THE BINDING FOR EACH MOVIE IS CREATED WHENEVER A MOVIE IS CLICKED ON.
    //INDEX OF MOVIE IS CREATED WHENEVER A MOVIE LIST IS RENDERED IN THE CREATEMOVIELIST FUNCTION
    createModal: function createModal(index) {
      _elements2.default.modalTitle.innerHTML = _elements2.default.movieList[index].title;
      _elements2.default.modalYear.innerHTML = _elements2.default.movieList[index].year;
      _elements2.default.genreInput.value = _elements2.default.modalGenres.innerHTML = _elements2.default.listGenre[index].innerHTML;
      _elements2.default.modalRating.innerHTML = MovieWiki.methods.getAverage(_elements2.default.movieList[index].ratings);
      _elements2.default.modalPoster.src = _elements2.default.movieList[index].image;
      _elements2.default.ratingCirle.className = 'c100 p' + parseInt(_elements2.default.modalRating.innerHTML) * 10;
      _elements2.default.genreForm.onsubmit = function (e) {
        e.preventDefault();
        MovieWiki.methods.editGenre(index);
      };
      _elements2.default.ratingButton.onclick = function () {
        MovieWiki.methods.rateMovie(index);
      };
      var closeButton = document.getElementById('modal-close');
      closeButton.onclick = function () {
        _elements2.default.movieModal.classList.remove('active');
      };
    },
    //ADDS A NEW MOVIE THROUGH THE CONSTRUCTOR AND PUSHES IT INTO THE MOVIE ARRAY
    //CALLS FUNCTIONS TO UPDATE LOCAL STORAGE AND MOVIE TABLE INTERFACE
    //USER WILL BE ABLE TO PROVIDE IMAGE COVER OF MOVIE IN NEXT DRAFT
    addMovie: function addMovie() {
      var newMovie = new _constructor2.default(_elements2.default.movieTitle.value, _elements2.default.movieYear.value, _elements2.default.movieGenres.value.split(','));
      _elements2.default.movieList.push(newMovie);
      this.setMovieDb();
      this.createMovieList();
    },
    //USES THE DATA-BINDINGS.JS LIBRARY TO CREATE A TWO-WAY DATA BINDING FOR A
    //LIVE PREVIEW WHENEVER USER WISHES TO ADD A MOVIE
    //PREVIEW WILL BE MOVED TO TOP OF TABLE IN NEXT DRAFT
    // addMoviePreview : (function () {
    //        executed = false;
    //       return function () {
    //           if (!executed) {
    //               executed = true;
    //               Elements.movieTable.innerHTML +=
    //               `
    //                <tr>
    //                 <th></th>
    //                 <td class="title"></td>
    //                 <td class="year"></td>
    //                 <td class="genre"></td>
    //                 <td>N/A<td>
    //               </tr>
    //               `;
    //           }
    //       };
    // })(),
    //UPDATES MOVIE RATING BASED ON USER INPUT AND
    //PUSHES THE RATING OF THE CHOSEN MOIVE INTO MOVIE ARRAY AND UPDATES LOCAL STORAGE.
    //CREATES A VISUAL EFFECT IN THE MODAL WHEN RATING IS UPDATED
    //BINDS INNERHTML OF TABLE AND MODAL COMPONENT SO THAT A FUNCTION IS NOT NEEDED TO RENDER
    rateMovie: function rateMovie(index) {
      _elements2.default.movieList[index].ratings.push(parseInt(_elements2.default.selectedRating.value));
      _elements2.default.listRating[index].innerHTML = _elements2.default.modalRating.innerHTML = MovieWiki.methods.getAverage(_elements2.default.movieList[index].ratings);
      _elements2.default.ratingCirle.className = 'c100 p' + parseInt(MovieWiki.methods.getAverage(_elements2.default.movieList[index].ratings)) * 10;
      this.setMovieDb();
    },
    //MAKES IT POSSIBLE TO ADD AND REMOVE GENRES.
    //HTML BINDING IS SIMILAR TO RATEMOVIE FUNCTION
    //VALIDATION IS DONE TO GET PROPER FORMAT
    //ONE VISUAL BUG IN MODAL WINDOW AFTER FAILED SUBMIT. WILL FIX IN NEXT DRAFT
    editGenre: function editGenre(index) {
      _elements2.default.genreSuccess.classList.remove('invisible');
      setTimeout(function () {
        _elements2.default.genreSuccess.classList.add('invisible');
      }, 1000);
      _elements2.default.listGenre[index].innerHTML = _elements2.default.modalGenres.innerHTML = _elements2.default.genreInput.value;
      _elements2.default.movieList[index].genres = _elements2.default.genreInput.value.split(',');
      this.setMovieDb();
    },
    //CONTROLS THE FILTERING OF MovieDb BY CHECKING SELECTED VALUE AND
    //CALL APPROPRIATE FUNCTIONS, AS WELL AS SOME EVENT BINDINGS
    getSelected: function getSelected() {
      if (_elements2.default.selectedMovieQuestion.selectedIndex !== 1) {
        _elements2.default.movieYearInput.classList.add('invisible');
      }
      if (_elements2.default.selectedMovieQuestion.selectedIndex !== 2) {
        _elements2.default.movieGenreInput.classList.add('invisible');
      }
      if (_elements2.default.selectedMovieQuestion.selectedIndex === 1) {
        _elements2.default.movieYearInput.classList.remove('invisible');
        _elements2.default.movieYearInput.year.addEventListener("keyup", function () {
          MovieWiki.methods.getMovieDbThisYear(this.value);
        });
      } else if (_elements2.default.selectedMovieQuestion.selectedIndex === 2) {
        _elements2.default.movieGenreInput.classList.remove('invisible');
        _elements2.default.movieGenreInput.genre.addEventListener("keyup", function () {
          MovieWiki.methods.getMovieDbByGenre(this.value);
        });
      } else if (_elements2.default.selectedMovieQuestion.selectedIndex === 3) {
        this.getTopRatedMovie();
      } else if (_elements2.default.selectedMovieQuestion.selectedIndex === 4) {
        this.getWorstRatedMovie();
      } else {
        this.createMovieList();
      }
    },
    //CALCULATE AVERAGE RATING OF RATING ARRAY FOR DISPLAY PURPOSES
    //ALSO SETS A STANDARD VALUE OF N/A IF NO RATING IS FOUND
    getAverage: function getAverage(arr) {
      var sum = 0;
      if (arr.length !== 0) {
        for (var i = 0; i < arr.length; i++) {
          sum += arr[i];
        }
        return (sum / arr.length).toFixed(1);
      } else {
        return 'N/A';
      }
    },
    //CHECKS FOR TOP RATED MOVIE BY COMPARING EACH MOVIE'S RATING AND SORTING
    //ACCORDINGLY.
    //PREVENTS MovieDb WITH ONE OR LESS RATING TO BE DISPLAYED
    getTopRatedMovie: function getTopRatedMovie() {
      var multipleRatings = _elements2.default.movieList.filter(function (movie) {
        return movie.ratings.length > 1;
      });
      var topRated = multipleRatings.reduce(function (prevVal, currVal) {
        return MovieWiki.methods.getAverage(prevVal.ratings) > MovieWiki.methods.getAverage(currVal.ratings) ? prevVal : currVal;
      });
      return _elements2.default.movieList.filter(function (movie, index) {
        return movie === topRated ? _elements2.default.modalOpener[index].style.display = "table-row" : _elements2.default.modalOpener[index].style.display = "none";
      });
    },
    //BASICALLY THE SAME FUNCTION AS ABOVE, JUST WITH A REVERSED SORTING ORDER
    getWorstRatedMovie: function getWorstRatedMovie() {
      var multipleRatings = _elements2.default.movieList.filter(function (movie) {
        return movie.ratings.length > 1;
      });
      var worstRated = multipleRatings.reduce(function (prevVal, currVal) {
        return MovieWiki.methods.getAverage(prevVal.ratings) < MovieWiki.methods.getAverage(currVal.ratings) ? prevVal : currVal;
      });
      return _elements2.default.movieList.filter(function (movie, index) {
        return movie === worstRated ? _elements2.default.modalOpener[index].style.display = "table-row" : _elements2.default.modalOpener[index].style.display = "none";
      });
    },
    //FINDS MovieDb THAT MATCHES THE SELECTED YEAR AND HIDES THE OTHERS
    getMovieDbThisYear: function getMovieDbThisYear(movieYear) {
      return _elements2.default.movieList.filter(function (movie, index) {
        return movie.year === parseInt(movieYear) ? _elements2.default.modalOpener[index].style.display = "table-row" : _elements2.default.modalOpener[index].style.display = "none";
      });
    },
    //VERY SIMILIAR TO THE ABOVE FILTER FUNCTION, JUST A SLIGHT CHANGE IN SYNTAX
    //AS GENRES PROP IS AN ARRAY THAT CAN CONTAIN MULTIPLE VALUES
    getMovieDbByGenre: function getMovieDbByGenre(movieGenre) {
      return _elements2.default.movieList.filter(function (movie, index) {
        return movie.genres.includes(movieGenre) ? _elements2.default.modalOpener[index].style.display = "table-row" : _elements2.default.modalOpener[index].style.display = "none";
      });
    }
  }
};

//PREVENTS BLANK SPACE AS FIRST USER INPUT IN ALL INPUT FIELDS
var inputs = document.querySelectorAll('input');
for (var i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("keydown", function (event) {
    if (event.which === 32 && event.target.selectionStart === 0) {
      event.preventDefault();
    }
  });
}

},{"./constructor.js":1,"./elements.js":2,"./movies.js":4}],4:[function(require,module,exports){
"use strict";

module.exports = [{
    title: "Dawn of the Planet of the Apes",
    image: "http://api.androidhive.info/json/movies/1.jpg",
    ratings: [8, 7, 6, 5, 10],
    year: 2014,
    genres: ["Action", "Drama", "Sci-Fi"]
}, {
    title: "District 9",
    image: "http://api.androidhive.info/json/movies/2.jpg",
    ratings: [6, 5, 8, 8, 9],
    year: 2009,
    genres: ["Action", "Sci-Fi", "Thriller"]
}, {
    title: "Transformers: Age of Extinction",
    image: "http://api.androidhive.info/json/movies/3.jpg",
    ratings: [5, 5, 3, 2, 7],
    year: 2014,
    genres: ["Action", "Adventure", "Sci-Fi"]
}, {
    title: "X-Men: Days of Future Past",
    image: "http://api.androidhive.info/json/movies/4.jpg",
    ratings: [8, 9, 7, 7],
    year: 2014,
    genres: ["Action", "Sci-Fi", "Thriller"]
}, {
    title: "The Machinist",
    image: "http://api.androidhive.info/json/movies/5.jpg",
    ratings: [7, 7, 8, 8, 6, 6, 7, 8],
    year: 2004,
    genres: ["Drama", "Thriller"]
}, {
    title: "The Last Samurai",
    image: "http://api.androidhive.info/json/movies/6.jpg",
    ratings: [7, 7, 6, 5, 2, 9, 8],
    year: 2003,
    genres: ["Action", "Drama", "History"]
}, {
    title: "The Amazing Spider-Man 2",
    image: "http://api.androidhive.info/json/movies/7.jpg",
    ratings: [7, 5, 3, 2, 8, 9],
    year: 2014,
    genres: ["Action", "Adventure", "Fantasy"]
}, {
    title: "Tangled",
    image: "http://api.androidhive.info/json/movies/8.jpg",
    ratings: [7, 8, 3, 6, 8],
    year: 2010,
    genres: ["Action", "Drama", "Sci-Fi"]
}, {
    title: "Rush",
    image: "http://api.androidhive.info/json/movies/9.jpg",
    ratings: [8, 8, 9, 7],
    year: 2013,
    genres: ["Animation", "Comedy", "Family"]
}, {
    title: "Drag Me to Hell",
    image: "http://api.androidhive.info/json/movies/10.jpg",
    ratings: [6, 6, 7, 7],
    year: 2009,
    genres: ["Horror", "Thriller"]
}, {
    title: "Despicable Me 2",
    image: "http://api.androidhive.info/json/movies/11.jpg",
    ratings: [9, 9, 3, 7, 8],
    year: 2013,
    genres: ["Animation", "Comedy", "Family"]
}, {
    title: "Kill Bill: Vol. 1",
    image: "http://api.androidhive.info/json/movies/12.jpg",
    ratings: [4, 8, 8, 9, 3],
    year: 2003,
    genres: ["Action", "Crime"]
}, {
    title: "A Bug's Life",
    image: "http://api.androidhive.info/json/movies/13.jpg",
    ratings: [7, 7, 7, 5, 5],
    year: 1998,
    genres: ["Animation", "Adventure", "Comedy"]
}, {
    title: "Life of Brian",
    image: "http://api.androidhive.info/json/movies/14.jpg",
    ratings: [9, 9, 4, 5, 8],
    year: 1972,
    genres: ["Comedy"]
}, {
    title: "How to Train Your Dragon",
    image: "http://api.androidhive.info/json/movies/15.jpg",
    ratings: [6, 9, 8, 7, 5, 8],
    year: 2010,
    genres: ["Animation", "Adventure", "Family"]
}];

},{}]},{},[3])

//# sourceMappingURL=bundle.js.map
