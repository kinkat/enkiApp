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

    this.showCards = showCards;

    function showCards() {
      return deck.map(function (item) {
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
