import MovieDb from './movies'
import {
    getAverage,
    parseMovies
} from './helpers'


export default {

    //Sets database first time app is run
    setInitialDb() {
        MovieDb.forEach((movie, index) => {
            localStorage.setItem(JSON.stringify(index), JSON.stringify(movie));
        });
    },

    addMovie(movie) {
        let index = localStorage.length;
        localStorage.setItem(JSON.stringify(index), JSON.stringify(movie));
        return index;
    },

    editMovie(genres, rating, title) {
        for (let key in localStorage) {
            if (typeof localStorage[key] === 'string') {
                let movie = JSON.parse(localStorage[key]);
                if (movie.title === title) {
                    movie.genres = genres;
                    if (rating !== undefined) {
                        movie.ratings.push(rating);
                    }
                    localStorage.setItem(JSON.stringify(key), JSON.stringify(movie));
                }
            }
        }
    },

    getTopRatedMovie() {
        let movieArr = parseMovies();
        let multipleRatings = movieArr.filter(movie => movie.ratings.length > 1);
        let topRated = multipleRatings.reduce(
            (prevVal, currVal) =>
            getAverage(prevVal.ratings) > getAverage(currVal.ratings) ?
            prevVal :
            currVal
        );
        return topRated;
    },

    getWorstRatedMovie() {
        let movieArr = parseMovies();
        let multipleRatings = movieArr.filter(movie => movie.ratings.length > 1);
        let worstRated = multipleRatings.reduce(
            (prevVal, currVal) =>
            getAverage(prevVal.ratings) < getAverage(currVal.ratings) ?
            prevVal :
            currVal
        );
        return worstRated;
    },

    getMoviesThisYear(movieYear) {
        let movieArr = parseMovies();
        return movieArr.filter(
            (movie, index) =>
            movie.year === parseInt(movieYear)
        );
    },

    getMoviesByGenre(movieGenre) {
        let movieArr = parseMovies();
        let genreArr = movieArr.filter(
            (movie, index) =>
            movie.genres.includes(movieGenre)
        );
        return genreArr;
    },
};
