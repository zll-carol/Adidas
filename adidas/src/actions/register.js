import api from "../service/api";
import {navUsername} from "../actions/nav";
import history from "../service/history";
import{message} from "antd";

export const REGISTER_START ="REGISTER_START";
export const REGISTER_SUCCESS="REGISTER_SUCCESS";
export const REGISTER_ERROR="REGISTER_ERROR";

export const registerStart=()=>({
	type:REGISTER_START,
})
export const registerError=(message)=>({
	type:REGISTER_ERROR,
	payload:message,
})

export const registerSubmit=(form)=>{
	return (dispatch,getState)=>{
		dispatch(registerStart());
		api.register(form).then((resJson)=>{
			if(resJson.OK){
				message.success("登录成功");
				dispatch(navUsername(resJson.user.username));
				return history.push("/");
			}else{
				message.error(resJson.message);
				dispatch(registerError(resJson.message));
			}
		}).catch((err)=>{
			message.error("注册失败，请检查网络");
			dispatch(registerError(err.toString()));
		})
	}
}