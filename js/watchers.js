//jshint esversion:6
// MovieWiki.elements.movieList[0].watch('ratings', function (id, oldval, newval) {
//   console.log(`${MovieWiki.elements.movieList[0].title}'s ${id} changed to ${MovieWiki.methods.getAverage(newval)}`);
//   return newval;
// });

function movieWatcher (id, oldval, newval) {
  if (id === 'ratings') {
  console.log(`${id} changed from ${oldval} to ${MovieWiki.methods.getAverage(newval)}`);
  return newval;
  }

  if (id === 'title') {
    console.log(`${id} changed from ${oldval} to ${newval}`);
    return newval;
  }

  if (id === 'year') {
    console.log(`${id} changed from ${oldval} to ${newval}`);
    // MovieWiki.elements.modalYear.innerHTML = newval;
    return newval;
  }
  if (id === 'genres') {
    console.log(`${id} changed from ${oldval} to ${newval}`);
    MovieWiki.elements.modalGenres.innerHTML = newval;
    // return newval;
  }

}

for (let i = 0; i < MovieWiki.elements.movieList.length; i++) {
  MovieWiki.elements.movieList[i].watch('title', movieWatcher);
  MovieWiki.elements.movieList[i].watch('year', movieWatcher);
  MovieWiki.elements.movieList[i].watch('genres', movieWatcher);
  MovieWiki.elements.movieList[i].watch('ratings', movieWatcher);
}
