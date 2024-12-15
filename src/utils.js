/**
* @preserve
* Filename: utils.js
*
* Created: 08/12/2024 (20:07:10)
* Created by: Lorenzo Saibal Forti <lorenzo.forti@gmail.com>
*
* Last update: 15/12/2024 (19:21:40)
* Updated by: Lorenzo Saibal Forti <lorenzo.forti@gmail.com>
*
* Copyleft: 2024 - Tutti i diritti riservati
*
* Comments:
*/

"use strict";

const addAttribute = (classlist, customdata, $, tag = "svg") => {

	if (tag === "svg") {

		$(tag).prop("role", "img");
	}

	if (classlist) {

		$(tag).addClass(classlist);
	}

	if (customdata["id"]) {

		$(tag).attr("id", customdata["id"]);
	}

	if (customdata["title"] && customdata["title"].trim() !== "") {

		switch (tag) {
			case "img":
				$(tag).attr("alt", customdata["title"]);
				break;
			default:
				if ($(tag).children("title").length > 0) {

					$(tag).children("title").text(customdata["title"]);

				} else {

					$(tag).prepend(`<title>${customdata["title"]}</title>`);
				}
				break;
		}
	}

	if (tag === "svg" && customdata["desc"] && customdata["desc"].trim() !== "") {

		if ($(tag).children("desc").length > 0) {

			$(tag).children("desc").text(customdata["desc"]);

			return true;
		}

		if ($(tag).children("title").length > 0) {

			$(tag).children("title").after(`<desc>${customdata["desc"]}</desc>`);

		} else {

			$(tag).prepend(`<desc>${customdata["desc"]}</desc>`);
		}
	}
};

const addSize = (customsize, $, defaultsize, tag = "svg") => {

	if (customsize && customsize.length > 0) {

		const width = customsize.length === 2 ? parseInt(customsize[0]) || defaultsize : parseInt(customsize[0]) || defaultsize;
		const height = customsize.length === 2 ? parseInt(customsize[1]) || width : defaultsize;

		$(tag).prop("width", width);
		$(tag).prop("height", height);
	}
};

module["exports"] = {
	addAttribute,
	addSize
};
