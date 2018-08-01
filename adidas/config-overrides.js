const {
	injectBabelPlugin
} = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');


module.exports = function override(config, env) {
	// do stuff with the webpack config...

	//引入babel-plugin-import实现antd按需加载组件，即引入的才加载进来，没有引入的就不加载
	config = injectBabelPlugin(['import', {
		libraryName: 'antd',
		style: true
	}], config);

	//引入rewireLess修改默认less属性，主要用于自定义主题
	config = rewireLess(config, env, {
		modifyVars: {
			"@primary-color": "#0286CD",
			"@font-size-base":"18px",
			"@btn-height-lg":"40px",
		},
	});
	return config;
};