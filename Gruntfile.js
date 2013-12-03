/*
 * grunt-cs-compile
 * https://github.com/greengerong/grunt-cs-compile
 *
 * Copyright (c) 2013 greengerongg
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp']
        },

        // Configuration to be run (and then tested).
        cs_compile: {
            custom_options: {
                options: {
                msBuild:"C:/Windows/Microsoft.NET/Framework/v4.0.30319/MSBuild.exe"
                },
                project: "E:/Project/TestSample/grunt-cs-demo/grunt-cs-demo.sln"
            }
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'cs_compile']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint','test']);

};
