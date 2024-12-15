<p align="center">
	<img src="https://www.11ty.dev/img/logo-github.svg" width="100" height="100" alt="11ty logo">
</p>

# eleventy-plugin-svg-embed

> A plugin for 11ty that, through a shortcut, allows you to include an SVG image either as an embed or as a file


![](https://img.shields.io/badge/Made%20with%20love%20and%20with-javascript%2C%20node-blue)
[![MIT license](https://img.shields.io/badge/License-MIT-green.svg)](https://lbesson.mit-license.org/)

## Installation

Available on [npm](https://www.npmjs.com/package/@saiballo/eleventy-plugin-svg-embed):

```sh
npm install @saiballo/eleventy-plugin-svg-embed --save
```
Add the plugin to your `eleventy.config.js`:

```js
const svgImg = require("@saiballo/eleventy-plugin-svg-embed");

module.exports =  function(eleventyConfig) {

	eleventyConfig.addPlugin(svgImg);
};
```

#### Options Parameters
You can add an options object to the plugin configuration. Below is the complete list of available parameters.

```js
module.exports =  function(eleventyConfig) {

	eleventyConfig.addPlugin(svgImg, {
		"includeExt": false,
		"embed": true,
		"defaultSize": 100
	});
};
```

#### Parameters
```js
// set this to true if you want to include file extension is shortcut code
"includeExt": false,

// true | false. if set to "true", the code will be embedded in the page; otherwise, the img src tag will be used
"embed":  true

// default size of image if you don't use a css class or declare sizes
"defaultSize": 100
```

## Usage

In your template you can add a shortcut (example is for Nunjucks);

```js
{% svgImg "path/to/your/image/logo" %}
```

For every image you can add some data (i.e. accessibility)

```js
{% svgImg "path/to/your/image/logo", "css-class another-css-class", {embed: true, title: "svg title", desc: "svg desc", size:[500,500]}  %}
```

As you can see you can add css class list as second parameter of the shortcut. The third parameter is a object with which you can customize (all keys are optionals):

- embed: overwrite the embed option in plugin config
- title: for accessibility purposes you can provide a title
- desc: for accessibility purposes you can provide a desc
- size: an array for width and height of the image (or you can provide only one dimension for both. i.e. [100])

## Team ARMADA 429
<img src="https://raw.githubusercontent.com/saiballo/saiballo/refs/heads/master/armada429.png" width="100" height="100">

* Lorenzo "Saibal" Forti

## License

![](https://img.shields.io/badge/License-Copyleft%20Saibal%20--%20All%20Rights%20Reserved-red)
