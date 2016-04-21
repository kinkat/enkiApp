(function() {
  'use strict';

  angular
      .module('enkiApp')
      .service('memoAnimalCards', memoAnimalCards);

  /** @ngInject */
  function memoAnimalCards() {
    var animalDeck = [
      {
        'title': 'pies',
        'frontPic': 'pies.jpg'
      },
      {
        'title': 'grumpy',
        'frontPic': 'grumpy.jpg'
      },
      {
        'title': 'mops',
        'frontPic': 'mops.jpg'
      },
      {
        'title': 'kot',
        'frontPic': 'kot.jpg'
      },
      {
        'title': 'pies',
        'frontPic': 'pies.jpg'
      },
      {
        'title': 'grumpy',
        'frontPic': 'grumpy.jpg'
      },
      {
        'title': 'mops',
        'frontPic': 'mops.jpg'

      },
      {
        'title': 'kot',
        'frontPic': 'kot.jpg'
      }
    ];

    this.showAnimalCards = showAnimalCards;

    function showAnimalCards() {
      return animalDeck.map(function (item) {
        return {
          title: item.title,
          frontPic: item.frontPic,
          backPic: "yeoman.png",
          class: "card-size",
          blocked: false,
          selected: false
        }
      });
    }
  }

})();
