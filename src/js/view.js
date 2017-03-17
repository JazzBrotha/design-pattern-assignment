//jshint esversion:6
import Elements from './elements.js'
import Controller from './controller.js'
import Model from './model.js'
import {getAverage} from './helpers.js'


export default {

  //CREATES A TABLE OF THE MovieDb IN THE DB AS THE INTERFACE FOR THE USER TO NAVIGATE
  //CALLED EACH TIME A NEW MOVIE IS ADDED
createMovieList : function(movieArr) {
  Elements.cardContainer.innerHTML = '';
    for(let movie of movieArr) {
      Elements.cardContainer.innerHTML +=
    `<div class="column col-3 movie-card-container">
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
    for(let i = 0; i < movieArr.length; i++) {
        Elements.cardMovieCover[i].src = movieArr[i].image || 'dist/pics/movie-placeholder.svg';
        Elements.cardMovieTitle[i].innerHTML = movieArr[i].title;
        Elements.cardMovieYear[i].innerHTML = movieArr[i].year;
        Elements.cardMovieRating[i].style.width = `${getAverage(movieArr[i].ratings)* 10}%`;
        Elements.cardMovieRating[i].innerHTML = `${getAverage(movieArr[i].ratings)}`;
        for (let genre of movieArr[i].genres) {
          Elements.cardMovieGenre[i].innerHTML +=  `<label class="chip genre-chip">${genre}</label>`;
        }
    }
  },

  // Opens sidebar for selected movie
  openNav : function(index) {
    Elements.moviePreview.style.width = "600px";
    Elements.modalTitle.innerHTML = Elements.cardMovieTitle[index].innerHTML;
    Elements.modalYear.innerHTML = Elements.cardMovieYear[index].innerHTML;
    Elements.modalPoster.src = Elements.cardMovieCover[index].src;
    Elements.modalGenres.innerHTML = Elements.cardMovieGenre[index].innerHTML;
    Elements.modalRating.innerHTML = Elements.cardMovieRating[index].innerHTML;
    Elements.ratingCirle.className = `c100 p${parseInt(Elements.modalRating.innerHTML) * 10}`;
  },

  // Closes sidebar for current movie
  closeNav : function() {
        Elements.moviePreview.style.width = "0";
  },

  // Displays edit modal for current movie
  editMovieModal : function() {
    Elements.editModal.classList.add('active');
    Elements.newRatingSpan.innerHTML = Elements.modalRating.innerHTML;
    Elements.newRatingCircle.classList = Elements.ratingCirle.classList;
    Elements.ratingSlider.value = 0;
    // console.log(Elements.modalGenres.innerHTML);
    for (let childNode of Elements.modalGenres.childNodes) {
      console.log(childNode.innerHTML);
    }
    let childNodeArr = [];
    // console.log(childNodeArr);
      for (let node of Elements.genreContainer.childNodes) {
        if (node.innerHTML !== undefined) {
          console.log(node.innerHTML);
        }
      // for (let editChip of Elements.genreEditChip) {
      //   if (genreChip. === editChip.innerHTML.trim()) {
      //     editChip.classList.add('active');
      //     }
      //   }
    }
  },

  // Close current active modal
  closeActiveModal : function(i) {
    Elements.modals[i].classList.remove('active');
  },
  // Display function for top rated and worst rated
  displayMovie : function(movie) {
    let titleCardArr = Array.from(Elements.cardMovieTitle);
      titleCardArr.filter((title, i) =>
        movie.title === title.innerHTML
        ? Elements.movieCardContainer[i].style.display = "block"
        : Elements.movieCardContainer[i].style.display = "none"
    );
  },
  // Display function used to display by genre or year
  displayMovies : function(arr) {
    let titleCardArr = Array.from(Elements.cardMovieTitle);
    let movieTitleArr = arr.map(movie =>
      movie.title
    );
      titleCardArr.filter((title, i) =>
        movieTitleArr.includes(title.innerHTML)
        ? Elements.movieCardContainer[i].style.display = "block"
        : Elements.movieCardContainer[i].style.display = "none"
    );
  },

  //Display movie modal for adding movie
  displayNewMovieModal : function() {
    Elements.newMovieModal.classList.add('active');
  },

  // Visually changes rating circle as slider value changes
  displayRating: function() {
    Elements.ratingSlider.oninput = function() {
      Elements.newRatingSpan.innerHTML = this.value;
      Elements.newRatingCircle.className = `c100 p${this.value * 10}`;
    };
  }(),
  // Shows input field for year search
  displayYearInput : function() {
    Elements.movieYearInput.classList.remove('hide');
    Elements.movieYearInput.focus();
    Elements.movieYearInput.select();
  },
  displayAllMovies : function() {
    let movieCardArr = Array.from(Elements.movieCardContainer);
    return movieCardArr.forEach(card =>
      card.style.display = "block"
    );
  },
  //Prevents blank space as first character in all input fields
  blockWhiteSpace : function() {
  for (let input of Elements.inputs) {
    input.addEventListener("keydown", function(event) {
      if (event.which === 32 && event.target.selectionStart === 0) {
          event.preventDefault();
        }
      });
    }
  }(),
  // Renders HTML for new movie
  displayNewMovie: function (newMovie, i) {
    Elements.newMovieModal.classList.remove('active');
    Elements.cardContainer.innerHTML +=
    `<div class="column col-3 movie-card-container">
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

    Elements.cardMovieCover[i].src = newMovie.image || 'dist/pics/movie-placeholder.svg';
    Elements.cardMovieTitle[i].innerHTML = newMovie.title;
    Elements.cardMovieYear[i].innerHTML = newMovie.year;
    Elements.cardMovieRating[i].style.width = `${getAverage(newMovie.ratings)* 10}%`;
    Elements.cardMovieRating[i].innerHTML = `${getAverage(newMovie.ratings)}`;
    for (let genre of newMovie.genres) {
      Elements.cardMovieGenre[i].innerHTML +=  `<label class="chip">${genre}</label>`;
    }
  },

  // Previews genres for user when editing movie
  previewGenres: function(genre) {
        if (!genre.classList.contains('active')) {
           genre.classList.add('active');
        }
        else {
          genre.classList.remove('active');
        }
    }

};
