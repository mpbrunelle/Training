'use strict';

const {src, dest, series, parallel, watch} = require('gulp');
const del = require('del');
const browserSync = require('browser-sync').create();
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

const origin = 'src'
const destination = 'build'

async function clean(cb) {
	await del(destination);
	cb();
}

function html(cb) {
	src(`${origin}/**/*.html` ).pipe(dest( destination));
	cb();
}

function css(cb) {
	const plugins = [
		autoprefixer()
	];
	src(`${origin}/css/**/*.css`)
	.pipe(postcss(plugins))
	.pipe(dest(`${destination}/css`));
	cb();
}

function js(cb) {
	src(`${origin}/js/**/*.js`).pipe(dest(`${destination}/js`));
	cb();
}

function watcher(cb) {
	watch(`${origin}/**/*.html`).on( 'change', series( html, browserSync.reload));
	watch(`${origin}/**/*.css`).on('change', series(css, browserSync.reload));
	watch(`${origin}/**/*.js`).on( 'change', series(js, browserSync.reload));
}

function server( cb ) {
	browserSync.init({
		server: {
			baseDir: destination
		}
	});
	cb();
}

exports.default = series( clean, parallel( html, css, js ), server, watcher );