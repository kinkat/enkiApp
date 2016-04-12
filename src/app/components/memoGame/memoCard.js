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
        'frontPic': 'czeresnia.jpg',
        'backPic': 'yeoman.png',
        'class': 'card-size'
      },
      {
        'title': 'pomarancz',
        'frontPic': 'pomarancz.jpg',
        'backPic': 'yeoman.png',
        'class': 'card-size'
      },
      {
        'title': 'truskawka',
        'frontPic': 'truskawka.jpg',
        'backPic': 'yeoman.png',
        'class': 'card-size'
      },
      {
        'title': 'winogrona',
        'frontPic': 'winogrona.jpg',
        'backPic': 'yeoman.png',
        'class': 'card-size'
      },
      {
        'title': 'czeresnia',
        'frontPic': 'czeresnia.jpg',
        'backPic': 'yeoman.png',
        'class': 'card-size'
      },
      {
        'title': 'pomarancz',
        'frontPic': 'pomarancz.jpg',
        'backPic': 'yeoman.png',
        'class': 'card-size'
      },
      {
        'title': 'truskawka',
        'frontPic': 'truskawka.jpg',
        'backPic': 'yeoman.png',
        'class': 'card-size'
      },
      {
        'title': 'winogrona',
        'frontPic': 'winogrona.jpg',
        'backPic': 'yeoman.png',
        'class': 'card-size'
      }
    ];

    this.showCards = showCards;

    function showCards() {
      return deck;
    }
  }

})();
