(function() {
  'use strict';

  angular
      .module('enkiApp')
      .service('memoAnimalCards', memoAnimalCards);

  /** @ngInject */
  function memoAnimalCards() {
    var animalDeck = [
      {
        'title': 'czeresnia',
        'frontPic': 'czeresnia.jpg'
      },
      {
        'title': 'pomarancz',
        'frontPic': 'pomarancz.jpg'
      },
      {
        'title': 'truskawka',
        'frontPic': 'truskawka.jpg'
      },
      {
        'title': 'winogrona',
        'frontPic': 'winogrona.jpg'
      },
      {
        'title': 'czeresnia',
        'frontPic': 'czeresnia.jpg'
      },
      {
        'title': 'pomarancz',
        'frontPic': 'pomarancz.jpg'
      },
      {
        'title': 'truskawka',
        'frontPic': 'truskawka.jpg'

      },
      {
        'title': 'winogrona',
        'frontPic': 'winogrona.jpg'
      }
    ];

    this.showAnimalCards = showAnimalCards;

    function showAnimalCards() {
      return animalDeck.map(function (item) {
        return {
          title: item.title,
          frontPic: item.frontPic,
          backPic: "angular.png",
          class: "card-size",
          blocked: false,
          selected: false
        }
      });
    }
  }

})();
