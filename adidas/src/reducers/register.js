import {REGISTER_START,REGISTER_ERROR} from "../actions/register";

const defaultState={
	isFetching:false,
}

const register =(state=defaultState,action)=>{
	switch(action.type){
		case REGISTER_START:
			return {isFetching:true}

		case REGISTER_ERROR:
			return {isFetching:false,error:true}

		default:
			return state;
	}
}

export default register;