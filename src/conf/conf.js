'use strict'

var retry = require('protractor-retry').retry;
let HtmlReporter = require('protractor-beautiful-reporter');
let SpecReporter = require('jasmine-spec-reporter').SpecReporter
let parameters = require('../getEnvConf').parameters
let capabilities = require('../getEnvConf').capabilities
require('dotenv').config();
let cap, env, directConnectFlag = true
const EMAIL_ID=process.env.EMAIL;
const PASSWORD=process.env.PASSWORD;
const execSync = require('child_process').execSync
const globalNodeModules = execSync('npm root -g').toString('utf8').trim().replace(/\s/g, '_')
process.argv.forEach(function (arg){
    if (arg.indexOf('--params.cap') > -1) {
        cap = arg.split('=')[1]
        if (cap.indexOf('chrome') > -1) directConnectFlag = true
    } else if (arg.indexOf('--params.env') > -1){
        env = arg.split('=')[1]
    }
})

function getCapabilities(cap) {
    if (!capabilities.hasOwnProperty(cap)){
        cap = 'chrome'
    }
    if (!capabilities.hasOwnProperty(cap)){
        cap = 'firefox'
    }
    return capabilities[cap]
}

exports.config = {

    seleniumAddress: 'http://localhost:4444/wd/hub',
    chromeDriver: globalNodeModules + '/protractor/node_modules/webdriver-manager/selenium/chromedriver',
    directConnect: directConnectFlag,

    onCleanUp: function(results){
        retry.onCleanUp(results);
    },

    onPrepare: function(){
        retry.onPrepare();
        browser.params.env = env ? env : 'local'
        if(!parameters.hasOwnProperty(browser.params.env)){
            browser.params.env = 'local'
        }
        Object.getOwnPropertyNames(parameters[browser.params.env]).forEach(function (element){
            browser.params[element] = parameters[browser.params.env][element]
        })
        browser.baseUrl = browser.params.baseUrl
        browser.waitForAngularEnabled(false);
        browser.manage().window().maximize();

        jasmine.getEnv().addReporter(new SpecReporter({
            spec: {
                displayStacktrace: false
            }
        }))

        jasmine.getEnv().addReporter(new HtmlReporter({
            baseDirectory: 'src/reports/screenshots',
            screenshotsSubfolder: 'images',
            jsonsSubfolder: 'jsons',
            excludeSkippedSpecs: true,
            takesScreenShotsOnlyForFailedSpecs: true,
            docTitle: 'Test Execution Report',
            docName: 'testReport.html',
            preserveDirectory: false
        }).getJasmine2Reporter());

    },

    // afterLaunch: function(){
    //     return retry.afterLaunch(3);
    // },
    
    framework: 'jasmine',   
    capabilities: getCapabilities(cap),
    multiCapabilities: getCapabilities(cap),
    specs:['../specs/login.spec.js'],

    suites: {
        loginpage: ['../specs/login.spec.js'],
        homepage: ['../specs/home.spec.js'],
        creditcomparepage: ['../specs/credit_compare.spec.js'],
        businessviabilitypage: ['../specs/bva.spec.js'],
        smokeTests: ['../specs/login.spec.js', '../specs/home.spec.js'],
        regressionTest: [


            /**
             * write regression tests here. Following are the considerable factors
             * 
             * include the test cases that have frequently yielded bugs
             * include the test cases that verify the core features of the application
             * include the test cases for functionalities that have undergone recent changes
             * include all the integration test cases
             * include all the complex test cases
             * prioritize the test cases for regression testing
             * categorize the selected test cases
             * choose the test cases on a case-to-case basis
             * classify regression test cases based on the risk exposure
             */


        ]
    },

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 60000,
        isVerbose: true,
        includeStackTrace: true,
        print: function() {}
    },
    
    params: {
        login: {
            email: EMAIL_ID,
            password: PASSWORD,
        }
    }
};