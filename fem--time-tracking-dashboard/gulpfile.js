"use strict";

const { src, dest, series, parallel, watch } = require("gulp");
const del = require("del");
const browserSync = require("browser-sync").create();
const postcss = require("gulp-postcss");
const fs = require("fs");
const atImport = require("postcss-import");
const customProperties = require("postcss-custom-properties");
const customMedia = require("postcss-custom-media");
const autoprefixer = require("autoprefixer");

const origin = "src";
const destination = "build";

async function clean(cb) {
    await del(destination);
    cb();
}

function html(cb) {
    src(`${origin}/**/*.html`).pipe(dest(destination));
    cb();
}

function fonts(cb) {
    src([`${origin}/**/*.woff`, `${origin}/**/*.woff2`]).pipe(
        dest(destination)
    );
    cb();
}
// css to be processed
const originalCss = fs.readFileSync(`${origin}/css/style.css`, "utf8");

function css(cb) {
    const customPropertiesOptions = {
        importFrom: `${origin}/css/style.css`,
        exportTo: `${destination}/css`,
    };
    const customMediaOptions = {
        preserve: false,
        importFrom: `${origin}/css/style.css`,
        exportTo: `${destination}/css`,
    };
    const plugins = [
        atImport(),
        autoprefixer(),
        customProperties(customPropertiesOptions),
        customMedia(customMediaOptions),
    ];
    src(`${origin}/css/style.css`)
        .pipe(postcss(plugins))
        .pipe(dest(`${destination}/css`));
    cb();
}

function js(cb) {
    src([`${origin}/js/**/*.js`, `${origin}/js/**/*.json`]).pipe(
        dest(`${destination}/js`)
    );
    cb();
}

function images(cb) {
    src(`${origin}/images/**/*`).pipe(dest(`${destination}/images`));
    cb();
}

function watcher(cb) {
    watch(`${origin}/**/*.html`).on("change", series(html, browserSync.reload));
    watch(`${origin}/**/*.css`).on("change", series(css, browserSync.reload));
    watch(`${origin}/**/*.js`).on("change", series(js, browserSync.reload));
}

function server(cb) {
    browserSync.init({
        server: {
            baseDir: destination,
        },
    });
    cb();
}

exports.default = series(
    clean,
    parallel(html, css, js, fonts, images),
    server,
    watcher
);
