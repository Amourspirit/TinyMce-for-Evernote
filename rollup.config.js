import resolve from 'rollup-plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs';
import inject from 'rollup-plugin-inject';
import pkg from "./package.json";
// import 'jquery';

export default {
    input: __dirname + `/lib/main.js`,
    output: {
        file: __dirname + `/scratch/rolled/${pkg._name}.user.js`,
        format: 'iife', // immediately-invoked function expression — suitable for <script> tags
        // banner: '(function() {\n  \'use strict\';',
        // footer: '})();',
        name: 'userscript',
        sourcemap: true,
        globals: {
            jquery: '$',
            GM_config: 'GM_config',
            tinymce: 'tinymce'
            // window: 'window',
        }
    },
    external: [
        'jquery',
        // '$',
        'GM_config',
        'tinymce'
    ],
    // external: ['$'],
    plugins: [
        resolve(), // tells Rollup how to find date-fns in node_modules
        // production && uglify() // minify, but only in production
        commonJS({ // converts date-fns to ES modules
            sourceMap: false,
            include: 'node_modules/**',
            // exclude: ['node_modules/jquery/**'],  // Default: undefined
            ignoreGlobal: false,
        }),
        inject({
            // see https://stackoverflow.com/questions/45549689/prevent-rollup-from-renaming-promise-to-promise1
            // see https://github.com/rollup/rollup-plugin-inject
            // control which files this plugin applies to
            // with include/exclude
            include: '**/*.js',
            exclude: 'node_modules/**',

            /* all other options are treated as modules...*/

            // use the default – i.e. insert
            // import $ from 'jquery'
            $: 'jquery',
            /* ...but if you want to be careful about separating modules
               from other options, supply `options.modules` instead */

            modules: {
                $: 'jquery'
            }
        })
    ]
    // sourceMap: 'inline',
};
