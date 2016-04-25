(function() {
  'use strict';

  angular
    .module('enkiApp')
    .factory('helpersFactory', helpersFactory);

    /** @ngInject */
    helpersFactory.$inject = [];

    function helpersFactory() {
        var array = [];

        var factory = {
            shuffle: shuffle
        };

        return factory;

        function shuffle(array) {
            var currentIndex = array.length, tempValue, randomIndex;

            while (0 !== currentIndex) {

                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                tempValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = tempValue;
            }
        return array;
        }

    }
})();



