//jshint esversion:6
window.onload = function () {
  if (typeof(Storage) !== "undefined") {
    if(localStorage.getItem("Movies") === null) {
        localStorage.setItem("Movies", JSON.stringify(Movies));
      }
    }
   else {
      alert("Sorry! No Web Storage support..");
  }
  MovieWiki.methods.createMovieList();
};

const MovieWiki = {
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
      movieYearInput : document.forms.movieYearInput,
      sendMovieYear: document.getElementById("send-movie-year")
  },
  constructor: {
    Movie: function (title, year, genres) {
      this.title = title;
      this.year = year;
      this.genres = genres;
      }
  },
  methods: {
      createMovieList : function () {
          MovieWiki.elements.movieTable.innerHTML = '';
          for (let i = 0; i < MovieWiki.elements.movieList.length; i++){
            MovieWiki.elements.movieTable.innerHTML +=
            `<tr class=modal-opener data-toggle=modal data-id=${i + 1} data-target=#movie-modal onclick=MovieWiki.methods.openModal(${i})>
                <th scope=row>${i + 1}</th>
                <td>${MovieWiki.elements.movieList[i].title}</td>
                <td>${MovieWiki.elements.movieList[i].year}</td>
                <td>${MovieWiki.elements.movieList[i].genres}</td>
                <td>${MovieWiki.methods.getAverage(MovieWiki.elements.movieList[i].ratings)}</td>
            </tr>`
          ;
        }
      },
      openModal : function (index) {
        MovieWiki.elements.overlay.classList.remove('is-hidden');
        MovieWiki.elements.modalTitle.innerHTML = MovieWiki.elements.movieList[index].title;
        MovieWiki.elements.modalYear.innerHTML = MovieWiki.elements.movieList[index].year;
        MovieWiki.elements.modalGenres.innerHTML = MovieWiki.elements.movieList[index].genres;
        MovieWiki.elements.modalRating.innerHTML = MovieWiki.methods.getAverage(MovieWiki.elements.movieList[index].ratings);
        MovieWiki.elements.modalPoster.src = MovieWiki.elements.movieList[index].image;
      },
      closeModal : function () {
        MovieWiki.elements.overlay.classList.add('is-hidden');
      },
      addMovie : function () {
        const movieTitle = document.forms.movieAdder.title.value;
        const movieYear = document.forms.movieAdder.year.value;
        const movieGenres = document.forms.movieAdder.genres.value.split(',');
        newMovie = new MovieWiki.constructor.Movie(movieTitle, movieYear, movieGenres);
        MovieWiki.elements.movieList.push(newMovie);
        localStorage.setItem("Movies", JSON.stringify(MovieWiki.elements.movieList));
        this.createMovieList();
      },
      rateMovie : function (movie, rating) {
        MovieWiki.elements.selectedRating.classList.remove('invisible');
      },
      getSelected : function () {
        if (MovieWiki.elements.selectedMovieQuestion.selectedIndex !== 1) {
              MovieWiki.elements.movieYearInput.classList.add('invisible');
        }
        if (MovieWiki.elements.selectedMovieQuestion.selectedIndex === 1) {
              MovieWiki.elements.movieYearInput.classList.remove('invisible');
              MovieWiki.elements.movieYearInput.year.addEventListener("keyup", function () {
              MovieWiki.methods.getMoviesThisYear(this.value);
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
      getAverage : function (arr) {
        let sum = 0;
        for (let i = 0; i < arr.length; i++) {
          sum+= arr[i];
        }
        return (sum/arr.length).toFixed(1);

      },
      getTopRatedMovie : function () {
        const topRated = MovieWiki.elements.movieList.reduce(
          (prevVal, currVal) => MovieWiki.methods.getAverage(prevVal.ratings) > MovieWiki.methods.getAverage(currVal.ratings) ? prevVal : currVal
        );
        for (let i = 0; i < MovieWiki.elements.movieList.length; i++){
          if (MovieWiki.elements.movieList[i] === topRated) {
        MovieWiki.elements.movieTable.innerHTML =
        `<tr class=modal-opener data-toggle=modal data-id=${i + 1} onclick=MovieWiki.methods.openModal(${i})>
            <th scope=row>${1}</th>
            <td>${MovieWiki.elements.movieList[i].title}</td>
            <td>${MovieWiki.elements.movieList[i].year}</td>
            <td>${MovieWiki.elements.movieList[i].genres}</td>
            <td>${MovieWiki.methods.getAverage(MovieWiki.elements.movieList[i].ratings)}</td>
        </tr>`
        ;
        }
      }
      },
      getWorstRatedMovie : function () {
        const worstRated = MovieWiki.elements.movieList.reduce(
          (prevVal, currVal) => MovieWiki.methods.getAverage(prevVal.ratings) < MovieWiki.methods.getAverage(currVal.ratings) ? prevVal : currVal
        );
        let test = () => this;
        console.log(this);
        for (let i = 0; i < MovieWiki.elements.movieList.length; i++){
          if (MovieWiki.elements.movieList[i] === worstRated) {
        MovieWiki.elements.movieTable.innerHTML =
        `<tr class=modal-opener data-toggle=modal data-id=${i + 1} onclick=MovieWiki.methods.openModal(${i})>
            <th scope=row>${1}</th>
            <td>${MovieWiki.elements.movieList[i].title}</td>
            <td>${MovieWiki.elements.movieList[i].year}</td>
            <td>${MovieWiki.elements.movieList[i].genres}</td>
            <td>${MovieWiki.methods.getAverage(MovieWiki.elements.movieList[i].ratings)}</td>
        </tr>`
          ;
        }
      }
    },
      getMoviesThisYear : function (movieYear) {
        let yearArr = MovieWiki.elements.movieList.filter(movie => movie.year === parseInt(movieYear));
        MovieWiki.elements.movieTable.innerHTML = '';
        for (let j = 0; j < yearArr.length; j++) {
          for (let i = 0; i < MovieWiki.elements.movieList.length; i++) {
            if(yearArr[j] === MovieWiki.elements.movieList[i]) {
              MovieWiki.elements.movieTable.innerHTML +=
              `<tr class=modal-opener data-toggle=modal data-id=${i + 1} onclick=MovieWiki.methods.openModal(${i})>
                      <th scope=row>${1 + j}</th>
                      <td>${MovieWiki.elements.movieList[i].title}</td>
                      <td>${MovieWiki.elements.movieList[i].year}</td>
                      <td>${MovieWiki.elements.movieList[i].genres}</td>
                      <td>${MovieWiki.methods.getAverage(MovieWiki.elements.movieList[i].ratings)}</td>
                  </tr>`
                ;
              }
            }
          }
      },
      getMoviesByGenre : function (...movieGenre) {
        let genreArr = movieGenre.sort();
        let filteredArr = MovieWiki.elements.movieList.filter(movie => movie.genres.sort());
        let finalArr = [];
        for(var i = 0; i < genreArr.length; i++){
          for (let j = 0; j < filteredArr.length; j++) {
             if(filteredArr[j].genres.indexOf(genreArr[i]) > -1)
             console.log(filteredArr[j]);
           }
        }
        return true;
        // let yearArr = MovieList.filter(movie => movie.genres.indexOf(movieGenre.forEach(genre => genre > -1)));
        // for (let j = 0; j < yearArr.length -1; j++) {
        //   for (let i = 0; i < MovieWiki.elements.movieList.length -1; i++) {
        //     if(yearArr[j] === MovieList[i]) {
        //       MovieWiki.elements.movieTable.innerHTML +=
        //       `<tr class=modal-opener data-toggle=modal data-id=${i + 1} data-target=#movie-modal onclick=openModal(${i})>
        //               <th scope=row>${1 + j}</th>
        //               <td>${MovieList[i].title}</td>
        //               <td>${MovieList[i].year}</td>
        //               <td>${MovieList[i].genres}</td>
        //               <td>${MovieWiki.methods.getAverage(MovieList[i].ratings)}</td>
        //           </tr>`
        //         ;
        //       }
        //     }
        //   }
      },
      sortMovies : function (prop) {
        var movieArr = [];
        if (Movies[0].prop > Movies[1].prop) {
          movieArr = Movies.sort((a, b) => a.prop - b.prop);
        }
        else {
          movieArr = Movies.sort((a, b) => b.prop - a.prop);
        }
        MovieWiki.elements.movieTable.innerHTML = '';
        for (let i = 0; i < movieArr.length; i++){
          MovieWiki.elements.movieTable.innerHTML +=
          `<tr>
              <th scope="row">${i + 1}</th>
              <td>${movieArr[i].title}</td>
              <td>${movieArr[i].year}</td>
              <td>${movieArr[i].genres}</td>
              <td>${movieArr[i].ratings}</td>
          </tr>`
          ;
        }
      },

    }
};



// function openModal(index){
//   const modalTitle = document.getElementById('modal-movie-title');
//   const modalYear = document.getElementById('modal-movie-year');
//   const modalGenres = document.getElementById('modal-movie-genres');
//   const modalRating = document.getElementById('modal-movie-rating');
//   const modalPoster = document.getElementById('modal-movie-poster');
//
//   overlay.classList.remove("is-hidden");
//   modalTitle.innerHTML = MovieList[index].title;
//   modalYear.innerHTML = MovieList[index].year;
//   modalGenres.innerHTML = MovieList[index].genres;
//   modalRating.innerHTML = MovieWiki.methods.getAverage(MovieList[index].ratings);
//   modalPoster.src = MovieList[index].image;
//   console.log(MovieList[index].title);
// }

// function getSelected() {
//   let selctedMovieQuestion = document.getElementById("selected-movie-question");
//   const yearInput = document.forms.movieYearInput;
//   if (selctedMovieQuestion.selectedIndex === 0) {
//     yearInput.innerHTML = '';
//     MovieWiki.methods.createMovieList();
//   }
//   if (selctedMovieQuestion.selectedIndex === 1) {
//     yearInput.innerHTML =
//     `<label for="input-year">Enter year</label>
//     <div class="row">
//     <div class='col-9'>
//     <input type="text" class="form-control" id="input-year" name="year" placeholder="Year...">
//     </div>
//     <div class='col-3'>
//     <button class="btn btn-primary" id="sendMovieYear" type="submit">Get</button>
//     </div>
//     </div>
//     `;
//     document.getElementById("sendMovieYear").addEventListener("click", function(event){
//     event.preventDefault();
//     MovieWiki.methods.getMoviesThisYear(movieYearInput.year.value);
//     });
//   }
//   if (selctedMovieQuestion.selectedIndex === 3) {
//     yearInput.innerHTML = '';
//     MovieWiki.methods.getTopRatedMovie();
//   }
//   if (selctedMovieQuestion.selectedIndex === 4) {
//     yearInput.innerHTML = '';
//     MovieWiki.methods.getWorstRatedMovie();
//   }
//
// }

// console.log(MovieWiki.methods.getMoviesByGenre('Action'));
// function arrayContainsAnotherArray(needle, haystack){
//   for(var i = 0; i < needle.length; i++){
//     if(haystack.indexOf(needle[i]) === -1)
//        return false;
//   }
//   return true;
// }


// console.log(arrayContainsAnotherArray(['a', 'b', 'c', 'd', 'e', 'f', ], ['a', 'b', 'c', 'd', 'f']));
