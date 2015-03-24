module.exports = function(config){
	config.set({
		basePath : '../',
		files : [
			'src/',
			'src/vendor/',
			'test/unit/**/*.js'
		],
		logLevel : config.LOG_DEBUG,
		reportSlowerThan: 250,
		autoWatch : true,
		autoWatchBatchDelay : 1000,
		client.captureConsole : true,
		frameworks: ['jasmine'],
		browsers : ['Chrome'],
		plugins : [
			'karma-chrome-launcher',
			'karma-jasmine'
		],
		junitReporter : {
			outputFile: 'log/unit.xml',
			suite: 'unit'
		}
	});
};
