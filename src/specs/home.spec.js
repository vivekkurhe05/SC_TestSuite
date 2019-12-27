'use strict'

var homePage = require('../page-objects/home.page');

describe('should calculate the loan', () => {

    beforeEach( () => {
        homePage.get();
    });

    it('verification of title', async function () {
        
        expect(homePage.verifyTitle()).toEqual('GROW YOUR BUSINESS');
    });
});