import MovieDb from './movies'
import {
    getAverage,
    parseMovies
} from './helpers'


export default {

    // Sets database first time app is run
    setInitialDb() {
        MovieDb.forEach((movie, index) => {
            localStorage.setItem(index, JSON.stringify(movie));
        });
    },

    addMovie(movie) {
        const index = localStorage.length;
        localStorage.setItem(index, JSON.stringify(movie));
        return index;
    },

    editMovie(genres, rating, title) {
        for (const key in localStorage) {
            if (typeof localStorage[key] === 'string') {
                const movie = JSON.parse(localStorage[key]);
                if (movie.title === title || movie.originalTitle === title) {
                    movie.genres = genres;
                    if (rating !== undefined) {
                        movie.ratings.push(rating);
                    }
                    localStorage.setItem(key, JSON.stringify(movie));
                }
            }
        }
    },

    getTopRatedMovie() {
        const movieArr = parseMovies();
        const multipleRatings = movieArr.filter(movie => movie.ratings.length > 1);
        const topRated = multipleRatings.reduce(
            (prevVal, currVal) =>
            getAverage(prevVal.ratings) > getAverage(currVal.ratings) ?
            prevVal :
            currVal
        );
        return topRated;
    },

    getWorstRatedMovie() {
        const movieArr = parseMovies();
        const multipleRatings = movieArr.filter(movie => movie.ratings.length > 1);
        const worstRated = multipleRatings.reduce(
            (prevVal, currVal) =>
            getAverage(prevVal.ratings) < getAverage(currVal.ratings) ?
            prevVal :
            currVal
        );
        return worstRated;
    },

    getMoviesThisYear(movieYear) {
        const movieArr = parseMovies();
        return movieArr.filter(
            (movie, index) =>
            movie.year === movieYear
        );
    },

    getMoviesByGenre(movieGenre) {
        const movieArr = parseMovies();
        const genreArr = movieArr.filter(
            (movie, index) =>
            movie.genres.includes(movieGenre)
        );
        return genreArr;
    },
};
