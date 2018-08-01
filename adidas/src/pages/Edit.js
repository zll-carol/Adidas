import React,{Component} from"react";

import {Form,Input,Button}from"antd";
import "../css/edit.css";

const FormItem=Form.Item;

class NormalEdit extends Component{
	componentDidMount(){
		//用CKEDITOR替代form表单
		window.CKEDITOR.replace("editor",{ /*没办法用node.js安装的第三方包，只能
		用<script>引进来，绑定在window这个全局对象上。*/
			height:500,
			filebrowserImgeUploadUrl:"/upload",
		});
	}
	submit(e){
		e.preventDefault();
		const content=window.CKEDITOR.instances.editor.getData();  //获取内容
		this.props.form.validateFields((errs,values)=>{
			if(!errs){
				console.log("Values:",values);
			}
		})
	}
	render(){
		const{getFieldDecorator}=this.props.form;
		return(
			<div className="edit">
				<Form onSubmit={this.submit.bind(this)}>
					<FormItem label="标题">
						{getFieldDecorator('title', {
			            rules: [{
			              required: true, message: '请输入标题!',
			            }],
			          	})(
			              <Input />
			          	)}
					</FormItem>
					<FormItem label="编辑框">
			              <textarea name="editor" id="editor" />
					</FormItem>
					<Button type="primary" htmlType="submit">提交</Button>
				</Form>
			</div>   /*注意：在ant.design中会把一些标签原本的type属性占用来设置
			一些主题风格，如<Button type="primary">，那么想要设置原本的内置type就要用htmlType*/
		)
	}
}

const Edit=Form.create()(NormalEdit);

export default Edit;
