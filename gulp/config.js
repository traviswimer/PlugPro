var root = '.';
var build = root + '/build';
var src = root + '/src';
var docs = root + '/docs';

module.exports = {
	root: root,
	build: build,
	src: src,
	docs: docs,
	images: {
		src: src + '/images',
		build: build + '/images',
	},
	css:{
		src: src + '/css/*.scss',
		build: build + '/css'
	},
	js:{
		src: src + '/js',
		build: build + '/js',
		tests: root + '/test/unit'
	},
	jst:{
		src: src + '/html_templates/**/*.html'
	}
};