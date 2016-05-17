//shuffle cards in deck

(function() {
  'use strict';

  angular
    .module('enkiApp')
    .factory('helpersFactory', helpersFactory);

    /** @ngInject */
    helpersFactory.$inject = [];

    function helpersFactory() {

        var factory = {
            shuffle: shuffle,
            showRankPoints: showRankPoints,
            generateUniqueId: generateUniqueId

        };

        return factory;

        function shuffle(array) {
            var currentIndex = array.length, temporaryValue, randomIndex;
            // While there remain elements to shuffle
            while (0 !== currentIndex) {
            // Pick a remaining element
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }
            return array;
        }

        function showRankPoints(counter) {
            var rankPoints;
            if (counter < 11) {
                rankPoints = 5;
            } else if (11 < counter < 15) {
                rankPoints = 4;
            } else if (15 < counter < 19) {
                rankPoints = 3;
            } else if (19 < counter < 23) {
                rankPoints = 2;
            } else {
                rankPoints = 1;
            }
            return rankPoints;
        }

        //generete comment ID
        function generateUniqueId() {
            return 'id-' + Math.random().toString(36).substr(2, 16);
        }
    }
})();



