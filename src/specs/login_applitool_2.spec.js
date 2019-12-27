'use strict'

let loginPage = require('../page-objects/login.page');
let genericClass = require('../helpers/generic');
let using = require('jasmine-data-provider');
let navbar = require('../page-objects/navbar_links.page');
let homePage = require('../page-objects/home.page');
let wait = require('../helpers/waits');
let browsers = require('../helpers/browser');
// let Eyes = require('eyes.protractor').Eyes;
let chromedriver = require('chromedriver').path;
let { Builder, 
      Capabilities 
    } = require('selenium-webdriver');
    
let { Eyes,
      ClassicRunner, 
      Configuration 
    } = require('@applitools/eyes-selenium');

describe('Login sanity tests', () => {

    let params;
    let runner = null;
    let eyes;
    let suiteConfig;
    let webDriver;
    beforeAll( () => {
        runner = new ClassicRunner();
        suiteConfig = new Configuration()
        .setApiKey("YOUR_API_KEY")
        .setAppName("Base app");

        eyes = new Eyes(runner);
        eyes.setConfiguration(suiteConfig);
        chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());
        webDriver = new Builder()
        .withCapabilities(Capabilities.chrome())
        .build();
    });
    
    beforeEach( async () => {
        loginPage.get('/login');
        params = browser.params;
        eyes = new Eyes(runner);
        eyes.setConfiguration(suiteConfig);
        webDriver = new Builder()
        .withCapabilities(Capabilities.chrome())
        .build();
    });

    fit('Verify the elements on login page', async () => {

        let testConfig = eyes.getConfiguration();
        testConfig.setTestName("Login form elements");
        eyes.setConfiguration(testConfig);
        let driver = await eyes.open(webDriver);
        expect(loginPage.getTitle(loginPage.loginPageTitle)).toEqual('Sign In');
        expect(genericClass.verifyThePresenceOfComponents(loginPage.emailTextBox)).toBeTruthy();
        expect(genericClass.verifyThePresenceOfComponents(loginPage.passwordTextBox)).toBeTruthy();
        expect(genericClass.verifyThePresenceOfComponents(loginPage.loginBtn)).toBeTruthy();
        expect(genericClass.verifyThePresenceOfComponents(loginPage.rememberMe)).toBeTruthy();
        expect(genericClass.verifyThePresenceOfComponents(loginPage.forgotPasswordLink)).toBeTruthy();
        expect(genericClass.verifyThePresenceOfComponents(loginPage.createAccountLink)).toBeTruthy();
        eyes.checkWindow("Login form #checkpoint");
        eyes.close();
    });

    afterEach( async () => {
        let testPassed = this.currentTest.state == "passed";
        if (testPassed)  {
            // Close the Eyes instance, no need to wait for results, we'll get those at the end in afterTestSuite
            await eyes.closeAsync();
        } else {
            // There was an exception so the test may be incomplete - abort the test
            await eyes.abortIfNotClosed();               
        }
        await webDriver.quit();
    });

    afterAll( async function() {
        // Wait until all the test results are available and return them
        let allTestResults = await runner.getAllTestResults();
        for (let results of allTestResults) {
            handleTestResults(results);
        } 
    });

    function handleTestResults(summary) {
        let ex = summary.getException();
        if (ex != null ) {
            console.error("System error occured while checking target.");
        }
        let result = summary.getTestResults();
        if (!result) {
            console.error("No test results information available");
        } else {
            console.log("URL = %s, AppName = %s, testname = %s, Browser = %s,OS = %s, viewport = %dx%d, matched = %d,mismatched = %d, missing = %d,aborted = %s\n",
                result.getUrl(),
                result.getAppName(),
                result.getName(),
                result.getHostApp(),
                result.getHostOS(),
                (result.getHostDisplaySize() ? result.getHostDisplaySize().getWidth() : "width undefined"),
                (result.getHostDisplaySize() ? result.getHostDisplaySize().getHeight(): "height undefined"),
                result.getMatches(),
                result.getMismatches(),
                result.getMissing(),
                (result.getIsAborted() ? "aborted" : "no"));
        }
    }

    // xit('Verify the cursor is focused on email textbox on the page load', () => {
    //     expect(loginPage.emailTextBox.getAttribute("name")).toEqual(browser.driver.switchTo().activeElement().getAttribute("name"));
    // });

    // it('Verify that all the fields such as Email and Password has a valid placeholders', () => {
    //     expect(loginPage.emailTextBox.getAttribute("placeholder")).toEqual("Email");
    //     expect(loginPage.passwordTextBox.getAttribute("placeholder")).toEqual("Password");
    // });

    // it('Verify that the password is masked when entered', () => {
    //     expect(loginPage.passwordTextBox.getAttribute("type")).toEqual("password");
    // });

    // it('Verify that clicking on the logout link is redirected to login page', () => {
    //     loginPage.login(params.login.email, params.login.password);
    //     navbar.goToLogoutPage();
    //     let actualTitle = loginPage.getTitle(loginPage.loginPageTitle);
    //     expect(actualTitle).toEqual('Sign In');
    // });

    // fit('Verify that user is redirected to create an account page', async () => {
    //     // eyes = new Eyes();
    //     // eyes.setApiKey("960abNvS63H108NCeC3dVRKdH42heez5Im22kJEqv106TJg110");
    //     // eyes.open(browser, "Create account page", "Verify that user is redirected to create an account page");
    //     genericClass.click(loginPage.createAccountLink);
    //     let actualTitle = await loginPage.getTitle(loginPage.registrationPageTitle);
    //     expect(actualTitle).toEqual('Create a new Account');
    //     // eyes.checkWindow("Create an account #checkpoint");
    //     // eyes.close();
    // });
    

    // function arrayOfData(){

    //     return [
    //         {
    //             "email":"testmail.com",
    //             "password":"23nkdkn"
    //         },
    //         {
    //             "email": "test@mail.com",
    //             "password": "wrongpassword"
    //         },
    //         {
    //             "email": "testmail.com",
    //             "password": "test"
    //         }
            
    //     ]
    // }

    // using(arrayOfData, function(testData){
    //     it('invalid login attempts', () => {
    //         loginPage.login(testData.email, testData.password);
    //         expect(loginPage.actualText()).toEqual('Login failed. Provide correct credentials');
    //         genericClass.click(loginPage.okButton);
    //     });
    // });

    // fit('user should be able to login', () => {
    //     // eyes = new Eyes();
    //     // eyes.setApiKey("960abNvS63H108NCeC3dVRKdH42heez5Im22kJEqv106TJg110");
    //     // eyes.open(browser, "After logged in", "user should be able to login");
    //     loginPage.login(params.login.email, params.login.password);
    //     expect(homePage.verifyTitle()).toContain('Welcome, ');
    //     // eyes.checkWindow("Inside app #checkpoint")
    //     // eyes.close();
    // });

    // it('error alert on email textbox', () => {
    //     loginPage.login("", params.login.password);
    //     expect(genericClass.verifyErrorOnBlankField(loginPage.errorOnEmail, 'class')).toContain('has-error');
    // });

    // it('error alert on password textbox', () => {
    //     loginPage.login(params.login.email, "");
    //     expect(genericClass.verifyErrorOnBlankField(loginPage.errorOnPassword, 'class')).toContain('has-error');
    // });

    // it('Verify that clicking on browser back button after successful login should not take user to logout mode', () => {
    //     loginPage.login(params.login.email, params.login.password);
    //     wait.waitForElementVisibility(homePage.welcomeTitle);
    //     browsers.goBack();
    //     browsers.goForward();
    //     expect(homePage.verifyTitle()).toContain('Welcome, ');
    // });

    // it('Verify that clicking on browser back button after successful logout should not take user to logged in mode', () => {
    //     loginPage.login(params.login.email, params.login.password);
    //     navbar.goToLogoutPage();
    //     browsers.goBack();
    //     expect(wait.waitForUrl('/login')).not.toEqual('/dashboard')
    // });

    // it('Verify that Remember me checkbox is selected by default', () => {
    //     expect(loginPage.checkbox.getAttribute("checked")).toBeTruthy();
    // });

});