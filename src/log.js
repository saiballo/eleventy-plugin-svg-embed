/**
* @preserve
* Filename: log.js
*
* Created: 30/11/2024 (18:44:22)
* Created by: Lorenzo Saibal Forti <lorenzo.forti@gmail.com>
*
* Last update: 22/12/2024 (18:07:31)
* Updated by: Lorenzo Saibal Forti <lorenzo.forti@gmail.com>
*
* Copyleft: 2024 - Tutti i diritti riservati
*
* Comments:
*/

"use strict";

/**
 * The function `toLog` logs messages with different icons based on the type of message.
 * @param [message] - it is a string that represents the message to be logged. If no message is provided, the default message "OPS! An error has occurred" will be used.
 * @param [type=default] - it specifies the type of log message being displayed. It can have one of the following values: info, error
 */
const toLog = (message = "OPS! An error has occured", type = "default") => {

	let logIcon;

	switch (type) {
		case "info":
			logIcon = "✅";
			break;
		case "error":
			logIcon = "❌";
			break;
		default:
			logIcon = "📣";
			break;
	}

	const logLabel = `${logIcon} plugin-svg-embed -`;

	console.error(`${logLabel} ${message}`);
};

module["exports"] = toLog;
