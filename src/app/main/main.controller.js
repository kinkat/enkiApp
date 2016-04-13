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
    vm.firstCard;
    vm.secondCard;
    vm.oldCards = [];
    vm.doneCards = [];

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
                if (vm.oldCards.length > 0) {
                        vm.oldCards.forEach(function(item){
                            item.backPic = 'yeoman.png';
                        })

                }
                vm.oldCards.length = 0;
                vm.selectedCards.push(cardget);

            } else if (cardget.title === vm.selectedCards[0].title)  {

                vm.selectedCards = [];

            } else {
                vm.firstCard = vm.selectedCards[0];
                vm.secondCard = cardget;

                vm.selectedCards = [];
                vm.oldCards.push(vm.firstCard);
                vm.oldCards.push(vm.secondCard);
            }

    };

  }
})();
