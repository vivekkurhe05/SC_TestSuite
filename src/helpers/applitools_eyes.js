'use strict'

let Eyes = require('eyes.protractor').Eyes;
require('dotenv').config();

// console.log(process.env);
// console.log("\n\nYou can the remove the above lines by following below steps")
// console.log('1. Go to helpers\n2. Open applitools_eyes.js\n3. comment console.log(process.env)');

var EyesTool = function() {
    let eyes;
    const API_KEY = process.env.API_KEY;

    this.initiateEyes = function(){
        eyes = new Eyes();
        eyes.setApiKey(API_KEY);
    }

    this.validateWindow = function(currentSpec){
        eyes.open(browser.driver, 'Simplified Credit', currentSpec);
        eyes.checkWindow();
        eyes.close();
    }

    this.eyesClose = function(){
        eyes.abortIfNotClosed();
    }
};

module.exports = new EyesTool();