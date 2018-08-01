import React,{Component} from "react";
import {Form,Button,Input,Transfer,Select,message} from "antd";
import api from "../service/api";
import"../css/AddCategory.css";

const FormItem=Form.Item;
const Option =Select.Option;

class AddCategory extends Component{
	state={
		allCats:[],
		targetKeys:[],
		level:"2",
		TransferStyle:{
			width:"45%",
			heigt:320,
		}
	}

	filterOption = (inputValue, option) => {  //用于过滤，即从左框中选中的值过滤到右框中
    	return option.name.indexOf(inputValue) > -1;
 	}
 	handleChange = (targetKeys) => {
    	this.setState({ targetKeys });
  	}
  	 handleSubmit = (e) => {
	    e.preventDefault();
	    this.props.form.validateFieldsAndScroll((err, values) => {
	      if (!err) {
	        console.log('Received values of form: ', values);
	        api.addCat(values).then((resJson)=>{
	        	if(resJson.OK){
	        		message.success("添加分类成功");
	        	}else{
	        		message.error("添加分类失败"+resJson.message,5); // 5是5秒表示提示框显示的时间
	        	}
	        })
	      }
	    });
	 }
  	getAllCat2(){
  		api.getCats(2).then((resJson)=>{ //返回的resJson包括OK和docs这两个属性
  			if(resJson.OK){
  				this.setState({
  					allCats:resJson.docs.map((cat)=>({
  						key:cat.name,
  						name:cat.name
  					}))
  				})
  			}  			
  		})
  	}
  	componentWillMount(){
  		this.getAllCat2();
  	}

	render(){
		const {getFieldDecorator}=this.props.form;		
	    const formItemLayout = {
	      labelCol: {
	        xs: { span: 24 },
	        sm: { span: 6 },
	      },
	      wrapperCol: {
	        xs: { span: 24 },
	        sm: { span: 14 },
	      },
	    };

		return(
			<div className="addCategory">
				<Form onSubmit={this.handleSubmit.bind(this)} >
					<FormItem
					{...formItemLayout}
					label="分类名称"
					>								       
			            {getFieldDecorator('name', {
			              rules: [{ required: true, message: '请输入分类名称', whitespace: true,}],    
			              validateTrigger:"onBlur"  //失去焦点时才校验，之前默认是的onChange事件
			            })(
			              <Input />
			            )}
					</FormItem>

					<FormItem
					{...formItemLayout}
					label="分类等级"
					>								       
			            {getFieldDecorator('level', {
			              rules: [{ required: true, message: '等级不能为空', whitespace: true,}],    
			              validateTrigger:"onBlur",  //失去焦点时才校验，之前默认是的onChange事件
			              initialValue:"2"
			            })(
			               <Select style={{ width:"100%"}}
			                   onChange={(value)=>this.setState({level:value})}
			               >
					         <Option value="1">一级分类</Option>
					         <Option value="2">二级分类</Option>
					       </Select>
			            )}
					</FormItem>

					{
						this.state.level === "2" ? null :  /*当level等于2时则为null，不显
				示下面的穿梭框，不等于2时才显示*/
						<FormItem
							{...formItemLayout}
							label="下级分类"
							> 
							    {getFieldDecorator("children",{

							    })(
							    <div className="transfer">
								 <Transfer
							        dataSource={this.state.allCats} //获取到的所有值
							        showSearch
							        filterOption={this.filterOption} //用于过滤，即从左框中选中的值过滤到右框中
							        targetKeys={this.state.targetKeys}
							        onChange={this.handleChange}
							        render={item => item.name}  //用于选中时显示的字段
							        listStyle={this.state.TransferStyle}
							     />
							    </div>
							     )
								}
						</FormItem>
					}
					
					<Button type="primary" htmlType="submit" className="submit" >
						提交
					</Button>
				</Form>
			</div>
		)
	}
}

export default Form.create()(AddCategory);