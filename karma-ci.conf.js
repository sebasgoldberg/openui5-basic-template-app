/* global module require*/

module.exports = function(config) {
	"use strict";

	require("./karma.conf")(config);

	config.set({

		preprocessors: {
			'{transp,transp/!(test)}/*.js': ['coverage']
		},

		coverageReporter: {
			includeAllSources: true,
			reporters: [
				{
					type: 'html',
					dir: 'coverage'
				},
				{
					type: 'text'
				}
			],
			check: {
				global: {
					statements: 80,
					branches: 80,
					functions: 70,
					lines: 80
				}
			}
		},

		reporters: ['progress', 'coverage'],

		browserNoActivityTimeout: 30000,

		browsers: ['ChromeHeadless'],

		singleRun: true
	});
};