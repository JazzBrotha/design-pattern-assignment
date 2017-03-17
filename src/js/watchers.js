//jshint esversion:6

export function updateValue(id, oldval, newval) {
  if (id === 'genres') {
    console.log(id + ' changed from ' + oldval + ' to ' + newval);
    
    // throw new RangeError('invalid name for ' + this);
    // for (let kovie in localStorage) {
    //   if (localStorage[movie] === JSON.stringify(this)) {
    //     return JSON.parse(localStorage[key]).genres === newval;
    //   }
    // }
  }
  if (id === 'ratings') {
    console.log(id + ' changed from ' + oldval + ' to ' + newval);
    // throw new RangeError('invalid age for ' + this);
    // for (let key in localStorage) {
    //   if (localStorage[key] === JSON.stringify(this)) {
    //     return JSON.parse(localStorage[key]).ratings === newval;
    //   }
    // }
  }
}


// for (let editChip of Elements.genreEditChip) {
//   editChip.classList.remove('active');
// }
//
// Elements.cardBody[index].innerHTML = '';
// for (let genre of Elements.movieList[index].genres) {
// Elements.cardBody[index].innerHTML += `<label class="chip">${genre}</label>`;
// }
// Elements.modalGenres.innerHTML = Elements.cardBody[index].innerHTML;
//   Elements.editModal.classList.remove('active');
