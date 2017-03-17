// Module that contains all the html elemetns
// This way. whenever a variable is declared in our app we know that is does not reference a html element
module.exports = {
    allMoviesLink : document.getElementById('all-movies-link'),
    cardBody : document.getElementsByClassName('card-body'),
    cardContainer : document.getElementById('card-container'),
    cardMovieCover : document.getElementsByClassName('card-movie-cover'),
    cardMovieGenre : document.getElementsByClassName('card-movie-genre'),
    cardMovieRating : document.getElementsByClassName('card-movie-rating'),
    cardMovieTitle : document.getElementsByClassName('card-movie-title'),
    cardMovieYear : document.getElementsByClassName('card-movie-year'),
    closeNewMovie : document.getElementById('close-new-movie'),
    closeMovieButton : document.getElementById('close-movie-button'),
    editButton : document.getElementById('edit-button'),
    editModal : document.getElementById('edit-modal'),
    genreChip : document.getElementsByClassName('genre-chip'),
    genreContainer : document.getElementById('genre-container'),
    genreEditChip : document.getElementsByClassName('genre-edit-chip'),
    genreLabelCount : document.getElementsByClassName('genre-label-count'),
    genreLinkName : document.getElementsByClassName('genre-link-name'),
    // genreSuccess : document.getElementById('genre-success'),
    inputs : document.querySelectorAll('input'),
    listGenre : document.getElementsByClassName('list-genre'),
    listRating : document.getElementsByClassName('list-rating'),
    modalCloseButton : document.getElementsByClassName('modal-close-button'),
    modalGenres : document.getElementById('modal-movie-genres'),
    modalOpener : document.getElementsByClassName('modal-opener'),
    modalPoster : document.getElementById('modal-movie-poster'),
    modalRating : document.getElementById('modal-movie-rating'),
    modals : document.getElementsByClassName('modal'),
    modalTitle : document.getElementById('modal-movie-title'),
    modalYear : document.getElementById('modal-movie-year'),
    movieCards : document.getElementsByClassName('card'),
    movieCardContainer : document.getElementsByClassName('movie-card-container'),
    movieCover : document.forms.movieCreator.cover,
    movieCreator : document.forms.movieCreator,
    movieGenreInput : document.forms.movieGenreInput,
    movieGenres : document.forms.movieCreator.genres,
    movieModal : document.getElementById('movie-modal'),
    moviePreview : document.getElementById('mySidenav'),
    movieResult: document.getElementById('movie-result'),
    movieTitle : document.forms.movieCreator.title,
    movieYear : document.forms.movieCreator.year,
    movieYearInput : document.getElementById('movie-year-input'),
    newMovieButton : document.getElementById('new-movie-button'),
    newMovieModal : document.getElementById('new-movie-modal'),
    newRatingCircle : document.getElementById('new-rating-circle'),
    newRatingSpan : document.getElementById('new-rating-span'),
    ratingButton : document.getElementsByClassName('rating-button'),
    ratingCirle : document.getElementById('rating-circle'),
    ratingModal : document.getElementById('rating-modal'),
    ratingSlider : document.getElementById('rating-slider'),
    ratingSort : document.getElementById('rating-sort'),
    submitEditButton : document.getElementById('submit-edit-button'),
    titleSort : document.getElementById('title-sort'),
    topRatedLink : document.getElementById('top-rated-link'),
    worstRatedLink : document.getElementById('worst-rated-link'),
    yearSort : document.getElementById('year-sort')
};
