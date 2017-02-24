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
      movieList: localStorage.getItem("Movies"),
      movieResult: document.getElementById('movie-result')
  },
  constructor: {
    Movie: function (title, year, genres){
      this.title = title;
      this.year = year;
      this.genres = genres;
      }
  },
  methods: {
      createMovieList: function() {
        const MovieList = JSON.parse(MovieWiki.elements.movieList);
          MovieWiki.elements.movieTable.innerHTML = '';
          for (let i = 0; i < MovieList.length; i++){
            MovieWiki.elements.movieTable.innerHTML +=
            `<tr class=modal-opener data-toggle=modal data-id=${i + 1} data-target=#movie-modal onclick=openModal(${i})>
                <th scope=row>${i + 1}</th>
                <td>${MovieList[i].title}</td>
                <td>${MovieList[i].year}</td>
                <td>${MovieList[i].genres}</td>
                <td>${this.getAverage(MovieList[i].ratings)}</td>
            </tr>`
          ;
        }
      },
      listMovies: () => {

      },
      displayMovieModal: function () {
        const movieModal = document.getElementById('movie-modal');
            movieModal.style.display = 'block';
        },
      addMovie: function() {
        const movieTitle = document.forms.movieAdder.title.value;
        const movieYear = document.forms.movieAdder.year.value;
        const movieGenres = document.forms.movieAdder.genres.value.split(',');
        const MovieList = JSON.parse(MovieWiki.elements.movieList);
        newMovie = new MovieWiki.constructor.Movie(movieTitle, movieYear, movieGenres);
        MovieList.push(newMovie);
        localStorage.setItem("Movies", JSON.stringify(MovieList));
        MovieWiki.methods.createMovieList();
      },
      rateMovie: (movie, rating) => {

      },
      getAverage: function(arr) {
        let sum = 0;
        for (let i = 0; i < arr.length-1; i++) {
          sum+= arr[i];
        }
        return (sum/arr.length).toFixed(1);

      },
      getTopRatedMovie: () => {
        const MovieList = JSON.parse(MovieWiki.elements.movieList);
        const topRated = MovieList.reduce(
          (prevVal, currVal) => MovieWiki.methods.getAverage(prevVal.ratings) > MovieWiki.methods.getAverage(currVal.ratings) ? prevVal : currVal
        );
        for (let i = 0; i < MovieList.length; i++){
          if (MovieList[i] === topRated) {
        MovieWiki.elements.movieTable.innerHTML =
        `<tr class=modal-opener data-toggle=modal data-id=${i + 1} data-target=#movie-modal onclick=openModal(${i})>
            <th scope=row>${1}</th>
            <td>${MovieList[i].title}</td>
            <td>${MovieList[i].year}</td>
            <td>${MovieList[i].genres}</td>
            <td>${MovieWiki.methods.getAverage(MovieList[i].ratings)}</td>
        </tr>`
        ;
        }
      }
      },
      getWorstRatedMovie: () => {
        const MovieList = JSON.parse(MovieWiki.elements.movieList);
        const worstRated = MovieList.reduce(
          (prevVal, currVal) => MovieWiki.methods.getAverage(prevVal.ratings) < MovieWiki.methods.getAverage(currVal.ratings) ? prevVal : currVal
        );
        for (let i = 0; i < MovieList.length; i++){
          if (MovieList[i] === worstRated) {
        MovieWiki.elements.movieTable.innerHTML =
        `<tr class=modal-opener data-toggle=modal data-id=${i + 1} data-target=#movie-modal onclick=openModal(${i})>
            <th scope=row>${1}</th>
            <td>${MovieList[i].title}</td>
            <td>${MovieList[i].year}</td>
            <td>${MovieList[i].genres}</td>
            <td>${MovieWiki.methods.getAverage(MovieList[i].ratings)}</td>
        </tr>`
        ;
        }
      }

      },
      getMoviesThisYear: (movieYear) => {
        console.log(movieYear);
        const MovieList = JSON.parse(MovieWiki.elements.movieList);
        let yearArr = MovieList.filter(movie => movie.year === Number(movieYear));
        console.log(yearArr.length);
        MovieWiki.elements.movieTable.innerHTML = '';
        for (let j = 0; j < yearArr.length -1; j++) {
          for (let i = 0; i < MovieList.length -1; i++) {
            if(yearArr[j] === MovieList[i]) {
          MovieWiki.elements.movieTable.innerHTML +=
          `<tr class=modal-opener data-toggle=modal data-id=${i + 1} data-target=#movie-modal onclick=openModal(${i})>
                  <th scope=row>${1 + j}</th>
                  <td>${MovieList[i].title}</td>
                  <td>${MovieList[i].year}</td>
                  <td>${MovieList[i].genres}</td>
                  <td>${MovieWiki.methods.getAverage(MovieList[i].ratings)}</td>
              </tr>`
            ;
          }
        }
      }

      },
      getMoviesByGenre: (...genres) => {

      },
      sortMovies: (prop) => {
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
        // Lowest rating console.log(Movies.reduce((prev, movie) => prev.rating < movie.rating ? prev : movie));
      },

    }
};

