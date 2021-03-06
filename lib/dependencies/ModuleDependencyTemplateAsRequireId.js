/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

class ModuleDependencyTemplateAsRequireId {

	apply(dep, source, outputOptions, requestShortener) {
		if(!dep.range) return;
		let comment = "";
		if(outputOptions.pathinfo) comment = `/*! ${requestShortener.shorten(dep.request)} */ `;
		let content;
		if(dep.module)
			content = `__webpack_require__(${comment}${JSON.stringify(dep.module.id)})`;
		else
			content = require("./WebpackMissingModule").module(dep.request);
		source.replace(dep.range[0], dep.range[1] - 1, content);
	}
}
module.exports = ModuleDependencyTemplateAsRequireId;
