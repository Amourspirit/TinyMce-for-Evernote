
module.exports = function (grunt) {
    var packageData = grunt.file.readJSON('package.json');
    var BUILD_VERSION = packageData.version + '-' + (process.env.BUILD_NUMBER ? process.env.BUILD_NUMBER : '0');

    /**
     * includeFile() - embeds a file content within another. Meant to be
     * used from the copy task as a 'processContent' function. The following
     * tokens can be used in files: <br>
     *
     *  -   BUILD_INCLUDE('file')
     *  -   /* BUILD_INCLUDE('file') *\x47
     *  -   &lt;!-- BUILD_INCLUDE("file") --&gt;
     *
     * In addition, options can be added to the token above that further
     * process the file being included:
     *
     *  -   BUILD_INCLUDE('file')[option1,option2,option3]
     *
     * Supported options:
     *
     *  -   asJsString : Escapes all double-quotes and new line characters
     *                   in the file
     *
     * @param {String} fileContent
     * @param {String} filePath
     *
     * @return {String} fileContent
     *
     * @see https://gist.github.com/purtuga/85ee689f0d3d90484ce3
     *
     * @example
     *
     *  ...
     *  copy: {
     *      options: {
     *          expand: true,
     *          process: includeFile
     *      }
     *  }
     *  ...
     *
     */
    function includeFile(fileContent, filePath) {

        if (fileContent.indexOf("BUILD_INCLUDE") > -1) {

            grunt.log.write("includeFile(): [" + filePath + "] has BUILD_INCLUDE: ");

            // Match:
            //      // BUILD_INCLUDE('file')
            //      /* BUILD_INCLUDE('file') */
            //      <!-- BUILD_INCLUDE("file") -->
            //
            //  Token OPtions:
            //      // BUILD_INCLUDE('file')[options,here,as,array]
            //
            //      asJsString
            //
            var re = /(?:(?:\/\/)|(?:<\!\-\-)|(?:\/\*)) {0,}BUILD_INCLUDE\(['"](.*)['"]\)(?:\[(.*)\])?/i,
                match, file, fileIncludeOptions;

            while ((match = re.exec(fileContent)) !== null) {

                grunt.log.write(".");
                grunt.verbose.writeln("    Match array: " + match);

                file = grunt.template.process(match[1]);

                grunt.verbose.writeln("    File to embed: " + file);

                file = grunt.file.read(file);

                // If options were set, then parse them
                if (match[2]) {

                    fileIncludeOptions = match[2].split(',');

                    // If option: asJsString
                    if (
                        fileIncludeOptions.some(function (option) {
                            return String(option).toLowerCase() === "asjsstring";
                        })
                    ) {

                        file = file
                            .replace(/\"/g, '\\x22')
                            .replace(/\'/g, '\\x27')
                            .replace(/\r\n|\n/g, "\\n");

                    }


                }

                fileContent = fileContent.replace(match[0], function () { return file; });

            }
            grunt.log.writeln("");
            return fileContent;

        }

        return fileContent;

    } //end: includeFile()

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

        replace: { // https://www.npmjs.com/package/grunt-text-replace
            debug_comments: {
                src: ['scratch/rolled/<%= pkg._name %>.user.js'],
                dest: 'scratch/nodebug/<%= pkg._name %>.user.js',  // destination directory or file
                replacements: [{
                    from: /^[\s]*\/\/\s@debug\sstart[.\s\S]*?\/\/\s@debug\send[\s]*$/gm, // see https://www.regexpal.com/?fam=108198
                    to: ''
                }]
            },
            inner_css: {
                src: ['scratch/css/style.min.css'],
                dest: 'scratch/text/buttonstyle.txt',  // destination directory or file
                replacements: [{
                    from: /(.*\.gm-tb-style{(.*?)}.*)/g,
                    to: '$2;'
                }]
            },
            button_css: {
                src: ['scratch/compiled/<%= pkg._name %>.user.js'],
                overwrite: true,
                replacements: [{
                    from: '@BUTTONCSS@',
                    to: grunt.file.r
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

        copy: {  // https://github.com/gruntjs/grunt-contrib-copy
            // build will replace build includesin the file such as //BUILD_INCLUDE('./scratch/text/buttonstyle.txt')
            build: { // https://paultavares.wordpress.com/2014/12/01/grunt-how-to-embed-the-content-of-files-in-javascript-files/
                options: {
                    expand: true,
                    process: includeFile
                },
                files: {
                    "scratch/compiled/<%= pkg._name %>.user.js": "scratch/compiled/<%= pkg._name %>.user.js"
                }
            },

            no_debug: {
                files: [{
                    cwd: 'scratch/rolled/',
                    src: '<%= pkg._name %>.user.js',
                    dest: 'scratch/compiled/',
                    expand: true
                }]
            }
        },
        if: {  // https://github.com/bonesoul/grunt-if-next
            debug: {
                // Target-specific file lists and/or options go here.
                options: {
                    // execute test function(s)
                    test: function () { return packageData._debuglevel > 0; },
                },
                //array of tasks to execute if all tests pass
                ifTrue: [
                    'replace:debug_comments',
                    'remove_comments:js'
                ],
                //array of tasks to execute if any test fails
                ifFalse: ['copy:no_debug']
            }
        },

        concat: {
            dist: {
                src: ['scratch/text/header.txt', 'scratch/compiled/<%= pkg._name %>.user.js'],
                dest: 'dist/<%= pkg._name %>.user.js'
            }
        },
        // minify html files
        htmlmin: {  // https://github.com/gruntjs/grunt-contrib-htmlmin
            dist: {                                      // Target
                options: {                                 // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {                                   // Dictionary of files
                    'scratch/html/gm-edit-btn.html': 'src/main/html/gm-edit-btn.html'     // 'destination': 'source'
                }
            }
        },
        // cssmin minify css code
        cssmin: { // https://github.com/gruntjs/grunt-contrib-cssmin
            target: {
                files: [{
                    expand: true,
                    cwd: 'src/main/css',
                    src: ['style.css', 'lightbox.css', 'tinymce-content.css'],
                    dest: 'scratch/css',
                    ext: '.min.css'
                }]
            }
        }
    });
    require('load-grunt-tasks')(grunt);
    // grunt.loadNpmTasks('@ephox/swag');
    grunt.loadNpmTasks('grunt-contrib-concat');
    // grunt.loadNpmTasks('grunt-zip');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-remove-comments');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-if-next');

    grunt.registerTask('version', 'Creates a version file', function () {
        grunt.file.write('dist/version.txt', BUILD_VERSION);
    });

    grunt.registerTask('default', [
        'clean',                // clean the folder out from any previous build
        'tslint',               // check the ts files for any lint issues
        'shell:tsc',            // run tsc
        'shell:rollup',         // run rollup to combine all the files into one js file.
        'if:debug',             // run if debug command to remove debug if _debug value of package.json is greater then 0 otherwise copy file to compiled and continue
        'replace:web_plugin',   // replace the build number in the header text with current version from package.json
        'cssmin',               // minify css files to be later injected into the js file.
        'htmlmin',              // minify html files to be later injected into the js file.
        'replace:inner_css',    // extract the .button css from minified css and write it into a text file
        'copy:build',           // run special function includeFile that is in this script to replace BUILD_INCLUDE vars in js.
        'concat',               // combine the header file with the javascript file.
    ]);
};
