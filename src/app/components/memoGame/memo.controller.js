(function() {
  'use strict';

  angular
    .module('enkiApp')
    .controller('MemoController', MemoController);

  /** @ngInject */
  function MemoController($timeout, $route, $location,
    memoCards, toastr, FBMSG, authFactory, $firebaseArray, cacheUserFactory, helpersFactory, flagService) {

    var memoVm = this;

    memoVm.showToastr = showToastr;

    //GAME

    memoVm.allCards = [];
    memoVm.gameVal;
    memoVm.newCards = [];
    memoVm.shuffleCards;
    memoVm.cloned;
    memoVm.cardValHtml;

    memoVm.clickCard = clickCard;

    memoVm.selectedCards = [];
    memoVm.shuffleCards;
    memoVm.doubleShuffleCards = [];
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
    memoVm.generateDeck = generateDeck;

    cacheUserFactory.readCacheUserId()
        .then(function(userId){
            memoVm.getUserId = userId;
        });


    var firebaseRef = new Firebase(FBMSG);
    memoVm.users = $firebaseArray(firebaseRef);

    generateDeck();

    firebaseRef.onAuth(authFactory.checkStatus);

    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      memoVm.classAnimation = '';
    }

//GAME FUNCTIONS

    function generateDeck(cardValHtml) {

        memoVm.cardValHtml = cardValHtml;
        if (cardValHtml === 1) {
            memoVm.allCards = memoCards.showCards();
            memoVm.shuffleCards = helpersFactory.shuffle(memoVm.allCards, 6);
        } else if (cardValHtml === 2) {
            memoVm.allCards = memoCards.showCards();
            memoVm.shuffleCards = helpersFactory.shuffle(memoVm.allCards, 4);
        } else if (cardValHtml === 3) {
            memoVm.allCards = memoCards.showCardsAnimals();
            memoVm.shuffleCards = helpersFactory.shuffle(memoVm.allCards, 6);
        } else {
            memoVm.allCards = memoCards.showCardsAnimals();
            memoVm.shuffleCards = helpersFactory.shuffle(memoVm.allCards, 4);
        }

        memoVm.cloned = angular.copy(memoVm.shuffleCards);
        memoVm.shuffleCards = memoVm.shuffleCards.concat(memoVm.cloned);
        return memoVm.shuffleCards;
        showCards();
    }

    function showCards(item){
        memoVm.playing = false;
        memoVm.toggleGameValue = true;
        memoVm.toggleAnimalGameValue = false;
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
                    item.selected = false;
                    item.blocked = false;
                    console.log(memoVm.cardValHtml);
                    if (memoVm.cardValHtml === 1 || memoVm.cardValHtml === 2){
                        item.backPic = 'yeoman.png';
                        console.log(item.backPic);
                    } else {
                        item.backPic = 'angular.png';
                        console.log(item.backPic);
                    }
                })
            }
            memoVm.oldCards.length = 0;
            memoVm.selectedCards.push(cardget);

        } else if (cardget.title === memoVm.selectedCards[0].title)  {
                if(memoVm.doneCards.length === memoVm.shuffleCards.length - 2) {
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



