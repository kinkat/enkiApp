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
        'class': 'card-size',
        'blocked': 'true'
      },
      {
        'title': 'pomarancz',
        'frontPic': 'pomarancz.jpg',
        'backPic': 'yeoman.png',
        'class': 'card-size',
        'blocked': 'true'
      },
      {
        'title': 'truskawka',
        'frontPic': 'truskawka.jpg',
        'backPic': 'yeoman.png',
        'class': 'card-size',
        'blocked': 'true'
      },
      {
        'title': 'winogrona',
        'frontPic': 'winogrona.jpg',
        'backPic': 'yeoman.png',
        'class': 'card-size',
        'blocked': 'true'
      },
      {
        'title': 'czeresnia',
        'frontPic': 'czeresnia.jpg',
        'backPic': 'yeoman.png',
        'class': 'card-size',
        'blocked': 'true'
      },
      {
        'title': 'pomarancz',
        'frontPic': 'pomarancz.jpg',
        'backPic': 'yeoman.png',
        'class': 'card-size',
        'blocked': 'true'
      },
      {
        'title': 'truskawka',
        'frontPic': 'truskawka.jpg',
        'backPic': 'yeoman.png',
        'class': 'card-size',
        'blocked': 'true'
      },
      {
        'title': 'winogrona',
        'frontPic': 'winogrona.jpg',
        'backPic': 'yeoman.png',
        'class': 'card-size',
        'blocked': 'true'
      }
    ];

    this.showCards = showCards;

    function showCards() {
      return deck;
    }
  }

})();
