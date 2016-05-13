 (function() {
  'use strict';

  angular
    .module('enkiApp')
    .controller('MemoController', MemoController);

  /** @ngInject */
  function MemoController($timeout, $route, $location,
    memoCards, toastr, FBMSG, authFactory, $firebaseArray, cacheUserFactory, helpersFactory, gameCacheService, memoQuiz) {

    var memoVm = this;

    //GAME

    memoVm.allCards = [];
    memoVm.gameVal;
    memoVm.newCards = [];
    memoVm.shuffledCards;
    memoVm.cloned;
    memoVm.cardValHtml;
    memoVm.itIsQuizGame = false;

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
    memoVm.chooseGame = chooseGame;
    memoVm.chooseDeck = chooseDeck;
    memoVm.chooseGameLevel = chooseGameLevel;

    memoVm.updatePoints = updatePoints;

    memoVm.toggleGameValue = true;

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
    function chooseGame(cardValHtml) {
        if (cardValHtml === 5 || cardValHtml === 6 ) {
            memoVm.itIsQuizGame = true;
        } else {
            memoVm.itIsQuizGame = false;
        }
        return memoVm.itIsQuizGame;
    }

    function chooseDeck(cardValHtml) {
        if (cardValHtml === 1 || cardValHtml === 2) {
            memoVm.allCards = memoCards.showCards();
        } else {
            memoVm.allCards = memoCards.showCardsAnimals();
        }
        return memoVm.allCards;
    }

    function chooseGameLevel(cardValHtml, allCards) {
        if (cardValHtml === 1 || cardValHtml === 3) {
            memoVm.shuffledCards = helpersFactory.shuffle(allCards, 5);
        } else {
            memoVm.shuffledCards = helpersFactory.shuffle(allCards, 4);
        }
        return memoVm.shuffledCards;
    }

    function generateDeck(cardValHtml) {
        memoVm.playing = true;
        gameCacheService.cachingGameId(cardValHtml);
        memoVm.cardValHtml = cardValHtml;


        // switch(cardValHtml){
        //     case 1:
        //         memoVm.itIsQuizGame = false;
        //         memoVm.allCards = memoCards.showCards();
        //         memoVm.shuffledCards = helpersFactory.shuffle(memoVm.allCards, 5);
        //         break;
        //     case 2:
        //         memoVm.itIsQuizGame = false;
        //         memoVm.allCards = memoCards.showCards();
        //         memoVm.shuffledCards = helpersFactory.shuffle(memoVm.allCards, 4);
        //         break;
        //     case 3:
        //         memoVm.itIsQuizGame = false;
        //         memoVm.allCards = memoCards.showCardsAnimals();
        //         memoVm.shuffledCards = helpersFactory.shuffle(memoVm.allCards, 5);
        //         break;
        //     case 4:
        //         memoVm.itIsQuizGame = false;
        //         memoVm.allCards = memoCards.showCardsAnimals();
        //         memoVm.shuffledCards = helpersFactory.shuffle(memoVm.allCards, 4);
        //         break;
        //     case 5:
        //         memoVm.itIsQuizGame = true;
        //         break;
        //     case 6:
        //         memoVm.itIsQuizGame = true;
        //         break;
        //     default:
        //         memoVm.itIsQuizGame = false;
        //         memoVm.allCards = memoCards.showCardsAnimals();
        //         memoVm.shuffledCards = helpersFactory.shuffle(memoVm.allCards, 4);

        // }
        memoVm.cloned = angular.copy(memoVm.shuffledCards);
        memoVm.shuffledCards = memoVm.shuffledCards.concat(memoVm.cloned);
        return memoVm.shuffledCards;

    }

    //fired on playbutton click in gamepanel
    function playGame(){
        chooseGame(cardValHtml);
        memoVm.doneCards = [];
        memoVm.counter = 0;
        generateDeck(memoVm.cardValHtml);
        memoVm.playing = true;
    }

    function isPlaying() {
        return memoVm.playing;
    }

    function gameOver() {
        toastr.info("Congrats! You're the guy!");
        memoVm.playing = false;
        memoVm.rankPoints = helpersFactory.showRankPoints(memoVm.counter);
        updatePoints(memoVm.rankPoints);
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
                memoVm.oldCards.forEach(function(item) {
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

        } else if (cardget.title === memoVm.selectedCards[0].title) {
            if (memoVm.doneCards.length === memoVm.shuffledCards.length - 2) {
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
    function updatePoints(rankPoints) {
        memoVm.userURL = new Firebase(FBMSG + memoVm.getUserId);
            authFactory.getUserData(memoVm.getUserId)
                .then(function(UserDataObj){
                    memoVm.pointsFromDataBase = UserDataObj.pointsFromDataBase;
                    memoVm.userURL.update({
                        "points" : memoVm.pointsFromDataBase + rankPoints
                    });
                });

        setTimeout(function(){
           $route.reload();
       }, 2000);
    }

}

})();



