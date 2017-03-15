//jshint esversion:6
import MovieDb from './movies.js'
import Elements from './elements.js'
import Movie from './constructor.js'
import Handlers from './handlers.js'

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
  Methods.createMovieList();
};

//OBJECT LITERAL THAT CONTAINS APP
const Methods = {

    //CREATES A TABLE OF THE MovieDb IN THE DB AS THE INTERFACE FOR THE USER TO NAVIGATE
    //CALLED EACH TIME A NEW MOVIE IS ADDED
      createMovieList : function () {
        Elements.cardContainer.innerHTML = '';
          for (let i = 0; i < Elements.movieList.length; i++){
            Elements.cardContainer.innerHTML +=
          `
          <div class="column col-3 movie-card-container">
             <div class="card">
                          <div class="card-image">
                            <img class="img-responsive" src="${Elements.movieList[i].image}">
                          </div>
                          <div class="card-header">
                            <h4 class="card-title">${Elements.movieList[i].title}</h4>
                            <h6 class="card-meta">${Elements.movieList[i].year}</h6>
                          </div>
                          <div class="card-body">
                          </div>
                          <div class="card-footer">
                          <div class="bar">
                          <div class="bar-item" style="width:${Methods.getAverage(Elements.movieList[i].ratings)* 10}%;background:#818BD5;">${Methods.getAverage(Elements.movieList[i].ratings)}<span class="muted"></span></div>
                          </div>
                          </div>
                        </div>

                        </div>
          `
          ;
          for (let j = 0; j < Elements.movieList[i].genres.length; j++) {
            Elements.cardBody[i].innerHTML +=  `<label class="chip">${Elements.movieList[i].genres[j]}</label>`;
          }

    }
    const movieCovers = document.getElementsByClassName('card-image');
    for (let i = 0; i < movieCovers.length; i++) {
      movieCovers[i].onclick = function() {
        openNav(i);
      };
      movieCovers[i].style.cursor = 'pointer';
    }
    const closebtn = document.getElementById('close');
    closebtn.onclick = closeNav;

    let ratingButtonArr = Array.from(Elements.ratingButton);
    ratingButtonArr.forEach((button, index) =>
      button.onclick = function() {
        return Methods.rateMovie(index);
      }
    );

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
          Elements.modalRating.innerHTML = Methods.getAverage(Elements.movieList[index].ratings);
          Elements.modalPoster.src = Elements.movieList[index].image;
          Elements.ratingCirle.className = `c100 p${parseInt(Elements.modalRating.innerHTML) * 10}`;
          Elements.genreForm.onsubmit = function (e) {
            e.preventDefault();
            Methods.editGenre(index);
          };
          Elements.ratingButton.onclick = function () {
            Methods.rateMovie(index);
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
        let newMovie = new Movie(Elements.movieTitle.value, Elements.movieYear.value, Elements.movieGenres.value.split(','), Elements.movieCover.value);
        Elements.movieList.push(newMovie);
        this.setMovieDb();
        this.createMovieList();
        Elements.newMovieModal.classList.remove('active');
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
        Elements.ratingModal.classList.add('active');
        Elements.modalTitle.innerHTML = Elements.movieList[index].title;
        Elements.modalYear.innerHTML = Elements.movieList[index].year;
        Elements.modalPoster.src = Elements.movieList[index].image;
        for (let i = 0; i < Elements.movieList[index].genres.length; i++) {
          Elements.modalGenres.innerHTML +=  `<span class="chip">${Elements.movieList[index].genres[i]}</span>`;
        }
        Elements.modalRating.innerHTML = Methods.getAverage(Elements.movieList[index].ratings);
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
      editGenre : function (index) {
         Elements.listGenre[index].innerHTML = Elements.modalGenres.innerHTML = Elements.genreInput.value;
         Elements.movieList[index].genres = Elements.genreInput.value.split(',');
         this.setMovieDb();

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
          Methods.getAverage(prevVal.ratings) > Methods.getAverage(currVal.ratings)
          ? prevVal
          : currVal
        );
        return Elements.movieList.filter(
                (movie, index) =>
                movie === topRated
                ? Elements.movieCardContainer[index].style.display = "block"
                : Elements.movieCardContainer[index].style.display = "none"

        );
      },
      //BASICALLY THE SAME FUNCTION AS ABOVE, JUST WITH A REVERSED SORTING ORDER
      getWorstRatedMovie : function () {
        let multipleRatings = Elements.movieList.filter(movie => movie.ratings.length > 1);
        let worstRated = multipleRatings.reduce(
          (prevVal, currVal) =>
          Methods.getAverage(prevVal.ratings) < Methods.getAverage(currVal.ratings)
          ? prevVal
          : currVal
        );
        return Elements.movieList.filter(
                (movie, index) =>
                movie === worstRated
                ? Elements.movieCardContainer[index].style.display = "block"
                : Elements.movieCardContainer[index].style.display = "none"

        );
    },
    //FINDS MovieDb THAT MATCHES THE SELECTED YEAR AND HIDES THE OTHERS
      getMoviesThisYear : function (movieYear) {
            return Elements.movieList.filter(
              (movie, index) =>
              movie.year === parseInt(movieYear)
              ? Elements.movieCardContainer[index].style.display = "block"
              : Elements.movieCardContainer[index].style.display = "none"
            );


      },
      //VERY SIMILIAR TO THE ABOVE FILTER FUNCTION, JUST A SLIGHT CHANGE IN SYNTAX
      //AS GENRES PROP IS AN ARRAY THAT CAN CONTAIN MULTIPLE VALUES
      getMoviesByGenre : function (movieGenre) {
        return Elements.movieList.filter(
          (movie, index) =>
          movie.genres.includes(movieGenre)
          ? Elements.movieCardContainer[index].style.display = "block"
          : Elements.movieCardContainer[index].style.display = "none"
        );
      },
      getAllMovies : function () {
        let movieCardArr = Array.from(Elements.movieCardContainer);
        return movieCardArr.forEach(card =>
          card.style.display = "block"
        );
      }
};


  Elements.movieCreator.onsubmit = function (e) {
    e.preventDefault();
    Methods.addMovie();
};

// Elements.closeNewMovie.onclick = function () {
//   Elements.newMovieModal.classList.remove('active');
// };

Elements.newMovieLink.onclick = function(){
  Elements.newMovieModal.classList.add('active');
};

// for (let i = 0; i < Elements.genreLinkName.length; i++) {
//   for (let j = 0; j < Elements.movieList.length; j++) {
//     if (Elements.movieList[j].genres.includes(Elements.genreLinkName[i].innerHTML)) {
//        Elements.genreLabelCount[i].innerHTML ++;
//     }
//   }
// }

Elements.topRatedLink.onclick = Methods.getTopRatedMovie;
Elements.worstRatedLink.onclick = Methods.getWorstRatedMovie;
Elements.allMoviesLink.onclick = Methods.getAllMovies;




function openNav(index) {
    document.getElementById("mySidenav").style.width = "600px";
    Elements.modalTitle.innerHTML = Elements.movieList[index].title;
    Elements.modalYear.innerHTML = Elements.movieList[index].year;
    Elements.modalPoster.src = Elements.movieList[index].image;
    Elements.modalGenres.innerHTML = '';
    for (let i = 0; i < Elements.movieList[index].genres.length; i++) {
      Elements.modalGenres.innerHTML +=  `<span class="chip sidenav-genre-chip">${Elements.movieList[index].genres[i]}</span>`;
    }
    Elements.modalRating.innerHTML = Methods.getAverage(Elements.movieList[index].ratings);
    Elements.ratingCirle.className = `c100 p${parseInt(Elements.modalRating.innerHTML) * 10}`;
    Elements.editButton.onclick = function() {
      test(index);
    };
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

function test(index) {
  let genreChip = document.getElementsByClassName('sidenav-genre-chip');
  Elements.editModal.classList.add('active');
  Elements.newRatingSpan.innerHTML = Elements.modalRating.innerHTML;
  Elements.newRatingCircle.classList = Elements.ratingCirle.classList;
  Elements.ratingSlider.value = 0;
  for (let genre of genreChip) {
    for (let editChip of Elements.genreEditChip) {
      if (genre.innerHTML === editChip.innerHTML.trim()) {
        editChip.classList.add('active');
        }
      }
  }
  Elements.submitEditButton.onclick = function () {
    editMovie(index);
  };
}

Elements.ratingSlider.oninput = function() {
  Elements.newRatingSpan.innerHTML = this.value;
  Elements.newRatingCircle.className = `c100 p${this.value * 10}`;
};

 for (let i = 0; i < Elements.genreEditChip.length; i++) {
   Elements.genreEditChip[i].onclick = function() {
     if (!this.classList.contains('active')) {
        this.classList.add('active');
     }
     else {
       this.classList.remove('active');
     }

   };
 }
for (let link of Elements.genreLinkName) {
  link.onclick = function() {
    Methods.getMoviesByGenre(this.innerHTML.trim());
  };
}

Elements.yearSort.onclick = function() {
  Elements.movieYearInput.classList.remove('hide');
  Elements.movieYearInput.focus();
  Elements.movieYearInput.select();
  Elements.movieYearInput.addEventListener('keyup', function() {
    Methods.getMoviesThisYear(this.value);
  });
};

function editMovie(index) {
  let newGenreArr = [];
  for (let activeGenres of Elements.genreEditChip) {
    if (activeGenres.classList.contains('active')) {
      newGenreArr.push(activeGenres.innerHTML.trim());
    }
  }
  Elements.movieList[index].genres = newGenreArr;
  for (let editChip of Elements.genreEditChip) {
    editChip.classList.remove('active');
  }
  if (!Elements.newRatingCircle.innerHTML.includes('.')) {
    Elements.movieList[index].ratings.push(parseInt(Elements.ratingSlider.value));
  }
    Elements.editModal.classList.remove('active');
}
