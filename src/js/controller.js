//jshint esversion: 6
import Model from './model'
import Elements from './elements'
import View from './view'
import {
    Movie,
    bindEvent,
    parseMovies,
    getMovieIndex
} from './helpers'

export default function() {

    // Binds close button on every modal to close the respective modal
    let modalCloseButtonArr = Array.from(Elements.modalCloseButton);
    modalCloseButtonArr.forEach((button, i) => {
        bindEvent(button, function() {
            View.closeActiveModal(i);
        });
    });

    // Binds button to open modal for adding new movie
    bindEvent(Elements.newMovieButton, View.displayNewMovieModal);

    // Handling of new movie
    bindEvent(Elements.movieCreator, function(e) {
        e.preventDefault();
        let newMovie = new Movie(Elements.movieTitle.value, parseInt(Elements.movieYear.value), Elements.movieGenres.value.split(','), Elements.movieCover.value);
        let index = Model.addMovie(newMovie);
        View.renderNewMovie(newMovie, index);
        bindEvent(Elements.movieCardContainer[index], function() {
            View.openMovieView(index);
        });
        View.displaySuccessMessage();
        View.displayAllMovies();
    }, 'submit');

    // Binding top rated
    bindEvent(Elements.topRatedLink, function() {
        let movie = Model.getTopRatedMovie();
        View.displayMovie(movie);
    });

    // Bind worst rated
    bindEvent(Elements.worstRatedLink, function() {
        let movie = Model.getWorstRatedMovie();
        View.displayMovie(movie);
    });

    // Call view function to display all movies
    bindEvent(Elements.allMoviesLink, View.displayAllMovies);

    // Create click functions for all menu genre links
    let genreLinkArr = Array.from(Elements.genreLinkName);
    genreLinkArr.forEach(link => {
        bindEvent(link, function() {
            let genre = this.innerHTML.trim();
            let movieArr = Model.getMoviesByGenre(genre);
            View.displayMovies(movieArr);
        });
    });

    // Creating click function for year filter on menu
    bindEvent(Elements.yearSort, View.displayYearInput);
    bindEvent(Elements.movieYearInput, function() {
        let year = this.value;
        let movieArr = Model.getMoviesThisYear(year);
        View.displayMovies(movieArr);
    }, 'keyup');

    // Close movie preview when clicking on button
    bindEvent(Elements.closeMovieButton, View.closeMovieView);

    // Click function to open movie sidebar view for all current movies in db
    let movieCardArr = Array.from(Elements.movieCardContainer);
    movieCardArr.forEach((card, index) => {
        bindEvent(card, function() {
            View.openMovieView(index);
        });
    });

    // Open edit movie view
    bindEvent(Elements.editButton, View.editMovieModal);

    // Bind rating slider changes when editing movie
    bindEvent(Elements.ratingSlider, View.displayRating, 'input');

    // Preview active genres when editing movie
    let genreChips = Array.from(Elements.genreEditChip);
    genreChips.forEach(chip => {
        bindEvent(chip, function() {
            View.previewGenres(this);
        });
    });

    // Submit changes to edited movie
    bindEvent(Elements.submitEditButton, function() {
        let genres = [];
        let rating;
        let title = Elements.modalTitle.innerHTML;
        for (let activeGenres of Elements.genreEditChip) {
            if (activeGenres.classList.contains('active')) {
                genres.push(activeGenres.innerHTML.trim());
            }
        }
        if (!Elements.newRatingCircle.innerHTML.includes('.')) {
            rating = parseInt(Elements.ratingSlider.value);
        }

        Model.editMovie(genres, rating, title);
        let movieIndex = getMovieIndex(title);
        View.changeMovieHTML(movieIndex);
    });

}
