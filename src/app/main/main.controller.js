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
    vm.cardClickedFirst;
    vm.cardClickedSecond;


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
      console.log(vm.allCards);
    }

    function clickCard(card) {

        card.backPic = card.frontPic;





    }

  }
})();
