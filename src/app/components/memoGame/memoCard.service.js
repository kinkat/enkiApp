//stores info about 2 cards decks

(function() {
  'use strict';

  angular
      .module('enkiApp')
      .service('memoCards', memoCards);

  /** @ngInject */
  function memoCards() {
    var vm = this;
        vm.allCards;

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
        'title': 'jagody',
        'frontPic': 'jagody.jpg'
      },
      {
        'title': 'malina',
        'frontPic': 'malina.jpg'
      },
      {
        'title': 'arbuz',
        'frontPic': 'arbuz.jpg'
      },
      {
        'title': 'peach',
        'frontPic': 'peach.jpg'
      }
    ];

    var deckAnimals = [
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
        'title': 'krowa',
        'frontPic': 'krowa.jpg'
      },
      {
        'title': 'kon',
        'frontPic': 'kon.jpg'
      },
      {
        'title': 'owca',
        'frontPic': 'owca.jpg'
      },
      {
        'title': 'ptak',
        'frontPic': 'ptak.jpg'
      }
    ];

    vm.showCards = showCards;
    vm.showCardsAnimals = showCardsAnimals;


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

    function showCardsAnimals() {
      return deckAnimals.map(function (item) {
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
