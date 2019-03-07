
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
        
        remove_comments: {
            js: {
                options: {
                    multiline: true, // Whether to remove multi-line block comments
                    singleline: true, // Whether to remove the comment of a single line.
                    keepSpecialComments: false, // Whether to keep special comments, like: /*! !*/
                    linein: true, // Whether to remove a line-in comment that exists in the line of code, it can be interpreted as a single-line comment in the line of code with /* or //.
                    isCssLinein: false // Whether the file currently being processed is a CSS file
                },
                cwd: 'scratch/nodebug/',
                src: '**/*.js',
                expand: true,
                dest: 'scratch/compiled/'
            }
        },

        replace: {
            debug_comments: {
                src: ['scratch/rolled/TinyMce_for_Evernote.user.js'],
                dest: 'scratch/nodebug/TinyMce_for_Evernote.user.js',  // destination directory or file
                replacements: [{
                    from: /^[\s]*\/\/\s@debug\sstart[.\s\S]*?\/\/\s@debug\send[\s]*$/gm, // see https://www.regexpal.com/?fam=108198
                    to: ''
                }]
            },
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

    grunt.loadNpmTasks('grunt-remove-comments');

    grunt.registerTask('version', 'Creates a version file', function () {
        grunt.file.write('dist/version.txt', BUILD_VERSION);
    });

    grunt.registerTask('default', [
        'clean',
        'tslint',
        'shell:tsc',
        'shell:rollup',
        'replace:debug_comments',
        'remove_comments:js',
        'replace:web_plugin',
        'concat'
    ]);
};
