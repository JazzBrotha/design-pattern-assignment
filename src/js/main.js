//jshint esversion:6
import MovieDb from './movies.js'
import Elements from './elements.js'
import Movie from './constructor.js'
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
  if (typeof(Storage) !== "undefined") {
    if(localStorage.getItem("MovieDb") === null) {
        localStorage.setItem("MovieDb", JSON.stringify(MovieDb));
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

  //CONSTRUCTOR THAT CREATEs MovieDb WITH PROPER PROPERTIES WHEN CALLED
  //SEPERATED FROM REST OF THE METHODS FOR CLARITY
  //FORMAT VALIDATION IS DONE IN HTML FORM
  constructor: {
    Movie: function (title, year, genres, image) {
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
      createMovieList : function () {
        Elements.movieTable.innerHTML = '';
          for (let i = 0; i < Elements.movieList.length; i++){
            Elements.movieTable.innerHTML +=
            `<tr class="modal-opener" data-toggle="modal" data-id="${i + 1}">
                <td><figure class="avatar avatar-xl avatar-rectangle"><img src="${Elements.movieList[i].image}"></img></figure></td>
                <td>${Elements.movieList[i].title}</td>
                <td>${Elements.movieList[i].year}</td>
                <td class="list-genre">${Elements.movieList[i].genres}</td>
                <td class="list-rating">${MovieWiki.methods.getAverage(Elements.movieList[i].ratings)}</td>
            </tr>
              <button type="button" name="button" id="testbutton">Test Me</button>
              `
          ;
          const test = document.getElementById('testbutton');
          test.onclick = function() {
            Elements.movieModal.classList.add('active');
            MovieWiki.methods.createModal(i);
          };
      }

      },
      //UPDATES THE LOCALSTORAGE LIST OF MovieDb. CALLED UPON WHENEVER THERE IS A CHANGE
      //WOULD LIKE TO AUTOMATE THIS THROUGH A WATCHER OR OBSERVER OF SOME KIND TO
      //AVOID CONSTANT CALLING. WILL ATTEMPT IN NEXT DRAFT
      setMovieDb : function () {
        return localStorage.setItem("MovieDb", JSON.stringify(Elements.movieList));
      },
      //THIS FUNCTION USES JUST ONE DIV ELEMENT BUT INDIVIDUAL DATA FOR EACH MOVIE.
      //THE BINDING FOR EACH MOVIE IS CREATED WHENEVER A MOVIE IS CLICKED ON.
      //INDEX OF MOVIE IS CREATED WHENEVER A MOVIE LIST IS RENDERED IN THE CREATEMOVIELIST FUNCTION
      createModal : function (index) {
          Elements.modalTitle.innerHTML = Elements.movieList[index].title;
          Elements.modalYear.innerHTML = Elements.movieList[index].year;
          Elements.genreInput.value = Elements.modalGenres.innerHTML = Elements.listGenre[index].innerHTML;
          Elements.modalRating.innerHTML = MovieWiki.methods.getAverage(Elements.movieList[index].ratings);
          Elements.modalPoster.src = Elements.movieList[index].image;
          Elements.ratingCirle.className = `c100 p${parseInt(Elements.modalRating.innerHTML) * 10}`;
          Elements.genreForm.onsubmit = function (e) {
            e.preventDefault();
            MovieWiki.methods.editGenre(index);
          };
          Elements.ratingButton.onclick = function () {
            MovieWiki.methods.rateMovie(index);
          };
          const closeButton = document.getElementById('modal-close');
          closeButton.onclick = function() {
            Elements.movieModal.classList.remove('active');
          };
      },
      //ADDS A NEW MOVIE THROUGH THE CONSTRUCTOR AND PUSHES IT INTO THE MOVIE ARRAY
      //CALLS FUNCTIONS TO UPDATE LOCAL STORAGE AND MOVIE TABLE INTERFACE
      //USER WILL BE ABLE TO PROVIDE IMAGE COVER OF MOVIE IN NEXT DRAFT
      addMovie : function () {
        let newMovie = new Movie(Elements.movieTitle.value, Elements.movieYear.value, Elements.movieGenres.value.split(','));
        Elements.movieList.push(newMovie);
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
      rateMovie : function (index) {
        Elements.movieList[index].ratings.push(parseInt(Elements.selectedRating.value));
        Elements.listRating[index].innerHTML = Elements.modalRating.innerHTML = MovieWiki.methods.getAverage(Elements.movieList[index].ratings);
        Elements.ratingCirle.className = `c100 p${parseInt(MovieWiki.methods.getAverage(Elements.movieList[index].ratings)) * 10}`;
        this.setMovieDb();
      },
      //MAKES IT POSSIBLE TO ADD AND REMOVE GENRES.
      //HTML BINDING IS SIMILAR TO RATEMOVIE FUNCTION
      //VALIDATION IS DONE TO GET PROPER FORMAT
      //ONE VISUAL BUG IN MODAL WINDOW AFTER FAILED SUBMIT. WILL FIX IN NEXT DRAFT
      editGenre : function (index) {
         Elements.genreSuccess.classList.remove('invisible');
         setTimeout(function(){
           Elements.genreSuccess.classList.add('invisible');
         }, 1000);
         Elements.listGenre[index].innerHTML = Elements.modalGenres.innerHTML = Elements.genreInput.value;
         Elements.movieList[index].genres = Elements.genreInput.value.split(',');
         this.setMovieDb();

      },
      //CONTROLS THE FILTERING OF MovieDb BY CHECKING SELECTED VALUE AND
      //CALL APPROPRIATE FUNCTIONS, AS WELL AS SOME EVENT BINDINGS
      getSelected : function () {
        if (Elements.selectedMovieQuestion.selectedIndex !== 1) {
              Elements.movieYearInput.classList.add('invisible');
        }
        if (Elements.selectedMovieQuestion.selectedIndex !== 2) {
              Elements.movieGenreInput.classList.add('invisible');
        }
        if (Elements.selectedMovieQuestion.selectedIndex === 1) {
              Elements.movieYearInput.classList.remove('invisible');
              Elements.movieYearInput.year.addEventListener("keyup", function () {
              MovieWiki.methods.getMovieDbThisYear(this.value);
          });
        }
        else if (Elements.selectedMovieQuestion.selectedIndex === 2) {
              Elements.movieGenreInput.classList.remove('invisible');
              Elements.movieGenreInput.genre.addEventListener("keyup", function () {
              MovieWiki.methods.getMovieDbByGenre(this.value);
          });
        }
        else if (Elements.selectedMovieQuestion.selectedIndex === 3) {
          this.getTopRatedMovie();
        }
        else if (Elements.selectedMovieQuestion.selectedIndex === 4) {
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
      //PREVENTS MovieDb WITH ONE OR LESS RATING TO BE DISPLAYED
      getTopRatedMovie : function () {
        let multipleRatings = Elements.movieList.filter(movie => movie.ratings.length > 1);
        let topRated = multipleRatings.reduce(
          (prevVal, currVal) =>
          MovieWiki.methods.getAverage(prevVal.ratings) > MovieWiki.methods.getAverage(currVal.ratings)
          ? prevVal
          : currVal
        );
        return Elements.movieList.filter(
                (movie, index) =>
                movie === topRated
                ? Elements.modalOpener[index].style.display = "table-row"
                : Elements.modalOpener[index].style.display = "none"

        );
      },
      //BASICALLY THE SAME FUNCTION AS ABOVE, JUST WITH A REVERSED SORTING ORDER
      getWorstRatedMovie : function () {
        let multipleRatings = Elements.movieList.filter(movie => movie.ratings.length > 1);
        let worstRated = multipleRatings.reduce(
          (prevVal, currVal) =>
          MovieWiki.methods.getAverage(prevVal.ratings) < MovieWiki.methods.getAverage(currVal.ratings)
          ? prevVal
          : currVal
        );
        return Elements.movieList.filter(
                (movie, index) =>
                movie === worstRated
                ? Elements.modalOpener[index].style.display = "table-row"
                : Elements.modalOpener[index].style.display = "none"

        );
    },
    //FINDS MovieDb THAT MATCHES THE SELECTED YEAR AND HIDES THE OTHERS
      getMovieDbThisYear : function (movieYear) {
            return Elements.movieList.filter(
              (movie, index) =>
              movie.year === parseInt(movieYear)
              ? Elements.modalOpener[index].style.display = "table-row"
              : Elements.modalOpener[index].style.display = "none"
            );


      },
      //VERY SIMILIAR TO THE ABOVE FILTER FUNCTION, JUST A SLIGHT CHANGE IN SYNTAX
      //AS GENRES PROP IS AN ARRAY THAT CAN CONTAIN MULTIPLE VALUES
      getMovieDbByGenre : function (movieGenre) {
        return Elements.movieList.filter(
          (movie, index) =>
          movie.genres.includes(movieGenre)
          ? Elements.modalOpener[index].style.display = "table-row"
          : Elements.modalOpener[index].style.display = "none"
        );
      },
      //WILL SORT MovieDb IN THE TABLE.
      //TO BE ADDED IN NEXT DRAFT
      // sortMovieDb : function (prop) {
      //   var movieArr = [];
      //   if (Elements.movieList[0].prop > Elements.movieList[1].prop) {
      //     movieArr = Elements.movieList.sort((a, b) => a.prop - b.prop);
      //   }
      //   else {
      //     movieArr = Elements.movieList.sort((a, b) => b.prop - a.prop);
      //   }
      //   Elements.movieTable.innerHTML = '';
      //   for (let i = 0; i < movieArr.length; i++){
      //     Elements.movieTable.innerHTML +=
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
