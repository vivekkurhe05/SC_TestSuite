let parameters = {

    'stage': {
        stageUrl: 'TODO'
    },
    'uat': {
        uatUrl: 'TODO'
    },
    'local': {
        baseUrl: 'http://localhost:8081'
    }
}


let capabilities = {
    'chrome': {
        browserName: 'chrome',
        unexpectedAlertBehaviour: 'accept',
        chromeOptions: {
            args: ['disable-infobars']
        }
    },
    'firefox': {
        browserName: 'firefox'
    },
    'chrome-headless': {
        browserName: 'chrome',
        chromeOptions: {
            args: ['--headless', '--disable-gpu', '-window-size=1400,1400']
        }
    },
    'chrome-parallel-exec': {
        browserName: 'chrome',
        shardTestFiles: true,
        maxInstances: 2
    },
    'cross-browser': [{
        browserName: 'chrome',
    }, {
        browserName: 'firefox',
    }]
}

module.exports = {
    parameters,
    capabilities,
}