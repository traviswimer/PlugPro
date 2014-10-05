var root = '.';
var build = root + '/build';
var src = root + '/src';
var docs = root + '/docs';
var pkg = root + '/package';

module.exports = {
	root: root,
	build: build,
	src: src,
	docs: docs,
	pkg: pkg,
	images: {
		src: src + '/images',
		build: build + '/images',
		pkg: pkg + '/images',
	},
	css:{
		src: src + '/css',
		build: build + '/css',
		pkg: pkg + '/css',
	},
	js:{
		src: src + '/js',
		build: build + '/js',
		pkg: pkg + '/js',
		tests: root + '/test/unit'
	},
	jst:{
		src: src + '/html_templates/**/*.html'
	}
};