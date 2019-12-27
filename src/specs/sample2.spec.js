'use strict';
const { Builder, Capabilities, By} = require('selenium-webdriver');
const { 
    Eyes, 
    Target, 
    ClassicRunner,
    StitchMode,
    BrowserType,
    ScreenOrientation,
    DeviceName,
    BatchInfo,
    Configuration
} = require('@applitools/eyes-selenium');

const {
    RectangleSize
} = require('@applitools/eyes-sdk-core');

const viewPortWidth = 800;
const viewPortHeight = 600;
const myEyesServer = "https://eyes.applitools.com/"; //set to your server/cloud URL
const appName = "EKB Example : classic app";
const batchName = "EKB Example : classic";
const apiKey = "YOUR_API_KEY";
let runner = null;
let suiteConfig;
let eyes;
let webDriver;

describe('run test', function()  {

    beforeAll( async function() {   
         runner = new ClassicRunner();
         
     // Create a configuration object, we will use this when setting up each test
     suiteConfig = new Configuration()
        // Test suite configurations
        .setApiKey(apiKey)
        .setServerUrl(myEyesServer)
        .setAppName(appName)
        .setBatch(new BatchInfo(batchName))
        // Checkpoint configurations
        .setForceFullPageScreenshot(true)
        .setStitchMode(StitchMode.CSS)
        .setHideScrollbars(true)
        .setHideCaret(true)
        .setViewportSize( new RectangleSize(viewPortWidth, viewPortHeight));
     })

     beforeEach(async function() {
        // Create the Eyes instance for the test and associate it with the runner
        eyes = new Eyes(runner);
        // Set the configuration values we set up in beforeTestSuite
        eyes.setConfiguration(suiteConfig);
        // Create a WebDriver for the test
        webDriver = new Builder()
            .withCapabilities(Capabilities.chrome())
            .build();
            
    })

    it('HelloWorld Test', async function() {   
        // Update the Eyes configuration with test specific values
        let testConfig = eyes.getConfiguration();
        testConfig.setTestName("Hello World test");
        eyes.setConfiguration(testConfig);
        
        // Open Eyes, the application,test name and viewport size are allready configured
        let driver = await eyes.open(webDriver);
        
        // Now run the test
        
        // Visual checkpoint #1
        await driver.get("https://applitools.com/helloworld");
        await eyes.checkWindow("Before mouse click");
        
        // Visual checkpoint #2
        await driver.findElement(By.tagName("button")).click(); // Click the button
        await eyes.checkWindow("After mouse click"); 
    })

    afterEach(async function() {
        // check if an exception was thrown
        let testPassed = this.currentTest.state == "passed"
        if (testPassed)  {
            // Close the Eyes instance, no need to wait for results, we'll get those at the end in afterTestSuite
            await eyes.closeAsync();
        } else {
            // There was an exception so the test may be incomplete - abort the test
            await eyes.abortIfNotClosed();               
        }
        await webDriver.quit();
    })

    afterAll( async function() {
        // Wait until all the test results are available and return them
        let allTestResults = await runner.getAllTestResults();
        for (let results of allTestResults) {
            handleTestResults(results);
        } 
    })
})

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
