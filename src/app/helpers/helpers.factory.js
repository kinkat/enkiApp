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
            showRankPoints: showRankPoints
        };

        return factory;

        function shuffle(arr, count) {
            var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
                while (i-- > min) {
                    index = Math.floor((i + 1) * Math.random());
                    temp = shuffled[index];
                    shuffled[index] = shuffled[i];
                    shuffled[i] = temp;
                }
            return shuffled.slice(0,min);
        }

        function showRankPoints(counter) {
            var rankPoints;
            if (counter < 11) {
                rankPoints = 5;
            } else if (11 < counter < 15) {
                rankPoints = 4;
            } else if (15 <  counter < 19) {
                rankPoints = 3;
            } else if (19 < counter < 23) {
                rankPoints = 2;
            } else {
                rankPoints = 1;
            }
            return rankPoints;
        }
    }
})();



