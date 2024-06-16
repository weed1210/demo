module.exports = function (config) {
    config.set({
        basePath: '../..',
        frameworks: ['jasmine'],
        reporters: ['progress', 'teamcity'],
        teamcityReporter: {
            outputFile: 'test-results.xml',
            suite: 'Unit Tests'
        }
    });
};