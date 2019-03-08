import resolve from 'rollup-plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs';
import pkg from "./package.json";
// import 'jquery';

export default {
    input: __dirname + `/lib/${pkg._name}.user.js`,
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
    external: ['jquery', '$', 'GM_config', 'tinymce'],
    // external: ['$'],
    plugins: [
        resolve(), // tells Rollup how to find date-fns in node_modules
        // production && uglify() // minify, but only in production
        commonJS({ // converts date-fns to ES modules
            sourceMap: false,
            include: 'node_modules/**',
            // exclude: ['node_modules/jquery/**'],  // Default: undefined
            ignoreGlobal: false,
        })
    ]
    // sourceMap: 'inline',
};
