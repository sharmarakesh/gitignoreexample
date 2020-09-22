import * as monaco from 'monaco-editor';
import * as AdaptiveCards from "adaptivecards";
import * as markdownit from "markdown-it";
import * as ACDesigner from "adaptivecards-designer";

// Setting Monaco enviroment
self.MonacoEnvironment = {
	getWorkerUrl: function (moduleId, label) {
		if (label === 'json') {
			return 'dist/build/ac-libs/json.worker.bundle.js';
		}
		if (label === 'css') {
			return 'dist/build/ac-libs/css.worker.bundle.js';
		}
		if (label === 'html') {
			return 'dist/build/ac-libs/html.worker.bundle.js';
		}
		if (label === 'typescript' || label === 'javascript') {
			return 'dist/build/ac-libs/ts.worker.bundle.js';
		}
		return 'dist/build/ac-libs/editor.worker.bundle.js';
	}
};