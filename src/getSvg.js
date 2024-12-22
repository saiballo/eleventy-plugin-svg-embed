/**
* @preserve
* Filename: getSvg.js
*
* Created: 07/12/2024 (18:41:03)
* Created by: Lorenzo Saibal Forti <lorenzo.forti@gmail.com>
*
* Last update: 22/12/2024 (18:08:23)
* Updated by: Lorenzo Saibal Forti <lorenzo.forti@gmail.com>
*
* Copyleft: 2024 - Tutti i diritti riservati
*
* Comments:
*/

const fs = require("node:fs");
const mime = require("mime-types");
const cheerio = require("cheerio");
const toLog = require("./log.js");
const util = require("./utils.js");

/**
 * The function `getSvg` adds a shortcode `svgImg` to Eleventy configuration for embedding or displaying SVG images with specified attributes and error handling.
 * @param eleventyconfig - it is an object that contains configuration settings for the Eleventy static site generator
 * @param pluginconfig - it is an object containing configuration options for the plugin
 */
const getSvg = (eleventyconfig, pluginconfig) => {

	eleventyconfig.addShortcode("svgImg", (src, classlist = "", customdata = {}) => {

		try {

			const isEmbed = customdata["embed"] ?? pluginconfig["embed"];
			const imgSrc = pluginconfig["includeExt"] === true ? src : `${src}.svg`;
			const mimeType = mime.lookup(imgSrc);

			if (mimeType === false) {

				throw new Error(`not image provided: ${imgSrc}`);
			}

			if (isEmbed === true) {

				if (fs.existsSync(imgSrc) === false) {

					throw new Error(`file not found for embed request: ${imgSrc}`);
				}

				if (mimeType.includes("svg+xml") === false) {

					throw {
						"message": `SVG embed requested but a non-SVG image was provided: ${imgSrc}`,
						"code": 415
					};
				}

				const tag = "svg";
				const svgContent = fs.readFileSync(imgSrc, {
					"encoding": "utf8"
				});

				const $ = cheerio.load(svgContent, {
					"xmlMode": true
				});

				util.addAttribute(classlist, customdata, $, tag);

				util.addSize(customdata["size"], $, pluginconfig["defaultSize"], tag);

				return $.html(tag);
			}

			const tag = "img";
			const $ = cheerio.load(`<img src="${imgSrc}" alt="">`, "", false);

			util.addAttribute(classlist, customdata, $, tag);

			util.addSize(customdata["size"], $, pluginconfig["defaultSize"], tag);

			return $.html();

		} catch (err) {

			toLog(`${err["message"]}`, "error");

			switch (err["code"]) {
				case 415:
					return `[can't embed a non-SVG image: ${src}]`;
				default:
					return `[can't render image: ${src}]`;
			}
		}
	});
};

module["exports"] = getSvg;
