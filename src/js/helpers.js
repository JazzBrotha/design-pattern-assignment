//jshint esversion:6
export function getAverage(arr) {
        let sum = 0;
        if (arr.length !== 0) {
        for (let i = 0; i < arr.length; i++) {
          sum+= arr[i];
        }
        return (sum/arr.length).toFixed(1);
        }
        else {
          return 'N/A';
        }
      }

//CONSTRUCTOR THAT CREATEs MovieDb WITH PROPER PROPERTIES WHEN CALLED
//SEPERATED FROM REST OF THE METHODS FOR CLARITY
export function Movie(title, year, genres, image) {
    this.title = title;
    this.year = year;
    this.genres = genres;
    this.ratings = [];
    this.image = image || 'dist/pics/movie-placeholder.svg';
}

export function bindEvent(target, callback, type = 'click', capture = false) {
  target.addEventListener(type, callback, !!capture);
}
