//jshint esversion:6

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
//DB OF MOVIES ARE SET FROM AN ARRAY IN MOVIES.JS
//SOMETIMES DOESN'T LOAD ON FIRST ATTEMPT AND THE USER NEEDS TO REFRESH PAGE
//HAVE TRIED FIXING THIS BY SHIFITING LOADING ORDER OF SCRIPTS BUT TO NO
//PERMANENT SOLUTION. WILL FIX IN NEXT DRAFT
window.onload = function () {
  if (typeof(Storage) !== "undefined") {
    if(localStorage.getItem("Movies") === null) {
        localStorage.setItem("Movies", JSON.stringify(Movies));
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
const MovieWiki = {
  //FIRST MAIN PROPERTY THAT CONTAINS ALL THE HTML ELEMENTS FOR REFERENCE
    elements: {
      movieTable : document.getElementById('movie-table'),
      titleSort : document.getElementById('title-sort'),
      ratingSort : document.getElementById('rating-sort'),
      yearSort : document.getElementById('year-sort'),
      movieCreator : document.getElementById('movie-creator'),
      movieList: JSON.parse(localStorage.getItem("Movies")),
      movieResult: document.getElementById('movie-result'),
      selectedRating : document.getElementById('selected-rating'),
      modalTitle : document.getElementById('modal-movie-title'),
      modalYear : document.getElementById('modal-movie-year'),
      modalGenres : document.getElementById('modal-movie-genres'),
      modalRating : document.getElementById('modal-movie-rating'),
      modalPoster : document.getElementById('modal-movie-poster'),
      overlay : document.getElementById('overlay'),
      selectedMovieQuestion : document.getElementById("selected-movie-question"),
      movieModal : document.getElementById('movie-modal'),
      movieYearInput : document.forms.movieYearInput,
      movieGenreInput : document.forms.movieGenreInput,
      genreInput : document.forms.editGenre.genre,
      genreForm : document.forms.editGenre,
      genreErrorMessage : document.getElementById('error-message-genre'),
      listGenre : document.getElementsByClassName('list-genre'),
      listRating : document.getElementsByClassName('list-rating'),
      modalOpener : document.getElementsByClassName('modal-opener'),
      genreButton : document.getElementById('genre-button'),
      ratingButton : document.getElementById('rating-button'),
      ratingCirle : document.getElementById('rating-circle'),
      genreSuccess : document.getElementById('genre-success'),
      movieTitle : document.forms.movieAdder.title,
      movieYear : document.forms.movieAdder.year,
      movieGenres : document.forms.movieAdder.genres
    },
  //CONSTRUCTOR THAT CREATEs MOVIES WITH PROPER PROPERTIES WHEN CALLED
  //SEPERATED FROM REST OF THE METHODS FOR CLARITY
  //FORMAT VALIDATION IS DONE IN HTML FORM
  constructor: {
    Movie: function (title, year, genres, image) {
      this.title = title;
      this.year = year;
      this.genres = genres;
      this.ratings = [];
      this.image = image || 'pics/movie-placeholder.svg';
      }
  },
  //THIRD MAIN PROPERTY THAT CONTAINS ALL OF THE APP'S FUNCTIONALITY
  methods: {
    //CREATES A TABLE OF THE MOVIES IN THE DB AS THE INTERFACE FOR THE USER TO NAVIGATE
    //CALLED EACH TIME A NEW MOVIE IS ADDED
      createMovieList : function () {
        MovieWiki.elements.movieTable.innerHTML = '';
          for (let i = 0; i < MovieWiki.elements.movieList.length; i++){
            MovieWiki.elements.movieTable.innerHTML +=
            `<tr class="modal-opener" data-toggle="modal" data-id="${i + 1}" data-target="#movie-modal" onclick="MovieWiki.methods.createModal(${i})">
                <td>${MovieWiki.elements.movieList[i].title}</td>
                <td>${MovieWiki.elements.movieList[i].year}</td>
                <td class="list-genre">${MovieWiki.elements.movieList[i].genres}</td>
                <td class="list-rating">${MovieWiki.methods.getAverage(MovieWiki.elements.movieList[i].ratings)}</td>
            </tr>`
          ;
        }

      },
      //UPDATES THE LOCALSTORAGE LIST OF MOVIES. CALLED UPON WHENEVER THERE IS A CHANGE
      //WOULD LIKE TO AUTOMATE THIS THROUGH A WATCHER OR OBSERVER OF SOME KIND TO
      //AVOID CONSTANT CALLING. WILL ATTEMPT IN NEXT DRAFT
      setMovieDb : function () {
        return localStorage.setItem("Movies", JSON.stringify(MovieWiki.elements.movieList));
      },
      //THIS FUNCTION USES JUST ONE DIV ELEMENT BUT INDIVIDUAL DATA FOR EACH MOVIE.
      //THE BINDING FOR EACH MOVIE IS CREATED WHENEVER A MOVIE IS CLICKED ON.
      //INDEX OF MOVIE IS CREATED WHENEVER A MOVIE LIST IS RENDERED IN THE CREATEMOVIELIST FUNCTION
      createModal : function (index) {
          MovieWiki.elements.modalTitle.innerHTML = MovieWiki.elements.movieList[index].title;
          MovieWiki.elements.modalYear.innerHTML = MovieWiki.elements.movieList[index].year;
          MovieWiki.elements.genreInput.value = MovieWiki.elements.modalGenres.innerHTML = MovieWiki.elements.listGenre[index].innerHTML;
          MovieWiki.elements.modalRating.innerHTML = MovieWiki.methods.getAverage(MovieWiki.elements.movieList[index].ratings);
          MovieWiki.elements.modalPoster.src = MovieWiki.elements.movieList[index].image;
          MovieWiki.elements.ratingCirle.className = `c100 p${parseInt(MovieWiki.elements.modalRating.innerHTML) * 10}`;
          MovieWiki.elements.genreForm.onsubmit = function (e) {
            e.preventDefault();
            MovieWiki.methods.editGenre(index);
          };
          MovieWiki.elements.ratingButton.onclick = function () {
            MovieWiki.methods.rateMovie(index);
          };
      },
      //ADDS A NEW MOVIE THROUGH THE CONSTRUCTOR AND PUSHES IT INTO THE MOVIE ARRAY
      //CALLS FUNCTIONS TO UPDATE LOCAL STORAGE AND MOVIE TABLE INTERFACE
      //USER WILL BE ABLE TO PROVIDE IMAGE COVER OF MOVIE IN NEXT DRAFT
      addMovie : function () {
        let newMovie = new MovieWiki.constructor.Movie(MovieWiki.elements.movieTitle.value, MovieWiki.elements.movieYear.value, MovieWiki.elements.movieGenres.value.split(','));
        MovieWiki.elements.movieList.push(newMovie);
        this.setMovieDb();
        this.createMovieList();
      },
      //USES THE DATA-BINDINGS.JS LIBRARY TO CREATE A TWO-WAY DATA BINDING FOR A
      //LIVE PREVIEW WHENEVER USER WISHES TO ADD A MOVIE
      //PREVIEW WILL BE MOVED TO TOP OF TABLE IN NEXT DRAFT
      addMoviePreview : (function () {
             executed = false;
            return function () {
                if (!executed) {
                    executed = true;
                    MovieWiki.elements.movieTable.innerHTML +=
                    `
                     <tr>
                      <th></th>
                      <td class="title"></td>
                      <td class="year"></td>
                      <td class="genre"></td>
                      <td>N/A<td>
                    </tr>
                    `;
                }
            };
      })(),
      //UPDATES MOVIE RATING BASED ON USER INPUT AND
      //PUSHES THE RATING OF THE CHOSEN MOIVE INTO MOVIE ARRAY AND UPDATES LOCAL STORAGE.
      //CREATES A VISUAL EFFECT IN THE MODAL WHEN RATING IS UPDATED
      //BINDS INNERHTML OF TABLE AND MODAL COMPONENT SO THAT A FUNCTION IS NOT NEEDED TO RENDER
      rateMovie : function (index) {
        MovieWiki.elements.movieList[index].ratings.push(parseInt(MovieWiki.elements.selectedRating.value));
        MovieWiki.elements.listRating[index].innerHTML = MovieWiki.elements.modalRating.innerHTML = MovieWiki.methods.getAverage(MovieWiki.elements.movieList[index].ratings);
        MovieWiki.elements.ratingCirle.className = `c100 p${parseInt(MovieWiki.methods.getAverage(MovieWiki.elements.movieList[index].ratings)) * 10}`;
        this.setMovieDb();
      },
      //MAKES IT POSSIBLE TO ADD AND REMOVE GENRES.
      //HTML BINDING IS SIMILAR TO RATEMOVIE FUNCTION
      //VALIDATION IS DONE TO GET PROPER FORMAT
      //ONE VISUAL BUG IN MODAL WINDOW AFTER FAILED SUBMIT. WILL FIX IN NEXT DRAFT
      editGenre : function (index) {
         MovieWiki.elements.genreSuccess.classList.remove('invisible');
         setTimeout(function(){
           MovieWiki.elements.genreSuccess.classList.add('invisible');
         }, 1000);
         MovieWiki.elements.listGenre[index].innerHTML = MovieWiki.elements.modalGenres.innerHTML = MovieWiki.elements.genreInput.value;
         MovieWiki.elements.movieList[index].genres = MovieWiki.elements.genreInput.value.split(',');
         this.setMovieDb();

      },
      //CONTROLS THE FILTERING OF MOVIES BY CHECKING SELECTED VALUE AND
      //CALL APPROPRIATE FUNCTIONS, AS WELL AS SOME EVENT BINDINGS
      getSelected : function () {
        if (MovieWiki.elements.selectedMovieQuestion.selectedIndex !== 1) {
              MovieWiki.elements.movieYearInput.classList.add('invisible');
        }
        if (MovieWiki.elements.selectedMovieQuestion.selectedIndex !== 2) {
              MovieWiki.elements.movieGenreInput.classList.add('invisible');
        }
        if (MovieWiki.elements.selectedMovieQuestion.selectedIndex === 1) {
              MovieWiki.elements.movieYearInput.classList.remove('invisible');
              MovieWiki.elements.movieYearInput.year.addEventListener("keyup", function () {
              MovieWiki.methods.getMoviesThisYear(this.value);
          });
        }
        else if (MovieWiki.elements.selectedMovieQuestion.selectedIndex === 2) {
              MovieWiki.elements.movieGenreInput.classList.remove('invisible');
              MovieWiki.elements.movieGenreInput.genre.addEventListener("keyup", function () {
              MovieWiki.methods.getMoviesByGenre(this.value);
          });
        }
        else if (MovieWiki.elements.selectedMovieQuestion.selectedIndex === 3) {
          this.getTopRatedMovie();
        }
        else if (MovieWiki.elements.selectedMovieQuestion.selectedIndex === 4) {
          this.getWorstRatedMovie();
        }
        else {
            this.createMovieList();
          }
      },
      //CALCULATE AVERAGE RATING OF RATING ARRAY FOR DISPLAY PURPOSES
      //ALSO SETS A STANDARD VALUE OF N/A IF NO RATING IS FOUND
      getAverage : function (arr) {
        let sum = 0;
        if (arr.length !== 0) {
        for (let i = 0; i < arr.length; i++) {
          sum+= arr[i];
        }
        return (sum/arr.length).toFixed(1);
        }
        else {
          return 'N/A';
        }

      },
      //CHECKS FOR TOP RATED MOVIE BY COMPARING EACH MOVIE'S RATING AND SORTING
      //ACCORDINGLY.
      //PREVENTS MOVIES WITH ONE OR LESS RATING TO BE DISPLAYED
      getTopRatedMovie : function () {
        let multipleRatings = MovieWiki.elements.movieList.filter(movie => movie.ratings.length > 1);
        let topRated = multipleRatings.reduce(
          (prevVal, currVal) =>
          MovieWiki.methods.getAverage(prevVal.ratings) > MovieWiki.methods.getAverage(currVal.ratings)
          ? prevVal
          : currVal
        );
        return MovieWiki.elements.movieList.filter(
                (movie, index) =>
                movie === topRated
                ? MovieWiki.elements.modalOpener[index].style.display = "table-row"
                : MovieWiki.elements.modalOpener[index].style.display = "none"

        );
      },
      //BASICALLY THE SAME FUNCTION AS ABOVE, JUST WITH A REVERSED SORTING ORDER
      getWorstRatedMovie : function () {
        let multipleRatings = MovieWiki.elements.movieList.filter(movie => movie.ratings.length > 1);
        let worstRated = multipleRatings.reduce(
          (prevVal, currVal) =>
          MovieWiki.methods.getAverage(prevVal.ratings) < MovieWiki.methods.getAverage(currVal.ratings)
          ? prevVal
          : currVal
        );
        return MovieWiki.elements.movieList.filter(
                (movie, index) =>
                movie === worstRated
                ? MovieWiki.elements.modalOpener[index].style.display = "table-row"
                : MovieWiki.elements.modalOpener[index].style.display = "none"

        );
    },
    //FINDS MOVIES THAT MATCHES THE SELECTED YEAR AND HIDES THE OTHERS
      getMoviesThisYear : function (movieYear) {
            return MovieWiki.elements.movieList.filter(
              (movie, index) =>
              movie.year === parseInt(movieYear)
              ? MovieWiki.elements.modalOpener[index].style.display = "table-row"
              : MovieWiki.elements.modalOpener[index].style.display = "none"
            );


      },
      //VERY SIMILIAR TO THE ABOVE FILTER FUNCTION, JUST A SLIGHT CHANGE IN SYNTAX
      //AS GENRES PROP IS AN ARRAY THAT CAN CONTAIN MULTIPLE VALUES
      getMoviesByGenre : function (movieGenre) {
        return MovieWiki.elements.movieList.filter(
          (movie, index) =>
          movie.genres.includes(movieGenre)
          ? MovieWiki.elements.modalOpener[index].style.display = "table-row"
          : MovieWiki.elements.modalOpener[index].style.display = "none"
        );
      },
      //WILL SORT MOVIES IN THE TABLE.
      //TO BE ADDED IN NEXT DRAFT
      // sortMovies : function (prop) {
      //   var movieArr = [];
      //   if (MovieWiki.elements.movieList[0].prop > MovieWiki.elements.movieList[1].prop) {
      //     movieArr = MovieWiki.elements.movieList.sort((a, b) => a.prop - b.prop);
      //   }
      //   else {
      //     movieArr = MovieWiki.elements.movieList.sort((a, b) => b.prop - a.prop);
      //   }
      //   MovieWiki.elements.movieTable.innerHTML = '';
      //   for (let i = 0; i < movieArr.length; i++){
      //     MovieWiki.elements.movieTable.innerHTML +=
      //     `<tr>
      //         <th scope="row">${i + 1}</th>
      //         <td>${movieArr[i].title}</td>
      //         <td>${movieArr[i].year}</td>
      //         <td>${movieArr[i].genres}</td>
      //         <td>${MovieWiki.methods.getAverage(movieArr[i].ratings)}</td>
      //     </tr>`
      //     ;
      //   }
      // },
    }
};

//PREVENTS BLANK SPACE AS FIRST USER INPUT IN ALL INPUT FIELDS
const inputs = document.querySelectorAll('input');
for (let i = 0; i < inputs.length; i++) {
inputs[i].addEventListener("keydown", function(event) {
    if (event.which === 32 && event.target.selectionStart === 0) {
        event.preventDefault();
      }
    });
  }
