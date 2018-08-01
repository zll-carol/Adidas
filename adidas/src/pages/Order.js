import React,{Component} from "react";
import { Form, Input,  Icon, Cascader,
 Select,Checkbox, Button,Modal,Steps} from 'antd';
import { Prompt } from "react-router-dom";
import api from "../service/api.js";
import PropTypes from "prop-types";
import "../css/Order.css";

const FormItem = Form.Item;
const Option = Select.Option;
const Step=Steps.Step;

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

class OrderForm extends Component {
  static propTypes ={
    order:PropTypes.func.isRequired,
    isFetching:PropTypes.bool.isRequired,
    error:PropTypes.bool,
  }

  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    captcha:"",
    formHasChanged: false, 
    visible: false 
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.order(values);
      }
    });
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
    const { getFieldDecorator } = this.props.form;  
    const {formHasChanged} = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 12 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 12 },
        sm: { span: 14 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 12,
          offset: 12,
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
      <div className="order" >
          <Prompt when={formHasChanged} message="确定要离开吗？"/> 
          <div className="title">
            <Icon type="heart" />
            <h1>adidas</h1>
            <h3>结算页</h3>
          </div>
         
          <Button type="primary" onClick={this.showModal}>填写收货地址</Button>
          <Modal
              title="新增收货人信息"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
          >
            <Form onChange={() => this.setState({formHasChanged: true})} 
              onSubmit={this.handleSubmit} className="order-form">
               <FormItem
                {...formItemLayout}
                label="所在地区"
              >
                {getFieldDecorator('residence', {
                  rules: [{ type: 'array', required: true, message: '请输入常住地址' }],
                })(
                  <Cascader options={residences} />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label={(
                  <span>
                    收货人
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
                label={(
                  <span>
                    详细地址
                  </span>
                )}
                hasFeedback
              >
                {getFieldDecorator('adress', {
                  rules: [{ required: true, message: '请输入详细地址', whitespace: true,},
                  ],
                  validateTrigger:"onBlur"  //失去焦点时才校验，之前默认是的onChange事件
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="手机号码"
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
                label="邮箱地址"
                hasFeedback
              >
                {getFieldDecorator('email', {
                  rules: [{
                    type: 'email', message: '请输入合法邮箱',
                  }, {
                    required: true, message: '请输入邮箱地址',
                  }],
                  validateTrigger:"onBlur"
                })(
                  <Input />           
                )}
                  <span className="warning" style={{fontSize:14,color:"#aaa",width:320,display:"block"}}>
                  用来接收订单提醒邮件，便于您及时了解订单状态</span>
              </FormItem>  
              <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }} className="accept" >
                {getFieldDecorator('agreement', {
                  valuePropName: 'checked',
                })(
                  <Checkbox>我接受adidas商城<a href="/">使用条款</a>和
                  <a href="/">隐私声明</a></Checkbox>
                )}
              </FormItem> 
              <FormItem {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" loading={this.props.isFetching} >
                确认下单<Icon type="right-circle" /></Button>
              </FormItem>  
            </Form>           
         </Modal> 
         <div className="step"> 
            <Steps current={1}>
              <Step title="1.我的购物车" description="" />
              <Step title="填写核对订单信息" description="" />
              <Step title="成功提交订单" description="" />
            </Steps> 
         </div>    
      </div>
    );
  }
}

const Order= Form.create()(OrderForm);

export default Order;