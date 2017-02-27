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

var MovieWiki = {
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
      movieGenreInput : document.forms.movieGenreInput,
      genreInput : document.forms.editGenre.genre
  },
  constructor: {
    Movie: function (title, year, genres) {
      this.title = title;
      this.year = year;
      this.genres = genres;
      this.ratings = [];
      }
  },
  methods: {
      createMovieList : function () {
          MovieWiki.elements.movieTable.innerHTML = '';
          for (let i = 0; i < MovieWiki.elements.movieList.length; i++){
            MovieWiki.elements.movieTable.innerHTML +=
            `<tr class="modal-opener" data-toggle="modal" data-id="${i + 1}" data-target="#movie-modal" onclick="MovieWiki.methods.openModal(${i})"">
                <th scope="row">${i + 1}</th>
                <td>${MovieWiki.elements.movieList[i].title}</td>
                <td>${MovieWiki.elements.movieList[i].year}</td>
                <td>${MovieWiki.elements.movieList[i].genres}</td>
                <td>${MovieWiki.methods.getAverage(MovieWiki.elements.movieList[i].ratings)}</td>
            </tr>`
          ;
        }
      },
      openModal : function (index) {
        MovieWiki.elements.modalTitle.innerHTML = MovieWiki.elements.movieList[index].title;
        MovieWiki.elements.modalYear.innerHTML = MovieWiki.elements.movieList[index].year;
        MovieWiki.elements.modalGenres.innerHTML = MovieWiki.elements.movieList[index].genres;
        MovieWiki.elements.modalRating.innerHTML = MovieWiki.methods.getAverage(MovieWiki.elements.movieList[index].ratings);
        MovieWiki.elements.modalPoster.src = MovieWiki.elements.movieList[index].image;
        MovieWiki.elements.genreInput.value = MovieWiki.elements.movieList[index].genres;
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
      rateMovie : function () {
        for (let i = 0; i < MovieWiki.elements.movieList.length; i++ ) {
          if (MovieWiki.elements.modalTitle.innerHTML === MovieWiki.elements.movieList[i].title) {
            MovieWiki.elements.movieList[i].ratings.push(parseInt(MovieWiki.elements.selectedRating.value));
            this.openModal(i);
            this.createMovieList();
          }
        }
      },
      editGenre : function () {
        for (let i = 0; i < MovieWiki.elements.movieList.length; i++ ) {
          if (MovieWiki.elements.modalTitle.innerHTML === MovieWiki.elements.movieList[i].title) {
            MovieWiki.elements.movieList[i].genres = MovieWiki.elements.genreInput.value.split(',');
          }

        }
      },
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
        MovieWiki.elements.movieTable.innerHTML = '';
        for (let i = 0; i < movieGenre.length; i++) {
          for (let j = 0; j < MovieWiki.elements.movieList.length; j++) {
              if (MovieWiki.elements.movieList[j].genres.indexOf(movieGenre[i]) !== -1) {
                MovieWiki.elements.movieTable.innerHTML +=
                `<tr class=modal-opener data-toggle=modal data-id=${j + 1} onclick=MovieWiki.methods.openModal(${j})>
                        <th scope=row>${1 + j}</th>
                        <td>${MovieWiki.elements.movieList[j].title}</td>
                        <td>${MovieWiki.elements.movieList[j].year}</td>
                        <td>${MovieWiki.elements.movieList[j].genres}</td>
                        <td>${MovieWiki.methods.getAverage(MovieWiki.elements.movieList[j].ratings)}</td>
                    </tr>`
                    ;
              }
          }

        }
        // let filteredArr = MovieWiki.elements.movieList.filter(movie => movie.genres.sort());
        // let finalArr = [];
        // for(var i = 0; i < genreArr.length; i++){
        //   for (let j = 0; j < filteredArr.length; j++) {
        //      if(filteredArr[j].genres.indexOf(genreArr[i]) > -1)
        //      console.log(filteredArr[j]);
        //    }
        // }
      },
      sortMovies : function (year) {
        var movieArr = [];
        if (MovieWiki.elements.movieList[0].year > MovieWiki.elements.movieList[1].year) {
          movieArr = MovieWiki.elements.movieList.sort((a, b) => a.year - b.year);
        }
        else {
          movieArr = MovieWiki.elements.movieList.sort((a, b) => b.year - a.year);
        }
        MovieWiki.elements.movieTable.innerHTML = '';
        for (let i = 0; i < movieArr.length; i++){
          MovieWiki.elements.movieTable.innerHTML +=
          `<tr>
              <th scope="row">${i + 1}</th>
              <td>${movieArr[i].title}</td>
              <td>${movieArr[i].year}</td>
              <td>${movieArr[i].genres}</td>
              <td>${MovieWiki.methods.getAverage(movieArr[i].ratings)}</td>
          </tr>`
          ;
        }
      },
    },
};
