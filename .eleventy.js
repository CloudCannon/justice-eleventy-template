const pluginSeo = require('eleventy-plugin-seo');
const pluginRss = require("@11ty/eleventy-plugin-rss");
const seoData = require('./_data/seo.json');
const socialIcons = require('./social-icons.js');

module.exports = function (eleventyConfig) {
	eleventyConfig.setUseGitIgnore(false);
	eleventyConfig.setDataDeepMerge(true);

	eleventyConfig.setFrontMatterParsingOptions({
		excerpt: function (file, options) {
			file.excerpt = file.content.split('\n').slice(1, 2).join(' ');
		}
	});

	eleventyConfig.addCollection('nav', function (collectionApi) {
		return collectionApi.getAll()
			.filter((page) => page.data.show_in_navigation === true)
			.sort((a, b) => a.data.navigation_order - b.data.navigation_order);
	});

	eleventyConfig.addShortcode('socialIcon', (icon) => socialIcons[icon] || '');

	eleventyConfig.addFilter('postDate', (date) => date ? date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '');
	eleventyConfig.addFilter('jsonify', (obj) => obj ? JSON.stringify(obj) : null);
	eleventyConfig.addFilter('getCollectionItemBySlug', (collection, slug) => collection.find((item) => slug === item.fileSlug));
	eleventyConfig.addFilter('getCollectionItemByUuid', (collection, slug) => collection.find((item) => slug === item.data._uuid));

	eleventyConfig.addPassthroughCopy('uploads');
	eleventyConfig.addPassthroughCopy('images');
	eleventyConfig.addPassthroughCopy('css');

	eleventyConfig.addPlugin(pluginSeo, seoData);
	eleventyConfig.addPlugin(pluginRss);

	eleventyConfig.cloudcannonOptions = {
		dir: {
			pages: 'pages'
		}
	};
};
