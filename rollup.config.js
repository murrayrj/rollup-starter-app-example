import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import globals from 'rollup-plugin-node-globals';
import builtins from 'rollup-plugin-node-builtins';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';

export default [{
    input: 'src/scripts/main.js',
    output: {
        name: 'main',
        file: 'dist/js/main.js',
        format: 'iife',
        external: ['then-request', 'fs', 'path'],
        interop: false
    },
    plugins: rollupPlugins()
}, {
    input: 'src/scripts/getGMapsKey.js',
    output: {
        name: 'googleMaps',
        file: 'dist/js/getGMapsKey.js',
        format: 'iife',
        interop: false
    },
    plugins: rollupPlugins()
}];

function rollupPlugins() {
    return [
        json(),
        resolve({
            jsnext: true,
            main: true,
            browser: true,
            preferBuiltins: false
        }),
        commonjs(),
        globals(),
        builtins(),
        babel({
            "babelrc": false,
            "presets": [
                ["env", {
                    "targets": {
                        "browsers": ["> 0.5%", "last 2 versions", "Firefox ESR", "not dead"]
                    },
                    "modules": false,
                }]
            ],
            "plugins": ["external-helpers"]
        }),
        replace({
            exclude: 'node_modules/**',
            ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
            MAPS_API: JSON.stringify(process.env.GOOGLE_MAPS_API),
        }),
        (process.env.NODE_ENV === 'production' && uglify()),
    ];
}