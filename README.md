# simplifiedcredit tests

>>>> Tests written in protractor

***To run tests, I assume you have simplifiedcredit project installed on your machine. Use following steps to run tests.***

<code>___1. Create a directory in home named <mark>workspace___</mark></code><br>
<code>___2. Git clone the <mark>SC_TestSuite___</mark></code><br>
<code>___Open workspace directory in terminal</code>
<code>___3. In one tab, open simplifiedcredit-server, run command <mark>npm start___</mark></code><br>
<code>___4. In second tab, open simplifiedcredit-web, run command <mark>npm start___</mark></code><br>
<code>___5. In third tab, open <mark>SC_TestSuite___</mark></code><br>
<code></code><br>

> **_Note:_** Following commands run the tests locally on chrome

``` bash
To run tests on local machine, enter command 
`npm run test:local:chrome`
```

``` bash
To run tests parallely on local, enter command
`npm run test:local:chrome-parallel-exec`
```

``` bash
To run tests cross browser on local, enter command
`npm run test:local:cross-browser`

Note: This will launch chrome and firefox to execute tests
```

``` bash
To run tests in a suite, enter command
`npm run test:local:chrome-suite suitename`

e.g. npm run test:local:chrome:chrome-suite smokeTests
This will run smoke tests only
```
