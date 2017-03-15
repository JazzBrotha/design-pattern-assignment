//CONSTRUCTOR THAT CREATEs MovieDb WITH PROPER PROPERTIES WHEN CALLED
//SEPERATED FROM REST OF THE METHODS FOR CLARITY
module.exports = function Movie (title, year, genres, image) {
    this.title = title;
    this.year = year;
    this.genres = genres;
    this.ratings = [];
    this.image = image || 'dist/pics/movie-placeholder.svg';
};
