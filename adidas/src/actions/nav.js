import api from "../service/api";

export const NAV_USERNAME = "NAV_USERNAME";
export const NAV_LOGOUT = "NAV_LOGOUT";

export const navUsername = (username) => ({
	type: NAV_USERNAME,
	payload: username  //已经从actions文件夹的login.js里的loginChunk()中获取到username了
});

export const navDelUser=()=>({
	type:NAV_LOGOUT,
});

export const navLogout=()=>{
	return (dispatch,getState)=>{
		api.logout().then((resJson)=>{
			/* if(resJson.OK){    
				dispatch(navLogout()); 当存在数据时，说明登录成功，然后调用navLogout(),这
				一步也可以不写，直接写下面的代码即可，表示无论有没有获取到数据都直接
				移除用户，即完成退出登录了。
			   } */
		})
		dispatch(navDelUser());
	}
}