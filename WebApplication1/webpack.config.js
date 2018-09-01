"use strict";
const bundleOutputDir = "./wwwroot/dist";
const path = require('path');

module.exports = (env, args) => {
	let isDevBuild = true;  //Assume isDevBuild;

	//If being run from NPM, args.mode will be populated
	if (args && args.mode === 'production') {
		isDevBuild = false;
	}

	//Not production mode from NPM, check on Production mode from Task Runner
	if (isDevBuild) {
		//If being run from the Webpack Task Runner in VS.
		const node_env = process.env.NODE_ENV

		if (node_env) {
			if (node_env === 'production') {
				isDevBuild = false;
			}
			else {
			}
		}
	}
	console.log('isDevBuild=' + isDevBuild);
	
	return [{
		devtool:isDevBuild ? 'inline-source-map': false,
		mode: isDevBuild ? "development" : "production",
		entry: { app: './src/app/index.ts', search: './src/search/index.ts' },
		resolve: {
			// Add `.ts` and `.tsx` as a resolvable extension.
			extensions: [".ts", ".js"]
		},
		module: {
			rules: [
				// all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
				{ test: /\.tsx?$/, loader: "ts-loader" }
			]
		},
		output: {
			path: path.resolve(bundleOutputDir),
			publicPath: "/dist/",
			filename: "[name].js",
			chunkFilename: "[name].js"
		},
		plugins: [
		
		],
	}];
}