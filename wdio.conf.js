import fs from 'fs';

const passedDirectory = 'screenshots/passed';
const failedDirectory = 'screenshots/failed';

function createIfNotExists(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function deleteFiles(dir) {
    fs.rm(dir, { recursive: true }, err => {
        if (err) console.log(err);
    });
}

export const config = {
    // automationProtocol: 'devtools',
    runner: 'local',
    specs: [
        './test/specs/*.e2e.js' //tady mu rikam, at jde do slozky test a hleda tam test, ktery se jmenuje *.e2e.js 
    ],
    exclude: [
        // './test/specs/examples/**/*.js'
    ],
    suites: {
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
        lesson_11: ['./test/specs/examples/lesson-11/**/*.e2e.js'],

        lekce1: ['./test/specs/break_out_room/lekce1/**/*.e2e.js'],
        lekce2: ['./test/specs/break_out_room/lekce2/**/*.e2e.js'],
        lekce3: ['./test/specs/break_out_room/lekce3/**/*.e2e.js'],
        lekce4_oskliva: ['./test/specs/break_out_room/lekce4_oskliva/**/*.e2e.js'],
        lekce4_hezka: ['./test/specs/break_out_room/lekce4_hezka/**/*.e2e.js'],
        lekce5: ['./test/specs/break_out_room/lekce5/**/*.e2e.js']
    },
    maxInstances: 10,
    capabilities: [{
        maxInstances: 5,
        browserName: 'chrome',
        acceptInsecureCerts: true,
        'goog:chromeOptions': {
            args: [
                '--window-size=1920,1080',
                '--headless',
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
    logLevel: 'silent',
    bail: 0,
    baseUrl: 'https://team8-2022brno.herokuapp.com',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: [
        'chromedriver',
        'geckodriver'
    ],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

    /*
    Definice potřebných hooků
    */
    onPrepare: (config, capabilities) => {
        deleteFiles("screenshots");
    },

    afterTest: (test, context, { error, result, duration, passed, retries }) => {
        const screenshotName = (`${test.parent}__${test.title}.png`).replace(/ /g, '_');
        if (passed === true) {
            createIfNotExists(passedDirectory);
            browser.saveScreenshot( `${passedDirectory}/${screenshotName}`);
        } else {
            createIfNotExists(failedDirectory);
            browser.saveScreenshot(`${failedDirectory}/${screenshotName}`);
        }
    }
}