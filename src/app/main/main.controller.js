(function() {
  'use strict';

  angular
    .module('enkiApp')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, memoCards,  toastr) {
    var vm = this;

    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1460369567036;
    vm.showToastr = showToastr;

    vm.allCards = [];
    vm.clickCard = clickCard;

    vm.selectedCards = [];

    activate();


    function activate() {
      showCards();
      getWebDevTec();
      $timeout(function() {
        vm.classAnimation = 'rubberBand';
      }, 4000);
    }

    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      vm.classAnimation = '';
    }

    function getWebDevTec() {
      vm.awesomeThings = webDevTec.getTec();

      angular.forEach(vm.awesomeThings, function(awesomeThing) {
        awesomeThing.rank = Math.random();
      });
    }

    function showCards() {
      vm.allCards = memoCards.showCards();
    }


    function clickCard(card) {

        if (card.blocked) {
            return;
        }
        var selectedCards = [];
        card.backPic = card.frontPic;
        card.selected = true;
        checkCards(card);

    }

    function checkCards(cardget){

            if (!vm.selectedCards.length) {
                 vm.selectedCards.push(cardget);

            } else if (cardget.title === vm.selectedCards[0].title)  {
                console.log('pasuje');
                vm.selectedCards = [];
                console.log(vm.selectedCards);
            } else {
                console.log("nie pasuje, dokoncze jutro, milego dnia");
                vm.selectedCards = [];
            }

    };

  }
})();
