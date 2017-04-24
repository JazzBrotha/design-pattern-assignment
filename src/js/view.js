//jshint esversion:6
import Elements from './elements'
import {
    getAverage,
    bindEvent,
    parseMovies,
    checkMovieImage,
    getMovieIndex
} from './helpers'


export default {

    createMovieList(movieArr) {
        Elements.cardContainer.innerHTML = '';
        for (const movie of movieArr) {
            Elements.cardContainer.innerHTML +=
                `<div class="column col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 col-xxl-2 movie-card-container">
       <div class="card">
          <div class="card-image">
            <img class="img-responsive card-movie-cover">
          </div>
          <div class="card-header">
            <h4 class="card-title card-movie-title"></h4>
            <h6 class="card-meta card-movie-year"></h6>
          </div>
          <div class="card-body card-movie-genre"></div>
          <div class="card-footer">
            <div class="bar">
              <div class="bar-item card-movie-rating"></div>
            </div>
          </div>
      </div>
    </div>`;
        }

        // Sets values for each movie inside card elements
        for (let i = 0; i < movieArr.length; i++) {
            Elements.cardMovieCover[i].src = movieArr[i].posterurl;
            checkMovieImage(i);
            if (movieArr[i].hasOwnProperty('originalTitle') && movieArr[i].originalTitle.length !== 0) {
              Elements.cardMovieTitle[i].innerHTML = movieArr[i].originalTitle;
            } else {
              Elements.cardMovieTitle[i].innerHTML = movieArr[i].title;
            }
            Elements.cardMovieYear[i].innerHTML = movieArr[i].year;
            Elements.cardMovieRating[i].style.width = `${getAverage(movieArr[i].ratings)* 10}%`;
            Elements.cardMovieRating[i].innerHTML = `${getAverage(movieArr[i].ratings)}`;
            for (const genre of movieArr[i].genres) {
                Elements.cardMovieGenre[i].innerHTML += `<label class="chip genre-chip">${genre}</label>`;
            }
        }
    },

    // Opens sidebar for selected movie
    openMovieView(cardIndex) {
        const movieIndex = getMovieIndex(Elements.cardMovieTitle[cardIndex].innerHTML);
        const movies = parseMovies();
        Elements.moviePreview.style.width = "450px";
        Elements.modalTitle.innerHTML = Elements.cardMovieTitle[cardIndex].innerHTML;
        Elements.modalYear.innerHTML = Elements.cardMovieYear[cardIndex].innerHTML;
        Elements.modalPoster.src = Elements.cardMovieCover[cardIndex].src;
        Elements.modalGenres.innerHTML = Elements.cardMovieGenre[cardIndex].innerHTML;
        Elements.modalRating.innerHTML = Elements.cardMovieRating[cardIndex].innerHTML;
        Elements.ratingCirle.className = `c100 p${parseInt(Elements.modalRating.innerHTML) * 10} centered`;
        Elements.modalMoviePlot.innerHTML = movies[movieIndex].storyline;
        Elements.modalMovieCast.innerHTML = '';
        if (movies[movieIndex].actors.length > 0) {
          movies[movieIndex].actors.forEach(actor => {
            Elements.modalMovieCast.innerHTML += `<p class="tile-title">${actor}</p>`;
          });
        }
    },

    // Closes sidebar for current movie
    closeMovieView() {
        Elements.moviePreview.style.width = "0";
    },

    // Displays edit modal for current movie
    editMovieModal() {
        const movieGenres = Array.from(Elements.modalGenres.childNodes);
        const genreChips = Array.from(Elements.genreEditChip);
        Elements.editModal.classList.add('active');
        Elements.newRatingSpan.innerHTML = Elements.modalRating.innerHTML;
        Elements.newRatingCircle.classList = Elements.ratingCirle.classList;
        Elements.ratingSlider.value = 0;

        // Clears any active states if user has selected genres without submiting them
        genreChips.forEach(chip => {
            if (chip.classList.contains('active'))
                chip.classList.remove('active');
        });

        // Adds active state to current movie's genres
        movieGenres.forEach(genre => {
            genreChips.map(chip => {
                if (chip.innerHTML === genre.innerHTML)
                    chip.classList.add('active');
            });
        });
    },

    // Display new movie genres and rating after editing
    changeMovieHTML(title) {
        const movieGenres = Array.from(Elements.modalGenres.childNodes);
        const genreChips = Array.from(Elements.genreEditChip);
        Elements.editModal.classList.remove('active');

        // Update genre for both card and sidebar view
        Elements.modalGenres.innerHTML = '';
        genreChips.forEach(chip => {
            if (chip.classList.contains('active')) {
                Elements.modalGenres.innerHTML += `<label class="chip genre-chip">${chip.innerHTML}</label>`;
            }
        });

        for (let i = 0; i < Elements.cardMovieTitle.length; i++) {
            if (Elements.cardMovieTitle[i].innerHTML === title) {
                  const movieIndex = getMovieIndex(Elements.cardMovieTitle[i].innerHTML);
                  const movies = parseMovies();

                  Elements.cardMovieGenre[i].innerHTML = Elements.modalGenres.innerHTML;

                  // Update rating for both card and sidebar view
                  Elements.cardMovieRating[i].style.width = `${getAverage(movies[movieIndex].ratings)* 10}%`;
                  Elements.cardMovieRating[i].innerHTML = `${getAverage(movies[movieIndex].ratings)}`;
                  Elements.modalRating.innerHTML = Elements.cardMovieRating[i].innerHTML;
                  Elements.ratingCirle.className = `c100 p${parseInt(Elements.modalRating.innerHTML) * 10} centered`;
            }
        }


    },

    // Close current active modal
    closeActiveModal(i) {
        Elements.modals[i].classList.remove('active');
    },

    // Display function for top rated and worst rated
    displayMovie(movie) {
        const titleCardArr = Array.from(Elements.cardMovieTitle);
        titleCardArr.filter((title, i) =>
            movie.title === title.innerHTML || movie.originalTitle === title.innerHTML ?
            Elements.movieCardContainer[i].style.display = "block" :
            Elements.movieCardContainer[i].style.display = "none"
        );
    },
    // Display function used to display by genre or year
    displayMovies(arr) {
        const titleCardArr = Array.from(Elements.cardMovieTitle);
        const movieTitleArr = arr.map(movie =>
          movie.originalTitle.length > 1 ? movie.originalTitle : movie.title
        );
        titleCardArr.filter((title, i) =>
            movieTitleArr.includes(title.innerHTML) ?
            Elements.movieCardContainer[i].style.display = "block" :
            Elements.movieCardContainer[i].style.display = "none"
        );
    },

    // Display movie modal for adding movie
    displayNewMovieModal() {
        Elements.newMovieModal.classList.add('active');
        Elements.movieTitle.focus();
        Elements.movieTitle.select();
    },

    // Visually changes rating circle as slider value changes
    displayRating() {
        Elements.newRatingSpan.innerHTML = this.value;
        Elements.newRatingCircle.className = `c100 p${this.value * 10} centered`;
    },

    displaySuccessMessage() {
      Elements.successMessage.classList.remove('hide');
        setTimeout(function() {
          Elements.successMessage.classList.add('hide');
          Elements.newMovieModal.classList.remove('active');
      }, 3000);


    },
    // Shows input field for year search
    displayYearInput() {
        Elements.movieYearInput.classList.remove('hide');
        Elements.movieYearInput.focus();
        Elements.movieYearInput.select();
        bindEvent(document.body, e => {
            if (e.target !== this) {
                Elements.movieYearInput.classList.add('hide');
            }
        });
    },

    // Display all movie cards
    displayAllMovies() {
        const movieCardArr = Array.from(Elements.movieCardContainer);
        return movieCardArr.forEach(card =>
            card.style.display = "block"
        );
    },
    // Renders HTML for new movie
    renderNewMovie(newMovie, i) {
        const movieCard = document.createElement('div');
        movieCard.setAttribute('class', 'column col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 col-xxl-2 movie-card-container');
        movieCard.innerHTML = `<div class="card">
          <div class="card-image">
            <img class="img-responsive card-movie-cover">
          </div>
          <div class="card-header">
            <h4 class="card-title card-movie-title"></h4>
            <h6 class="card-meta card-movie-year"></h6>
          </div>
          <div class="card-body card-movie-genre"></div>
          <div class="card-footer">
            <div class="bar">
              <div class="bar-item card-movie-rating"></div>
            </div>
          </div>
      </div>
    </div>`;

        Elements.cardContainer.appendChild(movieCard);

        Elements.cardMovieCover[i].src = newMovie.posterurl || 'dist/pics/movie-placeholder.svg';
        Elements.cardMovieTitle[i].innerHTML = newMovie.title;
        Elements.cardMovieYear[i].innerHTML = newMovie.year;
        Elements.cardMovieRating[i].style.width = `${getAverage(newMovie.ratings)* 10}%`;
        Elements.cardMovieRating[i].innerHTML = `${getAverage(newMovie.ratings)}`;
        for (const genre of newMovie.genres) {
            Elements.cardMovieGenre[i].innerHTML += `<label class="chip">${genre}</label>`;
        }
    },

    // Previews genres for user when editing movie
    previewGenres(genre) {
        if (!genre.classList.contains('active')) {
            genre.classList.add('active');
        } else {
            genre.classList.remove('active');
        }
    }

};
