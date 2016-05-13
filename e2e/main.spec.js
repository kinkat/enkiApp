'use strict';

describe('The main view', function () {
  var page;

  beforeEach(function () {
    browser.get('/index.html');
    page = require('./main.po');
    browser.ignoreSynchronization = true;
  });

  // it('should include jumbotron with correct data', function() {
  //   expect(page.h1El.getText()).toBe('\'Allo, \'Allo!');
  //   expect(page.imgEl.getAttribute('src')).toMatch(/assets\/images\/yeoman.png$/);
  //   expect(page.imgEl.getAttribute('alt')).toBe('I\'m Yeoman');
  // });

  // it('should list more than 5 awesome things', function () {
  //   expect(page.thumbnailEls.count()).toBeGreaterThan(5);
  // });

    it('should match correct button class', function(){
        expect(page.logoutButton.getAttribute('class')).toEqual("btn btn-primary sign-button ng-hide");
    });

    it ('should redirect to login route', function() {
        page.loginButton.click();
        browser.driver.wait(function() {
            return browser.driver.getCurrentUrl().then(function(url) {
                return (/login/).test(url);
            });
        });
    expect(browser.driver.getCurrentUrl()).toEqual('http://localhost:3000/index.html#/login');
  });

    it ('should log user in', function(){
        browser.get('/index.html#/login');
        element(by.model("RegisterCtrl.loginEmail")).sendKeys('jankowalski@interia.pl');
        element(by.model("RegisterCtrl.loginPassword")).sendKeys('jankowalski');
        element(by.id('submit-button')).click();
            browser.driver.wait(function() {
                return browser.driver.getCurrentUrl().then(function(url) {
                    return (/gamepanel/).test(url);
                });
            });
    expect(browser.driver.getCurrentUrl()).toEqual('http://localhost:3000/index.html#/gamepanel');

    });

    it ('should check number of generated cards', function (){
        browser.get('/index.html#/gamepanel');
        element(by.id("submitDeck1")).click();
        browser.waitForAngular();
        expect(page.cardsAll.count()).toEqual(6);
    });

    it ('should check if number of cards is not equal 8', function (){
        browser.get('/index.html#/gamepanel');
        element(by.id("submitDeck1")).click();
        browser.waitForAngular();
        expect(page.cardsAll.count()).not.toEqual(8);
    });

    it ('should show 8 default cards', function (){
        browser.waitForAngular();
        expect(page.cardsAll.count()).toEqual(8);
    });

});
