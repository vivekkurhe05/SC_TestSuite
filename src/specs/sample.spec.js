'use strict';

require('chromedriver');
const { Builder, By } = require('selenium-webdriver');
const { Eyes, ClassicRunner, Target, RectangleSize } = require('@applitools/eyes-selenium');

describe('DemoApp - ClassicRunner', function () {
  let runner, eyes, driver;
  
  beforeEach(async () => {
    runner = new ClassicRunner();
    eyes = new Eyes(runner);
    eyes.setApiKey("YOUR_API_KEY");
    driver = await new Builder()
      .forBrowser('chrome')
      .build();
    });
  
  it('Smoke Test', async () => {
      await eyes.open(driver, 'DemoApp - ClassicRunner', 'Smoke Test', new RectangleSize(600, 800));
      await driver.get("https://demo.applitools.com");
      
      // Visual checkpoint #1 - Check the login page.
      await eyes.check("Login Window", Target.window());
  
      await driver.findElement(By.id("log-in")).click();
    //   element(by.id("log-in")).click();
  
      // Visual checkpoint #2 - Check the app page.
      await eyes.check("App Window", Target.window().fully());
  
      await eyes.closeAsync();
    });

  afterEach(async () => {
    // Close the browser.
    await driver.quit();
    
    // If the test was aborted before eyes.close was called, ends the test as aborted.
    await eyes.abortIfNotClosed();
    
    // Wait and collect all test results
    const allTestResults = await runner.getAllTestResults();
    console.log(allTestResults);
    });
});