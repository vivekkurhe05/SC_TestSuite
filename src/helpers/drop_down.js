'use strict'

var wait = require('../helpers/waits');

var DropDownsHandling = function() {

    this.selectFirstOption = function(elem){
       elem
       .first()
       .click();
    }

    this.getTotalOptions = function(elem){
      wait.waitForAllElements(elem);
      return elem.count().then(function(size){
            return size;
       });
    }

    this.getAllDropdownOptions = async function(elem){
      wait.waitForAllElements(elem);
      return await elem.getText();
    }

    this.selectDesiredOption = function(elem, index){
      elem
      .then(function(items){
         items[index].click();
      });
    }

    this.selectRandomOption = function(elem){
      browser.sleep(500);
      wait.waitForAllElements(elem);
      elem.count().then(function(numberOfItems){
        return Math.floor(Math.random() * numberOfItems);
      }).then(function(randomNumber){
        elem.get(randomNumber).click();
      })
    }
};

module.exports = new DropDownsHandling();