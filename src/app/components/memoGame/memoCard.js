(function() {
  'use strict';

  angular
      .module('enkiApp')
      .service('memoCards', memoCards);

  /** @ngInject */
  function memoCards() {
    var deck = [
      {
        'title': 'czeresnia',
        'logo': 'czeresnia.jpg',
        'front': 'false'
      },
      {
        'title': 'pomarancz',
        'logo': 'pomarancz.jpg',
        'front': 'false'
      },
      {
        'title': 'truskawka',
        'logo': 'truskawka.jpg',
        'front': 'false'
      },
      {
        'title': 'winogrona',
        'logo': 'winogrona.jpg',
        'front': 'false'
      }
    ];

    this.showCards = showCards;

    function showCards() {
      return deck;
    }
  }

})();
