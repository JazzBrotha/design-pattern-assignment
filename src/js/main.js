import Model from './model'
import View from './view'
import Controller from './controller'
import {
  parseMovies,
  blockWhiteSpace
} from './helpers'

// Checks if user has an empty storage and sets it if neededC
if (typeof(Storage) !== "undefined") {
    if (localStorage.getItem("0") === null) {
        Model.setInitialDb();
    }
}
// Informs the user if localStorage is not supported
else {
    alert("Sorry! No Web Storage support available. Please consider switching to another browser.");
}

let movieArr = parseMovies();
View.createMovieList(movieArr);
Controller();
blockWhiteSpace();
