import React,{Component} from "react";
import { Form, Input,  Icon, Cascader, Select,Checkbox, Button,} from 'antd';
import "../css/Register.css";
import { Prompt } from "react-router-dom";
import api from "../service/api.js";
import PropTypes from "prop-types";

const FormItem = Form.Item;
const Option = Select.Option;

const residences = [{
  value: '浙江',
  label: '浙江',
  children: [{
    value: '杭州',
    label: '杭州',
    children: [{
      value: '西湖',
      label: '西湖',
    }],
  }],
}, {
  value: '江苏',
  label: '江苏',
  children: [{
    value: '南京',
    label: '南京',
    children: [{
      value: '中华门',
      label: '中华门',
    }],
  }],
},{
  value: '海南',
  label: '海南',
  children: [{
    value: '三亚',
    label: '三亚',
    children: [{
      value: '荔枝沟',
      label: '荔枝沟',
    }],
  }],
},{
  value: '河南',
  label: '河南',
  children: [{
    value: '许昌',
    label: '许昌',
    children: [{
      value: '魏都区',
      label: '魏都区',
    }],
  }],
},{
  value: '云南',
  label: '云南',
  children: [{
    value: '丽江',
    label: '丽江',
    children: [{
      value: '泸沽湖',
      label: '泸沽湖',
    }],
  }],
}];


class RegistrationForm extends Component {
  static propTypes ={
    register:PropTypes.func.isRequired,
    isFetching:PropTypes.bool.isRequired,
    error:PropTypes.bool,
  }

  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    captcha:"",
    formHasChanged: false 
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.register(values);
      }
    });
  }

  getCaptcha(){
    api.captcha().then((data)=>{
      console.log("cap:",data);
      this.setState({
        captcha:data.captcha
      })
    })
  }

  componentDidMount(){
    this.getCaptcha();
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    // 两次 输入完毕，并且输入的值不为空，将 confirmDirty 设为true
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  checkPassword = (rule, value, callback) => {   // 第二个password 输入框发起校验   
    const form = this.props.form;
    // 比对第二个框的value  跟第一个输入框的value 是否相等
    if (value && value !== form.getFieldValue('password')) {  //getFieldValue()——>获取输入框的值
      callback('两次输入的密码不一致');
    } else {
      callback();
    }
  }
  checkConfirm = (rule, value, callback) => {    // 第一个password 输入框发起校验
    const form = this.props.form;
    // 第一个输入框的值不为空， 并且第二个框的值不为空
    if (value && this.state.confirmDirty) {
      // 调用 第二个输入框的校验函数
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  }

  render() {
    const capImg=(<img style={{height:28,cursor:"pointer"}}
    onClick={()=>this.getCaptcha( )}
    src={"data:image/jpg;base64,"+this.state.captcha}
    alt="captcha"/>)
    const { getFieldDecorator } = this.props.form;  
    const {formHasChanged} = this.state;

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
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {  /*getFieldDecorator() ——>用于
      和表单进行双向绑定 */
      initialValue: '86',
    })(
      <Select style={{ width: 60 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );

    return (
      <div className="register" >
          <Prompt when={formHasChanged} message="确定要离开吗？"/> 
          <Form onChange={() => this.setState({formHasChanged: true})} 
          onSubmit={this.handleSubmit} className="register-form">
          <h2>
            <Icon type="heart" /> &nbsp;
            欢迎注册 
            <span>已有账号,<a href="/login" >请登录</a></span>
          </h2>

           <FormItem
            {...formItemLayout}
            label={(
              <span>
                用户名
              </span>
            )}
            hasFeedback
          >
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入用户名', whitespace: true,},
             {pattern: /[a-zA-Z][0-9a-zA-Z-_]{3,19}/,  //pattern ——>正则表达式校验
              message: "用户名必须是字母开头，包含字母、数字的4~20的字符串"}],
              validateTrigger:"onBlur"  //失去焦点时才校验，之前默认是的onChange事件
            })(
              <Input />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="密码"
            hasFeedback
          >
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: '请输入密码',
              }, 
              {
              pattern: /((?=.*[\d])(?=.*[^\d])).{8,}|((?=.*[^A-Za-z])(?=.*[a-zA-Z])).{8,}/,
              message: "密码必须符合复杂性要求"
              },            
              {validator: this.checkConfirm},   
              ],
            })(
              <Input type="password" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="确认密码"
            hasFeedback
          >
            {getFieldDecorator('confirm', {
              rules: [
              {
                required: true, message: "请确认密码",
              }, {
                validator: this.checkPassword,  
              }],
              validateTrigger:"onBlur"
            })(
              <Input type="password" onBlur={this.handleConfirmBlur} />
            )}
          </FormItem>

          <FormItem 
            {...formItemLayout}
            label="E-mail"
            hasFeedback
          >
            {getFieldDecorator('email', {
              rules: [{
                type: 'email', message: '请输入合法邮箱',
              }, {
                required: true, message: '请输入邮箱',
              }],
              validateTrigger:"onBlur"
            })(
              <Input />
            )}
          </FormItem>
                  
          <FormItem
            {...formItemLayout}
            label="常住地址"
          >
            {getFieldDecorator('residence', {
              rules: [{ type: 'array', required: true, message: '请输入常住地址' }],
            })(
              <Cascader options={residences} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="电话号码"
          >
            {getFieldDecorator('phone', {
              rules: [{ required: true, message: '请输入手机号码' },
              {
                pattern:/^1[3578][\d]{9}$/,
                message:"请输入合法的手机号"
              },
              ],
              validateTrigger:"onBlur"
            })(
              <Input addonBefore={prefixSelector} style={{ width: '100%' }} /> //addonBefore={}表示前缀图片
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="验证码"
          >
              {getFieldDecorator('captcha', {
                rules: [{ required: true, message: '请输入验证码' }],
              })(
                <Input  
                style={{fontSize:13}}
                addonAfter={capImg}           //后置标签
                prefix={<Icon style={{ fontSize: 13 }} />} 
                placeholder="点击图片重新获取" />
              )}              
          </FormItem>

          <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
            {getFieldDecorator('agreement', {
              valuePropName: 'checked',
            })(
              <Checkbox>我同意相关<a href="">协议</a></Checkbox>
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" loading={this.props.isFetching} >注册</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const Register= Form.create()(RegistrationForm);

export default Register;