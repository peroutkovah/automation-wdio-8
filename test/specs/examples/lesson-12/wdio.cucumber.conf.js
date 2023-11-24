import deepmerge from 'deepmerge';
import {config as baseConfig} from '../../../../x_html_reports______wdio.conf.js';

export const config = deepmerge(baseConfig, {
    // logLevel: 'trace',
    specs: [
        './features/**/*.feature'
    ],
    exclude: [],
    suites: {
        login: [
            './features/login.feature'
        ],
        applications: [
            './features/applications.feature'
        ],
        smoke: [
            './features/login.feature',
            './features/applications.feature'
        ]
    },
    services: [
        'chromedriver',
        'geckodriver'
    ],
    framework: 'cucumber',
    reporters: ['spec'],
    cucumberOpts: {
        scenarioLevelReporter: false,
        require: [
            './**/*.steps.js'
        ],
        requireModule: ['@babel/register']
    }
}, { clone: false })
