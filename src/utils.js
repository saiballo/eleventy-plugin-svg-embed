/**
* @preserve
* Filename: utils.js
*
* Created: 08/12/2024 (20:07:10)
* Created by: Lorenzo Saibal Forti <lorenzo.forti@gmail.com>
*
* Last update: 22/12/2024 (18:09:02)
* Updated by: Lorenzo Saibal Forti <lorenzo.forti@gmail.com>
*
* Copyleft: 2024 - Tutti i diritti riservati
*
* Comments:
*/

"use strict";

/**
 * The `addAttribute` function modifies attributes of SVG images based on custom data and class list provided.
 * @param classlist - it is used to specify one or more CSS classes that you want to add to the selected element.
 * @param customdata - it is an object containing custom attributes and values that you want to add to the SVG or image element.
 * It can include attributes like `fill`, `stroke`, `desc`, `id`, and `title`. The function `addAttribute` processes this data and updates the SVG or image
 * @param $ - it is typically used as a reference to the jQuery library. It allows you to manipulate and interact with elements in the DOM using jQuery methods
 * @param [tag=svg] - it specifies the type of element to which the attributes will be added. By default, it is set to "svg"
 * @returns The function `addAttribute` returns `true` if a description (`desc`) is successfully added to the SVG element, otherwise it does not explicitly return anything.
 */
const addAttribute = (classlist, customdata, $, tag = "svg") => {

	// only svg images
	if (tag === "svg") {

		// role
		$(tag).prop("role", "img");

		// fill and stroke
		["fill", "stroke", "stroke-width"].forEach((attribute) => {

			if (customdata[attribute]) {

				const option = customdata[attribute];

				if (Array.isArray(option) === false) {

					$(tag).find("path").attr(attribute, option);

				} else {

					$(tag).find("path").each(function() {

						option.forEach(([sourceColor, targetColor]) => {

							if (String($(this).attr(attribute)).toLowerCase() === String(sourceColor).toLowerCase()) {

								$(this).attr(attribute, targetColor);
							}
						});
					});
				}
			}
		});

		// desc
		if (customdata["desc"] && customdata["desc"].trim() !== "") {

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
	}

	// all images type
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
};

/**
 * The `addSize` function sets the width and height of a specified HTML element using custom or default sizes.
 * @param customsize - Customsize is an array that represents the width and height values for resizing an element.
 * @param $ - The `$` parameter is typically used to represent the jQuery library in JavaScript. It is commonly used for DOM manipulation and traversal.
 * @param defaultsize - it represents the default size value that will be used if a custom size is not provided or if the custom size provided is invalid.
 * @param [tag=svg] - it is used to specify the HTML tag name that you want to target for setting the width and height properties. By default it is set to "svg"
 */
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
