import path from "path"

module.exports = {
	devServer: {
		proxy: {
			'/api': {
				target: 'http://127.0.0.1:3000',
				changeOrigin: true,
				pathRewrite: {
					'^/api': '/example/api'
				}
			},
		}
	},
	resolve: {
		alias: {
			'@': path.resolve('./src') // @代替src
		}
	},
}