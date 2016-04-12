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
        'frontside': 'false'
      },
      {
        'title': 'pomarancz',
        'logo': 'pomarancz.jpg',
        'frontside': 'false'
      },
      {
        'title': 'truskawka',
        'logo': 'truskawka.jpg',
        'frontside': 'false'
      },
      {
        'title': 'winogrona',
        'logo': 'winogrona.jpg',
        'frontside': 'false'
      },
      {
        'title': 'czeresnia',
        'logo': 'czeresnia.jpg',
        'frontside': 'false'
      },
      {
        'title': 'pomarancz',
        'logo': 'pomarancz.jpg',
        'frontside': 'false'
      },
      {
        'title': 'truskawka',
        'logo': 'truskawka.jpg',
        'frontside': 'false'
      },
      {
        'title': 'winogrona',
        'logo': 'winogrona.jpg',
        'frontside': 'false'
      }
    ];

    this.showCards = showCards;

    function showCards() {
      return deck;
    }
  }

})();
