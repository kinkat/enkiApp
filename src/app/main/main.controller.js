(function() {
  'use strict';

  angular
    .module('enkiApp')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, memoCards, toastr, FBMSG, authFactory) {
    var vm = this;

    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1460369567036;
    vm.showToastr = showToastr;

    vm.showRegisterVal = false;
    vm.showRegisterForm = showRegisterForm;

    //GAME

    vm.allCards = [];
    vm.allCardsShuffle = [];
    vm.clickCard = clickCard;

    vm.selectedCards = [];
    vm.firstCard;
    vm.secondCard;
    vm.oldCards = [];
    vm.doneCards = [];
    vm.playGame = playGame;
    vm.counter = 0;


    //USER
    vm.users = [];
    vm.newUser = {};
    vm.name = "";
    vm.email ="";
    vm.password = "";
    vm.signUp = signUp;

    vm.submitForm = submitForm;
    vm.loginName = "";
    vm.loginEmail ="";
    vm.loginPassword ="";
    vm.logUser = logUser;
    vm.submitLoginForm = submitLoginForm;
    vm.points = "";
    vm.showPoints = showPoints;
    vm.checkStatus = checkStatus;

    var firebaseRef = new Firebase(FBMSG);

    var currentRef = "";

    activate();
    showCards();

    firebaseRef.onAuth(checkStatus);
    var x = firebaseRef.getAuth();


    //MAIN FUNCTIONS

    function showRegisterForm(){
        vm.showRegisterVal = true;
    }

    function activate() {
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

    function playGame(){
        vm.doneCards = [];
        vm.allCards.forEach(function(card){
            card.blocked = false;
            card.selected = false;
            card.backPic = 'yeoman.png';
            toastr.info("Get ready and play!");
            vm.counter = 0;

        });
        showCards();
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
        if (card.blocked || card.selected) {
            return;
            console.log(vm.doneCards.length);
        }
        vm.counter ++;
        vm.turns = vm.counter/2;
        card.backPic = card.frontPic;
        card.selected = true;
        checkCards(card);
    }

    function checkCards(cardget){

        //cardget - aktualnie kliknieta karta
        //doneCards - wszystkie dobrane w pray
        //selectedCards - tablica 1 lub 2 odwrconych kart, nie wiadomo czy pasuja, czy nie
        //oldcards to selectedcards ktore przechodza do kolejnej tury i znikaja po klieknieciu karty nr 3

            if (!vm.selectedCards.length) {
                if (vm.oldCards.length > 0) {
                        vm.oldCards.forEach(function(item){
                            item.backPic = 'yeoman.png';
                            item.selected = false;
                        })
                }
                vm.oldCards.length = 0;
                vm.selectedCards.push(cardget);

            } else if (cardget.title === vm.selectedCards[0].title)  {
                if(vm.doneCards.length === vm.allCards.length - 2) {
                    toastr.info("Congrats! You're the guy!");

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
            signUp();
        }
    }

    function submitLoginForm(isValid) {
        if (isValid) {
            alert("jest valid");
            logUser();
        }
    }

    function signUp(){
        var result = authFactory.addUser(vm.email, vm.password);
        result.then(function(userData){

            console.log("Successfully created user account with uid:", userData.uid);
            firebaseRef.child(userData.uid).set({
                email:vm.email,
                name: vm.name,
                points: vm.points
            });
            console.log(vm.databaseLink);

        }, function(error) {
            console.log("Error creating user:", error);
        })
    }

    function logUser(){
        var result = authFactory.authUser(vm.loginEmail, vm.loginPassword);
        result.then(function(authData){console.log(authData);
            console.log("Authenticated successfully with payload:", authData.uid);

        }, function(error) {
            console.log("Login failed:", error);
        })
    }


    function showPoints(){

        firebaseRef.on("value", function(snapshot)  {
            console.log(snapshot.val());
            }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });

    }

    function checkStatus(authData) {
        if (authData) {
            console.log("User " + authData.uid + " is logged in with " + authData.provider);

            return authData.uid;

        } else {
            console.log("User is logged out");
        }
    }

  }

})();
