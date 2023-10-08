export const config = {
    // automationProtocol: 'devtools',
    runner: 'local',
    specs: [
        './test/specs/*.e2e.js' //tady mu rikam, at jde do slozky test a hleda tam test, ktery se jmenuje *.e2e.js 
    ],
    exclude: [
        // './test/specs/examples/**/*.js'
    ],
    suites: { //tady hleda dalsi testy pro command npm run -- --suite <suite_name>
        exercise: ['./test/specs/exercise.e2e.js'],
        homework: ['./test/specs/homework/*.e2e.js'],
        lesson_01: ['./test/specs/examples/lesson-01/**/*.e2e.js'],
        lesson_02: ['./test/specs/examples/lesson-02/**/*.e2e.js'],
        lesson_03: ['./test/specs/examples/lesson-03/**/*.e2e.js'],
        lesson_04: ['./test/specs/examples/lesson-04/**/*.e2e.js'],
        lesson_05: ['./test/specs/examples/lesson-05/**/*.e2e.js'],
        lesson_07: ['./test/specs/examples/lesson-07/**/*.e2e.js'],
        lesson_08: ['./test/specs/examples/lesson-08/**/*.e2e.js'],
        lesson_09: ['./test/specs/examples/lesson-09/**/*.e2e.js'],
        lesson_10: ['./test/specs/examples/lesson-10/**/*.e2e.js'],
        lesson_11: ['./test/specs/examples/lesson-11/**/*.e2e.js']
    },
    maxInstances: 10,
    capabilities: [{ //tady si definuju, jaky prohlizec si budu pouzivat
        maxInstances: 5,
        browserName: 'chorme',
        acceptInsecureCerts: true,
        'goog:chromeOptions': {
            args: [
                '--window-size=1920,1080',
                 '--headless', //spusti se test v tichem modu, ale neukaze se mi to
                '--no-sandbox',
                '--disable-gpu',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-infobars'
            ]
        },
        "moz:firefoxOptions": {
            // flag to activate Firefox headless mode (see https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities for more details about moz:firefoxOptions)
            args: [
                // '-headless'
            ]
        }
    }],
    logLevel: 'silent', //tady muzu napsat info a vypise mi to veci dolu
    bail: 0,
    baseUrl: 'https://team8-2022brno.herokuapp.com',
    waitforTimeout: 10000, //cas o ktery ten prohlizec ceka
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: [
        'chromedriver',
        'geckodriver'
    ],
    framework: 'mocha',
    reporters: ['spec'], //jiny zpusob reportovani vysledku
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
