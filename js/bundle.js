(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//CONSTRUCTOR THAT CREATEs MovieDb WITH PROPER PROPERTIES WHEN CALLED
//SEPERATED FROM REST OF THE METHODS FOR CLARITY
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
// This way. whenever a variable is declared in our app we know that is does not reference a html element
module.exports = {
    allMoviesLink: document.getElementById('all-movies-link'),
    cardBody: document.getElementsByClassName('card-body'),
    cardContainer: document.getElementById('card-container'),
    closeNewMovie: document.getElementById('close-new-movie'),
    editButton: document.getElementById('edit-button'),
    editModal: document.getElementById('edit-modal'),
    genreContainer: document.getElementById('genre-container'),
    genreEditChip: document.getElementsByClassName('genre-edit-chip'),
    // genreButton : document.getElementsByClassName('genre-button'),
    // genreErrorMessage : document.getElementById('error-message-genre'),
    // genreForm : document.forms.editGenre,
    // genreInput : document.forms.editGenre.genre,
    genreLabelCount: document.getElementsByClassName('genre-label-count'),
    genreLinkName: document.getElementsByClassName('genre-link-name'),
    // genreSuccess : document.getElementById('genre-success'),
    listGenre: document.getElementsByClassName('list-genre'),
    listRating: document.getElementsByClassName('list-rating'),
    modalCloseButton: document.getElementsByClassName('modal-close-button'),
    modalGenres: document.getElementById('modal-movie-genres'),
    modalOpener: document.getElementsByClassName('modal-opener'),
    modalPoster: document.getElementById('modal-movie-poster'),
    modalRating: document.getElementById('modal-movie-rating'),
    modals: document.getElementsByClassName('modal'),
    modalTitle: document.getElementById('modal-movie-title'),
    modalYear: document.getElementById('modal-movie-year'),
    movieCardContainer: document.getElementsByClassName('movie-card-container'),
    movieCover: document.forms.movieCreator.cover,
    movieCreator: document.forms.movieCreator,
    movieGenreInput: document.forms.movieGenreInput,
    movieGenres: document.forms.movieCreator.genres,
    movieList: JSON.parse(localStorage.getItem("MovieDb")),
    movieModal: document.getElementById('movie-modal'),
    movieResult: document.getElementById('movie-result'),
    movieTitle: document.forms.movieCreator.title,
    movieYear: document.forms.movieCreator.year,
    movieYearInput: document.getElementById('movie-year-input'),
    newMovieLink: document.getElementById('new-movie-link'),
    newMovieModal: document.getElementById('new-movie-modal'),
    newRatingCircle: document.getElementById('new-rating-circle'),
    newRatingSpan: document.getElementById('new-rating-span'),
    ratingButton: document.getElementsByClassName('rating-button'),
    ratingCirle: document.getElementById('rating-circle'),
    ratingModal: document.getElementById('rating-modal'),
    ratingSlider: document.getElementById('rating-slider'),
    ratingSort: document.getElementById('rating-sort'),
    selectedMovieQuestion: document.getElementById("selected-movie-question"),
    selectedRating: document.getElementById('selected-rating'),
    submitEditButton: document.getElementById('submit-edit-button'),
    titleSort: document.getElementById('title-sort'),
    topRatedLink: document.getElementById('top-rated-link'),
    worstRatedLink: document.getElementById('worst-rated-link'),
    yearSort: document.getElementById('year-sort')
};

},{}],3:[function(require,module,exports){
'use strict';

var _elements = require('./elements.js');

var _elements2 = _interopRequireDefault(_elements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function () {
  //PREVENTS BLANK SPACE AS FIRST USER INPUT IN ALL INPUT FIELDS
  var inputs = document.querySelectorAll('input');
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("keydown", function (event) {
      if (event.which === 32 && event.target.selectionStart === 0) {
        event.preventDefault();
      }
    });
  }

  var modalCloseButtonArr = Array.from(_elements2.default.modalCloseButton);
  modalCloseButtonArr.forEach(function (button, index) {
    button.onclick = function () {
      _elements2.default.modals[index].classList.remove('active');
    };
  });
}();
// Elements.closeRatingModal.onclick = function() {
//    Elements.editModal.classList.remove('active');
//    for (let editChip of Elements.genreEditChip) {
//      editChip.classList.remove('active');
//    }
//
//  };
//jshint esversion: 6

},{"./elements.js":2}],4:[function(require,module,exports){
'use strict';

var _movies = require('./movies.js');

var _movies2 = _interopRequireDefault(_movies);

var _elements = require('./elements.js');

var _elements2 = _interopRequireDefault(_elements);

var _constructor = require('./constructor.js');

var _constructor2 = _interopRequireDefault(_constructor);

var _handlers = require('./handlers.js');

var _handlers2 = _interopRequireDefault(_handlers);

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
//jshint esversion:6
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
  Methods.createMovieList();
};

//OBJECT LITERAL THAT CONTAINS APP
var Methods = {

  //CREATES A TABLE OF THE MovieDb IN THE DB AS THE INTERFACE FOR THE USER TO NAVIGATE
  //CALLED EACH TIME A NEW MOVIE IS ADDED
  createMovieList: function createMovieList() {
    _elements2.default.cardContainer.innerHTML = '';
    for (var i = 0; i < _elements2.default.movieList.length; i++) {
      _elements2.default.cardContainer.innerHTML += '\n          <div class="column col-3 movie-card-container">\n             <div class="card">\n                          <div class="card-image">\n                            <img class="img-responsive" src="' + _elements2.default.movieList[i].image + '">\n                          </div>\n                          <div class="card-header">\n                            <h4 class="card-title">' + _elements2.default.movieList[i].title + '</h4>\n                            <h6 class="card-meta">' + _elements2.default.movieList[i].year + '</h6>\n                          </div>\n                          <div class="card-body">\n                          </div>\n                          <div class="card-footer">\n                          <div class="bar">\n                          <div class="bar-item" style="width:' + Methods.getAverage(_elements2.default.movieList[i].ratings) * 10 + '%;background:#818BD5;">' + Methods.getAverage(_elements2.default.movieList[i].ratings) + '<span class="muted"></span></div>\n                          </div>\n                          </div>\n                        </div>\n\n                        </div>\n          ';
      for (var j = 0; j < _elements2.default.movieList[i].genres.length; j++) {
        _elements2.default.cardBody[i].innerHTML += '<label class="chip">' + _elements2.default.movieList[i].genres[j] + '</label>';
      }
    }
    var movieCovers = document.getElementsByClassName('card-image');

    var _loop = function _loop(_i) {
      movieCovers[_i].onclick = function () {
        openNav(_i);
      };
      movieCovers[_i].style.cursor = 'pointer';
    };

    for (var _i = 0; _i < movieCovers.length; _i++) {
      _loop(_i);
    }
    var closebtn = document.getElementById('close');
    closebtn.onclick = closeNav;

    var ratingButtonArr = Array.from(_elements2.default.ratingButton);
    ratingButtonArr.forEach(function (button, index) {
      return button.onclick = function () {
        return Methods.rateMovie(index);
      };
    });
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
    _elements2.default.modalRating.innerHTML = Methods.getAverage(_elements2.default.movieList[index].ratings);
    _elements2.default.modalPoster.src = _elements2.default.movieList[index].image;
    _elements2.default.ratingCirle.className = 'c100 p' + parseInt(_elements2.default.modalRating.innerHTML) * 10;
    _elements2.default.genreForm.onsubmit = function (e) {
      e.preventDefault();
      Methods.editGenre(index);
    };
    _elements2.default.ratingButton.onclick = function () {
      Methods.rateMovie(index);
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
    var newMovie = new _constructor2.default(_elements2.default.movieTitle.value, _elements2.default.movieYear.value, _elements2.default.movieGenres.value.split(','), _elements2.default.movieCover.value);
    _elements2.default.movieList.push(newMovie);
    this.setMovieDb();
    this.createMovieList();
    _elements2.default.newMovieModal.classList.remove('active');
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
    _elements2.default.ratingModal.classList.add('active');
    _elements2.default.modalTitle.innerHTML = _elements2.default.movieList[index].title;
    _elements2.default.modalYear.innerHTML = _elements2.default.movieList[index].year;
    _elements2.default.modalPoster.src = _elements2.default.movieList[index].image;
    for (var i = 0; i < _elements2.default.movieList[index].genres.length; i++) {
      _elements2.default.modalGenres.innerHTML += '<span class="chip">' + _elements2.default.movieList[index].genres[i] + '</span>';
    }
    _elements2.default.modalRating.innerHTML = Methods.getAverage(_elements2.default.movieList[index].ratings);
    // Elements.ratingCirle.className = `c100 p${parseInt(Elements.modalRating.innerHTML) * 10}`;
    // Elements.movieList[index].ratings.push(parseInt(Elements.selectedRating.value));
    // Elements.listRating[index].innerHTML = Elements.modalRating.innerHTML = Methods.getAverage(Elements.movieList[index].ratings);
    // Elements.ratingCirle.className = `c100 p${parseInt(Methods.getAverage(Elements.movieList[index].ratings)) * 10}`;
    // this.setMovieDb();
  },
  //MAKES IT POSSIBLE TO ADD AND REMOVE GENRES.
  //HTML BINDING IS SIMILAR TO RATEMOVIE FUNCTION
  //VALIDATION IS DONE TO GET PROPER FORMAT
  //ONE VISUAL BUG IN MODAL WINDOW AFTER FAILED SUBMIT. WILL FIX IN NEXT DRAFT
  editGenre: function editGenre(index) {
    _elements2.default.listGenre[index].innerHTML = _elements2.default.modalGenres.innerHTML = _elements2.default.genreInput.value;
    _elements2.default.movieList[index].genres = _elements2.default.genreInput.value.split(',');
    this.setMovieDb();
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
      return Methods.getAverage(prevVal.ratings) > Methods.getAverage(currVal.ratings) ? prevVal : currVal;
    });
    return _elements2.default.movieList.filter(function (movie, index) {
      return movie === topRated ? _elements2.default.movieCardContainer[index].style.display = "block" : _elements2.default.movieCardContainer[index].style.display = "none";
    });
  },
  //BASICALLY THE SAME FUNCTION AS ABOVE, JUST WITH A REVERSED SORTING ORDER
  getWorstRatedMovie: function getWorstRatedMovie() {
    var multipleRatings = _elements2.default.movieList.filter(function (movie) {
      return movie.ratings.length > 1;
    });
    var worstRated = multipleRatings.reduce(function (prevVal, currVal) {
      return Methods.getAverage(prevVal.ratings) < Methods.getAverage(currVal.ratings) ? prevVal : currVal;
    });
    return _elements2.default.movieList.filter(function (movie, index) {
      return movie === worstRated ? _elements2.default.movieCardContainer[index].style.display = "block" : _elements2.default.movieCardContainer[index].style.display = "none";
    });
  },
  //FINDS MovieDb THAT MATCHES THE SELECTED YEAR AND HIDES THE OTHERS
  getMoviesThisYear: function getMoviesThisYear(movieYear) {
    return _elements2.default.movieList.filter(function (movie, index) {
      return movie.year === parseInt(movieYear) ? _elements2.default.movieCardContainer[index].style.display = "block" : _elements2.default.movieCardContainer[index].style.display = "none";
    });
  },
  //VERY SIMILIAR TO THE ABOVE FILTER FUNCTION, JUST A SLIGHT CHANGE IN SYNTAX
  //AS GENRES PROP IS AN ARRAY THAT CAN CONTAIN MULTIPLE VALUES
  getMoviesByGenre: function getMoviesByGenre(movieGenre) {
    return _elements2.default.movieList.filter(function (movie, index) {
      return movie.genres.includes(movieGenre) ? _elements2.default.movieCardContainer[index].style.display = "block" : _elements2.default.movieCardContainer[index].style.display = "none";
    });
  },
  getAllMovies: function getAllMovies() {
    var movieCardArr = Array.from(_elements2.default.movieCardContainer);
    return movieCardArr.forEach(function (card) {
      return card.style.display = "block";
    });
  }
};

