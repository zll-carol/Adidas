import myFetch from "./myFetch";
export const SERVER = "http://192.168.1.210:3000";

// 配置选项 数组长度如果等于3， 那么第三个参数只要不是"none", 则都返回一个带参数的函数对象，否则返回不带参数的函数对象；

const apiConfig = {
	// 数组第一个参数为路径， 第二个为方法， 第三个为数据类型
	login: ["/login", "POST", "json"],
	logout: ["/logout"],
	register: ["/register", "POST", "json"],
	captcha: ["/captcha"],

	addCat: ["/manage/category", "POST", "json"],
	modifyCat: ["/manage/category", "PUT", "json"],
	delCat: ["/manage/category", "DELETE", "path"],
	getCats: ["/manage/category", "GET", "path"],

	addTag:["/manage/tag","POST","json"],
	getTags:["/manage/tag"],
	modifyTag:["/manage/tag","DELETE"],
	delTag:["/manage/tag","DELETE"],

	addProduct:["/manage/product","POST","json"],
	getProducts: ["/manage/product", "GET", "query"],
	getProduct:["/manage/product","GET","path"],

	addCart:["/shoppingcart","POST","json"],
	getCart:["/shoppingcart"],
	delCart:["/shoppingcart","DELETE","path"],
}

const takeConfigToFunc = (config) => {
	const api = {};
	for (let key in config) {
		const value = config[key];
		if (value.length === 3 && value[2] !== "none") {
			api[key] = (payload) => (myFetch(...value, payload));
		} else {
			api[key] = ()=>(myFetch(...value));
		}
	}	
	return api
}

export default takeConfigToFunc(apiConfig);

// const api = {
// 	login: (form) => (myFetch("/login", "POST", "json", form)),
// 	logout: () => (myFetch("/logout")),
// 	addCap: (form) => {myFetch("/manage/category", "POST", "json", form)),
// }

//以下是没有封装前的代码：
// export const login = (form) => {  //4.在reducer中执行LOGIN_SUBMIT_START，发送请求过来
// 	return fetch(SERVER+"/login", {
// 		credentials: "include",
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify(form)
// 	}).then((res) => {
// 		return res.json();  //5.获取到form表单数据
// 	})
// }

// export const logout =()=>{
// 	return fetch(SERVER + "/logout",{
// 		credentials:"include",
// 	}).then((res)=>{
// 		return res.json();
// 	})
// }

// export const captcha =()=>{
// 	return fetch(SERVER+"/captcha", {
// 		credentials: "include"
// 	}).then((res) => {
// 		return res.json() 
// 	})
// }

// export const register =(form)=>{
// 	return fetch(SERVER+"/signup",{
// 		credentials:"include",
// 		method:"POST",
// 		headers:{
// 			"Content-Type":"application/json",
// 		},
// 		body:JSON.stringify(form)
// 	}).then((res)=>{
// 		return res.json()
// 	})
// }

// export const getCats=(level)=>{
// 	return fetch(SERVER+"/manage/category/"+(level || ""),{  /*如果没有传入level,那么level就
// 是undefined,这样会报错，所以假如level等于undefined就设为空*/
// 		credentials:"include",
// 	}).then((res)=>{
// 		return res.json()
// 	});
// }

// export const addCat = (form) => {
// 	return fetch(SERVER+"/manage/category", {
// 		credentials: "include",
// 		"method": "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify(form)
// 	}).then((res) => {
// 		return res.json();
// 	})
// }