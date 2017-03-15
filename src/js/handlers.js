//jshint esversion: 6
import Elements from './elements.js'

module.exports = (function() {
  
// Prevents blank space as first character in all input fields
const inputs = document.querySelectorAll('input');
for (let i = 0; i < inputs.length; i++) {
inputs[i].addEventListener("keydown", function(event) {
    if (event.which === 32 && event.target.selectionStart === 0) {
        event.preventDefault();
      }
    });
  }

//Binds close button on every modal to close the repspective modal
let modalCloseButtonArr = Array.from(Elements.modalCloseButton);
modalCloseButtonArr.forEach( (button, index) => {
  button.onclick = function () {
    Elements.modals[index].classList.remove('active');
  };
});

})();
// Elements.closeRatingModal.onclick = function() {
//    Elements.editModal.classList.remove('active');
//    for (let editChip of Elements.genreEditChip) {
//      editChip.classList.remove('active');
//    }
//
//  };
