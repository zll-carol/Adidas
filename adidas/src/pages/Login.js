import React,{Component} from "react";
import PropTypes from "prop-types";
import { Prompt } from "react-router-dom";
import{Form, Icon, Input, Button, Checkbox, Spin} from "antd";
import "../css/Login.css";
import api from "../service/api.js"

const FormItem = Form.Item;

class NormalLoginForm extends Component{
	state={
		captcha:"",
    	formHasChanged: false 
	}

	static propTypes ={
		isFetching: PropTypes.bool.isRequired,
	    actions: PropTypes.object.isRequired,
	    user: PropTypes.object.isRequired,
	    error: PropTypes.bool,
	    message: PropTypes.string,
	}

	componentWillReceiveProps(nextProps){ //已加载组件收到新的参数时会调用该函数
		if(nextProps.user.username){  /*9.如果在input框中获取到新的数据与后台的数据相匹
配，则进行saveUser()储存username*/
			this.props.history.push("/");   //10.history是Router组件的一个属性，.push则是跳转页面
		}
	}

	handleSubmit = (e) => {  //1.用户点击登录按钮，触发handleSubmit事件
      e.preventDefault();
      this.props.form.validateFields((err, values) =>{  /*validateFields是蚂蚁金服在form上内置
的一个属性,用来验证数据。*/
        if (!err) {
          console.log('Received values of form: ', values);  //没有错误时将值打印出来
          this.props.actions.loginChunk(values);  //7.如果没有错误，则触发loginChunk()

//            fetch("http://localhost:3000/login",{  //用fecth发送form表单
//           	credentials:"include",
//           	method:"POST",
//           	headers:{
//           		"Content-Type":"application/json"
//           	},
//           	body:JSON.stringify(values)  //因为我们发送的是json，所以需要将values这个对象进行序列化
//           }).then((res)=>{
//           	return res.json()
//           }).then((login)=>{   //login是后台以对象的形式传过来的数据，有OK和user，user也是对象
//           	console.log("Login Return:",login);
//           	if (login.OK) {
//             localStorage.setItem("username", login.user.username);
//             //this.props.history.replace("/");
//             window.location.href="/";
//           } else {
//             message.error(login.message);   /*message——>蚂蚁金服上提供的全局提示函数，也需要在import中引入,
// message的具体内容是后台验证时定义好的*/
//           }
//           })
        }
      });
  	}

  	getCaptcha() {
		api.captcha().then((data) => {
		  console.log("cap", data);
		  this.setState({
		    captcha: data.captcha
		  })
		})
  	}

  	componentDidMount(){
  		this.getCaptcha();
  	}

  
  	// getCaptcha(){  //用fetch进行跨域请求
  	// 	fetch("http://localhost:3000/captcha",{
  	// 		credentials:"include",  //是否加上cookie信息，include表示加上cookie信息
  	// 	}).then((res)=>{ //因为fetch是primary对象，故用then返回数据
  	// 		return res.json()  //因为返回的是json数据，故通过json进行编码，然后获取到正真定的数值
  	// 	}).then((data)=>{
  	// 		this.setState({
  	// 			captcha:data.captcha
  	// 		})
  	// 	})
  	// }

	render(){
		if (this.props.isFetching) {  //当发送请求进行登录时在页面上显示loading
	      return(
	        <div className="loading" style={{marginTop:280}} >
	          <Spin />
	        </div>
	      )
    	}

		console.log("Props:",this.props);
		const capImg=(<img style={{height:28,cursor:"pointer"}}
			onClick={()=>this.getCaptcha(	)}
			src={"data:image/jpg;base64,"+this.state.captcha}
			alt="captcha"/>)
		const { formHasChanged} = this.state;
    	const { getFieldDecorator } = this.props.form;  /*getFieldDecorator是this.props.form上
    	的方法，用于和表单进行双向绑定*/
		return(
			<div className="login" >
				  <Prompt when={formHasChanged} message="确定要离开吗？"/> 
				  <Form  onChange={() => this.setState({formHasChanged: true})}
				   onSubmit={this.handleSubmit} className="login-form">
				        <h2>
				        	登录 				      
				        </h2>
				        <FormItem hasFeedback >
				          {getFieldDecorator('username', {
				            rules: [{ required: true, message: '请输入邮箱地址或手机号码' }],
				          })(
				            <Input placeholder="邮箱或手机号" />
				          )}
				        </FormItem>
				        <FormItem hasFeedback  className="error" >
				          {getFieldDecorator('password', {
				            rules: [{ required: true, message: '请输入密码' }],
				          })(
				            <Input type="password" placeholder="密码" />
				          )}
				        </FormItem>

				        <FormItem>
				          {getFieldDecorator('captcha', {
				            rules: [{ required: true, message: '请输入验证码' }],
				          })(
				            <Input  
				            style={{fontSize:13}}
				            addonBefore={<label>验证码</label>} //前置标签
				            addonAfter={capImg}           //后置标签
				            prefix={<Icon style={{ fontSize: 13 }} />} 
				            placeholder="点击图片重新获取" />
				          )}
				        </FormItem>

				        <FormItem>
						  {getFieldDecorator('remember', {
				            valuePropName: 'checked',
				            initialValue: true,
				          })(
				            <Checkbox>记住我的信息</Checkbox>
				          )}
				          <Button type="primary" htmlType="submit" className="login-form-button">
				            登录 <Icon type="right-circle" />
				          </Button>
				    	  <a href="/" className="forget" > 忘记密码？ </a>
				        </FormItem>
				        <div className="dashed" ></div>
				        <div className="footer" >				        	
				        	<span>使用其他方式登录</span>
				        	<Icon type="setting" className="Icon" />
				        </div>
				  </Form>
			</div>
		);
	}
}
const Login= Form.create()(NormalLoginForm);  //在NormalLoginForm这个组件中注入this.props.form属性

export default Login;


  				
				        