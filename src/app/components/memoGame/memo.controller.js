(function() {
  'use strict';

  angular
    .module('enkiApp')
    .controller('MemoController', MemoController);

  /** @ngInject */
  function MemoController($timeout, $route, $location,
    memoCards, toastr, FBMSG, authFactory, $firebaseArray, cacheUserFactory, helpersFactory) {

    var memoVm = this;

    memoVm.showToastr = showToastr;

    //GAME

    memoVm.allCards = [];

    memoVm.clickCard = clickCard;

    memoVm.selectedCards = [];
    memoVm.firstCard;
    memoVm.secondCard;
    memoVm.oldCards = [];
    memoVm.doneCards = [];
    memoVm.playGame = playGame;

    memoVm.counter = 0;
    memoVm.playing = false;
    memoVm.rankPoints = 0;
    memoVm.countRankPoints = memoVm.countRankPoints;

    memoVm.updatePoints = updatePoints;

    memoVm.toggleGameValue = true;

    memoVm.showCards = showCards;
    memoVm.isPlaying = isPlaying;


    cacheUserFactory.readCacheUserId()
        .then(function(userId){
            memoVm.getUserId = userId;
        });


    var firebaseRef  = new Firebase(FBMSG);
    memoVm.users = $firebaseArray(firebaseRef);

    showCards();
    firebaseRef.onAuth(authFactory.checkStatus);


    // authFactory.getUserData()
    //     .then(function(UserDataObj){
    //             memoVm.pointsFromDataBase = UserDataObj;
    //                 console.log(memoVm.pointsFromDataBase);
    //             });

    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      memoVm.classAnimation = '';
    }

//GAME FUNCTIONS

    function showCards(){
        memoVm.playing = false;
        memoVm.toggleGameValue = true;
        memoVm.toggleAnimalGameValue = false;
        memoVm.allCards = memoCards.showCards();
        memoVm.shuffleCards = helpersFactory.shuffle(memoVm.allCards);
    }

    function playGame(){
        memoVm.doneCards = [];
        memoVm.counter = 0;
        showCards();
        memoVm.playing = true;
    }

    function isPlaying() {
        return memoVm.playing;
    }

    function gameOver () {
        console.log("game over");
        toastr.info("Congrats! You're the guy!");
        memoVm.playing = false;
        console.log(memoVm.counter);
        showRankPoints();
        updatePoints();
    }

    function clickCard(card) {
        if (!isPlaying() || card.blocked) {
            console.log("game blocked!");
            return;
        }
       memoVm.counter ++;
        card.backPic = card.frontPic;
        card.selected = true;
        card.blocked = true;
        checkCards(card);
    }

    function checkCards(cardget){

        //cardget - aktualnie kliknieta karta
        //doneCards - wszystkie dobrane w pray
        //selectedCards - tablica 1 lub 2 odwrconych kart, nie wiadomo czy pasuja, czy nie
        //oldcards to selectedcards ktore przechodza do kolejnej tury i znikaja po klieknieciu karty nr 3

        if (!memoVm.selectedCards.length) {
            if (memoVm.oldCards.length > 0) {
                memoVm.oldCards.forEach(function(item){
                    item.backPic = 'yeoman.png';
                    item.selected = false;
                    item.blocked = false;
                })
            }
            memoVm.oldCards.length = 0;
            memoVm.selectedCards.push(cardget);

        } else if (cardget.title === memoVm.selectedCards[0].title)  {
                if(memoVm.doneCards.length === memoVm.allCards.length - 2) {
                    gameOver();
                }
                memoVm.doneCards.push(cardget);
                memoVm.doneCards.push(memoVm.selectedCards[0]);

                memoVm.selectedCards = [];

                memoVm.doneCards.forEach(function(item){
                    item.blocked = true;
                })

            } else {
                memoVm.firstCard = memoVm.selectedCards[0];
                memoVm.secondCard = cardget;

                memoVm.selectedCards = [];
                memoVm.oldCards.push(memoVm.firstCard);
                memoVm.oldCards.push(memoVm.secondCard);
            }
    }

    function updatePoints() {
        memoVm.userURL = new Firebase(FBMSG + memoVm.getUserId);
            authFactory.getUserData(memoVm.getUserId)
                .then(function(UserDataObj){
                    memoVm.pointsFromDataBase = UserDataObj.pointsFromDataBase;
                    memoVm.userURL.update({
                        "points" : memoVm.pointsFromDataBase + memoVm.rankPoints
                    });
                });
        console.log(memoVm.getUserId);


        setTimeout(function(){
           $route.reload();
       }, 3000);
    }

    function showRankPoints(){
        if (memoVm.counter < 11) {
            memoVm.rankPoints = 5;
        }

        else if ( 11 < memoVm.counter < 15) {
            memoVm.rankPoints = 4;
        }

        else if (15 <  memoVm.counter < 19) {
            memoVm.rankPoints = 3;
        }

        else if ( 19 < memoVm.counter < 23) {
            memoVm.rankPoints = 2;

        } else {
            memoVm.rankPoints = 1;
        }

        return memoVm.rankPoints;
    }

}

})();



