//jshint esversion: 6
import Elements from './elements.js'
import Model from './model.js'
import View from './view.js'
import {Movie} from './helpers.js'

export default {

// Binds close button on every modal to close the repspective modal
closeModal : function() {
  let modalCloseButtonArr = Array.from(Elements.modalCloseButton);
  modalCloseButtonArr.forEach((button, i) => {
  button.onclick = function() {
      View.closeActiveModal(i);
    };
  });
}(),

// Binds button to open modal for adding new movie
openNewMovieModal : function() {
  Elements.newMovieButton.onclick = View.displayNewMovieModal;
}(),

// Handling of new movie form
movieAdder : function() {
  Elements.movieCreator.onsubmit = function(e) {
  e.preventDefault();
  let newMovie = new Movie(Elements.movieTitle.value, Elements.movieYear.value, Elements.movieGenres.value.split(','), Elements.movieCover.value);
  let index = Model.addMovie(newMovie);
  View.displayNewMovie(newMovie, index);
  };
}(),
//
// Binding top rated
topRated: function() {
  let movie = Model.getTopRatedMovie();
  Elements.topRatedLink.onclick = function() {
    View.displayMovie(movie);
  };
}(),
// Bind worst rated
worstRated: function() {
  let movie = Model.getWorstRatedMovie();
  Elements.worstRatedLink.onclick = function() {
    View.displayMovie(movie);
  };
}(),
// Call view function to display all movies
callAllMovies : function() {
  Elements.allMoviesLink.onclick = View.displayAllMovies;
}(),
// Create click functions for all menu genre links
genreLinks : function() {
  let genreLinkArr = Array.from(Elements.genreLinkName);
  genreLinkArr.forEach(link => {
    link.onclick = function() {
      let genre = this.innerHTML.trim();
      let movieArr = Model.getMoviesByGenre(genre);
      View.displayMovies(movieArr);
    };
  });
}(),
//
// Creating click function for year filter on menu
sortByYear: function() {
  Elements.yearSort.onclick = View.displayYearInput;
    Elements.movieYearInput.addEventListener('keyup', function() {
      let year = this.value;
      let movieArr = Model.getMoviesThisYear(year);
      View.displayMovies(movieArr);
    });
}(),

// // Close movie preview when clicking on button
closeMoviePreview: function() {
  Elements.closeMovieButton.onclick = View.closeNav;
}(),
//
// Click function to open movie sidebar view
sideBarOpener : function () {
let movieCardArr = Array.from(Elements.movieCards);
movieCardArr.forEach((card, index) => {
  card.onclick = () => {
    View.openNav(index);
  };
});
},
editMovie : function() {
  Elements.editButton.onclick = () => {
    View.editMovieModal();
  };
}(),
genreClickPreview : function() {
  for (let genreChip of Elements.genreEditChip) {
    genreChip.onclick = function() {
      View.previewGenres(this);
    };
  }
}(),
editMovieModal: function() {
  Elements.submitEditButton.onclick = () => {
    let newGenreArr = [];
    for (let activeGenres of Elements.genreEditChip) {
      if (activeGenres.classList.contains('active')) {
        newGenreArr.push(activeGenres.innerHTML.trim());
      }
    }
    this.editGenre(index, newGenreArr);
    if (!Elements.newRatingCircle.innerHTML.includes('.')) {
      this.editRating(index, parseInt(Elements.ratingSlider.value));
    }
  };
}

};
