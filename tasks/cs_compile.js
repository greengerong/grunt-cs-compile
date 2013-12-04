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
        var project = this.data.project,
            msBuild = options.msBuild,
            maxCPU = options.maxCPU ? "/maxcpucount" : "";

        var cmd = util.format("%s %s ", msBuild, project);

        cmd = cmd + util.format("%s /property:Configuration=Release;OutputPath=%s ", maxCPU, options.OutputPath)
        return cmd;
    };

    grunt.registerMultiTask('cs_compile', 'grunt build for c# compile', function () {
        //http://msdn.microsoft.com/zh-Cn/library/ms164311.aspx
        var options = this.options({
            stdout: true,
            msBuild: "MSBuild.exe",
            OutputPath: "target",
            maxCPU: true
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
