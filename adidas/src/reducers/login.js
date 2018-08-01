import { LOGIN_SUBMIT_START,LOGIN_SUBMIT_SUCCESS, LOGIN_SUBMIT_ERROR} from "../actions/login";

const defaultState={
	isFetching:false,
	user:{},  //user是在后台定义好的字段，当没有从后台取出数据时，这里默认为空
};

const login =(state=defaultState,action)=>{
	switch(action.type){
		case LOGIN_SUBMIT_START:  //3.通过dispatch的触发，匹配到LOGIN_SUBMIT_START
			return {isFetching:true,user:{}}  //如果请求成功，则返回isFetching:true，user:{}
		
		case LOGIN_SUBMIT_SUCCESS:
			return {isFetching:false,user:action.payload}

		case LOGIN_SUBMIT_ERROR:
			return {isFetching:false,user:{},error:true,message:action.payload}

		default:
			return state;
	}
}

export default login;