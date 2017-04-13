import Elements from './elements'

const SPACE_BAR = 32;

export function getAverage(arr) {
    let sum = 0;
    if (arr.length > 1) {
        for (let i = 0; i < arr.length; i++) {
            sum += arr[i];
        }
        return (sum / arr.length).toFixed(1);
    } else {
        return 'N/A';
    }
}

export function Movie(title, year, genres, posterurl) {
    this.title = title;
    this.year = year;
    this.genres = genres;
    this.ratings = [];
    this.posterurl = posterurl || 'dist/pics/movie-placeholder.svg';
    this.storyline = '';
    this.actors = '';
}

export function bindEvent(target, callback, type = 'click', capture = false) {
    target.addEventListener(type, callback, !!capture);
}

export function parseMovies() {
    let movieArr = [];
    for (let key in localStorage) {

        // Prevents other values in Firefox to be pushed
        if (typeof localStorage[key] === 'string')
            movieArr.push(JSON.parse(localStorage[key]));
    }
    return movieArr;
}

export function getMovieIndex(title) {
    let movieArr = parseMovies();
    let movie = movieArr.reduce((p, c) =>
      p.title === title || p.originalTitle === title ? p : c
    );
    let movieIndex = movieArr.indexOf(movie);
    return movieIndex;
}

//Prevents blank space as first character in all input fields
export function blockWhiteSpace() {
    for (let input of Elements.inputs) {
        bindEvent(input, function(e) {
            if (e.which === SPACE_BAR && e.target.selectionStart === 0) {
                e.preventDefault();
            }
        }, 'keydown');
    }
}

// Prevents page to keep loading if movie cover image is not available
export function checkMovieImage(index) {
    setTimeout(function() {
        if (Elements.cardMovieCover[index].height < 1) {
            Elements.cardMovieCover[index].src = 'dist/pics/movie-placeholder.svg';
        }
    }, 5000);
}
