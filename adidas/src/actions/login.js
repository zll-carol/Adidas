import api from "../service/api";
import {navUsername} from "./nav";
import{message} from "antd";

export const LOGIN_SUBMIT_START = "LOGIN_SUBMIT_START";
export const LOGIN_SUBMIT_SUCCESS = "LOGIN_SUBMIT_SUCCESS";
export const LOGIN_SUBMIT_ERROR = "LOGIN_SUBMIT_ERROR";

export const loginStart=()=>({  /*2.开始登录，通过dispatch接收到loginStart函数
触发reducer,发送请求*/
	type:LOGIN_SUBMIT_START
})

export const loginSuccess =(resJson) =>({
	type:LOGIN_SUBMIT_SUCCESS,
	payload:resJson,
})

export const loginError =(err)=>({
	type:LOGIN_SUBMIT_ERROR,
	payload:err,
})

export const loginChunk=(form) =>{  /*8.已经在api.js中获取到数据，再由Login.js中的
handleSubmit事件触发loginChunk()*/
	return (dispatch,getState)=>{

		dispatch(loginStart());

		api.login(form).then((resJson)=>{  /*调用api.js中的login(form)函数，
		该函数返回的是Promise对象，故可直接用then*/

			if(resJson.OK){
				message.success("登录成功")
				dispatch(loginSuccess(resJson.user));
				return dispatch(navUsername(resJson.user.username));  /*12.如果获取到数据，
				走到了loginSuccess()这一步，那么说明已经登录成功，然后触发actions文件夹中
				的nav.js,将username传进去,接着就执行reduser里的navUsername()*/
			}else{
				message.error(resJson.message);
				return dispatch(loginError(resJson.message));
			}
		}).catch((err)=>{
			message.error(err.toString()); /*因为在Login.js中定义的error属性是bool类型，
			所以转为字符串*/
			return dispatch(loginError(err.toString()));
		})
	}
}

