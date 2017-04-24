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
    const modalCloseButtonArr = Array.from(Elements.modalCloseButton);
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
        const newMovie = new Movie(Elements.movieTitle.value, Elements.movieYear.value, Elements.movieGenres.value.split(','), Elements.movieCover.value);
        const index = Model.addMovie(newMovie);
        View.renderNewMovie(newMovie, index);
        bindEvent(Elements.movieCardContainer[index], function() {
            View.openMovieView(index);
        });
        View.displaySuccessMessage();
        View.displayAllMovies();
    }, 'submit');

    // Binding top rated
    bindEvent(Elements.topRatedLink, function() {
        const movie = Model.getTopRatedMovie();
        View.displayMovie(movie);
    });

    // Bind worst rated
    bindEvent(Elements.worstRatedLink, function() {
        const movie = Model.getWorstRatedMovie();
        View.displayMovie(movie);
    });

    // Call view function to display all movies
    bindEvent(Elements.allMoviesLink, View.displayAllMovies);

    // Create click functions for all menu genre links
    const genreLinkArr = Array.from(Elements.genreLinkName);
    genreLinkArr.forEach(link => {
        bindEvent(link, function() {
            const genre = this.innerHTML.trim();
            const movieArr = Model.getMoviesByGenre(genre);
            View.displayMovies(movieArr);
        });
    });

    // Creating click function for year filter on menu
    bindEvent(Elements.yearSort, View.displayYearInput);
    bindEvent(Elements.movieYearInput, function() {
        const year = this.value;
        const movieArr = Model.getMoviesThisYear(year);
        View.displayMovies(movieArr);
    }, 'keyup');

    // Close movie preview when clicking on button
    bindEvent(Elements.closeMovieButton, View.closeMovieView);

    // Click function to open movie sidebar view for all current movies in db
    const movieCardArr = Array.from(Elements.movieCardContainer);
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
    const genreChips = Array.from(Elements.genreEditChip);
    genreChips.forEach(chip => {
        bindEvent(chip, function() {
            View.previewGenres(this);
        });
    });

    // Submit changes to edited movie
    bindEvent(Elements.submitEditButton, function() {
        let genres = [];
        let rating;
        const title = Elements.modalTitle.innerHTML;
        for (const activeGenres of Elements.genreEditChip) {
            if (activeGenres.classList.contains('active')) {
                genres.push(activeGenres.innerHTML.trim());
            }
        }
        if (!Elements.newRatingCircle.innerHTML.includes('.')) {
            rating = parseInt(Elements.ratingSlider.value);
        }

        Model.editMovie(genres, rating, title);
        View.changeMovieHTML(title);
    });

}
