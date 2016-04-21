(function() {
  'use strict';

  angular
    .module('enkiApp')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, memoCards, memoAnimalCards, toastr, FBMSG, authFactory, $firebaseArray, cacheUserFactory) {
    var vm = this;


    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1460369567036;
    vm.showToastr = showToastr;

    vm.showRegisterVal = false;
    vm.showRegisterForm = showRegisterForm;

    //GAME

    vm.allCards = [];
    vm.allAnimalCards = [];

    vm.clickCard = clickCard;

    vm.selectedCards = [];
    vm.firstCard;
    vm.secondCard;
    vm.oldCards = [];
    vm.doneCards = [];
    vm.playGame = playGame;
    vm.playAnimalGame = playAnimalGame;
    vm.counter = 0;
    vm.playing = false;
    vm.logOut = logOut;
    // vm.rankPoints = rankPoints;
    // vm.rank = 0;



    //USER
    vm.users = [];
    vm.newUser = {};
    vm.name = "";
    vm.email ="";
    vm.password = "";
    vm.signUp = signUp;
    vm.showUserInfo = cacheUserFactory.readCacheFlag();

    vm.submitForm = submitForm;
    vm.loginName = "";
    vm.loginEmail ="";
    vm.loginPassword ="";
    vm.logUser = logUser;
    vm.submitLoginForm = submitLoginForm;
    vm.points = 0;
    vm.checkStatus = checkStatus;

    vm.updatePoints = updatePoints;
    vm.userNameFromDataBase;
    vm.pointsFromDataBase;
    vm.emailFromDataBase;
    vm.authData;
    vm.leaderName = [];
    vm.leaderPoints = [];
    vm.getUserData = getUserData;

    vm.toggleGameValue = true;
    vm.toggleAnimalGameValue = false;

    vm.showAnimalCards = showAnimalCards;
    vm.showCards = showCards;

    vm.showLeaderBoard = showLeaderBoard;

    var firebaseRef  = new Firebase(FBMSG);
    vm.users = $firebaseArray(firebaseRef);
    var query = firebaseRef.orderByChild("points");
    vm.filteredUsers = $firebaseArray(query);

    activate();
    showCards();

    firebaseRef.onAuth(checkStatus);

    //MAIN FUNCTIONS

    function showRegisterForm(){
        vm.showRegisterVal = !vm.showRegisterVal;
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

    function showLeaderBoard() {
        vm.userURL = new Firebase(FBMSG);
        vm.userURL.orderByChild("points").on("child_added", function(snapshot) {
            vm.leaderName = snapshot.val().name;
            vm.leaderPoints = snapshot.val().points;
            console.log(snapshot.val().name + " has " + snapshot.val().points + " points");
        });
    }

//GAME FUNCTIONS

   function showCards(){
        vm.playing = false;
        vm.toggleGameValue = true;
        vm.toggleAnimalGameValue = false;
        vm.allCards = memoCards.showCards();
        shuffle(vm.allCards);
    }

    function showAnimalCards(){
        vm.playing = false;
        vm.toggleGameValue = false;
        vm.toggleAnimalGameValue = true;
        vm.allAnimalCards = memoAnimalCards.showAnimalCards();
        shuffle(vm.allAnimalCards);
    }

    function playGame(){
        vm.doneCards = [];
        vm.counter = 0;
        showCards();
        vm.playing = true;
    }

    function playAnimalGame(){
        vm.doneCards = [];
        vm.counter = 0;
        showAnimalCards();
        vm.playing = true;
    }

    function isPlaying() {
        return vm.playing;
    }

    function gameOver () {
        console.log("game over");
        toastr.info("Congrats! You're the guy!");
        vm.playing = false;
        console.log(vm.counter);
        updatePoints();
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
        if (!isPlaying() || card.blocked) {
            console.log("game blocked!");
            return;
        }
        vm.counter ++;
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
                    gameOver();

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
            console.log(userData);
            console.log("Successfully created user account with uid:", userData.uid);
            firebaseRef.child(userData.uid).set({
                email:vm.email,
                name: vm.name,
                points: vm.points
            });


        }, function(error) {
            console.log("Error creating user:", error);
        })
    }

    function logUser(){
        var result = authFactory.authUser(vm.loginEmail, vm.loginPassword);
        result.then(function(authData){
            vm.authData = authData;
            getUserData(authData.uid);
            console.log("Authenticated successfully with payload:", authData.uid);

        }, function(error) {
            console.log("Login failed:", error);
        })
    }

    function logOut(){

        firebaseRef.unauth();
    }

    function getUserData(id) {

        vm.userURL = new Firebase(FBMSG + id);
        vm.userURL.once("value", function(snapshot){

            var nameSnapshot = snapshot.child("name");
            vm.userNameFromDataBase = nameSnapshot.val();

            var pointsSnapshot = snapshot.child("points");
            vm.pointsFromDataBase = pointsSnapshot.val();

            var emailSnapshot = snapshot.child("email");
            vm.emailFromDataBase = emailSnapshot.val();

        });
    }


    function updatePoints() {
        vm.userURL = new Firebase(FBMSG + vm.authData.uid);
        vm.userURL.update({
            "points" : vm.pointsFromDataBase + vm.counter
        });

    }

    function checkStatus(authData) {
        if (authData) {
            console.log("User " + authData.uid + " is logged in with " + authData.provider);
            vm.authData = authData;
            vm.showUserInfo = true;
            cacheUserFactory.cachingUserFlag(vm.showUserInfo);
            getUserData(authData.uid);
        } else {
            console.log("User is logged out");
        }
    }

  }

})();
