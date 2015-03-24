var fs = require('fs-extra');

var pkg = require('../../package.json');

var path = require("path");
var os = require("os");
var root = (os.platform() == "win32") ? process.cwd().split(path.sep)[0] : "/";

var server = root + '\\servers\\apache-2.4\\htdocs\\cvs';
var src = __dirname + '/../../' + pkg.smartadmin.sources;

module.exports = function (grunt) {
    grunt.registerTask('test-deploy', 'Copy files to local test server', function () {
        if (fs.existsSync(src)) {
            if(server){
                fs.removeSync(server);
            }
            fs.copySync(src, server);
        } else {
            throw grunt.util.error('Error deploying to local server at ' + server);
        }
    });
};