_elements2.default.movieCreator.onsubmit = function (e) {
  e.preventDefault();
  Methods.addMovie();
};

// Elements.closeNewMovie.onclick = function () {
//   Elements.newMovieModal.classList.remove('active');
// };

_elements2.default.newMovieLink.onclick = function () {
  _elements2.default.newMovieModal.classList.add('active');
};

// for (let i = 0; i < Elements.genreLinkName.length; i++) {
//   for (let j = 0; j < Elements.movieList.length; j++) {
//     if (Elements.movieList[j].genres.includes(Elements.genreLinkName[i].innerHTML)) {
//        Elements.genreLabelCount[i].innerHTML ++;
//     }
//   }
// }

_elements2.default.topRatedLink.onclick = Methods.getTopRatedMovie;
_elements2.default.worstRatedLink.onclick = Methods.getWorstRatedMovie;
_elements2.default.allMoviesLink.onclick = Methods.getAllMovies;

function openNav(index) {
  document.getElementById("mySidenav").style.width = "600px";
  _elements2.default.modalTitle.innerHTML = _elements2.default.movieList[index].title;
  _elements2.default.modalYear.innerHTML = _elements2.default.movieList[index].year;
  _elements2.default.modalPoster.src = _elements2.default.movieList[index].image;
  _elements2.default.modalGenres.innerHTML = '';
  for (var i = 0; i < _elements2.default.movieList[index].genres.length; i++) {
    _elements2.default.modalGenres.innerHTML += '<span class="chip sidenav-genre-chip">' + _elements2.default.movieList[index].genres[i] + '</span>';
  }
  _elements2.default.modalRating.innerHTML = Methods.getAverage(_elements2.default.movieList[index].ratings);
  _elements2.default.ratingCirle.className = 'c100 p' + parseInt(_elements2.default.modalRating.innerHTML) * 10;
  _elements2.default.editButton.onclick = function () {
    test(index);
  };
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

function test(index) {
  var genreChip = document.getElementsByClassName('sidenav-genre-chip');
  _elements2.default.editModal.classList.add('active');
  _elements2.default.newRatingSpan.innerHTML = _elements2.default.modalRating.innerHTML;
  _elements2.default.newRatingCircle.classList = _elements2.default.ratingCirle.classList;
  _elements2.default.ratingSlider.value = 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = genreChip[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var genre = _step.value;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = _elements2.default.genreEditChip[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var editChip = _step2.value;

          if (genre.innerHTML === editChip.innerHTML.trim()) {
            editChip.classList.add('active');
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  _elements2.default.submitEditButton.onclick = function () {
    editMovie(index);
  };
}

_elements2.default.ratingSlider.oninput = function () {
  _elements2.default.newRatingSpan.innerHTML = this.value;
  _elements2.default.newRatingCircle.className = 'c100 p' + this.value * 10;
};

for (var i = 0; i < _elements2.default.genreEditChip.length; i++) {
  _elements2.default.genreEditChip[i].onclick = function () {
    if (!this.classList.contains('active')) {
      this.classList.add('active');
    } else {
      this.classList.remove('active');
    }
  };
}
var _iteratorNormalCompletion3 = true;
var _didIteratorError3 = false;
var _iteratorError3 = undefined;

try {
  for (var _iterator3 = _elements2.default.genreLinkName[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
    var link = _step3.value;

    link.onclick = function () {
      Methods.getMoviesByGenre(this.innerHTML.trim());
    };
  }
} catch (err) {
  _didIteratorError3 = true;
  _iteratorError3 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion3 && _iterator3.return) {
      _iterator3.return();
    }
  } finally {
    if (_didIteratorError3) {
      throw _iteratorError3;
    }
  }
}

_elements2.default.yearSort.onclick = function () {
  _elements2.default.movieYearInput.classList.remove('hide');
  _elements2.default.movieYearInput.focus();
  _elements2.default.movieYearInput.select();
  _elements2.default.movieYearInput.addEventListener('keyup', function () {
    Methods.getMoviesThisYear(this.value);
  });
};

function editMovie(index) {
  var newGenreArr = [];
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = _elements2.default.genreEditChip[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var activeGenres = _step4.value;

      if (activeGenres.classList.contains('active')) {
        newGenreArr.push(activeGenres.innerHTML.trim());
      }
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4.return) {
        _iterator4.return();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }

  _elements2.default.movieList[index].genres = newGenreArr;
  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = _elements2.default.genreEditChip[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      var editChip = _step5.value;

      editChip.classList.remove('active');
    }
  } catch (err) {
    _didIteratorError5 = true;
    _iteratorError5 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion5 && _iterator5.return) {
        _iterator5.return();
      }
    } finally {
      if (_didIteratorError5) {
        throw _iteratorError5;
      }
    }
  }

  if (!_elements2.default.newRatingCircle.innerHTML.includes('.')) {
    _elements2.default.movieList[index].ratings.push(parseInt(_elements2.default.ratingSlider.value));
  }
  _elements2.default.editModal.classList.remove('active');
}

},{"./constructor.js":1,"./elements.js":2,"./handlers.js":3,"./movies.js":5}],5:[function(require,module,exports){
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

},{}]},{},[4])

//# sourceMappingURL=bundle.js.map
