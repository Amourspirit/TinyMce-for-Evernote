
module.exports = function (grunt) {
    var packageData = grunt.file.readJSON('package.json');
    var BUILD_VERSION = packageData.version + '-' + (process.env.BUILD_NUMBER ? process.env.BUILD_NUMBER : '0');

    grunt.initConfig({
        pkg: packageData,

        clean: {
            dirs: ['scratch', 'dist']
        },

        tslint: {
            options: {
                configuration: 'tslint.json'
            },
            plugin: ['src/**/*.ts']
        },

        shell: {
            tsc: 'tsc',
            rollup: 'npx rollup -c'
        },

        replace: {
            web_plugin: {
                src: ['src/main/text/header.txt'],   // source files array (supports minimatch)
                dest: 'scratch/text/header.txt',  // destination directory or file
                replacements: [{
                    from: '@BUILD_NUMBER@',                   // string replacement
                    to: packageData.version
                }]
            }
        },

        concat: {
            dist: {
                src: ['scratch/text/header.txt', 'scratch/compiled/TinyMce_for_Evernote.user.js'],
                dest: 'dist/TinyMce_for_Evernote.user.js'
            }
        }
    });
    require('load-grunt-tasks')(grunt);
    // grunt.loadNpmTasks('@ephox/swag');
    grunt.loadNpmTasks('grunt-contrib-concat');
    // grunt.loadNpmTasks('grunt-zip');
    grunt.loadNpmTasks('grunt-text-replace');

    grunt.registerTask('version', 'Creates a version file', function () {
        grunt.file.write('dist/version.txt', BUILD_VERSION);
    });

    grunt.registerTask('default', [
        'clean',
        'tslint',
        'shell:tsc',
        'shell:rollup',
        'replace',
        'concat'
    ]);
};
