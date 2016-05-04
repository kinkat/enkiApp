 (function() {
  'use strict';

  angular
    .module('enkiApp')
    .controller('MemoController', MemoController);

  /** @ngInject */
  function MemoController($timeout, $route, $location,
    memoCards, toastr, FBMSG, authFactory, $firebaseArray, cacheUserFactory, helpersFactory, gameCacheService) {

    var memoVm = this;

    //GAME

    memoVm.allCards = [];
    memoVm.gameVal;
    memoVm.newCards = [];
    memoVm.shuffledCards;
    memoVm.cloned;
    memoVm.cardValHtml;

    memoVm.clickCard = clickCard;

    memoVm.selectedCards = [];
    memoVm.shuffledCards;
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

//GAME FUNCTIONS

    //generate cards deck based on clicked button
    function generateDeck(cardValHtml) {
        memoVm.playing = true;
        gameCacheService.cachingGameId(cardValHtml);

        memoVm.cardValHtml = cardValHtml;
        if (cardValHtml === 2) {
            memoVm.allCards = memoCards.showCards();
            memoVm.shuffledCards = helpersFactory.shuffle(memoVm.allCards, 4);
        } else if (cardValHtml === 3) {
            memoVm.allCards = memoCards.showCards();
            memoVm.shuffledCards = helpersFactory.shuffle(memoVm.allCards, 5);
        } else if (cardValHtml === 4) {
            memoVm.allCards = memoCards.showCardsAnimals();
            memoVm.shuffledCards = helpersFactory.shuffle(memoVm.allCards, 4);
        } else {
            memoVm.allCards = memoCards.showCardsAnimals();
            memoVm.shuffledCards = helpersFactory.shuffle(memoVm.allCards, 5);
        }

        memoVm.cloned = angular.copy(memoVm.shuffledCards);
        memoVm.shuffledCards = memoVm.shuffledCards.concat(memoVm.cloned);
        return memoVm.shuffledCards;
        showCards();
    }

    function showCards(item){

        memoVm.toggleGameValue = true;
        memoVm.toggleAnimalGameValue = false;
    }
    //fired on playbutton click in gamepanel
    function playGame(){
        memoVm.doneCards = [];
        memoVm.counter = 0;
        generateDeck(memoVm.cardValHtml);
        memoVm.playing = true;
    }

    function isPlaying() {
        return memoVm.playing;
    }

    function gameOver () {
        console.log("game over");
        toastr.info("Congrats! You're the guy!");
        memoVm.playing = false;
        showRankPoints();
        updatePoints();
    }

    function clickCard(card) {
        if (!isPlaying() || card.blocked) {
            return;
        }
       memoVm.counter ++;
        card.backPic = card.frontPic;
        card.selected = true;
        card.blocked = true;
        checkCards(card);
    }

    //main function responsible for game mechanics
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

                    if (memoVm.cardValHtml === 1 || memoVm.cardValHtml === 2){
                        item.backPic = 'yeoman.png';

                    } else {
                        item.backPic = 'angular.png';

                    }
                })
            }
            memoVm.oldCards.length = 0;
            memoVm.selectedCards.push(cardget);

        } else if (cardget.title === memoVm.selectedCards[0].title)  {
                if(memoVm.doneCards.length === memoVm.shuffledCards.length - 2) {
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
    //update userpoints in database
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
       }, 2000);
    }
    // based on clicks number return rank points
    function showRankPoints() {
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



