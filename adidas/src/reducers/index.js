import {combineReducers} from "redux";
import login from "./login";
import nav from "./nav";
import register from "./register";
import shoppingCart from "./shoppingCart";

const rootReducer = combineReducers({
	login:login,  /*将reducers文件夹中的login.js里的login赋予这里定义的login, 
这样在containers文件夹中的ConLogin.js里就可以使用state.login,其他注册、导航条
等也一样。当有多个reducer文件时，这样就不会弄混。*/
	username:nav,
	register:register,
	cart:shoppingCart,
});

export default rootReducer;