var overlay = document.getElementById('overlay');

function openModal(index){
  const modalTitle = document.getElementById('modal-movie-title');
  const modalYear = document.getElementById('modal-movie-year');
  const modalGenres = document.getElementById('modal-movie-genres');
  const modalRatings = document.getElementById('modal-movie-ratings');
  const modalPoster = document.getElementById('modal-movie-poster');
  const MovieList = JSON.parse(MovieWiki.elements.movieList);
  overlay.classList.remove("is-hidden");
  overlay.innerHTML =
  `<div class="modal-dialog modal-lg">
  <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">${MovieList[index].title}</h4>
        <button type="button" class="close" onclick=closeModal()>
        <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <div class="container">
      <div class="row">
      <div class="col-sm-6">
      <p>Year: ${MovieList[index].year}</p>
      <p>Genres: ${MovieList[index].genres}</p>
      <p>Rating: ${MovieWiki.methods.getAverage(MovieList[index].ratings)}</p>
      </div>
      <div class="col-sm-6">
        <img class="img-fluid" src="${MovieList[index].image}" alt="Movie Poster">
      </div>
      </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
      </div>
</div>`
  ;
  // modalTitle.innerHTML = MovieList[index].title;
  // modalYear.innerHTML  = `Year: ${MovieList[index].year}`;
  // modalGenres.innerHTML = `Genres: ${MovieList[index].genres}`;
  // modalRatings.innerHTML = `Rating: ${MovieList[index].ratings}`;
  // modalPoster.src=`${MovieList[index].image}`;
}

function closeModal(){
	overlay.classList.add("is-hidden");
}

function getSelected() {
  let selctedMovieQuestion = document.getElementById("selected-movie-question");
  const yearInput = document.forms.movieYearInput;
  if (selctedMovieQuestion.selectedIndex === 0) {
    yearInput.innerHTML = '';
    MovieWiki.methods.createMovieList();
  }
  if (selctedMovieQuestion.selectedIndex === 1) {
    yearInput.innerHTML =
    `<label for="input-year">Enter year</label>
    <div class="row">
    <div class='col-9'>
    <input type="text" class="form-control" id="input-year" name="year" placeholder="Year...">
    </div>
    <div class='col-3'>
    <button class="btn btn-primary" onclick="MovieWiki.methods.getMoviesThisYear(movieYearInput.year.value)">Get</button>
    </div>
    </div>
    `;
  }
  if (selctedMovieQuestion.selectedIndex === 3) {
    yearInput.innerHTML = '';
    MovieWiki.methods.getTopRatedMovie();
  }
  if (selctedMovieQuestion.selectedIndex === 4) {
    yearInput.innerHTML = '';
    MovieWiki.methods.getWorstRatedMovie();
  }

}

// MovieWiki.methods.sortMovieTitles();
