/**
 * Created by Namita Malik on 26/3/15.
 */

/*
 * I am here polluting the global object by making $scope as global scope variable, but this for the testing purpose
 * and sake of simplicity so that I can test from terminal
 * */
var $scope = {};
(function () {
    var bindClasses = ["title", "year", "genre"];
    var attachEvent = function (classNames) {
        classNames.forEach(function (className) {
            var elements = document.getElementsByClassName(className);
            for (var index in elements) {
                elements[index].onkeyup = function () {
                    for (var index in elements) {
                        elements[index].innerHTML = this.value;
                    }
                }
            }
            Object.defineProperty($scope, className, {
                set: function (newValue) {
                    for (var index in elements) {
                        elements[index].innerHTML = newValue;
                    }
                }
            });

        });
    };
    attachEvent(bindClasses);
})();
