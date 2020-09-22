const path = require('path');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: {
		app: './index.js',
		'editor.worker': 'monaco-editor/esm/vs/editor/editor.worker.js',
		'json.worker': 'monaco-editor/esm/vs/language/json/json.worker',
		'css.worker': 'monaco-editor/esm/vs/language/css/css.worker',
		'html.worker': 'monaco-editor/esm/vs/language/html/html.worker',
		'ts.worker': 'monaco-editor/esm/vs/language/typescript/ts.worker'
	},
	output: {
		globalObject: 'self',
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'ac-libs')
	},
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
			test: /\.js(\?.*)?$/i,
			terserOptions: {
				output: {
				  comments: false,
				},
			  },
			  extractComments: false,
			}),
		],
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
				  {
					loader: 'file-loader',
					options: {
					  name: '[name].[ext]',
					publicPath: "./dist/build/ac-libs"
					}
				  }
				]
			  }
		]
	},
	// devtool: "source-map",
	devtool: false,
	plugins: [
		new CopyWebpackPlugin({
			patterns: [
				{
					from: 'node_modules/adaptivecards-designer/dist/containers/*',
					to: 'adaptive-cards-designer/containers',
					flatten: true,
				},
				{
					from: 'node_modules/adaptivecards-designer/dist/adaptivecards-designer-standalone.js',
					to: 'adaptive-cards-designer/',
					flatten: true,
				},
				{
					from: 'node_modules/adaptivecards-designer/dist/adaptivecards-designer.js',
					to: 'adaptive-cards-designer/',
					flatten: true,
				},
				{
					from: 'node_modules/adaptivecards-designer/dist/*.css',
					to: 'adaptive-cards-designer/',
					flatten: true,
				},
				{
					from: 'node_modules/adaptivecards/dist/adaptivecards.js',
					to: 'adaptive-cards/',
					flatten: true,
				},
				{
					from: 'node_modules/markdown-it/dist/markdown-it.js',
					to: 'markdown-it/',
					flatten: true,
				}
			],
		}),
		new MonacoWebpackPlugin({
			languages: ['json'],
		}),
	],
};
