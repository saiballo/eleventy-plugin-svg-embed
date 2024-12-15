/**
* @preserve
* Filename: main.js
*
* Created: 07/12/2024 (18:32:24)
* Created by: Lorenzo Saibal Forti <lorenzo.forti@gmail.com>
*
* Last update: 14/12/2024 (18:13:32)
* Updated by: Lorenzo Saibal Forti <lorenzo.forti@gmail.com>
*
* Copyleft: 2024 - Tutti i diritti riservati
*
* Comments:
*/

const getSvg = require("./src/getSvg.js");
const pkg = require("./package.json");
const toLog = require("./src/log.js");

const defaultConfig = {
	"includeExt": false,
	"embed": true,
	"defaultSize": 100
};

module.exports = (eleventyconfig, config = {}) => {

	try {

		// merge defaultConfig with custom config
		const pluginConfig = {
			...defaultConfig,
			...config
		};

		eleventyconfig.versionCheck(pkg["11ty"].compatibility);

		getSvg(eleventyconfig, pluginConfig);

	} catch (err) {

		toLog(err, "error");
	}
};
