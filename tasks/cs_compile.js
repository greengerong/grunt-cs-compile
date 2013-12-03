/*
 * grunt-cs-compile
 * https://github.com/greengerong/grunt-cs-compile
 *
 * Copyright (c) 2013 greengerongg
 * Licensed under the MIT license.
 */

'use strict';

var exec = require('child_process').exec;
var util = require('util');

module.exports = function (grunt) {

    var buildCommand = function (options) {
        var project = this.data.project;
        var msBuild = options.msBuild;
        var cmd = util.format("%s %s", msBuild, project);
        return cmd;
    };

    grunt.registerMultiTask('cs_compile', 'grunt build for c# compile', function () {
        var options = this.options({
            stdout: true,
            msBuild: "msbuild.exe"
        });

        var cb = this.async();
        var cmd = buildCommand.bind(this)(options);
        var cp = exec(cmd, {}, function (err, stdout, stderr) {
            if (err) {
                grunt.fatal(err);
            }
            cb();
        }.bind(this));

        if (options.stdout || grunt.option('verbose')) {
            cp.stdout.pipe(process.stdout);
        }

        cp.stderr.pipe(process.stderr);

    });

};
