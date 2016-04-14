(function() {
  'use strict';

  angular
    .module('enkiApp')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, memoCards, toastr) {
    var vm = this;

    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1460369567036;
    vm.showToastr = showToastr;

    //GAME

    vm.allCards = [];
    vm.allCardsShuffle = [];
    vm.clickCard = clickCard;

    vm.selectedCards = [];
    vm.firstCard;
    vm.secondCard;
    vm.oldCards = [];
    vm.doneCards = [];


    //USER
    vm.users = [];
    vm.newUser ={};
    vm.name = "";
    vm.email="";
    vm.password="";
    vm.addUser = addUser;
    vm.submitForm = submitForm;

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


//GAME FUNCTIONS

    function showCards() {
      vm.allCards = memoCards.showCards();
      vm.allCardsShuffle = shuffle(vm.allCards);

    }

    function shuffle(array) {
      var currentIndex = array.length, tempValue, randomIndex;

      while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;


        tempValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = tempValue;
      }
      return array;
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
                if(vm.doneCards.length === vm.allCards.length - 2) {
                    toastr.info("wygrana");

                }
                vm.doneCards.push(cardget);
                vm.doneCards.push(vm.selectedCards[0]);
                vm.selectedCards = [];

                vm.doneCards.forEach(function(item){
                            item.blocked = true;
                        })

            } else {
                vm.firstCard = vm.selectedCards[0];
                vm.secondCard = cardget;

                vm.selectedCards = [];
                vm.oldCards.push(vm.firstCard);
                vm.oldCards.push(vm.secondCard);
            }
    }
//FORM FUNCTIONS

    function submitForm(isValid) {
        if (isValid) {
            alert("jest valid");
            addUser();
        }
    }

    function addUser() {
        vm.newUser = {
            name: vm.name,
            email:vm.email,
            password:vm.password
        }
        console.log(vm.newUser);
    }

  }
})();
